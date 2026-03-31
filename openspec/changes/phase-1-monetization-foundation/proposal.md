## Why

TracePace is currently a guest-only application with no authentication, no persistent activity storage, and no payment infrastructure. All activity data is ephemeral — processed in-memory by the Go API and discarded. User state lives entirely in browser localStorage. The only monetization UI is a placeholder CartContext that opens a waitlist modal.

To support any monetization model (credit packs, subscriptions, premium features), we need a foundational layer: user accounts, persistent activity storage, a credit ledger, and a payment pipeline. This change builds that entire foundation.

## What Changes

- Introduce Supabase Auth as the authentication provider, integrated with both the Next.js frontend and Go API backend
- Add `users`, `user_profiles`, `activities`, `credit_balances`, `credit_transactions`, and `processed_webhook_events` database tables
- Add Supabase Storage (or S3-compatible) for persisting uploaded FIT/GPX files and generated poster exports
- Modify the Go API to persist activities server-side instead of discarding them after parsing
- Implement a credit-based system with atomic balance operations and append-only transaction ledger
- Integrate Stripe Checkout for one-time credit pack purchases with webhook-driven credit fulfillment
- Add feature gating middleware in Go to enforce free vs premium access controls
- Build pricing page, credit balance display, login/signup pages, and payment success/cancel flows

## Capabilities

### New Capabilities

- `authentication`: Supabase Auth with JWT-based login/signup, session management, and Go API token verification via JWKS
- `user-management`: User profiles table, profile management UI, and user identity propagation across frontend and backend
- `activity-persistence`: Server-side storage of uploaded activities with file storage, database records, and user activity history
- `credit-system`: Credit balance tracking with append-only transaction ledger, atomic operations, and race condition prevention
- `payment-processing`: Stripe Checkout integration for credit pack purchases, webhook handling with idempotency, and invoice management

## Impact

- `apps/web/app/`: New routes for login, signup, pricing, dashboard, payment/success, payment/cancel
- `apps/web/lib/`: Supabase client utilities, auth helpers, credit display utilities
- `apps/api/`: JWT verification middleware, new GraphQL resolvers (auth, activities, credits, payments), webhook handler, credit service
- `apps/api/db/migrations/`: New migration files for all database tables
- `apps/api/go.mod`: New dependencies (stripe-go, JWT verification library)
- `apps/web/package.json`: New dependencies (@supabase/ssr, @supabase/supabase-js)
- `apps/web/.env` / `apps/web/.env.example`: Supabase auth URLs, Stripe public keys
- `apps/api/.env` / `apps/api/.env.example`: Stripe secret key, webhook secret, Supabase JWT verification config
- `next.config.ts`: No changes (Sentry wrapper remains)
- `instrumentation.ts`: No changes
