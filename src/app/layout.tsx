import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DopaDrop",
  description: "Focus and detox timer app",
  metadataBase: new URL('https://egynadya.github.io/dopadrop'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`} style={{
        backgroundImage: 'url("/dopadrop/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <div className="min-h-screen bg-black/50">
          {children}
        </div>
      </body>
    </html>
  );
}
