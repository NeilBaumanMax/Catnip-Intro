# DEV_PROGRESS

## 当前阶段

Phase 2C：后端技术栈切换文档修正。

## 当前状态

Phase 2C 文档修正进行中。后端技术栈已从 Node.js/Express/Prisma 切换为 Go + SQLite。

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

### Phase 0：工程脚手架
- 创建所有基础目录和工程文档。✅

### Phase 1：Node backend 最小骨架（历史阶段）
- Node.js + Express + TypeScript 最小后端骨架。`GET /health` 可用。✅
- ⚠️ 因后端技术栈切换，此阶段作为历史阶段保留。

### Phase 2A：Prisma + SQLite 基础接入（历史阶段）
- Prisma 6.19.0 + SQLite 接入，`data/company.db` 5 张表就位。✅
- ⚠️ `prisma migrate` 本机不可用，使用 `prisma db push` 替代。

### Phase 2B：数据库读写验证脚本（历史阶段）
- Prisma Client 单例和 seed/check 验证脚本，读写链路验证通过。✅

### Phase 2C（旧）：数据库迁移方案评估（历史阶段）
- DATABASE_MIGRATION_STRATEGY.md 创建，5 方案比较。✅
- ⚠️ 因后端技术栈切换，原结论（继续 Prisma + db push）已过时。

### Phase 2C（当前）：后端技术栈切换文档修正
- BACKEND_TECH_STACK_DECISION.md 已创建。✅
- 所有工程文档已修正为 Go backend 路线。✅

## 未完成

- 未创建前端项目代码（Next.js）。
- 未创建 Go backend 代码。
- 未创建上传处理逻辑。
- 未实现登录、产品、案例、留言、上传等真实业务接口。

## 下一阶段

Phase 2D：Go backend 最小骨架。
