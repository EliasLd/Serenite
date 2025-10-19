package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// Establishes a connection to the database
func ConnectDB() (*sql.DB, error) {
	connStr := os.Getenv("DB_CONN_STRING")
	if connStr == "" {
		return nil, fmt.Errorf("DB_CONN_STRING not set in environment variables")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("Failed to open databse connection: %w", err)
	}

	// Actually test the connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("Failed to connect to the database: %w", err)
	}

	fmt.Println("Successfully connected to the database")
	return db, nil
}
