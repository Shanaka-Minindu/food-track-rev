import { signInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";
import NextAuth from "next-auth";
import { prisma } from "./db";
import { comparePassword, toStringSafe } from "./utils";
import Credentials from "next-auth/providers/credentials";
import { Role } from "@/generated/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const validatedCredentials = signInSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: validatedCredentials.email,
          },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await comparePassword(
          validatedCredentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }
        return {
          id: toStringSafe(user.id),
          email: user.email,
          name: user.name,
          role: user.role as Role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  // In your auth.ts file
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = toStringSafe(user.id);
        token.name = user.name;
        token.role = user.role as Role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = toStringSafe(token.id);
        session.user.name = token.name;
        session.user.role = token.role as Role; // Add type assertion
      }

      return session;
    },
  },
});
