/* 
 * Dev Server Startup
 * 
 * This script initializes and starts an Apollo Server in standalone mode. It uses the Apollo Server package 
 * to set up a GraphQL API server, configure the environment, and listen for requests on a specified port.
 * 
 * Steps:
 * 1. Load environment variables using the `dotenv` package.
 * 2. Import and configure the GraphQL `server` module.
 * 3. Start the server using the `startStandaloneServer` method from Apollo.
 * 4. Listen on port 9001 for incoming requests.
 * 5. Log the server's URL to the console when the server is ready.
 */

import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { server } from "./server.js";  // Importing the pre-configured Apollo Server

// Load environment variables from a .env file into process.env
dotenv.config();

// Start the standalone server with the specified port (9001)
const { url } = await startStandaloneServer(server, {
  listen: { port: 9001 },
});

// Log the URL where the server is accessible
console.log(`🚀  Server ready at: ${url}`);
