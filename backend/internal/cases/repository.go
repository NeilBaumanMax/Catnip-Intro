package cases

import (
	"database/sql"
	"fmt"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository { return &Repository{db: db} }

func (r *Repository) ListVisible() ([]models.Case, error) {
	rows, err := r.db.Query(
		"SELECT id, title, summary, content, image_url, sort_order, is_visible, created_at, updated_at FROM case_item WHERE is_visible = 1 ORDER BY sort_order ASC, id DESC",
	)
	if err != nil {
		return nil, fmt.Errorf("list cases: %w", err)
	}
	defer rows.Close()

	var items []models.Case
	for rows.Next() {
		var c models.Case
		if err := rows.Scan(&c.ID, &c.Title, &c.Summary, &c.Content, &c.ImageURL, &c.SortOrder, &c.IsVisible, &c.CreatedAt, &c.UpdatedAt); err != nil {
			return nil, fmt.Errorf("scan case: %w", err)
		}
		items = append(items, c)
	}
	return items, rows.Err()
}

func (r *Repository) GetVisible(id int) (*models.Case, error) {
	var c models.Case
	err := r.db.QueryRow(
		"SELECT id, title, summary, content, image_url, sort_order, is_visible, created_at, updated_at FROM case_item WHERE id = ? AND is_visible = 1", id,
	).Scan(&c.ID, &c.Title, &c.Summary, &c.Content, &c.ImageURL, &c.SortOrder, &c.IsVisible, &c.CreatedAt, &c.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get case %d: %w", id, err)
	}
	return &c, nil
}

func (r *Repository) GetByID(id int) (*models.Case, error) {
	var c models.Case
	err := r.db.QueryRow(
		"SELECT id, title, summary, content, image_url, sort_order, is_visible, created_at, updated_at FROM case_item WHERE id = ?", id,
	).Scan(&c.ID, &c.Title, &c.Summary, &c.Content, &c.ImageURL, &c.SortOrder, &c.IsVisible, &c.CreatedAt, &c.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get case %d: %w", id, err)
	}
	return &c, nil
}

func (r *Repository) Create(c *models.Case) (int64, error) {
	result, err := r.db.Exec(
		"INSERT INTO case_item (title, summary, content, image_url, sort_order, is_visible, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
		c.Title, c.Summary, c.Content, c.ImageURL, c.SortOrder, c.IsVisible,
	)
	if err != nil {
		return 0, fmt.Errorf("create case: %w", err)
	}
	return result.LastInsertId()
}

func (r *Repository) Update(id int, c *models.Case) error {
	_, err := r.db.Exec(
		"UPDATE case_item SET title=?, summary=?, content=?, image_url=?, sort_order=?, is_visible=?, updated_at=datetime('now') WHERE id=?",
		c.Title, c.Summary, c.Content, c.ImageURL, c.SortOrder, c.IsVisible, id,
	)
	if err != nil {
		return fmt.Errorf("update case %d: %w", id, err)
	}
	return nil
}

func (r *Repository) Delete(id int) error {
	_, err := r.db.Exec("DELETE FROM case_item WHERE id=?", id)
	if err != nil {
		return fmt.Errorf("delete case %d: %w", id, err)
	}
	return nil
}

func (r *Repository) SetVisibility(id int, visible bool) error {
	v := 0
	if visible {
		v = 1
	}
	_, err := r.db.Exec("UPDATE case_item SET is_visible=?, updated_at=datetime('now') WHERE id=?", v, id)
	if err != nil {
		return fmt.Errorf("set case %d visibility: %w", id, err)
	}
	return nil
}
