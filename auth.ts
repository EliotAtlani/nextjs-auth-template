/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { Profile, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

import { db } from "./src/lib/Prisma.db";

import { comparePwd } from "@/actions/user/comparePwd";
import { getUserFromDb } from "@/actions/user/getUserFromDb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log("Credentials", credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserFromDb(email);
          if (!user) return null;
          const passwordMatch = await comparePwd(password, user.password ?? "");
          if (passwordMatch) return user as unknown as User;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
    Google,
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const { email } = profile as Profile;
        // Check if user exists in the database
        let dbUser = await getUserFromDb(email as string);

        if (!dbUser) {
          // Create user in the database
          dbUser = await db.user.create({
            data: {
              email: email as string,
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
        }
      }
      return true;
    },
    async session({ token, session }) {
      console.log("TOKEN", token);
      if (token) {
        //@ts-ignore
        session.name = token.name;
        //@ts-ignore
        session.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      console.log("USER2", user);
      if (user) {
        return { ...token, name: user.name, email: user.email };
      }
      return token;
    },
    redirect() {
      return "/";
    },
  },
});
