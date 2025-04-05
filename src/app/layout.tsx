'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DopaDrop",
  description: "Focus and detox timer app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`} style={{
        backgroundImage: 'url("https://i.imgur.com/2l7dffv.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <div className="min-h-screen bg-black/30">
          {children}
        </div>
      </body>
    </html>
  );
}
