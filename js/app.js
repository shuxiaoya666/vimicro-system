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
let regType = 'clinic'; // 注册类型：clinic 或 pharmacy
let regLicenseData = null; // 营业资质base64数据

// ===== 注册功能 =====
function showRegister() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('registerPage').style.display = 'flex';
  resetRegisterForm();
}

function showLogin() {
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
  resetRegisterForm();
}

function resetRegisterForm() {
  regType = 'clinic';
  regLicenseData = null;
  document.getElementById('regAccount').value = '';
  document.getElementById('regPassword').value = '';
  document.getElementById('regPasswordConfirm').value = '';
  document.getElementById('regOrgName').value = '';
  document.getElementById('regPerson').value = '';
  document.getElementById('regPhone').value = '';
  document.getElementById('regRegion').value = '';
  document.getElementById('regAddress').value = '';
  document.getElementById('regError').style.display = 'none';
  document.getElementById('regLicenseFile').value = '';
  document.getElementById('uploadPlaceholder').style.display = '';
  document.getElementById('uploadPreview').style.display = 'none';
  // 重置类型选择
  document.getElementById('tabClinic').classList.add('active');
  document.getElementById('tabPharmacy').classList.remove('active');
  updateRegTypeUI();
}

function switchRegType(type) {
  regType = type;
  document.getElementById('tabClinic').classList.toggle('active', type === 'clinic');
  document.getElementById('tabPharmacy').classList.toggle('active', type === 'pharmacy');
  updateRegTypeUI();
}

function updateRegTypeUI() {
  if (regType === 'clinic') {
    document.getElementById('regOrgTitle').textContent = '诊所信息';
    document.getElementById('regOrgNameLabel').innerHTML = '诊所名称 <span class="reg-required">*</span>';
    document.getElementById('regPersonLabel').innerHTML = '负责人姓名 <span class="reg-required">*</span>';
    document.getElementById('regOrgName').placeholder = '请输入诊所完整名称';
  } else {
    document.getElementById('regOrgTitle').textContent = '药店信息';
    document.getElementById('regOrgNameLabel').innerHTML = '药店名称 <span class="reg-required">*</span>';
    document.getElementById('regPersonLabel').innerHTML = '店长姓名 <span class="reg-required">*</span>';
    document.getElementById('regOrgName').placeholder = '请输入药店完整名称';
  }
}

function handleFileUpload(input) {
  var file = input.files[0];
  if (!file) return;

  // 文件大小检查（5MB 限制）
  if (file.size > 5 * 1024 * 1024) {
    showRegError('文件大小不能超过 5MB');
    input.value = '';
    return;
  }

  // 文件类型检查
  var validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (validTypes.indexOf(file.type) === -1) {
    showRegError('仅支持 JPG、PNG、GIF、WebP、PDF 格式');
    input.value = '';
    return;
  }

  var reader = new FileReader();
  reader.onload = function(e) {
    regLicenseData = e.target.result;
    // 显示预览
    var preview = document.getElementById('uploadPreview');
    var placeholder = document.getElementById('uploadPlaceholder');
    var previewImg = document.getElementById('licensePreviewImg');
    var fileInfo = document.getElementById('uploadFileInfo');

    if (file.type === 'application/pdf') {
      // PDF 无法直接预览，显示图标
      previewImg.style.display = 'none';
      fileInfo.innerHTML = '<div style="font-size:48px;">📄</div><div>' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)</div>';
    } else {
      previewImg.style.display = '';
      previewImg.src = regLicenseData;
      fileInfo.innerHTML = file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
    }
    placeholder.style.display = 'none';
    preview.style.display = '';
    hideRegError();
  };
  reader.onerror = function() {
    showRegError('文件读取失败，请重试');
  };
  reader.readAsDataURL(file);
}

function showRegError(msg) {
  var el = document.getElementById('regError');
  el.textContent = msg;
  el.style.display = 'block';
}

function hideRegError() {
  document.getElementById('regError').style.display = 'none';
}

function doRegister() {
  var account = document.getElementById('regAccount').value.trim();
  var password = document.getElementById('regPassword').value;
  var passwordConfirm = document.getElementById('regPasswordConfirm').value;
  var orgName = document.getElementById('regOrgName').value.trim();
  var person = document.getElementById('regPerson').value.trim();
  var phone = document.getElementById('regPhone').value.trim();
  var region = document.getElementById('regRegion').value.trim();
  var address = document.getElementById('regAddress').value.trim();

  // 验证
  if (!account) { showRegError('请设置登录账号'); return; }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(account)) { showRegError('账号只能使用字母、数字和下划线，3-20位'); return; }
  if (!password) { showRegError('请设置密码'); return; }
  if (password.length < 6) { showRegError('密码至少需要6位'); return; }
  if (password !== passwordConfirm) { showRegError('两次输入的密码不一致'); return; }
  if (!orgName) { showRegError(regType === 'clinic' ? '请输入诊所名称' : '请输入药店名称'); return; }
  if (!person) { showRegError('请输入负责人姓名'); return; }
  if (!phone) { showRegError('请输入联系电话'); return; }
  if (!/^1[3-9]\d{9}$/.test(phone.replace(/-/g, ''))) { showRegError('请输入正确的手机号'); return; }
  if (!region) { showRegError('请输入所在地区'); return; }
  if (!regLicenseData) { showRegError('请上传营业资质照片或电子档'); return; }

  // 检查账号是否已存在
  var existingAccounts = Object.keys(ACCOUNTS);
  var registrations = DB.getAll('registrations');
  var regAccounts = registrations.map(function(r) { return r.account; });
  if (existingAccounts.indexOf(account) !== -1 || regAccounts.indexOf(account) !== -1) {
    showRegError('该账号已被使用，请更换');
    return;
  }

  // 保存注册申请
  DB.add('registrations', {
    type: regType,
    account: account,
    password: password,
    orgName: orgName,
    person: person,
    phone: phone,
    region: region,
    address: address,
    licenseName: document.getElementById('regLicenseFile').files[0] ? document.getElementById('regLicenseFile').files[0].name : 'license',
    licenseData: regLicenseData,
    status: 'pending',
    submittedAt: DB._today()
  });

  // 显示成功提示并返回登录
  if (typeof UI !== 'undefined' && UI.toast) {
    UI.toast.success('注册申请已提交，请等待平台审核');
  }
  setTimeout(function() {
    showLogin();
  }, 1500);
}

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

  // 拖拽上传支持
  var uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.remove('dragover');
      var files = e.dataTransfer.files;
      if (files && files.length > 0) {
        var fileInput = document.getElementById('regLicenseFile');
        fileInput.files = files;
        handleFileUpload(fileInput);
      }
    });
  }
});
