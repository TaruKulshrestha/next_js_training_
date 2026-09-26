This is a [Next.js](https://nextjs.org) Discuss app.

Through **lesson 99** the project has:

- NextUI (`@nextui-org/react` + `framer-motion`, Tailwind plugin, `NextUIProvider`)
- Prisma schema (`prisma/schema.prisma`)
- SQLite database (`DATABASE_URL="file:./dev.db"`) and Prisma Client (`src/db/index.ts`)
- GitHub OAuth and NextAuth (`src/auth.ts`, `/api/auth/[...nextauth]`)
- Sign in / sign out server actions and a header that reads the session
- Path helpers (`src/paths.ts`) and topic/post routes
- Create-topic popover with Zod validation (`src/actions/create-topic.ts`)
- `useActionState` (React 19 name for `useFormState`) so the action’s returned errors render on the form (lesson 83)
- `useActionState<CreateTopicFormState, FormData>` so the form state types line up with the server action (lesson 85)
- `CreateTopicFormState`: field errors for `name` and `description`, plus `_form` for errors that are not tied to one input (lesson 86)
- React 19 forms: `<form action={action}>` from `useActionState`, with no `onSubmit` / `preventDefault`. Inputs reset after the action finishes (lesson 87)
- Validation errors from Zod render on the matching input via `isInvalid` and `errorMessage` (lesson 88)
- General errors (`errors._form`) cover “not signed in” and database failures, shown in a box under the fields (lesson 89)
- `db.topic.create` is in `try/catch`. A duplicate slug returns `err.message` on `_form`. `redirect()` stays outside that `try`, because it throws on purpose (lesson 90)
- Save button spinner: `useActionState` returns `isPending`, and `FormButton` passes it to NextUI as `isLoading` (lesson 92)
- Home sidebar lists topics with `db.topic.findMany()`; each chip links to `/topics/[slug]` (lesson 93)
- Dynamic route `params` is a Promise in Next.js 15. Topic, new-post, and post pages `await params` before reading `slug` or `postId` (lesson 94)
- Topic page uses the same 4-column grid as home: slug and description on the left, **Create Post** on the right (lesson 95)
- Next.js 15 forms keep using `useActionState` from `react` (topic form now, post form next). It returns `[formState, action, isPending]` (lesson 96)
- Topic sidebar shows a **Create a Post** popover (title and content), wired with `useActionState` and `createPost.bind(null, slug)` (lesson 97)
- Post form uses `useActionState` (not `useFormState`) and passes `isPending` into `FormButton` as `isLoading` (lesson 98)
- Post title must be at least 3 characters and content at least 10. Zod field errors render under those inputs (lesson 99)

```bash
npm install
npx prisma migrate dev
npm run dev
```

## GitHub OAuth (lesson 63)

1. Create an OAuth App at [github.com/settings/applications/new](https://github.com/settings/applications/new)
2. Homepage URL: `http://localhost:3000`
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the client ID and secret into `.env.local` as `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
5. Set `AUTH_SECRET` to a long random string (`npx auth secret`)
