# DEV_PROGRESS

## 当前阶段

Phase 2E：Go + SQLite 数据库结构与读写验证。

## 当前状态

Phase 2E 测试通过。Go backend 已接入 SQLite（database/sql + modernc.org/sqlite），5 张表就位，db-seed/db-check 读写验证通过。

## 已完成

### Phase 0：工程脚手架 ✅
### Phase 1：Node backend 最小骨架 ✅（历史阶段）
### Phase 2A：Prisma + SQLite 基础接入 ✅（历史阶段）
### Phase 2B：数据库读写验证脚本 ✅（历史阶段）
### Phase 2C：数据库迁移方案评估 + 后端技术栈切换 ✅
### Phase 2D：Go backend 最小骨架 ✅

### Phase 2E：Go + SQLite 数据库结构与读写验证 ✅
- 安装 `modernc.org/sqlite`（纯 Go SQLite 驱动，无 CGO）。
- 创建 `backend/internal/database/database.go`（连接管理）。
- 创建 `backend/internal/database/schema.go`（5 张表 DDL）。
- 创建 `backend/internal/models/`（Admin、Product、Case、Message、SiteSetting 模型）。
- 创建 `backend/cmd/db-seed/main.go`（upsert 写入测试数据，ON CONFLICT 幂等）。
- 创建 `backend/cmd/db-check/main.go`（读取各表 count + 样例数据）。
- `data/company.db` 生成并通过读写验证。
- `GET /health` 仍然正常工作。
- Node/Prisma 历史文件未删除、未修改。

## 未完成

- 未实现 HTTP 业务接口（登录、产品、案例、留言、上传）。
- 未创建前端项目代码（Next.js）。

## 下一阶段

Phase 3：uploads 图片上传与静态访问，或 Phase 4：Go backend 业务接口。
