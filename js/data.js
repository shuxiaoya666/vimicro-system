// ===== 小唯管理系统 - 数据管理层 (localStorage 持久化) =====
// 依赖：无 | 暴露全局变量：SEED_DATA, DB
// 用法：页面加载时调用 DB.init()，之后通过 DB.getAll('clinics') 等方法读写数据

// ==================== SEED_DATA 种子数据 ====================
var SEED_DATA = {

  // ---------- 诊所 ----------
  clinics: [
    {id:1, name:'仁爱口腔诊所', owner:'李明华', phone:'138-0011-2233', region:'浙江杭州', implantsUsed:342, status:'active', createdAt:'2025-07-28'},
    {id:2, name:'雅悦口腔医院', owner:'张伟强', phone:'137-2233-4455', region:'广东深圳', implantsUsed:586, status:'active', createdAt:'2025-07-20'},
    {id:3, name:'微笑牙科诊所', owner:'陈丽芳', phone:'136-8899-0011', region:'四川成都', implantsUsed:218, status:'active', createdAt:'2025-07-18'},
    {id:4, name:'康贝口腔门诊部', owner:'王秀英', phone:'139-5566-7788', region:'江苏南京', implantsUsed:0, status:'pending', createdAt:'2025-07-25'},
    {id:5, name:'德仁口腔中心', owner:'刘建国', phone:'135-6677-8899', region:'湖北武汉', implantsUsed:0, status:'pending', createdAt:'2025-07-15'},
    {id:6, name:'博雅口腔诊所', owner:'赵新民', phone:'133-4455-6677', region:'上海', implantsUsed:456, status:'active', createdAt:'2025-06-30'},
    {id:7, name:'和谐口腔门诊', owner:'孙美玲', phone:'132-9988-7766', region:'北京', implantsUsed:312, status:'inactive', createdAt:'2025-05-12'}
  ],

  // ---------- 药店 ----------
  pharmacies: [
    {id:1, name:'健佳大药房', manager:'周明', phone:'138-1122-3344', region:'浙江杭州', cardSales:1280, status:'active', joinedAt:'2025-06-10'},
    {id:2, name:'同德堂药房', manager:'吴芳', phone:'139-5544-6677', region:'江苏苏州', cardSales:860, status:'active', joinedAt:'2025-06-05'},
    {id:3, name:'益民大药房', manager:'郑国华', phone:'137-7788-9900', region:'广东广州', cardSales:1050, status:'active', joinedAt:'2025-05-28'},
    {id:4, name:'仁心药房', manager:'冯丽', phone:'136-2200-3300', region:'四川成都', cardSales:430, status:'processing', joinedAt:'2025-07-20'},
    {id:5, name:'康源药房', manager:'褚伟', phone:'135-6677-2200', region:'湖北武汉', cardSales:672, status:'active', joinedAt:'2025-05-15'},
    {id:6, name:'百姓大药房', manager:'卫国', phone:'133-8899-1100', region:'上海', cardSales:0, status:'inactive', joinedAt:'2025-04-08'}
  ],

  // ---------- 工厂 ----------
  factories: [
    {id:1, name:'小唯精密制造有限公司', owner:'孙志强', phone:'138-8888-0001', address:'广东省东莞市松山湖科技产业园', monthlyCapacity:12000, status:'active'}
  ],

  // ---------- 经销商 ----------
  dealers: [
    {id:1, name:'张明华', region:'华东区域', clinicClients:42, pharmacyClients:18, commission:386200, status:'active'},
    {id:2, name:'李伟强', region:'华南区域', clinicClients:35, pharmacyClients:12, commission:298500, status:'active'},
    {id:3, name:'王秀芳', region:'华北区域', clinicClients:28, pharmacyClients:15, commission:245800, status:'active'},
    {id:4, name:'陈建国', region:'西南区域', clinicClients:15, pharmacyClients:7, commission:128600, status:'active'},
    {id:5, name:'赵新民', region:'华中区域', clinicClients:0, pharmacyClients:0, commission:0, status:'pending'},
    {id:6, name:'刘德海', region:'东北区域', clinicClients:0, pharmacyClients:0, commission:0, status:'inactive'}
  ],

  // ---------- 种植体卡 ----------
  cards: [
    {id:1, cardNo:'XW-2025-08001', patient:'周小明', clinic:'仁爱口腔诊所', implantType:'XW-TI-3510', pharmacy:'健佳大药房', issueDate:'2025-08-01', status:'active'},
    {id:2, cardNo:'XW-2025-08002', patient:'吴丽红', clinic:'雅悦口腔医院', implantType:'XW-TI-4200', pharmacy:'同德堂药房', issueDate:'2025-08-01', status:'active'},
    {id:3, cardNo:'XW-2025-07998', patient:'郑国强', clinic:'微笑牙科诊所', implantType:'XW-TI-3508', pharmacy:'益民大药房', issueDate:'2025-07-30', status:'processing'},
    {id:4, cardNo:'XW-2025-07995', patient:'冯小明', clinic:'博雅口腔诊所', implantType:'XW-TI-4212', pharmacy:'康源药房', issueDate:'2025-07-28', status:'active'},
    {id:5, cardNo:'XW-2025-07990', patient:'褚伟杰', clinic:'仁爱口腔诊所', implantType:'XW-TI-3510', pharmacy:'健佳大药房', issueDate:'2025-07-25', status:'active'},
    {id:6, cardNo:'XW-2025-07985', patient:'卫东', clinic:'雅悦口腔医院', implantType:'XW-TI-4200', pharmacy:'益民大药房', issueDate:'2025-07-22', status:'inactive'}
  ],

  // ---------- 商品 ----------
  products: [
    {id:1, name:'XW-TI-3510 种植体', price:1280, desc:'直径3.5mm 钛合金 · 畅销款', icon:'🦷', color:'green'},
    {id:2, name:'XW-TI-4200 种植体', price:1580, desc:'直径4.2mm 钛合金 · 高强度', icon:'🦷', color:'blue'},
    {id:3, name:'种植体基台', price:680, desc:'标准基台 · 适配全系', icon:'🔧', color:'orange'},
    {id:4, name:'骨粉材料 0.5g', price:420, desc:'人工骨粉 · 高生物相容', icon:'🧪', color:'purple'},
    {id:5, name:'愈合帽', price:150, desc:'标准愈合帽 · 含螺丝', icon:'🔩', color:'teal'},
    {id:6, name:'种植手术工具包', price:3800, desc:'全套手术器械 · 消毒级', icon:'📦', color:'green'},
    {id:7, name:'麻药注射器', price:85, desc:'一次性使用 · 50支装', icon:'💉', color:'blue'},
    {id:8, name:'XW-TI-4212 种植体', price:1680, desc:'直径4.2mm 亲水表面 · 新品', icon:'🦷', color:'orange'}
  ],

  // ---------- 结算记录 ----------
  settlements: [
    {id:1, no:'ST-2025-0812', party:'仁爱口腔诊所', type:'诊所提现', amount:86500, commission:8650, status:'pending', date:'2025-08-03'},
    {id:2, no:'ST-2025-0811', party:'健佳大药房', type:'药店提现', amount:56200, commission:5620, status:'pending', date:'2025-08-02'},
    {id:3, no:'ST-2025-0810', party:'张明华（经销商）', type:'佣金提现', amount:45600, commission:4560, status:'pending', date:'2025-08-01'},
    {id:4, no:'ST-2025-0809', party:'雅悦口腔医院', type:'诊所提现', amount:128000, commission:12800, status:'active', date:'2025-07-30'},
    {id:5, no:'ST-2025-0808', party:'益民大药房', type:'药店提现', amount:72400, commission:7240, status:'active', date:'2025-07-28'},
    {id:6, no:'ST-2025-0807', party:'小唯精密制造', type:'工厂货款', amount:356000, commission:35600, status:'active', date:'2025-07-25'}
  ],

  // ---------- 权限角色 ----------
  roles: [
    {id:1, name:'超级管理员', desc:'拥有全部权限', ports:'全部五端', users:1, status:'active'},
    {id:2, name:'平台运营', desc:'平台日常运营管理', ports:'平台端', users:5, status:'active'},
    {id:3, name:'平台财务', desc:'财务结算与报表查看', ports:'平台端', users:3, status:'active'},
    {id:4, name:'诊所管理员', desc:'诊所端全部功能', ports:'诊所端', users:128, status:'active'},
    {id:5, name:'经销商', desc:'经销商端全部功能', ports:'经销商端', users:22, status:'active'},
    {id:6, name:'药店店长', desc:'药店端全部功能', ports:'药店端', users:56, status:'active'},
    {id:7, name:'工厂管理员', desc:'工厂端全部功能', ports:'工厂端', users:4, status:'active'}
  ],

  // ---------- 通知 ----------
  notifications: [
    {id:1, time:'2025-08-04 09:30', title:'新诊所注册申请', content:'康贝口腔门诊部提交了注册申请，等待审核。', read:false},
    {id:2, time:'2025-08-03 16:45', title:'提现申请', content:'仁爱口腔诊所申请提现 ¥86,500，待审核。', read:false},
    {id:3, time:'2025-08-03 14:20', title:'工厂出货通知', content:'小唯精密制造已完成 320 颗种植体出货，物流单号 SF1284567。', read:false},
    {id:4, time:'2025-08-02 11:10', title:'药店提现申请', content:'健佳大药房申请提现 ¥56,200，待审核。', read:true},
    {id:5, time:'2025-08-01 10:00', title:'月度结算完成', content:'7月平台结算已全部完成，共结算 ¥1,256,800。', read:true},
    {id:6, time:'2025-07-31 18:30', title:'系统升级通知', content:'系统将于今晚 23:00-次日 01:00 进行升级维护。', read:true},
    {id:7, time:'2025-07-30 15:20', title:'新经销商签约', content:'赵新民（华中区域）提交了经销商签约申请。', read:true}
  ],

  // ---------- 患者 ----------
  patients: [
    {id:1, name:'周小明', gender:'男', age:35, phone:'138-0011-2233', treatmentType:'种植', implants:2, createdAt:'2025-08-01'},
    {id:2, name:'吴丽红', gender:'女', age:42, phone:'139-5566-7788', treatmentType:'种植', implants:1, createdAt:'2025-08-01'},
    {id:3, name:'郑国强', gender:'男', age:56, phone:'137-2233-4455', treatmentType:'种植', implants:3, createdAt:'2025-07-30'},
    {id:4, name:'冯小明', gender:'男', age:28, phone:'136-8899-0011', treatmentType:'修复', implants:1, createdAt:'2025-07-28'},
    {id:5, name:'褚伟杰', gender:'男', age:45, phone:'135-6677-8899', treatmentType:'种植', implants:2, createdAt:'2025-07-25'},
    {id:6, name:'孙丽娟', gender:'女', age:38, phone:'133-4455-6677', treatmentType:'种植', implants:1, createdAt:'2025-07-22'},
    {id:7, name:'王大伟', gender:'男', age:50, phone:'132-9988-7766', treatmentType:'正畸', implants:0, createdAt:'2025-07-18'}
  ],

  // ---------- 加工单 ----------
  orders: [
    {id:1, no:'MO-2025-0823', patient:'周小明', type:'种植体', implantType:'XW-TI-3510', qty:2, factory:'小唯精密制造', status:'processing', createdAt:'2025-08-03'},
    {id:2, no:'MO-2025-0822', patient:'吴丽红', type:'种植体', implantType:'XW-TI-4200', qty:1, factory:'小唯精密制造', status:'pending', createdAt:'2025-08-02'},
    {id:3, no:'MO-2025-0821', patient:'郑国强', type:'基台', implantType:'XW-BT-001', qty:3, factory:'小唯精密制造', status:'active', createdAt:'2025-07-30'},
    {id:4, no:'MO-2025-0820', patient:'冯小明', type:'种植体', implantType:'XW-TI-4212', qty:1, factory:'小唯精密制造', status:'processing', createdAt:'2025-07-28'},
    {id:5, no:'MO-2025-0819', patient:'褚伟杰', type:'种植体', implantType:'XW-TI-3510', qty:2, factory:'小唯精密制造', status:'active', createdAt:'2025-07-25'},
    {id:6, no:'MO-2025-0818', patient:'孙丽娟', type:'种植体', implantType:'XW-TI-4200', qty:1, factory:'小唯精密制造', status:'active', createdAt:'2025-07-22'}
  ],

  // ---------- 植体库存 ----------
  implants: [
    {id:1, model:'XW-TI-3510', spec:'直径3.5mm / 长10mm', stock:28, used:342, status:'active'},
    {id:2, model:'XW-TI-4200', spec:'直径4.2mm / 长10mm', stock:22, used:286, status:'active'},
    {id:3, model:'XW-TI-4212', spec:'直径4.2mm / 长12mm', stock:8, used:98, status:'pending'},
    {id:4, model:'XW-TI-3508', spec:'直径3.5mm / 长8mm', stock:15, used:156, status:'active'},
    {id:5, model:'XW-BT-001', spec:'标准基台', stock:13, used:120, status:'active'},
    {id:6, model:'XW-HC-002', spec:'愈合帽', stock:0, used:86, status:'inactive'}
  ],

  // ---------- 交易明细 ----------
  transactions: [
    {id:1, date:'2025-08-03', type:'收入', item:'周小明 种植手术费', direction:'收入', amount:8600, status:'active'},
    {id:2, date:'2025-08-03', type:'支出', item:'种植体采购 XW-TI-3510 x20', direction:'支出', amount:25600, status:'active'},
    {id:3, date:'2025-08-02', type:'收入', item:'吴丽红 种植手术费', direction:'收入', amount:6800, status:'active'},
    {id:4, date:'2025-08-01', type:'支出', item:'门店租金 8月', direction:'支出', amount:12000, status:'active'},
    {id:5, date:'2025-07-31', type:'收入', item:'冯小明 基台安装费', direction:'收入', amount:3200, status:'active'},
    {id:6, date:'2025-07-30', type:'支出', item:'员工工资 7月', direction:'支出', amount:45000, status:'active'}
  ],

  // ---------- 提现记录 ----------
  withdrawals: [
    {id:1, no:'WD-2025-0803', amount:86500, bank:'工商银行 尾号 8862', status:'pending', appliedAt:'2025-08-03', arrivedAt:''},
    {id:2, no:'WD-2025-0720', amount:56000, bank:'工商银行 尾号 8862', status:'active', appliedAt:'2025-07-20', arrivedAt:'2025-07-22'},
    {id:3, no:'WD-2025-0710', amount:42000, bank:'工商银行 尾号 8862', status:'active', appliedAt:'2025-07-10', arrivedAt:'2025-07-12'},
    {id:4, no:'WD-2025-0625', amount:68000, bank:'工商银行 尾号 8862', status:'active', appliedAt:'2025-06-25', arrivedAt:'2025-06-27'}
  ],

  // ---------- 核销记录 ----------
  verifyRecords: [
    {id:1, cardNo:'XW-2025-08001', patient:'周小明', type:'种植体植入', doctor:'李医生', time:'2025-08-03 14:30'},
    {id:2, cardNo:'XW-2025-08002', patient:'吴丽红', type:'种植体植入', doctor:'李医生', time:'2025-08-03 10:15'},
    {id:3, cardNo:'XW-2025-07995', patient:'冯小明', type:'基台安装', doctor:'王医生', time:'2025-08-02 16:45'},
    {id:4, cardNo:'XW-2025-07990', patient:'褚伟杰', type:'种植体植入', doctor:'李医生', time:'2025-08-01 11:20'}
  ],

  // ---------- 注册申请 ----------
  registrations: [
    {id:1, type:'clinic', account:'brightdental', orgName:'明皓口腔诊所', person:'钱伟', phone:'138-6677-8899', region:'浙江宁波', address:'宁波市海曙区中山东路88号', licenseName:'营业执照_明皓口腔.jpg', licenseData:'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22280%22%3E%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22%23f8f9fa%22%20stroke%3D%22%23ddd%22/%3E%3Ctext%20x%3D%22200%22%20y%3D%22130%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%2395a5a6%22%20text-anchor%3D%22middle%22%3E%E8%90%A5%E4%B8%9A%E6%89%A7%E7%85%A7%E7%A4%BA%E4%BE%8B%E5%9B%BE%3C/text%3E%3Ctext%20x%3D%22200%22%20y%3D%22160%22%20font-family%3D%22sans-serif%22%20font-size%3D%2213%22%20fill%3D%22%23bbb%22%20text-anchor%3D%22middle%22%3E%E6%98%8E%E7%9A%93%E5%8F%A3%E8%85%94%E8%AF%8A%E6%89%80%3C/text%3E%3C/svg%3E', status:'pending', submittedAt:'2025-08-10'},
    {id:2, type:'pharmacy', account:'healthpharma', orgName:'康健大药房', person:'杨芳', phone:'139-8899-0011', region:'江苏苏州', address:'苏州市姑苏区人民路120号', licenseName:'营业执照_康健药房.png', licenseData:'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22400%22%20height%3D%22280%22%3E%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22%23f8f9fa%22%20stroke%3D%22%23ddd%22/%3E%3Ctext%20x%3D%22200%22%20y%3D%22130%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%2395a5a6%22%20text-anchor%3D%22middle%22%3E%E8%90%A5%E4%B8%9A%E6%89%A7%E7%85%A7%E7%A4%BA%E4%BE%8B%E5%9B%BE%3C/text%3E%3Ctext%20x%3D%22200%22%20y%3D%22160%22%20font-family%3D%22sans-serif%22%20font-size%3D%2213%22%20fill%3D%22%23bbb%22%20text-anchor%3D%22middle%22%3E%E5%BA%B7%E5%81%A5%E5%A4%A7%E8%8D%AF%E6%88%BF%3C/text%3E%3C/svg%3E', status:'pending', submittedAt:'2025-08-10'}
  ]

};


// ==================== DB 数据访问对象 ====================
var DB = {
  _store: 'xiaowei_db',  // localStorage 存储键名

  // ---------- 内部工具方法 ----------

  // 读取 localStorage 全部数据
  _read: function() {
    var raw = localStorage.getItem(this._store);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[DB] localStorage 数据解析失败，将重新初始化', e);
      return null;
    }
  },

  // 写入 localStorage
  _write: function(data) {
    try {
      localStorage.setItem(this._store, JSON.stringify(data));
    } catch (e) {
      console.error('[DB] localStorage 写入失败', e);
    }
  },

  // 深拷贝（避免直接修改 SEED_DATA 原始对象）
  _clone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // 获取今日日期字符串 YYYY-MM-DD
  _today: function() {
    var d = new Date();
    var y = d.getFullYear();
    var m = ('0' + (d.getMonth() + 1)).slice(-2);
    var day = ('0' + d.getDate()).slice(-2);
    return y + '-' + m + '-' + day;
  },

  // 生成递增 ID
  _nextId: function(list) {
    var maxId = 0;
    for (var i = 0; i < list.length; i++) {
      if (typeof list[i].id === 'number' && list[i].id > maxId) {
        maxId = list[i].id;
      }
    }
    return maxId + 1;
  },

  // 简单对象合并（target <- source，不覆盖已有值除非 source 中有）
  _merge: function(target, source) {
    var result = {};
    var key;
    for (key in target) {
      if (target.hasOwnProperty(key)) result[key] = target[key];
    }
    for (key in source) {
      if (source.hasOwnProperty(key)) result[key] = source[key];
    }
    return result;
  },

  // ---------- 公开 API ----------

  /**
   * 初始化：如果 localStorage 没有数据，用 SEED_DATA 初始化
   * 页面加载时调用一次即可
   */
  init: function() {
    var data = this._read();
    if (!data) {
      data = this._clone(SEED_DATA);
      this._write(data);
      console.log('[DB] 已用种子数据初始化');
    }
  },

  /**
   * 获取某实体的所有数据
   * @param {string} entity - 实体名，如 'clinics'
   * @returns {Array} 数据数组（返回副本，修改不影响存储）
   */
  getAll: function(entity) {
    var data = this._read();
    if (!data || !data[entity]) return [];
    return this._clone(data[entity]);
  },

  /**
   * 按 ID 查询
   * @param {string} entity - 实体名
   * @param {number} id - 记录 ID
   * @returns {Object|null} 匹配的记录（副本），未找到返回 null
   */
  getById: function(entity, id) {
    var list = this.getAll(entity);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  },

  /**
   * 新增记录，自动生成递增 id 和 createdAt 时间戳
   * @param {string} entity - 实体名
   * @param {Object} item - 新增数据（不含 id）
   * @returns {Object} 新增后的完整记录（含 id 和 createdAt）
   */
  add: function(entity, item) {
    var data = this._read();
    if (!data) {
      this.init();
      data = this._read();
    }
    if (!data[entity]) data[entity] = [];

    var list = data[entity];
    var newItem = this._merge({}, item);
    newItem.id = this._nextId(list);
    // 如果调用方未提供 createdAt，则自动填充今日日期
    if (!newItem.createdAt) {
      newItem.createdAt = this._today();
    }

    list.push(newItem);
    this._write(data);
    return this._clone(newItem);
  },

  /**
   * 更新记录（局部更新，合并到已有记录）
   * @param {string} entity - 实体名
   * @param {number} id - 记录 ID
   * @param {Object} patch - 要更新的字段
   * @returns {Object|null} 更新后的完整记录，未找到返回 null
   */
  update: function(entity, id, patch) {
    var data = this._read();
    if (!data || !data[entity]) return null;

    var list = data[entity];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i] = this._merge(list[i], patch);
        list[i].id = id; // 确保 id 不被覆盖
        this._write(data);
        return this._clone(list[i]);
      }
    }
    return null;
  },

  /**
   * 删除记录
   * @param {string} entity - 实体名
   * @param {number} id - 记录 ID
   * @returns {boolean} 删除成功返回 true，未找到返回 false
   */
  delete: function(entity, id) {
    var data = this._read();
    if (!data || !data[entity]) return false;

    var list = data[entity];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
        this._write(data);
        return true;
      }
    }
    return false;
  },

  /**
   * 在指定 fields 中搜索关键词（不区分大小写）
   * @param {string} entity - 实体名
   * @param {string} keyword - 搜索关键词
   * @param {Array<string>} fields - 搜索字段列表，省略则搜索所有字段
   * @returns {Array} 匹配的记录数组
   */
  search: function(entity, keyword, fields) {
    var list = this.getAll(entity);
    if (!keyword) return list;

    var kw = String(keyword).toLowerCase();
    var flds = fields && fields.length ? fields : (list.length ? Object.keys(list[0]) : []);

    var result = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      for (var j = 0; j < flds.length; j++) {
        var field = flds[j];
        var val = item[field];
        if (val !== undefined && val !== null && val !== '') {
          if (String(val).toLowerCase().indexOf(kw) !== -1) {
            result.push(item);
            break; // 匹配到一个字段即可，跳到下一条记录
          }
        }
      }
    }
    return result;
  },

  /**
   * 按 {field: value} 条件筛选（多条件为 AND 关系）
   * @param {string} entity - 实体名
   * @param {Object} conditions - 筛选条件，如 {status:'active', region:'浙江杭州'}
   * @returns {Array} 匹配的记录数组
   */
  filter: function(entity, conditions) {
    var list = this.getAll(entity);
    if (!conditions) return list;

    var keys = Object.keys(conditions);
    if (keys.length === 0) return list;

    var result = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var match = true;
      for (var j = 0; j < keys.length; j++) {
        var k = keys[j];
        if (item[k] !== conditions[k]) {
          match = false;
          break;
        }
      }
      if (match) result.push(item);
    }
    return result;
  },

  /**
   * 分页工具方法（对任意数组进行分页）
   * @param {Array} data - 数据数组
   * @param {number} page - 当前页码（从 1 开始）
   * @param {number} pageSize - 每页条数
   * @returns {Object} {data, total, totalPages, current}
   */
  paginate: function(data, page, pageSize) {
    page = page || 1;
    pageSize = pageSize || 10;
    if (page < 1) page = 1;

    var total = data.length;
    var totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);
    if (totalPages > 0 && page > totalPages) page = totalPages;

    var start = (page - 1) * pageSize;
    var end = start + pageSize;

    return {
      data: data.slice(start, end),
      total: total,
      totalPages: totalPages,
      current: page
    };
  },

  /**
   * 重置为种子数据：清除 localStorage 并重新初始化
   */
  reset: function() {
    localStorage.removeItem(this._store);
    this.init();
    console.log('[DB] 数据已重置为种子数据');
  }
};
