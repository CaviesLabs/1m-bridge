import { NextRequest, NextResponse } from 'next/server';

interface WormholeOperation {
  id: string;
  emitterChain: number;
  emitterAddress: { hex: string; native: string };
  sequence: string;
  vaa: any;
  content: any;
  sourceChain: any;
  data: any;
}

interface WormholeApiResponse {
  operations: WormholeOperation[];
}

export interface BridgeTransaction {
  hash: string;
  sourceChain: string;
  destinationChain: string;
  token: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
}

const CHAIN_ID_TO_NAME: Record<number, string> = {
  0: 'solana',
  1: 'solana',
  40: 'seievm',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const address = searchParams.get('address');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  if (!address) {
    return NextResponse.json({ error: 'Missing or invalid address' }, { status: 400 });
  }

  try {
    const apiUrl = `https://api.wormholescan.io/api/v1/operations?page=${page}&pageSize=${limit}&sortOrder=DESC&address=${address}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch from WormholeScan API');
    }
    const data: WormholeApiResponse = await response.json();

    const transactions: BridgeTransaction[] = (data.operations || []).map(op => ({
      hash: op.sourceChain?.transaction?.txHash || op.id,
      sourceChain: CHAIN_ID_TO_NAME[op.emitterChain] || String(op.emitterChain),
      destinationChain:
        CHAIN_ID_TO_NAME[op.content?.standarizedProperties?.toChain] ||
        String(op.content?.standarizedProperties?.toChain),
      token: op.data?.symbol || '',
      amount: op.data?.tokenAmount || '',
      status: op.sourceChain?.status === 'confirmed' ? 'completed' : 'pending',
      timestamp: op.sourceChain?.timestamp
        ? new Date(op.sourceChain.timestamp).getTime()
        : Date.now(),
    }));

    const result = transactions?.filter(tx => Number(tx.amount) > 0);
    return NextResponse.json({ transactions: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
