## ADDED Requirements

### Requirement: User Database Table

The system SHALL maintain a `users` table that mirrors Supabase Auth identities.

#### Scenario: User Record Creation

- **WHEN** a new user registers via Supabase Auth
- **THEN** a `users` record SHALL be created with the Supabase Auth UUID as the primary key
- **AND** the record SHALL store the user's email, stripe_customer_id (nullable), and created timestamp

#### Scenario: User Record Immutability

- **WHEN** a user record exists
- **THEN** the user ID SHALL NOT be modifiable
- **AND** the email SHALL only be updated via Supabase Auth email change flow

### Requirement: User Profile Management

The system SHALL maintain a `user_profiles` table for user-specific metadata.

#### Scenario: Profile Creation

- **WHEN** a user account is created
- **THEN** a default `user_profiles` record SHALL be created automatically
- **AND** the profile SHALL be linked to the user via foreign key

#### Scenario: Profile Update

- **WHEN** a user updates their display name or avatar
- **THEN** the system SHALL update the corresponding `user_profiles` record
- **AND** the system SHALL validate input constraints (display name length, avatar URL format)

### Requirement: User Identity Propagation

The system SHALL propagate authenticated user identity from the Next.js frontend to the Go API.

#### Scenario: GraphQL Request with Auth

- **WHEN** the Next.js frontend makes a GraphQL request to the Go API
- **THEN** the request SHALL include the Supabase JWT in the `Authorization: Bearer` header
- **AND** the Go API SHALL extract the user ID from the verified JWT

### Requirement: Stripe Customer Association

The system SHALL associate Stripe customers with user accounts.

#### Scenario: Stripe Customer Creation

- **WHEN** a user makes their first purchase attempt
- **THEN** the system SHALL create a Stripe customer record
- **AND** the system SHALL store the `stripe_customer_id` in the `users` table

#### Scenario: Returning Customer

- **WHEN** a user with an existing `stripe_customer_id` makes a purchase
- **THEN** the system SHALL reuse the existing Stripe customer record
