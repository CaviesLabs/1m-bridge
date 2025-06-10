'use client';

import {
  ArbitrumIcon,
  EthereumIcon,
  OptimismIcon,
  PolygonIcon,
  USDCIcon,
  USDTIcon,
  WBTCIcon,
} from '@/components/icons/ChainIcons';
import { useBridge } from '@/context/BridgeContext';
import { ArrowUpDown, ExternalLink, Info, Loader2, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function BridgeInterface() {
  const { t } = useLanguage();
  const { currentStep, isWalletConnected, isSigning, connectWallet, startBridge, claimTokens } =
    useBridge();
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');

  const chains = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: EthereumIcon,
      color: '#627EEA',
    },
    {
      id: 'polygon',
      name: 'Polygon',
      icon: PolygonIcon,
      color: '#8247E5',
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      icon: ArbitrumIcon,
      color: '#28A0F0',
    },
    {
      id: 'optimism',
      name: 'Optimism',
      icon: OptimismIcon,
      color: '#FF0420',
    },
  ];

  const tokens = [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: USDCIcon,
      color: '#2775CA',
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      icon: USDTIcon,
      color: '#26A17B',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: EthereumIcon,
      color: '#627EEA',
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      icon: WBTCIcon,
      color: '#F7931A',
    },
  ];

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const getButtonContent = () => {
    switch (currentStep) {
      case 'connect':
        return {
          text: t.connectWallet,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: connectWallet,
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200',
        };

      case 'bridge':
        return {
          text: t.bridgeTokensToDestination,
          icon: <ArrowUpDown className="w-5 h-5 mr-2" />,
          onClick: startBridge,
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200',
        };

      case 'signing':
        return {
          text: t.signingTransaction,
          icon: <Loader2 className="w-5 h-5 mr-2 animate-spin" />,
          onClick: () => {},
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 cursor-wait transition-all duration-200',
          disabled: true,
        };

      case 'claim':
        return {
          text: t.claimTokensOnDestination,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: claimTokens,
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200',
        };

      case 'completed':
        return {
          text: t.completed,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: () => {},
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-gray-400 to-gray-500 cursor-default',
          disabled: true,
        };

      default:
        return {
          text: t.connectWallet,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: connectWallet,
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200',
        };
    }
  };

  const buttonConfig = getButtonContent();

  // Get the selected chain's display data
  const fromChainData = chains.find(chain => chain.id === fromChain);
  const toChainData = chains.find(chain => chain.id === toChain);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.bridgeInterface}
          </CardTitle>
          <p className="text-muted-foreground">{t.bridgeInterfaceDescription}</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Important Notice */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                  {t.important}
                </span>
                <span className="text-yellow-800 dark:text-yellow-200 ml-1">{t.importantNote}</span>
              </div>
            </div>
          </div>

          {/* Chain Selection Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
              {/* From Chain */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t.fromChain}</Label>
                <Select value={fromChain} onValueChange={setFromChain}>
                  <SelectTrigger className="h-14 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue>
                      {fromChainData && (
                        <div className="flex items-center gap-3">
                          <fromChainData.icon size={20} />
                          <span>{fromChainData.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map(chain => {
                      const IconComponent = chain.icon;
                      return (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center gap-3">
                            <IconComponent size={20} />
                            <span>{chain.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Badge variant={isWalletConnected ? 'default' : 'outline'} className="text-xs">
                    <Wallet className="w-3 h-3 mr-1" />
                    {isWalletConnected ? 'Connected' : t.connectSourceWallet}
                  </Badge>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapChains}
                    className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>

              {/* To Chain */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t.toChain}</Label>
                <Select value={toChain} onValueChange={setToChain}>
                  <SelectTrigger className="h-14 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue>
                      {toChainData && (
                        <div className="flex items-center gap-3">
                          <toChainData.icon size={20} />
                          <span>{toChainData.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map(chain => {
                      const IconComponent = chain.icon;
                      return (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center gap-3">
                            <IconComponent size={20} />
                            <span>{chain.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      currentStep === 'claim' || currentStep === 'completed' ? 'default' : 'outline'
                    }
                    className="text-xs"
                  >
                    <Wallet className="w-3 h-3 mr-1" />
                    {currentStep === 'claim' || currentStep === 'completed'
                      ? 'Connected'
                      : t.connectDestinationWallet}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{t.assetAndAmount}</Label>
              <div className="text-sm text-muted-foreground">
                {t.balance} <span className="font-semibold text-foreground">1,000.00</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="h-14 text-xl border-2 hover:border-primary/50 focus:border-primary transition-colors"
                    disabled={currentStep === 'signing'}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setAmount('1000')}
                  className="h-14 px-6 border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  disabled={currentStep === 'signing'}
                >
                  {t.max}
                </Button>
                <Select
                  value={fromToken}
                  onValueChange={setFromToken}
                  disabled={currentStep === 'signing'}
                >
                  <SelectTrigger className="w-40 h-14 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue>
                      {(() => {
                        const tokenData = tokens.find(token => token.symbol === fromToken);
                        if (!tokenData) return null;
                        const IconComponent = tokenData.icon;
                        return (
                          <div className="flex items-center gap-2">
                            <IconComponent size={16} />
                            <span>{tokenData.symbol}</span>
                          </div>
                        );
                      })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => {
                      const IconComponent = token.icon;
                      return (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <IconComponent size={16} />
                            <span>{token.symbol}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Bridge Button with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              whileHover={
                !buttonConfig.disabled && (!amount && currentStep !== 'connect') === false
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                !buttonConfig.disabled && (!amount && currentStep !== 'connect') === false
                  ? { scale: 0.98 }
                  : {}
              }
            >
              <Button
                className={buttonConfig.className}
                onClick={buttonConfig.onClick}
                disabled={buttonConfig.disabled || (!amount && currentStep !== 'connect')}
              >
                <motion.div
                  className="flex items-center justify-center"
                  animate={isSigning ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: isSigning ? Infinity : 0, duration: 1 }}
                >
                  {buttonConfig.icon}
                  {buttonConfig.text}
                </motion.div>
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Status Messages */}
          <AnimatePresence>
            {currentStep === 'signing' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-spin" />
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                      {t.signingTransaction}
                    </span>
                    <span className="text-yellow-700 dark:text-yellow-300 ml-1">
                      Please check your wallet to sign the transaction.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'claim' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800/50 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-green-600 dark:text-green-400">✅</div>
                  <div className="text-sm">
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      {t.transactionSigned}
                    </span>
                    <span className="text-green-700 dark:text-green-300 ml-1">
                      {t.readyToClaim}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transaction Details */}
          <div className="bg-muted/30 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              {t.transactionSummary}
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.estimatedTime}</span>
                <span className="font-medium">~30 seconds</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.bridgeFee}</span>
                <span className="font-medium">0.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.gasFee}</span>
                <span className="font-medium">$5.20</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{t.youWillReceive}</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="font-bold text-lg">
                    {amount ? (parseFloat(amount) * 0.999).toFixed(2) : '0.00'} {fromToken}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
