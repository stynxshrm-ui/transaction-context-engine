import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transactions = [
  { date: new Date("2026-06-14"), amount: 799, merchant: "JYSK", status: "unknown" },
  { date: new Date("2026-06-14"), amount: 249, merchant: "PERL", status: "unknown" },
  { date: new Date("2026-06-13"), amount: 450, merchant: "ICA", status: "groceries" },
  { date: new Date("2026-06-13"), amount: 89, merchant: "SPOTIFY", status: "subscription" },
  { date: new Date("2026-06-12"), amount: 1299, merchant: "AMAZON", status: "shopping" },
  { date: new Date("2026-06-11"), amount: 199, merchant: "CAFFEBOHEMIA", status: "food" },
  { date: new Date("2026-06-10"), amount: 350, merchant: "NORDSJO", status: "home" },
  { date: new Date("2026-06-09"), amount: 50, merchant: "7ELEVEN", status: "food" },
  { date: new Date("2026-06-08"), amount: 129, merchant: "NETFLIX", status: "subscription" },
  { date: new Date("2026-06-07"), amount: 620, merchant: "H&M", status: "shopping" },
  { date: new Date("2026-06-06"), amount: 85, merchant: "MCDONALDS", status: "food" },
  { date: new Date("2026-06-05"), amount: 1850, merchant: "IKEA", status: "home" },
  { date: new Date("2026-06-04"), amount: 299, merchant: "APPLE", status: "subscription" },
  { date: new Date("2026-06-03"), amount: 540, merchant: "ICA", status: "groceries" },
  { date: new Date("2026-06-02"), amount: 75, merchant: "STARBUCKS", status: "food" },
];

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.transaction.createMany({ data: transactions });
  console.log(`Seeded ${transactions.length} transactions`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
