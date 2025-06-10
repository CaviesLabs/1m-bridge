import { ExternalLink, Zap } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function VaultListings() {
  const vaults = [
    {
      id: 1,
      token: 'USDC',
      protocol: 'Aave',
      apy: '18.46%',
      tvl: '$4,253,891',
      risk: 'Low',
      icon: '💵',
    },
    {
      id: 2,
      token: 'USDC',
      protocol: 'Compound',
      apy: '12.32%',
      tvl: '$2,187,432',
      risk: 'Low',
      icon: '💵',
    },
    {
      id: 3,
      token: 'USDC',
      protocol: 'Uniswap V3',
      apy: '14.51%',
      tvl: '$1,824,567',
      risk: 'Medium',
      icon: '💵',
    },
    {
      id: 4,
      token: 'USDC',
      protocol: 'Curve',
      apy: '16.78%',
      tvl: '$3,456,789',
      risk: 'Low',
      icon: '💵',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            2
          </div>
          <CardTitle className="text-2xl">Deposit in Vaults</CardTitle>
        </div>
        <p className="text-muted-foreground">
          For additional yield, you can deposit your bridged assets into DeFi vaults. This is
          optional but can increase your total rewards.
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {vaults.map(vault => (
            <Card key={vault.id} className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-2xl">
                      {vault.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{vault.token}</span>
                        <Badge className={getRiskColor(vault.risk)}>{vault.protocol}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>Contract</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-lg">{vault.apy}</span>
                      <Zap className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="text-sm text-muted-foreground">Est. APY</div>
                  </div>
                </div>

                <div className="border-t border-border mt-4 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TVL</span>
                    <span className="font-semibold">{vault.tvl}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Connect Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
