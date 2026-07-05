# Catnip Intro

Catnip Intro 企业官网与后台管理系统。第一版已完成 🎉

## 架构

frontend (Next.js) + Go backend + SQLite + uploads

## 快速启动

### 1. 启动后端
```bash
cd backend
go run ./cmd/server    # 监听 0.0.0.0:4000
```

### 2. 启动前端
```bash
cd frontend
npm install
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000 npx next dev --hostname 0.0.0.0 --port 3000
```

### 3. 访问
- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin/login
- 测试账号：admin / admin123456

### 4. 局域网手机访问
```bash
NEXT_PUBLIC_API_BASE_URL=http://电脑IP:4000 npx next dev --hostname 0.0.0.0 --port 3000
```
手机浏览器访问：http://电脑IP:3000

## 目录

| 目录 | 说明 |
|------|------|
| frontend/ | Next.js 前端（前台+后台） |
| backend/ | Go 后端 API |
| data/ | SQLite 数据库文件 |
| uploads/ | 上传图片 |
| dos/catnip-intro/ | 工程文档 |

## 项目目标

建设一个基于 frontend + backend + SQLite + uploads 的企业介绍网站，支持官网内容展示、后台内容管理、留言管理、网站基础设置和图片上传。

## 第一版功能边界

前台页面：

- 首页
- 关于我们
- 产品展示
- 产品详情
- 案例展示
- 案例详情
- 联系我们

后台页面：

- 登录
- 后台首页
- 产品管理
- 案例管理
- 留言管理
- 网站设置

后端能力：

- 登录接口
- 产品接口
- 案例接口
- 留言接口
- 网站设置接口
- 图片上传接口
- uploads 静态文件访问

数据库实体：

- Admin
- Product
- Case
- Message
- SiteSetting

## 目录说明

- `dos/catnip-intro/`: Codex 工程控制文档和阶段记录。
- `frontend/`: 前端网站与后台管理页面所在目录。
- `backend/`: 后端接口服务所在目录。
- `data/`: SQLite 数据库文件和数据库相关说明所在目录。
- `uploads/`: 本地图片上传文件所在目录。

## 下一阶段

Phase 1 应先确认技术栈和最小可运行方案，再创建 frontend/backend 的基础项目骨架。Phase 1 开始前必须读取 `dos/catnip-intro/CODEX_START_HERE.md`。

## Codex 施工总流程

后续每次 Codex 施工必须遵守：

1. 开工前先备份当前仓库状态，优先使用 GitHub 仓库作为备份位置。
2. 备份完成后，按工程文档要求读取本轮相关文件。
3. 写出本次开工计划，再开始施工。
4. 施工过程中持续写日志。
5. 施工结束后执行测试，并写测试日志。
6. 测试不通过时，回到施工步骤继续修复，并继续写施工日志和测试日志。
7. 测试通过后，写记录文档，写日志，修正所有施工文档，处理文档漂移。
8. 提出下一次施工建议。
9. 最后将通过测试和文档修正后的结果上传到 GitHub。
