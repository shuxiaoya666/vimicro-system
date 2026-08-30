var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    products: [],
    filteredProducts: [],
    keyword: '',
    activeCategory: '',
    categories: [
      { value: '', label: '全部' },
      { value: '种植体', label: '种植体' },
      { value: '配件', label: '配件' },
      { value: '耗材', label: '耗材' },
      { value: '工具', label: '工具' }
    ]
  },
  onLoad() {
    if (!app.globalData.token) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    this.loadProducts();
  },
  loadProducts() {
    var that = this;
    var data = {};
    if (this.data.activeCategory) {
      data.filter = this.data.activeCategory;
    }
    api.getData('clientProducts', data).then(function(res) {
      that.setData({ products: res || [], filteredProducts: res || [] });
    }).catch(function() {
      that.setData({ products: [], filteredProducts: [] });
    });
  },
  onSearch(e) {
    var kw = e.detail.value.toLowerCase();
    this.setData({ keyword: kw });
    this.filterProducts();
  },
  selectCategory(e) {
    var cat = e.currentTarget.dataset.value;
    this.setData({ activeCategory: cat });
    this.loadProducts();
  },
  filterProducts() {
    var kw = this.data.keyword;
    var list = this.data.products.filter(function(p) {
      return !kw || (p.name && p.name.toLowerCase().indexOf(kw) !== -1) || (p.desc && p.desc.toLowerCase().indexOf(kw) !== -1);
    });
    this.setData({ filteredProducts: list });
  },
  goProductDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/product-detail/product-detail?id=' + id });
  }
});
