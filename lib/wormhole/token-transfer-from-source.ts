/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Chain, Wormhole } from '@wormhole-foundation/sdk';
import { TokenTransfer, wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import {
  SEIEVM_CORE_CONTRACT,
  SEIEVM_RELAYER_CONTRACT,
  SEIEVM_RPC,
  SEIEVM_TOKEN_BRIDGE_CONTRACT,
  SOLANA_ENDPOINT,
} from './constant';
import { getSigner } from './helpers';

const transferTokenFromSourceTxid = async ({
  wh,
  orgAddress,
  destAddress,
  orgSignExecutor,
  destSignExecutor,
  orgChainName,
  destChainName,
  sourceTxid,
}: {
  wh: Wormhole<'Mainnet'>;
  orgAddress: string;
  destAddress: string;
  orgSignExecutor: (tx: any) => Promise<any>;
  destSignExecutor: (tx: any) => Promise<any>;
  orgChainName: Chain;
  destChainName: Chain;
  sourceTxid: string;
}) => {
  const origChain = wh.getChain(orgChainName);
  const destChain = wh.getChain(destChainName);

  const source = await getSigner(origChain, orgAddress, orgSignExecutor);
  const destination = await getSigner(destChain, destAddress, destSignExecutor);

  const xfer = await TokenTransfer.from(wh, {
    chain: source.chain.chain,
    txid: sourceTxid,
  });

  const attestIds = await xfer.fetchAttestation(60 * 60 * 1000);
  console.log('Got attestation: ', attestIds);

  const dstTxIds = await xfer.completeTransfer(destination.signer);
  console.log('Completed transfer: ', dstTxIds);

  return { srcTxids: attestIds, destTxids: dstTxIds };
};

export type BridgeConfig = {
  orgAddress: string;
  destAddress: string;
  orgSignExecutor: (tx: any) => Promise<any>;
  destSignExecutor: (tx: any) => Promise<any>;
  orgChainName?: Chain;
  destChainName?: Chain;
  sourceTxid: string;
};

export const initTransferInstance = ({
  orgAddress,
  destAddress,
  orgSignExecutor,
  destSignExecutor,
  orgChainName = 'Solana',
  destChainName = 'Seievm',
  sourceTxid,
}: BridgeConfig) => {
  return async () => {
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

    const claimFnc = await transferTokenFromSourceTxid({
      wh,
      orgAddress,
      destAddress,
      orgSignExecutor,
      destSignExecutor,
      orgChainName,
      destChainName,
      sourceTxid,
    });

    return claimFnc;
  };
};
