# DEV_PROGRESS

## 当前阶段

Phase 6B：后台产品/案例管理 CRUD 页面。

## 当前状态

Phase 6B 已完成。产品管理和案例管理页面实现了完整的增删改查和显示隐藏功能。

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

### 底座
- Go 1.25 + net/http + database/sql + modernc.org/sqlite
- Next.js 16 + React 19 + TypeScript + Tailwind CSS
- SQLite (data/company.db, 不提交 Git)
- uploads (真实图片, 不提交 Git)
- Node/Prisma 历史代码保留

## 未完成

- 留言管理页面 (Phase 6C)
- 网站设置页面 (Phase 6C)

## 下一阶段

Phase 6C：留言管理页面 + 网站设置页面。
