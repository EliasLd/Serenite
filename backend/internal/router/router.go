package router

import (
	"github.com/EliasLd/Serenite/internal/handlers"
	"net/http"
)

// Initializes the HTTP router and routes
func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/test", handlers.TestHandler)

	return mux
}
