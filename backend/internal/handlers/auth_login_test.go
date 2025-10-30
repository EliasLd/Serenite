package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/internal/testutil"
)

func setupTestUser(t *testing.T) {
	db.DB = testutil.SetupTestDB(t)
	testutil.TruncateTables(t, "users")

	// Register the user
	reqBody := RegisterRequest{
		Username: "loginuser",
		Email:    "loginuser@example.com",
		Password: "Password123!",
	}
	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	HandleRegisterUser(w, req)
	if w.Code != http.StatusCreated {
		t.Fatalf("Failed to register user for login test. Status: %d, Body: %s", w.Code, w.Body.String())
	}
}

func TestHandleLoginUser_Success(t *testing.T) {
	setupTestUser(t)
	cfg := config.LoadConfig()

	loginReq := LoginRequest{
		Email:    "loginuser@example.com",
		Password: "Password123!",
	}
	body, _ := json.Marshal(loginReq)
	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	HandleLoginUser(cfg)(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("Expected status 200, got %d. Body: %s", w.Code, w.Body.String())
	}

	var resp LoginResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	if resp.Username != "loginuser" {
		t.Errorf("Expected username 'loginuser', got '%s'", resp.Username)
	}
	if resp.Email != "loginuser@example.com" {
		t.Errorf("Expected email 'loginuser@example.com', got '%s'", resp.Email)
	}
	if resp.Token == "" {
		t.Error("Expected non-empty token")
	}
}

func TestHandleLoginUser_InvalidPassword(t *testing.T) {
	setupTestUser(t)
	cfg := config.LoadConfig()

	loginReq := LoginRequest{
		Email:    "loginuser@example.com",
		Password: "WrongPassword",
	}
	body, _ := json.Marshal(loginReq)
	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	HandleLoginUser(cfg)(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("Expected status 401, got %d", w.Code)
	}
}

func TestHandleLoginUser_InvalidEmail(t *testing.T) {
	setupTestUser(t)
	cfg := config.LoadConfig()

	loginReq := LoginRequest{
		Email:    "wrongemail@example.com",
		Password: "Password123!",
	}
	body, _ := json.Marshal(loginReq)
	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	HandleLoginUser(cfg)(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("Expected status 401, got %d", w.Code)
	}
}

func TestHandleLoginUser_MissingFields(t *testing.T) {
	setupTestUser(t)
	cfg := config.LoadConfig()

	testCases := []struct {
		name string
		body LoginRequest
	}{
		{"Missing email", LoginRequest{Password: "Password123!"}},
		{"Missing password", LoginRequest{Email: "loginuser@example.com"}},
		{"All fields empty", LoginRequest{}},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			body, _ := json.Marshal(tc.body)
			req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()

			HandleLoginUser(cfg)(w, req)

			if w.Code != http.StatusBadRequest {
				t.Errorf("Expected status 400, got %d", w.Code)
			}
		})
	}
}

func TestHandleLoginUser_InvalidJSON(t *testing.T) {
	setupTestUser(t)
	cfg := config.LoadConfig()

	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader([]byte("invalid json")))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	HandleLoginUser(cfg)(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400, got %d", w.Code)
	}
}
