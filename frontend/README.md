# frontend

当前完成 Phase 5：frontend 前台官网骨架。

猫薄荷企业官网前端，使用 Next.js + TypeScript + Tailwind CSS。

## 启动

### 1. 先启动后端
```bash
cd backend && go run ./cmd/server
```

### 2. 启动前端
```bash
cd frontend
npm install
npx next dev --hostname 0.0.0.0 --port 3000
```

### 3. 访问
- 本地：http://localhost:3000
- 局域网：http://电脑IP:3000（需修改 .env.local 中的 API 地址）

## 页面

| 路径 | 说明 |
|------|------|
| / | 首页 |
| /about | 关于我们 |
| /products | 产品列表 |
| /products/:id | 产品详情 |
| /cases | 案例列表 |
| /cases/:id | 案例详情 |
| /contact | 联系我们 |

## 技术栈

Next.js 16 + React 19 + TypeScript + Tailwind CSS + App Router
