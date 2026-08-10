// ===== 小唯管理系统 - 五端页面内容（动态数据版） =====
// 定义 SIDEBAR_MENUS 和 PAGE_RENDERERS 两个全局变量
// 青绿色主色调 #1abc9c | Inter 字体 | 卡片式布局
// 依赖：DB (data.js), UI (ui.js), CRUD (crud.js)

// ==================== 通用配置常量 ====================

var STATUS_OPTS = [
  { value: 'active', label: '已激活' },
  { value: 'pending', label: '审核中' },
  { value: 'inactive', label: '已停用' }
];

var STATUS_OPTS_PHARMACY = [
  { value: 'active', label: '营业中' },
  { value: 'processing', label: '装修中' },
  { value: 'inactive', label: '已停业' }
];

var STATUS_OPTS_CARD = [
  { value: 'active', label: '已激活' },
  { value: 'processing', label: '待核销' },
  { value: 'inactive', label: '已作废' }
];

var STATUS_OPTS_ORDER = [
  { value: 'active', label: '生产中' },
  { value: 'processing', label: '加工中' },
  { value: 'pending', label: '待处理' }
];

var STATUS_OPTS_SETTLE = [
  { value: 'pending', label: '待审核' },
  { value: 'active', label: '已结算' }
];

var STATUS_OPTS_WITHDRAW = [
  { value: 'pending', label: '待审核' },
  { value: 'active', label: '已到账' }
];

// 表单通用状态选择
var FORM_STATUS = STATUS_OPTS.map(function(o){ return { value:o.value, label:o.label }; });
var FORM_STATUS_PHARMACY = STATUS_OPTS_PHARMACY.map(function(o){ return { value:o.value, label:o.label }; });
var FORM_STATUS_CARD = STATUS_OPTS_CARD.map(function(o){ return { value:o.value, label:o.label }; });
var FORM_STATUS_ORDER = STATUS_OPTS_ORDER.map(function(o){ return { value:o.value, label:o.label }; });
var FORM_STATUS_SETTLE = STATUS_OPTS_SETTLE.map(function(o){ return { value:o.value, label:o.label }; });
var FORM_STATUS_WITHDRAW = STATUS_OPTS_WITHDRAW.map(function(o){ return { value:o.value, label:o.label }; });

// ==================== 页面配置 (CRUD Configs) ====================

// ---- 平台端：诊所管理 ----
var PLATFORM_CLINICS = {
  entity: 'clinics',
  title: '诊所列表',
  breadcrumb: '首页 / 业务管理',
  pageSize: 5,
  searchFields: ['name', 'owner', 'phone', 'region'],
  searchPlaceholder: '搜索诊所名称、负责人、电话...',
  filterField: 'status',
  filterOptions: STATUS_OPTS,
  exportName: '诊所列表',
  addLabel: '新增诊所',
  columns: [
    { field: 'name', label: '诊所名称' },
    { field: 'owner', label: '负责人' },
    { field: 'phone', label: '联系电话' },
    { field: 'region', label: '地区' },
    { field: 'implantsUsed', label: '植体用量', type: 'dash' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'createdAt', label: '注册时间' }
  ],
  formFields: [
    { name: 'name', label: '诊所名称', type: 'text', required: true, placeholder: '请输入诊所名称' },
    { name: 'owner', label: '负责人', type: 'text', required: true, placeholder: '请输入负责人姓名' },
    { name: 'phone', label: '联系电话', type: 'text', required: true, rules: ['phone'], placeholder: '请输入手机号' },
    { name: 'region', label: '地区', type: 'text', required: true, placeholder: '如：浙江杭州' },
    { name: 'implantsUsed', label: '植体用量', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 平台端：药店管理 ----
var PLATFORM_PHARMACY = {
  entity: 'pharmacies',
  title: '药店列表',
  breadcrumb: '首页 / 业务管理',
  pageSize: 5,
  searchFields: ['name', 'manager', 'phone', 'region'],
  searchPlaceholder: '搜索药店名称、店长、电话...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_PHARMACY,
  exportName: '药店列表',
  addLabel: '新增药店',
  columns: [
    { field: 'name', label: '药店名称' },
    { field: 'manager', label: '店长' },
    { field: 'phone', label: '联系电话' },
    { field: 'region', label: '地区' },
    { field: 'cardSales', label: '种植卡销量', type: 'dash' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'joinedAt', label: '入驻时间' }
  ],
  formFields: [
    { name: 'name', label: '药店名称', type: 'text', required: true, placeholder: '请输入药店名称' },
    { name: 'manager', label: '店长', type: 'text', required: true, placeholder: '请输入店长姓名' },
    { name: 'phone', label: '联系电话', type: 'text', required: true, rules: ['phone'], placeholder: '请输入手机号' },
    { name: 'region', label: '地区', type: 'text', required: true, placeholder: '如：浙江杭州' },
    { name: 'cardSales', label: '种植卡销量', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS_PHARMACY, required: true }
  ]
};

// ---- 平台端：经销商管理 ----
var PLATFORM_DEALERS = {
  entity: 'dealers',
  title: '经销商列表',
  breadcrumb: '首页 / 业务管理',
  pageSize: 5,
  searchFields: ['name', 'region'],
  searchPlaceholder: '搜索经销商姓名、区域...',
  filterField: 'status',
  filterOptions: STATUS_OPTS,
  exportName: '经销商列表',
  addLabel: '新增经销商',
  displayField: 'name',
  columns: [
    { field: 'name', label: '经销商' },
    { field: 'region', label: '负责区域' },
    { field: 'clinicClients', label: '诊所客户', type: 'dash' },
    { field: 'pharmacyClients', label: '药房客户', type: 'dash' },
    { field: 'commission', label: '佣金累计', type: 'money' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'name', label: '经销商姓名', type: 'text', required: true, placeholder: '请输入姓名' },
    { name: 'region', label: '负责区域', type: 'text', required: true, placeholder: '如：华东区域' },
    { name: 'clinicClients', label: '诊所客户数', type: 'number', value: 0 },
    { name: 'pharmacyClients', label: '药房客户数', type: 'number', value: 0 },
    { name: 'commission', label: '佣金累计', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 平台端：种植体卡管理 ----
var PLATFORM_CARDS = {
  entity: 'cards',
  title: '种植体卡列表',
  breadcrumb: '首页 / 业务管理',
  pageSize: 5,
  searchFields: ['cardNo', 'patient', 'clinic', 'implantType', 'pharmacy'],
  searchPlaceholder: '搜索卡号、患者、诊所、型号...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_CARD,
  exportName: '种植体卡',
  addLabel: '新增种植体卡',
  displayField: 'cardNo',
  columns: [
    { field: 'cardNo', label: '卡号' },
    { field: 'patient', label: '患者姓名' },
    { field: 'clinic', label: '所属诊所' },
    { field: 'implantType', label: '植体型号' },
    { field: 'pharmacy', label: '发卡药店' },
    { field: 'issueDate', label: '发卡日期' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'cardNo', label: '卡号', type: 'text', required: true, placeholder: '如：XW-2025-08001' },
    { name: 'patient', label: '患者姓名', type: 'text', required: true, placeholder: '请输入患者姓名' },
    { name: 'clinic', label: '所属诊所', type: 'text', required: true, placeholder: '请输入诊所名称' },
    { name: 'implantType', label: '植体型号', type: 'text', required: true, placeholder: '如：XW-TI-3510' },
    { name: 'pharmacy', label: '发卡药店', type: 'text', required: true, placeholder: '请输入药店名称' },
    { name: 'issueDate', label: '发卡日期', type: 'date', required: true },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS_CARD, required: true }
  ]
};

// ---- 平台端：商场管理（商品） ----
var PLATFORM_MALL = {
  entity: 'products',
  title: '商品列表',
  breadcrumb: '首页 / 业务管理',
  pageSize: 8,
  searchFields: ['name', 'desc'],
  searchPlaceholder: '搜索商品名称、描述...',
  filterable: false,
  exportName: '商品列表',
  addLabel: '上架商品',
  displayField: 'name',
  columns: [
    { field: 'name', label: '商品名称' },
    { field: 'price', label: '价格', type: 'money' },
    { field: 'desc', label: '描述' },
    { field: 'icon', label: '图标' }
  ],
  formFields: [
    { name: 'name', label: '商品名称', type: 'text', required: true, placeholder: '请输入商品名称' },
    { name: 'price', label: '价格', type: 'number', required: true, rules: ['positive'], placeholder: '请输入价格' },
    { name: 'desc', label: '描述', type: 'textarea', placeholder: '请输入商品描述' },
    { name: 'icon', label: '图标', type: 'text', placeholder: '如：🦷', value: '📦' },
    { name: 'color', label: '颜色标签', type: 'select', options: [
      { value: 'green', label: '绿色' }, { value: 'blue', label: '蓝色' },
      { value: 'orange', label: '橙色' }, { value: 'purple', label: '紫色' },
      { value: 'teal', label: '青色' }
    ], value: 'green' }
  ]
};

// ---- 平台端：结算中心 ----
var PLATFORM_SETTLEMENT = {
  entity: 'settlements',
  title: '结算记录',
  breadcrumb: '首页 / 财务',
  pageSize: 5,
  searchFields: ['no', 'party', 'type'],
  searchPlaceholder: '搜索单号、结算方、类型...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_SETTLE,
  exportName: '结算记录',
  addLabel: '新增结算',
  creatable: true,
  displayField: 'no',
  columns: [
    { field: 'no', label: '结算单号' },
    { field: 'party', label: '结算方' },
    { field: 'type', label: '类型' },
    { field: 'amount', label: '金额', type: 'money' },
    { field: 'commission', label: '平台抽成', type: 'money' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'date', label: '申请日期' }
  ],
  formFields: [
    { name: 'no', label: '结算单号', type: 'text', required: true, placeholder: '如：ST-2025-0801' },
    { name: 'party', label: '结算方', type: 'text', required: true, placeholder: '请输入结算方名称' },
    { name: 'type', label: '类型', type: 'select', options: [
      { value: '诊所提现', label: '诊所提现' },
      { value: '药店提现', label: '药店提现' },
      { value: '佣金提现', label: '佣金提现' },
      { value: '工厂货款', label: '工厂货款' }
    ], required: true },
    { name: 'amount', label: '金额', type: 'number', required: true, rules: ['positive'], placeholder: '请输入金额' },
    { name: 'commission', label: '平台抽成', type: 'number', required: true, rules: ['positive'], placeholder: '请输入抽成金额' },
    { name: 'date', label: '申请日期', type: 'date', required: true },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS_SETTLE, required: true }
  ]
};

// ---- 平台端：权限配置 ----
var PLATFORM_PERMISSIONS = {
  entity: 'roles',
  title: '角色权限管理',
  breadcrumb: '首页 / 系统',
  pageSize: 10,
  searchFields: ['name', 'desc', 'ports'],
  searchPlaceholder: '搜索角色名称...',
  filterField: 'status',
  filterOptions: STATUS_OPTS,
  exportName: '角色权限',
  addLabel: '新增角色',
  displayField: 'name',
  columns: [
    { field: 'name', label: '角色名称' },
    { field: 'desc', label: '描述' },
    { field: 'ports', label: '可用端口' },
    { field: 'users', label: '用户数', type: 'dash' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'name', label: '角色名称', type: 'text', required: true, placeholder: '请输入角色名称' },
    { name: 'desc', label: '描述', type: 'textarea', placeholder: '请输入角色描述' },
    { name: 'ports', label: '可用端口', type: 'text', required: true, placeholder: '如：平台端 或 全部五端' },
    { name: 'users', label: '用户数', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 平台端：消息通知 ----
var PLATFORM_NOTIFICATIONS = {
  entity: 'notifications',
  title: '消息通知',
  breadcrumb: '首页 / 系统',
  pageSize: 5,
  searchFields: ['title', 'content'],
  searchPlaceholder: '搜索通知标题、内容...',
  filterField: 'read',
  filterOptions: [
    { value: 'false', label: '未读' },
    { value: 'true', label: '已读' }
  ],
  exportName: '消息通知',
  addLabel: '发送通知',
  displayField: 'title',
  columns: [
    { field: 'time', label: '时间' },
    { field: 'title', label: '标题' },
    { field: 'content', label: '内容' },
    { field: 'read', label: '状态', formatter: function(val) {
      return val ? '<span class="status-tag active">已读</span>' : '<span class="status-tag pending">未读</span>';
    }}
  ],
  formFields: [
    { name: 'title', label: '标题', type: 'text', required: true, placeholder: '请输入通知标题' },
    { name: 'content', label: '内容', type: 'textarea', required: true, placeholder: '请输入通知内容' },
    { name: 'time', label: '时间', type: 'date', required: true },
    { name: 'read', label: '状态', type: 'select', options: [
      { value: 'false', label: '未读' },
      { value: 'true', label: '已读' }
    ], required: true }
  ]
};

// ---- 诊所端：核销登记 ----
var CLINIC_VERIFY = {
  entity: 'verifyRecords',
  title: '核销记录',
  breadcrumb: '首页 / 业务',
  pageSize: 5,
  searchFields: ['cardNo', 'patient', 'doctor', 'type'],
  searchPlaceholder: '搜索卡号、患者、医生...',
  filterable: false,
  exportName: '核销记录',
  addLabel: '新增核销',
  displayField: 'cardNo',
  columns: [
    { field: 'cardNo', label: '卡号' },
    { field: 'patient', label: '患者姓名' },
    { field: 'type', label: '核销类型' },
    { field: 'doctor', label: '操作医生' },
    { field: 'time', label: '核销时间' }
  ],
  formFields: [
    { name: 'cardNo', label: '卡号', type: 'text', required: true, placeholder: '如：XW-2025-08001' },
    { name: 'patient', label: '患者姓名', type: 'text', required: true, placeholder: '请输入患者姓名' },
    { name: 'type', label: '核销类型', type: 'select', options: [
      { value: '种植体植入', label: '种植体植入' },
      { value: '基台安装', label: '基台安装' },
      { value: '修复体安装', label: '修复体安装' }
    ], required: true },
    { name: 'doctor', label: '操作医生', type: 'text', required: true, placeholder: '请输入医生姓名' },
    { name: 'time', label: '核销时间', type: 'date', required: true }
  ]
};

// ---- 诊所端：患者建档 ----
var CLINIC_PATIENTS = {
  entity: 'patients',
  title: '患者档案',
  breadcrumb: '首页 / 业务',
  pageSize: 5,
  searchFields: ['name', 'phone', 'treatmentType'],
  searchPlaceholder: '搜索患者姓名、电话...',
  filterField: 'treatmentType',
  filterOptions: [
    { value: '种植', label: '种植' },
    { value: '修复', label: '修复' },
    { value: '正畸', label: '正畸' }
  ],
  exportName: '患者档案',
  addLabel: '新增患者',
  displayField: 'name',
  columns: [
    { field: 'name', label: '姓名' },
    { field: 'gender', label: '性别' },
    { field: 'age', label: '年龄', type: 'dash' },
    { field: 'phone', label: '电话' },
    { field: 'treatmentType', label: '治疗类型' },
    { field: 'implants', label: '种植体数', type: 'dash' },
    { field: 'createdAt', label: '建档日期' }
  ],
  formFields: [
    { name: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入患者姓名' },
    { name: 'gender', label: '性别', type: 'select', options: [
      { value: '男', label: '男' }, { value: '女', label: '女' }
    ], required: true },
    { name: 'age', label: '年龄', type: 'number', required: true, rules: ['positive'], placeholder: '请输入年龄' },
    { name: 'phone', label: '电话', type: 'text', required: true, rules: ['phone'], placeholder: '请输入手机号' },
    { name: 'treatmentType', label: '治疗类型', type: 'select', options: [
      { value: '种植', label: '种植' },
      { value: '修复', label: '修复' },
      { value: '正畸', label: '正畸' }
    ], required: true },
    { name: 'implants', label: '种植体数量', type: 'number', value: 0 }
  ]
};

// ---- 诊所端：加工单管理 ----
var CLINIC_ORDERS = {
  entity: 'orders',
  title: '加工单列表',
  breadcrumb: '首页 / 业务',
  pageSize: 5,
  searchFields: ['no', 'patient', 'implantType', 'factory'],
  searchPlaceholder: '搜索单号、患者、型号...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_ORDER,
  exportName: '加工单',
  addLabel: '新增加工单',
  displayField: 'no',
  columns: [
    { field: 'no', label: '单号' },
    { field: 'patient', label: '患者' },
    { field: 'type', label: '类型' },
    { field: 'implantType', label: '植体型号' },
    { field: 'qty', label: '数量', type: 'dash' },
    { field: 'factory', label: '工厂' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'createdAt', label: '创建日期' }
  ],
  formFields: [
    { name: 'no', label: '单号', type: 'text', required: true, placeholder: '如：MO-2025-0823' },
    { name: 'patient', label: '患者姓名', type: 'text', required: true, placeholder: '请输入患者姓名' },
    { name: 'type', label: '类型', type: 'select', options: [
      { value: '种植体', label: '种植体' },
      { value: '基台', label: '基台' },
      { value: '修复体', label: '修复体' }
    ], required: true },
    { name: 'implantType', label: '植体型号', type: 'text', required: true, placeholder: '如：XW-TI-3510' },
    { name: 'qty', label: '数量', type: 'number', required: true, rules: ['positive'], value: 1 },
    { name: 'factory', label: '工厂', type: 'text', required: true, placeholder: '请输入工厂名称' },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS_ORDER, required: true }
  ]
};

// ---- 诊所端：植体管理 ----
var CLINIC_IMPLANTS = {
  entity: 'implants',
  title: '植体库存',
  breadcrumb: '首页 / 业务',
  pageSize: 5,
  searchFields: ['model', 'spec'],
  searchPlaceholder: '搜索型号、规格...',
  filterField: 'status',
  filterOptions: STATUS_OPTS,
  exportName: '植体库存',
  addLabel: '新增植体',
  displayField: 'model',
  columns: [
    { field: 'model', label: '型号' },
    { field: 'spec', label: '规格' },
    { field: 'stock', label: '库存', type: 'dash' },
    { field: 'used', label: '已用', type: 'dash' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'model', label: '型号', type: 'text', required: true, placeholder: '如：XW-TI-3510' },
    { name: 'spec', label: '规格', type: 'text', required: true, placeholder: '如：直径3.5mm / 长10mm' },
    { name: 'stock', label: '库存', type: 'number', required: true, value: 0 },
    { name: 'used', label: '已用', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 诊所端：收支明细 ----
var CLINIC_FINANCE = {
  entity: 'transactions',
  title: '收支明细',
  breadcrumb: '首页 / 财务',
  pageSize: 5,
  searchFields: ['item'],
  searchPlaceholder: '搜索收支项目...',
  filterField: 'direction',
  filterOptions: [
    { value: '收入', label: '收入' },
    { value: '支出', label: '支出' }
  ],
  exportName: '收支明细',
  addLabel: '新增记录',
  displayField: 'item',
  columns: [
    { field: 'date', label: '日期' },
    { field: 'item', label: '收支项目' },
    { field: 'direction', label: '收支方向', formatter: function(val) {
      return val === '收入'
        ? '<span class="status-tag active">收入</span>'
        : '<span class="status-tag inactive">支出</span>';
    }},
    { field: 'amount', label: '金额', type: 'money' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'date', label: '日期', type: 'date', required: true },
    { name: 'item', label: '收支项目', type: 'text', required: true, placeholder: '请输入项目名称' },
    { name: 'direction', label: '收支方向', type: 'select', options: [
      { value: '收入', label: '收入' },
      { value: '支出', label: '支出' }
    ], required: true },
    { name: 'amount', label: '金额', type: 'number', required: true, rules: ['positive'], placeholder: '请输入金额' },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 诊所端：提现申请 ----
var CLINIC_WITHDRAW = {
  entity: 'withdrawals',
  title: '提现记录',
  breadcrumb: '首页 / 财务',
  pageSize: 5,
  searchFields: ['no', 'bank'],
  searchPlaceholder: '搜索单号、银行...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_WITHDRAW,
  exportName: '提现记录',
  addLabel: '申请提现',
  displayField: 'no',
  columns: [
    { field: 'no', label: '提现单号' },
    { field: 'amount', label: '金额', type: 'money' },
    { field: 'bank', label: '收款银行' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'appliedAt', label: '申请日期' },
    { field: 'arrivedAt', label: '到账日期', type: 'dash' }
  ],
  formFields: [
    { name: 'no', label: '提现单号', type: 'text', required: true, placeholder: '如：WD-2025-0803' },
    { name: 'amount', label: '金额', type: 'number', required: true, rules: ['positive'], placeholder: '请输入提现金额' },
    { name: 'bank', label: '收款银行', type: 'text', required: true, placeholder: '如：工商银行 尾号 8862' },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS_WITHDRAW, required: true }
  ]
};

// ---- 经销商端：诊所管理（复用 clinics） ----
var DEALER_CLINICS = Object.assign({}, PLATFORM_CLINICS, {
  breadcrumb: '首页 / 客户',
  addLabel: '新增诊所客户'
});

// ---- 经销商端：药房管理 ----
var DEALER_PHARMACY = Object.assign({}, PLATFORM_PHARMACY, {
  breadcrumb: '首页 / 客户',
  addLabel: '新增药房客户'
});

// ---- 经销商端：佣金明细 ----
var DEALER_COMMISSION = {
  entity: 'transactions',
  title: '佣金明细',
  breadcrumb: '首页 / 收益',
  pageSize: 5,
  searchFields: ['item'],
  searchPlaceholder: '搜索佣金项目...',
  filterField: 'direction',
  filterOptions: [
    { value: '收入', label: '收入' },
    { value: '支出', label: '支出' }
  ],
  exportName: '佣金明细',
  addLabel: '新增记录',
  displayField: 'item',
  columns: [
    { field: 'date', label: '日期' },
    { field: 'item', label: '项目' },
    { field: 'direction', label: '方向', formatter: function(val) {
      return val === '收入'
        ? '<span class="status-tag active">收入</span>'
        : '<span class="status-tag inactive">支出</span>';
    }},
    { field: 'amount', label: '金额', type: 'money' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: CLINIC_FINANCE.formFields
};

// ---- 经销商端：提现申请 ----
var DEALER_WITHDRAW = Object.assign({}, CLINIC_WITHDRAW, {
  breadcrumb: '首页 / 收益'
});

// ---- 药店端：种植卡管理 ----
var PHARMACY_CARDS = Object.assign({}, PLATFORM_CARDS, {
  breadcrumb: '首页 / 商品',
  addLabel: '新增种植卡'
});

// ---- 药店端：库存查看 ----
var PHARMACY_INVENTORY = Object.assign({}, CLINIC_IMPLANTS, {
  breadcrumb: '首页 / 商品',
  addLabel: '新增库存',
  creatable: true
});

// ---- 药店端：采购管理 ----
var PHARMACY_PURCHASE = {
  entity: 'orders',
  title: '采购订单',
  breadcrumb: '首页 / 商品',
  pageSize: 5,
  searchFields: ['no', 'patient', 'implantType'],
  searchPlaceholder: '搜索订单号、型号...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_ORDER,
  exportName: '采购订单',
  addLabel: '新增采购',
  displayField: 'no',
  columns: [
    { field: 'no', label: '订单号' },
    { field: 'type', label: '类型' },
    { field: 'implantType', label: '型号' },
    { field: 'qty', label: '数量', type: 'dash' },
    { field: 'factory', label: '供应商' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'createdAt', label: '下单日期' }
  ],
  formFields: CLINIC_ORDERS.formFields
};

// ---- 药店端：财务收支 ----
var PHARMACY_FINANCE = Object.assign({}, CLINIC_FINANCE, {
  breadcrumb: '首页 / 财务'
});

// ---- 药店端：客户管理 ----
var PHARMACY_CUSTOMERS = Object.assign({}, CLINIC_PATIENTS, {
  title: '客户列表',
  breadcrumb: '首页 / 客户',
  addLabel: '新增客户'
});

// ---- 工厂端：订单管理 ----
var FACTORY_ORDERS = {
  entity: 'orders',
  title: '工厂订单',
  breadcrumb: '首页 / 订单',
  pageSize: 5,
  searchFields: ['no', 'patient', 'implantType'],
  searchPlaceholder: '搜索订单号、患者、型号...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_ORDER,
  exportName: '工厂订单',
  addLabel: '新增订单',
  displayField: 'no',
  columns: [
    { field: 'no', label: '订单号' },
    { field: 'patient', label: '患者' },
    { field: 'type', label: '类型' },
    { field: 'implantType', label: '型号' },
    { field: 'qty', label: '数量', type: 'dash' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'createdAt', label: '创建日期' }
  ],
  formFields: CLINIC_ORDERS.formFields
};

// ---- 工厂端：收发货管理 ----
var FACTORY_SHIPPING = {
  entity: 'orders',
  title: '收发货记录',
  breadcrumb: '首页 / 订单',
  pageSize: 5,
  searchFields: ['no', 'patient', 'factory'],
  searchPlaceholder: '搜索订单号、患者...',
  filterField: 'status',
  filterOptions: STATUS_OPTS_ORDER,
  exportName: '收发货记录',
  addLabel: '新增记录',
  displayField: 'no',
  columns: [
    { field: 'no', label: '订单号' },
    { field: 'patient', label: '患者' },
    { field: 'implantType', label: '型号' },
    { field: 'qty', label: '数量', type: 'dash' },
    { field: 'factory', label: '收货方' },
    { field: 'status', label: '发货状态', type: 'status' },
    { field: 'createdAt', label: '日期' }
  ],
  formFields: CLINIC_ORDERS.formFields
};

// ---- 工厂端：质检记录 ----
var FACTORY_QUALITY = {
  entity: 'implants',
  title: '质检记录',
  breadcrumb: '首页 / 生产',
  pageSize: 5,
  searchFields: ['model', 'spec'],
  searchPlaceholder: '搜索型号、规格...',
  filterField: 'status',
  filterOptions: STATUS_OPTS,
  exportName: '质检记录',
  addLabel: '新增质检',
  displayField: 'model',
  columns: [
    { field: 'model', label: '型号' },
    { field: 'spec', label: '规格' },
    { field: 'stock', label: '合格数', type: 'dash' },
    { field: 'used', label: '已出货', type: 'dash' },
    { field: 'status', label: '质检状态', type: 'status' }
  ],
  formFields: CLINIC_IMPLANTS.formFields
};

// ---- 工厂端：异常反馈 ----
var FACTORY_EXCEPTION = {
  entity: 'notifications',
  title: '异常反馈',
  breadcrumb: '首页 / 生产',
  pageSize: 5,
  searchFields: ['title', 'content'],
  searchPlaceholder: '搜索异常标题、内容...',
  filterField: 'read',
  filterOptions: [
    { value: 'false', label: '未处理' },
    { value: 'true', label: '已处理' }
  ],
  exportName: '异常反馈',
  addLabel: '上报异常',
  displayField: 'title',
  columns: [
    { field: 'time', label: '时间' },
    { field: 'title', label: '异常标题' },
    { field: 'content', label: '详细描述' },
    { field: 'read', label: '处理状态', formatter: function(val) {
      return val ? '<span class="status-tag active">已处理</span>' : '<span class="status-tag pending">未处理</span>';
    }}
  ],
  formFields: [
    { name: 'title', label: '异常标题', type: 'text', required: true, placeholder: '请输入异常标题' },
    { name: 'content', label: '详细描述', type: 'textarea', required: true, placeholder: '请描述异常情况' },
    { name: 'time', label: '时间', type: 'date', required: true },
    { name: 'read', label: '处理状态', type: 'select', options: [
      { value: 'false', label: '未处理' },
      { value: 'true', label: '已处理' }
    ], required: true }
  ]
};

// ---- 工厂端：财务收支 ----
var FACTORY_FINANCE = Object.assign({}, CLINIC_FINANCE, {
  breadcrumb: '首页 / 财务'
});


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


// ==================== 动态首页生成器 ====================

function _homeStats(stats) {
  var html = '<div class="stats-grid">';
  stats.forEach(function(s) {
    html += '<div class="stat-card">' +
      '<div class="stat-card-header"><span class="stat-card-label">' + s.label + '</span>' +
      '<div class="stat-card-icon ' + (s.color||'green') + '">' + (s.icon||'📊') + '</div></div>' +
      '<div class="stat-card-value">' + s.value + '</div>' +
      (s.change ? '<div class="stat-card-change up">' + s.change + '</div>' : '') +
      '</div>';
  });
  html += '</div>';
  return html;
}

function _barChart(values, labels) {
  var max = Math.max.apply(null, values);
  var html = '<div class="chart-placeholder">';
  for (var i = 0; i < values.length; i++) {
    var h = Math.round(values[i] / max * 100);
    html += '<div class="bar-item"><div class="bar-value">' + values[i] + '</div><div class="bar" style="height:' + h + 'px"></div><div class="bar-label">' + labels[i] + '</div></div>';
  }
  html += '</div>';
  return html;
}


// ==================== PAGE_RENDERERS ====================
var PAGE_RENDERERS = {

  // ================================================================
  //  平台端 (platform)
  // ================================================================
  platform: {

    home: function() {
      var clinics = DB.getAll('clinics');
      var pharmacies = DB.getAll('pharmacies');
      var dealers = DB.getAll('dealers');
      var recent = clinics.slice(-4).reverse();
      var rows = recent.map(function(c) {
        return '<tr><td>' + CRUD._esc(c.name) + '</td><td>' + CRUD._esc(c.owner) + '</td><td>' + CRUD._esc(c.phone) + '</td><td>' + CRUD._esc(c.region) + '</td><td>' + CRUD._statusTag(c.status) + '</td><td>' + CRUD._esc(c.createdAt) + '</td></tr>';
      }).join('');
      return '
<div class="breadcrumb">首页 / <span>概览</span></div>' +
_homeStats([
  { label:'合作诊所', value: clinics.length, icon:'🏥', color:'green', change:'↑ 12.5% 较上月' },
  { label:'合作药店', value: pharmacies.length, icon:'💊', color:'blue', change:'↑ 8.3% 较上月' },
  { label:'合作经销商', value: dealers.length, icon:'👤', color:'orange', change:'↑ 1 本季新增' },
  { label:'平台营收', value:'¥2,856,300', icon:'💰', color:'red', change:'↑ 18.6% 较上月' }
]) + '
<div class="card">
  <div class="card-header"><span class="card-title">最近注册诊所</span><button class="btn btn-outline btn-sm" onclick="navigateTo(\'clinics\')">查看全部</button></div>
  <table class="data-table">
    <thead><tr><th>诊所名称</th><th>负责人</th><th>联系电话</th><th>地区</th><th>状态</th><th>注册时间</th></tr></thead>
    <tbody>' + rows + '</tbody>
  </table>
</div>';
    },

    clinics: function() { return CRUD.builder('platform_clinics', PLATFORM_CLINICS); },
    pharmacy: function() { return CRUD.builder('platform_pharmacy', PLATFORM_PHARMACY); },

    factory: function() {
      var factories = DB.getAll('factories');
      var f = factories[0] || { name:'小唯精密制造有限公司', owner:'孙志强', phone:'138-8888-0001', address:'广东省东莞市松山湖科技产业园', monthlyCapacity:12000, status:'active' };
      return '
<div class="breadcrumb">首页 / 业务管理 / <span>工厂详情</span></div>' +
_homeStats([
  { label:'合作工厂', value: factories.length, icon:'🏭', color:'green', change:'↑ 1 本季新增' },
  { label:'月产能', value: (f.monthlyCapacity||0).toLocaleString(), icon:'⚙️', color:'blue', change:'↑ 9.2%' },
  { label:'本月产出', value:'10,860', icon:'📦', color:'orange', change:'↑ 7.8%' },
  { label:'平均合格率', value:'98.5%', icon:'✅', color:'red', change:'↑ 0.3%' }
]) + '
<div class="two-col">
  <div class="card">
    <div class="card-header"><span class="card-title">工厂信息</span><button class="btn btn-outline btn-sm" onclick="UI.toast.info(\'编辑功能开发中\')">编辑</button></div>
    <table class="data-table"><tbody>
      <tr><th style="width:120px;">工厂名称</th><td>' + CRUD._esc(f.name) + '</td></tr>
      <tr><th>负责人</th><td>' + CRUD._esc(f.owner) + '</td></tr>
      <tr><th>联系电话</th><td>' + CRUD._esc(f.phone) + '</td></tr>
      <tr><th>工厂地址</th><td>' + CRUD._esc(f.address) + '</td></tr>
      <tr><th>月产能</th><td>' + (f.monthlyCapacity||0).toLocaleString() + ' 颗</td></tr>
      <tr><th>合作状态</th><td>' + CRUD._statusTag(f.status) + '</td></tr>
    </tbody></table>
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
</div>';
    },

    dealers: function() { return CRUD.builder('platform_dealers', PLATFORM_DEALERS); },
    cards: function() { return CRUD.builder('platform_cards', PLATFORM_CARDS); },

    mall: function() {
      var products = DB.getAll('products');
      var cards = products.map(function(p) {
        var bg = { green:'var(--primary-light)', blue:'#e8f4fd', orange:'#fef3e2', purple:'#f0e6ff', teal:'#e0f7fa' };
        return '<div class="product-card">' +
          '<div class="product-icon" style="background:' + (bg[p.color]||'var(--primary-light)') + ';">' + (p.icon||'📦') + '</div>' +
          '<div class="product-name">' + CRUD._esc(p.name) + '</div>' +
          '<div class="product-price">¥' + (p.price||0).toLocaleString() + '</div>' +
          '<div class="product-desc">' + CRUD._esc(p.desc||'') + '</div>' +
          '<div style="margin-top:8px;display:flex;gap:4px;">' +
          '<button class="btn btn-outline btn-sm" onclick="CRUD.showDetail(\'platform_mall\',' + p.id + ')">详情</button>' +
          '<button class="btn btn-primary btn-sm" onclick="CRUD.showEdit(\'platform_mall\',' + p.id + ')">编辑</button>' +
          '</div></div>';
      }).join('');
      return '
<div class="breadcrumb">首页 / 业务管理 / <span>商场管理</span></div>
<div class="card">
  <div class="card-header">
    <span class="card-title">商品列表</span>
    <button class="btn btn-primary btn-sm" onclick="CRUD.showAdd(\'platform_mall\')">+ 上架商品</button>
  </div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">' + cards + '</div>
</div>';
    },

    settlement: function() {
      var settlements = DB.getAll('settlements');
      var pending = settlements.filter(function(s){ return s.status === 'pending'; });
      var settled = settlements.filter(function(s){ return s.status === 'active'; });
      var totalSettled = settled.reduce(function(sum, s){ return sum + (s.amount||0); }, 0);
      var totalCommission = settled.reduce(function(sum, s){ return sum + (s.commission||0); }, 0);
      return CRUD.builder('platform_settlement', Object.assign({}, PLATFORM_SETTLEMENT, {
        stats: [
          { label:'本月待结算', value:'¥' + pending.reduce(function(s,i){return s+(i.amount||0);},0).toLocaleString(), icon:'⏳', color:'orange', change: pending.length + ' 笔待审' },
          { label:'本月已结算', value:'¥' + totalSettled.toLocaleString(), icon:'✅', color:'green', change:'↑ 15.2%' },
          { label:'平台抽成收入', value:'¥' + totalCommission.toLocaleString(), icon:'💼', color:'blue', change:'↑ 12.8%' },
          { label:'累计结算总额', value:'¥8,560,000', icon:'💰', color:'red', change:'↑ 22.1%' }
        ]
      }));
    },

    reports: function() {
      return '
<div class="breadcrumb">首页 / 财务 / <span>财务报表</span></div>' +
_homeStats([
  { label:'本月总收入', value:'¥2,856,300', icon:'📈', color:'green', change:'↑ 18.6%' },
  { label:'本月总支出', value:'¥1,892,500', icon:'📉', color:'red', change:'↑ 10.2%' },
  { label:'净利润', value:'¥963,800', icon:'💰', color:'blue', change:'↑ 35.4%' },
  { label:'利润率', value:'33.8%', icon:'📊', color:'orange', change:'↑ 4.2%' }
]) + '
<div class="chart-row">' +
_barChart([186,215,248,198,267,312,289,341], ['1月','2月','3月','4月','5月','6月','7月','8月']) + '
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
  <div class="card-header"><span class="card-title">收入明细</span><button class="btn btn-outline btn-sm" onclick="CRUD.exportCSV(\'platform_settlement\')">导出报表</button></div>
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
</div>';
    },

    permissions: function() { return CRUD.builder('platform_permissions', PLATFORM_PERMISSIONS); },
    notifications: function() { return CRUD.builder('platform_notifications', PLATFORM_NOTIFICATIONS); }
  },

  // ================================================================
  //  诊所端 (clinic)
  // ================================================================
  clinic: {

    home: function() {
      var patients = DB.getAll('patients');
      var orders = DB.getAll('orders');
      var implants = DB.getAll('implants');
      var records = DB.getAll('verifyRecords');
      return '
<div class="breadcrumb">首页 / <span>概览</span></div>' +
_homeStats([
  { label:'今日核销', value: records.filter(function(r){ return r.time && r.time.indexOf(DB._today())>=0; }).length, icon:'📋', color:'green', change:'今日完成' },
  { label:'患者总数', value: patients.length, icon:'👤', color:'blue', change:'↑ 3 本周新增' },
  { label:'加工单', value: orders.filter(function(o){ return o.status==='pending'; }).length + ' 待处理', icon:'📄', color:'orange' },
  { label:'植体库存', value: implants.reduce(function(s,i){ return s+(i.stock||0); }, 0), icon:'🦷', color:'red' }
]) + '
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo(\'verify\')"><div class="icon green">📋</div><div class="name">核销登记</div><div class="desc">3 笔待核销</div></div>
  <div class="quick-item" onclick="navigateTo(\'patients\')"><div class="icon blue">👤</div><div class="name">患者建档</div><div class="desc">' + patients.length + ' 位患者</div></div>
  <div class="quick-item" onclick="navigateTo(\'orders\')"><div class="icon orange">📄</div><div class="name">加工单管理</div><div class="desc">' + orders.length + ' 单</div></div>
  <div class="quick-item" onclick="navigateTo(\'implants\')"><div class="icon purple">🦷</div><div class="name">植体管理</div><div class="desc">' + implants.length + ' 个型号</div></div>
  <div class="quick-item" onclick="navigateTo(\'finance\')"><div class="icon teal">💰</div><div class="name">收支明细</div><div class="desc">财务统计</div></div>
</div>';
    },

    verify: function() { return CRUD.builder('clinic_verify', CLINIC_VERIFY); },
    patients: function() { return CRUD.builder('clinic_patients', CLINIC_PATIENTS); },
    orders: function() { return CRUD.builder('clinic_orders', CLINIC_ORDERS); },

    tracking: function() {
      var orders = DB.getAll('orders');
      var stages = [
        { name:'待接单', count: orders.filter(function(o){return o.status==='pending';}).length, icon:'📥', color:'orange' },
        { name:'加工中', count: orders.filter(function(o){return o.status==='processing';}).length, icon:'⚙️', color:'blue' },
        { name:'已发货', count: orders.filter(function(o){return o.status==='active';}).length, icon:'📦', color:'green' },
        { name:'已签收', count: 0, icon:'✅', color:'teal' }
      ];
      return '
<div class="breadcrumb">首页 / 业务 / <span>订单跟踪</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">订单跟踪</span><button class="btn btn-outline btn-sm" onclick="navigateTo(\'orders\')">查看全部订单</button></div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">' +
    stages.map(function(s) {
      return '<div class="quick-item"><div class="icon ' + s.color + '">' + s.icon + '</div><div class="name">' + s.name + '</div><div class="desc">' + s.count + ' 单</div></div>';
    }).join('') + '
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">物流时间线</span></div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>患者</th><th>型号</th><th>状态</th><th>创建日期</th></tr></thead>
    <tbody>' +
      orders.slice(-5).reverse().map(function(o) {
        return '<tr><td>' + CRUD._esc(o.no) + '</td><td>' + CRUD._esc(o.patient) + '</td><td>' + CRUD._esc(o.implantType) + '</td><td>' + CRUD._statusTag(o.status) + '</td><td>' + CRUD._esc(o.createdAt) + '</td></tr>';
      }).join('') + '
    </tbody>
  </table>
</div>';
    },

    implants: function() { return CRUD.builder('clinic_implants', CLINIC_IMPLANTS); },
    finance: function() { return CRUD.builder('clinic_finance', CLINIC_FINANCE); },
    withdraw: function() { return CRUD.builder('clinic_withdraw', CLINIC_WITHDRAW); },

    settings: function() {
      return '
<div class="breadcrumb">首页 / 系统 / <span>诊所设置</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">诊所基本信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>诊所名称</label><input type="text" value="仁爱口腔诊所" placeholder="诊所名称"></div>
    <div class="form-group"><label>负责人</label><input type="text" value="李明华" placeholder="负责人"></div>
    <div class="form-group"><label>联系电话</label><input type="text" value="138-0011-2233" placeholder="联系电话"></div>
    <div class="form-group"><label>地区</label><input type="text" value="浙江杭州" placeholder="地区"></div>
    <div class="form-group"><label>诊所地址</label><textarea placeholder="详细地址">浙江省杭州市西湖区文三路100号</textarea></div>
    <button class="btn btn-primary" onclick="UI.toast.success(\'设置已保存\')">保存设置</button>
  </div>
</div>';
    }
  },

  // ================================================================
  //  经销商端 (dealer)
  // ================================================================
  dealer: {

    home: function() {
      var dealers = DB.getAll('dealers');
      var clinics = DB.getAll('clinics');
      var pharmacies = DB.getAll('pharmacies');
      var totalCommission = dealers.reduce(function(s,d){ return s+(d.commission||0); }, 0);
      return '
<div class="breadcrumb">首页 / <span>概览</span></div>' +
_homeStats([
  { label:'诊所客户', value: clinics.length, icon:'🏥', color:'green', change:'↑ 5 本月' },
  { label:'药房客户', value: pharmacies.length, icon:'💊', color:'blue', change:'↑ 3 本月' },
  { label:'累计佣金', value:'¥' + totalCommission.toLocaleString(), icon:'💰', color:'orange', change:'↑ 15.2%' },
  { label:'待提现', value:'¥45,600', icon:'💳', color:'red', change:'1 笔待审' }
]) + '
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo(\'clinics\')"><div class="icon green">🏥</div><div class="name">诊所管理</div><div class="desc">' + clinics.length + ' 家</div></div>
  <div class="quick-item" onclick="navigateTo(\'pharmacy\')"><div class="icon blue">💊</div><div class="name">药房管理</div><div class="desc">' + pharmacies.length + ' 家</div></div>
  <div class="quick-item" onclick="navigateTo(\'commission\')"><div class="icon orange">💰</div><div class="name">佣金明细</div><div class="desc">收益统计</div></div>
  <div class="quick-item" onclick="navigateTo(\'withdraw\')"><div class="icon teal">💳</div><div class="name">提现申请</div><div class="desc">1 笔待审</div></div>
</div>';
    },

    clinics: function() { return CRUD.builder('dealer_clinics', DEALER_CLINICS); },
    pharmacy: function() { return CRUD.builder('dealer_pharmacy', DEALER_PHARMACY); },

    sales: function() {
      var dealers = DB.getAll('dealers');
      return '
<div class="breadcrumb">首页 / 客户 / <span>销售活动</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">销售活动概览</span><button class="btn btn-primary btn-sm" onclick="UI.toast.info(\'新建活动功能开发中\')">+ 新建活动</button></div>
  <table class="data-table">
    <thead><tr><th>经销商</th><th>区域</th><th>诊所客户</th><th>药房客户</th><th>佣金累计</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>' +
      dealers.map(function(d) {
        return '<tr><td>' + CRUD._esc(d.name) + '</td><td>' + CRUD._esc(d.region) + '</td><td>' + CRUD._dash(d.clinicClients) + '</td><td>' + CRUD._dash(d.pharmacyClients) + '</td><td>¥' + (d.commission||0).toLocaleString() + '</td><td>' + CRUD._statusTag(d.status) + '</td><td><button class="btn btn-outline btn-sm" onclick="UI.toast.info(\'查看详情\')">查看</button></td></tr>';
      }).join('') + '
    </tbody>
  </table>
</div>';
    },

    commission: function() { return CRUD.builder('dealer_commission', DEALER_COMMISSION); },
    withdraw: function() { return CRUD.builder('dealer_withdraw', DEALER_WITHDRAW); },

    settings: function() {
      return '
<div class="breadcrumb">首页 / 系统 / <span>个人设置</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">个人信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>姓名</label><input type="text" value="张明华" placeholder="姓名"></div>
    <div class="form-group"><label>负责区域</label><input type="text" value="华东区域" placeholder="负责区域"></div>
    <div class="form-group"><label>联系电话</label><input type="text" value="138-0011-2233" placeholder="联系电话"></div>
    <div class="form-group"><label>收款银行</label><input type="text" value="工商银行 尾号 8862" placeholder="收款银行"></div>
    <button class="btn btn-primary" onclick="UI.toast.success(\'设置已保存\')">保存设置</button>
  </div>
</div>';
    }
  },

  // ================================================================
  //  药店端 (pharmacy)
  // ================================================================
  pharmacy: {

    home: function() {
      var cards = DB.getAll('cards');
      var products = DB.getAll('products');
      var transactions = DB.getAll('transactions');
      var income = transactions.filter(function(t){return t.direction==='收入';}).reduce(function(s,t){return s+(t.amount||0);},0);
      return '
<div class="breadcrumb">首页 / <span>概览</span></div>' +
_homeStats([
  { label:'种植卡销量', value: cards.length, icon:'💳', color:'green', change:'↑ 8.3%' },
  { label:'商品总数', value: products.length, icon:'🛒', color:'blue' },
  { label:'本月收入', value:'¥' + income.toLocaleString(), icon:'💰', color:'orange', change:'↑ 12.6%' },
  { label:'待提现', value:'¥56,200', icon:'💳', color:'red', change:'1 笔待审' }
]) + '
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo(\'cards\')"><div class="icon green">💳</div><div class="name">种植卡管理</div><div class="desc">' + cards.length + ' 张</div></div>
  <div class="quick-item" onclick="navigateTo(\'inventory\')"><div class="icon blue">📦</div><div class="name">库存查看</div><div class="desc">实时库存</div></div>
  <div class="quick-item" onclick="navigateTo(\'purchase\')"><div class="icon orange">🛒</div><div class="name">采购管理</div><div class="desc">下单采购</div></div>
  <div class="quick-item" onclick="navigateTo(\'finance\')"><div class="icon teal">💰</div><div class="name">财务收支</div><div class="desc">收支明细</div></div>
</div>';
    },

    cards: function() { return CRUD.builder('pharmacy_cards', PHARMACY_CARDS); },
    inventory: function() { return CRUD.builder('pharmacy_inventory', PHARMACY_INVENTORY); },
    purchase: function() { return CRUD.builder('pharmacy_purchase', PHARMACY_PURCHASE); },
    finance: function() { return CRUD.builder('pharmacy_finance', PHARMACY_FINANCE); },

    mall: function() {
      return '
<div class="breadcrumb">首页 / 财务 / <span>提现/商城</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">提现申请</span><button class="btn btn-primary btn-sm" onclick="navigateTo(\'cards\')">去管理种植卡</button></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>可提现余额</label><input type="text" value="¥56,200" readonly style="background:#f5f5f5;"></div>
    <div class="form-group"><label>提现金额</label><input type="number" placeholder="请输入提现金额"></div>
    <div class="form-group"><label>收款银行</label><input type="text" value="工商银行 尾号 8862" placeholder="收款银行"></div>
    <button class="btn btn-primary" onclick="UI.toast.success(\'提现申请已提交\')">提交申请</button>
  </div>
</div>';
    },

    customers: function() { return CRUD.builder('pharmacy_customers', PHARMACY_CUSTOMERS); },

    settings: function() {
      return '
<div class="breadcrumb">首页 / 系统 / <span>门店设置</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">门店信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>药店名称</label><input type="text" value="健佳大药房" placeholder="药店名称"></div>
    <div class="form-group"><label>店长</label><input type="text" value="周明" placeholder="店长"></div>
    <div class="form-group"><label>联系电话</label><input type="text" value="138-1122-3344" placeholder="联系电话"></div>
    <div class="form-group"><label>地区</label><input type="text" value="浙江杭州" placeholder="地区"></div>
    <div class="form-group"><label>门店地址</label><textarea placeholder="详细地址">浙江省杭州市拱墅区莫干山路200号</textarea></div>
    <button class="btn btn-primary" onclick="UI.toast.success(\'设置已保存\')">保存设置</button>
  </div>
</div>';
    }
  },

  // ================================================================
  //  工厂端 (factory)
  // ================================================================
  factory: {

    home: function() {
      var orders = DB.getAll('orders');
      var implants = DB.getAll('implants');
      var pending = orders.filter(function(o){return o.status==='pending';}).length;
      var processing = orders.filter(function(o){return o.status==='processing';}).length;
      var active = orders.filter(function(o){return o.status==='active';}).length;
      return '
<div class="breadcrumb">首页 / <span>概览</span></div>' +
_homeStats([
  { label:'待处理订单', value: pending, icon:'📥', color:'orange', change:'待接单' },
  { label:'加工中', value: processing, icon:'⚙️', color:'blue', change:'生产中' },
  { label:'已出货', value: active, icon:'📦', color:'green', change:'已发货' },
  { label:'库存总量', value: implants.reduce(function(s,i){return s+(i.stock||0);},0), icon:'🏭', color:'red' }
]) + '
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo(\'orders\')"><div class="icon green">📋</div><div class="name">订单管理</div><div class="desc">' + orders.length + ' 单</div></div>
  <div class="quick-item" onclick="navigateTo(\'shipping\')"><div class="icon blue">📦</div><div class="name">收发货管理</div><div class="desc">物流跟踪</div></div>
  <div class="quick-item" onclick="navigateTo(\'production\')"><div class="icon orange">🏭</div><div class="name">生产排产</div><div class="desc">排产计划</div></div>
  <div class="quick-item" onclick="navigateTo(\'quality\')"><div class="icon teal">✅</div><div class="name">质检记录</div><div class="desc">质量追溯</div></div>
</div>';
    },

    orders: function() { return CRUD.builder('factory_orders', FACTORY_ORDERS); },
    shipping: function() { return CRUD.builder('factory_shipping', FACTORY_SHIPPING); },

    production: function() {
      var orders = DB.getAll('orders');
      var stages = [
        { name:'待排产', count: orders.filter(function(o){return o.status==='pending';}).length },
        { name:'已排产', count: 5 },
        { name:'加工中', count: orders.filter(function(o){return o.status==='processing';}).length },
        { name:'已完成', count: orders.filter(function(o){return o.status==='active';}).length }
      ];
      return '
<div class="breadcrumb">首页 / 生产 / <span>生产排产</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">生产排产看板</span></div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">' +
    stages.map(function(s) {
      return '<div class="quick-item"><div class="icon green">🏭</div><div class="name">' + s.name + '</div><div class="desc">' + s.count + ' 单</div></div>';
    }).join('') + '
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">今日排产</span><button class="btn btn-outline btn-sm" onclick="navigateTo(\'orders\')">查看全部</button></div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>型号</th><th>数量</th><th>状态</th><th>预计完成</th></tr></thead>
    <tbody>' +
      orders.slice(-5).reverse().map(function(o) {
        return '<tr><td>' + CRUD._esc(o.no) + '</td><td>' + CRUD._esc(o.implantType) + '</td><td>' + CRUD._dash(o.qty) + '</td><td>' + CRUD._statusTag(o.status) + '</td><td>今日</td></tr>';
      }).join('') + '
    </tbody>
  </table>
</div>';
    },

    quality: function() { return CRUD.builder('factory_quality', FACTORY_QUALITY); },
    exception: function() { return CRUD.builder('factory_exception', FACTORY_EXCEPTION); },

    service: function() {
      return '
<div class="breadcrumb">首页 / 沟通 / <span>客服中心</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">客服消息</span></div>
  <div style="padding:20px;">
    <div style="text-align:center;color:var(--text-muted);padding:40px 0;">
      <div style="font-size:40px;margin-bottom:12px;">💬</div>
      <div style="font-size:14px;">暂无新消息</div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">快捷操作</span></div>
  <div style="padding:20px;display:flex;gap:8px;flex-wrap:wrap;">
    <button class="btn btn-primary" onclick="UI.toast.info(\'新建工单\')">📝 新建工单</button>
    <button class="btn btn-outline" onclick="UI.toast.info(\'查看历史\')">📜 历史记录</button>
    <button class="btn btn-outline" onclick="UI.toast.info(\'常见问题\')">❓ 常见问题</button>
  </div>
</div>';
    },

    finance: function() { return CRUD.builder('factory_finance', FACTORY_FINANCE); }
  }

};
