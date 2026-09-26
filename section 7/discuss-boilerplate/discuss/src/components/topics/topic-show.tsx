import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { db } from "@/db";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import paths from "@/paths";

interface TopicShowProps {
  slug: string;
}

function topicLabel(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

// Topic page body: posts on the left, create button and description on the right.
export default async function TopicShow({ slug }: TopicShowProps) {
  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    notFound();
  }

  const label = topicLabel(topic.slug);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="mb-4 text-4xl">{topic.slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href={paths.postCreate(slug)}
          className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-500 bg-white text-base"
        >
          Create Post
        </Link>
        <div className="min-h-52 rounded-md border border-gray-400 px-4 py-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <p className="mt-3 text-sm leading-6">{topic.description}</p>
        </div>
      </div>
    </div>
  );
}
