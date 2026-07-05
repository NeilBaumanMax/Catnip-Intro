# DEV_PROGRESS

## 当前阶段

项目第一版交付，前台视觉 V2 改版完成。

## 当前状态

全站功能完整，后台 6 页面 + 前台 7 页面，玻璃风格视觉，Nginx 反向代理已配置。

## 已完成

### 后端 (Go backend)
- Phase 0-4C: Go backend 24 个 API 全部完成 ✅
- /health、登录、上传、产品/案例/留言/设置 CRUD

### 前端 (Next.js)
- Phase 5: 前台官网 7 页面 ✅
- Phase 5R: 前台补验收修正（force-dynamic + 错误处理）✅
- Phase 6A: admin 登录 + 后台布局骨架 ✅
  - /admin/login (登录页)
  - /admin (后台首页仪表盘)
  - AdminLayout (侧边栏 + token 鉴权守卫)
  - adminAuth.ts (localStorage token 管理)
  - adminApi.ts (login + ping API)
- Phase 6B: 后台产品/案例管理 CRUD 页面 ✅
  - /admin/products (产品 CRUD + 显示隐藏)
  - /admin/cases (案例 CRUD + 显示隐藏)
- Phase 6C: 后台留言管理 + 网站设置页面 ✅
  - /admin/messages (列表+详情+状态+删除)
  - /admin/settings (读取+修改网站设置)
  - 后台页面 6/6 全部完成 🎉
- Phase 7: 全站联调 + 局域网手机访问验收 ✅
  - 24 后端 API 回归全部通过
  - 4 条 E2E 闭环验证通过（产品/案例/留言/设置）
  - 图片上传+静态访问闭环通过
  - CORS 已支持局域网访问
  - LAN IP: 10.139.223.120

- V2 视觉改版 ✅
  - 毛玻璃导航栏（backdrop-blur）
  - 全页背景图 + 玻璃卡片（关于我们、产品中心、联系我们）
  - Hero 4 产品轮播（每 4s 自动切换）
  - Orbitron 科技风字体
  - 联系我们词云动效
  - 产品中心 4 产品大卡片
- 后端 SSE 轮播 ✅ (Go goroutine 计时 → EventSource 推送)
- 移动端适配 ✅ (响应式间距、Hero 图片手机可见)
- Nginx 反向代理 ✅ (:8080 → Next.js :3000 + Go :4000)

### 底座
- Go 1.25 + net/http + database/sql + modernc.org/sqlite
- Next.js 16 + React 19 + TypeScript + Tailwind CSS
- SQLite (data/company.db, 不提交 Git)
- uploads (真实图片, 不提交 Git)
- Nginx 1.26.2 反向代理
- Node/Prisma 历史代码保留

## 未完成

- 无。第一版全部功能已交付。

## 下一阶段

后续可考虑：产品图片优化、SEO 元数据、生产部署、Node/Prisma 清理。
