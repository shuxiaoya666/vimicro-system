/**
 * 密码初始化脚本
 *
 * 功能：为所有用户生成 "123456" 的正确 bcrypt 哈希并更新到数据库
 *
 * 使用方法：
 *   1. 确保已配置 .env 文件（数据库连接信息）
 *   2. 确保已导入 schema.sql（表和种子数据已创建）
 *   3. 运行: node scripts/init-passwords.js
 *
 * 说明：
 *   schema.sql 中的密码哈希可能无法与 "123456" 匹配（取决于哈希来源），
 *   运行此脚本可以确保所有账号的密码都是 "123456"。
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function initPasswords() {
  let connection;

  try {
    // 连接数据库
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'xiaowei_system',
    });

    console.log('已连接数据库');

    // 为 "123456" 生成 bcrypt 哈希
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    console.log('已生成密码哈希');

    // 更新所有用户的密码
    const [result] = await connection.execute(
      'UPDATE users SET password = ?',
      [hash]
    );

    console.log(`密码更新完成，共更新 ${result.affectedRows} 个用户`);
    console.log('所有账号的密码已设置为: 123456');
    console.log('');
    console.log('默认账号列表:');
    console.log('  admin / 123456     - 超级管理员');
    console.log('  clinic / 123456    - 诊所端（李医生）');
    console.log('  dealer / 123456    - 经销商端（张经理）');
    console.log('  pharmacy / 123456  - 药房端（周店长）');
    console.log('  factory / 123456   - 工厂端（孙厂长）');
    console.log('  client / 123456    - 客户端（周小明）');
  } catch (err) {
    console.error('初始化密码失败:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 执行
initPasswords();
