"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
  session?: any; // Optional session prop
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
