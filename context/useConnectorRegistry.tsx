import { useSigner as useEvmSigner } from '@/context/SignerProvider';
import { useSolanaSigner } from '@/context/useSolanaSigner';
import { useSolana } from '@/context/useSolanaWallet';
import * as SeiTokens from '@/lib/constants/token/pacific-1';
import * as SolanaTokens from '@/lib/constants/token/solana';
import type { Token } from '@/lib/entities/token.entity';
import { getEvmSignerExecuter, getSolanaSignerExecuter } from '@/lib/wormhole/helpers';
import { type Chain as WormholeChain } from '@wormhole-foundation/sdk-connect';
import { useMemo } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';

export type Chain = 'solana' | 'evm';

export type Connector = {
  chain: Chain;
  chainName: WormholeChain;
  icon: string;
  name: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected: boolean;
  isDisconnected: boolean;
  address: string;
  executor: (tx: any) => Promise<any>;
};

export const CONNECTOR_METADATA: Record<
  Chain,
  Omit<
    Connector,
    'connect' | 'disconnect' | 'isConnected' | 'isDisconnected' | 'address' | 'executor'
  > & {
    whiteListToken: Token[];
  }
> = {
  solana: {
    chain: 'solana',
    chainName: 'Solana',
    icon: '/icons/solana.svg',
    name: 'Solana',
    whiteListToken: [
      SolanaTokens.SOLANA_TOKEN_USDC,
      SolanaTokens.SOLANA_TOKEN_USDT,
      SolanaTokens.SOLANA_TOKEN_WTC,
    ],
  },
  evm: {
    chain: 'evm',
    chainName: 'Seievm',
    icon: '/icons/tokens/sei.svg',
    name: 'SEI',
    whiteListToken: [SeiTokens.USDC, SeiTokens.USDT],
  },
};

export const useGetConnectorList = (): Record<Chain, Connector> => {
  // SOLANA
  const solana = useSolana();
  const solanaSigner = useSolanaSigner();

  // EVM
  const evm = useEvmSigner();
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();

  return useMemo(() => {
    return {
      solana: {
        chain: CONNECTOR_METADATA.solana.chain,
        chainName: CONNECTOR_METADATA.solana.chainName,
        icon: CONNECTOR_METADATA.solana.icon,
        name: CONNECTOR_METADATA.solana.name,
        isConnected: solana.connected,
        isDisconnected: !solana.connected,
        address: solana.publicKey?.toBase58(),
        connect: solana.connectSolana,
        disconnect: solana.disconnectSolana,
        executor: getSolanaSignerExecuter(solanaSigner),
      },
      evm: {
        chain: CONNECTOR_METADATA.evm.chain,
        chainName: CONNECTOR_METADATA.evm.chainName,
        icon: CONNECTOR_METADATA.evm.icon,
        name: CONNECTOR_METADATA.evm.name,
        isConnected: evm.isConnected,
        isDisconnected: evm.isDisconnected,
        address: evm.rpcSigner?.address || '',
        connect: evm.connect,
        disconnect: evm.disconnect,
        executor: getEvmSignerExecuter(walletClient as any, publicClient),
      },
    };
  }, [solana, evm]);
};

/**
 * @description
 * This hook is used to get the connector for the given chain.
 * Now: support for solana and seievm.
 * Future: support for other chains like ethereum, bsc, etc, sui, aptos.
 * @param chain - The chain to get the connector for.
 * @returns The connector for the given chain.
 */
export const useConnectorRegistry = (chain: Chain): Connector | null => {
  const { evm, solana } = useGetConnectorList();

  return useMemo(() => {
    switch (chain) {
      case 'solana':
        return solana;
      case 'evm':
        return evm;
      default:
        return null;
    }
  }, [evm, solana, chain]);
};
