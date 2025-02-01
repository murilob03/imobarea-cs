import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from '@/db'
import { UserRole } from '@/types'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        cellphone: { label: 'Cellphone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.cellphone || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { cellphone: credentials.cellphone },
          include: { Cliente: true, Imobiliaria: true, Agente: true },
        })

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
          cellphone: user.cellphone,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, user)
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
        role: token.role as UserRole,
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
