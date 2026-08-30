var app = getApp();
Page({
  data: {
    userInfo: null,
    menuList: [
      { icon: '📋', name: '我的订单', page: '/pages/orders/orders' },
      { icon: '📊', name: '种植进度', page: '/pages/progress/progress' },
      { icon: '🎁', name: '我的积分', page: '/pages/points/points' },
      { icon: '💳', name: '实体卡绑定', page: '/pages/cards/cards' },
      { icon: '⭐', name: '我的评价', page: '/pages/reviews/reviews' },
      { icon: '💰', name: '消费记录', page: '/pages/transactions/transactions' },
      { icon: '🛠️', name: '售后质保', page: '/pages/service/service' },
      { icon: '❓', name: '常见问题', page: '/pages/faq/faq' },
      { icon: '📚', name: '种植常识', page: '/pages/knowledge/knowledge' }
    ]
  },
  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    this.setData({ userInfo: app.globalData.userInfo });
  },
  goPage(e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({ url: page });
  },
  logout() {
    wx.showModal({
      title: '退出登录', content: '确定要退出登录吗？', success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('token'); wx.removeStorageSync('userInfo');
          app.globalData.token = null; app.globalData.userInfo = null;
          wx.redirectTo({ url: '/pages/login/login' });
        }
      }
    });
  }
});
