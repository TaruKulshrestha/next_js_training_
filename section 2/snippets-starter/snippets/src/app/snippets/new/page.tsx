import { db } from '@/db';
import { redirect } from 'next/navigation';

// create page - /snippets/new
export default function SnippetCreatePage() {
  // this function runs when the form is submitted
  async function createSnippet(formData: FormData) {
    // needs to be a server action
    'use server'; // tells next js this runs on the server, not in the browser

    // grab whatever the user typed in the form
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // save a new snippet in the db
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);

    // after creating, send them back to the home page
    redirect('/');
  }

  return (
    // action={createSnippet} so submitting the form hits the server action above
    <form action={createSnippet}>
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
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
