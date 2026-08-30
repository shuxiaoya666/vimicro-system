try{

// ==================== Config ====================
var APP_VERSION='v20260816ad1';
var API_BASE=localStorage.getItem('apiBase')||'https://xiaowei-backend.loca.lt/api';
var token=localStorage.getItem('adminToken');
var userInfo=JSON.parse(localStorage.getItem('adminUserInfo')||'null');
var currentPort=localStorage.getItem('adminPort')||'platform';
var currentPage='home';

if(localStorage.getItem('adminAppVersion')!==APP_VERSION){
  localStorage.removeItem('apiBase');
  localStorage.setItem('adminAppVersion',APP_VERSION);
}

// ==================== Port Config ====================
var PORT_CONFIG={
  platform:{name:'小唯平台端',icon:'🏠',color:'#1abc9c',desc:'系统管理、业务总览、财务结算'},
  clinic:{name:'诊所端',icon:'🏥',color:'#3498db',desc:'患者管理、加工订单、核销登记'},
  dealer:{name:'经销商端',icon:'👤',color:'#f39c12',desc:'客户管理、销售活动、佣金提现'},
  pharmacy:{name:'药店端',icon:'💊',color:'#8e44ad',desc:'种植卡管理、采购库存、客户管理'},
  factory:{name:'工厂端',icon:'🏭',color:'#0097a7',desc:'订单生产、质检记录、收发货管理'}
};

// ==================== Port Menus ====================
var PORT_MENUS={
  platform:[
    {group:'概览',items:[{key:'home',name:'首页',icon:'📊'}]},
    {group:'业务管理',items:[
      {key:'clinics',name:'诊所管理',icon:'🏥'},
      {key:'pharmacy',name:'药店管理',icon:'💊'},
      {key:'factory',name:'工厂详情',icon:'🏭'},
      {key:'dealers',name:'经销商管理',icon:'👤'},
      {key:'cards',name:'种植体卡管理',icon:'💳'},
      {key:'mall',name:'商场管理',icon:'🛒'}
    ]},
    {group:'病历中心',items:[{key:'patientQuery',name:'病人病历查询',icon:'📋',restricted:true}]},
    {group:'财务',items:[
      {key:'settlement',name:'结算中心',icon:'💰'},
      {key:'reports',name:'财务报表',icon:'📈'}
    ]},
    {group:'系统',items:[
      {key:'permissions',name:'权限配置',icon:'🔐'},
      {key:'regreview',name:'注册审核',icon:'✅'},
      {key:'notifications',name:'消息通知',icon:'🔔'}
    ]}
  ],
  clinic:[
    {group:'概览',items:[{key:'home',name:'首页',icon:'📊'}]},
    {group:'业务',items:[
      {key:'verify',name:'核销登记',icon:'✔️'},
      {key:'patients',name:'患者建档',icon:'👥'},
      {key:'patientQuery',name:'病人信息查询',icon:'📋'},
      {key:'orders',name:'加工单管理',icon:'📦'},
      {key:'tracking',name:'订单跟踪',icon:'🚚'},
      {key:'implants',name:'植体管理',icon:'🦷'}
    ]},
    {group:'财务',items:[
      {key:'finance',name:'收支明细',icon:'💰'},
      {key:'withdraw',name:'提现申请',icon:'💸'}
    ]},
    {group:'系统',items:[{key:'settings',name:'诊所设置',icon:'⚙️'}]}
  ],
  dealer:[
    {group:'概览',items:[{key:'home',name:'首页',icon:'📊'}]},
    {group:'客户',items:[
      {key:'clinics',name:'诊所管理',icon:'🏥'},
      {key:'pharmacy',name:'药房管理',icon:'💊'},
      {key:'sales',name:'销售活动',icon:'📈'}
    ]},
    {group:'收益',items:[
      {key:'commission',name:'佣金明细',icon:'💰'},
      {key:'withdraw',name:'提现申请',icon:'💸'}
    ]},
    {group:'系统',items:[{key:'settings',name:'个人设置',icon:'⚙️'}]}
  ],
  pharmacy:[
    {group:'概览',items:[{key:'home',name:'首页',icon:'📊'}]},
    {group:'商品',items:[
      {key:'cards',name:'种植卡管理',icon:'💳'},
      {key:'inventory',name:'库存查看',icon:'📦'},
      {key:'purchase',name:'采购管理',icon:'🛒'}
    ]},
    {group:'财务',items:[
      {key:'finance',name:'财务收支',icon:'💰'},
      {key:'withdraw',name:'提现/商城',icon:'💸'}
    ]},
    {group:'客户',items:[{key:'customers',name:'客户管理',icon:'👥'}]},
    {group:'系统',items:[{key:'settings',name:'门店设置',icon:'⚙️'}]}
  ],
  factory:[
    {group:'概览',items:[{key:'home',name:'首页',icon:'📊'}]},
    {group:'订单',items:[
      {key:'orders',name:'订单管理',icon:'📦'},
      {key:'shipping',name:'收发货管理',icon:'🚚'}
    ]},
    {group:'生产',items:[
      {key:'production',name:'生产排产',icon:'🏭'},
      {key:'quality',name:'质检记录',icon:'✅'},
      {key:'exception',name:'异常反馈',icon:'⚠️'}
    ]},
    {group:'病历',items:[{key:'patientQuery',name:'病人病历查询',icon:'📋',restricted:true}]},
    {group:'沟通',items:[{key:'service',name:'客服中心',icon:'🎧'}]},
    {group:'财务',items:[{key:'finance',name:'财务收支',icon:'💰'}]}
  ]
};

// ==================== Local Accounts ====================
var LOCAL_ACCOUNTS={
  admin:{password:'123456',name:'超级管理员',avatar:'管',role:'super',ports:['platform','clinic','dealer','pharmacy','factory']},
  clinic:{password:'123456',name:'李医生',avatar:'李',role:'clinic',ports:['clinic']},
  dealer:{password:'123456',name:'张经理',avatar:'张',role:'dealer',ports:['dealer']},
  pharmacy:{password:'123456',name:'周店长',avatar:'周',role:'pharmacy',ports:['pharmacy']},
  factory:{password:'123456',name:'孙厂长',avatar:'孙',role:'factory',ports:['factory']}
};

// ==================== Mock Data ====================
var MOCK={
  clinics:[
    {id:1,name:'北京口腔医院',owner:'王医生',phone:'13800138001',region:'北京朝阳区',implants:128,status:'active'},
    {id:2,name:'上海美奥口腔',owner:'刘医生',phone:'13800138002',region:'上海浦东',implants:95,status:'active'},
    {id:3,name:'广州德伦口腔',owner:'陈医生',phone:'13800138003',region:'广州天河',implants:76,status:'active'},
    {id:4,name:'深圳同步齿科',owner:'赵医生',phone:'13800138004',region:'深圳南山',implants:112,status:'pending'},
    {id:5,name:'成都华西口腔',owner:'周医生',phone:'13800138005',region:'成都武侯',implants:88,status:'active'},
    {id:6,name:'杭州口腔医院',owner:'吴医生',phone:'13800138006',region:'杭州西湖',implants:65,status:'active'},
    {id:7,name:'武汉同济口腔',owner:'郑医生',phone:'13800138007',region:'武汉江岸',implants:54,status:'rejected'}
  ],
  pharmacies:[
    {id:1,name:'健康大药房',owner:'周店长',phone:'13900139001',region:'北京海淀',sales:320,status:'active'},
    {id:2,name:'仁爱药房',owner:'吴店长',phone:'13900139002',region:'上海徐汇',sales:280,status:'active'},
    {id:3,name:'同心药房',owner:'郑店长',phone:'13900139003',region:'广州越秀',sales:195,status:'active'},
    {id:4,name:'益民大药房',owner:'王店长',phone:'13900139004',region:'深圳福田',sales:165,status:'pending'}
  ],
  factories:[
    {id:1,name:'小唯医疗器械工厂',owner:'孙厂长',phone:'13700137001',address:'江苏苏州工业园区',capacity:5000,status:'active',stages:['原材料采购','精密加工','表面处理','质量检测','灭菌包装','成品入库']}
  ],
  dealers:[
    {id:1,name:'张经理',region:'华北区',clinics:12,pharmacies:8,commission:45000,status:'active'},
    {id:2,name:'李经理',region:'华东区',clinics:18,pharmacies:12,commission:68000,status:'active'},
    {id:3,name:'王经理',region:'华南区',clinics:9,pharmacies:6,commission:32000,status:'active'},
    {id:4,name:'赵经理',region:'西南区',clinics:7,pharmacies:4,commission:21000,status:'pending'}
  ],
  cards:[
    {id:1,cardNo:'IC20260001',patient:'张三',clinic:'北京口腔医院',model:'ITI骨水平',pharmacy:'健康大药房',date:'2026-01-15',status:'active'},
    {id:2,cardNo:'IC20260002',patient:'李四',clinic:'上海美奥口腔',model:'NobelActive',pharmacy:'仁爱药房',date:'2026-02-20',status:'active'},
    {id:3,cardNo:'IC20260003',patient:'王五',clinic:'广州德伦口腔',model:'ITI骨水平',pharmacy:'同心药房',date:'2026-03-10',status:'used'},
    {id:4,cardNo:'IC20260004',patient:'赵六',clinic:'成都华西口腔',model:'Astra Tech',pharmacy:'益民大药房',date:'2026-03-25',status:'active'}
  ],
  products:[
    {id:1,name:'电动牙刷',price:299,desc:'声波震动 5种模式',icon:'🪥',category:'口护用品',status:'active'},
    {id:2,name:'牙线棒50支装',price:39,desc:'超细牙线 清洁牙缝',icon:'🧵',category:'口护用品',status:'active'},
    {id:3,name:'漱口水500ml',price:49,desc:'抑菌清新 0酒精',icon:'🧴',category:'口护用品',status:'active'},
    {id:4,name:'ITI种植体服务',price:5980,desc:'瑞士ITI骨水平种植体',icon:'🦷',category:'种植服务',status:'active'},
    {id:5,name:'Nobel种植体服务',price:6800,desc:'瑞典Nobel Active种植体',icon:'🦷',category:'种植服务',status:'active'},
    {id:6,name:'Astra种植体服务',price:5200,desc:'美国Astra Tech种植体',icon:'🦷',category:'种植服务',status:'active'}
  ],
  patients:[
    {id:1,name:'张三',gender:'男',age:45,phone:'13800001111',type:'种植',diagnosis:'牙列缺失',implantModel:'ITI骨水平',surgeryDate:'2026-01-15',doctor:'王医生',allergy:'无',history:'高血压',implants:2},
    {id:2,name:'李四',gender:'男',age:52,phone:'13800002222',type:'种植',diagnosis:'牙周病伴缺失',implantModel:'NobelActive',surgeryDate:'2026-02-20',doctor:'刘医生',allergy:'青霉素',history:'糖尿病',implants:3},
    {id:3,name:'王五',gender:'女',age:38,phone:'13800003333',type:'修复',diagnosis:'牙体缺损',implantModel:'',surgeryDate:'',doctor:'陈医生',allergy:'无',history:'无',implants:0},
    {id:4,name:'赵六',gender:'男',age:60,phone:'13800004444',type:'种植',diagnosis:'外伤性牙缺失',implantModel:'Astra Tech',surgeryDate:'2026-03-25',doctor:'周医生',allergy:'无',history:'冠心病',implants:4},
    {id:5,name:'孙七',gender:'女',age:28,phone:'13800005555',type:'正畸',diagnosis:'牙列拥挤',implantModel:'',surgeryDate:'',doctor:'吴医生',allergy:'无',history:'无',implants:0},
    {id:6,name:'周八',gender:'男',age:50,phone:'13800006666',type:'种植',diagnosis:'磨牙缺失',implantModel:'ITI骨水平',surgeryDate:'2026-04-01',doctor:'王医生',allergy:'磺胺类',history:'甲亢',implants:2}
  ],
  orders:[
    {id:1,no:'WO20260001',patient:'张三',type:'种植体',model:'ITI骨水平',qty:2,factory:'小唯工厂',status:'shipped',date:'2026-01-10'},
    {id:2,no:'WO20260002',patient:'李四',type:'基台',model:'NobelActive',qty:3,factory:'小唯工厂',status:'processing',date:'2026-02-15'},
    {id:3,no:'WO20260003',patient:'赵六',type:'修复体',model:'Astra Tech',qty:4,factory:'小唯工厂',status:'pending',date:'2026-03-20'},
    {id:4,no:'WO20260004',patient:'周八',type:'种植体',model:'ITI骨水平',qty:2,factory:'小唯工厂',status:'received',date:'2026-03-28'}
  ],
  implants:[
    {id:1,model:'ITI骨水平',spec:'4.1×10mm',stock:45,used:128,status:'active'},
    {id:2,model:'NobelActive',spec:'3.5×11mm',stock:30,used:95,status:'active'},
    {id:3,model:'Astra Tech',spec:'4.5×13mm',stock:25,used:76,status:'active'},
    {id:4,model:'ITI骨水平',spec:'3.3×8mm',stock:15,used:54,status:'low'}
  ],
  verifyRecords:[
    {id:1,cardNo:'IC20260001',patient:'张三',type:'种植体植入',doctor:'王医生',date:'2026-01-15',status:'done'},
    {id:2,cardNo:'IC20260002',patient:'李四',type:'基台安装',doctor:'刘医生',date:'2026-02-20',status:'done'},
    {id:3,cardNo:'IC20260001',patient:'张三',type:'修复体安装',doctor:'王医生',date:'2026-03-01',status:'pending'}
  ],
  transactions:[
    {id:1,date:'2026-03-01',item:'种植体销售收入',direction:'收入',amount:29800,status:'completed'},
    {id:2,date:'2026-03-05',item:'采购支出',direction:'支出',amount:15000,status:'completed'},
    {id:3,date:'2026-03-10',item:'平台佣金',direction:'收入',amount:2980,status:'completed'},
    {id:4,date:'2026-03-15',item:'设备维护',direction:'支出',amount:3200,status:'pending'}
  ],
  withdrawals:[
    {id:1,no:'WD20260001',amount:20000,bank:'中国银行 6222****1234',status:'completed',applyDate:'2026-03-01',arriveDate:'2026-03-03'},
    {id:2,no:'WD20260002',amount:15000,bank:'工商银行 6222****5678',status:'pending',applyDate:'2026-03-10',arriveDate:''}
  ],
  settlements:[
    {id:1,no:'ST20260001',party:'北京口腔医院',type:'种植体结算',amount:29800,commission:2980,status:'completed',date:'2026-03-01'},
    {id:2,no:'ST20260002',party:'上海美奥口腔',type:'种植体结算',amount:51000,commission:5100,status:'pending',date:'2026-03-10'},
    {id:3,no:'ST20260003',party:'健康大药房',type:'种植卡结算',amount:9600,commission:960,status:'completed',date:'2026-03-15'}
  ],
  roles:[
    {id:1,name:'超级管理员',desc:'全部权限',ports:'全部端口',users:1,status:'active'},
    {id:2,name:'诊所管理员',desc:'诊所端管理',ports:'诊所端',users:1,status:'active'},
    {id:3,name:'药店管理员',desc:'药店端管理',ports:'药店端',users:1,status:'active'},
    {id:4,name:'工厂管理员',desc:'工厂端管理',ports:'工厂端',users:1,status:'active'},
    {id:5,name:'经销商',desc:'经销商端',ports:'经销商端',users:1,status:'active'}
  ],
  registrations:[
    {id:1,name:'深圳同步齿科',type:'诊所',owner:'赵医生',phone:'13800138004',region:'深圳南山',date:'2026-03-20',status:'pending'},
    {id:2,name:'益民大药房',type:'药店',owner:'王店长',phone:'13900139004',region:'深圳福田',date:'2026-03-22',status:'pending'},
    {id:3,name:'武汉同济口腔',type:'诊所',owner:'郑医生',phone:'13800138007',region:'武汉江岸',date:'2026-03-25',status:'rejected'}
  ],
  notifications:[
    {id:1,title:'新诊所注册申请',content:'深圳同步齿科提交了注册申请，请及时审核',time:'2026-03-20 10:30',read:false},
    {id:2,title:'结算到账通知',content:'北京口腔医院结算款29800元已到账',time:'2026-03-03 14:00',read:true},
    {id:3,title:'库存预警',content:'ITI骨水平 3.3×8mm 库存不足，仅剩15件',time:'2026-03-15 09:00',read:false}
  ],
  production:[
    {id:1,no:'PR20260001',patient:'张三',model:'ITI骨水平',qty:2,stage:'质检中',status:'processing',date:'2026-01-12'},
    {id:2,no:'PR20260002',patient:'李四',model:'NobelActive',qty:3,stage:'加工中',status:'processing',date:'2026-02-16'},
    {id:3,no:'PR20260003',patient:'赵六',model:'Astra Tech',qty:4,stage:'待排产',status:'pending',date:'2026-03-20'}
  ],
  quality:[
    {id:1,model:'ITI骨水平',spec:'4.1×10mm',passed:128,shipped:128,status:'passed'},
    {id:2,model:'NobelActive',spec:'3.5×11mm',passed:95,shipped:95,status:'passed'},
    {id:3,model:'Astra Tech',spec:'4.5×13mm',passed:76,shipped:72,status:'partial'}
  ],
  exceptions:[
    {id:1,title:'原材料到货延迟',content:'钛合金原材料供应商延迟交货3天',time:'2026-03-18',status:'pending'},
    {id:2,title:'设备故障',content:'CNC加工机床#3主轴异响，已报修',time:'2026-03-10',status:'resolved'}
  ]
};

// ==================== Entity CRUD Config ====================
var CRUD_CONFIG={
  clinics:{title:'诊所管理',columns:[
    {key:'name',label:'诊所名称',type:'text',required:true},
    {key:'owner',label:'负责人',type:'text',required:true},
    {key:'phone',label:'联系电话',type:'phone',required:true},
    {key:'region',label:'所在地区',type:'text',required:true},
    {key:'implants',label:'植体用量',type:'number'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'正常'},{value:'pending',label:'待审核'},{value:'rejected',label:'已拒绝'}]}
  ]},
  pharmacies:{title:'药店管理',columns:[
    {key:'name',label:'药店名称',type:'text',required:true},
    {key:'owner',label:'店长',type:'text',required:true},
    {key:'phone',label:'联系电话',type:'phone',required:true},
    {key:'region',label:'所在地区',type:'text',required:true},
    {key:'sales',label:'销售量',type:'number'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'正常'},{value:'pending',label:'待审核'},{value:'rejected',label:'已拒绝'}]}
  ]},
  factories:{title:'工厂详情',columns:[
    {key:'name',label:'工厂名称',type:'text',required:true},
    {key:'owner',label:'负责人',type:'text',required:true},
    {key:'phone',label:'联系电话',type:'phone',required:true},
    {key:'address',label:'工厂地址',type:'text',required:true},
    {key:'capacity',label:'月产能',type:'number'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'正常'},{value:'inactive',label:'停用'}]}
  ]},
  dealers:{title:'经销商管理',columns:[
    {key:'name',label:'姓名',type:'text',required:true},
    {key:'region',label:'负责区域',type:'text',required:true},
    {key:'clinics',label:'诊所客户',type:'number'},
    {key:'pharmacies',label:'药房客户',type:'number'},
    {key:'commission',label:'累计佣金',type:'number'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'正常'},{value:'pending',label:'待审核'}]}
  ]},
  cards:{title:'种植体卡管理',columns:[
    {key:'cardNo',label:'卡号',type:'text',required:true},
    {key:'patient',label:'患者姓名',type:'text',required:true},
    {key:'clinic',label:'诊所',type:'text',required:true},
    {key:'model',label:'种植体型号',type:'text',required:true},
    {key:'pharmacy',label:'药店',type:'text'},
    {key:'date',label:'发卡日期',type:'date'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'正常'},{value:'used',label:'已使用'},{value:'expired',label:'已过期'}]}
  ]},
  products:{title:'商场管理',columns:[
    {key:'name',label:'商品名称',type:'text',required:true},
    {key:'price',label:'价格(积分)',type:'number',required:true},
    {key:'category',label:'分类',type:'select',options:[{value:'口护用品',label:'口护用品'},{value:'种植服务',label:'种植服务'}]},
    {key:'desc',label:'描述',type:'textarea'},
    {key:'icon',label:'图标',type:'text'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'上架'},{value:'inactive',label:'下架'}]}
  ]},
  patients:{title:'患者建档',columns:[
    {key:'name',label:'姓名',type:'text',required:true},
    {key:'gender',label:'性别',type:'select',options:[{value:'男',label:'男'},{value:'女',label:'女'}]},
    {key:'age',label:'年龄',type:'number',required:true},
    {key:'phone',label:'联系电话',type:'phone',required:true},
    {key:'type',label:'治疗类型',type:'select',options:[{value:'种植',label:'种植'},{value:'修复',label:'修复'},{value:'正畸',label:'正畸'}]},
    {key:'implants',label:'种植体数',type:'number'},
    {key:'diagnosis',label:'诊断',type:'text'},
    {key:'allergy',label:'过敏史',type:'text'},
    {key:'history',label:'病史',type:'text'}
  ]},
  orders:{title:'加工单管理',columns:[
    {key:'no',label:'单号',type:'text',required:true},
    {key:'patient',label:'患者',type:'text',required:true},
    {key:'type',label:'类型',type:'select',options:[{value:'种植体',label:'种植体'},{value:'基台',label:'基台'},{value:'修复体',label:'修复体'}]},
    {key:'model',label:'型号',type:'text',required:true},
    {key:'qty',label:'数量',type:'number',required:true},
    {key:'factory',label:'工厂',type:'text'},
    {key:'status',label:'状态',type:'select',options:[{value:'pending',label:'待接单'},{value:'processing',label:'加工中'},{value:'shipped',label:'已发货'},{value:'received',label:'已签收'}]},
    {key:'date',label:'创建日期',type:'date'}
  ]},
  implants:{title:'植体管理',columns:[
    {key:'model',label:'型号',type:'text',required:true},
    {key:'spec',label:'规格',type:'text',required:true},
    {key:'stock',label:'库存',type:'number',required:true},
    {key:'used',label:'已用',type:'number'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'充足'},{value:'low',label:'不足'},{value:'out',label:'缺货'}]}
  ]},
  verifyRecords:{title:'核销登记',columns:[
    {key:'cardNo',label:'卡号',type:'text',required:true},
    {key:'patient',label:'患者',type:'text',required:true},
    {key:'type',label:'核销类型',type:'select',options:[{value:'种植体植入',label:'种植体植入'},{value:'基台安装',label:'基台安装'},{value:'修复体安装',label:'修复体安装'}]},
    {key:'doctor',label:'医生',type:'text',required:true},
    {key:'date',label:'时间',type:'date'},
    {key:'status',label:'状态',type:'select',options:[{value:'done',label:'已完成'},{value:'pending',label:'待执行'}]}
  ]},
  transactions:{title:'收支明细',columns:[
    {key:'date',label:'日期',type:'date',required:true},
    {key:'item',label:'项目',type:'text',required:true},
    {key:'direction',label:'方向',type:'select',options:[{value:'收入',label:'收入'},{value:'支出',label:'支出'}]},
    {key:'amount',label:'金额',type:'number',required:true},
    {key:'status',label:'状态',type:'select',options:[{value:'completed',label:'已完成'},{value:'pending',label:'待确认'}]}
  ]},
  withdrawals:{title:'提现申请',columns:[
    {key:'no',label:'单号',type:'text',required:true},
    {key:'amount',label:'金额',type:'number',required:true},
    {key:'bank',label:'收款银行',type:'text',required:true},
    {key:'status',label:'状态',type:'select',options:[{value:'pending',label:'待审核'},{value:'completed',label:'已到账'},{value:'rejected',label:'已拒绝'}]},
    {key:'applyDate',label:'申请日期',type:'date'},
    {key:'arriveDate',label:'到账日期',type:'date'}
  ]},
  settlements:{title:'结算中心',columns:[
    {key:'no',label:'单号',type:'text',required:true},
    {key:'party',label:'结算方',type:'text',required:true},
    {key:'type',label:'类型',type:'select',options:[{value:'种植体结算',label:'种植体结算'},{value:'种植卡结算',label:'种植卡结算'},{value:'佣金结算',label:'佣金结算'}]},
    {key:'amount',label:'金额',type:'number',required:true},
    {key:'commission',label:'平台抽成',type:'number'},
    {key:'status',label:'状态',type:'select',options:[{value:'pending',label:'待结算'},{value:'completed',label:'已结算'}]},
    {key:'date',label:'日期',type:'date'}
  ]},
  roles:{title:'权限配置',columns:[
    {key:'name',label:'角色名称',type:'text',required:true},
    {key:'desc',label:'描述',type:'text'},
    {key:'ports',label:'可用端口',type:'text'},
    {key:'status',label:'状态',type:'select',options:[{value:'active',label:'启用'},{value:'inactive',label:'禁用'}]}
  ]},
  registrations:{title:'注册审核',columns:[
    {key:'name',label:'机构名称',type:'text',required:true},
    {key:'type',label:'类型',type:'select',options:[{value:'诊所',label:'诊所'},{value:'药店',label:'药店'}]},
    {key:'owner',label:'负责人',type:'text',required:true},
    {key:'phone',label:'手机号',type:'phone',required:true},
    {key:'region',label:'地区',type:'text'},
    {key:'status',label:'状态',type:'select',options:[{value:'pending',label:'待审核'},{value:'approved',label:'已通过'},{value:'rejected',label:'已拒绝'}]}
  ]},
  notifications:{title:'消息通知',columns:[
    {key:'title',label:'标题',type:'text',required:true},
    {key:'content',label:'内容',type:'textarea',required:true},
    {key:'time',label:'时间',type:'text'},
    {key:'read',label:'已读',type:'select',options:[{value:false,label:'未读'},{value:true,label:'已读'}]}
  ]},
  purchase:{title:'采购管理',columns:[
    {key:'no',label:'订单号',type:'text',required:true},
    {key:'type',label:'类型',type:'select',options:[{value:'种植体',label:'种植体'},{value:'基台',label:'基台'},{value:'修复体',label:'修复体'}]},
    {key:'model',label:'型号',type:'text',required:true},
    {key:'qty',label:'数量',type:'number',required:true},
    {key:'supplier',label:'供应商',type:'text'},
    {key:'status',label:'状态',type:'select',options:[{value:'pending',label:'待下单'},{value:'ordered',label:'已下单'},{value:'received',label:'已收货'}]},
    {key:'date',label:'下单日期',type:'date'}
  ]},
  shipping:{title:'收发货管理',columns:[
    {key:'no',label:'订单号',type:'text',required:true},
    {key:'patient',label:'患者',type:'text',required:true},
    {key:'model',label:'型号',type:'text',required:true},
    {key:'qty',label:'数量',type:'number',required:true},
    {key:'receiver',label:'收货方',type:'text'},
    {key:'shipStatus',label:'发货状态',type:'select',options:[{value:'pending',label:'待发货'},{value:'shipped',label:'已发货'},{value:'received',label:'已签收'}]},
    {key:'date',label:'日期',type:'date'}
  ]},
  quality:{title:'质检记录',columns:[
    {key:'model',label:'型号',type:'text',required:true},
    {key:'spec',label:'规格',type:'text',required:true},
    {key:'passed',label:'合格数',type:'number',required:true},
    {key:'shipped',label:'已出货',type:'number'},
    {key:'status',label:'质检状态',type:'select',options:[{value:'passed',label:'全部合格'},{value:'partial',label:'部分合格'},{value:'failed',label:'不合格'}]}
  ]}
};

// ==================== API ====================
function apiRequest(url,method,data){
  return new Promise(function(resolve,reject){
    var xhr=new XMLHttpRequest();
    xhr.open(method||(data?'POST':'GET'),API_BASE+url);
    xhr.timeout=5000;
    if(data){xhr.setRequestHeader('Content-Type','application/json')}
    if(token&&token.indexOf('local_')!==0&&token!=='demo'){
      xhr.setRequestHeader('Authorization','Bearer '+token);
    }
    xhr.onload=function(){
      if(xhr.status>=200&&xhr.status<300){
        try{resolve(JSON.parse(xhr.responseText))}catch(e){reject('parse')}
      }else if(xhr.status===401){
        localStorage.removeItem('adminToken');localStorage.removeItem('adminUserInfo');
        token=null;userInfo=null;showLogin();reject('auth');
      }else{reject(xhr.statusText)}
    };
    xhr.ontimeout=function(){reject('timeout')};
    xhr.onerror=function(){reject('network')};
    xhr.send(data?JSON.stringify(data):null);
  });
}

function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},2000);
}

function showConfirm(msg,cb){
  document.getElementById('confirmMsg').textContent=msg;
  document.getElementById('confirmBg').classList.add('show');
  document.getElementById('confirmOkBtn').onclick=function(){
    document.getElementById('confirmBg').classList.remove('show');
    cb();
  };
}
function closeConfirm(){document.getElementById('confirmBg').classList.remove('show')}

// ==================== Captcha ====================
function generateCaptcha(){
  var chars='ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var s='';
  for(var i=0;i<4;i++){s+=chars[Math.floor(Math.random()*chars.length)]}
  document.getElementById('captchaBox').textContent=s;
  return s;
}

// ==================== Login ====================
function showLogin(){
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('portSelectPage').classList.add('hidden');
}

function toggleApiConfig(){
  document.getElementById('apiConfigBox').classList.toggle('show');
  document.getElementById('apiBaseInput').value=API_BASE;
}

function saveApiBase(){
  var v=document.getElementById('apiBaseInput').value.trim();
  if(!v){showToast('请输入API地址');return}
  if(v.indexOf('/api')===-1){v=v.replace(/\/$/,'')+'/api'}
  API_BASE=v;localStorage.setItem('apiBase',v);
  showToast('API地址已保存');
}

function doLogin(){
  var a=document.getElementById('loginAccount').value.trim();
  var p=document.getElementById('loginPassword').value.trim();
  if(!a||!p){showToast('请输入账号和密码');return}
  
  var btn=document.getElementById('loginBtn');
  btn.disabled=true;btn.textContent='登录中...';
  
  apiRequest('/auth/login','POST',{account:a,password:p}).then(function(res){
    token=res.token;userInfo=res.user;
    localStorage.setItem('adminToken',token);
    localStorage.setItem('adminUserInfo',JSON.stringify(userInfo));
    btn.disabled=false;btn.textContent='登 录';
    showPortSelect();
  }).catch(function(){
    var acc=LOCAL_ACCOUNTS[a];
    if(acc&&acc.password===p){
      token='local_'+a+'_'+Date.now();
      userInfo={id:0,name:acc.name,avatar:acc.avatar,role:acc.role,ports:acc.ports,account:a};
      localStorage.setItem('adminToken',token);
      localStorage.setItem('adminUserInfo',JSON.stringify(userInfo));
      btn.disabled=false;btn.textContent='登 录';
      showPortSelect();
      showToast('登录成功（本地模式）');
    }else{
      btn.disabled=false;btn.textContent='登 录';
      showToast('账号或密码错误');
    }
  });
}

// ==================== Port Selection ====================
function showPortSelect(){
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  var ps=document.getElementById('portSelectPage');
  ps.classList.remove('hidden');
  
  document.getElementById('portSelectUser').textContent='欢迎，'+(userInfo?userInfo.name:'')+'，请选择要进入的管理端口';
  
  var ports=userInfo&&userInfo.ports?userInfo.ports:['platform'];
  var html='';
  Object.keys(PORT_CONFIG).forEach(function(key){
    var p=PORT_CONFIG[key];
    var enabled=ports.indexOf(key)>=0;
    html+='<div class="port-card'+(enabled?'':' disabled')+'" onclick="'+(enabled?'selectPort(\''+key+'\')':'')+'">';
    html+='<div class="pc-icon" style="background:'+p.color+'20">'+p.icon+'</div>';
    html+='<div class="pc-info"><div class="pc-name">'+p.name+'</div><div class="pc-desc">'+(enabled?p.desc:'无访问权限')+'</div></div>';
    html+='<div class="pc-arrow">›</div>';
    html+='</div>';
  });
  document.getElementById('portGrid').innerHTML=html;
}

function selectPort(port){
  currentPort=port;
  localStorage.setItem('adminPort',port);
  document.getElementById('portSelectPage').classList.add('hidden');
  showMain();
}

// ==================== Main App ====================
function showMain(){
  var app=document.getElementById('mainApp');
  app.classList.remove('hidden');
  
  // Update topbar
  var tb=document.getElementById('topbar');
  tb.className='topbar port-'+currentPort;
  document.getElementById('topbarPortName').textContent=PORT_CONFIG[currentPort].name.replace('端','');
  
  // Update sidebar header
  var sh=document.getElementById('sidebarHeader');
  sh.style.background='linear-gradient(135deg,'+PORT_CONFIG[currentPort].color+','+PORT_CONFIG[currentPort].color+'dd)';
  document.getElementById('sidebarAvatar').textContent=userInfo?userInfo.avatar:'?';
  document.getElementById('sidebarName').textContent=userInfo?userInfo.name:'';
  document.getElementById('sidebarRole').textContent=PORT_CONFIG[currentPort].name;
  
  // Build sidebar
  buildSidebar();
  
  // Default to home
  currentPage='home';
  navigateTo('home');
  switchTab('home');
}

function buildSidebar(){
  var menus=PORT_MENUS[currentPort]||[];
  var html='';
  menus.forEach(function(group){
    html+='<div class="sidebar-group">';
    html+='<div class="sidebar-group-title">'+group.group+'</div>';
    group.items.forEach(function(item){
      html+='<div class="sidebar-item'+(currentPage===item.key?' active':'')+'" onclick="navigateTo(\''+item.key+'\')">';
      html+='<span class="si-icon">'+item.icon+'</span><span>'+item.name+'</span>';
      html+='</div>';
    });
    html+='</div>';
  });
  document.getElementById('sidebarBody').innerHTML=html;
}

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('show');
  document.getElementById('sidebarMask').classList.toggle('show');
}

function navigateTo(page){
  currentPage=page;
  toggleSidebar();
  
  // Update title
  var menus=PORT_MENUS[currentPort]||[];
  var title='首页';
  for(var i=0;i<menus.length;i++){
    for(var j=0;j<menus[i].items.length;j++){
      if(menus[i].items[j].key===page){title=menus[i].items[j].name;break}
    }
  }
  if(page==='home')title='首页';
  document.getElementById('topbarTitle').textContent=title;
  
  // Update active in sidebar
  var items=document.querySelectorAll('.sidebar-item');
  items.forEach(function(it){it.classList.remove('active')});
  
  // Render page
  renderPage(page);
}

// ==================== Tab Switching ====================
function switchTab(tab){
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active')});
  event.currentTarget.classList.add('active');
  
  if(tab==='home'){navigateTo('home')}
  else if(tab==='manage'){renderManageGrid()}
  else if(tab==='medical'){renderMedicalTab()}
  else if(tab==='finance'){renderFinanceTab()}
  else if(tab==='mine'){renderMineTab()}
}

function renderManageGrid(){
  var menus=PORT_MENUS[currentPort]||[];
  var items=[];
  menus.forEach(function(g){
    if(g.group!=='概览'&&g.group!=='系统'&&g.group!=='财务'&&g.group!=='病历'&&g.group!=='病历中心'&&g.group!=='沟通'){
      g.items.forEach(function(it){items.push(it)});
    }
  });
  
  if(items.length===0){
    document.getElementById('contentArea').innerHTML='<div class="empty"><div class="em-icon">📋</div><div class="em-text">当前端口暂无管理功能</div></div>';
    return;
  }
  
  var html='<div class="qg" style="padding-top:12px">';
  items.forEach(function(it){
    html+='<div class="qg-item" onclick="navigateTo(\''+it.key+'\')">';
    html+='<div class="qg-icon" style="background:'+PORT_CONFIG[currentPort].color+'15">'+it.icon+'</div>';
    html+='<div class="qg-name">'+it.name+'</div>';
    html+='</div>';
  });
  html+='</div>';
  
  // Also show recent data summary
  html+='<div class="section"><div class="section-title">最近数据</div></div>';
  html+='<div class="card-list">';
  items.slice(0,3).forEach(function(it){
    var data=MOCK[it.key]||[];
    if(data.length>0){
      var d=data[0];
      var fields=Object.keys(d).slice(0,3);
      html+='<div class="data-card" onclick="navigateTo(\''+it.key+'\')">';
      html+='<div class="dc-header"><div class="dc-title">'+it.name+' ('+data.length+')</div><span class="badge badge-info">查看全部</span></div>';
      html+='<div class="dc-body">';
      fields.forEach(function(f){html+='<div class="dc-field"><span>'+f+':</span> '+d[f]+'</div>'});
      html+='</div></div>';
    }
  });
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
  document.getElementById('topbarTitle').textContent='管理';
}

function renderMedicalTab(){
  var menus=PORT_MENUS[currentPort]||[];
  var items=[];
  menus.forEach(function(g){
    if(g.group==='病历'||g.group==='病历中心'||g.group==='业务'){
      g.items.forEach(function(it){
        if(it.key.indexOf('patient')>=0||it.key.indexOf('verify')>=0){items.push(it)}
      });
    }
  });
  
  if(items.length===0){
    document.getElementById('contentArea').innerHTML='<div class="empty"><div class="em-icon">📋</div><div class="em-text">当前端口无病历功能</div></div>';
    return;
  }
  
  var html='<div class="qg" style="padding-top:12px">';
  items.forEach(function(it){
    html+='<div class="qg-item" onclick="navigateTo(\''+it.key+'\')">';
    html+='<div class="qg-icon" style="background:'+PORT_CONFIG[currentPort].color+'15">'+it.icon+'</div>';
    html+='<div class="qg-name">'+it.name+'</div>';
    html+='</div>';
  });
  html+='</div>';
  document.getElementById('contentArea').innerHTML=html;
  document.getElementById('topbarTitle').textContent='病历';
}

function renderFinanceTab(){
  var menus=PORT_MENUS[currentPort]||[];
  var items=[];
  menus.forEach(function(g){
    if(g.group==='财务'||g.group==='收益'){
      g.items.forEach(function(it){items.push(it)});
    }
  });
  
  if(items.length===0){
    document.getElementById('contentArea').innerHTML='<div class="empty"><div class="em-icon">💰</div><div class="em-text">当前端口无财务功能</div></div>';
    return;
  }
  
  var html='<div class="qg" style="padding-top:12px">';
  items.forEach(function(it){
    html+='<div class="qg-item" onclick="navigateTo(\''+it.key+'\')">';
    html+='<div class="qg-icon" style="background:'+PORT_CONFIG[currentPort].color+'15">'+it.icon+'</div>';
    html+='<div class="qg-name">'+it.name+'</div>';
    html+='</div>';
  });
  html+='</div>';
  
  // Finance summary
  var txns=MOCK.transactions||[];
  var income=0,expense=0;
  txns.forEach(function(t){
    if(t.direction==='收入')income+=t.amount;else expense+=t.amount;
  });
  html+='<div class="stats-grid">';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f8f0">📈</div><div class="sc-info"><div class="sc-value">¥'+income.toLocaleString()+'</div><div class="sc-label">总收入</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#fdeaea">📉</div><div class="sc-info"><div class="sc-value">¥'+expense.toLocaleString()+'</div><div class="sc-label">总支出</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f4fd">💰</div><div class="sc-info"><div class="sc-value">¥'+(income-expense).toLocaleString()+'</div><div class="sc-label">净利润</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#fef5e7">⏳</div><div class="sc-info"><div class="sc-value">¥'+(income*0.1|0).toLocaleString()+'</div><div class="sc-label">待结算</div></div></div>';
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
  document.getElementById('topbarTitle').textContent='财务';
}

function renderMineTab(){
  var html='<div style="padding:20px;text-align:center;background:'+PORT_CONFIG[currentPort].color+';color:#fff;margin-bottom:12px">';
  html+='<div style="width:60px;height:60px;background:rgba(255,255,255,.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:8px">'+(userInfo?userInfo.avatar:'?')+'</div>';
  html+='<div style="font-size:16px;font-weight:600">'+(userInfo?userInfo.name:'')+'</div>';
  html+='<div style="font-size:12px;opacity:.8;margin-top:2px">'+PORT_CONFIG[currentPort].name+'</div>';
  html+='</div>';
  
  html+='<div class="settings-group">';
  html+='<div class="settings-item" onclick="showPortSelect()"><span class="si-label">切换端口</span><span class="si-value">'+PORT_CONFIG[currentPort].name+' ›</span></div>';
  html+='<div class="settings-item" onclick="navigateTo(\'settings\')"><span class="si-label">端口设置</span><span class="si-value">›</span></div>';
  html+='</div>';
  
  html+='<div class="settings-group">';
  html+='<div class="settings-item" onclick="showToast(\'当前版本: '+APP_VERSION+'\')"><span class="si-label">关于系统</span><span class="si-value">'+APP_VERSION+'</span></div>';
  html+='<div class="settings-item" onclick="showToast(\'API: '+API_BASE+'\')"><span class="si-label">API地址</span><span class="si-value">查看</span></div>';
  html+='</div>';
  
  html+='<div class="settings-group">';
  html+='<div class="settings-item" onclick="logout()" style="color:var(--danger);justify-content:center"><span class="si-label">退出登录</span></div>';
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
  document.getElementById('topbarTitle').textContent='我的';
}

function logout(){
  showConfirm('确定要退出登录吗？',function(){
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUserInfo');
    localStorage.removeItem('adminPort');
    token=null;userInfo=null;currentPort='platform';
    showLogin();
  });
}

// ==================== Page Rendering ====================
function renderPage(page){
  var content=document.getElementById('contentArea');
  
  if(page==='home'){renderHome();return}
  if(page==='settings'){renderSettings();return}
  if(page==='patientQuery'){renderPatientQuery(false);return}
  if(page==='patientQueryFull'){renderPatientQuery(true);return}
  if(page==='tracking'){renderTracking();return}
  if(page==='reports'){renderReports();return}
  if(page==='production'){renderProduction();return}
  if(page==='sales'){renderSales();return}
  if(page==='service'){renderService();return}
  if(page==='regreview'){renderRegReview();return}
  
  // CRUD pages
  if(CRUD_CONFIG[page]){renderCRUDPage(page);return}
  
  content.innerHTML='<div class="empty"><div class="em-icon">🚧</div><div class="em-text">功能开发中...</div></div>';
}

// ==================== Home Dashboard ====================
function renderHome(){
  var html='';
  var stats=getPortStats();
  
  // Stats grid
  html+='<div class="stats-grid" style="padding-top:12px">';
  stats.forEach(function(s){
    html+='<div class="stat-card"><div class="sc-icon" style="background:'+s.color+'20">'+s.icon+'</div><div class="sc-info"><div class="sc-value">'+s.value+'</div><div class="sc-label">'+s.label+'</div></div></div>';
  });
  html+='</div>';
  
  // Quick grid
  var menus=PORT_MENUS[currentPort]||[];
  var quickItems=[];
  menus.forEach(function(g){
    if(g.group!=='概览'){g.items.slice(0,2).forEach(function(it){if(quickItems.length<8)quickItems.push(it)})}
  });
  if(quickItems.length>0){
    html+='<div class="section"><div class="section-title">快捷入口</div></div>';
    html+='<div class="qg">';
    quickItems.forEach(function(it){
      html+='<div class="qg-item" onclick="navigateTo(\''+it.key+'\')">';
      html+='<div class="qg-icon" style="background:'+PORT_CONFIG[currentPort].color+'15">'+it.icon+'</div>';
      html+='<div class="qg-name">'+it.name+'</div>';
      html+='</div>';
    });
    html+='</div>';
  }
  
  // Recent data
  var recentData=getRecentData();
  if(recentData.length>0){
    html+='<div class="section"><div class="section-title">最近动态</div></div>';
    html+='<div class="card-list">';
    recentData.forEach(function(d){
      html+='<div class="data-card" onclick="navigateTo(\''+d.key+'\')">';
      html+='<div class="dc-header"><div class="dc-title">'+d.title+'</div><span class="badge badge-info">'+d.count+'</span></div>';
      html+='<div class="dc-body">';
      d.fields.forEach(function(f){html+='<div class="dc-field"><span>'+f.label+':</span> '+f.value+'</div>'});
      html+='</div></div>';
    });
    html+='</div>';
  }
  
  document.getElementById('contentArea').innerHTML=html;
}

function getPortStats(){
  var stats=[];
  if(currentPort==='platform'){
    stats=[
      {icon:'🏥',value:MOCK.clinics.filter(function(c){return c.status==='active'}).length,label:'合作诊所',color:'#1abc9c'},
      {icon:'💊',value:MOCK.pharmacies.filter(function(p){return p.status==='active'}).length,label:'合作药店',color:'#8e44ad'},
      {icon:'👤',value:MOCK.dealers.filter(function(d){return d.status==='active'}).length,label:'经销商',color:'#f39c12'},
      {icon:'💰',value:'¥'+(MOCK.settlements.reduce(function(s,c){return s+c.amount},0)|0).toLocaleString(),label:'总营收',color:'#27ae60'}
    ];
  }else if(currentPort==='clinic'){
    stats=[
      {icon:'✔️',value:MOCK.verifyRecords.length,label:'今日核销',color:'#3498db'},
      {icon:'👥',value:MOCK.patients.length,label:'患者总数',color:'#27ae60'},
      {icon:'📦',value:MOCK.orders.length,label:'加工单',color:'#f39c12'},
      {icon:'🦷',value:MOCK.implants.reduce(function(s,i){return s+i.stock},0),label:'植体库存',color:'#1abc9c'}
    ];
  }else if(currentPort==='dealer'){
    stats=[
      {icon:'🏥',value:MOCK.clinics.length,label:'诊所客户',color:'#f39c12'},
      {icon:'💊',value:MOCK.pharmacies.length,label:'药房客户',color:'#8e44ad'},
      {icon:'💰',value:'¥'+MOCK.dealers.reduce(function(s,d){return s+d.commission},0).toLocaleString(),label:'累计佣金',color:'#27ae60'},
      {icon:'⏳',value:MOCK.withdrawals.filter(function(w){return w.status==='pending'}).length,label:'待提现',color:'#e74c3c'}
    ];
  }else if(currentPort==='pharmacy'){
    stats=[
      {icon:'💳',value:MOCK.cards.length,label:'种植卡销量',color:'#8e44ad'},
      {icon:'📦',value:MOCK.implants.length,label:'商品总数',color:'#3498db'},
      {icon:'💰',value:'¥'+MOCK.transactions.filter(function(t){return t.direction==='收入'}).reduce(function(s,t){return s+t.amount},0).toLocaleString(),label:'本月收入',color:'#27ae60'},
      {icon:'⏳',value:MOCK.withdrawals.filter(function(w){return w.status==='pending'}).length,label:'待提现',color:'#e74c3c'}
    ];
  }else if(currentPort==='factory'){
    stats=[
      {icon:'⏳',value:MOCK.orders.filter(function(o){return o.status==='pending'}).length,label:'待处理订单',color:'#f39c12'},
      {icon:'🔄',value:MOCK.orders.filter(function(o){return o.status==='processing'}).length,label:'加工中',color:'#3498db'},
      {icon:'🚚',value:MOCK.orders.filter(function(o){return o.status==='shipped'}).length,label:'已出货',color:'#27ae60'},
      {icon:'📦',value:MOCK.implants.reduce(function(s,i){return s+i.stock},0),label:'库存总量',color:'#0097a7'}
    ];
  }
  return stats;
}

function getRecentData(){
  var data=[];
  if(currentPort==='platform'){
    var regs=MOCK.registrations.filter(function(r){return r.status==='pending'});
    data.push({key:'regreview',title:'待审核注册',count:regs.length+'条',fields:regs.length?[{label:'机构',value:regs[0].name},{label:'类型',value:regs[0].type}]:[]});
    var notifs=MOCK.notifications.filter(function(n){return !n.read});
    data.push({key:'notifications',title:'未读消息',count:notifs.length+'条',fields:notifs.length?[{label:'标题',value:notifs[0].title}]:[]});
  }
  return data;
}

// ==================== CRUD Page ====================
function renderCRUDPage(entity){
  var config=CRUD_CONFIG[entity];
  if(!config){return}
  
  var data=MOCK[entity]||[];
  var html='';
  
  // Search bar
  html+='<div class="search-bar"><input type="text" id="searchInput" placeholder="搜索'+config.title+'..." oninput="filterCRUD(\''+entity+'\')"></div>';
  
  // Status filter
  var statusOptions=getStatusOptions(entity);
  if(statusOptions.length>0){
    html+='<div class="filter-bar" id="filterBar">';
    html+='<div class="filter-chip active" onclick="setCRUDFilter(this,\''+entity+'\',\'\')">全部</div>';
    statusOptions.forEach(function(opt){
      html+='<div class="filter-chip" onclick="setCRUDFilter(this,\''+entity+'\',\''+opt.value+'\')">'+opt.label+'</div>';
    });
    html+='</div>';
  }
  
  // Data list
  html+='<div class="card-list" id="crudList">';
  html+=renderCRUDCards(entity,data);
  html+='</div>';
  
  // Add button
  if(entity!=='factories'&&entity!=='regreview'&&entity!=='notifications'&&entity!=='roles'){
    html+='<div style="padding:12px;text-align:center">';
    html+='<button class="btn-primary" style="width:100%;height:44px;border-radius:10px" onclick="openCRUDForm(\''+entity+'\')">+ 新增'+config.title.replace('管理','').replace('明细','')</button>';
    html+='</div>';
  }
  
  document.getElementById('contentArea').innerHTML=html;
}

function getStatusOptions(entity){
  var opts=[];
  if(entity==='clinics'||entity==='pharmacies'||entity==='dealers'){
    opts=[{value:'active',label:'正常'},{value:'pending',label:'待审核'},{value:'rejected',label:'已拒绝'}];
  }else if(entity==='cards'){
    opts=[{value:'active',label:'正常'},{value:'used',label:'已使用'}];
  }else if(entity==='orders'||entity==='purchase'){
    opts=[{value:'pending',label:'待接单'},{value:'processing',label:'加工中'},{value:'shipped',label:'已发货'},{value:'received',label:'已签收'}];
  }else if(entity==='transactions'){
    opts=[{value:'收入',label:'收入'},{value:'支出',label:'支出'}];
  }else if(entity==='withdrawals'){
    opts=[{value:'pending',label:'待审核'},{value:'completed',label:'已到账'}];
  }else if(entity==='settlements'){
    opts=[{value:'pending',label:'待结算'},{value:'completed',label:'已结算'}];
  }else if(entity==='registrations'){
    opts=[{value:'pending',label:'待审核'},{value:'approved',label:'已通过'},{value:'rejected',label:'已拒绝'}];
  }else if(entity==='notifications'){
    opts=[];
  }else if(entity==='verifyRecords'){
    opts=[{value:'done',label:'已完成'},{value:'pending',label:'待执行'}];
  }else if(entity==='implants'){
    opts=[{value:'active',label:'充足'},{value:'low',label:'不足'}];
  }else if(entity==='quality'){
    opts=[{value:'passed',label:'合格'},{value:'partial',label:'部分合格'}];
  }
  return opts;
}

function renderCRUDCards(entity,data){
  if(!data||data.length===0){
    return '<div class="empty"><div class="em-icon">📭</div><div class="em-text">暂无数据</div></div>';
  }
  
  var config=CRUD_CONFIG[entity];
  var html='';
  data.forEach(function(item){
    html+='<div class="data-card">';
    // Header
    var titleField=config.columns[0].key;
    html+='<div class="dc-header"><div class="dc-title">'+item[titleField]+'</div>';
    if(item.status){
      html+='<span class="badge '+getStatusBadgeClass(item.status)+'">'+getStatusLabel(entity,item.status)+'</span>';
    }
    html+='</div>';
    
    // Body fields
    html+='<div class="dc-body">';
    config.columns.slice(1,5).forEach(function(col){
      if(item[col.key]!==undefined&&item[col.key]!==''){
        html+='<div class="dc-field"><span>'+col.label+':</span> '+item[col.key]+'</div>';
      }
    });
    html+='</div>';
    
    // Actions
    html+='<div class="dc-footer">';
    if(entity==='registrations'&&item.status==='pending'){
      html+='<button class="btn-primary" style="height:30px;padding:0 12px;border-radius:6px;font-size:12px" onclick="reviewRegistration('+item.id+',\'approved\')">通过</button>';
      html+='<button class="btn-danger" style="height:30px;padding:0 12px;border-radius:6px;font-size:12px" onclick="reviewRegistration('+item.id+',\'rejected\')">拒绝</button>';
    }else if(entity==='factories'){
      html+='<span style="font-size:12px;color:var(--text-muted)">月产能: '+item.capacity+'件</span>';
    }else{
      html+='<div style="display:flex;gap:8px">';
      html+='<button class="btn-secondary" style="height:30px;padding:0 12px;border-radius:6px;font-size:12px" onclick="openCRUDForm(\''+entity+'\','+item.id+')">编辑</button>';
      if(entity!=='roles'&&entity!=='notifications'){
        html+='<button class="btn-danger" style="height:30px;padding:0 12px;border-radius:6px;font-size:12px" onclick="deleteCRUDItem(\''+entity+'\','+item.id+')">删除</button>';
      }
      html+='</div>';
    }
    html+='</div>';
    
    // Factory stages
    if(entity==='factories'&&item.stages){
      html+='<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border)">';
      html+='<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">生产流程</div>';
      html+='<div style="display:flex;flex-wrap:wrap;gap:4px">';
      item.stages.forEach(function(s,i){
        html+='<span class="badge badge-info" style="font-size:10px">'+(i+1)+'. '+s+'</span>';
      });
      html+='</div></div>';
    }
    
    html+='</div>';
  });
  return html;
}

function getStatusBadgeClass(status){
  var map={
    active:'badge-success',pending:'badge-warning',rejected:'badge-danger',
    used:'badge-muted',expired:'badge-danger',
    completed:'badge-success',processing:'badge-info',shipped:'badge-info',received:'badge-success',
    ordered:'badge-info',received:'badge-success',
    done:'badge-success',
    low:'badge-warning',out:'badge-danger',
    passed:'badge-success',partial:'badge-warning',failed:'badge-danger',
    approved:'badge-success',
    收入:'badge-success',支出:'badge-danger'
  };
  return map[status]||'badge-muted';
}

function getStatusLabel(entity,status){
  var map={
    active:'正常',pending:'待审核',rejected:'已拒绝',
    used:'已使用',expired:'已过期',
    completed:'已完成',processing:'加工中',shipped:'已发货',received:'已签收',
    ordered:'已下单',
    done:'已完成',
    low:'不足',out:'缺货',
    passed:'合格',partial:'部分合格',failed:'不合格',
    approved:'已通过',
    收入:'收入',支出:'支出'
  };
  return map[status]||status;
}

// CRUD filter state
var crudFilter='';

function setCRUDFilter(el,entity,status){
  document.querySelectorAll('#filterBar .filter-chip').forEach(function(c){c.classList.remove('active')});
  el.classList.add('active');
  crudFilter=status;
  filterCRUD(entity);
}

function filterCRUD(entity){
  var search=document.getElementById('searchInput').value.toLowerCase();
  var data=MOCK[entity]||[];
  var filtered=data.filter(function(item){
    var matchSearch=true;
    if(search){
      matchSearch=JSON.stringify(item).toLowerCase().indexOf(search)>=0;
    }
    var matchFilter=true;
    if(crudFilter){
      if(item.status!==undefined){
        matchFilter=item.status===crudFilter;
      }else if(item.direction!==undefined){
        matchFilter=item.direction===crudFilter;
      }
    }
    return matchSearch&&matchFilter;
  });
  document.getElementById('crudList').innerHTML=renderCRUDCards(entity,filtered);
}

// ==================== CRUD Form ====================
function openCRUDForm(entity,id){
  var config=CRUD_CONFIG[entity];
  if(!config){return}
  
  var item=id?MOCK[entity].find(function(d){return d.id===id}):null;
  var isEdit=!!item;
  
  var html='<div class="modal-header"><div class="mh-title">'+(isEdit?'编辑':'新增')+config.title.replace('管理','').replace('明细','')+'</div><div class="mh-close" onclick="closeModal()">×</div></div>';
  html+='<div class="modal-body">';
  
  config.columns.forEach(function(col){
    var val=item?item[col.key]||'':'';
    if(col.type==='select'){
      html+='<div class="form-group"><label>'+(col.required?'<span class="req">*</span> ':'' )+col.label+'</label><select id="field_'+col.key+'">';
      col.options.forEach(function(opt){
        html+='<option value="'+opt.value+'"'+(val==opt.value?' selected':'')+'>'+opt.label+'</option>';
      });
      html+='</select></div>';
    }else if(col.type==='textarea'){
      html+='<div class="form-group"><label>'+(col.required?'<span class="req">*</span> ':'' )+col.label+'</label><textarea id="field_'+col.key+'">'+val+'</textarea></div>';
    }else if(col.type==='date'){
      html+='<div class="form-group"><label>'+(col.required?'<span class="req">*</span> ':'' )+col.label+'</label><input type="date" id="field_'+col.key+'" value="'+val+'"></div>';
    }else if(col.type==='number'){
      html+='<div class="form-group"><label>'+(col.required?'<span class="req">*</span> ':'' )+col.label+'</label><input type="number" id="field_'+col.key+'" value="'+val+'"></div>';
    }else{
      html+='<div class="form-group"><label>'+(col.required?'<span class="req">*</span> ':'' )+col.label+'</label><input type="text" id="field_'+col.key+'" value="'+val+'"></div>';
    }
  });
  
  html+='<div class="form-actions">';
  html+='<button class="btn-secondary" onclick="closeModal()">取消</button>';
  html+='<button class="btn-primary" onclick="saveCRUDItem(\''+entity+'\','+(id||0)+')">'+(isEdit?'保存':'添加')+'</button>';
  html+='</div>';
  html+='</div>';
  
  document.getElementById('modalContent').innerHTML=html;
  document.getElementById('modalBg').classList.add('show');
}

function closeModal(e){
  if(e&&e.target.id!=='modalBg')return;
  document.getElementById('modalBg').classList.remove('show');
}

function saveCRUDItem(entity,id){
  var config=CRUD_CONFIG[entity];
  if(!config){return}
  
  var item={};
  var valid=true;
  config.columns.forEach(function(col){
    var el=document.getElementById('field_'+col.key);
    var val=el.value.trim();
    if(col.required&&!val){showToast(col.label+'不能为空');valid=false;return}
    if(col.type==='number'){val=parseInt(val)||0}
    if(col.key==='read'){val=val==='true'||val===true}
    item[col.key]=val;
  });
  
  if(!valid)return;
  
  if(id){
    // Edit
    var idx=MOCK[entity].findIndex(function(d){return d.id===id});
    if(idx>=0){item.id=id;MOCK[entity][idx]=item}
    showToast('修改成功');
  }else{
    // Add
    item.id=Date.now();
    MOCK[entity].push(item);
    showToast('添加成功');
  }
  
  closeModal();
  renderCRUDPage(entity);
}

function deleteCRUDItem(entity,id){
  showConfirm('确定要删除这条记录吗？',function(){
    var idx=MOCK[entity].findIndex(function(d){return d.id===id});
    if(idx>=0){MOCK[entity].splice(idx,1);showToast('删除成功');renderCRUDPage(entity)}
  });
}

function reviewRegistration(id,action){
  var reg=MOCK.registrations.find(function(r){return r.id===id});
  if(reg){
    reg.status=action;
    showToast(action==='approved'?'已通过审核':'已拒绝申请');
    renderCRUDPage('registrations');
  }
}

// ==================== Patient Query ====================
function renderPatientQuery(fullAccess){
  var restricted=!fullAccess&&currentPort!=='clinic';
  
  var html='';
  html+='<div class="search-bar"><input type="text" id="patientSearch" placeholder="搜索患者姓名/诊断/医生..." oninput="filterPatients()"></div>';
  
  // Filter chips
  html+='<div class="filter-bar" id="patientFilterBar">';
  html+='<div class="filter-chip active" onclick="setPatientFilter(this,\'\')">全部</div>';
  html+='<div class="filter-chip" onclick="setPatientFilter(this,\'种植\')">种植</div>';
  html+='<div class="filter-chip" onclick="setPatientFilter(this,\'修复\')">修复</div>';
  html+='<div class="filter-chip" onclick="setPatientFilter(this,\'正畸\')">正畸</div>';
  html+='</div>';
  
  html+='<div class="card-list" id="patientList">';
  html+=renderPatientCards(MOCK.patients,restricted);
  html+='</div>';
  
  // Stats
  html+='<div class="stats-grid" style="padding-top:12px">';
  var total=MOCK.patients.length;
  var implant=MOCK.patients.filter(function(p){return p.type==='种植'}).length;
  var implants=MOCK.patients.reduce(function(s,p){return s+(p.implants||0)},0);
  var surgeries=MOCK.patients.filter(function(p){return p.surgeryDate}).length;
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f8f0">👥</div><div class="sc-info"><div class="sc-value">'+total+'</div><div class="sc-label">总患者数</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f4fd">🦷</div><div class="sc-info"><div class="sc-value">'+implant+'</div><div class="sc-label">种植患者</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#fef5e7">⚙️</div><div class="sc-info"><div class="sc-value">'+implants+'</div><div class="sc-label">种植体总数</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#f5eef7">✅</div><div class="sc-info"><div class="sc-value">'+surgeries+'</div><div class="sc-label">已完成手术</div></div></div>';
  html+='</div>';
  
  if(restricted){
    html+='<div style="padding:8px 12px;text-align:center;font-size:12px;color:var(--text-muted)">⚠ 仅显示病历信息，联系电话等隐私信息已隐藏</div>';
  }
  
  document.getElementById('contentArea').innerHTML=html;
}

var patientFilter='';

function setPatientFilter(el,type){
  document.querySelectorAll('#patientFilterBar .filter-chip').forEach(function(c){c.classList.remove('active')});
  el.classList.add('active');
  patientFilter=type;
  filterPatients();
}

function filterPatients(){
  var search=(document.getElementById('patientSearch')?document.getElementById('patientSearch').value:'').toLowerCase();
  var restricted=currentPage==='patientQuery'&&currentPort!=='clinic';
  var filtered=MOCK.patients.filter(function(p){
    var matchSearch=true;
    if(search){
      matchSearch=(p.name&&p.name.toLowerCase().indexOf(search)>=0)||(p.diagnosis&&p.diagnosis.toLowerCase().indexOf(search)>=0)||(p.doctor&&p.doctor.toLowerCase().indexOf(search)>=0);
    }
    var matchFilter=patientFilter?p.type===patientFilter:true;
    return matchSearch&&matchFilter;
  });
  document.getElementById('patientList').innerHTML=renderPatientCards(filtered,restricted);
}

function renderPatientCards(data,restricted){
  if(!data||data.length===0){
    return '<div class="empty"><div class="em-icon">👥</div><div class="em-text">暂无患者数据</div></div>';
  }
  var html='';
  data.forEach(function(p){
    html+='<div class="data-card" onclick="showPatientDetail('+p.id+')">';
    html+='<div class="dc-header"><div class="dc-title">'+p.name+' ('+p.gender+','+p.age+'岁)</div><span class="badge '+(p.type==='种植'?'badge-success':p.type==='修复'?'badge-info':'badge-purple')+'">'+p.type+'</span></div>';
    html+='<div class="dc-body">';
    if(!restricted){
      html+='<div class="dc-field"><span>电话:</span> '+p.phone+'</div>';
    }
    if(p.diagnosis)html+='<div class="dc-field"><span>诊断:</span> '+p.diagnosis+'</div>';
    if(p.implantModel)html+='<div class="dc-field"><span>种植体:</span> '+p.implantModel+'</div>';
    if(p.surgeryDate)html+='<div class="dc-field"><span>手术日期:</span> '+p.surgeryDate+'</div>';
    if(p.doctor)html+='<div class="dc-field"><span>主治医生:</span> '+p.doctor+'</div>';
    html+='</div>';
    html+='<div class="dc-footer"><span style="font-size:12px;color:var(--text-muted)">点击查看详情</span></div>';
    html+='</div>';
  });
  return html;
}

function showPatientDetail(id){
  var p=MOCK.patients.find(function(d){return d.id===id});
  if(!p)return;
  var restricted=currentPort!=='clinic';
  
  var html='<div class="section"><div class="section-title">基本信息</div></div>';
  html+='<div class="card-list">';
  html+='<div class="data-card">';
  html+='<div class="dc-header"><div class="dc-title">'+p.name+'</div><span class="badge '+(p.type==='种植'?'badge-success':p.type==='修复'?'badge-info':'badge-purple')+'">'+p.type+'</span></div>';
  html+='<div class="dc-body">';
  html+='<div class="dc-field"><span>性别:</span> '+p.gender+'</div>';
  html+='<div class="dc-field"><span>年龄:</span> '+p.age+'岁</div>';
  if(!restricted)html+='<div class="dc-field"><span>联系电话:</span> <a href="tel:'+p.phone+'" style="color:var(--primary)">'+p.phone+'</a></div>';
  if(!restricted){
    if(p.allergy)html+='<div class="dc-field"><span>过敏史:</span> '+p.allergy+'</div>';
    if(p.history)html+='<div class="dc-field"><span>病史:</span> '+p.history+'</div>';
  }
  html+='</div></div></div>';
  
  html+='<div class="section"><div class="section-title">病历信息</div></div>';
  html+='<div class="card-list">';
  html+='<div class="data-card">';
  html+='<div class="dc-body">';
  if(p.diagnosis)html+='<div class="dc-field"><span>诊断:</span> '+p.diagnosis+'</div>';
  if(p.implantModel)html+='<div class="dc-field"><span>种植体型号:</span> '+p.implantModel+'</div>';
  if(p.surgeryDate)html+='<div class="dc-field"><span>手术日期:</span> '+p.surgeryDate+'</div>';
  if(p.doctor)html+='<div class="dc-field"><span>主治医生:</span> '+p.doctor+'</div>';
  if(p.implants)html+='<div class="dc-field"><span>种植体数:</span> '+p.implants+'颗</div>';
  html+='</div></div></div>';
  
  document.getElementById('subpageTitle').textContent='患者详情';
  document.getElementById('subpageBody').innerHTML=html;
  document.getElementById('subpage').classList.add('active');
}

function closeSubpage(){
  document.getElementById('subpage').classList.remove('active');
}

// ==================== Order Tracking ====================
function renderTracking(){
  var html='<div class="section"><div class="section-title">订单状态看板</div></div>';
  
  var statuses=[
    {value:'pending',label:'待接单',color:'#f39c12',icon:'⏳'},
    {value:'processing',label:'加工中',color:'#3498db',icon:'🔄'},
    {value:'shipped',label:'已发货',color:'#27ae60',icon:'🚚'},
    {value:'received',label:'已签收',color:'#1abc9c',icon:'✅'}
  ];
  
  html+='<div class="stats-grid">';
  statuses.forEach(function(s){
    var count=MOCK.orders.filter(function(o){return o.status===s.value}).length;
    html+='<div class="stat-card"><div class="sc-icon" style="background:'+s.color+'20">'+s.icon+'</div><div class="sc-info"><div class="sc-value">'+count+'</div><div class="sc-label">'+s.label+'</div></div></div>';
  });
  html+='</div>';
  
  html+='<div class="section"><div class="section-title">物流时间线</div></div>';
  html+='<div class="timeline">';
  MOCK.orders.forEach(function(o){
    var stage=getOrderStage(o.status);
    html+='<div class="timeline-item">';
    html+='<div class="timeline-dot '+(o.status==='received'?'done':'pending')+'">'+stage.icon+'</div>';
    html+='<div class="timeline-content"><div class="tc-title">'+o.no+' - '+o.patient+'</div>';
    html+='<div class="tc-desc">'+o.type+' '+o.model+' ×'+o.qty+' | 当前: '+stage.label+'</div>';
    html+='<div class="tc-time">创建: '+o.date+'</div></div>';
    html+='</div>';
  });
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
}

function getOrderStage(status){
  var map={
    pending:{label:'待接单',icon:'⏳'},
    processing:{label:'加工中',icon:'🔄'},
    shipped:{label:'已发货',icon:'🚚'},
    received:{label:'已签收',icon:'✅'}
  };
  return map[status]||{label:status,icon:'❓'};
}

// ==================== Financial Reports ====================
function renderReports(){
  var income=MOCK.transactions.filter(function(t){return t.direction==='收入'}).reduce(function(s,t){return s+t.amount},0);
  var expense=MOCK.transactions.filter(function(t){return t.direction==='支出'}).reduce(function(s,t){return s+t.amount},0);
  var profit=income-expense;
  var margin=income>0?((profit/income)*100).toFixed(1):0;
  
  var html='<div class="stats-grid" style="padding-top:12px">';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f8f0">📈</div><div class="sc-info"><div class="sc-value">¥'+income.toLocaleString()+'</div><div class="sc-label">总收入</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#fdeaea">📉</div><div class="sc-info"><div class="sc-value">¥'+expense.toLocaleString()+'</div><div class="sc-label">总支出</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f4fd">💰</div><div class="sc-info"><div class="sc-value">¥'+profit.toLocaleString()+'</div><div class="sc-label">净利润</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#fef5e7">📊</div><div class="sc-info"><div class="sc-value">'+margin+'%</div><div class="sc-label">利润率</div></div></div>';
  html+='</div>';
  
  // Chart bars
  html+='<div class="section"><div class="section-title">月度收支趋势</div></div>';
  html+='<div class="chart">';
  var months=['1月','2月','3月','4月','5月','6月'];
  var data=[18000,22000,25000,20000,28000,30000];
  var maxVal=Math.max.apply(null,data);
  months.forEach(function(m,i){
    var h=(data[i]/maxVal*100)|0;
    html+='<div class="chart-bar"><div class="cb-bar" style="height:'+h+'%;background:linear-gradient(180deg,#1abc9c,#16a085)"></div><div class="cb-label">'+m+'</div></div>';
  });
  html+='</div>';
  
  // Pie chart
  html+='<div class="section"><div class="section-title">收入构成</div></div>';
  var settlementTypes={
    '种植体结算':MOCK.settlements.filter(function(s){return s.type==='种植体结算'}).reduce(function(s,c){return s+c.amount},0),
    '种植卡结算':MOCK.settlements.filter(function(s){return s.type==='种植卡结算'}).reduce(function(s,c){return s+c.amount},0),
    '佣金结算':MOCK.settlements.filter(function(s){return s.type==='佣金结算'}).reduce(function(s,c){return s+c.amount},0)
  };
  var totalPie=Object.values(settlementTypes).reduce(function(s,v){return s+v},0)||1;
  var colors=['#1abc9c','#3498db','#f39c12'];
  var deg1=(settlementTypes['种植体结算']/totalPie*360);
  var deg2=(settlementTypes['种植卡结算']/totalPie*360);
  html+='<div class="pie-container">';
  html+='<div class="pie-chart" style="background:conic-gradient(#1abc9c 0deg '+deg1+'deg, #3498db '+deg1+'deg '+(deg1+deg2)+'deg, #f39c12 '+(deg1+deg2)+'deg 360deg)"></div>';
  html+='<div class="pie-legend">';
  var i=0;
  for(var key in settlementTypes){
    html+='<div class="pie-legend-item"><div class="pl-dot" style="background:'+colors[i]+'"></div>'+key+': ¥'+settlementTypes[key].toLocaleString()+'</div>';
    i++;
  }
  html+='</div></div>';
  
  // Income details
  html+='<div class="section"><div class="section-title">收入明细</div></div>';
  html+='<div class="card-list">';
  MOCK.transactions.forEach(function(t){
    html+='<div class="data-card"><div class="dc-header"><div class="dc-title">'+t.item+'</div><span class="badge '+(t.direction==='收入'?'badge-success':'badge-danger')+'">'+t.direction+'</span></div>';
    html+='<div class="dc-body"><div class="dc-field"><span>日期:</span> '+t.date+'</div><div class="dc-field"><span>金额:</span> ¥'+t.amount.toLocaleString()+'</div></div>';
    html+='<div class="dc-footer"><span class="badge '+(t.status==='completed'?'badge-success':'badge-warning')+'">'+(t.status==='completed'?'已完成':'待确认')+'</span></div>';
    html+='</div>';
  });
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
}

// ==================== Production ====================
function renderProduction(){
  var html='<div class="section"><div class="section-title">生产排产看板</div></div>';
  
  var stages=[
    {value:'pending',label:'待排产',color:'#f39c12',icon:'⏳'},
    {value:'processing',label:'加工中',color:'#3498db',icon:'🔄'},
    {value:'quality',label:'质检中',color:'#8e44ad',icon:'✅'},
    {value:'done',label:'已完成',color:'#27ae60',icon:'🎉'}
  ];
  
  html+='<div class="stats-grid">';
  stages.forEach(function(s){
    var count=MOCK.production.filter(function(p){return p.status===s.value}).length;
    html+='<div class="stat-card"><div class="sc-icon" style="background:'+s.color+'20">'+s.icon+'</div><div class="sc-info"><div class="sc-value">'+count+'</div><div class="sc-label">'+s.label+'</div></div></div>';
  });
  html+='</div>';
  
  html+='<div class="section"><div class="section-title">今日排产</div></div>';
  html+='<div class="card-list">';
  MOCK.production.forEach(function(p){
    html+='<div class="data-card">';
    html+='<div class="dc-header"><div class="dc-title">'+p.no+' - '+p.patient+'</div><span class="badge '+(p.status==='done'?'badge-success':p.status==='pending'?'badge-warning':'badge-info')+'">'+p.stage+'</span></div>';
    html+='<div class="dc-body"><div class="dc-field"><span>型号:</span> '+p.model+'</div><div class="dc-field"><span>数量:</span> '+p.qty+'件</div><div class="dc-field"><span>日期:</span> '+p.date+'</div></div>';
    html+='</div>';
  });
  html+='</div>';
  
  // Factory stages
  if(MOCK.factories.length>0){
    var f=MOCK.factories[0];
    html+='<div class="section"><div class="section-title">生产流程</div></div>';
    html+='<div class="timeline">';
    f.stages.forEach(function(s,i){
      html+='<div class="timeline-item"><div class="timeline-dot done">'+(i+1)+'</div>';
      html+='<div class="timeline-content"><div class="tc-title">'+s+'</div><div class="tc-desc">流程阶段 '+(i+1)+'</div></div></div>';
    });
    html+='</div>';
  }
  
  document.getElementById('contentArea').innerHTML=html;
}

// ==================== Sales Activity ====================
function renderSales(){
  var html='<div class="section"><div class="section-title">销售活动概览</div></div>';
  
  html+='<div class="stats-grid" style="padding-top:12px">';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f8f0">🏥</div><div class="sc-info"><div class="sc-value">'+MOCK.clinics.length+'</div><div class="sc-label">诊所客户</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#f5eef7">💊</div><div class="sc-info"><div class="sc-value">'+MOCK.pharmacies.length+'</div><div class="sc-label">药房客户</div></div></div>';
  var totalCommission=MOCK.dealers.reduce(function(s,d){return s+d.commission},0);
  html+='<div class="stat-card"><div class="sc-icon" style="background:#e8f4fd">💰</div><div class="sc-info"><div class="sc-value">¥'+totalCommission.toLocaleString()+'</div><div class="sc-label">累计佣金</div></div></div>';
  html+='<div class="stat-card"><div class="sc-icon" style="background:#fef5e7">⏳</div><div class="sc-info"><div class="sc-value">'+MOCK.dealers.filter(function(d){return d.status==='pending'}).length+'</div><div class="sc-label">待审核</div></div></div>';
  html+='</div>';
  
  html+='<div class="section"><div class="section-title">经销商列表</div></div>';
  html+='<div class="card-list">';
  MOCK.dealers.forEach(function(d){
    html+='<div class="data-card">';
    html+='<div class="dc-header"><div class="dc-title">'+d.name+'</div><span class="badge '+(d.status==='active'?'badge-success':'badge-warning')+'">'+(d.status==='active'?'正常':'待审核')+'</span></div>';
    html+='<div class="dc-body"><div class="dc-field"><span>区域:</span> '+d.region+'</div><div class="dc-field"><span>诊所:</span> '+d.clinics+'家</div><div class="dc-field"><span>药房:</span> '+d.pharmacies+'家</div><div class="dc-field"><span>佣金:</span> ¥'+d.commission.toLocaleString()+'</div></div>';
    html+='</div>';
  });
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
}

// ==================== Customer Service ====================
function renderService(){
  var html='<div class="section"><div class="section-title">客服消息</div></div>';
  html+='<div class="card-list">';
  html+='<div class="data-card"><div class="dc-header"><div class="dc-title">诊所咨询 - 加工单进度</div><span class="badge badge-info">待回复</span></div><div class="dc-body"><div class="dc-field"><span>来自:</span> 北京口腔医院</div><div class="dc-field"><span>时间:</span> 2026-03-18 14:30</div></div><div class="dc-field"><span>内容:</span> WO20260001的种植体加工到哪一步了？</div></div>';
  html+='<div class="data-card"><div class="dc-header"><div class="dc-title">药店反馈 - 种植卡问题</div><span class="badge badge-success">已回复</span></div><div class="dc-body"><div class="dc-field"><span>来自:</span> 健康大药房</div><div class="dc-field"><span>时间:</span> 2026-03-15 10:00</div></div><div class="dc-field"><span>内容:</span> IC20260003的种植卡无法核销</div></div>';
  html+='</div>';
  
  html+='<div class="section"><div class="section-title">快捷操作</div></div>';
  html+='<div class="qg">';
  html+='<div class="qg-item" onclick="showToast(\'新建工单功能\')"><div class="qg-icon" style="background:#e8f4fd">📝</div><div class="qg-name">新建工单</div></div>';
  html+='<div class="qg-item" onclick="showToast(\'历史记录功能\')"><div class="qg-icon" style="background:#e8f8f0">📋</div><div class="qg-name">历史记录</div></div>';
  html+='<div class="qg-item" onclick="showToast(\'常见问题功能\')"><div class="qg-icon" style="background:#fef5e7">❓</div><div class="qg-name">常见问题</div></div>';
  html+='<div class="qg-item" onclick="showToast(\'在线客服功能\')"><div class="qg-icon" style="background:#f5eef7">💬</div><div class="qg-name">在线客服</div></div>';
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
}

// ==================== Registration Review ====================
function renderRegReview(){
  // Already handled by CRUD page for 'registrations'
  renderCRUDPage('registrations');
}

// ==================== Settings ====================
function renderSettings(){
  var html='<div class="section"><div class="section-title">'+PORT_CONFIG[currentPort].name+'设置</div></div>';
  
  var settings=getPortSettings();
  
  html+='<div class="settings-group">';
  settings.forEach(function(s){
    html+='<div class="settings-item"><span class="si-label">'+s.label+'</span><span class="si-value">'+s.value+'</span></div>';
  });
  html+='</div>';
  
  html+='<div class="settings-group">';
  html+='<div class="settings-item" onclick="showToast(\'编辑功能开发中\')"><span class="si-label">编辑信息</span><span class="si-value">›</span></div>';
  html+='<div class="settings-item" onclick="showToast(\'修改密码功能开发中\')"><span class="si-label">修改密码</span><span class="si-value">›</span></div>';
  html+='</div>';
  
  document.getElementById('contentArea').innerHTML=html;
}

function getPortSettings(){
  if(currentPort==='platform'){
    return [
      {label:'系统名称',value:'小唯管理系统'},
      {label:'当前端口',value:'小唯平台端'},
      {label:'管理员',value:userInfo?userInfo.name:''},
      {label:'系统版本',value:APP_VERSION}
    ];
  }else if(currentPort==='clinic'){
    var c=MOCK.clinics[0]||{};
    return [
      {label:'诊所名称',value:c.name||'--'},
      {label:'负责人',value:c.owner||'--'},
      {label:'联系电话',value:c.phone||'--'},
      {label:'所在地区',value:c.region||'--'}
    ];
  }else if(currentPort==='dealer'){
    var d=MOCK.dealers[0]||{};
    return [
      {label:'姓名',value:d.name||'--'},
      {label:'负责区域',value:d.region||'--'},
      {label:'诊所客户',value:(d.clinics||0)+'家'},
      {label:'药房客户',value:(d.pharmacies||0)+'家'}
    ];
  }else if(currentPort==='pharmacy'){
    var p=MOCK.pharmacies[0]||{};
    return [
      {label:'药店名称',value:p.name||'--'},
      {label:'店长',value:p.owner||'--'},
      {label:'联系电话',value:p.phone||'--'},
      {label:'所在地区',value:p.region||'--'}
    ];
  }else if(currentPort==='factory'){
    var f=MOCK.factories[0]||{};
    return [
      {label:'工厂名称',value:f.name||'--'},
      {label:'负责人',value:f.owner||'--'},
      {label:'联系电话',value:f.phone||'--'},
      {label:'工厂地址',value:f.address||'--'},
      {label:'月产能',value:(f.capacity||0)+'件'}
    ];
  }
  return[];
}

// ==================== Init ====================
(function init(){
  try{
    if(token&&userInfo){
      var savedPort=localStorage.getItem('adminPort');
      if(savedPort){
        currentPort=savedPort;
        showMain();
      }else{
        showPortSelect();
      }
    }else{
      showLogin();
    }
  }catch(e){
    document.body.innerHTML='<div style="padding:20px;font-size:14px"><h3>JS Error</h3><pre>'+e.message+'\n'+e.stack+'</pre><button onclick="localStorage.clear();location.reload()">Clear data & reload</button></div>';
  }
})();

}catch(e){console.log('ERROR:'+e.message)}
