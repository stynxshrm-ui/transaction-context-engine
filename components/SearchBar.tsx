"use client";

interface SearchBarProps {
  onFilterChange: (filters: {
    merchant?: string;
    status?: string;
    note?: string;
  }) => void;
}

export function SearchBar({ onFilterChange }: SearchBarProps) {
  const handleMerchantChange = (value: string) => {
    onFilterChange({ merchant: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value || undefined });
  };

  const handleNoteChange = (value: string) => {
    onFilterChange({ note: value || undefined });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-sm font-semibold mb-3">Filter</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search merchant..."
          onChange={(e) => handleMerchantChange(e.target.value)}
          className="px-3 py-2 border rounded text-sm"
        />
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => handleNoteChange(e.target.value)}
          className="px-3 py-2 border rounded text-sm"
        />
        <select
          defaultValue=""
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-3 py-2 border rounded text-sm"
        >
          <option value="">All statuses</option>
          <option value="unknown">unknown</option>
          <option value="annotated">annotated</option>
        </select>
      </div>
    </div>
  );
}
