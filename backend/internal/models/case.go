package models

type Case struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Summary   string `json:"summary"`
	Content   string `json:"content"`
	ImageURL  string `json:"image_url"`
	SortOrder int    `json:"sort_order"`
	IsVisible bool   `json:"is_visible"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
