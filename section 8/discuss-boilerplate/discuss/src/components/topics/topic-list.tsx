import Link from "next/link";
import { db } from "@/db";
import paths from "@/paths";

// Lesson 93 — server component. The query runs on the server, then the
// links are sent down as HTML. No useEffect, no client fetch.
export default async function TopicList() {
  const topics = await db.topic.findMany({
    orderBy: { slug: "asc" },
  });

  return (
    <ul className="list-disc space-y-1 pl-5">
      {topics.map((topic) => (
        <li key={topic.id}>
          <Link href={paths.topicShow(topic.slug)} className="underline">
            {topic.slug}
          </Link>
        </li>
      ))}
    </ul>
  );
}
