# DEV_PROGRESS

## 当前阶段

Phase 1：backend 最小骨架。

## 当前状态

Phase 1 backend 最小骨架测试通过。后端服务可以启动，并提供 `GET /health` 健康检查接口。

## Phase 状态记录模板

```text
## Phase N status

阶段名称：
- 

当前状态：
- 未开始 / 进行中 / 测试中 / 测试失败待修复 / 测试通过 / 已收尾

开工记录：
- 是否备份：
- 是否读取文档：
- 是否写开工计划：

施工记录：
- 已完成：
- 未完成：

测试记录：
- 是否执行测试：
- 是否通过：
- 失败项：

收尾记录：
- 是否修正文档漂移：
- 是否提交或上传 GitHub：
- 下一次施工建议：
```

## 已完成

- 创建 `dos/catnip-intro/` 工程文档目录。
- 创建 `frontend/`、`backend/`、`data/`、`uploads/` 基础目录。
- 创建根目录 README。
- 创建各基础目录 README。
- 创建架构、层级契约、建设计划、工作流、日志、交接、测试指标和分层进度文档。
- 补充标准施工流程：开工备份、读档、写计划、施工写日志、测试写日志、失败回修、测试通过后修正文档漂移、提出下次建议、上传 GitHub。
- 补充统一日志模板、测试记录模板、交接记录模板和 Phase 状态记录模板。
- Phase 1 backend：创建 Node.js + Express + TypeScript 最小后端骨架。
- Phase 1 backend：配置基础 CORS。
- Phase 1 backend：配置 `dev`、`build`、`start` npm scripts。
- Phase 1 backend：实现 `GET /health`，返回 `{"ok":true,"message":"backend is running"}`。
- Phase 1 backend：服务监听 `0.0.0.0:4000`。

## 未完成

- 未创建前端项目代码。
- 未创建 SQLite 数据库文件。
- 未创建上传处理逻辑。
- 未安装前端依赖。
- 未实现登录、产品、案例、留言、上传等真实业务接口。
- 未接入 SQLite。
- 未接入 Prisma。

## 下一阶段

建议进入 Phase 2：数据库与后端基础。

Phase 2 开工前必须先备份当前仓库状态，并记录备份方式和备份位置。
