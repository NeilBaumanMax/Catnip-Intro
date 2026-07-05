# database layer progress

## 当前阶段

当前完成 Phase 2E：Go + SQLite 数据库结构与读写验证。

## 职责

SQLite 负责保存文字数据和图片路径。

## 数据实体

| 表名 | Go 模型 | 说明 |
|------|---------|------|
| admin | models.Admin | 管理员 |
| product | models.Product | 产品 |
| case_item | models.Case | 案例 |
| message | models.Message | 留言 |
| site_setting | models.SiteSetting | 网站设置 |

## 技术栈

- Go `database/sql`（标准库）
- `modernc.org/sqlite` v1.53.0（纯 Go SQLite 驱动，无 CGO）
- SQLite 3.x

## 当前进度

- Phase 2E 已通过 `internal/database/schema.go` 创建 5 张表（CREATE TABLE IF NOT EXISTS）。
- Phase 2E 已通过 `cmd/db-seed` 写入测试数据（ON CONFLICT upsert，幂等可重复执行）。
- Phase 2E 已通过 `cmd/db-check` 验证读写链路（count + 样例查询）。
- 数据库文件：`data/company.db`，不提交 GitHub。
- Prisma 历史 schema（`backend/prisma/schema.prisma`）保留作为参考。

## 下一步

Phase 3（uploads）或 Phase 4（Go backend 业务接口）：通过 Go HTTP handlers 读写数据库。
