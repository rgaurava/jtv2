import { RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import type { Transaction } from '../../types';
import { TransactionCard } from './TransactionCard';
import { CreateTransactionModal } from './CreateTransactionModal';

interface MainPanelProps {
  transactions: Transaction[];
  isLoading: boolean;
  selectedTransaction: Transaction | null;
  onTransactionSelect: (transaction: Transaction) => void;
  showCreateModal: boolean;
  onCloseCreateModal: () => void;
  onTransactionCreated: () => void;
  onRefresh: () => void;
}

export function MainPanel({
  transactions,
  isLoading,
  selectedTransaction,
  onTransactionSelect,
  showCreateModal,
  onCloseCreateModal,
  onTransactionCreated,
  onRefresh,
}: MainPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.buyerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.sellerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-sail-dark">
      {/* Header */}
      <div className="bg-white dark:bg-sail-charcoal border-b border-gray-200 dark:border-sail-dark-lighter p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SAIL Transactions
          </h2>
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-sail-dark-lighter transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5 text-gray-600 dark:text-sail-text" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-sail-text" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-sail-dark-lighter rounded-xl focus:ring-2 focus:ring-sail-cyan focus:border-transparent bg-white dark:bg-sail-dark text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-sail-text"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-sail-cyan/10 dark:bg-sail-cyan/20 p-4 rounded-xl border border-sail-cyan/30">
            <p className="text-sm text-sail-cyan font-medium">Total</p>
            <p className="text-2xl font-bold text-sail-cyan mt-1">
              {transactions.length}
            </p>
          </div>
          <div className="bg-sail-green/10 dark:bg-sail-green/20 p-4 rounded-xl border border-sail-green/30">
            <p className="text-sm text-sail-green font-medium">Completed</p>
            <p className="text-2xl font-bold text-sail-green mt-1">
              {transactions.filter((t) => t.status === 'COMPLETED').length}
            </p>
          </div>
          <div className="bg-sail-purple/10 dark:bg-sail-purple/20 p-4 rounded-xl border border-sail-purple/30">
            <p className="text-sm text-sail-purple font-medium">Pending</p>
            <p className="text-2xl font-bold text-sail-purple mt-1">
              {transactions.filter((t) => t.status === 'PENDING').length}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sail-cyan"></div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-sail-text">
              {searchQuery ? 'No transactions found' : 'No transactions yet'}
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              isSelected={selectedTransaction?.id === transaction.id}
              onClick={() => onTransactionSelect(transaction)}
            />
          ))
        )}
      </div>

      {/* Create Transaction Modal */}
      {showCreateModal && (
        <CreateTransactionModal
          onClose={onCloseCreateModal}
          onCreated={onTransactionCreated}
        />
      )}
    </div>
  );
}
