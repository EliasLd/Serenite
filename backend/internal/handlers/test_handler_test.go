package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestTestHandler(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	w := httptest.NewRecorder()

	TestHandler(w, req)

	res := w.Result()
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200, got %d", res.StatusCode)
	}

	var respBody map[string]string

	if err := json.NewDecoder(res.Body).Decode(&respBody); err != nil {
		t.Fatalf("Could not decode JSON: %v", err)
	}

	if msg, ok := respBody["message"]; !ok || msg == "" {
		t.Errorf("Expected message field in response, got %v", respBody)
	}

}
