/**
 * PolicyAssetsModule
 * 
 * This module is responsible for managing policy assets within the application. 
 * It imports necessary schemas for policy asset sales, extensions, and general 
 * policy assets, and sets up the Mongoose connection for these models. The 
 * module also defines the controllers and services that handle the business logic 
 * related to policy assets, allowing for clean organization and separation of concerns.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongooseUniqueValidator from 'mongoose-unique-validator';
import { PolicyAssetsController } from './policy_assets.controller';
import {
  PolicyAssetsSales,
  PolicyAssetsSalesSchema,
  PolicyAssetsExtend,
  PolicyAssetsExtendSchema,
  PolicyAssets,
  PolicyAssetsSchema,
} from './schema';
import { PolicyAssetsService } from './policy_assets.service';
import { PolicyAssetsRepository } from './policy_assets.repository';

@Module({
  imports: [
    // Import Mongoose module for feature and define schemas with unique validation
    MongooseModule.forFeature([
      {
        name: PolicyAssetsSales.name,
        schema: PolicyAssetsSalesSchema.plugin(mongooseUniqueValidator),
      },
      {
        name: PolicyAssetsExtend.name,
        schema: PolicyAssetsExtendSchema.plugin(mongooseUniqueValidator),
      },
      {
        name: PolicyAssets.name,
        schema: PolicyAssetsSchema.plugin(mongooseUniqueValidator),
      },
    ]),
  ],
  // Define the controller responsible for handling incoming requests
  controllers: [PolicyAssetsController],
  // Provide the necessary services and repository for business logic
  providers: [PolicyAssetsService, PolicyAssetsRepository],
  // Export PolicyAssetsService for use in other modules
  exports: [PolicyAssetsService],
})
export class PolicyAssetsModule {}
