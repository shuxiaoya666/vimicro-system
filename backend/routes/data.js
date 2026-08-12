/**
 * 通用 CRUD 路由模块
 * 根据 :entity 参数自动映射到对应的 MySQL 表
 * 支持：获取列表、获取单条、新增、更新、删除
 *
 * 关键设计：
 * - 数据库字段使用 snake_case，API 返回使用 camelCase
 * - 前端发送 camelCase 字段名，自动转换为 snake_case 存入数据库
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// 所有数据接口都需要 JWT 认证
router.use(authMiddleware);

/**
 * 前端 entity 名称 → MySQL 表名 映射表
 */
const entityTableMap = {
  clinics: 'clinics',
  pharmacies: 'pharmacies',
  factories: 'factories',
  dealers: 'dealers',
  cards: 'cards',
  products: 'products',
  settlements: 'settlements',
  roles: 'roles',
  notifications: 'notifications',
  patients: 'patients',
  orders: 'orders',
  implants: 'implants',
  transactions: 'transactions',
  withdrawals: 'withdrawals',
  verifyRecords: 'verify_records',
  clientProducts: 'client_products',
  clientPackages: 'client_packages',
  clientOrders: 'client_orders',
  clientProgress: 'client_progress',
  clientPoints: 'client_points',
  clientReviews: 'client_reviews',
  clientTransactions: 'client_transactions',
  clientCards: 'client_cards',
  clientClinics: 'client_clinics',
  clientService: 'client_service',
  clientFAQ: 'client_faq',
  registrations: 'registrations',
  users: 'users',
};

/**
 * snake_case 转 camelCase
 * 例: "created_at" → "createdAt", "implants_used" → "implantsUsed"
 */
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * camelCase 转 snake_case
 * 例: "createdAt" → "created_at", "implantsUsed" → "implants_used"
 */
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => '_' + letter.toLowerCase());
}

/**
 * 将数据库行对象的字段名从 snake_case 转为 camelCase
 */
function convertRowToCamel(row) {
  if (!row) return null;
  const result = {};
  for (const key in row) {
    result[snakeToCamel(key)] = row[key];
  }
  return result;
}

/**
 * 将数组中所有行对象的字段名转为 camelCase
 */
function convertRowsToCamel(rows) {
  return rows.map(convertRowToCamel);
}

/**
 * GET /api/data/:entity
 * 获取某实体的全部数据
 * 返回: 数组
 */
router.get('/:entity', async (req, res) => {
  try {
    const { entity } = req.params;
    const tableName = entityTableMap[entity];

    if (!tableName) {
      return res.status(404).json({ error: `未知的实体类型: ${entity}` });
    }

    const [rows] = await pool.execute(`SELECT * FROM \`${tableName}\` ORDER BY id ASC`);
    res.json(convertRowsToCamel(rows));
  } catch (err) {
    console.error(`获取${req.params.entity}列表错误:`, err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

/**
 * GET /api/data/:entity/:id
 * 获取单条记录
 * 返回: 对象
 */
router.get('/:entity/:id', async (req, res) => {
  try {
    const { entity, id } = req.params;
    const tableName = entityTableMap[entity];

    if (!tableName) {
      return res.status(404).json({ error: `未知的实体类型: ${entity}` });
    }

    const [rows] = await pool.execute(
      `SELECT * FROM \`${tableName}\` WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: '记录不存在' });
    }

    res.json(convertRowToCamel(rows[0]));
  } catch (err) {
    console.error(`获取${req.params.entity}单条错误:`, err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

/**
 * POST /api/data/:entity
 * 新增记录
 * body: 字段数据（camelCase）
 * 返回: 新创建的记录
 */
router.post('/:entity', async (req, res) => {
  try {
    const { entity } = req.params;
    const tableName = entityTableMap[entity];

    if (!tableName) {
      return res.status(404).json({ error: `未知的实体类型: ${entity}` });
    }

    // 获取请求体，过滤掉 id 和 created_at（这些由数据库自动生成）
    const data = { ...req.body };
    delete data.id;
    delete data.createdAt;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: '没有可插入的数据' });
    }

    // 将 camelCase 键转为 snake_case
    const snakeData = {};
    for (const key in data) {
      snakeData[camelToSnake(key)] = data[key];
    }

    // 构建 INSERT SQL
    const fields = Object.keys(snakeData);
    const placeholders = fields.map(() => '?').join(', ');
    const values = fields.map((f) => snakeData[f]);
    const fieldList = fields.map((f) => `\`${f}\``).join(', ');

    const [result] = await pool.execute(
      `INSERT INTO \`${tableName}\` (${fieldList}) VALUES (${placeholders})`,
      values
    );

    // 查询并返回新创建的记录
    const [rows] = await pool.execute(
      `SELECT * FROM \`${tableName}\` WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(convertRowToCamel(rows[0]));
  } catch (err) {
    console.error(`新增${req.params.entity}错误:`, err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

/**
 * PUT /api/data/:entity/:id
 * 更新记录
 * body: 字段数据（camelCase）
 * 返回: 更新后的记录
 */
router.put('/:entity/:id', async (req, res) => {
  try {
    const { entity, id } = req.params;
    const tableName = entityTableMap[entity];

    if (!tableName) {
      return res.status(404).json({ error: `未知的实体类型: ${entity}` });
    }

    // 获取请求体，过滤掉 id 和 created_at
    const data = { ...req.body };
    delete data.id;
    delete data.createdAt;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: '没有可更新的数据' });
    }

    // 将 camelCase 键转为 snake_case
    const snakeData = {};
    for (const key in data) {
      snakeData[camelToSnake(key)] = data[key];
    }

    // 构建 UPDATE SQL
    const fields = Object.keys(snakeData);
    const setClause = fields.map((f) => `\`${f}\` = ?`).join(', ');
    const values = fields.map((f) => snakeData[f]);
    values.push(id); // WHERE id = ? 的参数

    await pool.execute(
      `UPDATE \`${tableName}\` SET ${setClause} WHERE id = ?`,
      values
    );

    // 查询并返回更新后的记录
    const [rows] = await pool.execute(
      `SELECT * FROM \`${tableName}\` WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: '记录不存在' });
    }

    res.json(convertRowToCamel(rows[0]));
  } catch (err) {
    console.error(`更新${req.params.entity}错误:`, err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

/**
 * DELETE /api/data/:entity/:id
 * 删除记录
 * 返回: { success: true }
 */
router.delete('/:entity/:id', async (req, res) => {
  try {
    const { entity, id } = req.params;
    const tableName = entityTableMap[entity];

    if (!tableName) {
      return res.status(404).json({ error: `未知的实体类型: ${entity}` });
    }

    await pool.execute(
      `DELETE FROM \`${tableName}\` WHERE id = ?`,
      [id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(`删除${req.params.entity}错误:`, err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;
