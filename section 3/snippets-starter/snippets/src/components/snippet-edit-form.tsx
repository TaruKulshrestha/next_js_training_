'use client';

import { useState } from 'react';
import type { Snippet } from '@/generated/prisma/client';
import Editor from '@monaco-editor/react';

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

  return (
    <Editor
      height="40vh"
      theme="vs-dark"
      language="javascript"
      defaultValue={snippet.code}
      options={{ minimap: { enabled: false } }}
      onChange={handleEditorChange}
    />
  );
}
