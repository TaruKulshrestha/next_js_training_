import type { Metadata } from "next";
import PostCreateForm from "@/components/posts/post-create-form";
import TopicShow from "@/components/topics/topic-show";

export const metadata: Metadata = {
  title: "Create a Post",
};

// Lesson 94 — same Next.js 15 rule: await params before using slug.
interface PostCreatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// The topic page stays on screen. The form is a dialog in front of it.
export default async function PostCreatePage({ params }: PostCreatePageProps) {
  const { slug } = await params;

  return (
    <>
      <TopicShow slug={slug} />
      <PostCreateForm slug={slug} />
    </>
  );
}
