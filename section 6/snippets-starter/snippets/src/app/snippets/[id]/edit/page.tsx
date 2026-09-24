import { notFound } from 'next/navigation';
import { db } from '@/db';
import SnippetEditForm from '@/components/snippet-edit-form';

// page added for /snippets/[id]/edit - edit an existing snippet
interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  // /snippets/[id]/edit is ƒ (dynamic) too - same reason, [id] in the path
  const { id } = await props.params;

  // fetch the snippet on the server, then pass it to the client component
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  return <SnippetEditForm snippet={snippet} />;
}
