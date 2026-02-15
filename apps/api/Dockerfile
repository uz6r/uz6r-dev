# fly.io integration: minimal multi-stage build for Go GraphQL backend.
FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go build -ldflags="-s -w" -o app .

FROM alpine
WORKDIR /app
COPY --from=builder /app/app .
ENV PORT=8080
EXPOSE 8080
CMD ["./app"]
