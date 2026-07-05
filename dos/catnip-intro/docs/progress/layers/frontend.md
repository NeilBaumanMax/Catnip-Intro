# frontend layer progress

## 当前阶段

当前完成 Phase 6A：admin 登录 + 后台布局骨架。

## 职责

frontend 负责官网页面和后台管理页面。

## 技术栈

- Next.js 16.2.10
- React 19.2.4
- TypeScript
- Tailwind CSS
- App Router

## 当前进度

### Phase 5：前台官网 ✅
- 首页 (/)、关于我们 (/about)、产品列表 (/products)、产品详情 (/products/[id])
- 案例列表 (/cases)、案例详情 (/cases/[id])、联系我们 (/contact)
- 联系表单 POST /api/messages
- 数据来源：GET /api/settings, /api/products, /api/cases

### Phase 5R：前台补验收 ✅
- force-dynamic 动态渲染
- 后端断连错误提示
- 产品/案例详情 API 错误处理

### Phase 6A：admin 后台骨架 ✅
- /admin/login (登录页, POST /api/auth/login, localStorage token)
- /admin (后台首页仪表盘, token 鉴权守卫)
- AdminLayout (侧边栏导航 + 顶栏 + 退出登录)
- adminAuth.ts (token save/get/clear)
- adminApi.ts (login + ping)
- 移动端响应式侧边栏

## 未完成

- [ ] /admin/products 产品管理 CRUD 页面
- [ ] /admin/cases 案例管理 CRUD 页面
- [ ] /admin/messages 留言管理页面
- [ ] /admin/settings 网站设置页面

## 下一步

Phase 6B：产品/案例管理 CRUD 页面。
