/**
 * This file configures the MikroORM settings for connecting to a MongoDB database using AWS IAM authentication. 
 * It loads necessary environment variables, constructs the database connection URI, 
 * and exports the configuration for use in the application.
 */

// Import necessary modules
// defineConfig: Function for defining the configuration for MikroORM.
// dotenv: Module for loading environment variables from a .env file.
import { defineConfig } from '@mikro-orm/mongodb';
import dotenv from 'dotenv'; 

// Load environment variables from .env file into process.env
dotenv.config(); 

// Fetching AWS credentials and database configuration from environment variables
// id: AWS access key ID, defaulting to an empty string if not set.
// secret: AWS secret access key, defaulting to an empty string if not set.
// token: AWS session token, defaulting to an empty string if not set.
// server: Database server name, defaulting to an empty string if not set.
// db: Database name, defaulting to 'amplifi' if not set.
const id = process.env.AWS_ACCESS_KEY_ID || '';
const secret = process.env.AWS_SECRET_ACCESS_KEY || '';
const token = process.env.AWS_SESSION_TOKEN || '';
const server = process.env.DB_SERVER_NAME || '';
const db = process.env.DB_NAME || 'amplifi';

// Constructing the AWS IAM connection URI for MongoDB
// AWS_IAM_URI: Connection URI for MongoDB using AWS IAM authentication.
const AWS_IAM_URI = `mongodb+srv://${encodeURIComponent(id)}:${encodeURIComponent(secret)}@${server}/${db}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(token)}`;

// clientUrl: Final MongoDB URI for connecting to the database, prioritizing DB_URI if available, otherwise using AWS_IAM_URI.
const clientUrl = (process.env.DB_URI || AWS_IAM_URI);

// Logging the connection URI to the console for debugging purposes
console.log(`Uri: ${clientUrl}`);

// Exporting the configuration for MikroORM
// Configuration object for MikroORM with the following properties:
// dbName: Name of the database to connect to ('explorer').
// clientUrl: Connection URI for the database.
// debug: Boolean indicating whether to enable debug mode (set to false).
// extensions: Array for any MikroORM extensions to register (currently empty).
export default defineConfig({
  dbName: 'explorer', // Database name
  clientUrl: clientUrl, // Connection URI
  debug: false, // Disable debug mode
  extensions: [], // Static register method for extensions
});
