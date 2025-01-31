# Policy Assets Processor

## Overview

The **Policy Assets Processor** is a NestJS-based application designed to manage and process policy assets, specifically focusing on NFTs (Non-Fungible Tokens). The application checks whether NFTs created are in a completed status and handles associated sales transactions. It interacts with a MongoDB database for storage and uses the BlockFrost API for seamless integration with the Cardano blockchain.

### Features

- **NFT Status Processing**: Verify and process the status of created NFTs to determine if they are completed.
- **Sales Transactions Management**: Handle sales transactions related to policy assets, including status updates and tracking.
- **Blockchain Integration**: Leverage the BlockFrost API for interactions with the Cardano blockchain, ensuring secure and efficient management of digital assets.
- **Extensible Architecture**: Easily extendable for future features and enhancements related to asset management.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **BlockFrost API**: API for interacting with the Cardano blockchain.
- **MongoDB**: NoSQL database for storing application data.

## Getting Started

### Prerequisites

- Node.js (version >= 14)
- MongoDB (running instance or connection string)
- BlockFrost API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/policy-assets-processor.git
   cd policy-assets-processor
   ```

````
2. Install dependencies:
```bash
npm install
````

3. Configure environment variables. Create a .env file in the root directory and set the following variables:

```bash
BLOCKFROST_PROJECT_ID=your_blockfrost_project_id
BLOCKFROST_CARDANO_NETWORK=your_network (e.g., mainnet, testnet, preprod)
MONGODB_URI=your_mongodb_connection_string
```

### Running the app

To start the application, run the following command:

```bash
npm run start
```

The application will be available at http://localhost:3000.

### API Endpoints

- **GET** `/policy_assets/sales/:status`
  - **Description**: Process NFT sales by the specified status.
  - **Path Parameters**:
    - `status` (string): The status of the NFT sales to be processed. Possible values include:
      - `completed`
      - `pending`
  - **Response**: Returns a JSON object containing the status.

### Testing

```bash
npm run test
```

## Contributing

We welcome contributions to this project! To contribute, please follow these steps:

1. **Fork the repository**: Click the "Fork" button on the top right corner of this repository to create your copy.

2. **Clone your fork**: Use the following command to clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/policy-assets-processor.git
   ```
3. **Create a new branch**: It's recommended to create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes**: Implement your changes or additions to the codebase.
5. **Test your changes**: Ensure that all existing and new tests pass. If you add new features, consider adding corresponding tests.
6. **Commit your changes**: Write a clear commit message describing your changes:

```bash
git commit -m "Add feature: your feature description"
```

7. **Push to your fork**: Push your changes to your forked repository:

```bash
git push origin feature/your-feature-name
```

8. **Create a pull request**: Go to the original repository and click on the "Pull Requests" tab. Click "New Pull Request" and select your branch to submit your changes for review.
9. **Address feedback**: Be open to feedback and make any necessary changes to your pull request.
