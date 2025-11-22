package testutil

import (
	"database/sql"
	"fmt"
	"testing"

	_ "github.com/lib/pq"

	"github.com/EliasLd/Serenite/config"
)

var TestDB *sql.DB

// Initializes a connection to the test database
// Intended to be called at the start of each test
func SetupTestDB(t *testing.T, c *config.Config) *sql.DB {
	if TestDB != nil {
		return TestDB
	}

	// Use a separate test database connection string
	connStr := c.TestDBConnString
	if connStr == "" {
		// Fallback to regular connection string
		connStr = c.DBConnString
		if connStr == "" {
			t.Fatalf("TEST_DB_CONN_STRING or DB_CONN_STRING must be set to run tests")
		}
	}

	var err error
	TestDB, err = sql.Open("postgres", connStr)
	if err != nil {
		t.Fatalf("Failed to open test database: %v", err)
	}

	if err := TestDB.Ping(); err != nil {
		t.Fatalf("Failed to connect to test database: %v", err)
	}

	return TestDB
}

// Closes test database connection
func TeardownTestDB() {
	if TestDB != nil {
		TestDB.Close()
		TestDB = nil
	}
}

// Truncates tables and resets sequences
func TruncateTables(t *testing.T, tables ...string) {
	if TestDB == nil {
		t.Fatal("TestDB is not initalized")
	}

	for _, table := range tables {
		query := fmt.Sprintf("TRUNCATE TABLE %s RESTART IDENTITY CASCADE", table)
		if _, err := TestDB.Exec(query); err != nil {
			t.Logf("Warning: failed to truncate table %s: %v", table, err)
		}
	}
}
