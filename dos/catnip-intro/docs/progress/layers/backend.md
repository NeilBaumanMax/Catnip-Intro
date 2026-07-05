# backend layer progress

## 当前阶段

当前完成 Phase 2B：数据库读写验证脚本。

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
- 后续阶段实现 API、鉴权、参数校验、数据库读写和静态文件访问。

## 禁止

- 在 Phase 2B 实现登录、产品、案例、留言、上传等真实业务接口。
- 将真实图片保存到 SQLite。
- 让未鉴权请求访问后台管理接口。

## 当前进度

- Phase 0 已创建 `backend/README.md`。
- Phase 1 已创建 `backend/package.json`、`backend/tsconfig.json`、`backend/src/app.ts`。
- Phase 1 已配置基础 CORS。
- Phase 1 已配置 `dev`、`build`、`start` scripts。
- Phase 1 已实现 `GET /health`。
- Phase 1 已通过 `npm install`、`npm run build`、`npm run dev` 和 `/health` 访问测试。
- Phase 2A 已创建 `backend/.env.example`。
- Phase 2A 已创建 `backend/prisma/schema.prisma`。
- Phase 2A 已安装 Prisma 6.19.0 依赖。
- Phase 2A 已配置 `prisma:generate`、`prisma:push`、`prisma:migrate` scripts。
- Phase 2A 已通过 `prisma db push` 生成 `data/company.db`。
- Phase 2A 已通过 `prisma:generate` 生成 Prisma Client。
- Phase 2B 已创建 `backend/src/lib/prisma.ts`（Prisma Client 连接单例）。
- Phase 2B 已创建 `backend/src/scripts/seed.ts`（upsert 写入验证）。
- Phase 2B 已创建 `backend/src/scripts/check-db.ts`（读取验证）。
- Phase 2B 已配置 `db:seed`、`db:check` npm scripts。
- Phase 2B 已验证写入→读取完整链路。
- 注意：本机 `prisma migrate` 不可用（返回空 `Schema engine error`），当前使用 `prisma db push` 替代作为本地原型方案。

## 下一步

Phase 3 建议在 backend 中实现登录鉴权和业务 API，先备份、读档、写计划。
