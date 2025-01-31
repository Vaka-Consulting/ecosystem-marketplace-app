/**
 * Policy Assets Schemas Export Module
 * 
 * This module re-exports the schemas defined for the policy assets 
 * domain, allowing them to be easily imported in other parts of the 
 * application. The following schemas are included:
 * 
 * - `PolicyAssets`: Defines the structure of policy assets.
 * - `PolicyAssetsSales`: Represents the sales transactions of policy 
 *   assets, including transaction details and status.
 * - `PolicyAssetsExtend`: Captures additional attributes associated 
 *   with policy assets, such as pricing and seller information.
 * 
 * This modular approach promotes better organization and reusability 
 * of the schemas across the application.
 */

export * from './policy_assets.schema';
export * from './policy_assets_sales.schema';
export * from './policy_assets_extends.schema';
