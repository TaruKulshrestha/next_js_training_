import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";

// Lesson 53 — this file is the "/" route because it is app/page.tsx.
// Home page. Left side lists posts. Right side creates a topic, then lists
// every topic already in the database.
export default function Home() {
  return (
    // Lesson 56 — Basic Styling with Tailwind: 4 columns, gap, and padding.
    <div className="grid grid-cols-4 gap-6 p-2">
      <div className="col-span-3">
        <h1 className="mb-4 text-2xl">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="flex flex-col gap-3">
        <TopicCreateForm />
        <div className="min-h-72 rounded-md border border-gray-400 px-4 py-3">
          <h2 className="mb-3 text-center text-lg">Topics</h2>
          <TopicList />
        </div>
      </div>
    </div>
  );
}
