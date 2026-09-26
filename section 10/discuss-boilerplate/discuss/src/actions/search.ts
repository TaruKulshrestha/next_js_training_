"use server";

import { redirect } from "next/navigation";

// Lesson 126 — Redirecting From a Server Action: the search form posts this.
// formData holds the input named "term". redirect() ends the action and
// sends the browser to a new URL. It throws on purpose, so nothing can
// run after it. An empty box goes home. A real term goes to /search?term=...
export async function search(formData: FormData) {
  const term = formData.get("term");

  if (typeof term !== "string" || !term.trim()) {
    redirect("/");
  }

  redirect(`/search?term=${encodeURIComponent(term)}`);
}
