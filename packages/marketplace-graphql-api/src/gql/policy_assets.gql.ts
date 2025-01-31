/**
 * This schema defines the structure for policy_assets, policy_assets_activities, 
 * and policy_assets_extend collections within the application.
 */
import gql from "graphql-tag";

export const policyAssetsTypeDefs = gql`
  # The PolicyAssetResponse type includes:
  # - results: An array of PolicyAsset objects.
  # - total: Total number of PolicyAsset objects available.

  type PolicyAssetResponse {
    results: [PolicyAsset]!
    total: Int!
  }

  # The PolicyAssetMetadataFile type represents metadata files associated with policy assets, including:
  # - src: The source URL of the file.
  # - name: The name of the file.
  # - mediaType: The MIME type of the file.

  type PolicyAssetMetadataFile {
    src: String
    name: String
    mediaType: String
  }
  
  # The PolicyAssetOnChainMetadata type contains on-chain metadata for policy assets, including:
  # - name, files, image, mediaType, description, cardanoPhase, continent, privilegeLevel, empValue, and characteristics.

  type PolicyAssetOnChainMetadata {
    name: String
    files: [PolicyAssetMetadataFile]
    image: String
    mediaType: String
    description: String
    cardanoPhase: String
    continent: String
    privilegeLevel: String
    empValue: String
    characteristics: String
  }

  # The PolicyAssetActivities type captures activities related to policy assets, including:
  # - policy_asset: The associated PolicyAsset.
  # - ada_transaction_hash: Transaction hash in ADA.
  # - price, status, ada_expiry, policy_id, type, asset_name, and receiver_address.

  type PolicyAssetActivities {
    policy_asset: PolicyAsset!
    ada_transaction_hash: String
    price: Float
    status: String
    ada_expiry: DateTime!
    policy_id: String
    type: String
    asset_name: String
    receiver_address: String
  }

  # The PolicyAssetExtend type provides extension details for policy assets, including:
  # - seller_address, policy_asset, is_sale, and price.

  type PolicyAssetExtend {
    _id: GraphQLObjectId!
    seller_address: String
    policy_asset: PolicyAsset!
    is_sale: Boolean!
    price: Float
  }

  # The PolicyAsset type encompasses core details of policy assets, including:
  # - mint_or_burn_count, asset, policy_id, asset_name, fingerprint, quantity, onchain_metadata, extend, and last_activity.

  type PolicyAsset {
    _id: GraphQLObjectId!
    mint_or_burn_count: Int
    asset: String
    policy_id: String
    asset_name: String
    fingerprint: String
    quantity: String
    onchain_metadata: PolicyAssetOnChainMetadata
    extend: [PolicyAssetExtend!]
    last_activity: PolicyAssetActivities
  }

  # The Query type allows fetching policy assets with pagination, sorting, and filtering options.
  type Query {
    policy_assets(
      page: Int = 0
      limit: Int = 10
      and: [WhereInput]
      sort: [SortInput] = [{
        by: "extend.price"
        type: DESC
      },{
        by: "activities.ada_expiry"
        type: DESC
      }]
      or: [WhereInput]
    ): PolicyAssetResponse
  }
          
  # The Mutation type enables inserting new activities related to policy assets.
  type Mutation {
    insert_activity(
      price: Float!
      type: String!
      receiver_address: String!
      ada_transaction_hash: String!
      policy_asset: GraphQLObjectId!
    ): PolicyAssetActivities
  }
`;
