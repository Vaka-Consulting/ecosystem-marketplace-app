import { ApolloError, useQuery } from '@apollo/client'
import { POLICY_ASSETS_QUERY } from '@/queries'
import { OperationType, PolicyAssetsQuery } from '@/gql/graphql'
import { SyntheticEvent, useMemo } from 'react'
import { useAddress, useAssets } from '@meshsdk/react'

interface UsePolicyAssets {
  data: PolicyAssetsQuery | undefined
  loading: boolean
  error: ApolloError | Error | undefined
  handleFilters: (event: SyntheticEvent) => void
}

interface UsePolicyAssetsProps {
  policyId: string
}

export function usePolicyAssets({ policyId }: UsePolicyAssetsProps): UsePolicyAssets {
  const assets = useAssets()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walletAssets = useMemo(() => assets?.filter((a: any) => a.policyId === policyId).map((a) => a.unit), [assets])
  const walletAddress = useAddress()

  const initialFilters = [
    {
      key: 'policy_id',
      value: policyId,
      operator: OperationType.Equals,
    },
  ]

  const initialVariables = {
    and: initialFilters,
    or: [],
    limit: 100,
  }
  const { data, loading, error, refetch } = useQuery(POLICY_ASSETS_QUERY, {
    variables: initialVariables,
  })

  const resetFilters = () => {
    void refetch(initialVariables)
  }

  const filterOnWallet = () => {
    const walletAssetsFilter = {
      key: 'asset',
      values: walletAssets,
      operator: OperationType.In,
    }

    // assets put on sale that are not in wallet but are retrieved from storage
    const walletAddressFilter = {
      key: 'extend.seller_address',
      value: walletAddress,
      operator: OperationType.Equals,
    }

    const filters = [walletAssetsFilter, walletAddressFilter]

    void refetch({
      and: initialFilters,
      or: filters,
    })
  }

  const handleFilters = (event: SyntheticEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const filterName = element.name
    const isChecked = element.checked

    if (isChecked && filterName === 'wallet') {
      filterOnWallet()
    } else {
      resetFilters()
    }
  }

  return {
    data,
    loading,
    error,
    handleFilters,
  }
}
