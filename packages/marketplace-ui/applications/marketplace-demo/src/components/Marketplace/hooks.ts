import { useMutation, useQuery } from '@apollo/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAddress, useAssets, useNetwork, useWallet } from '@meshsdk/react'
import { BlockfrostProvider } from '@meshsdk/core'
import { MarketplaceContract } from '@vakaconsulting/marketplace-contract-ui'
import { OperationType } from '@vakaconsulting/common-ui'
import { BLOCKFROST_API_KEY } from '@/constants'
import { handleUnknownError } from '@/utils'
import {
  MARKETPLACE_CONFIG_QUERY,
  SINGLE_POLICY_ASSET_ACTIVITY_MUTATION,
  SINGLE_POLICY_ASSET_ACTIVITY_QUERY,
} from '@/queries'
import { Data, MarketplaceHook, MarketplaceStatus } from './types'
import { transformData } from './utils'
import { OperationType as GraphQlOperationType } from '@/gql/graphql'
import { FormSubmitData } from '@/components/Forms/types'

function useFetchMarketplaceConfig() {
  const walletNetwork = useNetwork()
  const network = walletNetwork === 1 ? 'mainnet' : 'preprod'

  const additionalConfig = {
    network,
  }

  const { data } = useQuery(MARKETPLACE_CONFIG_QUERY)

  return useMemo(() => {
    if (data && network) {
      return {
        ...data.marketplace_config,
        ...additionalConfig,
      }
    }

    return undefined
  }, [data, network])
}

function useMarketplaceContract() {
  const config = useFetchMarketplaceConfig()
  const { wallet } = useWallet()

  return useMemo(() => {
    if (config && wallet) {
      const provider = new BlockfrostProvider(BLOCKFROST_API_KEY)
      return new MarketplaceContract(
        {
          scriptAddress: config.script_address,
          feeOracleAddress: config.fee_oracle_address,
          feeOracleAsset: config.fee_oracle_asset,
          protocolOwnerAddress: config.protocol_owner_address,
          tokenAsset: config.token_asset,
          feePercentage: config.fee_percentage,
          network: 'preprod',
        },
        provider,
        wallet,
      )
    }
  }, [config, wallet])
}

export function useMarketplaceTx() {
  const [txId, setTxId] = useState<string | undefined>(undefined)
  const [txSigning, setTxSigning] = useState<boolean>(false)
  const [txSignError, setTxSignError] = useState<Error | undefined>(undefined)

  const contract = useMarketplaceContract()

  const initTxBuilder = useCallback(
    async (type: OperationType, asset: string, price?: number) => {
      try {
        if (!contract) throw new Error('Contract is not available')

        setTxId(undefined)
        setTxSignError(undefined)
        setTxSigning(true)

        let txId = undefined

        switch (type) {
          case OperationType.Sell:
            txId = await contract.list(asset, +price!)
            break
          case OperationType.Buy:
            txId = await contract.buy(asset)
            break
          case OperationType.Cancel:
            txId = await contract.cancel(asset)
            break
          case OperationType.Update:
            txId = await contract.update(asset, +price!)
            break
          default:
            throw new Error('Could not determine marketplace operation type')
        }

        setTxId(txId)
        return txId
      } catch (e) {
        const error = handleUnknownError(e as Error | string)
        setTxSignError(error)

        throw error
      } finally {
        setTxSigning(false)
      }
    },
    [contract],
  )

  return {
    txId,
    txSigning,
    txSignError,
    initTxBuilder,
  }
}

export function useMarketplace({ asset }: { asset: string }): MarketplaceHook {
  const [data, setData] = useState<Data | undefined>(undefined)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const { wallet } = useWallet()
  const config = useFetchMarketplaceConfig()
  const { txSigning, txSignError, initTxBuilder } = useMarketplaceTx()
  const walletAddress = useAddress()
  const walletAssets = useAssets()

  const {
    data: apiData,
    loading: loading,
    error: error,
    refetch,
  } = useQuery(SINGLE_POLICY_ASSET_ACTIVITY_QUERY, {
    variables: {
      and: [{ key: 'asset', value: asset, operator: GraphQlOperationType.Equals }],
    },
    pollInterval: 30000,
  })

  const [onSubmitMutationHandler] = useMutation(SINGLE_POLICY_ASSET_ACTIVITY_MUTATION, {
    onCompleted: () => {
      void refetch()
    },
  })

  /**
   * Handle form submission
   * Build & Sign tx
   * API Mutation
   */
  const handleSubmit = useCallback(
    async (formData: FormSubmitData) => {
      try {
        if (!wallet) throw new Error('BrowserWallet is not available')
        if (!walletAddress) throw new Error('WalletAddress is not available')
        if (!formData) throw new Error('Cannot find FormData')
        if (!data) throw new Error('Cannot find Data')

        const { id, asset } = data
        const { price, type } = formData

        const txId = await initTxBuilder(type, asset, price)

        if (!txId) throw new Error('Transaction ID is not valid')

        setSubmitting(true)

        void onSubmitMutationHandler({
          variables: {
            policyAsset: id,
            type,
            price: +price!,
            adaTransactionHash: txId,
            receiverAddress: walletAddress,
          },
        })
      } catch (e) {
        const error = handleUnknownError(e as Error | string)

        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    [data, wallet, walletAddress, initTxBuilder, onSubmitMutationHandler],
  )

  /**
   * Set submitting state based on api status or transaction state
   */
  useEffect(() => {
    if (txSigning || data?.status === MarketplaceStatus.Created || data?.status === MarketplaceStatus.Pending) {
      setSubmitting(true)
    } else {
      setSubmitting(false)
    }
  }, [txSigning, data?.status])

  /**
   * Set data based on api response
   */
  useEffect(() => {
    if (apiData && walletAddress && walletAssets) {
      const data = transformData(apiData, walletAddress, walletAssets)
      setData(data)
    }
  }, [apiData, walletAddress, walletAssets])

  return {
    config,
    data,
    loading,
    error,
    submitting,
    txSigning,
    txSignError,
    handleSubmit,
  }
}
