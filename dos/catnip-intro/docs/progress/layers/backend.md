# backend layer progress

## 当前阶段

当前完成 Phase 2C：后端技术栈切换文档修正。

后端技术栈已从 Node.js/Express/Prisma 切换为 Go + SQLite。

## 职责

Go backend 负责登录、产品、案例、留言、网站设置、图片上传和 uploads 静态访问。

第一版接口范围：

- 登录接口
- 产品接口
- 案例接口
- 留言接口
- 网站设置接口
- 图片上传接口
- uploads 静态文件访问

## 允许

- 当前阶段已明确 Go backend 为后续主路线。
- 当前阶段 Node/Prisma 代码保留为历史资料。
- 后续阶段实现 Go API、鉴权、参数校验、SQLite 读写和静态文件访问。

## 禁止

- 在 Phase 2C 写任何代码（Node 或 Go）。
- 删除现有 Node/Prisma 文件。
- 将真实图片保存到 SQLite。
- 让未鉴权请求访问后台管理接口。

## 当前进度

### 历史阶段（已完成，保留不动）

- Phase 0 已创建 `backend/README.md`。
- Phase 1 已创建 Node.js + Express + TypeScript 最小后端骨架，`GET /health` 可用。
- Phase 2A 已接入 Prisma 6.19.0 + SQLite，`data/company.db` 5 表就位。
- Phase 2B 已创建 Prisma Client 单例、seed/check 脚本，读写链路验证通过。

### 当前阶段

- Phase 2C 已创建 `BACKEND_TECH_STACK_DECISION.md`。
- Phase 2C 所有工程文档已修正为 Go backend 路线。
- 注意：`prisma migrate` 不可用问题已记录为历史问题，不再阻塞项目。

## 新 Go 后端建议目录结构

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

## 下一步

Phase 2D：Go backend 最小骨架。创建 Go 项目，监听 `0.0.0.0:4000`，提供 `GET /health`。
