var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    cards: [],
    showForm: false,
    cardNo: '',
    patient: '',
    clinic: '',
    implantType: ''
  },
  onLoad() {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    this.loadCards();
  },
  loadCards() {
    var that = this;
    api.getData('clientCards').then(function(res) {
      that.setData({ cards: res || [] });
    }).catch(function() {});
  },
  toggleForm() { this.setData({ showForm: !this.data.showForm }); },
  onCardNoInput(e) { this.setData({ cardNo: e.detail.value }); },
  onPatientInput(e) { this.setData({ patient: e.detail.value }); },
  onClinicInput(e) { this.setData({ clinic: e.detail.value }); },
  onImplantTypeInput(e) { this.setData({ implantType: e.detail.value }); },
  submitCard() {
    if (!this.data.cardNo || !this.data.patient || !this.data.clinic) {
      wx.showToast({ title: '请填写必填项', icon: 'none' });
      return;
    }
    var that = this;
    api.createData('clientCards', {
      cardNo: this.data.cardNo,
      patient: this.data.patient,
      clinic: this.data.clinic,
      implantType: this.data.implantType,
      bindDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }).then(function() {
      wx.showToast({ title: '绑定成功', icon: 'success' });
      that.setData({ showForm: false, cardNo: '', patient: '', clinic: '', implantType: '' });
      that.loadCards();
    }).catch(function() {
      wx.showToast({ title: '绑定失败', icon: 'none' });
    });
  }
});
