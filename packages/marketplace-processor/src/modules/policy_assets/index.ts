/**
 * Policy Assets Barrel Export
 * 
 * This file serves as a barrel for exporting the components related to 
 * policy assets in the application. It consolidates exports for models, 
 * repositories, services, and modules, allowing for easier and cleaner 
 * imports in other parts of the application.
 * 
 * Exports:
 * - PolicyAssetsModel: The data models related to policy assets.
 * - PolicyAssetsRepository: The repository responsible for data access 
 *   and manipulation of policy assets.
 * - PolicyAssetsService: The service that contains business logic for 
 *   handling policy assets.
 * - PolicyAssetsModule: The module that encapsulates all components 
 *   related to policy assets, including controllers and providers.
 */

export * from './policy_assets.model';
export * from './policy_assets.repository';
export * from './policy_assets.service';
export * from './policy_assets.module';
