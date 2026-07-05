# DEV_PROGRESS

## 当前阶段

Phase 3：uploads 图片上传与静态访问。

## 当前状态

Phase 3 测试通过。Go backend 已实现图片上传（POST /api/uploads）和静态文件访问（GET /uploads/...）。

## 已完成

### Phase 0：工程脚手架 ✅
### Phase 1：Node backend 最小骨架 ✅（历史阶段）
### Phase 2A：Prisma + SQLite 基础接入 ✅（历史阶段）
### Phase 2B：数据库读写验证脚本 ✅（历史阶段）
### Phase 2C：数据库迁移方案评估 + 后端技术栈切换 ✅
### Phase 2D：Go backend 最小骨架 ✅
### Phase 2E：Go + SQLite 数据库结构与读写验证 ✅

### Phase 3：uploads 图片上传与静态访问 ✅
- 创建 `backend/internal/uploads/handler.go`（上传 + 静态访问）。
- `POST /api/uploads`：multipart/form-data，安全随机命名，category 分类，5MB 限制。
- `GET /uploads/...`：http.FileServer 静态访问。
- 文件类型白名单（JPEG/PNG/WebP/SVG），MIME + 扩展名校验。
- uploads 子目录：products、cases、company、qrcode（含 .gitkeep）。
- .gitignore 正确忽略上传图片，保留目录结构。
- `GET /health` 仍然正常工作。

## 未完成

- 未实现 HTTP 业务接口（登录、产品、案例、留言、上传关联业务）。
- 未创建前端项目代码（Next.js）。

## 下一阶段

Phase 4：Go backend 业务接口（登录鉴权 + 产品/案例/留言/网站设置 CRUD）。
