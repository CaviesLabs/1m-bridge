import { isWormholeMessageId, type WormholeMessageId } from '@wormhole-foundation/sdk';
import { EvmAddress } from '@wormhole-foundation/sdk-evm';

// @ts-ignore
export async function parseTransaction(chain: any, receipt: any, coreAddress: string) {
  return receipt.logs
    .filter((l: any) => {
      return l.address === coreAddress;
    })
    .map((log: any) => {
      const { topics, data } = log;

      // @ts-ignore
      const parsed = this.coreIface.parseLog({
        topics: topics.slice(),
        data,
      });
      if (parsed === null) return undefined;

      const emitterAddress = new EvmAddress(parsed.args['sender']);
      return {
        chain: chain,
        emitter: emitterAddress.toUniversalAddress(),
        sequence: parsed.args['sequence'],
      } as WormholeMessageId;
    })
    .filter(isWormholeMessageId);
}
