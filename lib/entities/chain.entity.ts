import type { Chain } from 'viem';
import type { Token } from './token.entity';

export enum ChainKey {
  ARCTIC_1 = 'arctic-1',
  ATLANTIC_2 = 'atlantic-2',
  PACIFIC_1 = 'pacific-1',
  SOLANA = 'solana',
}

export const ChainIdToKey: Record<number, ChainKey> = {
  1: ChainKey.PACIFIC_1,
  1328: ChainKey.ATLANTIC_2,
  3: ChainKey.ATLANTIC_2,
};

export const ChainKeyToId: Record<ChainKey, number> = {
  [ChainKey.PACIFIC_1]: 1,
  [ChainKey.ATLANTIC_2]: 1328,
  [ChainKey.ARCTIC_1]: 3,
  [ChainKey.SOLANA]: 1,
};

export type ChainConfigEntity = {
  blockExplorer: {
    name: string;
    url: string;
  };
  config: Chain;
  rpcUrl: string;
  chainId: number;
  chainName: string;
  disabled?: boolean;
  chainKey: ChainKey;
  whiteListedTokens: Token[];
  nativeToken: Token;
  wrappedNativeToken: Token;
};

export class ChainConfig implements ChainConfigEntity {
  blockExplorer: {
    name: string;
    url: string;
  };
  config: Chain;
  rpcUrl: string;
  chainId: number;
  chainName: string;
  disabled?: boolean;
  chainKey: ChainKey;
  whiteListedTokens: Token[];
  nativeToken: Token;
  wrappedNativeToken: Token;

  /**
   * Get the block explorer URL
   * @returns {block explorer URL}
   */
  private extractBlockExplorerUrl(url: string): string {
    let chainQuery;
    switch (this.chainKey) {
      case ChainKey.PACIFIC_1:
        chainQuery = 'pacific-1';
        break;
      case ChainKey.ARCTIC_1:
        chainQuery = 'arctic-1';
        break;
      case ChainKey.ATLANTIC_2:
        chainQuery = 'atlantic-2';
        break;
      default:
        chainQuery = 'pacific-1';
    }

    return `${this.blockExplorer.url}/${url}?chain=${chainQuery}`;
  }

  /**
   * Get the token URL for the block explorer
   * @param address
   * @returns {token URL}
   */
  public tokenUrl(address: string): string {
    return `${this.extractBlockExplorerUrl(`/token/${address}`)}`;
  }

  /**
   * Get the transaction URL for the block explorer
   * @param hash
   * @returns {transaction URL}
   */
  public txUrl(hash: string): string {
    return this.extractBlockExplorerUrl(`/tx/${hash}`);
  }

  /**
   * Get the address URL for the block explorer
   * @param address
   * @returns {address URL}
   */
  public addressUrl(address: string): string {
    return this.extractBlockExplorerUrl(`address/${address}`);
  }

  public static fromEntity({
    chainName,
    chainKey,
    chainId,
    config,
    whiteListedTokens,
    disabled,
    blockExplorer,
    rpcUrl,
    nativeToken,
    wrappedNativeToken,
  }: ChainConfigEntity): ChainConfig {
    return Object.assign(new ChainConfig(), {
      chainName,
      chainKey,
      chainId,
      config,
      whiteListedTokens,
      disabled,
      blockExplorer,
      rpcUrl,
      nativeToken,
      wrappedNativeToken,
    });
  }
}
