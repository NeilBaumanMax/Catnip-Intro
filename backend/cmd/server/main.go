package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/auth"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/cases"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/database"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/middleware"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/products"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/uploads"
)

type healthResponse struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	resp := healthResponse{OK: true, Message: "go backend is running"}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("health handler: encode error: %v", err)
	}
}

func adminPingHandler(w http.ResponseWriter, r *http.Request) {
	api.WriteOK(w, api.Response{OK: true, Message: "admin auth ok"})
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
	productSvc := products.NewService(products.NewRepository(db))
	caseSvc := cases.NewService(cases.NewRepository(db))

	mux := http.NewServeMux()

	// --- Public routes ---
	mux.HandleFunc("GET /health", healthHandler)
	mux.HandleFunc("POST /api/auth/login", auth.LoginHandler(authSvc))
	mux.HandleFunc("POST /api/uploads", uploads.UploadHandler)

	staticHandler, err := uploads.StaticHandler()
	if err != nil {
		log.Fatalf("uploads static handler: %v", err)
	}
	mux.Handle("/uploads/", staticHandler)

	// Public product routes
	mux.HandleFunc("GET /api/products", products.ListPublic(productSvc))
	mux.HandleFunc("GET /api/products/{id}", products.GetPublic(productSvc))

	// Public case routes
	mux.HandleFunc("GET /api/cases", cases.ListPublic(caseSvc))
	mux.HandleFunc("GET /api/cases/{id}", cases.GetPublic(caseSvc))

	// --- Admin routes (auth required) ---
	authMw := middleware.RequireAuth(tokenStore)

	mux.Handle("GET /api/admin/ping", authMw(http.HandlerFunc(adminPingHandler)))

	// Product admin
	mux.Handle("POST /api/admin/products", authMw(products.Create(productSvc)))
	mux.Handle("PUT /api/admin/products/{id}", authMw(products.Update(productSvc)))
	mux.Handle("DELETE /api/admin/products/{id}", authMw(products.Delete(productSvc)))
	mux.Handle("PATCH /api/admin/products/{id}/visibility", authMw(products.SetVisibility(productSvc)))

	// Case admin
	mux.Handle("POST /api/admin/cases", authMw(cases.Create(caseSvc)))
	mux.Handle("PUT /api/admin/cases/{id}", authMw(cases.Update(caseSvc)))
	mux.Handle("DELETE /api/admin/cases/{id}", authMw(cases.Delete(caseSvc)))
	mux.Handle("PATCH /api/admin/cases/{id}/visibility", authMw(cases.SetVisibility(caseSvc)))

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
