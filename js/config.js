// ===== 小唯管理系统 - 全局配置 =====
// 在此统一管理 API 地址，部署后只需修改此文件
// 修改后记得在 index.html 中给 config.js 的引用加版本号 ?v=新数字

var API_CONFIG = {

  // 后端 API 基础地址
  // 已部署到 Railway，使用 Railway 生成的域名
  baseUrl: 'https://xiaowei-backend-production.up.railway.app/api',

  // 是否启用 API 模式（true=连接后端，false=仅用 localStorage）
  enabled: true,

  // 请求超时时间（毫秒）
  timeout: 10000
};
