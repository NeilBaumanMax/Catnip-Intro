# CODEX_START_HERE

每次 Codex 开工前必须先读取本文件。

## 当前阶段

当前只完成 Phase 0：工程脚手架。

Phase 0 的目标是建立项目目录、工程文档、职责边界、开发计划和验收标准。当前阶段不允许写业务代码，不允许安装依赖，不允许创建新 worktree，不允许切换 Git 分支。

## 项目目标

Catnip Intro 是一个企业官网与后台管理系统，采用 frontend + backend + SQLite + uploads 架构：

- frontend 负责官网页面和后台管理页面。
- backend 负责登录、产品、案例、留言、网站设置和图片上传接口。
- SQLite 通过本地数据库文件保存文字数据和图片路径。
- uploads 保存真实图片文件，并由后端提供静态访问。

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
11. `dos/catnip-intro/docs/progress/layers/frontend.md`
12. `dos/catnip-intro/docs/progress/layers/backend.md`
13. `dos/catnip-intro/docs/progress/layers/database.md`
14. `dos/catnip-intro/docs/progress/layers/uploads.md`
15. `dos/catnip-intro/docs/progress/layers/integration.md`

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

每次 Codex 收尾时必须记录：

- 备份方式和备份位置。
- 本轮完成了什么。
- 修改了哪些文件。
- 是否新增业务代码。
- 是否安装依赖。
- 是否创建 worktree。
- 是否切换 Git 分支。
- 测试或验收结果。
- 是否已修正文档漂移。
- 下一阶段建议。
- 是否已上传 GitHub。

记录位置：

- 阶段状态写入 `docs/DEV_PROGRESS.md`。
- 过程日志写入 `docs/LOG.md`。
- 交接说明写入 `docs/HANDOFF.md`。
- 测试和验收结果写入 `docs/TEST_METRICS.md`。
- 分层进度写入 `docs/progress/layers/*.md`。

测试通过后的收尾顺序：

1. 写记录文档。
2. 写日志。
3. 修正所有施工文档。
4. 检查并处理文档漂移。
5. 提出下一次施工建议。
6. 上传 GitHub 并记录上传结果。

## Phase 0 验收标准

- `dos/catnip-intro/CODEX_START_HERE.md` 存在。
- `dos/catnip-intro/CODEX_MASTER_REQUIREMENTS.md` 存在。
- `docs` 下所有工程文档存在。
- `frontend`、`backend`、`data`、`uploads` 四个目录存在。
- 每个基础目录都有 `README.md`。
- 文档明确当前只完成 Phase 0。
- 没有创建业务代码。
- 没有安装依赖。
- 没有创建新 worktree。
- 没有切换 Git 分支。

## 下一阶段

可以进入 Phase 1 的前提是 Phase 0 验收全部通过。Phase 1 应建立最小可运行项目骨架，但不得超出用户确认的技术栈和范围。
