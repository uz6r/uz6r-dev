## ADDED Requirements

### Requirement: tracepace-display

The portfolio SHALL display the `tracepace` project in the featured projects list.

#### Scenario: Verify tracepace entry exists

- **WHEN** the user views the projects page
- **THEN** an entry with title "tracepace" and description "A high-performance race data visualizer..." should be visible.

### Requirement: text-rewriter-removal

The portfolio SHALL NOT display the `text-rewriter` project in the featured projects list.

#### Scenario: Verify text-rewriter removal

- **WHEN** the user views the projects page
- **THEN** an entry with title "text-rewriter" should NOT be visible.
