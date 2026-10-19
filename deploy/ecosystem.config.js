/**
 * PM2 进程管理配置文件
 * 小唯管理系统后端服务
 *
 * 使用方法:
 *   cd /var/www/xiaowei/backend
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup  (设置开机自启)
 */

module.exports = {
  apps: [{
    name: 'xiaowei-backend',
    script: './server.js',
    cwd: '/var/www/xiaowei/backend',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    env_file: '.env',
    error_file: '/var/log/xiaowei/error.log',
    out_file: '/var/log/xiaowei/out.log',
    log_file: '/var/log/xiaowei/combined.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    kill_timeout: 3000,
  }]
};
