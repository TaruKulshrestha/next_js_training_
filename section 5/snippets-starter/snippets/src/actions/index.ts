'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';

// all exports here run on the server
// client components can import these (cant define 'use server' inside them)

// first arg = previous form state, second arg = submitted form fields
export async function createSnippet(
  formState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const title = formData.get('title');
    const code = formData.get('code');

    // return a message instead of throwing so the form can display it
    // title must be a string and at least 3 characters
    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }

    // code must be a string and at least 10 characters
    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }

    // create a new record in the db
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);
  } catch (err: unknown) {
    // expected errors get returned to the form; don't throw or error.tsx takes over
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  // send the user back to the home page
  // keep redirect outside try/catch - redirect throws and catch would swallow it
  redirect('/');

  // needed so the return type matches FormState (redirect never gets here)
  return { message: '' };
}

// called from the client edit form (id and code come from bind)
export async function editSnippet(id: number, code: string) {
  // update the snippet in the db
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  // send the user back to the show page
  redirect(`/snippets/${id}`);
}

// called from the show page delete form
export async function deleteSnippet(id: number) {
  // remove the snippet from the db
  await db.snippet.delete({
    where: { id },
  });

  // send the user back to the home page
  redirect('/');
}
