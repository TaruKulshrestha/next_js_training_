"use client";

import { Button } from "@nextui-org/react";

interface FormButtonProps {
  children: React.ReactNode;
  // Comes from useActionState's third value, isPending. Required so the
  // button always knows whether the action is still running.
  isLoading: boolean;
}

// Lesson 91 — Form Button Component: one submit button shared by both forms.
// Lesson 92 — this button does not track pending itself. The form passes
// isPending in, and NextUI turns isLoading into the spinner.
export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button
      type="submit"
      variant="bordered"
      isLoading={isLoading}
      className="border-gray-700 bg-white"
    >
      {children}
    </Button>
  );
}
