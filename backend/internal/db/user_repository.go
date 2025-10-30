package db

import (
	"context"
	"time"
)

// Checks if a user with the given username or email already exists
func UserExists(username, email string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 OR email = $2)`
	err := DB.QueryRowContext(ctx, query, username, email).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}

// Inserts a new user into the database and returns its ID
func CreateUser(username, email, passwordHash string) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var userID int
	query := `
		INSERT INTO users(username, email, password_hash, created_at, updated_at)
		VALUES($1, $2, $3, NOW(), NOW())
		RETURNING id
	`
	err := DB.QueryRowContext(ctx, query, username, email, passwordHash).Scan(&userID)
	if err != nil {
		return 0, err
	}

	return userID, nil
}

// Retrieves a user from the db and returns its infos
func GetUserbyEmail(email string) (int, string, string, string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var id int
	var username, emailVal, passwordHash string
	query := `SELECT id, username, email, password_hash FROM users WHERE email = $1`
	err := DB.QueryRowContext(ctx, query, email).Scan(&id, &username, &emailVal, &passwordHash)
	if err != nil {
		return 0, "", "", "", err
	}
	return id, username, emailVal, passwordHash, nil
}

