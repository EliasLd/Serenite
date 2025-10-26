package main

import (
	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/internal/router"
	"log"
	"net/http"
	"os"
)

func main() {
	// Load environment variables configuration
	config.LoadConfig()

	// Load the serving PORT from environment variables
	port := os.Getenv("PORT")
	if port == "" {
		// Default to 8080 port if not set
		port = "8080"
	}

	// Connect to the database
	if err := db.ConnectDB(); err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	log.Print("Successfully connected to the database")
	defer db.DB.Close()

	r := router.SetupRouter()

	// Start the server
	log.Printf("Server is running on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
