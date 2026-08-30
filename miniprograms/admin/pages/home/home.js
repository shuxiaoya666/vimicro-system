var app = getApp();
var api = require('../../utils/api.js');
var menuData = require('../../utils/menu.js');

Page({
  data: {
    userInfo: null,
    port: 'platform',
    portName: '小唯平台端',
    portIcon: '🏠',
    portColor: '#1abc9c',
    stats: [],
    quickMenus: [],
    recentList: [],
    loading: true
  },

  onLoad() {
    if (!app.globalData.token) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    if (!app.globalData.port) {
      wx.redirectTo({ url: '/pages/port/port' });
      return;
    }
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadPortData();
  },

  onShow() {
    if (app.globalData.token && app.globalData.port) {
      this.loadPortData();
    }
  },

  loadPortData() {
    var port = app.globalData.port;
    var config = menuData.PORT_CONFIG[port];
    if (!config) return;

    var menus = config.menus;
    var quickMenus = [];
    menus.forEach(function(group) {
      group.items.forEach(function(item) {
        quickMenus.push(item);
      });
    });
    quickMenus = quickMenus.slice(0, 8);

    this.setData({
      port: port,
      portName: config.name,
      portIcon: config.icon,
      portColor: config.color,
      quickMenus: quickMenus
    });

    this.loadStats(port);
    this.loadRecent(port);
  },

  loadStats(port) {
    var self = this;
    var statsMap = {
      platform: [
        { label: '诊所总数', value: 7, icon: '🏥' },
        { label: '药店总数', value: 6, icon: '💊' },
        { label: '经销商', value: 6, icon: '👤' },
        { label: '种植体卡', value: 8, icon: '💳' }
      ],
      clinic: [
        { label: '今日核销', value: 0, icon: '📋' },
        { label: '患者总数', value: 7, icon: '👤' },
        { label: '加工单', value: 5, icon: '📄' },
        { label: '植入体', value: 8, icon: '🦷' }
      ],
      dealer: [
        { label: '诊所客户', value: 42, icon: '🏥' },
        { label: '药房客户', value: 18, icon: '💊' },
        { label: '本月佣金', value: 38620, icon: '💰' },
        { label: '可提现', value: 38620, icon: '💳' }
      ],
      pharmacy: [
        { label: '卡销量', value: 1280, icon: '💳' },
        { label: '库存', value: 320, icon: '📦' },
        { label: '采购单', value: 3, icon: '🛒' },
        { label: '客户数', value: 45, icon: '👤' }
      ],
      factory: [
        { label: '待产订单', value: 5, icon: '📋' },
        { label: '月产能', value: 12000, icon: '🏭' },
        { label: '质检合格', value: 99.5, icon: '✅', suffix: '%' },
        { label: '异常待处理', value: 0, icon: '⚠️' }
      ]
    };

    var stats = statsMap[port] || statsMap.platform;
    self.setData({ stats: stats, loading: false });
  },

  loadRecent(port) {
    var recentMap = {
      platform: [
        { title: '仁爱口腔诊所提交注册申请', time: '2小时前', status: 'pending' },
        { title: '康贝口腔门诊部审核通过', time: '5小时前', status: 'active' },
        { title: '健佳大药房新增1280张卡', time: '1天前', status: 'active' }
      ],
      clinic: [
        { title: '患者周小明完成种植手术', time: '1小时前', status: 'active' },
        { title: '加工单 #20250801 已发货', time: '3小时前', status: 'active' },
        { title: '患者吴丽红建档成功', time: '1天前', status: 'active' }
      ],
      dealer: [
        { title: '新增诊所客户：博雅口腔诊所', time: '2小时前', status: 'active' },
        { title: '佣金结算到账 ¥38620', time: '1天前', status: 'active' }
      ],
      pharmacy: [
        { title: '种植卡库存补充320张', time: '3小时前', status: 'active' },
        { title: '采购订单已确认', time: '1天前', status: 'active' }
      ],
      factory: [
        { title: '订单 #ORD-2025-081 已发货', time: '2小时前', status: 'active' },
        { title: '质检批次 QC-0816 合格', time: '5小时前', status: 'active' }
      ]
    };

    this.setData({ recentList: recentMap[port] || recentMap.platform });
  },

  goPort() {
    wx.navigateTo({ url: '/pages/port/port' });
  },

  goList() {
    wx.switchTab({ url: '/pages/list/list' });
  },

  goMenu(e) {
    var key = e.currentTarget.dataset.key;
    var special = e.currentTarget.dataset.special;
    if (special === 'patientQuery') {
      wx.navigateTo({ url: '/pages/patient-query/patient-query' });
    } else if (special === 'regReview') {
      wx.navigateTo({ url: '/pages/reg-review/reg-review' });
    } else {
      var entity = e.currentTarget.dataset.entity;
      wx.switchTab({ url: '/pages/list/list' });
      var pages = getCurrentPages();
      var listPage = pages[pages.length - 1];
    }
  }
});
