#!/bin/bash
# ============================================================================
# 小唯管理系统 - 一键部署脚本
# 使用方法: sudo bash deploy.sh
# 前提: 已运行 setup.sh 完成环境安装
# ============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  小唯管理系统 - 应用部署${NC}"
echo -e "${BLUE}========================================${NC}"

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}请使用root用户运行: sudo bash deploy.sh${NC}"
  exit 1
fi

# 读取配置
read -p "请输入MySQL root密码 (默认: Xiaowei@2025!): " MYSQL_PWD
MYSQL_PWD=${MYSQL_PWD:-"Xiaowei@2025!"}

read -p "请输入网站域名 (如: xiaowei.com): " DOMAIN
DOMAIN=${DOMAIN:-"xiaowei.com"}

FRONTEND_DIR="/var/www/xiaowei/frontend"
BACKEND_DIR="/var/www/xiaowei/backend"
DEPLOY_DIR="/var/www/xiaowei"

# ============================================================================
# 1. 部署后端
# ============================================================================
echo -e "${YELLOW}>>> [1/6] 部署后端代码...${NC}"

# 如果项目在 /root/小唯管理系统 或当前目录
PROJECT_SRC=""
if [ -d "/root/小唯管理系统/backend" ]; then
  PROJECT_SRC="/root/小唯管理系统"
elif [ -d "$(pwd)/backend" ]; then
  PROJECT_SRC="$(pwd)"
fi

if [ -z "$PROJECT_SRC" ]; then
  echo -e "${YELLOW}请输入项目根目录路径 (包含backend/和index.html的目录): ${NC}"
  read -r PROJECT_SRC
fi

if [ ! -d "$PROJECT_SRC/backend" ]; then
  echo -e "${RED}错误: 未找到后端目录 ${PROJECT_SRC}/backend${NC}"
  echo -e "${YELLOW}请先上传项目代码到服务器${NC}"
  exit 1
fi

# 创建日志目录
mkdir -p /var/log/xiaowei

# 复制后端代码
echo -e "${YELLOW}  复制后端代码到 ${BACKEND_DIR}${NC}"
cp -r "$PROJECT_SRC/backend/"* "$BACKEND_DIR/"
cp -r "$PROJECT_SRC/backend/.env" "$BACKEND_DIR/.env" 2>/dev/null || true

# 安装后端依赖 (不含node_modules)
echo -e "${YELLOW}  安装后端依赖...${NC}"
cd "$BACKEND_DIR"
npm install --production

# 导入数据库
echo -e "${YELLOW}  导入数据库...${NC}"
if [ -f "$BACKEND_DIR/schema.sql" ]; then
  mysql -u root -p"${MYSQL_PWD}" xiaowei_system < "$BACKEND_DIR/schema.sql" 2>/dev/null || {
    echo -e "${YELLOW}  数据库已存在，跳过导入${NC}"
  }
  echo -e "${GREEN}  ✓ 数据库导入完成${NC}"
else
  echo -e "${RED}  schema.sql 未找到${NC}"
fi

# 更新 .env 配置
cat > "$BACKEND_DIR/.env" << EOF
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=${MYSQL_PWD}
DB_NAME=xiaowei_system
JWT_SECRET=xiaowei_production_secret_2026_$(date +%s)
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://${DOMAIN}
EOF

echo -e "${GREEN}✓ 后端部署完成${NC}"

# ============================================================================
# 2. 部署前端
# ============================================================================
echo -e "${YELLOW}>>> [2/6] 部署前端代码...${NC}"

# 复制前端文件
echo -e "${YELLOW}  复制前端文件到 ${FRONTEND_DIR}${NC}"
cp "$PROJECT_SRC/index.html" "$FRONTEND_DIR/"
cp -r "$PROJECT_SRC/css" "$FRONTEND_DIR/" 2>/dev/null || true
cp -r "$PROJECT_SRC/js" "$FRONTEND_DIR/" 2>/dev/null || true
cp -r "$PROJECT_SRC/images" "$FRONTEND_DIR/" 2>/dev/null || true

# 更新前端 config.js 中的API地址
CONFIG_FILE="$FRONTEND_DIR/js/config.js"
if [ -f "$CONFIG_FILE" ]; then
  sed -i "s|https://xiaowei-backend.loca.lt/api|https://${DOMAIN}/api|g" "$CONFIG_FILE"
  echo -e "${GREEN}  ✓ 前端 API 地址已更新为 https://${DOMAIN}/api${NC}"
fi

# 设置权限
chown -R www-data:www-data "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"
chmod -R 775 "$BACKEND_DIR/uploads" 2>/dev/null || true

echo -e "${GREEN}✓ 前端部署完成${NC}"

# ============================================================================
# 3. 配置 Nginx
# ============================================================================
echo -e "${YELLOW}>>> [3/6] 配置 Nginx...${NC}"

NGINX_CONF="/etc/nginx/sites-available/xiaowei"

# 复制Nginx配置
cp "$BACKEND_DIR/../deploy/nginx.conf" "$NGINX_CONF" 2>/dev/null || {
  # 如果没有deploy目录，使用内联配置
  cat > "$NGINX_CONF" << 'NGINX_EOF'
upstream xiaowei_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
    root /var/www/xiaowei/frontend;
    index index.html;
    client_max_body_size 10M;

    location /api/ {
        proxy_pass http://xiaowei_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        proxy_pass http://xiaowei_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
}
NGINX_EOF
}

# 替换域名
sed -i "s/YOUR_DOMAIN/${DOMAIN}/g" "$NGINX_CONF"
sed -i "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" "$NGINX_CONF"

# 启用站点
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/xiaowei

# 删除默认站点 (避免冲突)
rm -f /etc/nginx/sites-enabled/default

# 测试Nginx配置
nginx -t && {
  systemctl reload nginx
  echo -e "${GREEN}✓ Nginx 配置完成${NC}"
} || {
  echo -e "${RED}Nginx配置有误，请检查${NC}"
}

# ============================================================================
# 4. 启动 PM2 后端服务
# ============================================================================
echo -e "${YELLOW}>>> [4/6] 启动后端服务...${NC}"

cd "$BACKEND_DIR"

# 复制PM2配置
cp "$BACKEND_DIR/../deploy/ecosystem.config.js" "$BACKEND_DIR/" 2>/dev/null || true

# 停止旧进程
pm2 delete xiaowei-backend 2>/dev/null || true

# 启动新进程
pm2 start ecosystem.config.js --env production 2>/dev/null || pm2 start server.js --name xiaowei-backend

# 保存PM2配置
pm2 save

# 设置开机自启
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo -e "${GREEN}✓ 后端服务已启动 (PM2)${NC}"
pm2 status

# ============================================================================
# 5. 验证部署
# ============================================================================
echo -e "${YELLOW}>>> [5/6] 验证部署...${NC}"

# 检查后端API
sleep 2
API_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health 2>/dev/null || echo "000")

if [ "$API_CHECK" = "200" ]; then
  echo -e "${GREEN}  ✓ 后端API正常响应${NC}"
else
  echo -e "${YELLOW}  ! 后端API可能还在启动中 (HTTP ${API_CHECK})${NC}"
  echo -e "${YELLOW}  ! 请稍后运行: curl http://localhost:3000/api/health${NC}"
fi

# 检查Nginx
NGINX_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80 2>/dev/null || echo "000")
if [ "$NGINX_CHECK" = "200" ] || [ "$NGINX_CHECK" = "301" ] || [ "$NGINX_CHECK" = "302" ]; then
  echo -e "${GREEN}  ✓ Nginx 正常响应${NC}"
else
  echo -e "${YELLOW}  ! Nginx 返回 HTTP ${NGINX_CHECK}${NC}"
fi

# 检查MySQL
if mysql -u root -p"${MYSQL_PWD}" -e "USE xiaowei_system; SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema='xiaowei_system';" 2>/dev/null | grep -q "[0-9]"; then
  echo -e "${GREEN}  ✓ MySQL 数据库正常${NC}"
fi

# ============================================================================
# 6. 完成
# ============================================================================
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}访问地址:${NC}"
echo -e "  HTTP:  http://${DOMAIN}"
echo -e "  HTTPS: https://${DOMAIN} (需先申请SSL证书)"
echo -e "  API:   https://${DOMAIN}/api/health"
echo ""
echo -e "${BLUE}管理命令:${NC}"
echo -e "  查看后端日志: pm2 logs xiaowei-backend"
echo -e "  重启后端:     pm2 restart xiaowei-backend"
echo -e "  重载Nginx:    nginx -s reload"
echo -e "  查看状态:     pm2 status"
echo ""
echo -e "${YELLOW}下一步:${NC}"
echo -e "  1. 配置域名DNS解析 -> 服务器IP"
echo -e "  2. 申请SSL证书: sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo -e "  3. 在微信公众平台配置小程序服务器域名"
echo ""
