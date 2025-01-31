import { db } from "../services/database.service.js";

// Enum representing different operator types for filtering queries.
export enum OperatorType {
  EQUALS = "EQUALS",
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_EQUALS = "GREATER_THAN_EQUALS",
  LESS_THAN = "LESS_THAN",
  LESS_THAN_EQUALS = "LESS_THAN_EQUALS",
  IN = "IN",
  REGEX_MATCH = "REGEX_MATCH",
  SEARCH = "SEARCH",
}

// Enum representing the sort order types.
export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

// Interface defining the structure for where conditions in a query.
// Parameters:
// - key: string;         // The key to filter by.
// - value?: string;      // A single value for comparison (optional).
// - values?: string[];   // An array of values for comparison (optional).
// - operator: OperatorType; // The operator to use for comparison.
export interface WhereInput {
  key: string;
  value?: string;
  values?: string[];
  operator: OperatorType;
}

// Interface defining the structure for sorting conditions in a query.
// Parameters:
// - by: string;          // The field to sort by.
// - type: SortType;      // The sort order (ascending or descending).
export interface SortInput {
  by: string;
  type: SortType;
}

// Interface defining the arguments for the query, including pagination, filters, and sorting.
// Parameters:
// - limit: number;      // The maximum number of results to return.
// - page: number;       // The page number for pagination.
// - and: WhereInput[];  // An array of where conditions for AND logic.
// - or: WhereInput[];   // An array of where conditions for OR logic.
// - sort: SortInput[];  // An array of sorting conditions.
export interface Args {
  limit: number;
  page: number;
  and: WhereInput[];
  or: WhereInput[];
  sort: SortInput[];
}

/**
 * Processes a WhereInput to return a MongoDB-compatible condition.
 * @param {WhereInput} where - The WhereInput object containing the filtering condition.
 * @returns An object representing the MongoDB condition or null if invalid.
 */
export function processWhereInput(where: WhereInput) {
  const operatorValue = processOperator(where); // Process the operator to get the value.
  console.log(`Operator value: ${JSON.stringify(operatorValue, null, 2)}`);
  
  if (operatorValue == null) {
    return null; // Return null if no valid operator value is found.
  }
  
  return { [where.key]: operatorValue }; // Return the condition object.
}

/**
 * Executes a MongoDB query against the specified collection.
 * @param {string} collection - The name of the collection to query.
 * @param {Function} func - A function to generate additional query pipelines.
 * @param {any} parent - Parent context (if needed).
 * @param {Args} args - Arguments containing pagination, filters, and sorting.
 * @param {any} contextValue - Context value (if needed).
 * @param {any} info - Information about the query.
 * @returns An object containing the results and total count of the query.
 */
export const query = async (
  collection: string,
  func: any,
  parent: any,
  args: Args,
  contextValue: any,
  info: any
) => {
  const database = await db(); // Get the database connection.
  const coll = await database.collection(collection); // Access the specified collection.
  
  // Calculate pagination conditions
  const skipCondition = args.page && args.limit ? { $skip: args.page * args.limit } : { $skip: 0 };
  const limitCondition = args.limit ? { $limit: args.limit } : {};
  
  const pipelines = [
    ...(await func(parent, args, contextValue, info)), // Generate additional pipelines.
    buildSortQuery(args), // Build the sort query based on args.
    {
      $facet: { // Use $facet to create separate pipelines for results and total count.
        results: [skipCondition, limitCondition].filter(
          (f) => Object.keys(f).length > 0
        ),
        total: [{ $count: "total" }],
      },
    },
  ].filter((f) => Object.keys(f).length > 0);
  
  console.log("Pipeline: ", JSON.stringify(pipelines, null, 2));
  
  const data = ((await coll?.aggregate(pipelines).toArray()) as [any])[0]; // Execute the aggregation pipeline.
  
  const results = data ? data["results"] : []; // Extract results.
  const total = data && data["total"].length > 0 ? data["total"][0]["total"] : 0; // Get the total count.

  return { results, total }; // Return the results and total count.
}

/**
 * Processes the operator in a WhereInput to return the corresponding MongoDB condition.
 * @param {WhereInput} where - The WhereInput object containing the filtering condition.
 * @returns An object representing the MongoDB operator condition or null if invalid.
 */
function processOperator(where: WhereInput) {
  let value = where.value; // Get the initial value.
  
  // Try to parse the value if it's a string representation of a JSON.
  try {
    value = where.value ? JSON.parse(where.value.toLowerCase()) : where.value;
  } catch (_) {
    console.log();
  }

  // Convert values to numbers if they can be parsed as numbers.
  const values = where.values ? where?.values.map(m => +m ? +m : m) : null;

  // Return the appropriate MongoDB condition based on the operator.
  switch (where.operator) {
    case OperatorType.EQUALS:
      return { $eq: value };
    case OperatorType.GREATER_THAN:
      return { $gt: value };
    case OperatorType.GREATER_THAN_EQUALS:
      return { $gte: value };
    case OperatorType.LESS_THAN:
      return { $lt: value };
    case OperatorType.LESS_THAN_EQUALS:
      return { $lte: value };
    case OperatorType.IN:
      return { $in: values };
    case OperatorType.REGEX_MATCH:
      return { $regex: String(value) };
    default:
      return null; // Return null if the operator is not recognized.
  }
}

/**
 * Constructs a MongoDB match query based on the provided arguments.
 * @param {Args} args - The `args` parameter contains filters for the query.
 * @returns An object with the $match operator containing conditions based on `args`.
 */
export function buildMatchQuery(args: Args) {
  const conditions = {} as any; // Initialize an empty conditions object.
  
  // Process AND conditions if they exist.
  if (args.and && args.and.length > 0) {
    conditions["$and"] = args.and
      .map((f) => processWhereInput(f)) // Process each WhereInput.
      .filter((f) => f != null); // Filter out nulls.
  }
  
  // Process OR conditions if they exist.
  if (args.or && args.or.length > 0) {
    conditions["$or"] = args.or
      .map((f) => processWhereInput(f)) // Process each WhereInput.
      .filter((f) => f != null); // Filter out nulls.
  }

  // Return the match object if there are conditions; otherwise, return an empty object.
  return Object.keys(conditions).filter((f) => conditions[f].length > 0)
    .length > 0
    ? { $match: conditions }
    : {};
}

/**
 * Constructs a MongoDB sort query based on the provided sorting conditions.
 * @param {Args} args - The `args` parameter contains sorting instructions.
 * @returns A sort query object or an empty object if no sorting conditions are provided.
 */
export function buildSortQuery(args: Args) {
  let sortCondition = {}; // Initialize an empty sort condition object.
  
  // Process sorting conditions if they exist.
  if (args.sort && args.sort.length > 0) {
    args.sort.forEach((s) => {
      sortCondition = Object.assign(sortCondition, {
        [s.by]: s.type == SortType.ASC ? 1 : -1, // Assign sort direction based on type.
      });
    });
  }
  
  // Return the sort condition if any sorting is defined; otherwise, return an empty object.
  return Object.keys(sortCondition).length > 0 ? { $sort: sortCondition } : {};
}
