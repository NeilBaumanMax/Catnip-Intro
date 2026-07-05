# database layer progress

## 当前阶段

当前完成 Phase 2C：数据库迁移方案评估。

## 职责

SQLite 负责保存文字数据和图片路径。

第一版数据实体：

- Admin
- Product
- Case
- Message
- SiteSetting

## 允许

- 已创建 SQLite 数据库文件 `data/company.db`。
- 已定义表结构（通过 `backend/prisma/schema.prisma`）。
- 已通过 Prisma Client 验证写入和读取路径。
- 原型阶段使用 `prisma db push` 管理 schema 变更。

## 禁止

- 保存真实图片二进制文件。
- 直接暴露给 frontend。

## 当前进度

- Phase 0 已创建 `data/README.md`。
- Phase 2A 已创建 schema，5 表就位，Prisma Client 可用。
- Phase 2B 已创建 seed/check 脚本，读写链路验证通过。
- Phase 2C 迁移策略已明确：
  - 第一版继续 Prisma + db push。
  - `prisma migrate` 不可用记录为技术债。
  - 正式上线前重新评估（修复 migrate 或迁移 Drizzle）。
  - 策略文档：`dos/catnip-intro/docs/DATABASE_MIGRATION_STRATEGY.md`。

## 下一步

Phase 3 在 backend 中实现业务接口，通过 Prisma Client 读写数据库。
