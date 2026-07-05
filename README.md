# Catnipent — 本地 Agent 软硬件一体化

科霓朋特科技企业官网。第一版已完成 🎉

## 架构

Next.js (frontend) + Go (backend) + SQLite + uploads + Nginx

## 快速启动

```bash
# 推荐：Nginx 反向代理
./start-nginx.sh start       # :8080 → 前端 :3000 + 后端 :4000

# 或分别启动
cd backend && go run ./cmd/server           # 后端 :4000
cd frontend && npx next dev -p 3000         # 前端 :3000
```

**访问**：http://localhost:8080 (Nginx) 或 http://localhost:3000 (直连)

**后台**：http://localhost:3000/admin/login | 账号 `admin` / `admin123456`

## 目录

| 目录 | 说明 |
|------|------|
| `frontend/` | Next.js 16 前端（V2 玻璃风格） |
| `backend/` | Go API (24 endpoints) |
| `data/` | SQLite (不提交) |
| `uploads/` | 图片上传 (不提交) |
| `design-input/` | 设计资料包 |
| `dos/catnip-intro/` | 工程文档 |
| `nginx.conf` | Nginx 反向代理配置 |
