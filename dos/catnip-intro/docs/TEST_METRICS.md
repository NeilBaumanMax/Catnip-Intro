# TEST_METRICS

## 当前阶段

当前只完成 Phase 0：工程脚手架。

## 统一测试记录模板

每次测试记录必须使用以下结构：

```text
## YYYY-MM-DD Phase N test title

测试范围：
- 

测试前置条件：
- 已备份：
- 已读取文档：
- 已写开工计划：

测试项目：
1. 项目：
   检查方式：
   结果：
   失败原因：
   修复记录：
   重新测试结果：

统计：
- 通过数量：
- 失败数量：
- 失败项：
- 是否存在文档漂移：
- 是否已修正文档漂移：
- 是否允许提交本次结果：
- 是否允许进入下一 Phase：
```

## Phase 0 验收标准

1. `dos/catnip-intro/CODEX_START_HERE.md` 存在。
2. `dos/catnip-intro/CODEX_MASTER_REQUIREMENTS.md` 存在。
3. `docs` 下所有工程文档存在。
4. `frontend`、`backend`、`data`、`uploads` 四个目录存在。
5. 每个基础目录都有 `README.md`。
6. 文档明确当前只完成 Phase 0。
7. 没有创建业务代码。
8. 没有安装依赖。
9. 没有创建新 worktree。
10. 没有切换 Git 分支。

## Phase 0 验收结果

- 通过数量：10
- 失败数量：0
- 结论：Phase 0 验收通过，可以进入 Phase 1。

验收记录：

1. `dos/catnip-intro/CODEX_START_HERE.md` 存在：通过。
2. `dos/catnip-intro/CODEX_MASTER_REQUIREMENTS.md` 存在：通过。
3. `docs` 下所有工程文档存在：通过。
4. `frontend`、`backend`、`data`、`uploads` 四个目录存在：通过。
5. 每个基础目录都有 `README.md`：通过。
6. 文档明确当前只完成 Phase 0：通过。
7. 没有创建业务代码：通过。
8. 没有安装依赖：通过。
9. 没有创建新 worktree：通过。
10. 没有切换 Git 分支：通过。

## Phase 0 工作流调整验收标准

1. 文档明确开工前先备份。
2. 文档明确备份后再读取相关文件。
3. 文档明确施工前写本次开工计划。
4. 文档明确施工过程中写日志。
5. 文档明确施工结束后测试并写测试日志。
6. 文档明确测试不通过时回到施工继续修复并继续写日志。
7. 文档明确测试通过后写记录文档、写日志、修正施工文档并处理文档漂移。
8. 文档明确提出下一次施工建议。
9. 文档明确最后上传 GitHub。
10. 文档仍明确当前只完成 Phase 0。

## Phase 0 工作流调整验收结果

- 通过数量：10
- 失败数量：0
- 结论：工作流调整验收通过。

验收记录：

1. 文档明确开工前先备份：通过。
2. 文档明确备份后再读取相关文件：通过。
3. 文档明确施工前写本次开工计划：通过。
4. 文档明确施工过程中写日志：通过。
5. 文档明确施工结束后测试并写测试日志：通过。
6. 文档明确测试不通过时回到施工继续修复并继续写日志：通过。
7. 文档明确测试通过后写记录文档、写日志、修正施工文档并处理文档漂移：通过。
8. 文档明确提出下一次施工建议：通过。
9. 文档明确最后上传 GitHub：通过。
10. 文档仍明确当前只完成 Phase 0：通过。

## Phase 0 脚手架流程修正 24 项验收结果

- 通过数量：24
- 失败数量：0
- 失败项：无。
- 是否存在文档漂移：当前不存在；验收初始发现部分门禁和模板缺失。
- 是否已修正文档漂移：是。
- 是否允许提交本次 Phase 0 脚手架流程修正：是。
- 是否允许进入 Phase 1：本轮不允许；必须由用户明确授权后，按新流程先备份、读档、写计划。

验收记录：

1. `CODEX_START_HERE.md` 明确写了开工前先备份：通过。
2. `CODEX_START_HERE.md` 明确写了开工前必须读取对应文档：通过。
3. `WORKFLOW.md` 明确写了完整闭环：备份、读文档、写计划、施工、写日志、测试、测试失败修复、测试通过记录、修正文档漂移、提交 GitHub：通过。
4. `WORKFLOW.md` 明确写了没有计划不允许施工：通过。
5. `WORKFLOW.md` 明确写了没有测试不算完成：通过。
6. `WORKFLOW.md` 明确写了测试不通过不允许进入下一 Phase：通过。
7. `WORKFLOW.md` 明确写了测试失败后要记录日志，再回去修复，再重新测试：通过。
8. `LOG.md` 有统一日志模板：通过。
9. `TEST_METRICS.md` 有统一测试记录模板：通过。
10. `HANDOFF.md` 有交接记录模板：通过。
11. `CONSTRUCTION_PLAN.md` 每个 Phase 都包含开工、施工、测试、失败处理、收尾：通过。
12. `DEV_PROGRESS.md` 能记录当前 Phase 状态：通过。
13. 文档中明确禁止创建新 worktree：通过。
14. 文档中明确禁止切换 Git 分支：通过。
15. 文档中明确禁止直接进入业务代码：通过。
16. 文档中明确 frontend 不能直接操作 SQLite：通过。
17. 文档中明确 frontend 不能直接写 uploads：通过。
18. 没有修改 frontend 业务代码：通过。
19. 没有修改 backend 业务代码：通过。
20. 没有安装依赖：通过。
21. 没有创建 `package.json`：通过。
22. 没有创建 `node_modules`：通过。
23. 没有创建新 worktree：通过。
24. 没有切换 Git 分支：通过。

## 后续测试方向

Phase 1：

- 前端项目能启动。
- 后端项目能启动。
- 基础健康检查可访问。
- README 中启动命令有效。

Phase 2：

- SQLite 文件位置正确。
- 数据结构符合 Admin、Product、Case、Message、SiteSetting。
- 后端能连接 SQLite。

Phase 3 以后：

- 登录鉴权有效。
- 后台管理增删改查有效。
- 前台页面能展示数据。
- 图片上传能保存真实文件并返回可访问 URL。

## 2026-07-05 Phase 1 backend minimal skeleton test

测试范围：

- backend Node.js + Express + TypeScript 最小骨架。
- `GET /health` 健康检查接口。

测试前置条件：

- 已备份：是，Phase 0 已提交并推送到 GitHub，提交 `571339c`。
- 已读取文档：是。
- 已写开工计划：是。

测试项目：

1. 项目：`cd backend && npm install`
   检查方式：命令退出码。
   结果：通过。
   失败原因：初始 `tsx` 方案安装卡住。
   修复记录：移除 `tsx`，将 `dev` 改为 `tsc && node dist/app.js`。
   重新测试结果：通过。

2. 项目：`cd backend && npm run build`
   检查方式：TypeScript 编译。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`cd backend && npm run dev`
   检查方式：服务启动日志。
   结果：通过，服务监听 `http://0.0.0.0:4000`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

4. 项目：访问 `http://localhost:4000/health`
   检查方式：`curl -sS http://localhost:4000/health`。
   结果：通过，返回 `{"ok":true,"message":"backend is running"}`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

统计：

- 通过数量：4
- 失败数量：0
- 失败项：无最终失败项；初始安装卡住已修复。
- 是否存在文档漂移：收尾前存在 backend 状态漂移。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 1 完成后可以建议进入 Phase 2，但必须由用户明确授权。

## 2026-07-05 Phase 2A Prisma SQLite foundation test

测试范围：

- backend Prisma + SQLite schema。
- Prisma Client generate。
- Prisma migrate 生成 `data/company.db`。

测试前置条件：

- 已备份：是，开工前 `main` 与 `origin/main` 干净同步，备份提交 `9f82872`。
- 已读取文档：是。
- 已写开工计划：是。
- 当前 Node：`v24.16.0`，通过显式 PATH 使用 `/Users/neil/devtools/nodejs/bin/node`。

测试项目：

1. 项目：`cd backend && npm install`
   检查方式：命令退出码。
   结果：通过。
   失败原因：初始命令实际使用 Node v26，已中止。
   修复记录：显式使用 Node 24 PATH 后重新安装。
   重新测试结果：通过。

2. 项目：`cd backend && npm run build`
   检查方式：TypeScript 编译。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`cd backend && npm run prisma:generate`
   检查方式：Prisma Client 生成。
   结果：通过。
   失败原因：无。
   修复记录：Prisma 6.19.0 下通过。
   重新测试结果：通过。

4. 项目：`cd backend && npm run prisma:migrate`
   检查方式：Prisma migrate。
   结果：失败。
   失败原因：Prisma schema engine 返回 `Schema engine error`，未输出具体原因。
   修复记录：验证 schema 有效，将 Prisma 从 5.22.0 升级到 6.19.0 后重试。
   重新测试结果：失败。

5. 项目：确认 `data/company.db` 是否生成
   检查方式：文件存在性。
   结果：失败。
   失败原因：migrate 未通过。
   修复记录：无。
   重新测试结果：无。

统计：

- 通过数量：3
- 失败数量：2
- 失败项：`npm run prisma:migrate`、`data/company.db` 生成。
- 是否存在文档漂移：收尾前存在 `data/README.md` 完成态漂移。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：否。
- 是否允许进入下一 Phase：否。

## 2026-07-05 Phase 2A-Debug Prisma migrate failure test

测试范围：

- Prisma migrate 失败原因定位。
- 不执行 seed/check，不新增业务 API。

测试前置条件：

- 当前工作区保留 Phase 2A 未完成改动：是。
- 当前分支是 `main`：是。
- 未创建新 worktree：是。
- 当前 Node：`v24.16.0`。
- 当前 npm：`11.13.0`。
- 本地 Prisma：`6.19.0`。

测试项目：

1. 项目：开工诊断
   检查方式：`pwd`、`git status`、`node -v`、`npm -v`、`npx prisma -v`、目录和文件内容检查。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：`DEBUG="prisma:*" npx prisma migrate dev`
   检查方式：调试输出。
   结果：失败。
   失败原因：schema-engine 返回空的 `Schema engine error`。
   修复记录：继续隔离路径、schema 和 engine。
   重新测试结果：失败。

3. 项目：`prisma migrate diff`
   检查方式：从 schema 生成 SQL。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

4. 项目：临时 schema migrate
   检查方式：临时相同 schema、最小 Admin schema、空 schema。
   结果：失败。
   失败原因：均返回空的 `Schema engine error`。
   修复记录：确认问题不是业务模型、SQLite 相对路径或 schema 语法。
   重新测试结果：失败。

5. 项目：`migrate diff` + `migrate deploy`
   检查方式：临时迁移目录。
   结果：失败。
   失败原因：`migrate deploy` 仍返回空的 `Schema engine error`。
   修复记录：无，达到修复轮次限制。
   重新测试结果：失败。

6. 项目：`data/company.db`
   检查方式：文件存在性。
   结果：失败。
   失败原因：migrate 未通过。
   修复记录：无。
   重新测试结果：无。

统计：

- 通过数量：2
- 失败数量：4
- 失败项：`migrate dev`、临时 schema migrate、`migrate deploy`、`data/company.db` 生成。
- 是否存在文档漂移：不存在完成态漂移；Phase 2A 仍未完成。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：否。
- 是否允许进入下一 Phase：否。

## 2026-07-05 Phase 2A-Debug Round 2 test

测试范围：

- `prisma db push` 替代 `prisma migrate` 生成 `data/company.db`。
- Prisma Client generate 和 TypeScript build。

测试前置条件：

- 已备份：是，开工前 `main` 与 `origin/main` 干净同步，备份提交 `9f82872`。
- 已读取文档：是。
- 已写开工计划：是。
- 当前 Node：`v24.16.0`。
- 当前 Prisma：`6.19.0`。

测试项目：

1. 项目：`prisma db push`
   检查方式：命令输出和退出码。
   结果：通过，输出 "SQLite database company.db created"。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：`npm run prisma:push`
   检查方式：npm script 执行。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`data/company.db` 文件存在性
   检查方式：`ls -la` 和 `sqlite3 .tables`。
   结果：通过，32768 字节，Admin、Case、Message、Product、SiteSetting 5 张表就位。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

4. 项目：sqlite3 schema 验证
   检查方式：`sqlite3 .schema` 与 `prisma/schema.prisma` 对比。
   结果：通过，表结构一致。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

5. 项目：`npm run prisma:generate`
   检查方式：Prisma Client 生成。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

6. 项目：`npm run build`
   检查方式：TypeScript 编译。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

统计：

- 通过数量：6
- 失败数量：0
- 失败项：无。
- 是否存在文档漂移：存在，多份文档需从 Phase 2A 未完成更新为完成态。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 2A 完成后可建议进入 Phase 2B 或 Phase 3，但须由用户明确授权。

## 2026-07-05 Phase 2B database read/write verification test

测试范围：

- Prisma Client 连接和 seed/check 读写验证脚本。

测试前置条件：

- 已备份：是，开工前工作区干净，`main` 与 `origin/main` 同步，备份提交 `b88c7d9`。
- 已读取文档：是。
- 已写开工计划：是。
- 当前 Node：`v24.16.0`。
- 当前 Prisma：`6.19.0`。

测试项目：

1. 项目：`npm run build`
   检查方式：TypeScript 编译。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：`npm run prisma:generate`
   检查方式：Prisma Client 生成。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`npm run prisma:push`
   检查方式：schema 同步到数据库。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

4. 项目：`npm run db:seed`
   检查方式：写入 5 条测试数据。
   结果：通过，Admin/Product/Case/Message/SiteSetting 各 1 条。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

5. 项目：`npm run db:check`
   检查方式：读取各表数量和样例。
   结果：通过，Admin 1 / Product 1 / Case 1 / Message 1 / SiteSetting 1，Product name `__seed_product`，Case title `__seed_case`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

6. 项目：seed 可重复执行
   检查方式：再次 `db:seed` 后 `db:check`，数量仍为 1。
   结果：通过，upsert 策略有效。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

7. 项目：`data/company.db` 不被 Git 跟踪
   检查方式：`git status`。
   结果：通过，`data/company.db` 不在输出中。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

统计：

- 通过数量：7
- 失败数量：0
- 失败项：无。
- 是否存在文档漂移：存在，多份文档需更新为 Phase 2B 完成态。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 2B 完成后可建议进入 Phase 3，但须由用户明确授权。

## 2026-07-05 Phase 2C database migration strategy evaluation test

测试范围：

- 数据库迁移方案评估（文档阶段）。
- 基线验证测试（不修改业务代码）。

测试前置条件：

- 已备份：是，开工前工作区干净，`main` 与 `origin/main` 同步，备份提交 `08a573a`。
- 已读取文档：是。
- 已写开工计划：是。

测试项目：

1. 项目：`npm run build`
   检查方式：TypeScript 编译。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：`npm run prisma:generate`
   检查方式：Prisma Client 生成。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`npm run prisma:push`
   检查方式：schema 同步。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

4. 项目：`npm run db:check`
   检查方式：数据库读取验证。
   结果：通过，Admin 1 / Product 1 / Case 1 / Message 1 / SiteSetting 1。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

5. 项目：DATABASE_MIGRATION_STRATEGY.md 存在
   检查方式：文件存在性。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

6. 项目：未修改业务代码
   检查方式：`git status` 确认只包含文档修改。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

统计：

- 通过数量：6
- 失败数量：0
- 失败项：无。
- 是否存在文档漂移：存在，多份文档需更新为 Phase 2C 完成态。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 2C 完成后建议进入 Phase 3，须由用户明确授权。

## 2026-07-05 Phase 2C backend stack switch test

测试范围：

- 后端技术栈切换文档修正（Go 替代 Node/Express/Prisma）。

测试前置条件：

- 已备份：是，开工前工作区干净，`main` 与 `origin/main` 同步，备份提交 `2f8bd6f`。
- 已读取文档：是。
- 已写开工计划：是。

测试项目：

1. 项目：BACKEND_TECH_STACK_DECISION.md 存在
   检查方式：文件存在性。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：ARCHITECTURE.md 已改为 frontend + Go backend + SQLite + uploads
   检查方式：grep "Go backend" ARCHITECTURE.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：LAYER_CONTRACT.md 已明确 Go backend 是数据读写唯一入口
   检查方式：grep "Go backend" LAYER_CONTRACT.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

4. 项目：CONSTRUCTION_PLAN.md 已重排 Phase 2D-9
   检查方式：grep "Phase 2D" CONSTRUCTION_PLAN.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

5. 项目：HANDOFF.md 已明确下一阶段是 Phase 2D
   检查方式：grep "Phase 2D" HANDOFF.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

6. 项目：DEV_PROGRESS.md 已更新当前阶段
   检查方式：grep "Phase 2C" DEV_PROGRESS.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

7. 项目：backend/README.md 已标注 Node/Prisma 为历史路线
   检查方式：grep "历史" backend/README.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

8. 项目：CODEX_START_HERE 和 MASTER_REQUIREMENTS 已改为 Go
   检查方式：grep "Go backend" CODEX_START_HERE.md CODEX_MASTER_REQUIREMENTS.md。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

9. 项目：不修改业务代码、不创建 Go 文件、不删除 Node/Prisma 文件
   检查方式：`git status` 确认只包含文档修改。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

10. 项目：grep 验证无文档漂移
    检查方式：`grep -rn "Express\|Prisma.*后端\|Node\.js.*后端" dos/catnip-intro/` 确认无将 Node/Express/Prisma 作为未来主路线的描述。
    结果：通过，仅剩历史记录和 DATABASE_MIGRATION_STRATEGY 的评估内容。
    失败原因：无。
    修复记录：无。
    重新测试结果：无需重测。

统计：

- 通过数量：10
- 失败数量：0
- 失败项：无。
- 是否存在文档漂移：否。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 2C 完成后建议进入 Phase 2D，须由用户明确授权。

## 2026-07-05 Phase 2D Go backend minimal skeleton test

测试范围：

- Go backend 最小骨架（net/http，无第三方依赖）。
- `GET /health` 健康检查接口。

测试前置条件：

- 已备份：是，开工前工作区干净，备份提交 `95dfa37`。
- 已读取文档：是。
- 已写开工计划：是。
- Go 1.24.5 已安装（从 golang.org 下载到 ~/devtools/go）。

测试项目：

1. 项目：`go mod tidy`
   检查方式：命令退出码，无错误。
   结果：通过，零第三方依赖。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：`go test ./...`
   检查方式：命令退出码。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`go run ./cmd/server`
   检查方式：服务启动日志。
   结果：通过，输出 "Go backend listening on http://0.0.0.0:4000"。
   失败原因：首次测试端口被旧 server 进程占用（PID 53101）。
   修复记录：`kill 53101` 释放端口后重新测试。
   重新测试结果：通过。

4. 项目：`curl http://localhost:4000/health`
   检查方式：返回内容。
   结果：通过，返回 `{"ok":true,"message":"go backend is running"}`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

5. 项目：`curl http://localhost:4000/other`（404 测试）
   检查方式：HTTP 状态码。
   结果：通过，返回 404。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

6. 项目：Content-Type 验证
   检查方式：`curl -w "%{content_type}"`。
   结果：通过，`application/json`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

7. 项目：Node/Prisma 历史文件未修改
   检查方式：`ls -la src/app.ts prisma/schema.prisma package.json`。
   结果：通过，三个文件完好存在。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

8. 项目：零第三方 Go 依赖
   检查方式：`go.mod` 中无 `require` 块。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

统计：

- 通过数量：8
- 失败数量：0
- 失败项：无最终失败项；首次端口占用已修复。
- 是否存在文档漂移：存在，多份文档需更新为 Phase 2D 完成态。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 2D 完成后建议进入 Phase 2E，须由用户明确授权。

## 2026-07-05 Phase 2E Go SQLite database verification test

测试范围：

- Go + database/sql + modernc.org/sqlite 数据库接入。
- db-seed 写入验证 + db-check 读取验证。
- /health 仍然正常。

测试前置条件：

- 已备份：是，备份提交 `4ec3c36`。
- 已读取文档：是。
- 已写开工计划：是。
- Go 1.25.0 toolchain + modernc.org/sqlite v1.53.0。

测试项目：

1. 项目：`go mod tidy`
   检查方式：退出码。
   结果：通过，modernc.org/sqlite v1.53.0 下载成功。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

2. 项目：`go test ./...`
   检查方式：退出码。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

3. 项目：`go run ./cmd/db-seed`（首次，删除旧库后）
   检查方式：写入 5 条测试数据。
   结果：通过。
   失败原因：首次存在 Prisma 旧 database（camelCase 列名），CREATE TABLE IF NOT EXISTS 跳过建表。
   修复记录：`rm data/company.db` 后重新运行。
   重新测试结果：通过。

4. 项目：`go run ./cmd/db-check`
   检查方式：读取各表 count + 样例。
   结果：通过，Admin 1 / Product 1 / Case 1 / Message 1 / SiteSetting 1，Product name `__seed_product`，Case title `__seed_case`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

5. 项目：seed 可重复执行
   检查方式：再次 db-seed 后 db-check，数量保持 1。
   结果：通过，ON CONFLICT upsert 幂等。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

6. 项目：`curl /health`
   检查方式：`go run ./cmd/server` 后 curl。
   结果：通过，`{"ok":true,"message":"go backend is running"}`。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

7. 项目：`data/company.db` 不被 Git 跟踪
   检查方式：`git ls-files`。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

8. 项目：Node/Prisma 历史文件未修改
   检查方式：文件时间戳和内容。
   结果：通过。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

9. 项目：使用 database/sql + modernc.org/sqlite
   检查方式：go.mod 依赖列表。
   结果：通过，未引入 GORM/Gin/mattn/go-sqlite3。
   失败原因：无。
   修复记录：无。
   重新测试结果：无需重测。

10. 项目：表结构使用 snake_case 列名
    检查方式：SQL DDL 和模型定义。
    结果：通过。
    失败原因：无。
    修复记录：无。
    重新测试结果：无需重测。

统计：

- 通过数量：10
- 失败数量：0
- 失败项：无最终失败项；首次 Prisma 旧库冲突已修复。
- 是否存在文档漂移：存在，多份文档需更新为 Phase 2E 完成态。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 2E 完成后建议进入 Phase 3 或 Phase 4，须由用户明确授权。

## 2026-07-05 Phase 3 uploads static access test

测试范围：

- POST /api/uploads 图片上传和 GET /uploads/ 静态访问。
- Go 标准库 net/http 实现。

测试前置条件：

- 已备份：是，备份提交 `1fbed04`。
- Go 1.25.0 toolchain。

测试项目：

1. 项目：`go mod tidy` + `go test ./...`
   检查方式：退出码。
   结果：通过，零新依赖。
   失败原因：无。

2. 项目：`curl /health`
   检查方式：HTTP 响应。
   结果：通过，`{"ok":true,"message":"go backend is running"}`。

3. 项目：POST /api/uploads（products）
   检查方式：返回 JSON。
   结果：通过，`{"ok":true,"url":"/uploads/products/xxx.png",...}`。

4. 项目：文件落盘
   检查方式：`ls uploads/products/`。
   结果：通过，文件存在。

5. 项目：GET /uploads/products/xxx.png 静态访问
   检查方式：HTTP 状态码 + 文件大小。
   结果：通过，HTTP 200，69 bytes。

6. 项目：GET /api/uploads 返回 405
   检查方式：HTTP 状态码。
   结果：通过，405。

7. 项目：非法 category 返回 400
   检查方式：HTTP 状态码 + 错误信息。
   结果：通过，400，"非法 category"。

8. 项目：非图片文件返回 400
   检查方式：扩展名 .txt 拦截。
   结果：通过，400，"不允许的文件扩展名"。

9. 项目：company 分类上传
   检查方式：返回 JSON。
   结果：通过。

10. 项目：上传图片不被 Git 跟踪
    检查方式：`git add --dry-run` + .gitignore 验证。
    结果：通过（修正 .gitignore 子目录规则后）。

11. 项目：/health 仍然正常
    检查方式：上传测试后验证。
    结果：通过。

12. 项目：零新 Go 依赖
    检查方式：go.mod 无新增 require。
    结果：通过。

统计：

- 通过数量：12
- 失败数量：0
- 失败项：无最终失败项；首次端口占用 + .gitignore 规则已修复。
- 是否存在文档漂移：存在，多份文档需更新为 Phase 3 完成态。
- 是否已修正文档漂移：是。
- 是否允许提交本次结果：是。
- 是否允许进入下一 Phase：Phase 3 完成后建议进入 Phase 4，须由用户明确授权。

## 2026-07-05 Phase 4A admin auth foundation test

测试范围：统一 JSON 响应、CORS、bcrypt 登录、token 鉴权中间件。

前置条件：已备份 `2d73bbc`，重建 data/company.db（bcrypt 密码）。

测试项目：
1. health ✅
2. login success (200 + token) ✅
3. login fail (401) ✅
4. protected no token (401) ✅
5. protected with token (200) ✅
6. protected bad token (401) ✅
7. uploads regression ✅
8. db-seed bcrypt hash ✅
9. go mod tidy + test ✅

统计：通过 9，失败 0。允许进入 Phase 4B，须用户授权。

（Phase 4B / 4C / 5 / 5R 测试记录详见 git log 和 HANDOFF.md。）

## 2026-07-05 Phase 6A admin login and layout skeleton test

测试范围：admin 登录页、后台首页、token 鉴权守卫、侧边栏导航。

前置条件：已备份 `35df40e`，Go backend 运行中。

测试项目：
1. npm run lint: 0 errors ✅
2. npm run build: /admin + /admin/login ✅
3. /admin/login HTTP 200 ✅
4. 错误密码 → "invalid credentials" ✅
5. 正确登录 → token + user ✅
6. /api/admin/ping token 验证 ✅
7. 错误 token → 401 ✅
8. 退出登录 → token 清除 ✅
9. 前台页面回归 (3/3 HTTP 200) ✅

统计：通过 9，失败 0。backend 未修改。允许进入 Phase 6B，须用户授权。

## 2026-07-05 Phase 6B admin product case management test

测试范围：后台产品/案例管理 CRUD 页面。前置条件：已备份 `c15b148`，Go backend 运行中。

测试项目：
1. npm run lint: 0 errors ✅
2. npm run build ✅
3. /admin/products HTTP 200 ✅
4. /admin/cases HTTP 200 ✅
5. 产品创建 API ✅
6. 案例创建 API ✅
7. 缺少 name → 400 ✅
8. 无 token → 401 ✅
9. 前台首页回归 ✅

统计：通过 9，失败 0。backend 未修改。零新前端依赖。允许进入 Phase 6C，须用户授权。

## 2026-07-05 Phase 6C admin message settings test

测试范围：后台留言管理和网站设置页面。前置条件：已备份 `5c3aefd`。

测试项目：
1. npm run lint: 0 errors ✅
2. npm run build ✅
3. /admin/messages HTTP 200 ✅
4. /admin/settings HTTP 200 ✅
5. 留言列表 API ✅
6. 留言详情 API ✅
7. 状态修改 API ✅
8. 设置读取 API ✅
9. 设置更新 API ✅

统计：通过 9，失败 0。backend 未修改。后台页面 6/6 全部完成。允许进入 Phase 7，须用户授权。

## 2026-07-05 Phase 7 full site integration and LAN access test

测试范围：全站端到端联调 + 局域网访问。前置条件：已备份 `fa7b0e1`。

测试项目：
1. 后端 go mod tidy + test ✅
2. 后端 db-seed + db-check ✅
3. 24 API 回归 (23×200 + 1×404) ✅
4. 前端 lint (0 errors) ✅
5. 前端 build (13 routes) ✅
6. 前台页面 7/7 ✅
7. 后台页面 6/6 ✅
8. E2E 产品闭环 ✅
9. E2E 案例闭环 ✅
10. E2E 留言闭环 ✅
11. E2E 设置闭环 ✅
12. E2E 图片闭环 ✅
13. LAN CORS 修复 ✅
14. data/company.db 未跟踪 ✅
15. uploads 图片未跟踪 ✅

统计：通过 15，失败 0。CORS 中间件已修复（Origon 反射）。第一版全部功能交付。项目完成。
