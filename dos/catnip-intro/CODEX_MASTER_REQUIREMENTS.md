# CODEX_MASTER_REQUIREMENTS

## 项目目标

构建 Catnip Intro 企业官网与后台管理系统。系统第一版应支持官网内容展示、后台内容维护、留言收集、网站基础设置和本地图片上传。

## 架构固定要求

项目架构固定为：

- frontend
- Go backend
- SQLite
- uploads

各部分含义：

- frontend（Next.js + TypeScript + Tailwind CSS）：前端网站，负责官网页面和后台管理页面。
- Go backend：后端接口，负责登录、产品、案例、留言、网站设置、图片上传、SQLite 读写和 uploads 静态访问。
- SQLite：本地数据库文件，负责保存文字数据和图片路径。
- uploads：本地图片文件夹，负责保存真实图片文件。

## 第一版功能范围

前台：

- 首页
- 关于我们
- 产品展示
- 产品详情
- 案例展示
- 案例详情
- 联系我们

后台：

- 登录
- 后台首页
- 产品管理
- 案例管理
- 留言管理
- 网站设置

Go backend：

- 登录接口
- 产品接口
- 案例接口
- 留言接口
- 网站设置接口
- 图片上传接口
- uploads 静态文件访问

数据库：

- Admin
- Product
- Case
- Message
- SiteSetting

## 当前阶段边界

当前完成 Phase 2C：后端技术栈切换文档修正。

Phase 0-2B 为 Node/Express/Prisma 历史路线，已完成但后续不再扩展。

Phase 2C 允许：

- 修改工程文档以反映 Go 后端路线。
- 创建技术栈决策文档。

Phase 2C 禁止：

- 写任何代码（Node 或 Go）。
- 删除现有 Node/Prisma 文件。
- 安装依赖。
- 创建新 worktree。
- 切换 Git 分支。

## Codex 施工硬性流程

后续每次施工必须按以下流程执行：

1. 开工前先备份当前仓库状态，优先备份到 GitHub 仓库。
2. 备份完成后读取本轮相关工程文档和目标目录文件。
3. 施工前写本次开工计划。
4. 按计划施工，并持续写施工日志。
5. 施工结束后执行测试，并写测试日志。
6. 测试不通过时回到施工步骤继续修复，直到测试通过或明确阻塞。
7. 测试通过后写记录文档、写日志、修正施工文档并处理文档漂移。
8. 提出下一次施工建议。
9. 将最终通过测试的结果上传 GitHub，并记录上传结果。

## 文档漂移规则

文档漂移是指工程文档描述与实际代码、目录、接口、数据库、测试结果或阶段状态不一致。

每次测试通过后必须检查：

- `CODEX_START_HERE.md` 是否仍然准确。
- `CODEX_MASTER_REQUIREMENTS.md` 是否仍然准确。
- `docs/WORKFLOW.md` 是否仍然准确。
- `docs/CONSTRUCTION_PLAN.md` 是否仍然准确。
- `docs/DEV_PROGRESS.md` 是否反映最新进度。
- `docs/LOG.md` 是否记录本轮过程。
- `docs/HANDOFF.md` 是否能支撑下一轮接手。
- `docs/TEST_METRICS.md` 是否记录最新测试结果。
- `docs/BACKEND_TECH_STACK_DECISION.md` 是否反映最新决策。
- `docs/progress/layers/*.md` 是否反映各层最新状态。

## 第一版验收方向

第一版最终应满足：

- 前台页面可以展示网站设置、产品、案例和联系方式。
- 后台登录后可以管理产品、案例、留言和网站设置。
- 图片上传后真实文件保存在 `uploads/`。
- SQLite 只保存文字字段和图片路径。
- Go backend 统一负责数据读写、鉴权、上传和静态文件访问。
- 前端不直接访问 SQLite 或 uploads 文件系统。

## 下一阶段

Phase 2D：Go backend 最小骨架。
