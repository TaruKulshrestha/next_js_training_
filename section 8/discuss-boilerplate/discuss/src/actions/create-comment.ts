"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

export interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

// Lesson 112 — Comment Creation: postId and parentId are bound in.
// parentId is omitted for a top-level comment and set for a reply.
export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  _formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        postId,
        parentId,
        userId: session.user.id,
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
        _form: ["Something went wrong"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
