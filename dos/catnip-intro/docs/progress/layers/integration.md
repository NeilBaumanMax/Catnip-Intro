# integration layer progress

## 当前阶段

当前只完成 Phase 0：工程脚手架。

## 职责

integration 负责约束 frontend、backend、SQLite、uploads 之间的协作方式。

## 允许

- 定义 API 契约。
- 定义登录态传递方式。
- 定义图片访问 URL 规则。
- 定义错误响应格式。

## 禁止

- 绕过 backend 让 frontend 直接访问 SQLite。
- 绕过 backend 让 frontend 直接读写 uploads 文件系统。
- 在 Phase 0 固化尚未确认的技术栈细节。

## 当前进度

- Phase 0 已定义架构边界和层级契约。
- 尚未定义具体 API 请求和响应格式。

## 下一步

Phase 1 或 Phase 2 开始补充 API 契约草案。

