# frontend

当前完成 V2 视觉改版。猫薄荷企业官网前端。

## 启动

### 推荐：通过 Nginx 访问
```bash
# 项目根目录
./start-nginx.sh start    # Nginx :8080 → Next.js :3000 + Go :4000
```

### 直连方式
```bash
# 1. 后端
cd backend && go run ./cmd/server

# 2. 前端
cd frontend && npx next dev --hostname 0.0.0.0 --port 3000
```

### 访问
- Nginx: http://localhost:8080
- 直连: http://localhost:3000
- 后台: http://localhost:3000/admin/login
- 测试账号: admin / admin123456

## V2 视觉

- 毛玻璃导航 + 全页背景图 + 玻璃卡片
- 4 产品 Hero 轮播
- 联系我们词云动效
- Orbitron 科技风字体

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
| /admin/products | 产品管理（新增/编辑/删除/隐藏） |
| /admin/cases | 案例管理（新增/编辑/删除/隐藏） |
| /admin/messages | 留言管理（列表/详情/状态/删除） |
| /admin/settings | 网站设置（读取/修改/保存） |

## 技术栈

Next.js 16 + React 19 + TypeScript + Tailwind CSS + App Router
