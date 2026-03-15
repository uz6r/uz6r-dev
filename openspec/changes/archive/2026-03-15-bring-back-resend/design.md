## Context

The contact form currently uses `formsubmit.co` as a temporary bridge while the custom domain was being verified. The user now has a verified domain and wants to restore the original Resend integration for more consistent and professional email branding.

## Goals / Non-Goals

**Goals:**

- Replace `formsubmit.co` with the Resend SDK.
- Support modern Resend SDK patterns (v3+).
- Ensure environment variables for custom domain are correctly utilized.

**Non-Goals:**

- Changing the contact form UI.
- Rewriting the validation logic (already using Zod/Server Actions).

## Decisions

### Use Resend SDK over raw REST API

- **Rationale**: The `resend` package is already in `package.json` and partially imported in `actions.ts`. Using the SDK provides better type safety and consistency.
- **Alternatives**: Using standard `fetch` to Resend API. Rejected as the SDK is already present and simpler.

### Refactor `submitContactForm` to use async/await properly

- **Rationale**: The previous code was commented out. Re-enabling it requires syncing with the current error handling and return types.

## Risks / Trade-offs

- **Risk: Invalid API Key** → Mitigation: Ensure standard error handling catches 401/403 from Resend and reports it properly.
- **Risk: Unverified Domain Error** → Mitigation: Document that `RESEND_FROM` must match the verified domain in the Resend dashboard.
