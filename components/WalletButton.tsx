import { useBalances } from '@/context/BalanceProvider';
import { useConnectorRegistry } from '@/context/useConnectorRegistry';
import { generateAvatar } from '@/context/WalletProvider';
import { AppNumber } from '@/lib/providers/math/app-number.provider';
import { ChevronDown, Copy, DollarSign, Loader2, LogOut, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu-v2';

interface WalletButtonProps {
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function WalletButton({ size = 'default', className = '' }: WalletButtonProps) {
  const connector = useConnectorRegistry('evm');
  const { balances } = useBalances();
  const nativeBalance = Object.values(balances).find(balance => balance.tokenInfo.symbol === 'SEI');

  const { t } = useLanguage();

  const handleCopyAddress = async () => {
    if (connector.address) {
      await navigator.clipboard.writeText(connector.address);
      toast.success('Wallet address copied to clipboard');
    }
  };

  // Connect button when not connected
  if (!connector.isConnected) {
    return (
      <Button
        size={size}
        className={`${className} ${size === 'sm' ? 'h-7 px-3 text-xs' : ''}`}
        onClick={connector.connect}
        disabled={connector.isConnected}
      >
        {connector.isConnected ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t.connecting || 'Connecting...'}
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            {t.connectWallet}
          </>
        )}
      </Button>
    );
  }

  // Connected wallet info with dropdown
  return (
    <DropdownMenu
      className="w-[200px] left-[-20px]"
      trigger={
        <Button
          variant="outline"
          size={size}
          className={`${className} ${
            size === 'sm' ? 'h-9 px-2 text-xs' : 'px-3'
          } gap-2 hover:bg-accent transition-colors`}
        >
          {/* Avatar */}
          <motion.div
            className={`${
              size === 'sm' ? 'w-12 h-8' : 'w-6 h-6'
            } w-[20px] h-[20px] object-cover  rounded-full overflow-hidden bg-muted flex-shrink-0`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src={generateAvatar(connector.address || '')}
              alt="Wallet Avatar"
              className="w-[20px] h-[20px] object-cover rounded-full"
              onError={e => {
                // Fallback to gradient background if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.style.background =
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              }}
            />
          </motion.div>

          {/* Wallet Address */}
          <motion.span
            className={`${size === 'sm' ? 'text-[14px]' : 'text-[14px]'} font-mono font-medium`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {connector.address?.slice(0, 6)}...{connector.address?.slice(-4)}
          </motion.span>

          {/* Dropdown Icon */}
          <ChevronDown className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} shrink-0 opacity-50`} />
        </Button>
      }
    >
      {onClickItem => (
        <DropdownMenuGroup>
          {/* Wallet Address */}
          <DropdownMenuItem
            onClick={() => {
              handleCopyAddress();
              onClickItem();
            }}
            className="cursor-pointer flex items-center gap-3 p-3"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Copy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{t.walletAddress}</div>
              <div className="text-xs text-muted-foreground font-mono truncate">
                {connector.address?.slice(0, 6)}...{connector.address?.slice(-4)}
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Balance */}
          <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-default">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{t.walletBalance}</div>
              <div className="text-xs text-muted-foreground">
                {AppNumber.from(nativeBalance?.balance.toString() || '0').getDisplayedString() +
                  ' SEI'}
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Disconnect */}
          <DropdownMenuItem
            onClick={() => {
              connector.disconnect();
              onClickItem();
            }}
            className="cursor-pointer flex items-center gap-3 p-3 text-destructive focus:text-destructive"
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{t.walletDisconnect}</div>
              <div className="text-xs text-muted-foreground">{t.walletDisconnectDescription}</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      )}
    </DropdownMenu>
  );
}
