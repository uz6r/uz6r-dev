# Web — Frontend

Next.js 16 portfolio frontend. App Router, SSR, Tailwind, 9ui components.

## Stack

- **Next.js 16** — App Router, Turbopack
- **React 19**
- **Tailwind CSS**
- **9ui** — Shared components from `@repo/ui` (manual imports)

## Commands

```bash
pnpm dev      # Dev server (Turbopack)
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # ESLint
```

## Structure

```text
app/
├── api/           # Route Handlers (optional)
├── globals.css    # Tailwind + 9ui base (run @9ui/init to add)
├── layout.tsx     # Root layout (ToastProvider, root class for 9ui)
├── page.tsx       # Home
├── about/
│   └── page.tsx
├── blog/
│   └── page.tsx
├── contact/
│   ├── actions.ts
│   ├── page.tsx
│   └── schema.ts
└── projects/
    └── page.tsx
components/
└── ui/            # Re-exports from @repo/ui (e.g. toast for @/ path)
```

## Import UI

From the shared package or app re-exports:

```tsx
import { Button } from "@repo/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";
```

Toast is provided in the root layout. Use `useToast()` in client components to add toasts (e.g. `useToast().add({ title: "Done", type: "success" })`).
