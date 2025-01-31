# 🌿 Ecosystem Marketplace App

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

## 🛠️ Local Development  

The application supports local development using **Docker**, enabling real-time updates for code changes. Currently, this feature is available for the **UI package**.  

### **Start the Development Server** 🚀  
```bash
docker compose -f development.yml up
```

### **Stop the Development Server** 🛑  
```bash
docker compose -f development.yml down
```

---


## 🚀 Installation  

Follow these steps to set up the **Ecosystem Marketplace App** locally:  

1. **Clone the Repository** 📂  
   ```bash
   git clone https://github.com/empowa-io/ecosystem-marketplace-app
   ```

2. **Navigate to the Project Directory** 📁  
   ```bash
   cd ecosystem-marketplace-app
   ```

3. **Configure the `.env` File** ⚙️  
   ```bash
   cp sample.env .env
   ```

4. **Build Docker Containers** 🏗️  
   ```bash
   docker compose build
   ```

5. **Start Docker Containers** ⬆️  
   ```bash
   docker compose up
   ```

6. **Stop Docker Containers** ⬇️  
   ```bash
   docker compose down
   ```

---

## 🔗 Smart Contract Deployment  

Before deploying the Ecosystem Marketplace App, you **must first deploy the smart contract** to the Cardano network. The contract logic and deployment scripts are hosted in a separate repository:  

### **Steps to Deploy the Smart Contract**  
1. **Clone the Smart Contract Repository**:  
   ```bash  
   git clone https://github.com/empowa-io/ecosystem-marketplace  
   cd ecosystem-marketplace  
   ```  

2. **Build and Deploy the Contract**:  
   - Follow the deployment instructions in the [ecosystem-marketplace repository](https://github.com/empowa-io/ecosystem-marketplace) to compile and deploy the contract.  

3. **Retrieve Contract Configuration**:  
   - After deployment, **note these values** from the deployment logs:  
     - `protocol_owner_address`  
     - `script_address`  
     - `fee_oracle_address`  
     - `fee_oracle_asset`  

4. **Update MongoDB Configuration**:  
   Modify `init-mongo.js` with your contract's values:  
   ```javascript  
   db.app_config.insertMany([
     {
       "name": "marketplace-config",
       "protocol_owner_address": "<YOUR_PROTOCOL_OWNER_ADDRESS>",
       "script_address": "<YOUR_DEPLOYED_SCRIPT_ADDRESS>",
       "fee_oracle_address": "<YOUR_FEE_ORACLE_ADDRESS>",
       "fee_oracle_asset": "<YOUR_FEE_ORACLE_ASSET_ID>"
     }
   ]);
   ```  

❗ **Critical**:  
- Values must match your actual contract deployment output  
- Recreate MongoDB containers after updating `init-mongo.js`

---

This places the MongoDB configuration instructions immediately after contract deployment steps, ensuring logical flow. The warning box emphasizes the importance of matching values between systems.

---  

## 🤝 Contributing  
We welcome contributions! If you'd like to contribute to the project, please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.  

## 📜 License  
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.  

---

Enjoy building and trading on the **Ecosystem Marketplace App**! 🎉🚀