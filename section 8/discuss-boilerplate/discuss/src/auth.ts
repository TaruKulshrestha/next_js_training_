import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "@/db";

// Lesson 63 — these come from the GitHub OAuth app, stored in .env.local
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth credentials");
}

// Lesson 64 — Auth.js Setup: NextAuth wires the Prisma adapter and GitHub.
// GET/POST go to the /api/auth route. auth() reads the session.
// signIn/signOut are what the header forms call.
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Writes User, Account, and Session rows into SQLite.
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  callbacks: {
    // Database sessions don't always copy the user id onto session.user.
    // We need that id later when a post or comment stores who wrote it.
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
