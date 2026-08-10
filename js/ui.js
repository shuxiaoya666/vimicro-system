// ===== 小唯管理系统 - UI 工具层 =====
// 提供弹窗(Modal)、Toast 通知、表格工具、表单验证、CSV 导出、格式化等功能
// 依赖：css/style.css 中的 .btn / .btn-primary / .btn-outline / .btn-sm / .status-tag / .form-group 等基础样式
// 说明：弹窗与 Toast 所需样式由本文件首次调用时自动注入(<style id="ui-style">)，
//       如需统一维护，可将注入的样式迁移至 css/style.css。

var UI = (function () {

  // ==================== 内部状态 ====================
  var modalStack = [];     // 弹窗栈，支持嵌套调用
  var baseZIndex = 1000;   // 弹窗起始 z-index
  var cbStore = {};        // 表格工具回调仓库(供返回 HTML 字符串时绑定函数)
  var cbSeq = 0;           // 回调 key 自增序号

  // ==================== 工具函数 ====================

  // HTML 转义，防止注入
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // CSV 单元格转义
  function escapeCsv(val) {
    if (val === null || val === undefined) val = '';
    val = String(val);
    if (/[",\r\n]/.test(val)) {
      return '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
  }

  // 存储回调，返回可内联到 HTML 的 key
  function storeCb(fn) {
    var key = 'cb_' + (++cbSeq);
    cbStore[key] = fn;
    return key;
  }

  // 注入样式(仅一次)
  function injectStyles() {
    if (document.getElementById('ui-style')) return;
    var style = document.createElement('style');
    style.id = 'ui-style';
    style.textContent = `
/* ===== Modal 弹窗 ===== */
.modal-overlay{
  position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(0,0,0,.45);
  display:flex;align-items:center;justify-content:center;
  z-index:1000;opacity:0;transition:opacity .2s ease;
}
.modal-overlay.show{opacity:1;}
.modal-box{
  background:#fff;border-radius:12px;width:480px;
  max-width:calc(100vw - 40px);max-height:calc(100vh - 80px);
  display:flex;flex-direction:column;
  box-shadow:0 16px 48px rgba(0,0,0,.2);
  transform:translateY(16px) scale(.98);
  transition:transform .2s ease;overflow:hidden;
}
.modal-overlay.show .modal-box{transform:translateY(0) scale(1);}
.modal-box.large{width:760px;}
.modal-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:16px 20px;border-bottom:1px solid var(--border);flex-shrink:0;
}
.modal-title{font-size:16px;font-weight:700;color:var(--text);}
.modal-close{
  font-size:22px;color:var(--text-muted);cursor:pointer;
  line-height:1;user-select:none;transition:color .15s;padding:0 4px;
}
.modal-close:hover{color:var(--text);}
.modal-body{padding:20px;overflow-y:auto;flex:1;}
.modal-footer{
  padding:12px 20px;border-top:1px solid var(--border);
  display:flex;justify-content:flex-end;gap:8px;flex-shrink:0;
}
.modal-overlay.closing{opacity:0;}
.modal-overlay.closing .modal-box{transform:translateY(8px) scale(.98);}

/* 确认弹窗文案 */
.ui-confirm-text{font-size:14px;color:var(--text);line-height:1.7;}

/* 详情表格 */
.ui-detail-table{width:100%;border-collapse:collapse;}
.ui-detail-table td{
  padding:10px 12px;font-size:13px;
  border-bottom:1px solid var(--border);vertical-align:top;
}
.ui-detail-table tr:last-child td{border-bottom:none;}
.ui-detail-label{color:var(--text-muted);width:130px;white-space:nowrap;}
.ui-detail-value{color:var(--text);font-weight:500;word-break:break-all;}

/* 表单弹窗 */
.ui-form .form-group{margin-bottom:14px;}
.ui-form .form-group:last-child{margin-bottom:0;}
.ui-required{color:var(--danger);margin-left:2px;}
.ui-field-error{color:var(--danger);font-size:12px;margin-top:4px;}
.ui-input-error{border-color:var(--danger) !important;}

/* ===== Toast 通知 ===== */
#toast-container{
  position:fixed;top:20px;right:20px;z-index:9999;
  display:flex;flex-direction:column;gap:10px;pointer-events:none;
}
.toast-item{
  min-width:260px;max-width:360px;background:#fff;border-radius:8px;
  box-shadow:0 8px 24px rgba(0,0,0,.12);padding:12px 16px;
  display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text);
  border-left:4px solid var(--text-muted);
  opacity:0;transform:translateX(40px);
  transition:opacity .3s ease,transform .3s ease;pointer-events:auto;
}
.toast-item.show{opacity:1;transform:translateX(0);}
.toast-item .toast-icon{
  width:20px;height:20px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;
}
.toast-item.success{border-left-color:var(--success);}
.toast-item.success .toast-icon{background:var(--success);}
.toast-item.error{border-left-color:var(--danger);}
.toast-item.error .toast-icon{background:var(--danger);}
.toast-item.warning{border-left-color:var(--accent);}
.toast-item.warning .toast-icon{background:var(--accent);}
.toast-item.info{border-left-color:var(--secondary);}
.toast-item.info .toast-icon{background:var(--secondary);}

/* ===== 表格工具栏 ===== */
.ui-search{position:relative;display:inline-block;}
.ui-search .ui-search-icon{
  position:absolute;left:10px;top:50%;transform:translateY(-50%);
  font-size:13px;color:var(--text-muted);pointer-events:none;
}
.ui-search-input{
  padding:8px 12px 8px 32px;border:1px solid var(--border);border-radius:6px;
  font-size:13px;outline:none;width:240px;transition:border-color .2s;
}
.ui-search-input:focus{border-color:var(--primary);}
.ui-filter-select{
  padding:8px 12px;border:1px solid var(--border);border-radius:6px;
  font-size:13px;outline:none;background:#fff;cursor:pointer;transition:border-color .2s;
}
.ui-filter-select:focus{border-color:var(--primary);}
.ui-actions{display:inline-flex;align-items:center;gap:8px;}

/* ===== 分页 ===== */
.ui-pagination{
  display:flex;align-items:center;gap:6px;margin-top:16px;
  justify-content:flex-end;flex-wrap:wrap;
}
.ui-pagination .page-btn{
  min-width:32px;height:32px;padding:0 10px;border:1px solid var(--border);
  background:#fff;border-radius:6px;font-size:13px;color:var(--text);
  cursor:pointer;transition:all .15s;
}
.ui-pagination .page-btn:hover:not(:disabled):not(.active){
  border-color:var(--primary);color:var(--primary);
}
.ui-pagination .page-btn.active{
  background:var(--primary);border-color:var(--primary);color:#fff;
}
.ui-pagination .page-btn:disabled{color:var(--text-muted);cursor:not-allowed;opacity:.5;}
.ui-pagination .page-ellipsis{padding:0 4px;color:var(--text-muted);font-size:13px;}
.ui-pagination .page-info{font-size:12px;color:var(--text-muted);margin-left:8px;}
`;
    document.head.appendChild(style);
  }

  // 计算分页页码(最多 7 个，超出用省略号)
  function computePageItems(current, total) {
    var items = [];
    if (total <= 1) { items.push(1); return items; }
    if (total <= 7) {
      for (var i = 1; i <= total; i++) items.push(i);
      return items;
    }
    // total > 7
    if (current <= 4) {
      items = [1, 2, 3, 4, 5, '...', total];
    } else if (current >= total - 3) {
      items = [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    } else {
      items = [1, '...', current - 1, current, current + 1, '...', total];
    }
    return items;
  }

  // ==================== 公共 API ====================
  var api = {};

  // ---------- 1. Modal 弹窗系统 ----------

  /**
   * 打开弹窗
   * @param {Object} config { title, body(HTML), footer(HTML,可选), size('normal'|'large') }
   * @returns {HTMLElement} 弹窗遮罩层 DOM
   */
  api.modal = function (config) {
    injectStyles();
    config = config || {};
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    var sizeClass = config.size === 'large' ? ' large' : '';
    overlay.innerHTML =
      '<div class="modal-box' + sizeClass + '">' +
        '<div class="modal-header">' +
          '<span class="modal-title">' + escapeHtml(config.title || '提示') + '</span>' +
          '<span class="modal-close" title="关闭">&times;</span>' +
        '</div>' +
        '<div class="modal-body">' + (config.body || '') + '</div>' +
        (config.footer ? '<div class="modal-footer">' + config.footer + '</div>' : '') +
      '</div>';

    // 点击遮罩关闭(点击弹窗内部不关闭)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) api.closeModal(overlay);
    });
    // 点击 X 关闭
    var closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () { api.closeModal(overlay); });
    }

    // z-index 管理，支持嵌套
    overlay.style.zIndex = baseZIndex + modalStack.length * 10;
    document.body.appendChild(overlay);
    modalStack.push(overlay);

    // 触发进场动画
    requestAnimationFrame(function () { overlay.classList.add('show'); });

    return overlay;
  };

  /**
   * 关闭弹窗(默认关闭最上层；传入 overlay 则关闭指定弹窗)
   * @param {HTMLElement} [overlay] 指定关闭的遮罩层
   */
  api.closeModal = function (overlay) {
    var target = overlay || modalStack[modalStack.length - 1];
    if (!target) return;
    var idx = modalStack.indexOf(target);
    if (idx > -1) modalStack.splice(idx, 1);
    target.classList.add('closing');
    target.classList.remove('show');
    setTimeout(function () {
      if (target.parentNode) target.parentNode.removeChild(target);
    }, 200);
  };

  /**
   * 确认对话框
   * @param {String} message 提示文案
   * @param {Function} onConfirm 确认回调
   * @param {String} [title] 标题
   * @returns {HTMLElement}
   */
  api.confirm = function (message, onConfirm, title) {
    var overlay = api.modal({
      title: title || '确认操作',
      body: '<div class="ui-confirm-text">' + escapeHtml(message) + '</div>',
      footer: '<button class="btn btn-outline ui-cancel">取消</button>' +
              '<button class="btn btn-primary ui-ok">确认</button>'
    });
    overlay.querySelector('.ui-cancel').addEventListener('click', function () {
      api.closeModal(overlay);
    });
    overlay.querySelector('.ui-ok').addEventListener('click', function () {
      api.closeModal(overlay);
      if (typeof onConfirm === 'function') onConfirm();
    });
    return overlay;
  };

  /**
   * 详情弹窗(将 {label: value} 渲染为表格)
   * @param {String} title 标题
   * @param {Object} data {label: value} value 可为 HTML 字符串
   * @returns {HTMLElement}
   */
  api.detail = function (title, data) {
    var rows = '';
    Object.keys(data || {}).forEach(function (label) {
      rows += '<tr><td class="ui-detail-label">' + escapeHtml(label) + '</td>' +
              '<td class="ui-detail-value">' + data[label] + '</td></tr>';
    });
    var overlay = api.modal({
      title: title || '详情',
      body: '<table class="ui-detail-table">' + rows + '</table>',
      footer: '<button class="btn btn-primary ui-close">关闭</button>'
    });
    overlay.querySelector('.ui-close').addEventListener('click', function () {
      api.closeModal(overlay);
    });
    return overlay;
  };

  /**
   * 表单弹窗
   * @param {Object} config { title, fields, onSubmit, size }
   *   fields: [{ name, label, type('text'|'number'|'select'|'textarea'|'date'), value, options, required, placeholder, rules }]
   *   onSubmit(data): 验证通过后回调，data 为表单数据对象
   * @returns {HTMLElement}
   */
  api.form = function (config) {
    config = config || {};
    var fields = config.fields || [];
    var fieldIdPrefix = 'ui-form-field-';
    var fieldsHtml = '';

    fields.forEach(function (f) {
      var id = fieldIdPrefix + f.name;
      var requiredMark = f.required ? '<span class="ui-required">*</span>' : '';
      var control = '';

      if (f.type === 'select') {
        var opts = '';
        (f.options || []).forEach(function (o) {
          var val = (o && o.value !== undefined) ? o.value : o;
          var lab = (o && o.label !== undefined) ? o.label : o;
          var sel = (f.value !== undefined && String(f.value) === String(val)) ? ' selected' : '';
          opts += '<option value="' + escapeHtml(val) + '"' + sel + '>' + escapeHtml(lab) + '</option>';
        });
        control = '<select id="' + id + '" name="' + escapeHtml(f.name) + '">' + opts + '</select>';
      } else if (f.type === 'textarea') {
        control = '<textarea id="' + id + '" name="' + escapeHtml(f.name) + '" placeholder="' + escapeHtml(f.placeholder || '') + '">' +
                  escapeHtml(f.value !== undefined ? f.value : '') + '</textarea>';
      } else {
        var inputType = f.type === 'number' ? 'number' : (f.type === 'date' ? 'date' : 'text');
        control = '<input type="' + inputType + '" id="' + id + '" name="' + escapeHtml(f.name) + '"' +
                  ' value="' + escapeHtml(f.value !== undefined ? f.value : '') + '"' +
                  ' placeholder="' + escapeHtml(f.placeholder || '') + '">';
      }

      fieldsHtml +=
        '<div class="form-group">' +
          '<label>' + escapeHtml(f.label || f.name) + requiredMark + '</label>' +
          control +
        '</div>';
    });

    var overlay = api.modal({
      title: config.title || '表单',
      size: config.size,
      body: '<div class="ui-form">' + fieldsHtml + '</div>',
      footer: '<button class="btn btn-outline ui-cancel">取消</button>' +
              '<button class="btn btn-primary ui-submit">提交</button>'
    });

    var submitBtn = overlay.querySelector('.ui-submit');
    overlay.querySelector('.ui-cancel').addEventListener('click', function () {
      api.closeModal(overlay);
    });

    // 收集表单数据
    function collectData() {
      var data = {};
      fields.forEach(function (f) {
        var el = overlay.querySelector('#' + fieldIdPrefix + f.name);
        data[f.name] = el ? el.value : '';
      });
      return data;
    }

    // 清除错误提示
    function clearErrors() {
      var errs = overlay.querySelectorAll('.ui-field-error');
      for (var i = 0; i < errs.length; i++) errs[i].remove();
      var bad = overlay.querySelectorAll('.ui-input-error');
      for (var j = 0; j < bad.length; j++) bad[j].classList.remove('ui-input-error');
    }

    // 显示字段错误
    function showFieldError(name, message) {
      var el = overlay.querySelector('#' + fieldIdPrefix + name);
      if (!el) return;
      el.classList.add('ui-input-error');
      var grp = el.closest('.form-group');
      if (grp) {
        var err = document.createElement('div');
        err.className = 'ui-field-error';
        err.textContent = message;
        grp.appendChild(err);
      }
    }

    function doSubmit() {
      var data = collectData();
      // 构建验证规则
      var rules = {};
      fields.forEach(function (f) {
        var r = [];
        if (f.required) r.push('required');
        if (f.type === 'number') r.push('number');
        if (Array.isArray(f.rules)) r = r.concat(f.rules);
        if (r.length) rules[f.name] = r;
      });
      var result = api.validate.form(data, rules);
      clearErrors();
      if (!result.valid) {
        Object.keys(result.errors).forEach(function (name) {
          showFieldError(name, result.errors[name]);
        });
        api.toast.error('请检查表单填写');
        return;
      }
      api.closeModal(overlay);
      if (typeof config.onSubmit === 'function') config.onSubmit(data);
    }

    submitBtn.addEventListener('click', doSubmit);
    // 输入框回车提交
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        doSubmit();
      }
    });

    // 自动聚焦第一个输入框
    var firstInput = overlay.querySelector('.ui-form input, .ui-form select, .ui-form textarea');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 50);

    return overlay;
  };

  // ---------- 2. Toast 通知 ----------
  api.toast = {
    /**
     * 显示通知
     * @param {String} message 文案
     * @param {String} type 'success'|'error'|'warning'|'info'
     */
    show: function (message, type) {
      injectStyles();
      var container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
      }
      type = type || 'info';
      var icons = { success: '\u2713', error: '\u2715', warning: '\u26A0', info: '\u2139' };
      var item = document.createElement('div');
      item.className = 'toast-item ' + type;
      item.innerHTML =
        '<span class="toast-icon">' + (icons[type] || '') + '</span>' +
        '<span class="toast-msg">' + escapeHtml(message) + '</span>';
      container.appendChild(item);
      requestAnimationFrame(function () { item.classList.add('show'); });
      setTimeout(function () {
        item.classList.remove('show');
        setTimeout(function () {
          if (item.parentNode) item.parentNode.removeChild(item);
        }, 300);
      }, 3000);
    },
    success: function (msg) { this.show(msg, 'success'); },
    error: function (msg) { this.show(msg, 'error'); },
    warning: function (msg) { this.show(msg, 'warning'); },
    info: function (msg) { this.show(msg, 'info'); }
  };

  // ---------- 3. 表格工具 ----------
  api.table = {
    // 内部：根据 key 调用存储的回调
    _invoke: function (key, arg) {
      var fn = cbStore[key];
      if (typeof fn === 'function') fn(arg);
    },
    // 内部：清空回调仓库(页面重新渲染前可调用，避免回调堆积)
    _clearCallbacks: function () { cbStore = {}; },

    /**
     * 渲染搜索栏
     * @param {String|Object} placeholder 占位符，或 { placeholder, onSearch }
     * @param {Function} [onSearch] 实时搜索回调，接收输入值
     * @returns {String} HTML
     */
    searchBar: function (placeholder, onSearch) {
      if (placeholder && typeof placeholder === 'object') {
        onSearch = placeholder.onSearch;
        placeholder = placeholder.placeholder;
      }
      var key = (typeof onSearch === 'function') ? storeCb(function (val) { onSearch(val); }) : null;
      var oninput = key ? ' oninput="UI.table._invoke(\'' + key + '\', this.value)"' : '';
      return '<div class="ui-search">' +
               '<span class="ui-search-icon">\uD83D\uDD0D</span>' +
               '<input type="text" id="table-search-input" class="ui-search-input"' +
               ' placeholder="' + escapeHtml(placeholder || '请输入关键词搜索') + '"' + oninput + '>' +
             '</div>';
    },

    /**
     * 渲染状态筛选
     * @param {Array} options [{value,label}] 或 { options, onSelect }
     * @param {Function} [onSelect] 选中回调，接收 value
     * @returns {String} HTML
     */
    filterBar: function (options, onSelect) {
      if (options && typeof options === 'object' && !Array.isArray(options)) {
        onSelect = options.onSelect;
        options = options.options;
      }
      var key = (typeof onSelect === 'function') ? storeCb(function (val) { onSelect(val); }) : null;
      var onchange = key ? ' onchange="UI.table._invoke(\'' + key + '\', this.value)"' : '';
      var opts = '<option value="">全部状态</option>';
      (options || []).forEach(function (o) {
        var val = (o && o.value !== undefined) ? o.value : o;
        var lab = (o && o.label !== undefined) ? o.label : o;
        opts += '<option value="' + escapeHtml(val) + '">' + escapeHtml(lab) + '</option>';
      });
      return '<select id="table-filter-select" class="ui-filter-select"' + onchange + '>' + opts + '</select>';
    },

    /**
     * 渲染分页
     * @param {Object} config { current, total, totalPages, onPageChange }
     * @returns {String} HTML
     */
    pagination: function (config) {
      config = config || {};
      var current = config.current || 1;
      var total = config.totalPages || 1;
      var onPageChange = config.onPageChange;
      var key = (typeof onPageChange === 'function')
        ? storeCb(function (p) { if (p >= 1 && p <= total) onPageChange(p); })
        : null;

      var items = computePageItems(current, total);
      var html = '<div class="ui-pagination">';

      // 上一页
      if (current <= 1) {
        html += '<button class="page-btn" disabled>上一页</button>';
      } else {
        html += '<button class="page-btn" onclick="UI.table._invoke(\'' + key + '\', ' + (current - 1) + ')">上一页</button>';
      }

      // 页码
      items.forEach(function (it) {
        if (it === '...') {
          html += '<span class="page-ellipsis">...</span>';
        } else {
          var active = it === current ? ' active' : '';
          html += '<button class="page-btn' + active + '" onclick="UI.table._invoke(\'' + key + '\', ' + it + ')">' + it + '</button>';
        }
      });

      // 下一页
      if (current >= total) {
        html += '<button class="page-btn" disabled>下一页</button>';
      } else {
        html += '<button class="page-btn" onclick="UI.table._invoke(\'' + key + '\', ' + (current + 1) + ')">下一页</button>';
      }

      // 总条数
      if (config.total !== undefined && config.total !== null) {
        html += '<span class="page-info">共 ' + config.total + ' 条</span>';
      }
      html += '</div>';
      return html;
    },

    /**
     * 渲染操作按钮
     * @param {Array} buttons [{ text, type('primary'|'outline'), onclick }]
     * @returns {String} HTML
     */
    actions: function (buttons) {
      var html = '<div class="ui-actions">';
      (buttons || []).forEach(function (b) {
        var typeCls = b.type === 'primary' ? 'btn-primary' : 'btn-outline';
        var key = (typeof b.onclick === 'function') ? storeCb(b.onclick) : null;
        var onclickAttr = key ? ' onclick="UI.table._invoke(\'' + key + '\')"' : '';
        html += '<button class="btn ' + typeCls + ' btn-sm"' + onclickAttr + '>' + escapeHtml(b.text) + '</button>';
      });
      html += '</div>';
      return html;
    }
  };

  // ---------- 4. 表单验证 ----------
  api.validate = {
    /**
     * 验证单个字段
     * @param {String} value 值
     * @param {Array} rules ['required','phone','number','email','positive']
     * @returns {{valid:Boolean, message:String}}
     */
    field: function (value, rules) {
      value = (value === null || value === undefined) ? '' : String(value).trim();
      rules = rules || [];
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule === 'required') {
          if (!value) return { valid: false, message: '该项不能为空' };
        } else if (rule === 'phone') {
          if (value && !/^1[3-9]\d{9}$/.test(value)) {
            return { valid: false, message: '请输入正确的手机号' };
          }
        } else if (rule === 'number') {
          if (value && isNaN(Number(value))) {
            return { valid: false, message: '请输入有效的数字' };
          }
        } else if (rule === 'email') {
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return { valid: false, message: '请输入正确的邮箱地址' };
          }
        } else if (rule === 'positive') {
          if (value && (isNaN(Number(value)) || Number(value) <= 0)) {
            return { valid: false, message: '请输入大于 0 的正数' };
          }
        }
      }
      return { valid: true, message: '' };
    },

    /**
     * 验证整个表单
     * @param {Object} formData { field: value }
     * @param {Object} rules { field: ['required', 'phone'] }
     * @returns {{valid:Boolean, errors:Object}}
     */
    form: function (formData, rules) {
      var errors = {};
      var valid = true;
      rules = rules || {};
      Object.keys(rules).forEach(function (name) {
        var result = api.validate.field(formData[name], rules[name]);
        if (!result.valid) {
          valid = false;
          errors[name] = result.message;
        }
      });
      return { valid: valid, errors: errors };
    }
  };

  // ---------- 5. CSV 导出 ----------
  /**
   * 导出 CSV 文件
   * @param {String} filename 文件名
   * @param {Array} headers ['列名1','列名2']
   * @param {Array} rows [['值1','值2'], ...]
   */
  api.exportCSV = function (filename, headers, rows) {
    var csv = '\uFEFF'; // BOM 头，确保中文正确显示
    csv += (headers || []).map(escapeCsv).join(',') + '\r\n';
    (rows || []).forEach(function (row) {
      csv += (row || []).map(escapeCsv).join(',') + '\r\n';
    });

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename || 'export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(url); }, 100);
  };

  // ---------- 6. 格式化工具 ----------
  api.format = {
    /**
     * 状态标签
     * @param {String} status active|pending|processing|inactive
     * @returns {String} HTML
     */
    status: function (status) {
      var map = {
        active:     { cls: 'active',     text: '已激活' },
        pending:    { cls: 'pending',    text: '审核中' },
        processing: { cls: 'processing', text: '处理中' },
        inactive:   { cls: 'inactive',   text: '已停用' }
      };
      var s = map[status];
      if (s) return '<span class="status-tag ' + s.cls + '">' + s.text + '</span>';
      return '<span class="status-tag">' + escapeHtml(status || '') + '</span>';
    },

    /**
     * 金额格式化 ¥1,280
     * @param {Number|String} amount
     * @returns {String}
     */
    money: function (amount) {
      if (amount === null || amount === undefined || amount === '') return '\u00A50';
      var num = Number(amount);
      if (isNaN(num)) num = 0;
      return '\u00A5' + num.toLocaleString('zh-CN');
    },

    /**
     * 日期格式化(保持原格式)
     * @param {String} dateStr
     * @returns {String}
     */
    date: function (dateStr) {
      return dateStr || '';
    }
  };

  // ---------- 全局键盘事件：ESC 关闭最上层弹窗 ----------
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalStack.length > 0) {
      api.closeModal();
    }
  });

  return api;

})();
