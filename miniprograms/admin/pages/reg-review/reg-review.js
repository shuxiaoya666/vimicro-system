var app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
    activeTab: 'pending',
    pendingList: [],
    approvedList: [],
    rejectedList: [],
    currentList: [],
    loading: false
  },

  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    this.loadRegList();
  },

  onShow() { this.loadRegList(); },

  loadRegList() {
    var self = this;
    this.setData({ loading: true });
    api.getData('registrations', { pageSize: 100 }).then(function(res) {
      var data = res.data || res || [];
      if (!Array.isArray(data)) data = [];
      self.categorize(data);
      self.setData({ loading: false });
    }).catch(function() {
      var mock = self.getMockRegistrations();
      self.categorize(mock);
      self.setData({ loading: false });
    });
  },

  getMockRegistrations() {
    return [
      { id: 4, name: '康贝口腔门诊部', type: 'clinic', owner: '王秀英', phone: '139-5566-7788', region: '江苏南京', submittedAt: '2025-07-25', status: 'pending' },
      { id: 5, name: '德仁口腔中心', type: 'clinic', owner: '刘建国', phone: '135-6677-8899', region: '湖北武汉', submittedAt: '2025-07-15', status: 'pending' },
      { id: 4, name: '仁心药房', type: 'pharmacy', manager: '冯丽', phone: '136-2200-3300', region: '四川成都', submittedAt: '2025-07-20', status: 'pending' },
      { id: 1, name: '仁爱口腔诊所', type: 'clinic', owner: '李明华', phone: '138-0011-2233', region: '浙江杭州', submittedAt: '2025-07-28', status: 'approved', approvedAt: '2025-07-29' },
      { id: 1, name: '健佳大药房', type: 'pharmacy', manager: '周明', phone: '138-1122-3344', region: '浙江杭州', submittedAt: '2025-06-10', status: 'approved', approvedAt: '2025-06-11' },
      { id: 2, name: '同德堂药房', type: 'pharmacy', manager: '吴芳', phone: '139-5544-6677', region: '江苏苏州', submittedAt: '2025-06-05', status: 'approved', approvedAt: '2025-06-06' },
      { id: 7, name: '和谐口腔门诊', type: 'clinic', owner: '孙美玲', phone: '132-9988-7766', region: '北京', submittedAt: '2025-05-12', status: 'rejected', rejectedAt: '2025-05-14', reason: '资质不齐全' }
    ];
  },

  categorize(data) {
    var pending = [], approved = [], rejected = [];
    data.forEach(function(item) {
      if (item.status === 'pending') pending.push(item);
      else if (item.status === 'approved') approved.push(item);
      else if (item.status === 'rejected') rejected.push(item);
    });
    this.setData({
      pendingList: pending,
      approvedList: approved,
      rejectedList: rejected,
      currentList: this.data.activeTab === 'pending' ? pending : this.data.activeTab === 'approved' ? approved : rejected
    });
  },

  switchTab(e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab,
      currentList: tab === 'pending' ? this.data.pendingList : tab === 'approved' ? this.data.approvedList : this.data.rejectedList
    });
  },

  approveReg(e) {
    var self = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认审核',
      content: '确定要通过该注册申请吗？',
      success: function(res) {
        if (res.confirm) {
          api.updateData('registrations', id, { status: 'approved' }).then(function() {
            wx.showToast({ title: '审核通过', icon: 'success' });
            self.loadRegList();
          }).catch(function() {
            self.mockApprove(id);
          });
        }
      }
    });
  },

  mockApprove(id) {
    var pending = this.data.pendingList.filter(function(r) { return r.id != id; });
    var approved = this.data.approvedList.slice();
    var item = this.data.pendingList.find(function(r) { return r.id == id; });
    if (item) { item.status = 'approved'; item.approvedAt = '2025-08-16'; approved.unshift(item); }
    this.setData({
      pendingList: pending,
      approvedList: approved,
      currentList: pending
    });
    wx.showToast({ title: '审核通过', icon: 'success' });
  },

  rejectReg(e) {
    var self = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '驳回申请',
      content: '确定要驳回该注册申请吗？',
      editable: true,
      placeholderText: '请输入驳回原因',
      success: function(res) {
        if (res.confirm) {
          var reason = res.content || '审核未通过';
          api.updateData('registrations', id, { status: 'rejected', reason: reason }).then(function() {
            wx.showToast({ title: '已驳回', icon: 'success' });
            self.loadRegList();
          }).catch(function() {
            self.mockReject(id, reason);
          });
        }
      }
    });
  },

  mockReject(id, reason) {
    var pending = this.data.pendingList.filter(function(r) { return r.id != id; });
    var rejected = this.data.rejectedList.slice();
    var item = this.data.pendingList.find(function(r) { return r.id == id; });
    if (item) { item.status = 'rejected'; item.rejectedAt = '2025-08-16'; item.reason = reason; rejected.unshift(item); }
    this.setData({
      pendingList: pending,
      rejectedList: rejected,
      currentList: pending
    });
    wx.showToast({ title: '已驳回', icon: 'success' });
  }
});
