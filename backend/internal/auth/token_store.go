package auth

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"sync"
)

type TokenStore struct {
	mu     sync.RWMutex
	tokens map[string]string // token -> username
}

func NewTokenStore() *TokenStore {
	return &TokenStore{
		tokens: make(map[string]string),
	}
}

func (s *TokenStore) Add(username string) (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("generate token: %w", err)
	}
	token := hex.EncodeToString(b)

	s.mu.Lock()
	s.tokens[token] = username
	s.mu.Unlock()

	return token, nil
}

func (s *TokenStore) Validate(token string) (string, bool) {
	s.mu.RLock()
	username, ok := s.tokens[token]
	s.mu.RUnlock()
	return username, ok
}

func (s *TokenStore) Remove(token string) {
	s.mu.Lock()
	delete(s.tokens, token)
	s.mu.Unlock()
}
