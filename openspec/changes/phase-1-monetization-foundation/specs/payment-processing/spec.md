## ADDED Requirements

### Requirement: Checkout Session Creation

The system SHALL create Stripe Checkout Sessions for credit pack purchases.

#### Scenario: Credit Pack Purchase Initiation

- **WHEN** an authenticated user selects a credit pack to purchase
- **THEN** the Go API SHALL create a Stripe Checkout Session with `mode: "payment"`
- **AND** the session SHALL include the user's Stripe customer ID (or create one)
- **AND** the session SHALL include metadata: user_id, pack_type
- **AND** the session SHALL return a checkout URL to the frontend
- **AND** the frontend SHALL redirect the user to the Stripe-hosted checkout page

#### Scenario: Checkout Session with Automatic Tax

- **WHEN** a Checkout Session is created
- **THEN** automatic tax calculation SHALL be enabled
- **AND** Stripe SHALL calculate applicable tax based on the customer's location

### Requirement: Webhook Event Handling

The system SHALL process Stripe webhook events to fulfill purchases.

#### Scenario: Successful Payment Webhook

- **WHEN** Stripe sends a `checkout.session.completed` webhook
- **THEN** the Go API SHALL verify the webhook signature using the signing secret
- **AND** the system SHALL check idempotency via the `processed_webhook_events` table
- **AND** the system SHALL add credits to the user's balance
- **AND** the system SHALL create a purchase transaction record
- **AND** the system SHALL mark the webhook event as processed
- **AND** the system SHALL return 200 OK to Stripe

#### Scenario: Duplicate Webhook Event

- **WHEN** Stripe retries a previously processed webhook event
- **THEN** the system SHALL detect the duplicate via `event.ID`
- **AND** the system SHALL return 200 OK without re-processing
- **AND** the system SHALL NOT add credits again

#### Scenario: Invalid Webhook Signature

- **WHEN** a webhook request has an invalid or missing signature
- **THEN** the system SHALL reject the request with 400 Bad Request
- **AND** the system SHALL NOT process the event

#### Scenario: Failed Payment Webhook

- **WHEN** Stripe sends an `invoice.payment_failed` webhook
- **THEN** the system SHALL log the failure
- **AND** the system SHALL NOT add credits
- **AND** the system SHALL return 200 OK to Stripe

### Requirement: Webhook Idempotency

The system SHALL prevent duplicate processing of webhook events.

#### Scenario: Event Deduplication

- **WHEN** a webhook event is received
- **THEN** the system SHALL check `processed_webhook_events` for the event ID
- **AND** if the event ID exists, the system SHALL skip processing
- **AND** the UNIQUE constraint on `event_id` SHALL prevent duplicate inserts

### Requirement: Payment Success and Cancel Flows

The system SHALL handle post-checkout user navigation.

#### Scenario: Payment Success

- **WHEN** a user completes payment on Stripe
- **THEN** Stripe SHALL redirect the user to the success URL
- **AND** the frontend SHALL display a confirmation with credits added
- **AND** the frontend SHALL show the updated credit balance

#### Scenario: Payment Cancelled

- **WHEN** a user cancels checkout on Stripe
- **THEN** Stripe SHALL redirect the user to the cancel URL
- **AND** the frontend SHALL display a cancellation message
- **AND** the frontend SHALL offer the option to retry purchase

### Requirement: Credit Pack Pricing

The system SHALL define credit pack products and prices in Stripe.

#### Scenario: Credit Pack Product Definition

- **WHEN** credit packs are configured in Stripe
- **THEN** each pack SHALL have a defined Price ID in the Go API configuration
- **AND** prices SHALL be defined in USD
- **AND** the mapping between pack type and Stripe Price ID SHALL be configurable via environment variables

### Requirement: Stripe Customer Management

The system SHALL manage Stripe customer records for users.

#### Scenario: Customer Creation on First Purchase

- **WHEN** a user attempts their first purchase
- **THEN** the system SHALL create a Stripe customer record
- **AND** the system SHALL store the `stripe_customer_id` in the `users` table

#### Scenario: Billing Portal Access

- **WHEN** a user requests to view their invoices or payment history
- **THEN** the system SHALL generate a Stripe Billing Portal session URL
- **AND** the frontend SHALL redirect the user to the Stripe-hosted billing portal
