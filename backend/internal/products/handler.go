package products

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type createRequest struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Summary     string `json:"summary"`
	Description string `json:"description"`
	ImageURL    string `json:"imageUrl"`
	SortOrder   int    `json:"sortOrder"`
	IsVisible   bool   `json:"isVisible"`
}

type updateRequest struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Summary     string `json:"summary"`
	Description string `json:"description"`
	ImageURL    string `json:"imageUrl"`
	SortOrder   int    `json:"sortOrder"`
	IsVisible   bool   `json:"isVisible"`
}

type visibilityRequest struct {
	IsVisible bool `json:"isVisible"`
}

func (r createRequest) ToModel() *models.Product {
	return &models.Product{
		Name:        r.Name,
		Category:    r.Category,
		Summary:     r.Summary,
		Description: r.Description,
		ImageURL:    r.ImageURL,
		SortOrder:   r.SortOrder,
		IsVisible:   r.IsVisible,
	}
}

func (r updateRequest) ToModel() *models.Product {
	return &models.Product{
		Name:        r.Name,
		Category:    r.Category,
		Summary:     r.Summary,
		Description: r.Description,
		ImageURL:    r.ImageURL,
		SortOrder:   r.SortOrder,
		IsVisible:   r.IsVisible,
	}
}

func ListPublic(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := svc.ListVisible()
		if err != nil {
			log.Printf("products: list: %v", err)
			api.WriteError(w, http.StatusInternalServerError, "读取产品列表失败")
			return
		}
		if items == nil {
			items = []models.Product{}
		}
		api.WriteOK(w, api.Response{OK: true, Message: "", Data: items})
	}
}

func GetPublic(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		p, err := svc.GetVisible(id)
		if err != nil {
			log.Printf("products: get %d: %v", id, err)
			api.WriteError(w, http.StatusInternalServerError, "读取产品失败")
			return
		}
		if p == nil {
			api.WriteError(w, http.StatusNotFound, "产品不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: p})
	}
}

func Create(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		p, err := svc.Create(req.ToModel())
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, err.Error())
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: p})
	}
}

func Update(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		var req updateRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		p, err := svc.Update(id, req.ToModel())
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, err.Error())
			return
		}
		if p == nil {
			api.WriteError(w, http.StatusNotFound, "产品不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: p})
	}
}

func Delete(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		if err := svc.Delete(id); err != nil {
			if err.Error() == "not found" {
				api.WriteError(w, http.StatusNotFound, "产品不存在")
			} else {
				api.WriteError(w, http.StatusInternalServerError, "删除产品失败")
			}
			return
		}
		api.WriteOK(w, api.Response{OK: true, Message: "删除成功"})
	}
}

func SetVisibility(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		var req visibilityRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		p, err := svc.SetVisibility(id, req.IsVisible)
		if err != nil {
			api.WriteError(w, http.StatusInternalServerError, "修改状态失败")
			return
		}
		if p == nil {
			api.WriteError(w, http.StatusNotFound, "产品不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: p})
	}
}
