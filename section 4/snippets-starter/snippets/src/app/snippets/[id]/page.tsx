import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import * as actions from '@/actions';

// page added for dynamic path /snippets/[id]
// shows one snippet based on the id in the url
interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // id comes from the url
  const { id } = await props.params;

  // fetch this particular snippet from the db
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  // no snippet - show the custom not-found page
  if (!snippet) {
    return notFound();
  }

  // show the snippet title and code
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          {/* link to the edit page */}
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          {/* bind the snippet id, then run deleteSnippet on submit */}
          <form action={actions.deleteSnippet.bind(null, snippet.id)}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
