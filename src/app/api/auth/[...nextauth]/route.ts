import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import prisma from '@/db'
import { UserRole } from '@/types'

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        celular: { label: 'Celular', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.celular || !credentials?.senha) {
          return null
        }

        // Find user by celular
        const user = await prisma.user.findUnique({
          where: { celular: credentials.celular },
        })

        // Validate user and senha
        if (!user || !(await bcrypt.compare(credentials.senha, user.senha))) {
          return null
        }

        // Ensure role type safety
        const role = (user.role as UserRole) || UserRole.USER

        // Return user object with role-specific fields
        return {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role,
          celular: user.celular,
          cpf: role !== UserRole.IMOBILIARIA ? user.cpf : null,
          cnpj: role === UserRole.IMOBILIARIA ? user.cnpj : null,
          creci: role === UserRole.AGENTE ? user.creci : null,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Dynamically copy fields from user to token
      if (user) {
        Object.assign(token, user)
      }
      return token
    },
    async session({ session, token }) {
      // Merge token fields into session.user
      session.user = {
        ...session.user,
        ...token,
        role: token.role as UserRole, // Explicitly cast role to UserRole
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
