/**
 * This class sets up a Dependency Injection (DI) structure 
 * that centralizes various services and an ORM for easy access 
 * throughout the application.
 *
 * The `DependencyInjection` interface defines the services and objects
 * to be injected, allowing different parts of the system to access 
 * the ORM, Entity Manager, AWS services, and Blockfrost services.
 */

import { EntityManager, MikroORM } from "@mikro-orm/core";
import { services } from "@vakaconsulting/graphql-commons";

/**
 * The `DependencyInjection` interface defines the contract for 
 * dependency injection. It includes the following members:
 * 
 * - `orm`: An instance of the MikroORM, used for managing database connections and ORM functionality.
 * - `em`: An instance of EntityManager, used for interacting with entities and the database.
 * - `awsService`: A reference to the AWSService class, used for AWS-related operations.
 * - `blockfrostService`: A reference to the BlockfrostService class, used for Cardano blockchain operations via Blockfrost API.
 */
export interface DependencyInjection {
    orm: MikroORM,
    em: EntityManager,
    awsService: typeof services.AWSService,
    blockfrostService: typeof services.BlockfrostService
}
