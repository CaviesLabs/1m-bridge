import { useSigner } from '@/context/SignerProvider';
import { useSolanaBalances } from '@/context/SolanaBalanceProvider';
import type { Connector } from '@/context/useConnectorRegistry';
import { useSolanaSigner } from '@/context/useSolanaSigner';
import { useSolana } from '@/context/useSolanaWallet';
import type { TokenBalance } from '@/lib/entities/balance.entity';
import type { Token } from '@/lib/entities/token.entity';
import { initTransferInstance } from '@/lib/wormhole/token-transfer';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useTheme } from './ThemeProvider';

export type BridgeStep = 'connect' | 'bridge' | 'signing' | 'claim' | 'completed';

interface UseBridgeProps {
  inputVal: string;
  tokenBalance: TokenBalance | null;
  sourceConnector: Connector;
  destinationConnector: Connector;
}

interface BridgeContextType {
  currentStep: BridgeStep;
  isWalletConnected: boolean;
  isSigning: boolean;
  isCompleted: boolean;
  connectWallet: () => void;
  startBridge: () => void;
  claimTokens: () => void;
  reset: () => void;
}

export const useBridge = ({
  tokenBalance,
  inputVal,
  sourceConnector,
  destinationConnector,
}: UseBridgeProps): BridgeContextType => {
  const [isLoading, setIsLoading] = useState(false);
  const [stepBridge, setStepBridge] = useState<BridgeStep>('bridge');
  const [claimFnc, setClaimFnc] = useState<() => Promise<any> | null>(null);
  const [isBridgeMore, setIsBridgeMore] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bridgeData, setBridgeData] = useState<{
    amount: string;
    token: Token;
  } | null>(null);

  const { publicKey } = useSolana();
  const solanaSigner = useSolanaSigner();
  const { rpcSigner: evmSigner } = useSigner();
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const { refetchBalances } = useSolanaBalances();
  const theme = useTheme();

  /**
   * @note This function is used to transfer tokens from Solana to EVM
   * @returns {Promise<void>}
   * @throws {Error} If the bridge operation fails
   */
  const handleBridge = useCallback(async () => {
    if (!publicKey || !evmSigner) return;

    const bridge = initTransferInstance({
      orgAddress: sourceConnector.address,
      destAddress: destinationConnector.address,
      orgSignExecutor: sourceConnector.executor,
      destSignExecutor: destinationConnector.executor,
      tokenAddress: tokenBalance?.tokenInfo?.contractAddress ?? '',
      amount: inputVal?.toString() ?? '0',
      orgChainName: sourceConnector.chainName,
      destChainName: destinationConnector.chainName,
    });

    try {
      setIsSuccess(false);
      setIsLoading(true);

      const bridgeData = {
        amount: inputVal?.toString() ?? '0',
        token: tokenBalance?.tokenInfo ?? ({} as Token),
      };

      const claimFnc = await bridge();
      setClaimFnc(claimFnc);
      setStepBridge('claim');
      setBridgeData(bridgeData);
      refetchBalances();

      toast.success('Bridge operation - Transfer tokens successful');
    } catch (error) {
      console.error('Bridge operation: ', error);
      toast.warning('Bridge operation', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });

      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
      console.info('Transaction complete');
    }
  }, [
    theme,
    publicKey,
    evmSigner,
    solanaSigner,
    walletClient,
    publicClient,
    inputVal,
    tokenBalance,
    refetchBalances,
    sourceConnector,
    destinationConnector,
  ]);

  /**
   * @note This function is used to claim tokens which are bridged from Solana to EVM
   * @returns {Promise<void>}
   * @throws {Error} If the claim operation fails
   */
  const handleClaim = useCallback(async () => {
    if (!claimFnc) {
      return toast.error('Claim operation', {
        description: 'Claim function is not initialized',
      });
    }

    try {
      setIsLoading(true);
      await claimFnc();
      setIsSuccess(true);
      setIsBridgeMore(true);
      setStepBridge('completed');
      toast.success('Claim operation', {
        description: 'Your tokens have been successfully claimed.',
      });
    } catch (error) {
      console.error('Claim operation failed:', error);
      toast.error('Claim operation', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
      console.info('Claim complete');
    }
  }, [theme, claimFnc]);

  const resetBridge = useCallback(() => {
    setIsBridgeMore(false);
    setIsSuccess(false);
    setStepBridge('bridge');
    setClaimFnc(null);
    setBridgeData(null);
  }, []);

  return {
    currentStep: useMemo(() => {
      if (isLoading) return 'signing';
      if (isSuccess) return 'completed';
      if (!sourceConnector.isConnected || !destinationConnector.isConnected) return 'connect';

      return stepBridge;
    }, [isLoading, isSuccess, stepBridge, sourceConnector, destinationConnector]),

    isWalletConnected: !!publicKey,
    isSigning: isLoading,
    isCompleted: isSuccess,
    connectWallet: () => {},
    startBridge: handleBridge,
    claimTokens: handleClaim,
    reset: resetBridge,
  };
};
