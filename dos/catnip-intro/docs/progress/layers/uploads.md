# uploads layer progress

## 当前阶段

当前完成 Phase 3：uploads 图片上传与静态访问。

## 职责

uploads 负责保存真实图片文件，由 Go backend 提供上传接口和静态访问。

## 允许

- 保存后台上传的图片文件（JPEG、PNG、WebP、SVG）。
- 按分类组织子目录（products、cases、company、qrcode）。
- 由 Go backend 在 `0.0.0.0:4000` 提供静态访问。

## 禁止

- 保存数据库文件。
- 保存源码。
- 由 frontend 直接读写文件系统。

## 当前进度

- Phase 0 已创建 `uploads/README.md`。
- Phase 3 已创建 `backend/internal/uploads/handler.go`：
  - `POST /api/uploads`：multipart/form-data 上传，安全命名，5MB 限制。
  - `GET /uploads/...`：静态文件访问（net/http FileServer）。
- Phase 3 已创建子目录：products、cases、company、qrcode（含 .gitkeep）。
- Phase 3 .gitignore 已正确忽略上传图片，保留目录结构。
- Phase 3 上传→静态访问完整链路验证通过。
- Phase 3 文件类型白名单、category 校验、文件大小限制全部通过。

## 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/uploads | 上传图片（multipart/form-data） |
| GET | /uploads/... | 静态访问已上传图片 |

## 下一步

Phase 4：Go backend 业务接口（登录、产品、案例、留言、网站设置）。
