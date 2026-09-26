import Link from "next/link";
import type { PostWithData } from "@/db/queries/posts";
import paths from "@/paths";

interface PostListProps {
  // Lesson 109 — Define in Parent, Fetch in Child: the parent builds this
  // function. PostList only calls it.
  fetchData: () => Promise<PostWithData[]>;
}

// Lesson 104 — A Few Project Files: lists posts.
// Lesson 106 — Considerations Around Where to Fetch Data: fetching inside
// this file would lock the list to one query. Fetching in the page and
// passing the array down would make the page wait before it can render.
// Lesson 107 — Data Fetching in Child Components: the await stays here, so
// the list can load after the rest of the page is on screen.
// Lesson 108 — Recommended Data Fetching: the child fetches, and the parent
// decides which query that fetch runs.
export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div key={post.id} className="rounded-md border border-gray-400 p-4">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-xl">{post.title}</h3>
          <div className="mt-3 flex flex-row gap-10 text-sm">
            <p>By {post.user.name}</p>
            <p>{post._count.comments} comments</p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-4">{renderedPosts}</div>;
}
