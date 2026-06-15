"use client";

import { useState } from "react";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  merchant: string;
  notes: string | null;
  status: string;
}

interface TransactionRowProps {
  transaction: Transaction;
  onUpdate: (id: string, notes: string, status: string) => void;
}

export function TransactionRow({ transaction, onUpdate }: TransactionRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(transaction.notes || "");
  const [status, setStatus] = useState(transaction.status);

  const handleSave = () => {
    // Automatically set to "annotated" if notes have content
    const newStatus = notes.trim() ? "annotated" : status;
    onUpdate(transaction.id, notes, newStatus);
    setIsEditing(false);
  };

  const formattedDate = new Date(transaction.date).toLocaleDateString("sv-SE");

  if (isEditing) {
    return (
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-3 text-sm">{formattedDate}</td>
        <td className="px-4 py-3 text-sm font-mono">{transaction.amount} SEK</td>
        <td className="px-4 py-3 text-sm">{transaction.merchant}</td>
        <td className="px-4 py-3 text-sm">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add semantic meaning..."
            className="w-full p-2 border rounded text-xs"
            rows={2}
          />
        </td>
        <td className="px-4 py-3 text-sm">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-1 border rounded text-xs"
          >
            <option value="unknown">unknown</option>
            <option value="annotated">annotated</option>
          </select>
        </td>
        <td className="px-4 py-3 text-sm space-x-2">
          <button
            onClick={handleSave}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setNotes(transaction.notes || "");
              setStatus(transaction.status);
              setIsEditing(false);
            }}
            className="text-xs bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setIsEditing(true)}>
      <td className="px-4 py-3 text-sm">{formattedDate}</td>
      <td className="px-4 py-3 text-sm font-mono">{transaction.amount} SEK</td>
      <td className="px-4 py-3 text-sm">{transaction.merchant}</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {notes || <span className="italic text-gray-400">no notes</span>}
      </td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "unknown"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="text-xs text-blue-500 hover:underline"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
