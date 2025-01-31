/**
 * This file serves as the entry point for the NestJS application.
 * It initializes the application by creating an instance of the AppModule
 * and starts the server on port 3005, allowing it to listen for incoming requests.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application.
 * This function performs the following tasks:
 * 1. Creates an instance of the NestJS application using the AppModule.
 * 2. Enables log buffering to capture logs before the application is fully initialized.
 * 3. Starts the application server and listens for incoming requests on port 3005.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  console.log("Refresh Interval: ", process.env.PROCESS_POLICY_ASSET_INTERVAL || "* * * * *")
  await app.listen(3005);
}

// Call the bootstrap function to initiate the application.
bootstrap();