"use server";

import * as auth from "@/auth";

// Lesson 66 — the Sign In button posts this. It starts GitHub OAuth.
export async function signIn() {
  return auth.signIn("github");
}
