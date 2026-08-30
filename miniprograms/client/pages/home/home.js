var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    userInfo: null,
    orders: [],
    points: 1268,
    cards: [],
    progress: [],
    quickActions: [
      { icon: '🦷', name: '我要种植', page: '/pages/plant/plant', color: '#1abc9c' },
      { icon: '🛒', name: '小唯商场', page: '/pages/mall/mall', color: '#3498db' },
      { icon: '📋', name: '我的订单', page: '/pages/orders/orders', color: '#f39c12' },
      { icon: '📊', name: '种植进度', page: '/pages/progress/progress', color: '#9b59b6' },
      { icon: '🎁', name: '我的积分', page: '/pages/points/points', color: '#e74c3c' },
      { icon: '💳', name: '实体卡绑定', page: '/pages/cards/cards', color: '#1abc9c' },
      { icon: '⭐', name: '我的评价', page: '/pages/reviews/reviews', color: '#f39c12' },
      { icon: '🛠️', name: '售后质保', page: '/pages/service/service', color: '#3498db' }
    ]
  },
  onLoad() {
    if (!app.globalData.token) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadData();
  },
  onShow() {
    if (app.globalData.token) {
      this.loadData();
    }
  },
  loadData() {
    var that = this;
    api.getData('clientOrders').then(function(res) {
      that.setData({ orders: res.slice(0, 3) });
    }).catch(function() {});
    api.getData('clientCards').then(function(res) {
      that.setData({ cards: res });
    }).catch(function() {});
  },
  goPage(e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({ url: page });
  },
  goPlant() {
    wx.navigateTo({ url: '/pages/plant/plant' });
  }
});
