var app = getApp();

Page({
  data: {
    userInfo: null,
    port: 'platform',
    portName: '小唯平台端'
  },

  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    var port = app.globalData.port || 'platform';
    var portNames = { platform: '小唯平台端', clinic: '诊所端', dealer: '经销商端', pharmacy: '药店端', factory: '工厂端' };
    this.setData({ userInfo: app.globalData.userInfo, port: port, portName: portNames[port] || port });
  },

  goPort() { wx.navigateTo({ url: '/pages/port/port' }); },

  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除本地缓存吗？',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({ title: '缓存已清除', icon: 'success' });
          setTimeout(function() { wx.redirectTo({ url: '/pages/login/login' }); }, 1500);
        }
      }
    });
  },

  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          app.globalData.token = null;
          app.globalData.userInfo = null;
          app.globalData.port = 'platform';
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('port');
          wx.redirectTo({ url: '/pages/login/login' });
        }
      }
    });
  },

  about() {
    wx.showModal({
      title: '关于小唯',
      content: '小唯种植体管理系统 v1.0\n口腔健康，信赖小唯\n© 2025 VMicro',
      showCancel: false
    });
  }
});
