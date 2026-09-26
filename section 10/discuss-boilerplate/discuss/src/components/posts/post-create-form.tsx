"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useActionState } from "react";
import * as actions from "@/actions";
import type { CreatePostFormState } from "@/actions";
import paths from "@/paths";

interface PostCreateFormProps {
  // Which topic this post belongs to. Bound into the server action below.
  slug: string;
}

// Shown on /topics/[slug]/posts/new, over the topic page.
export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const router = useRouter();
  // Lesson 98 — hook name is useActionState, not useFormState.
  // Third value is isPending, passed into the submit button as isLoading.
  // Lesson 101 — Passing Additional Args to a Server Action: bind(null, slug)
  // puts the topic slug in front of (previousState, formData). The form
  // itself only submits title and content.
  const [formState, action, isPending] = useActionState<
    CreatePostFormState,
    FormData
  >(actions.createPost.bind(null, slug), {
    errors: {},
  });

  return (
    <Modal
      isOpen
      placement="center"
      size="lg"
      onOpenChange={(open) => {
        if (!open) {
          router.push(paths.topicShow(slug));
        }
      }}
    >
      <ModalContent>
        <ModalHeader className="text-xl font-normal">Create a Post</ModalHeader>
        <ModalBody>
          <form action={action} className="flex flex-col gap-4 pb-4">
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder=" "
              variant="bordered"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder=" "
              variant="bordered"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded border border-red-400 bg-red-200 p-2">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}

            <Button
              type="submit"
              variant="bordered"
              className="self-start border-gray-700 bg-white"
              isLoading={isPending}
            >
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
