package middleware

import (
	"net/http"
	"strings"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/auth"
)

func RequireAuth(tokenStore *auth.TokenStore) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			if header == "" {
				api.WriteError(w, http.StatusUnauthorized, "unauthorized")
				return
			}

			token, ok := strings.CutPrefix(header, "Bearer ")
			if !ok || token == "" {
				api.WriteError(w, http.StatusUnauthorized, "unauthorized")
				return
			}

			if _, valid := tokenStore.Validate(token); !valid {
				api.WriteError(w, http.StatusUnauthorized, "unauthorized")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
