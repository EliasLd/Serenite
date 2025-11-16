package router

import (
	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/handlers"
	"github.com/EliasLd/Serenite/internal/middleware"
	"net/http"
)

// Initializes the HTTP router and routes
func SetupRouter(cfg *config.Config) http.Handler {
	mux := http.NewServeMux()
	// Test endpoint
	mux.HandleFunc("/test", handlers.TestHandler)
	// Auth
	mux.HandleFunc("POST /api/register", handlers.HandleRegisterUser)
	mux.HandleFunc("POST /api/login", handlers.HandleLoginUser(cfg))

	// Entries
	mux.HandleFunc("GET /api/entries", handlers.ListEntriesHandler)
	mux.HandleFunc("POST /api/entries", handlers.CreateEntryHandler)
	mux.HandleFunc("GET /api/entries/", handlers.GetEntryDateHandler)

	// Wrap the router with CORS middleware
	return middleware.CORS(mux)
}
