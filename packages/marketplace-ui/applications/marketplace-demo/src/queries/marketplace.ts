import { DocumentNode } from 'graphql/language'
import { graphql } from '@/gql'

export const MARKETPLACE_CONFIG_QUERY = graphql(/* GraphQL */ `
  query MarketplaceConfig {
    marketplace_config {
      protocol_owner_address
      script_address
      fee_oracle_address
      fee_oracle_asset
      # fee_percentage
      # token_asset
    }
  }
`) as DocumentNode
