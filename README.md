# 小唯管理系统

口腔种植体产业链综合管理系统 — 六端口统一登录，角色权限隔离，全流程数据管理。

## 项目结构

```
小唯管理系统/
├── index.html              # 主入口页面（登录页 + 主应用框架）
├── css/
│   └── style.css           # 全局样式（青绿色主题 #1abc9c）
├── js/
│   ├── app.js              # 核心逻辑（登录、端口切换、导航）
│   ├── data.js             # 数据管理层（支持 API + localStorage 双模式）
│   ├── pages.js            # 六端页面渲染（平台/诊所/经销商/药店/工厂/客户端）
│   ├── crud.js             # CRUD 页面构建器（搜索/筛选/分页/增删改查/导出）
│   └── ui.js               # UI 组件库（弹窗、表单、提示等）
├── backend/                # 后端 API 服务
│   ├── package.json        # Node.js 依赖配置
│   ├── server.js           # Express 服务主入口
│   ├── schema.sql          # MySQL 数据库建表 + 种子数据
│   ├── .env.example        # 环境变量示例
│   ├── config/
│   │   ├── config.js       # 应用配置（JWT/端口）
│   │   └── database.js     # MySQL 连接池
│   ├── middleware/
│   │   └── auth.js         # JWT 认证中间件
│   ├── routes/
│   │   ├── auth.js         # 认证路由（登录/注册/获取用户）
│   │   ├── data.js         # 通用 CRUD 路由（28个实体）
│   │   └── upload.js       # 文件上传路由
│   └── scripts/
│       └── init-passwords.js  # 密码哈希初始化脚本
├── .vscode/
│   └── settings.json       # VS Code 工作区配置
├── .editorconfig           # 编辑器格式规范
├── .gitignore              # Git 忽略文件
└── README.md              # 项目说明
```

## 技术栈

### 前端
- 纯 HTML / CSS / JavaScript（无框架依赖）
- CSS 变量 + Grid + Flexbox 响应式布局
- 单页应用架构（SPA），客户端路由
- 数据层双模式：API 优先 + localStorage 降级

### 后端
- Node.js + Express（RESTful API）
- MySQL（mysql2 连接池）
- JWT 认证（jsonwebtoken + bcryptjs）
- 文件上传（multer）

## 快速开始

### 方式一：纯前端模式（无需后端）

直接用浏览器打开 `index.html`，或通过本地服务器运行：

```bash
# Python
python -m http.server 8080

# Node.js
npx serve
```

然后访问 `http://localhost:8080`，系统使用 localStorage 存储数据。

### 方式二：完整前后端模式（推荐）

#### 第一步：安装 MySQL

1. 下载安装 [MySQL 8.0](https://dev.mysql.com/downloads/mysql/)
2. 安装过程中记住设置的 root 密码
3. 验证安装：打开 MySQL 命令行，输入密码能正常连接即可

#### 第二步：导入数据库

打开 MySQL 命令行，执行：

```bash
mysql -u root -p < backend/schema.sql
```

或手动导入：
1. 打开 MySQL 命令行：`mysql -u root -p`
2. 执行：`source backend/schema.sql;`

这将创建 `xiaowei_system` 数据库，包含 28 张表和全部种子数据。

#### 第三步：安装 Node.js

1. 下载安装 [Node.js 18+](https://nodejs.org/)
2. 验证安装：`node -v` 和 `npm -v`

#### 第四步：配置后端

```bash
cd backend

# 安装依赖
npm install

# 复制环境变量配置文件
cp .env.example .env

# 编辑 .env 文件，填入你的 MySQL 密码
# DB_PASSWORD=你的MySQL密码
```

`.env` 文件配置项：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=xiaowei_system

# JWT 配置
JWT_SECRET=xiaowei_dental_implant_system_secret_key_2025
JWT_EXPIRES_IN=7d

# 服务器配置
PORT=3000
```

#### 第五步：（可选）初始化密码哈希

数据库中的密码默认为明文 `123456`，首次登录时会自动升级为 bcrypt 哈希。
如需提前初始化：

```bash
node scripts/init-passwords.js
```

#### 第六步：启动后端服务

```bash
cd backend
npm start
```

看到以下输出表示启动成功：

```
========================================
  小唯牙科种植体管理系统 - 后端服务
========================================
  服务地址: http://localhost:3000
  API 前缀: /api
  健康检查: http://localhost:3000/api/health
========================================
```

#### 第七步：访问系统

- 前端页面：`http://localhost:3000`（后端同时提供静态文件服务）
- API 健康检查：`http://localhost:3000/api/health`
- 前端独立运行：用浏览器打开 `index.html`（会自动连接 `http://localhost:3000` 的 API）

## 测试账号

| 账号     | 密码    | 角色         | 可用端口                     |
|----------|---------|--------------|------------------------------|
| admin    | 123456  | 超级管理员   | 全部端口                     |
| clinic   | 123456  | 李医生       | 诊所端                       |
| dealer   | 123456  | 张经理       | 经销商端                     |
| pharmacy | 123456  | 周店长       | 药店端                       |
| factory  | 123456  | 孙厂长       | 工厂端                       |
| client   | 123456  | 周小明       | 客户端                       |

## API 文档

### 认证接口

| 方法   | 路径                | 说明           | 认证 |
|--------|---------------------|----------------|------|
| POST   | /api/auth/login     | 用户登录       | 否   |
| POST   | /api/auth/register  | 提交注册申请   | 否   |
| GET    | /api/auth/me        | 获取当前用户   | 是   |

### 数据接口（通用 CRUD）

| 方法   | 路径                  | 说明         | 认证 |
|--------|-----------------------|--------------|------|
| GET    | /api/data/:entity     | 获取列表     | 是   |
| GET    | /api/data/:entity/:id | 获取单条     | 是   |
| POST   | /api/data/:entity     | 新增记录     | 是   |
| PUT    | /api/data/:entity/:id | 更新记录     | 是   |
| DELETE | /api/data/:entity/:id | 删除记录     | 是   |

支持的实体：clinics, pharmacies, factories, dealers, cards, products, settlements, roles, notifications, patients, orders, implants, transactions, withdrawals, verifyRecords, clientProducts, clientPackages, clientOrders, clientProgress, clientPoints, clientReviews, clientTransactions, clientCards, clientClinics, clientService, clientFAQ, registrations, users

### 文件上传

| 方法 | 路径       | 说明                   | 认证 |
|------|------------|------------------------|------|
| POST | /api/upload | 上传文件（最大 10MB） | 是   |

## 六端功能概览

### 平台端
首页概览、诊所管理、药店管理、工厂详情、经销商管理、种植体卡管理、商场管理、结算中心、财务报表、权限配置、消息通知、注册审核、病人信息查询

### 诊所端
首页概览、核销登记、患者建档、加工单管理、订单跟踪、植体管理、收支明细、提现申请、病人信息查询、诊所设置

### 经销商端
首页概览、诊所管理、药房管理、销售活动、佣金明细、提现申请、个人设置

### 药店端
首页概览、种植卡管理、库存查看、采购管理、财务收支、提现/商城、客户管理、门店设置

### 工厂端
首页概览、订单管理、收发货管理、生产排期、质检管理、产品目录、收支明细、病人病历查询、工厂设置

### 客户端
首页推荐、我要种植、商品商城、种植卡套餐、订单管理、种植进度、积分中心、评价管理、消费记录、实体卡绑定、附近诊所、售后服务、常见问题

## 数据库设计

共 28 张表，使用 utf8mb4 编码支持 Emoji 和特殊字符：

- **用户与权限**：users, roles, registrations
- **机构管理**：clinics, pharmacies, factories, dealers
- **产品与卡**：products, cards, implants
- **订单与加工**：orders, settlements, transactions, withdrawals
- **患者与病历**：patients, verify_records
- **通知**：notifications
- **客户端**：client_products, client_packages, client_orders, client_progress, client_points, client_reviews, client_transactions, client_cards, client_clinics, client_service, client_faq

## 设计规范

- 主色调：`#1abc9c`（青绿色）
- 字体：Inter + 系统中文字体回退
- 布局：卡片式设计，200px 侧边栏 + 56px 顶部导航
- 响应式断点：1200px / 768px
- API 风格：RESTful，字段名 camelCase（前端）↔ snake_case（数据库）自动转换

## 常见问题

### Q: 后端服务未启动时能使用系统吗？
可以。前端会自动降级到 localStorage 模式，所有数据存储在浏览器本地。

### Q: 密码是明文存储吗？
数据库初始导入时密码为明文 `123456`。首次通过 API 登录时会自动升级为 bcrypt 哈希。也可运行 `node scripts/init-passwords.js` 手动初始化。

### Q: 如何重置数据？
- 前端模式：在浏览器控制台执行 `DB.reset()`
- 后端模式：重新导入 `schema.sql`

### Q: 如何修改 API 地址？
编辑 `js/data.js` 中的 `DB._apiBase` 和 `js/app.js` 中的 fetch URL，将 `http://localhost:3000` 改为目标地址。
