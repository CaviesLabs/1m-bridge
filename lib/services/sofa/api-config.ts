/**
 * Configuration for the Sofa API
 */

// Determine if we should use the proxy endpoint or direct API access
const useProxy = process.env.NEXT_PUBLIC_USE_API_PROXY === 'true' || true;

// Base API URLs
export const SOFA_API_DIRECT_URL = process.env.NEXT_PUBLIC_SOFA_API_URL || 'https://api.sofa.org';
export const SOFA_API_PROXY_URL = '/api/drv';

// Get the appropriate base URL based on configuration
export const getSofaApiBaseUrl = (): string => {
  return useProxy ? SOFA_API_PROXY_URL : SOFA_API_DIRECT_URL;
};

// Helper for creating API endpoints
export const getSofaApiEndpoint = (path: string): string => {
  return `${getSofaApiBaseUrl()}/${path.replace(/^\//, '')}`;
};

// Helper for adding chainId to API requests
export const addChainIdToRequest = (
  chainId: number,
  headers: Record<string, string> = {}
): Record<string, string> => {
  if (useProxy) {
    // When using the proxy, set the chain ID in a custom header
    return {
      ...headers,
      'X-Chain-ID': chainId.toString(),
    };
  }
  // When using direct API, the chain ID is handled by the SofaApiService class
  return headers;
};
