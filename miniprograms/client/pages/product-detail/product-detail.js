var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    product: null,
    quantity: 1
  },
  onLoad(e) {
    var id = e.id;
    var that = this;
    api.getData('clientProducts').then(function(res) {
      var p = res.find(function(item) { return item.id == id; });
      if (p) {
        that.setData({ product: p });
        wx.setNavigationBarTitle({ title: p.name });
      }
    }).catch(function() {
      wx.showToast({ title: '加载失败', icon: 'none' });
    });
  },
  decreaseQty() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },
  increaseQty() {
    this.setData({ quantity: this.data.quantity + 1 });
  },
  buyNow() {
    var p = this.data.product;
    if (!p) return;
    var that = this;
    api.createData('clientOrders', {
      no: 'CO-' + Date.now(),
      type: '商品购买',
      item: p.name,
      amount: p.price * this.data.quantity,
      status: 'processing',
      createdAt: new Date().toISOString().split('T')[0]
    }).then(function() {
      wx.showToast({ title: '下单成功', icon: 'success' });
      setTimeout(function() {
        wx.redirectTo({ url: '/pages/orders/orders' });
      }, 1500);
    }).catch(function() {
      wx.showToast({ title: '下单失败', icon: 'none' });
    });
  }
});
