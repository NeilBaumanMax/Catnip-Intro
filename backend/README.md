# backend

当前完成 Phase 1：backend 最小可运行骨架。

本目录是 Catnip Intro 的后端服务目录。当前阶段只提供 Express + TypeScript 基础服务和健康检查接口，不包含数据库、Prisma、登录、产品、案例、留言、上传或其他真实业务接口。

## 技术栈

- Node.js
- Express
- TypeScript
- CORS

## 命令

```bash
npm install
npm run build
npm run dev
npm start
```

## 健康检查

开发服务监听：

- Host: `0.0.0.0`
- Port: `4000`

访问：

```text
http://localhost:4000/health
```

期望返回：

```json
{
  "ok": true,
  "message": "backend is running"
}
```

## 当前允许

- 启动后端服务。
- 访问 `GET /health`。
- 使用基础 CORS。

## 当前禁止

- 接入 SQLite。
- 接入 Prisma。
- 实现登录接口。
- 实现产品接口。
- 实现案例接口。
- 实现留言接口。
- 实现上传接口。
- 写任何前端页面。
