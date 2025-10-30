package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/EliasLd/Serenite/internal/db"
	"github.com/EliasLd/Serenite/config"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Email		string `json:"email"`
	Password 	string `json:"password"`
}

type LoginResponse struct {
	Token		string	`json:"token"`
	ID			int  	`json:"id"`
	Username 	string	`json:"username"`
	Email 		string 	`json:"email"`
}

// Handles user login
func HandleLoginUser(cfg *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		req.Email = strings.TrimSpace(req.Email)
		req.Password = strings.TrimSpace(req.Password)
		if req.Email == "" || req.Password == "" {
			http.Error(w, "Email and password required", http.StatusBadRequest)
			return 
		}

		// Look up user
		id, username, emailVal, passwordHash, err := db.GetUserbyEmail(req.Email)
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Compare password
		if err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password)); err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Generate JWT
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id":	id,
			"username":	username,
			"email":	emailVal,
			"exp":		time.Now().Add(time.Hour* time.Duration(cfg.JWTExpirationHours)).Unix(),
		})

		tokenString, err := token.SignedString([]byte(cfg.JWTSecret))
		if err != nil {
			http.Error(w, "Failed to generate token", http.StatusInternalServerError)
			return
		}

		resp := LoginResponse {
			Token:		tokenString,
			ID:			id,
			Username:	username,
			Email:		emailVal,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}
