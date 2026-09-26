"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

// Lesson 82 — name is the slug, so it has to be lowercase letters and dashes
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

// Lesson 85 — exported so the form can tell useActionState what state looks like
// Lesson 86 — this is the whole form state. createTopic returns it, and
// useActionState keeps the latest copy so the inputs can read it.
// name / description are Zod's field errors (a field can fail more than one
// check, so each value is a string[]). _form is anything that isn't one
// input: not signed in, or the database threw.
export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

// Lesson 79 — Creating a Topic: this action inserts one Topic row.
// Lesson 81 — form posts FormData into this action
// Lesson 83 — useFormState always calls this as (previousState, formData).
// The first argument has to be there even when we ignore it. If it weren't,
// FormData would land in the wrong spot and validation would read empty fields.
export async function createTopic(
  _formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // name and description come from the input name="" attributes, not from React state.
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    // Lesson 88 — flatten() turns Zod issues into { name: string[], description: string[] }
    // so the form can show each message under the matching input.
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Lesson 67 — only a signed-in user can create a topic
  // Lesson 89 — this isn't a bad name or description, so it goes on _form
  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  let topic: Topic;
  try {
    // Insert only. Other topics (and their posts/comments) stay as they are.
    // Lesson 90 — slug is unique. A second "react" throws here. Catch it and
    // send the message back on _form instead of crashing the action.
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    // Lesson 90 — Prisma errors are Error instances. Show that message.
    // Anything else gets a generic line so the form still has something to render.
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

  // Lesson 73 — home lists topics, so it needs a fresh read after this write
  // Lesson 90 — redirect() throws. It stays outside the try so that throw
  // is not caught and shown as a database error.
  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
