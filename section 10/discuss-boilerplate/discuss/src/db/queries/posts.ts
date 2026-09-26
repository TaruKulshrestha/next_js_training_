import type { Post } from "@prisma/client";
import { cache } from "react";
import { db } from "@/db";

// Lesson 110 — Alternative Type Names and Query Definitions: PostWithData is
// a short name for a Post plus the topic slug, the author's name, and the
// comment count. Callers use this name instead of writing that shape inline.
export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// Lesson 110 — the query lives next to the type, not inside the component.
// Lesson 109 — the topic page passes this function into PostList.
const postWithDataInclude = {
  topic: { select: { slug: true } },
  user: { select: { name: true } },
  _count: { select: { comments: true } },
} as const;

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: postWithDataInclude,
  });
}

// Lesson 116 — Introducing Duplicate Queries: one function both the post
// body and the browser tab title call.
// Lesson 117 — Request Memoization: Next remembers fetch(url) for one
// render. Prisma is not fetch, so it does not get that for free.
// Lesson 118 — Deduplicating Requests with Cache: cache() gives this
// function the same behavior. Same postId during one render runs the
// query once and reuses the result. The log prints once.
export const fetchPostById = cache(
  (postId: string): Promise<Post | null> => {
    console.log("DB query: post", postId);

    return db.post.findFirst({
      where: { id: postId },
    });
  }
);

// Lesson 129 — Running the Search: posts whose title or content contains
// the term. SQLite matches the exact letters, so "React" does not match "react".
export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } },
      ],
    },
    include: postWithDataInclude,
  });
}

// Lesson 122 — Top Posts on the HomePage: every post, busiest threads first.
// Lesson 131 — Wrap Up: the 2 second pause is gone. The home page skeleton
// still shows if this query is actually slow.
export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    include: postWithDataInclude,
    orderBy: {
      comments: { _count: "desc" },
    },
  });
}
