'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionWrapperProps {
  children: ReactNode
  session?: any
}

export default function SessionWrapper({ children, session }: SessionWrapperProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
