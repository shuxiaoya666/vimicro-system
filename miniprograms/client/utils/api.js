var app = getApp();

function request(options) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: app.globalData.apiBase + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': app.globalData.token ? 'Bearer ' + app.globalData.token : ''
      },
      success: function(res) {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          wx.removeStorageSync('token');
          wx.redirectTo({ url: '/pages/login/login' });
          reject(new Error('登录已过期'));
        } else {
          reject(new Error(res.data.message || '请求失败'));
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

function login(account, password) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { account: account, password: password }
  });
}

function getData(entity, params) {
  var url = '/data/' + entity;
  if (params) {
    var qs = Object.keys(params).map(function(k) {
      return k + '=' + encodeURIComponent(params[k]);
    }).join('&');
    if (qs) url += '?' + qs;
  }
  return request({ url: url });
}

function createData(entity, data) {
  return request({
    url: '/data/' + entity,
    method: 'POST',
    data: data
  });
}

function updateData(entity, id, data) {
  return request({
    url: '/data/' + entity + '/' + id,
    method: 'PUT',
    data: data
  });
}

function deleteData(entity, id) {
  return request({
    url: '/data/' + entity + '/' + id,
    method: 'DELETE'
  });
}

module.exports = {
  request: request,
  login: login,
  getData: getData,
  createData: createData,
  updateData: updateData,
  deleteData: deleteData
};
