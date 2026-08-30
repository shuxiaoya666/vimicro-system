var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    orders: [],
    filteredOrders: [],
    activeFilter: '',
    filters: [
      { value: '', label: '全部' },
      { value: 'processing', label: '进行中' },
      { value: 'active', label: '已完成' }
    ]
  },
  onLoad() {
    if (!app.globalData.token) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.loadOrders();
  },
  onShow() {
    this.loadOrders();
  },
  loadOrders() {
    var that = this;
    api.getData('clientOrders').then(function(res) {
      that.setData({ orders: res || [], filteredOrders: res || [] });
    }).catch(function() {});
  },
  selectFilter(e) {
    var val = e.currentTarget.dataset.value;
    this.setData({ activeFilter: val });
    if (!val) {
      this.setData({ filteredOrders: this.data.orders });
    } else {
      this.setData({
        filteredOrders: this.data.orders.filter(function(o) { return o.status === val; })
      });
    }
  }
});
