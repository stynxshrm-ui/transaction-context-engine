"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { TransactionList } from "@/components/TransactionList";

export default function Home() {
  const [filters, setFilters] = useState<{
    merchant?: string;
    status?: string;
    note?: string;
  }>({});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Transactions</h1>
        <p className="text-gray-600">
          Annotate and track the real meaning of your financial transactions.
        </p>
      </div>

      <SearchBar onFilterChange={setFilters} />
      <TransactionList filters={filters} />
    </div>
  );
}
