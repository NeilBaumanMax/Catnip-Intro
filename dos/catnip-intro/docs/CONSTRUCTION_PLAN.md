# CONSTRUCTION_PLAN

## 当前阶段

当前完成 Phase 2C：后端技术栈切换文档修正。

Phase 0-2B 为 Node/Express/Prisma 历史路线，已完成但后续不再扩展。

## 历史阶段（已完成，保留不动）

### Phase 0：工程脚手架

状态：已完成。

### Phase 1：Node backend 最小骨架

状态：已完成，但因后端技术栈切换为 Go，作为历史阶段保留。

### Phase 2A：Prisma + SQLite 基础接入

状态：已完成，但作为历史验证阶段保留。

### Phase 2B：数据库读写验证脚本

状态：已完成，但作为历史验证阶段保留。

## 当前阶段

### Phase 2C：后端技术栈切换文档修正（当前）

目标：

- 将所有工程文档从 Node/Express/Prisma 路线修正为 Go 路线。
- 创建技术栈决策文档。
- 不修改任何代码文件。

允许：

- 修改工程文档。
- 创建 BACKEND_TECH_STACK_DECISION.md。

禁止：

- 写任何代码。
- 删除 Node/Prisma 文件。
- 安装依赖。

完成标准：

- 所有文档中不再将 Node/Express/Prisma 作为未来主路线。
- 技术栈决策文档存在。

## 后续阶段

### Phase 2D：Go backend 最小骨架

目标：

- 创建 Go 后端最小骨架。
- 后端监听 `4000` 端口。
- 支持 `0.0.0.0` 局域网访问。
- 提供 `GET /health`，返回 `{"ok":true,"message":"go backend is running"}`。

限制：

- 不接入 SQLite。
- 不写业务接口。
- 不做 uploads。
- 不修改 frontend。

### Phase 2E：Go + SQLite 数据库结构与读写验证

目标：

- 在 Go backend 中接入 SQLite。
- 创建数据库表结构（Admin、Product、Case、Message、SiteSetting）。
- 实现数据库读写验证。

限制：

- 不实现业务接口。
- 不实现登录。
- 不修改 frontend。

### Phase 3：uploads 图片上传与静态访问

目标：

- 实现图片上传接口。
- 将真实图片保存到 `uploads/`。
- 将图片路径保存到 SQLite。
- 通过 Go backend 暴露图片静态访问。

### Phase 4：Go backend 业务接口

目标：

- 实现登录鉴权。
- 实现产品、案例、留言、网站设置 CRUD 接口。
- 实现统一响应和错误处理。

### Phase 5：frontend 前台骨架

目标：

- 创建 Next.js + TypeScript + Tailwind CSS 项目。
- 实现前台页面骨架。
- 接入 Go backend API。

### Phase 6：admin 后台骨架

目标：

- 实现后台登录页面。
- 实现后台管理页面骨架。
- 接入 Go backend 管理 API。

### Phase 7：前后端联调

目标：

- 验证 frontend → Go backend → SQLite 完整链路。
- 验证图片上传和访问链路。

### Phase 8：局域网访问测试

目标：

- 验证 Go backend 在局域网内可访问。
- 验证 frontend 在局域网内可访问。

### Phase 9：收尾文档和验收

目标：

- 整理开发文档。
- 完成第一版验收。

## 每阶段收尾要求

## 每阶段收尾要求（强制文档收尾）

每个阶段测试通过后必须完成以下文档更新（全部）：

1. 更新 `docs/DEV_PROGRESS.md`（阶段状态、已完成、未完成、下一阶段）。
2. 更新 `docs/LOG.md`（施工日志：备份、读档、目标、计划、施工、测试、失败处理、文档漂移、收尾）。
3. 更新 `docs/HANDOFF.md`（交接状态、已具备、尚未具备、下一步建议）。
4. 更新 `docs/TEST_METRICS.md`（测试项目、通过/失败数量、是否允许进入下一阶段）。
5. 更新 `docs/progress/layers/对应层.md`（当前进度、下一步）。
6. 更新对应 README.md（frontend/README.md、backend/README.md 等）。
7. 检查并处理文档漂移。
8. 执行 Phase Completion Gate 自检（见 WORKFLOW.md）。
9. 提出下一次施工建议。
10. 提交或上传 GitHub 并记录结果。

**未完成文档收尾不允许汇报 Phase 完成。** 详见 CODEX_START_HERE.md 和 WORKFLOW.md 中的 Phase 完成定义。

## 下一阶段

Phase 7：全站联调 + 局域网手机访问验收。
