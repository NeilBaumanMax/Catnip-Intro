# DEV_PROGRESS

## 当前阶段

Phase 4B：Go backend 产品/案例业务接口。

## 当前状态

Phase 4B 测试通过。12 个接口全部可用：6 个公开访问 + 6 个后台管理（token 鉴权）。

## 已完成

### Phase 0-4A ✅
### Phase 4B：产品/案例业务接口 ✅
- `internal/products/`：repository + service + handler（6 个接口）
- `internal/cases/`：repository + service + handler（6 个接口）
- 公开接口（无需登录）：列表/详情，只返回 is_visible=true
- 后台接口（需 Bearer token）：创建/编辑/删除/显示隐藏
- 统一响应：`{"ok":true,"data":...}` 或 `{"ok":false,"error":"..."}`

## 已完成接口

| 方法 | 路径 | 鉴权 | 说明 |
|------|------|------|------|
| GET | /health | 公开 | 健康检查 |
| POST | /api/auth/login | 公开 | 管理员登录 |
| POST | /api/uploads | 公开 | 图片上传 |
| GET | /uploads/... | 公开 | 静态文件 |
| GET | /api/products | 公开 | 产品列表（仅可见） |
| GET | /api/products/{id} | 公开 | 产品详情（仅可见） |
| GET | /api/cases | 公开 | 案例列表（仅可见） |
| GET | /api/cases/{id} | 公开 | 案例详情（仅可见） |
| GET | /api/admin/ping | token | 鉴权验证 |
| POST | /api/admin/products | token | 新增产品 |
| PUT | /api/admin/products/{id} | token | 修改产品 |
| DELETE | /api/admin/products/{id} | token | 删除产品 |
| PATCH | /api/admin/products/{id}/visibility | token | 显示/隐藏 |
| POST | /api/admin/cases | token | 新增案例 |
| PUT | /api/admin/cases/{id} | token | 修改案例 |
| DELETE | /api/admin/cases/{id} | token | 删除案例 |
| PATCH | /api/admin/cases/{id}/visibility | token | 显示/隐藏 |

## 未完成

- 留言接口
- 网站设置接口
- 前端页面

## 下一阶段

Phase 4C：留言接口 + 网站设置接口，或 Phase 5：frontend 前端项目。
