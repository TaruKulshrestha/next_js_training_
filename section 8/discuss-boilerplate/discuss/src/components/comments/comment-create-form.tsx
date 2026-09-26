"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import type { CreateCommentFormState } from "@/actions";
import FormButton from "@/components/common/form-button";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

// Lesson 112 — Comment Creation: the post page opens this immediately.
// A reply starts closed until Reply is clicked.
export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState<
    CreateCommentFormState,
    FormData
  >(actions.createComment.bind(null, { postId, parentId }), {
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          placeholder="Reply here"
          minRows={3}
          variant="bordered"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
          classNames={{
            inputWrapper: "border-gray-400 shadow-none",
          }}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form.join(", ")}
          </div>
        ) : null}

        <FormButton isLoading={isPending}>Save</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      {startOpen ? null : (
        <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
          Reply
        </Button>
      )}
      {open && form}
    </div>
  );
}
