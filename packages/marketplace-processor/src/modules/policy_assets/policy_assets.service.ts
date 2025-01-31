/**
 * PolicyAssetsService Class
 * 
 * This class handles the processing of policy asset sales within the application. 
 * It interfaces with the BlockFrost API to check transaction statuses and manage 
 * the sales status of policy assets. The service fetches policy assets by status, 
 * updates their statuses based on expiration and confirmation checks, and manages 
 * their validity throughout the sales process.
 */

import { Injectable } from '@nestjs/common';
import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import {
  CARDANO_NETWORK,
  IPolicyAssetsService,
  PolicyAssetsSalesRequestType,
  SALES_STATUS,
} from './policy_assets.model';
import { PolicyAssetsRepository } from './policy_assets.repository';
import { CardanoNetwork } from '@blockfrost/blockfrost-js/lib/types';

/* eslint-disable @typescript-eslint/no-var-requires */

@Injectable()
export class PolicyAssetsService implements IPolicyAssetsService {
  private readonly blockfrost = new BlockFrostAPI({
    projectId: process.env.BLOCKFROST_PROJECT_ID || '',
    network: (process.env.BLOCKFROST_CARDANO_NETWORK ||
      CARDANO_NETWORK.PREPROD) as CardanoNetwork,
  });

  constructor(private readonly repo: PolicyAssetsRepository) {}

  /**
   * Processes policy asset sales by fetching their current status,
   * updating the status of expired assets, filtering out non-expired 
   * assets, checking for transaction confirmations, and updating 
   * the status of valid assets.
   * 
   * @returns {Promise<void>} A promise that resolves when the processing is complete.
   */
  async processPolicyAssetsSales(): Promise<void> {
    console.log('Processing Policy Assets Sales ========');
    const data = await this.repo.fetchPolicyAssetsSalesByStatus([
      SALES_STATUS.CREATED,
      SALES_STATUS.PENDING,
    ]);
    console.log('Data:', data);

    if (data.length == 0) {
      console.log('Data Length:', data.length);
      return; // Exit if no data to process
    }

    // Update status for expired assets
    const expired = data
      .filter((f) => new Date().getTime() > f.ada_expiry.getTime())
      .map((m) => {
        m.status = SALES_STATUS.ADA_EXPIRED;
        return m;
      });
    console.log('Total Expired Length:', expired.length);
    this.repo.updatePolicyAssetsSalesStatus(expired);

    // Update status for invalid and valid assets
    const updated_data = await this.updateActivityStatus(data);
    let valids = updated_data.filter((f) => f.status == SALES_STATUS.PENDING);
    const invalids = data.filter((m) => m.status == SALES_STATUS.INVALID);
    console.log('Total Invalids:', invalids.length);
    console.log('Total Valids:', valids.length);
    this.repo.updatePolicyAssetsSalesStatus(invalids);

    // Process only valid assets
    if (valids.length == 0) {
      return; // Exit if no valid assets
    }

    // Check for transaction confirmations and update status
    valids = await this.checkForConfirmation(valids);
    console.log('Final Data:', valids);
    this.repo.updatePolicyAssetsSalesStatus(valids);
  }

  /**
   * Updates the activity status of policy asset sales by checking 
   * the validity of transactions through the BlockFrost API.
   * 
   * @param {PolicyAssetsSalesRequestType[]} activities - An array of policy asset sales request types.
   * @returns {Promise<PolicyAssetsSalesRequestType[]>} - A promise that resolves to an array 
   * of updated policy asset sales request types.
   */
  private async updateActivityStatus(
    activities: PolicyAssetsSalesRequestType[],
  ): Promise<PolicyAssetsSalesRequestType[]> {
    return await Promise.all(
      activities.map(async (activity) => {
        const policy_asset = activity.policy_asset;
        const valid = true;
        let isValidTx = false;

        // Check transaction validity using BlockFrost API
        try {
          const tx = await this.blockfrost.txs(activity.ada_transaction_hash);
          console.log('Checking Tx:', activity.ada_transaction_hash);
          if (tx && tx.hash == activity.ada_transaction_hash) {
            isValidTx = true; // Transaction is valid
          }
        } catch (e) {
          console.log('Exception; ', e); // Handle exceptions
        }

        // Update status based on transaction validity
        if (isValidTx && !valid) {
          activity.status = SALES_STATUS.INVALID; // Mark as invalid if conditions are met
        } else if (isValidTx && valid) {
          activity.status = SALES_STATUS.PENDING; // Mark as pending if valid
        }
        return activity;
      }),
    );
  }

  /**
   * Checks the confirmation status of transactions for the given 
   * array of policy asset sales request types using the BlockFrost API.
   * 
   * @param {PolicyAssetsSalesRequestType[]} data - An array of policy asset sales request types.
   * @returns {Promise<PolicyAssetsSalesRequestType[]>} - A promise that resolves to an array 
   * of updated policy asset sales request types based on confirmation status.
   */
  private checkForConfirmation(
    data: PolicyAssetsSalesRequestType[],
  ): Promise<PolicyAssetsSalesRequestType[]> {
    return Promise.all(
      data.map(async (f) => {
        try {
          const tx = await this.blockfrost.txs(f.ada_transaction_hash);
          const block = await this.blockfrost.blocks(tx.block);
          console.log(
            'Block confirm: ' +
              block.confirmations +
              ' , hash: ' +
              f.ada_transaction_hash,
          );
          // Update status based on the number of confirmations
          f.status =
            block && block.confirmations > 3
              ? SALES_STATUS.COMPLETED // Mark as completed if confirmations exceed threshold
              : SALES_STATUS.PENDING; // Otherwise, keep as pending
        } catch (e) {
          console.log('Error: ', e); // Handle errors
          f.status = SALES_STATUS.PENDING; // Mark as pending on error
        }
        return f;
      }),
    );
  }
}
