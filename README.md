# uz6r

[![ci-api](https://github.com/uz6r/uz6r/actions/workflows/ci-api.yml/badge.svg)](https://github.com/uz6r/uz6r/actions/workflows/ci-api.yml)
[![ci-web](https://github.com/uz6r/uz6r/actions/workflows/ci-web.yml/badge.svg)](https://github.com/uz6r/uz6r/actions/workflows/ci-web.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.29.3-F69220?logo=pnpm)](https://pnpm.io/)

Portfolio repo. Feel free to dive in to see how it operates.

Turborepo with Next.js (SSR), 9ui components, and Vercel deployment.

## Structure

```text
├── .env.example              # Vercel + portfolio env template
├── apps/
│   ├── api/                  # Golang + GraphQL API
│   │   └── README.md
│   └── web/                  # Next.js 16 (App Router, SSR)
│       ├── app/
│       │   ├── layout.tsx    # Root layout (ToastProvider)
│       │   ├── page.tsx
│       │   └── globals.css
│       ├── components/
│       │   └── ui/           # Re-exports from @repo/ui
│       ├── vercel.json
│       └── README.md
├── packages/
│   ├── config-eslint/        # Shared ESLint
│   ├── config-typescript/    # Shared tsconfig (base, nextjs, ui)
│   └── ui/                   # 9ui components (manual imports)
│       ├── components.json
│       ├── src/components/
│       └── 9UI_TODOS.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Frontend & Backend

| Layer         | Location            | Notes                                |
| ------------- | ------------------- | ------------------------------------ |
| **Frontend**  | `apps/web`          | Next.js 16, App Router, SSR          |
| **API**       | `apps/web/app/api/` | Next.js Route Handlers (recommended) |
| **Backend**   | `apps/api`          | Golang + GraphQL API (stateless)     |
| **Shared UI** | `packages/ui`       | 9ui components, import per-component |

## 9ui — Manual imports

- See `packages/ui/9UI_TODOS.md` for setup.
- Add: `cd packages/ui && npx shadcn add @9ui/<component>`
- Import: `import { Button } from "@repo/ui/button"` or from app: `import { useToast } from "@/components/ui/toast"`
- Toast: `ToastProvider` wraps the app in `apps/web` layout; use `useToast()` in client components.

## Commands

```bash
pnpm install
pnpm dev           # Runs all apps
pnpm build         # Turbo build
pnpm lint          # Turbo lint
pnpm fmt           # Format all (markdown, JS/TS, Go)
pnpm fmt:check     # Check formatting
pnpm lint:md       # Markdown lint
```

## Environment

Copy `.env.example` to `.env.local` and fill in values. Vercel injects its own env vars.

## Vercel deployment

1. Import repo → Create Project
2. **Root Directory**: `apps/web`
3. Build: from repo root use `cd .. && pnpm install` and `cd .. && pnpm turbo run build --filter=web` (see `apps/web/vercel.json`).
4. Ignored Build Step: `npx turbo-ignore --fallback=HEAD^1`

Remote caching: `pnpm dlx turbo login` then `pnpm dlx turbo link`

## Notes

- apps/web continues to evolve independently while backend deployment strategy is being evaluated; the Go GraphQL API in `apps/api` is in place for future integration.
