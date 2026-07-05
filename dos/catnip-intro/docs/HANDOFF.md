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

当前完成 Phase 2B：数据库读写验证脚本。

## 已具备

- 项目目标已定义。
- 第一版功能边界已定义。
- frontend、backend、SQLite、uploads 职责已定义。
- 各层允许和禁止事项已定义。
- 开发阶段计划已定义。
- Codex 开工读取顺序已定义。
- Codex 收尾记录规则已定义。
- 测试和验收标准已定义。
- 标准施工流程已定义：备份、读档、写计划、施工日志、测试日志、失败回修、文档漂移修正、下次建议、上传 GitHub。
- backend 最小 Node.js + Express + TypeScript 骨架已创建。
- backend 健康检查接口 `GET /health` 已创建。
- backend 可以监听 `0.0.0.0:4000`。
- Prisma 6.19.0 + SQLite 已接入 backend。
- `data/company.db` 已生成，Admin、Product、Case、Message、SiteSetting 5 张表就位。
- `backend/src/lib/prisma.ts` Prisma Client 连接单例已创建。
- `backend/src/scripts/seed.ts` 数据库写入验证脚本已创建（upsert，可重复执行）。
- `backend/src/scripts/check-db.ts` 数据库读取验证脚本已创建。
- `db:seed` 和 `db:check` npm scripts 可用，读写链路已验证通过。

## 尚未具备

- 尚未选择前端技术栈。
- 尚未创建前端项目。
- 尚未实现任何页面。
- 尚未实现登录、产品、案例、留言、上传等真实业务接口。
- 尚未实现图片上传。
- `prisma migrate` 本机不可用（Schema engine error），使用 `prisma db push` 作为本地原型替代方案。

## 下一位 Codex 应做什么

进入 Phase 2 前，先执行备份：

1. 检查 Git 状态。
2. 优先将当前仓库状态备份到 GitHub。
3. 记录备份方式、备份提交或备份位置。

备份完成后读取：

1. `CODEX_START_HERE.md`
2. `CODEX_MASTER_REQUIREMENTS.md`
3. `docs/WORKFLOW.md`
4. `docs/CONSTRUCTION_PLAN.md`
5. `docs/LAYER_CONTRACT.md`

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

## 注意事项

- 不要在未经用户确认时安装依赖。
- 不要创建新 worktree。
- 不要切换 Git 分支。
- 不要把业务代码混入文档提交。
- 测试不通过时不要进入收尾，必须回到施工步骤继续修复并追加日志。
- 测试通过后必须修正文档漂移，再提出下一次施工建议。
- 上传 GitHub 前必须确认记录文档和日志已经更新。
