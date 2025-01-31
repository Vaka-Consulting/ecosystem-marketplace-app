import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import { BlockfrostService } from '../src/services/blockfrost.service'; // Adjust this import path as needed


jest.mock('@blockfrost/blockfrost-js');

describe('BlockfrostService', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        originalEnv = process.env;
        process.env = { ...originalEnv };
        jest.resetModules();
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should create a BlockFrostAPI instance when API key is provided', () => {
        process.env.BLOCKFROST_API_KEY = 'test-api-key';
        const service = new BlockfrostService();
        expect(service.getClient()).toBeInstanceOf(BlockFrostAPI);
        expect(BlockFrostAPI).toHaveBeenCalledWith({ projectId: 'test-api-key' });
    });

    
    it('should return the same client instance on multiple getClient() calls', () => {
        process.env.BLOCKFROST_API_KEY = 'test-api-key';
        const service = new BlockfrostService();
        const client1 = service.getClient();
        const client2 = service.getClient();
        expect(client1).toBe(client2);
    });
});