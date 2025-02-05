import { resolvePaymentKeyHash, resolveStakeKeyHash, pubKeyAddress } from '@meshsdk/core'
import { calcToLovelace } from '@vakaconsulting/common-ui'

export const constructDatumData = (
  price: number,
  policyId: string,
  assetName: string,
  receiverAddress: string,
  stakeAddress?: string,
): any => {
  const pubKeyHash = resolvePaymentKeyHash(receiverAddress)
  const stakeKeyHash = stakeAddress ? resolveStakeKeyHash(stakeAddress) : undefined

  return {
    constructor: 0,
    fields: [
      { int: calcToLovelace(price) },
      pubKeyAddress(pubKeyHash, stakeKeyHash),
      { bytes: policyId },
      { bytes: assetName },
    ],
  }
}
