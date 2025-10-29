package main

import (
	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/internal/router"
	"log"
	"net/http"
)

func main() {
	// Load environment variables configuration
	cfg := config.LoadConfig()
	if err := cfg.Validate(); err != nil {
		log.Fatal("Configuration validation failed:", err)
	}

	// Connect to the database
	if err := db.ConnectDB(cfg.DBConnString); err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	log.Print("Successfully connected to the database")
	defer db.DB.Close()

	r := router.SetupRouter(cfg)

	// Start the server
	log.Printf("Server is running on port %s...", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, r))
}
