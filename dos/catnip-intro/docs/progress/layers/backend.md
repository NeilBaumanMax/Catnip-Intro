# backend layer progress

## 当前阶段

当前完成 Phase 2E：Go + SQLite 数据库结构与读写验证。

## 职责

Go backend 负责登录、产品、案例、留言、网站设置、图片上传和 uploads 静态访问。

## 允许

- 当前阶段 Go backend 已接入 SQLite。
- 当前阶段已通过 db-seed/db-check 验证读写路径。
- Node/Prisma 历史代码保留不动。
- 后续阶段实现 HTTP 业务接口和鉴权。

## 禁止

- 将真实图片保存到 SQLite。
- 让未鉴权请求访问后台管理接口。
- 删除现有 Node/Prisma 文件。

## 当前进度

### Go backend（当前主路线）

- Phase 2D 已创建 Go 项目骨架（go.mod、cmd/server/main.go）。
- Phase 2D `GET /health` 可用，net/http 标准库。
- Phase 2E 已安装 `modernc.org/sqlite`（v1.53.0，纯 Go，无 CGO）。
- Phase 2E 已创建 `internal/database/database.go` + `schema.go`。
- Phase 2E 已创建 `internal/models/`（admin.go、product.go、case.go、message.go、site_setting.go）。
- Phase 2E 已创建 `cmd/db-seed/main.go`（ON CONFLICT upsert，幂等可重复执行）。
- Phase 2E 已创建 `cmd/db-check/main.go`（count 查询 + 样例输出）。
- Phase 2E `data/company.db` 5 张表就位，读写验证通过。
- Phase 2E `GET /health` 仍然正常返回。

### Node/Prisma（历史阶段，保留不动）

- Phase 1-2B 代码完好保留。
```

## 下一步

Phase 3 或 Phase 4：实现 Go backend HTTP 业务接口（登录、产品、案例、留言、网站设置）。
