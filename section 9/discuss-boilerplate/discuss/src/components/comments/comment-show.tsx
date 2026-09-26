import Image from "next/image";
import type { CommentWithAuthor } from "@/db/queries/comments";
import CommentCreateForm from "@/components/comments/comment-create-form";

interface CommentShowProps {
  commentId: string;
  // Lesson 114 — the full list, not a fresh query for this one comment.
  comments: CommentWithAuthor[];
}

// Lesson 113 — Recursively Rendering Components: each comment renders its
// replies by rendering CommentShow again.
export default function CommentShow({ commentId, comments }: CommentShowProps) {
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  // Lesson 115 — Multiple Repeated DB Queries: replies come from the array
  // already loaded above. No second database call for this comment.
  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        {comment.user.image ? (
          <Image
            src={comment.user.image}
            alt="user image"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-400 text-gray-500"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="3" />
              <path d="M5 19c1.5-3 3.8-4.5 7-4.5S17.5 16 19 19" />
            </svg>
          </span>
        )}
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
