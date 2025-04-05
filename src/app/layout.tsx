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
  const basePath = process.env.NODE_ENV === 'production' ? '/dopadrop' : '';
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </head>
      <body className={`${inter.className} min-h-screen`} style={{
        backgroundImage: `url("${basePath}/background.jpg")`,
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
