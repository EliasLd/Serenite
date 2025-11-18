package handlers

import (
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/EliasLd/Serenite/internal/db"
)

type entryResponse struct {
	ID        int    `db:"id"`
	EntryDate string `db:"entry_date"`
	Thing1    string `db:"thing_1"`
	Why1      string `db:"why_1"`
	Thing2    string `db:"thing_2"`
	Why2      string `db:"why_2"`
	Thing3    string `db:"thing_3"`
	Why3      string `db:"why_3"`
	CreatedAt string `db:"created_at"`
	UpdatedAt string `db:"updated_at"`
}

type createEntryRequest struct {
	EntryDate string `db:"entry_date"`
	Thing1    string `db:"thing_1"`
	Why1      string `db:"why_1"`
	Thing2    string `db:"thing_2"`
	Why2      string `db:"why_2"`
	Thing3    string `db:"thing_3"`
	Why3      string `db:"why_3"`
}

// Tries to obtain the authenticated user id.
func getUserIDFromRequest(r *http.Request) (int, error) {
	// Try context value
	if v := r.Context().Value("userID"); v != nil {
		switch id := v.(type) {
		case int:
			if id > 0 {
				return id, nil
			}
		case string:
			if parsed, err := strconv.Atoi(id); err == nil {
				return parsed, nil
			}
		}
	}

	// Fallback to header
	if h := r.Header.Get("X-User-ID"); h != "" {
		if parsed, err := strconv.Atoi(h); err == nil && parsed > 0 {
			return parsed, nil
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

func ListEntriesHandler(w http.ResponseWriter, r *http.Request) {
	//TODO
}

func CreateEntryHandler(w http.ResponseWriter, r *http.Request) {
	//TODO
}

func GetEntryDateHandler(w http.ResponseWriter, r *http.Request) {
	//TODO
}
