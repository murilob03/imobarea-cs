"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
  session?: any; // Optional session prop
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
