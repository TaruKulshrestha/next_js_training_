import { Skeleton } from "@nextui-org/react";

// Lesson 122 — Top Posts on the HomePage: an empty post card. A wide bar
// for the title, then two short bars for the author and the comment count.
function PostSkeleton() {
  return (
    <div className="rounded-md border border-gray-400 p-4">
      <Skeleton className="h-6 w-2/3 rounded-lg" />
      <div className="mt-3 flex flex-row gap-10">
        <Skeleton className="h-3 w-24 rounded-lg" />
        <Skeleton className="h-3 w-28 rounded-lg" />
      </div>
    </div>
  );
}

// Lesson 122 — shown in the Top Posts column until fetchTopPosts finishes.
export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}
