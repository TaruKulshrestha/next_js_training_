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

// even though this is [id], we can still cache it
// generateStaticParams tells next which ids exist so it can prerender those pages at build
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  // next wants params as strings
  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // id comes from the url
  // this route is dynamic ([id]) so it is not dropped into the full route cache
  // next renders it per request instead of serving a page stored at build time
  // npm run build marks this as ƒ (dynamic) - the [id] folder is enough
  // other things that also make a page dynamic: cookies(), searchParams, force-dynamic, fetch revalidate: 0
  // generateStaticParams above - next still prerenders each id at build so they can be cached
  const { id } = await props.params;

  // fake delay - in production a cached page from generateStaticParams skips this
  // you only wait if next actually has to render the page again
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
