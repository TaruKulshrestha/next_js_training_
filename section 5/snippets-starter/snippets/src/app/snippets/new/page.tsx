'use client';

import { useActionState } from 'react';

import * as actions from '@/actions';

type FormState = { message: string };

// client component - useActionState is a hook

export default function SnippetCreatePage() {

  // formState = last object returned by the action
  // action = wrapped function we pass to the form
  // isPending = true while the action is running
  // cast: redirect() makes next type the action as returning void

  const [formState, action, isPending] = useActionState(

    actions.createSnippet as (

      formState: FormState,

      formData: FormData

    ) => Promise<FormState>,

    { message: '' }

  );
  return (

    <form action={action}>

      <h3 className="font-bold m-3">Create a Snippet</h3>

      <div className="flex flex-col gap-4">

        <div className="flex gap-4">

          <label className="w-12" htmlFor="title">

            Title

          </label>

          <input

            name="title"

            className="border rounded p-2 w-full"

            id="title"

          />

        </div>

        <div className="flex gap-4">

          <label className="w-12" htmlFor="code">

            Code

          </label>

          <textarea

            name="code"

            className="border rounded p-2 w-full"

            id="code"

          />

        </div>
        {/* error message returned by the server action */}
        {formState.message ? (

          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">

            {formState.message}
          </div>

        ) : null}
        <button type="submit" className="rounded p-2 bg-blue-200" disabled={isPending}>

          Create

        </button>

      </div>

    </form>

  );

}

