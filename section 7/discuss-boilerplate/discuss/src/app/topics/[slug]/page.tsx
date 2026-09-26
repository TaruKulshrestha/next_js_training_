import TopicShow from "@/components/topics/topic-show";

// Lesson 94 — Next.js 15: params is a Promise, not a plain object.
// The page has to be async and await it before reading slug.
interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Lesson 95 — same 4-column grid as the home page.
// Posts fill the wide column. The sidebar has Create Post and the description.
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  return <TopicShow slug={slug} />;
}
