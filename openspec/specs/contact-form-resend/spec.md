# contact-form-resend Specification

## Purpose

TBD - created by archiving change bring-back-resend. Update Purpose after archive.

## Requirements

### Requirement: Resend SDK Integration

The system SHALL use the `resend` SDK to submit contact form data.

#### Scenario: Successful Resend Submission

- **WHEN** the contact form is submitted with valid `name`, `email`, and `message`
- **THEN** the system SHALL call `resend.emails.send` with the configured recipient and message content
- **AND** the system SHALL return a success status to the client

### Requirement: Environment Configuration

The system SHALL use the `RESEND_API_KEY`, `RESEND_FROM`, and `CONTACT_TO_EMAIL` environment variables for configuration.

#### Scenario: Missing Configuration

- **WHEN** `CONTACT_TO_EMAIL` is not configured
- **THEN** the system SHALL return a 503 error status indicating the service is not configured

### Requirement: Removal of FormSubmit.co

The system SHALL NOT use `formsubmit.co` for any form submissions.

#### Scenario: Legacy Endpoint Cleanup

- **WHEN** the system is updated
- **THEN** all references to `https://formsubmit.co/ajax/` SHALL be removed from the contact form server action
