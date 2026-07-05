# backend layer progress

## 当前阶段

当前完成 Phase 1：backend 最小骨架。

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
- 后续阶段实现 API、鉴权、参数校验、数据库读写和静态文件访问。

## 禁止

- 在 Phase 1 实现登录、产品、案例、留言、上传等真实业务接口。
- 在 Phase 1 接入 SQLite。
- 在 Phase 1 接入 Prisma。
- 将真实图片保存到 SQLite。
- 让未鉴权请求访问后台管理接口。

## 当前进度

- Phase 0 已创建 `backend/README.md`。
- Phase 1 已创建 `backend/package.json`。
- Phase 1 已创建 `backend/tsconfig.json`。
- Phase 1 已创建 `backend/src/app.ts`。
- Phase 1 已配置基础 CORS。
- Phase 1 已配置 `dev`、`build`、`start` scripts。
- Phase 1 已实现 `GET /health`。
- Phase 1 已通过 `npm install`、`npm run build`、`npm run dev` 和 `/health` 访问测试。

## 下一步

Phase 2 建议建立 SQLite 文件位置和后端基础数据结构。进入 Phase 2 前先备份、读档、写计划。
