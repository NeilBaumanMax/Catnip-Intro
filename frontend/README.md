# frontend

当前完成 Phase 6A：admin 登录 + 后台布局骨架。

猫薄荷企业官网前端，使用 Next.js + TypeScript + Tailwind CSS。

## 启动

### 前置依赖
需要 Go backend 在 4000 端口运行。API 地址由 `NEXT_PUBLIC_API_BASE_URL` 配置。

### 1. 启动后端
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
- 前台：http://localhost:3000
- 后台登录：http://localhost:3000/admin/login
- 后台首页：http://localhost:3000/admin
- 测试账号：admin / admin123456

## 前台页面

| 路径 | 说明 |
|------|------|
| / | 首页 |
| /about | 关于我们 |
| /products | 产品列表 |
| /products/:id | 产品详情 |
| /cases | 案例列表 |
| /cases/:id | 案例详情 |
| /contact | 联系我们 |

## 后台页面

| 路径 | 说明 |
|------|------|
| /admin/login | 管理员登录 |
| /admin | 后台首页（需登录） |

## 技术栈

Next.js 16 + React 19 + TypeScript + Tailwind CSS + App Router
