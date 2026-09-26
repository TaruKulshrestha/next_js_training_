import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import { fetchPostById } from "@/db/queries/posts";
import paths from "@/paths";

// Lesson 94 — slug and postId both come from the awaited params promise.
interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

// Lesson 116 — Introducing Duplicate Queries: Next calls this before the page
// renders. It loads the post so the tab can use the title. PostShow asks
// for that same post.
// Lesson 118 — Deduplicating Requests with Cache: both calls go through
// the cached fetchPostById, so the database runs once.
export async function generateMetadata({
  params,
}: PostShowPageProps): Promise<Metadata> {
  const { postId } = await params;
  const post = await fetchPostById(postId);

  return {
    title: post?.title ?? "Post",
  };
}

// Lesson 105 — Merging a Few Files: this page renders the PostShow component
// instead of the old placeholder text.
export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="text-sm underline" href={paths.topicShow(slug)}>
        {slug}
      </Link>
      <PostShow postId={postId} />
      {/* Lesson 112 — Comment Creation: startOpen shows the box immediately. */}
      <CommentCreateForm postId={postId} startOpen />
      {/* Lesson 119 — Adding in Component Streaming: the post and reply box
          are sent right away. CommentList is a separate async component, so
          Next can stream it into this spot after the comment query finishes. */}
      <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
}
