import Link from 'next/link';
import { db } from '@/db';

// home page - lists all snippets from the db
// server component - no 'use client' at the top
//
// ways to control the cache on this page:
// time based - refetch every X seconds, good when data changes a lot but a little delay is ok
//   export const revalidate = 3;
// on demand - we know when data changed (create/delete) so we call revalidatePath('/') from the action
// disable - always render fresh, when we dont know when data changes and the user needs the latest
//   export const revalidate = 0;
//   export const dynamic = 'force-dynamic';
export default async function Home() {
  // fetch snippets from the db
  // npm run dev always hits the db so new ones show up
  // after npm run build + npm run start next caches this page
  // so creating a snippet then going home still shows the old list... super unexpected
  //
  // full route cache - at build time next looks at this page and treats it as static
  // (no cookies, headers, searchParams) so it renders once and stores the html
  // production just hands out that stored page instead of querying the db again
  //
  // npm run build marks this as ○ (static)
  // static = no cookies(), no searchParams, no [id] folder - next renders it ONE TIME at build
  // and gives that same html to everyone
  const snippets = await db.snippet.findMany();

  // render the data - link to /snippets/[id]
  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        {/* link to create a new snippet */}
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
