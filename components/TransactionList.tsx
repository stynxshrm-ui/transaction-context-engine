"use client";

import { useState, useEffect } from "react";
import { TransactionRow } from "./TransactionRow";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  merchant: string;
  notes: string | null;
  status: string;
}

interface TransactionListProps {
  filters?: {
    merchant?: string;
    status?: string;
    note?: string;
  };
  refreshTrigger?: number;
}

export function TransactionList({ filters, refreshTrigger }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams();
      if (filters?.merchant) params.append("merchant", filters.merchant);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.note) params.append("note", filters.note);

      const response = await fetch(`/api/transactions?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setTransactions(data.transactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, refreshTrigger]);

  const handleUpdate = async (id: string, notes: string, status: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, status }),
      });

      if (!response.ok) throw new Error("Failed to update");
      
      // Refresh list
      fetchTransactions();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update transaction");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600 py-8">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Merchant</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Notes</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
