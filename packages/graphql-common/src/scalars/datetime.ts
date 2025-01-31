// Importing GraphQLScalarType from the graphql package for defining custom scalars
import { GraphQLScalarType } from "graphql";

// Defining a custom DateTime scalar for handling MongoDB DateTime in ISO format.
// This includes the following fields:
// - name: Specifies the name of the scalar.
// - description: Describes the purpose of this scalar.
// - serialize: Handles sending the Date value from the server to the client.
// - parseValue: Parses incoming values from the client as Date objects.
export const DateTime = new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime is a MongoDB Datetime in ISO format",

    serialize(value: any): Date {
        return value;
    },

    parseValue(value): Date {
        return new Date(value as string);
    },
});

// Exporting the custom DateTime scalar as the default export for the module
export default DateTime;
