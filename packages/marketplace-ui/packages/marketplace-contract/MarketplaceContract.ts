import {
  BlockfrostProvider,
  MeshTxBuilder,
  parseAssetUnit,
  BrowserWallet,
  UTxO,
  mConStr0,
  resolvePaymentKeyHash,
  serializeAddressObj,
  deserializeDatum,
  mConStr1,
} from '@meshsdk/core'
import type { MarketplaceContract as MarketplaceContractModel } from './MarketplaceContract.model'
import {
  calcToLovelace,
  calcFeeAmount,
  calcSellerAmount,
  MarketplaceConfig,
  calcFromLovelace,
  LOVELACE_AMOUNT,
} from '@vakaconsulting/common-ui'
import { constructDatumData } from './MarketplaceContract.utils'

class MarketplaceContract implements MarketplaceContractModel {
  private wallet: BrowserWallet
  private readonly config: MarketplaceConfig
  private readonly provider: BlockfrostProvider

  constructor(config: MarketplaceConfig, provider: BlockfrostProvider, wallet: BrowserWallet) {
    this.config = config
    this.provider = provider
    this.wallet = wallet
  }

  private getTxBuilder() {
    return new MeshTxBuilder({
      fetcher: this.provider,
      submitter: this.provider,
      evaluator: this.provider,
    })
  }

  private async getUTxOs(providedUTxOsSrc: string | UTxO[] = [], asset?: string) {
    let utxos: UTxO[] = []

    if (typeof providedUTxOsSrc === 'string') {
      utxos = await this.provider.fetchAddressUTxOs(providedUTxOsSrc, asset)
    } else if (providedUTxOsSrc.length > 0) {
      if (asset) {
        utxos = providedUTxOsSrc.filter((u) => u.output.amount.find((a: any) => a.unit === asset))
      } else {
        utxos = providedUTxOsSrc
      }
    } else {
      throw new Error('No UTXOs or UTXOs source address provided to get UTxOs')
    }

    return utxos
  }

  private async getWalletInfo() {
    try {
      const utxos = await this.wallet.getUtxos()
      const walletAddress = await this.wallet.getUsedAddresses().then((addresses) => addresses[0])
      const stakeAddress = await this.wallet.getRewardAddresses().then((addresses) => addresses[0])
      const changeAddress = await this.wallet.getChangeAddress()
      const collateralUTxO = await this.wallet.getCollateral().then((utxos) => utxos[0])
      const networkId = await this.wallet.getNetworkId()

      if (!collateralUTxO) throw new Error('No collateral found in connected wallet. Please setup collateral first.')

      return {
        utxos,
        networkId,
        changeAddress,
        collateralUTxO,
        walletAddress,
        stakeAddress,
      }
    } catch (error) {
      throw error as Error
    }
  }

  public async list(asset: string, price: number) {
    try {
      // Get all required information
      const txBuilder = this.getTxBuilder()
      const { scriptAddress, network } = this.config
      const { policyId: assetPolicyId, assetName: assetAssetName } = parseAssetUnit(asset)
      const { utxos, stakeAddress, changeAddress, walletAddress: sellerAddress } = await this.getWalletInfo()
      const assetUTxO = await this.getUTxOs(utxos, asset).then((utxos) => utxos[0])
      const datumData = constructDatumData(+price, assetPolicyId, assetAssetName, sellerAddress, stakeAddress)

      // validate
      if (!assetUTxO) throw new Error('No asset UTxO found in users wallet')

      // build, sign & submit tx
      const unsignedTx = await txBuilder
        .setNetwork(network)
        .txIn(assetUTxO.input.txHash, assetUTxO.input.outputIndex)
        .txOut(scriptAddress, [{ unit: asset, quantity: '1' }])
        .txOutInlineDatumValue(JSON.stringify(datumData), 'JSON')
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete()

      const signedTx = await this.wallet.signTx(unsignedTx, false)
      return this.wallet.submitTx(signedTx)
    } catch (error) {
      throw error as Error
    }
  }

  public async buy(asset: string) {
    try {
      // Get all required information
      const {
        scriptAddress,
        feeOracleAddress,
        feeOracleAsset,
        protocolOwnerAddress,
        network,
        tokenAsset = 'lovelace',
      } = this.config
      const txBuilder = this.getTxBuilder()
      const {
        utxos,
        collateralUTxO,
        changeAddress,
        walletAddress: buyerAddress,
        networkId,
      } = await this.getWalletInfo()
      const assetUTxO = await this.getUTxOs(scriptAddress, asset).then((utxos) => utxos[0])
      const feeOracleAssetUTxO = await this.getUTxOs(feeOracleAddress, feeOracleAsset).then((utxos) => utxos[0])
      const scriptRefUTxO = await this.getUTxOs(scriptAddress).then((utxos) => utxos[0])
      const pubKeyHash = resolvePaymentKeyHash(buyerAddress)

      const inputDatum = deserializeDatum(assetUTxO.output.plutusData!)
      // const sellerInputLovelace = assetUTxO.output.amount.find((a) => a.unit === 'lovelace')!.quantity
      const sellerAddressObj = inputDatum.fields[1]
      const sellerAddress = serializeAddressObj(sellerAddressObj, networkId)

      const feeOracleDatum = deserializeDatum(feeOracleAssetUTxO.output.plutusData!)
      const feePercentage = calcFromLovelace(feeOracleDatum.int) * 100

      // calculate fee & seller amount
      const price = calcFromLovelace(inputDatum.fields[0].int)
      const sellerPriceLovelace = Math.round(calcToLovelace(calcSellerAmount(+price, feePercentage)))
      let feeAmountLovelace = Math.round(calcToLovelace(calcFeeAmount(+price, feePercentage)))

      if (feePercentage > 0 && feeAmountLovelace < LOVELACE_AMOUNT) {
        feeAmountLovelace = LOVELACE_AMOUNT // min amount = 1 ADA
      }

      // validate
      if (!assetUTxO) throw new Error('No asset UTxO found from script address')
      if (!scriptRefUTxO) throw new Error('No script reference UTxO found from script address')
      if (!feeOracleAssetUTxO) throw new Error('No fee oracle UTxO found from fee oracle address')

      // build, sign & submit tx
      const unsignedTx = await txBuilder
        .setNetwork(network)

        .spendingPlutusScriptV2()
        .txIn(assetUTxO.input.txHash, assetUTxO.input.outputIndex, assetUTxO.output.amount, assetUTxO.output.address)
        .txInInlineDatumPresent()
        .txInRedeemerValue(mConStr0([]))

        .spendingTxInReference(scriptRefUTxO.input.txHash, scriptRefUTxO.input.outputIndex)
        .readOnlyTxInReference(feeOracleAssetUTxO.input.txHash, feeOracleAssetUTxO.input.outputIndex) // REFERENCING ORACLE UTXO

        // buyer receives locked asset in script
        .txOut(buyerAddress, [{ unit: asset, quantity: '1' }])
        // seller gets amount minus fee from buyer
        .txOut(sellerAddress, [{ unit: tokenAsset, quantity: sellerPriceLovelace.toString() }])
        // protocol owner gets fee from seller
        .txOut(protocolOwnerAddress, [{ unit: tokenAsset, quantity: feeAmountLovelace.toString() }])

        .changeAddress(changeAddress)
        .txInCollateral(
          collateralUTxO.input.txHash,
          collateralUTxO.input.outputIndex,
          collateralUTxO.output.amount,
          collateralUTxO.output.address,
        )
        .selectUtxosFrom(utxos)
        .requiredSignerHash(pubKeyHash)
        .complete()

      const signedTx = await this.wallet.signTx(unsignedTx, true)
      return this.wallet.submitTx(signedTx)
    } catch (error) {
      throw error
    }
  }

  public async update(asset: string, price: number) {
    try {
      // Get all required information
      const { scriptAddress, network } = this.config
      const { policyId: assetPolicyId, assetName: assetAssetName } = parseAssetUnit(asset)
      const { utxos, collateralUTxO, changeAddress, walletAddress: sellerAddress } = await this.getWalletInfo()

      const txBuilder = this.getTxBuilder()
      const assetUTxO = await this.getUTxOs(scriptAddress, asset).then((utxos) => utxos[0])
      const scriptRefUTxO = await this.getUTxOs(scriptAddress).then((utxos) => utxos[0])
      const stakeAddress = await this.wallet.getRewardAddresses().then((addresses) => addresses[0])
      const pubKeyHash = resolvePaymentKeyHash(sellerAddress)
      const datumData = constructDatumData(+price, assetPolicyId, assetAssetName, sellerAddress, stakeAddress)

      // validate
      if (!assetUTxO) throw new Error('No asset UTxO found in script address')
      if (!scriptRefUTxO) throw new Error('No script reference UTxO found from script address')

      // build, sign & submit tx
      const unsignedTx = await txBuilder
        .setNetwork(network)
        .txInCollateral(collateralUTxO.input.txHash, collateralUTxO.input.outputIndex)
        .spendingPlutusScriptV2()
        .txIn(assetUTxO.input.txHash, assetUTxO.input.outputIndex)
        .txInInlineDatumPresent()
        .txInRedeemerValue(mConStr1([]))
        .spendingTxInReference(scriptRefUTxO.input.txHash, scriptRefUTxO.input.outputIndex)
        .txOut(scriptAddress, [{ unit: asset, quantity: '1' }])
        .txOutInlineDatumValue(JSON.stringify(datumData), 'JSON')
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .requiredSignerHash(pubKeyHash)
        .complete()
      const signedTx = await this.wallet.signTx(unsignedTx, true)
      const txHash = this.wallet.submitTx(signedTx)

      return txHash
    } catch (error) {
      throw error
    }
  }

  public async cancel(asset: string) {
    try {
      // setup
      const { scriptAddress, network } = this.config
      const txBuilder = this.getTxBuilder()
      const { utxos, collateralUTxO, changeAddress, walletAddress: sellerAddress } = await this.getWalletInfo()
      const assetUTxO = await this.getUTxOs(scriptAddress, asset).then((utxos) => utxos[0])
      const scriptRefUTxO = await this.getUTxOs(scriptAddress).then((utxos) => utxos[0])
      const pubKeyHash = resolvePaymentKeyHash(sellerAddress)

      // validate
      if (!assetUTxO) throw new Error('No asset found in script address')
      if (!scriptRefUTxO) throw new Error('No script reference UTxO found from script address')

      // build, sign & submit tx
      const unsignedTx = await txBuilder
        .setNetwork(network)
        .spendingPlutusScriptV2()
        .txIn(assetUTxO.input.txHash, assetUTxO.input.outputIndex)
        .txInInlineDatumPresent()
        .txInRedeemerValue(mConStr1([]))
        .spendingTxInReference(scriptRefUTxO.input.txHash, scriptRefUTxO.input.outputIndex)
        .changeAddress(changeAddress)
        .txInCollateral(
          collateralUTxO.input.txHash,
          collateralUTxO.input.outputIndex,
          collateralUTxO.output.amount,
          collateralUTxO.output.address,
        )
        .selectUtxosFrom(utxos)
        .requiredSignerHash(pubKeyHash)
        .complete()
      const signedTx = await this.wallet.signTx(unsignedTx)
      return await this.wallet.submitTx(signedTx)
    } catch (error) {
      throw error
    }
  }
}

export default MarketplaceContract
