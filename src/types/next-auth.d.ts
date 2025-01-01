import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend default User type
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string; // Optional user role
  }

  interface Session extends DefaultSession {
    user: User; // Attach extended User type to Session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
