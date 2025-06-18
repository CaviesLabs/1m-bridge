import { Chain, useConnectorRegistry } from '@/context/useConnectorRegistry';
import { initTransferInstance } from '@/lib/wormhole/token-transfer-from-source';
import { motion } from 'framer-motion';
import { Copy, Download, ExternalLink, InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { toast } from 'sonner';
import { useLanguage } from './LanguageProvider';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TableCell, TableRow } from './ui/table';

interface TransactionRowProps {
  index: number;
  isDisabled: boolean;
  onClaiming: (hash: string) => void;
  transaction: {
    id: string;
    hash: string;
    fromChain: {
      name: string;
      icon: string;
      color: string;
    };
    toChain: {
      name: string;
      icon: string;
      color: string;
    };
    amount: string;
    token: string;
    date: Date;
    status: 'completed' | 'pending' | 'failed' | 'claimable';
  };
}

export function TransactionRow({
  transaction,
  index,
  isDisabled,
  onClaiming,
}: TransactionRowProps) {
  const { t } = useLanguage();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleCopyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash);
    toast.success(t.transactionHashCopied);
  };

  const sourceConnector = useConnectorRegistry(
    transaction.fromChain.name.toLocaleLowerCase() as Chain
  );
  const destinationConnector = useConnectorRegistry(
    transaction.toChain.name.toLocaleLowerCase() as Chain
  );
  const sourceChain = sourceConnector?.chainName;
  const destinationChain = destinationConnector?.chainName;

  const handleClaimTokens = async (transaction: TransactionRowProps['transaction']) => {
    try {
      setIsClaiming(true);
      onClaiming(transaction.hash);
      const claimFnc = initTransferInstance({
        orgAddress: sourceConnector.address,
        destAddress: destinationConnector.address,
        orgSignExecutor: sourceConnector.executor,
        destSignExecutor: destinationConnector.executor,
        orgChainName: sourceChain,
        destChainName: destinationChain,
        sourceTxid: transaction.hash,
      });

      await claimFnc();

      toast.success(t.tokensClaimedSuccessfully, {
        description: `${transaction.amount} ${transaction.token} ${t.claimedFromTransaction}`,
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      toast.error(t.claimFailed, {
        description: error instanceof Error ? error.message : 'Unknown error',
        duration: 4000,
      });
    } finally {
      onClaiming('');
      setIsClaiming(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(t.dateLocale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        text: t.completed,
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        text: t.pending,
      },
      failed: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        text: t.failed,
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.failed;
    return <Badge className={`${config.color} border-0 px-2 py-1 text-xs`}>{config.text}</Badge>;
  };

  return (
    <TableRow
      className="group transition-colors hover:bg-muted/50"
      style={{
        animation: `fadeIn 0.4s ease-out ${index * 0.05}s forwards`,
      }}
    >
      <TableCell className="font-medium !pl-[20px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={transaction.fromChain.icon}
              alt={transaction.fromChain.name}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            />
            <motion.div
              className="text-muted-foreground"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.div>
            <img
              src={transaction.toChain.icon}
              alt={transaction.toChain.name}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            />
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => handleCopyHash(transaction.hash)}
              className="text-sm font-mono text-foreground hover:text-primary transition-colors flex items-center gap-1 group/hash"
            >
              {transaction.hash.slice(0, 6)}...{transaction.hash.slice(-4)}
              <Copy className="w-3 h-3 opacity-0 group-hover/hash:opacity-100 transition-opacity" />
            </button>
            <div className="text-xs text-muted-foreground">
              {transaction.fromChain.name} → {transaction.toChain.name}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">{formatDate(transaction.date)}</TableCell>

      <TableCell>
        <span className="font-medium">
          {transaction.amount} {transaction.token}
        </span>
      </TableCell>

      <TableCell>{getStatusBadge(transaction.status)}</TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {transaction.status === 'completed' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
          {transaction.status === 'pending' && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: '0.2s' }}
              />
              <div
                className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
          )}
          <div className="flex items-center gap-1 !pr-[10px]">
            <Button
              size="sm"
              disabled={isDisabled}
              onClick={() => {
                if (sourceConnector?.address && destinationConnector?.address) {
                  handleClaimTokens(transaction);
                } else {
                  !sourceConnector?.address && sourceConnector?.connect();
                  !destinationConnector?.address && destinationConnector?.connect();
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 h-8 text-xs gap-1"
            >
              <Download className="w-3 h-3" />
              {!isClaiming && t.claim}
              {isClaiming && <>{t.claimingTokens}</>}
              <span data-tooltip-id="claim-tooltip" data-tooltip-content={t.claimTooltip}>
                <InfoIcon className="w-3 h-3" />
              </span>
              <Tooltip id="claim-tooltip" place="bottom" />
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
