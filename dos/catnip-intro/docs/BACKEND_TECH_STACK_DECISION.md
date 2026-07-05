# BACKEND_TECH_STACK_DECISION

## 决策日期

2026-07-05

## 决策结论

**后端技术栈从 Node.js + Express + TypeScript + Prisma 切换为 Go + SQLite。**

## 旧后端方案

Node.js + Express + TypeScript + Prisma + SQLite

Phase 1 / Phase 2A / Phase 2B 均基于此方案完成：

- Phase 1：Node.js + Express + TypeScript 最小骨架，`GET /health` 可用。
- Phase 2A：Prisma 6.19.0 + SQLite schema，`data/company.db` 5 表就位。
- Phase 2B：Prisma Client seed/check 读写验证通过。

### 旧方案保留方式

- `backend/` 目录中已有 Node/Prisma 代码**不删除**。
- 作为历史验证阶段保留。
- `backend/README.md` 已标注为历史路线。
- 后续不再扩展 Node/Prisma 代码。

## 新后端方案

Go + SQLite + 本地 uploads

### 技术选型

| 层级 | 选择 | 说明 |
|------|------|------|
| HTTP 框架 | `net/http` 或 `Gin` | 由后续 Phase 决定 |
| 数据库驱动 | SQLite driver | 标准库或 `mattn/go-sqlite3` |
| ORM | 可选 `GORM` | 是否采用由后续 Phase 决定 |
| 图片存储 | 本地文件系统 | `uploads/` 目录 |
| 端口 | `4000` | 与旧方案保持一致 |
| 监听地址 | `0.0.0.0` | 支持局域网访问 |

### 新 Go 后端建议目录结构

```
backend/
├─ cmd/
│  └─ server/
│     └─ main.go
├─ internal/
│  ├─ config/
│  ├─ database/
│  ├─ models/
│  ├─ handlers/
│  ├─ middleware/
│  ├─ routes/
│  └─ services/
├─ go.mod
├─ go.sum
└─ README.md
```

注意：本阶段只写文档，不创建 Go 文件。

## 切换原因

1. **Prisma migrate dev 不可用**。本机 macOS + Node v24 环境下 Prisma schema-engine 持续返回空错误，已排查 2 轮未解决。详见 `DATABASE_MIGRATION_STRATEGY.md`。
2. **Prisma 是 Node 生态工具**。后端语言从 Node 切到 Go 后，Prisma 不再适用。
3. **Go 更适合本地独立站**。Go 编译为单一二进制，无运行时依赖，部署简单，适合本地/局域网场景。
4. **Go 直接处理 SQLite 更自然**。标准库或成熟的第三方驱动，无需 ORM 中间层即可高效操作 SQLite。

## Prisma 处理结论

1. Prisma 并不是独立站必须组件。
2. Prisma 是 Node/TypeScript 后端路线下的数据库工具。
3. 由于后端路线切换为 Go，Prisma 不再作为后续主路线。
4. Phase 2A / Phase 2B 的 Prisma 成果作为已验证资料保留，不继续扩展。
5. `prisma migrate dev` 失败问题记录为历史问题，不再阻塞项目。
6. 后续数据库迁移能力由 Go 后端方案重新设计。
7. `data/company.db` 仍然不提交 GitHub。
8. `backend/` 中现有 Node/Prisma 文件保留不动。

## 总架构

新总架构固定为：

```
frontend + Go backend + SQLite + uploads
```

- **frontend**：Next.js + TypeScript + Tailwind CSS，负责前台官网和后台管理页面。
- **Go backend**：负责接口服务、登录鉴权、产品管理、案例管理、留言管理、网站设置、图片上传、SQLite 读写。
- **SQLite**：本地数据库文件 `data/company.db`，不提交 GitHub。
- **uploads**：本地图片文件夹，保存真实图片文件。

## 数据流

1. 用户访问 frontend（Next.js 页面）。
2. frontend 调用 Go backend API。
3. Go backend 读写 SQLite。
4. Go backend 处理图片上传，将真实图片文件保存到 uploads。
5. SQLite 保存图片访问路径，不保存真实图片二进制内容。
6. frontend 通过 Go backend 暴露的静态路径访问 uploads 图片。

## 后续 Phase 2D 目标

Phase 2D：Go backend 最小骨架

1. 创建 Go 后端最小骨架。
2. 后端监听 `4000` 端口。
3. 支持 `0.0.0.0` 局域网访问。
4. 提供 `GET /health`。
5. 返回 JSON：`{"ok":true,"message":"go backend is running"}`
6. 不接入 SQLite。
7. 不写业务接口。
8. 不做 uploads。
9. 不修改 frontend。
