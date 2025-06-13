import type { PublicKey, TransactionInstruction } from '@solana/web3.js';

export interface SolanaUnsignedTransaction {
  transaction: {
    transaction: {
      recentBlockhash: string | null;
      feePayer: PublicKey;
      nonceInfo: any | null;
      instructions: TransactionInstruction[];
      signers: any[]; // or a more specific type if needed
    };
    signers: Signer[];
  };
  network: string;
  chain: string;
  description: string;
  parallelizable: boolean;
}

export interface Key {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
}

export interface Signer {
  _keypair: {
    publicKey: KeyPairByteMap;
    secretKey: KeyPairByteMap;
  };
}

export interface KeyPairByteMap {
  [index: string | number]: number;
}

import type { PublicKeyInitData } from '@solana/web3.js';
import type { PlatformToChains, UniversalOrNative } from '@wormhole-foundation/sdk-connect';

export const unusedNonce = 0;
export const unusedArbiterFee = 0n;

/**
 * Runtime value for the Solana Platform
 */
export const _platform = 'Solana';
/**
 * Type for the Solana Platform
 */
export type SolanaPlatformType = typeof _platform;

export type SolanaChains = PlatformToChains<SolanaPlatformType>;
export type UniversalOrSolana = UniversalOrNative<SolanaChains>;
export type AnySolanaAddress = UniversalOrSolana | PublicKeyInitData;
