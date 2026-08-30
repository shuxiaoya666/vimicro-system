var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    step: 1,
    clinics: [],
    selectedClinicId: null,
    steps: [
      { num: 1, name: '绑定种植卡' },
      { num: 2, name: '登录认证' },
      { num: 3, name: '种植须知' },
      { num: 4, name: '选择诊所' },
      { num: 5, name: '确认信息' }
    ],
    cardNo: '',
    cardPassword: ''
  },
  onLoad() {
    if (!app.globalData.token) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.loadClinics();
  },
  loadClinics() {
    var that = this;
    api.getData('clinics', { filter: 'active' }).then(function(res) {
      that.setData({ clinics: res || [] });
    }).catch(function() {});
  },
  onCardNoInput(e) { this.setData({ cardNo: e.detail.value }); },
  onCardPasswordInput(e) { this.setData({ cardPassword: e.detail.value }); },
  nextStep() {
    if (this.data.step < 5) {
      this.setData({ step: this.data.step + 1 });
    }
  },
  prevStep() {
    if (this.data.step > 1) {
      this.setData({ step: this.data.step - 1, selectedClinicId: null });
    }
  },
  selectClinic(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({ selectedClinicId: id });
  },
  confirmPlant() {
    var clinic = this.data.clinics.find(function(c) { return c.id === this.data.selectedClinicId; }.bind(this));
    if (!clinic) {
      wx.showToast({ title: '请选择诊所', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '确认种植申请',
      content: '已选择 ' + clinic.name + '，确认提交种植申请？',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({ title: '申请已提交', icon: 'success' });
          setTimeout(function() {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  }
});
