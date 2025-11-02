# First stage - Build the Go binary
FROM golang:latest AS build

WORKDIR /app

# Install migrate tool
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.17.0/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate /usr/local/bin/migrate

# Copy Go module files and download dependancies
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy backend source code
COPY backend/ ./

# Build the Go binary
RUN go build -o backend ./cmd/main.go

# Second stage - Run the application on a lightweight image
FROM debian:bookworm-slim

WORKDIR /app

# Install required libraries
RUN apt-get update && apt-get install -y ca-certificates curl && rm -rf /var/lib/apt/lists/*

# Copy migrate tool
COPY --from=build /usr/local/bin/migrate /usr/local/bin/migrate

# Copy binary
COPY --from=build /app/backend .

# Copy migrations from root
COPY migrations ./migrations

# Copy and set permissions for entrypoint script
COPY backend/docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

EXPOSE 8080

# Run the application
ENTRYPOINT ["./docker-entrypoint.sh"]
