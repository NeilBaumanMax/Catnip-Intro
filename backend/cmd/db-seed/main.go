package main

import (
	"log"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/auth"
	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/database"
)

const seedAdminUsername = "__seed_admin"
const seedProductName = "__seed_product"
const seedCaseTitle = "__seed_case"
const seedMessageName = "__seed_message"
const seedSiteSettingCompany = "__seed_company"

// Default admin credentials for development
const defaultAdminUser = "admin"
const defaultAdminPass = "admin123456"

func main() {
	dbPath := database.DefaultDBPath()
	log.Printf("[db-seed] 数据库路径: %s", dbPath)

	if err := database.EnsureDataDir(dbPath); err != nil {
		log.Fatalf("[db-seed] 创建 data 目录失败: %v", err)
	}

	db, err := database.Open(dbPath)
	if err != nil {
		log.Fatalf("[db-seed] 打开数据库失败: %v", err)
	}
	defer db.Close()

	if err := database.CreateSchema(db); err != nil {
		log.Fatalf("[db-seed] 创建 schema 失败: %v", err)
	}

	log.Println("[db-seed] 开始写入测试数据 ...")

	// Default admin with bcrypt password
	defaultAdminHash, err := auth.HashPassword(defaultAdminPass)
	if err != nil {
		log.Fatalf("[db-seed] hash default admin password: %v", err)
	}
	_, err = db.Exec(`
		INSERT INTO admin (id, username, password_hash, created_at, updated_at)
		VALUES (1, ?, ?, datetime('now'), datetime('now'))
		ON CONFLICT(id) DO UPDATE SET
			username = excluded.username,
			password_hash = excluded.password_hash,
			updated_at = excluded.updated_at
	`, defaultAdminUser, defaultAdminHash)
	if err != nil {
		log.Fatalf("[db-seed] 默认 Admin 写入失败: %v", err)
	}
	log.Printf("[db-seed] Admin username=%s (bcrypt)", defaultAdminUser)

	// Test admin (for seed verification)
	testAdminHash, err := auth.HashPassword("test_hash_from_seed")
	if err != nil {
		log.Fatalf("[db-seed] hash test admin password: %v", err)
	}
	_, err = db.Exec(`
		INSERT OR REPLACE INTO admin (id, username, password_hash, created_at, updated_at)
		VALUES (2, ?, ?, datetime('now'), datetime('now'))
	`, seedAdminUsername, testAdminHash)
	if err != nil {
		log.Fatalf("[db-seed] 测试 Admin 写入失败: %v", err)
	}
	log.Printf("[db-seed] Admin username=%s (bcrypt)", seedAdminUsername)

	// Product
	_, err = db.Exec(`
		INSERT INTO product (id, name, category, summary, description, image_url, sort_order, is_visible, created_at, updated_at)
		VALUES (1, ?, '测试分类', '测试产品摘要', '测试产品描述', '', 0, 1, datetime('now'), datetime('now'))
		ON CONFLICT(id) DO UPDATE SET
			name = excluded.name,
			category = excluded.category,
			summary = excluded.summary,
			description = excluded.description,
			updated_at = excluded.updated_at
	`, seedProductName)
	if err != nil {
		log.Fatalf("[db-seed] Product 写入失败: %v", err)
	}
	log.Printf("[db-seed] Product name=%s", seedProductName)

	// Case
	_, err = db.Exec(`
		INSERT INTO case_item (id, title, summary, content, image_url, sort_order, is_visible, created_at, updated_at)
		VALUES (1, ?, '测试案例摘要', '测试案例内容', '', 0, 1, datetime('now'), datetime('now'))
		ON CONFLICT(id) DO UPDATE SET
			title = excluded.title,
			summary = excluded.summary,
			content = excluded.content,
			updated_at = excluded.updated_at
	`, seedCaseTitle)
	if err != nil {
		log.Fatalf("[db-seed] Case 写入失败: %v", err)
	}
	log.Printf("[db-seed] Case title=%s", seedCaseTitle)

	// Message
	_, err = db.Exec(`
		INSERT INTO message (id, name, phone, email, company, content, status, created_at, updated_at)
		VALUES (1, ?, '13800000000', 'test@example.com', '测试公司', '测试留言内容', 'new', datetime('now'), datetime('now'))
		ON CONFLICT(id) DO UPDATE SET
			name = excluded.name,
			phone = excluded.phone,
			email = excluded.email,
			company = excluded.company,
			content = excluded.content,
			updated_at = excluded.updated_at
	`, seedMessageName)
	if err != nil {
		log.Fatalf("[db-seed] Message 写入失败: %v", err)
	}
	log.Printf("[db-seed] Message name=%s", seedMessageName)

	// SiteSetting
	_, err = db.Exec(`
		INSERT INTO site_setting (id, company_name, slogan, description, phone, email, address, logo_url, wechat_qr_url, created_at, updated_at)
		VALUES (1, ?, '测试标语', '测试网站描述', '010-12345678', 'info@test.com', '测试地址', '', '', datetime('now'), datetime('now'))
		ON CONFLICT(id) DO UPDATE SET
			company_name = excluded.company_name,
			slogan = excluded.slogan,
			description = excluded.description,
			phone = excluded.phone,
			email = excluded.email,
			address = excluded.address,
			updated_at = excluded.updated_at
	`, seedSiteSettingCompany)
	if err != nil {
		log.Fatalf("[db-seed] SiteSetting 写入失败: %v", err)
	}
	log.Printf("[db-seed] SiteSetting company_name=%s", seedSiteSettingCompany)

	log.Println("[db-seed] 完成。")
}
