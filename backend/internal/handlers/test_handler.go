package handlers

import (
	"fmt"
	"net/http"
)

// Handles the /test endpoint
func TestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		fmt.Fprintln(w, "Test endpoint works!")
		return
	}

	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}
