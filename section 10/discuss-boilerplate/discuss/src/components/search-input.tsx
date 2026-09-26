"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

// Lesson 123 — Back to the Search Input: this is the gray box in the header.
// The field name is "term".
// Lesson 126 — Redirecting From a Server Action: Enter posts actions.search.
// That function redirects, which is what puts ?term= on the home URL.
// Lesson 124 — Notes on QueryStrings in Next:
//   /            is the path. app/page.tsx renders it.
//   ?term=react  is the query string. It is not a new route and not a folder.
//   term         is the key, matching name="term" on this input.
//   react        is the value that was typed.
// A space in the value is encoded, so "next js" shows up as next+js or next%20js.
// Extra fields would be more pairs: ?term=react&sort=new.
// Lesson 130 — The De-Opt to Client Side Rendering Warning: useSearchParams
// reads ?term= in the browser so this box still shows the word after the
// redirect. That hook opts the whole page into client rendering unless a
// Suspense boundary wraps this component. Header provides that boundary.
export default function SearchInput() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term") || "";

  return (
    <form action={actions.search} className="w-full max-w-xl">
      <Input
        name="term"
        key={term}
        defaultValue={term}
        className="max-w-xl"
        placeholder="Search"
        variant="flat"
        size="md"
        aria-label="Search"
        classNames={{
          inputWrapper:
            "h-10 bg-[#e5e5e5] shadow-none data-[hover=true]:bg-[#e5e5e5]",
          input: "text-center placeholder:text-gray-700",
        }}
      />
    </form>
  );
}
