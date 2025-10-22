package handlers

import (
	"encoding/json"
	"net/http"
)

// Handles the /test endpoint
func TestHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Test endpoint works!",
	})
}
