import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionWrapper from '@/components/SessionWrapper' // import the client wrapper
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-br" className={inter.className}>
      <body className="w-[390px] mx-auto">
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </body>
    </html>
  )
}
