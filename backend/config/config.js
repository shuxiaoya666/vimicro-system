/**
 * 应用配置模块
 * 从环境变量读取JWT密钥、过期时间、服务端口等配置
 */

require('dotenv').config();

module.exports = {
  // JWT 密钥（用于签发和验证token）
  jwtSecret: process.env.JWT_SECRET || 'xiaowei_default_secret_key',

  // JWT 过期时间（7天）
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // 服务监听端口
  port: process.env.PORT || 3000,
};
