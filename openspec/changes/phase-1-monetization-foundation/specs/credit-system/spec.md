## ADDED Requirements

### Requirement: Credit Balance Tracking

The system SHALL maintain a credit balance for each user.

#### Scenario: Balance Initialization

- **WHEN** a new user account is created
- **THEN** the user SHALL start with a credit balance of zero
- **AND** a `credit_balances` record SHALL be created

#### Scenario: Balance Retrieval

- **WHEN** an authenticated user requests their credit balance
- **THEN** the system SHALL return the current balance from the `credit_balances` cache table
- **AND** the response SHALL include the updated timestamp

### Requirement: Append-Only Transaction Ledger

The system SHALL record all credit changes in an append-only `credit_transactions` table.

#### Scenario: Purchase Transaction

- **WHEN** credits are added via payment
- **THEN** a transaction record SHALL be created with type `purchase`
- **AND** the amount SHALL be positive
- **AND** the record SHALL reference the Stripe checkout session ID

#### Scenario: Consumption Transaction

- **WHEN** credits are spent on poster generation
- **THEN** a transaction record SHALL be created with type `consumption`
- **AND** the amount SHALL be negative
- **AND** the record SHALL include a description of what was purchased

#### Scenario: Refund Transaction

- **WHEN** credits are refunded
- **THEN** a transaction record SHALL be created with type `refund`
- **AND** the amount SHALL be positive
- **AND** the record SHALL reference the original transaction ID

### Requirement: Atomic Credit Operations

The system SHALL perform credit additions and deductions atomically to prevent race conditions.

#### Scenario: Concurrent Credit Consumption

- **WHEN** two concurrent requests attempt to consume credits from the same user
- **THEN** the system SHALL serialize the operations using `SELECT ... FOR UPDATE` row locking
- **AND** only one operation SHALL succeed if credits are insufficient for both

#### Scenario: Insufficient Credits

- **WHEN** a user attempts to consume credits exceeding their balance
- **THEN** the system SHALL reject the operation
- **AND** the system SHALL return the current balance and required amount

### Requirement: Credit Cost per Poster

The system SHALL deduct a fixed number of credits per poster generation.

#### Scenario: Standard Poster Generation

- **WHEN** an authenticated user generates a poster
- **THEN** the system SHALL deduct 10 credits from their balance
- **AND** the system SHALL create a consumption transaction record
- **AND** the system SHALL return the updated balance

#### Scenario: Free Tier Poster Generation

- **WHEN** a user has zero credits and attempts to generate a poster
- **THEN** the system SHALL reject the operation
- **AND** the system SHALL prompt the user to purchase credits

### Requirement: Transaction History

The system SHALL allow users to view their credit transaction history.

#### Scenario: Transaction History Retrieval

- **WHEN** an authenticated user requests their transaction history
- **THEN** the system SHALL return a paginated list of their credit transactions
- **AND** the system SHALL order transactions by created (newest first)
- **AND** the system SHALL include type, amount, balance after, and description for each transaction
