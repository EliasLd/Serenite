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
	entriesHandler := handlers.NewEntriesHandler(cfg)
	mux.Handle("GET /api/entries", middleware.AuthMiddleware(cfg, http.HandlerFunc(entriesHandler.ListEntriesHandler)))
	mux.Handle("POST /api/entries", middleware.AuthMiddleware(cfg, http.HandlerFunc(entriesHandler.CreateEntryHandler)))
	mux.Handle("GET /api/entries/", middleware.AuthMiddleware(cfg, http.HandlerFunc(entriesHandler.GetEntryDateHandler)))

	mux.Handle("GET /api/positive-quote", middleware.AuthMiddleware(cfg, http.HandlerFunc(handlers.HandlePositiveQuote)))

	// Wrap the router with CORS middleware
	return middleware.CORS(mux)
}
