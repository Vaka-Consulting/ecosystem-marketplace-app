/* 
 * Configuration for MikroORM 
 * This module sets up MikroORM to connect to a MongoDB database using credentials from environment variables.
 * It supports AWS IAM authentication for secure connections to the database.
 */

import { defineConfig } from '@mikro-orm/mongodb';  // Import the defineConfig function for MikroORM
import dotenv from 'dotenv';  // Import dotenv to manage environment variables

// Load environment variables from a .env file for local development
dotenv.config();  

// Initialize constants from environment variables, providing defaults if not set
const id = process.env.AWS_ACCESS_KEY_ID || '';  // AWS access key ID
const secret = process.env.AWS_SECRET_ACCESS_KEY || '';  // AWS secret access key
const token = process.env.AWS_SESSION_TOKEN || '';  // AWS session token for temporary credentials
const server = process.env.DB_SERVER_NAME || '';  // MongoDB server name
const db = process.env.DB_NAME || 'db_xxxx';  // Database name

// Construct the MongoDB connection URI for AWS IAM authentication
const AWS_IAM_URI = `mongodb+srv://${encodeURIComponent(id)}:${encodeURIComponent(secret)}@${server}/${db}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(token)}`;

// Use the provided DB_URI or fall back to the AWS_IAM_URI
const clientUrl = (process.env.DB_URI || AWS_IAM_URI);
console.log(`Uri: ${clientUrl}`);  // Log the connection URI for debugging purposes

// Export the MikroORM configuration
export default defineConfig({
  dbName: db,  // Specify the database name
  clientUrl: clientUrl,  // Set the client URL for the database connection
  debug: false,  // Disable debugging output
  extensions: [],  // Placeholder for any MikroORM extensions that may be registered
});

// export default option
