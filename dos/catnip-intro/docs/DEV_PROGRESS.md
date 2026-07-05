# DEV_PROGRESS

## 当前阶段

Phase 6C：后台留言管理 + 网站设置页面。

## 当前状态

Phase 6C 已完成。后台页面 6/6 全部完成：登录、首页、产品、案例、留言、设置。

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

### 底座
- Go 1.25 + net/http + database/sql + modernc.org/sqlite
- Next.js 16 + React 19 + TypeScript + Tailwind CSS
- SQLite (data/company.db, 不提交 Git)
- uploads (真实图片, 不提交 Git)
- Node/Prisma 历史代码保留

## 未完成

- 全站端到端联调验收 (Phase 7)
- 局域网手机访问测试 (Phase 7)

## 下一阶段

Phase 7：全站联调 + 局域网手机访问验收。
