import Papa from "papaparse";

export interface ParsedTransaction {
  date: string;
  amount: string;
  merchant: string;
}

export function parseCSV(fileContent: string): Promise<ParsedTransaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: false,
      skipEmptyLines: true,
      complete: (results: { data: unknown[] }) => {
        const transactions: ParsedTransaction[] = [];
        
        // Skip header if present
        const startIndex = results.data[0]?.toString()?.toLowerCase().includes("date") ? 1 : 0;
        
        for (let i = startIndex; i < results.data.length; i++) {
          const row = results.data[i] as string[];
          if (row && row.length >= 3) {
            transactions.push({
              date: row[0]?.trim() || "",
              amount: row[1]?.trim() || "",
              merchant: row[2]?.trim() || "",
            });
          }
        }
        
        resolve(transactions);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
