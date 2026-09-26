import type { Comment } from "@prisma/client";
import { db } from "@/db";

// Lesson 110 — same idea as PostWithData: a short name for a comment plus
// the author's name and image.
export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

// Lesson 114 — Fetching the Big List: one query returns every comment on
// the post, replies included. The components filter that array in memory.
// Lesson 115 — Multiple Repeated DB Queries: this runs again on every call.
// CommentList is the only caller. If CommentShow called this for each reply,
// the terminal would print the same SELECT once per comment.
export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  console.log("DB query: comments for post", postId);

  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
