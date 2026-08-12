/**
 * 认证路由模块
 * 提供登录、注册、获取当前用户信息的API
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const config = require('../config/config');
const authMiddleware = require('../middleware/auth');

// 尝试加载 bcryptjs（可能未安装，需 npm install 后才有）
let bcrypt = null;
try {
  bcrypt = require('bcryptjs');
} catch (e) {
  console.warn('[Auth] bcryptjs 未安装，密码将使用明文比对。请运行 npm install 安装依赖。');
}

/**
 * POST /api/auth/login
 * 用户登录接口
 * body: { account, password }
 * 返回: { token, user }
 */
router.post('/login', async (req, res) => {
  try {
    const { account, password } = req.body;

    // 参数校验
    if (!account || !password) {
      return res.status(400).json({ error: '账号和密码不能为空' });
    }

    // 查询用户
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE account = ?',
      [account]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: '账号不存在' });
    }

    const user = rows[0];

    // 检查账号状态
    if (user.status !== 'active') {
      return res.status(403).json({ error: '账号已被禁用，请联系管理员' });
    }

    // 验证密码
    // 支持 bcrypt 哈希和明文两种格式（明文用于初始导入，首次登录自动升级为 bcrypt）
    const isBcryptHash = user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$'));
    let isMatch;
    if (isBcryptHash && bcrypt) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // 明文比对（初始导入后未运行 init-passwords.js，或 bcryptjs 未安装的情况）
      isMatch = password === user.password;
      // 自动升级为 bcrypt 哈希（仅在 bcryptjs 可用时）
      if (isMatch && bcrypt) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hash, user.id]);
          console.log(`[Auth] 用户 ${user.account} 密码已自动升级为 bcrypt 哈希`);
        } catch (e) {
          console.warn('[Auth] 密码自动升级失败:', e.message);
        }
      }
    }
    if (!isMatch) {
      return res.status(401).json({ error: '密码错误' });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { id: user.id, account: user.account, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    // 解析 ports JSON 字符串
    let ports = [];
    try {
      ports = JSON.parse(user.ports);
    } catch (e) {
      ports = [];
    }

    // 返回用户信息（不含密码）
    const userInfo = {
      id: user.id,
      account: user.account,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      ports: ports,
      status: user.status,
      createdAt: user.created_at,
    };

    res.json({ token, user: userInfo });
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

/**
 * POST /api/auth/register
 * 用户注册申请接口
 * body: 注册数据（写入 registrations 表）
 * 返回: { success: true }
 */
router.post('/register', async (req, res) => {
  try {
    const {
      type,
      account,
      password,
      orgName,
      person,
      phone,
      region,
      address,
      licenseName,
      licenseData,
    } = req.body;

    // 参数校验
    if (!type || !account || !orgName || !person || !phone) {
      return res.status(400).json({ error: '缺少必填字段' });
    }

    // 检查账号是否已存在
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE account = ?',
      [account]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: '该账号已被注册' });
    }

    // 检查是否已有待审核的注册申请
    const [existingReg] = await pool.execute(
      'SELECT id FROM registrations WHERE account = ? AND status = ?',
      [account, 'pending']
    );
    if (existingReg.length > 0) {
      return res.status(409).json({ error: '该账号已有待审核的注册申请' });
    }

    // 插入注册申请记录
    await pool.execute(
      `INSERT INTO registrations (type, account, password, org_name, person, phone, region, address, license_name, license_data, status, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        type,
        account,
        password || '',
        orgName,
        person,
        phone,
        region || '',
        address || '',
        licenseName || '',
        licenseData || '',
      ]
    );

    res.json({ success: true, message: '注册申请已提交，请等待审核' });
  } catch (err) {
    console.error('注册错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

/**
 * GET /api/auth/me
 * 获取当前登录用户信息
 * header: Authorization Bearer <token>
 * 返回: { user }
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }

    const user = rows[0];

    // 解析 ports JSON 字符串
    let ports = [];
    try {
      ports = JSON.parse(user.ports);
    } catch (e) {
      ports = [];
    }

    // 返回用户信息（不含密码）
    const userInfo = {
      id: user.id,
      account: user.account,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      ports: ports,
      status: user.status,
      createdAt: user.created_at,
    };

    res.json({ user: userInfo });
  } catch (err) {
    console.error('获取用户信息错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;
