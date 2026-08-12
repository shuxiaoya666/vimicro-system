/**
 * MySQL 数据库连接池配置
 * 使用 mysql2 创建连接池，支持 Promise API
 *
 * 支持两种连接方式：
 * 1. DATABASE_URL 环境变量（推荐，用于 TiDB Cloud / PlanetScale / Render 等云平台）
 * 2. 分离的 DB_HOST / DB_USER / DB_PASSWORD 等环境变量（用于本地开发）
 *
 * TiDB Cloud SSL 要求：
 * TiDB Cloud 强制使用 TLS 连接，需配置 ssl 参数
 */

const mysql = require('mysql2/promise');

const poolConfig = {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 确保日期以字符串返回，避免时区问题
  dateStrings: true,
};

if (process.env.DATABASE_URL) {
  // 云端部署：使用连接字符串
  // TiDB Cloud 格式: mysql://user:pass@gateway01.region.prod.aws.tidbcloud.com:4000/db
  // PlanetScale 格式: mysql://user:pass@host/db?ssl={"rejectUnauthorized":true}
  poolConfig.uri = process.env.DATABASE_URL;
  // TiDB Cloud 和 PlanetScale 都需要 SSL 连接
  // 使用 rejectUnauthorized:false 兼容 TiDB Cloud 的自签名证书
  poolConfig.ssl = { rejectUnauthorized: false };
  console.log('[DB] 使用 DATABASE_URL 连接数据库（云端模式）');
} else {
  // 本地开发：使用分离的环境变量
  poolConfig.host = process.env.DB_HOST || 'localhost';
  poolConfig.port = process.env.DB_PORT || 3306;
  poolConfig.user = process.env.DB_USER || 'root';
  poolConfig.password = process.env.DB_PASSWORD || '';
  poolConfig.database = process.env.DB_NAME || 'xiaowei_system';
  console.log('[DB] 使用本地配置连接数据库（本地模式）');
}

const pool = mysql.createPool(poolConfig);

module.exports = pool;
