"use server";

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

// Lesson 99 — title and content are required text. Too-short values become
// field errors on the form, the same way the topic name and description do.
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

// Lesson 97 — same shape as the topic form. title/content are field errors.
// _form is for "not signed in" (lesson 100) or a database failure.
export interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

// Lesson 101 — Passing Additional Args to a Server Action: slug is not a form
// field. The form binds it in front of (previousState, formData).
export async function createPost(
  slug: string,
  _formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    // Lesson 99 — flatten() gives { title?: string[], content?: string[] }.
    // The post form already shows those under the matching inputs.
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Lesson 100 — Checking Authentication Status.
  // Lesson 102 — Type 'string | undefined' is not assignable to type 'string':
  // session.user.id is optional until this check. After it, id is a string
  // and can be stored on the post.
  const session = await auth();
  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  // Lesson 101 — the bound slug is how we find which topic this post belongs to.
  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      },
    };
  }

  let post: Post;
  try {
    // Lesson 103 — Creating the Record: one Post row, tied to this user and topic.
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }
    return {
      errors: {
        _form: ["Failed to create post"],
      },
    };
  }

  // redirect() throws, so it stays outside the try. The topic page lists posts,
  // so it needs a fresh read after this write.
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
