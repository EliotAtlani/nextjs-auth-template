/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { Profile, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

import { db } from "./src/lib/Prisma.db";

import { comparePwd } from "@/actions/user/comparePwd";
import { getUserFromDb } from "@/actions/user/getUserFromDb";
import { updateLastLoginTime } from "@/actions/user/updateLastLoginTime";

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

          const user = await getUserFromDb(email, "email");
          if (!user) return null;
          const passwordMatch = await comparePwd(password, user.password ?? "");
          if (passwordMatch) {
            //Update lastLogin time
            await updateLastLoginTime(email);
            return user as unknown as User;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const { email, picture, name } = profile as Profile;
        // Check if user exists in the database
        let dbUser = await getUserFromDb(email as string, "google");

        if (!dbUser) {
          const [firstname, lastname] = (name as string).split(" ");

          // Create user in the database
          dbUser = await db.user.create({
            data: {
              email: email as string,
              provider: account?.provider,
              providerId: account?.providerAccountId,
              image: picture as string,
              firstname: firstname as string,
              lastname: lastname as string,
            },
          });
        } else {
          await updateLastLoginTime(email as string);
        }
      }
      return true;
    },
    async session({ token, session }) {
      console.log("TOKEN", token);
      if (token) {
        //@ts-ignore
        session.firstname = token.firstname;
        //@ts-ignore
        session.lastname = token.lastname;
        //@ts-ignore
        session.email = token.email;
        //@ts-ignore
        session.role = token.role;
        //@ts-ignore
        session.image = token.image;
      }

      return session;
    },
    async jwt({ token, user, profile }) {
      console.log("USER", user);
      console.log("PROFILE", profile);
      if (user) {
        let firstname = "";
        let lastname = "";
        if (user.name) {
          [firstname, lastname] = (user.name as string).split(" ");
          //@ts-ignore
        } else if (user?.firstname && user.lastname) {
          //@ts-ignore

          firstname = user.firstname;
          //@ts-ignore

          lastname = user.lastname;
        }

        return {
          email: user.email,
          //@ts-ignore
          role: user.role,
          firstname,
          //@ts-ignore
          image: user.picture ?? user.image,
          lastname,
        };
      }
      return token;
    },
    redirect() {
      return "/";
    },
  },
});
