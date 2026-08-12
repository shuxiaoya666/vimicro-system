# 小唯管理系统 - 部署上线指南

本指南将帮助你把前后端全部部署到云端。

## 架构说明

```
用户浏览器
    │
    ├── 前端页面 ← GitHub Pages (https://shuxiaoya666.github.io/vimicro-system/)
    │       │
    │       └── API 请求 → Render 后端 (https://xiaowei-backend.onrender.com)
    │                              │
    │                              └── 数据库 → PlanetScale MySQL (云端)
    │
    └── 数据存储在 PlanetScale，不再依赖浏览器 localStorage
```

## 需要注册的免费账号

| 平台 | 用途 | 费用 | 注册地址 |
|------|------|------|----------|
| GitHub | 代码仓库 + 前端托管 | 免费 | https://github.com |
| PlanetScale | MySQL 云数据库 | 免费 5GB | https://planetscale.com |
| Render | Node.js 后端托管 | 免费 750h/月 | https://render.com |

---

## 第一步：创建 PlanetScale 数据库

### 1.1 注册并创建数据库

1. 访问 https://planetscale.com 注册账号（可用 GitHub 登录）
2. 点击 **New Database** → **Create new database**
3. 数据库名填 `xiaowei_system`，选择 **Free** 计划
4. 点击 **Create database**

### 1.2 获取连接字符串

1. 在数据库页面点击 **Connect**
2. 选择 **Node.js** 作为语言
3. 复制连接字符串，格式类似：
   ```
   mysql://xxxxxxxx:password@aws.connect.psdb.cloud/xiaowei_system?ssl={"rejectUnauthorized":true}
   ```
4. 保存这个字符串，后面 Render 部署时要用

### 1.3 导入数据库 Schema

1. 在 PlanetScale 控制台进入数据库的 **Console** 页面
2. 打开本项目的 `backend/schema.sql` 文件
3. 删除开头的两行（PlanetScale 不支持）：
   ```sql
   CREATE DATABASE IF NOT EXISTS xiaowei_system ...   ← 删除这行
   USE xiaowei_system;                                 ← 删除这行
   ```
4. 复制剩余所有 SQL 语句
5. 粘贴到 PlanetScale Console 中执行
6. 确认看到所有表已创建：`SHOW TABLES;`

### 1.4 验证数据

在 PlanetScale Console 中执行：
```sql
SELECT COUNT(*) FROM users;    -- 应返回 6
SELECT COUNT(*) FROM clinics;  -- 应返回 7
SELECT COUNT(*) FROM patients; -- 应返回 7
```

---

## 第二步：推送代码到 GitHub

### 2.1 确保前端代码已更新

项目中的 `js/config.js` 已配置好 API 地址。如果 Render 分配的 URL 不同，修改此文件：

```javascript
var API_CONFIG = {
  baseUrl: 'https://你的服务名.onrender.com/api',  // ← 改为 Render 分配的地址
  enabled: true
};
```

### 2.2 推送代码

确保整个项目（包含 backend/ 目录）推送到 GitHub：

```bash
cd 小唯管理系统
git add .
git commit -m "添加后端部署配置和云端 API 地址"
git push origin main
```

> 注意：`backend/.env` 和 `backend/node_modules/` 已在 `.gitignore` 中忽略，不会上传

---

## 第三步：在 Render 部署后端

### 3.1 创建 Render 账号

1. 访问 https://render.com 注册（可用 GitHub 登录）

### 3.2 创建 Web Service

1. 点击 **New +** → **Web Service**
2. 连接你的 GitHub 仓库（选择 `vimicro-system` 仓库）
3. 填写配置：
   - **Name**: `xiaowei-backend`
   - **Region**: 选择最近的区域
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. 点击 **Create Web Service**

### 3.3 配置环境变量

在 Render 服务的 **Environment** 页面添加以下变量：

| Key | Value |
|-----|-------|
| `DATABASE_URL` | 粘贴第一步获取的 PlanetScale 连接字符串 |
| `JWT_SECRET` | `xiaowei_dental_implant_system_secret_key_2025` |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |

> 关键：`DATABASE_URL` 必须包含 `?ssl={"rejectUnauthorized":true}` 参数

### 3.4 等待部署完成

1. Render 会自动安装依赖并启动服务
2. 部署完成后，Render 会分配一个 URL，如：`https://xiaowei-backend.onrender.com`
3. 访问 `https://xiaowei-backend.onrender.com/api/health` 验证
4. 应返回：`{"status":"ok","message":"小唯管理系统后端服务运行中"}`

### 3.5 验证 API

用浏览器或终端测试登录：

```bash
curl -X POST https://xiaowei-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"account":"admin","password":"123456"}'
```

应返回包含 `token` 和 `user` 的 JSON。

---

## 第四步：更新前端 API 地址

### 4.1 获取 Render URL

在 Render 服务的顶部可以看到分配的 URL，例如：
```
https://xiaowei-backend.onrender.com
```

### 4.2 更新 config.js

编辑 `js/config.js`，将 `baseUrl` 改为 Render 地址 + `/api`：

```javascript
var API_CONFIG = {
  baseUrl: 'https://xiaowei-backend.onrender.com/api',  // ← 改为你的 Render URL
  enabled: true
};
```

### 4.3 推送到 GitHub

```bash
git add js/config.js
git commit -m "更新 API 地址为 Render 云端地址"
git push origin main
```

GitHub Pages 会在 1-2 分钟内自动更新。

---

## 第五步：验证完整系统

### 5.1 验证前端

1. 访问 https://shuxiaoya666.github.io/vimicro-system/
2. 登录页面应正常显示
3. 使用 admin / 123456 登录
4. 系统应通过 API 连接到 Render 后端
5. 验证数据来自 PlanetScale（而非 localStorage）

### 5.2 验证 API 连接

在浏览器开发者工具（F12）的 **Network** 面板中：
1. 登录时应看到对 `xiaowei-backend.onrender.com` 的请求
2. 请求状态应为 200
3. 不应看到 "API不可用，使用本地账号验证" 的降级提示

### 5.3 验证数据持久化

1. 在系统中新增一条数据（如新增诊所）
2. 刷新页面
3. 新增的数据应仍然存在（说明数据存储在云端 MySQL）

---

## 常见问题

### Q: Render 免费服务会休眠吗？
会。Render 免费服务 15 分钟无访问后会自动休眠。首次请求可能需要 30-60 秒冷启动。如需 7x24 运行，升级到付费计划（$6/月）。

### Q: PlanetScale 支持外键吗？
PlanetScale 默认不强制外键约束，但本系统不依赖外键，完全兼容。

### Q: 如何查看数据库内容？
在 PlanetScale 控制台使用 Web Console 执行 SQL 查询，或使用 `pscale` CLI 工具连接。

### Q: 如何修改 API 地址？
只需修改 `js/config.js` 中的 `baseUrl`，推送到 GitHub 即可。无需修改其他文件。

### Q: 如何重置数据库？
在 PlanetScale Console 中执行：
```sql
-- 删除所有表后重新导入 schema.sql（去掉 CREATE DATABASE 和 USE 语句）
```

### Q: CORS 错误怎么办？
后端已配置 `app.use(cors())` 允许所有来源跨域访问。如果仍有问题，检查 Render 服务是否正常启动。

---

## 文件变更清单

本次部署更新了以下文件：

| 文件 | 变更内容 |
|------|----------|
| `js/config.js` | 新建 - 集中管理 API 地址 |
| `index.html` | 添加 config.js 引用，更新版本号 |
| `js/data.js` | 使用 API_CONFIG.baseUrl 替代硬编码 URL |
| `js/app.js` | 3 处 fetch 调用使用 API_CONFIG |
| `backend/server.js` | 适配云端环境，支持无前端文件运行 |
| `backend/config/database.js` | 支持 DATABASE_URL 连接字符串 |
| `backend/.env.example` | 添加 DATABASE_URL 配置说明 |
| `backend/render.yaml` | 新建 - Render 部署配置 |
