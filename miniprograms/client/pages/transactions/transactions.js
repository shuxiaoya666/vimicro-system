var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: { transactions: [], activeFilter: '', filters: [{ value: '', label: '全部' }, { value: '种植套餐', label: '种植套餐' }, { value: '商品购买', label: '商品购买' }, { value: '积分兑换', label: '积分兑换' }] },
  onLoad() { if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; } this.loadData(); },
  loadData() { var that = this; api.getData('clientTransactions').then(function(res) { that.setData({ transactions: res || [] }); }).catch(function() {}); },
  selectFilter(e) { var val = e.currentTarget.dataset.value; this.setData({ activeFilter: val }); if (!val) { this.setData({ transactions: this.data.transactions }); } }
});
