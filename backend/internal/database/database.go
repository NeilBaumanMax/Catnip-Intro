package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

// Open opens a SQLite database at the given path.
func Open(dbPath string) (*sql.DB, error) {
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	db.SetMaxOpenConns(1)

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("ping database: %w", err)
	}

	return db, nil
}

// DefaultDBPath returns the default path to the SQLite database file.
// It resolves data/company.db relative to the project root by walking up
// from the current working directory until finding the data directory
// or the project root markers (go.mod or dos/).
func DefaultDBPath() string {
	// First check relative to cwd
	cwd, err := os.Getwd()
	if err != nil {
		return filepath.Join("..", "data", "company.db")
	}

	// Walk up from cwd to find project root
	dir := cwd
	for {
		// Check for go.mod in backend/ or README in project root
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			// We're in backend/, project root is parent
			return filepath.Join(dir, "..", "data", "company.db")
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			// Reached filesystem root, fall back to relative path
			return filepath.Join("..", "data", "company.db")
		}
		dir = parent
	}
}
