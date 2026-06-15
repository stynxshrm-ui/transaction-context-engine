"use client";

import { useState } from "react";

interface CSVUploadProps {
  onSuccess?: () => void;
}

export function CSVUpload({ onSuccess }: CSVUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/transactions/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setMessage(`✓ Successfully imported ${data.count} transactions`);
      onSuccess?.();
      
      // Reset file input
      e.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Import Transactions</h2>
      
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={uploading}
          className="flex-1"
        />
        {uploading && <span className="text-gray-500">Uploading...</span>}
      </div>

      {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
