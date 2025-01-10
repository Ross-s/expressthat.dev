import { prisma } from "./prisma";
import NextAuth, { DefaultSession } from "next-auth";
import cognito from "next-auth/providers/cognito";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const { handlers, signIn,  signOut, auth } = NextAuth({
  providers: [
    cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        email: token.email,
      },
    }),

    authorized: async ({auth, request}) => {
        if (!auth && request.nextUrl.pathname == "/app")
        {
            return false;
        }
        return true;
    },

    jwt: async (prams) => {
      if (prams.profile) {
        prams.token.email = prams.profile.email as string;

        const result = await prisma.user.findFirst({
          where: { providerId: prams.profile.sub as string },
        });

        if (result) {
          prams.token.sub = result.id;
        } else {
          const user = await prisma.user.create({
            data: {
              providerId: prams.profile.sub as string,
              email: prams.profile.email as string,
              createdAt: new Date(),
            },
          });

          prams.token.sub = user.id;
        }
      }
      return prams.token;
    },
  },
});
