# 9ui Component Library

`packages/ui` uses [9ui](https://9ui.dev) copy-paste components via the shadcn CLI.

## Structure

```text
packages/ui/
├── src/
│   ├── components/           # One file per 9ui component
│   └── lib/
│       └── utils.ts          # cn() helper
├── components.json           # 9ui registry config
└── package.json
```

## Import pattern

```tsx
import { Button } from "@repo/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/avatar";
import { Card } from "@repo/ui/card";
```

New components in `src/components/` are exposed via the wildcard export — no need to update `package.json`.

## Adding components

```sh
cd packages/ui && npx shadcn add @9ui/<name>
```

Examples: `button`, `card`, `input`, `dialog`, `dropdown-menu`, `tabs`, `avatar`, `badge`, `select`, `checkbox`, etc.
Full list: <https://9ui.dev/docs/components>
