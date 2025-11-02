import { X, Sparkles, Calendar, DollarSign, Package, FileText } from 'lucide-react';
import type { Transaction } from '../../types';
import { TransactionStatus } from '../../types';
import { transactionAPI } from '../../services/api';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface DetailsPanelProps {
  transaction: Transaction | null;
  onClose: () => void;
  onUpdate: () => void;
}

const statusOptions: TransactionStatus[] = [
  TransactionStatus.PENDING,
  TransactionStatus.APPROVED,
  TransactionStatus.IN_PROGRESS,
  TransactionStatus.COMPLETED,
  TransactionStatus.CANCELLED,
  TransactionStatus.REJECTED,
];

export function DetailsPanel({ transaction, onClose, onUpdate }: DetailsPanelProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) {
    return (
      <div className="w-72 bg-white dark:bg-sail-charcoal border-l border-gray-200 dark:border-sail-dark-lighter flex items-center justify-center">
        <p className="text-xs text-gray-500 dark:text-sail-text">
          Select a transaction to view details
        </p>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus: TransactionStatus) => {
    try {
      setIsUpdating(true);
      await transactionAPI.updateStatus(transaction.id, newStatus);
      onUpdate();
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      await transactionAPI.delete(transaction.id);
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <div className="w-72 bg-white dark:bg-sail-charcoal border-l border-gray-200 dark:border-sail-dark-lighter flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-2 border-b border-gray-200 dark:border-sail-dark-lighter flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Transaction Details
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-sail-dark-lighter transition-colors"
        >
          <X className="w-3.5 h-3.5 text-gray-600 dark:text-sail-text" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* Transaction ID */}
        <div>
          <p className="text-[10px] text-gray-500 dark:text-sail-text mb-0.5">Transaction ID</p>
          <p className="text-xs font-mono text-gray-900 dark:text-white">
            {transaction.transactionId}
          </p>
        </div>

        {/* Product */}
        <div>
          <div className="flex items-center mb-1">
            <Package className="w-3 h-3 mr-1 text-gray-400 dark:text-sail-text" />
            <p className="text-[10px] text-gray-500 dark:text-sail-text">Product</p>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {transaction.productName}
          </p>
          {transaction.productDescription && (
            <p className="text-xs text-gray-600 dark:text-sail-text-light mt-0.5">
              {transaction.productDescription}
            </p>
          )}
        </div>

        {/* Companies */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] text-gray-500 dark:text-sail-text mb-0.5">Buyer</p>
            <p className="text-xs text-gray-900 dark:text-white">
              {transaction.buyerCompany}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-sail-text mb-0.5">Seller</p>
            <p className="text-xs text-gray-900 dark:text-white">
              {transaction.sellerCompany}
            </p>
          </div>
        </div>

        {/* Financial Details */}
        <div>
          <div className="flex items-center mb-1">
            <DollarSign className="w-3 h-3 mr-1 text-gray-400 dark:text-sail-text" />
            <p className="text-[10px] text-gray-500 dark:text-sail-text">Financial Details</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-sail-text">Quantity:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {transaction.quantity}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-sail-text">Unit Price:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {transaction.currency} {transaction.unitPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 dark:border-sail-dark-lighter pt-1">
              <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="font-bold text-sail-green dark:text-sail-green">
                {transaction.currency} {transaction.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Date */}
        {transaction.deliveryDate && (
          <div>
            <div className="flex items-center mb-1">
              <Calendar className="w-3 h-3 mr-1 text-gray-400 dark:text-sail-text" />
              <p className="text-[10px] text-gray-500 dark:text-sail-text">Delivery Date</p>
            </div>
            <p className="text-xs text-gray-900 dark:text-white">
              {new Date(transaction.deliveryDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Payment Terms */}
        {transaction.paymentTerms && (
          <div>
            <p className="text-[10px] text-gray-500 dark:text-sail-text mb-0.5">Payment Terms</p>
            <p className="text-xs text-gray-900 dark:text-white">
              {transaction.paymentTerms}
            </p>
          </div>
        )}

        {/* Notes */}
        {transaction.notes && (
          <div>
            <div className="flex items-center mb-1">
              <FileText className="w-3 h-3 mr-1 text-gray-400 dark:text-sail-text" />
              <p className="text-[10px] text-gray-500 dark:text-sail-text">Notes</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-sail-text-light">
              {transaction.notes}
            </p>
          </div>
        )}

        {/* AI Insights */}
        {transaction.aiInsights && (
          <div className="bg-gradient-to-br from-sail-cyan/10 to-sail-purple/10 dark:from-sail-cyan/20 dark:to-sail-purple/20 p-2 rounded-lg border border-sail-cyan/30 dark:border-sail-purple/30">
            <div className="flex items-center mb-1">
              <Sparkles className="w-3 h-3 mr-1 text-sail-purple" />
              <p className="text-[10px] font-semibold text-sail-purple">
                AI Insights
              </p>
            </div>
            <p className="text-xs text-gray-700 dark:text-sail-text-light whitespace-pre-wrap">
              {transaction.aiInsights}
            </p>
          </div>
        )}

        {/* Status Update */}
        <div>
          <p className="text-[10px] text-gray-500 dark:text-sail-text mb-1">Update Status</p>
          <select
            value={transaction.status}
            onChange={(e) => handleStatusUpdate(e.target.value as TransactionStatus)}
            disabled={isUpdating}
            className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-sail-dark-lighter rounded-lg focus:ring-1 focus:ring-sail-cyan focus:border-transparent bg-white dark:bg-sail-dark text-gray-900 dark:text-gray-100"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Timestamps */}
        <div className="text-[10px] text-gray-500 dark:text-sail-text space-y-0.5">
          <p>Created: {new Date(transaction.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(transaction.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-2 border-t border-gray-200 dark:border-sail-dark-lighter">
        <Button
          variant="danger"
          className="w-full rounded-full text-xs py-1.5"
          onClick={handleDelete}
        >
          Delete Transaction
        </Button>
      </div>
    </div>
  );
}
