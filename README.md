# 🌿 Ecosystem Marketplace App
[![Build](https://github.com/Vaka-Consulting/ecosystem-marketplace-app/actions/workflows/npm-ci.yml/badge.svg)](https://github.com/Vaka-Consulting/ecosystem-marketplace-app/actions/workflows/npm-ci.yml)

## 📝 Description  
The **Ecosystem Marketplace App** is a platform designed to connect NFT buyers and sellers within the **Cardano network** 🌐. It provides a seamless experience for users to trade NFTs efficiently and securely.  

![architecture](docs/architecture.png "Ecosystem Diagram")

---

## 🧩 Modules  

Each module has its own detailed documentation in its directory. Click the links below to learn more:  

### **Database (db)** 🗄️  
- A **MongoDB** instance that stores all the application data.   
- Can be replaced with **MongoDB Atlas** or any other preferred database.  

### **User Interface (ui)** 🖥️  ([doc](packages/marketplace-ui/README.md)  )
- Handles the frontend and user interface of the marketplace.  
- Provides an intuitive and user-friendly experience.  

### **API (api)** 📡  ([doc](packages/marketplace-graphql-api/README.md))
- Contains **GraphQL API endpoints**.  
- Fetches and serves backend data from the MongoDB database.  

### **Processor** ⚙️  ([doc](packages/marketplace-processor/README.md))
- Runs on a **cron interval** to verify transactions.  
- Utilizes the **Blockfrost API** for transaction verification.  

### **Fetcher** 🔄  ([doc](packages/policy-assetfetcher/README.md))
- Fetches policy assets from Blockfrost API.  
- Automatically saves data to database on Docker startup.  
---





## 🔗 Smart Contract Deployment  

Before deploying the Ecosystem Marketplace App, you **must first deploy the smart contract** to the Cardano network. The contract logic and deployment scripts are hosted in a separate repository:  

### **Steps to Deploy the Smart Contract**  

1. **Build and Deploy the Contract**:  
   - Follow the deployment instructions in the [ecosystem-marketplace-contracts repository](https://github.com/Vaka-Consulting/ecosystem-marketplace-contracts.git) to compile and deploy the contract. 

2. **Retrieve Contract Configuration**:  
   - After deployment, **note these values** from the deployment logs:  
     - `token_asset`  ( 'lovelace' or custom currency for marketplace in this format "<policy_id><token_hash>" )
     - `protocol_owner_address`  (Owner address who deployed this marketplace)
     - `script_address`  (This is the marketplace address)  
     - `fee_oracle_address` (This is the fee oracle address of marketplace)  
     - `fee_oracle_asset`  (This is the policy id of fee oracle NFT )
     - `fee_percentage`  (fee percentage from `feeNumerator` marketplace.config.json )
     

4. **Update MongoDB Configuration**:  
   Modify `init-mongo.js` with your contract's values:  
   ```javascript
   db.app_config.insertMany([
     {
       "name": "marketplace-config",
       "token_asset": "lovelace", // Or for custom currency "<policy_id><token_hash>" from marketplace.config.json
       "protocol_owner_address": "<YOUR_PROTOCOL_OWNER_ADDRESS>", // From deployment output (`owner_address` in marketplace.config.json)
       "script_address": "<YOUR_DEPLOYED_SCRIPT_ADDRESS>", // From deployment output (`marketplaceAddress`)
       "fee_oracle_address": "<YOUR_FEE_ORACLE_ADDRESS>", // From deployment output (`feeOracleAddress`)
       "fee_oracle_asset": "<YOUR_FEE_ORACLE_ASSET_ID>", // From deployment output (policy ID of the only asset in feeOracleAddress)
       "fee_percentage": 2.5, // `feeNumerator` equivalent decimal value  divided by 10000 (e.g., 250000 becomes 2.5)       
     }
   ]);
   ```

❗ **Critical**:  
- Values must match your actual contract deployment output  
- Recreate MongoDB containers after updating `assets/init-mongo.js` using `rm -rf ./data`

---

This places the MongoDB configuration instructions immediately after contract deployment steps, ensuring logical flow.

---


## 🚀 Installation  

Follow these steps to set up the **Ecosystem Marketplace App** locally:  

1. **Clone the Repository** 📂  
   ```bash
   git clone https://github.com/Vaka-Consulting/ecosystem-marketplace-app.git
   ```

2. **Navigate to the Project Directory** 📁  
   ```bash
   cd ecosystem-marketplace-app
   ```

3. **Configure Marketplcae config**
   - Refer to [🔗 Smart Contract Deployment section](#🔗-smart-contract-deployment) for getting all details of marketplace and save it to mongodb database using [init-mongo.js](assets/init-mongo.js).

      > _Once you finish up updating [init-mongo.js](assets/init-mongo.js) it would get populate to mongodb container after you finish up Step 6._

   - Update [assets/collections.json](assets/collections.json) `policyId` to be the correct NFT policy that you want to support listing for. 
   
      > _This will make marketplace to accept list/buy/sell of assets from only this policy id._


4. **Configure the `.env` File** ⚙️  
   ```bash
   cp sample.env .env
   ```
   Check `.env` file for more details on configuring env values.
 

5. **Build Docker Containers** 🏗️  
   ```bash
   docker compose build
   ```

6. **Start Docker Containers** ⬆️
   ```bash
   docker compose up -d
   ```
   Once it is up you can start and check from your browser. [https://localhost:3000](https://localhost:3000)


7. **Stop Docker Containers** ⬇️
   ```bash
   docker compose down
   ```

---  
## 🛠️ Local Development  

The application supports local development using **Docker**, enabling real-time updates for code changes. Currently, this feature is available for only **[UI package](./pakages/marketplace-ui)**.  

### **Start the Development Server** 🚀  
```bash
docker compose -f development.yml up
```

### **Stop the Development Server** 🛑  
```bash
docker compose -f development.yml down
```

## ✏️ Customization

You can customize some of the files as well to make different image for NFT showcase from 
   - [assets/public/collection.webp](assets/public/collection.webp) (Change NFT cover image)
   - [assets/collections.json](assets/collections.json) (Change marketplace name, description, image etc)


---

## 🤝 Contributing  
We welcome contributions! If you'd like to contribute to the project, please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.  

## 📜 License  
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.  

---

Enjoy building and trading on the **Ecosystem Marketplace App**! 🎉🚀