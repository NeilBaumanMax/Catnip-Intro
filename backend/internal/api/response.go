package api

import (
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	OK      bool   `json:"ok"`
	Error   string `json:"error,omitempty"`
	Token   string `json:"token,omitempty"`
	User    any    `json:"user,omitempty"`
	Message string `json:"message,omitempty"`
}

func WriteJSON(w http.ResponseWriter, status int, resp Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("api: encode error: %v", err)
	}
}

func WriteOK(w http.ResponseWriter, resp Response) {
	WriteJSON(w, http.StatusOK, resp)
}

func WriteError(w http.ResponseWriter, status int, msg string) {
	WriteJSON(w, status, Response{OK: false, Error: msg})
}
