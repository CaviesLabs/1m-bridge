'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  // Header
  bridge: string;

  // Hero Section
  bridgeAndEarn: string;
  bridgeDescription: string;
  activeCampaign: string;
  startBridgingNow: string;
  viewLeaderboard: string;

  // Bridge Section
  crossChainBridge: string;
  bridgeYourAssets: string;
  bridgeYourAssetsDescription: string;
  sendTokens: string;
  sendTokensDescription: string;
  claimTokens: string;
  claimTokensDescription: string;
  active: string;
  pending: string;
  completed: string;
  bridgeMore: string;

  // Bridge Flow
  bridgeTokensToDestination: string;
  signingTransaction: string;
  signingTransactionDescription: string;
  claimTokensOnDestination: string;
  transactionSigned: string;
  readyToClaim: string;

  // Bridge Interface
  bridgeInterface: string;
  bridgeInterfaceDescription: string;
  important: string;
  importantNote: string;
  fromChain: string;
  toChain: string;
  connectWallet: string;
  disconnectWallet: string;
  connectSourceWallet: string;
  connectDestinationWallet: string;
  disconnectSourceWallet: string;
  disconnectDestinationWallet: string;
  assetAndAmount: string;
  balance: string;
  max: string;
  transactionSummary: string;
  estimatedTime: string;
  bridgeFee: string;
  gasFee: string;
  youWillReceive: string;

  // Transaction History
  transactionHistory: string;
  transaction: string;
  date: string;
  amount: string;
  status: string;
  claim: string;
  export: string;
  claimable: string;
  failed: string;
  transactionHashCopied: string;
  tokensClaimedSuccessfully: string;
  claimFailed: string;
  claimedFromTransaction: string;
  showingTransactions: string;
  totalBridged: string;
  totalRewards: string;
  dateLocale: string;
  viewTransactionHistory: string;
  backToBridge: string;

  // Toast Notifications
  transactionSignedDescription: string;
  claimingTokens: string;
  bridgeCompleted: string;
  bridgeCompletedDescription: string;
  bridgeTransactionFailed: string;
  bridgeTransactionFailedDescription: string;
  claimTransactionFailed: string;
  claimTransactionFailedDescription: string;
  tryAgain: string;
  newBridge: string;

  // Info Cards
  secure: string;
  secureDescription: string;
  fast: string;
  fastDescription: string;
  rewarding: string;
  rewardingDescription: string;

  // Terms
  termsAndConditions: string;
  rewardEligibility: string;
  campaignPeriod: string;
  rewardPool: string;
  minimumAmount: string;
  supportedNetworks: string;
  modifications: string;

  // FAQ
  faq: string;
  faqQuestions: {
    bridgeTime: string;
    bridgeTimeAnswer: string;
    fees: string;
    feesAnswer: string;
    safety: string;
    safetyAnswer: string;
    supportedTokens: string;
    supportedTokensAnswer: string;
    rewardCalculation: string;
    rewardCalculationAnswer: string;
    rewardDistribution: string;
    rewardDistributionAnswer: string;
    multipleBridges: string;
    multipleBridgesAnswer: string;
    failedTransaction: string;
    failedTransactionAnswer: string;
  };

  // Footer
  footerDescription: string;
  products: string;
  analytics: string;
  resources: string;
  documentation: string;
  support: string;
  auditReports: string;
  community: string;
  privacyPolicy: string;
  termsOfService: string;
  copyright: string;

  // Wallet
  wallet: string;
  walletDescription: string;
  walletAddress: string;
  walletBalance: string;
  walletConnect: string;
  walletDisconnect: string;
  walletDisconnectDescription: string;
  walletCopyAddress: string;
  connecting: string;

  // Toast
  toast: {
    walletAddressCopied: string;
    claimOperation: string;
    claimOperationDescription: string;
  };

  // Error
  error: {
    claimOperation: string;
    claimOperationDescription: string;
  };

  page: string;
  of: string;
  claimTooltip: string;
  action: string;
  noTransactions: string;

  connectWalletsFirst: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    bridge: 'Bridge',
    connectWallet: 'Connect Wallet',
    disconnectWallet: 'Disconnect Wallet',

    // Hero Section
    bridgeAndEarn: 'BRIDGE & EARN',
    bridgeDescription: 'Bridge assets across chains and earn rewards',
    activeCampaign: 'Active campaign (December 1, 2024 - March 31, 2025)',
    startBridgingNow: 'Start Bridging Now',
    viewLeaderboard: 'View Leaderboard',

    // Bridge Section
    crossChainBridge: 'Cross-Chain Bridge',
    bridgeYourAssets: 'Bridge Your Assets',
    bridgeYourAssetsDescription:
      'Transfer tokens seamlessly across different blockchains and earn rewards in our active campaign',
    sendTokens: 'Send Tokens',
    sendTokensDescription: 'Select your source chain and initiate the bridge transaction',
    claimTokens: 'Claim Tokens',
    claimTokensDescription: 'Complete the process by claiming your tokens on the destination chain',
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    bridgeMore: 'Bridge More',
    // Bridge Flow
    bridgeTokensToDestination: 'Bridge tokens to destination chain',
    signingTransaction: 'Signing transaction...',
    signingTransactionDescription: 'Please check your wallet to sign the transaction.',
    claimTokensOnDestination: 'Claim tokens on destination chain',
    transactionSigned: 'Transaction signed',
    readyToClaim: 'Ready to claim',

    // Bridge Interface
    bridgeInterface: 'Bridge Interface',
    bridgeInterfaceDescription: 'Transfer your assets across blockchains in just a few clicks',
    important: 'Important:',
    importantNote:
      "Cross-chain bridging requires 2 separate transactions. First, you'll sign a transaction on the source chain, then claim your tokens on the destination chain.",
    fromChain: 'From Chain',
    toChain: 'To Chain',
    connectSourceWallet: 'Connect Source Wallet',
    connectDestinationWallet: 'Connect Destination Wallet',
    disconnectSourceWallet: 'Disconnect Source Wallet',
    disconnectDestinationWallet: 'Disconnect Destination Wallet',
    assetAndAmount: 'Asset and Amount',
    balance: 'Balance:',
    max: 'Max',
    transactionSummary: 'Transaction Summary',
    estimatedTime: 'Estimated time',
    bridgeFee: 'Bridge fee',
    gasFee: 'Gas fee (estimated)',
    youWillReceive: 'You will receive',

    // Transaction History
    transactionHistory: 'Transaction History',
    transaction: 'Transaction',
    date: 'Date',
    amount: 'Amount',
    status: 'Status',
    claim: 'Claim',
    export: 'Export',
    claimable: 'Claimable',
    failed: 'Failed',
    transactionHashCopied: 'Transaction hash copied to clipboard',
    tokensClaimedSuccessfully: 'Tokens claimed successfully!',
    claimFailed: 'Claim failed',
    claimedFromTransaction: 'claimed from transaction',
    showingTransactions: 'Showing {count} transactions',
    totalBridged: 'Total Bridged',
    totalRewards: 'Total Rewards',
    dateLocale: 'en-US',
    viewTransactionHistory: 'View Transaction History',
    backToBridge: 'Back to Bridge',

    // Toast Notifications
    transactionSignedDescription:
      'Your bridge transaction has been successfully signed and submitted to the network',
    claimingTokens: 'Claiming tokens...',
    bridgeCompleted: 'Bridge completed successfully! 🎉',
    bridgeCompletedDescription:
      'Your tokens have been successfully bridged to the destination chain',
    bridgeTransactionFailed: 'Bridge transaction failed',
    bridgeTransactionFailedDescription:
      'The bridge transaction could not be completed. Please check your wallet and try again.',
    claimTransactionFailed: 'Claim transaction failed',
    claimTransactionFailedDescription:
      'Unable to claim tokens on the destination chain. Please try again.',
    tryAgain: 'Try Again',
    newBridge: 'New Bridge',

    // Info Cards
    secure: 'Secure',
    secureDescription: 'Audited smart contracts and battle-tested security',
    fast: 'Fast',
    fastDescription: 'Complete transfers in under 5 minutes',
    rewarding: 'Rewarding',
    rewardingDescription: 'Earn from our $1M campaign pool',

    // Terms
    termsAndConditions: 'Terms and Conditions',
    rewardEligibility:
      'Reward Eligibility: Simply bridge assets across supported chains to be eligible for rewards',
    campaignPeriod: 'Campaign Period: The campaign runs from December 1, 2024, to March 31, 2025',
    rewardPool:
      'Reward Pool: Total reward pool is $1,000,000, distributed proportionally based on bridged amounts',
    minimumAmount:
      'Minimum Amount: A minimum of 100 USDC equivalent must be bridged to be eligible',
    supportedNetworks:
      'Supported Networks: Ethereum, Polygon, Arbitrum, and Optimism are currently supported',
    modifications: 'Modifications: Bridge Protocol reserves the right to modify terms at any time',

    // FAQ
    faq: 'Frequently Asked Questions',
    faqQuestions: {
      bridgeTime: 'How long does bridging take?',
      bridgeTimeAnswer:
        'Bridging typically takes 30 seconds to 5 minutes depending on network congestion and the chains involved.',
      fees: 'What are the fees for bridging?',
      feesAnswer:
        'Bridge fees are typically 0.1% of the bridged amount plus gas fees on both source and destination chains.',
      safety: 'Is bridging safe?',
      safetyAnswer:
        'Our bridge uses industry-standard security practices and has been audited by leading security firms. However, all DeFi activities carry inherent risks.',
      supportedTokens: 'Which tokens are supported?',
      supportedTokensAnswer:
        'We support major tokens like USDC, USDT, ETH, WBTC across Ethereum, Polygon, Arbitrum, and Optimism networks.',
      rewardCalculation: 'How are rewards calculated?',
      rewardCalculationAnswer:
        'Rewards are distributed proportionally based on the USD value of assets bridged during the campaign period.',
      rewardDistribution: 'When will rewards be distributed?',
      rewardDistributionAnswer:
        'Rewards will be distributed within 30 days after the campaign ends on March 31, 2025.',
      multipleBridges: 'Can I bridge multiple times?',
      multipleBridgesAnswer:
        'Yes, you can bridge multiple times during the campaign period. Each qualifying bridge transaction will contribute to your total reward allocation.',
      failedTransaction: 'What happens if a transaction fails?',
      failedTransactionAnswer:
        'If a bridge transaction fails, your funds will remain on the source chain. You can retry the transaction or contact support for assistance.',
    },

    // Footer
    footerDescription: 'Seamless cross-chain asset transfers with maximum security and efficiency.',
    products: 'Products',
    analytics: 'Analytics',
    resources: 'Resources',
    documentation: 'Documentation',
    support: 'Support',
    auditReports: 'Audit Reports',
    community: 'Community',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    copyright: '© 2025 Bridge Protocol. All rights reserved.',

    // Wallet
    wallet: 'Wallet',
    walletDescription: 'Connect wallet to start bridging',
    walletAddress: 'Wallet address',
    walletBalance: 'Wallet balance',
    walletConnect: 'Connect wallet',
    walletDisconnect: 'Disconnect wallet',
    walletDisconnectDescription: 'Sign out of your wallet',
    walletCopyAddress: 'Copy address',
    connecting: 'Connecting...',

    // Toast
    toast: {
      walletAddressCopied: 'Địa chỉ ví đã được sao chép',
      claimOperation: 'Thao tác nhận',
      claimOperationDescription: 'Hàm nhận không được khởi tạo',
    },

    // Error
    error: {
      claimOperation: 'Claim operation',
      claimOperationDescription: 'Claim function is not initialized',
    },

    page: 'Page',
    of: 'of',
    claimTooltip: "Only works if you haven't claimed your bridged tokens yet",
    action: 'Action',
    noTransactions: 'No transactions found',

    connectWalletsFirst: 'Please connect both wallets first',
  },

  vi: {
    // Header
    bridge: 'Cầu nối',
    connectWallet: 'Kết nối ví',
    disconnectWallet: 'Ngắt kết nối ví',

    // Hero Section
    bridgeAndEarn: 'CẦU NỐI & KIẾM THƯỞNG',
    bridgeDescription: 'Chuyển tài sản qua các blockchain và nhận phần thưởng',
    activeCampaign: 'Chiến dịch đang hoạt động (1 tháng 12, 2024 - 31 tháng 3, 2025)',
    startBridgingNow: 'Bắt đầu cầu nối ngay',
    viewLeaderboard: 'Xem bảng xếp hạng',

    // Bridge Section
    crossChainBridge: 'Cầu nối chuỗi chéo',
    bridgeYourAssets: 'Chuyển tài sản của bạn',
    bridgeYourAssetsDescription:
      'Chuyển token một cách mượt mà giữa các blockchain khác nhau và nhận thưởng từ chiến dịch đang diễn ra.',
    sendTokens: 'Gửi Token',
    sendTokensDescription: 'Chọn blockchain nguồn và bắt đầu giao dịch cầu nối',
    claimTokens: 'Nhận Token',
    claimTokensDescription: 'Hoàn thành quá trình bằng cách nhận token trên blockchain đích',
    active: 'Đang hoạt động',
    pending: 'Đang chờ',
    completed: 'Hoàn thành',
    bridgeMore: 'Cầu nối thêm',
    // Bridge Flow
    bridgeTokensToDestination: 'Chuyển token đến blockchain đích',
    signingTransaction: 'Đang ký giao dịch...',
    signingTransactionDescription: 'Vui lòng kiểm tra ví của bạn để ký giao dịch.',
    claimTokensOnDestination: 'Nhận token trên blockchain đích',
    transactionSigned: 'Giao dịch đã được ký',
    readyToClaim: 'Sẵn sàng nhận',

    // Bridge Interface
    bridgeInterface: 'Giao diện cầu nối',
    bridgeInterfaceDescription: 'Chuyển tài sản giữa các blockchain chỉ với vài cú click',
    important: 'Quan trọng:',
    importantNote:
      'Việc chuyển tài sản giữa các blockchain gồm 2 bước. Bạn sẽ thực hiện giao dịch đầu tiên trên chuỗi nguồn, sau đó nhận token của mình trên chuỗi đích.',
    fromChain: 'Từ blockchain',
    toChain: 'Đến blockchain',
    connectSourceWallet: 'Kết nối ví nguồn',
    connectDestinationWallet: 'Kết nối ví đích',
    disconnectSourceWallet: 'Ngắt kết nối ví nguồn',
    disconnectDestinationWallet: 'Ngắt kết nối ví đích',
    assetAndAmount: 'Tài sản và số lượng',
    balance: 'Số dư:',
    max: 'Tối đa',
    transactionSummary: 'Tóm tắt giao dịch',
    estimatedTime: 'Thời gian ước tính',
    bridgeFee: 'Phí cầu nối',
    gasFee: 'Phí gas (ước tính)',
    youWillReceive: 'Bạn sẽ nhận được',

    // Transaction History
    transactionHistory: 'Lịch sử giao dịch',
    transaction: 'Giao dịch',
    date: 'Ngày',
    amount: 'Số lượng',
    status: 'Trạng thái',
    claim: 'Nhận',
    export: 'Xuất',
    claimable: 'Có thể nhận',
    failed: 'Thất bại',
    transactionHashCopied: 'Đã sao chép mã hash giao dịch',
    tokensClaimedSuccessfully: 'Nhận token thành công!',
    claimFailed: 'Nhận token thất bại',
    claimedFromTransaction: 'đã nhận từ giao dịch',
    showingTransactions: 'Hiển thị {count} giao dịch',
    totalBridged: 'Tổng đã chuyển',
    totalRewards: 'Tổng phần thưởng',
    dateLocale: 'vi-VN',
    viewTransactionHistory: 'Xem lịch sử giao dịch',
    backToBridge: 'Quay lại cầu nối',

    // Toast Notifications
    transactionSignedDescription: 'Giao dịch cầu nối của bạn đã được ký thành công và gửi lên mạng',
    claimingTokens: 'Đang nhận token...',
    bridgeCompleted: 'Cầu nối hoàn thành thành công! 🎉',
    bridgeCompletedDescription: 'Token của bạn đã được chuyển thành công đến blockchain đích',
    bridgeTransactionFailed: 'Giao dịch cầu nối thất bại',
    bridgeTransactionFailedDescription:
      'Không thể hoàn thành giao dịch cầu nối. Vui lòng kiểm tra ví của bạn và thử lại.',
    claimTransactionFailed: 'Giao dịch nhận token thất bại',
    claimTransactionFailedDescription:
      'Không thể nhận token trên blockchain đích. Vui lòng thử lại.',
    tryAgain: 'Thử lại',
    newBridge: 'Cầu nối mới',

    // Info Cards
    secure: 'An toàn',
    secureDescription: 'Hợp đồng thông minh đã được kiểm toán và bảo mật đã được thử nghiệm',
    fast: 'Nhanh chóng',
    fastDescription: 'Hoàn thành chuyển đổi trong vòng 5 phút',
    rewarding: 'Phần thưởng',
    rewardingDescription: 'Kiếm tiền từ quỹ chiến dịch 1 triệu đô của chúng tôi',

    // Terms
    termsAndConditions: 'Điều khoản và điều kiện',
    rewardEligibility:
      'Đủ điều kiện nhận thưởng: Đơn giản chỉ cần chuyển tài sản qua các blockchain được hỗ trợ để đủ điều kiện nhận thưởng',
    campaignPeriod:
      'Thời gian chiến dịch: Chiến dịch diễn ra từ ngày 1 tháng 12, 2024 đến ngày 31 tháng 3, 2025',
    rewardPool:
      'Quỹ thưởng: Tổng quỹ thưởng là $1,000,000, được phân phối theo tỷ lệ dựa trên số lượng tài sản được chuyển',
    minimumAmount:
      'Số lượng tối thiểu: Tối thiểu 100 USDC tương đương phải được chuyển để đủ điều kiện',
    supportedNetworks:
      'Mạng được hỗ trợ: Ethereum, Polygon, Arbitrum và Optimism hiện đang được hỗ trợ',
    modifications: 'Sửa đổi: Bridge Protocol có quyền sửa đổi điều khoản bất cứ lúc nào',

    // FAQ
    faq: 'Câu hỏi thường gặp',
    faqQuestions: {
      bridgeTime: 'Cầu nối mất bao lâu?',
      bridgeTimeAnswer:
        'Cầu nối thường mất từ 30 giây đến 5 phút tùy thuộc vào tình trạng tắc nghẽn mạng và các blockchain liên quan.',
      fees: 'Phí cầu nối là bao nhiêu?',
      feesAnswer:
        'Phí cầu nối thường là 0.1% của số tiền được chuyển cộng với phí gas trên cả blockchain nguồn và đích.',
      safety: 'Cầu nối có an toàn không?',
      safetyAnswer:
        'Cầu nối của chúng tôi sử dụng các thực tiễn bảo mật tiêu chuẩn ngành và đã được kiểm toán bởi các công ty bảo mật hàng đầu. Tuy nhiên, tất cả hoạt động DeFi đều có rủi ro tiềm ẩn.',
      supportedTokens: 'Những token nào được hỗ trợ?',
      supportedTokensAnswer:
        'Chúng tôi hỗ trợ các token chính như USDC, USDT, ETH, WBTC trên các mạng Ethereum, Polygon, Arbitrum và Optimism.',
      rewardCalculation: 'Phần thưởng được tính như thế nào?',
      rewardCalculationAnswer:
        'Phần thưởng được phân phối theo tỷ lệ dựa trên giá trị USD của tài sản được chuyển trong thời gian chiến dịch.',
      rewardDistribution: 'Khi nào phần thưởng sẽ được phân phối?',
      rewardDistributionAnswer:
        'Phần thưởng sẽ được phân phối trong vòng 30 ngày sau khi chiến dịch kết thúc vào ngày 31 tháng 3, 2025.',
      multipleBridges: 'Tôi có thể cầu nối nhiều lần không?',
      multipleBridgesAnswer:
        'Có, bạn có thể cầu nối nhiều lần trong thời gian chiến dịch. Mỗi giao dịch cầu nối đủ điều kiện sẽ góp phần vào tổng phần thưởng của bạn.',
      failedTransaction: 'Điều gì xảy ra nếu giao dịch thất bại?',
      failedTransactionAnswer:
        'Nếu giao dịch cầu nối thất bại, tiền của bạn sẽ vẫn ở blockchain nguồn. Bạn có thể thử lại giao dịch hoặc liên hệ hỗ trợ để được trợ giúp.',
    },

    // Footer
    footerDescription: 'Chuyển tài sản chuỗi chéo liền mạch với bảo mật và hiệu quả tối đa.',
    products: 'Sản phẩm',
    analytics: 'Phân tích',
    resources: 'Tài nguyên',
    documentation: 'Tài liệu',
    support: 'Hỗ trợ',
    auditReports: 'Báo cáo kiểm toán',
    community: 'Cộng đồng',
    privacyPolicy: 'Chính sách riêng tư',
    termsOfService: 'Điều khoản dịch vụ',
    copyright: '© 2025 Bridge Protocol. Tất cả quyền được bảo lưu.',

    // Wallet
    wallet: 'Ví',
    walletDescription: 'Kết nối ví để bắt đầu cầu nối',
    walletAddress: 'Địa chỉ ví',
    walletBalance: 'Số dư ví',
    walletConnect: 'Kết nối ví',
    walletDisconnect: 'Ngắt kết nối',
    walletDisconnectDescription: 'Đăng xuất khỏi ví',
    walletCopyAddress: 'Sao chép địa chỉ',
    connecting: 'Đang kết nối...',

    // Toast
    toast: {
      walletAddressCopied: 'Địa chỉ ví đã được sao chép',
      claimOperation: 'Thao tác nhận',
      claimOperationDescription: 'Hàm nhận không được khởi tạo',
    },

    // Error
    error: {
      claimOperation: 'Thao tác nhận',
      claimOperationDescription: 'Hàm nhận không được khởi tạo',
    },

    page: 'Trang',
    of: 'của',
    claimTooltip: 'Chỉ hoạt động nếu bạn chưa nhận token đã chuyển',
    action: 'Hành động',
    noTransactions: 'Không tìm thấy giao dịch nào',

    connectWalletsFirst: 'Vui lòng kết nối cả hai ví trước',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
