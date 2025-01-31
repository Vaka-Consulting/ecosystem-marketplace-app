/**
 * This file contains interfaces and enums related to policy asset management
 * within the application.
 */

// export interface IClaimRepository {
//     fetchClaimsByStatus(status: CLAIM_STATUS): Promise<ClaimRequestType[]>;
//     updateClaims(claims: ClaimRequestType[]): Promise<ClaimRequestType[]>;
//     updateRewards(rewards: RewardType[]): Promise<RewardType[]>;
//   }

/**
 * Interface for processing policy asset sales.
 */
export interface IPolicyAssetsService {
  /**
   * Processes the sales of policy assets.
   * @returns A promise that resolves when the processing is complete.
   */
  processPolicyAssetsSales(): Promise<void>;
}

/**
 * Enum defining various statuses for sales transactions.
 * - CREATED: The sale has been created but not yet processed.
 * - PENDING: The sale is pending approval or action.
 * - ADA_EXPIRED: The ADA transaction has expired.
 * - INVALID: The sale is considered invalid.
 * - FAILED: The sale has failed for some reason.
 * - COMPLETED: The sale has been successfully completed.
 */
export enum SALES_STATUS {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  ADA_EXPIRED = 'ADA_EXPIRED',
  INVALID = 'INVALID',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

/**
 * Enum defining types of sales transactions.
 * - BUY: Represents a buy transaction.
 * - SELL: Represents a sell transaction.
 * - UPDATE: Represents an update to an existing transaction.
 * - CANCEL: Represents a cancellation of a transaction.
 */
export enum SALES_TYPE {
  BUY = 'BUY',
  SELL = 'SELL',
  UPDATE = 'UPDATE',
  CANCEL = 'CANCEL',
}

/**
 * Enum representing different Cardano network environments.
 * - TEST: The test network for development purposes.
 * - MAIN: The main network for live transactions.
 * - PREPROD: The pre-production network for staging.
 * - PREV: The preview network for testing new features.
 */
export enum CARDANO_NETWORK {
  TEST = 'testnet',
  MAIN = 'mainnet',
  PREPROD = 'preprod',
  PREV = 'preview',
}

/**
 * Interface for policy asset request structures.
 * - _id: Unique identifier for the policy asset.
 * - asset: The asset associated with the policy.
 * - policy_id: The ID of the related policy.
 * - asset_name: The name of the asset.
 */
export interface PolicyAssetsRequestType {
  _id: string;               
  asset?: string;            
  policy_id?: string;        
  asset_name?: string;       
}

/**
 * Interface for sales request structures related to policy assets.
 * - _id: Unique identifier for the sales request.
 * - type: The type of sales transaction (BUY, SELL, etc.).
 * - ada_transaction_hash: The transaction hash for the ADA transaction.
 * - ada_expiry: The expiry date for the ADA transaction.
 * - price: The price of the asset being sold.
 * - status: The current status of the sales transaction.
 * - receiver_address: The address of the receiver for the sale.
 * - policy_asset: The associated policy asset.
 */
export interface PolicyAssetsSalesRequestType {
  _id: string;                     
  type?: SALES_TYPE;              
  ada_transaction_hash?: string;   
  ada_expiry?: Date;              
  price?: number;               
  status?: SALES_STATUS;       
  receiver_address?: string;      
  policy_asset?: PolicyAssetsRequestType;
}

/**
 * Interface for extending policy asset sales.
 * - _id: Unique identifier for the extension request.
 * - price: The price for the extended sale.
 * - is_sale: Indicates if the request is for a sale.
 * - policy_asset: The associated policy asset.
 * - seller_address: The address of the seller for the asset.
 */
export interface PolicyAssetsExtendRequestType {
  _id: string;                      
  price?: number;              
  is_sale?: boolean;              
  policy_asset?: PolicyAssetsRequestType;
  seller_address?: string;       
}
