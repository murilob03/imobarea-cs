import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import prisma from "@/db";

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Find user by email/username
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username, // Assuming 'username' is the email
          },
        });

        // If user not found or password doesn't match, return null
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null;
        }

        // Return user object (exclude sensitive fields like password)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          //   role: user.role, // Optional field
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page (optional)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
