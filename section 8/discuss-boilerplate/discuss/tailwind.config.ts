import type { Config } from "tailwindcss";
// Lesson 60 — NextUI Setup: import the Tailwind plugin from @nextui-org/react
import { nextui } from "@nextui-org/react";

export default {
  // Lesson 55 — Tailwind only generates classes it finds in these files.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Scan NextUI theme classes so Button, Navbar, Chip, etc. keep their styles
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
