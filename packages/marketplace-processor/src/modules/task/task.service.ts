import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PolicyAssetsService } from '../policy_assets';

@Injectable()
export class TasksService {
  constructor(private readonly policyAssetsService: PolicyAssetsService) {}

  @Cron(process.env.PROCESS_POLICY_ASSET_INTERVAL || '* * * * *')
  async processPolicyAssets() {
    await this.policyAssetsService.processPolicyAssetsSales();
  }
}
