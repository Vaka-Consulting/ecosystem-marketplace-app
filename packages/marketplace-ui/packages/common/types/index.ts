import { BlockfrostSupportedNetworks } from '@meshsdk/core'

export interface MarketplaceConfig {
  feePercentage: number
  protocolOwnerAddress: string
  scriptAddress: string
  feeOracleAddress: string
  feeOracleAsset: string
  tokenAsset?: string
  network: BlockfrostSupportedNetworks
}

export enum OperationType {
  Buy = 'BUY',
  Sell = 'SELL',
  Update = 'UPDATE',
  Cancel = 'CANCEL',
}
