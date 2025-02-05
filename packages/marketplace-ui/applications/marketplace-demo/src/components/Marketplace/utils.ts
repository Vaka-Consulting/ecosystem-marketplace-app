import { Data, MarketplaceContext, MarketplaceStatus } from '@/components/Marketplace/types'
import { Asset } from '@meshsdk/core'
import { defaultPolicyAssetExtend, defaultPolicyAssetLastActivity } from '@/components/Marketplace/constants'
import { PolicyAssetActivityQuery } from '@/gql/graphql'
import { OperationType } from '@vakaconsulting/common-ui'

/**
 * Get Context Type
 * seller = UI - update / cancel
 * buyer = UI - buy
 * owner  = UI - sell (listing)
 * not_available = UI shows nothing (message)
 * @param isOwnerOfAsset
 * @param isSellerOfAsset
 * @param isBuyerOfAsset
 */
export const getContextType = (
  isOwnerOfAsset: boolean,
  isSellerOfAsset: boolean,
  isBuyerOfAsset: boolean,
): MarketplaceContext => {
  switch (true) {
    case isSellerOfAsset:
      return MarketplaceContext.Seller
    case isBuyerOfAsset:
      return MarketplaceContext.Buyer
    case isOwnerOfAsset:
      return MarketplaceContext.Owner
    default:
      return MarketplaceContext.None
  }
}

export const transformData = (
  apiData: PolicyAssetActivityQuery,
  walletAddress: string,
  walletAssets: Asset[],
): Data => {
  const policyAsset = apiData?.policy_assets?.results?.[0]
  const apiDataExtend = policyAsset?.extend?.[0] || defaultPolicyAssetExtend
  const apiDataLastActivity = policyAsset?.last_activity || defaultPolicyAssetLastActivity

  const id = policyAsset?._id || ''
  const asset = policyAsset?.asset || ''
  const isSale = apiDataExtend.is_sale
  const sellerAddress = apiDataExtend.seller_address as string
  const status = apiDataLastActivity.status as MarketplaceStatus
  const type = apiDataLastActivity.type as OperationType
  const receiverAddress = apiDataLastActivity.receiver_address
  let price = apiDataExtend.price || 0
  const priceFromLastActivity = apiDataLastActivity.price

  const statusInProgress = [MarketplaceStatus.Pending, MarketplaceStatus.Created].includes(status as MarketplaceStatus)
  const typeBuyerInProgress = [OperationType.Buy].includes(type as OperationType)
  const typeSellerInProgress = [OperationType.Update, OperationType.Cancel].includes(type as OperationType)
  const typeOwnerInProgress = [OperationType.Sell].includes(type as OperationType)

  // if listed on marketplace: extend is always available and updated
  const isAssetOfOwnerDefault = !!walletAssets.find((a) => a.unit === asset)
  const isAssetOfOwnerInProgress = typeOwnerInProgress && statusInProgress && walletAddress === receiverAddress
  const isAssetOfSellerOnMarketplace = isSale && walletAddress === sellerAddress
  const isAssetOfSellerInProgress = typeSellerInProgress && statusInProgress && walletAddress === receiverAddress
  const isAssetOfBuyerOnMarketplace = isSale && walletAddress !== receiverAddress
  const isAssetOfBuyerInProgress =
    isSale && walletAddress === receiverAddress && typeBuyerInProgress && statusInProgress

  // Define context
  const isOwnerOfAsset = isAssetOfOwnerDefault || isAssetOfOwnerInProgress
  const isSellerOfAsset = isAssetOfSellerOnMarketplace || isAssetOfSellerInProgress
  const isBuyerOfAsset = isAssetOfBuyerOnMarketplace || isAssetOfBuyerInProgress
  const context = getContextType(isOwnerOfAsset, isSellerOfAsset, isBuyerOfAsset)

  if (isAssetOfSellerInProgress || isAssetOfOwnerInProgress) {
    price = priceFromLastActivity!
  }

  return {
    id,
    asset,
    context,
    price,
    sellerAddress,
    status,
    type,
  }
}
