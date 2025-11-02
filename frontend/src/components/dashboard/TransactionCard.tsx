import type { Transaction, TransactionStatus } from '../../types';
import { Building2, Package, Calendar } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  isSelected: boolean;
  onClick: () => void;
}

const statusColors: Record<TransactionStatus, string> = {
  PENDING: 'bg-sail-purple/10 text-sail-purple dark:bg-sail-purple/20 border border-sail-purple/30',
  APPROVED: 'bg-sail-cyan/10 text-sail-cyan dark:bg-sail-cyan/20 border border-sail-cyan/30',
  IN_PROGRESS: 'bg-sail-purple/10 text-sail-purple dark:bg-sail-purple/20 border border-sail-purple/30',
  COMPLETED: 'bg-sail-green/10 text-sail-green dark:bg-sail-green/20 border border-sail-green/30',
  CANCELLED: 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400 border border-gray-300 dark:border-gray-600',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-300 dark:border-red-800',
};

export function TransactionCard({ transaction, isSelected, onClick }: TransactionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-sail-cyan bg-sail-cyan/5 dark:bg-sail-cyan/10 shadow-lg ring-2 ring-sail-cyan/50'
          : 'border-gray-200 dark:border-sail-dark-lighter bg-white dark:bg-sail-charcoal hover:border-sail-cyan/50 dark:hover:border-sail-cyan/50 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-mono text-gray-500 dark:text-sail-text">
            #{transaction.transactionId.substring(0, 8)}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {transaction.productName}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[transaction.status]
          }`}
        >
          {transaction.status}
        </span>
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-sail-text">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{transaction.buyerCompany} ← {transaction.sellerCompany}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-sail-text">
          <Package className="w-4 h-4 mr-2" />
          <span>Qty: {transaction.quantity}</span>
        </div>

        {transaction.deliveryDate && (
          <div className="flex items-center text-sm text-gray-600 dark:text-sail-text">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(transaction.deliveryDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-sail-dark-lighter flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-sail-text">
          {new Date(transaction.createdAt).toLocaleDateString()}
        </span>
        <span className="text-lg font-bold text-sail-green">
          {transaction.currency} {transaction.totalAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
