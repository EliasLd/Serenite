package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"

	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/internal/testutil"
)

func setupTestDBUser(t *testing.T) int {
	db.DB = testutil.SetupTestDB(t, testCfg)
	testutil.TruncateTables(t, "entries", "users")
	var userID int
	err := db.DB.QueryRow(
		`INSERT INTO users (username, email, password_hash, created_at, updated_at)
		 VALUES ($1, $2, 'testhash', NOW(), NOW()) RETURNING id`,
		"entryuser", "entryuser@example.com",
	).Scan(&userID)
	if err != nil {
		t.Fatalf("test user insertion failed: %v", err)
	}
	return userID
}

func TestCreateEntryHandler_success(t *testing.T) {
	userID := setupTestDBUser(t)
	reqBody := createEntryRequest{
		Thing1: "Walked dog",
		Why1:   "Sunny day",
		Thing2: "Cleaned desk",
		Why2:   "Needed order",
		Thing3: "Read book",
		Why3:   "Learning Go",
	}
	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/api/entries", bytes.NewReader(body))
	req.Header.Set("X-User-ID", strconv.Itoa(userID))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	CreateEntryHandler(w, req)
	if w.Code != http.StatusCreated {
		t.Fatalf("Expected 201 Created, got %d: %s", w.Code, w.Body.String())
	}

	var resp entryResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response JSON: %v", err)
	}
	if resp.Thing1 != reqBody.Thing1 || resp.Why1 != reqBody.Why1 {
		t.Errorf("Entry not created correctly: got %+v, want %+v", resp, reqBody)
	}
}

func TestCreateEntryHandler_DuplicateDate(t *testing.T) {
	userID := setupTestDBUser(t)
	todayStr := time.Now().UTC().Format("2006-01-02")
	reqBody := createEntryRequest{
		EntryDate: todayStr,
		Thing1:    "Coffee",
		Why1:      "Morning routine",
		Thing2:    "Code",
		Why2:      "Work",
		Thing3:    "Music",
		Why3:      "Focus",
	}

	body, _ := json.Marshal(reqBody)
	for i := range 2 {
		req := httptest.NewRequest(http.MethodPost, "/api/entries", bytes.NewReader(body))
		req.Header.Set("X-User-ID", strconv.Itoa(userID))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		CreateEntryHandler(w, req)
		if i == 0 && w.Code != http.StatusCreated {
			t.Fatalf("Expected first entry to succeed, got %d", w.Code)
		}
		if i == 1 && w.Code != http.StatusConflict {
			t.Fatalf("Expected duplicate entry to get 409, got %d", w.Code)
		}
	}

}

func TestListEntriesHandler(t *testing.T) {
	userID := setupTestDBUser(t)

	date1 := time.Date(2025, 11, 16, 0, 0, 0, 0, time.UTC)
	date2 := time.Date(2025, 11, 17, 0, 0, 0, 0, time.UTC)
	entry1 := &db.Entry{
		UserID:    userID,
		EntryDate: date1,
		Thing1:    "First thing",
		Why1:      "First reason",
		Thing2:    "Second",
		Why2:      "Another",
		Thing3:    "Third",
		Why3:      "More",
	}
	entry2 := &db.Entry{
		UserID:    userID,
		EntryDate: date2,
		Thing1:    "Another first",
		Why1:      "Another reason",
		Thing2:    "Second again",
		Why2:      "Continued",
		Thing3:    "Third again",
		Why3:      "Learning",
	}

	if err := db.CreateEntry(entry1); err != nil {
		t.Fatalf("CreateEntry entry1 failed: %v", err)
	}
	if err := db.CreateEntry(entry2); err != nil {
		t.Fatalf("CreateEntry entry2 failed: %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, "/api/entries", nil)
	req.Header.Set("X-User-ID", strconv.Itoa(userID))
	w := httptest.NewRecorder()
	ListEntriesHandler(w, req)
	if w.Code != http.StatusOK {
		t.Fatalf("Expected 200 OK, got %d", w.Code)
	}

	var resp []entryResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode list response: %v", err)
	}
	if len(resp) != 2 {
		t.Errorf("Expecting 2 entries, got %d: %+v", len(resp), resp)
	}

	// Check ordering
	if resp[0].EntryDate != date2.Format("2006-01-02") || resp[1].EntryDate != date1.Format("2006-01-02") {
		t.Errorf("Ordering incorrect: got %v, %v", resp[0].EntryDate, resp[1].EntryDate)
	}
}

func TestGetEntryDateHandler(t *testing.T) {
	userID := setupTestDBUser(t)
	date := time.Date(2025, 11, 17, 0, 0, 0, 0, time.UTC)
	entry := &db.Entry{
		UserID:    userID,
		EntryDate: date,
		Thing1:    "Test 1",
		Why1:      "Why 1",
		Thing2:    "Test 2",
		Why2:      "Why 2",
		Thing3:    "Test 3",
		Why3:      "Why 3",
	}

	if err := db.CreateEntry(entry); err != nil {
		t.Fatalf("CreateEntry failed: %v", err)
	}

	url := "/api/entries/" + date.Format("2006-01-02")
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("X-User-ID", strconv.Itoa(userID))
	w := httptest.NewRecorder()
	GetEntryDateHandler(w, req)
	if w.Code != http.StatusOK {
		t.Fatalf("Expected 200 OK, got %d", w.Code)
	}
	var resp entryResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode JSON: %v", err)
	}
	if resp.EntryDate != entry.EntryDate.Format("2006-01-02") {
		t.Errorf("Expected date %v, got %v", entry.EntryDate.Format("2006-01-02"), resp.EntryDate)
	}
}

func TestGetEntryDateHandler_NotFound(t *testing.T) {
	userID := setupTestDBUser(t)
	date := time.Date(2025, 11, 20, 0, 0, 0, 0, time.UTC)
	url := "/api/entries/" + date.Format("2006-01-02")
	req := httptest.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("X-User-ID", strconv.Itoa(userID))
	w := httptest.NewRecorder()
	GetEntryDateHandler(w, req)
	if w.Code != http.StatusNotFound {
		t.Errorf("Expected 404 Not found, got %d", w.Code)
	}
}
