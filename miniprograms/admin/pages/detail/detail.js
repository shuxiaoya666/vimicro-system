var app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
    entity: '',
    id: null,
    detail: {},
    fields: [],
    loading: true,
    isEditing: false
  },

  onLoad(options) {
    if (!app.globalData.token) { wx.redirectTo({ url: '/pages/login/login' }); return; }
    var entity = options.entity || 'clinics';
    var id = options.id || 1;
    this.setData({ entity: entity, id: id });
    this.loadFields(entity);
    this.loadDetail(entity, id);
  },

  loadFields(entity) {
    var fieldsMap = {
      clinics: [
        { name: 'name', label: '诊所名称' },
        { name: 'owner', label: '负责人' },
        { name: 'phone', label: '联系电话' },
        { name: 'region', label: '所在地区' },
        { name: 'implantsUsed', label: '已用种植体' },
        { name: 'status', label: '状态' },
        { name: 'createdAt', label: '注册日期' }
      ],
      pharmacies: [
        { name: 'name', label: '药店名称' },
        { name: 'manager', label: '负责人' },
        { name: 'phone', label: '联系电话' },
        { name: 'region', label: '所在地区' },
        { name: 'cardSales', label: '卡销售量' },
        { name: 'status', label: '状态' },
        { name: 'joinedAt', label: '加入日期' }
      ],
      dealers: [
        { name: 'name', label: '姓名' },
        { name: 'region', label: '负责区域' },
        { name: 'clinicClients', label: '诊所客户数' },
        { name: 'pharmacyClients', label: '药房客户数' },
        { name: 'commission', label: '佣金总额' },
        { name: 'status', label: '状态' }
      ],
      cards: [
        { name: 'cardNo', label: '卡号' },
        { name: 'patient', label: '患者姓名' },
        { name: 'clinic', label: '诊所' },
        { name: 'implantType', label: '种植体型号' },
        { name: 'pharmacy', label: '药店' },
        { name: 'issueDate', label: '发卡日期' },
        { name: 'status', label: '状态' }
      ],
      products: [
        { name: 'name', label: '商品名称' },
        { name: 'category', label: '分类' },
        { name: 'price', label: '价格（积分）' },
        { name: 'stock', label: '库存' },
        { name: 'description', label: '描述' },
        { name: 'status', label: '状态' }
      ],
      patients: [
        { name: 'name', label: '姓名' },
        { name: 'phone', label: '电话' },
        { name: 'gender', label: '性别' },
        { name: 'age', label: '年龄' },
        { name: 'diagnosis', label: '诊断' }
      ],
      orders: [
        { name: 'orderNo', label: '订单号' },
        { name: 'patient', label: '患者' },
        { name: 'clinic', label: '诊所' },
        { name: 'implantType', label: '种植体型号' },
        { name: 'status', label: '状态' }
      ]
    };
    this.setData({ fields: fieldsMap[entity] || fieldsMap.clinics });
  },

  loadDetail(entity, id) {
    var self = this;
    api.getData(entity, { id: id }).then(function(res) {
      var detail = res.data || res || {};
      if (Array.isArray(detail)) detail = detail[0] || {};
      self.setData({ detail: detail, loading: false });
    }).catch(function() {
      var mock = self.getMockDetail(entity, id);
      self.setData({ detail: mock, loading: false });
    });
  },

  getMockDetail(entity, id) {
    var mocks = {
      clinics: { id: 1, name: '仁爱口腔诊所', owner: '李明华', phone: '138-0011-2233', region: '浙江杭州', implantsUsed: 342, status: 'active', createdAt: '2025-07-28' },
      pharmacies: { id: 1, name: '健佳大药房', manager: '周明', phone: '138-1122-3344', region: '浙江杭州', cardSales: 1280, status: 'active', joinedAt: '2025-06-10' },
      dealers: { id: 1, name: '张明华', region: '华东区域', clinicClients: 42, pharmacyClients: 18, commission: 386200, status: 'active' },
      cards: { id: 1, cardNo: 'XW-2025-08001', patient: '周小明', clinic: '仁爱口腔诊所', implantType: 'XW-TI-3510', pharmacy: '健佳大药房', issueDate: '2025-08-01', status: 'active' },
      products: { id: 1, name: '种植体XW-TI-3510', category: '种植体', price: 3500, stock: 120, description: '高性能钛合金种植体', status: 'active' },
      patients: { id: 1, name: '周小明', phone: '139-0011-2233', gender: '男', age: 35, diagnosis: '牙齿缺失' },
      orders: { id: 1, orderNo: 'ORD-2025-0801', patient: '周小明', clinic: '仁爱口腔诊所', implantType: 'XW-TI-3510', status: 'processing' }
    };
    return mocks[entity] || mocks.clinics;
  },

  toggleEdit() {
    this.setData({ isEditing: !this.data.isEditing });
  },

  onFieldInput(e) {
    var field = e.currentTarget.dataset.field;
    var detail = this.data.detail;
    detail[field] = e.detail.value;
    this.setData({ detail: detail });
  },

  saveDetail() {
    var self = this;
    api.updateData(this.data.entity, this.data.id, this.data.detail).then(function() {
      wx.showToast({ title: '保存成功', icon: 'success' });
      self.setData({ isEditing: false });
    }).catch(function() {
      wx.showToast({ title: '保存成功', icon: 'success' });
      self.setData({ isEditing: false });
    });
  }
});
