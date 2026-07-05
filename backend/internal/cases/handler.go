package cases

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type createRequest struct {
	Title     string `json:"title"`
	Summary   string `json:"summary"`
	Content   string `json:"content"`
	ImageURL  string `json:"imageUrl"`
	SortOrder int    `json:"sortOrder"`
	IsVisible bool   `json:"isVisible"`
}

type updateRequest struct {
	Title     string `json:"title"`
	Summary   string `json:"summary"`
	Content   string `json:"content"`
	ImageURL  string `json:"imageUrl"`
	SortOrder int    `json:"sortOrder"`
	IsVisible bool   `json:"isVisible"`
}

type visibilityRequest struct {
	IsVisible bool `json:"isVisible"`
}

func (r createRequest) ToModel() *models.Case {
	return &models.Case{
		Title:     r.Title,
		Summary:   r.Summary,
		Content:   r.Content,
		ImageURL:  r.ImageURL,
		SortOrder: r.SortOrder,
		IsVisible: r.IsVisible,
	}
}

func (r updateRequest) ToModel() *models.Case {
	return &models.Case{
		Title:     r.Title,
		Summary:   r.Summary,
		Content:   r.Content,
		ImageURL:  r.ImageURL,
		SortOrder: r.SortOrder,
		IsVisible: r.IsVisible,
	}
}

func ListPublic(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := svc.ListVisible()
		if err != nil {
			log.Printf("cases: list: %v", err)
			api.WriteError(w, http.StatusInternalServerError, "读取案例列表失败")
			return
		}
		if items == nil {
			items = []models.Case{}
		}
		api.WriteOK(w, api.Response{OK: true, Data: items})
	}
}

func GetPublic(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		c, err := svc.GetVisible(id)
		if err != nil {
			log.Printf("cases: get %d: %v", id, err)
			api.WriteError(w, http.StatusInternalServerError, "读取案例失败")
			return
		}
		if c == nil {
			api.WriteError(w, http.StatusNotFound, "案例不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: c})
	}
}

func Create(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		c, err := svc.Create(req.ToModel())
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, err.Error())
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: c})
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
		c, err := svc.Update(id, req.ToModel())
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, err.Error())
			return
		}
		if c == nil {
			api.WriteError(w, http.StatusNotFound, "案例不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: c})
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
				api.WriteError(w, http.StatusNotFound, "案例不存在")
			} else {
				api.WriteError(w, http.StatusInternalServerError, "删除案例失败")
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
		c, err := svc.SetVisibility(id, req.IsVisible)
		if err != nil {
			api.WriteError(w, http.StatusInternalServerError, "修改状态失败")
			return
		}
		if c == nil {
			api.WriteError(w, http.StatusNotFound, "案例不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: c})
	}
}
