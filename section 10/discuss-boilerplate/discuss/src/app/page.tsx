import { Suspense } from "react";
import PostList from "@/components/posts/post-list";
import PostListSkeleton from "@/components/posts/post-list-skeleton";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";

// Lesson 53 — this file is the "/" route because it is app/page.tsx.
// Home page. Left side lists posts. Right side creates a topic, then lists
// every topic already in the database.
// Lesson 124 — Notes on QueryStrings in Next: this same page also handles
// /?term=react. The query string does not choose a different file. Next
// hands the pairs to the page as searchParams. Reading them makes the page
// dynamic, because the term can be anything and cannot be known at build time.
interface HomePageProps {
  searchParams: Promise<{
    term?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  // Lesson 125 — Accessing the Query String: Next 15 gives searchParams as
  // a promise, same as route params. term is undefined on a plain "/" visit
  // and the typed text when the URL is /?term=react. The list is not
  // filtered yet. The terminal prints the value so you can see the read.
  const { term } = await searchParams;
  console.log("search term:", term);

  return (
    // Lesson 56 — Basic Styling with Tailwind: 4 columns, gap, and padding.
    <div className="grid grid-cols-4 gap-6 p-2">
      <div className="col-span-3">
        <h1 className="mb-4 text-2xl">Top Posts</h1>
        {/* Lesson 122 — Top Posts on the HomePage: fetchTopPosts orders by
            comment count. This boundary lets the heading and the Topics
            sidebar render first. The skeleton stands in until the posts arrive. */}
        <Suspense fallback={<PostListSkeleton />}>
          <PostList fetchData={fetchTopPosts} />
        </Suspense>
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
