/**
 * This file defines the AppModule for the NestJS application.
 * It imports necessary modules for scheduling tasks, database connectivity,
 * configuration management, and custom modules, enabling the application to 
 * operate effectively and integrate with external services.
 */

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PolicyAssetsModule } from './modules/policy_assets';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './modules/task';

/**
 * Constructs the MongoDB connection URI using AWS IAM authentication.
 * This URI is built dynamically using environment variables to connect
 * securely to the MongoDB server with AWS credentials.
 */
const AWS_IAM_URI = `mongodb+srv://$${
  process.env.DB_SERVER_NAME
}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(
  process.env.AWS_SESSION_TOKEN,
)}`;
console.log(AWS_IAM_URI);

@Module({
  /**
   * The imports array contains:
   * - ScheduleModule: Initializes scheduling capabilities.
   * - ConfigModule: Loads environment variable configurations.
   * - MongooseModule: Connects to MongoDB using the provided URI.
   * - PolicyAssetsModule: Custom module for handling policy assets.
   */
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI || AWS_IAM_URI, {
      dbName: process.env.DB_NAME || 'marketplace_db',
      user: process.env.DB_USER || '',
      pass: process.env.DB_PASS || '',
    }),
    PolicyAssetsModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
