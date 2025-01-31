/**
 * PolicyAssetsRepository Class
 * 
 * This class is responsible for managing policy assets within the application. 
 * It provides methods to fetch policy asset sales by their status, update 
 * the sales status in bulk, and insert or update related extensions for 
 * policy assets. It interacts with MongoDB models for storing and retrieving 
 * policy asset data and ensures data integrity during updates.
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  PolicyAssetsExtendRequestType,
  PolicyAssetsSalesRequestType,
  SALES_STATUS,
  SALES_TYPE,
} from './policy_assets.model';
import {
  PolicyAssets,
  PolicyAssetsDocument,
  PolicyAssetsSales,
  PolicyAssetsSalesDocument,
} from './schema';
import {
  PolicyAssetsExtendDocument,
  PolicyAssetsExtend,
} from './schema/policy_assets_extends.schema';

/**
 * Repository for managing policy assets, including sales and extensions.
 */
@Injectable()
export class PolicyAssetsRepository {
  constructor(
    @InjectModel(PolicyAssets.name)
    private policyAssetsModel: Model<PolicyAssetsDocument>,
    @InjectModel(PolicyAssetsSales.name)
    private policyAssetsSalesModel: Model<PolicyAssetsSalesDocument>,
    @InjectModel(PolicyAssetsExtend.name)
    private policyAssetsExtendModel: Model<PolicyAssetsExtendDocument>,
  ) {}

  /**
   * Fetches policy asset sales filtered by their status.
   * Modifies the `ada_transaction_hash` if the environment is set to local.
   * 
   * @param {SALES_STATUS[]} statuses - An array of statuses to filter the sales.
   * @returns {Promise<PolicyAssetsSalesRequestType[]>} - A promise that resolves to an array of 
   * policy asset sales request types.
   */
  async fetchPolicyAssetsSalesByStatus(
    statuses: SALES_STATUS[],
  ): Promise<PolicyAssetsSalesRequestType[]> {
    const isLocal = process.env.IS_LOCAL == 'true'; // Check if the environment is local
    const options = {
      status: { $in: statuses }, // Set filter options for the query
    };
    if (isLocal) {
      options['test'] = true; // Additional condition for local testing
    }
    console.log('Options: ', options);
    
    // Fetch policy asset sales from the database
    const policyAssetsSales = await this.policyAssetsSalesModel.find(options);

    return policyAssetsSales.map((m) => {
      if (isLocal) {
        // Modify ADA transaction hash for local environment
        m.ada_transaction_hash = m.ada_transaction_hash.substring(
          0,
          m.ada_transaction_hash.length - 1,
        );
      }
      return m;
    }) as unknown as PolicyAssetsSalesRequestType[]; // Return modified sales records
  }

  /**
   * Updates the sales status of policy assets in bulk based on provided records.
   * 
   * @param {PolicyAssetsSalesRequestType[]} records - An array of policy assets sales request types.
   * @returns {Promise<PolicyAssetsSalesRequestType[]>} - A promise that resolves to an array of 
   * updated policy assets sales request types.
   */
  async updatePolicyAssetsSalesStatus(
    records: PolicyAssetsSalesRequestType[],
  ): Promise<PolicyAssetsSalesRequestType[]> {
    if (records.length == 0) {
      return; // Return if no records to update
    }
    
    const query: any[] = []; // Prepare bulk write query
    records.forEach((r) => {
      query.push({
        updateOne: {
          filter: { _id: r._id }, // Find by policy asset ID
          update: {
            status: r.status, // Update status
          },
        },
      });
    });
    
    // Perform bulk write operation to update sales statuses
    const updated = await this.policyAssetsSalesModel.bulkWrite(query);
    this.upsertPolicyAssetsExtend(records); // Update or insert related extensions
    return updated.result.upserted as unknown as PolicyAssetsSalesRequestType[]; // Return updated records
  }

  /**
   * Inserts or updates the extensions for policy assets based on the provided records.
   * 
   * @param {PolicyAssetsSalesRequestType[]} records - An array of policy assets sales request types.
   * @returns {Promise<PolicyAssetsExtendRequestType[]>} - A promise that resolves to an array of 
   * updated or inserted policy assets extend request types.
   */
  private async upsertPolicyAssetsExtend(
    records: PolicyAssetsSalesRequestType[],
  ) {
    const query: any[] = []; // Prepare bulk write query for extensions
    const validRecords = records.filter(
      (f) => f.status == SALES_STATUS.COMPLETED, // Filter records that are completed
    );
    
    // Fetch existing extensions for the valid records
    const existing_matched_records = (
      await Promise.all(
        validRecords.map(
          async (r) =>
            await this.policyAssetsExtendModel.findOne({
              policy_asset: r.policy_asset._id, // Find by policy asset ID
            }),
        ),
      )
    ).filter((f) => f != null); // Filter out null records

    validRecords.forEach((r) => {
      // For each valid record, check for an existing matched record
      const record = existing_matched_records.find(
        (f) => f.policy_asset._id.toString() == r.policy_asset._id.toString(),
      );
      const is_sale = r.type == SALES_TYPE.SELL || r.type == SALES_TYPE.UPDATE; // Determine if it is a sale
      const seller_address = is_sale ? r.receiver_address : null; // Get seller address if applicable
      const price = is_sale ? r.price : null; // Get price if applicable

      // Prepare upsert query for existing or new extensions
      query.push(
        record != null && record.id
          ? {
              updateOne: {
                filter: { _id: record._id }, // Update existing record
                update: {
                  price,
                  is_sale,
                  seller_address,
                },
              },
            }
          : {
              insertOne: {
                document: <PolicyAssetsExtendDocument>{
                  policy_asset: r.policy_asset._id, // Insert new record
                  price,
                  is_sale,
                  seller_address,
                },
              },
            },
      );
    });
    
    console.log('Query:', JSON.stringify(query, null)); // Log the query for debugging
    
    // Perform bulk write operation to upsert extensions
    const inserted = await this.policyAssetsExtendModel.bulkWrite(query);
    return inserted as unknown as PolicyAssetsExtendRequestType[]; // Return upserted records
  }
}
