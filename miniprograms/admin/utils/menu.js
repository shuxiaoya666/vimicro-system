var PORT_CONFIG = {
  platform: {
    name: '小唯平台端', icon: '🏠', color: '#1abc9c',
    menus: [
      { title: '业务管理', items: [
        { key: 'clinics', icon: '🏥', name: '诊所管理', entity: 'clinics' },
        { key: 'pharmacy', icon: '💊', name: '药店管理', entity: 'pharmacies' },
        { key: 'dealers', icon: '👤', name: '经销商管理', entity: 'dealers' },
        { key: 'cards', icon: '💳', name: '种植体卡管理', entity: 'cards' },
        { key: 'mall', icon: '🛒', name: '商场管理', entity: 'products' }
      ]},
      { title: '病历中心', items: [
        { key: 'patientQuery', icon: '🗂️', name: '病人病历查询', special: 'patientQuery' }
      ]},
      { title: '财务', items: [
        { key: 'settlement', icon: '💰', name: '结算中心', entity: 'settlements' }
      ]},
      { title: '系统', items: [
        { key: 'permissions', icon: '⚙️', name: '权限配置', entity: 'roles' },
        { key: 'regreview', icon: '📋', name: '注册审核', special: 'regReview' },
        { key: 'notifications', icon: '📢', name: '消息通知', entity: 'notifications' }
      ]}
    ]
  },
  clinic: {
    name: '诊所端', icon: '🏥', color: '#3498db',
    menus: [
      { title: '业务', items: [
        { key: 'verify', icon: '📋', name: '核销登记', entity: 'verifyRecords' },
        { key: 'patients', icon: '👤', name: '患者建档', entity: 'patients' },
        { key: 'patientQuery', icon: '🗂️', name: '病人信息查询', special: 'patientQuery' },
        { key: 'orders', icon: '📄', name: '加工单管理', entity: 'orders' },
        { key: 'implants', icon: '🦷', name: '植体管理', entity: 'implants' }
      ]},
      { title: '财务', items: [
        { key: 'finance', icon: '💰', name: '收支明细', entity: 'transactions' },
        { key: 'withdraw', icon: '💳', name: '提现申请', entity: 'withdrawals' }
      ]}
    ]
  },
  dealer: {
    name: '经销商端', icon: '👤', color: '#f39c12',
    menus: [
      { title: '客户', items: [
        { key: 'clinics', icon: '🏥', name: '诊所管理', entity: 'clinics' },
        { key: 'pharmacy', icon: '💊', name: '药房管理', entity: 'pharmacies' }
      ]},
      { title: '收益', items: [
        { key: 'commission', icon: '💰', name: '佣金明细', entity: 'transactions' },
        { key: 'withdraw', icon: '💳', name: '提现申请', entity: 'withdrawals' }
      ]}
    ]
  },
  pharmacy: {
    name: '药店端', icon: '💊', color: '#8e44ad',
    menus: [
      { title: '商品', items: [
        { key: 'cards', icon: '💳', name: '种植卡管理', entity: 'cards' },
        { key: 'inventory', icon: '📦', name: '库存查看', entity: 'implants' },
        { key: 'purchase', icon: '🛒', name: '采购管理', entity: 'orders' }
      ]},
      { title: '财务', items: [
        { key: 'finance', icon: '💰', name: '财务收支', entity: 'transactions' }
      ]},
      { title: '客户', items: [
        { key: 'customers', icon: '👤', name: '客户管理', entity: 'patients' }
      ]}
    ]
  },
  factory: {
    name: '工厂端', icon: '🏭', color: '#0097a7',
    menus: [
      { title: '订单', items: [
        { key: 'orders', icon: '📋', name: '订单管理', entity: 'orders' },
        { key: 'shipping', icon: '📦', name: '收发货管理', entity: 'orders' }
      ]},
      { title: '生产', items: [
        { key: 'quality', icon: '✅', name: '质检记录', entity: 'implants' },
        { key: 'exception', icon: '⚠️', name: '异常反馈', entity: 'notifications' }
      ]},
      { title: '病历', items: [
        { key: 'patientQuery', icon: '🗂️', name: '病人病历查询', special: 'patientQuery' }
      ]},
      { title: '财务', items: [
        { key: 'finance', icon: '💰', name: '财务收支', entity: 'transactions' }
      ]}
    ]
  }
};

module.exports = { PORT_CONFIG: PORT_CONFIG };
