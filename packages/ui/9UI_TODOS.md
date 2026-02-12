# 9ui Manual Component Setup — TODOs

9ui uses **copy-paste / add-on-demand** components. You add each component explicitly — no bundle bloat.

## Structure for manual imports

```text
packages/ui/
├── src/
│   ├── components/           # One file per 9ui component
│   │   ├── button.tsx        ✓ (added)
│   │   ├── card.tsx          TODO: npx shadcn add @9ui/card
│   │   ├── input.tsx         TODO: npx shadcn add @9ui/input
│   │   └── ...
│   └── lib/
│       └── utils.ts          ✓ (cn helper)
├── 9UI_TODOS.md
├── components.json           ✓ (9ui registry)
└── package.json
```

## Import pattern (per-component)

In `apps/web` (or any app):

```tsx
// Import each component individually — no barrel exports
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
```

Add exports in `packages/ui/package.json` when you add new components:

```json
{
    "exports": {
        "./utils": "./src/lib/utils.ts",
        "./button": "./src/components/button.tsx",
        "./card": "./src/components/card.tsx"
    }
}
```

## TODOs

- [ ] Run `npx shadcn@latest add @9ui/init` from **packages/ui** (or apps/web if you prefer styles there)
- [ ] Add `root` class to apps/web layout: `<body className="root antialiased">` ✓ (done)
- [ ] **Note**: In packages/ui, use `../lib/utils` instead of `@/lib/utils` — Next.js doesn't resolve @ for transpiled packages
- [ ] Add components as needed: `cd packages/ui && npx shadcn add @9ui/card`
- [ ] For each new component: add to package.json exports
- [ ] Run `npx shadcn@latest mcp init` (optional) for AI-assisted component usage

## Available 9ui components

Add with: `npx shadcn add @9ui/<name>`

Examples: `button`, `card`, `input`, `dialog`, `dropdown-menu`, `tabs`, `avatar`, `badge`, `select`, `checkbox`, etc.  
Full list: <https://9ui.dev/docs/components>
