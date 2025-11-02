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
      className={`p-2 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-sail-cyan bg-sail-cyan/5 dark:bg-sail-cyan/10 shadow-md ring-1 ring-sail-cyan/50'
          : 'border-gray-200 dark:border-sail-dark-lighter bg-white dark:bg-sail-charcoal hover:border-sail-cyan/50 dark:hover:border-sail-cyan/50 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-gray-500 dark:text-sail-text">
            #{transaction.transactionId.substring(0, 8)}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {transaction.productName}
          </h3>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ml-2 flex-shrink-0 ${
            statusColors[transaction.status]
          }`}
        >
          {transaction.status}
        </span>
      </div>

      <div className="space-y-1 mt-1">
        <div className="flex items-center text-xs text-gray-600 dark:text-sail-text">
          <Building2 className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{transaction.buyerCompany} ← {transaction.sellerCompany}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-600 dark:text-sail-text">
            <Package className="w-3 h-3 mr-1" />
            <span>Qty: {transaction.quantity}</span>
          </div>

          {transaction.deliveryDate && (
            <div className="flex items-center text-xs text-gray-600 dark:text-sail-text">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{new Date(transaction.deliveryDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-1.5 pt-1.5 border-t border-gray-200 dark:border-sail-dark-lighter flex items-center justify-between">
        <span className="text-[10px] text-gray-500 dark:text-sail-text">
          {new Date(transaction.createdAt).toLocaleDateString()}
        </span>
        <span className="text-sm font-bold text-sail-green">
          {transaction.currency} {transaction.totalAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
