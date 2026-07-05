# WORKFLOW

## 当前阶段

当前完成 Phase 2C：后端技术栈切换文档修正。

Phase 0-2B 为 Node/Express/Prisma 历史路线，已完成但后续不再扩展。后续主路线为 Go backend。

## 每次 Codex 标准施工流程

每次 Codex 施工必须按以下顺序执行：

1. 开工前先备份当前仓库状态，优先使用 GitHub 仓库作为备份位置。
2. 记录备份方式、备份提交或备份位置。
3. 备份完成后读取工程文档和本轮相关目录文件。
4. 写出本次开工计划。
5. 开始施工。
6. 施工过程中持续写日志。
7. 施工结束后执行测试。
8. 测试结果写入日志和测试记录。
9. 测试不通过时，回到施工步骤继续修复，并继续写施工日志和测试日志。
10. 测试通过后，写记录文档，写日志，修正所有施工文档，处理文档漂移。
11. 提出下一次施工建议。
12. 提交或上传 GitHub，并记录结果。

## 强制门禁

- 没有开工计划不允许施工。
- 没有施工日志不允许进入测试。
- 没有测试不算完成。
- 测试不通过不允许进入下一 Phase。
- 测试失败后必须先记录失败日志，再回去修复，再重新测试。
- 测试通过但未修正文档漂移时，不允许提交或上传 GitHub。
- 用户明确要求只验收时，不允许进入下一 Phase。
- **未完成文档收尾不允许汇报 Phase 完成。**
- **如果发现上一阶段功能已完成但文档未更新，下一次任务必须优先进入 Phase X-DOC。**

## Phase 完成定义（硬性门槛）

任何 Phase 只有**同时满足以下 5 项**，才允许汇报"Phase 完成"：

1. 功能施工完成。
2. 测试完成并记录通过/失败数量。
3. 相关工程文档已更新（见下方文档清单）。
4. git status 检查无意外文件。
5. 已提交并推送 GitHub。

如果没有完成文档收尾，只能汇报：

"功能完成，但 Phase 未完成，正在补文档收尾。"

## 强制文档收尾清单

每个 Phase 结束前必须更新以下文档（全部）：

1. `dos/catnip-intro/docs/DEV_PROGRESS.md`
2. `dos/catnip-intro/docs/LOG.md`
3. `dos/catnip-intro/docs/HANDOFF.md`
4. `dos/catnip-intro/docs/TEST_METRICS.md`
5. `dos/catnip-intro/docs/progress/layers/对应层.md`
6. 对应模块 README.md：
   - 前端阶段：`frontend/README.md`
   - 后端阶段：`backend/README.md`
   - 数据库阶段：`data/README.md` 或 database 进度文档
   - uploads 阶段：`uploads/README.md`

## Phase Completion Gate（完成前自检）

每个 Phase 最终汇报前，必须先自检以下 8 项：

1. 本阶段是否更新 DEV_PROGRESS.md？
2. 本阶段是否更新 LOG.md？
3. 本阶段是否更新 HANDOFF.md？
4. 本阶段是否更新 TEST_METRICS.md？
5. 本阶段是否更新对应 progress/layers/*.md？
6. 本阶段是否更新对应 README？
7. git diff --name-only 是否包含这些文档？
8. 如果没有，立刻补文档，不允许结束。

## 最终汇报模板

每次 Phase 完成后必须按以下模板输出：

1. 修改了哪些业务文件。
2. 修改了哪些文档文件。
3. 是否已更新 DEV_PROGRESS.md。
4. 是否已更新 LOG.md。
5. 是否已更新 HANDOFF.md。
6. 是否已更新 TEST_METRICS.md。
7. 是否已更新对应 progress/layers 文件。
8. 是否已更新对应 README。
9. 是否完成 Phase。
10. 是否已提交 GitHub。
11. commit id。

如果上述文档字段中任何一项为"否"，则"是否完成 Phase"必须写"否"。

## 每次 Codex 开工前读取顺序

读取必须发生在备份之后。

1. `CODEX_START_HERE.md`
2. `CODEX_MASTER_REQUIREMENTS.md`
3. `docs/WORKFLOW.md`
4. `docs/CONSTRUCTION_PLAN.md`
5. `docs/ARCHITECTURE.md`
6. `docs/LAYER_CONTRACT.md`
7. `docs/DEV_PROGRESS.md`
8. `docs/LOG.md`
9. `docs/HANDOFF.md`
10. `docs/TEST_METRICS.md`
11. `docs/BACKEND_TECH_STACK_DECISION.md`
12. `docs/progress/layers/frontend.md`
13. `docs/progress/layers/backend.md`
14. `docs/progress/layers/database.md`
15. `docs/progress/layers/uploads.md`
16. `docs/progress/layers/integration.md`

## 开发流程

1. 确认当前阶段。
2. 确认用户本轮允许的操作。
3. 检查已有文件和 Git 状态。
4. 执行开工前备份。
5. 读取工程文档和本轮相关目录文件。
6. 写本次开工计划。
7. 根据阶段计划执行最小必要修改。
8. 施工过程中持续写日志。
9. 验证修改结果。
10. 测试不通过时继续施工并继续写日志。
11. 测试通过后更新进度、日志、测试指标、交接文档和分层进度。
12. 检查并修正文档漂移。
13. 输出完成结果和下一步建议。
14. 提交或上传 GitHub 并记录结果。

## 备份规则

- 开工前必须先备份。
- 备份优先在 GitHub 仓库执行。
- 如果本轮不允许提交或推送，必须记录不能上传 GitHub 的原因。
- 备份不得通过创建新 worktree 完成，除非用户明确允许。
- 备份不得通过切换 Git 分支完成，除非用户明确允许。

## 施工日志规则

- 施工开始前在 `docs/LOG.md` 记录本轮目标和计划。
- 每个关键施工动作后记录结果。
- 每次测试前记录测试目的。
- 每次测试后记录通过或失败。
- 测试失败后的修复必须追加日志，不覆盖旧日志。

## 测试循环规则

测试失败时必须：

1. 记录失败项和失败原因。
2. 回到施工步骤修复。
3. 记录修复动作。
4. 再次测试。
5. 直到测试通过或明确阻塞。

测试通过后才能：

- 写最终记录文档。
- 修正文档漂移。
- 提出下一次施工建议。
- 上传 GitHub。

## 文档漂移修正规则

测试通过后必须检查并修正：

- 阶段状态是否准确。
- 目录结构是否准确。
- 功能范围是否准确。
- 各层职责是否准确。
- 测试结果是否准确。
- 下一阶段建议是否准确。

## 收尾记录规则

每次收尾必须记录：

- 备份方式和备份位置。
- 本轮阶段。
- 本轮目标。
- 已完成事项。
- 修改文件清单。
- 未完成事项。
- 是否写入业务代码。
- 是否安装依赖。
- 是否创建 worktree。
- 是否切换 Git 分支。
- 验收结果。
- 文档漂移修正结果。
- 下一阶段建议。
- GitHub 上传结果。

## 禁止事项

除非用户明确允许，否则禁止：

- 安装依赖。
- 切换 Git 分支。
- 创建新 worktree。
- 删除用户已有文件。
- 重置 Git 状态。
- 扩大本轮任务范围。
- 删除现有 Node/Prisma 代码文件。

## 技术栈变更说明

后端技术栈已从 Node.js + Express + TypeScript + Prisma 切换为 Go + SQLite。详见 `docs/BACKEND_TECH_STACK_DECISION.md`。`backend/` 目录中 Node/Prisma 代码作为历史资料保留不动。

## 下一阶段

Phase 2D：Go backend 最小骨架。
