# backend

当前完成 Phase 2B：数据库读写验证脚本。

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
npm run prisma:push        # 同步 schema 到 SQLite（本地原型方案）
npm run prisma:migrate     # Prisma migrate（本机暂不可用）

# 数据库验证
npm run db:seed             # 写入测试数据
npm run db:check            # 读取并打印数据库内容
```

## 目录结构

```
src/
├── app.ts              # Express 入口
├── lib/
│   └── prisma.ts       # Prisma Client 连接单例
└── scripts/
    ├── seed.ts          # 数据库写入验证脚本
    └── check-db.ts      # 数据库读取验证脚本
```

## 数据库

数据库文件：`data/company.db`

- `prisma:generate` — 从 schema 生成 Prisma Client
- `prisma:push` — 直接同步 schema 到 SQLite，不生成 migration 历史文件（本机 `prisma migrate` 不可用时的本地原型方案）
- `db:seed` — 写入 5 表测试数据（upsert，可重复执行）
- `db:check` — 读取各表数量和样例数据

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
- 执行 `db:seed` 和 `db:check` 验证数据库读写。

## 当前禁止

- 实现登录接口。
- 实现产品接口。
- 实现案例接口。
- 实现留言接口。
- 实现上传接口。
- 写任何前端页面。
