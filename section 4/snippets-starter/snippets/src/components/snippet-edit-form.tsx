'use client';

import { useState } from 'react';
import type { Snippet } from '@/generated/prisma/client';
import Editor from '@monaco-editor/react';
import * as actions from '@/actions';

interface SnippetEditFormProps {
  snippet: Snippet;
}

// client component - shown inside the server edit page
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  // keep track of the code as the user edits it
  const [code, setCode] = useState(snippet.code);

  // called whenever the editor content changes
  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  // option 1 - form + bind (this is the one we use)
  // bind preloads id and code so the server action can update the db
  // option 2 - no form, call the action from a click with startTransition
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <form action={editSnippetAction}>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <button type="submit" className="p-2 border rounded">
        Save
      </button>
    </form>
  );
}
