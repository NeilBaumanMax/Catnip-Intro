# backend

当前完成 Phase 2E：Go + SQLite 数据库结构与读写验证。

⚠️ **后端技术栈已切换**：Node.js/Express/Prisma → Go + SQLite。

详细决策见：`dos/catnip-intro/docs/BACKEND_TECH_STACK_DECISION.md`

---

## Go backend（当前主路线）

### 技术栈

- Go 1.25.0
- net/http（标准库）
- database/sql（标准库）
- modernc.org/sqlite v1.53.0（纯 Go SQLite 驱动，无 CGO）

### 目录结构

```
backend/
├─ go.mod
├─ go.sum
├─ cmd/
│  ├─ server/
│  │  └─ main.go         # HTTP 入口，/health
│  ├─ db-seed/
│  │  └─ main.go         # 数据库写入验证
│  └─ db-check/
│     └─ main.go         # 数据库读取验证
├─ internal/
│  ├─ database/
│  │  ├─ database.go     # SQLite 连接管理
│  │  └─ schema.go       # 5 张表 DDL
│  └─ models/
│     ├─ admin.go
│     ├─ product.go
│     ├─ case.go
│     ├─ message.go
│     └─ site_setting.go
├─ src/                  # Node/Prisma 历史代码，保留不动
├─ prisma/               # Prisma schema，历史资料
└─ package.json          # Node 依赖声明，历史资料
```

### 命令

```bash
cd backend

# 启动 HTTP 服务
go run ./cmd/server

# 数据库验证
go run ./cmd/db-seed      # 写入测试数据（可重复执行）
go run ./cmd/db-check     # 读取并打印数据库内容
```

### 健康检查

开发服务监听：

- Host: `0.0.0.0`
- Port: `4000`

访问：

```text
http://localhost:4000/health
```

期望返回：

```json
{
  "ok": true,
  "message": "go backend is running"
}
```

### 当前允许

- 启动 Go backend。
- 访问 `GET /health`。
- 其他路径返回 404。

### 当前禁止

- 接入 SQLite。
- 实现登录接口。
- 实现产品/案例/留言/网站设置接口。
- 实现上传接口。
- 写任何前端页面。

---

## 历史 Node/Prisma 阶段（已完成，保留不动）

本目录中 Node/Prisma 代码为历史验证阶段产物，保留不动但不继续扩展。

## 技术栈

- Node.js
- Express
- TypeScript
- CORS
- Prisma 6.19.0
- SQLite

## 命令

```bash
npm install
npm run build
npm run dev
npm start

# Prisma
npm run prisma:generate   # 生成 Prisma Client
npm run prisma:push        # 同步 schema 到 SQLite（本地原型方案）
npm run prisma:migrate     # Prisma migrate（本机暂不可用）

# 数据库验证
npm run db:seed             # 写入测试数据
npm run db:check            # 读取并打印数据库内容
```

## 目录结构

```
src/
├── app.ts              # Express 入口
├── lib/
│   └── prisma.ts       # Prisma Client 连接单例
└── scripts/
    ├── seed.ts          # 数据库写入验证脚本
    └── check-db.ts      # 数据库读取验证脚本
```

## 数据库

数据库文件：`data/company.db`

- `prisma:generate` — 从 schema 生成 Prisma Client
- `prisma:push` — 直接同步 schema 到 SQLite，不生成 migration 历史文件（本机 `prisma migrate` 不可用时的本地原型方案）
- `db:seed` — 写入 5 表测试数据（upsert，可重复执行）
- `db:check` — 读取各表数量和样例数据

## 健康检查

开发服务监听：

- Host: `0.0.0.0`
- Port: `4000`

访问：

```text
http://localhost:4000/health
```

期望返回：

```json
{
  "ok": true,
  "message": "backend is running"
}
```

## 数据库迁移策略

本机 `prisma migrate dev` 不可用（返回空 `Schema engine error`），当前使用 `prisma db push` 作为本地原型 schema 同步方案。

详细评估见：`dos/catnip-intro/docs/DATABASE_MIGRATION_STRATEGY.md`

- `prisma db push`：本地原型方案，直接同步 schema 到 SQLite，不生成 migration 历史文件。
- 正式上线前需重新评估迁移体系（修复 migrate 或迁移到 Drizzle ORM）。

## 当前允许

- 启动后端服务。
- 访问 `GET /health`。
- 使用基础 CORS。
- 通过 Prisma Client 连接 SQLite。
- 执行 `db:seed` 和 `db:check` 验证数据库读写。

## 当前禁止

- 实现登录接口。
- 实现产品接口。
- 实现案例接口。
- 实现留言接口。
- 实现上传接口。
- 写任何前端页面。
