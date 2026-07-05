# database layer progress

## 当前阶段

当前只完成 Phase 0：工程脚手架。

## 职责

SQLite 负责保存文字数据和图片路径。

第一版数据实体：

- Admin
- Product
- Case
- Message
- SiteSetting

## 允许

- 后续阶段创建 SQLite 数据库文件。
- 后续阶段定义表结构、索引和初始管理员数据。
- 保存图片路径。

## 禁止

- 在 Phase 0 创建数据库文件或模型代码。
- 保存真实图片二进制文件。
- 直接暴露给 frontend。

## 当前进度

- Phase 0 已创建 `data/README.md`。
- 尚未创建 SQLite 数据库文件。

## 下一步

Phase 2 定义数据库结构并创建 SQLite 文件。

