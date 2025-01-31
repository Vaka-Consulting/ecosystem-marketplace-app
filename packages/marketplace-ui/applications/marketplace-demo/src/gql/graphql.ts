/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** DateTime is a MongoDB Datetime in ISO format */
  DateTime: { input: any; output: any; }
  /** GraphQLObjectId is a mongodb ObjectId. String of 12 or 24 hex chars */
  GraphQLObjectId: { input: any; output: any; }
};

export type MarketplaceAppConfig = {
  __typename?: 'MarketplaceAppConfig';
  fee_oracle_address: Scalars['String']['output'];
  fee_oracle_asset: Scalars['String']['output'];
  protocol_owner_address: Scalars['String']['output'];
  script_address: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  insert_activity?: Maybe<PolicyAssetActivities>;
};


export type MutationInsertActivityArgs = {
  ada_transaction_hash: Scalars['String']['input'];
  policy_asset: Scalars['GraphQLObjectId']['input'];
  price: Scalars['Float']['input'];
  receiver_address: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export enum OperationType {
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanEquals = 'GREATER_THAN_EQUALS',
  In = 'IN',
  LessThan = 'LESS_THAN',
  LessThanEquals = 'LESS_THAN_EQUALS',
  RegexMatch = 'REGEX_MATCH',
  Search = 'SEARCH'
}

export type PolicyAsset = {
  __typename?: 'PolicyAsset';
  _id: Scalars['GraphQLObjectId']['output'];
  asset?: Maybe<Scalars['String']['output']>;
  asset_name?: Maybe<Scalars['String']['output']>;
  extend?: Maybe<Array<PolicyAssetExtend>>;
  fingerprint?: Maybe<Scalars['String']['output']>;
  last_activity?: Maybe<PolicyAssetActivities>;
  mint_or_burn_count?: Maybe<Scalars['Int']['output']>;
  onchain_metadata?: Maybe<PolicyAssetOnChainMetadata>;
  policy_id?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
};

export type PolicyAssetActivities = {
  __typename?: 'PolicyAssetActivities';
  ada_expiry: Scalars['DateTime']['output'];
  ada_transaction_hash?: Maybe<Scalars['String']['output']>;
  asset_name?: Maybe<Scalars['String']['output']>;
  policy_asset: PolicyAsset;
  policy_id?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  receiver_address?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PolicyAssetExtend = {
  __typename?: 'PolicyAssetExtend';
  _id: Scalars['GraphQLObjectId']['output'];
  is_sale: Scalars['Boolean']['output'];
  policy_asset: PolicyAsset;
  price?: Maybe<Scalars['Float']['output']>;
  seller_address?: Maybe<Scalars['String']['output']>;
};

export type PolicyAssetMetadataFile = {
  __typename?: 'PolicyAssetMetadataFile';
  mediaType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
};

export type PolicyAssetOnChainMetadata = {
  __typename?: 'PolicyAssetOnChainMetadata';
  cardanoPhase?: Maybe<Scalars['String']['output']>;
  characteristics?: Maybe<Scalars['String']['output']>;
  continent?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  empValue?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<Maybe<PolicyAssetMetadataFile>>>;
  image?: Maybe<Scalars['String']['output']>;
  mediaType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  privilegeLevel?: Maybe<Scalars['String']['output']>;
};

export type PolicyAssetResponse = {
  __typename?: 'PolicyAssetResponse';
  results: Array<Maybe<PolicyAsset>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  marketplace_config?: Maybe<MarketplaceAppConfig>;
  policy_assets?: Maybe<PolicyAssetResponse>;
};


export type QueryPolicyAssetsArgs = {
  and?: InputMaybe<Array<InputMaybe<WhereInput>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  or?: InputMaybe<Array<InputMaybe<WhereInput>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SortInput>>>;
};

export enum RangeValidateDirectivePolicy {
  /** Field resolver is responsible to evaluate it using `validationErrors` injected in GraphQLResolverInfo */
  Resolver = 'RESOLVER',
  /** Field resolver is not called if occurs a validation error, it throws `UserInputError` */
  Throw = 'THROW'
}

export type SortInput = {
  by?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SortType>;
};

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type WhereInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  operator: OperationType;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MarketplaceConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketplaceConfigQuery = { __typename?: 'Query', marketplace_config?: { __typename?: 'MarketplaceAppConfig', protocol_owner_address: string, script_address: string, fee_oracle_address: string, fee_oracle_asset: string } | null };

export type PolicyAssetPartFragment = { __typename?: 'PolicyAsset', _id: any, asset?: string | null, asset_name?: string | null, policy_id?: string | null, fingerprint?: string | null, onchain_metadata?: { __typename?: 'PolicyAssetOnChainMetadata', name?: string | null, image?: string | null, description?: string | null, files?: Array<{ __typename?: 'PolicyAssetMetadataFile', src?: string | null } | null> | null } | null, extend?: Array<{ __typename?: 'PolicyAssetExtend', price?: number | null }> | null } & { ' $fragmentName'?: 'PolicyAssetPartFragment' };

export type SinglePolicyAssetQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type SinglePolicyAssetQuery = { __typename?: 'Query', policy_assets?: { __typename?: 'PolicyAssetResponse', results: Array<(
      { __typename?: 'PolicyAsset' }
      & { ' $fragmentRefs'?: { 'PolicyAssetPartFragment': PolicyAssetPartFragment } }
    ) | null> } | null };

export type PolicyAssetActivityQueryVariables = Exact<{
  and?: InputMaybe<Array<InputMaybe<WhereInput>> | InputMaybe<WhereInput>>;
}>;


export type PolicyAssetActivityQuery = { __typename?: 'Query', policy_assets?: { __typename?: 'PolicyAssetResponse', results: Array<{ __typename?: 'PolicyAsset', _id: any, asset?: string | null, extend?: Array<{ __typename?: 'PolicyAssetExtend', price?: number | null, is_sale: boolean, seller_address?: string | null }> | null, last_activity?: { __typename?: 'PolicyAssetActivities', status?: string | null, type?: string | null, price?: number | null, receiver_address?: string | null } | null } | null> } | null };

export type InsertPolicyAssetActivityMutationVariables = Exact<{
  price: Scalars['Float']['input'];
  type: Scalars['String']['input'];
  receiverAddress: Scalars['String']['input'];
  adaTransactionHash: Scalars['String']['input'];
  policyAsset: Scalars['GraphQLObjectId']['input'];
}>;


export type InsertPolicyAssetActivityMutation = { __typename?: 'Mutation', insert_activity?: { __typename?: 'PolicyAssetActivities', status?: string | null } | null };

export type PolicyAssetsIdsQueryVariables = Exact<{
  policyIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type PolicyAssetsIdsQuery = { __typename?: 'Query', policy_assets?: { __typename?: 'PolicyAssetResponse', results: Array<{ __typename?: 'PolicyAsset', asset?: string | null } | null> } | null };

export type PolicyAssetsQueryVariables = Exact<{
  and?: InputMaybe<Array<InputMaybe<WhereInput>> | InputMaybe<WhereInput>>;
  or?: InputMaybe<Array<InputMaybe<WhereInput>> | InputMaybe<WhereInput>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PolicyAssetsQuery = { __typename?: 'Query', policy_assets?: { __typename?: 'PolicyAssetResponse', total: number, results: Array<(
      { __typename?: 'PolicyAsset' }
      & { ' $fragmentRefs'?: { 'PolicyAssetPartFragment': PolicyAssetPartFragment } }
    ) | null> } | null };

export const PolicyAssetPartFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyAssetPart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"asset_name"}},{"kind":"Field","name":{"kind":"Name","value":"policy_id"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"onchain_metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"extend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<PolicyAssetPartFragment, unknown>;
export const MarketplaceConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketplaceConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketplace_config"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"protocol_owner_address"}},{"kind":"Field","name":{"kind":"Name","value":"script_address"}},{"kind":"Field","name":{"kind":"Name","value":"fee_oracle_address"}},{"kind":"Field","name":{"kind":"Name","value":"fee_oracle_asset"}}]}}]}}]} as unknown as DocumentNode<MarketplaceConfigQuery, MarketplaceConfigQueryVariables>;
export const SinglePolicyAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SinglePolicyAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy_assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"asset","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"EQUALS"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyAssetPart"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyAssetPart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"asset_name"}},{"kind":"Field","name":{"kind":"Name","value":"policy_id"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"onchain_metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"extend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<SinglePolicyAssetQuery, SinglePolicyAssetQueryVariables>;
export const PolicyAssetActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PolicyAssetActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"and"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy_assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"and"},"value":{"kind":"Variable","name":{"kind":"Name","value":"and"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"extend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"is_sale"}},{"kind":"Field","name":{"kind":"Name","value":"seller_address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"last_activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_address"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PolicyAssetActivityQuery, PolicyAssetActivityQueryVariables>;
export const InsertPolicyAssetActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPolicyAssetActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adaTransactionHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyAsset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GraphQLObjectId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_activity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiver_address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"ada_transaction_hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adaTransactionHash"}}},{"kind":"Argument","name":{"kind":"Name","value":"policy_asset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyAsset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<InsertPolicyAssetActivityMutation, InsertPolicyAssetActivityMutationVariables>;
export const PolicyAssetsIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PolicyAssetsIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy_assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"policy_id","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"IN"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"}}]}}]}}]}}]} as unknown as DocumentNode<PolicyAssetsIdsQuery, PolicyAssetsIdsQueryVariables>;
export const PolicyAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PolicyAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"and"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"or"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy_assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"and"},"value":{"kind":"Variable","name":{"kind":"Name","value":"and"}}},{"kind":"Argument","name":{"kind":"Name","value":"or"},"value":{"kind":"Variable","name":{"kind":"Name","value":"or"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyAssetPart"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyAssetPart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"asset_name"}},{"kind":"Field","name":{"kind":"Name","value":"policy_id"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"onchain_metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"extend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<PolicyAssetsQuery, PolicyAssetsQueryVariables>;