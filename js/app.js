// ===== 小唯管理系统 - 核心应用逻辑 =====

// 用户账号配置
const ACCOUNTS = {
  admin:    { password: '123456', name: '超级管理员', avatar: '管', role: 'super', ports: ['platform','clinic','dealer','pharmacy','factory'] },
  clinic:   { password: '123456', name: '李医生',     avatar: '李', role: 'clinic',  ports: ['clinic'] },
  dealer:   { password: '123456', name: '张经理',     avatar: '张', role: 'dealer',  ports: ['dealer'] },
  pharmacy: { password: '123456', name: '周店长',     avatar: '周', role: 'pharmacy',ports: ['pharmacy'] },
  factory:  { password: '123456', name: '孙厂长',     avatar: '孙', role: 'factory', ports: ['factory'] },
};

// 端口配置
const PORT_CONFIG = {
  platform: { name: '小唯平台端', icon: '🏠', color: '#1abc9c' },
  clinic:   { name: '诊所端',     icon: '🏥', color: '#3498db' },
  dealer:   { name: '经销商端',   icon: '👤', color: '#f39c12' },
  pharmacy: { name: '药店端',     icon: '💊', color: '#8e44ad' },
  factory:  { name: '工厂端',     icon: '🏭', color: '#0097a7' },
};

// 当前状态
let currentUser = null;
let currentPort = 'platform';
let currentPage = 'home';

// ===== 登录 =====
function doLogin() {
  const account = document.getElementById('loginAccount').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const captcha = document.getElementById('loginCaptcha').value.trim();
  const errorEl = document.getElementById('loginError');

  if (!account || !password) {
    errorEl.textContent = '请输入账号和密码';
    errorEl.style.display = 'block';
    return;
  }

  const user = ACCOUNTS[account];
  if (!user || user.password !== password) {
    errorEl.textContent = '账号或密码错误，请重试';
    errorEl.style.display = 'block';
    refreshCaptcha();
    return;
  }

  // 登录成功
  currentUser = { ...user, account };
  currentPort = user.ports[0]; // 默认进入第一个可用端口
  currentPage = 'home';

  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainApp').style.display = 'flex';
  
  // 更新用户信息
  document.getElementById('userAvatar').textContent = currentUser.avatar;
  document.getElementById('userName').textContent = currentUser.name + ' ▼';
  
  // 更新端口切换器（只显示有权限的端口）
  updatePortMenu();
  
  // 加载页面
  loadPort();
}

function doLogout() {
  currentUser = null;
  currentPort = 'platform';
  currentPage = 'home';
  document.getElementById('mainApp').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('loginAccount').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('loginCaptcha').value = '';
  document.getElementById('loginError').style.display = 'none';
}

function refreshCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById('captchaCode').textContent = code;
}

// ===== 端口切换 =====
function togglePortMenu() {
  const menu = document.getElementById('portMenu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  // 关闭用户菜单
  document.getElementById('userMenu').style.display = 'none';
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  // 关闭端口菜单
  document.getElementById('portMenu').style.display = 'none';
}

function updatePortMenu() {
  const menu = document.getElementById('portMenu');
  const items = menu.querySelectorAll('.port-menu-item');
  const portKeys = ['platform','clinic','dealer','pharmacy','factory'];
  
  items.forEach((item, index) => {
    const portKey = portKeys[index];
    if (currentUser.ports.includes(portKey)) {
      item.classList.remove('disabled');
      item.style.pointerEvents = 'auto';
    } else {
      item.classList.add('disabled');
      item.style.pointerEvents = 'none';
    }
  });
}

function switchPort(port) {
  if (!currentUser.ports.includes(port)) return;
  
  currentPort = port;
  currentPage = 'home';
  
  // 关闭菜单
  document.getElementById('portMenu').style.display = 'none';
  
  // 更新切换器显示
  document.getElementById('currentPortIcon').textContent = PORT_CONFIG[port].icon;
  document.getElementById('currentPortName').textContent = PORT_CONFIG[port].name;
  
  loadPort();
}

// ===== 加载端口 =====
function loadPort() {
  // 更新端口显示
  document.getElementById('currentPortIcon').textContent = PORT_CONFIG[currentPort].icon;
  document.getElementById('currentPortName').textContent = PORT_CONFIG[currentPort].name;
  
  // 加载侧边栏菜单
  loadSidebar();
  
  // 加载页面内容
  loadPage();
}

// ===== 侧边栏菜单 =====
function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menus = SIDEBAR_MENUS[currentPort] || [];
  
  let html = '';
  menus.forEach(group => {
    html += `<div class="sidebar-group-title">${group.title}</div>`;
    group.items.forEach(item => {
      const active = item.key === currentPage ? 'active' : '';
      const badge = item.badge ? `<span class="badge">${item.badge}</span>` : '';
      html += `<div class="sidebar-item ${active}" onclick="navigateTo('${item.key}')">
        <span class="icon">${item.icon}</span>
        <span>${item.name}</span>
        ${badge}
      </div>`;
    });
  });
  
  sidebar.innerHTML = html;
}

// ===== 页面导航 =====
function navigateTo(page) {
  currentPage = page;
  loadSidebar();
  loadPage();
}

// ===== 加载页面内容 =====
function loadPage() {
  const content = document.getElementById('mainContent');
  const pageRenderer = PAGE_RENDERERS[currentPort];
  
  if (pageRenderer && pageRenderer[currentPage]) {
    content.innerHTML = pageRenderer[currentPage]();
  } else {
    content.innerHTML = '<div class="breadcrumb">首页 / <span>数据概览</span></div><div class="card"><p>页面开发中...</p></div>';
  }
}

// ===== 关闭弹出菜单（点击外部） =====
document.addEventListener('click', function(e) {
  // 关闭端口菜单
  const portSwitcher = document.querySelector('.port-switcher');
  if (portSwitcher && !portSwitcher.contains(e.target)) {
    document.getElementById('portMenu').style.display = 'none';
  }
  // 关闭用户菜单
  const userInfo = document.querySelector('.user-info');
  if (userInfo && !userInfo.contains(e.target)) {
    document.getElementById('userMenu').style.display = 'none';
  }
});

// ===== 回车登录 =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('loginPage').style.display !== 'none') {
    doLogin();
  }
});

// 验证码点击刷新
document.addEventListener('DOMContentLoaded', function() {
  const captcha = document.getElementById('captchaCode');
  if (captcha) {
    captcha.addEventListener('click', refreshCaptcha);
  }
});
