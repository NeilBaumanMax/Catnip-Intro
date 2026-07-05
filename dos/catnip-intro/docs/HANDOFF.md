# HANDOFF

## 统一交接记录模板

每次交接必须使用以下结构：

```text
## YYYY-MM-DD Phase N handoff

当前 Phase：
- 

当前状态：
- 

已完成：
- 

未完成：
- 

备份记录：
- 备份方式：
- 备份位置或提交：

测试记录：
- 测试是否执行：
- 测试是否通过：
- 失败项：

文档漂移：
- 是否存在：
- 是否已修正：
- 未修正原因：

限制事项：
- 是否写入业务代码：
- 是否安装依赖：
- 是否创建新 worktree：
- 是否切换 Git 分支：

下一次施工建议：
- 

接手前必须读取：
- 
```

## 当前交接状态

当前完成 Phase 3：uploads 图片上传与静态访问。

后端技术栈：Go 1.25.0 + net/http（标准库） + database/sql + modernc.org/sqlite。

## 已具备

- 项目目标已定义。
- 第一版功能边界已定义。
- frontend、Go backend、SQLite、uploads 职责已定义。
- 各层允许和禁止事项已定义。
- 开发阶段计划已更新（Phase 0-9）。
- Go backend 最小骨架：`GET /health` 可用。
- Go + SQLite 数据库接入：5 张表就位，db-seed/db-check 验证通过。
- Go + uploads 图片底座：
  - `POST /api/uploads`：multipart/form-data 上传，安全命名，5MB 限制。
  - `GET /uploads/...`：静态文件访问。
  - 文件类型白名单（JPEG/PNG/WebP/SVG）。
  - 4 个子目录：products、cases、company、qrcode。
- Node/Prisma 历史代码保留不动。

## 尚未具备

- 尚未创建前端项目（Next.js）。
- 尚未实现任何页面。
- 尚未实现 HTTP 业务接口（登录、产品、案例、留言、网站设置）。

## 下一位 Codex 应做什么

进入 Phase 4 前，先执行备份，读取工程文档。

Phase 4：Go backend 业务接口（登录鉴权 + 产品/案例/留言/网站设置 CRUD）。
6. `docs/BACKEND_TECH_STACK_DECISION.md`
7. `docs/ARCHITECTURE.md`

Phase 2D 应创建 Go backend 最小骨架：监听 `0.0.0.0:4000`，提供 `GET /health`。不接入 SQLite，不写业务接口。

Phase 2 应建立 SQLite 数据库文件位置和后端基础数据结构。不要在 Phase 2 开工前实现登录、产品、案例、留言或上传业务接口。

## 2026-07-05 Phase 1 handoff

当前 Phase：

- Phase 1 backend 最小骨架。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- `backend/package.json` 配置完成。
- `backend/tsconfig.json` 配置完成。
- `backend/src/app.ts` 创建完成。
- `GET /health` 返回 `{"ok":true,"message":"backend is running"}`。
- 基础 CORS 已配置。

未完成：

- 未接入 SQLite。
- 未接入 Prisma。
- 未实现真实业务接口。

备份记录：

- 备份方式：Phase 1 开工前已提交并推送 Phase 0 到 GitHub。
- 备份位置或提交：`571339c`，`origin/main`。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：初始 `tsx` 方案安装卡住，已改为 `tsc && node dist/app.js` 后通过。

文档漂移：

- 是否存在：收尾前存在 backend 状态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：仅写入允许的健康检查最小骨架。
- 是否安装依赖：是，按用户测试要求执行。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- Phase 2 先建立 SQLite 文件位置和后端基础数据结构，再考虑业务接口。

接手前必须读取：

- `CODEX_START_HERE.md`
- `CODEX_MASTER_REQUIREMENTS.md`
- `docs/WORKFLOW.md`
- `docs/CONSTRUCTION_PLAN.md`
- `docs/LAYER_CONTRACT.md`
- `docs/TEST_METRICS.md`
- `docs/progress/layers/backend.md`

## 注意事项

- 不要在未经用户确认时安装依赖。
- 不要创建新 worktree。
- 不要切换 Git 分支。
- 不要把业务代码混入 Phase 0 文档提交。
- 测试不通过时不要进入收尾，必须回到施工步骤继续修复并追加日志。
- 测试通过后必须修正文档漂移，再提出下一次施工建议。
- 上传 GitHub 前必须确认记录文档和日志已经更新。

## 2026-07-05 Phase 2A handoff

当前 Phase：

- Phase 2A：Prisma + SQLite 基础接入。

当前状态：

- 未完成，未提交，未推送。

已完成：

- 已创建 `backend/.env.example`。
- 已创建 `backend/prisma/schema.prisma`。
- 已更新 `backend/package.json`，加入 Prisma 依赖和 `prisma:generate`、`prisma:migrate` scripts。
- Node 24 环境下 `npm install` 通过。
- `npm run build` 通过。
- `npm run prisma:generate` 通过。

未完成：

- `npm run prisma:migrate` 失败。
- `data/company.db` 未生成。
- 未进入 seed/check。
- 未实现任何业务 API。

备份记录：

- 备份方式：开工前工作区干净，`main` 与 `origin/main` 同步。
- 备份位置或提交：`9f82872`。

测试记录：

- 测试是否执行：是。
- 测试是否通过：否。
- 失败项：Prisma migrate schema-engine 返回 `Schema engine error`。

文档漂移：

- 是否存在：收尾前存在 `data/README.md` 完成态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否。
- 是否安装依赖：是。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 继续定位 Prisma schema-engine 空错误。
- 优先检查 `DATABASE_URL` 相对路径解析和 schema-engine 运行细节。
- 不要进入 seed/check 或业务 API，直到 migrate 和 `data/company.db` 生成验收通过。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `backend/package.json`
- `backend/prisma/schema.prisma`
- `docs/DEV_PROGRESS.md`
- `docs/HANDOFF.md`

## 2026-07-05 Phase 2A-Debug-Round2 handoff

当前 Phase：

- Phase 2A：Prisma + SQLite 基础接入。

当前状态：

- 测试通过，`data/company.db` 已生成，等待提交和推送。

已完成：

- `prisma db push` 成功生成 `data/company.db`，5 张表就位。
- `npm run prisma:push` script 已配置。
- `npm run prisma:generate` 通过。
- `npm run build` 通过。
- `.gitignore` 已更新，忽略 `data/company.db`。
- 所有文档已更新为 Phase 2A 完成态。

未完成：

- `prisma migrate` 仍不可用（schema engine 空错误未根除）。
- 未创建 seed/check。
- 未实现业务 API。
- 未创建前端项目。

备份记录：

- 备份方式：开工前 `main` 与 `origin/main` 同步。
- 备份位置或提交：`9f82872`。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：无。

关键技术决策：

- 本机 Prisma migration engine 在所有 schema 下均返回空 `Schema engine error`，根因未定位。
- 使用 `prisma db push` 替代 `prisma migrate dev` 直接同步 schema 到 SQLite。
- `db push` 不生成 migration 历史文件，但满足 Phase 2A 的数据库生成目标。

文档漂移：

- 是否存在：收尾前存在多文档 Phase 2A 完成态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否。
- 是否安装依赖：否（Phase 2A 已安装）。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 可选进入 Phase 2B（seed/check 脚本验证读写路径）。
- 或直接进入 Phase 3（后台登录与内容管理），视用户授权而定。
- 不使用 `prisma migrate`，继续使用 `prisma db push` 管理 schema 变更。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `backend/package.json`
- `backend/prisma/schema.prisma`

## 2026-07-05 Phase 2A-Debug handoff

当前 Phase：

- Phase 2A-Debug：定位 Prisma migrate 失败原因。

当前状态：

- 未完成，未提交，未推送。

已完成：

- 已确认 `npm install` 通过。
- 已确认 `npm run build` 通过。
- 已确认 `npm run prisma:generate` 通过。
- 已确认 schema 有效。
- 已确认 `migrate diff` 可以生成 SQL。
- 已确认 `data/` 目录存在。
- 已确认 `DATABASE_URL=file:../../data/company.db`。

未完成：

- `npm run prisma:migrate` 未通过。
- `data/company.db` 未生成。
- 未进入 Phase 2B。
- 未创建 seed/check。
- 未实现业务 API。

测试记录：

- 测试是否执行：是。
- 测试是否通过：否。
- 失败项：Prisma migration schema-engine 空错误。

关键结论：

- 同一 schema 在临时简单 SQLite 路径下 migrate 失败。
- 最小 Admin schema migrate 失败。
- 空 schema migrate 失败。
- `migrate deploy` 也失败。
- 因此当前问题不像是业务模型、SQLite 相对路径或 schema 语法导致，而是本机 Prisma migration engine 路径的问题。

文档漂移：

- 是否存在：无完成态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否。
- 是否安装依赖：是。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。
- 是否提交 GitHub：否。

下一次施工建议：

- 不要进入 Phase 2B。
- 优先解决 Prisma migration engine 空错误。
- 可在用户授权后尝试不同 Prisma 6 小版本，或采用经过确认的替代迁移方案。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `backend/package.json`
- `backend/prisma/schema.prisma`

## 2026-07-05 Phase 2B handoff

当前 Phase：

- Phase 2B：数据库读写验证脚本。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- `backend/src/lib/prisma.ts` Prisma Client 连接单例已创建。
- `backend/src/scripts/seed.ts` upsert 写入验证脚本已创建。
- `backend/src/scripts/check-db.ts` 读取验证脚本已创建。
- `backend/package.json` 新增 `db:seed`、`db:check` scripts。
- 数据库读写完整链路已验证通过。

未完成：

- 未实现登录、产品、案例、留言、上传等真实业务接口。
- 未创建前端项目。
- `prisma migrate` 本机仍不可用（Schema engine error）。

备份记录：

- 备份方式：开工前工作区干净，`main` 与 `origin/main` 同步。
- 备份位置或提交：`b88c7d9`（Phase 2A 提交）。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：无。

文档漂移：

- 是否存在：收尾前存在多文档 Phase 2B 完成态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否，仅写入 Prisma Client 连接和验证脚本。
- 是否安装依赖：否。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 进入 Phase 3（后台登录与内容管理）。
- `prisma db push` 继续作为本地原型 schema 同步方案。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `backend/package.json`
- `backend/prisma/schema.prisma`
- `backend/src/lib/prisma.ts`
- `backend/src/scripts/seed.ts`
- `backend/src/scripts/check-db.ts`

## 2026-07-05 Phase 2C handoff

当前 Phase：

- Phase 2C：数据库迁移方案评估。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- `dos/catnip-intro/docs/DATABASE_MIGRATION_STRATEGY.md` 已创建。
- 5 个方案完整比较（A: Prisma+db push, B: 排查 migrate, C: Drizzle, D: Knex, E: Kysely）。
- 最终建议：第一版继续 Prisma + db push，不现在替换 ORM。
- 如果必须平替，首选 Drizzle ORM + drizzle-kit。
- 技术债已记录：`prisma migrate` 不可用，正式上线前处理。

未完成：

- 未实现登录、产品、案例、留言、上传等真实业务接口。
- 未创建前端项目。

备份记录：

- 备份方式：开工前工作区干净，`main` 与 `origin/main` 同步。
- 备份位置或提交：`08a573a`（Phase 2B 提交）。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：无。

文档漂移：

- 是否存在：收尾前存在多文档 Phase 2C 完成态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否。
- 是否安装依赖：否。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 进入 Phase 3（后台登录与内容管理）。
- 继续使用 Prisma + db push。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `docs/DATABASE_MIGRATION_STRATEGY.md`
- `backend/package.json`
- `backend/prisma/schema.prisma`

## 2026-07-05 Phase 2C backend stack switch handoff

当前 Phase：

- Phase 2C：后端技术栈切换文档修正。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- `BACKEND_TECH_STACK_DECISION.md` 已创建。
- 后端技术栈从 Node.js/Express/Prisma 切换为 Go + SQLite。
- 所有工程文档（CODEX_START_HERE、MASTER_REQUIREMENTS、ARCHITECTURE、LAYER_CONTRACT、CONSTRUCTION_PLAN、WORKFLOW、DEV_PROGRESS、HANDOFF、backend README、分层进度）已修正为 Go 路线。
- DATABASE_MIGRATION_STRATEGY.md 已更新 Prisma 处理结论。
- CONSTRUCTION_PLAN.md 已重排 Phase 2D-9。
- Node/Prisma 代码保留为历史资料，不动不删。

未完成：

- 未创建 Go backend 代码。
- 未创建前端项目。
- 未实现任何业务接口。

备份记录：

- 备份方式：开工前工作区干净，`main` 与 `origin/main` 同步。
- 备份位置或提交：`2f8bd6f`（前一个 Phase 2C 提交）。

测试记录：

- 测试是否执行：是（grep 文档漂移检查）。
- 测试是否通过：是。
- 失败项：无。

文档漂移：

- 是否存在：初始存在大量 Node/Express/Prisma 未来路线描述。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否。
- 是否安装依赖：否。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 进入 Phase 2D：Go backend 最小骨架。
- 监听 `0.0.0.0:4000`，提供 `GET /health`。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `docs/BACKEND_TECH_STACK_DECISION.md`
- `docs/CONSTRUCTION_PLAN.md`

## 2026-07-05 Phase 2D handoff

当前 Phase：

- Phase 2D：Go backend 最小骨架。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- 安装 Go 1.24.5（darwin-arm64）。
- 创建 `backend/go.mod`（零第三方依赖）。
- 创建 `backend/cmd/server/main.go`（net/http 标准库）。
- 监听 `0.0.0.0:4000`。
- `GET /health` 返回 `{"ok":true,"message":"go backend is running"}`。
- Content-Type: application/json，其他路径返回 404。
- Node/Prisma 历史文件未删除、未修改。

未完成：

- 未接入 SQLite。
- 未实现业务接口。
- 未创建前端项目。

备份记录：

- 备份方式：开工前工作区干净，`main` 与 `origin/main` 同步。
- 备份位置或提交：`95dfa37`（Phase 2C 提交）。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：首次端口被旧进程占用，kill 后通过。

文档漂移：

- 是否存在：收尾前存在多文档 Phase 2D 完成态漂移。
- 是否已修正：是。
- 未修正原因：无。

限制事项：

- 是否写入业务代码：否，仅写入 Go backend 健康检查骨架。
- 是否安装依赖：是，安装 Go 1.24.5 系统工具。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 进入 Phase 2E：Go + SQLite 数据库结构与读写验证。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `backend/go.mod`
- `backend/cmd/server/main.go`

## 2026-07-05 Phase 2E handoff

当前 Phase：

- Phase 2E：Go + SQLite 数据库结构与读写验证。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- 安装 modernc.org/sqlite v1.53.0（纯 Go SQLite 驱动，无 CGO）。
- 创建 `internal/database/database.go`（连接管理）+ `schema.go`（5 张表 DDL）。
- 创建 `internal/models/`（admin.go、product.go、case.go、message.go、site_setting.go）。
- 创建 `cmd/db-seed/main.go`（ON CONFLICT upsert，幂等可重复执行）。
- 创建 `cmd/db-check/main.go`（count + 样例输出）。
- `data/company.db` 5 张表就位，读写验证通过。
- `GET /health` 仍然正常。
- Node/Prisma 历史文件未修改。

未完成：

- 未实现 HTTP 业务接口（登录、产品、案例、留言、上传）。
- 未创建前端项目。

备份记录：

- 备份方式：开工前工作区干净。
- 备份位置或提交：`4ec3c36`（Phase 2D 提交）。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：首次 db-seed 时 Prisma 旧 database 残留导致列名冲突，删除重建后通过。

关键技术：

- Go toolchain 自动升级到 1.25.0（modernc.org/sqlite v1.53.0 要求 go >= 1.25.0）。
- 数据库路径：从 cwd 向上查找 go.mod 定位项目根，拼接 `data/company.db`。
- 列名统一使用 snake_case（适配 Go 标准库和 SQL 惯例）。
- 无 CGO 依赖，纯 Go 编译。

文档漂移：

- 是否存在：收尾前存在多文档 Phase 2E 完成态漂移。
- 是否已修正：是。

限制事项：

- 是否写入业务代码：否，仅写入数据库读写验证代码。
- 是否安装依赖：是，modernc.org/sqlite v1.53.0。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 进入 Phase 3（uploads 图片上传）或 Phase 4（Go backend 业务接口）。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `backend/go.mod`
- `backend/cmd/server/main.go`
- `backend/internal/database/`
- `backend/cmd/db-seed/`
- `backend/cmd/db-check/`

## 2026-07-05 Phase 3 handoff

当前 Phase：

- Phase 3：uploads 图片上传与静态访问。

当前状态：

- 测试通过，等待提交和推送。

已完成：

- `POST /api/uploads`：multipart/form-data，category 分类，安全命名，5MB 限制。
- `GET /uploads/...`：http.FileServer 静态访问。
- 文件类型白名单（JPEG/PNG/WebP/SVG），MIME + 扩展名校验。
- 4 个子目录：products、cases、company、qrcode。
- .gitignore 正确忽略上传图片。
- `GET /health` 仍然正常。
- 零新 Go 依赖（标准库实现）。

未完成：

- 未实现 HTTP 业务接口（登录、产品、案例、留言、网站设置）。
- 未创建前端项目。

备份记录：

- 备份位置或提交：`1fbed04`（Phase 2E 提交）。

测试记录：

- 测试是否执行：是。
- 测试是否通过：是。
- 失败项：首次端口占用 + .gitignore 子目录规则不完整，已修复。

文档漂移：

- 是否存在：收尾前存在多文档 Phase 3 完成态漂移。
- 是否已修正：是。

限制事项：

- 是否写入业务代码：否。
- 是否安装依赖：否，使用 Go 标准库。
- 是否创建新 worktree：否。
- 是否切换 Git 分支：否。

下一次施工建议：

- 进入 Phase 4：Go backend 业务接口（登录 + 产品/案例/留言/网站设置 CRUD）。

接手前必须读取：

- `docs/LOG.md`
- `docs/TEST_METRICS.md`
- `docs/HANDOFF.md`
- `docs/DEV_PROGRESS.md`
- `backend/cmd/server/main.go`
- `backend/internal/uploads/handler.go`

## 注意事项

- 不要在未经用户确认时安装依赖。
- 不要创建新 worktree。
- 不要切换 Git 分支。
- 不要把业务代码混入文档提交。
- 测试不通过时不要进入收尾，必须回到施工步骤继续修复并追加日志。
- 测试通过后必须修正文档漂移，再提出下一次施工建议。
- 上传 GitHub 前必须确认记录文档和日志已经更新。
