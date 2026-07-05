# backend

当前完成 Phase 2A：Prisma + SQLite 基础接入。

本目录是 Catnip Intro 的后端服务目录。

## 技术栈

- Node.js
- Express
- TypeScript
- CORS
- Prisma 6.19.0
- SQLite

## 命令

```bash
npm install
npm run build
npm run dev
npm start

# Prisma
npm run prisma:generate   # 生成 Prisma Client
npm run prisma:push        # 同步 schema 到 SQLite（替代 migrate）
npm run prisma:migrate     # Prisma migrate（本机暂不可用）
```

## 数据库

数据库文件：`data/company.db`

- `prisma:generate` — 从 schema 生成 Prisma Client
- `prisma:push` — 直接同步 schema 到 SQLite，不生成 migration 历史文件

注意：本机 Prisma migration engine 不可用（返回空 `Schema engine error`），当前使用 `prisma db push` 替代 `prisma migrate`。

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
- 通过 Prisma Client 连接 SQLite。

## 当前禁止

- 实现登录接口。
- 实现产品接口。
- 实现案例接口。
- 实现留言接口。
- 实现上传接口。
- 写任何前端页面。
