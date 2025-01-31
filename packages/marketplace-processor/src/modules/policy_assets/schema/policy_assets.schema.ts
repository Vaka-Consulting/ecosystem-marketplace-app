/**
 * Policy Assets Schema Definition
 * 
 * This file defines the Mongoose schema for the `PolicyAssets` 
 * collection in the database. It utilizes decorators from 
 * `@nestjs/mongoose` to define the structure of the policy assets 
 * documents.
 * 
 * The `PolicyAssets` class represents the structure of a single 
 * policy asset, including:
 * - `policy_id`: A unique identifier for the policy.
 * - `asset_name`: The name of the asset associated with the policy.
 * - `asset`: Additional details or representation of the asset.
 * 
 * Exports:
 * - `PolicyAssetsDocument`: A type that combines the `PolicyAssets` 
 *   class with Mongoose's `Document` interface for type safety.
 * - `PolicyAssetsSchema`: The Mongoose schema created from the 
 *   `PolicyAssets` class for use in the application.
 */

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

@Schema({ collection: 'policy_assets' })
export class PolicyAssets {
  @Prop({ type: MongooseSchema.Types.String })
  policy_id;

  @Prop({ type: MongooseSchema.Types.String })
  asset_name;

  @Prop({ type: MongooseSchema.Types.String })
  asset;
}

export type PolicyAssetsDocument = PolicyAssets & Document;
export const PolicyAssetsSchema = SchemaFactory.createForClass(PolicyAssets);
