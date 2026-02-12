# Uzair — Monorepo

[![ci-web](https://github.com/uz6r/uz6r/actions/workflows/ci-web.yml/badge.svg)](https://github.com/uz6r/uz6r/actions/workflows/ci-web.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.14-F69220?logo=pnpm)](https://pnpm.io/)

This is my personal portfolio repo. Feel free to dive in to see how it operates.

Turborepo monorepo with Next.js (SSR), 9ui components, and Vercel deployment.

## Structure

```text
├── .env.example              # Vercel + portfolio env template
├── apps/
│   ├── api/                  # TODO: Golang + GraphQL (emails, portfolio)
│   │   └── README.md
│   └── web/                  # Next.js 16 (App Router, SSR)
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
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
| **Backend**   | `apps/api` (TODO)   | Golang + GraphQL, emails, no DB      |
| **Shared UI** | `packages/ui`       | 9ui components, import per-component |

## 9ui — Manual imports

- See `packages/ui/9UI_TODOS.md` for setup.
- Add: `cd packages/ui && npx shadcn add @9ui/button`
- Import: `import { Button } from "@repo/ui/button"`

## Commands

```bash
pnpm install
pnpm dev           # Runs all apps
pnpm build         # Turbo build
pnpm lint          # Turbo lint
pnpm fmt           # Prettier
pnpm fmt:check     # Prettier check
pnpm lint:md       # Markdown lint
```

## Environment

Copy `.env.example` to `.env.local` and fill in values. Vercel injects its own env vars.

## Vercel deployment

1. Import repo → Create Project
2. **Root Directory**: `apps/web`
3. Build: `turbo build` (or `cd ../.. && pnpm turbo run build --filter=web`)
4. Ignored Build Step: `npx turbo-ignore --fallback=HEAD^1`

Remote caching: `pnpm dlx turbo login` then `pnpm dlx turbo link`
