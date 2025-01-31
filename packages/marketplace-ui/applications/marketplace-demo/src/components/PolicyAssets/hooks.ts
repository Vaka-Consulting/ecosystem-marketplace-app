import { ApolloError, useQuery } from '@apollo/client'
import { POLICY_ASSETS_QUERY } from '@/queries'
import { OperationType, PolicyAssetsQuery } from '@/gql/graphql'
import { SyntheticEvent, useMemo } from 'react'
import { useAssets } from '@meshsdk/react'

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
  const assetsList = useMemo(() => assets?.map((a) => a.unit), [assets])

  const initialFilter = {
    key: 'policy_id',
    value: policyId,
    operator: OperationType.Equals,
  }

  const initialVariables = {
    and: [initialFilter],
    limit: 100,
  }
  const { data, loading, error, refetch } = useQuery(POLICY_ASSETS_QUERY, {
    variables: initialVariables,
  })

  const handleFilters = (event: SyntheticEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const isChecked = element.checked

    if (isChecked) {
      void refetch({
        ...initialVariables,
        and: [
          initialFilter,
          {
            key: 'asset',
            values: assetsList,
            operator: OperationType.In,
          },
        ],
      })
    } else void refetch(initialVariables)
  }

  return {
    data,
    loading,
    error,
    handleFilters,
  }
}
