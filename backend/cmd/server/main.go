package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/auth"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/database"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/middleware"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/uploads"
)

type healthResponse struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	resp := healthResponse{
		OK:      true,
		Message: "go backend is running",
	}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("health handler: encode error: %v", err)
	}
}

func adminPingHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		api.WriteError(w, http.StatusMethodNotAllowed, "仅支持 GET 方法")
		return
	}
	api.WriteOK(w, api.Response{
		OK:      true,
		Message: "admin auth ok",
	})
}

func main() {
	dbPath := database.DefaultDBPath()
	db, err := database.Open(dbPath)
	if err != nil {
		log.Fatalf("open database: %v", err)
	}
	defer db.Close()

	tokenStore := auth.NewTokenStore()
	authSvc := auth.NewService(db, tokenStore)

	mux := http.NewServeMux()

	// Public routes
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/api/auth/login", auth.LoginHandler(authSvc))
	mux.HandleFunc("/api/uploads", uploads.UploadHandler)

	staticHandler, err := uploads.StaticHandler()
	if err != nil {
		log.Fatalf("uploads static handler: %v", err)
	}
	mux.Handle("/uploads/", staticHandler)

	// Protected routes
	authMw := middleware.RequireAuth(tokenStore)
	mux.Handle("/api/admin/ping", authMw(http.HandlerFunc(adminPingHandler)))

	// Apply CORS
	corsHandler := middleware.CORS(mux)

	host := "0.0.0.0"
	port := "4000"
	addr := host + ":" + port

	log.Printf("Go backend listening on http://%s", addr)
	if err := http.ListenAndServe(addr, corsHandler); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
