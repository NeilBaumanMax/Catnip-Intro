package main

import (
	"encoding/json"
	"log"
	"net/http"

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

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/api/uploads", uploads.UploadHandler)

	staticHandler, err := uploads.StaticHandler()
	if err != nil {
		log.Fatalf("uploads static handler: %v", err)
	}
	mux.Handle("/uploads/", staticHandler)

	host := "0.0.0.0"
	port := "4000"
	addr := host + ":" + port

	log.Printf("Go backend listening on http://%s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
