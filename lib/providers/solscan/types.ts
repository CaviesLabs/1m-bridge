export interface TokenBalanceResponse {
    success: boolean
    data: Data
    metadata: Metadata
}

export interface Data {
    data_type: string
    tokens: TokenBalance[]
    count: number
}

export interface TokenBalance {
    address: string
    tokenAddress: string
    amount: number
    decimals: number
    owner: string
    tokenName: string
    tokenSymbol: string
    balance: number
    value?: number
    priceUsdt?: number
    tokenIcon?: string
}

export interface TokenInfo {
    token_address: string
    token_name: string
    token_symbol: string
    token_icon: string
    token_decimals: number
    token_type: string
    price_usdt: number
    extensions: {
        description: string;
    }
    onchain_extensions: string
}

export interface Metadata {
    tokens: Record<string, TokenInfo>;
}