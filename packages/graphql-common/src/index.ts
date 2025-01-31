/**
 * This file imports various services, custom scalars, and common GraphQL type definitions.
 * It organizes these components into structured objects for easy access throughout the application.
 * Additionally, it exports the services, scalars, and common type definitions for use in other modules.
 */

// Import necessary services and modules
// BlockfrostService: Service for interacting with Blockfrost API
// AWSService: Service for AWS interactions
// connectToDatabase, db: Functions for connecting to the database
// commonTypeDefs: Common GraphQL type definitions
// DateTime: Custom DateTime scalar for handling date formatting
// QueryService: Query service for handling database queries
// InvalidStatusError: Custom error class for validation
import { BlockfrostService } from './services/blockfrost.service.js';
import { AWSService } from './services/aws.service.js';
import { connectToDatabase, db } from './services/database.service.js';
import { commonTypeDefs as common } from "./gql/common.gql.js";
import { DateTime } from "./scalars/datetime.js";
import * as QueryService from './services/query.service.js';
export { InvalidStatusError } from './validators/error.validator.js'; 

// Defining the structure of the services object
// AWSService: Instance for handling AWS-related operations and integrations.
// BlockfrostService: Instance for interacting with the Blockfrost API for blockchain-related tasks.
// DataBaseService: 
//   connectToDatabase: Function that establishes a connection to the database.
//   db: Database instance that provides access to the MongoDB database.
// QueryService: Collection of functions for building and executing database queries.
const services = {
    AWSService,
    BlockfrostService,
    DataBaseService: {
        connectToDatabase, 
        db 
    },
    QueryService: QueryService 
};

// Object to hold custom scalar types used in GraphQL schema
// DateTime: Custom scalar for formatting DateTime values in GraphQL queries and responses.
const scalars = {
    DateTime 
};

// Exporting services, scalars, and common type definitions for use in other parts of the application
// services: Object containing all the imported services for use throughout the application.
// scalars: Object holding all custom scalar types used in GraphQL schema.
// common: Common GraphQL type definitions to be used in the application's schema.
export {
    services,
    scalars, 
    common 
};
