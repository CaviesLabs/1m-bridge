'use client';

import { useBridge } from '@/components/useBridge';
import { useBalances } from '@/context/BalanceProvider';
import { Chain, CONNECTOR_METADATA, useGetConnectorList } from '@/context/useConnectorRegistry';
import { useInputBalance } from '@/context/useInputBalance';
import { TokenBalance } from '@/lib/entities/balance.entity';
import { AppNumber } from '@/lib/providers/math/app-number.provider';
import { ArrowUpDown, ExternalLink, Info, Loader2, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { BridgeStepCards } from './BridgeStepCards';
import { useLanguage } from './LanguageProvider';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function BridgeInterface() {
  const { t } = useLanguage();
  const { balances } = useBalances();
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const connectors = useGetConnectorList();
  const [sourceKey, setSourceKey] = useState<Chain>('solana');
  const [destinationKey, setDestinationKey] = useState<Chain>('evm');
  const [isHistoryView, setIsHistoryView] = useState(false);

  const sourceConnector = useMemo(() => connectors[sourceKey], [connectors, sourceKey]);
  const destinationConnector = useMemo(
    () => connectors[destinationKey],
    [connectors, destinationKey]
  );

  const localTokenBalance = useMemo(() => {
    const zero = TokenBalance.fromZeroBalance(CONNECTOR_METADATA[sourceKey].whiteListToken[0]);
    if (!tokenBalance || !balances || !Object.keys(balances)?.length) return zero;
    return balances[tokenBalance.tokenInfo.contractAddress] || zero;
  }, [tokenBalance, balances, sourceKey]);

  const {
    val: inputVal,
    error: inputError,
    onChange: onChangeInputVal,
  } = useInputBalance(localTokenBalance?.tokenInfo?.contractAddress ?? '');

  const {
    currentStep,
    isSigning,
    startBridge,
    claimTokens,
    isCompleted,
    reset: resetBridge,
  } = useBridge({
    inputVal: inputVal.toString() ?? '0',
    tokenBalance: tokenBalance,
    sourceConnector: sourceConnector,
    destinationConnector: destinationConnector,
  });

  const chains = [
    {
      id: 'evm',
      name: 'SEI',
      icon: '/icons/sei.svg',
      color: '#627EEA',
    },
    {
      id: 'solana',
      name: 'Solana',
      icon: '/icons/solana.svg',
      color: '#8247E5',
    },
  ];

  const swapChains = () => {
    const temp = sourceKey;
    setSourceKey(destinationKey);
    setDestinationKey(temp);
    setTokenBalance(
      TokenBalance.fromZeroBalance(CONNECTOR_METADATA[destinationKey].whiteListToken[0])
    );
  };

  const getButtonContent = () => {
    switch (currentStep) {
      case 'connect':
        return {
          text: t.connectWallet,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: () => {
            if (!sourceConnector.isConnected) {
              return sourceConnector.connect();
            }
            if (!destinationConnector.isConnected) {
              return destinationConnector.connect();
            }
          },
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
          text: t.bridgeMore,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: () => {
            resetBridge();
          },
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-gray-400 to-gray-500 cursor-default',
        };

      default:
        return {
          text: t.connectWallet,
          icon: <Wallet className="w-5 h-5 mr-2" />,
          onClick: () => {
            if (!sourceConnector.isConnected) {
              return sourceConnector.connect();
            }
            if (!destinationConnector.isConnected) {
              return destinationConnector.connect();
            }
          },
          className:
            'w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200',
        };
    }
  };

  useEffect(() => {
    if (sourceKey && !tokenBalance) {
      setTokenBalance(
        TokenBalance.fromZeroBalance(CONNECTOR_METADATA[sourceKey].whiteListToken[0])
      );
    }
  }, [sourceKey, tokenBalance]);

  console.log('currentStep', currentStep);
  const buttonConfig = getButtonContent();

  // Get the selected chain's display data
  const fromChainData = chains.find(chain => chain.id === sourceKey);
  const toChainData = chains.find(chain => chain.id === destinationKey);

  return (
    <>
      <BridgeStepCards currentStep={currentStep} isCompleted={isCompleted} />
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl transform scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-transparent rounded-3xl" />

        {/* Main Bridge Interface */}
        <div className="relative">
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
                      <span className="text-yellow-800 dark:text-yellow-200 ml-1">
                        {t.importantNote}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chain Selection Section */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
                    {/* From Chain */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">{t.fromChain}</Label>
                      <Select
                        value={sourceKey}
                        onValueChange={value => {
                          if (value === destinationKey) {
                            setDestinationKey(sourceKey);
                            setSourceKey(value as Chain);
                          } else {
                            setSourceKey(value as Chain);
                          }

                          setTokenBalance(
                            balances[
                              CONNECTOR_METADATA[value as Chain]?.whiteListToken?.find(
                                token => token.contractAddress === value
                              )?.contractAddress
                            ] as unknown as TokenBalance
                          );
                        }}
                      >
                        <SelectTrigger className="h-14 border-2 hover:border-primary/50 transition-colors">
                          <SelectValue>
                            {fromChainData && (
                              <div className="flex items-center gap-3">
                                <img
                                  src={fromChainData.icon}
                                  alt={fromChainData.name}
                                  className="w-4 h-4"
                                />
                                <span>{fromChainData.name}</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {chains.map(chain => {
                            return (
                              <SelectItem key={chain.id} value={chain.id}>
                                <div className="flex items-center gap-3">
                                  <img src={chain.icon} alt={chain.name} className="w-4 h-4" />
                                  <span>{chain.name}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={sourceConnector.isConnected ? 'outline' : 'default'}
                          className="text-xs cursor-pointer"
                          onClick={() => {
                            if (sourceConnector.isConnected) {
                              sourceConnector.disconnect();
                            } else {
                              sourceConnector.connect();
                            }
                          }}
                        >
                          <Wallet className="w-3 h-3 mr-1" />
                          {sourceConnector.isConnected
                            ? t.disconnectSourceWallet
                            : t.connectSourceWallet}
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
                      <Select
                        value={destinationKey}
                        onValueChange={value => {
                          if (value === sourceKey) {
                            setSourceKey(destinationKey);
                            setDestinationKey(value as Chain);
                          } else {
                            setDestinationKey(value as Chain);
                          }

                          setTokenBalance(
                            balances[
                              CONNECTOR_METADATA[value as Chain]?.whiteListToken?.find(
                                token => token.contractAddress === value
                              )?.contractAddress
                            ] as unknown as TokenBalance
                          );
                        }}
                      >
                        <SelectTrigger className="h-14 border-2 hover:border-primary/50 transition-colors">
                          <SelectValue>
                            {toChainData && (
                              <div className="flex items-center gap-3">
                                <img
                                  src={toChainData.icon}
                                  alt={toChainData.name}
                                  className="w-4 h-4"
                                />
                                <span>{toChainData.name}</span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {chains.map(chain => {
                            return (
                              <SelectItem key={chain.id} value={chain.id}>
                                <div className="flex items-center gap-3">
                                  <img src={chain.icon} alt={chain.name} className="w-4 h-4" />
                                  <span>{chain.name}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={destinationConnector.isConnected ? 'outline' : 'default'}
                          className="text-xs cursor-pointer"
                          onClick={() => {
                            if (destinationConnector.isConnected) {
                              destinationConnector.disconnect();
                            } else {
                              destinationConnector.connect();
                            }
                          }}
                        >
                          <Wallet className="w-3 h-3 mr-1" />
                          {destinationConnector.isConnected
                            ? t.disconnectDestinationWallet
                            : t.connectDestinationWallet}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Section */}
                <div className="space-y-4 items-center">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{t.assetAndAmount}</Label>
                    <div className="text-sm text-muted-foreground">
                      {t.balance}{' '}
                      <span className="font-semibold text-foreground">
                        {AppNumber.from(
                          localTokenBalance?.balance.toString() || '0'
                        ).getDisplayedString()}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        {/** make border of input red when inputVal is greater than localTokenBalance.balance */}
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={inputVal.toString() ?? '0'}
                          onChange={e => onChangeInputVal(AppNumber.from(e.target.value || 0))}
                          className={`h-14 text-xl border-2 hover:border-primary/50 focus:border-primary transition-colors ${
                            inputVal.gt(localTokenBalance.balance) || inputError
                              ? 'border-red-500 !important focus:border-red-500'
                              : 'border-primary/50'
                          }`}
                          disabled={currentStep === 'signing'}
                        />
                        {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          onChangeInputVal(
                            AppNumber.from(localTokenBalance?.balance.toString() || '0')
                          )
                        }
                        className="h-14 px-6 border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        disabled={currentStep === 'signing'}
                      >
                        {t.max}
                      </Button>
                      <Select
                        value={tokenBalance?.tokenInfo?.contractAddress ?? ''}
                        onValueChange={value =>
                          setTokenBalance(
                            balances[
                              CONNECTOR_METADATA[sourceKey]?.whiteListToken?.find(
                                token => token.contractAddress === value
                              )?.contractAddress
                            ] as unknown as TokenBalance
                          )
                        }
                        disabled={currentStep === 'signing'}
                      >
                        <SelectTrigger className="mt-2 w-40 h-14 border-2 hover:border-primary/50 transition-colors">
                          <SelectValue>
                            {(() => {
                              const tokenData = CONNECTOR_METADATA[sourceKey]?.whiteListToken?.find(
                                token => token.symbol === tokenBalance?.tokenInfo?.symbol
                              );
                              if (!tokenData) return null;
                              return (
                                <div className="flex items-center gap-2">
                                  <img
                                    src={tokenData.logo}
                                    alt={tokenData.symbol}
                                    className="w-4 h-4"
                                  />
                                  <span>{tokenData.symbol}</span>
                                </div>
                              );
                            })()}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {CONNECTOR_METADATA[sourceKey]?.whiteListToken?.map(token => {
                            return (
                              <SelectItem key={token.symbol} value={token.contractAddress}>
                                <div className="flex items-center gap-2">
                                  <img src={token.logo} alt={token.symbol} className="w-4 h-4" />
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
                      !buttonConfig.disabled && (!inputVal && currentStep !== 'connect') === false
                        ? { scale: 1.02 }
                        : {}
                    }
                    whileTap={
                      !buttonConfig.disabled && (!inputVal && currentStep !== 'connect') === false
                        ? { scale: 0.98 }
                        : {}
                    }
                  >
                    <Button
                      className={buttonConfig.className}
                      onClick={buttonConfig.onClick}
                      disabled={
                        buttonConfig.disabled ||
                        (!inputVal && currentStep !== 'connect') ||
                        inputVal.lte(AppNumber.from(0)) ||
                        inputVal.gt(localTokenBalance.balance)
                      }
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
                            {t.signingTransactionDescription}
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
                          {inputVal ? (parseFloat(inputVal.toString()) * 0.999).toFixed(2) : '0.00'}{' '}
                          {tokenBalance?.tokenInfo?.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </>
  );
}
