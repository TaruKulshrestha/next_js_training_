import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";

// Server component. auth() reads the session cookie and returns the GitHub user, or null.
export default async function HeaderAuth() {
  // Lesson 67 — Checking Auth Status: session is the GitHub user, or null.
  const session = await auth();

  // Lesson 68 — User Interface for Auth: signed-in users get a menu.
  // The button posts the sign-out action.
  if (session?.user) {
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            {/* Lesson 69 — Displaying the User's Name: name and image come from GitHub. */}
            <p className="mb-2">{session.user.name}</p>
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Lesson 68 — signed out. Both buttons start the same GitHub sign-in flow.
  // Sign In sits to the left of Sign Up. GitHub has one OAuth flow, so both
  // post the same signIn action.
  return (
    <>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button
            type="submit"
            variant="bordered"
            className="h-10 min-w-28 border-gray-500 bg-white text-base"
          >
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button
            type="submit"
            variant="bordered"
            className="h-10 min-w-28 border-gray-500 bg-white text-base"
          >
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  );
}
