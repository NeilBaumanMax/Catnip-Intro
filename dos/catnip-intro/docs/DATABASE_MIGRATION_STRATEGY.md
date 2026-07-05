# DATABASE_MIGRATION_STRATEGY

## 当前阶段

Phase 2C：数据库迁移方案评估。

## 背景

### 当前 Prisma 状态

| 能力 | 状态 | 说明 |
|------|------|------|
| `prisma db push` | ✅ 可用 | 直接同步 schema 到 SQLite |
| `prisma generate` (Client) | ✅ 可用 | 生成类型安全的 Prisma Client |
| `prisma validate` | ✅ 可用 | schema 验证通过 |
| `prisma migrate diff` | ✅ 可用 | 可以生成 SQL |
| seed / check 脚本 | ✅ 可用 | Prisma Client 读写正常 |
| `prisma migrate dev` | ❌ 不可用 | 返回空 `Schema engine error` |
| `prisma migrate deploy` | ❌ 不可用 | 同上 |

### 问题根因

本机 macOS (darwin-arm64) + Node v24.16.0 环境下，Prisma 6.19.0 的 `schema-engine-darwin-arm64` 二进制在 migration 场景下返回空的 `Schema engine error`。已排查：

- 不是 schema 语法问题（空 schema 也失败）
- 不是业务模型问题（最小 Admin schema 也失败）
- 不是 SQLite 相对路径问题（临时绝对路径也失败）
- 不是 Prisma 版本问题（5.22.0 和 6.19.0 同样失败）
- `migrate diff` 可以正常生成 SQL（说明引擎的 SQL 生成能力正常）
- `db push` 可以正常执行（说明引擎的 schema 同步能力正常）
- 仅 migration 执行路径失败

结论：这是 Prisma migration engine 在特定环境下的 bug，不是项目配置或代码问题。

---

## 方案评估

### 方案 A：继续 Prisma + db push（推荐）

#### 优点

1. **零迁移成本**。当前所有代码（prisma.ts、seed.ts、check-db.ts、schema.prisma）无需任何修改。
2. **类型安全**。Prisma Client 从 schema 自动生成完整 TypeScript 类型，后续接口开发时每个查询都有智能提示和编译时检查。
3. **开发效率高**。schema 修改后只需 `prisma db push`，一条命令同步到 SQLite，原型迭代极快。
4. **db push 行为明确**。`db push` 直接对比 schema 和数据库结构，自动添加缺失的表/列，是原型阶段最直观的同步方式。
5. **生态系统成熟**。Prisma Studio（可视化管理数据）、Prisma Client 的 relation queries、中间件等，后续开发时可直接使用。
6. **迁移路径清晰**。当需要正式 migration 时，可以在其他环境（CI、同事机器）执行 `prisma migrate dev`，将生成的 migration 文件提交到仓库。

#### 缺点

1. **不生成 migration history**。`db push` 不创建 `migrations/` 目录，无法通过 migration 文件追溯数据库结构变更历史。
2. **无法回滚**。没有 migration 文件就无法 `migrate down`。
3. **团队协作受限**。多人开发时，没有 migration 文件就难以保证每人数据库结构一致（但本机单人开发不涉及）。
4. **上线流程不标准**。正式生产环境通常要求 migration-based deployment，而非 push。

#### 适用阶段

- ✅ 本地原型开发
- ✅ 单人开发
- ✅ 快速迭代期
- ❌ 多人协作（需 migration 文件同步）
- ❌ 生产部署（需可审计 migration）

#### 风险

- **当前阶段风险低**。独立站原型开发、单人开发场景下，`db push` 完全满足需求。
- **未来风险可控**。切换到正式 migration 时，可以通过在支持的环境中执行一次 `prisma migrate dev --name init` 生成初始 migration，从那里开始累积 migration history。

#### 是否适合当前第一版

**是**。当前项目第一版是单人原型开发，目标是快速完成独立站前后台功能。`db push` 的开发效率最高，风险最低。

#### 未来如何切换到正式迁移方案

1. 当本机 Prisma migration engine 问题解决后（升级 Node、系统更新、Prisma 版本修复），在项目根目录执行：
   ```bash
   cd backend
   npx prisma migrate dev --name init --schema prisma/schema.prisma
   ```
   这会基于当前数据库结构生成初始 migration 文件。

2. 或者在 CI/CD 环境执行 migrate，将生成的 `migrations/` 目录提交到仓库。

3. 后续 schema 变更使用 `prisma migrate dev --name <描述>` 代替 `prisma db push`。

---

### 方案 B：继续排查 prisma migrate dev

#### 排查成本

- **时间成本高**。Phase 2A-Debug 已耗时 2 轮修复（Prisma 版本升级、schema 隔离测试、路径测试、deploy 测试），均未解决。
- **不确定性强**。这是 Prisma engine binary 级别的 bug，可能涉及本机系统库版本、macOS 安全策略、Node 版本兼容性等底层问题。
- **可能长期无解**。从问题表现（5.22.0 和 6.19.0 两个大版本均失败）来看，不是近期引入的 regression，可能是长期存在的环境兼容问题。

#### 可能收益

- 如果能解决，可以正常使用 `prisma migrate dev`，获得完整的 migration history 支持。
- 但即使解决了，对当前原型阶段的开发效率提升**几乎为零**（`db push` 已经满足所有需求）。

#### 是否会阻塞当前独立站开发

**会**。如果继续死磕排查，独立站原型开发将被无限期推迟。而 `prisma migrate` 对当前阶段的价值是"锦上添花"，不是"雪中送炭"。

#### 是否建议继续死磕

**不建议**。付出和收益严重不对等。`db push` 已经足够支撑整个第一版开发。把时间花在业务功能上更划算。

---

### 方案 C：改用 Drizzle ORM + drizzle-kit

#### Drizzle 对 SQLite 的支持

Drizzle 通过 `better-sqlite3` 或 `@libsql/client` 驱动支持 SQLite，支持程度良好。`drizzle-orm` 提供完整的 CRUD API，`drizzle-kit` 提供 schema 管理工具链。

#### drizzle-kit 的能力

| 命令 | 功能 | 对应 Prisma |
|------|------|------------|
| `drizzle-kit generate` | 从 schema 生成 SQL migration 文件 | `prisma migrate dev` |
| `drizzle-kit push` | 直接同步 schema 到数据库 | `prisma db push` |
| `drizzle-kit migrate` | 执行 migration 文件 | `prisma migrate deploy` |
| `drizzle-kit studio` | 可视化管理数据 | `prisma studio` |

能力上完全覆盖 Prisma 的迁移和管理功能。而且 `drizzle-kit push` 与 `drizzle-kit generate` + `drizzle-kit migrate` 可以灵活切换，不像 Prisma 的 `db push` 和 `migrate dev` 有互斥关系。

#### 是否适合 TypeScript 项目

**非常适合**。Drizzle 是 TypeScript-first，schema 定义为 `.ts` 文件，类型推断比 Prisma 更灵活。可以定义更复杂的字段类型和关系。

#### 替换成本

- **schema 重写**：`prisma/schema.prisma` → `src/db/schema.ts`（约 60 行 Prisma schema → 约 80 行 Drizzle schema）
- **Client 重写**：`src/lib/prisma.ts` → `src/lib/db.ts`（约 4 行）
- **seed/check 重写**：API 差异较大，约 100-150 行改动
- **依赖变更**：移除 `prisma` + `@prisma/client`，添加 `drizzle-orm` + `better-sqlite3` + `drizzle-kit`
- **npm scripts 重写**：4-5 个 scripts 更新
- **后续接口开发**：所有数据库查询需要从 Prisma Client API 改为 Drizzle API

估计总替换成本：**1-2 小时**重写现有 3 个文件 + **持续成本**体现在后续每个接口的查询语法差异。

#### 对现有 seed/check 的影响

seed.ts 和 check-db.ts 需要全部重写。Prisma 的 `upsert`、`findFirst`、`count()` API 与 Drizzle 的对应 API 语义接近但语法不同。

#### 对后续接口开发的影响

Drizzle 的查询 API 比 Prisma 更接近 SQL，对熟悉 SQL 的开发者更直观。但在 relation 查询、嵌套写入等方面不如 Prisma Client 简洁。

---

### 方案 D：改用 Knex

#### Knex 的 migration 能力

Knex 内置完整的 migration 系统：`knex migrate:make`、`knex migrate:latest`、`knex migrate:rollback`。这是 Knex 最成熟、最稳定的功能之一。

#### SQLite 支持情况

Knex 原生支持 SQLite（通过 `sqlite3` 驱动），支持良好，文档完备。

#### 类型安全不足

**这是 Knex 最大的短板**。Knex 默认不提供 TypeScript 类型推断。需要手动定义 interface 或使用第三方类型生成工具（如 `knex-types`）。相比 Prisma 和 Drizzle，类型安全性差距显著：

```typescript
// Prisma - 完全类型安全
const product = await prisma.product.findFirst({ where: { id: 1 } });
product.name; // ✅ TypeScript 知道这是 string

// Knex - 默认无类型
const product = await knex('Product').where('id', 1).first();
product.name; // ❌ TypeScript 不知道 product 的结构
```

#### 替换成本

与 Drizzle 类似，但查询语法更偏向原始 SQL builder 风格。后续接口开发时，每个查询都需要手动处理类型。

#### 是否适合当前项目

**不太适合**。当前项目已在 TypeScript strict 模式下运行，引入 Knex 会损失类型安全保障，增加运行时类型错误风险。Knex 更适合 TypeScript 环境不严格、或者团队偏好 SQL-first 风格的场景。

---

### 方案 E：改用 Kysely

#### Kysely 的类型安全优势

Kysely 的类型推断能力介于 Prisma 和 Drizzle 之间。通过手动定义 `Database` interface，可以实现编译时的表名和列名检查：

```typescript
interface Database {
  Product: { id: number; name: string; ... };
  Case: { id: number; title: string; ... };
}
const product = await db.selectFrom('Product').selectAll().where('id', '=', 1).executeTakeFirst();
product.name; // ✅ 类型安全
```

#### SQLite 支持情况

Kysely 通过 `better-sqlite3` 驱动支持 SQLite，需要额外安装驱动适配器。

#### migration 支持情况

**Kysely 本身不包含 migration 工具**。需要单独使用：
- `kysely-migration`（社区库，功能较基础）
- 或者手动编写 SQL migration + Knex 做 migration runner
- 或者继续使用 Prisma 做 schema 管理 + Kysely 做查询（混合方案）

这是一个显著的不便之处，等于还要再选择一个 migration 工具。

#### 是否更偏 SQL builder

**是**。Kysely 本质是类型安全的 SQL query builder，不是 ORM。它不提供 relation 管理、schema 自动同步、migration 等功能。

#### 替换成本

比 Drizzle 更高，因为还需要额外选择和配置 migration 工具。当前项目规模小，引入 Kysely + 额外的 migration 工具组合会增加依赖链和配置复杂度。

---

## 最终建议

### 明确结论

| 决策项 | 结论 |
|--------|------|
| **当前第一版是否继续用 Prisma + db push** | **是，继续使用** |
| **是否现在替换 ORM** | **否，不替换** |
| **如果要平替，优先选哪个** | **Drizzle ORM + drizzle-kit** |
| **什么时候再替换** | **正式上线前重新评估** |
| **下一阶段** | **进入 Phase 3（后台登录与内容管理）** |

### 理由

1. **Prisma + db push 已经满足当前所有需求**。schema 管理、Client 生成、类型安全、读写验证全部通过。
2. **替换 ORM 的收益在当前阶段为零**。5 张表、单人开发、原型迭代阶段的 migration history 几乎没有价值。
3. **替换 ORM 的成本是实在的**。重写 3 个文件、改变后续所有接口的查询语法、可能引入新的环境问题。
4. **Prisma Client 的 DX 最优**。relation queries、嵌套写入、类型安全方面，Prisma Client 仍然是开箱即用体验最好的选择。
5. **迁移路径清晰**。`prisma db push` → `prisma migrate dev`（环境修复后） 的切换只需一条命令，不需要改任何代码。

### 技术债记录

| 项目 | 说明 | 优先级 | 处理时机 |
|------|------|--------|----------|
| Prisma migrate 不可用 | 本机 schema engine 返回空错误 | 中 | 正式上线前 |
| db push 无 migration history | 无法追溯数据库变更 | 低（当前阶段） | 切换 migrate 时一并解决 |
| DATABASE_URL 相对路径 | `file:../../data/company.db` 依赖运行目录 | 低 | 上线前改为绝对路径或统一 .env |

### 如果必须现在平替，选择 Drizzle ORM + drizzle-kit

原因：
1. drizzle-kit 的 generate/push/migrate 能力**完整覆盖** Prisma 的对应功能
2. TypeScript-first schema 定义，类型安全不输 Prisma
3. SQLite 支持良好
4. 社区活跃，文档质量高
5. 不依赖外部 engine binary（纯 TypeScript/JavaScript 实现），不会遇到 Prisma 这种 engine 兼容问题

---

## 迁移路线图

```
Phase 2C (当前)          Phase 3-6              正式上线前
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│ Prisma       │      │ Prisma       │      │ 重新评估     │
│ + db push    │ ───► │ + db push    │ ───► │              │
│              │      │ (原型开发)    │      │ A. 修复      │
│ 策略评估     │      │              │      │    migrate   │
│ 已完成 ✅    │      │ 业务功能开发  │      │ B. 或迁移    │
│              │      │              │      │    Drizzle   │
└─────────────┘      └──────────────┘      └──────────────┘
```

## 下一阶段

进入 **Phase 3：后台登录与内容管理**。继续使用 Prisma + db push，不阻塞业务开发。
