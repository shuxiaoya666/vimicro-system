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

// ---- 药店端：种植卡库存（只读，仅显示剩余卡和激活状态） ----
var PHARMACY_CARDS = Object.assign({}, PLATFORM_CARDS, {
  breadcrumb: '首页 / 商品',
  title: '种植卡库存',
  addLabel: '',
  creatable: false,
  editable: false,
  deletable: false,
  columns: [
    { field: 'cardNo', label: '卡号' },
    { field: 'implantType', label: '植体型号' },
    { field: 'issueDate', label: '发卡日期' },
    { field: 'status', label: '激活状态', type: 'status' }
  ]
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


// ==================== 客户端 CRUD 配置 ====================

// ---- 客户端：商品兑换 ----
var CLIENT_PRODUCTS = {
  entity: 'clientProducts',
  title: '商品兑换',
  breadcrumb: '首页 / 小唯商场',
  pageSize: 6,
  searchFields: ['name', 'category', 'desc'],
  searchPlaceholder: '搜索商品名称、分类...',
  filterField: 'category',
  filterOptions: [
    { value: '种植体', label: '种植体' },
    { value: '配件', label: '配件' },
    { value: '耗材', label: '耗材' },
    { value: '工具', label: '工具' }
  ],
  exportName: '商品列表',
  addLabel: '新增商品',
  displayField: 'name',
  columns: [
    { field: 'name', label: '商品名称' },
    { field: 'category', label: '分类' },
    { field: 'price', label: '价格', type: 'price' },
    { field: 'stock', label: '库存', type: 'dash' },
    { field: 'sales', label: '销量', type: 'dash' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'name', label: '商品名称', type: 'text', required: true, placeholder: '请输入商品名称' },
    { name: 'category', label: '分类', type: 'select', options: [
      { value: '种植体', label: '种植体' },
      { value: '配件', label: '配件' },
      { value: '耗材', label: '耗材' },
      { value: '工具', label: '工具' }
    ], required: true },
    { name: 'price', label: '价格', type: 'number', required: true, rules: ['positive'], placeholder: '请输入价格' },
    { name: 'desc', label: '描述', type: 'text', placeholder: '商品描述' },
    { name: 'stock', label: '库存', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 客户端：我的订单 ----
var CLIENT_ORDERS = {
  entity: 'clientOrders',
  title: '我的订单',
  breadcrumb: '首页 / 我的',
  pageSize: 5,
  searchFields: ['no', 'item', 'clinic'],
  searchPlaceholder: '搜索订单号、商品...',
  filterField: 'status',
  filterOptions: [
    { value: 'active', label: '已完成' },
    { value: 'processing', label: '进行中' }
  ],
  exportName: '我的订单',
  addLabel: '新增订单',
  displayField: 'no',
  columns: [
    { field: 'no', label: '订单号' },
    { field: 'type', label: '类型' },
    { field: 'item', label: '商品/套餐' },
    { field: 'clinic', label: '诊所', type: 'dash' },
    { field: 'amount', label: '金额', type: 'price' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'createdAt', label: '下单日期' }
  ],
  formFields: [
    { name: 'no', label: '订单号', type: 'text', required: true, placeholder: '请输入订单号' },
    { name: 'type', label: '类型', type: 'select', options: [
      { value: '种植套餐', label: '种植套餐' },
      { value: '商品购买', label: '商品购买' }
    ], required: true },
    { name: 'item', label: '商品/套餐', type: 'text', required: true, placeholder: '请输入商品名称' },
    { name: 'clinic', label: '诊所', type: 'text', placeholder: '诊所名称' },
    { name: 'amount', label: '金额', type: 'number', required: true, rules: ['positive'], placeholder: '请输入金额' },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 客户端：消费记录 ----
var CLIENT_TRANSACTIONS = {
  entity: 'clientTransactions',
  title: '消费记录',
  breadcrumb: '首页 / 我的',
  pageSize: 8,
  searchFields: ['item', 'type'],
  searchPlaceholder: '搜索消费项目...',
  filterField: 'type',
  filterOptions: [
    { value: '种植套餐', label: '种植套餐' },
    { value: '商品购买', label: '商品购买' },
    { value: '积分兑换', label: '积分兑换' }
  ],
  exportName: '消费记录',
  addLabel: '新增记录',
  displayField: 'item',
  columns: [
    { field: 'date', label: '日期' },
    { field: 'type', label: '类型' },
    { field: 'item', label: '项目' },
    { field: 'amount', label: '金额', type: 'price' },
    { field: 'points', label: '积分变动' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'date', label: '日期', type: 'text', required: true, placeholder: 'YYYY-MM-DD' },
    { name: 'type', label: '类型', type: 'select', options: [
      { value: '种植套餐', label: '种植套餐' },
      { value: '商品购买', label: '商品购买' },
      { value: '积分兑换', label: '积分兑换' }
    ], required: true },
    { name: 'item', label: '项目', type: 'text', required: true, placeholder: '请输入项目' },
    { name: 'amount', label: '金额', type: 'number', value: 0 },
    { name: 'points', label: '积分变动', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 客户端：评价管理 ----
var CLIENT_REVIEWS = {
  entity: 'clientReviews',
  title: '我的评价',
  breadcrumb: '首页 / 我的',
  pageSize: 5,
  searchFields: ['target', 'content'],
  searchPlaceholder: '搜索评价...',
  filterField: 'type',
  filterOptions: [
    { value: '诊所评价', label: '诊所评价' },
    { value: '商品评价', label: '商品评价' }
  ],
  exportName: '我的评价',
  addLabel: '新增评价',
  displayField: 'target',
  columns: [
    { field: 'type', label: '类型' },
    { field: 'target', label: '评价对象' },
    { field: 'rating', label: '评分', type: 'dash' },
    { field: 'content', label: '评价内容' },
    { field: 'date', label: '日期' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'type', label: '类型', type: 'select', options: [
      { value: '诊所评价', label: '诊所评价' },
      { value: '商品评价', label: '商品评价' }
    ], required: true },
    { name: 'target', label: '评价对象', type: 'text', required: true, placeholder: '请输入评价对象' },
    { name: 'rating', label: '评分', type: 'select', options: [
      { value: 5, label: '5星' },
      { value: 4, label: '4星' },
      { value: 3, label: '3星' },
      { value: 2, label: '2星' },
      { value: 1, label: '1星' }
    ], required: true },
    { name: 'content', label: '评价内容', type: 'text', required: true, placeholder: '请输入评价内容' },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 客户端：实体卡绑定 ----
var CLIENT_CARDS = {
  entity: 'clientCards',
  title: '实体卡绑定',
  breadcrumb: '首页 / 我的',
  pageSize: 5,
  searchFields: ['cardNo', 'clinic', 'implantType'],
  searchPlaceholder: '搜索卡号、诊所...',
  exportName: '实体卡列表',
  addLabel: '绑定新卡',
  displayField: 'cardNo',
  columns: [
    { field: 'cardNo', label: '卡号' },
    { field: 'patient', label: '患者' },
    { field: 'clinic', label: '诊所' },
    { field: 'implantType', label: '种植体型号' },
    { field: 'bindDate', label: '绑定日期' },
    { field: 'status', label: '状态', type: 'status' }
  ],
  formFields: [
    { name: 'cardNo', label: '卡号', type: 'text', required: true, placeholder: '请输入卡密/卡号' },
    { name: 'patient', label: '患者', type: 'text', required: true, placeholder: '请输入患者姓名' },
    { name: 'clinic', label: '诊所', type: 'text', required: true, placeholder: '请输入诊所名称' },
    { name: 'implantType', label: '种植体型号', type: 'text', placeholder: '请输入种植体型号' },
    { name: 'status', label: '状态', type: 'select', options: FORM_STATUS, required: true }
  ]
};

// ---- 客户端：售后记录 ----
var CLIENT_SERVICE = {
  entity: 'clientService',
  title: '售后记录',
  breadcrumb: '首页 / 我的',
  pageSize: 5,
  searchFields: ['no', 'type', 'content'],
  searchPlaceholder: '搜索售后记录...',
  filterField: 'type',
  filterOptions: [
    { value: '退款申请', label: '退款申请' },
    { value: '质保维修', label: '质保维修' }
  ],
  exportName: '售后记录',
  addLabel: '新增售后',
  displayField: 'no',
  columns: [
    { field: 'no', label: '单号' },
    { field: 'type', label: '类型' },
    { field: 'content', label: '问题描述' },
    { field: 'amount', label: '金额', type: 'price' },
    { field: 'status', label: '状态', type: 'status' },
    { field: 'date', label: '日期' }
  ],
  formFields: [
    { name: 'no', label: '单号', type: 'text', required: true, placeholder: '请输入单号' },
    { name: 'type', label: '类型', type: 'select', options: [
      { value: '退款申请', label: '退款申请' },
      { value: '质保维修', label: '质保维修' }
    ], required: true },
    { name: 'content', label: '问题描述', type: 'text', required: true, placeholder: '请描述问题' },
    { name: 'amount', label: '金额', type: 'number', value: 0 },
    { name: 'status', label: '状态', type: 'select', options: [
      { value: 'pending', label: '待处理' },
      { value: 'processing', label: '处理中' },
      { value: 'active', label: '已解决' }
    ], required: true }
  ]
};


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
    { title: '病历中心', items: [
      { key: 'patientQuery', icon: '🗂️', name: '病人病历查询' }
    ]},
    { title: '财务', items: [
      { key: 'settlement', icon: '💰', name: '结算中心' },
      { key: 'reports', icon: '📊', name: '财务报表' }
    ]},
    { title: '系统', items: [
      { key: 'permissions', icon: '⚙️', name: '权限配置' },
      { key: 'regreview', icon: '📋', name: '注册审核', badge: '待审' },
      { key: 'accounts', icon: '🔑', name: '账号管理' },
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
      { key: 'patientQuery', icon: '🗂️', name: '病人信息查询' },
      { key: 'orders', icon: '📄', name: '加工单管理' },
      { key: 'tracking', icon: '📦', name: '订单跟踪' },
      { key: 'implants', icon: '🦷', name: '植体管理' }
    ]},
    { title: '财务', items: [
  { key: 'finance', icon: '💰', name: '收支明细' },
  { key: 'withdraw', icon: '💳', name: '提现申请' },
  { key: 'mall', icon: '🛍️', name: '商城' }
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
      { key: 'cards', icon: '💳', name: '种植卡库存' },
      { key: 'purchase', icon: '🛒', name: '采购管理' }
    ]},
    { title: '财务', items: [
      { key: 'withdraw', icon: '💸', name: '提现' },
      { key: 'mall', icon: '🛍️', name: '商城' }
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
    { title: '病历', items: [
      { key: 'patientQuery', icon: '🗂️', name: '病人病历查询' }
    ]},
    { title: '沟通', items: [
      { key: 'service', icon: '💬', name: '客服中心' }
    ]},
    { title: '财务', items: [
      { key: 'finance', icon: '💰', name: '财务收支' }
    ]}
  ],

  // ---------- 客户端 ----------
  client: [
    { title: '概览', items: [
      { key: 'home', icon: '🏠', name: '首页' }
    ]},
    { title: '小唯学院', items: [
      { key: 'knowledge', icon: '📚', name: '种植常识' },
      { key: 'about', icon: 'ℹ️', name: '关于小唯' }
    ]},
    { title: '我要种植', items: [
      { key: 'plant', icon: '🦷', name: '我要种植' }
    ]},
    { title: '小唯商场', items: [
      { key: 'mall', icon: '🛒', name: '商品兑换' }
    ]},
    { title: '我的', items: [
      { key: 'profile', icon: '👤', name: '个人中心' },
      { key: 'orders', icon: '📋', name: '我的订单' },
      { key: 'progress', icon: '📊', name: '种植进度' },
      { key: 'points', icon: '🎁', name: '我的积分', badge: '1268' },
      { key: 'cards', icon: '💳', name: '实体卡绑定' },
      { key: 'reviews', icon: '⭐', name: '我的评价' },
      { key: 'transactions', icon: '💰', name: '消费记录' },
      { key: 'service', icon: '🛠️', name: '售后质保' },
      { key: 'faq', icon: '❓', name: '常见问题' }
    ]}
  ]
};


// ==================== 病人信息查询（共享渲染器） ====================
// mode: 'full' = 诊所端（完整信息+病历），'restricted' = 工厂端/平台端（仅病历信息）

function _patientQueryPage(mode) {
  var patients = DB.getAll('patients');
  var isFull = mode === 'full';
  var pageTitle = isFull ? '病人信息查询' : '病人病历查询';
  var pageDesc = isFull ? '查看患者完整信息及病历记录' : '查看患者病历信息（仅病历数据，不含联系方式）';

  var html = '<div class="breadcrumb">首页 / <span>' + pageTitle + '</span></div>';

  // 统计卡片
  var totalPatients = patients.length;
  var implantPatients = patients.filter(function(p){ return p.implants > 0; }).length;
  var totalImplants = patients.reduce(function(s,p){ return s + (p.implants||0); }, 0);
  var surgeryDone = patients.filter(function(p){ return p.surgeryDate; }).length;

  html += '<div class="stats-grid">';
  html += '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">患者总数</span><div class="stat-card-icon blue">👤</div></div><div class="stat-card-value">' + totalPatients + '</div></div>';
  html += '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">种植患者</span><div class="stat-card-icon green">🦷</div></div><div class="stat-card-value">' + implantPatients + '</div></div>';
  html += '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">种植体总数</span><div class="stat-card-icon orange">📋</div></div><div class="stat-card-value">' + totalImplants + '</div></div>';
  html += '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">已手术</span><div class="stat-card-icon red">✅</div></div><div class="stat-card-value">' + surgeryDone + '</div></div>';
  html += '</div>';

  // 搜索栏
  html += '<div class="card">';
  html += '<div class="card-header"><span class="card-title">🗂️ ' + pageTitle + '</span></div>';
  html += '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">';
  html += '<input type="text" id="patientSearchInput" placeholder="搜索患者姓名、诊断、医生..." style="flex:1;min-width:200px;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;" oninput="filterPatientQuery(this.value)">';
  html += '<select id="patientFilterType" style="padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;" onchange="filterPatientQuery()">';
  html += '<option value="">全部类型</option>';
  html += '<option value="种植">种植</option>';
  html += '<option value="修复">修复</option>';
  html += '<option value="正畸">正畸</option>';
  html += '</select>';
  html += '</div>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">' + pageDesc + '</p>';

  // 患者列表
  html += '<div id="patientQueryList" data-full="' + (isFull ? '1' : '0') + '">';
  html += _renderPatientCards(patients, isFull);
  html += '</div>';

  html += '</div>';
  return html;
}

function _renderPatientCards(patients, isFull) {
  if (patients.length === 0) {
    return '<div style="padding:40px;text-align:center;color:var(--text-muted);">未找到匹配的患者记录</div>';
  }
  var html = '';
  patients.forEach(function(p) {
    var genderIcon = p.gender === '男' ? '👨' : '👩';
    var typeColor = p.treatmentType === '种植' ? 'green' : (p.treatmentType === '修复' ? 'blue' : 'orange');
    html += '<div class="patient-query-card" onclick="viewPatientDetail(' + p.id + ', ' + isFull + ')">';
    html += '<div class="patient-query-header">';
    html += '<div style="display:flex;align-items:center;gap:8px;">';
    html += '<span style="font-size:24px;">' + genderIcon + '</span>';
    html += '<div>';
    html += '<strong style="font-size:15px;">' + CRUD._esc(p.name) + '</strong>';
    html += ' <span style="font-size:12px;color:var(--text-muted);">' + p.gender + ' · ' + p.age + '岁</span>';
    html += '</div></div>';
    html += '<span class="status-tag ' + typeColor + '">' + CRUD._esc(p.treatmentType) + '</span>';
    html += '</div>';
    html += '<div class="patient-query-body">';
    html += '<div class="patient-query-info-row"><span class="patient-query-label">诊断：</span>' + CRUD._esc(p.diagnosis || '—') + '</div>';
    if (p.implantModel) {
      html += '<div class="patient-query-info-row"><span class="patient-query-label">种植体型号：</span>' + CRUD._esc(p.implantModel) + '</div>';
    }
    if (p.surgeryDate) {
      html += '<div class="patient-query-info-row"><span class="patient-query-label">手术日期：</span>' + CRUD._esc(p.surgeryDate) + '</div>';
    }
    html += '<div class="patient-query-info-row"><span class="patient-query-label">主治医生：</span>' + CRUD._esc(p.doctor || '—') + '</div>';
    if (isFull) {
      html += '<div class="patient-query-info-row"><span class="patient-query-label">联系电话：</span>' + CRUD._esc(p.phone) + '</div>';
    }
    html += '</div>';
    html += '<div style="text-align:right;font-size:12px;color:var(--primary);margin-top:8px;">点击查看详情 →</div>';
    html += '</div>';
  });
  return html;
}

function filterPatientQuery(keyword) {
  if (typeof keyword === 'string') {
    window._patientSearchKW = keyword;
  } else {
    keyword = window._patientSearchKW || '';
  }
  var typeFilter = '';
  var sel = document.getElementById('patientFilterType');
  if (sel) typeFilter = sel.value;

  var patients = DB.getAll('patients');
  var kw = keyword.toLowerCase().trim();
  var filtered = patients.filter(function(p) {
    var matchKW = !kw ||
      (p.name && p.name.toLowerCase().indexOf(kw) >= 0) ||
      (p.diagnosis && p.diagnosis.toLowerCase().indexOf(kw) >= 0) ||
      (p.doctor && p.doctor.toLowerCase().indexOf(kw) >= 0) ||
      (p.implantModel && p.implantModel.toLowerCase().indexOf(kw) >= 0);
    var matchType = !typeFilter || p.treatmentType === typeFilter;
    return matchKW && matchType;
  });

  var list = document.getElementById('patientQueryList');
  if (list) {
    var isFull = list.getAttribute('data-full') === '1';
    list.innerHTML = _renderPatientCards(filtered, isFull);
  }
}

function viewPatientDetail(id, isFull) {
  var p = DB.getById('patients', id);
  if (!p) return;

  var genderIcon = p.gender === '男' ? '👨' : '👩';
  var typeColor = p.treatmentType === '种植' ? 'green' : (p.treatmentType === '修复' ? 'blue' : 'orange');

  var html = '<div class="patient-detail-modal">';
  // 头部
  html += '<div class="patient-detail-header">';
  html += '<div style="display:flex;align-items:center;gap:12px;">';
  html += '<span style="font-size:36px;">' + genderIcon + '</span>';
  html += '<div>';
  html += '<h3 style="margin-bottom:4px;">' + CRUD._esc(p.name) + '</h3>';
  html += '<span style="font-size:13px;color:var(--text-muted);">' + p.gender + ' · ' + p.age + '岁 · 建档于 ' + CRUD._esc(p.createdAt) + '</span>';
  html += '</div></div>';
  html += '<span class="status-tag ' + typeColor + '">' + CRUD._esc(p.treatmentType) + '</span>';
  html += '</div>';

  // 基本信息区（仅诊所端完整模式显示联系方式）
  html += '<div class="patient-detail-section">';
  html += '<div class="patient-detail-section-title">📋 基本信息</div>';
  html += '<div class="patient-detail-grid">';
  html += '<div class="patient-detail-item"><div class="patient-detail-label">姓名</div><div class="patient-detail-value">' + CRUD._esc(p.name) + '</div></div>';
  html += '<div class="patient-detail-item"><div class="patient-detail-label">性别</div><div class="patient-detail-value">' + CRUD._esc(p.gender) + '</div></div>';
  html += '<div class="patient-detail-item"><div class="patient-detail-label">年龄</div><div class="patient-detail-value">' + p.age + ' 岁</div></div>';
  html += '<div class="patient-detail-item"><div class="patient-detail-label">治疗类型</div><div class="patient-detail-value">' + CRUD._esc(p.treatmentType) + '</div></div>';
  html += '<div class="patient-detail-item"><div class="patient-detail-label">种植体数量</div><div class="patient-detail-value">' + (p.implants||0) + ' 颗</div></div>';
  if (isFull) {
    html += '<div class="patient-detail-item"><div class="patient-detail-label">联系电话</div><div class="patient-detail-value"><a href="tel:' + p.phone + '" style="color:var(--primary);font-weight:600;">' + CRUD._esc(p.phone) + '</a></div></div>';
  }
  html += '</div></div>';

  // 病历信息区（所有端都显示）
  html += '<div class="patient-detail-section">';
  html += '<div class="patient-detail-section-title">🩺 病历信息</div>';
  html += '<div class="patient-detail-medical">';
  html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">🔍</span><div><div class="patient-detail-label">诊断</div><div class="patient-detail-value">' + CRUD._esc(p.diagnosis || '—') + '</div></div></div>';
  html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">📝</span><div><div class="patient-detail-label">治疗方案</div><div class="patient-detail-value">' + CRUD._esc(p.treatmentPlan || '—') + '</div></div></div>';
  if (p.surgeryDate) {
    html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">📅</span><div><div class="patient-detail-label">手术日期</div><div class="patient-detail-value">' + CRUD._esc(p.surgeryDate) + '</div></div></div>';
  }
  if (p.implantModel) {
    html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">🦷</span><div><div class="patient-detail-label">种植体型号</div><div class="patient-detail-value">' + CRUD._esc(p.implantModel) + '</div></div></div>';
  }
  html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">👨‍⚕️</span><div><div class="patient-detail-label">主治医生</div><div class="patient-detail-value">' + CRUD._esc(p.doctor || '—') + '</div></div></div>';
  html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">⚠️</span><div><div class="patient-detail-label">过敏史</div><div class="patient-detail-value">' + CRUD._esc(p.allergy || '无') + '</div></div></div>';
  html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">📋</span><div><div class="patient-detail-label">既往病史</div><div class="patient-detail-value">' + CRUD._esc(p.medicalHistory || '无特殊') + '</div></div></div>';
  html += '<div class="patient-detail-med-row"><span class="patient-detail-med-icon">💬</span><div><div class="patient-detail-label">备注</div><div class="patient-detail-value">' + CRUD._esc(p.notes || '—') + '</div></div></div>';
  html += '</div></div>';
  html += '</div>';

  UI.modal({ title: '病人详细信息', body: html, size: 'large' });
}


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

// 渲染注册审核卡片
function _renderRegCard(r) {
  var typeLabels = {
    clinic: '<span class="reg-review-type-badge clinic">🏥 诊所注册</span>',
    pharmacy: '<span class="reg-review-type-badge pharmacy">💊 药店注册</span>',
    dealer: '<span class="reg-review-type-badge dealer">👤 经销商注册</span>',
    client: '<span class="reg-review-type-badge client">📱 客户注册</span>'
  };
  var typeLabel = typeLabels[r.type] || typeLabels.clinic;
  var personLabels = { clinic: '负责人', pharmacy: '店长', dealer: '负责人', client: '昵称' };
  var orgLabels = { clinic: '诊所名称', pharmacy: '药店名称', dealer: '公司名称', client: '姓名' };
  var personLabel = personLabels[r.type] || '负责人';
  var orgLabel = orgLabels[r.type] || '名称';

  // 营业资质预览
  var licenseHtml = '';
  if (r.licenseData) {
    if (r.licenseData.indexOf('pdf') !== -1 || r.licenseData.indexOf('PDF') !== -1) {
      licenseHtml = '<div class="reg-review-license"><div class="pdf-icon">📄</div><div style="text-align:center;font-size:12px;color:var(--text-muted);margin-top:4px;">' + CRUD._esc(r.licenseName || '营业执照.pdf') + '</div></div>';
    } else {
      licenseHtml = '<div class="reg-review-license"><div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">营业执照（点击查看大图）：</div><img src="' + r.licenseData + '" alt="营业执照" onclick="viewLicenseImage(\'' + r.id + '\')" style="cursor:pointer;"></div>';
    }
  } else {
    licenseHtml = '<div class="reg-review-license"><div style="color:var(--text-muted);font-size:13px;">未上传资质文件</div></div>';
  }

  var html = '<div class="reg-review-card">';
  html += '<div class="reg-review-header">';
  html += '<div><strong style="font-size:15px;">' + CRUD._esc(r.orgName) + '</strong> &nbsp;' + typeLabel + '</div>';
  html += '<span class="status-tag pending">待审核</span>';
  html += '</div>';
  html += '<div class="reg-review-info">';
  html += '<div><span class="label">登录账号：</span><span class="value">' + CRUD._esc(r.account) + '</span></div>';
  html += '<div><span class="label">' + orgLabel + '：</span><span class="value">' + CRUD._esc(r.orgName) + '</span></div>';
  html += '<div><span class="label">' + personLabel + '：</span><span class="value">' + CRUD._esc(r.person) + '</span></div>';
  html += '<div><span class="label">联系电话：</span><span class="value">' + CRUD._esc(r.phone) + '</span></div>';
  html += '<div><span class="label">所在地区：</span><span class="value">' + CRUD._esc(r.region) + '</span></div>';
  html += '<div><span class="label">详细地址：</span><span class="value">' + CRUD._esc(r.address || '—') + '</span></div>';
  html += '<div><span class="label">提交日期：</span><span class="value">' + CRUD._esc(r.submittedAt) + '</span></div>';
  html += '</div>';
  html += licenseHtml;
  html += '<div class="reg-review-actions">';
  html += '<button class="btn btn-danger btn-sm" onclick="rejectReg(' + r.id + ')">拒绝</button>';
  html += '<button class="btn btn-primary btn-sm" onclick="approveReg(' + r.id + ')">通过审核</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

// 查看营业执照大图
function viewLicenseImage(id) {
  var r = DB.getById('registrations', parseInt(id));
  if (!r || !r.licenseData) { UI.toast.error('资质文件不存在'); return; }
  UI.modal({
    title: '营业执照查看 - ' + (r.orgName || ''),
    body: '<img src="' + r.licenseData + '" alt="营业执照" style="width:100%;">',
    size: 'large',
    footer: '<button class="btn btn-primary" onclick="UI.closeModal()">关闭</button>'
  });
}

// 查看注册详情
function viewRegDetail(id) {
  var r = DB.getById('registrations', id);
  if (!r) { UI.toast.error('记录不存在'); return; }
  var typeLabels = { clinic: '诊所注册', pharmacy: '药店注册', dealer: '经销商注册', client: '客户注册' };
  var personLabels = { clinic: '负责人', pharmacy: '店长', dealer: '负责人', client: '昵称' };
  var typeLabel = typeLabels[r.type] || '注册';
  var personLabel = personLabels[r.type] || '负责人';
  var statusLabel = r.status === 'approved' ? '已通过' : (r.status === 'rejected' ? '已拒绝' : '待审核');

  var body = '<table class="ui-detail-table">';
  body += '<tr><td class="ui-detail-label">注册类型</td><td class="ui-detail-value">' + typeLabel + '</td></tr>';
  body += '<tr><td class="ui-detail-label">登录账号</td><td class="ui-detail-value">' + CRUD._esc(r.account) + '</td></tr>';
  body += '<tr><td class="ui-detail-label">名称</td><td class="ui-detail-value">' + CRUD._esc(r.orgName) + '</td></tr>';
  body += '<tr><td class="ui-detail-label">' + personLabel + '</td><td class="ui-detail-value">' + CRUD._esc(r.person) + '</td></tr>';
  body += '<tr><td class="ui-detail-label">联系电话</td><td class="ui-detail-value">' + CRUD._esc(r.phone) + '</td></tr>';
  body += '<tr><td class="ui-detail-label">所在地区</td><td class="ui-detail-value">' + CRUD._esc(r.region) + '</td></tr>';
  body += '<tr><td class="ui-detail-label">详细地址</td><td class="ui-detail-value">' + CRUD._esc(r.address || '—') + '</td></tr>';
  body += '<tr><td class="ui-detail-label">提交日期</td><td class="ui-detail-value">' + CRUD._esc(r.submittedAt) + '</td></tr>';
  body += '<tr><td class="ui-detail-label">审核状态</td><td class="ui-detail-value">' + statusLabel + '</td></tr>';
  body += '</table>';

  if (r.licenseData) {
    body += '<div style="margin-top:16px;"><div style="font-size:13px;font-weight:600;margin-bottom:8px;">营业资质：</div>';
    if (r.licenseData.indexOf('pdf') !== -1 || r.licenseData.indexOf('PDF') !== -1) {
      body += '<div style="text-align:center;font-size:48px;">📄</div>';
    } else {
      body += '<img src="' + r.licenseData + '" alt="营业执照" style="width:100%;border-radius:8px;border:1px solid var(--border);">';
    }
    body += '</div>';
  }

  UI.modal({
    title: '注册详情',
    body: body,
    size: 'large',
    footer: '<button class="btn btn-primary" onclick="UI.closeModal()">关闭</button>'
  });
}

// 审核通过
function approveReg(id) {
  var r = DB.getById('registrations', id);
  if (!r) { UI.toast.error('记录不存在'); return; }
  UI.confirm(
    '确定通过「' + r.orgName + '」的注册申请吗？通过后该账号即可登录使用。',
    function() {
      DB.update('registrations', id, { status: 'approved' });
      // 将注册用户添加到对应的数据表中
      if (r.type === 'clinic') {
        DB.add('clinics', {
          name: r.orgName,
          owner: r.person,
          phone: r.phone,
          region: r.region,
          implantsUsed: 0,
          status: 'active'
        });
      } else if (r.type === 'pharmacy') {
        DB.add('pharmacies', {
          name: r.orgName,
          manager: r.person,
          phone: r.phone,
          region: r.region,
          cardSales: 0,
          status: 'active'
        });
      } else if (r.type === 'dealer') {
        DB.add('dealers', {
          name: r.orgName,
          manager: r.person,
          phone: r.phone,
          region: r.region,
          salesAmount: 0,
          status: 'active'
        });
      }
      // 添加到可登录账号
      if (typeof ACCOUNTS !== 'undefined') {
        var port = r.type;
        var avatarChar = r.person ? r.person.charAt(0) : '新';
        ACCOUNTS[r.account] = {
          password: r.password,
          name: r.person,
          avatar: avatarChar,
          role: port,
          ports: [port]
        };
      }
      UI.toast.success('已通过审核，账号 ' + r.account + ' 现可登录');
      loadPage();
    },
    '确认通过审核'
  );
}

// 审核拒绝
function rejectReg(id) {
  var r = DB.getById('registrations', id);
  if (!r) { UI.toast.error('记录不存在'); return; }
  UI.confirm(
    '确定拒绝「' + r.orgName + '」的注册申请吗？',
    function() {
      DB.update('registrations', id, { status: 'rejected' });
      UI.toast.info('已拒绝该注册申请');
      loadPage();
    },
    '确认拒绝'
  );
}

// 创建账号弹窗
function openCreateAccountModal() {
  var body = '<div class="form-group"><label>账号 <span class="reg-required">*</span></label>';
  body += '<input type="text" id="newAccount" placeholder="字母或数字，3-20位"></div>';
  body += '<div class="form-group"><label>姓名 <span class="reg-required">*</span></label>';
  body += '<input type="text" id="newName" placeholder="请输入姓名"></div>';
  body += '<div class="form-group"><label>密码 <span class="reg-required">*</span></label>';
  body += '<input type="password" id="newPassword" placeholder="至少6位"></div>';
  body += '<div class="form-group"><label>分配端口 <span class="reg-required">*</span></label>';
  body += '<select id="newPort" class="form-control" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:14px;">';
  body += '<option value="factory">🏭 工厂端</option>';
  body += '<option value="platform">🏠 平台端（小唯其他部门）</option>';
  body += '<option value="clinic">🏥 诊所端</option>';
  body += '<option value="dealer">👤 经销商端</option>';
  body += '<option value="pharmacy">💊 药店端</option>';
  body += '<option value="client">📱 客户端</option>';
  body += '</select></div>';
  body += '<div id="createAcctError" class="login-error" style="display:none;"></div>';

  UI.modal({
    title: '创建账号',
    body: body,
    footer: '<button class="btn btn-outline" onclick="UI.closeModal()">取消</button><button class="btn btn-primary" onclick="doCreateAccount()">创建</button>'
  });
}

// 执行创建账号
function doCreateAccount() {
  var account = document.getElementById('newAccount').value.trim();
  var name = document.getElementById('newName').value.trim();
  var password = document.getElementById('newPassword').value;
  var port = document.getElementById('newPort').value;
  var errEl = document.getElementById('createAcctError');

  if (!account || !/^[a-zA-Z0-9_]{3,20}$/.test(account)) {
    errEl.textContent = '账号只能使用字母、数字和下划线，3-20位';
    errEl.style.display = 'block';
    return;
  }
  if (!name) {
    errEl.textContent = '请输入姓名';
    errEl.style.display = 'block';
    return;
  }
  if (!password || password.length < 6) {
    errEl.textContent = '密码至少需要6位';
    errEl.style.display = 'block';
    return;
  }

  if (typeof ACCOUNTS !== 'undefined' && ACCOUNTS[account]) {
    errEl.textContent = '该账号已存在，请更换';
    errEl.style.display = 'block';
    return;
  }

  if (typeof ACCOUNTS !== 'undefined') {
    ACCOUNTS[account] = {
      password: password,
      name: name,
      avatar: name ? name.charAt(0) : '新',
      role: port,
      ports: [port]
    };
  }

  UI.closeModal();
  UI.toast.success('账号 ' + account + ' 创建成功');
  loadPage();
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
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>` +
_homeStats([
  { label:'合作诊所', value: clinics.length, icon:'🏥', color:'green', change:'↑ 12.5% 较上月' },
  { label:'合作药店', value: pharmacies.length, icon:'💊', color:'blue', change:'↑ 8.3% 较上月' },
  { label:'合作经销商', value: dealers.length, icon:'👤', color:'orange', change:'↑ 1 本季新增' },
  { label:'平台营收', value:'¥2,856,300', icon:'💰', color:'red', change:'↑ 18.6% 较上月' }
]) + `
<div class="card">
  <div class="card-header"><span class="card-title">最近注册诊所</span><button class="btn btn-outline btn-sm" onclick="navigateTo('clinics')">查看全部</button></div>
  <table class="data-table">
    <thead><tr><th>诊所名称</th><th>负责人</th><th>联系电话</th><th>地区</th><th>状态</th><th>注册时间</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
    },

    clinics: function() { return CRUD.builder('platform_clinics', PLATFORM_CLINICS); },
    pharmacy: function() { return CRUD.builder('platform_pharmacy', PLATFORM_PHARMACY); },

    factory: function() {
      var factories = DB.getAll('factories');
      var f = factories[0] || { name:'小唯精密制造有限公司', owner:'孙志强', phone:'138-8888-0001', address:'广东省东莞市松山湖科技产业园', monthlyCapacity:12000, status:'active' };
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>工厂详情</span></div>` +
_homeStats([
  { label:'合作工厂', value: factories.length, icon:'🏭', color:'green', change:'↑ 1 本季新增' },
  { label:'月产能', value: (f.monthlyCapacity||0).toLocaleString(), icon:'⚙️', color:'blue', change:'↑ 9.2%' },
  { label:'本月产出', value:'10,860', icon:'📦', color:'orange', change:'↑ 7.8%' },
  { label:'平均合格率', value:'98.5%', icon:'✅', color:'red', change:'↑ 0.3%' }
]) + `
<div class="two-col">
  <div class="card">
    <div class="card-header"><span class="card-title">工厂信息</span><button class="btn btn-outline btn-sm" onclick="UI.toast.info('编辑功能开发中')">编辑</button></div>
    <table class="data-table"><tbody>
      <tr><th style="width:120px;">工厂名称</th><td>${CRUD._esc(f.name)}</td></tr>
      <tr><th>负责人</th><td>${CRUD._esc(f.owner)}</td></tr>
      <tr><th>联系电话</th><td>${CRUD._esc(f.phone)}</td></tr>
      <tr><th>工厂地址</th><td>${CRUD._esc(f.address)}</td></tr>
      <tr><th>月产能</th><td>${(f.monthlyCapacity||0).toLocaleString()} 颗</td></tr>
      <tr><th>合作状态</th><td>${CRUD._statusTag(f.status)}</td></tr>
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
</div>`;
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
      return `
<div class="breadcrumb">首页 / 业务管理 / <span>商场管理</span></div>
<div class="card">
  <div class="card-header">
    <span class="card-title">商品列表</span>
    <button class="btn btn-primary btn-sm" onclick="CRUD.showAdd('platform_mall')">+ 上架商品</button>
  </div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">${cards}</div>
</div>`;
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
      return `
<div class="breadcrumb">首页 / 财务 / <span>财务报表</span></div>` +
_homeStats([
  { label:'本月总收入', value:'¥2,856,300', icon:'📈', color:'green', change:'↑ 18.6%' },
  { label:'本月总支出', value:'¥1,892,500', icon:'📉', color:'red', change:'↑ 10.2%' },
  { label:'净利润', value:'¥963,800', icon:'💰', color:'blue', change:'↑ 35.4%' },
  { label:'利润率', value:'33.8%', icon:'📊', color:'orange', change:'↑ 4.2%' }
]) + `
<div class="chart-row">` +
_barChart([186,215,248,198,267,312,289,341], ['1月','2月','3月','4月','5月','6月','7月','8月']) + `
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
  <div class="card-header"><span class="card-title">收入明细</span><button class="btn btn-outline btn-sm" onclick="CRUD.exportCSV('platform_settlement')">导出报表</button></div>
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
</div>`;
    },

    permissions: function() { return CRUD.builder('platform_permissions', PLATFORM_PERMISSIONS); },
    notifications: function() { return CRUD.builder('platform_notifications', PLATFORM_NOTIFICATIONS); },

    regreview: function() {
      var regs = DB.getAll('registrations');
      var pending = regs.filter(function(r){ return r.status === 'pending'; });
      var approved = regs.filter(function(r){ return r.status === 'approved'; });
      var rejected = regs.filter(function(r){ return r.status === 'rejected'; });

      var html = '<div class="breadcrumb">首页 / 系统 / <span>注册审核</span></div>';
      html += _homeStats([
        { label:'待审核', value: pending.length, icon:'⏳', color:'orange' },
        { label:'已通过', value: approved.length, icon:'✅', color:'green' },
        { label:'已拒绝', value: rejected.length, icon:'❌', color:'red' },
        { label:'总申请', value: regs.length, icon:'📋', color:'blue' }
      ]);

      if (regs.length === 0) {
        html += '<div class="card"><div style="padding:40px;text-align:center;color:var(--text-muted);">';
        html += '<div style="font-size:40px;margin-bottom:12px;">📋</div>';
        html += '<div style="font-size:14px;">暂无注册申请</div>';
        html += '</div></div>';
        return html;
      }

      // 渲染待审核的卡片
      if (pending.length > 0) {
        html += '<div class="card"><div class="card-header"><span class="card-title">待审核申请（' + pending.length + '）</span></div>';
        pending.forEach(function(r) {
          html += _renderRegCard(r);
        });
        html += '</div>';
      }

      // 已处理的记录
      var processed = approved.concat(rejected);
      if (processed.length > 0) {
        html += '<div class="card"><div class="card-header"><span class="card-title">已处理记录（' + processed.length + '）</span></div>';
        html += '<table class="data-table"><thead><tr><th>账号</th><th>类型</th><th>名称</th><th>负责人</th><th>电话</th><th>地区</th><th>状态</th><th>提交日期</th><th>操作</th></tr></thead><tbody>';
        processed.forEach(function(r) {
          var typeLabels = {
            clinic: '<span class="reg-review-type-badge clinic">诊所</span>',
            pharmacy: '<span class="reg-review-type-badge pharmacy">药店</span>',
            dealer: '<span class="reg-review-type-badge dealer">经销商</span>',
            client: '<span class="reg-review-type-badge client">客户</span>'
          };
          var typeLabel = typeLabels[r.type] || typeLabels.clinic;
          var statusLabel = r.status === 'approved'
            ? '<span class="status-tag active">已通过</span>'
            : '<span class="status-tag inactive">已拒绝</span>';
          html += '<tr>';
          html += '<td>' + CRUD._esc(r.account) + '</td>';
          html += '<td>' + typeLabel + '</td>';
          html += '<td>' + CRUD._esc(r.orgName) + '</td>';
          html += '<td>' + CRUD._esc(r.person) + '</td>';
          html += '<td>' + CRUD._esc(r.phone) + '</td>';
          html += '<td>' + CRUD._esc(r.region) + '</td>';
          html += '<td>' + statusLabel + '</td>';
          html += '<td>' + CRUD._esc(r.submittedAt) + '</td>';
          html += '<td><button class="btn btn-outline btn-sm" onclick="viewRegDetail(' + r.id + ')">查看</button></td>';
          html += '</tr>';
        });
        html += '</tbody></table></div>';
      }

      return html;
    },

    accounts: function() {
      var html = '<div class="breadcrumb">首页 / 系统 / <span>账号管理</span></div>';
      html += '<div class="card"><div class="card-header"><span class="card-title">创建账号</span>';
      html += '<button class="btn btn-primary btn-sm" onclick="openCreateAccountModal()" style="float:right;">+ 创建账号</button>';
      html += '</div>';
      html += '<div style="padding:16px;color:var(--text-muted);font-size:13px;">管理员可为工厂端和小唯其他部门人员创建登录账号，注册审核通过的诊所/药店/经销商账号也会在此显示。</div>';
      html += '</div>';

      // 列出所有账号
      var accountList = [];
      if (typeof ACCOUNTS !== 'undefined') {
        for (var key in ACCOUNTS) {
          var u = ACCOUNTS[key];
          accountList.push({ account: key, name: u.name, role: u.role, ports: (u.ports || []).join(', ') });
        }
      }

      html += '<div class="card"><div class="card-header"><span class="card-title">账号列表（' + accountList.length + '）</span></div>';
      html += '<table class="data-table"><thead><tr><th>账号</th><th>姓名</th><th>角色</th><th>可访问端口</th><th>来源</th></tr></thead><tbody>';
      var roleLabels = {
        super: '超级管理员', clinic: '诊所', dealer: '经销商', pharmacy: '药店',
        factory: '工厂', client: '客户', platform: '平台'
      };
      accountList.forEach(function(a) {
        var isBuiltin = ['admin','clinic','dealer','pharmacy','factory','client'].indexOf(a.account) !== -1;
        var source = isBuiltin ? '<span class="status-tag active">内置</span>' : '<span class="status-tag" style="background:var(--primary-light);color:var(--primary-dark);">新增</span>';
        html += '<tr>';
        html += '<td>' + CRUD._esc(a.account) + '</td>';
        html += '<td>' + CRUD._esc(a.name) + '</td>';
        html += '<td>' + (roleLabels[a.role] || a.role) + '</td>';
        html += '<td>' + CRUD._esc(a.ports) + '</td>';
        html += '<td>' + source + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return html;
    },

    patientQuery: function() { return _patientQueryPage('restricted'); }
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
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>` +
_homeStats([
  { label:'今日核销', value: records.filter(function(r){ return r.time && r.time.indexOf(DB._today())>=0; }).length, icon:'📋', color:'green', change:'今日完成' },
  { label:'患者总数', value: patients.length, icon:'👤', color:'blue', change:'↑ 3 本周新增' },
  { label:'加工单', value: orders.filter(function(o){ return o.status==='pending'; }).length + ' 待处理', icon:'📄', color:'orange' },
  { label:'植体库存', value: implants.reduce(function(s,i){ return s+(i.stock||0); }, 0), icon:'🦷', color:'red' }
]) + `
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('verify')"><div class="icon green">📋</div><div class="name">核销登记</div><div class="desc">3 笔待核销</div></div>
  <div class="quick-item" onclick="navigateTo('patients')"><div class="icon blue">👤</div><div class="name">患者建档</div><div class="desc">${patients.length} 位患者</div></div>
  <div class="quick-item" onclick="navigateTo('orders')"><div class="icon orange">📄</div><div class="name">加工单管理</div><div class="desc">${orders.length} 单</div></div>
  <div class="quick-item" onclick="navigateTo('implants')"><div class="icon purple">🦷</div><div class="name">植体管理</div><div class="desc">${implants.length} 个型号</div></div>
  <div class="quick-item" onclick="navigateTo('finance')"><div class="icon teal">💰</div><div class="name">收支明细</div><div class="desc">财务统计</div></div>
</div>`;
    },

    verify: function() { return CRUD.builder('clinic_verify', CLINIC_VERIFY); },
    patients: function() { return CRUD.builder('clinic_patients', CLINIC_PATIENTS); },
    patientQuery: function() { return _patientQueryPage('full'); },
    orders: function() { return CRUD.builder('clinic_orders', CLINIC_ORDERS); },

    tracking: function() {
      var orders = DB.getAll('orders');
      var stages = [
        { name:'待接单', count: orders.filter(function(o){return o.status==='pending';}).length, icon:'📥', color:'orange' },
        { name:'加工中', count: orders.filter(function(o){return o.status==='processing';}).length, icon:'⚙️', color:'blue' },
        { name:'已发货', count: orders.filter(function(o){return o.status==='active';}).length, icon:'📦', color:'green' },
        { name:'已签收', count: 0, icon:'✅', color:'teal' }
      ];
      return `
<div class="breadcrumb">首页 / 业务 / <span>订单跟踪</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">订单跟踪</span><button class="btn btn-outline btn-sm" onclick="navigateTo('orders')">查看全部订单</button></div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">` +
    stages.map(function(s) {
      return '<div class="quick-item"><div class="icon ' + s.color + '">' + s.icon + '</div><div class="name">' + s.name + '</div><div class="desc">' + s.count + ' 单</div></div>';
    }).join('') + `
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">物流时间线</span></div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>患者</th><th>型号</th><th>状态</th><th>创建日期</th></tr></thead>
    <tbody>` +
      orders.slice(-5).reverse().map(function(o) {
        return '<tr><td>' + CRUD._esc(o.no) + '</td><td>' + CRUD._esc(o.patient) + '</td><td>' + CRUD._esc(o.implantType) + '</td><td>' + CRUD._statusTag(o.status) + '</td><td>' + CRUD._esc(o.createdAt) + '</td></tr>';
      }).join('') + `
    </tbody>
  </table>
</div>`;
    },

    implants: function() { return CRUD.builder('clinic_implants', CLINIC_IMPLANTS); },
    finance: function() { return CRUD.builder('clinic_finance', CLINIC_FINANCE); },
    withdraw: function() { return CRUD.builder('clinic_withdraw', CLINIC_WITHDRAW); },

  mall: function() {
    var products = typeof shopProducts !== 'undefined' ? shopProducts : DB.getAll('products');
    var productHtml = products.map(function(p) {
      var priceHtml = p.originalPrice && p.originalPrice > p.price
        ? '<span style="color:#ff4400;font-weight:700;font-size:16px;">¥' + p.price + '</span><span style="color:#999;text-decoration:line-through;font-size:12px;margin-left:6px;">¥' + p.originalPrice + '</span>'
        : '<span style="color:#ff4400;font-weight:700;font-size:16px;">¥' + p.price + '</span>';
      var imgHtml = p.img
        ? '<img src="' + p.img + '" alt="' + (p.name||'') + '" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'🦷\'" style="width:100%;height:100%;object-fit:cover;">'
        : '🦷';
      var tagHtml = p.tag ? '<span class="product-tag">' + p.tag + '</span>' : '';
      return '<div class="mall-product-card">' +
        '<div class="mall-product-img">' + imgHtml + '</div>' +
        '<div class="mall-product-name">' + (p.name||'') + '</div>' +
        '<div class="mall-product-meta">' + tagHtml + priceHtml + '</div>' +
        '</div>';
    }).join('');
    return '' +
      '<div class="breadcrumb">首页 / 财务 / <span>商城</span></div>' +
      '<div class="card">' +
      '<div class="card-header"><span class="card-title">商品浏览</span></div>' +
      '<div class="mall-product-grid">' + productHtml + '</div>' +
      '</div>';
  },

  settings: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>诊所设置</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">诊所基本信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>诊所名称</label><input type="text" value="仁爱口腔诊所" placeholder="诊所名称"></div>
    <div class="form-group"><label>负责人</label><input type="text" value="李明华" placeholder="负责人"></div>
    <div class="form-group"><label>联系电话</label><input type="text" value="138-0011-2233" placeholder="联系电话"></div>
    <div class="form-group"><label>地区</label><input type="text" value="浙江杭州" placeholder="地区"></div>
    <div class="form-group"><label>诊所地址</label><textarea placeholder="详细地址">浙江省杭州市西湖区文三路100号</textarea></div>
    <button class="btn btn-primary" onclick="UI.toast.success('设置已保存')">保存设置</button>
  </div>
</div>`;
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
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>` +
_homeStats([
  { label:'诊所客户', value: clinics.length, icon:'🏥', color:'green', change:'↑ 5 本月' },
  { label:'药房客户', value: pharmacies.length, icon:'💊', color:'blue', change:'↑ 3 本月' },
  { label:'累计佣金', value:'¥' + totalCommission.toLocaleString(), icon:'💰', color:'orange', change:'↑ 15.2%' },
  { label:'待提现', value:'¥45,600', icon:'💳', color:'red', change:'1 笔待审' }
]) + `
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('clinics')"><div class="icon green">🏥</div><div class="name">诊所管理</div><div class="desc">${clinics.length} 家</div></div>
  <div class="quick-item" onclick="navigateTo('pharmacy')"><div class="icon blue">💊</div><div class="name">药房管理</div><div class="desc">${pharmacies.length} 家</div></div>
  <div class="quick-item" onclick="navigateTo('commission')"><div class="icon orange">💰</div><div class="name">佣金明细</div><div class="desc">收益统计</div></div>
  <div class="quick-item" onclick="navigateTo('withdraw')"><div class="icon teal">💳</div><div class="name">提现申请</div><div class="desc">1 笔待审</div></div>
</div>`;
    },

    clinics: function() { return CRUD.builder('dealer_clinics', DEALER_CLINICS); },
    pharmacy: function() { return CRUD.builder('dealer_pharmacy', DEALER_PHARMACY); },

    sales: function() {
      var dealers = DB.getAll('dealers');
      return `
<div class="breadcrumb">首页 / 客户 / <span>销售活动</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">销售活动概览</span><button class="btn btn-primary btn-sm" onclick="UI.toast.info('新建活动功能开发中')">+ 新建活动</button></div>
  <table class="data-table">
    <thead><tr><th>经销商</th><th>区域</th><th>诊所客户</th><th>药房客户</th><th>佣金累计</th><th>状态</th><th>操作</th></tr></thead>
    <tbody>` +
      dealers.map(function(d) {
        return '<tr><td>' + CRUD._esc(d.name) + '</td><td>' + CRUD._esc(d.region) + '</td><td>' + CRUD._dash(d.clinicClients) + '</td><td>' + CRUD._dash(d.pharmacyClients) + '</td><td>¥' + (d.commission||0).toLocaleString() + '</td><td>' + CRUD._statusTag(d.status) + '</td><td><button class="btn btn-outline btn-sm" onclick="UI.toast.info(\'查看详情\')">查看</button></td></tr>';
      }).join('') + `
    </tbody>
  </table>
</div>`;
    },

    commission: function() { return CRUD.builder('dealer_commission', DEALER_COMMISSION); },
    withdraw: function() { return CRUD.builder('dealer_withdraw', DEALER_WITHDRAW); },

    settings: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>个人设置</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">个人信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>姓名</label><input type="text" value="张明华" placeholder="姓名"></div>
    <div class="form-group"><label>负责区域</label><input type="text" value="华东区域" placeholder="负责区域"></div>
    <div class="form-group"><label>联系电话</label><input type="text" value="138-0011-2233" placeholder="联系电话"></div>
    <div class="form-group"><label>收款银行</label><input type="text" value="工商银行 尾号 8862" placeholder="收款银行"></div>
    <button class="btn btn-primary" onclick="UI.toast.success('设置已保存')">保存设置</button>
  </div>
</div>`;
    }
  },

  // ================================================================
  //  药店端 (pharmacy)
  // ================================================================
  pharmacy: {

    home: function() {
      var cards = DB.getAll('cards');
      var remainingCards = cards.filter(function(c){ return c.status !== 'inactive'; });
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>` +
_homeStats([
  { label:'剩余种植卡', value: remainingCards.length, icon:'💳', color:'green', change:'↑ 8.3%' },
  { label:'已激活', value: cards.filter(function(c){return c.status==='active';}).length, icon:'✅', color:'blue' },
  { label:'待核销', value: cards.filter(function(c){return c.status==='processing';}).length, icon:'⏳', color:'orange' },
  { label:'待提现', value:'¥56,200', icon:'💳', color:'red', change:'1 笔待审' }
]) + `
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('cards')"><div class="icon green">💳</div><div class="name">种植卡库存</div><div class="desc">${remainingCards.length} 张</div></div>
  <div class="quick-item" onclick="navigateTo('purchase')"><div class="icon orange">🛒</div><div class="name">采购管理</div><div class="desc">下单采购</div></div>
  <div class="quick-item" onclick="navigateTo('withdraw')"><div class="icon red">💸</div><div class="name">提现</div><div class="desc">¥56,200</div></div>
  <div class="quick-item" onclick="navigateTo('mall')"><div class="icon teal">🛍️</div><div class="name">商城</div><div class="desc">商品浏览</div></div>
</div>`;
    },

    cards: function() {
      var allCards = DB.getAll('cards');
      var cards = allCards.filter(function(c){ return c.status !== 'inactive'; });
      var statusMap = {};
      STATUS_OPTS_CARD.forEach(function(o){ statusMap[o.value] = o.label; });
      var rows = cards.map(function(c) {
        return '<tr>' +
          '<td>' + CRUD._esc(c.cardNo || '') + '</td>' +
          '<td>' + CRUD._esc(c.implantType || '') + '</td>' +
          '<td>' + CRUD._esc(c.issueDate || '') + '</td>' +
          '<td><span class="status-tag ' + (c.status || '') + '">' + (statusMap[c.status] || c.status || '') + '</span></td>' +
        '</tr>';
      }).join('');
      return `
<div class="breadcrumb">首页 / 商品 / <span>种植卡库存</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">种植卡库存（剩余 ${cards.length} 张）</span></div>
  <div class="table-wrap">
    <table class="data-table">
      <thead><tr><th>卡号</th><th>植体型号</th><th>发卡日期</th><th>激活状态</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="4" style="text-align:center;color:#999;padding:40px;">暂无库存</td></tr>'}</tbody>
    </table>
  </div>
</div>`;
    },

    purchase: function() { return CRUD.builder('pharmacy_purchase', PHARMACY_PURCHASE); },

    withdraw: function() {
      return `
<div class="breadcrumb">首页 / 财务 / <span>提现</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">提现申请</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>可提现余额</label><input type="text" value="¥56,200" readonly style="background:#f5f5f5;"></div>
    <div class="form-group"><label>提现金额</label><input type="number" placeholder="请输入提现金额"></div>
    <div class="form-group"><label>收款银行</label><input type="text" value="工商银行 尾号 8862" placeholder="收款银行"></div>
    <button class="btn btn-primary" onclick="UI.toast.success('提现申请已提交')">提交申请</button>
  </div>
</div>`;
    },

    mall: function() {
      var products = typeof shopProducts !== 'undefined' ? shopProducts : DB.getAll('products');
      var productHtml = products.map(function(p) {
        var priceHtml = p.originalPrice && p.originalPrice > p.price
          ? '<span style="color:#ff4400;font-weight:700;font-size:16px;">¥' + p.price + '</span><span style="color:#999;text-decoration:line-through;font-size:12px;margin-left:6px;">¥' + p.originalPrice + '</span>'
          : '<span style="color:#ff4400;font-weight:700;font-size:16px;">¥' + p.price + '</span>';
        var imgHtml = p.img
          ? '<img src="' + p.img + '" alt="' + (p.name||'') + '" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'🦷\'" style="width:100%;height:100%;object-fit:cover;">'
          : '🦷';
        var tagHtml = p.tag ? '<span class="product-tag">' + p.tag + '</span>' : '';
        return '<div class="mall-product-card">' +
          '<div class="mall-product-img">' + imgHtml + '</div>' +
          '<div class="mall-product-name">' + (p.name||'') + '</div>' +
          '<div class="mall-product-meta">' + tagHtml + priceHtml + '</div>' +
        '</div>';
      }).join('');
      return '' +
'<div class="breadcrumb">首页 / 财务 / <span>商城</span></div>' +
'<div class="card">' +
  '<div class="card-header"><span class="card-title">商品浏览</span></div>' +
  '<div class="mall-product-grid">' + productHtml + '</div>' +
'</div>';
    },

    customers: function() { return CRUD.builder('pharmacy_customers', PHARMACY_CUSTOMERS); },

    settings: function() {
      return `
<div class="breadcrumb">首页 / 系统 / <span>门店设置</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">门店信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>药店名称</label><input type="text" value="健佳大药房" placeholder="药店名称"></div>
    <div class="form-group"><label>店长</label><input type="text" value="周明" placeholder="店长"></div>
    <div class="form-group"><label>联系电话</label><input type="text" value="138-1122-3344" placeholder="联系电话"></div>
    <div class="form-group"><label>地区</label><input type="text" value="浙江杭州" placeholder="地区"></div>
    <div class="form-group"><label>门店地址</label><textarea placeholder="详细地址">浙江省杭州市拱墅区莫干山路200号</textarea></div>
    <button class="btn btn-primary" onclick="UI.toast.success('设置已保存')">保存设置</button>
  </div>
</div>`;
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
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>` +
_homeStats([
  { label:'待处理订单', value: pending, icon:'📥', color:'orange', change:'待接单' },
  { label:'加工中', value: processing, icon:'⚙️', color:'blue', change:'生产中' },
  { label:'已出货', value: active, icon:'📦', color:'green', change:'已发货' },
  { label:'库存总量', value: implants.reduce(function(s,i){return s+(i.stock||0);},0), icon:'🏭', color:'red' }
]) + `
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('orders')"><div class="icon green">📋</div><div class="name">订单管理</div><div class="desc">${orders.length} 单</div></div>
  <div class="quick-item" onclick="navigateTo('shipping')"><div class="icon blue">📦</div><div class="name">收发货管理</div><div class="desc">物流跟踪</div></div>
  <div class="quick-item" onclick="navigateTo('production')"><div class="icon orange">🏭</div><div class="name">生产排产</div><div class="desc">排产计划</div></div>
  <div class="quick-item" onclick="navigateTo('quality')"><div class="icon teal">✅</div><div class="name">质检记录</div><div class="desc">质量追溯</div></div>
</div>`;
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
      return `
<div class="breadcrumb">首页 / 生产 / <span>生产排产</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">生产排产看板</span></div>
  <div class="quick-grid" style="grid-template-columns:repeat(4,1fr);">` +
    stages.map(function(s) {
      return '<div class="quick-item"><div class="icon green">🏭</div><div class="name">' + s.name + '</div><div class="desc">' + s.count + ' 单</div></div>';
    }).join('') + `
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">今日排产</span><button class="btn btn-outline btn-sm" onclick="navigateTo('orders')">查看全部</button></div>
  <table class="data-table">
    <thead><tr><th>单号</th><th>型号</th><th>数量</th><th>状态</th><th>预计完成</th></tr></thead>
    <tbody>` +
      orders.slice(-5).reverse().map(function(o) {
        return '<tr><td>' + CRUD._esc(o.no) + '</td><td>' + CRUD._esc(o.implantType) + '</td><td>' + CRUD._dash(o.qty) + '</td><td>' + CRUD._statusTag(o.status) + '</td><td>今日</td></tr>';
      }).join('') + `
    </tbody>
  </table>
</div>`;
    },

    quality: function() { return CRUD.builder('factory_quality', FACTORY_QUALITY); },
    exception: function() { return CRUD.builder('factory_exception', FACTORY_EXCEPTION); },

    service: function() {
      return `
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
    <button class="btn btn-primary" onclick="UI.toast.info('新建工单')">📝 新建工单</button>
    <button class="btn btn-outline" onclick="UI.toast.info('查看历史')">📜 历史记录</button>
    <button class="btn btn-outline" onclick="UI.toast.info('常见问题')">❓ 常见问题</button>
  </div>
</div>`;
    },

    finance: function() { return CRUD.builder('factory_finance', FACTORY_FINANCE); },
    patientQuery: function() { return _patientQueryPage('restricted'); }
  },

  // ================================================================
  //  客户端 (client)
  // ================================================================
  client: {

    home: function() {
      var orders = DB.getAll('clientOrders');
      var points = DB.getAll('clientPoints');
      var totalPoints = points.length > 0 ? points[0].balance : 0;
      var activeOrders = orders.filter(function(o){ return o.status === 'processing'; }).length;
      return `
<div class="breadcrumb">首页 / <span>概览</span></div>` +
_homeStats([
  { label:'我的积分', value: totalPoints, icon:'🎁', color:'green', change:'↑ 消费可得' },
  { label:'进行中订单', value: activeOrders, icon:'📋', color:'orange', change:'待完成' },
  { label:'已完成订单', value: orders.filter(function(o){ return o.status === 'active'; }).length, icon:'✅', color:'blue' },
  { label:'绑定实体卡', value: DB.getAll('clientCards').length, icon:'💳', color:'red' }
]) + `
<div class="quick-grid">
  <div class="quick-item" onclick="navigateTo('plant')"><div class="icon green">🦷</div><div class="name">我要种植</div><div class="desc">附近诊所</div></div>
  <div class="quick-item" onclick="navigateTo('mall')"><div class="icon blue">🛒</div><div class="name">商品兑换</div><div class="desc">积分兑换</div></div>
  <div class="quick-item" onclick="navigateTo('knowledge')"><div class="icon orange">📚</div><div class="name">种植常识</div><div class="desc">小唯学院</div></div>
  <div class="quick-item" onclick="navigateTo('orders')"><div class="icon teal">📋</div><div class="name">我的订单</div><div class="desc">` + orders.length + ` 笔</div></div>
  <div class="quick-item" onclick="navigateTo('points')"><div class="icon purple">🎁</div><div class="name">积分中心</div><div class="desc">` + totalPoints + ` 分</div></div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">📢 品牌动态</span></div>
  <div style="padding:12px 0;">
    <div style="padding:8px 0;border-bottom:1px solid var(--border);"><strong>XW-TI-4212 亲水种植体</strong> — 全新上市，更快骨结合，更短愈合期</div>
    <div style="padding:8px 0;border-bottom:1px solid var(--border);"><strong>一价全包套餐</strong> — 种植体+基台+手术费，透明定价无隐形消费</div>
    <div style="padding:8px 0;"><strong>老带新活动</strong> — 邀请好友注册下单得100积分，好友完成种植再得200积分</div>
  </div>
</div>`;
    },

    knowledge: function() {
      return `
<div class="breadcrumb">首页 / 小唯学院 / <span>种植常识</span></div>
<div class="card">
  <div class="card-header"><span class="card-title">📚 种植常识</span></div>
  <div style="padding:16px 0;">
    <div class="client-faq-item">
      <div class="client-faq-q">Q：什么是种植牙？</div>
      <div class="client-faq-a">A：种植牙是将人工牙根（种植体）植入牙槽骨中，待骨结合后安装基台和牙冠，恢复牙齿功能的一种修复方式。被誉为人类的"第三副牙齿"。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：种植牙的优势是什么？</div>
      <div class="client-faq-a">A：相比传统假牙，种植牙具有咀嚼力强、不伤邻牙、美观自然、使用寿命长等优势。小唯种植体采用钛合金材质，生物相容性好，骨结合更快。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：种植牙的流程是怎样的？</div>
      <div class="client-faq-a">A：1. 术前检查评估 → 2. 植入种植体（手术约30分钟）→ 3. 骨愈合期（2-3个月）→ 4. 安装基台 → 5. 安装牙冠。全程在专业医生指导下完成。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：种植牙疼吗？</div>
      <div class="client-faq-a">A：种植手术在局部麻醉下进行，过程中不会感到疼痛。术后可能有轻微肿胀和不适，2-3天内会自然消退。小唯采用微创种植技术，创口更小，恢复更快。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：什么人适合种植牙？</div>
      <div class="client-faq-a">A：一般而言，单颗、多颗或全口缺牙，牙槽骨条件良好，无严重全身性疾病的患者均可考虑种植牙。具体需由专业医生评估后确定方案。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：种植牙能用多久？</div>
      <div class="client-faq-a">A：小唯钛合金种植体临床使用寿命可达15-20年以上。保持良好口腔卫生习惯，定期复查，可延长种植牙使用寿命。我们提供长期质保服务。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：种植牙术后如何护理？</div>
      <div class="client-faq-a">A：术后24小时内避免刷牙漱口，饮食以温凉软食为主；一周内避免剧烈运动；保持口腔清洁，使用软毛牙刷；定期回诊所复查，确保种植体健康。</div>
    </div>
    <div class="client-faq-item">
      <div class="client-faq-q">Q：种植体有哪些型号？</div>
      <div class="client-faq-a">A：小唯种植体系列包含：XW-TI-3510（直径3.5mm，畅销款）、XW-TI-4200（直径4.2mm，高强度）、XW-TI-4212（亲水表面，新品）、XW-TI-3508（短款，适合骨量不足）等。医生会根据您的骨质情况推荐合适的型号。</div>
    </div>
  </div>
</div>`;
    },

    about: function() {
      return `
<div class="breadcrumb">首页 / 小唯学院 / <span>关于小唯</span></div>
<div class="card" style="text-align:center;padding:40px 20px;">
  <div style="width:80px;height:80px;background:linear-gradient(135deg,#008B8B,#16a085);border-radius:20px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:36px;font-weight:700;margin:0 auto 16px;">V</div>
  <h2 style="font-size:24px;font-weight:700;margin-bottom:8px;">VMicro 小唯</h2>
  <p style="color:var(--text-muted);font-size:14px;margin-bottom:24px;">Oral health, trust in Vmicro / 小唯</p>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">🏢 关于我们</span></div>
  <div style="padding:12px 0;font-size:14px;line-height:1.8;">
    <p style="margin-bottom:12px;">小唯（VMicro）是一家专注于口腔种植体研发、生产和销售的科技创新企业。我们致力于为患者提供高品质、可信赖的种植体产品，让更多人享受健康口腔带来的美好生活。</p>
    <p style="margin-bottom:12px;">小唯种植体采用医用钛合金材质，经过精密加工和表面处理技术，具有优异的生物相容性和骨结合能力。我们的产品涵盖多种规格型号，满足不同临床需求。</p>
    <p>小唯精密制造有限公司位于广东省东莞市松山湖科技产业园，拥有现代化的生产车间和严格的质量管理体系，月产能达12,000颗。</p>
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">⭐ 小唯优势</span></div>
  <div style="padding:12px 0;">
    <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:20px;">🔬</span>
      <div><strong>自主研发</strong><div style="font-size:13px;color:var(--text-muted);">拥有核心技术和专利，持续创新</div></div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:20px;">✅</span>
      <div><strong>品质保障</strong><div style="font-size:13px;color:var(--text-muted);">严格质检流程，每颗种植体可溯源</div></div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:20px;">💰</span>
      <div><strong>一价全包</strong><div style="font-size:13px;color:var(--text-muted);">透明定价，种植体+基台+手术费全包</div></div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:20px;">🏥</span>
      <div><strong>合作诊所</strong><div style="font-size:13px;color:var(--text-muted);">全国数百家合作口腔诊所，就近服务</div></div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;">
      <span style="font-size:20px;">🛡️</span>
      <div><strong>长期质保</strong><div style="font-size:13px;color:var(--text-muted);">种植卡绑定后享受长期质保服务</div></div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">📞 联系我们</span></div>
  <div style="padding:12px 0;font-size:14px;line-height:1.8;">
    <div>📍 地址：广东省东莞市松山湖科技产业园</div>
    <div>📞 客服热线：400-888-XXXX</div>
    <div>📧 邮箱：service@vmicro.com</div>
    <div>🕐 服务时间：周一至周日 9:00-18:00</div>
  </div>
</div>`;
    },

    plant: function() {
      var html = '<div class="breadcrumb">首页 / 我要种植 / <span>种植流程</span></div>';

      // 步骤指示器
      var stepNames = ['核销绑卡', '登录认证', '种植须知', '选择诊所', '确认信息'];
      html += '<div class="plant-wizard-bar">';
      for (var i = 0; i < 5; i++) {
        var stepNum = i + 1;
        var cls = stepNum < plantStep ? 'done' : (stepNum === plantStep ? 'current' : 'pending');
        html += '<div class="plant-wizard-step ' + cls + '">';
        html += '<div class="plant-step-num">' + (stepNum < plantStep ? '✓' : stepNum) + '</div>';
        html += '<div class="plant-step-name">' + stepNames[i] + '</div>';
        html += '</div>';
        if (i < 4) html += '<div class="plant-step-line ' + (stepNum < plantStep ? 'done' : '') + '"></div>';
      }
      html += '</div>';

      // ===== 步骤1：核销绑定卡 =====
      if (plantStep === 1) {
        html += '<div class="card" style="text-align:center;padding:40px 20px;">';
        html += '<div style="font-size:56px;margin-bottom:16px;">💳</div>';
        html += '<h3 style="margin-bottom:8px;">核销绑定卡</h3>';
        html += '<p style="color:var(--text-muted);margin-bottom:24px;max-width:400px;margin-left:auto;margin-right:auto;">请输入您购买的种植卡卡密进行绑定，绑定后即可开始种植流程</p>';
        html += '<div style="max-width:400px;margin:0 auto 24px;">';
        html += '<div class="form-group"><input type="text" id="plantCardNo" placeholder="请输入卡号（如：XW-2025-08001）" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;font-size:14px;"></div>';
        html += '<div class="form-group"><input type="text" id="plantCardKey" placeholder="请输入卡密" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;font-size:14px;"></div>';
        html += '</div>';
        html += '<button class="btn btn-primary" style="padding:12px 32px;font-size:15px;" onclick="UI.toast.success(\'绑卡成功！\');plantNextStep();">绑定卡片</button>';
        html += '<div style="margin-top:16px;font-size:13px;color:var(--text-muted);">（测试阶段可直接跳过绑卡）</div>';
        html += '<button class="btn btn-outline" style="margin-top:8px;" onclick="plantNextStep()">跳过，下一步 →</button>';
        html += '</div>';
      }

      // ===== 步骤2：登录认证 =====
      if (plantStep === 2) {
        html += '<div class="card" style="text-align:center;padding:40px 20px;">';
        html += '<div style="font-size:56px;margin-bottom:16px;">🔐</div>';
        html += '<h3 style="margin-bottom:8px;">登录认证</h3>';
        html += '<p style="color:var(--text-muted);margin-bottom:24px;max-width:400px;margin-left:auto;margin-right:auto;">为保障您的账户安全，请完成身份验证</p>';
        html += '<div style="max-width:400px;margin:0 auto 24px;">';
        html += '<div class="form-group"><input type="text" id="plantPhone" placeholder="请输入手机号" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;font-size:14px;"></div>';
        html += '<div style="display:flex;gap:8px;"><input type="text" id="plantCode" placeholder="验证码" style="flex:1;padding:12px;border:1px solid var(--border);border-radius:8px;font-size:14px;"><button class="btn btn-outline" onclick="UI.toast.info(\'验证码已发送（模拟）\')">发送验证码</button></div>';
        html += '</div>';
        html += '<button class="btn btn-primary" style="padding:12px 32px;font-size:15px;" onclick="UI.toast.success(\'认证成功！\');plantNextStep();">确认认证</button>';
        html += '<div style="margin-top:16px;font-size:13px;color:var(--text-muted);">（测试阶段可直接跳过认证）</div>';
        html += '<button class="btn btn-outline" style="margin-top:8px;" onclick="plantNextStep()">跳过，下一步 →</button>';
        html += '</div>';
      }

      // ===== 步骤3：种植须知 =====
      if (plantStep === 3) {
        html += '<div class="card">';
        html += '<div class="card-header"><span class="card-title">📋 种植须知</span></div>';
        html += '<div style="padding:16px 0;">';
        html += '<div style="padding:12px;background:#fff3e0;border-radius:8px;margin-bottom:16px;border-left:4px solid var(--accent);">';
        html += '<strong style="color:var(--accent);">⚠️ 重要提示</strong>';
        html += '<div style="font-size:13px;color:var(--text);margin-top:4px;line-height:1.8;">请仔细阅读以下内容，确认后再进行种植预约</div>';
        html += '</div>';
        var notices = [
          { title: '术前准备', icon: '📝', content: '种植手术前需进行口腔检查、拍片评估骨量。如有高血压、糖尿病等慢性疾病，请提前告知医生并控制稳定后再行手术。' },
          { title: '手术过程', icon: '💉', content: '种植手术在局部麻醉下进行，手术时间约30-60分钟。过程中不会感到疼痛，术后可能有轻微肿胀。' },
          { title: '术后护理', icon: '🩹', content: '术后24小时内避免刷牙漱口，饮食以温凉软食为主。一周内避免剧烈运动，保持口腔清洁。' },
          { title: '骨愈合期', icon: '⏳', content: '种植体植入后需等待2-3个月骨结合期，期间需定期复查，确保愈合良好。' },
          { title: '牙冠修复', icon: '🦷', content: '骨愈合完成后安装基台和牙冠，完成最终修复。修复后需定期复查，保持口腔卫生。' },
          { title: '费用说明', icon: '💰', content: '费用包含种植体、基台、手术费。如需骨粉、额外材料等将另行收费，具体以诊所报价为准。' },
          { title: '质保服务', icon: '🛡️', content: '小唯种植体提供长期质保，绑定种植卡后可享受售后保障服务。' }
        ];
        notices.forEach(function(n) {
          html += '<div class="plant-notice-item">';
          html += '<div style="display:flex;align-items:flex-start;gap:10px;">';
          html += '<span style="font-size:20px;">' + n.icon + '</span>';
          html += '<div><strong style="font-size:14px;">' + n.title + '</strong>';
          html += '<div style="font-size:13px;color:var(--text-muted);line-height:1.7;margin-top:2px;">' + n.content + '</div></div>';
          html += '</div></div>';
        });
        html += '</div>';
        html += '<div style="padding:16px 0;text-align:center;border-top:1px solid var(--border);">';
        html += '<label style="display:inline-flex;align-items:center;gap:6px;font-size:14px;cursor:pointer;">';
        html += '<input type="checkbox" id="plantAgree" onchange="var btn=document.getElementById(\'plantAgreeBtn\');btn.disabled=!this.checked;btn.style.opacity=this.checked?\'1\':\'0.5\';btn.style.cursor=this.checked?\'pointer\':\'not-allowed\';" style="width:16px;height:16px;">';
        html += '我已仔细阅读并同意以上种植须知</label>';
        html += '</div>';
        html += '<div style="text-align:center;padding-bottom:16px;">';
        html += '<button class="btn btn-outline" style="margin-right:8px;" onclick="plantPrevStep()">← 上一步</button>';
        html += '<button class="btn btn-primary" id="plantAgreeBtn" disabled style="opacity:0.5;cursor:not-allowed;" onclick="plantNextStep()">下一步 →</button>';
        html += '</div>';
        html += '</div>';
      }

      // ===== 步骤4：选择诊所 =====
      if (plantStep === 4) {
        var clinics = DB.getAll('clientClinics');
        html += '<div class="card">';
        html += '<div class="card-header"><span class="card-title">🏥 选择附近诊所</span></div>';
        html += '<div style="display:flex;align-items:center;gap:8px;padding:12px;background:var(--primary-light);border-radius:8px;margin-bottom:16px;">';
        html += '<span style="font-size:16px;">📍</span>';
        html += '<input type="text" id="plantLocation" value="浙江杭州" style="flex:1;border:none;background:transparent;font-size:14px;outline:none;font-weight:600;color:var(--primary-dark);">';
        html += '<button class="btn btn-outline btn-sm" onclick="UI.toast.info(\'正在定位...\');setTimeout(function(){UI.toast.success(\'定位成功：浙江杭州\');},1000);">🔄 重新定位</button>';
        html += '<button class="btn btn-outline btn-sm" onclick="UI.toast.info(\'请输入您的位置\')">✏️ 手动更改</button>';
        html += '</div>';
        html += '<div style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">点击选择您想去的诊所，选定后点击「确定选择」</div>';
        clinics.forEach(function(c) {
          var stars = '';
          for (var i = 0; i < 5; i++) {
            stars += i < Math.floor(c.rating) ? '⭐' : '☆';
          }
          html += '<div class="plant-clinic-item" id="plant-clinic-' + c.id + '" onclick="plantSelectClinic(' + c.id + ')">';
          html += '<div class="client-clinic-header"><strong style="font-size:15px;">' + CRUD._esc(c.name) + '</strong>';
          html += '<span class="status-tag active">' + c.distance + ' km</span></div>';
          html += '<div class="client-clinic-info">';
          html += '<div><span class="label">负责人：</span>' + CRUD._esc(c.owner) + '</div>';
          html += '<div><span class="label">电话：</span>' + CRUD._esc(c.phone) + '</div>';
          html += '<div><span class="label">地址：</span>' + CRUD._esc(c.address) + '</div>';
          html += '<div><span class="label">评分：</span>' + stars + ' (' + c.rating + ')</div>';
          html += '<div><span class="label">种植量：</span>' + c.implants + ' 颗</div>';
          html += '</div>';
          html += '<div class="plant-clinic-check">✓ 已选择</div>';
          html += '</div>';
        });
        html += '<div style="display:flex;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border);">';
        html += '<button class="btn btn-outline" onclick="plantPrevStep()">← 上一步</button>';
        html += '<button class="btn btn-primary" id="plantConfirmBtn" disabled style="opacity:0.5;cursor:not-allowed;" onclick="plantConfirmClinic()">确定选择 →</button>';
        html += '</div>';
        html += '</div>';
      }

      // ===== 步骤5：确认信息 =====
      if (plantStep === 5) {
        var clinic = DB.getById('clientClinics', plantSelectedClinicId);
        if (!clinic) {
          html += '<div class="card"><div style="padding:40px;text-align:center;color:var(--text-muted);">未选择诊所，请返回上一步</div></div>';
          html += '<div style="text-align:center;"><button class="btn btn-outline" onclick="plantPrevStep()">← 返回选择</button></div>';
          return html;
        }
        var stars = '';
        for (var i = 0; i < 5; i++) {
          stars += i < Math.floor(clinic.rating) ? '⭐' : '☆';
        }
        html += '<div class="card" style="text-align:center;padding:30px 20px;">';
        html += '<div style="font-size:48px;margin-bottom:8px;">✅</div>';
        html += '<h3 style="margin-bottom:8px;color:var(--success);">预约成功！</h3>';
        html += '<p style="color:var(--text-muted);font-size:14px;margin-bottom:24px;">您已成功选择诊所，以下是诊所详细信息</p>';
        html += '</div>';
        html += '<div class="card">';
        html += '<div class="card-header"><span class="card-title">🏥 ' + CRUD._esc(clinic.name) + '</span>';
        html += '<span class="status-tag active">' + clinic.distance + ' km</span></div>';
        html += '<div style="padding:20px 0;">';
        // 地图占位
        html += '<div style="background:linear-gradient(135deg,var(--primary-light),#e8f4fd);border-radius:12px;height:180px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;position:relative;">';
        html += '<div style="text-align:center;color:var(--text-muted);">';
        html += '<div style="font-size:40px;margin-bottom:8px;">🗺️</div>';
        html += '<div style="font-size:14px;font-weight:600;">' + CRUD._esc(clinic.name) + '</div>';
        html += '<div style="font-size:12px;">' + CRUD._esc(clinic.region) + '</div>';
        html += '</div>';
        html += '<div style="position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);font-size:28px;">📍</div>';
        html += '</div>';
        // 诊所信息
        html += '<div class="plant-confirm-info">';
        html += '<div class="plant-info-row"><span class="plant-info-icon">📍</span><div><div class="plant-info-label">诊所地址</div><div class="plant-info-value">' + CRUD._esc(clinic.address) + '</div></div></div>';
        html += '<div class="plant-info-row"><span class="plant-info-icon">📞</span><div><div class="plant-info-label">联系电话</div><div class="plant-info-value"><a href="tel:' + clinic.phone + '" style="color:var(--primary);font-weight:600;">' + CRUD._esc(clinic.phone) + '</a></div></div></div>';
        html += '<div class="plant-info-row"><span class="plant-info-icon">👤</span><div><div class="plant-info-label">负责人</div><div class="plant-info-value">' + CRUD._esc(clinic.owner) + '</div></div></div>';
        html += '<div class="plant-info-row"><span class="plant-info-icon">⭐</span><div><div class="plant-info-label">评分</div><div class="plant-info-value">' + stars + ' (' + clinic.rating + ')</div></div></div>';
        html += '<div class="plant-info-row"><span class="plant-info-icon">🦷</span><div><div class="plant-info-label">种植量</div><div class="plant-info-value">' + clinic.implants + ' 颗</div></div></div>';
        html += '</div>';
        html += '</div>';
        html += '<div style="padding:20px 0;text-align:center;">';
        html += '<div style="padding:16px;background:var(--primary-light);border-radius:8px;margin-bottom:16px;">';
        html += '<div style="font-size:13px;color:var(--text-muted);margin-bottom:4px;">📞 预约咨询</div>';
        html += '<div style="font-size:18px;font-weight:700;color:var(--primary-dark);">' + CRUD._esc(clinic.phone) + '</div>';
        html += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">点击电话号码可直接拨打</div>';
        html += '</div>';
        html += '<div style="display:flex;gap:8px;justify-content:center;">';
        html += '<button class="btn btn-outline" onclick="plantPrevStep()">← 重新选择</button>';
        html += '<button class="btn btn-primary" onclick="UI.toast.success(\'已提交预约，诊所将在24小时内联系您\');plantReset();">完成预约</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      }

      return html;
    },

    mall: function() { return CRUD.builder('client_mall', CLIENT_PRODUCTS); },

    orders: function() { return CRUD.builder('client_orders', CLIENT_ORDERS); },

    progress: function() {
      var items = DB.getAll('clientProgress');
      var html = '<div class="breadcrumb">首页 / 我的 / <span>种植进度</span></div>';
      if (items.length === 0) {
        html += '<div class="card"><div style="padding:40px;text-align:center;color:var(--text-muted);">暂无进度记录</div></div>';
        return html;
      }
      items.forEach(function(p) {
        var stepNames = ['下单付款', '诊所预约', '种植手术', '基台安装', '牙冠修复'];
        var steps = [p.step1, p.step2, p.step3, p.step4, p.step5];
        var barColor = p.progress === 100 ? 'var(--success)' : 'var(--primary)';
        html += '<div class="card">';
        html += '<div class="card-header"><span class="card-title">📋 ' + p.no + '</span><span class="status-tag ' + p.status + '">' + (p.status === 'active' ? '已完成' : '进行中') + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:13px;">';
        html += '<span>诊所：' + CRUD._esc(p.clinic) + '</span>';
        if (p.doctor) html += '<span>医生：' + CRUD._esc(p.doctor) + '</span>';
        if (p.implantType) html += '<span>型号：' + CRUD._esc(p.implantType) + '</span>';
        html += '</div>';
        // Progress bar
        html += '<div style="background:#f0f0f0;border-radius:8px;height:8px;margin-bottom:20px;overflow:hidden;">';
        html += '<div style="width:' + p.progress + '%;height:100%;background:' + barColor + ';border-radius:8px;transition:width 0.3s;"></div></div>';
        // Steps
        html += '<div class="client-progress-steps">';
        for (var i = 0; i < 5; i++) {
          var done = steps[i] === '已完成' || steps[i] === '已发货' || steps[i] === '已签收';
          var active = steps[i] === '进行中';
          var cls = done ? 'done' : (active ? 'current' : 'pending');
          html += '<div class="client-progress-step ' + cls + '">';
          html += '<div class="step-circle">' + (done ? '✓' : (i + 1)) + '</div>';
          html += '<div class="step-label">' + stepNames[i] + '</div>';
          html += '<div class="step-status">' + (steps[i] || '待开始') + '</div>';
          html += '</div>';
        }
        html += '</div>';
        if (p.nextDate) {
          html += '<div style="margin-top:16px;padding:12px;background:var(--primary-light);border-radius:8px;font-size:13px;">';
          html += '📅 下次预约：<strong>' + p.nextDate + '</strong> — ' + CRUD._esc(p.current);
          html += '</div>';
        }
        html += '</div>';
      });
      return html;
    },

    profile: function() {
      var totalSpent = DB.getAll('clientTransactions').reduce(function(s,t){ return s + (t.amount || 0); }, 0);
      var orderCount = DB.getAll('clientOrders').length;
      var cardCount = DB.getAll('clientCards').length;
      var reviewCount = DB.getAll('clientReviews').length;
      return `
<div class="breadcrumb">首页 / 我的 / <span>个人中心</span></div>
<div class="card">
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
    <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700;">周</div>
    <div>
      <div style="font-size:18px;font-weight:700;">周小明</div>
      <div style="font-size:13px;color:var(--text-muted);">📱 138-0011-2233</div>
      <div style="font-size:12px;color:var(--primary-dark);margin-top:4px;">⭐ 会员等级：银卡会员</div>
    </div>
  </div>
</div>
<div class="stats-grid">
  <div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">累计消费</span></div><div class="stat-card-value">¥` + totalSpent.toLocaleString() + `</div></div>
  <div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">订单数</span></div><div class="stat-card-value">` + orderCount + `</div></div>
  <div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">实体卡</span></div><div class="stat-card-value">` + cardCount + `</div></div>
  <div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">评价数</span></div><div class="stat-card-value">` + reviewCount + `</div></div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">个人信息</span></div>
  <div style="padding:20px;max-width:500px;">
    <div class="form-group"><label>姓名</label><input type="text" value="周小明" placeholder="姓名"></div>
    <div class="form-group"><label>手机号</label><input type="text" value="138-0011-2233" placeholder="手机号"></div>
    <div class="form-group"><label>所在地区</label><input type="text" value="浙江杭州" placeholder="所在地区"></div>
    <div class="form-group"><label>邮箱</label><input type="text" value="zhouxm@example.com" placeholder="邮箱"></div>
    <button class="btn btn-primary" onclick="UI.toast.success('个人信息已保存')">保存修改</button>
  </div>
</div>
<div class="card">
  <div class="card-header"><span class="card-title">邀请好友</span></div>
  <div style="padding:20px;text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">🎁</div>
    <p style="color:var(--text-muted);margin-bottom:16px;">邀请码：<strong style="color:var(--primary-dark);font-size:18px;">ZHOU2025</strong></p>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">好友注册得100积分，好友完成种植再得200积分</p>
    <button class="btn btn-primary" onclick="UI.toast.success('邀请码已复制')">复制邀请码</button>
  </div>
</div>`;
    },

    points: function() {
      var points = DB.getAll('clientPoints');
      var totalPoints = points.length > 0 ? points[0].balance : 0;
      var html = '<div class="breadcrumb">首页 / 我的 / <span>我的积分</span></div>';
      html += '<div class="card" style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;text-align:center;padding:30px;">';
      html += '<div style="font-size:14px;opacity:0.9;">当前积分</div>';
      html += '<div style="font-size:36px;font-weight:700;margin:8px 0;">' + totalPoints + '</div>';
      html += '<div style="font-size:13px;opacity:0.8;">满500分可兑换商品 · 满1000分免费做一颗种植牙</div>';
      html += '</div>';
      html += '<div class="card"><div class="card-header"><span class="card-title">积分明细</span></div>';
      html += '<table class="data-table"><thead><tr><th>日期</th><th>类型</th><th>来源</th><th>积分变动</th><th>余额</th></tr></thead><tbody>';
      points.forEach(function(p) {
        var sign = p.points > 0 ? '+' : '';
        var color = p.points > 0 ? 'var(--success)' : 'var(--danger)';
        html += '<tr><td>' + CRUD._esc(p.date) + '</td><td>' + CRUD._esc(p.type) + '</td><td>' + CRUD._esc(p.source) + '</td>';
        html += '<td style="color:' + color + ';font-weight:600;">' + sign + p.points + '</td><td>' + p.balance + '</td></tr>';
      });
      html += '</tbody></table></div>';
      html += '<div class="card"><div class="card-header"><span class="card-title">积分规则</span></div>';
      html += '<div style="padding:12px 0;font-size:13px;line-height:2;">';
      html += '<div>✅ 消费获得：1元 = 1积分</div>';
      html += '<div>✅ 邀请奖励：好友注册并下单得100积分</div>';
      html += '<div>✅ 老带新奖励：好友完成种植再得200积分</div>';
      html += '<div>✅ 积分兑换：满500分可兑换商品</div>';
      html += '<div>✅ 积种植牙：满1000分免费做一颗种植牙</div>';
      html += '</div></div>';
      return html;
    },

    cards: function() { return CRUD.builder('client_cards', CLIENT_CARDS); },
    reviews: function() { return CRUD.builder('client_reviews', CLIENT_REVIEWS); },
    transactions: function() { return CRUD.builder('client_transactions', CLIENT_TRANSACTIONS); },
    service: function() { return CRUD.builder('client_service', CLIENT_SERVICE); },

    faq: function() {
      var faqs = DB.getAll('clientFAQ');
      var categories = [];
      faqs.forEach(function(f){ if(categories.indexOf(f.category) === -1) categories.push(f.category); });
      var html = '<div class="breadcrumb">首页 / 我的 / <span>常见问题</span></div>';
      html += '<div class="card"><div class="card-header"><span class="card-title">❓ 常见问题</span></div>';
      categories.forEach(function(cat) {
        html += '<div style="margin-bottom:16px;"><div style="font-size:14px;font-weight:600;color:var(--primary-dark);margin-bottom:8px;">[' + CRUD._esc(cat) + ']</div>';
        faqs.filter(function(f){ return f.category === cat; }).forEach(function(f) {
          html += '<div class="client-faq-item">';
          html += '<div class="client-faq-q">Q：' + CRUD._esc(f.q) + '</div>';
          html += '<div class="client-faq-a">A：' + CRUD._esc(f.a) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      });
      html += '</div>';
      html += '<div class="card" style="text-align:center;padding:30px;">';
      html += '<div style="font-size:36px;margin-bottom:8px;">💬</div>';
      html += '<p style="color:var(--text-muted);margin-bottom:16px;">没有找到答案？联系客服获取帮助</p>';
      html += '<button class="btn btn-primary" onclick="UI.toast.info(\'客服热线：400-888-XXXX\')">联系客服</button>';
      html += '</div>';
      return html;
    }
  }

};
