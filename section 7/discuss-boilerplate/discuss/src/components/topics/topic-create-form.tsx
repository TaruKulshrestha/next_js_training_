"use client";

// This file runs in the browser because it uses useActionState.
// createTopic itself stays on the server ("use server" in the action file).
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { useActionState } from "react";
import * as actions from "@/actions";
import type { CreateTopicFormState } from "@/actions";
import FormButton from "@/components/common/form-button";

// Lesson 80 — the form lives in a popover so it doesn't take over the sidebar
export default function TopicCreateForm() {
  // Lesson 84 — useFormState Hook: React 19 moved it. useFormState from
  // "react-dom" is now useActionState from "react".
  // It returns [formState, action, isPending].
  // Lesson 96 — Next.js 15 uses this same hook for every form, including
  // the post form that comes next. Do not go back to useFormState.
  // Lesson 92 — isPending is true only while createTopic is running, and that
  // is what turns the Save button into a spinner.
  // Lesson 85 — without these generics TS grabs the 1-arg overload, then
  // formState.errors.name is missing and createTopic's (state, formData)
  // signature does not match. State is CreateTopicFormState, payload is FormData.
  const [formState, action, isPending] = useActionState<
    CreateTopicFormState,
    FormData
  >(
    actions.createTopic,
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left" backdrop="opaque">
      <PopoverTrigger>
        <Button
          variant="bordered"
          className="h-12 w-full border-gray-500 bg-white text-base"
        >
          New Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="items-stretch">
        {/* Lesson 87 — React 19 form break: give <form action> the function
            from useActionState. No onSubmit and no preventDefault. React
            calls createTopic for us. When that finishes it also clears the
            inputs, same as a normal full-page submit. */}
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            {/* Lesson 88 — formState.errors.name is the string[] from Zod.
                isInvalid turns the field red; errorMessage joins the list
                into one line under the input. Same for description. */}
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder=" "
              variant="bordered"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder=" "
              variant="bordered"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {/* Lesson 89 — _form is the general error (not signed in, db).
                It isn't attached to one input, so it sits in its own box. */}
            {formState.errors._form ? (
              <div className="rounded border border-red-400 bg-red-200 p-2">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}

            {/* Lesson 92 — pass isPending in as isLoading. NextUI's Button
                shows a spinner and blocks another click while that is true. */}
            <div>
              <FormButton isLoading={isPending}>Submit</FormButton>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
