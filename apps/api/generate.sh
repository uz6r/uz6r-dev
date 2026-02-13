#!/bin/bash
# Generate GraphQL code using gqlgen

set -e

echo "Generating GraphQL code..."
go run github.com/99designs/gqlgen generate

echo "✓ GraphQL code generation complete!"
