/**
 * Policy Assets Sales Schema Definition
 * 
 * This file defines the Mongoose schema for the `PolicyAssetsSales` 
 * collection in the database. It utilizes decorators from 
 * `@nestjs/mongoose` to outline the structure of the policy asset sales 
 * documents.
 * 
 * The `PolicyAssetsSales` class represents a sales transaction 
 * related to policy assets, including:
 * - `ada_transaction_hash`: The unique hash of the ADA transaction 
 *   (required field).
 * - `ada_expiry`: The expiry date for the ADA transaction.
 * - `price`: The price associated with the sale.
 * - `type`: The type of sale (e.g., auction, sale).
 * - `status`: The current status of the sale (e.g., pending, completed).
 * - `policy_asset`: A reference to the associated `PolicyAssets` 
 *   document.
 * - `receiver_address`: The address of the receiver involved in the 
 *   transaction.
 * - `test`: A boolean field to indicate if the transaction is a test 
 *   transaction.
 * 
 * Exports:
 * - `PolicyAssetsSalesDocument`: A type that combines the 
 *   `PolicyAssetsSales` class with Mongoose's `Document` interface for 
 *   type safety.
 * - `PolicyAssetsSalesSchema`: The Mongoose schema created from the 
 *   `PolicyAssetsSales` class, including a pre-hook to populate the 
 *   `policy_asset` reference on `find` operations.
 */

import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, Types } from 'mongoose';
import { PolicyAssets } from './policy_assets.schema';

@Schema({ collection: 'policy_assets_activities' })
export class PolicyAssetsSales {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  ada_transaction_hash: string;

  @Prop({ type: MongooseSchema.Types.Date })
  ada_expiry;

  @Prop({ type: MongooseSchema.Types.Number })
  price: number;

  @Prop({ type: MongooseSchema.Types.String })
  type: string;

  @Prop({ type: MongooseSchema.Types.String })
  status: string;

  @Prop({ type: Types.ObjectId, ref: PolicyAssets.name })
  policy_asset: PolicyAssets;

  @Prop({ type: MongooseSchema.Types.String })
  receiver_address;

  @Prop({ type: MongooseSchema.Types.Boolean })
  test: boolean;
}

export type PolicyAssetsSalesDocument = PolicyAssetsSales & Document;
export const PolicyAssetsSalesSchema = SchemaFactory.createForClass(
  PolicyAssetsSales,
).pre('find', function (next) {
  this.populate('policy_asset');
  next();
});
