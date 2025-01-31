/**
 * PolicyAssetsController
 * 
 * This controller handles incoming HTTP requests related to policy assets. 
 * It defines routes for processing policy asset sales based on their status. 
 * The controller interacts with the PolicyAssetsService to perform the 
 * necessary business logic and returns responses to the client.
 */

import { Controller, Get, Param } from '@nestjs/common';
import { PolicyAssetsService } from './policy_assets.service';

@Controller('policy_assets')
export class PolicyAssetsController {
  constructor(private readonly service: PolicyAssetsService) {}

  /**
   * Handles GET requests to process NFT sales based on the provided status.
   * The status is extracted from the URL parameters and passed to the service 
   * for processing policy asset sales.
   * 
   * @param {string} status - The status of the NFT sales to be processed.
   * @returns {any} - An object containing the status passed in the request.
   */
  @Get('sales/:status')
  processNFTSalesByStatus(@Param('status') status: string): any {
    this.service.processPolicyAssetsSales();
    return { status };
  }
}
