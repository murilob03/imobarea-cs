import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { UserRole } from './index'

// Extend default User type
declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string
    role: UserRole
    cellphone: string
    cpf: string | null
    cnpj: string | null
    creci: string | null
  }

  interface Session extends DefaultSession {
    user: User // Attach extended User type to Session
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    cellphone: string
    cpf: string | null
    cnpj: string | null
    creci: string | null
  }
}
