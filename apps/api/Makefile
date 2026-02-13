.PHONY: generate build run dev test clean fmt

# Generate GraphQL code
generate:
	@echo "Generating GraphQL code..."
	@go run github.com/99designs/gqlgen generate
	@echo "✓ GraphQL code generation complete!"

# Build the API server
build:
	@go build -o bin/server ./server.go

# Run the API server
run: build
	@./bin/server

# Run the API server in development mode
dev:
	@go run server.go

# Run tests
test:
	@go test ./...

# Format Go code
fmt:
	@echo "Formatting Go code..."
	@go fmt ./...
	@echo "✓ Go code formatted!"

# Clean generated files and binaries
clean:
	@rm -rf bin/
	@echo "✓ Cleaned build artifacts"

# Run go mod tidy
deps:
	@go mod tidy
