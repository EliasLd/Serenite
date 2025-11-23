# Serenite Backend Documentation

## Table of Contents
- [Development Environment setup](#development-environment-setup)
- [API Overview](#api-overview)
- [Todos](#todos)

## Development Environment Setup

To develop and run the backend for this project, you'll need a local PostgreSQL instance and the following setup steps:

### 1. **Install PostgreSQL**

- Make sure you have a running PostgreSQL server.
- [Official installation guide](https://www.postgresql.org/download/)

### 2. **Create PostgreSQL User and Databases**

You'll need to create:
- a user (example: `serenite`)
- a development database (`serenite_db`)
- a testing database (`serenite_test_db`)

```sh
# Access the postgres shell (change username if needed)
sudo -u postgres psql

# Create the user (choose your own password)
CREATE USER serenite WITH PASSWORD 'password';

# Create the databases
CREATE DATABASE serenite_db OWNER serenite;
CREATE DATABASE serenite_test_db OWNER serenite;
```

### 3. **Set Connection Strings**

The backend expects environment variables for DB connection.  
Default variables are in `.env` and `.docker.env`.

Example `.env`:
```dotenv
DB_CONN_STRING=postgres://serenite:password@localhost:5432/serenite_db?sslmode=disable
TEST_DB_CONN_STRING=postgres://serenite:password@localhost:5432/serenite_test_db?sslmode=disable
JWT_SECRET=<secret>
```
> **Note:**  
> - Replace `serenite` and `password` with your actual DB user/password if different.
> - The default config disables SSL (`sslmode=disable`), as expected for local development.

### 4. **Configuration Files**

- `.env`: Main environment variables for local development and testing.
- `.docker.env` & `.docker.env.example`: Used when running via Docker.
    - You can copy `.docker.env.example` to `.docker.env` and set credentials.
- The backend will use these values to connect to your Postgres databases.  
- You may need to create a `.env` or `.docker.env` if you don't have one yet.

### 5. **Running Migrations**

This project uses [golang-migrate/migrate](https://github.com/golang-migrate/migrate) to manage database schema migrations.

**To set up your database schema:**

1. **Install migrate CLI tool**  
   See [installation docs](https://github.com/golang-migrate/migrate/blob/master/cmd/migrate/README.md)

2. **Run migrations against your dev or test database:**
```sh
# Migrate your development database
migrate -path ../migrations -database "postgres://serenite:password@localhost:5432/serenite_db?sslmode=disable" up

# Migrate your test database
migrate -path ../migrations -database "postgres://serenite:password@localhost:5432/serenite_test_db?sslmode=disable" up
```

> [!WARNING]
> Make sure both databases are migrated before running the application or tests.

### 6. **Running tests**

Simply run the following command in the backend directory:

```bash
go test ./... -v
```

## API Overview

The backend exposes a REST(ful) API with the following endpoints:

| Method | Path                    | Description                                 | Auth Required |
|--------|-------------------------|---------------------------------------------|:------------:|
| GET    | `/test`                 | Test/health endpoint                        |      No      |
| POST   | `/api/register`         | Register a new user                         |      No      |
| POST   | `/api/login`            | Authenticate and retrieve JWT token         |      No      |
| GET    | `/api/entries`          | List all entries for the authenticated user |     Yes      |
| POST   | `/api/entries`          | Create a new entry                          |     Yes      |
| GET    | `/api/entries/{date}`   | Get entry by date for authenticated user    |     Yes      |

### Authentication

- Protected endpoints require authentication.
- The user ID is extracted from request context or the `X-User-ID` header in tests.
- JWT-based authentication is used for `/api/login`.

 ### Usage notes

- Dates must be formatted as `YYYY-MM-DD`.
- All endpoints return JSON responses.
- Error handling is consistent and descriptive.

---

## Todos

- [ ] Add user account/profile endpoints
- [ ] Add entry update endpoint
- [ ] Integration tests for edge cases and failures
