import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Providers from "@/app/providers";

// Lesson 54 — Adding Fonts: next/font downloads Inter and exposes a className.
const inter = Inter({ subsets: ["latin"] });

// Lesson 51 — Project Overview: this is the Discuss app shell.
// Tab title and description. Next reads this for every page unless a page overrides it.
export const metadata: Metadata = {
  title: "Discuss",
  description: "Discuss Project",
};

// Lesson 52 — App Organization: routes live in src/app, shared UI in
// src/components, server actions in src/actions, the database client in src/db.
// Lesson 53 — Understanding the App Router: layout.tsx wraps every route.
// children is the page for the current URL (app/page.tsx is "/").
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* NextUI needs this provider. Header stays put; children swaps when the route changes. */}
        <Providers>
          {/* The wireframe is one bordered panel: header, then the page. */}
          <div className="container mx-auto max-w-6xl px-4 py-6">
            <div className="min-h-[80vh] border border-gray-400 bg-white">
              {/* Lesson 59 — Using the Component: Header is built once and rendered here. */}
              <Header />
              <div className="px-4 pb-6">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
