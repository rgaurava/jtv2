import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { transactionAPI } from '../services/api';
import type { Transaction } from '../types';
import { Sidebar } from '../components/dashboard/Sidebar';
import { MainPanel } from '../components/dashboard/MainPanel';
import { DetailsPanel } from '../components/dashboard/DetailsPanel';

export function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionSelect = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleTransactionCreated = () => {
    setShowCreateModal(false);
    loadTransactions();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-sail-dark">
      {/* Sidebar - Left Panel */}
      <Sidebar
        user={user}
        onCreateTransaction={() => setShowCreateModal(true)}
      />

      {/* Main Panel - Center */}
      <MainPanel
        transactions={transactions}
        isLoading={isLoading}
        selectedTransaction={selectedTransaction}
        onTransactionSelect={handleTransactionSelect}
        showCreateModal={showCreateModal}
        onCloseCreateModal={() => setShowCreateModal(false)}
        onTransactionCreated={handleTransactionCreated}
        onRefresh={loadTransactions}
      />

      {/* Details Panel - Right */}
      <DetailsPanel
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onUpdate={loadTransactions}
      />
    </div>
  );
}
