## ADDED Requirements

### Requirement: User Registration

The system SHALL allow users to create accounts using email and password through Supabase Auth.

#### Scenario: Successful Registration

- **WHEN** a user provides a valid email and password meeting complexity requirements
- **THEN** the system SHALL create a Supabase Auth user
- **AND** the system SHALL create a corresponding `users` record in the database
- **AND** the system SHALL create a default `user_profiles` record
- **AND** the system SHALL issue a JWT access token and refresh token

#### Scenario: Duplicate Email Registration

- **WHEN** a user attempts to register with an email that already exists
- **THEN** the system SHALL reject the registration with an appropriate error message

#### Scenario: Password Requirements

- **WHEN** a user provides a password that does not meet minimum complexity (8+ characters)
- **THEN** the system SHALL reject the registration with a validation error

### Requirement: User Login

The system SHALL allow registered users to authenticate using email and password.

#### Scenario: Successful Login

- **WHEN** a user provides valid credentials
- **THEN** the system SHALL issue a JWT access token (short-lived, default 1 hour)
- **AND** the system SHALL issue a refresh token

#### Scenario: Invalid Credentials

- **WHEN** a user provides incorrect email or password
- **THEN** the system SHALL reject the login with a generic error message (no credential-specific hints)

### Requirement: Session Management

The system SHALL manage user sessions with JWT access tokens and refresh tokens.

#### Scenario: Token Refresh

- **WHEN** a JWT access token expires
- **THEN** the system SHALL use the refresh token to obtain a new access token
- **AND** the system SHALL maintain the user session without requiring re-login

#### Scenario: Session Revocation

- **WHEN** a user signs out
- **THEN** the system SHALL revoke the refresh token
- **AND** the system SHALL clear client-side session state

### Requirement: Go API JWT Verification

The Go API SHALL verify Supabase Auth JWTs on protected endpoints using the JWKS endpoint.

#### Scenario: Valid JWT Verification

- **WHEN** a request includes a valid Supabase JWT in the `Authorization: Bearer` header
- **THEN** the Go middleware SHALL verify the token signature against the Supabase JWKS endpoint
- **AND** the Go middleware SHALL extract the user ID from the token claims
- **AND** the request SHALL proceed to the resolver

#### Scenario: Invalid or Expired JWT

- **WHEN** a request includes an invalid, expired, or missing JWT
- **THEN** the Go middleware SHALL reject the request with a 401 Unauthorized response

#### Scenario: Local JWKS Verification

- **WHEN** the Go API verifies a JWT
- **THEN** the verification SHALL be performed locally using cached public keys
- **AND** the verification SHALL NOT make network calls to Supabase on each request

### Requirement: Password Reset

The system SHALL allow users to reset their password via email.

#### Scenario: Password Reset Request

- **WHEN** a user requests a password reset
- **THEN** the system SHALL send a password reset email via Supabase Auth
- **AND** the email SHALL contain a time-limited reset link

### Requirement: Guest Mode Preservation

The system SHALL allow unauthenticated users to access basic poster generation features.

#### Scenario: Guest Poster Generation

- **WHEN** an unauthenticated user uploads a FIT/GPX file
- **THEN** the system SHALL process and return the parsed activity data
- **AND** the system SHALL NOT persist the activity server-side
- **AND** the system SHALL NOT allow premium feature access
