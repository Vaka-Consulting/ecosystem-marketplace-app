/* 
 * Main module to import and organize GraphQL resolvers and type definitions 
 * for the application. This file consolidates resolvers and schema definitions 
 * for various parts of the application, making it easier to manage and export them 
 * for use in the Apollo Server.
 */

import * as PolicyAssetResolvers from './resolvers/policy_assets';  // Import resolvers for policy assets
import * as AppConfigResolvers from './resolvers/app_config';  // Import resolvers for app configuration
import * as AppConfigGql from './gql/app_config.gql';  // Import GraphQL schema definitions for app configuration
import * as PolicyAssetsGql from './gql/policy_assets.gql';  // Import GraphQL schema definitions for policy assets

// Consolidate resolvers into a single object
const resolvers = {
    appConfig: AppConfigResolvers,  // Assign app config resolvers
    policyAssets: PolicyAssetResolvers  // Assign policy assets resolvers
}; 

// Consolidate GraphQL type definitions into a single object
const gql = {
    appConfigDefs: AppConfigGql.appConfigDefs,  // Assign app config type definitions
    policyAssetsTypeDefs: PolicyAssetsGql.policyAssetsTypeDefs  // Assign policy assets type definitions
};

// Export the resolvers and type definitions for use in the Apollo Server setup
export {
    gql,
    resolvers
};
