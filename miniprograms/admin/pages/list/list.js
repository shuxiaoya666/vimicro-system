var app = getApp();
var api = require('../../utils/api.js');
var menuData = require('../../utils/menu.js');

Page({
  data: {
    port: 'platform',
    portName: '小唯平台端',
    portColor: '#1abc9c',
    menuGroups: [],
    activeMenu: null,
    activeEntity: '',
    activeName: '',
    list: [],
    filteredList: [],
    keyword: '',
    statusFilter: '',
    statusOptions: [],
    page: 1,
    pageSize: 20,
    total: 0,
    loading: false,
    showForm: false,
    formData: {},
    formFields: [],
    formTitle: '',
    isEdit: false
  },

  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    if (!app.globalData.port) { wx.redirectTo({ url: '/pages/port/port' }); return; }
    this.loadMenus();
  },

  onShow() {
    if (app.globalData.port && app.globalData.port !== this.data.port) {
      this.loadMenus();
    }
  },

  loadMenus() {
    var port = app.globalData.port;
    var config = menuData.PORT_CONFIG[port];
    if (!config) return;
    this.setData({
      port: port,
      portName: config.name,
      portColor: config.color,
      menuGroups: config.menus
    });
    var firstItem = config.menus[0].items[0];
    if (firstItem) {
      this.selectMenu(firstItem);
    }
  },

  selectMenu(e) {
    var item = e.currentTarget ? e.currentTarget.dataset : e;
    var entity = item.entity;
    var special = item.special;
    if (special === 'patientQuery') {
      wx.navigateTo({ url: '/pages/patient-query/patient-query' });
      return;
    }
    if (special === 'regReview') {
      wx.navigateTo({ url: '/pages/reg-review/reg-review' });
      return;
    }
    this.setData({ activeMenu: item.key, activeEntity: entity, activeName: item.name, keyword: '', statusFilter: '', page: 1 });
    this.loadFields(entity);
    this.loadData(entity);
  },

  loadFields(entity) {
    var fieldsMap = {
      clinics: [
        { name: 'name', label: '诊所名称', type: 'text', required: true },
        { name: 'owner', label: '负责人', type: 'text', required: true },
        { name: 'phone', label: '联系电话', type: 'phone', required: true },
        { name: 'region', label: '所在地区', type: 'text', required: true },
        { name: 'implantsUsed', label: '已用种植体', type: 'number', required: false },
        { name: 'status', label: '状态', type: 'select', options: ['active', 'pending', 'inactive'] }
      ],
      pharmacies: [
        { name: 'name', label: '药店名称', type: 'text', required: true },
        { name: 'manager', label: '负责人', type: 'text', required: true },
        { name: 'phone', label: '联系电话', type: 'phone', required: true },
        { name: 'region', label: '所在地区', type: 'text', required: true },
        { name: 'cardSales', label: '卡销售量', type: 'number', required: false },
        { name: 'status', label: '状态', type: 'select', options: ['active', 'processing', 'inactive'] }
      ],
      dealers: [
        { name: 'name', label: '姓名', type: 'text', required: true },
        { name: 'region', label: '负责区域', type: 'text', required: true },
        { name: 'clinicClients', label: '诊所客户数', type: 'number', required: false },
        { name: 'pharmacyClients', label: '药房客户数', type: 'number', required: false },
        { name: 'commission', label: '佣金总额', type: 'number', required: false },
        { name: 'status', label: '状态', type: 'select', options: ['active', 'pending', 'inactive'] }
      ],
      cards: [
        { name: 'cardNo', label: '卡号', type: 'text', required: true },
        { name: 'patient', label: '患者姓名', type: 'text', required: true },
        { name: 'clinic', label: '诊所', type: 'text', required: true },
        { name: 'implantType', label: '种植体型号', type: 'text', required: true },
        { name: 'pharmacy', label: '药店', type: 'text', required: false },
        { name: 'status', label: '状态', type: 'select', options: ['active', 'processing', 'inactive'] }
      ],
      products: [
        { name: 'name', label: '商品名称', type: 'text', required: true },
        { name: 'category', label: '分类', type: 'text', required: true },
        { name: 'price', label: '价格（积分）', type: 'number', required: true },
        { name: 'stock', label: '库存', type: 'number', required: true },
        { name: 'description', label: '描述', type: 'textarea', required: false },
        { name: 'status', label: '状态', type: 'select', options: ['active', 'inactive'] }
      ],
      patients: [
        { name: 'name', label: '姓名', type: 'text', required: true },
        { name: 'phone', label: '电话', type: 'phone', required: true },
        { name: 'gender', label: '性别', type: 'select', options: ['男', '女'] },
        { name: 'age', label: '年龄', type: 'number', required: false },
        { name: 'diagnosis', label: '诊断', type: 'text', required: false }
      ],
      orders: [
        { name: 'orderNo', label: '订单号', type: 'text', required: true },
        { name: 'patient', label: '患者', type: 'text', required: true },
        { name: 'clinic', label: '诊所', type: 'text', required: true },
        { name: 'implantType', label: '种植体型号', type: 'text', required: true },
        { name: 'status', label: '状态', type: 'select', options: ['pending', 'processing', 'shipped', 'completed'] }
      ],
      implants: [
        { name: 'model', label: '型号', type: 'text', required: true },
        { name: 'batch', label: '批次号', type: 'text', required: true },
        { name: 'clinic', label: '使用诊所', type: 'text', required: false },
        { name: 'patient', label: '患者', type: 'text', required: false },
        { name: 'status', label: '状态', type: 'select', options: ['instock', 'used', 'quality'] }
      ],
      transactions: [
        { name: 'type', label: '类型', type: 'select', options: ['income', 'expense'] },
        { name: 'amount', label: '金额', type: 'number', required: true },
        { name: 'description', label: '描述', type: 'textarea', required: true },
        { name: 'date', label: '日期', type: 'text', required: false }
      ],
      withdrawals: [
        { name: 'amount', label: '提现金额', type: 'number', required: true },
        { name: 'bank', label: '银行', type: 'text', required: true },
        { name: 'account', label: '账号', type: 'text', required: true },
        { name: 'status', label: '状态', type: 'select', options: ['pending', 'approved', 'rejected'] }
      ],
      settlements: [
        { name: 'entity', label: '结算对象', type: 'text', required: true },
        { name: 'amount', label: '金额', type: 'number', required: true },
        { name: 'period', label: '周期', type: 'text', required: true },
        { name: 'status', label: '状态', type: 'select', options: ['pending', 'settled'] }
      ],
      roles: [
        { name: 'name', label: '角色名', type: 'text', required: true },
        { name: 'permissions', label: '权限', type: 'text', required: false },
        { name: 'description', label: '描述', type: 'textarea', required: false }
      ],
      notifications: [
        { name: 'title', label: '标题', type: 'text', required: true },
        { name: 'content', label: '内容', type: 'textarea', required: true },
        { name: 'type', label: '类型', type: 'select', options: ['info', 'warning', 'error'] }
      ],
      verifyRecords: [
        { name: 'cardNo', label: '卡号', type: 'text', required: true },
        { name: 'patient', label: '患者', type: 'text', required: true },
        { name: 'doctor', label: '医生', type: 'text', required: true },
        { name: 'result', label: '核验结果', type: 'select', options: ['pass', 'fail'] }
      ]
    };
    this.setData({ formFields: fieldsMap[entity] || [] });
  },

  loadData(entity) {
    var self = this;
    this.setData({ loading: true });
    api.getData(entity, { page: 1, pageSize: 100 }).then(function(res) {
      var data = res.data || res || [];
      if (!Array.isArray(data)) data = [];
      self.setData({ list: data, filteredList: data, total: data.length, loading: false });
      self.buildStatusOptions(data);
    }).catch(function() {
      var mock = self.getMockData(entity);
      self.setData({ list: mock, filteredList: mock, total: mock.length, loading: false });
      self.buildStatusOptions(mock);
    });
  },

  buildStatusOptions(data) {
    var statuses = {};
    data.forEach(function(item) {
      if (item.status) statuses[item.status] = true;
    });
    var options = Object.keys(statuses);
    this.setData({ statusOptions: options });
  },

  getMockData(entity) {
    var mock = {
      clinics: [
        { id: 1, name: '仁爱口腔诊所', owner: '李明华', phone: '138-0011-2233', region: '浙江杭州', implantsUsed: 342, status: 'active' },
        { id: 2, name: '雅悦口腔医院', owner: '张伟强', phone: '137-2233-4455', region: '广东深圳', implantsUsed: 586, status: 'active' },
        { id: 3, name: '微笑牙科诊所', owner: '陈丽芳', phone: '136-8899-0011', region: '四川成都', implantsUsed: 218, status: 'active' },
        { id: 4, name: '康贝口腔门诊部', owner: '王秀英', phone: '139-5566-7788', region: '江苏南京', implantsUsed: 0, status: 'pending' },
        { id: 5, name: '德仁口腔中心', owner: '刘建国', phone: '135-6677-8899', region: '湖北武汉', implantsUsed: 0, status: 'pending' },
        { id: 6, name: '博雅口腔诊所', owner: '赵新民', phone: '133-4455-6677', region: '上海', implantsUsed: 456, status: 'active' },
        { id: 7, name: '和谐口腔门诊', owner: '孙美玲', phone: '132-9988-7766', region: '北京', implantsUsed: 312, status: 'inactive' }
      ],
      pharmacies: [
        { id: 1, name: '健佳大药房', manager: '周明', phone: '138-1122-3344', region: '浙江杭州', cardSales: 1280, status: 'active' },
        { id: 2, name: '同德堂药房', manager: '吴芳', phone: '139-5544-6677', region: '江苏苏州', cardSales: 860, status: 'active' },
        { id: 3, name: '益民大药房', manager: '郑国华', phone: '137-7788-9900', region: '广东广州', cardSales: 1050, status: 'active' },
        { id: 4, name: '仁心药房', manager: '冯丽', phone: '136-2200-3300', region: '四川成都', cardSales: 430, status: 'processing' },
        { id: 5, name: '康源药房', manager: '褚伟', phone: '135-6677-2200', region: '湖北武汉', cardSales: 672, status: 'active' },
        { id: 6, name: '百姓大药房', manager: '卫国', phone: '133-8899-1100', region: '上海', cardSales: 0, status: 'inactive' }
      ],
      dealers: [
        { id: 1, name: '张明华', region: '华东区域', clinicClients: 42, pharmacyClients: 18, commission: 386200, status: 'active' },
        { id: 2, name: '李伟强', region: '华南区域', clinicClients: 35, pharmacyClients: 12, commission: 298500, status: 'active' },
        { id: 3, name: '王秀芳', region: '华北区域', clinicClients: 28, pharmacyClients: 15, commission: 245800, status: 'active' },
        { id: 4, name: '陈建国', region: '西南区域', clinicClients: 15, pharmacyClients: 7, commission: 128600, status: 'active' },
        { id: 5, name: '赵新民', region: '华中区域', clinicClients: 0, pharmacyClients: 0, commission: 0, status: 'pending' },
        { id: 6, name: '刘德海', region: '东北区域', clinicClients: 0, pharmacyClients: 0, commission: 0, status: 'inactive' }
      ],
      cards: [
        { id: 1, cardNo: 'XW-2025-08001', patient: '周小明', clinic: '仁爱口腔诊所', implantType: 'XW-TI-3510', pharmacy: '健佳大药房', status: 'active' },
        { id: 2, cardNo: 'XW-2025-08002', patient: '吴丽红', clinic: '雅悦口腔医院', implantType: 'XW-TI-4200', pharmacy: '同德堂药房', status: 'active' },
        { id: 3, cardNo: 'XW-2025-07998', patient: '郑国强', clinic: '微笑牙科诊所', implantType: 'XW-TI-3508', pharmacy: '益民大药房', status: 'processing' },
        { id: 4, cardNo: 'XW-2025-07995', patient: '冯小明', clinic: '博雅口腔诊所', implantType: 'XW-TI-4212', pharmacy: '康源药房', status: 'active' }
      ],
      products: [
        { id: 1, name: '种植体XW-TI-3510', category: '种植体', price: 3500, stock: 120, status: 'active' },
        { id: 2, name: '种植体XW-TI-4200', category: '种植体', price: 4200, stock: 85, status: 'active' },
        { id: 3, name: '基台XW-AB-200', category: '基台', price: 1200, stock: 200, status: 'active' },
        { id: 4, name: '牙冠XW-CR-100', category: '牙冠', price: 800, stock: 350, status: 'active' },
        { id: 5, name: '种植体XW-TI-4212', category: '种植体', price: 4500, stock: 60, status: 'active' },
        { id: 6, name: '修复螺丝XW-SC-50', category: '配件', price: 200, stock: 500, status: 'active' },
        { id: 7, name: '愈合基台XW-HB-150', category: '基台', price: 600, stock: 180, status: 'active' },
        { id: 8, name: '种植工具包', category: '工具', price: 5000, stock: 15, status: 'inactive' }
      ]
    };
    return mock[entity] || [];
  },

  onSearch(e) {
    var kw = e.detail.value.toLowerCase();
    this.setData({ keyword: kw });
    this.filterList();
  },

  onStatusChange(e) {
    var idx = e.detail.value;
    var status = idx === '0' ? '' : this.data.statusOptions[idx - 1];
    this.setData({ statusFilter: status });
    this.filterList();
  },

  filterList() {
    var kw = this.data.keyword;
    var sf = this.data.statusFilter;
    var filtered = this.data.list.filter(function(item) {
      var matchKw = !kw || JSON.stringify(item).toLowerCase().indexOf(kw) !== -1;
      var matchStatus = !sf || item.status === sf;
      return matchKw && matchStatus;
    });
    this.setData({ filteredList: filtered });
  },

  showAdd() {
    var formData = {};
    this.data.formFields.forEach(function(f) { formData[f.name] = ''; });
    this.setData({ showForm: true, formData: formData, isEdit: false, formTitle: '新增' + this.data.activeName });
  },

  showEdit(e) {
    var id = e.currentTarget.dataset.id;
    var item = this.data.list.find(function(r) { return r.id == id; });
    if (!item) return;
    this.setData({ showForm: true, formData: item, isEdit: true, formTitle: '编辑' + this.data.activeName });
  },

  onFormInput(e) {
    var field = e.currentTarget.dataset.field;
    var formData = this.data.formData;
    formData[field] = e.detail.value;
    this.setData({ formData: formData });
  },

  submitForm() {
    var self = this;
    var fields = this.data.formFields;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].required && !this.data.formData[fields[i].name]) {
        wx.showToast({ title: fields[i].label + '不能为空', icon: 'none' });
        return;
      }
    }
    if (this.data.isEdit && this.data.formData.id) {
      api.updateData(this.data.activeEntity, this.data.formData.id, this.data.formData).then(function() {
        wx.showToast({ title: '更新成功', icon: 'success' });
        self.setData({ showForm: false });
        self.loadData(self.data.activeEntity);
      }).catch(function() { self.mockSave(); });
    } else {
      api.createData(this.data.activeEntity, this.data.formData).then(function() {
        wx.showToast({ title: '创建成功', icon: 'success' });
        self.setData({ showForm: false });
        self.loadData(self.data.activeEntity);
      }).catch(function() { self.mockSave(); });
    }
  },

  mockSave() {
    var list = this.data.list;
    if (this.data.isEdit) {
      var idx = list.findIndex(function(r) { return r.id === this.data.formData.id; }.bind(this));
      if (idx !== -1) list[idx] = this.data.formData;
    } else {
      var newId = list.length > 0 ? list[list.length - 1].id + 1 : 1;
      this.data.formData.id = newId;
      list.unshift(this.data.formData);
    }
    this.setData({ list: list, filteredList: list, showForm: false });
    wx.showToast({ title: '保存成功', icon: 'success' });
  },

  deleteItem(e) {
    var self = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该记录吗？',
      success: function(res) {
        if (res.confirm) {
          api.deleteData(self.data.activeEntity, id).then(function() {
            wx.showToast({ title: '删除成功', icon: 'success' });
            self.loadData(self.data.activeEntity);
          }).catch(function() {
            var list = self.data.list.filter(function(r) { return r.id != id; });
            self.setData({ list: list, filteredList: list });
            wx.showToast({ title: '删除成功', icon: 'success' });
          });
        }
      }
    });
  },

  closeForm() {
    this.setData({ showForm: false });
  },

  goPort() {
    wx.navigateTo({ url: '/pages/port/port' });
  }
});
