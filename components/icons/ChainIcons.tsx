interface ChainIconProps {
  className?: string;
  size?: number;
}

export function EthereumIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L12.267 2.133L18 6.267L12 14L6 6.267L12.267 2.133L12 2Z" fill="#627EEA" />
      <path d="M12 14L18 6.267L12 10.267L6 6.267L12 14Z" fill="#627EEA" fillOpacity={0.6} />
      <path d="M12 15.5L12.267 15.633L18 11.5L12 22L6 11.5L12.267 15.633L12 15.5Z" fill="#627EEA" />
      <path d="M12 15.5L18 11.5L12 19.5L6 11.5L12 15.5Z" fill="#627EEA" fillOpacity={0.6} />
    </svg>
  );
}

export function PolygonIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L22 8V16L12 22L2 8V16L12 22" stroke="#8247E5" strokeWidth="2" fill="none" />
      <path d="M16.5 6.5L12 4L7.5 6.5V9.5L12 12L16.5 9.5V6.5Z" fill="#8247E5" />
      <path
        d="M16.5 14.5L12 12L7.5 14.5V17.5L12 20L16.5 17.5V14.5Z"
        fill="#8247E5"
        fillOpacity={0.6}
      />
    </svg>
  );
}

export function ArbitrumIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#28A0F0" />
      <path
        d="M8.5 9L12 6L15.5 9V15L12 18L8.5 15V9Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M10 11L12 9.5L14 11V13L12 14.5L10 13V11Z" fill="white" />
    </svg>
  );
}

export function OptimismIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#FF0420" />
      <path
        d="M7 10C7 8.5 8.5 7 10 7C11.5 7 13 8.5 13 10C13 11.5 11.5 13 10 13C8.5 13 7 11.5 7 10Z"
        fill="white"
      />
      <path
        d="M11 14C11 12.5 12.5 11 14 11C15.5 11 17 12.5 17 14C17 15.5 15.5 17 14 17C12.5 17 11 15.5 11 14Z"
        fill="white"
      />
    </svg>
  );
}

// Token Icons
export function USDCIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#2775CA" />
      <path
        d="M12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6Z"
        fill="white"
      />
      <path
        d="M12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16C9.8 16 8 14.2 8 12C8 9.8 9.8 8 12 8Z"
        fill="#2775CA"
      />
      <text
        x="12"
        y="13"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="6"
        fontWeight="bold"
      >
        $
      </text>
    </svg>
  );
}

export function USDTIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#26A17B" />
      <path d="M8 10H16V8H14V7H10V8H8V10Z" fill="white" />
      <path d="M11 11H13V17H11V11Z" fill="white" />
      <path d="M9 11H15C15 12.1 14.1 13 13 13H11C9.9 13 9 12.1 9 11Z" fill="white" />
    </svg>
  );
}

export function WBTCIcon({ className = '', size = 24 }: ChainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#F7931A" />
      <path
        d="M15.5 10.5C15.8 9.8 15.4 9 14.6 8.8C13.8 8.6 13 9 12.8 9.8L12.2 11.8L10.8 11.4L11.4 9.4C11.6 8.6 11.2 7.8 10.4 7.6C9.6 7.4 8.8 7.8 8.6 8.6L8 10.6L6.5 10.2L7.1 8.2C7.3 7.4 6.9 6.6 6.1 6.4C5.3 6.2 4.5 6.6 4.3 7.4L3.7 9.4L2.5 9.1L3.1 7.1C3.5 5.5 5.1 4.5 6.7 4.9L21.5 8.9C21.7 9.7 21.3 10.5 20.5 10.7L15.5 10.5Z"
        fill="white"
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="5"
        fontWeight="bold"
      >
        ₿
      </text>
    </svg>
  );
}

// Export all icons as a map for easy access
export const chainIcons = {
  ethereum: EthereumIcon,
  polygon: PolygonIcon,
  arbitrum: ArbitrumIcon,
  optimism: OptimismIcon,
} as const;

export const tokenIcons = {
  USDC: USDCIcon,
  USDT: USDTIcon,
  ETH: EthereumIcon,
  WBTC: WBTCIcon,
} as const;
