import { Suspense } from "react";
// Lesson 57 — HeroUI (this project uses the NextUI package, @nextui-org/react):
// Navbar and the other widgets come from here. The search field is NextUI
// Input inside SearchInput.
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "@/components/header-auth";
import SearchInput from "@/components/search-input";
import paths from "@/paths";

// Lesson 58 — Creating a Reusable Component: Header is its own file so
// layout.tsx can render it on every page.
// Lesson 74 — header sits above every page
export default function Header() {
  return (
    <Navbar
      maxWidth="full"
      position="static"
      isBlurred={false}
      className="border-b border-gray-300 bg-white shadow-none"
      classNames={{ wrapper: "px-4" }}
    >
      <NavbarBrand>
        {/* Brand link always goes home. */}
        <Link href={paths.home()} className="text-2xl">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className="flex-1 px-6">
        {/* Lesson 123 — Back to the Search Input: the box lives in its own
            component so the header stays the shell around it.
            Lesson 130 — The De-Opt to Client Side Rendering Warning: without
            this boundary, useSearchParams inside SearchInput makes Next
            render the whole page in the browser. The fallback is the gray
            bar while the client box is prepared. */}
        <Suspense
          fallback={
            <div className="h-10 w-full max-w-xl rounded-xl bg-[#e5e5e5]" />
          }
        >
          <SearchInput />
        </Suspense>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* Lesson 75 — Fixing the Header Cache: the navbar was getting cached
            with a stale Sign In / Sign Out state.
            Lesson 77 — What is Suspense? It shows fallback while a child waits.
            Lesson 78 — Adding Suspense: auth() reads cookies, so only HeaderAuth
            waits. The rest of the header stays on the static shell. */}
        <Suspense fallback={null}>
          <HeaderAuth />
        </Suspense>
      </NavbarContent>
    </Navbar>
  );
}
