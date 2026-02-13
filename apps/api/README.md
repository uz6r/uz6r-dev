# API

GraphQL API service built with Go and [gqlgen](https://gqlgen.com/).

## Structure

```
apps/api/
├── cmd/
│   └── internal/
│       └── graph/
│           └── schema/
│               └── content.graphqls    # GraphQL schema definitions
├── graph/                               # Generated GraphQL code
│   ├── generated.go                     # Generated executable schema
│   ├── content.resolvers.go             # Resolver implementations
│   ├── resolver.go                      # Resolver root
│   └── model/
│       └── models_gen.go                 # Generated models
├── gqlgen.yml                           # gqlgen configuration
├── server.go                            # HTTP server entry point
├── tools.go                             # Build tools (ensures dependencies)
├── generate.sh                          # Script to generate GraphQL code
└── Makefile                             # Make targets (source of truth)
```

## Development

### Prerequisites

- Go 1.25.6 or later
- make
- GraphQL schema files in `internal/graph/schema/`

### Generate GraphQL Code

After modifying the GraphQL schema, regenerate the code:

```bash
# Using Make (recommended)
make generate

# Or from the API directory
cd apps/api && make generate

# Using the script
./generate.sh

# Or directly
go run github.com/99designs/gqlgen generate
```

### Run the Server

```bash
# Using Make (recommended)
make dev

# Or from the API directory
cd apps/api && make dev

# Build and run
make run

# Or directly
go run server.go
```

The GraphQL playground will be available at `http://localhost:8080/`

### Build

```bash
# Using Make (recommended)
make build

# Or from the API directory
cd apps/api && make build
```

The binary will be output to `bin/server`

### Available Make Targets

- `make generate` - Generate GraphQL code from schema
- `make build` - Build the API server binary
- `make dev` - Run the development server
- `make run` - Build and run the server
- `make test` - Run tests
- `make clean` - Clean build artifacts
- `make deps` - Run `go mod tidy`

## GraphQL Schema

The schema is defined in `internal/graph/schema/content.graphqls`. This is the single source of truth for your GraphQL API.

After modifying the schema:

1. Run `make generate` or `./generate.sh`
2. Implement the resolver methods in `graph/*.resolvers.go`
3. Test your changes

## Dependencies

- [gqlgen](https://gqlgen.com/) - GraphQL server library
- [gqlparser](https://github.com/vektah/gqlparser) - GraphQL parser
