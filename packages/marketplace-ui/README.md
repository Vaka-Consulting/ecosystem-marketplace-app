# Marketplace UI
This is a little monorepo containing apps and packages to interact with the Marketplace contract.

The Monorepo has been setup with **Yarn Workspaces**

 
# Structure

## File Structure
- `/applications`
  - `/applications/marketplace-demo`
- `/packages`

## Application - Demo App
  - React / Next App
  - Hooks


## Packages

### Common
Shared constants, utils, types between apps and packages

## Marketplace Contract: 
Small SDK to help us interact with the Smart Contract
- Sell | Buy | Update | Delete asset
- Builds transactions
- Prompts user to sign with dApp connected wallet
- Read from dApp connected wallet and get all information


# Get Started
These instruction are for running this application standalone and apart of the Docker setup in the root folder of this repository.

## Requirements
- Node 18 >=
- Yarn

## Run application

1. Install dependencies:  
```yarn install```


2. Start developing:  
```yarn dev```


3. Build app:  
``yarn build``


4. Start app (Next server):  
```yarn start```
