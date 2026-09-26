import { DefaultSession } from "next-auth";

// Default session.user has name, email, and image, but not id.
// auth.ts copies the database id on, and this tells TypeScript that field exists.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
