# database layer progress

## 当前阶段

当前完成 Phase 2B：数据库读写验证脚本。

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
- 保存图片路径。

## 禁止

- 保存真实图片二进制文件。
- 直接暴露给 frontend。

## 当前进度

- Phase 0 已创建 `data/README.md`。
- Phase 2A 已创建 `backend/prisma/schema.prisma`，包含 Admin、Product、Case、Message、SiteSetting 模型。
- Phase 2A 已通过 `prisma db push` 生成 `data/company.db`，5 张表全部就位。
- Phase 2A 已通过 `prisma generate` 生成 Prisma Client。
- Phase 2B 已创建 `backend/src/lib/prisma.ts`（Prisma Client 连接单例）。
- Phase 2B 已创建 `backend/src/scripts/seed.ts`（upsert 写入验证）。
- Phase 2B 已创建 `backend/src/scripts/check-db.ts`（读取验证）。
- Phase 2B 已验证写入→读取完整链路通过。
- 注意：本机 `prisma migrate` 不可用（schema engine 空错误），使用 `prisma db push` 替代作为本地原型方案。

## 下一步

Phase 3 建议在 backend 中实现登录鉴权和业务接口，通过 Prisma Client 读写数据库。
