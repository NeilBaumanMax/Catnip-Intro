package settings

import (
	"database/sql"
	"fmt"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository { return &Repository{db: db} }

func (r *Repository) Get() (*models.SiteSetting, error) {
	var s models.SiteSetting
	err := r.db.QueryRow(
		"SELECT id, company_name, slogan, description, phone, email, address, logo_url, wechat_qr_url, created_at, updated_at FROM site_setting WHERE id = 1",
	).Scan(&s.ID, &s.CompanyName, &s.Slogan, &s.Description, &s.Phone, &s.Email, &s.Address, &s.LogoURL, &s.WechatQRURL, &s.CreatedAt, &s.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get settings: %w", err)
	}
	return &s, nil
}

func (r *Repository) Upsert(s *models.SiteSetting) error {
	_, err := r.db.Exec(
		`INSERT INTO site_setting (id, company_name, slogan, description, phone, email, address, logo_url, wechat_qr_url, created_at, updated_at)
		 VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
		 ON CONFLICT(id) DO UPDATE SET
			company_name = excluded.company_name,
			slogan = excluded.slogan,
			description = excluded.description,
			phone = excluded.phone,
			email = excluded.email,
			address = excluded.address,
			logo_url = excluded.logo_url,
			wechat_qr_url = excluded.wechat_qr_url,
			updated_at = excluded.updated_at`,
		s.CompanyName, s.Slogan, s.Description, s.Phone, s.Email, s.Address, s.LogoURL, s.WechatQRURL,
	)
	if err != nil {
		return fmt.Errorf("upsert settings: %w", err)
	}
	return nil
}
