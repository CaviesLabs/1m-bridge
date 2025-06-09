"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  // Header
  bridge: string;
  connectWallet: string;
  
  // Hero Section
  bridgeAndEarn: string;
  bridgeDescription: string;
  activeCampaign: string;
  
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
  
  // Bridge Interface
  bridgeInterface: string;
  bridgeInterfaceDescription: string;
  important: string;
  importantNote: string;
  fromChain: string;
  toChain: string;
  connectSourceWallet: string;
  connectDestinationWallet: string;
  assetAndAmount: string;
  balance: string;
  max: string;
  transactionSummary: string;
  estimatedTime: string;
  bridgeFee: string;
  gasFee: string;
  youWillReceive: string;
  
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
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    bridge: 'Bridge',
    connectWallet: 'Connect Wallet',
    
    // Hero Section
    bridgeAndEarn: 'BRIDGE & EARN',
    bridgeDescription: 'Bridge assets across chains and earn rewards',
    activeCampaign: 'Active campaign (December 1, 2024 - March 31, 2025)',
    
    // Bridge Section
    crossChainBridge: 'Cross-Chain Bridge',
    bridgeYourAssets: 'Bridge Your Assets',
    bridgeYourAssetsDescription: 'Transfer tokens seamlessly across different blockchains and earn rewards in our active campaign',
    sendTokens: 'Send Tokens',
    sendTokensDescription: 'Select your source chain and initiate the bridge transaction',
    claimTokens: 'Claim Tokens',
    claimTokensDescription: 'Complete the process by claiming your tokens on the destination chain',
    active: 'Active',
    pending: 'Pending',
    
    // Bridge Interface
    bridgeInterface: 'Bridge Interface',
    bridgeInterfaceDescription: 'Transfer your assets across blockchains in just a few clicks',
    important: 'Important:',
    importantNote: 'Cross-chain bridging requires 2 separate transactions. First, you\'ll sign a transaction on the source chain, then claim your tokens on the destination chain.',
    fromChain: 'From Chain',
    toChain: 'To Chain',
    connectSourceWallet: 'Connect Source Wallet',
    connectDestinationWallet: 'Connect Destination Wallet',
    assetAndAmount: 'Asset and Amount',
    balance: 'Balance:',
    max: 'Max',
    transactionSummary: 'Transaction Summary',
    estimatedTime: 'Estimated time',
    bridgeFee: 'Bridge fee',
    gasFee: 'Gas fee (estimated)',
    youWillReceive: 'You will receive',
    
    // Info Cards
    secure: 'Secure',
    secureDescription: 'Audited smart contracts and battle-tested security',
    fast: 'Fast',
    fastDescription: 'Complete transfers in under 5 minutes',
    rewarding: 'Rewarding',
    rewardingDescription: 'Earn from our $1M campaign pool',
    
    // Terms
    termsAndConditions: 'Terms and Conditions',
    rewardEligibility: 'Reward Eligibility: Simply bridge assets across supported chains to be eligible for rewards',
    campaignPeriod: 'Campaign Period: The campaign runs from December 1, 2024, to March 31, 2025',
    rewardPool: 'Reward Pool: Total reward pool is $1,000,000, distributed proportionally based on bridged amounts',
    minimumAmount: 'Minimum Amount: A minimum of 100 USDC equivalent must be bridged to be eligible',
    supportedNetworks: 'Supported Networks: Ethereum, Polygon, Arbitrum, and Optimism are currently supported',
    modifications: 'Modifications: Bridge Protocol reserves the right to modify terms at any time',
    
    // FAQ
    faq: 'Frequently Asked Questions',
    faqQuestions: {
      bridgeTime: 'How long does bridging take?',
      bridgeTimeAnswer: 'Bridging typically takes 30 seconds to 5 minutes depending on network congestion and the chains involved.',
      fees: 'What are the fees for bridging?',
      feesAnswer: 'Bridge fees are typically 0.1% of the bridged amount plus gas fees on both source and destination chains.',
      safety: 'Is bridging safe?',
      safetyAnswer: 'Our bridge uses industry-standard security practices and has been audited by leading security firms. However, all DeFi activities carry inherent risks.',
      supportedTokens: 'Which tokens are supported?',
      supportedTokensAnswer: 'We support major tokens like USDC, USDT, ETH, WBTC across Ethereum, Polygon, Arbitrum, and Optimism networks.',
      rewardCalculation: 'How are rewards calculated?',
      rewardCalculationAnswer: 'Rewards are distributed proportionally based on the USD value of assets bridged during the campaign period.',
      rewardDistribution: 'When will rewards be distributed?',
      rewardDistributionAnswer: 'Rewards will be distributed within 30 days after the campaign ends on March 31, 2025.',
      multipleBridges: 'Can I bridge multiple times?',
      multipleBridgesAnswer: 'Yes, you can bridge multiple times during the campaign period. Each qualifying bridge transaction will contribute to your total reward allocation.',
      failedTransaction: 'What happens if a transaction fails?',
      failedTransactionAnswer: 'If a bridge transaction fails, your funds will remain on the source chain. You can retry the transaction or contact support for assistance.'
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
    copyright: '© 2024 Bridge Protocol. All rights reserved.',
  },
  
  vi: {
    // Header
    bridge: 'Cầu nối',
    connectWallet: 'Kết nối ví',
    
    // Hero Section
    bridgeAndEarn: 'CẦU NỐI & KIẾM THƯỞNG',
    bridgeDescription: 'Chuyển tài sản qua các blockchain và nhận phần thưởng',
    activeCampaign: 'Chiến dịch đang hoạt động (1 tháng 12, 2024 - 31 tháng 3, 2025)',
    
    // Bridge Section
    crossChainBridge: 'Cầu nối chuỗi chéo',
    bridgeYourAssets: 'Chuyển tài sản của bạn',
    bridgeYourAssetsDescription: 'Chuyển token một cách liền mạch qua các blockchain khác nhau và kiếm phần thưởng trong chiến dịch đang hoạt động',
    sendTokens: 'Gửi Token',
    sendTokensDescription: 'Chọn blockchain nguồn và bắt đầu giao dịch cầu nối',
    claimTokens: 'Nhận Token',
    claimTokensDescription: 'Hoàn thành quá trình bằng cách nhận token trên blockchain đích',
    active: 'Đang hoạt động',
    pending: 'Đang chờ',
    
    // Bridge Interface
    bridgeInterface: 'Giao diện cầu nối',
    bridgeInterfaceDescription: 'Chuyển tài sản qua các blockchain chỉ với vài cú click',
    important: 'Quan trọng:',
    importantNote: 'Cầu nối chuỗi chéo yêu cầu 2 giao dịch riêng biệt. Đầu tiên, bạn sẽ ký giao dịch trên blockchain nguồn, sau đó nhận token trên blockchain đích.',
    fromChain: 'Từ blockchain',
    toChain: 'Đến blockchain',
    connectSourceWallet: 'Kết nối ví nguồn',
    connectDestinationWallet: 'Kết nối ví đích',
    assetAndAmount: 'Tài sản và số lượng',
    balance: 'Số dư:',
    max: 'Tối đa',
    transactionSummary: 'Tóm tắt giao dịch',
    estimatedTime: 'Thời gian ước tính',
    bridgeFee: 'Phí cầu nối',
    gasFee: 'Phí gas (ước tính)',
    youWillReceive: 'Bạn sẽ nhận được',
    
    // Info Cards
    secure: 'An toàn',
    secureDescription: 'Hợp đồng thông minh đã được kiểm toán và bảo mật đã được thử nghiệm',
    fast: 'Nhanh chóng',
    fastDescription: 'Hoàn thành chuyển đổi trong vòng 5 phút',
    rewarding: 'Có lãi',
    rewardingDescription: 'Kiếm tiền từ quỹ chiến dịch 1 triệu đô của chúng tôi',
    
    // Terms
    termsAndConditions: 'Điều khoản và điều kiện',
    rewardEligibility: 'Đủ điều kiện nhận thưởng: Đơn giản chỉ cần chuyển tài sản qua các blockchain được hỗ trợ để đủ điều kiện nhận thưởng',
    campaignPeriod: 'Thời gian chiến dịch: Chiến dịch diễn ra từ ngày 1 tháng 12, 2024 đến ngày 31 tháng 3, 2025',
    rewardPool: 'Quỹ thưởng: Tổng quỹ thưởng là $1,000,000, được phân phối theo tỷ lệ dựa trên số lượng tài sản được chuyển',
    minimumAmount: 'Số lượng tối thiểu: Tối thiểu 100 USDC tương đương phải được chuyển để đủ điều kiện',
    supportedNetworks: 'Mạng được hỗ trợ: Ethereum, Polygon, Arbitrum và Optimism hiện đang được hỗ trợ',
    modifications: 'Sửa đổi: Bridge Protocol có quyền sửa đổi điều khoản bất cứ lúc nào',
    
    // FAQ
    faq: 'Câu hỏi thường gặp',
    faqQuestions: {
      bridgeTime: 'Cầu nối mất bao lâu?',
      bridgeTimeAnswer: 'Cầu nối thường mất từ 30 giây đến 5 phút tùy thuộc vào tình trạng tắc nghẽn mạng và các blockchain liên quan.',
      fees: 'Phí cầu nối là bao nhiêu?',
      feesAnswer: 'Phí cầu nối thường là 0.1% của số tiền được chuyển cộng với phí gas trên cả blockchain nguồn và đích.',
      safety: 'Cầu nối có an toàn không?',
      safetyAnswer: 'Cầu nối của chúng tôi sử dụng các thực tiễn bảo mật tiêu chuẩn ngành và đã được kiểm toán bởi các công ty bảo mật hàng đầu. Tuy nhiên, tất cả hoạt động DeFi đều có rủi ro tiềm ẩn.',
      supportedTokens: 'Những token nào được hỗ trợ?',
      supportedTokensAnswer: 'Chúng tôi hỗ trợ các token chính như USDC, USDT, ETH, WBTC trên các mạng Ethereum, Polygon, Arbitrum và Optimism.',
      rewardCalculation: 'Phần thưởng được tính như thế nào?',
      rewardCalculationAnswer: 'Phần thưởng được phân phối theo tỷ lệ dựa trên giá trị USD của tài sản được chuyển trong thời gian chiến dịch.',
      rewardDistribution: 'Khi nào phần thưởng sẽ được phân phối?',
      rewardDistributionAnswer: 'Phần thưởng sẽ được phân phối trong vòng 30 ngày sau khi chiến dịch kết thúc vào ngày 31 tháng 3, 2025.',
      multipleBridges: 'Tôi có thể cầu nối nhiều lần không?',
      multipleBridgesAnswer: 'Có, bạn có thể cầu nối nhiều lần trong thời gian chiến dịch. Mỗi giao dịch cầu nối đủ điều kiện sẽ góp phần vào tổng phần thưởng của bạn.',
      failedTransaction: 'Điều gì xảy ra nếu giao dịch thất bại?',
      failedTransactionAnswer: 'Nếu giao dịch cầu nối thất bại, tiền của bạn sẽ vẫn ở blockchain nguồn. Bạn có thể thử lại giao dịch hoặc liên hệ hỗ trợ để được trợ giúp.'
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
    copyright: '© 2024 Bridge Protocol. Tất cả quyền được bảo lưu.',
  }
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

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}