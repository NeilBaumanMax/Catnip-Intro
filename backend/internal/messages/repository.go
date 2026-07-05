package messages

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository { return &Repository{db: db} }

func (r *Repository) Create(m *models.Message) (int64, error) {
	result, err := r.db.Exec(
		"INSERT INTO message (name, phone, email, company, content, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
		m.Name, m.Phone, m.Email, m.Company, m.Content, m.Status,
	)
	if err != nil {
		return 0, fmt.Errorf("create message: %w", err)
	}
	return result.LastInsertId()
}

func (r *Repository) List(status string) ([]models.Message, error) {
	var rows *sql.Rows
	var err error
	if status != "" {
		rows, err = r.db.Query(
			"SELECT id, name, phone, email, company, content, status, created_at, updated_at FROM message WHERE status = ? ORDER BY id DESC", status,
		)
	} else {
		rows, err = r.db.Query(
			"SELECT id, name, phone, email, company, content, status, created_at, updated_at FROM message ORDER BY id DESC",
		)
	}
	if err != nil {
		return nil, fmt.Errorf("list messages: %w", err)
	}
	defer rows.Close()

	var items []models.Message
	for rows.Next() {
		var m models.Message
		if err := rows.Scan(&m.ID, &m.Name, &m.Phone, &m.Email, &m.Company, &m.Content, &m.Status, &m.CreatedAt, &m.UpdatedAt); err != nil {
			return nil, fmt.Errorf("scan message: %w", err)
		}
		items = append(items, m)
	}
	return items, rows.Err()
}

func (r *Repository) GetByID(id int) (*models.Message, error) {
	var m models.Message
	err := r.db.QueryRow(
		"SELECT id, name, phone, email, company, content, status, created_at, updated_at FROM message WHERE id = ?", id,
	).Scan(&m.ID, &m.Name, &m.Phone, &m.Email, &m.Company, &m.Content, &m.Status, &m.CreatedAt, &m.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get message %d: %w", id, err)
	}
	return &m, nil
}

func (r *Repository) SetStatus(id int, status string) error {
	_, err := r.db.Exec("UPDATE message SET status=?, updated_at=datetime('now') WHERE id=?", strings.TrimSpace(status), id)
	if err != nil {
		return fmt.Errorf("set message %d status: %w", id, err)
	}
	return nil
}

func (r *Repository) Delete(id int) error {
	_, err := r.db.Exec("DELETE FROM message WHERE id=?", id)
	if err != nil {
		return fmt.Errorf("delete message %d: %w", id, err)
	}
	return nil
}
