'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';

// file added for server actions - all exports here run on the server
// client components can import these (cant define 'use server' inside them)

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
