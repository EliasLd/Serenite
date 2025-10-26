package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/EliasLd/Serenite/internal/db"
	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterResponse struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

// Handles user registration
func HandleRegisterUser(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validation
	req.Username = strings.TrimSpace(req.Username)
	req.Email = strings.TrimSpace(req.Email)
	req.Password = strings.TrimSpace(req.Password)
	if req.Username == "" || req.Email == "" || req.Password == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}
	// TODO: Add email format check, password strenght...

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Check for existing username/email in DB
	exists, err := db.UserExists(req.Username, req.Email)
	if err != nil {
		http.Error(w, "Database error when checking if user already exists", http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "Username or email already taken", http.StatusConflict)
		return
	}

	// Create the user in the database
	userID, err := db.CreateUser(req.Username, req.Email, string(hashedPassword))
	if err != nil {
		http.Error(w, "Could not create user", http.StatusInternalServerError)
	}

	resp := RegisterResponse{
		ID:       userID,
		Username: req.Username,
		Email:    req.Email,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resp)

}
