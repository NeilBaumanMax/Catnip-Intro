package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
)

// CreateSchema creates all application tables if they do not exist.
func CreateSchema(db *sql.DB) error {
	schema := `
	CREATE TABLE IF NOT EXISTS admin (
		id            INTEGER PRIMARY KEY AUTOINCREMENT,
		username      TEXT    NOT NULL UNIQUE,
		password_hash TEXT    NOT NULL,
		created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
		updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
	);

	CREATE TABLE IF NOT EXISTS product (
		id          INTEGER PRIMARY KEY AUTOINCREMENT,
		name        TEXT    NOT NULL,
		category    TEXT    NOT NULL,
		summary     TEXT    NOT NULL,
		description TEXT    NOT NULL,
		image_url   TEXT    NOT NULL,
		sort_order  INTEGER NOT NULL DEFAULT 0,
		is_visible  INTEGER NOT NULL DEFAULT 1,
		created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
		updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
	);

	CREATE TABLE IF NOT EXISTS case_item (
		id          INTEGER PRIMARY KEY AUTOINCREMENT,
		title       TEXT    NOT NULL,
		summary     TEXT    NOT NULL,
		content     TEXT    NOT NULL,
		image_url   TEXT    NOT NULL,
		sort_order  INTEGER NOT NULL DEFAULT 0,
		is_visible  INTEGER NOT NULL DEFAULT 1,
		created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
		updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
	);

	CREATE TABLE IF NOT EXISTS message (
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT    NOT NULL,
		phone      TEXT    NOT NULL,
		email      TEXT    NOT NULL,
		company    TEXT    NOT NULL,
		content    TEXT    NOT NULL,
		status     TEXT    NOT NULL DEFAULT 'new',
		created_at TEXT    NOT NULL DEFAULT (datetime('now')),
		updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
	);

	CREATE TABLE IF NOT EXISTS site_setting (
		id            INTEGER PRIMARY KEY AUTOINCREMENT,
		company_name  TEXT    NOT NULL,
		slogan        TEXT    NOT NULL,
		description   TEXT    NOT NULL,
		phone         TEXT    NOT NULL,
		email         TEXT    NOT NULL,
		address       TEXT    NOT NULL,
		logo_url      TEXT    NOT NULL,
		wechat_qr_url TEXT    NOT NULL,
		created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
		updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
	);
	`

	if _, err := db.Exec(schema); err != nil {
		return fmt.Errorf("create schema: %w", err)
	}

	log.Println("[schema] 5 张表已就位: admin, product, case_item, message, site_setting")
	return nil
}

// EnsureDataDir creates the data directory if it does not exist.
func EnsureDataDir(dbPath string) error {
	dir := filepath.Dir(dbPath)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("create data dir %s: %w", dir, err)
	}
	return nil
}
