## 1. Database Schema & Migrations

- [ ] 1.1 Create Go migration for `users` table (id UUID PK from Supabase Auth, email, stripe_customer_id, created)
- [ ] 1.2 Create Go migration for `user_profiles` table (user_id FK, display_name, avatar_url, preferences JSONB, created, updated)
- [ ] 1.3 Create Go migration for `activities` table (id UUID PK, user_id FK, file_url, parsed_data JSONB, activity_type, distance_m, duration_s, start_lat, start_lng, weather_data JSONB, created, updated, archived)
- [ ] 1.4 Create Go migration for `credit_balances` table (user_id FK PK, balance INTEGER NOT NULL DEFAULT 0, updated)
- [ ] 1.5 Create Go migration for `credit_transactions` table (id UUID PK, user_id FK, type, amount INTEGER, balance_after INTEGER, stripe_checkout_session_id, description, created) with index on user_id + created
- [ ] 1.6 Create Go migration for `processed_webhook_events` table (event_id VARCHAR PK, event_type, created)
- [ ] 1.7 Configure Supabase Storage buckets: `uploads` and `posters` with RLS policies restricting access to owning user

## 2. Supabase Auth Integration (Frontend)

- [ ] 2.1 Install `@supabase/ssr` and `@supabase/supabase-js` in `apps/web/package.json`
- [ ] 2.2 Create Supabase client utilities in `apps/web/lib/supabase/` (client, server, middleware helpers)
- [ ] 2.3 Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.example` and `.env`
- [ ] 2.4 Create login page at `apps/web/app/login/page.tsx` with email/password form
- [ ] 2.5 Create signup page at `apps/web/app/signup/page.tsx` with email/password form and validation
- [ ] 2.6 Create password reset page at `apps/web/app/reset-password/page.tsx`
- [ ] 2.7 Create auth provider wrapper component for Next.js App Router (session context)
- [ ] 2.8 Update root layout to include auth provider and handle session state
- [ ] 2.9 Add auth-aware navigation (login/signup links vs user menu in navbar)

## 3. Go API JWT Verification Middleware

- [ ] 3.1 Add `github.com/golang-jwt/jwt/v5` to `apps/api/go.mod`
- [ ] 3.2 Create JWKS key fetcher and cache in Go (fetch from Supabase `/.well-known/jwks.json`, cache with TTL)
- [ ] 3.3 Create JWT verification middleware for gqlgen that extracts and validates Supabase JWT from `Authorization: Bearer` header
- [ ] 3.4 Add user ID extraction to GraphQL context so resolvers can access authenticated user
- [ ] 3.5 Add `SUPABASE_JWT_SECRET` or JWKS URL config to `apps/api/.env.example`
- [ ] 3.6 Write unit tests for JWT verification (valid token, expired token, invalid signature, missing token)

## 4. Activity Persistence (Backend)

- [ ] 4.1 Modify `uploadActivity` GraphQL resolver to check auth status
- [ ] 4.2 For authenticated users: upload raw file to Supabase Storage, create `activities` record with parsed metadata
- [ ] 4.3 For unauthenticated users: keep existing in-memory behavior (guest mode)
- [ ] 4.4 Add Supabase Storage Go client integration (`github.com/supabase-community/storage-go`)
- [ ] 4.5 Create `getActivities` GraphQL resolver (paginated, user-scoped)
- [ ] 4.6 Create `getActivity` GraphQL resolver (single activity by ID, ownership check)
- [ ] 4.7 Create `deleteActivity` GraphQL resolver (ownership check, cascade delete from storage)
- [ ] 4.8 Update Apollo client on frontend to pass auth token with GraphQL requests

## 5. Activity History UI (Frontend)

- [ ] 5.1 Create dashboard page at `apps/web/app/dashboard/page.tsx` with credit balance and activity list
- [ ] 5.2 Create activity history component showing paginated list of user's activities
- [ ] 5.3 Add activity detail view with full poster rendering and re-export capability
- [ ] 5.4 Add delete activity action with confirmation dialog
- [ ] 5.5 Update editor to save to user's account when authenticated (vs localStorage for guests)

## 6. Credit System (Backend)

- [ ] 6.1 Create `CreditService` in Go with `AddCredits`, `ConsumeCredits`, `GetBalance` methods
- [ ] 6.2 Implement `AddCredits` with atomic UPSERT on `credit_balances` and INSERT into `credit_transactions`
- [ ] 6.3 Implement `ConsumeCredits` with `SELECT ... FOR UPDATE` locking, balance check, and atomic deduction
- [ ] 6.4 Write unit tests for credit service (concurrent consumption, insufficient balance, race conditions)
- [ ] 6.5 Create `getCreditBalance` GraphQL resolver
- [ ] 6.6 Create `getCreditHistory` GraphQL resolver (paginated transactions)
- [ ] 6.7 Create `consumeCredits` GraphQL mutation (called before poster generation for authenticated users)
- [ ] 6.8 Add credit check to `uploadActivity` resolver — deduct 10 credits if user is authenticated

## 7. Stripe Integration (Backend)

- [ ] 7.1 Add `github.com/stripe/stripe-go/v84` to `apps/api/go.mod`
- [ ] 7.2 Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` env vars to `apps/api/.env.example`
- [ ] 7.3 Initialize Stripe client on Go server startup
- [ ] 7.4 Create `createCheckoutSession` GraphQL resolver (creates Stripe Checkout Session, returns URL)
- [ ] 7.5 Create `createBillingPortalSession` GraphQL resolver (returns Stripe Billing Portal URL)
- [ ] 7.6 Create Stripe webhook handler at `/webhook/stripe` with signature verification
- [ ] 7.7 Implement `checkout.session.completed` handler → calls `CreditService.AddCredits`
- [ ] 7.8 Implement idempotency check via `processed_webhook_events` table
- [ ] 7.9 Implement `invoice.payment_failed` handler (log, no credit addition)
- [ ] 7.10 Write unit tests for webhook handler (valid signature, invalid signature, duplicate event, unknown event type)

## 8. Pricing & Payment UI (Frontend)

- [ ] 8.1 Create pricing page at `apps/web/app/pricing/page.tsx` with credit pack options
- [ ] 8.2 Create credit pack selection component (e.g., 10 credits, 50 credits, 100 credits)
- [ ] 8.3 Create "Buy Credits" flow: select pack → call `createCheckoutSession` → redirect to Stripe
- [ ] 8.4 Create payment success page at `apps/web/app/payment/success/page.tsx`
- [ ] 8.5 Create payment cancel page at `apps/web/app/payment/cancel/page.tsx`
- [ ] 8.6 Add credit balance display to navbar/dashboard
- [ ] 8.7 Add "Insufficient Credits" modal when user tries to generate poster with zero credits
- [ ] 8.8 Add Stripe Billing Portal link in dashboard for invoice/payment history

## 9. Feature Gating

- [ ] 9.1 Define credit cost constants (e.g., 10 credits per poster) in Go config
- [ ] 9.2 Add credit balance check to poster generation flow — reject if insufficient
- [ ] 9.3 Add auth check to activity persistence — guest uploads remain ephemeral
- [ ] 9.4 Add "Upgrade to Pro" prompts in UI when guest user hits guest-mode limits
- [ ] 9.5 Update header nav to show credit balance when authenticated

## 10. Testing & Verification

- [ ] 10.1 End-to-end test: signup → login → upload activity → verify persistence → check activity history
- [ ] 10.2 End-to-end test: purchase credits (Stripe test mode) → verify balance increase → generate poster → verify balance decrease
- [ ] 10.3 Test webhook idempotency: replay same webhook event → verify no duplicate credits
- [ ] 10.4 Test concurrent credit consumption: fire two simultaneous poster generation requests → verify only one succeeds with correct balance
- [ ] 10.5 Test guest mode: upload without auth → verify no DB record created → verify file not stored
- [ ] 10.6 Test JWT verification: send request with expired token → verify 401 response
- [ ] 10.7 Test ownership isolation: User A tries to access User B's activity → verify 403 response
- [ ] 10.8 Run lint, typecheck, and build on both frontend and backend
- [ ] 10.9 Deploy to preview environment and verify full flow end-to-end
