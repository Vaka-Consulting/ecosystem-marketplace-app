/* 
 * Apollo Server setup with AWS Lambda integration 
 * This module exports a GraphQL handler that can be used in an AWS Lambda function.
 * It leverages the Apollo Server with support for API Gateway Proxy events.
 */

import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';  // Import necessary functions from AWS Lambda integration package
import { server } from './server.js';  // Import the configured Apollo Server instance

// Create and export a GraphQL handler for AWS Lambda using the Apollo Server
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,  // Pass in the Apollo Server instance
  // Specify the use of the Proxy V2 handler for API Gateway
  handlers.createAPIGatewayProxyEventV2RequestHandler(),  
);
