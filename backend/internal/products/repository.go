package products

import (
	"database/sql"
	"fmt"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/models"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository { return &Repository{db: db} }

func (r *Repository) ListVisible() ([]models.Product, error) {
	rows, err := r.db.Query(
		"SELECT id, name, category, summary, description, image_url, sort_order, is_visible, created_at, updated_at FROM product WHERE is_visible = 1 ORDER BY sort_order ASC, id DESC",
	)
	if err != nil {
		return nil, fmt.Errorf("list products: %w", err)
	}
	defer rows.Close()

	var items []models.Product
	for rows.Next() {
		var p models.Product
		if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.Summary, &p.Description, &p.ImageURL, &p.SortOrder, &p.IsVisible, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, fmt.Errorf("scan product: %w", err)
		}
		items = append(items, p)
	}
	return items, rows.Err()
}

func (r *Repository) GetVisible(id int) (*models.Product, error) {
	var p models.Product
	err := r.db.QueryRow(
		"SELECT id, name, category, summary, description, image_url, sort_order, is_visible, created_at, updated_at FROM product WHERE id = ? AND is_visible = 1", id,
	).Scan(&p.ID, &p.Name, &p.Category, &p.Summary, &p.Description, &p.ImageURL, &p.SortOrder, &p.IsVisible, &p.CreatedAt, &p.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get product %d: %w", id, err)
	}
	return &p, nil
}

func (r *Repository) GetByID(id int) (*models.Product, error) {
	var p models.Product
	err := r.db.QueryRow(
		"SELECT id, name, category, summary, description, image_url, sort_order, is_visible, created_at, updated_at FROM product WHERE id = ?", id,
	).Scan(&p.ID, &p.Name, &p.Category, &p.Summary, &p.Description, &p.ImageURL, &p.SortOrder, &p.IsVisible, &p.CreatedAt, &p.UpdatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get product %d: %w", id, err)
	}
	return &p, nil
}

func (r *Repository) Create(p *models.Product) (int64, error) {
	result, err := r.db.Exec(
		"INSERT INTO product (name, category, summary, description, image_url, sort_order, is_visible, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
		p.Name, p.Category, p.Summary, p.Description, p.ImageURL, p.SortOrder, p.IsVisible,
	)
	if err != nil {
		return 0, fmt.Errorf("create product: %w", err)
	}
	return result.LastInsertId()
}

func (r *Repository) Update(id int, p *models.Product) error {
	_, err := r.db.Exec(
		"UPDATE product SET name=?, category=?, summary=?, description=?, image_url=?, sort_order=?, is_visible=?, updated_at=datetime('now') WHERE id=?",
		p.Name, p.Category, p.Summary, p.Description, p.ImageURL, p.SortOrder, p.IsVisible, id,
	)
	if err != nil {
		return fmt.Errorf("update product %d: %w", id, err)
	}
	return nil
}

func (r *Repository) Delete(id int) error {
	_, err := r.db.Exec("DELETE FROM product WHERE id=?", id)
	if err != nil {
		return fmt.Errorf("delete product %d: %w", id, err)
	}
	return nil
}

func (r *Repository) SetVisibility(id int, visible bool) error {
	v := 0
	if visible {
		v = 1
	}
	_, err := r.db.Exec("UPDATE product SET is_visible=?, updated_at=datetime('now') WHERE id=?", v, id)
	if err != nil {
		return fmt.Errorf("set product %d visibility: %w", id, err)
	}
	return nil
}
