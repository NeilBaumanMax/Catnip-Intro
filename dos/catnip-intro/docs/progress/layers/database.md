# database layer progress

## 当前阶段

当前完成 Phase 2C：后端技术栈切换文档修正。

后端技术栈已从 Node/Express/Prisma 切换为 Go + SQLite。

## 职责

SQLite 负责保存文字数据和图片路径。

第一版数据实体：

- Admin
- Product
- Case
- Message
- SiteSetting

## 允许

- `data/company.db` 为本地运行产物，不提交 GitHub。
- 已通过 Prisma 验证的数据结构（5 张表）作为参考保留。
- 后续 Go backend 将重新实现 SQLite 连接和表结构管理。

## 禁止

- 保存真实图片二进制文件。
- 直接暴露给 frontend。

## 当前进度

### 历史阶段（已完成，保留不动）

- Phase 0 已创建 `data/README.md`。
- Phase 2A 已通过 Prisma 创建 schema，5 表就位，Prisma Client 可用。
- Phase 2B 已创建 seed/check 脚本，读写链路验证通过。
- Phase 2C（旧）迁移策略评估完成（DATABASE_MIGRATION_STRATEGY.md）。

### 当前阶段

- Phase 2C（新）后端技术栈切换为 Go + SQLite。
- Prisma 不再作为后续数据库工具。
- `prisma migrate` 不可用问题记录为历史问题。
- 后续数据库结构由 Go backend 重新管理。
- 现有 `data/company.db` 中的 5 张表结构作为 Go 后端建表参考。

## 下一步

Phase 2E：Go + SQLite 数据库结构与读写验证。在 Go backend 中创建 SQLite 表结构并验证读写路径。
