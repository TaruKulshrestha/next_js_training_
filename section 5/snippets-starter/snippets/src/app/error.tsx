'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

// error.tsx has to be a client component
// shown when something throws that we didn't catch and return from an action
export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
