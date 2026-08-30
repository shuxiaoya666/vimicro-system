App({
  globalData: {
    apiBase: 'https://xiaowei-backend.loca.lt/api',
    token: null,
    userInfo: null,
    port: 'client'
  },
  onLaunch() {
    var token = wx.getStorageSync('token');
    if (token) {
      this.globalData.token = token;
    }
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  }
});
