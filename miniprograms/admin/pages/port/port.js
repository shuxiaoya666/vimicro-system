var app = getApp();
var menuData = require('../../utils/menu.js');

Page({
  data: {
    userInfo: null,
    ports: []
  },
  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    var user = app.globalData.userInfo;
    var config = menuData.PORT_CONFIG;
    var ports = [];
    var portKeys = ['platform', 'clinic', 'dealer', 'pharmacy', 'factory'];
    portKeys.forEach(function(key) {
      if (user.ports && user.ports.indexOf(key) !== -1) {
        ports.push({
          key: key,
          name: config[key].name,
          icon: config[key].icon,
          color: config[key].color
        });
      }
    });
    this.setData({ userInfo: user, ports: ports });
  },
  selectPort(e) {
    var port = e.currentTarget.dataset.port;
    app.globalData.port = port;
    wx.setStorageSync('port', port);
    wx.switchTab({ url: '/pages/home/home' });
  }
});
