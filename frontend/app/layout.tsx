import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Microservices App",
  description: "Application microservices DevOps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex gap-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
            📦 Commandes
          </Link>
          <Link href="/recipes" className="text-gray-700 hover:text-orange-500 font-medium">
            🍽️ Recettes
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}