/**
 * 小唯牙科种植体管理系统 - 后端服务主入口
 *
 * 功能：
 * 1. 加载环境变量
 * 2. 初始化 Express 应用，配置 CORS 和 JSON 解析
 * 3. 挂载 API 路由（认证、通用CRUD、文件上传）
 * 4. 提供静态文件服务（前端HTML/CSS/JS，如存在）
 * 5. 监听指定端口（Render 自动分配 PORT）
 */

// 加载环境变量（从 .env 文件读取）
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 导入路由模块
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const uploadRoutes = require('./routes/upload');

// 导入配置
const config = require('./config/config');

// 创建 Express 应用
const app = express();

// ========== 中间件配置 ==========

// CORS - 允许所有来源（GitHub Pages 跨域访问）
app.use(cors());

// JSON 请求体解析
app.use(express.json());

// URL-encoded 请求体解析（支持表单数据）
app.use(express.urlencoded({ extended: true }));

// ========== 静态文件服务 ==========

// 确保 uploads 目录存在
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// 提供前端静态文件服务（仅在文件存在时启用）
const frontendPath = path.join(__dirname, '..');
if (fs.existsSync(path.join(frontendPath, 'index.html'))) {
  app.use(express.static(frontendPath));
  console.log('[Server] 前端静态文件服务已启用');
} else {
  console.log('[Server] 前端文件未找到，仅提供 API 服务');
}

// ========== API 路由挂载 ==========

// 认证相关路由：/api/auth/*
app.use('/api/auth', authRoutes);

// 通用 CRUD 数据路由：/api/data/*
app.use('/api/data', dataRoutes);

// 文件上传路由：/api/upload
app.use('/api/upload', uploadRoutes);

// ========== 健康检查 ==========

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '小唯管理系统后端服务运行中' });
});

// ========== 启动服务器 ==========

const PORT = config.port;
app.listen(PORT, () => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  console.log(`========================================`);
  console.log(`  小唯牙科种植体管理系统 - 后端服务`);
  console.log(`========================================`);
  console.log(`  服务地址: ${baseUrl}`);
  console.log(`  API 前缀: /api`);
  console.log(`  健康检查: ${baseUrl}/api/health`);
  console.log(`========================================`);
});
