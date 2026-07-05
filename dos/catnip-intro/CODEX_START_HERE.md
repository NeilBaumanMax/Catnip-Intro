# CODEX_START_HERE

每次 Codex 开工前必须先读取本文件。

## 当前阶段

当前完成 Phase 2C：后端技术栈切换文档修正。

Phase 0-2B 为 Node/Express/Prisma 历史路线，已完成但后续不再扩展。

## 项目目标

Catnip Intro 是一个企业官网与后台管理系统，采用 frontend + Go backend + SQLite + uploads 架构：

- frontend（Next.js + TypeScript + Tailwind CSS）负责官网页面和后台管理页面。
- Go backend 负责接口服务、登录鉴权、产品管理、案例管理、留言管理、网站设置、图片上传、SQLite 读写。
- SQLite 通过本地数据库文件保存文字数据和图片路径。
- uploads 保存真实图片文件，并由 Go backend 提供静态访问。

## 固定开工顺序

每次 Codex 开工必须按以下顺序执行：

1. 开工前先备份当前仓库状态，优先使用 GitHub 仓库作为备份位置。
2. 记录备份方式、备份提交或备份位置。
3. 备份完成后读取工程文档。
4. 写出本次开工计划。
5. 获得清晰施工边界后开始施工。

## 固定读取顺序

备份完成后，每次 Codex 按以下顺序读取：

1. `dos/catnip-intro/CODEX_START_HERE.md`
2. `dos/catnip-intro/CODEX_MASTER_REQUIREMENTS.md`
3. `dos/catnip-intro/docs/WORKFLOW.md`
4. `dos/catnip-intro/docs/CONSTRUCTION_PLAN.md`
5. `dos/catnip-intro/docs/ARCHITECTURE.md`
6. `dos/catnip-intro/docs/LAYER_CONTRACT.md`
7. `dos/catnip-intro/docs/DEV_PROGRESS.md`
8. `dos/catnip-intro/docs/LOG.md`
9. `dos/catnip-intro/docs/HANDOFF.md`
10. `dos/catnip-intro/docs/TEST_METRICS.md`
11. `dos/catnip-intro/docs/BACKEND_TECH_STACK_DECISION.md`
12. `dos/catnip-intro/docs/progress/layers/frontend.md`
13. `dos/catnip-intro/docs/progress/layers/backend.md`
14. `dos/catnip-intro/docs/progress/layers/database.md`
15. `dos/catnip-intro/docs/progress/layers/uploads.md`
16. `dos/catnip-intro/docs/progress/layers/integration.md`

## 开工规则

- 先完成备份，再读取文件。
- 先确认当前阶段。
- 先确认用户本轮要求是否允许写代码。
- 先确认是否禁止安装依赖、切换分支、创建 worktree。
- 先写本次施工计划，再修改文件。
- 只修改本轮任务需要修改的文件。
- 不覆盖已有用户修改。

## 施工和测试循环

每次施工必须遵守：

1. 施工前写计划。
2. 施工中写日志。
3. 施工结束后执行测试。
4. 测试结果写入日志和测试记录。
5. 测试不通过时，回到施工步骤继续修复。
6. 每次修复都继续写施工日志和测试日志。
7. 测试通过后才能进入收尾。

## 收尾规则

### Phase 完成定义（硬性门槛）

任何 Phase 只有**同时满足以下 5 项**，才允许汇报"Phase 完成"：

1. 功能施工完成。
2. 测试完成并记录通过/失败数量。
3. 相关工程文档已更新（见下方文档清单）。
4. git status 检查无意外文件。
5. 已提交并推送 GitHub。

如果没有完成文档收尾，只能汇报：

"功能完成，但 Phase 未完成，正在补文档收尾。"

不能汇报"Phase X 完成"。

### 强制文档收尾清单

每个 Phase 结束前必须更新以下文档（全部）：

1. `dos/catnip-intro/docs/DEV_PROGRESS.md`
2. `dos/catnip-intro/docs/LOG.md`
3. `dos/catnip-intro/docs/HANDOFF.md`
4. `dos/catnip-intro/docs/TEST_METRICS.md`
5. `dos/catnip-intro/docs/progress/layers/对应层.md`
6. 对应模块 README.md（前端→frontend/README.md, 后端→backend/README.md, 数据库→data/README.md, uploads→uploads/README.md）

### Phase Completion Gate（完成前自检）

每个 Phase 最终汇报前，必须先自检：

1. 本阶段是否更新 DEV_PROGRESS.md？
2. 本阶段是否更新 LOG.md？
3. 本阶段是否更新 HANDOFF.md？
4. 本阶段是否更新 TEST_METRICS.md？
5. 本阶段是否更新对应 progress/layers/*.md？
6. 本阶段是否更新对应 README？
7. git diff --name-only 是否包含这些文档？
8. 如果没有，立刻补文档，不允许结束。

### 最终汇报模板

每次 Phase 完成汇报必须包含：

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

### 自动修正规则

如果发现上一阶段功能已完成但文档未更新，下一次任务必须优先进入 Phase X-DOC，只补文档，不写代码。

### 记录位置

- 阶段状态写入 `docs/DEV_PROGRESS.md`。
- 过程日志写入 `docs/LOG.md`。
- 交接说明写入 `docs/HANDOFF.md`。
- 测试和验收结果写入 `docs/TEST_METRICS.md`。
- 分层进度写入 `docs/progress/layers/*.md`。

### 测试通过后的收尾顺序

1. 写记录文档。
2. 写日志。
3. 修正所有施工文档。
4. 检查并处理文档漂移。
5. 执行 Phase Completion Gate 自检。
6. 提出下一次施工建议。
7. 上传 GitHub 并记录上传结果。

## 下一阶段

Phase 7：全站联调 + 局域网手机访问验收。
