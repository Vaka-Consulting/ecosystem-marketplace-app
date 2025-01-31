# Empowa GraphQL Common Package

## Overview

The Empowa GraphQL Common package is a shared library based on the Apollo GraphQL server. It provides a set of common functionalities and utilities for building GraphQL APIs within the Empowa ecosystem, promoting code reusability and standardization.

## Features

- **Built on Apollo GraphQL server**: Leverages the capabilities of Apollo to create robust GraphQL APIs.
- **Serverless deployment support**: Optimized for serverless architectures, allowing easy scaling and management.
- **MongoDB integration**: Seamlessly integrates with MongoDB for efficient backend storage and data management.
- **Custom Scalars**: Includes custom scalar types for enhanced data handling (e.g., DateTime).
- **Error Handling**: Built-in error handling utilities for better error management across APIs.

## Prerequisites

- Node.js (version 18.x.x or higher)
- MongoDB
- Serverless framework (for deployment)
- A basic understanding of GraphQL and its concepts

## Installation

To install the package, run:

```bash
npm install @empowa/graphql-common
```

## Usage

Here's a basic example of how to use the Empowa Graphql Common package:

```javascript
const { createServer } = require('@empowa/graphql-common');

// Your schema and resolvers
const typeDefs = `...`;
const resolvers = {...};

const server = createServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## Configuration

The following environment variables must be set to configure the package:

- **DB_SERVER_NAME**: The name of your MongoDB server.
- **DB_NAME**: (Optional) The name of your MongoDB database, defaults to `amplifi`.
- **DB_URI**: (Optional) The MongoDB URI for direct connection.

Ensure you load these variables in your application, preferably using a library like `dotenv`.

## Deployment

This package is designed to be deployed in a serverless environment. Make sure you have the Serverless framework installed and configured.

To deploy, run the following command:

```bash
serverless deploy
```

Ensure that your serverless configuration file (`serverless.yml`) is properly set up to include the necessary functions, resources, and environment variables for your application.

## Database

The package uses MongoDB as the backend database. Ensure you have a MongoDB instance set up and the connection string properly configured in your environment.


## Contributing

Add information about how others can contribute to this project

## License

Specify the license under which this package is released

## Support

For any questions or issues, please open an issue on our GitHub repository.
