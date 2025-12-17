package handlers

import (
	"io"
	"net/http"
)

func HandlePositiveQuote(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromContext(r)
	if err != nil || userID == 0 {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	resp, err := http.Get("https://zenquotes.io/api/random/keyword=happiness")
	if err != nil || resp.StatusCode != http.StatusOK {
		http.Error(w, "Could not fetch quote, sorry", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")

	io.Copy(w, resp.Body)
}
