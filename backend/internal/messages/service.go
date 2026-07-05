package messages

import (
	"fmt"
	"strings"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

var allowedStatuses = map[string]bool{
	"new":        true,
	"processing": true,
	"processed":  true,
}

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service { return &Service{repo: repo} }

func (s *Service) Create(m *models.Message) (*models.Message, error) {
	m.Name = strings.TrimSpace(m.Name)
	m.Content = strings.TrimSpace(m.Content)
	m.Phone = strings.TrimSpace(m.Phone)
	m.Email = strings.TrimSpace(m.Email)

	if m.Name == "" {
		return nil, fmt.Errorf("name 不能为空")
	}
	if m.Content == "" {
		return nil, fmt.Errorf("content 不能为空")
	}
	if m.Phone == "" && m.Email == "" {
		return nil, fmt.Errorf("phone 和 email 至少填写一个")
	}
	if m.Status == "" {
		m.Status = "new"
	}

	id, err := s.repo.Create(m)
	if err != nil {
		return nil, err
	}
	return s.repo.GetByID(int(id))
}

func (s *Service) List(status string) ([]models.Message, error) {
	return s.repo.List(strings.TrimSpace(status))
}

func (s *Service) GetByID(id int) (*models.Message, error) {
	return s.repo.GetByID(id)
}

func (s *Service) SetStatus(id int, status string) (*models.Message, error) {
	status = strings.TrimSpace(status)
	if !allowedStatuses[status] {
		return nil, fmt.Errorf("非法 status: %s，允许: new, processing, processed", status)
	}
	existing, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if existing == nil {
		return nil, nil
	}
	if err := s.repo.SetStatus(id, status); err != nil {
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
