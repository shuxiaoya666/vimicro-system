/**
 * JWT 认证中间件
 * 验证请求头中的 Authorization Bearer token
 * 验证通过后将解码后的用户信息挂载到 req.user 上
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
  // 从请求头获取 Authorization 字段
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: '未提供认证令牌' });
  }

  // 期望格式: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: '认证令牌格式错误' });
  }

  const token = parts[1];

  try {
    // 验证并解码 JWT token
    const decoded = jwt.verify(token, config.jwtSecret);
    // 将用户信息挂载到 req 对象上，供后续路由使用
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: '认证令牌无效或已过期' });
  }
}

module.exports = authMiddleware;
