package config

import (
	"log"

	"github.com/joho/godotenv"
)

// Loads environment variables from .env file
func LoadConfig() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found, using system environment variables")
	}
}
