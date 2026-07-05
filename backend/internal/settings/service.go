package settings

import (
	"strings"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service { return &Service{repo: repo} }

func (s *Service) Get() (*models.SiteSetting, error) {
	ss, err := s.repo.Get()
	if err != nil {
		return nil, err
	}
	if ss == nil {
		// Return empty defaults, don't error
		return &models.SiteSetting{}, nil
	}
	return ss, nil
}

func (s *Service) Upsert(req *models.SiteSetting) (*models.SiteSetting, error) {
	if strings.TrimSpace(req.CompanyName) == "" {
		req.CompanyName = "公司名称"
	}
	if err := s.repo.Upsert(req); err != nil {
		return nil, err
	}
	return s.repo.Get()
}
