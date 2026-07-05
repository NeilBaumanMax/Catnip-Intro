# backend layer progress

## 当前阶段

项目第一版交付。24 API 全部完成，Nginx 反向代理已配置。

## 技术栈

Go 1.25 + net/http + database/sql + modernc.org/sqlite + Nginx 1.26.2

## 已完成

- Phase 2D: 最小骨架 ✅
- Phase 2E: SQLite 接入 ✅
- Phase 3: uploads ✅
- Phase 4A: 登录鉴权 ✅
- Phase 4B: 产品/案例 API ✅
- Phase 4C: 留言/设置 API ✅
- Phase 7: 全站联调 + LAN CORS ✅
- SSE 轮播 ✅ (/api/carousel/tick, Go goroutine 4s 推送)
- Nginx 反向代理 ✅ (:8080 → :3000 + :4000)

## 24 个 API

公开: health, login, uploads, static, products×2, cases×2, messages, settings
鉴权: ping, products CRUD×4, cases CRUD×4, messages CRUD×4, settings upsert

## 文件结构

```
backend/
├── cmd/
│   ├── server/main.go       # HTTP 入口
│   ├── db-seed/main.go       # 数据库 seed
│   └── db-check/main.go      # 数据库 check
├── internal/
│   ├── api/                  # 统一响应
│   ├── auth/                 # 登录 + token
│   ├── middleware/            # CORS + Auth
│   ├── database/             # SQLite 连接 + schema
│   ├── models/               # 数据模型
│   ├── products/             # 产品 handler/service/repo
│   ├── cases/                # 案例 handler/service/repo
│   ├── messages/             # 留言 handler/service/repo
│   ├── settings/             # 设置 handler/service/repo
│   └── uploads/              # 上传 + 静态访问
└── go.mod
```

## Nginx

nginx.conf 配置反向代理，监听 :8080。
- / → :3000 (Next.js)
- /api/ → :4000 (Go)
- /uploads/ → :4000 (Go)

## 下一步

生产部署、HTTPS、migration 方案。
