package main

import (
	"fmt"
	"log"

	"github.com/NeilBaumanMax/Catnip-Intro/backend/internal/database"
)

func main() {
	dbPath := database.DefaultDBPath()
	log.Printf("[db-check] 数据库路径: %s", dbPath)

	db, err := database.Open(dbPath)
	if err != nil {
		log.Fatalf("[db-check] 打开数据库失败: %v", err)
	}
	defer db.Close()

	fmt.Println("[db-check] 开始读取数据库 ...")
	fmt.Println()

	tables := []struct {
		name  string
		table string
	}{
		{"Admin", "admin"},
		{"Product", "product"},
		{"Case", "case_item"},
		{"Message", "message"},
		{"SiteSetting", "site_setting"},
	}

	for _, t := range tables {
		var count int
		if err := db.QueryRow("SELECT COUNT(*) FROM " + t.table).Scan(&count); err != nil {
			log.Fatalf("[db-check] 查询 %s 数量失败: %v", t.name, err)
		}
		fmt.Printf("%s 数量: %d\n", t.name, count)
	}

	fmt.Println()

	// At least one Product name
	row := db.QueryRow("SELECT name FROM product ORDER BY id ASC LIMIT 1")
	var productName string
	if err := row.Scan(&productName); err != nil {
		fmt.Printf("Product name: (无数据, err=%v)\n", err)
	} else {
		fmt.Printf("Product name: %s\n", productName)
	}

	// At least one Case title
	row = db.QueryRow("SELECT title FROM case_item ORDER BY id ASC LIMIT 1")
	var caseTitle string
	if err := row.Scan(&caseTitle); err != nil {
		fmt.Printf("Case title: (无数据, err=%v)\n", err)
	} else {
		fmt.Printf("Case title: %s\n", caseTitle)
	}

	fmt.Println()
	fmt.Println("[db-check] 完成。")
}
