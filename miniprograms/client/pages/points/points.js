var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    totalPoints: 1268,
    transactions: []
  },
  onLoad() {
    if (!app.globalData.token) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.loadData();
  },
  loadData() {
    var that = this;
    api.getData('clientTransactions').then(function(res) {
      that.setData({ transactions: res || [] });
    }).catch(function() {});
  }
});
