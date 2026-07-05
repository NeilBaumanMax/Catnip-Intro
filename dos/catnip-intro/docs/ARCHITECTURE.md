# ARCHITECTURE

## 当前阶段

当前完成 Phase 2C：后端技术栈切换文档修正。

本文件描述目标架构，不代表当前已经实现所有业务功能。

## 总体架构

Catnip Intro 使用四层结构：

- frontend：浏览器端界面层（Next.js + TypeScript + Tailwind CSS）。
- Go backend：服务端接口层（Go + SQLite + 本地 uploads）。
- SQLite：本地数据持久层。
- uploads：本地图片文件层。

## 数据流

1. 用户访问 frontend。
2. frontend 调用 Go backend API。
3. Go backend 读取或写入 SQLite。
4. Go backend 处理图片上传，将真实图片文件保存到 uploads。
5. SQLite 保存图片访问路径，不保存真实图片二进制内容。
6. frontend 通过 Go backend 暴露的静态路径访问 uploads 图片。

## frontend 职责

frontend 负责：

- 官网页面展示。
- 后台管理页面展示。
- 登录表单和后台操作界面。
- 调用 Go backend API。
- 展示产品、案例、留言、网站设置等数据。
- 展示上传后的图片。

frontend 不负责：

- 直接读写 SQLite。
- 直接读写 uploads 文件夹。
- 保存登录密码。
- 执行服务端鉴权逻辑。
- 处理真实图片文件落盘。

## Go backend 职责

Go backend 负责：

- 登录接口。
- 鉴权和后台访问控制。
- 产品接口。
- 案例接口。
- 留言接口。
- 网站设置接口。
- 图片上传接口。
- SQLite 数据读写。
- uploads 静态文件访问。
- 输入校验和错误响应。

Go backend 不负责：

- 渲染前端页面。
- 将图片二进制内容写入 SQLite。
- 让 frontend 绕过 API 直接访问数据库。

## SQLite 职责

SQLite 负责保存结构化文字数据和图片路径，包括：

- Admin
- Product
- Case
- Message
- SiteSetting

SQLite 不负责：

- 保存真实图片文件。
- 提供公网服务。
- 执行业务路由。
- 直接暴露给浏览器。

## uploads 职责

uploads 负责保存后台上传的真实图片文件。

uploads 不负责：

- 保存业务文字数据。
- 保存数据库文件。
- 执行图片数据库索引。
- 直接被 frontend 以文件系统方式访问。

## 目录映射

- `frontend/`: 前端应用目录（Next.js）。
- `backend/`: Go 后端应用目录（已包含 Node/Prisma 历史代码，保留不动）。
- `data/`: SQLite 数据库文件目录。
- `uploads/`: 图片文件目录。
- `dos/catnip-intro/`: 工程控制文档目录。
