# DEV_PROGRESS

## 当前阶段

Phase 2B：数据库读写验证脚本。

## 当前状态

Phase 2B 测试通过。Prisma Client 连接模块和 seed/check 验证脚本已创建，数据库读写路径通过验证。

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
- Phase 1 backend：创建 Node.js + Express + TypeScript 最小后端骨架。
- Phase 1 backend：配置基础 CORS。
- Phase 1 backend：实现 `GET /health`。
- Phase 2A：创建 `backend/.env.example`。
- Phase 2A：创建 `backend/prisma/schema.prisma`，定义 Admin、Product、Case、Message、SiteSetting 模型。
- Phase 2A：安装 Prisma 6.19.0 + SQLite 依赖。
- Phase 2A：`prisma db push` 成功生成 `data/company.db`，5 张表就位。
- Phase 2A：`prisma:generate` 成功生成 Prisma Client。
- Phase 2B：创建 `backend/src/lib/prisma.ts`，导出 Prisma Client 单例。
- Phase 2B：创建 `backend/src/scripts/seed.ts`，upsert 写入 5 表测试数据。
- Phase 2B：创建 `backend/src/scripts/check-db.ts`，读取各表数量和样例。
- Phase 2B：`db:seed` 和 `db:check` npm scripts 已配置。
- Phase 2B：数据库读写路径通过验证（seed 写入 + check 读取）。
- 注意：本机 `prisma migrate` 不可用（Schema engine error），使用 `prisma db push` 替代作为本地原型方案。

## 未完成

- 未创建前端项目代码。
- 未创建上传处理逻辑。
- 未实现登录、产品、案例、留言、上传等真实业务接口。

## 下一阶段

建议进入 Phase 3：后台登录与内容管理。
