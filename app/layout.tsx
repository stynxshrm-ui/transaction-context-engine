import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatDidIBuy",
  description: "Reconstruct meaning from financial transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                💾 WhatDidIBuy
              </Link>
              <div className="flex gap-4">
                <Link href="/" className="text-gray-700 hover:text-gray-900">
                  Transactions
                </Link>
                <Link href="/upload" className="text-gray-700 hover:text-gray-900">
                  Upload
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t text-center py-4 text-gray-500 text-sm mt-12">
          <p>WhatDidIBuy © 2026</p>
        </footer>
      </body>
    </html>
  );
}
