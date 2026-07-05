# database layer progress

## 当前阶段

当前完成 Phase 4A：管理员登录鉴权（数据库读写）。

## 当前进度

- Phase 2E：5 张表 DDL，db-seed/db-check 验证通过。
- Phase 4A：db-seed 更新为 bcrypt 密码哈希。
  - 默认管理员：admin / admin123456（bcrypt）。
  - 测试管理员：__seed_admin / test_hash_from_seed（bcrypt）。
- Phase 4A：admin 表现在有 2 条记录（id=1 默认管理员，id=2 测试管理员）。
- 数据库文件：`data/company.db`，不提交 GitHub。

## 下一步

Phase 4B 通过 HTTP 接口读写 product、case_item、message、site_setting 表。
