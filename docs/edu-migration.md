# Edu 应用迁移记录

## 目标

基于 `ts-app-starter` 重新建立 Edu 应用，逐步迁移旧项目的业务能力，同时验证 `@lingcoo/*` 公共 package 是否真正通用，并记录迁移中产生的新公共能力需求。

旧项目：`lingcoo-edu-system`

新项目：`edu-business-system`

环境变量基线参照：`ts-app-starter-npx-demo`

## 迁移原则

- 新项目的运行环境、工程结构、Docker 和 CI 以 Starter 为准；
- 不直接复制旧项目的 Fastify 启动入口、配置体系和全局业务文件；
- 数据表归属新的业务模块，避免继续扩大单一 `schema.ts`；
- 公共 package 只有在迁移中证明边界稳定后才接入；
- 迁移每个纵向切片后都必须通过类型检查、测试和构建。

## 阶段

### 0. 生成基线

- [x] 使用官方 CLI 生成项目；
- [x] 初始化 Git；
- [x] 保持 `.env.example` 与 npx demo 字段一致；
- [x] 建立本地 `.env`；
- [x] 运行 Starter 基线检查。

### 1. 公共基础验证

- [ ] 验证 `@lingcoo/security` 与旧版 scrypt 密码格式兼容；
- [ ] 验证 `@lingcoo/crypto` 替换旧 `settings-crypto`；
- [ ] 验证 `@lingcoo/http` 对齐 API 错误响应；
- [ ] 判断是否还需要 Edu 专用的公共能力。

### 2. 后端基础迁移

- [ ] 环境和数据库访问边界；
- [ ] 账户与认证模块；
- [ ] 机构、人员和权限基础；
- [ ] 设置、邮件和存储配置适配。

### 3. 业务纵向切片

按可独立验证的业务闭环迁移：

1. 机构与人员；
2. 课程与班级；
3. 排课与考勤；
4. 课包、合同与支付；
5. CRM、试听和内容；
6. 报表与后台工具。

### 4. 前端迁移

- [ ] Admin 页面和 API client；
- [ ] 公共 Web 页面；
- [ ] 组件、设计 token 和前端公共能力评估。
