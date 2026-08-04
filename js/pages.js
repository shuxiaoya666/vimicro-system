// ===== 小唯管理系统 - 五端页面内容 =====
// 定义 SIDEBAR_MENUS 和 PAGE_RENDERERS 两个全局变量
// 青绿色主色调 #1abc9c | Inter 字体 | 卡片式布局

// ==================== SIDEBAR_MENUS ====================
var SIDEBAR_MENUS = {

  // ---------- 平台端 ----------
  platform: [
    { title: '概览', items: [
      { key: 'home', icon: '🏠', name: '首页' }
    ]},
    { title: '业务管理', items: [
      { key: 'clinics', icon: '🏥', name: '诊所管理', badge: '12' },
      { key: 'pharmacy', icon: '💊', name: '药店管理' },
      { key: 'factory', icon: '🏭', name: '工厂详情' },
      { key: 'dealers', icon: '👤', name: '经销商管理' },
      { key: 'cards', icon: '💳', name: '种植体卡管理' },
      { key: 'mall', icon: '🛒', name: '商场管理' }
    ]},
    { title: '财务', items: [
      { key: 'settlement', icon: '💰', name: '结算中心' },
      { key: 'reports', icon: '📊', name: '财务报表' }
    ]},
    { title: '系统', items: [
      { key: 'permissions', icon: '⚙️', name: '权限配置' },
      { key: 'notifications', icon: '📢', name: '消息通知' }
    ]}
  ],

  // ---------- 诊所端 ----------
  clinic: [
    { title: '概览', items: [
      { key: 'home', icon: '🏠', name: '首页' }
    ]},
    { title: '业务', items: [
      { key: 'verify', icon: '📋', name: '核销登记', badge: '3' },
      { key: 'patients', icon: '👤', name: '患者建档' },
      { key: 'orders', icon: '📄', name: '加工单管理' },
      { key: 'tracking', icon: '📦', name: '订单跟踪' },
      { key: 'implants', icon: '🦷', name: '植体管理' }
    ]},
    { title: '财务', items: [
      { key: 'finance', icon: '💰', name: '收支明细' },
      { key: 'withdraw', icon: '💳', name: '提现申请' }
    ]},
    { title: '系统', items: [
      { key: 'settings', icon: '⚙️', name: '诊所设置' }
    ]}
  ],

  // ---------- 经销商端 ----------
  dealer: [
    { title: '概览', items: [
      { key: 'home', icon: '🏠', name: '首页' }
    ]},
    { title: '客户', items: [
      { key: 'clinics', icon: '🏥', name: '诊所管理', badge: '5' },
      { key: 'pharmacy', icon: '💊', name: '药房管理', badge: '3' },
      { key: 'sales', icon: '🎯', name: '销售活动' }
    ]},
    { title: '收益', items: [
      { key: 'commission', icon: '💰', name: '佣金明细' },
      { key: 'withdraw', icon: '💳', name: '提现申请' }
    ]},
    { title: '系统', items: [
      { key: 'settings', icon: '⚙️', name: '个人设置' }
    ]}
  ],

  // ---------- 药店端 ----------
  pharmacy: [
    { title: '概览', items: [
      { key: 'home', icon: '🏠', name: '首页' }
    ]},
    { title: '商品', items: [
      { key: 'cards', icon: '💳', name: '种植卡管理' },
      { key: 'inventory', icon: '📦', name: '库存查看' },
      { key: 'purchase', icon: '🛒', name: '采购管理' }
    ]},
    { title: '财务', items: [
      { key: 'finance', icon: '💰', name: '财务收支' },
      { key: 'mall', icon: '🏦', name: '提现/商城' }
    ]},
    { title: '客户', items: [
      { key: 'customers', icon: '👤', name: '客户管理' }
    ]},
    { title: '系统', items: [
      { key: 'settings', icon: '⚙️', name: '门店设置' }
    ]}
  ],

  // ---------- 工厂端 ----------
  factory: [
    { title: '概览', items: [
      { key: 'home', icon: '🏠', name: '首页' }
    ]},
    { title: '订单', items: [
      { key: 'orders', icon: '📋', name: '订单管理', badge: '8' },
      { key: 'shipping', icon: '📦', name: '收发货管理' }
    ]},
    { title: '生产', items: [
      { key: 'production', icon: '🏭', name: '生产排产' },
      { key: 'quality', icon: '✅', name: '质检记录' },
      { key: 'exception', icon: '⚠️', name: '异常反馈' }
    ]},
    { title: '沟通', items: [
      { key: 'service', icon: '💬', name: '客服中心' }
    ]},
    { title: '财务', items: [
      { key: 'finance', icon: '💰', name: '财务收支' }
    ]}
  ]
};

// ==================== PAGE_RENDERERS ====================
var PAGE_RENDERERS = {

  // ================================================================
  //  平台端 (platform) — 11 个页面
  // ================================================================
  platform: {

    home: function() {
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">合作诊所</span><div class="stat-card-icon green">🏥</div></div>
    <div class="stat-card-value">128</div>
    <div class="stat-card-change up">↑ 12.5% 较上月</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">合作药店</span><div class="stat-card-icon blue">💊</div></div>
    <div class="stat-card-value">56</div>
    <div class="stat-card-change up">↑ 8.3% 较上月</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">合作工厂</span><div class="stat-card-icon orange">🏭</div></div>
    <div class="stat-card-value">4</div>
    <div class="stat-card-change up">↑ 1 本季新增</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">平台营收</span><div class="stat-card-icon red">💰</div></div>
    <div class="stat-card-value">¥2,856,300</div>
    <div class="stat-card-change up">↑ 18.6% 较上月</div>
  </div>
</div>

<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('clinics')"><div class="icon green">🏥</div><div class="name">诊所管理</div><div class="desc">128 家合作</div></div>
  <div class="quick-item" onclick="navigateTo('pharmacy')"><div class="icon blue">💊</div><div class="name">药店管理</div><div class="desc">56 家合作</div></div>
  <div class="quick-item" onclick="navigateTo('factory')"><div class="icon orange">🏭</div><div class="name">工厂详情</div><div class="desc">4 家工厂</div></div>
  <div class="quick-item" onclick="navigateTo('dealers')"><div class="icon purple">👤</div><div class="name">经销商</div><div class="desc">22 家签约</div></div>
  <div class="quick-item" onclick="navigateTo('settlement')"><div class="icon teal">💰</div><div class="name">结算中心</div><div class="desc">3 笔待审</div></div>
</div>

<div class="chart-row">
  <div class="chart-placeholder">
    <div class="bar-item"><div class="bar-value">186</div><div class="bar" style="height:65px"></div><div class="bar-label">1月</div></div>
    <div class="bar-item"><div class="bar-value">215</div><div class="bar" style="height:78px"></div><div class="bar-label">2月</div></div>
    <div class="bar-item"><div class="bar-value">248</div><div class="bar" style="height:92px"></div><div class="bar-label">3月</div></div>
    <div class="bar-item"><div class="bar-value">198</div><div class="bar" style="height:70px"></div><div class="bar-label">4月</div></div>
    <div class="bar-item"><div class="bar-value">267</div><div class="bar" style="height:100px"></div><div class="bar-label">5月</div></div>
    <div class="bar-item"><div class="bar-value">312</div><div class="bar" style="height:120px"></div><div class="bar-label">6月</div></div>
    <div class="bar-item"><div class="bar-value">289</div><div class="bar" style="height:108px"></div><div class="bar-label">7月</div></div>
    <div class="bar-item"><div class="bar-value">341</div><div class="bar" style="height:135px"></div><div class="bar-label">8月</div></div>
  </div>
  <div class="chart-placeholder" style="flex-direction:column;align-items:center;justify-content:center;">
    <div class="donut-chart" style="background:conic-gradient(#1abc9c 0% 42%, #3498db 42% 68%, #f39c12 68% 86%, #e8f8f5 86% 100%);">
      <div class="donut-center"><div class="num">128</div><div class="label">总诊所</div></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;font-size:12px;flex-wrap:wrap;justify-content:center;">
      <span>🟩 华东 54</span><span>🟦 华北 33</span><span>🟧 华南 23</span><span>⬜ 其他 18</span>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">最近注册诊所</span>
    <button class="btn btn-outline btn-sm" onclick="navigateTo('clinics')">查看全部</button>
  </div>
  <table class="data-table">
    <thead><tr><th>诊所名称</th><th>负责人</th><th>联系电话</th><th>地区</th><th>状态</th><th>注册时间</th></tr></thead>
    <tbody>
      <tr><td>仁爱口腔诊所</td><td>李明华</td><td>138-0011-2233</td><td>浙江杭州</td><td><span class="status-tag active">已激活</span></td><td>2025-07-28</td></tr>
      <tr><td>康贝口腔门诊部</td><td>王秀英</td><td>139-5566-7788</td><td>江苏南京</td><td><span class="status-tag pending">审核中</span></td><td>2025-07-25</td></tr>
      <tr><td>雅悦口腔医院</td><td>张伟强</td><td>137-2233-4455</td><td>广东深圳</td><td><span class="status-tag active">已激活</span></td><td>2025-07-20</td></tr>
      <tr><td>微笑牙科诊所</td><td>陈丽芳</td><td>136-8899-0011</td><td>四川成都</td><td><span class="status-tag active">已激活</span></td><td>2025-07-18</td></tr>
      <tr><td>德仁口腔中心</td><td>刘建国</td><td>135-6677-8899</td><td>湖北武汉</td><td><span class="status-tag pending">审核中</span></td><td>2025-07-15</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    clinics: function() {
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>诊所管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">诊所列表</span>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-outline btn-sm">导出Excel</button>
      <button class="btn btn-primary btn-sm">+ 新增诊所</button>
    </div>
  </div>
  <table class="data-table">
    <thead><tr><th>诊所名称</th><th>负责人</th><th>联系电话</th><th>地区</th><th>植体用量</th><th>状态</th><th>注册时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>仁爱口腔诊所</td><td>李明华</td><td>138-0011-2233</td><td>浙江杭州</td><td>342</td><td><span class="status-tag active">已激活</span></td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>雅悦口腔医院</td><td>张伟强</td><td>137-2233-4455</td><td>广东深圳</td><td>586</td><td><span class="status-tag active">已激活</span></td><td>2025-07-20</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>微笑牙科诊所</td><td>陈丽芳</td><td>136-8899-0011</td><td>四川成都</td><td>218</td><td><span class="status-tag active">已激活</span></td><td>2025-07-18</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>康贝口腔门诊部</td><td>王秀英</td><td>139-5566-7788</td><td>江苏南京</td><td>—</td><td><span class="status-tag pending">审核中</span></td><td>2025-07-25</td><td><button class="btn btn-outline btn-sm">审核</button></td></tr>
      <tr><td>德仁口腔中心</td><td>刘建国</td><td>135-6677-8899</td><td>湖北武汉</td><td>—</td><td><span class="status-tag pending">审核中</span></td><td>2025-07-15</td><td><button class="btn btn-outline btn-sm">审核</button></td></tr>
      <tr><td>博雅口腔诊所</td><td>赵新民</td><td>133-4455-6677</td><td>上海</td><td>456</td><td><span class="status-tag active">已激活</span></td><td>2025-06-30</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>和谐口腔门诊</td><td>孙美玲</td><td>132-9988-7766</td><td>北京</td><td>312</td><td><span class="status-tag inactive">已停用</span></td><td>2025-05-12</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    pharmacy: function() {
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>药店管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">药店列表</span>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-outline btn-sm">导出Excel</button>
      <button class="btn btn-primary btn-sm">+ 新增药店</button>
    </div>
  </div>
  <table class="data-table">
    <thead><tr><th>药店名称</th><th>店长</th><th>联系电话</th><th>地区</th><th>种植卡销量</th><th>状态</th><th>入驻时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>健佳大药房</td><td>周明</td><td>138-1122-3344</td><td>浙江杭州</td><td>1,280</td><td><span class="status-tag active">营业中</span></td><td>2025-06-10</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>同德堂药房</td><td>吴芳</td><td>139-5544-6677</td><td>江苏苏州</td><td>860</td><td><span class="status-tag active">营业中</span></td><td>2025-06-05</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>益民大药房</td><td>郑国华</td><td>137-7788-9900</td><td>广东广州</td><td>1,050</td><td><span class="status-tag active">营业中</span></td><td>2025-05-28</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>仁心药房</td><td>冯丽</td><td>136-2200-3300</td><td>四川成都</td><td>430</td><td><span class="status-tag processing">装修中</span></td><td>2025-07-20</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>康源药房</td><td>褚伟</td><td>135-6677-2200</td><td>湖北武汉</td><td>672</td><td><span class="status-tag active">营业中</span></td><td>2025-05-15</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>百姓大药房</td><td>卫国</td><td>133-8899-1100</td><td>上海</td><td>—</td><td><span class="status-tag inactive">已停业</span></td><td>2025-04-08</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    factory: function() {
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>工厂详情</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">合作工厂</span><div class="stat-card-icon green">🏭</div></div>
    <div class="stat-card-value">4</div>
    <div class="stat-card-change up">↑ 1 本季新增</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">月产能</span><div class="stat-card-icon blue">⚙️</div></div>
    <div class="stat-card-value">12,000</div>
    <div class="stat-card-change up">↑ 9.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月产出</span><div class="stat-card-icon orange">📦</div></div>
    <div class="stat-card-value">10,860</div>
    <div class="stat-card-change up">↑ 7.8%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">平均合格率</span><div class="stat-card-icon red">✅</div></div>
    <div class="stat-card-value">98.5%</div>
    <div class="stat-card-change up">↑ 0.3%</div>
  </div>
</div>

<div class="two-col">
  <div class="card">
    <div class="card-header"><span class="card-title">工厂信息</span><button class="btn btn-outline btn-sm">编辑</button></div>
    <table class="data-table">
      <tbody>
        <tr><th style="width:120px;">工厂名称</th><td>小唯精密制造有限公司</td></tr>
        <tr><th>负责人</th><td>孙志强</td></tr>
        <tr><th>联系电话</th><td>138-8888-0001</td></tr>
        <tr><th>工厂地址</th><td>广东省东莞市松山湖科技产业园</td></tr>
        <tr><th>月产能</th><td>12,000 颗</td></tr>
        <tr><th>合作状态</th><td><span class="status-tag active">合作中</span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="card">
    <div class="card-header"><span class="card-title">生产阶段流程</span></div>
    <div class="production-stage"><div class="stage-num done">1</div><div class="stage-info"><h4>订单接收</h4><p>已接收 18 单 / 今日</p></div></div>
    <div class="production-stage"><div class="stage-num done">2</div><div class="stage-info"><h4>材料准备</h4><p>钛合金坯料库存充足</p></div></div>
    <div class="production-stage"><div class="stage-num current">3</div><div class="stage-info"><h4>精密加工</h4><p>12 单加工中 · 预计今日完成</p></div></div>
    <div class="production-stage"><div class="stage-num pending">4</div><div class="stage-info"><h4>表面处理</h4><p>待加工完成后进入</p></div></div>
    <div class="production-stage"><div class="stage-num pending">5</div><div class="stage-info"><h4>质检包装</h4><p>待表面处理完成后进入</p></div></div>
    <div class="production-stage"><div class="stage-num pending">6</div><div class="stage-info"><h4>发货出库</h4><p>质检通过后安排物流</p></div></div>
  </div>
</div>
      `;
    },

    dealers: function() {
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>经销商管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">经销商列表</span>
    <button class="btn btn-primary btn-sm">+ 新增经销商</button>
  </div>
  <table class="data-table">
    <thead><tr><th>经销商</th><th>负责区域</th><th>诊所客户</th><th>药房客户</th><th>佣金累计</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>张明华</td><td>华东区域</td><td>42</td><td>18</td><td>¥386,200</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>李伟强</td><td>华南区域</td><td>35</td><td>12</td><td>¥298,500</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>王秀芳</td><td>华北区域</td><td>28</td><td>15</td><td>¥245,800</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>陈建国</td><td>西南区域</td><td>15</td><td>7</td><td>¥128,600</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>赵新民</td><td>华中区域</td><td>8</td><td>4</td><td>¥56,300</td><td><span class="status-tag pending">待签约</span></td><td><button class="btn btn-outline btn-sm">审核</button></td></tr>
      <tr><td>刘德海</td><td>东北区域</td><td>—</td><td>—</td><td>—</td><td><span class="status-tag inactive">已终止</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    cards: function() {
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>种植体卡管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">种植体卡列表</span>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-outline btn-sm">导出Excel</button>
      <button class="btn btn-primary btn-sm">+ 批量发卡</button>
    </div>
  </div>
  <table class="data-table">
    <thead><tr><th>卡号</th><th>患者姓名</th><th>所属诊所</th><th>植体型号</th><th>发卡药店</th><th>发卡日期</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>XW-2025-08001</td><td>周小明</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>健佳大药房</td><td>2025-08-01</td><td><span class="status-tag active">已激活</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-08002</td><td>吴丽红</td><td>雅悦口腔医院</td><td>XW-TI-4200</td><td>同德堂药房</td><td>2025-08-01</td><td><span class="status-tag active">已激活</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07998</td><td>郑国强</td><td>微笑牙科诊所</td><td>XW-TI-3508</td><td>益民大药房</td><td>2025-07-30</td><td><span class="status-tag processing">待核销</span></td><td><button class="btn btn-outline btn-sm">核销</button></td></tr>
      <tr><td>XW-2025-07995</td><td>冯小明</td><td>博雅口腔诊所</td><td>XW-TI-4212</td><td>康源药房</td><td>2025-07-28</td><td><span class="status-tag active">已激活</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07990</td><td>褚伟杰</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>健佳大药房</td><td>2025-07-25</td><td><span class="status-tag active">已激活</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07985</td><td>卫东</td><td>雅悦口腔医院</td><td>XW-TI-4200</td><td>益民大药房</td><td>2025-07-22</td><td><span class="status-tag inactive">已作废</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    mall: function() {
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>商场管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">商品列表</span>
    <button class="btn btn-primary btn-sm">+ 上架商品</button>
  </div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">
    <div class="product-card">
      <div class="product-icon" style="background:var(--primary-light);">🦷</div>
      <div class="product-name">XW-TI-3510 种植体</div>
      <div class="product-price">¥1,280</div>
      <div class="product-desc">直径3.5mm 钛合金 · 畅销款</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#e8f4fd;">🦷</div>
      <div class="product-name">XW-TI-4200 种植体</div>
      <div class="product-price">¥1,580</div>
      <div class="product-desc">直径4.2mm 钛合金 · 高强度</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#fef3e2;">🔧</div>
      <div class="product-name">种植体基台</div>
      <div class="product-price">¥680</div>
      <div class="product-desc">标准基台 · 适配全系</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#f0e6ff;">🧪</div>
      <div class="product-name">骨粉材料 0.5g</div>
      <div class="product-price">¥420</div>
      <div class="product-desc">人工骨粉 · 高生物相容</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#e0f7fa;">🔩</div>
      <div class="product-name">愈合帽</div>
      <div class="product-price">¥150</div>
      <div class="product-desc">标准愈合帽 · 含螺丝</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:var(--primary-light);">📦</div>
      <div class="product-name">种植手术工具包</div>
      <div class="product-price">¥3,800</div>
      <div class="product-desc">全套手术器械 · 消毒级</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#e8f4fd;">💉</div>
      <div class="product-name">麻药注射器</div>
      <div class="product-price">¥85</div>
      <div class="product-desc">一次性使用 · 50支装</div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#fef3e2;">🦷</div>
      <div class="product-name">XW-TI-4212 种植体</div>
      <div class="product-price">¥1,680</div>
      <div class="product-desc">直径4.2mm 亲水表面 · 新品</div>
    </div>
  </div>
</div>
      `;
    },

    settlement: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>结算中心</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月待结算</span><div class="stat-card-icon orange">⏳</div></div>
    <div class="stat-card-value">¥486,200</div>
    <div class="stat-card-change up">3 笔待审</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月已结算</span><div class="stat-card-icon green">✅</div></div>
    <div class="stat-card-value">¥1,256,800</div>
    <div class="stat-card-change up">↑ 15.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">平台抽成收入</span><div class="stat-card-icon blue">💼</div></div>
    <div class="stat-card-value">¥285,630</div>
    <div class="stat-card-change up">↑ 12.8%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">累计结算总额</span><div class="stat-card-icon red">💰</div></div>
    <div class="stat-card-value">¥8,560,000</div>
    <div class="stat-card-change up">↑ 22.1%</div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">结算记录</span>
    <button class="btn btn-outline btn-sm">导出报表</button>
  </div>
  <table class="data-table">
    <thead><tr><th>结算单号</th><th>结算方</th><th>类型</th><th>金额</th><th>平台抽成</th><th>状态</th><th>申请日期</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>ST-2025-0812</td><td>仁爱口腔诊所</td><td>诊所提现</td><td>¥86,500</td><td>¥8,650</td><td><span class="status-tag pending">待审核</span></td><td>2025-08-03</td><td><button class="btn btn-primary btn-sm">审核</button></td></tr>
      <tr><td>ST-2025-0811</td><td>健佳大药房</td><td>药店提现</td><td>¥56,200</td><td>¥5,620</td><td><span class="status-tag pending">待审核</span></td><td>2025-08-02</td><td><button class="btn btn-primary btn-sm">审核</button></td></tr>
      <tr><td>ST-2025-0810</td><td>张明华（经销商）</td><td>佣金提现</td><td>¥45,600</td><td>¥4,560</td><td><span class="status-tag pending">待审核</span></td><td>2025-08-01</td><td><button class="btn btn-primary btn-sm">审核</button></td></tr>
      <tr><td>ST-2025-0809</td><td>雅悦口腔医院</td><td>诊所提现</td><td>¥128,000</td><td>¥12,800</td><td><span class="status-tag active">已结算</span></td><td>2025-07-30</td><td><button class="btn btn-outline btn-sm">查看</button></td></tr>
      <tr><td>ST-2025-0808</td><td>益民大药房</td><td>药店提现</td><td>¥72,400</td><td>¥7,240</td><td><span class="status-tag active">已结算</span></td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">查看</button></td></tr>
      <tr><td>ST-2025-0807</td><td>小唯精密制造</td><td>工厂货款</td><td>¥356,000</td><td>¥35,600</td><td><span class="status-tag active">已结算</span></td><td>2025-07-25</td><td><button class="btn btn-outline btn-sm">查看</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    reports: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>财务报表</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月总收入</span><div class="stat-card-icon green">📈</div></div>
    <div class="stat-card-value">¥2,856,300</div>
    <div class="stat-card-change up">↑ 18.6%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月总支出</span><div class="stat-card-icon red">📉</div></div>
    <div class="stat-card-value">¥1,892,500</div>
    <div class="stat-card-change up">↑ 10.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">净利润</span><div class="stat-card-icon blue">💰</div></div>
    <div class="stat-card-value">¥963,800</div>
    <div class="stat-card-change up">↑ 35.4%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">利润率</span><div class="stat-card-icon orange">📊</div></div>
    <div class="stat-card-value">33.8%</div>
    <div class="stat-card-change up">↑ 4.2%</div>
  </div>
</div>

<div class="chart-row">
  <div class="chart-placeholder">
    <div class="bar-item"><div class="bar-value">186</div><div class="bar" style="height:65px"></div><div class="bar-label">1月</div></div>
    <div class="bar-item"><div class="bar-value">215</div><div class="bar" style="height:78px"></div><div class="bar-label">2月</div></div>
    <div class="bar-item"><div class="bar-value">248</div><div class="bar" style="height:92px"></div><div class="bar-label">3月</div></div>
    <div class="bar-item"><div class="bar-value">198</div><div class="bar" style="height:70px"></div><div class="bar-label">4月</div></div>
    <div class="bar-item"><div class="bar-value">267</div><div class="bar" style="height:100px"></div><div class="bar-label">5月</div></div>
    <div class="bar-item"><div class="bar-value">312</div><div class="bar" style="height:120px"></div><div class="bar-label">6月</div></div>
    <div class="bar-item"><div class="bar-value">289</div><div class="bar" style="height:108px"></div><div class="bar-label">7月</div></div>
    <div class="bar-item"><div class="bar-value">341</div><div class="bar" style="height:135px"></div><div class="bar-label">8月</div></div>
  </div>
  <div class="chart-placeholder" style="flex-direction:column;align-items:center;justify-content:center;">
    <div class="donut-chart" style="background:conic-gradient(#1abc9c 0% 38%, #3498db 38% 62%, #f39c12 62% 82%, #e74c3c 82% 100%);">
      <div class="donut-center"><div class="num">¥285万</div><div class="label">本月营收</div></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;font-size:12px;flex-wrap:wrap;justify-content:center;">
      <span>🟩 诊所 38%</span><span>🟦 药店 24%</span><span>🟧 工厂 20%</span><span>🟥 其他 18%</span>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">收入明细</span><button class="btn btn-outline btn-sm">导出报表</button></div>
  <table class="data-table">
    <thead><tr><th>日期</th><th>收入项目</th><th>来源</th><th>金额</th><th>类型</th></tr></thead>
    <tbody>
      <tr><td>2025-08-03</td><td>诊所月度服务费</td><td>仁爱口腔诊所</td><td>¥8,650</td><td><span class="status-tag active">服务费</span></td></tr>
      <tr><td>2025-08-02</td><td>药店商品抽成</td><td>健佳大药房</td><td>¥5,620</td><td><span class="status-tag active">抽成</span></td></tr>
      <tr><td>2025-08-01</td><td>经销商佣金抽成</td><td>张明华</td><td>¥4,560</td><td><span class="status-tag active">抽成</span></td></tr>
      <tr><td>2025-07-30</td><td>诊所月度服务费</td><td>雅悦口腔医院</td><td>¥12,800</td><td><span class="status-tag active">服务费</span></td></tr>
      <tr><td>2025-07-28</td><td>工厂货款抽成</td><td>小唯精密制造</td><td>¥35,600</td><td><span class="status-tag active">抽成</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    permissions: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>权限配置</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">角色权限管理</span>
    <button class="btn btn-primary btn-sm">+ 新增角色</button>
  </div>
  <table class="data-table">
    <thead><tr><th>角色名称</th><th>描述</th><th>可访问端口</th><th>用户数</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>超级管理员</td><td>拥有全部权限</td><td>全部五端</td><td>1</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
      <tr><td>平台运营</td><td>平台日常运营管理</td><td>平台端</td><td>5</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
      <tr><td>平台财务</td><td>财务结算与报表查看</td><td>平台端</td><td>3</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
      <tr><td>诊所管理员</td><td>诊所端全部功能</td><td>诊所端</td><td>128</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
      <tr><td>经销商</td><td>经销商端全部功能</td><td>经销商端</td><td>22</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
      <tr><td>药店店长</td><td>药店端全部功能</td><td>药店端</td><td>56</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
      <tr><td>工厂管理员</td><td>工厂端全部功能</td><td>工厂端</td><td>4</td><td><span class="status-tag active">启用</span></td><td><button class="btn btn-outline btn-sm">编辑</button></td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">功能权限矩阵 — 平台运营</span></div>
  <table class="data-table">
    <thead><tr><th>功能模块</th><th>查看</th><th>新增</th><th>编辑</th><th>删除</th><th>审核</th></tr></thead>
    <tbody>
      <tr><td>诊所管理</td><td>✅</td><td>✅</td><td>✅</td><td>❌</td><td>✅</td></tr>
      <tr><td>药店管理</td><td>✅</td><td>✅</td><td>✅</td><td>❌</td><td>✅</td></tr>
      <tr><td>工厂详情</td><td>✅</td><td>❌</td><td>✅</td><td>❌</td><td>❌</td></tr>
      <tr><td>结算中心</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td></tr>
      <tr><td>财务报表</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td></tr>
      <tr><td>权限配置</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    notifications: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>消息通知</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">系统通知</span>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-outline btn-sm">全部已读</button>
      <button class="btn btn-primary btn-sm">+ 发布通知</button>
    </div>
  </div>
  <div class="timeline">
    <div class="timeline-item">
      <div class="time">2025-08-04 09:30</div>
      <div class="content"><strong>新诊所注册申请</strong> — 康贝口腔门诊部提交了注册申请，等待审核。</div>
    </div>
    <div class="timeline-item">
      <div class="time">2025-08-03 16:45</div>
      <div class="content"><strong>提现申请</strong> — 仁爱口腔诊所申请提现 ¥86,500，待审核。</div>
    </div>
    <div class="timeline-item">
      <div class="time">2025-08-03 14:20</div>
      <div class="content"><strong>工厂出货通知</strong> — 小唯精密制造已完成 320 颗种植体出货，物流单号 SF1284567。</div>
    </div>
    <div class="timeline-item">
      <div class="time">2025-08-02 11:10</div>
      <div class="content"><strong>药店提现申请</strong> — 健佳大药房申请提现 ¥56,200，待审核。</div>
    </div>
    <div class="timeline-item">
      <div class="time">2025-08-01 10:00</div>
      <div class="content"><strong>月度结算完成</strong> — 7月平台结算已全部完成，共结算 ¥1,256,800。</div>
    </div>
    <div class="timeline-item">
      <div class="time">2025-07-31 18:30</div>
      <div class="content"><strong>系统升级通知</strong> — 系统将于今晚 23:00-次日 01:00 进行升级维护。</div>
    </div>
    <div class="timeline-item">
      <div class="time">2025-07-30 15:20</div>
      <div class="content"><strong>新经销商签约</strong> — 赵新民（华中区域）提交了经销商签约申请。</div>
    </div>
  </div>
</div>
      `;
    }
  },

  // ================================================================
  //  诊所端 (clinic) — 9 个页面
  // ================================================================
  clinic: {

    home: function() {
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">今日核销</span><div class="stat-card-icon green">📋</div></div>
    <div class="stat-card-value">8</div>
    <div class="stat-card-change up">↑ 2 较昨日</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">患者总数</span><div class="stat-card-icon blue">👤</div></div>
    <div class="stat-card-value">356</div>
    <div class="stat-card-change up">↑ 12 本月新增</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">加工单</span><div class="stat-card-icon orange">📄</div></div>
    <div class="stat-card-value">24</div>
    <div class="stat-card-change up">3 单待处理</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月收入</span><div class="stat-card-icon red">💰</div></div>
    <div class="stat-card-value">¥186,500</div>
    <div class="stat-card-change up">↑ 15.8%</div>
  </div>
</div>

<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('verify')"><div class="icon green">📋</div><div class="name">核销登记</div><div class="desc">3 笔待核销</div></div>
  <div class="quick-item" onclick="navigateTo('patients')"><div class="icon blue">👤</div><div class="name">患者建档</div><div class="desc">新建档案</div></div>
  <div class="quick-item" onclick="navigateTo('orders')"><div class="icon orange">📄</div><div class="name">加工单</div><div class="desc">24 单</div></div>
  <div class="quick-item" onclick="navigateTo('tracking')"><div class="icon purple">📦</div><div class="name">订单跟踪</div><div class="desc">物流查询</div></div>
  <div class="quick-item" onclick="navigateTo('implants')"><div class="icon teal">🦷</div><div class="name">植体管理</div><div class="desc">库存 86</div></div>
</div>

<div class="chart-row">
  <div class="chart-placeholder">
    <div class="bar-item"><div class="bar-value">12.5</div><div class="bar" style="height:50px"></div><div class="bar-label">1月</div></div>
    <div class="bar-item"><div class="bar-value">14.8</div><div class="bar" style="height:62px"></div><div class="bar-label">2月</div></div>
    <div class="bar-item"><div class="bar-value">16.2</div><div class="bar" style="height:72px"></div><div class="bar-label">3月</div></div>
    <div class="bar-item"><div class="bar-value">13.6</div><div class="bar" style="height:55px"></div><div class="bar-label">4月</div></div>
    <div class="bar-item"><div class="bar-value">15.9</div><div class="bar" style="height:68px"></div><div class="bar-label">5月</div></div>
    <div class="bar-item"><div class="bar-value">17.2</div><div class="bar" style="height:80px"></div><div class="bar-label">6月</div></div>
    <div class="bar-item"><div class="bar-value">16.8</div><div class="bar" style="height:76px"></div><div class="bar-label">7月</div></div>
    <div class="bar-item"><div class="bar-value">18.6</div><div class="bar" style="height:92px"></div><div class="bar-label">8月</div></div>
  </div>
  <div class="chart-placeholder" style="flex-direction:column;align-items:center;justify-content:center;">
    <div class="donut-chart" style="background:conic-gradient(#1abc9c 0% 48%, #3498db 48% 72%, #f39c12 72% 90%, #e8f8f5 90% 100%);">
      <div class="donut-center"><div class="num">356</div><div class="label">患者总数</div></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;font-size:12px;flex-wrap:wrap;justify-content:center;">
      <span>🟩 种植 171</span><span>🟦 修复 86</span><span>🟧 正畸 64</span><span>⬜ 其他 35</span>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">最近加工单</span>
    <button class="btn btn-outline btn-sm" onclick="navigateTo('orders')">查看全部</button>
  </div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>患者</th><th>类型</th><th>工厂</th><th>状态</th><th>创建时间</th></tr></thead>
    <tbody>
      <tr><td>MO-2025-0823</td><td>周小明</td><td>种植体</td><td>小唯精密制造</td><td><span class="status-tag processing">加工中</span></td><td>2025-08-03</td></tr>
      <tr><td>MO-2025-0822</td><td>吴丽红</td><td>种植体</td><td>小唯精密制造</td><td><span class="status-tag pending">待发送</span></td><td>2025-08-02</td></tr>
      <tr><td>MO-2025-0821</td><td>郑国强</td><td>基台</td><td>小唯精密制造</td><td><span class="status-tag active">已完成</span></td><td>2025-07-30</td></tr>
      <tr><td>MO-2025-0820</td><td>冯小明</td><td>种植体</td><td>小唯精密制造</td><td><span class="status-tag processing">运输中</span></td><td>2025-07-28</td></tr>
      <tr><td>MO-2025-0819</td><td>褚伟杰</td><td>种植体</td><td>小唯精密制造</td><td><span class="status-tag active">已完成</span></td><td>2025-07-25</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    verify: function() {
      return `
<div class="breadcrumb">首页 / 业务 / <span>核销登记</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">扫码核销</span></div>
  <div class="form-row">
    <div class="form-group">
      <label>种植卡号</label>
      <input type="text" placeholder="请输入或扫描卡号（如 XW-2025-08001）">
    </div>
    <div class="form-group">
      <label>患者姓名</label>
      <input type="text" placeholder="请输入患者姓名">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>核销类型</label>
      <select><option>种植体植入</option><option>基台安装</option><option>牙冠修复</option></select>
    </div>
    <div class="form-group">
      <label>核销医生</label>
      <input type="text" value="李医生" readonly>
    </div>
  </div>
  <button class="btn btn-primary">确认核销</button>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">待核销列表（3）</span></div>
  <table class="data-table">
    <thead><tr><th>卡号</th><th>患者</th><th>植体型号</th><th>发卡药店</th><th>发卡日期</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>XW-2025-07998</td><td>郑国强</td><td>XW-TI-3508</td><td>益民大药房</td><td>2025-07-30</td><td><span class="status-tag processing">待核销</span></td><td><button class="btn btn-primary btn-sm">核销</button></td></tr>
      <tr><td>XW-2025-07996</td><td>孙丽娟</td><td>XW-TI-4200</td><td>健佳大药房</td><td>2025-07-29</td><td><span class="status-tag processing">待核销</span></td><td><button class="btn btn-primary btn-sm">核销</button></td></tr>
      <tr><td>XW-2025-07992</td><td>王大伟</td><td>XW-TI-3510</td><td>同德堂药房</td><td>2025-07-27</td><td><span class="status-tag processing">待核销</span></td><td><button class="btn btn-primary btn-sm">核销</button></td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">最近核销记录</span></div>
  <table class="data-table">
    <thead><tr><th>卡号</th><th>患者</th><th>核销类型</th><th>核销医生</th><th>核销时间</th></tr></thead>
    <tbody>
      <tr><td>XW-2025-08001</td><td>周小明</td><td>种植体植入</td><td>李医生</td><td>2025-08-03 14:30</td></tr>
      <tr><td>XW-2025-08002</td><td>吴丽红</td><td>种植体植入</td><td>李医生</td><td>2025-08-03 10:15</td></tr>
      <tr><td>XW-2025-07995</td><td>冯小明</td><td>基台安装</td><td>王医生</td><td>2025-08-02 16:45</td></tr>
      <tr><td>XW-2025-07990</td><td>褚伟杰</td><td>种植体植入</td><td>李医生</td><td>2025-08-01 11:20</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    patients: function() {
      return `
<div class="breadcrumb">首页 / 业务 / <span>患者建档</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">患者列表</span>
    <button class="btn btn-primary btn-sm">+ 新建档案</button>
  </div>
  <table class="data-table">
    <thead><tr><th>姓名</th><th>性别</th><th>年龄</th><th>联系电话</th><th>诊疗类型</th><th>植体数量</th><th>建档时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>周小明</td><td>男</td><td>35</td><td>138-0011-2233</td><td>种植</td><td>2</td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>吴丽红</td><td>女</td><td>42</td><td>139-5566-7788</td><td>种植</td><td>1</td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>郑国强</td><td>男</td><td>56</td><td>137-2233-4455</td><td>种植</td><td>3</td><td>2025-07-30</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>冯小明</td><td>男</td><td>28</td><td>136-8899-0011</td><td>修复</td><td>1</td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>褚伟杰</td><td>男</td><td>45</td><td>135-6677-8899</td><td>种植</td><td>2</td><td>2025-07-25</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>孙丽娟</td><td>女</td><td>38</td><td>133-4455-6677</td><td>种植</td><td>1</td><td>2025-07-22</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>王大伟</td><td>男</td><td>50</td><td>132-9988-7766</td><td>正畸</td><td>0</td><td>2025-07-18</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    orders: function() {
      return `
<div class="breadcrumb">首页 / 业务 / <span>加工单管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">加工单列表</span>
    <button class="btn btn-primary btn-sm">+ 新建加工单</button>
  </div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>患者</th><th>加工类型</th><th>植体型号</th><th>数量</th><th>工厂</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>MO-2025-0823</td><td>周小明</td><td>种植体</td><td>XW-TI-3510</td><td>2</td><td>小唯精密制造</td><td><span class="status-tag processing">加工中</span></td><td>2025-08-03</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0822</td><td>吴丽红</td><td>种植体</td><td>XW-TI-4200</td><td>1</td><td>小唯精密制造</td><td><span class="status-tag pending">待发送</span></td><td>2025-08-02</td><td><button class="btn btn-primary btn-sm">发送</button></td></tr>
      <tr><td>MO-2025-0821</td><td>郑国强</td><td>基台</td><td>XW-BT-001</td><td>3</td><td>小唯精密制造</td><td><span class="status-tag active">已完成</span></td><td>2025-07-30</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0820</td><td>冯小明</td><td>种植体</td><td>XW-TI-4212</td><td>1</td><td>小唯精密制造</td><td><span class="status-tag processing">运输中</span></td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">物流</button></td></tr>
      <tr><td>MO-2025-0819</td><td>褚伟杰</td><td>种植体</td><td>XW-TI-3510</td><td>2</td><td>小唯精密制造</td><td><span class="status-tag active">已完成</span></td><td>2025-07-25</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0818</td><td>孙丽娟</td><td>种植体</td><td>XW-TI-4200</td><td>1</td><td>小唯精密制造</td><td><span class="status-tag active">已完成</span></td><td>2025-07-22</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    tracking: function() {
      return `
<div class="breadcrumb">首页 / 业务 / <span>订单跟踪</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">订单 MO-2025-0823 — 周小明</span><span class="status-tag processing">加工中</span></div>
  <div class="production-stage"><div class="stage-num done">1</div><div class="stage-info"><h4>订单创建</h4><p>2025-08-03 09:15 · 李医生创建</p></div></div>
  <div class="production-stage"><div class="stage-num done">2</div><div class="stage-info"><h4>工厂接收</h4><p>2025-08-03 14:20 · 小唯精密制造已确认</p></div></div>
  <div class="production-stage"><div class="stage-num done">3</div><div class="stage-info"><h4>材料准备</h4><p>2025-08-03 16:00 · 钛合金坯料已出库</p></div></div>
  <div class="production-stage"><div class="stage-num current">4</div><div class="stage-info"><h4>精密加工</h4><p>加工中 · 预计 2025-08-06 完成</p></div></div>
  <div class="production-stage"><div class="stage-num pending">5</div><div class="stage-info"><h4>表面处理</h4><p>待加工完成后进入</p></div></div>
  <div class="production-stage"><div class="stage-num pending">6</div><div class="stage-info"><h4>质检包装</h4><p>待表面处理完成后进入</p></div></div>
  <div class="production-stage"><div class="stage-num pending">7</div><div class="stage-info"><h4>发货出库</h4><p>质检通过后安排物流发货</p></div></div>
  <div class="production-stage"><div class="stage-num pending">8</div><div class="stage-info"><h4>签收入库</h4><p>诊所签收后完成订单</p></div></div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">在途订单</span></div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>患者</th><th>当前阶段</th><th>物流单号</th><th>状态</th><th>预计到达</th></tr></thead>
    <tbody>
      <tr><td>MO-2025-0820</td><td>冯小明</td><td>运输中</td><td>SF1284567</td><td><span class="status-tag processing">运输中</span></td><td>2025-08-05</td></tr>
      <tr><td>MO-2025-0823</td><td>周小明</td><td>精密加工</td><td>—</td><td><span class="status-tag processing">加工中</span></td><td>2025-08-08</td></tr>
      <tr><td>MO-2025-0822</td><td>吴丽红</td><td>待发送</td><td>—</td><td><span class="status-tag pending">待发送</span></td><td>—</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    implants: function() {
      return `
<div class="breadcrumb">首页 / 业务 / <span>植体管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">植体库存</span>
    <button class="btn btn-primary btn-sm">+ 入库登记</button>
  </div>
  <table class="data-table">
    <thead><tr><th>型号</th><th>规格</th><th>库存数量</th><th>已使用</th><th>库存状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>XW-TI-3510</td><td>直径3.5mm / 长10mm</td><td>28</td><td>342</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-TI-4200</td><td>直径4.2mm / 长10mm</td><td>22</td><td>286</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-TI-4212</td><td>直径4.2mm / 长12mm</td><td>8</td><td>98</td><td><span class="status-tag pending">偏低</span></td><td><button class="btn btn-outline btn-sm">补货</button></td></tr>
      <tr><td>XW-TI-3508</td><td>直径3.5mm / 长8mm</td><td>15</td><td>156</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-BT-001</td><td>标准基台</td><td>13</td><td>120</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-HC-002</td><td>愈合帽</td><td>—</td><td>86</td><td><span class="status-tag inactive">缺货</span></td><td><button class="btn btn-primary btn-sm">补货</button></td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">库存预警</span></div>
  <div class="timeline">
    <div class="timeline-item"><div class="time">2025-08-04 08:00</div><div class="content"><strong>XW-TI-4212</strong> 库存仅剩 8 颗，低于安全库存 10 颗，建议尽快补货。</div></div>
    <div class="timeline-item"><div class="time">2025-08-03 10:30</div><div class="content"><strong>XW-HC-002 愈合帽</strong> 已缺货，请立即联系工厂补货。</div></div>
    <div class="timeline-item"><div class="time">2025-08-01 14:00</div><div class="content"><strong>XW-TI-3510</strong> 补货到库 20 颗，当前库存 28 颗。</div></div>
  </div>
</div>
      `;
    },

    finance: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>收支明细</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月收入</span><div class="stat-card-icon green">📈</div></div>
    <div class="stat-card-value">¥186,500</div>
    <div class="stat-card-change up">↑ 15.8%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月支出</span><div class="stat-card-icon red">📉</div></div>
    <div class="stat-card-value">¥98,200</div>
    <div class="stat-card-change up">↑ 8.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月利润</span><div class="stat-card-icon blue">💰</div></div>
    <div class="stat-card-value">¥88,300</div>
    <div class="stat-card-change up">↑ 25.6%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">可提现余额</span><div class="stat-card-icon orange">💳</div></div>
    <div class="stat-card-value">¥126,800</div>
    <div class="stat-card-change up">可申请提现</div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">交易明细</span><button class="btn btn-outline btn-sm">导出Excel</button></div>
  <table class="data-table">
    <thead><tr><th>日期</th><th>交易类型</th><th>项目</th><th>收支</th><th>金额</th><th>状态</th></tr></thead>
    <tbody>
      <tr><td>2025-08-03</td><td>收入</td><td>周小明 种植手术费</td><td>收入</td><td style="color:var(--success);">+¥8,600</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-08-03</td><td>支出</td><td>种植体采购 XW-TI-3510 x20</td><td>支出</td><td style="color:var(--danger);">-¥25,600</td><td><span class="status-tag active">已支付</span></td></tr>
      <tr><td>2025-08-02</td><td>收入</td><td>吴丽红 种植手术费</td><td>收入</td><td style="color:var(--success);">+¥6,800</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-08-01</td><td>支出</td><td>门店租金 8月</td><td>支出</td><td style="color:var(--danger);">-¥12,000</td><td><span class="status-tag active">已支付</span></td></tr>
      <tr><td>2025-07-31</td><td>收入</td><td>冯小明 基台安装费</td><td>收入</td><td style="color:var(--success);">+¥3,200</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-07-30</td><td>支出</td><td>员工工资 7月</td><td>支出</td><td style="color:var(--danger);">-¥45,000</td><td><span class="status-tag active">已支付</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    withdraw: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>提现申请</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">申请提现</span></div>
  <div class="form-row">
    <div class="form-group">
      <label>可提现余额</label>
      <input type="text" value="¥126,800" readonly>
    </div>
    <div class="form-group">
      <label>提现金额</label>
      <input type="number" placeholder="请输入提现金额">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>收款银行</label>
      <select><option>中国工商银行</option><option>中国建设银行</option><option>招商银行</option></select>
    </div>
    <div class="form-group">
      <label>银行账号</label>
      <input type="text" placeholder="请输入银行账号">
    </div>
  </div>
  <button class="btn btn-primary">提交提现申请</button>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">提现记录</span></div>
  <table class="data-table">
    <thead><tr><th>申请单号</th><th>金额</th><th>收款银行</th><th>状态</th><th>申请时间</th><th>到账时间</th></tr></thead>
    <tbody>
      <tr><td>WD-2025-0803</td><td>¥86,500</td><td>工商银行 尾号 8862</td><td><span class="status-tag pending">审核中</span></td><td>2025-08-03</td><td>—</td></tr>
      <tr><td>WD-2025-0720</td><td>¥56,000</td><td>工商银行 尾号 8862</td><td><span class="status-tag active">已到账</span></td><td>2025-07-20</td><td>2025-07-22</td></tr>
      <tr><td>WD-2025-0710</td><td>¥42,000</td><td>工商银行 尾号 8862</td><td><span class="status-tag active">已到账</span></td><td>2025-07-10</td><td>2025-07-12</td></tr>
      <tr><td>WD-2025-0625</td><td>¥68,000</td><td>工商银行 尾号 8862</td><td><span class="status-tag active">已到账</span></td><td>2025-06-25</td><td>2025-06-27</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    settings: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>诊所设置</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">基本信息</span><button class="btn btn-primary btn-sm">保存</button></div>
  <div class="form-row">
    <div class="form-group">
      <label>诊所名称</label>
      <input type="text" value="仁爱口腔诊所">
    </div>
    <div class="form-group">
      <label>负责人</label>
      <input type="text" value="李明华">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>联系电话</label>
      <input type="text" value="138-0011-2233">
    </div>
    <div class="form-group">
      <label>所在地区</label>
      <input type="text" value="浙江省杭州市">
    </div>
  </div>
  <div class="form-group" style="margin-bottom:16px;">
    <label>详细地址</label>
    <input type="text" value="杭州市西湖区文三路 100 号">
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">营业信息</span><button class="btn btn-primary btn-sm">保存</button></div>
  <div class="form-row">
    <div class="form-group">
      <label>营业时间</label>
      <input type="text" value="09:00 - 18:00">
    </div>
    <div class="form-group">
      <label>营业执照号</label>
      <input type="text" value="91330106MA2XXXXX5X">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>医疗机构许可证</label>
      <input type="text" value="杭卫医许字[2023]第0056号">
    </div>
    <div class="form-group">
      <label>合作状态</label>
      <input type="text" value="已激活" readonly>
    </div>
  </div>
</div>
      `;
    }
  },

  // ================================================================
  //  经销商端 (dealer) — 7 个页面
  // ================================================================
  dealer: {

    home: function() {
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">诊所客户</span><div class="stat-card-icon green">🏥</div></div>
    <div class="stat-card-value">42</div>
    <div class="stat-card-change up">↑ 5 本月新增</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">药房客户</span><div class="stat-card-icon blue">💊</div></div>
    <div class="stat-card-value">18</div>
    <div class="stat-card-change up">↑ 3 本月新增</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月佣金</span><div class="stat-card-icon orange">💰</div></div>
    <div class="stat-card-value">¥45,600</div>
    <div class="stat-card-change up">↑ 22.4%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">累计收益</span><div class="stat-card-icon red">📊</div></div>
    <div class="stat-card-value">¥386,200</div>
    <div class="stat-card-change up">↑ 18.2%</div>
  </div>
</div>

<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('clinics')"><div class="icon green">🏥</div><div class="name">诊所管理</div><div class="desc">42 家客户</div></div>
  <div class="quick-item" onclick="navigateTo('pharmacy')"><div class="icon blue">💊</div><div class="name">药房管理</div><div class="desc">18 家客户</div></div>
  <div class="quick-item" onclick="navigateTo('sales')"><div class="icon orange">🎯</div><div class="name">销售活动</div><div class="desc">3 个进行中</div></div>
  <div class="quick-item" onclick="navigateTo('commission')"><div class="icon purple">💰</div><div class="name">佣金明细</div><div class="desc">¥45,600</div></div>
  <div class="quick-item" onclick="navigateTo('withdraw')"><div class="icon teal">💳</div><div class="name">提现申请</div><div class="desc">¥340,600</div></div>
</div>

<div class="chart-row">
  <div class="chart-placeholder">
    <div class="bar-item"><div class="bar-value">28</div><div class="bar" style="height:50px"></div><div class="bar-label">1月</div></div>
    <div class="bar-item"><div class="bar-value">32</div><div class="bar" style="height:62px"></div><div class="bar-label">2月</div></div>
    <div class="bar-item"><div class="bar-value">36</div><div class="bar" style="height:75px"></div><div class="bar-label">3月</div></div>
    <div class="bar-item"><div class="bar-value">30</div><div class="bar" style="height:55px"></div><div class="bar-label">4月</div></div>
    <div class="bar-item"><div class="bar-value">38</div><div class="bar" style="height:82px"></div><div class="bar-label">5月</div></div>
    <div class="bar-item"><div class="bar-value">42</div><div class="bar" style="height:95px"></div><div class="bar-label">6月</div></div>
    <div class="bar-item"><div class="bar-value">40</div><div class="bar" style="height:88px"></div><div class="bar-label">7月</div></div>
    <div class="bar-item"><div class="bar-value">46</div><div class="bar" style="height:110px"></div><div class="bar-label">8月</div></div>
  </div>
  <div class="chart-placeholder" style="flex-direction:column;align-items:center;justify-content:center;">
    <div class="donut-chart" style="background:conic-gradient(#1abc9c 0% 58%, #3498db 58% 83%, #f39c12 83% 95%, #e8f8f5 95% 100%);">
      <div class="donut-center"><div class="num">60</div><div class="label">总客户</div></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;font-size:12px;flex-wrap:wrap;justify-content:center;">
      <span>🟩 诊所 42</span><span>🟦 药房 18</span><span>🟧 待签 4</span>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">最近佣金记录</span>
    <button class="btn btn-outline btn-sm" onclick="navigateTo('commission')">查看全部</button>
  </div>
  <table class="data-table">
    <thead><tr><th>日期</th><th>来源客户</th><th>客户类型</th><th>交易金额</th><th>佣金比例</th><th>佣金金额</th><th>状态</th></tr></thead>
    <tbody>
      <tr><td>2025-08-03</td><td>仁爱口腔诊所</td><td>诊所</td><td>¥8,600</td><td>8%</td><td>¥688</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-08-02</td><td>健佳大药房</td><td>药房</td><td>¥12,800</td><td>6%</td><td>¥768</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-08-01</td><td>雅悦口腔医院</td><td>诊所</td><td>¥15,200</td><td>8%</td><td>¥1,216</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-07-31</td><td>益民大药房</td><td>药房</td><td>¥9,400</td><td>6%</td><td>¥564</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-07-30</td><td>微笑牙科诊所</td><td>诊所</td><td>¥6,800</td><td>8%</td><td>¥544</td><td><span class="status-tag active">已入账</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    clinics: function() {
      return `
<div class="breadcrumb">首页 / 客户 / <span>诊所管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">诊所客户列表</span>
    <button class="btn btn-primary btn-sm">+ 新增客户</button>
  </div>
  <table class="data-table">
    <thead><tr><th>诊所名称</th><th>负责人</th><th>联系电话</th><th>地区</th><th>合作时长</th><th>累计佣金</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>仁爱口腔诊所</td><td>李明华</td><td>138-0011-2233</td><td>浙江杭州</td><td>8个月</td><td>¥86,500</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>雅悦口腔医院</td><td>张伟强</td><td>137-2233-4455</td><td>广东深圳</td><td>6个月</td><td>¥62,300</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>微笑牙科诊所</td><td>陈丽芳</td><td>136-8899-0011</td><td>四川成都</td><td>5个月</td><td>¥48,600</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>博雅口腔诊所</td><td>赵新民</td><td>133-4455-6677</td><td>上海</td><td>4个月</td><td>¥35,200</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>康贝口腔门诊部</td><td>王秀英</td><td>139-5566-7788</td><td>江苏南京</td><td>—</td><td>—</td><td><span class="status-tag pending">待签约</span></td><td><button class="btn btn-primary btn-sm">跟进</button></td></tr>
      <tr><td>德仁口腔中心</td><td>刘建国</td><td>135-6677-8899</td><td>湖北武汉</td><td>—</td><td>—</td><td><span class="status-tag pending">待签约</span></td><td><button class="btn btn-primary btn-sm">跟进</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    pharmacy: function() {
      return `
<div class="breadcrumb">首页 / 客户 / <span>药房管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">药房客户列表</span>
    <button class="btn btn-primary btn-sm">+ 新增客户</button>
  </div>
  <table class="data-table">
    <thead><tr><th>药店名称</th><th>店长</th><th>联系电话</th><th>地区</th><th>合作时长</th><th>累计佣金</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>健佳大药房</td><td>周明</td><td>138-1122-3344</td><td>浙江杭州</td><td>8个月</td><td>¥56,200</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>同德堂药房</td><td>吴芳</td><td>139-5544-6677</td><td>江苏苏州</td><td>7个月</td><td>¥42,800</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>益民大药房</td><td>郑国华</td><td>137-7788-9900</td><td>广东广州</td><td>6个月</td><td>¥38,600</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>康源药房</td><td>褚伟</td><td>135-6677-2200</td><td>湖北武汉</td><td>5个月</td><td>¥28,400</td><td><span class="status-tag active">合作中</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>仁心药房</td><td>冯丽</td><td>136-2200-3300</td><td>四川成都</td><td>—</td><td>—</td><td><span class="status-tag pending">待签约</span></td><td><button class="btn btn-primary btn-sm">跟进</button></td></tr>
      <tr><td>百姓大药房</td><td>卫国</td><td>133-8899-1100</td><td>上海</td><td>3个月</td><td>¥12,600</td><td><span class="status-tag inactive">已终止</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    sales: function() {
      return `
<div class="breadcrumb">首页 / 客户 / <span>销售活动</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">进行中的活动</span>
    <button class="btn btn-primary btn-sm">+ 新建活动</button>
  </div>
  <div class="quick-grid" style="grid-template-columns:repeat(3,1fr);">
    <div class="product-card">
      <div class="product-icon" style="background:var(--primary-light);">🎯</div>
      <div class="product-name">夏季种植体推广季</div>
      <div class="product-desc">活动时间：2025-07-01 ~ 2025-08-31</div>
      <div style="margin-top:8px;">
        <span class="status-tag active">进行中</span>
        <div class="progress-bar"><div class="fill" style="width:65%"></div></div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">已签约 13/20 目标</div>
      </div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#e8f4fd;">🏥</div>
      <div class="product-name">诊所拓展计划</div>
      <div class="product-desc">活动时间：2025-08-01 ~ 2025-09-30</div>
      <div style="margin-top:8px;">
        <span class="status-tag active">进行中</span>
        <div class="progress-bar"><div class="fill" style="width:20%"></div></div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">已签约 2/10 目标</div>
      </div>
    </div>
    <div class="product-card">
      <div class="product-icon" style="background:#fef3e2;">💊</div>
      <div class="product-name">药房合作升级</div>
      <div class="product-desc">活动时间：2025-08-01 ~ 2025-08-31</div>
      <div style="margin-top:8px;">
        <span class="status-tag active">进行中</span>
        <div class="progress-bar"><div class="fill" style="width:40%"></div></div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">已签约 4/10 目标</div>
      </div>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">活动记录</span></div>
  <table class="data-table">
    <thead><tr><th>活动名称</th><th>类型</th><th>时间范围</th><th>签约数</th><th>状态</th></tr></thead>
    <tbody>
      <tr><td>春季种植体推广</td><td>推广</td><td>2025-03-01 ~ 2025-05-31</td><td>18</td><td><span class="status-tag active">已完成</span></td></tr>
      <tr><td>新年诊所拓展</td><td>拓展</td><td>2025-01-01 ~ 2025-02-28</td><td>12</td><td><span class="status-tag active">已完成</span></td></tr>
      <tr><td>药房秋季合作</td><td>推广</td><td>2024-09-01 ~ 2024-11-30</td><td>8</td><td><span class="status-tag active">已完成</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    commission: function() {
      return `
<div class="breadcrumb">首页 / 收益 / <span>佣金明细</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月佣金</span><div class="stat-card-icon green">💰</div></div>
    <div class="stat-card-value">¥45,600</div>
    <div class="stat-card-change up">↑ 22.4%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">待入账</span><div class="stat-card-icon orange">⏳</div></div>
    <div class="stat-card-value">¥8,200</div>
    <div class="stat-card-change up">5 笔待确认</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">累计佣金</span><div class="stat-card-icon blue">📊</div></div>
    <div class="stat-card-value">¥386,200</div>
    <div class="stat-card-change up">↑ 18.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">可提现</span><div class="stat-card-icon red">💳</div></div>
    <div class="stat-card-value">¥340,600</div>
    <div class="stat-card-change up">可申请提现</div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">佣金记录</span><button class="btn btn-outline btn-sm">导出Excel</button></div>
  <table class="data-table">
    <thead><tr><th>日期</th><th>来源客户</th><th>客户类型</th><th>交易金额</th><th>佣金比例</th><th>佣金金额</th><th>状态</th></tr></thead>
    <tbody>
      <tr><td>2025-08-03</td><td>仁爱口腔诊所</td><td>诊所</td><td>¥8,600</td><td>8%</td><td>¥688</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-08-02</td><td>健佳大药房</td><td>药房</td><td>¥12,800</td><td>6%</td><td>¥768</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-08-01</td><td>雅悦口腔医院</td><td>诊所</td><td>¥15,200</td><td>8%</td><td>¥1,216</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-08-01</td><td>同德堂药房</td><td>药房</td><td>¥6,400</td><td>6%</td><td>¥384</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-07-31</td><td>益民大药房</td><td>药房</td><td>¥9,400</td><td>6%</td><td>¥564</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-07-31</td><td>微笑牙科诊所</td><td>诊所</td><td>¥6,800</td><td>8%</td><td>¥544</td><td><span class="status-tag active">已入账</span></td></tr>
      <tr><td>2025-07-30</td><td>博雅口腔诊所</td><td>诊所</td><td>¥10,200</td><td>8%</td><td>¥816</td><td><span class="status-tag pending">待确认</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    withdraw: function() {
      return `
<div class="breadcrumb">首页 / 收益 / <span>提现申请</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">申请提现</span></div>
  <div class="form-row">
    <div class="form-group">
      <label>可提现金额</label>
      <input type="text" value="¥340,600" readonly>
    </div>
    <div class="form-group">
      <label>提现金额</label>
      <input type="number" placeholder="请输入提现金额">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>收款银行</label>
      <select><option>中国银行</option><option>中国建设银行</option><option>招商银行</option></select>
    </div>
    <div class="form-group">
      <label>银行账号</label>
      <input type="text" placeholder="请输入银行账号">
    </div>
  </div>
  <button class="btn btn-primary">提交提现申请</button>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">提现记录</span></div>
  <table class="data-table">
    <thead><tr><th>申请单号</th><th>金额</th><th>收款银行</th><th>状态</th><th>申请时间</th><th>到账时间</th></tr></thead>
    <tbody>
      <tr><td>WD-2025-0801</td><td>¥45,600</td><td>中国银行 尾号 6688</td><td><span class="status-tag pending">审核中</span></td><td>2025-08-01</td><td>—</td></tr>
      <tr><td>WD-2025-0715</td><td>¥38,000</td><td>中国银行 尾号 6688</td><td><span class="status-tag active">已到账</span></td><td>2025-07-15</td><td>2025-07-17</td></tr>
      <tr><td>WD-2025-0701</td><td>¥42,000</td><td>中国银行 尾号 6688</td><td><span class="status-tag active">已到账</span></td><td>2025-07-01</td><td>2025-07-03</td></tr>
      <tr><td>WD-2025-0615</td><td>¥35,000</td><td>中国银行 尾号 6688</td><td><span class="status-tag active">已到账</span></td><td>2025-06-15</td><td>2025-06-17</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    settings: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>个人设置</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">基本信息</span><button class="btn btn-primary btn-sm">保存</button></div>
  <div class="form-row">
    <div class="form-group">
      <label>姓名</label>
      <input type="text" value="张明华">
    </div>
    <div class="form-group">
      <label>联系电话</label>
      <input type="text" value="138-0000-1001">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>负责区域</label>
      <input type="text" value="华东区域" readonly>
    </div>
    <div class="form-group">
      <label>身份证号</label>
      <input type="text" value="3301**********1234">
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">佣金设置</span><button class="btn btn-primary btn-sm">保存</button></div>
  <div class="form-row">
    <div class="form-group">
      <label>诊所客户佣金比例</label>
      <input type="text" value="8%">
    </div>
    <div class="form-group">
      <label>药房客户佣金比例</label>
      <input type="text" value="6%">
    </div>
  </div>
  <div class="form-group">
    <label>结算方式</label>
    <select><option>月结（每月1日结算上月佣金）</option><option>周结</option></select>
  </div>
</div>
      `;
    }
  },

  // ================================================================
  //  药店端 (pharmacy) — 8 个页面
  // ================================================================
  pharmacy: {

    home: function() {
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">种植卡</span><div class="stat-card-icon green">💳</div></div>
    <div class="stat-card-value">1,280</div>
    <div class="stat-card-change up">↑ 86 本月</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">库存商品</span><div class="stat-card-icon blue">📦</div></div>
    <div class="stat-card-value">86</div>
    <div class="stat-card-change up">5 种缺货预警</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月销售</span><div class="stat-card-icon orange">💰</div></div>
    <div class="stat-card-value">¥98,500</div>
    <div class="stat-card-change up">↑ 16.4%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">可提现</span><div class="stat-card-icon red">💳</div></div>
    <div class="stat-card-value">¥56,200</div>
    <div class="stat-card-change up">可申请提现</div>
  </div>
</div>

<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('cards')"><div class="icon green">💳</div><div class="name">种植卡管理</div><div class="desc">1,280 张</div></div>
  <div class="quick-item" onclick="navigateTo('inventory')"><div class="icon blue">📦</div><div class="name">库存查看</div><div class="desc">86 种商品</div></div>
  <div class="quick-item" onclick="navigateTo('purchase')"><div class="icon orange">🛒</div><div class="name">采购管理</div><div class="desc">3 笔待收</div></div>
  <div class="quick-item" onclick="navigateTo('finance')"><div class="icon purple">💰</div><div class="name">财务收支</div><div class="desc">¥98,500</div></div>
  <div class="quick-item" onclick="navigateTo('customers')"><div class="icon teal">👤</div><div class="name">客户管理</div><div class="desc">356 位</div></div>
</div>

<div class="chart-row">
  <div class="chart-placeholder">
    <div class="bar-item"><div class="bar-value">6.8</div><div class="bar" style="height:50px"></div><div class="bar-label">1月</div></div>
    <div class="bar-item"><div class="bar-value">7.2</div><div class="bar" style="height:58px"></div><div class="bar-label">2月</div></div>
    <div class="bar-item"><div class="bar-value">8.5</div><div class="bar" style="height:72px"></div><div class="bar-label">3月</div></div>
    <div class="bar-item"><div class="bar-value">7.6</div><div class="bar" style="height:62px"></div><div class="bar-label">4月</div></div>
    <div class="bar-item"><div class="bar-value">8.9</div><div class="bar" style="height:78px"></div><div class="bar-label">5月</div></div>
    <div class="bar-item"><div class="bar-value">9.2</div><div class="bar" style="height:85px"></div><div class="bar-label">6月</div></div>
    <div class="bar-item"><div class="bar-value">8.8</div><div class="bar" style="height:80px"></div><div class="bar-label">7月</div></div>
    <div class="bar-item"><div class="bar-value">9.8</div><div class="bar" style="height:98px"></div><div class="bar-label">8月</div></div>
  </div>
  <div class="chart-placeholder" style="flex-direction:column;align-items:center;justify-content:center;">
    <div class="donut-chart" style="background:conic-gradient(#1abc9c 0% 52%, #3498db 52% 75%, #f39c12 75% 90%, #e8f8f5 90% 100%);">
      <div class="donut-center"><div class="num">1,280</div><div class="label">种植卡</div></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;font-size:12px;flex-wrap:wrap;justify-content:center;">
      <span>🟩 TI-3510 665</span><span>🟦 TI-4200 320</span><span>🟧 其他 155</span>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">最近销售记录</span>
    <button class="btn btn-outline btn-sm" onclick="navigateTo('cards')">查看全部</button>
  </div>
  <table class="data-table">
    <thead><tr><th>卡号</th><th>购买人</th><th>植体型号</th><th>金额</th><th>关联诊所</th><th>状态</th><th>日期</th></tr></thead>
    <tbody>
      <tr><td>XW-2025-08001</td><td>周小明</td><td>XW-TI-3510</td><td>¥1,280</td><td>仁爱口腔诊所</td><td><span class="status-tag active">已核销</span></td><td>2025-08-01</td></tr>
      <tr><td>XW-2025-08002</td><td>吴丽红</td><td>XW-TI-4200</td><td>¥1,580</td><td>雅悦口腔医院</td><td><span class="status-tag active">已核销</span></td><td>2025-08-01</td></tr>
      <tr><td>XW-2025-07998</td><td>郑国强</td><td>XW-TI-3508</td><td>¥1,180</td><td>微笑牙科诊所</td><td><span class="status-tag processing">待核销</span></td><td>2025-07-30</td></tr>
      <tr><td>XW-2025-07995</td><td>冯小明</td><td>XW-TI-4212</td><td>¥1,680</td><td>博雅口腔诊所</td><td><span class="status-tag active">已核销</span></td><td>2025-07-28</td></tr>
      <tr><td>XW-2025-07990</td><td>褚伟杰</td><td>XW-TI-3510</td><td>¥1,280</td><td>仁爱口腔诊所</td><td><span class="status-tag active">已核销</span></td><td>2025-07-25</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    cards: function() {
      return `
<div class="breadcrumb">首页 / 商品 / <span>种植卡管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">种植卡列表</span>
    <button class="btn btn-primary btn-sm">+ 发卡</button>
  </div>
  <table class="data-table">
    <thead><tr><th>卡号</th><th>购买人</th><th>植体型号</th><th>金额</th><th>关联诊所</th><th>发卡日期</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>XW-2025-08001</td><td>周小明</td><td>XW-TI-3510</td><td>¥1,280</td><td>仁爱口腔诊所</td><td>2025-08-01</td><td><span class="status-tag active">已核销</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-08002</td><td>吴丽红</td><td>XW-TI-4200</td><td>¥1,580</td><td>雅悦口腔医院</td><td>2025-08-01</td><td><span class="status-tag active">已核销</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07998</td><td>郑国强</td><td>XW-TI-3508</td><td>¥1,180</td><td>微笑牙科诊所</td><td>2025-07-30</td><td><span class="status-tag processing">待核销</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07996</td><td>孙丽娟</td><td>XW-TI-4200</td><td>¥1,580</td><td>仁爱口腔诊所</td><td>2025-07-29</td><td><span class="status-tag processing">待核销</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07995</td><td>冯小明</td><td>XW-TI-4212</td><td>¥1,680</td><td>博雅口腔诊所</td><td>2025-07-28</td><td><span class="status-tag active">已核销</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07990</td><td>褚伟杰</td><td>XW-TI-3510</td><td>¥1,280</td><td>仁爱口腔诊所</td><td>2025-07-25</td><td><span class="status-tag active">已核销</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>XW-2025-07985</td><td>卫东</td><td>XW-TI-4200</td><td>¥1,580</td><td>雅悦口腔医院</td><td>2025-07-22</td><td><span class="status-tag inactive">已作废</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    inventory: function() {
      return `
<div class="breadcrumb">首页 / 商品 / <span>库存查看</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">库存列表</span>
    <button class="btn btn-primary btn-sm">+ 入库</button>
  </div>
  <table class="data-table">
    <thead><tr><th>商品名称</th><th>型号</th><th>规格</th><th>库存数量</th><th>安全库存</th><th>库存状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>种植体</td><td>XW-TI-3510</td><td>直径3.5mm</td><td>156</td><td>50</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>种植体</td><td>XW-TI-4200</td><td>直径4.2mm</td><td>98</td><td>40</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>种植体</td><td>XW-TI-4212</td><td>直径4.2mm 亲水</td><td>12</td><td>30</td><td><span class="status-tag pending">偏低</span></td><td><button class="btn btn-primary btn-sm">补货</button></td></tr>
      <tr><td>种植体</td><td>XW-TI-3508</td><td>直径3.5mm 短</td><td>45</td><td>20</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>基台</td><td>XW-BT-001</td><td>标准基台</td><td>68</td><td>30</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>愈合帽</td><td>XW-HC-002</td><td>标准愈合帽</td><td>0</td><td>20</td><td><span class="status-tag inactive">缺货</span></td><td><button class="btn btn-primary btn-sm">补货</button></td></tr>
      <tr><td>骨粉</td><td>XW-BF-005</td><td>0.5g/瓶</td><td>28</td><td>15</td><td><span class="status-tag active">充足</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    purchase: function() {
      return `
<div class="breadcrumb">首页 / 商品 / <span>采购管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">采购订单</span>
    <button class="btn btn-primary btn-sm">+ 新建采购</button>
  </div>
  <table class="data-table">
    <thead><tr><th>采购单号</th><th>供应商</th><th>商品</th><th>数量</th><th>总金额</th><th>状态</th><th>下单时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>PO-2025-0038</td><td>小唯精密制造</td><td>XW-TI-3510 种植体</td><td>100</td><td>¥128,000</td><td><span class="status-tag processing">运输中</span></td><td>2025-08-02</td><td><button class="btn btn-outline btn-sm">物流</button></td></tr>
      <tr><td>PO-2025-0037</td><td>小唯精密制造</td><td>XW-HC-002 愈合帽</td><td>50</td><td>¥7,500</td><td><span class="status-tag pending">待发货</span></td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>PO-2025-0036</td><td>小唯精密制造</td><td>XW-TI-4212 种植体</td><td>50</td><td>¥84,000</td><td><span class="status-tag pending">待确认</span></td><td>2025-08-01</td><td><button class="btn btn-primary btn-sm">确认</button></td></tr>
      <tr><td>PO-2025-0035</td><td>小唯精密制造</td><td>XW-BT-001 基台</td><td>50</td><td>¥34,000</td><td><span class="status-tag active">已入库</span></td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>PO-2025-0034</td><td>小唯精密制造</td><td>XW-BF-005 骨粉</td><td>30</td><td>¥12,600</td><td><span class="status-tag active">已入库</span></td><td>2025-07-25</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    finance: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>财务收支</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月收入</span><div class="stat-card-icon green">📈</div></div>
    <div class="stat-card-value">¥98,500</div>
    <div class="stat-card-change up">↑ 16.4%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月支出</span><div class="stat-card-icon red">📉</div></div>
    <div class="stat-card-value">¥65,200</div>
    <div class="stat-card-change up">↑ 8.6%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月利润</span><div class="stat-card-icon blue">💰</div></div>
    <div class="stat-card-value">¥33,300</div>
    <div class="stat-card-change up">↑ 28.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">可提现</span><div class="stat-card-icon orange">💳</div></div>
    <div class="stat-card-value">¥56,200</div>
    <div class="stat-card-change up">可申请提现</div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">交易明细</span><button class="btn btn-outline btn-sm">导出Excel</button></div>
  <table class="data-table">
    <thead><tr><th>日期</th><th>交易类型</th><th>项目</th><th>金额</th><th>状态</th></tr></thead>
    <tbody>
      <tr><td>2025-08-03</td><td>收入</td><td>种植卡销售 XW-2025-08001</td><td style="color:var(--success);">+¥1,280</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-08-02</td><td>支出</td><td>采购 XW-TI-3510 x100</td><td style="color:var(--danger);">-¥128,000</td><td><span class="status-tag active">已支付</span></td></tr>
      <tr><td>2025-08-01</td><td>收入</td><td>种植卡销售 XW-2025-08002</td><td style="color:var(--success);">+¥1,580</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-07-31</td><td>收入</td><td>种植卡销售 XW-2025-07998</td><td style="color:var(--success);">+¥1,180</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-07-30</td><td>支出</td><td>门店租金 8月</td><td style="color:var(--danger);">-¥8,000</td><td><span class="status-tag active">已支付</span></td></tr>
      <tr><td>2025-07-28</td><td>收入</td><td>种植卡销售 XW-2025-07995</td><td style="color:var(--success);">+¥1,680</td><td><span class="status-tag active">已到账</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    mall: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>提现/商城</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">申请提现</span></div>
  <div class="form-row">
    <div class="form-group">
      <label>可提现余额</label>
      <input type="text" value="¥56,200" readonly>
    </div>
    <div class="form-group">
      <label>提现金额</label>
      <input type="number" placeholder="请输入提现金额">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>收款银行</label>
      <select><option>中国农业银行</option><option>中国建设银行</option><option>招商银行</option></select>
    </div>
    <div class="form-group">
      <label>银行账号</label>
      <input type="text" placeholder="请输入银行账号">
    </div>
  </div>
  <button class="btn btn-primary">提交提现申请</button>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">提现记录</span></div>
  <table class="data-table">
    <thead><tr><th>申请单号</th><th>金额</th><th>收款银行</th><th>状态</th><th>申请时间</th></tr></thead>
    <tbody>
      <tr><td>WD-2025-0802</td><td>¥56,200</td><td>农业银行 尾号 3344</td><td><span class="status-tag pending">审核中</span></td><td>2025-08-02</td></tr>
      <tr><td>WD-2025-0720</td><td>¥42,000</td><td>农业银行 尾号 3344</td><td><span class="status-tag active">已到账</span></td><td>2025-07-20</td></tr>
      <tr><td>WD-2025-0710</td><td>¥38,000</td><td>农业银行 尾号 3344</td><td><span class="status-tag active">已到账</span></td><td>2025-07-10</td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">商城热销商品</span></div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">
    <div class="product-card"><div class="product-icon" style="background:var(--primary-light);">🦷</div><div class="product-name">XW-TI-3510</div><div class="product-price">¥1,280</div><div class="product-desc">本月销 86</div></div>
    <div class="product-card"><div class="product-icon" style="background:#e8f4fd;">🦷</div><div class="product-name">XW-TI-4200</div><div class="product-price">¥1,580</div><div class="product-desc">本月销 62</div></div>
    <div class="product-card"><div class="product-icon" style="background:#fef3e2;">🔧</div><div class="product-name">基台 XW-BT-001</div><div class="product-price">¥680</div><div class="product-desc">本月销 45</div></div>
    <div class="product-card"><div class="product-icon" style="background:#f0e6ff;">🧪</div><div class="product-name">骨粉 0.5g</div><div class="product-price">¥420</div><div class="product-desc">本月销 38</div></div>
  </div>
</div>
      `;
    },

    customers: function() {
      return `
<div class="breadcrumb">首页 / 客户 / <span>客户管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">客户列表</span>
    <button class="btn btn-primary btn-sm">+ 新增客户</button>
  </div>
  <table class="data-table">
    <thead><tr><th>姓名</th><th>性别</th><th>年龄</th><th>联系电话</th><th>购买次数</th><th>累计消费</th><th>最近购买</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>周小明</td><td>男</td><td>35</td><td>138-0011-2233</td><td>3</td><td>¥3,840</td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>吴丽红</td><td>女</td><td>42</td><td>139-5566-7788</td><td>2</td><td>¥2,860</td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>郑国强</td><td>男</td><td>56</td><td>137-2233-4455</td><td>5</td><td>¥6,200</td><td>2025-07-30</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>冯小明</td><td>男</td><td>28</td><td>136-8899-0011</td><td>1</td><td>¥1,680</td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>褚伟杰</td><td>男</td><td>45</td><td>135-6677-8899</td><td>4</td><td>¥5,120</td><td>2025-07-25</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>孙丽娟</td><td>女</td><td>38</td><td>133-4455-6677</td><td>2</td><td>¥2,860</td><td>2025-07-22</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    settings: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>门店设置</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">基本信息</span><button class="btn btn-primary btn-sm">保存</button></div>
  <div class="form-row">
    <div class="form-group">
      <label>药店名称</label>
      <input type="text" value="健佳大药房">
    </div>
    <div class="form-group">
      <label>店长</label>
      <input type="text" value="周明">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>联系电话</label>
      <input type="text" value="138-1122-3344">
    </div>
    <div class="form-group">
      <label>所在地区</label>
      <input type="text" value="浙江省杭州市">
    </div>
  </div>
  <div class="form-group" style="margin-bottom:16px;">
    <label>详细地址</label>
    <input type="text" value="杭州市拱墅区莫干山路 200 号">
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">营业信息</span><button class="btn btn-primary btn-sm">保存</button></div>
  <div class="form-row">
    <div class="form-group">
      <label>营业时间</label>
      <input type="text" value="08:30 - 21:30">
    </div>
    <div class="form-group">
      <label>药品经营许可证</label>
      <input type="text" value="浙DA0100568">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label>合作状态</label>
      <input type="text" value="营业中" readonly>
    </div>
    <div class="form-group">
      <label>入驻时间</label>
      <input type="text" value="2025-06-10" readonly>
    </div>
  </div>
</div>
      `;
    }
  },

  // ================================================================
  //  工厂端 (factory) — 8 个页面
  // ================================================================
  factory: {

    home: function() {
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">待产订单</span><div class="stat-card-icon orange">📋</div></div>
    <div class="stat-card-value">18</div>
    <div class="stat-card-change up">8 单今日截止</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">生产中</span><div class="stat-card-icon blue">⚙️</div></div>
    <div class="stat-card-value">12</div>
    <div class="stat-card-change up">3 条产线运行</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月完成</span><div class="stat-card-icon green">📦</div></div>
    <div class="stat-card-value">86</div>
    <div class="stat-card-change up">↑ 12.5%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">合格率</span><div class="stat-card-icon red">✅</div></div>
    <div class="stat-card-value">98.5%</div>
    <div class="stat-card-change up">↑ 0.3%</div>
  </div>
</div>

<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('orders')"><div class="icon green">📋</div><div class="name">订单管理</div><div class="desc">18 单待产</div></div>
  <div class="quick-item" onclick="navigateTo('shipping')"><div class="icon blue">📦</div><div class="name">收发货</div><div class="desc">5 单待发</div></div>
  <div class="quick-item" onclick="navigateTo('production')"><div class="icon orange">🏭</div><div class="name">生产排产</div><div class="desc">12 单生产中</div></div>
  <div class="quick-item" onclick="navigateTo('quality')"><div class="icon purple">✅</div><div class="name">质检记录</div><div class="desc">合格率 98.5%</div></div>
  <div class="quick-item" onclick="navigateTo('exception')"><div class="icon teal">⚠️</div><div class="name">异常反馈</div><div class="desc">2 项待处理</div></div>
</div>

<div class="chart-row">
  <div class="chart-placeholder">
    <div class="bar-item"><div class="bar-value">72</div><div class="bar" style="height:60px"></div><div class="bar-label">1月</div></div>
    <div class="bar-item"><div class="bar-value">78</div><div class="bar" style="height:68px"></div><div class="bar-label">2月</div></div>
    <div class="bar-item"><div class="bar-value">85</div><div class="bar" style="height:78px"></div><div class="bar-label">3月</div></div>
    <div class="bar-item"><div class="bar-value">76</div><div class="bar" style="height:65px"></div><div class="bar-label">4月</div></div>
    <div class="bar-item"><div class="bar-value">82</div><div class="bar" style="height:72px"></div><div class="bar-label">5月</div></div>
    <div class="bar-item"><div class="bar-value">90</div><div class="bar" style="height:85px"></div><div class="bar-label">6月</div></div>
    <div class="bar-item"><div class="bar-value">88</div><div class="bar" style="height:80px"></div><div class="bar-label">7月</div></div>
    <div class="bar-item"><div class="bar-value">86</div><div class="bar" style="height:76px"></div><div class="bar-label">8月</div></div>
  </div>
  <div class="chart-placeholder" style="flex-direction:column;align-items:center;justify-content:center;">
    <div class="donut-chart" style="background:conic-gradient(#1abc9c 0% 55%, #3498db 55% 78%, #f39c12 78% 92%, #e8f8f5 92% 100%);">
      <div class="donut-center"><div class="num">86</div><div class="label">本月产出</div></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:12px;font-size:12px;flex-wrap:wrap;justify-content:center;">
      <span>🟩 TI-3510 47</span><span>🟦 TI-4200 20</span><span>🟧 其他 12</span><span>⬜ 基台 7</span>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">最近订单</span>
    <button class="btn btn-outline btn-sm" onclick="navigateTo('orders')">查看全部</button>
  </div>
  <table class="data-table">
    <thead><tr><th>订单号</th><th>来源诊所</th><th>产品型号</th><th>数量</th><th>当前阶段</th><th>状态</th><th>截止日期</th></tr></thead>
    <tbody>
      <tr><td>MO-2025-0823</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>2</td><td>精密加工</td><td><span class="status-tag processing">加工中</span></td><td>2025-08-06</td></tr>
      <tr><td>MO-2025-0822</td><td>雅悦口腔医院</td><td>XW-TI-4200</td><td>1</td><td>待排产</td><td><span class="status-tag pending">待排产</span></td><td>2025-08-08</td></tr>
      <tr><td>MO-2025-0821</td><td>微笑牙科诊所</td><td>XW-BT-001</td><td>3</td><td>已完成</td><td><span class="status-tag active">已完成</span></td><td>2025-08-01</td></tr>
      <tr><td>MO-2025-0820</td><td>博雅口腔诊所</td><td>XW-TI-4212</td><td>1</td><td>发货出库</td><td><span class="status-tag processing">运输中</span></td><td>2025-08-05</td></tr>
      <tr><td>MO-2025-0819</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>2</td><td>已完成</td><td><span class="status-tag active">已完成</span></td><td>2025-07-30</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    orders: function() {
      return `
<div class="breadcrumb">首页 / 订单 / <span>订单管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">订单列表</span>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-outline btn-sm">导出Excel</button>
      <button class="btn btn-primary btn-sm">+ 手动建单</button>
    </div>
  </div>
  <table class="data-table">
    <thead><tr><th>订单号</th><th>来源诊所</th><th>产品型号</th><th>数量</th><th>当前阶段</th><th>状态</th><th>截止日期</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>MO-2025-0823</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>2</td><td>精密加工</td><td><span class="status-tag processing">加工中</span></td><td>2025-08-06</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0822</td><td>雅悦口腔医院</td><td>XW-TI-4200</td><td>1</td><td>待排产</td><td><span class="status-tag pending">待排产</span></td><td>2025-08-08</td><td><button class="btn btn-primary btn-sm">排产</button></td></tr>
      <tr><td>MO-2025-0821</td><td>微笑牙科诊所</td><td>XW-BT-001</td><td>3</td><td>已完成</td><td><span class="status-tag active">已完成</span></td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0820</td><td>博雅口腔诊所</td><td>XW-TI-4212</td><td>1</td><td>发货出库</td><td><span class="status-tag processing">运输中</span></td><td>2025-08-05</td><td><button class="btn btn-outline btn-sm">物流</button></td></tr>
      <tr><td>MO-2025-0819</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>2</td><td>已完成</td><td><span class="status-tag active">已完成</span></td><td>2025-07-30</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0818</td><td>雅悦口腔医院</td><td>XW-TI-4200</td><td>1</td><td>已完成</td><td><span class="status-tag active">已完成</span></td><td>2025-07-28</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0817</td><td>微笑牙科诊所</td><td>XW-TI-3508</td><td>2</td><td>表面处理</td><td><span class="status-tag processing">处理中</span></td><td>2025-08-04</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>MO-2025-0816</td><td>博雅口腔诊所</td><td>XW-BT-001</td><td>2</td><td>质检包装</td><td><span class="status-tag processing">质检中</span></td><td>2025-08-04</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    shipping: function() {
      return `
<div class="breadcrumb">首页 / 订单 / <span>收发货管理</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">发货列表</span>
    <button class="btn btn-primary btn-sm">+ 新建发货</button>
  </div>
  <table class="data-table">
    <thead><tr><th>发货单号</th><th>关联订单</th><th>收货方</th><th>产品</th><th>数量</th><th>物流单号</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>SH-2025-0042</td><td>MO-2025-0820</td><td>博雅口腔诊所</td><td>XW-TI-4212</td><td>1</td><td>SF1284567</td><td><span class="status-tag processing">运输中</span></td><td><button class="btn btn-outline btn-sm">物流</button></td></tr>
      <tr><td>SH-2025-0041</td><td>MO-2025-0821</td><td>微笑牙科诊所</td><td>XW-BT-001</td><td>3</td><td>SF1284520</td><td><span class="status-tag active">已签收</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>SH-2025-0040</td><td>MO-2025-0819</td><td>仁爱口腔诊所</td><td>XW-TI-3510</td><td>2</td><td>SF1284480</td><td><span class="status-tag active">已签收</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>SH-2025-0039</td><td>MO-2025-0818</td><td>雅悦口腔医院</td><td>XW-TI-4200</td><td>1</td><td>SF1284420</td><td><span class="status-tag active">已签收</span></td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>SH-2025-0038</td><td>MO-2025-0817</td><td>微笑牙科诊所</td><td>XW-TI-3508</td><td>2</td><td>—</td><td><span class="status-tag pending">待发货</span></td><td><button class="btn btn-primary btn-sm">发货</button></td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">收货记录（原材料入库）</span></div>
  <table class="data-table">
    <thead><tr><th>入库单号</th><th>物料名称</th><th>供应商</th><th>数量</th><th>状态</th><th>入库时间</th></tr></thead>
    <tbody>
      <tr><td>RC-2025-0056</td><td>钛合金坯料</td><td>宝钛集团</td><td>500</td><td><span class="status-tag active">已入库</span></td><td>2025-08-02</td></tr>
      <tr><td>RC-2025-0055</td><td>包装材料</td><td>恒达包装</td><td>2000</td><td><span class="status-tag active">已入库</span></td><td>2025-08-01</td></tr>
      <tr><td>RC-2025-0054</td><td>表面处理液</td><td>科润化工</td><td>50L</td><td><span class="status-tag active">已入库</span></td><td>2025-07-30</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    production: function() {
      return `
<div class="breadcrumb">首页 / 生产 / <span>生产排产</span></div>

<div class="card">
  <div class="card-header"><span class="card-title">今日排产计划</span><button class="btn btn-primary btn-sm">+ 新增排产</button></div>
  <table class="data-table">
    <thead><tr><th>排产编号</th><th>订单号</th><th>产品型号</th><th>数量</th><th>产线</th><th>工序</th><th>状态</th><th>预计完成</th></tr></thead>
    <tbody>
      <tr><td>PP-2025-0086</td><td>MO-2025-0823</td><td>XW-TI-3510</td><td>2</td><td>A线</td><td>精密加工</td><td><span class="status-tag processing">进行中</span></td><td>2025-08-06</td></tr>
      <tr><td>PP-2025-0085</td><td>MO-2025-0817</td><td>XW-TI-3508</td><td>2</td><td>B线</td><td>表面处理</td><td><span class="status-tag processing">进行中</span></td><td>2025-08-04</td></tr>
      <tr><td>PP-2025-0084</td><td>MO-2025-0816</td><td>XW-BT-001</td><td>2</td><td>C线</td><td>质检包装</td><td><span class="status-tag processing">进行中</span></td><td>2025-08-04</td></tr>
      <tr><td>PP-2025-0087</td><td>MO-2025-0822</td><td>XW-TI-4200</td><td>1</td><td>A线</td><td>待排产</td><td><span class="status-tag pending">待排产</span></td><td>2025-08-08</td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">订单 MO-2025-0823 生产进度</span></div>
  <div class="production-stage"><div class="stage-num done">1</div><div class="stage-info"><h4>订单接收</h4><p>2025-08-03 14:20 · 已确认</p></div></div>
  <div class="production-stage"><div class="stage-num done">2</div><div class="stage-info"><h4>材料准备</h4><p>2025-08-03 16:00 · 钛合金坯料已出库</p></div></div>
  <div class="production-stage"><div class="stage-num current">3</div><div class="stage-info"><h4>精密加工</h4><p>A线加工中 · 进度 60%</p><div class="progress-bar"><div class="fill" style="width:60%"></div></div></div></div>
  <div class="production-stage"><div class="stage-num pending">4</div><div class="stage-info"><h4>表面处理</h4><p>待加工完成后进入</p></div></div>
  <div class="production-stage"><div class="stage-num pending">5</div><div class="stage-info"><h4>质检包装</h4><p>待表面处理完成后进入</p></div></div>
  <div class="production-stage"><div class="stage-num pending">6</div><div class="stage-info"><h4>发货出库</h4><p>质检通过后安排物流</p></div></div>
</div>
      `;
    },

    quality: function() {
      return `
<div class="breadcrumb">首页 / 生产 / <span>质检记录</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月质检批次</span><div class="stat-card-icon green">📋</div></div>
    <div class="stat-card-value">86</div>
    <div class="stat-card-change up">↑ 12.5%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">合格批次</span><div class="stat-card-icon blue">✅</div></div>
    <div class="stat-card-value">84</div>
    <div class="stat-card-change up">合格率 97.7%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">不合格批次</span><div class="stat-card-icon orange">⚠️</div></div>
    <div class="stat-card-value">2</div>
    <div class="stat-card-change up">已返工处理</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">待质检</span><div class="stat-card-icon red">⏳</div></div>
    <div class="stat-card-value">3</div>
    <div class="stat-card-change up">今日截止</div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">质检记录</span><button class="btn btn-outline btn-sm">导出Excel</button></div>
  <table class="data-table">
    <thead><tr><th>质检编号</th><th>关联订单</th><th>产品型号</th><th>数量</th><th>质检员</th><th>结果</th><th>质检时间</th></tr></thead>
    <tbody>
      <tr><td>QC-2025-0086</td><td>MO-2025-0821</td><td>XW-BT-001</td><td>3</td><td>陈检员</td><td><span class="status-tag active">合格</span></td><td>2025-08-01</td></tr>
      <tr><td>QC-2025-0085</td><td>MO-2025-0819</td><td>XW-TI-3510</td><td>2</td><td>陈检员</td><td><span class="status-tag active">合格</span></td><td>2025-07-30</td></tr>
      <tr><td>QC-2025-0084</td><td>MO-2025-0818</td><td>XW-TI-4200</td><td>1</td><td>王检员</td><td><span class="status-tag active">合格</span></td><td>2025-07-28</td></tr>
      <tr><td>QC-2025-0083</td><td>MO-2025-0815</td><td>XW-TI-3510</td><td>2</td><td>王检员</td><td><span class="status-tag inactive">不合格</span></td><td>2025-07-25</td></tr>
      <tr><td>QC-2025-0082</td><td>MO-2025-0814</td><td>XW-TI-4212</td><td>1</td><td>陈检员</td><td><span class="status-tag active">合格</span></td><td>2025-07-22</td></tr>
    </tbody>
  </table>
</div>
      `;
    },

    exception: function() {
      return `
<div class="breadcrumb">首页 / 生产 / <span>异常反馈</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">异常列表</span>
    <button class="btn btn-primary btn-sm">+ 上报异常</button>
  </div>
  <table class="data-table">
    <thead><tr><th>异常编号</th><th>关联订单</th><th>异常类型</th><th>描述</th><th>上报人</th><th>状态</th><th>上报时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>EX-2025-0012</td><td>MO-2025-0815</td><td>质量问题</td><td>表面粗糙度不达标</td><td>王检员</td><td><span class="status-tag pending">待处理</span></td><td>2025-07-25</td><td><button class="btn btn-primary btn-sm">处理</button></td></tr>
      <tr><td>EX-2025-0011</td><td>MO-2025-0813</td><td>设备故障</td><td>A线 CNC 主轴异响</td><td>刘操作员</td><td><span class="status-tag pending">待处理</span></td><td>2025-07-23</td><td><button class="btn btn-primary btn-sm">处理</button></td></tr>
      <tr><td>EX-2025-0010</td><td>MO-2025-0810</td><td>材料异常</td><td>钛合金坯料硬度偏差</td><td>陈检员</td><td><span class="status-tag active">已解决</span></td><td>2025-07-20</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>EX-2025-0009</td><td>MO-2025-0808</td><td>进度延误</td><td>表面处理工序超时</td><td>孙主管</td><td><span class="status-tag active">已解决</span></td><td>2025-07-18</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">异常处理记录</span></div>
  <div class="timeline">
    <div class="timeline-item"><div class="time">2025-07-20 16:30</div><div class="content"><strong>EX-2025-0010 已解决</strong> — 钛合金坯料硬度偏差问题，已更换批次并重新投料加工，质检通过。</div></div>
    <div class="timeline-item"><div class="time">2025-07-20 14:00</div><div class="content"><strong>EX-2025-0010 上报</strong> — 陈检员在质检时发现 XW-TI-3510 批次硬度偏差，暂停生产。</div></div>
    <div class="timeline-item"><div class="time">2025-07-18 11:20</div><div class="content"><strong>EX-2025-0009 已解决</strong> — 表面处理工序超时问题，已调整工艺参数并加班完成。</div></div>
    <div class="timeline-item"><div class="time">2025-07-18 09:00</div><div class="content"><strong>EX-2025-0009 上报</strong> — 孙主管发现表面处理工序进度延误，可能影响交期。</div></div>
  </div>
</div>
      `;
    },

    service: function() {
      return `
<div class="breadcrumb">首页 / 沟通 / <span>客服中心</span></div>

<div class="card">
  <div class="card-header">
    <span class="card-title">工单列表</span>
    <button class="btn btn-primary btn-sm">+ 新建工单</button>
  </div>
  <table class="data-table">
    <thead><tr><th>工单号</th><th>来源</th><th>主题</th><th>优先级</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead>
    <tbody>
      <tr><td>TK-2025-0028</td><td>仁爱口腔诊所</td><td>加工单交期咨询</td><td><span class="status-tag pending">普通</span></td><td><span class="status-tag processing">处理中</span></td><td>2025-08-03</td><td><button class="btn btn-outline btn-sm">回复</button></td></tr>
      <tr><td>TK-2025-0027</td><td>雅悦口腔医院</td><td>产品规格确认</td><td><span class="status-tag pending">普通</span></td><td><span class="status-tag active">已关闭</span></td><td>2025-08-02</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>TK-2025-0026</td><td>健佳大药房</td><td>采购发货进度</td><td><span class="status-tag inactive">紧急</span></td><td><span class="status-tag active">已关闭</span></td><td>2025-08-01</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
      <tr><td>TK-2025-0025</td><td>微笑牙科诊所</td><td>物流单号查询</td><td><span class="status-tag pending">普通</span></td><td><span class="status-tag active">已关闭</span></td><td>2025-07-30</td><td><button class="btn btn-outline btn-sm">详情</button></td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">常见问题</span></div>
  <div class="timeline">
    <div class="timeline-item"><div class="time">Q1</div><div class="content"><strong>加工单交期一般多久？</strong> — 标准种植体 3-5 个工作日，定制型号 5-7 个工作日。</div></div>
    <div class="timeline-item"><div class="time">Q2</div><div class="content"><strong>如何查询物流进度？</strong> — 在"收发货管理"页面可查看物流单号，点击可跳转物流查询。</div></div>
    <div class="timeline-item"><div class="time">Q3</div><div class="content"><strong>质检不合格如何处理？</strong> — 不合格批次将自动返工，预计增加 2 个工作日，我们会及时通知。</div></div>
    <div class="timeline-item"><div class="time">Q4</div><div class="content"><strong>可以加急生产吗？</strong> — 支持加急服务，请联系客服或新建工单标注"加急"。</div></div>
  </div>
</div>
      `;
    },

    finance: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>财务收支</span></div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月收入</span><div class="stat-card-icon green">📈</div></div>
    <div class="stat-card-value">¥356,000</div>
    <div class="stat-card-change up">↑ 14.2%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月支出</span><div class="stat-card-icon red">📉</div></div>
    <div class="stat-card-value">¥218,500</div>
    <div class="stat-card-change up">↑ 6.8%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">本月利润</span><div class="stat-card-icon blue">💰</div></div>
    <div class="stat-card-value">¥137,500</div>
    <div class="stat-card-change up">↑ 28.6%</div>
  </div>
  <div class="stat-card">
    <div class="stat-card-header"><span class="stat-card-label">待收款</span><div class="stat-card-icon orange">⏳</div></div>
    <div class="stat-card-value">¥86,000</div>
    <div class="stat-card-change up">2 笔待结算</div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-title">交易明细</span><button class="btn btn-outline btn-sm">导出Excel</button></div>
  <table class="data-table">
    <thead><tr><th>日期</th><th>交易类型</th><th>项目</th><th>金额</th><th>状态</th></tr></thead>
    <tbody>
      <tr><td>2025-08-03</td><td>收入</td><td>诊所加工费 MO-2025-0821</td><td style="color:var(--success);">+¥12,800</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-08-02</td><td>收入</td><td>药店采购款 PO-2025-0038</td><td style="color:var(--success);">+¥128,000</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-08-01</td><td>支出</td><td>钛合金坯料采购</td><td style="color:var(--danger);">-¥86,000</td><td><span class="status-tag active">已支付</span></td></tr>
      <tr><td>2025-07-31</td><td>支出</td><td>员工工资 7月</td><td style="color:var(--danger);">-¥98,000</td><td><span class="status-tag active">已支付</span></td></tr>
      <tr><td>2025-07-30</td><td>收入</td><td>诊所加工费 MO-2025-0819</td><td style="color:var(--success);">+¥8,600</td><td><span class="status-tag active">已到账</span></td></tr>
      <tr><td>2025-07-28</td><td>支出</td><td>设备维护费</td><td style="color:var(--danger);">-¥12,500</td><td><span class="status-tag active">已支付</span></td></tr>
    </tbody>
  </table>
</div>
      `;
    }
  }
};
