import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const statusFilter = searchParams.get("status");

    const where: any = {
      AND: [
        {
          OR: [
            { merchant: { contains: query } },
            { notes: { contains: query } },
          ],
        },
      ],
    };

    if (statusFilter) {
      where.AND.push({ status: statusFilter });
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      take: 100,
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search transactions" },
      { status: 500 }
    );
  }
}
