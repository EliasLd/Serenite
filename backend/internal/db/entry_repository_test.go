package db

import (
	"os"
	"testing"

	"github.com/EliasLd/Serenite/internal/testutil"
)

// TestMain helps setup and teardown for all tests in this package.
func TestMain(m *testing.M) {
	testutil.SetupTestDB(nil)
	code := m.Run()
	testutil.TeardownTestDB()
	os.Exit(code)
}

func setup(t *testing.T) {
	DB = testutil.SetupTestDB(t)
	testutil.TruncateTables(t, "entries", "users")
}

// Helper: insert a dummy user (bypasses repo for simplicity in tests)
func insertUser(t *testing.T, username, email string) int {
	var userID int
	err := testutil.TestDB.QueryRow(
		`INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES ($1, $2, 'testhash', NOW(), NOW()) RETURNING id`,
		username, email,
	).Scan(&userID)
	if err != nil {
		t.Fatalf("insertUser failed: %v", err)
	}
	return userID
}
