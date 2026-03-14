## 1. Web Project Data Update

- [x] 1.1 Remove `text-rewriter` project from `apps/web/data/entries.ts`
- [x] 1.2 Add `tracepace` project to `apps/web/data/entries.ts` with following details:
    - id: `tracepace`
    - type: `project`
    - title: `tracepace`
    - description: `High-performance race data visualizer that transforms fitness activity files (.fit and .gpx) into minimalist, gallery-quality race posters.`
    - url: `https://github.com/uz6r/tracepace`
    - published: `2026`
    - metadata: { stack: ["Next.js", "TypeScript", "Go", "Mapbox"], state: "PROPOSED" }

## 2. A2HS Timing Update

- [x] 2.1 Update `A2HS_TOAST_ACTIVE_SECONDS` in `apps/web/components/a2hs-banner.tsx` from `120` to `90`
- [x] 2.2 Modify `A2HSBanner` component to delay setting `visible` until `activeSeconds` reaches the threshold.

## 3. Verification

- [x] 3.1 Run `npm run lint` in `apps/web`
- [x] 3.2 Run `npm run typecheck` in `apps/web`
- [x] 3.3 Verify changes manually if possible (delay check)
