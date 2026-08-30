var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: { steps: [
    { num: 1, name: '购买种植卡', done: true, date: '2025-08-01' },
    { num: 2, name: '选择诊所', done: true, date: '2025-08-03' },
    { num: 3, name: 'CBCT检查', done: true, date: '2025-08-05' },
    { num: 4, name: '种植手术', done: false, date: '预约中' },
    { num: 5, name: '骨结合期', done: false, date: '待定' },
    { num: 6, name: '安装牙冠', done: false, date: '待定' },
    { num: 7, name: '完成修复', done: false, date: '待定' }
  ]},
  onLoad() { if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; } }
});
