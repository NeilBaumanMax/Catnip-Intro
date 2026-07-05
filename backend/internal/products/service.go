package products

import (
	"fmt"
	"strings"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service { return &Service{repo: repo} }

func (s *Service) ListVisible() ([]models.Product, error) {
	return s.repo.ListVisible()
}

func (s *Service) GetVisible(id int) (*models.Product, error) {
	return s.repo.GetVisible(id)
}

func (s *Service) GetByID(id int) (*models.Product, error) {
	return s.repo.GetByID(id)
}

func (s *Service) Create(p *models.Product) (*models.Product, error) {
	if strings.TrimSpace(p.Name) == "" {
		return nil, fmt.Errorf("name 不能为空")
	}
	id, err := s.repo.Create(p)
	if err != nil {
		return nil, err
	}
	return s.repo.GetByID(int(id))
}

func (s *Service) Update(id int, p *models.Product) (*models.Product, error) {
	if strings.TrimSpace(p.Name) == "" {
		return nil, fmt.Errorf("name 不能为空")
	}
	existing, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if existing == nil {
		return nil, nil
	}
	if err := s.repo.Update(id, p); err != nil {
		return nil, err
	}
	return s.repo.GetByID(id)
}

func (s *Service) Delete(id int) error {
	existing, err := s.repo.GetByID(id)
	if err != nil {
		return err
	}
	if existing == nil {
		return fmt.Errorf("not found")
	}
	return s.repo.Delete(id)
}

func (s *Service) SetVisibility(id int, visible bool) (*models.Product, error) {
	existing, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if existing == nil {
		return nil, nil
	}
	if err := s.repo.SetVisibility(id, visible); err != nil {
		return nil, err
	}
	return s.repo.GetByID(id)
}
