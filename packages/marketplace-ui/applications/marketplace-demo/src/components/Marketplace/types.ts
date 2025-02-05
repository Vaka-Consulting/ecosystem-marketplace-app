import { ApolloError } from '@apollo/client'
import { MarketplaceConfig, OperationType } from '@vakaconsulting/common-ui'
import { FormSubmitData } from '@/components/Forms/types'

export enum MarketplaceContext {
  Buyer = 'BUYER',
  Seller = 'SELLER',
  Owner = 'OWNER',
  None = 'NONE',
}

export enum MarketplaceStatus {
  Created = 'CREATED',
  Pending = 'PENDING',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Expired = 'EXPIRED',
  Invalid = 'INVALID',
}

export interface Data {
  id: string
  asset: string
  context: MarketplaceContext
  price: number
  sellerAddress: string | undefined
  status: MarketplaceStatus | undefined
  type: OperationType | undefined
}

export interface MarketplaceHook {
  config: MarketplaceConfig | undefined
  data: Data | undefined
  loading: boolean
  error: ApolloError | Error | undefined
  submitting: boolean
  txSigning: boolean
  txSignError: Error | undefined
  handleSubmit: (formData: FormSubmitData) => void
}
