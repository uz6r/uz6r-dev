# Web — Frontend

Next.js 15 portfolio frontend. App Router, SSR, Tailwind, 9ui components.

## Stack

- **Next.js 15** — App Router, Turbopack
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
├── layout.tsx     # Root layout (root class for 9ui)
└── page.tsx       # Home
```

## Import UI

```tsx
import { Button } from "@repo/ui/button";
```
