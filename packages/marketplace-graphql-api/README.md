# Marketplace GraphQL API

## Description

The Marketplace GraphQL API is designed to serve as the backend infrastructure for the marketplace platform. This API enables clients to interact with the marketplace through a flexible and efficient GraphQL interface, allowing for powerful data querying and manipulation.

Built using Apollo GraphQL, this API takes advantage of the benefits of GraphQL, such as fetching only the required data and enabling a single endpoint for all interactions. The application utilizes TypeScript to provide strong typing, enhancing code quality and maintainability.

### Key Components

- **Apollo Server**: The core of the application is powered by Apollo Server, which simplifies the development of a GraphQL API. It manages the execution of queries and mutations, handles subscriptions, and integrates easily with various data sources.

- **Resolvers**: Resolvers are functions that handle the logic for each GraphQL field. They are responsible for fetching data from databases or other services and returning it in the format expected by the client. The API is modularized with distinct resolver files for different aspects of the marketplace, such as policy assets and impact projects.

- **GraphQL Schema**: The API schema defines the structure of the data that can be queried or mutated. This project uses separate files for schema definitions, making it easy to manage and understand the relationships between different data types.

- **Database Integration**: The application uses MikroORM for database interaction, which provides a powerful Object-Relational Mapping (ORM) layer for MongoDB. This allows developers to interact with the database using TypeScript classes and methods rather than raw database queries, enhancing productivity and reducing errors.

- **Serverless Architecture**: The API is designed to run on AWS Lambda, allowing for automatic scaling and reducing operational overhead. This serverless approach ensures that the API can handle varying levels of traffic without requiring dedicated server infrastructure.

### Directory Structure

- **resolvers**: All GraphQL resolvers are organized here, enabling a clear separation of concerns. Each resolver corresponds to a specific domain, such as `policy_assets`, `impact_projects`, and `app_config`, ensuring maintainability and modularity.
- **models**: This folder contains TypeScript classes that define the entities used in the application, providing a structured way to manage data and enforce type safety.
- **services**: Contains modules for internal and external services, including database connection logic and interactions with third-party libraries or APIs.
- **gql**: This directory includes the GraphQL type definitions, schema, and query/mutation definitions, providing a centralized location for managing the GraphQL API's structure.

### Features

- **GraphQL API for Marketplace Operations**: Provides a comprehensive set of queries and mutations for managing marketplace data, including creating, updating, and retrieving information related to assets and projects.
- **Dynamic Querying**: Clients can request exactly the data they need, reducing over-fetching and improving performance. This flexibility supports various client applications, from web frontends to mobile apps.
- **Real-time Capabilities**: Supports subscriptions, enabling real-time updates for clients when relevant data changes, enhancing user experience.
- **Robust Security**: Utilizes AWS IAM authentication for secure access to the database, ensuring that sensitive information is protected.

## Prerequisites

- Node.js (version X.X.X) – Ensure you have the correct version installed.
- npm or yarn – Dependency management tools for JavaScript.
- MongoDB database instance – A running MongoDB instance is required to store and retrieve marketplace data.
- AWS account – Necessary for deploying the API as a serverless function using AWS Lambda.

## Pre-Deployment Checks

- Ensure that your environment variables are correctly configured, particularly for database access and AWS credentials.
- Review the `serverless.yml` configuration file to tailor the deployment settings according to your infrastructure needs.

## Deployment

The project is set up for deployment using the Serverless Framework, which simplifies the deployment of serverless applications to cloud providers. While it is primarily configured for AWS Lambda, users can adapt it for other serverless platforms as needed.

### Deploy Command

To deploy the API to AWS Lambda, run:

```bash
sls deploy
```

## Installation

1. Clone the repository:

```
git clone @vakaconsulting/marketplace-graphql-api
```

2. Navigate to the project directory:

```
cd marketplace-graphql-api
```

3. Install dependencies:

```
npm install
```

or

```
yarn install
```

The GraphQL server will be available at `http://localhost:9001/graphql`

## Testing

To run tests:

```
npm test
```

or

```
yarn test
```

## Contributing

[Explain how others can contribute to the project]

## License

[Specify the license under which this project is released]

## Contact

Email: info@vaka.consulting
Discord:
