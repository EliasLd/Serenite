package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// global databse connection pool
var DB *sql.DB

// Establishes a connection to the database
func ConnectDB() error {
	connStr := os.Getenv("DB_CONN_STRING")
	if connStr == "" {
		return fmt.Errorf("DB_CONN_STRING not set in environment variables")
	}

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("Failed to open databse connection: %w", err)
	}

	// Actually test the connection
	if err := DB.Ping(); err != nil {
		return fmt.Errorf("Failed to connect to the database: %w", err)
	}

	fmt.Println("Successfully connected to the database")
	return nil
}
