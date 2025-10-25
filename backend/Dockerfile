# First stage - Build the Go binary
FROM golang:latest AS build

WORKDIR /app

# Copy Go module files and download dependancies
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build the Go binary
RUN go build -o backend ./cmd/main.go

# Second stage - Run the application on a lightweight image
FROM debian:bookworm-slim

WORKDIR /app

# Install required libraries
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/backend .

EXPOSE 8080

# Run the application
CMD ["./backend"]
