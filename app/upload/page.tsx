"use client";

import { useState } from "react";
import Link from "next/link";
import { CSVUpload } from "@/components/CSVUpload";

export default function Upload() {
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleUploadSuccess = () => {
    setUploadedCount((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Import Transactions</h1>
        <p className="text-gray-600">
          Upload a CSV file from your bank export. Expected format: date, amount, merchant
        </p>
      </div>

      <div className="space-y-6">
        <CSVUpload onSuccess={handleUploadSuccess} />

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">CSV Format</h3>
          <p className="text-sm text-blue-800 mb-3">
            Your CSV file should have the following columns (in order):
          </p>
          <pre className="bg-white p-3 rounded text-xs overflow-auto border border-blue-200">
            {`date,amount,merchant
2026-06-14,799,JYSK
2026-06-14,249,PERL`}
          </pre>
        </div>

        {uploadedCount > 0 && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <p className="text-green-900">
              ✓ Successfully imported {uploadedCount} batch(es) of transactions.{" "}
              <Link href="/" className="underline font-semibold text-green-700">
                View all transactions →
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
