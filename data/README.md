# data

当前只完成 Phase 0：工程脚手架。

本目录用于 SQLite 本地数据库文件。

SQLite 负责保存：

- Admin
- Product
- Case
- Message
- SiteSetting
- 图片路径

SQLite 不负责保存真实图片文件。真实图片文件应保存到 `uploads/`。

Phase 0 不创建数据库文件、不创建迁移脚本、不创建模型代码。

下一阶段：

- Phase 2 定义数据库结构并创建 SQLite 文件。

