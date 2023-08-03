import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text"
        },
        password: {
          label: "Password:",
          type: "password"
        },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        return res.ok && user ? user : null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut"
  },
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.id = user.id
        token.first_name = user.first_name
        token.last_name = user.last_name
        token.email = user.email
        token.role = user.role
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      if(session.user){
        session.user.id = token.id
        session.user.first_name = token.first_name
        session.user.last_name = token.last_name
        session.user.email = token.email
        session.user.role = token.role
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
      }
      return session
    },
  },
};
