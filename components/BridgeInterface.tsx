"use client";

import { ArrowUpDown, ExternalLink, Info, Wallet } from 'lucide-react';
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
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '🔷' },
    { id: 'polygon', name: 'Polygon', icon: '🟣' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔵' },
    { id: 'optimism', name: 'Optimism', icon: '🔴' },
  ];

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'USDT', name: 'Tether USD', icon: '💶' },
    { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿' },
  ];

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.bridgeInterface}
          </CardTitle>
          <p className="text-muted-foreground">
            {t.bridgeInterfaceDescription}
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Important Notice */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">{t.important}</span>
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
                <Select value={fromChain} onValueChange={setFromChain}>
                  <SelectTrigger className="h-14 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map(chain => (
                      <SelectItem key={chain.id} value={chain.id}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{chain.icon}</span>
                          <span>{chain.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Wallet className="w-3 h-3 mr-1" />
                    {t.connectSourceWallet}
                  </Badge>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapChains}
                  className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <ArrowUpDown className="w-5 h-5" />
                </Button>
              </div>

              {/* To Chain */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t.toChain}</Label>
                <Select value={toChain} onValueChange={setToChain}>
                  <SelectTrigger className="h-14 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map(chain => (
                      <SelectItem key={chain.id} value={chain.id}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{chain.icon}</span>
                          <span>{chain.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Wallet className="w-3 h-3 mr-1" />
                    {t.connectDestinationWallet}
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
                {t.balance} <span className="font-semibold text-foreground">0.00</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-14 text-xl border-2 hover:border-primary/50 focus:border-primary transition-colors"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setAmount('1000')}
                  className="h-14 px-6 border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {t.max}
                </Button>
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="w-40 h-14 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map(token => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <span>{token.icon}</span>
                          <span>{token.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <Button className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            <Wallet className="w-5 h-5 mr-2" />
            {t.connectWallet}
          </Button>

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