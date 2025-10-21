package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Loads environment variables from .env file
func LoadConfig() {
	if os.Getenv("DOCKER_ENV") == "true" {
		log.Println("Running in Docker. Skipping .env file loading...")
		return
	}

	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found, using system environment variables")
	}
}
