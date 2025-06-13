/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Chain, Network, TokenId } from '@wormhole-foundation/sdk';
import { TokenTransfer, Wormhole, amount, wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import {
  SEIEVM_CORE_CONTRACT,
  SEIEVM_RELAYER_CONTRACT,
  SEIEVM_RPC,
  SEIEVM_TOKEN_BRIDGE_CONTRACT,
  SOLANA_ENDPOINT,
} from './constant';
import { createWrapped } from './create-wrapped';
import type { SignerStuff } from './helpers';
import { getSigner, getTokenDecimals } from './helpers';

async function tokenTransfer<N extends Network>(
  wh: Wormhole<N>,
  route: {
    token: TokenId;
    amount: bigint;
    source: SignerStuff<N, Chain>;
    destination: SignerStuff<N, Chain>;
    delivery?: {
      automatic: boolean;
      nativeGas?: bigint;
    };
    payload?: Uint8Array;
  }
) {
  console.info({
    token: route.token,
    amount: route.amount,
    source: route.source.address,
    destination: route.destination.address,
    delivery: route.delivery?.automatic,
    payload: route.payload,
    nativeGas: route.delivery?.nativeGas,
  });

  const xfer = await wh.tokenTransfer(
    route.token,
    route.amount,
    route.source.address,
    route.destination.address,
    route.delivery?.automatic ?? false,
    route.payload,
    route.delivery?.nativeGas
  );

  console.info('token transfer details', xfer.transfer);
  console.info('token account', xfer.transfer.token.address.toString());

  const quote = await TokenTransfer.quoteTransfer(
    wh,
    route.source.chain,
    route.destination.chain,
    xfer.transfer
  );

  if (xfer.transfer.automatic && quote.destinationToken.amount < 0) {
    throw 'The amount requested is too low to cover the fee and any native gas requested.';
  }

  const srcTxids = await xfer.initiateTransfer(route.source.signer);
  await xfer.fetchAttestation(30 * 60 * 1000);

  const fnc = async () => {
    const destTxids = await xfer.completeTransfer(route.destination.signer);
    return { srcTxids, destTxids };
  };

  return () => fnc;
}

export const transferToken = async ({
  orgAddress,
  destAddress,
  orgSignExecutor,
  destSignExecutor,
  tokenAddress,
  transferredAmount,
  orgChainName,
  destChainName,
}: {
  orgAddress: string;
  destAddress: string;
  orgSignExecutor: (tx: any) => Promise<any>;
  destSignExecutor: (tx: any) => Promise<any>;
  tokenAddress: string;
  transferredAmount: string;
  orgChainName: Chain;
  destChainName: Chain;
}) => {
  const wh = await wormhole('Mainnet', [evm, solana], {
    chains: {
      Solana: {
        rpc: SOLANA_ENDPOINT,
      },
      Seievm: {
        rpc: SEIEVM_RPC,
        contracts: {
          coreBridge: SEIEVM_CORE_CONTRACT,
          tokenBridge: SEIEVM_TOKEN_BRIDGE_CONTRACT,
          relayer: SEIEVM_RELAYER_CONTRACT,
        },
        finalityThreshold: 1,
      },
    },
  });

  /**
   * Create wrapped token if not already wrapped
   */
  await createWrapped({
    wh,
    tokenAddress,
    sourceAddress: orgAddress,
    destinationAddress: destAddress,
    sourceSignExecutor: orgSignExecutor,
    destinationSignExecutor: destSignExecutor,
    orgChainName,
    destChainName,
  });

  const origChain = wh.getChain(orgChainName);
  const destChain = wh.getChain(destChainName);

  const source = await getSigner(origChain, orgAddress, orgSignExecutor);
  const destination = await getSigner(destChain, destAddress, destSignExecutor);

  const tokenId = Wormhole.tokenId('Solana', tokenAddress);
  const amt = transferredAmount;

  const decimals = await getTokenDecimals(wh, tokenId, origChain);
  const sourceTokenBalance = await origChain.getBalance(source.signer.address(), tokenId.address);
  if (!sourceTokenBalance) {
    throw new Error('Failed to get source token balance');
  }

  const automatic = false;
  const nativeGas = automatic ? '0.1' : undefined;

  const transferAmount = amount.units(amount.parse(amt, decimals));
  if (sourceTokenBalance < transferAmount) {
    throw new Error(
      `Insufficient token balance. Required: ${amt}, Available: ${amount.parse(sourceTokenBalance.toString(), decimals)}`
    );
  }

  const xfer = await tokenTransfer(wh, {
    token: tokenId,
    amount: transferAmount,
    source: source as any,
    destination: destination as any,
    delivery: {
      automatic,
      nativeGas: nativeGas ? amount.units(amount.parse(nativeGas, decimals)) : undefined,
    },
  });

  return xfer;
};

const test1 = async () => {
  await new Promise(resolve => setTimeout(resolve, 4000));
  const fn = async () => {
    console.log('start claim!');
    await new Promise(resolve => setTimeout(resolve, 4000));
  };

  return () => fn;
};

export type BridgeConfig = {
  orgAddress: string;
  destAddress: string;
  orgSignExecutor: (tx: any) => Promise<any>;
  destSignExecutor: (tx: any) => Promise<any>;
  tokenAddress: string;
  amount: string;
  orgChainName?: Chain;
  destChainName?: Chain;
};

export const initTransferInstance = ({
  orgAddress,
  destAddress,
  orgSignExecutor,
  destSignExecutor,
  tokenAddress,
  amount,
  orgChainName = 'Solana',
  destChainName = 'Seievm',
}: BridgeConfig) => {
  return async () => {
    // const claimFnc = await test1();
    // return claimFnc;

    const claimFnc = await transferToken({
      orgAddress,
      destAddress,
      orgSignExecutor,
      destSignExecutor,
      tokenAddress,
      transferredAmount: amount,
      orgChainName,
      destChainName,
    });

    return claimFnc;
  };
};
