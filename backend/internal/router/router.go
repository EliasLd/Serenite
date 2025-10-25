package router

import (
	"github.com/EliasLd/Serenite/internal/handlers"
	"github.com/EliasLd/Serenite/internal/middleware"
	"net/http"
)

// Initializes the HTTP router and routes
func SetupRouter() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/test", handlers.TestHandler)

	// Wrap the router with CORS middleware
	return middleware.CORS(mux)
}
