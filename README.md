# WhatDidIBuy

A lightweight full-stack backend for reconstructing the real-world meaning of financial transactions by combining raw bank exports with user-provided context.

## 🎯 Overview

Bank transactions are optimized for payment processing, not human understanding. This system addresses the gap between financial transaction data and human memory of actual purchases through structured annotation.

**Example workflow:**
```
Raw transaction:  249 SEK | PERL | 2026-06-14
Annotated:        "coffee with colleague" | annotated ✓
```

## 🏗️ Tech Stack

- **Frontend/Backend:** Next.js 16 (App Router)
- **Language:** TypeScript
- **ORM:** Prisma 6
- **Database:** SQLite (MVP)
- **CSV Parsing:** PapaParse

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Setup Database

```bash
npx prisma migrate dev --name init
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

## 📊 Data Model

### Transaction
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (CUID) |
| date | datetime | Transaction date |
| amount | float | Transaction amount |
| merchant | string | Raw merchant label from bank export |
| notes | string? | User-provided semantic description |
| status | enum | `unknown` \| `annotated` |
| createdAt | datetime | Record creation timestamp |
| updatedAt | datetime | Last update timestamp |

## ✨ MVP Features

### 1. CSV Ingestion Pipeline
- Upload bank export files (CSV format)
- Parse and validate transaction data
- Persist records to SQLite database

**CSV Format:**
```
date,amount,merchant
2026-06-14,799,JYSK
2026-06-14,249,PERL
```

### 2. Transaction Store
- Stores raw financial transactions
- Preserves original merchant metadata
- Indexes on merchant and status for fast filtering

### 3. Manual Annotation Layer
Users can attach semantic meaning to transactions:
- Edit transaction notes
- Mark status as `annotated` when complete
- Edit inline from transaction list

### 4. Retrieval Interface
- **List transactions** with pagination
- **Filter by merchant** (case-insensitive substring match)
- **Filter by notes** (semantic meaning search)
- **Filter by status** (unknown/annotated)
- **Search** across merchant and notes fields

## 📁 Project Structure

```
transaction-context-engine/
├── app/
│   ├── api/
│   │   ├── transactions/
│   │   │   ├── route.ts           # GET (list with filters)
│   │   │   └── [id]/route.ts      # GET/PATCH transactions
│   │   ├── transactions/upload/
│   │   │   └── route.ts           # POST CSV upload
│   │   └── search/
│   │       └── route.ts           # GET search
│   ├── page.tsx                    # Transaction list page
│   ├── upload/page.tsx             # Upload page
│   └── layout.tsx                  # Root layout
├── components/
│   ├── CSVUpload.tsx
│   ├── TransactionList.tsx
│   ├── TransactionRow.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── prisma.ts
│   └── csv.ts
└── prisma/
    └── schema.prisma
```

## 🔌 API Endpoints

### GET /api/transactions
List transactions with optional filtering.

```bash
curl "http://localhost:3000/api/transactions?status=unknown"
```

### POST /api/transactions/upload
Upload CSV file.

```bash
curl -X POST -F "file=@transactions.csv" http://localhost:3000/api/transactions/upload
```

### PATCH /api/transactions/[id]
Update transaction notes and status.

```bash
curl -X PATCH http://localhost:3000/api/transactions/abc123 \
  -H "Content-Type: application/json" \
  -d '{"notes":"coffee meeting","status":"annotated"}'
```

### GET /api/search
Search transactions.

```bash
curl "http://localhost:3000/api/search?q=coffee"
```

## 🛠️ Development

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
npx prisma studio # Open database viewer
```

## 📝 Status

MVP (Phase 1) ✔
- CSV ingestion ✔
- Transaction storage ✔
- Manual annotation ✔
- Basic search & filter ✔

---

Made with ❤️ for financial memory.
