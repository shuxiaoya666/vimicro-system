var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: { reviews: [], showForm: false, type: '', target: '', rating: 5, content: '' },
  onLoad() { if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; } this.loadReviews(); },
  loadReviews() { var that = this; api.getData('clientReviews').then(function(res) { that.setData({ reviews: res || [] }); }).catch(function() {}); },
  toggleForm() { this.setData({ showForm: !this.data.showForm }); },
  onTypeChange(e) { this.setData({ type: e.detail.value }); },
  onTargetInput(e) { this.setData({ target: e.detail.value }); },
  onRatingChange(e) { this.setData({ rating: parseInt(e.detail.value) }); },
  onContentInput(e) { this.setData({ content: e.detail.value }); },
  submitReview() {
    if (!this.data.type || !this.data.target || !this.data.content) { wx.showToast({ title: '请填写完整', icon: 'none' }); return; }
    var that = this;
    api.createData('clientReviews', { type: this.data.type, target: this.data.target, rating: this.data.rating, content: this.data.content, date: new Date().toISOString().split('T')[0], status: 'active' }).then(function() {
      wx.showToast({ title: '评价成功', icon: 'success' }); that.setData({ showForm: false, type: '', target: '', rating: 5, content: '' }); that.loadReviews();
    }).catch(function() { wx.showToast({ title: '提交失败', icon: 'none' }); });
  }
});
