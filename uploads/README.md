# uploads

当前完成 Phase 3：uploads 图片上传与静态访问。

本目录用于保存后台上传的真实图片文件。

## 目录结构

```
uploads/
├─ README.md
├─ .gitkeep
├─ products/         # 产品图片
│  └─ .gitkeep
├─ cases/            # 案例图片
│  └─ .gitkeep
├─ company/          # 公司/网站设置图片（logo 等）
│  └─ .gitkeep
└─ qrcode/           # 二维码图片
   └─ .gitkeep
```

## 访问

上传的文件通过 Go backend 提供静态访问：

```
http://localhost:4000/uploads/products/xxx.png
```

## 上传接口

```
POST /api/uploads
Content-Type: multipart/form-data

参数:
- file: 上传文件（必填）
- category: 分类（可选，默认 products，允许: products, cases, company, qrcode）

限制:
- 文件类型: JPEG, PNG, WebP, SVG
- 最大大小: 5 MB
```

## Git 规则

- 目录结构（.gitkeep、README.md）提交到 Git。
- 上传的真实图片文件不提交（.gitignore 已忽略）。

## 允许

- 保存产品、案例、网站设置等后台上传的图片。
- 由 Go backend 提供静态文件访问。

## 禁止

- 保存 SQLite 数据库文件。
- 保存源码。
- 保存业务文字数据。
- 由 frontend 直接读写文件系统。
