# backend layer progress

## 当前阶段

当前完成 Phase 2C：数据库迁移方案评估。

## 职责

backend 负责登录、产品、案例、留言、网站设置、图片上传和 uploads 静态访问。

第一版接口范围：

- 登录接口
- 产品接口
- 案例接口
- 留言接口
- 网站设置接口
- 图片上传接口
- uploads 静态文件访问

## 允许

- 当前阶段已创建后端项目骨架。
- 当前阶段已接入 Prisma + SQLite。
- 当前阶段已验证 Prisma Client 读写路径。
- 当前阶段已评估迁移策略。
- 后续阶段实现 API、鉴权、参数校验、数据库读写和静态文件访问。

## 禁止

- 在 Phase 2 实现登录、产品、案例、留言、上传等真实业务接口。
- 将真实图片保存到 SQLite。
- 让未鉴权请求访问后台管理接口。

## 当前进度

- Phase 0 已创建 `backend/README.md`。
- Phase 1 已创建 `backend/package.json`、`backend/tsconfig.json`、`backend/src/app.ts`。
- Phase 1 已配置基础 CORS、`GET /health`。
- Phase 1 已通过 `npm install`、`npm run build`、`npm run dev` 和 `/health` 访问测试。
- Phase 2A 已接入 Prisma 6.19.0 + SQLite，`data/company.db` 5 表就位。
- Phase 2B 已创建 Prisma Client 单例、seed/check 脚本，读写链路验证通过。
- Phase 2C 迁移策略已明确，继续 Prisma + db push 用于第一版。
- 注意：本机 `prisma migrate` 不可用（返回空 `Schema engine error`），使用 `prisma db push` 替代。

## 下一步

Phase 3 建议实现登录鉴权和业务 API，先备份、读档、写计划。
