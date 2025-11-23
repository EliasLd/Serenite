package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	DBConnString       string
	TestDBConnString   string
	JWTSecret          string
	JWTExpirationHours int
	Port               string
}

// Loads environment variables from .env file and return a Config struct
func LoadConfig(env_file_path string) *Config {
	// Load .env file if not in container
	if os.Getenv("DOCKER_ENV") != "true" {
		if err := godotenv.Load(env_file_path); err != nil {
			log.Println("Warning: No .env file found, using system environment variables")
		}
	} else {
		log.Println("Running in Docker. Skipping .env file loading...")
	}

	port := "8080"
	// Optionnally set the forwarding port
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}

	// Parse JWT expiration hours with default fallback
	jwtExpHours := 24
	if expStr := os.Getenv("JWT_EXPIRATION_HOURS"); expStr != "" {
		if exp, err := strconv.Atoi(expStr); err == nil {
			jwtExpHours = exp
		}
	}

	return &Config{
		DBConnString:       os.Getenv("DB_CONN_STRING"),
		TestDBConnString:   os.Getenv("TEST_DB_CONN_STRING"),
		JWTSecret:          os.Getenv("JWT_SECRET"),
		JWTExpirationHours: jwtExpHours,
		Port:               port,
	}
}

func (c *Config) Validate() error {
	if c.DBConnString == "" {
		log.Fatal("DB_CONN_STRING environment variable is required")
	}
	if c.TestDBConnString == "" {
		log.Print("[WARNING]: TEST_DB_CONN_STRING is not set")
	}
	if c.JWTSecret == "" {
		log.Fatalf("JWT_SECRET environment variable is required")
	}
	return nil
}
