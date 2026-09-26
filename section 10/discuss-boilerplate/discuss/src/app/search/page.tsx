import { Suspense } from "react";
import { redirect } from "next/navigation";
import PostList from "@/components/posts/post-list";
import PostListSkeleton from "@/components/posts/post-list-skeleton";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";

// Lesson 128 — Receiving the Query String in a Server Component.
// This file has no "use client", so it runs on the server. Next 15 passes
// searchParams as a promise, so the type is Promise<...> and the page
// awaits it before reading term. The browser never reads the query string.
interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

// Lesson 131 — Wrap Up: the search path, end to end.
// The header form posts actions.search. That action redirects to
// /search?term=... This server component awaits searchParams, then
// PostList runs fetchPostsBySearchTerm. The box keeps the word because
// SearchInput reads it with useSearchParams, inside Suspense in the header.
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }

  return (
    <div className="p-2">
      <h1 className="mb-4 text-2xl">Search results for {term}</h1>
      {/* Lesson 129 — Running the Search: PostList calls the search query.
          The heading is sent first. The skeleton shows until the matches arrive. */}
      <Suspense fallback={<PostListSkeleton />}>
        <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
      </Suspense>
    </div>
  );
}
