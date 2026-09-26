import { Skeleton } from "@nextui-org/react";

// Lesson 121 — Adding a Loading Skeleton: one empty comment. A circle for
// the avatar, a short bar for the name, and two bars for the text.
function CommentSkeleton() {
  return (
    <div className="mb-1 mt-2 border p-4">
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-24 rounded-lg" />
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-3 w-2/3 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Lesson 121 — the fallback for the comment list. Three placeholders stand
// in until the real comments stream in and replace this whole block.
export default function CommentListSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-40 rounded-lg" />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
}
