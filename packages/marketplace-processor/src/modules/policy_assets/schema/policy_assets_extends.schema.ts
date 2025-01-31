/**
 * Policy Assets Extend Schema Definition
 * 
 * This file defines the Mongoose schema for the `PolicyAssetsExtend` 
 * collection in the database. It utilizes decorators from 
 * `@nestjs/mongoose` to outline the structure of the policy asset 
 * extensions.
 * 
 * The `PolicyAssetsExtend` class represents additional attributes 
 * associated with policy assets, including:
 * - `price`: The price of the policy asset.
 * - `policy_asset`: A reference to the associated `PolicyAssets` 
 *   document (as an ObjectId).
 * - `is_sale`: A boolean indicating whether the asset is for sale.
 * - `seller_address`: The address of the seller involved in the 
 *   transaction.
 * 
 * Exports:
 * - `PolicyAssetsExtendDocument`: A type that combines the 
 *   `PolicyAssetsExtend` class with Mongoose's `Document` interface for 
 *   type safety.
 * - `PolicyAssetsExtendSchema`: The Mongoose schema created from the 
 *   `PolicyAssetsExtend` class, including a pre-hook to populate the 
 *   `policy_asset` reference on `find` operations.
 */

import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

@Schema({ collection: 'policy_assets_extend' })
export class PolicyAssetsExtend {
  @Prop({ type: MongooseSchema.Types.Number })
  price;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  policy_asset;

  @Prop({ type: MongooseSchema.Types.Boolean })
  is_sale;

  @Prop({ type: MongooseSchema.Types.String })
  seller_address;
}

export type PolicyAssetsExtendDocument = PolicyAssetsExtend & Document;
export const PolicyAssetsExtendSchema = SchemaFactory.createForClass(
  PolicyAssetsExtend,
).pre('find', function (next) {
  this.populate('policy_asset');
  next();
});
