package messages

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/api"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type createRequest struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Company string `json:"company"`
	Content string `json:"content"`
}

type statusRequest struct {
	Status string `json:"status"`
}

func CreatePublic(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		m, err := svc.Create(&models.Message{
			Name:    req.Name,
			Phone:   req.Phone,
			Email:   req.Email,
			Company: req.Company,
			Content: req.Content,
		})
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, err.Error())
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: m})
	}
}

func ListAdmin(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		status := r.URL.Query().Get("status")
		items, err := svc.List(status)
		if err != nil {
			log.Printf("messages: list: %v", err)
			api.WriteError(w, http.StatusInternalServerError, "读取留言列表失败")
			return
		}
		if items == nil {
			items = []models.Message{}
		}
		api.WriteOK(w, api.Response{OK: true, Data: items})
	}
}

func GetAdmin(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		m, err := svc.GetByID(id)
		if err != nil {
			log.Printf("messages: get %d: %v", id, err)
			api.WriteError(w, http.StatusInternalServerError, "读取留言失败")
			return
		}
		if m == nil {
			api.WriteError(w, http.StatusNotFound, "留言不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: m})
	}
}

func SetStatus(svc *Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			api.WriteError(w, http.StatusBadRequest, "无效的 id")
			return
		}
		var req statusRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			api.WriteError(w, http.StatusBadRequest, "请求格式错误")
			return
		}
		m, err := svc.SetStatus(id, req.Status)
		if err != nil {
			msg := err.Error()
			if strings.Contains(msg, "非法") {
				api.WriteError(w, http.StatusBadRequest, msg)
			} else if strings.Contains(msg, "not found") {
				api.WriteError(w, http.StatusNotFound, "留言不存在")
			} else {
				api.WriteError(w, http.StatusInternalServerError, "修改状态失败")
			}
			return
		}
		if m == nil {
			api.WriteError(w, http.StatusNotFound, "留言不存在")
			return
		}
		api.WriteOK(w, api.Response{OK: true, Data: m})
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
				api.WriteError(w, http.StatusNotFound, "留言不存在")
			} else {
				api.WriteError(w, http.StatusInternalServerError, "删除留言失败")
			}
			return
		}
		api.WriteOK(w, api.Response{OK: true, Message: "删除成功"})
	}
}
