import { Module } from '@nestjs/common';
import { TasksService } from '.';
import { PolicyAssetsModule } from '../policy_assets';

@Module({
  imports: [PolicyAssetsModule],
  providers: [TasksService],
})
export class TaskModule {}
