package db

import (
	"os"
	"testing"
	"time"

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

func TestCreateAndGetEntryByDate(t *testing.T) {
	setup(t)
	userID := insertUser(t, "testuser", "testuser@example.com")
	entryDate := time.Date(2025, 11, 17, 0, 0, 0, 0, time.UTC)
	entry := &Entry{
		UserID:    userID,
		EntryDate: entryDate,
		Thing1:    "Ate pizza",
		Why1:      "Ordered it",
		Thing2:    "Finished code",
		Why2:      "Focused afternoon",
		Thing3:    "Called friend",
		Why3:      "Scheduled chat",
	}

	err := CreateEntry(entry)
	if err != nil {
		t.Fatalf("CreateEntry failed: %v", err)
	}

	// Fetch by date
	got, err := GetEntryByDate(userID, entryDate)
	if err != nil {
		t.Fatalf("GetEntryByDate failed: %v", err)
	}
	if got == nil {
		t.Fatalf("Expected entry, got nil")
	}
	if got.Thing1 != entry.Thing1 || got.Why1 != entry.Why1 {
		t.Errorf("Got %+v, want %+v", got, entry)
	}
}

func TestListEntries(t *testing.T) {
	setup(t)
	userID := insertUser(t, "testuser2", "testuser2@example.com")
	date1 := time.Date(2025, 11, 16, 0, 0, 0, 0, time.UTC)
	date2 := time.Date(2025, 11, 17, 0, 0, 0, 0, time.UTC)

	entry1 := &Entry{
		UserID:    userID,
		EntryDate: date1,
		Thing1:    "Read book",
		Why1:      "Had spare time",
		Thing2:    "Walked dog",
		Why2:      "Sunny weather",
		Thing3:    "Prepared dinner",
		Why3:      "Had ingredients",
	}
	entry2 := &Entry{
		UserID:    userID,
		EntryDate: date2,
		Thing1:    "Sent email",
		Why1:      "Follow-up",
		Thing2:    "Watched movie",
		Why2:      "Relaxation",
		Thing3:    "Went jogging",
		Why3:      "Health",
	}

	if err := CreateEntry(entry1); err != nil {
		t.Fatalf("CreateEntry entry1 failed: %v", err)
	}
	if err := CreateEntry(entry2); err != nil {
		t.Fatalf("CreateEntry entry2 failed: %v", err)
	}

	entries, err := ListEntries(userID)
	if err != nil {
		t.Fatalf("ListEntries failed: %v", err)
	}
	if len(entries) != 2 {
		t.Errorf("Expected 2 entries, got %d", len(entries))
	}

	if entries[0].EntryDate.Format("2006-01-02") != date2.Format("2006-01-02") ||
		entries[1].EntryDate.Format("2006-01-02") != date1.Format("2006-01-02") {
		t.Errorf("Entries not ordered by date desc: got dates %v, %v", entries[0].EntryDate, entries[1].EntryDate)
	}
}

func TestGetEntryByDate_NotFound(t *testing.T) {
	setup(t)
	userID := insertUser(t, "nouser", "nouser@example.com")
	date := time.Date(2025, 11, 18, 0, 0, 0, 0, time.UTC)
	got, err := GetEntryByDate(userID, date)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != nil {
		t.Errorf("Expected nil for non-existent entry, got %+v", got)
	}
}
