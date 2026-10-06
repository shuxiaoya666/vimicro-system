// ===== 小唯管理系统 - 全局配置 =====
// 在此统一管理 API 地址，部署后只需修改此文件
// 修改后记得在 index.html 中给 config.js 的引用加版本号 ?v=新数字

var API_CONFIG = {

  // 后端 API 基础地址
  // 自动检测：同源时使用相对路径（服务器部署），跨域时使用内网穿透（本地开发）
  baseUrl: (function() {
    // 服务器部署：与后端同域名，使用相对路径
    if (typeof window !== 'undefined' && window.location) {
      var host = window.location.protocol + '//' + window.location.host;
      // GitHub Pages 或本地开发时使用穿透地址
      if (host.indexOf('github.io') >= 0 || host.indexOf('localhost') >= 0 || host.indexOf('127.0.0.1') >= 0) {
        return 'https://xiaowei-backend.loca.lt/api';
      }
      // 服务器部署：同源API
      return host + '/api';
    }
    return '/api';
  })(),

  // 是否启用 API 模式（true=连接后端，false=仅用 localStorage）
  enabled: true,

  // 请求超时时间（毫秒）
  timeout: 10000
};
