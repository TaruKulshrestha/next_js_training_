"use server";

import * as auth from "@/auth";

// Lesson 76 — the Sign Out button posts this. It clears the session cookie.
export async function signOut() {
  return auth.signOut();
}
