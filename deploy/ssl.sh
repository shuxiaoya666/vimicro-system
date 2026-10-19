#!/bin/bash
# ============================================================================
# 小唯管理系统 - SSL证书申请脚本
# 使用方法: sudo bash ssl.sh
# 前提: 域名已解析到服务器IP
# ============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  SSL证书申请 (Let's Encrypt)${NC}"
echo -e "${BLUE}========================================${NC}"

read -p "请输入域名 (如: xiaowei.com): " DOMAIN
DOMAIN=${DOMAIN:-"xiaowei.com"}

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}请使用root用户运行: sudo bash ssl.sh${NC}"
  exit 1
fi

echo -e "${YELLOW}>>> 申请SSL证书...${NC}"
echo -e "${YELLOW}  域名: ${DOMAIN} www.${DOMAIN}${NC}"

# 检查域名是否解析到本服务器
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ip.sb 2>/dev/null)
DOMAIN_IP=$(dig +short ${DOMAIN} 2>/dev/null || host ${DOMAIN} | grep -oP '[\d.]+$' | head -1)

echo -e "${BLUE}  服务器IP: ${SERVER_IP}${NC}"
echo -e "${BLUE}  域名解析IP: ${DOMAIN_IP}${NC}"

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
  echo -e "${YELLOW}  ⚠ 警告: 域名可能未正确解析到本服务器${NC}"
  echo -e "${YELLOW}  请确认DNS已配置A记录指向 ${SERVER_IP}${NC}"
  read -p "是否继续? (y/N): " CONTINUE
  if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
    echo -e "${RED}已取消${NC}"
    exit 0
  fi
fi

# 申请证书
echo -e "${YELLOW}>>> 使用Certbot申请证书...${NC}"

certbot --nginx \
  -d ${DOMAIN} \
  -d www.${DOMAIN} \
  --non-interactive \
  --agree-tos \
  --register-unsafely-without-email \
  --redirect

# 自动续期测试
echo -e "${YELLOW}>>> 测试自动续期...${NC}"
certbot renew --dry-run 2>/dev/null && {
  echo -e "${GREEN}✓ 自动续期配置正常${NC}"
} || {
  echo -e "${YELLOW}! 续期测试失败，但不影响使用${NC}"
  echo -e "${YELLOW}  证书有效期90天，到期前手动续期: certbot renew${NC}"
}

# 重启Nginx
systemctl reload nginx

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  SSL证书安装完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}访问地址:${NC}"
echo -e "  https://${DOMAIN}"
echo -e "  https://www.${DOMAIN}"
echo ""
echo -e "${BLUE}证书信息:${NC}"
echo -e "  证书路径: /etc/letsencrypt/live/${DOMAIN}/"
echo -e "  有效期: 90天 (自动续期)"
echo -e "  续期命令: certbot renew"
echo ""
