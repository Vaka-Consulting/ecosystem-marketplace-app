import { graphql } from '@/gql'

export const POLICY_ASSETS_FIELDS_FRAGMENT = graphql(/* GraphQL */ `
  fragment PolicyAssetPart on PolicyAsset {
    _id
    asset
    asset_name
    policy_id
    fingerprint
    onchain_metadata {
      name
      image
      description
      files {
        src
      }
    }
    extend {
      price
    }
  }
`)

export const SINGLE_POLICY_ASSET_QUERY = graphql(/* GraphQL */ `
  query SinglePolicyAsset($id: String) {
    policy_assets(limit: 1, and: [{ key: "asset", value: $id, operator: EQUALS }]) {
      results {
        ...PolicyAssetPart
      }
    }
  }
`)

export const SINGLE_POLICY_ASSET_ACTIVITY_QUERY = graphql(/* GraphQL */ `
  query PolicyAssetActivity($and: [WhereInput]) {
    policy_assets(and: $and, limit: 1) {
      results {
        _id
        asset
        extend {
          price
          is_sale
          seller_address
        }
        last_activity {
          status
          type
          price
          receiver_address
        }
      }
    }
  }
`)

export const SINGLE_POLICY_ASSET_ACTIVITY_MUTATION = graphql(/* GraphQL */ `
  mutation InsertPolicyAssetActivity(
    $price: Float!
    $type: String!
    $receiverAddress: String!
    $adaTransactionHash: String!
    $policyAsset: GraphQLObjectId!
  ) {
    insert_activity(
      price: $price
      type: $type
      receiver_address: $receiverAddress
      ada_transaction_hash: $adaTransactionHash
      policy_asset: $policyAsset
    ) {
      status
    }
  }
`)

export const POLICY_ASSETS_IDS_QUERY = graphql(/* GraphQL */ `
  query PolicyAssetsIds($policyIds: [String]) {
    policy_assets(limit: 100, and: [{ key: "policy_id", values: $policyIds, operator: IN }]) {
      results {
        asset
      }
    }
  }
`)

export const POLICY_ASSETS_QUERY = graphql(/* GraphQL */ `
  query PolicyAssets($and: [WhereInput], $or: [WhereInput], $limit: Int, $page: Int) {
    policy_assets(and: $and, or: $or, limit: $limit, page: $page) {
      total
      results {
        ...PolicyAssetPart
      }
    }
  }
`)
