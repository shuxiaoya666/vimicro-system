var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: { account: '', password: '', loading: false },
  onLoad() {
    var token = wx.getStorageSync('token');
    if (token) { wx.redirectTo({ url: '/pages/port/port' }); }
  },
  onAccountChange(e) { this.setData({ account: e.detail.value }); },
  onPasswordChange(e) { this.setData({ password: e.detail.value }); },
  doLogin() {
    var account = this.data.account.trim().toLowerCase();
    var password = this.data.password;
    if (!account || !password) { wx.showToast({ title: '请输入账号和密码', icon: 'none' }); return; }
    this.setData({ loading: true });
    api.login(account, password).then(function(res) {
      app.globalData.token = res.token;
      app.globalData.userInfo = res.user;
      wx.setStorageSync('token', res.token);
      wx.setStorageSync('userInfo', res.user);
      wx.redirectTo({ url: '/pages/port/port' });
    }).catch(function() {
      wx.showToast({ title: '账号或密码错误', icon: 'none' });
    }).finally(function() {
      this.setData({ loading: false });
    }.bind(this));
  }
});
