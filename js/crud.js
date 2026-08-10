// ===== 小唯管理系统 - CRUD 页面构建器 =====
// 依赖：DB (data.js), UI (ui.js)
// 提供可复用的数据表格页面构建器，支持搜索/筛选/分页/增删改查/导出
// 用法：PAGE_RENDERERS.platform.clinics = function() {
//        return CRUD.builder('platform_clinics', CLINIC_CONFIG);
//      };

var CRUD = (function () {

  // ==================== 内部状态 ====================
  var _states = {};   // 每页状态 { pageKey: { search, filter, page } }
  var _configs = {};  // 每页配置 { pageKey: config }

  // ==================== 工具函数 ====================

  function _esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function _getState(key) {
    if (!_states[key]) _states[key] = { search: '', filter: '', page: 1 };
    return _states[key];
  }

  function _money(val) {
    if (val === undefined || val === null || val === '') return '—';
    return '¥' + Number(val).toLocaleString('zh-CN');
  }

  function _dash(val) {
    if (val === undefined || val === null || val === '' || val === 0) return '—';
    return val;
  }

  // 状态标签映射
  var STATUS_LABELS = {
    active:    { text: '已激活', cls: 'active' },
    pending:   { text: '审核中', cls: 'pending' },
    inactive:  { text: '已停用', cls: 'inactive' },
    processing:{ text: '处理中', cls: 'processing' }
  };

  function _statusTag(val) {
    var info = STATUS_LABELS[val];
    if (!info) return _esc(val || '—');
    return '<span class="status-tag ' + info.cls + '">' + info.text + '</span>';
  }

  // 格式化单元格
  function _formatCell(col, row) {
    var val = row[col.field];
    if (col.formatter) return col.formatter(val, row);
    if (col.type === 'status') return _statusTag(val);
    if (col.type === 'money') return _money(val);
    if (col.type === 'dash') return _dash(val);
    return _esc(val !== undefined && val !== null ? val : '—');
  }

  // 格式化详情值
  function _formatDetail(field, row) {
    var val = row[field.field];
    if (field.formatter) return field.formatter(val, row);
    if (field.type === 'status') {
      var info = STATUS_LABELS[val];
      return info ? info.text : (val || '—');
    }
    if (field.type === 'money') return _money(val).replace('¥', '￥');
    if (val !== undefined && val !== null && val !== '') return _esc(val);
    return '—';
  }

  // 获取过滤后的数据
  function _getFilteredData(config, state) {
    var list = DB.getAll(config.entity);

    // 状态筛选
    if (state.filter && config.filterField) {
      list = list.filter(function (item) {
        return item[config.filterField] === state.filter;
      });
    }

    // 关键词搜索
    if (state.search && config.searchFields && config.searchFields.length) {
      var kw = state.search.toLowerCase();
      list = list.filter(function (item) {
        return config.searchFields.some(function (field) {
          var v = item[field];
          return v !== undefined && v !== null && String(v).toLowerCase().indexOf(kw) !== -1;
        });
      });
    }

    return list;
  }

  // ==================== 页面渲染 ====================

  function _renderPage(pageKey, config, state, pageData) {
    var html = '';

    // 面包屑
    html += '<div class="breadcrumb">' + (config.breadcrumb || '') + ' / <span>' + _esc(config.title) + '</span></div>';

    // 可选统计卡片
    if (config.stats) {
      html += '<div class="stats-grid">';
      config.stats.forEach(function (stat) {
        html += '<div class="stat-card">' +
          '<div class="stat-card-header"><span class="stat-card-label">' + _esc(stat.label) + '</span>' +
          '<div class="stat-card-icon ' + (stat.color || 'green') + '">' + (stat.icon || '📊') + '</div></div>' +
          '<div class="stat-card-value">' + _esc(stat.value) + '</div>' +
          (stat.change ? '<div class="stat-card-change up">' + _esc(stat.change) + '</div>' : '') +
          '</div>';
      });
      html += '</div>';
    }

    // 主卡片
    html += '<div class="card">';

    // 卡片头部 + 工具栏
    html += '<div class="card-header">';
    html += '<span class="card-title">' + _esc(config.title) + '</span>';
    html += '<div class="card-toolbar" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">';

    // 搜索框
    if (config.searchable !== false) {
      html += '<div class="ui-search">' +
        '<span class="ui-search-icon">🔍</span>' +
        '<input type="text" class="ui-search-input" placeholder="' + _esc(config.searchPlaceholder || '搜索...') + '"' +
        ' value="' + _esc(state.search) + '"' +
        ' oninput="CRUD.onSearch(\'' + pageKey + '\', this.value)">' +
        '</div>';
    }

    // 状态筛选
    if (config.filterable !== false && config.filterOptions && config.filterOptions.length) {
      html += '<select class="ui-filter-select" onchange="CRUD.onFilter(\'' + pageKey + '\', this.value)">';
      html += '<option value="">全部状态</option>';
      config.filterOptions.forEach(function (opt) {
        var val = opt.value !== undefined ? opt.value : opt;
        var lab = opt.label !== undefined ? opt.label : opt;
        var sel = state.filter === val ? ' selected' : '';
        html += '<option value="' + _esc(val) + '"' + sel + '>' + _esc(lab) + '</option>';
      });
      html += '</select>';
    }

    // 导出按钮
    if (config.exportable !== false) {
      html += '<button class="btn btn-outline btn-sm" onclick="CRUD.exportCSV(\'' + pageKey + '\')">导出CSV</button>';
    }

    // 新增按钮
    if (config.creatable !== false) {
      html += '<button class="btn btn-primary btn-sm" onclick="CRUD.showAdd(\'' + pageKey + '\')">+ ' + _esc(config.addLabel || '新增') + '</button>';
    }

    html += '</div>'; // toolbar
    html += '</div>'; // card-header

    // 表格
    if (pageData.data.length === 0) {
      html += '<div class="empty-state" style="padding:40px;text-align:center;color:var(--text-muted);">' +
        '<div style="font-size:40px;margin-bottom:12px;">📭</div>' +
        '<div style="font-size:14px;">暂无数据</div>' +
        '</div>';
    } else {
      html += '<div class="table-wrap" style="overflow-x:auto;">';
      html += '<table class="data-table">';
      html += '<thead><tr>';
      config.columns.forEach(function (col) {
        html += '<th>' + _esc(col.label) + '</th>';
      });
      // 操作列
      if (config.actions !== false) {
        html += '<th style="width:' + (config.actionWidth || '160px') + ';">操作</th>';
      }
      html += '</tr></thead><tbody>';

      pageData.data.forEach(function (row) {
        html += '<tr>';
        config.columns.forEach(function (col) {
          html += '<td>' + _formatCell(col, row) + '</td>';
        });
        if (config.actions !== false) {
          html += '<td><div style="display:flex;gap:4px;">';
          if (config.onDetail !== false) {
            html += '<button class="btn btn-outline btn-sm" onclick="CRUD.showDetail(\'' + pageKey + '\',' + row.id + ')">详情</button>';
          }
          if (config.onEdit !== false) {
            html += '<button class="btn btn-outline btn-sm" onclick="CRUD.showEdit(\'' + pageKey + '\',' + row.id + ')">编辑</button>';
          }
          if (config.onDelete !== false) {
            html += '<button class="btn btn-danger btn-sm" onclick="CRUD.confirmDelete(\'' + pageKey + '\',' + row.id + ')">删除</button>';
          }
          html += '</div></td>';
        }
        html += '</tr>';
      });

      html += '</tbody></table>';
      html += '</div>';
    }

    // 分页
    var totalPages = pageData.totalPages || 1;
    if (totalPages > 0) {
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;flex-wrap:wrap;gap:8px;">';
      html += '<span style="font-size:12px;color:var(--text-muted);">共 ' + pageData.total + ' 条，第 ' + pageData.current + '/' + Math.max(totalPages, 1) + ' 页</span>';
      html += '<div style="display:flex;gap:6px;align-items:center;">';

      // 上一页
      if (pageData.current <= 1) {
        html += '<button class="page-btn" disabled>上一页</button>';
      } else {
        html += '<button class="page-btn" onclick="CRUD.onPageChange(\'' + pageKey + '\',' + (pageData.current - 1) + ')">上一页</button>';
      }

      // 页码
      var items = _computePages(pageData.current, totalPages);
      items.forEach(function (it) {
        if (it === '...') {
          html += '<span class="page-ellipsis">...</span>';
        } else {
          var active = it === pageData.current ? ' active' : '';
          html += '<button class="page-btn' + active + '" onclick="CRUD.onPageChange(\'' + pageKey + '\',' + it + ')">' + it + '</button>';
        }
      });

      // 下一页
      if (pageData.current >= totalPages) {
        html += '<button class="page-btn" disabled>下一页</button>';
      } else {
        html += '<button class="page-btn" onclick="CRUD.onPageChange(\'' + pageKey + '\',' + (pageData.current + 1) + ')">下一页</button>';
      }

      html += '</div></div>';
    }

    html += '</div>'; // card

    return html;
  }

  // 计算分页页码
  function _computePages(current, total) {
    var items = [];
    if (total <= 1) { items.push(1); return items; }
    if (total <= 7) {
      for (var i = 1; i <= total; i++) items.push(i);
      return items;
    }
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

  /**
   * 构建 CRUD 页面
   * @param {String} pageKey - 页面唯一标识，如 'platform_clinics'
   * @param {Object} config - 页面配置
   * @returns {String} HTML 字符串
   */
  api.builder = function (pageKey, config) {
    _configs[pageKey] = config;
    var state = _getState(pageKey);
    var data = _getFilteredData(config, state);
    var pageData = DB.paginate(data, state.page, config.pageSize || 5);
    return _renderPage(pageKey, config, state, pageData);
  };

  /**
   * 搜索（实时）
   */
  api.onSearch = function (pageKey, keyword) {
    var state = _getState(pageKey);
    state.search = keyword;
    state.page = 1; // 搜索后回到第一页
    _rerender();
  };

  /**
   * 状态筛选
   */
  api.onFilter = function (pageKey, value) {
    var state = _getState(pageKey);
    state.filter = value;
    state.page = 1;
    _rerender();
  };

  /**
   * 翻页
   */
  api.onPageChange = function (pageKey, page) {
    var state = _getState(pageKey);
    state.page = page;
    _rerender();
  };

  /**
   * 显示新增表单
   */
  api.showAdd = function (pageKey) {
    var config = _configs[pageKey];
    if (!config) return;
    UI.form({
      title: config.addLabel || '新增记录',
      size: config.formSize,
      fields: config.formFields,
      onSubmit: function (data) {
        // 预处理数据（类型转换）
        _preprocessFormData(data, config.formFields);
        DB.add(config.entity, data);
        UI.toast.success('新增成功');
        _rerender();
      }
    });
  };

  /**
   * 显示编辑表单
   */
  api.showEdit = function (pageKey, id) {
    var config = _configs[pageKey];
    if (!config) return;
    var record = DB.getById(config.entity, id);
    if (!record) {
      UI.toast.error('记录不存在');
      return;
    }
    // 构建带预填值的 fields
    var fields = config.formFields.map(function (f) {
      var copy = Object.assign({}, f);
      copy.value = record[f.name];
      return copy;
    });
    UI.form({
      title: config.editLabel || '编辑记录',
      size: config.formSize,
      fields: fields,
      onSubmit: function (data) {
        _preprocessFormData(data, config.formFields);
        DB.update(config.entity, id, data);
        UI.toast.success('修改成功');
        _rerender();
      }
    });
  };

  /**
   * 显示详情弹窗
   */
  api.showDetail = function (pageKey, id) {
    var config = _configs[pageKey];
    if (!config) return;
    var record = DB.getById(config.entity, id);
    if (!record) {
      UI.toast.error('记录不存在');
      return;
    }
    var detailFields = config.detailFields || config.columns;
    var data = {};
    detailFields.forEach(function (field) {
      data[field.label] = _formatDetail(field, record);
    });
    UI.detail(config.title + ' - 详情', data);
  };

  /**
   * 确认删除
   */
  api.confirmDelete = function (pageKey, id) {
    var config = _configs[pageKey];
    if (!config) return;
    var record = DB.getById(config.entity, id);
    if (!record) {
      UI.toast.error('记录不存在');
      return;
    }
    var displayName = record[config.displayField || 'name'] || record.id;
    UI.confirm(
      '确定要删除「' + displayName + '」吗？此操作不可撤销。',
      function () {
        DB.delete(config.entity, id);
        UI.toast.success('删除成功');
        // 如果删除后当前页没有数据了，回到上一页
        var state = _getState(pageKey);
        var filtered = _getFilteredData(config, state);
        var totalPages = Math.ceil(filtered.length / (config.pageSize || 5));
        if (state.page > totalPages && totalPages > 0) {
          state.page = totalPages;
        }
        _rerender();
      },
      '确认删除'
    );
  };

  /**
   * 导出 CSV
   */
  api.exportCSV = function (pageKey) {
    var config = _configs[pageKey];
    if (!config) return;
    var state = _getState(pageKey);
    var data = _getFilteredData(config, state);

    if (data.length === 0) {
      UI.toast.warning('没有可导出的数据');
      return;
    }

    var exportFields = config.exportFields || config.columns.map(function (c) { return c.field; });
    var exportHeaders = config.exportHeaders || config.columns.map(function (c) { return c.label; });

    var rows = data.map(function (row) {
      return exportFields.map(function (field) {
        var val = row[field];
        if (val === undefined || val === null) return '';
        return String(val);
      });
    });

    var today = DB._today();
    UI.exportCSV((config.exportName || config.title) + '_' + today + '.csv', exportHeaders, rows);
    UI.toast.success('已导出 ' + data.length + ' 条数据');
  };

  // ==================== 内部辅助 ====================

  function _preprocessFormData(data, formFields) {
    if (!formFields) return;
    formFields.forEach(function (f) {
      if (f.type === 'number') {
        data[f.name] = data[f.name] === '' || data[f.name] === undefined ? 0 : Number(data[f.name]);
      }
    });
  }

  function _rerender() {
    // 调用 app.js 的 loadPage 重新渲染当前页
    if (typeof loadPage === 'function') {
      loadPage();
    }
  }

  // 暴露内部工具供外部使用
  api._money = _money;
  api._dash = _dash;
  api._statusTag = _statusTag;
  api._esc = _esc;
  api.STATUS_LABELS = STATUS_LABELS;

  return api;
})();
