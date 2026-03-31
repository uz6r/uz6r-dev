## ADDED Requirements

### Requirement: Activity Database Storage

The system SHALL persist uploaded activities in the database for authenticated users.

#### Scenario: Authenticated Activity Upload

- **WHEN** an authenticated user uploads a FIT or GPX file
- **THEN** the system SHALL store the raw file in Supabase Storage
- **AND** the system SHALL create an `activities` record with parsed metadata
- **AND** the system SHALL return the parsed activity data to the frontend

#### Scenario: Guest Activity Upload

- **WHEN** an unauthenticated user uploads a FIT or GPX file
- **THEN** the system SHALL process the file in-memory as before
- **AND** the system SHALL NOT create a database record
- **AND** the system SHALL NOT store the file

### Requirement: File Storage

The system SHALL store uploaded FIT/GPX files and generated poster exports in Supabase Storage.

#### Scenario: File Upload to Storage

- **WHEN** an activity file is uploaded
- **THEN** the file SHALL be stored at `/uploads/{user_id}/{activity_id}.{ext}`
- **AND** the file SHALL be accessible only to the owning user via RLS policies

#### Scenario: Poster Export Storage

- **WHEN** a user exports a poster as PNG/JPEG
- **THEN** the exported image SHALL be stored at `/posters/{user_id}/{poster_id}.{ext}`
- **AND** the storage URL SHALL be recorded in the activity record

### Requirement: Activity Metadata Storage

The system SHALL store parsed activity metadata in the database.

#### Scenario: Activity Record Creation

- **WHEN** an activity is parsed
- **THEN** the `activities` record SHALL store: user_id, file_url, activity type, distance, duration, start coordinates, weather data
- **AND** the parsed route coordinates SHALL be stored as JSONB
- **AND** the record SHALL include created and updated timestamps

### Requirement: Activity Retrieval

The system SHALL allow users to retrieve their previously uploaded activities.

#### Scenario: Activity List

- **WHEN** an authenticated user requests their activity history
- **THEN** the system SHALL return a paginated list of their activities
- **AND** the system SHALL order activities by created (newest first)
- **AND** the system SHALL NOT return activities belonging to other users

#### Scenario: Single Activity Retrieval

- **WHEN** an authenticated user requests a specific activity by ID
- **THEN** the system SHALL return the full activity data including parsed route and metrics
- **AND** the system SHALL verify ownership before returning data

### Requirement: Activity Deletion

The system SHALL allow users to delete their activities.

#### Scenario: Activity Deletion

- **WHEN** an authenticated user requests deletion of their activity
- **THEN** the system SHALL delete the activity record from the database
- **AND** the system SHALL delete the associated file from Supabase Storage
- **AND** the system SHALL delete any associated poster exports
- **AND** the system SHALL verify ownership before deletion
