/**
 * This schema defines the app_config collection for the marketplace application.
 * 
 * The MarketplaceAppConfig type includes essential configuration settings such as:
 * - protocol_owner_address: Address of the protocol owner.
 * - script_address: Address of the script associated with the marketplace.
 * - fee_oracle_address: Address of the fee oracle for transaction fees.
 * - fee_oracle_asset: The asset used for fee calculation.
 * 
 * The Query type provides a way to retrieve the current marketplace configuration.
 */

import gql from "graphql-tag";

export const appConfigDefs = gql`
  type MarketplaceAppConfig {
    protocol_owner_address: String!
    script_address: String!
    fee_oracle_address: String!
    fee_oracle_asset: String!
  }

  type Query {
    marketplace_config: MarketplaceAppConfig
  }
`