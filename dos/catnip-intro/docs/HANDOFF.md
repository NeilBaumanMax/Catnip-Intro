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

当前完成 Phase 1：backend 最小骨架。

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

## 尚未具备

- 尚未选择前端技术栈。
- 尚未创建前端项目。
- 尚未实现任何页面。
- 尚未实现登录、产品、案例、留言、上传等真实业务接口。
- 尚未创建 SQLite 数据库。
- 尚未实现图片上传。

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
