package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/internal/testutil"
)

// Runs once before all tests in this package
func TestMain(m *testing.M) {
	// Load configuration for environment variables
	config.LoadConfig()
	// Run all tests
	code := m.Run()

	testutil.TeardownTestDB()

	os.Exit(code)
}

func TestHandleRegisterUser_Success(t *testing.T) {
	// Setup test database
	db.DB = testutil.SetupTestDB(t)
	defer testutil.TruncateTables(t, "users")

	// Create request body
	reqBody := RegisterRequest{
		Username: "testuser123",
		Email:    "testuser123@example.com",
		Password: "password123",
	}
	body, _ := json.Marshal(reqBody)

	// Create request
	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// Create response recorder
	w := httptest.NewRecorder()

	HandleRegisterUser(w, req)

	// Assertions
	if w.Code != http.StatusCreated {
		t.Fatalf("Expected status 201, got %d. Body: %s", w.Code, w.Body.String())
	}

	var resp RegisterResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	if resp.Username != reqBody.Username {
		t.Errorf("Expected username %s, got %s", reqBody.Username, resp.Username)
	}
	if resp.Email != reqBody.Email {
		t.Errorf("Expected email %s, got %s", reqBody.Email, resp.Email)
	}
	if resp.ID == 0 {
		t.Error("Expected non-zero ID")
	}
}

func TestHandleRegisterUser_MissingFields(t *testing.T) {
	db.DB = testutil.SetupTestDB(t)

	testCases := []struct {
		name string
		body RegisterRequest
	}{
		{"Missing username", RegisterRequest{Email: "test@example.com", Password: "pass123"}},
		{"Missing email", RegisterRequest{Username: "testuser", Password: "pass123"}},
		{"Missing password", RegisterRequest{Username: "testuser", Email: "test@example.com"}},
		{"All fields empty", RegisterRequest{}},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			body, _ := json.Marshal(tc.body)
			req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()

			HandleRegisterUser(w, req)

			if w.Code != http.StatusBadRequest {
				t.Errorf("Expected status 400, got %d", w.Code)
			}
		})
	}
}

func TestHandleRegisterUser_InvalidJSON(t *testing.T) {
	db.DB = testutil.SetupTestDB(t)

	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader([]byte("invalid json")))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	HandleRegisterUser(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400, got %d", w.Code)
	}
}
