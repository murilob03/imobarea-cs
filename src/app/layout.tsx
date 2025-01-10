"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Inter } from "next/font/google"; // Import Inter font

import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
  session?: any; // Optional session prop
}

const inter = Inter({
  subsets: ["latin"], // Optimize for the Latin subset
  display: "swap",    // Use fallback font while loading
});

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
