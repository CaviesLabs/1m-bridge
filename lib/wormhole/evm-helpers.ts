import { isWormholeMessageId, type WormholeMessageId } from '@wormhole-foundation/sdk';
import { EvmAddress } from '@wormhole-foundation/sdk-evm';

export async function parseTransaction(chain: any, receipt: any, coreAddress: string) {
  return receipt.logs
    .filter((l: any) => {
      return l.address === coreAddress;
    })
    .map(log => {
      const { topics, data } = log;
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
