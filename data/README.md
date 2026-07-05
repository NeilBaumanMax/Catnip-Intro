# data

当前完成 Phase 2A：Prisma + SQLite 基础接入。

数据库文件已通过 `prisma db push` 生成：

```text
data/company.db
```

SQLite 负责保存：

- Admin
- Product
- Case
- Message
- SiteSetting
- 图片路径

SQLite 不负责保存真实图片文件。真实图片文件应保存到 `uploads/`。

Phase 2A 注意：本机 Prisma migration engine 返回空 `Schema engine error`，`prisma migrate` 不可用。当前使用 `prisma db push` 作为替代方案直接同步 schema 到数据库，不生成 migration 历史文件。后续如解决 engine 问题可切回 migrate。

数据库文件属于本地运行产物，不提交到 GitHub。
