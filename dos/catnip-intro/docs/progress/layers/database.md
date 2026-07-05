# database layer progress

## 当前阶段

当前完成 Phase 2A：Prisma + SQLite 基础接入。

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
- 保存图片路径。

## 禁止

- 保存真实图片二进制文件。
- 直接暴露给 frontend。

## 当前进度

- Phase 0 已创建 `data/README.md`。
- Phase 2A 已创建 `backend/prisma/schema.prisma`，包含 Admin、Product、Case、Message、SiteSetting 模型。
- Phase 2A 已通过 `prisma db push` 生成 `data/company.db`，5 张表全部就位。
- Phase 2A 已通过 `prisma generate` 生成 Prisma Client。
- 注意：本机 `prisma migrate` 不可用（schema engine 空错误），使用 `prisma db push` 替代。

## 下一步

Phase 2B 建议创建 seed/check 脚本，验证数据库读写路径。也可以直接进入 Phase 3（后台登录与内容管理），视用户授权而定。
