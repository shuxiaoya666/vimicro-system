var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: { records: [], showForm: false, type: '', content: '', amount: 0 },
  onLoad() { if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; } this.loadData(); },
  loadData() { var that = this; api.getData('clientService').then(function(res) { that.setData({ records: res || [] }); }).catch(function() {}); },
  toggleForm() { this.setData({ showForm: !this.data.showForm }); },
  onTypeChange(e) { this.setData({ type: e.detail.value }); },
  onContentInput(e) { this.setData({ content: e.detail.value }); },
  submitService() {
    if (!this.data.type || !this.data.content) { wx.showToast({ title: '请填写完整', icon: 'none' }); return; }
    var that = this;
    api.createData('clientService', { no: 'SR-' + Date.now(), type: this.data.type, content: this.data.content, amount: 0, status: 'pending', date: new Date().toISOString().split('T')[0] }).then(function() {
      wx.showToast({ title: '提交成功', icon: 'success' }); that.setData({ showForm: false, type: '', content: '' }); that.loadData();
    }).catch(function() { wx.showToast({ title: '提交失败', icon: 'none' }); });
  }
});
