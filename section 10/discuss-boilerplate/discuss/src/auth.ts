import { appendFileSync } from "fs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AdapterAccount } from "next-auth/adapters";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "@/db";

// Lesson 63 — these come from the GitHub OAuth app, stored in .env.local
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth credentials");
}

// Auth.js hands Prisma every field from GitHub's token response. Columns that
// are not on Account, or an expires_at outside a 32-bit int, make Prisma throw.
// Auth.js then shows that as a configuration error.
const adapter = PrismaAdapter(db);
if (adapter.linkAccount) {
  const linkAccount = adapter.linkAccount.bind(adapter);
  adapter.linkAccount = (account) => {
    const expiresAt = Number(account.expires_at);
    const data: AdapterAccount = {
      userId: account.userId,
      type: account.type,
      provider: account.provider,
      providerAccountId: String(account.providerAccountId),
      access_token: account.access_token,
      refresh_token: account.refresh_token,
      token_type: account.token_type,
      scope: typeof account.scope === "string" ? account.scope : undefined,
      id_token: typeof account.id_token === "string" ? account.id_token : undefined,
      session_state:
        typeof account.session_state === "string" ? account.session_state : undefined,
      expires_at:
        Number.isInteger(expiresAt) && expiresAt > 0 && expiresAt <= 2147483647
          ? expiresAt
          : undefined,
    };
    return linkAccount(data);
  };
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
  adapter,
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      // GitHub rolled out RFC 9207 and now sends an `iss` param on callback.
      // Auth.js validates it against the provider's issuer, which isn't set
      // by default for GitHub — so we set it explicitly to match.
      issuer: "https://github.com/login/oauth",
      // A previous attempt saved the GitHub user before the account row failed.
      // GitHub verifies email addresses, so attach this sign-in to that user.
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  trustHost: true,
  useSecureCookies: false,
  logger: {
    error(error) {
      const cause =
        error instanceof Error
          ? (error.cause as { err?: { message?: string; error?: string; error_description?: string } } | undefined)
          : undefined;
      const lines = [
        new Date().toISOString(),
        error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        cause?.err?.message ? `cause: ${cause.err.message}` : "",
        cause?.err?.error ? `github_error: ${cause.err.error}` : "",
        cause?.err?.error_description
          ? `github_error_description: ${cause.err.error_description}`
          : "",
      ].filter(Boolean);
      appendFileSync("auth-error.log", `${lines.join("\n")}\n\n`);
    },
  },
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