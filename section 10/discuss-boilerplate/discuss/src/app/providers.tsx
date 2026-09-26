"use client";

import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
}

// Lesson 60 — NextUI Setup: client Providers wrap the tree with NextUIProvider
export default function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
