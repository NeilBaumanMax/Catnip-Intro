package auth

import (
	"database/sql"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	db         *sql.DB
	tokenStore *TokenStore
}

func NewService(db *sql.DB, tokenStore *TokenStore) *Service {
	return &Service{db: db, tokenStore: tokenStore}
}

func (s *Service) Login(username, password string) (string, error) {
	var passwordHash string
	err := s.db.QueryRow(
		"SELECT password_hash FROM admin WHERE username = ?", username,
	).Scan(&passwordHash)
	if err == sql.ErrNoRows {
		return "", fmt.Errorf("invalid credentials")
	}
	if err != nil {
		return "", fmt.Errorf("query admin: %w", err)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password)); err != nil {
		return "", fmt.Errorf("invalid credentials")
	}

	token, err := s.tokenStore.Add(username)
	if err != nil {
		return "", fmt.Errorf("store token: %w", err)
	}

	return token, nil
}

// HashPassword generates a bcrypt hash for the given password.
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("hash password: %w", err)
	}
	return string(hash), nil
}
