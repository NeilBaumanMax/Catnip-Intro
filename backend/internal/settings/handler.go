package settings

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type upsertRequest struct {
	CompanyName string `json:"companyName"`
	Slogan      string `json:"slogan"`
	Description string `json:"description"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	Address     string `json:"address"`
	LogoURL     string `json:"logoUrl"`
	WechatQRURL string `json:"wechatQrUrl"`
}

func (r upsertRequest) ToModel() *models.SiteSetting {
	return &models.SiteSetting{
		CompanyName: r.CompanyName,
		Slogan:      r.Slogan,
		Description: r.Description,
		Phone:       r.Phone,
		Email:       r.Email,
		Address:     r.Address,
		LogoURL:     r.LogoURL,
		WechatQRURL: r.WechatQRURL,
	}
}

func GetPublic(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ss, err := svc.Get()
		if err != nil {
			log.Printf("settings: get: %v", err)
			api.WriteError(w, http.StatusInternalServerError, "读取网站设置失败")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: ss})
	}
}

func Upsert(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req upsertRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		ss, err := svc.Upsert(req.ToModel())
		if err != nil {
			log.Printf("settings: upsert: %v", err)
			api.WriteError(w, http.StatusInternalServerError, "保存网站设置失败")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: ss})
	}
}
