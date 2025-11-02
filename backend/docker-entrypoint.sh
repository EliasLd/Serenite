#!/bin/sh
set -e

echo "Waiting for database to be ready..."
sleep 5

echo "Running database migrations..."
migrate -path /app/migrations -database "$DB_CONN_STRING" up

echo "Starting backend server..."
exec ./backend
