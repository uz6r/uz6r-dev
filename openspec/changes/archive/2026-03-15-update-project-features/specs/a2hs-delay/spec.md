## ADDED Requirements

### Requirement: a2hs-active-seconds

The Add to Home Screen toast SHALL show after 90 seconds of an active session.

#### Scenario: Verify A2HS toast timing

- **WHEN** the `activeSeconds` reaches 90
- **THEN** the `add` toast function should be called with "Add to Home Screen" details.
