
/* This is the base Graphql Server with all specs and configuration */

import { scalars } from "@vakaconsulting/graphql-commons";
import { ApolloServer } from "@apollo/server";
import * as dotenv from "dotenv";
import { GraphQLObjectId } from "graphql-objectid-scalar";
import {
  resolvers as PolicyAssetsResolvers,
  mutations as PolicyAssetsMutations,
  otherResolvers as PolicyAssetsOtherResolvers,
} from "./resolvers/policy_assets.js";
import {
  queries as AppConfigQueries
} from './resolvers/app_config.js'
import { common } from "@vakaconsulting/graphql-commons"; 
import { policyAssetsTypeDefs } from "./gql/policy_assets.gql.js";
import { appConfigDefs } from "./gql/app_config.gql.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  applyDirectivesToSchema,
  range
} from '@profusion/apollo-validation-directives';

// Locally loading .env
dotenv.config();

// for TypeScript
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Resolvers
const resolvers = {
  Query: {
    ...PolicyAssetsResolvers,
    ...AppConfigQueries,
  },
  Mutation: {
    ...PolicyAssetsMutations,
  },
  ...PolicyAssetsOtherResolvers,
  GraphQLObjectId: GraphQLObjectId,
  DateTime: scalars.DateTime,
};

// Definitions
const typeDefs = [
  ...range.getTypeDefs(),
  common,
  policyAssetsTypeDefs,
  appConfigDefs,
];

const schema = applyDirectivesToSchema(
  [range],
  makeExecutableSchema({typeDefs,resolvers})
);

export const server = new ApolloServer({
  schema
});
