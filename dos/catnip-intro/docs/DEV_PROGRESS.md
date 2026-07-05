# DEV_PROGRESS

## 当前阶段

Phase 2C：数据库迁移方案评估。

## 当前状态

Phase 2C 完成。数据库迁移策略已明确：当前第一版继续使用 Prisma + db push 作为本地原型方案，正式上线前重新评估。

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
- Phase 1 backend：Node.js + Express + TypeScript 最小后端骨架，`GET /health` 可用。
- Phase 2A：Prisma 6.19.0 + SQLite 接入，`data/company.db` 5 张表就位。
- Phase 2B：Prisma Client 连接单例和 seed/check 验证脚本，读写链路验证通过。
- Phase 2C：数据库迁移方案评估完成，`DATABASE_MIGRATION_STRATEGY.md` 已创建。
  - 决策：继续 Prisma + db push 用于第一版原型开发。
  - 技术债已记录：`prisma migrate` 不可用，正式上线前需解决或迁移到 Drizzle。
  - 如果必须平替，首选 Drizzle ORM + drizzle-kit。
- 注意：本机 `prisma migrate` 不可用（Schema engine error），使用 `prisma db push` 替代。

## 未完成

- 未创建前端项目代码。
- 未创建上传处理逻辑。
- 未实现登录、产品、案例、留言、上传等真实业务接口。

## 下一阶段

建议进入 Phase 3：后台登录与内容管理。
