/**
 * This is the resolver for fetching the `app_config` related to the marketplace configuration.
 * It interacts with the database to retrieve configuration settings for the marketplace.
 */

import { services } from "@vakaconsulting/graphql-commons";

/**
 * The `marketplace_config` function is an asynchronous resolver that fetches the marketplace 
 * configuration from the `app_config` collection in the database.
 * 
 * @param parent - The parent resolver result (if any), typically unused in this case.
 * @param args - The arguments passed to the query (if any).
 * @param contextValue - The context provided to every resolver, useful for authentication or access to services.
 * @param info - Information about the GraphQL schema and query (if needed).
 * 
 * @returns The marketplace configuration document from the `app_config` collection.
 */
const marketplace_config = async (
    parent: any,
    args: any,
    contextValue: any,
    info: any
  ) => {
    // Access the database service to interact with the database
    const database = await services.DataBaseService.db();

    // Access the "app_config" collection from the database
    const coll = await database.collection("app_config");

    // Fetch and return the document where the name is "marketplace-config"
    return coll.findOne({ name: "marketplace-config" });
  };

/**
 * Exporting the query resolvers.
 * The `marketplace_config` query can be used in the GraphQL schema to fetch marketplace configuration data.
 */
export const queries = { marketplace_config };
