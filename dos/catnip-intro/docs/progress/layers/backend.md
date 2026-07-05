# backend layer progress

## 当前阶段

当前完成 Phase 4A：Go backend API 基础 + 管理员登录鉴权。

## 职责

Go backend 负责登录、产品、案例、留言、网站设置、图片上传和 uploads 静态访问。

## 当前进度（Go backend 主路线）

### Phase 2D：Go backend 最小骨架 ✅
### Phase 2E：Go + SQLite ✅
### Phase 3：uploads 图片上传与静态访问 ✅
### Phase 4A：API 基础 + 管理员登录鉴权 ✅
- 统一 JSON 响应格式（api.Response）。
- CORS 中间件（Allow-Origin: http://localhost:3000）。
- bcrypt 密码哈希（golang.org/x/crypto/bcrypt）。
- 内存 token store（crypto/rand 生成 32 字节随机 token）。
- POST /api/auth/login（200 / 401）。
- Bearer token 鉴权中间件（RequireAuth）。
- GET /api/admin/ping（受保护，验证鉴权）。

## 已完成接口

| 方法 | 路径 | 鉴权 | 说明 |
|------|------|------|------|
| GET | /health | 公开 | 健康检查 |
| POST | /api/auth/login | 公开 | 管理员登录 |
| POST | /api/uploads | 公开 | 图片上传 |
| GET | /uploads/... | 公开 | 静态文件访问 |
| GET | /api/admin/ping | Bearer token | 鉴权验证 |

## 新增依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| golang.org/x/crypto | v0.53.0 | bcrypt 密码哈希 |

## Node/Prisma（历史阶段，保留不动）

## 下一步

Phase 4B：Go backend 业务接口（产品/案例/留言/网站设置 CRUD）。
