var app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
    port: 'platform',
    showPhone: true,
    keyword: '',
    typeFilter: '',
    patients: [],
    filteredList: [],
    selectedPatient: null,
    loading: false,
    stats: { total: 0, implant: 0, totalImplants: 0, completed: 0 }
  },

  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    var port = app.globalData.port || 'platform';
    this.setData({
      port: port,
      showPhone: port === 'clinic' || port === 'platform'
    });
    this.loadPatients();
  },

  loadPatients() {
    var self = this;
    this.setData({ loading: true });
    api.getData('patients', { pageSize: 100 }).then(function(res) {
      var data = res.data || res || [];
      if (!Array.isArray(data)) data = [];
      self.setData({ patients: data, filteredList: data, loading: false });
      self.calcStats(data);
    }).catch(function() {
      var mock = self.getMockPatients();
      self.setData({ patients: mock, filteredList: mock, loading: false });
      self.calcStats(mock);
    });
  },

  getMockPatients() {
    return [
      { id: 1, name: '周小明', phone: '139-0011-2233', gender: '男', age: 35, diagnosis: '牙齿缺失', type: 'implant', doctor: '李明华', implantModel: 'XW-TI-3510', implantDate: '2025-08-01', status: 'completed', clinic: '仁爱口腔诊所', recordNo: 'MR-2025-0801' },
      { id: 2, name: '吴丽红', phone: '137-2233-4455', gender: '女', age: 42, diagnosis: '牙周病', type: 'implant', doctor: '张伟强', implantModel: 'XW-TI-4200', implantDate: '2025-08-01', status: 'processing', clinic: '雅悦口腔医院', recordNo: 'MR-2025-0802' },
      { id: 3, name: '郑国强', phone: '136-8899-0011', gender: '男', age: 28, diagnosis: '外伤缺牙', type: 'implant', doctor: '陈丽芳', implantModel: 'XW-TI-3508', implantDate: '2025-07-30', status: 'processing', clinic: '微笑牙科诊所', recordNo: 'MR-2025-0798' },
      { id: 4, name: '冯小明', phone: '139-5566-7788', gender: '男', age: 45, diagnosis: '龋齿拔除', type: 'implant', doctor: '赵新民', implantModel: 'XW-TI-4212', implantDate: '2025-07-28', status: 'completed', clinic: '博雅口腔诊所', recordNo: 'MR-2025-0795' },
      { id: 5, name: '褚伟杰', phone: '138-0011-2233', gender: '男', age: 38, diagnosis: '牙齿缺失', type: 'repair', doctor: '李明华', implantModel: '-', implantDate: '-', status: 'completed', clinic: '仁爱口腔诊所', recordNo: 'MR-2025-0790' },
      { id: 6, name: '卫东', phone: '135-6677-8899', gender: '男', age: 52, diagnosis: '多颗缺失', type: 'implant', doctor: '张伟强', implantModel: 'XW-TI-3510', implantDate: '2025-07-25', status: 'completed', clinic: '雅悦口腔医院', recordNo: 'MR-2025-0785' },
      { id: 7, name: '李梅', phone: '133-4455-6677', gender: '女', age: 30, diagnosis: '正畸需求', type: 'orthodontics', doctor: '陈丽芳', implantModel: '-', implantDate: '-', status: 'processing', clinic: '微笑牙科诊所', recordNo: 'MR-2025-0780' }
    ];
  },

  calcStats(data) {
    var stats = { total: data.length, implant: 0, totalImplants: 0, completed: 0 };
    data.forEach(function(p) {
      if (p.type === 'implant') stats.implant++;
      if (p.status === 'completed') stats.completed++;
    });
    stats.totalImplants = stats.implant;
    this.setData({ stats: stats });
  },

  onSearch(e) {
    this.setData({ keyword: e.detail.value.toLowerCase() });
    this.filterList();
  },

  onTypeChange(e) {
    var idx = e.detail.value;
    var types = ['', 'implant', 'repair', 'orthodontics'];
    this.setData({ typeFilter: types[idx] });
    this.filterList();
  },

  filterList() {
    var kw = this.data.keyword;
    var tf = this.data.typeFilter;
    var filtered = this.data.patients.filter(function(p) {
      var matchKw = !kw || p.name.toLowerCase().indexOf(kw) !== -1 || (p.diagnosis && p.diagnosis.toLowerCase().indexOf(kw) !== -1) || (p.doctor && p.doctor.toLowerCase().indexOf(kw) !== -1) || (p.implantModel && p.implantModel.toLowerCase().indexOf(kw) !== -1);
      var matchType = !tf || p.type === tf;
      return matchKw && matchType;
    });
    this.setData({ filteredList: filtered });
  },

  showDetail(e) {
    var id = e.currentTarget.dataset.id;
    var patient = this.data.patients.find(function(p) { return p.id == id; });
    this.setData({ selectedPatient: patient });
  },

  closeDetail() {
    this.setData({ selectedPatient: null });
  },

  callPhone(e) {
    var phone = e.currentTarget.dataset.phone;
    if (!phone) return;
    wx.makePhoneCall({ phoneNumber: phone.replace(/[^0-9+]/g, '') });
  }
});
