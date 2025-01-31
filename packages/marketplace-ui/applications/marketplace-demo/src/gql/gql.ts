/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query MarketplaceConfig {\n    marketplace_config {\n      protocol_owner_address\n      script_address\n      fee_oracle_address\n      fee_oracle_asset\n      # fee_percentage\n      # token_asset\n    }\n  }\n": types.MarketplaceConfigDocument,
    "\n  fragment PolicyAssetPart on PolicyAsset {\n    _id\n    asset\n    asset_name\n    policy_id\n    fingerprint\n    onchain_metadata {\n      name\n      image\n      description\n      files {\n        src\n      }\n    }\n    extend {\n      price\n    }\n  }\n": types.PolicyAssetPartFragmentDoc,
    "\n  query SinglePolicyAsset($id: String) {\n    policy_assets(limit: 1, and: [{ key: \"asset\", value: $id, operator: EQUALS }]) {\n      results {\n        ...PolicyAssetPart\n      }\n    }\n  }\n": types.SinglePolicyAssetDocument,
    "\n  query PolicyAssetActivity($and: [WhereInput]) {\n    policy_assets(and: $and, limit: 1) {\n      results {\n        _id\n        asset\n        extend {\n          price\n          is_sale\n          seller_address\n        }\n        last_activity {\n          status\n          type\n          price\n          receiver_address\n        }\n      }\n    }\n  }\n": types.PolicyAssetActivityDocument,
    "\n  mutation InsertPolicyAssetActivity(\n    $price: Float!\n    $type: String!\n    $receiverAddress: String!\n    $adaTransactionHash: String!\n    $policyAsset: GraphQLObjectId!\n  ) {\n    insert_activity(\n      price: $price\n      type: $type\n      receiver_address: $receiverAddress\n      ada_transaction_hash: $adaTransactionHash\n      policy_asset: $policyAsset\n    ) {\n      status\n    }\n  }\n": types.InsertPolicyAssetActivityDocument,
    "\n  query PolicyAssetsIds($policyIds: [String]) {\n    policy_assets(limit: 100, and: [{ key: \"policy_id\", values: $policyIds, operator: IN }]) {\n      results {\n        asset\n      }\n    }\n  }\n": types.PolicyAssetsIdsDocument,
    "\n  query PolicyAssets($and: [WhereInput], $or: [WhereInput], $limit: Int, $page: Int) {\n    policy_assets(and: $and, or: $or, limit: $limit, page: $page) {\n      total\n      results {\n        ...PolicyAssetPart\n      }\n    }\n  }\n": types.PolicyAssetsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MarketplaceConfig {\n    marketplace_config {\n      protocol_owner_address\n      script_address\n      fee_oracle_address\n      fee_oracle_asset\n      # fee_percentage\n      # token_asset\n    }\n  }\n"): (typeof documents)["\n  query MarketplaceConfig {\n    marketplace_config {\n      protocol_owner_address\n      script_address\n      fee_oracle_address\n      fee_oracle_asset\n      # fee_percentage\n      # token_asset\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PolicyAssetPart on PolicyAsset {\n    _id\n    asset\n    asset_name\n    policy_id\n    fingerprint\n    onchain_metadata {\n      name\n      image\n      description\n      files {\n        src\n      }\n    }\n    extend {\n      price\n    }\n  }\n"): (typeof documents)["\n  fragment PolicyAssetPart on PolicyAsset {\n    _id\n    asset\n    asset_name\n    policy_id\n    fingerprint\n    onchain_metadata {\n      name\n      image\n      description\n      files {\n        src\n      }\n    }\n    extend {\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SinglePolicyAsset($id: String) {\n    policy_assets(limit: 1, and: [{ key: \"asset\", value: $id, operator: EQUALS }]) {\n      results {\n        ...PolicyAssetPart\n      }\n    }\n  }\n"): (typeof documents)["\n  query SinglePolicyAsset($id: String) {\n    policy_assets(limit: 1, and: [{ key: \"asset\", value: $id, operator: EQUALS }]) {\n      results {\n        ...PolicyAssetPart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PolicyAssetActivity($and: [WhereInput]) {\n    policy_assets(and: $and, limit: 1) {\n      results {\n        _id\n        asset\n        extend {\n          price\n          is_sale\n          seller_address\n        }\n        last_activity {\n          status\n          type\n          price\n          receiver_address\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PolicyAssetActivity($and: [WhereInput]) {\n    policy_assets(and: $and, limit: 1) {\n      results {\n        _id\n        asset\n        extend {\n          price\n          is_sale\n          seller_address\n        }\n        last_activity {\n          status\n          type\n          price\n          receiver_address\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertPolicyAssetActivity(\n    $price: Float!\n    $type: String!\n    $receiverAddress: String!\n    $adaTransactionHash: String!\n    $policyAsset: GraphQLObjectId!\n  ) {\n    insert_activity(\n      price: $price\n      type: $type\n      receiver_address: $receiverAddress\n      ada_transaction_hash: $adaTransactionHash\n      policy_asset: $policyAsset\n    ) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation InsertPolicyAssetActivity(\n    $price: Float!\n    $type: String!\n    $receiverAddress: String!\n    $adaTransactionHash: String!\n    $policyAsset: GraphQLObjectId!\n  ) {\n    insert_activity(\n      price: $price\n      type: $type\n      receiver_address: $receiverAddress\n      ada_transaction_hash: $adaTransactionHash\n      policy_asset: $policyAsset\n    ) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PolicyAssetsIds($policyIds: [String]) {\n    policy_assets(limit: 100, and: [{ key: \"policy_id\", values: $policyIds, operator: IN }]) {\n      results {\n        asset\n      }\n    }\n  }\n"): (typeof documents)["\n  query PolicyAssetsIds($policyIds: [String]) {\n    policy_assets(limit: 100, and: [{ key: \"policy_id\", values: $policyIds, operator: IN }]) {\n      results {\n        asset\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PolicyAssets($and: [WhereInput], $or: [WhereInput], $limit: Int, $page: Int) {\n    policy_assets(and: $and, or: $or, limit: $limit, page: $page) {\n      total\n      results {\n        ...PolicyAssetPart\n      }\n    }\n  }\n"): (typeof documents)["\n  query PolicyAssets($and: [WhereInput], $or: [WhereInput], $limit: Int, $page: Int) {\n    policy_assets(and: $and, or: $or, limit: $limit, page: $page) {\n      total\n      results {\n        ...PolicyAssetPart\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;