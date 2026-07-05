# backend layer progress

## 当前阶段

当前完成 Phase 3：uploads 图片上传与静态访问。

## 职责

Go backend 负责登录、产品、案例、留言、网站设置、图片上传和 uploads 静态访问。

## 当前进度（Go backend 主路线）

### Phase 2D：Go backend 最小骨架 ✅
- go.mod、cmd/server/main.go（net/http）。
- `GET /health` → `{"ok":true,"message":"go backend is running"}`。

### Phase 2E：Go + SQLite ✅
- database/sql + modernc.org/sqlite v1.53.0。
- 5 张表 DDL（snake_case），db-seed/db-check 验证通过。

### Phase 3：uploads ✅
- `POST /api/uploads`：multipart/form-data，安全命名，5MB 限制。
- `GET /uploads/...`：http.FileServer 静态访问。
- 文件类型白名单（JPEG/PNG/WebP/SVG），MIME + 扩展名校验。
- 4 个子目录：products、cases、company、qrcode。
- 全部使用 Go 标准库，零额外依赖。

## 已完成接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /health | 健康检查 |
| POST | /api/uploads | 图片上传 |
| GET | /uploads/... | 静态文件访问 |

## Node/Prisma（历史阶段，保留不动）

- Phase 1-2B 代码完好保留。

## 下一步

Phase 4：Go backend 业务接口（登录鉴权 + 产品/案例/留言/网站设置 CRUD）。
