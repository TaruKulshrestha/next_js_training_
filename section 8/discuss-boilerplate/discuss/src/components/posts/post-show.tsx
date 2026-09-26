import { notFound } from "next/navigation";
import { fetchPostById } from "@/db/queries/posts";

interface PostShowProps {
  postId: string;
}

// Lesson 104 — A Few Project Files: renders one post's title and content.
// Lesson 111 — Don't Go Crazy With Reuse: a post is always loaded by id, so
// this component queries the database itself instead of taking a fetchData prop.
export default async function PostShow({ postId }: PostShowProps) {
  // Lesson 116 — Introducing Duplicate Queries: the page also calls
  // fetchPostById for the tab title.
  // Lesson 118 — Deduplicating Requests with Cache: cache() already ran
  // this query for the tab title, so this call reuses that result.
  const post = await fetchPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-2">
      <h1 className="text-3xl">{post.title}</h1>
      <p className="mt-4 max-w-xl pl-8 leading-7">{post.content}</p>
    </div>
  );
}
