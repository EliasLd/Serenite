package router

import (
	"github.com/EliasLd/Serenite/internal/handlers"
	"github.com/EliasLd/Serenite/internal/middleware"
	"github.com/EliasLd/Serenite/config"
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
	// Wrap the router with CORS middleware
	return middleware.CORS(mux)
}
