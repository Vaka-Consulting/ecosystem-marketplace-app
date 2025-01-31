/**
 * This is the resolver for policy_assets-related collections.
 * It handles queries related to policy assets, including fetching assets, activities, and extensions, 
 * as well as inserting new activities.
 */

import { services } from '@empowa-tech/graphql-common';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

const { buildMatchQuery, buildSortQuery } = services.QueryService;

/**
 * The `policy_assets` function is a resolver that handles the fetching of policy assets.
 * It joins `policy_assets_extend` and `policy_assets_activities` collections, groups and sorts by 
 * the latest activity, and returns the required assets with pagination and sorting.
 * 
 * @param parent - The parent resolver result (if any), typically unused in this case.
 * @param args - The arguments passed to the query (e.g., `limit`, `page`, filters).
 * @param contextValue - The context provided to every resolver, useful for authentication or access to services.
 * @param info - Information about the GraphQL schema and query (if needed).
 * 
 * @returns An array of policy assets, with associated metadata, activities, and extensions.
 */
const policy_assets = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  console.log(`Limit: ${args.limit} Page: ${args.page}`);
  try {
    // Join policy_assets_extend collection
    const extends_join = [
      {
        $lookup: {
          from: "policy_assets_extend",
          localField: "_id",
          foreignField: "policy_asset",
          as: "extend",
        },
      },
    ];

    // Join policy_assets_activities collection, group, and sort by the latest activity
    const activities_join = [
      {
        $lookup: {
          from: "policy_assets_activities",
          localField: "_id",
          foreignField: "policy_asset",
          as: "activities",
        },
      },
      { $unwind: { path: "$activities", preserveNullAndEmptyArrays: true } },
      { $sort: { "activities.ada_expiry": -1 } },
      {
        $group: {
          _id: "$_id",
          asset: { $first: "$asset" },
          policy_id: { $first: "$policy_id" },
          asset_name: { $first: "$asset_name" },
          fingerprint: { $first: "$fingerprint" },
          quantity: { $first: "$quantity" },
          initial_mint_tx_hash: { $first: "$initial_mint_tx_hash" },
          mint_or_burn_count: { $first: "$mint_or_burn_count" },
          onchain_metadata: { $first: "$onchain_metadata" },
          onchain_metadata_standard: { $first: "$onchain_metadata_standard" },
          metadata: { $first: "$metadata" },
          properties: { $first: "$properties" },
          last_activity: { $first: "$activities" },
        },
      },
    ];

    // Build query pipelines, including joins and match queries
    const pipelines = [
      ...activities_join, // Join policy_assets_activities and get the latest one
      ...extends_join,    // Join policy_assets_extend to get sale info and price
      buildMatchQuery(args),
    ].filter((f) => Object.keys(f).length > 0);

    return pipelines;
  } catch (e) {
    console.error(e);
    return e;
  }
};

/**
 * The `query` function is a helper that builds and executes the aggregation pipeline to query policy assets.
 * It supports pagination, sorting, and facet queries for efficient fetching.
 * 
 * @param collection - The MongoDB collection to query.
 * @param func - The function to build the query pipeline.
 * @param parent - Parent resolver (if any).
 * @param args - Query arguments like pagination and filters.
 * @param contextValue - GraphQL context (if any).
 * @param info - GraphQL query information.
 * 
 * @returns An object containing the results and total number of matching documents.
 */
const query = async (
  collection: string,
  func: any,
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const database = await services.DataBaseService.db();
  const coll = await database.collection(collection);
  
  // Build the aggregation pipeline
  const pipelines = [
    ...await func(parent, args, contextValue, info),
    buildSortQuery(args),  // Default sorting by ada_expiry in descending order
    {
      $facet: {
        "results": [{ $skip: args.page * args.limit }, { $limit: args.limit }],
        "total": [{ $count: 'total' }]
      }
    }
  ];

  console.log("Pipeline: ", JSON.stringify(pipelines, null, 2));

  const data = (await coll?.aggregate(pipelines).toArray() as [any])[0];
  const results = data ? data["results"] : [];
  const total = data && data["total"].length > 0 ? data["total"][0]["total"] : 0;

  return { results, total };
};

/**
 * The `policy_asset` function fetches a specific policy asset by its `_id`.
 * 
 * @param id - The ObjectId of the policy asset.
 * 
 * @returns The policy asset document.
 */
export const policy_asset = async (id: ObjectId) => {
  const database = await services.DataBaseService.db();
  const collection = await database.collection("policy_assets");
  return await collection?.findOne({ _id: id });
};

/**
 * Other resolvers to handle nested relationships between policy assets and their extensions, metadata, and activities.
 */
export const otherResolvers = {
  PolicyAssetExtend: {
    async policy_asset(parent: any) {
      return await policy_asset(parent.policy_asset);
    }
  },
  PolicyAssetOnChainMetadata: {
    characteristics(parent: any) {
      return "characteristic(s)" in parent ? parent["characteristic(s)"] : null;
    }
  },
  PolicyAssetActivities: {
    async policy_asset(parent: any) {
      return await policy_asset(parent.policy_asset);
    }
  }
};

/**
 * The `insert_activity` mutation inserts a new activity into the `policy_assets_activities` collection.
 * It checks if the provided `policy_asset` exists before inserting the activity.
 * 
 * @param parent - Parent resolver (if any).
 * @param args - Arguments for the mutation (e.g., `price`, `type`, `receiver_address`, etc.).
 * @param contextValue - GraphQL context (if any).
 * @param info - GraphQL query information (if needed).
 * 
 * @returns The inserted activity document.
 */
export const mutations = {
  insert_activity: async (parent: any, args: any, contextValue: any, info: any) => {
    console.log(args);

    const insert_data = { ...args, status: "CREATED" };
    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours from now
    insert_data["ada_expiry"] = expiryTime;

    const database = await services.DataBaseService.db();
    const policy_assets_col = await database.collection("policy_assets");
    
    const existingPolicyAsset = await policy_assets_col.findOne({ _id: insert_data.policy_asset });
    
    if (existingPolicyAsset && existingPolicyAsset._id) {
      const coll = await database.collection("policy_assets_activities");
      await coll.insertOne(insert_data);
      return insert_data;
    } else {
      throw new GraphQLError("Invalid policy asset provided");
    }
  }
};

/**
 * Exporting the query and mutation resolvers.
 * The `policy_assets` query allows fetching policy assets with pagination, filtering, and sorting.
 */
export const resolvers = {
  policy_assets: async (parent: any, args: any, contextValue: any, info: any) =>
    query("policy_assets", policy_assets, parent, args, contextValue, info),
};
