# backend layer progress

## 当前阶段

当前完成 Phase 2D：Go backend 最小骨架。

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

- 当前阶段已创建 Go backend 最小骨架。
- 当前阶段 Go backend 使用 net/http 标准库。
- Node/Prisma 历史代码保留不动。
- 后续阶段接入 SQLite、实现 API、鉴权、参数校验。

## 禁止

- 在 Phase 2D 接入 SQLite。
- 在 Phase 2D 实现业务接口。
- 删除现有 Node/Prisma 文件。
- 将真实图片保存到 SQLite。
- 让未鉴权请求访问后台管理接口。

## 当前进度

### 历史阶段（已完成，保留不动）

- Phase 1 已创建 Node.js + Express + TypeScript 最小后端骨架。
- Phase 2A 已接入 Prisma 6.19.0 + SQLite。
- Phase 2B 已创建 Prisma Client 单例、seed/check 脚本。

### Go backend 阶段

- Phase 2C 已创建 `BACKEND_TECH_STACK_DECISION.md`。
- Phase 2D 已创建 `backend/go.mod`（Go 1.24.5）。
- Phase 2D 已创建 `backend/cmd/server/main.go`（net/http，无第三方依赖）。
- Phase 2D `GET /health` 通过，返回 `{"ok":true,"message":"go backend is running"}`。
- Phase 2D 监听 `0.0.0.0:4000`，404 处理正常，Content-Type: application/json。

## Go backend 目录结构

```
backend/
├─ go.mod
├─ cmd/
│  └─ server/
│     └─ main.go        # 入口（已创建）
├─ internal/             # 内部包（后续扩展）
├─ src/                  # Node/Prisma 历史代码，保留不动
├─ prisma/               # Prisma schema，历史资料
└─ package.json          # Node 依赖声明，历史资料
```

## 下一步

Phase 2E：Go + SQLite 数据库结构与读写验证。
