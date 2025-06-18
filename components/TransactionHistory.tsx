import { useConnectorRegistry } from '@/context/useConnectorRegistry';
import { downloadCSV } from '@/utils/dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftIcon, ArrowRightIcon, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from './LanguageProvider';
import { TransactionRow } from './TransactionRow';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

// API transaction type
interface ApiTransaction {
  hash: string;
  sourceChain: string;
  destinationChain: string;
  token: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed' | 'claimable';
  timestamp: number;
}

// API response type
interface ApiResponse {
  transactions: ApiTransaction[];
  totalCount: number;
  totalBridged: string;
  totalRewards: string;
}

// UI transaction type
interface Transaction {
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
  status: 'completed' | 'pending' | 'claimable' | 'failed';
}

function getChainIcon(chain: string) {
  switch (chain.toLowerCase()) {
    case 'seievm':
      return '/icons/sei.svg';
    case 'solana':
      return '/icons/solana.svg';
    default:
      return '❓';
  }
}
function getChainColor(chain: string) {
  switch (chain.toLowerCase()) {
    case 'seievm':
      return 'bg-blue-500';
    case 'solana':
      return 'bg-green-500';
    default:
      return 'bg-gray-400';
  }
}

interface TransactionHistoryProps {
  onBack: () => void;
}

export function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50;

  const connector = useConnectorRegistry('evm');
  const walletAddress = connector?.address || '';

  useEffect(() => {
    if (!walletAddress) return;
    setLoading(true);

    // Add pagination parameters to the API call
    fetch(`/wormhole?address=${walletAddress}&page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        const txs: Transaction[] = (data.transactions || []).map(
          (tx: ApiTransaction, idx: number) => ({
            id: tx.hash || String(idx),
            hash: tx.hash,
            fromChain: {
              name: tx.sourceChain.charAt(0).toUpperCase() + tx.sourceChain.slice(1),
              icon: getChainIcon(tx.sourceChain),
              color: getChainColor(tx.sourceChain),
            },
            toChain: {
              name: tx.destinationChain.charAt(0).toUpperCase() + tx.destinationChain.slice(1),
              icon: getChainIcon(tx.destinationChain),
              color: getChainColor(tx.destinationChain),
            },
            amount: tx.amount,
            token: tx.token,
            date: new Date(tx.timestamp),
            status:
              tx.status === 'completed'
                ? 'completed'
                : tx.status === 'pending'
                ? 'pending'
                : tx.status === 'claimable'
                ? 'claimable'
                : 'failed',
          })
        );
        setTransactions(txs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [walletAddress, currentPage, itemsPerPage]);

  const handleCopyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash);
    toast.success(t.transactionHashCopied);
  };

  const handleClaimTokens = (transaction: Transaction) => {
    toast.loading(t.claimingTokens, { duration: 2000 });
    setTimeout(() => {
      toast.success(t.tokensClaimedSuccessfully, {
        description: `${transaction.amount} ${transaction.token} ${t.claimedFromTransaction}`,
        duration: 4000,
      });
    }, 2000);
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
      claimable: {
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        text: t.claimable,
      },
      failed: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        text: t.failed,
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.failed;
    return <Badge className={`${config.color} border-0 px-2 py-1 text-xs`}>{config.text}</Badge>;
  };

  // Pagination controls
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleExport = () => {
    if (!transactions?.length) return;

    const exportData = transactions.map(tx => ({
      Transaction: tx.hash,
      Date: tx.date.toLocaleString(),
      Amount: `${tx.amount} ${tx.token}`,
      From: tx.fromChain.name,
      To: tx.toChain.name,
      Status: tx.status,
    }));

    downloadCSV(exportData, `bridge-transactions-${new Date().toISOString().split('T')[0]}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Remove table row borders and add rounded corners */
        .no-row-borders tr {
          border: none !important;
        }
        .no-row-borders td {
          border-bottom: 1px solid var(--border) !important;
        }
        .no-row-borders th {
          border-bottom: 1px solid var(--border) !important;
        }
        .rounded-table {
          border-radius: 12px;
          overflow: hidden;
          background: var(--background);
          border: 1px solid var(--border);
        }
        .rounded-table thead tr:first-child th:first-child {
          border-top-left-radius: 12px;
        }
        .rounded-table thead tr:first-child th:last-child {
          border-top-right-radius: 12px;
        }
        .rounded-table tbody tr:last-child td:first-child {
          border-bottom-left-radius: 12px;
        }
        .rounded-table tbody tr:last-child td:last-child {
          border-bottom-right-radius: 12px;
        }
      `}</style>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-4xl mx-auto"
      >
        <Card className="bg-card/95 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-8 w-8 hover:bg-accent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-xl">{t.transactionHistory}</CardTitle>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                <Download className="w-4 h-4" />
                {t.export}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="relative w-full overflow-visible py-[20px]">
              <Table className="no-row-borders">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="!pl-[20px] min-w-[200px] !py-[15px] bg-muted/50 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {t.transaction}
                    </TableHead>
                    <TableHead className="min-w-[100px] !py-[15px] bg-muted/50 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {t.date}
                    </TableHead>
                    <TableHead className="min-w-[100px] !py-[15px] bg-muted/50 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {t.amount}
                    </TableHead>
                    <TableHead className="min-w-[100px] !py-[15px] bg-muted/50 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {t.status}
                    </TableHead>
                    <TableHead className="!pr-[20px] min-w-[100px] !py-[15px] text-right bg-muted/50 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {t.action}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="text-muted-foreground">Loading...</div>
                      </TableCell>
                    </TableRow>
                  ) : transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="text-muted-foreground">{t.noTransactions}</div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <AnimatePresence>
                      {transactions.map((transaction, index) => (
                        <TransactionRow
                          key={transaction.id}
                          transaction={transaction}
                          index={index}
                          isDisabled={isClaiming !== ''}
                          onClaiming={setIsClaiming}
                        />
                      ))}
                    </AnimatePresence>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Footer with Pagination */}
            <div className="px-6 py-4 border-t border-border/30 bg-muted/10">
              <div className="flex items-center justify-end">
                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0 || loading}
                    className="h-8 px-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                  <div className="text-sm">
                    {t.page} {currentPage + 1}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={loading}
                    className="h-8 px-2"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
