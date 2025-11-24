package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/internal/middleware"
)

type entryResponse struct {
	ID        int    `json:"id"`
	EntryDate string `json:"entry_date"`
	Thing1    string `json:"thing_1"`
	Why1      string `json:"why_1"`
	Thing2    string `json:"thing_2"`
	Why2      string `json:"why_2"`
	Thing3    string `json:"thing_3"`
	Why3      string `json:"why_3"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type createEntryRequest struct {
	EntryDate string `json:"entry_date"`
	Thing1    string `json:"thing_1"`
	Why1      string `json:"why_1"`
	Thing2    string `json:"thing_2"`
	Why2      string `json:"why_2"`
	Thing3    string `json:"thing_3"`
	Why3      string `json:"why_3"`
}

// Tries to obtain the authenticated user id.
func getUserIDFromContext(r *http.Request) (int, error) {
	if v := r.Context().Value(middleware.UserIDKey); v != nil {
		if id, ok := v.(int); ok && id > 0 {
			return id, nil
		}
	}

	return 0, errors.New("User not authenticated")
}

// Converts a db.Entry into the response shape
func mapEntryToResponse(e *db.Entry) entryResponse {
	return entryResponse{
		ID:        e.ID,
		EntryDate: e.EntryDate.Format("2006-01-02"),
		Thing1:    e.Thing1,
		Why1:      e.Why1,
		Thing2:    e.Thing2,
		Why2:      e.Why2,
		Thing3:    e.Thing3,
		Why3:      e.Why3,
		CreatedAt: e.CreatedAt.Format(time.RFC3339),
		UpdatedAt: e.UpdatedAt.Format(time.RFC3339),
	}
}

// Handles GET /api/entries
// Responds with JSON array of entries for the authenticated user,
func ListEntriesHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromContext(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	entries, err := db.ListEntries(userID)
	if err != nil {
		http.Error(w, "internal error fetching entries", http.StatusInternalServerError)
		return
	}

	resp := make([]entryResponse, 0, len(entries))
	for _, e := range entries {
		resp = append(resp, mapEntryToResponse(e))
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

// Handles POST /api/entries
// Accepts JSON body with the three things + reasons,
func CreateEntryHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromContext(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req createEntryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	// Basic entry validation
	if strings.TrimSpace(req.Thing1) == "" || strings.TrimSpace(req.Why1) == "" ||
		strings.TrimSpace(req.Thing2) == "" || strings.TrimSpace(req.Why2) == "" ||
		strings.TrimSpace(req.Thing3) == "" || strings.TrimSpace(req.Why3) == "" {
		http.Error(w, "all thing_/why_ fields are required", http.StatusBadRequest)
		return
	}

	// Determine entry date
	var entryDate time.Time
	if req.EntryDate == "" {
		now := time.Now().UTC()
		entryDate = time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)
	} else {
		d, err := time.Parse("2006-01-02", req.EntryDate)
		if err != nil {
			http.Error(w, "entry_date must be in YYYY-MM-DD format", http.StatusBadRequest)
			return
		}
		entryDate = time.Date(d.Year(), d.Month(), d.Day(), 0, 0, 0, 0, time.UTC)
	}

	newEntry := &db.Entry{
		UserID:    userID,
		EntryDate: entryDate,
		Thing1:    strings.TrimSpace(req.Thing1),
		Why1:      strings.TrimSpace(req.Why1),
		Thing2:    strings.TrimSpace(req.Thing2),
		Why2:      strings.TrimSpace(req.Why2),
		Thing3:    strings.TrimSpace(req.Thing3),
		Why3:      strings.TrimSpace(req.Why3),
	}

	if err := db.CreateEntry(newEntry); err != nil {
		// Detect unique constraint violation in a simple driver-agnostic way
		if strings.Contains(strings.ToLower(err.Error()), "unique") || strings.Contains(strings.ToLower(err.Error()), "duplicate") {
			http.Error(w, "entry already exists for this date", http.StatusConflict)
		}
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	resp := mapEntryToResponse(newEntry)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

// Handles GET /api/entries/{date}
func GetEntryDateHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromContext(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// path is expected to be /api/entries/<date>
	trimmed := strings.TrimPrefix(r.URL.Path, "/api/entries/")
	// In case there's a trailing '/'
	trimmed = strings.TrimSuffix(trimmed, "/")
	if trimmed == "" {
		http.Error(w, "date not specified", http.StatusBadRequest)
	}

	// only supports format: YYYY-MM-DD
	d, err := time.Parse("2006-01-02", trimmed)
	if err != nil {
		http.Error(w, fmt.Sprintf("invalid date format: %v", err), http.StatusBadRequest)
		return
	}
	entryDate := time.Date(d.Year(), d.Month(), d.Day(), 0, 0, 0, 0, time.UTC)

	entry, err := db.GetEntryByDate(userID, entryDate)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	if entry == nil {
		http.Error(w, "entry not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	resp := mapEntryToResponse(entry)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}
