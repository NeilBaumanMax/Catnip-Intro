# data

当前完成 Phase 2E：Go + SQLite 数据库结构与读写验证。

数据库文件已通过 Go backend 生成：

```text
data/company.db
```

## 技术栈

- Go `database/sql` + `modernc.org/sqlite`（纯 Go，无 CGO）
- SQLite 3.x

## 数据表

| 表名 | 实体 | 说明 |
|------|------|------|
| admin | Admin | 管理员 |
| product | Product | 产品 |
| case_item | Case | 案例（避免 SQL 关键字） |
| message | Message | 留言 |
| site_setting | SiteSetting | 网站设置 |

## SQLite 职责

SQLite 负责保存：

- Admin
- Product
- Case
- Message
- SiteSetting
- 图片路径

SQLite 不负责保存真实图片文件。真实图片文件应保存到 `uploads/`。

## 验证命令

```bash
cd backend
go run ./cmd/db-seed     # 写入测试数据（可重复执行）
go run ./cmd/db-check    # 读取验证
```

数据库文件属于本地运行产物，不提交到 GitHub（`.gitignore` 已忽略）。
