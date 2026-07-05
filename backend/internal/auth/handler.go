package auth

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type userInfo struct {
	Username string `json:"username"`
}

func LoginHandler(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			api.WriteError(w, http.StatusMethodNotAllowed, "仅支持 POST 方法")
			return
		}

		var req loginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}

		if req.Username == "" || req.Password == "" {
			api.WriteError(w, http.StatusBadRequest, "缺少用户名或密码")
			return
		}

		token, err := svc.Login(req.Username, req.Password)
		if err != nil {
			log.Printf("auth: login failed for %s: %v", req.Username, err)
			api.WriteError(w, http.StatusUnauthorized, "invalid credentials")
			return
		}

		log.Printf("auth: login ok for %s", req.Username)
		api.WriteOK(w, api.Response{
			OK:    true,
			Token: token,
			User:  userInfo{Username: req.Username},
		})
	}
}
