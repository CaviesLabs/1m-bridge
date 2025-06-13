import { chainId } from '@/redux/chain.state';
import type { SofaApiService } from './sofa-api.service';
import { createSofaService } from './sofa-api.service';

// Singleton pattern to ensure only one instance is created
let sofaServiceInstance: SofaApiService | null = null;

/**
 * Get the Sofa API service instance
 * This ensures we only create one instance of the service
 */
export const getSofaService = (): SofaApiService => {
  if (!sofaServiceInstance) {
    sofaServiceInstance = createSofaService(chainId);
    console.log('Created new Sofa API service instance with chainId:', chainId);
  }

  return sofaServiceInstance;
};

// Export the singleton instance
export const sofaService = getSofaService();
