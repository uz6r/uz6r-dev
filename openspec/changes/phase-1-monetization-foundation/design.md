## Context

TracePace is a monorepo with a Next.js 16 frontend and Go GraphQL API backend, connected to Supabase PostgreSQL. Currently there is zero authentication, activities are ephemeral (parsed in-memory and discarded), and the only "monetization" is a BuyMeACoffee link. The waitlist system is the sole database table.

The Go API uses `gqlgen` for GraphQL, `pgx` for Postgres, and `golang-migrate` for migrations. The frontend uses Apollo Client for GraphQL communication.

## Goals / Non-Goals

**Goals:**

- Ship a production-ready auth system with Supabase Auth (JWT verification in Go via JWKS)
- Persist activities server-side with file storage (Supabase Storage)
- Build a credit system with atomic operations and append-only ledger
- Integrate Stripe Checkout for credit pack purchases with webhook fulfillment
- Feature gating to enforce free vs premium access
- Roll out in phases — auth + storage first, credits + payments second

**Non-Goals:**

- Subscription billing (Phase 1 is credit packs only; subscriptions come later)
- Multi-currency pricing (USD only for launch; MYR/toyyibPay is a Phase 2 consideration)
- Team/organization accounts (single-user only)
- Social features (sharing, collaboration, public profiles)
- Admin dashboard (basic Stripe dashboard is sufficient for now)
- Migration of existing localStorage data to server-side (users start fresh after auth rollout)

## Decisions

### Auth Provider: Supabase Auth

- **Rationale**: We already use Supabase for Postgres. Supabase Auth issues asymmetric JWTs (ES256) that Go can verify locally via JWKS endpoint — no SDK needed, no network calls per request. User data lives in our own Postgres. Free tier: 50K MAU.
- **Alternatives considered**:
    - **Clerk**: Better DX and official Go SDK, but user data lives in Clerk's system requiring webhook sync. More vendor lock-in.
    - **Better Auth**: Excellent for monolithic TS stacks, but requires Next.js as a token-issuing proxy for Go — adds latency and complexity.
    - **Lucia Auth**: Archived/sunset. Not viable.

### File Storage: Supabase Storage

- **Rationale**: Already in the Supabase ecosystem, zero additional infrastructure, RLS policies integrate with Supabase Auth, generous free tier (1GB storage, 2GB bandwidth).
- **Alternatives considered**:
    - **S3**: More mature, but adds another service to manage, separate credentials, separate IAM policies.
    - **R2 (Cloudflare)**: Cheaper egress, but we're already on Vercel + Supabase — adding Cloudflare adds complexity.

### Credit Model: Append-Only Ledger + Balance Cache

- **Rationale**: Append-only `credit_transactions` table provides a complete audit trail. A separate `credit_balances` cache table enables fast reads. Atomic `FOR UPDATE` row locking prevents race conditions during concurrent consumption.
- **Alternatives considered**:
    - **Balance-only**: Simpler but no audit trail, harder to debug disputes.
    - **Ledger-only (no cache)**: Requires SUM() on every read — slow at scale.
    - **Stripe Balance Mode**: Stripe has a "Customer Balance" feature but it's limited and doesn't support the granular transaction history we need.

### Payment Flow: Stripe Checkout (Hosted)

- **Rationale**: Fastest integration, handles 3DS, mobile wallets, all payment methods automatically. SAQ A PCI compliance. Stripe handles receipts, invoices, tax calculation.
- **Alternatives considered**:
    - **Stripe Elements**: Embedded forms require more PCI work, more complex frontend integration.
    - **toyyibPay**: Lower fees for MYR/FPX but limited to Malaysia, worse DX, no automatic tax.

### Feature Gating: Go Middleware + GraphQL Directives

- **Rationale**: Go middleware checks JWT claims and credit balance before allowing premium operations. GraphQL resolver layer enforces access control at the data level.
- **Alternatives considered**:
    - **Frontend-only gating**: Insecure — users can bypass client-side checks.
    - **Next.js middleware gating**: Works for page-level but not API-level; Go is the source of truth for business logic.

### Migration Strategy: Fresh Start (No localStorage Migration)

- **Rationale**: localStorage data is client-side only, schema differs from server-side model, and the user base is small (waitlist-only). Users who had localStorage data will simply re-upload activities after signing up. The complexity of a migration tool outweighs the benefit for a beta-stage product.
- **Alternatives considered**:
    - **localStorage → server migration tool**: Complex, fragile, and unnecessary at current scale.

## Risks / Trade-offs

- **Risk: JWT verification complexity in Go** → Mitigation: Supabase provides JWKS at `/.well-known/jwks.json`. Use `golang-jwt/jwt/v5` with `jwt.Parse` and a key lookup function. Well-documented pattern.
- **Risk: Stripe webhook failures causing lost credits** → Mitigation: Idempotency via `processed_webhook_events` table with UNIQUE constraint on `event_id`. Stripe retries for 72 hours. Manual reconciliation process via Stripe dashboard.
- **Risk: Race conditions in credit consumption** → Mitigation: `SELECT ... FOR UPDATE` row locking in serializable transactions. Atomic balance check + deduction in single transaction.
- **Risk: Supabase Storage bandwidth limits on free tier** → Mitigation: 2GB bandwidth free tier is sufficient for beta. Monitor usage. Upgrade to Pro ($25/mo) if needed.
- **Risk: Breaking existing guest user experience** → Mitigation: Keep guest mode available for basic poster generation. Auth is only required for saving activities, purchasing credits, and premium features.
- **Risk: Scope creep** → Mitigation: Strictly scoped to credit packs only. Subscriptions, teams, social features deferred to future phases.

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Next.js 16 Frontend                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Login/  │  │ Pricing  │  │Dashboard │  │ Payment  │            │
│  │  Signup  │  │  Page    │  │(Credits) │  │ Success  │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       └──────────────┴─────────────┴─────────────┘                  │
│                              │                                       │
│                    Apollo GraphQL                                    │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          Go API (gqlgen)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ JWT Verify   │  │ Activity     │  │ Stripe Webhook Handler   │  │
│  │ Middleware   │  │ Resolver     │  │ (/webhook/stripe)        │  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────────┘  │  │
│         │                 │                      │                   │
│  ┌──────┴─────────────────┴──────────────────────┴───────────────┐  │
│  │                    Credit Service                             │  │
│  │  (AddCredits, ConsumeCredits, GetBalance — atomic ops)        │  │
│  └──────────────────────────┬────────────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      Supabase PostgreSQL                             │
│  ┌────────┐  ┌──────────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ users  │  │user_profiles │  │activities│  │credit_balances   │  │
│  └────────┘  └──────────────┘  └──────────┘  └──────────────────┘  │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐│
│  │credit_transactions       │  │processed_webhook_events          ││
│  │(append-only ledger)      │  │(idempotency)                     ││
│  └──────────────────────────┘  └──────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Supabase Storage (S3-compatible)                 │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐ │
│  │ /uploads/{user_id}/      │  │ /posters/{user_id}/              │ │
│  │ {activity_id}.{fit,gpx}  │  │ {poster_id}.{png,jpeg}           │ │
│  └──────────────────────────┘  └──────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          Stripe API                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  Checkout    │  │  Customers   │  │  Invoices & Receipts     │  │
│  │  Sessions    │  │  & Prices    │  │  (auto-managed)          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```
