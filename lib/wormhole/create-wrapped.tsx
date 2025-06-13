import type { Chain, Network } from '@wormhole-foundation/sdk';
import { Wormhole, signSendWait } from '@wormhole-foundation/sdk';
import { inspect } from 'util';
import { getSigner } from './helpers';

export const createWrapped = async <N extends Network>({
  wh,
  tokenAddress,
  sourceAddress,
  destinationAddress,
  sourceSignExecutor,
  destinationSignExecutor,
  orgChainName,
  destChainName,
}: {
  wh: Wormhole<N>;
  tokenAddress: string;
  sourceAddress: string;
  destinationAddress: string;
  sourceSignExecutor: (tx: any) => Promise<any>;
  destinationSignExecutor: (tx: any) => Promise<any>;
  orgChainName: Chain;
  destChainName: Chain;
}) => {
  const origChain = wh.getChain(orgChainName);
  const destChain = wh.getChain(destChainName);

  console.log(origChain.chain);

  const tokenId = Wormhole.tokenId(origChain.chain, tokenAddress);
  console.info(`token ID for ${origChain.chain}: `, tokenId);

  const { signer: destSigner } = await getSigner(
    destChain,
    destinationAddress,
    destinationSignExecutor
  );
  const tbDest = await destChain.getTokenBridge();

  try {
    const wrapped = await tbDest.getWrappedAsset(tokenId);
    console.info(`Token already wrapped on ${destChain.chain}. Skipping attestation.`);
    return { chain: destChain.chain, address: wrapped };
  } catch {
    console.info(`No wrapped token found on ${destChain.chain}. Proceeding with attestation.`);
  }

  // Source chain signer setup
  const { signer: origSigner } = await getSigner(origChain, sourceAddress, sourceSignExecutor);

  // Create an attestation transaction on the source chain
  const tbOrig = await origChain.getTokenBridge();
  const attestTxns = tbOrig.createAttestation(
    tokenId.address,
    Wormhole.parseAddress(origSigner.chain(), origSigner.address())
  );

  const txids = await signSendWait(origChain, attestTxns, origSigner);
  console.log('txids', txids);
  console.log('txids: ', inspect(txids, { depth: null }));
  const txid = txids[0]!.txid;
  console.log('Created attestation (save this): ', txid);

  // Retrieve the Wormhole message ID from the attestation transaction
  const msgs = await origChain.parseTransaction(txid);
  console.log('Parsed Messages:', msgs);
  // Fetch the signed VAA
  const timeout = 25 * 60 * 1000;
  const vaa = await wh.getVaa(msgs[0]!, 'TokenBridge:AttestMeta', timeout);

  if (!vaa) {
    throw new Error('VAA not found after retries exhausted. Try extending the timeout.');
  }

  console.info(
    'Attesting asset on destination chain...',
    'Token Address: ',
    vaa.payload.token.address.toString()
  );

  const subAttestation = tbDest.submitAttestation(
    vaa,
    Wormhole.parseAddress(destSigner.chain(), destSigner.address())
  );

  // Send attestation transaction and log the transaction hash
  const tsx = await signSendWait(destChain, subAttestation, destSigner);
  console.info('Transaction hash: ', tsx);

  // Poll for the wrapped asset until it's available
  async function waitForIt() {
    let retries = 0;
    const maxRetries = 30; // 1 minute total with 2s intervals
    do {
      try {
        const wrapped = await tbDest.getWrappedAsset(tokenId);
        return { chain: destChain.chain, address: wrapped };
      } catch {
        console.error('Wrapped asset not found yet. Retrying...');
      }
      console.info('Waiting before checking again...');
      await new Promise(r => setTimeout(r, 2000));
      retries++;
    } while (retries < maxRetries);
    throw new Error('Timeout waiting for wrapped asset');
  }

  console.info('Wrapped Asset: ', await waitForIt());
};
