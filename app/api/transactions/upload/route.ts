import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCSV } from "@/lib/csv";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const fileContent = await file.text();
    const transactions = await parseCSV(fileContent);

    // Save transactions to database
    const savedTransactions = await Promise.all(
      transactions.map((tx) =>
        prisma.transaction.create({
          data: {
            date: new Date(tx.date),
            amount: parseFloat(tx.amount),
            merchant: tx.merchant,
            status: "unknown",
          },
        })
      )
    );

    return NextResponse.json({
      message: `Imported ${savedTransactions.length} transactions`,
      count: savedTransactions.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to parse and upload CSV" },
      { status: 500 }
    );
  }
}
