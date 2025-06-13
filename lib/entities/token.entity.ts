import 'reflect-metadata';

import type { ChainKey } from '@/lib/entities/chain.entity';
import { ChainIdToKey } from '@/lib/entities/chain.entity';
import type { VaultInfo } from './vault.entity';

export interface TokenEntity {
  name: string;
  chainKey: ChainKey;
  symbol: string;
  logo?: string;
  decimals?: number;

  isGasToken?: boolean;
  recommended?: boolean;
  coingeckoId?: string;
  unOfficial?: boolean;
  defaultToken?: boolean;

  isPitToken?: boolean;
  isWrappedToken?: boolean;
  isImportedToken?: boolean;
  wrappedTokenSymbol?: string;

  contractAddress: string;
  wrappedTokenAddress?: string;

  usdValue?: number;
}

type BaseEntity = Omit<TokenEntity, 'contractAddress' | 'wrappedTokenAddress' | 'info'>;
type AddressDataEntity = Pick<TokenEntity, 'contractAddress' | 'wrappedTokenAddress'>;

export class Token implements TokenEntity {
  name: string;
  chain?: 'evm' | 'solana' = 'evm'; // default to evm
  chainKey: ChainKey;
  symbol: string;
  logo?: string;
  decimals?: number;

  isGasToken?: boolean;
  recommended?: boolean;
  coingeckoId?: string;
  unOfficial?: boolean;
  defaultToken?: boolean;

  isPitToken?: boolean;
  isWrappedToken?: boolean;
  isImportedToken?: boolean;
  wrappedTokenSymbol?: string;

  contractAddress: string;
  wrappedTokenAddress?: string;

  usdValue?: number;

  public get info(): TokenInfo {
    return {
      address: this.contractAddress,
      symbol: this.symbol,
      name: this.name,
      decimals: this.decimals,
    };
  }

  public static get getDefaultProperties() {
    return {
      logo: '/icons/tokens/png/sei.png',
      decimals: 18,
    };
  }

  public static fromRawEntity(entity: TokenEntity): Token {
    return Object.assign(new Token(), {
      ...Token.getDefaultProperties,
      ...entity,
    });
  }

  public static fromVaultInfo(vault: VaultInfo): [Token, Token] {
    return [
      Token.fromRawEntity({
        chainKey: ChainIdToKey[vault.chainID],
        name: vault.display_symbol,
        symbol: vault.symbol,
        logo: vault.icon,
        decimals: vault.decimals,
        contractAddress: vault.address,

        defaultToken: false,
        isPitToken: true,

        usdValue: vault?.tvl?.price ?? 0,
      }),
      Token.fromRawEntity({
        chainKey: ChainIdToKey[vault.chainID],
        name: vault.token?.display_symbol,
        symbol: vault.token?.symbol,
        logo: vault.token?.icon,
        decimals: vault.token?.decimals,
        contractAddress: vault?.token?.address,
        defaultToken: true,

        usdValue: vault?.tvl?.price ?? 0,
      }),
    ];
  }

  public static fromEntity(
    chainKey: ChainKey,
    baseData: Omit<TokenEntity, 'contractAddress' | 'wrappedTokenAddress' | 'chainKey'>,
    addressData: AddressDataEntity
  ): Token {
    return Object.assign(new Token(), {
      ...Token.getDefaultProperties,
      ...baseData,
      ...addressData,
      chainKey,
    });
  }

  public static getChainFromParser(chainKey: ChainKey) {
    return (baseData: BaseEntity, addressData: AddressDataEntity) =>
      Token.fromEntity(chainKey, baseData, addressData);
  }
}

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}
