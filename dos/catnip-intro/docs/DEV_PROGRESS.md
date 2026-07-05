# DEV_PROGRESS

## 当前阶段

Phase 4A：Go backend API 基础 + 管理员登录鉴权。

## 当前状态

Phase 4A 测试通过。统一 JSON 响应、CORS、bcrypt 登录、token 鉴权中间件已实现。

## 已完成

### Phase 0-3 ✅
### Phase 4A：Go backend API 基础 + 管理员登录鉴权 ✅
- `internal/api/response.go`：统一 JSON 响应格式（WriteOK / WriteError）。
- `internal/auth/token_store.go`：内存 token store（crypto/rand + sync.RWMutex）。
- `internal/auth/service.go`：登录逻辑（bcrypt 密码校验 + token 生成）。
- `internal/auth/handler.go`：POST /api/auth/login handler。
- `internal/middleware/cors.go`：CORS 中间件（Allow-Origin: localhost:3000）。
- `internal/middleware/auth.go`：Bearer token 鉴权中间件（RequireAuth）。
- `cmd/server/main.go`：组装路由（公开/受保护），挂载 CORS 和鉴权。
- `cmd/db-seed/main.go`：默认管理员 admin/admin123456（bcrypt hash）。
- 新增依赖：`golang.org/x/crypto v0.53.0`（bcrypt）。

## 已完成接口

| 方法 | 路径 | 鉴权 | 说明 |
|------|------|------|------|
| GET | /health | 公开 | 健康检查 |
| POST | /api/auth/login | 公开 | 管理员登录 |
| POST | /api/uploads | 公开 | 图片上传 |
| GET | /uploads/... | 公开 | 静态文件访问 |
| GET | /api/admin/ping | **需 token** | 鉴权验证接口 |

## 未完成

- 产品 CRUD
- 案例 CRUD
- 留言接口
- 网站设置接口
- 前端页面

## 下一阶段

Phase 4B：Go backend 业务接口（产品/案例/留言/网站设置 CRUD）。
