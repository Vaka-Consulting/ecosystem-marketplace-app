// Importing BlockFrostAPI from the Blockfrost JavaScript SDK.
// BlockFrostAPI is used to interact with the Blockfrost API for Cardano blockchain data.
import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; 

// BlockfrostService class for handling interactions with the Blockfrost API.
// This class initializes a BlockFrostAPI client with the project ID from the environment variables.
export class BlockfrostService {
    private client: BlockFrostAPI;

    // Constructor initializes the BlockFrostAPI client using the BLOCKFROST_API_KEY environment variable.
    // If the API key is not set, it defaults to an empty string.
    public constructor() {
        this.client = new BlockFrostAPI({
            projectId: process.env.BLOCKFROST_API_KEY ?? ''
        });
    }

    // Method to retrieve the initialized BlockFrostAPI client.
    // This allows other parts of the application to access the Blockfrost client.
    public getClient(): BlockFrostAPI {
        return this.client;
    }
}
