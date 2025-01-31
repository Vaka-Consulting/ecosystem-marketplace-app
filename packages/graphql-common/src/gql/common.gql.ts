/**
 * Common GraphQL scalars and types 
 */

// Importing gql from graphql-tag for defining GraphQL schemas
import gql from "graphql-tag"; 

// Common type definitions for GraphQL, including scalar types, enums, and input types
export const commonTypeDefs = gql`
  # Scalar types representing common data types
  # - GraphQLObjectId: Represents a MongoDB ObjectId
  # - DateTime: Represents date and time
  scalar GraphQLObjectId 
  scalar DateTime       

  # Enumeration for various operation types used in filtering queries
  # - EQUALS: Equality check
  # - GREATER_THAN: Greater than check
  # - GREATER_THAN_EQUALS: Greater than or equal check
  # - LESS_THAN: Less than check
  # - LESS_THAN_EQUALS: Less than or equal check
  # - IN: Check if value is in a set
  # - REGEX_MATCH: Regular expression match
  # - SEARCH: Search operation
  enum OperationType {
    EQUALS
    GREATER_THAN
    GREATER_THAN_EQUALS
    LESS_THAN
    LESS_THAN_EQUALS
    IN
    REGEX_MATCH
    SEARCH
  }

  # Enumeration for sorting types in queries
  # - ASC: Ascending order
  # - DESC: Descending order
  enum SortType {
    ASC
    DESC
  }

  # Input type for filtering queries based on key, value, and operator
  # - key: Field to filter on
  # - value: Value to match against the key
  # - values: Array of values for multi-value matches
  # - operator: Operator for comparison (required)
  input WhereInput {
    key: String        
    value: String      
    values: [String]   
    operator: OperationType!
  }
  
  # Input type for specifying sorting parameters in queries
  # - by: Field by which to sort
  # - type: Type of sorting (ascending or descending)
  input SortInput {
    by: String         
    type: SortType     
  }
`;
