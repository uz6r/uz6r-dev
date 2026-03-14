## Why

The `uz6r` portfolio needs to be updated to reflect recent project changes. `text-rewriter` is no longer a primary focus and should be removed from the featured projects. `tracepace`, a high-performance race data visualizer, is a new addition that needs to be showcased. Additionally, the A2HS (Add to Home Screen) popup timing needs adjustment to better engage users, specifically showing after 90 seconds of an active session.

## What Changes

1. **Remove `text-rewriter`**: Remove the project entry for `text-rewriter` from `apps/web/data/entries.ts`.
2. **Add `tracepace`**: Add a new project entry for `tracepace` to `apps/web/data/entries.ts` with description and tech stack details.
3. **Update A2HS Delay**: Modify `apps/web/components/a2hs-banner.tsx` to change the `A2HS_TOAST_ACTIVE_SECONDS` constant from `120` to `90`.

## Capabilities

### New Capabilities

- `tracepace-entry`: Displays the `tracepace` project in the portfolio's project section.

### Modified Capabilities

- `a2hs-banner`: Adjusts the timing of the Add to Home Screen prompt to show after 90 seconds of active session.

## Impact

- `apps/web/data/entries.ts`: Project list will be updated.
- `apps/web/components/a2hs-banner.tsx`: Installation prompt timing will be adjusted.
