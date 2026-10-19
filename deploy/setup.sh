#!/bin/bash
# ============================================================================
# 小唯管理系统 - 腾讯云服务器一键环境安装脚本
# 适用系统: Ubuntu 20.04 / 22.04 / 24.04
# 使用方法: sudo bash setup.sh
# ============================================================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  小唯管理系统 - 服务器环境安装${NC}"
echo -e "${BLUE}========================================${NC}"

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}请使用root用户运行: sudo bash setup.sh${NC}"
  exit 1
fi

# 读取用户配置
read -p "请输入MySQL root密码 (默认: Xiaowei@2025!): " MYSQL_ROOT_PWD
MYSQL_ROOT_PWD=${MYSQL_ROOT_PWD:-"Xiaowei@2025!"}

read -p "请输入网站域名 (如: xiaowei.com): " DOMAIN
DOMAIN=${DOMAIN:-"xiaowei.com"}

echo -e "${YELLOW}>>> 开始安装...${NC}"

# ============================================================================
# 1. 系统更新
# ============================================================================
echo -e "${YELLOW}>>> [1/7] 系统更新...${NC}"
apt update -y
apt upgrade -y
apt install -y curl wget git vim unzip software-properties-common lsb-release

echo -e "${GREEN}✓ 系统更新完成${NC}"

# ============================================================================
# 2. 安装 MySQL 8.0
# ============================================================================
echo -e "${YELLOW}>>> [2/7] 安装 MySQL 8.0...${NC}"

# 检查是否已安装
if command -v mysql &> /dev/null; then
  echo -e "${YELLOW}MySQL已安装，跳过安装${NC}"
else
  # 添加MySQL官方源
  wget -q https://dev.mysql.com/get/mysql-apt-config_0.8.29-1_all.deb -O /tmp/mysql-config.deb
  DEBIAN_FRONTEND=noninteractive dpkg -i /tmp/mysql-config.deb
  apt update -y
  
  # 安装MySQL
  DEBIAN_FRONTEND=noninteractive apt install -y mysql-server
  
  # 设置root密码
  mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PWD}';"
  mysql -e "FLUSH PRIVILEGES;"
  
  rm -f /tmp/mysql-config.deb
fi

# 安全配置
mysql -u root -p"${MYSQL_ROOT_PWD}" -e "DELETE FROM mysql.user WHERE User=''; DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost','127.0.0.1','::1'); DROP DATABASE IF EXISTS test; FLUSH PRIVILEGES;" 2>/dev/null || true

echo -e "${GREEN}✓ MySQL 8.0 安装完成${NC}"
echo -e "${BLUE}    MySQL密码: ${MYSQL_ROOT_PWD}${NC}"

# ============================================================================
# 3. 安装 Node.js 20 LTS
# ============================================================================
echo -e "${YELLOW}>>> [3/7] 安装 Node.js 20 LTS...${NC}"

if command -v node &> /dev/null; then
  CURRENT_NODE_VERSION=$(node -v | sed 's/v//')
  echo -e "${YELLOW}当前Node.js版本: ${CURRENT_NODE_VERSION}${NC}"
fi

# 使用NodeSource安装Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 安装PM2 (进程管理器)
npm install -g pm2

# 安装nrm (npm源管理)
npm install -g nrm
nrm use taobao 2>/dev/null || true

echo -e "${GREEN}✓ Node.js $(node -v) + PM2 安装完成${NC}"

# ============================================================================
# 4. 安装 Nginx
# ============================================================================
echo -e "${YELLOW}>>> [4/7] 安装 Nginx...${NC}"

apt install -y nginx

# 创建网站目录
mkdir -p /var/www/xiaowei
mkdir -p /var/www/xiaowei/backend
mkdir -p /var/www/xiaowei/frontend

# 设置权限
chown -R www-data:www-data /var/www/xiaowei
chmod -R 755 /var/www/xiaowei

echo -e "${GREEN}✓ Nginx 安装完成${NC}"

# ============================================================================
# 5. 安装 Certbot (Let's Encrypt SSL证书)
# ============================================================================
echo -e "${YELLOW}>>> [5/7] 安装 Certbot (SSL证书工具)...${NC}"

apt install -y certbot python3-certbot-nginx

echo -e "${GREEN}✓ Certbot 安装完成${NC}"

# ============================================================================
# 6. 配置防火墙
# ============================================================================
echo -e "${YELLOW}>>> [6/7] 配置防火墙...${NC}"

# 安装ufw
apt install -y ufw

# 允许SSH
ufw allow 22/tcp

# 允许HTTP和HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# 允许MySQL (仅内网)
ufw allow 3306/tcp

# 启用防火墙
ufw --force enable

echo -e "${GREEN}✓ 防火墙配置完成${NC}"

# ============================================================================
# 7. 创建 MySQL 数据库和初始化
# ============================================================================
echo -e "${YELLOW}>>> [7/7] 创建数据库...${NC}"

mysql -u root -p"${MYSQL_ROOT_PWD}" -e "CREATE DATABASE IF NOT EXISTS xiaowei_system CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

echo -e "${GREEN}✓ 数据库 xiaowei_system 创建完成${NC}"

# ============================================================================
# 安装完成汇总
# ============================================================================
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  环境安装完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}已安装组件:${NC}"
echo -e "  MySQL 8.0  - 数据库服务"
echo -e "  Node.js $(node -v)  - 后端运行环境"
echo -e "  PM2 $(pm2 -v)  - 进程管理器"
echo -e "  Nginx $(nginx -v 2>&1 | cut -d'/' -f2 | cut -d' ' -f1)  - Web服务器/反向代理"
echo -e "  Certbot    - SSL证书工具"
echo -e "  UFW        - 防火墙"
echo ""
echo -e "${BLUE}关键信息:${NC}"
echo -e "  MySQL密码: ${MYSQL_ROOT_PWD}"
echo -e "  数据库名: xiaowei_system"
echo -e "  网站目录: /var/www/xiaowei"
echo -e "  前端目录: /var/www/xiaowei/frontend"
echo -e "  后端目录: /var/www/xiaowei/backend"
echo ""
echo -e "${YELLOW}下一步:${NC}"
echo -e "  1. 上传项目代码到服务器"
echo -e "  2. 运行 deploy.sh 部署应用"
echo -e "  3. 配置域名解析"
echo -e "  4. 申请SSL证书"
echo ""
echo -e "${YELLOW}请将以上密码妥善保存！${NC}"
