## Context

The portfolio currently features `text-rewriter` which is outdated. The new project `tracepace` needs to be showcased. The A2HS popup currently shows too early (after 120 seconds of active session), and the user wants it at 90 seconds.

## Goals / Non-Goals

**Goals:**

- Update the project list in the web app.
- Adjust the A2HS prompt timing.

**Non-Goals:**

- Redesigning the project entry UI.
- Modifying other projects' metadata.

## Decisions

- **Entry Update**: Modify `entries.ts` directly. This is a simple static data change.
- **A2HS Timing**: Update the `A2HS_TOAST_ACTIVE_SECONDS` constant in `a2hs-banner.tsx`. Additionally, modify the component logic to ensure the banner (Drawer/Dialog) only becomes visible after the same delay, rather than on mount.

## Risks / Trade-offs

- **Manual Data Entry**: Ensuring the tech stack and description for `tracepace` match the GitHub details accurately.
- **Timing Impact**: Reducing the delay to 90 seconds might increase visibility but could be more intrusive. However, this is at the user's request.
