-- ============================================================================
-- 小唯管理系统 - MySQL 数据库架构与种子数据
-- ============================================================================
-- 文件说明:
--   本文件用于初始化小唯管理系统的数据库,包含 28 张表的结构定义和种子数据。
--   种子数据与前端 SEED_DATA 保持一致。
--
-- 使用方法:
--   mysql -u root -p < schema.sql
--
-- 注意事项:
--   1. users 表中的 password 字段存储的是明文密码 '123456'
--   2. 首次登录时,系统会自动将明文密码升级为 bcrypt 哈希
--   3. 如需手动初始化密码哈希,请运行: node scripts/init-passwords.js
-- ============================================================================

CREATE DATABASE IF NOT EXISTS xiaowei_system CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE xiaowei_system;

-- ============================================================================
-- 1. users - 用户表
-- ============================================================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `account` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(50),
  `avatar` VARCHAR(10),
  `role` VARCHAR(20),
  `ports` TEXT,
  `status` VARCHAR(20) DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `account`, `password`, `name`, `avatar`, `role`, `ports`, `status`) VALUES
(1, 'admin', '123456', '超级管理员', '管', 'super', '["platform","clinic","dealer","pharmacy","factory","client"]', 'active'),
(2, 'clinic', '123456', '李医生', '李', 'clinic', '["clinic"]', 'active'),
(3, 'dealer', '123456', '张经理', '张', 'dealer', '["dealer"]', 'active'),
(4, 'pharmacy', '123456', '周店长', '周', 'pharmacy', '["pharmacy"]', 'active'),
(5, 'factory', '123456', '孙厂长', '孙', 'factory', '["factory"]', 'active'),
(6, 'client', '123456', '周小明', '周', 'client', '["client"]', 'active');

-- ============================================================================
-- 2. clinics - 诊所表
-- ============================================================================
DROP TABLE IF EXISTS `clinics`;
CREATE TABLE `clinics` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `owner` VARCHAR(50),
  `phone` VARCHAR(30),
  `region` VARCHAR(50),
  `implants_used` INT DEFAULT 0,
  `status` VARCHAR(20),
  `created_at` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `clinics` (`id`, `name`, `owner`, `phone`, `region`, `implants_used`, `status`, `created_at`) VALUES
(1, '仁爱口腔诊所', '李明华', '138-0011-2233', '浙江杭州', 342, 'active', '2025-07-28'),
(2, '雅悦口腔医院', '张伟强', '137-2233-4455', '广东深圳', 586, 'active', '2025-07-20'),
(3, '微笑牙科诊所', '陈丽芳', '136-8899-0011', '四川成都', 218, 'active', '2025-07-18'),
(4, '康贝口腔门诊部', '王秀英', '139-5566-7788', '江苏南京', 0, 'pending', '2025-07-25'),
(5, '德仁口腔中心', '刘建国', '135-6677-8899', '湖北武汉', 0, 'pending', '2025-07-15'),
(6, '博雅口腔诊所', '赵新民', '133-4455-6677', '上海', 456, 'active', '2025-06-30'),
(7, '和谐口腔门诊', '孙美玲', '132-9988-7766', '北京', 312, 'inactive', '2025-05-12');

-- ============================================================================
-- 3. pharmacies - 药店表
-- ============================================================================
DROP TABLE IF EXISTS `pharmacies`;
CREATE TABLE `pharmacies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `manager` VARCHAR(50),
  `phone` VARCHAR(30),
  `region` VARCHAR(50),
  `card_sales` INT DEFAULT 0,
  `status` VARCHAR(20),
  `joined_at` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pharmacies` (`id`, `name`, `manager`, `phone`, `region`, `card_sales`, `status`, `joined_at`) VALUES
(1, '健佳大药房', '周明', '138-1122-3344', '浙江杭州', 1280, 'active', '2025-06-10'),
(2, '同德堂药房', '吴芳', '139-5544-6677', '江苏苏州', 860, 'active', '2025-06-05'),
(3, '益民大药房', '郑国华', '137-7788-9900', '广东广州', 1050, 'active', '2025-05-28'),
(4, '仁心药房', '冯丽', '136-2200-3300', '四川成都', 430, 'processing', '2025-07-20'),
(5, '康源药房', '褚伟', '135-6677-2200', '湖北武汉', 672, 'active', '2025-05-15'),
(6, '百姓大药房', '卫国', '133-8899-1100', '上海', 0, 'inactive', '2025-04-08');

-- ============================================================================
-- 4. factories - 工厂表
-- ============================================================================
DROP TABLE IF EXISTS `factories`;
CREATE TABLE `factories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `owner` VARCHAR(50),
  `phone` VARCHAR(30),
  `address` VARCHAR(200),
  `monthly_capacity` INT DEFAULT 0,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `factories` (`id`, `name`, `owner`, `phone`, `address`, `monthly_capacity`, `status`) VALUES
(1, '小唯精密制造有限公司', '孙志强', '138-8888-0001', '广东省东莞市松山湖科技产业园', 12000, 'active');

-- ============================================================================
-- 5. dealers - 经销商表
-- ============================================================================
DROP TABLE IF EXISTS `dealers`;
CREATE TABLE `dealers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `region` VARCHAR(50),
  `clinic_clients` INT DEFAULT 0,
  `pharmacy_clients` INT DEFAULT 0,
  `commission` INT DEFAULT 0,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `dealers` (`id`, `name`, `region`, `clinic_clients`, `pharmacy_clients`, `commission`, `status`) VALUES
(1, '张明华', '华东区域', 42, 18, 386200, 'active'),
(2, '李伟强', '华南区域', 35, 12, 298500, 'active'),
(3, '王秀芳', '华北区域', 28, 15, 245800, 'active'),
(4, '陈建国', '西南区域', 15, 7, 128600, 'active'),
(5, '赵新民', '华中区域', 0, 0, 0, 'pending'),
(6, '刘德海', '东北区域', 0, 0, 0, 'inactive');

-- ============================================================================
-- 6. cards - 种植卡表
-- ============================================================================
DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `card_no` VARCHAR(30),
  `patient` VARCHAR(50),
  `clinic` VARCHAR(100),
  `implant_type` VARCHAR(30),
  `pharmacy` VARCHAR(100),
  `issue_date` VARCHAR(20),
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `cards` (`id`, `card_no`, `patient`, `clinic`, `implant_type`, `pharmacy`, `issue_date`, `status`) VALUES
(1, 'XW-2025-08001', '周小明', '仁爱口腔诊所', 'XW-TI-3510', '健佳大药房', '2025-08-01', 'active'),
(2, 'XW-2025-08002', '吴丽红', '雅悦口腔医院', 'XW-TI-4200', '同德堂药房', '2025-08-01', 'active'),
(3, 'XW-2025-07998', '郑国强', '微笑牙科诊所', 'XW-TI-3508', '益民大药房', '2025-07-30', 'processing'),
(4, 'XW-2025-07995', '冯小明', '博雅口腔诊所', 'XW-TI-4212', '康源药房', '2025-07-28', 'active'),
(5, 'XW-2025-07990', '褚伟杰', '仁爱口腔诊所', 'XW-TI-3510', '健佳大药房', '2025-07-25', 'active'),
(6, 'XW-2025-07985', '卫东', '雅悦口腔医院', 'XW-TI-4200', '益民大药房', '2025-07-22', 'inactive');

-- ============================================================================
-- 7. products - 产品表
-- ============================================================================
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `price` INT,
  `desc` VARCHAR(200),
  `icon` VARCHAR(10),
  `color` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`id`, `name`, `price`, `desc`, `icon`, `color`) VALUES
(1, 'XW-TI-3510 种植体', 1280, '直径3.5mm 钛合金 · 畅销款', '🦷', 'green'),
(2, 'XW-TI-4200 种植体', 1580, '直径4.2mm 钛合金 · 高强度', '🦷', 'blue'),
(3, '种植体基台', 680, '标准基台 · 适配全系', '🔧', 'orange'),
(4, '骨粉材料 0.5g', 420, '人工骨粉 · 高生物相容', '🧪', 'purple'),
(5, '愈合帽', 150, '标准愈合帽 · 含螺丝', '🔩', 'teal'),
(6, '种植手术工具包', 3800, '全套手术器械 · 消毒级', '📦', 'green'),
(7, '麻药注射器', 85, '一次性使用 · 50支装', '💉', 'blue'),
(8, 'XW-TI-4212 种植体', 1680, '直径4.2mm 亲水表面 · 新品', '🦷', 'orange');

-- ============================================================================
-- 8. settlements - 结算表
-- ============================================================================
DROP TABLE IF EXISTS `settlements`;
CREATE TABLE `settlements` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `no` VARCHAR(30),
  `party` VARCHAR(100),
  `type` VARCHAR(50),
  `amount` INT,
  `commission` INT,
  `status` VARCHAR(20),
  `date` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settlements` (`id`, `no`, `party`, `type`, `amount`, `commission`, `status`, `date`) VALUES
(1, 'ST-2025-0812', '仁爱口腔诊所', '诊所提现', 86500, 8650, 'pending', '2025-08-03'),
(2, 'ST-2025-0811', '健佳大药房', '药店提现', 56200, 5620, 'pending', '2025-08-02'),
(3, 'ST-2025-0810', '张明华（经销商）', '佣金提现', 45600, 4560, 'pending', '2025-08-01'),
(4, 'ST-2025-0809', '雅悦口腔医院', '诊所提现', 128000, 12800, 'active', '2025-07-30'),
(5, 'ST-2025-0808', '益民大药房', '药店提现', 72400, 7240, 'active', '2025-07-28'),
(6, 'ST-2025-0807', '小唯精密制造', '工厂货款', 356000, 35600, 'active', '2025-07-25');

-- ============================================================================
-- 9. roles - 角色表
-- ============================================================================
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `desc` VARCHAR(200),
  `ports` VARCHAR(100),
  `users` INT DEFAULT 0,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `roles` (`id`, `name`, `desc`, `ports`, `users`, `status`) VALUES
(1, '超级管理员', '拥有全部权限', '全部五端', 1, 'active'),
(2, '平台运营', '平台日常运营管理', '平台端', 5, 'active'),
(3, '平台财务', '财务结算与报表查看', '平台端', 3, 'active'),
(4, '诊所管理员', '诊所端全部功能', '诊所端', 128, 'active'),
(5, '经销商', '经销商端全部功能', '经销商端', 22, 'active'),
(6, '药店店长', '药店端全部功能', '药店端', 56, 'active'),
(7, '工厂管理员', '工厂端全部功能', '工厂端', 4, 'active');

-- ============================================================================
-- 10. notifications - 通知表
-- ============================================================================
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `time` VARCHAR(30),
  `title` VARCHAR(100),
  `content` TEXT,
  `read` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `notifications` (`id`, `time`, `title`, `content`, `read`) VALUES
(1, '2025-08-04 09:30', '新诊所注册申请', '康贝口腔门诊部提交了注册申请，等待审核。', 0),
(2, '2025-08-03 16:45', '提现申请', '仁爱口腔诊所申请提现 ¥86,500，待审核。', 0),
(3, '2025-08-03 14:20', '工厂出货通知', '小唯精密制造已完成 320 颗种植体出货，物流单号 SF1284567。', 0),
(4, '2025-08-02 11:10', '药店提现申请', '健佳大药房申请提现 ¥56,200，待审核。', 1),
(5, '2025-08-01 10:00', '月度结算完成', '7月平台结算已全部完成，共结算 ¥1,256,800。', 1),
(6, '2025-07-31 18:30', '系统升级通知', '系统将于今晚 23:00-次日 01:00 进行升级维护。', 1),
(7, '2025-07-30 15:20', '新经销商签约', '赵新民（华中区域）提交了经销商签约申请。', 1);

-- ============================================================================
-- 11. patients - 患者表
-- ============================================================================
DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `gender` VARCHAR(10),
  `age` INT,
  `phone` VARCHAR(30),
  `treatment_type` VARCHAR(20),
  `implants` INT DEFAULT 0,
  `created_at` VARCHAR(20),
  `diagnosis` VARCHAR(200),
  `treatment_plan` VARCHAR(200),
  `surgery_date` VARCHAR(20),
  `implant_model` VARCHAR(30),
  `doctor` VARCHAR(50),
  `allergy` VARCHAR(100),
  `medical_history` VARCHAR(200),
  `notes` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `patients` (`id`, `name`, `gender`, `age`, `phone`, `treatment_type`, `implants`, `created_at`, `diagnosis`, `treatment_plan`, `surgery_date`, `implant_model`, `doctor`, `allergy`, `medical_history`, `notes`) VALUES
(1, '周小明', '男', 35, '138-0011-2233', '种植', 2, '2025-08-01', '右下后牙缺失', '种植体植入+基台+牙冠修复', '2025-08-03', 'XW-TI-3510', '李医生', '青霉素', '无高血压、糖尿病等慢性病', '骨量充足，手术顺利，恢复良好'),
(2, '吴丽红', '女', 42, '139-5566-7788', '种植', 1, '2025-08-01', '左上中切牙缺失', '即刻种植+临时冠', '2025-08-03', 'XW-TI-4200', '张医生', '无', '轻度贫血，已纠正', '前牙美学区，需注意软组织处理'),
(3, '郑国强', '男', 56, '137-2233-4455', '种植', 3, '2025-07-30', '多颗牙缺失（上下颌）', '分段种植+All-on-4方案', '2025-08-05', 'XW-TI-4200', '李医生', '磺胺类', '高血压（控制良好），糖尿病（饮食控制）', '需术前评估骨密度，术中注意出血控制'),
(4, '冯小明', '男', 28, '136-8899-0011', '修复', 1, '2025-07-28', '右上前牙外伤性缺失', '种植体植入+骨粉填充', '2025-08-02', 'XW-TI-4212', '王医生', '无', '无特殊', '唇侧骨板薄，需GBR骨增量'),
(5, '褚伟杰', '男', 45, '135-6677-8899', '种植', 2, '2025-07-25', '左下磨牙缺失', '种植体植入', '2025-08-01', 'XW-TI-3510', '李医生', '无', '吸烟史20年', '建议戒烟，术后注意口腔卫生维护'),
(6, '孙丽娟', '女', 38, '133-4455-6677', '种植', 1, '2025-07-22', '右下第二磨牙缺失', '种植体植入+基台+牙冠', '2025-07-25', 'XW-TI-4200', '张医生', '头孢类', '无特殊', '手术顺利，骨结合良好'),
(7, '王大伟', '男', 50, '132-9988-7766', '正畸', 0, '2025-07-18', '牙列拥挤', '正畸治疗', '', '', '王医生', '无', '无特殊', '正畸治疗中，暂不需要种植');

-- ============================================================================
-- 12. orders - 订单表
-- ============================================================================
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `no` VARCHAR(30),
  `patient` VARCHAR(50),
  `type` VARCHAR(30),
  `implant_type` VARCHAR(30),
  `qty` INT,
  `factory` VARCHAR(100),
  `status` VARCHAR(20),
  `created_at` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `orders` (`id`, `no`, `patient`, `type`, `implant_type`, `qty`, `factory`, `status`, `created_at`) VALUES
(1, 'MO-2025-0823', '周小明', '种植体', 'XW-TI-3510', 2, '小唯精密制造', 'processing', '2025-08-03'),
(2, 'MO-2025-0822', '吴丽红', '种植体', 'XW-TI-4200', 1, '小唯精密制造', 'pending', '2025-08-02'),
(3, 'MO-2025-0821', '郑国强', '基台', 'XW-BT-001', 3, '小唯精密制造', 'active', '2025-07-30'),
(4, 'MO-2025-0820', '冯小明', '种植体', 'XW-TI-4212', 1, '小唯精密制造', 'processing', '2025-07-28'),
(5, 'MO-2025-0819', '褚伟杰', '种植体', 'XW-TI-3510', 2, '小唯精密制造', 'active', '2025-07-25'),
(6, 'MO-2025-0818', '孙丽娟', '种植体', 'XW-TI-4200', 1, '小唯精密制造', 'active', '2025-07-22');

-- ============================================================================
-- 13. implants - 种植体库存表
-- ============================================================================
DROP TABLE IF EXISTS `implants`;
CREATE TABLE `implants` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `model` VARCHAR(30),
  `spec` VARCHAR(100),
  `stock` INT,
  `used` INT,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `implants` (`id`, `model`, `spec`, `stock`, `used`, `status`) VALUES
(1, 'XW-TI-3510', '直径3.5mm / 长10mm', 28, 342, 'active'),
(2, 'XW-TI-4200', '直径4.2mm / 长10mm', 22, 286, 'active'),
(3, 'XW-TI-4212', '直径4.2mm / 长12mm', 8, 98, 'pending'),
(4, 'XW-TI-3508', '直径3.5mm / 长8mm', 15, 156, 'active'),
(5, 'XW-BT-001', '标准基台', 13, 120, 'active'),
(6, 'XW-HC-002', '愈合帽', 0, 86, 'inactive');

-- ============================================================================
-- 14. transactions - 交易流水表
-- ============================================================================
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(20),
  `type` VARCHAR(20),
  `item` VARCHAR(200),
  `direction` VARCHAR(20),
  `amount` INT,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `transactions` (`id`, `date`, `type`, `item`, `direction`, `amount`, `status`) VALUES
(1, '2025-08-03', '收入', '周小明 种植手术费', '收入', 8600, 'active'),
(2, '2025-08-03', '支出', '种植体采购 XW-TI-3510 x20', '支出', 25600, 'active'),
(3, '2025-08-02', '收入', '吴丽红 种植手术费', '收入', 6800, 'active'),
(4, '2025-08-01', '支出', '门店租金 8月', '支出', 12000, 'active'),
(5, '2025-07-31', '收入', '冯小明 基台安装费', '收入', 3200, 'active'),
(6, '2025-07-30', '支出', '员工工资 7月', '支出', 45000, 'active');

-- ============================================================================
-- 15. withdrawals - 提现表
-- ============================================================================
DROP TABLE IF EXISTS `withdrawals`;
CREATE TABLE `withdrawals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `no` VARCHAR(30),
  `amount` INT,
  `bank` VARCHAR(100),
  `status` VARCHAR(20),
  `applied_at` VARCHAR(20),
  `arrived_at` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `withdrawals` (`id`, `no`, `amount`, `bank`, `status`, `applied_at`, `arrived_at`) VALUES
(1, 'WD-2025-0803', 86500, '工商银行 尾号 8862', 'pending', '2025-08-03', ''),
(2, 'WD-2025-0720', 56000, '工商银行 尾号 8862', 'active', '2025-07-20', '2025-07-22'),
(3, 'WD-2025-0710', 42000, '工商银行 尾号 8862', 'active', '2025-07-10', '2025-07-12'),
(4, 'WD-2025-0625', 68000, '工商银行 尾号 8862', 'active', '2025-06-25', '2025-06-27');

-- ============================================================================
-- 16. verify_records - 验证记录表
-- ============================================================================
DROP TABLE IF EXISTS `verify_records`;
CREATE TABLE `verify_records` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `card_no` VARCHAR(30),
  `patient` VARCHAR(50),
  `type` VARCHAR(30),
  `doctor` VARCHAR(50),
  `time` VARCHAR(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `verify_records` (`id`, `card_no`, `patient`, `type`, `doctor`, `time`) VALUES
(1, 'XW-2025-08001', '周小明', '种植体植入', '李医生', '2025-08-03 14:30'),
(2, 'XW-2025-08002', '吴丽红', '种植体植入', '李医生', '2025-08-03 10:15'),
(3, 'XW-2025-07995', '冯小明', '基台安装', '王医生', '2025-08-02 16:45'),
(4, 'XW-2025-07990', '褚伟杰', '种植体植入', '李医生', '2025-08-01 11:20');

-- ============================================================================
-- 17. client_products - 客户端商品表
-- ============================================================================
DROP TABLE IF EXISTS `client_products`;
CREATE TABLE `client_products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `price` INT,
  `desc` VARCHAR(200),
  `icon` VARCHAR(10),
  `category` VARCHAR(30),
  `stock` INT,
  `sales` INT,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_products` (`id`, `name`, `price`, `desc`, `icon`, `category`, `stock`, `sales`, `status`) VALUES
(1, 'XW-TI-3510 种植体', 1280, '直径3.5mm 钛合金 · 畅销款', '🦷', '种植体', 28, 342, 'active'),
(2, 'XW-TI-4200 种植体', 1580, '直径4.2mm 钛合金 · 高强度', '🦷', '种植体', 22, 286, 'active'),
(3, 'XW-TI-4212 种植体', 1680, '直径4.2mm 亲水表面 · 新品', '🦷', '种植体', 8, 98, 'active'),
(4, '种植体基台', 680, '标准基台 · 适配全系', '🔧', '配件', 13, 120, 'active'),
(5, '骨粉材料 0.5g', 420, '人工骨粉 · 高生物相容', '🧪', '耗材', 35, 86, 'active'),
(6, '愈合帽', 150, '标准愈合帽 · 含螺丝', '🔩', '配件', 0, 86, 'inactive'),
(7, '种植手术工具包', 3800, '全套手术器械 · 消毒级', '📦', '工具', 5, 42, 'active'),
(8, '麻药注射器', 85, '一次性使用 · 50支装', '💉', '耗材', 120, 230, 'active');

-- ============================================================================
-- 18. client_packages - 客户端套餐表
-- ============================================================================
DROP TABLE IF EXISTS `client_packages`;
CREATE TABLE `client_packages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `price` INT,
  `original_price` INT,
  `desc` VARCHAR(200),
  `included` VARCHAR(300),
  `icon` VARCHAR(10),
  `sales` INT,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_packages` (`id`, `name`, `price`, `original_price`, `desc`, `included`, `icon`, `sales`, `status`) VALUES
(1, '基础种植套餐', 2980, 3580, '种植体+基台+手术费', 'XW-TI-3510种植体 + 标准基台 + 手术费', '🦷', 156, 'active'),
(2, '高端亲水套餐', 3980, 4880, '亲水种植体+基台+骨粉', 'XW-TI-4212种植体 + 标准基台 + 骨粉0.5g + 手术费', '💎', 89, 'active'),
(3, '全口种植套餐', 19800, 25800, '全口种植体+基台+手术', '4颗XW-TI-4200种植体 + 4基台 + 手术费 + 术后护理', '👑', 23, 'active'),
(4, '术后护理套餐', 880, 1280, '愈合帽+护理产品', '愈合帽 + 护理套装 + 3次复查', '🩹', 67, 'active');

-- ============================================================================
-- 19. client_orders - 客户端订单表
-- ============================================================================
DROP TABLE IF EXISTS `client_orders`;
CREATE TABLE `client_orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `no` VARCHAR(30),
  `type` VARCHAR(30),
  `item` VARCHAR(200),
  `patient` VARCHAR(50),
  `clinic` VARCHAR(100),
  `amount` INT,
  `status` VARCHAR(20),
  `created_at` VARCHAR(20),
  `progress` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_orders` (`id`, `no`, `type`, `item`, `patient`, `clinic`, `amount`, `status`, `created_at`, `progress`) VALUES
(1, 'CO-2025-0801', '种植套餐', '基础种植套餐', '周小明', '仁爱口腔诊所', 2980, 'processing', '2025-08-03', 60),
(2, 'CO-2025-0802', '商品购买', '骨粉材料 0.5g x2', '周小明', '', 840, 'active', '2025-08-02', 100),
(3, 'CO-2025-0798', '种植套餐', '高端亲水套餐', '周小明', '雅悦口腔医院', 3980, 'active', '2025-07-25', 100),
(4, 'CO-2025-0795', '商品购买', '麻药注射器 x1', '周小明', '', 85, 'active', '2025-07-20', 100);

-- ============================================================================
-- 20. client_progress - 客户端进度表
-- ============================================================================
DROP TABLE IF EXISTS `client_progress`;
CREATE TABLE `client_progress` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `no` VARCHAR(30),
  `patient` VARCHAR(50),
  `clinic` VARCHAR(100),
  `doctor` VARCHAR(50),
  `implant_type` VARCHAR(30),
  `step1` VARCHAR(20),
  `step2` VARCHAR(20),
  `step3` VARCHAR(20),
  `step4` VARCHAR(20),
  `step5` VARCHAR(20),
  `current` VARCHAR(50),
  `progress` INT,
  `next_date` VARCHAR(20),
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_progress` (`id`, `no`, `patient`, `clinic`, `doctor`, `implant_type`, `step1`, `step2`, `step3`, `step4`, `step5`, `current`, `progress`, `next_date`, `status`) VALUES
(1, 'CO-2025-0801', '周小明', '仁爱口腔诊所', '李医生', 'XW-TI-3510', '已完成', '已完成', '进行中', '待开始', '待开始', '基台安装', 60, '2025-08-15', 'processing'),
(2, 'CO-2025-0798', '周小明', '雅悦口腔医院', '张医生', 'XW-TI-4212', '已完成', '已完成', '已完成', '已完成', '已完成', '已完成', 100, '', 'active'),
(3, 'CO-2025-0802', '周小明', '健佳大药房', '', '', '已发货', '已签收', '', '', '', '已完成', 100, '', 'active');

-- ============================================================================
-- 21. client_points - 客户端积分表
-- ============================================================================
DROP TABLE IF EXISTS `client_points`;
CREATE TABLE `client_points` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(30),
  `source` VARCHAR(100),
  `points` INT,
  `date` VARCHAR(20),
  `balance` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_points` (`id`, `type`, `source`, `points`, `date`, `balance`) VALUES
(1, '消费获得', '基础种植套餐', 298, '2025-08-03', 1268),
(2, '邀请奖励', '好友注册并下单', 100, '2025-08-01', 970),
(3, '消费获得', '高端亲水套餐', 398, '2025-07-25', 870),
(4, '老带新奖励', '好友完成种植', 200, '2025-07-20', 472),
(5, '消费获得', '骨粉材料', 84, '2025-07-15', 272),
(6, '积分兑换', '兑换愈合帽', -150, '2025-07-10', 188);

-- ============================================================================
-- 22. client_reviews - 客户端评价表
-- ============================================================================
DROP TABLE IF EXISTS `client_reviews`;
CREATE TABLE `client_reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(30),
  `target` VARCHAR(100),
  `doctor` VARCHAR(50),
  `rating` INT,
  `content` TEXT,
  `date` VARCHAR(20),
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_reviews` (`id`, `type`, `target`, `doctor`, `rating`, `content`, `date`, `status`) VALUES
(1, '诊所评价', '仁爱口腔诊所', '李医生', 5, '李医生技术很好，种植过程很顺利，服务态度也很好！', '2025-08-03', 'active'),
(2, '商品评价', 'XW-TI-4212 种植体', '', 5, '亲水种植体恢复很快，质量很好，推荐！', '2025-07-25', 'active'),
(3, '诊所评价', '雅悦口腔医院', '张医生', 4, '医院环境很好，医生专业，就是等候时间有点长。', '2025-07-20', 'active');

-- ============================================================================
-- 23. client_transactions - 客户端交易表
-- ============================================================================
DROP TABLE IF EXISTS `client_transactions`;
CREATE TABLE `client_transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(20),
  `type` VARCHAR(30),
  `item` VARCHAR(200),
  `amount` INT,
  `points` INT,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_transactions` (`id`, `date`, `type`, `item`, `amount`, `points`, `status`) VALUES
(1, '2025-08-03', '种植套餐', '基础种植套餐', 2980, 298, 'active'),
(2, '2025-08-02', '商品购买', '骨粉材料 0.5g x2', 840, 84, 'active'),
(3, '2025-07-25', '种植套餐', '高端亲水套餐', 3980, 398, 'active'),
(4, '2025-07-20', '商品购买', '麻药注射器 x1', 85, 8, 'active'),
(5, '2025-07-10', '积分兑换', '兑换愈合帽', 0, -150, 'active'),
(6, '2025-06-15', '商品购买', '种植手术工具包', 3800, 380, 'active');

-- ============================================================================
-- 24. client_cards - 客户端种植卡表
-- ============================================================================
DROP TABLE IF EXISTS `client_cards`;
CREATE TABLE `client_cards` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `card_no` VARCHAR(30),
  `patient` VARCHAR(50),
  `clinic` VARCHAR(100),
  `implant_type` VARCHAR(30),
  `bind_date` VARCHAR(20),
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_cards` (`id`, `card_no`, `patient`, `clinic`, `implant_type`, `bind_date`, `status`) VALUES
(1, 'XW-2025-08001', '周小明', '仁爱口腔诊所', 'XW-TI-3510', '2025-08-01', 'active'),
(2, 'XW-2025-07998', '周小明', '雅悦口腔医院', 'XW-TI-4212', '2025-07-22', 'active');

-- ============================================================================
-- 25. client_clinics - 客户端诊所表
-- ============================================================================
DROP TABLE IF EXISTS `client_clinics`;
CREATE TABLE `client_clinics` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `owner` VARCHAR(50),
  `phone` VARCHAR(30),
  `region` VARCHAR(50),
  `address` VARCHAR(200),
  `distance` DECIMAL(5,1),
  `rating` DECIMAL(2,1),
  `implants` INT,
  `status` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_clinics` (`id`, `name`, `owner`, `phone`, `region`, `address`, `distance`, `rating`, `implants`, `status`) VALUES
(1, '仁爱口腔诊所', '李明华', '138-0011-2233', '浙江杭州', '杭州市拱墅区莫干山路200号', 2.3, 4.8, 342, 'active'),
(2, '雅悦口腔医院', '张伟强', '137-2233-4455', '广东深圳', '深圳市南山区科技园路88号', 5.6, 4.9, 586, 'active'),
(3, '微笑牙科诊所', '陈丽芳', '136-8899-0011', '四川成都', '成都市武侯区人民南路四段', 8.2, 4.6, 218, 'active'),
(4, '博雅口腔诊所', '赵新民', '133-4455-6677', '上海', '上海市浦东新区世纪大道100号', 12.5, 4.7, 456, 'active');

-- ============================================================================
-- 26. client_service - 客户端服务表
-- ============================================================================
DROP TABLE IF EXISTS `client_service`;
CREATE TABLE `client_service` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `no` VARCHAR(30),
  `type` VARCHAR(30),
  `content` VARCHAR(200),
  `amount` INT,
  `status` VARCHAR(20),
  `date` VARCHAR(20),
  `reply` VARCHAR(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_service` (`id`, `no`, `type`, `content`, `amount`, `status`, `date`, `reply`) VALUES
(1, 'SV-2025-0801', '退款申请', '骨粉材料包装破损', 420, 'processing', '2025-08-04', ''),
(2, 'SV-2025-0798', '质保维修', '种植体基台松动', 0, 'active', '2025-07-28', '已安排医生检查，免费维修');

-- ============================================================================
-- 27. client_faq - 客户端常见问题表
-- ============================================================================
DROP TABLE IF EXISTS `client_faq`;
CREATE TABLE `client_faq` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `q` VARCHAR(200),
  `a` TEXT,
  `category` VARCHAR(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `client_faq` (`id`, `q`, `a`, `category`) VALUES
(1, '种植牙的周期是多久？', '通常种植牙周期为3-6个月，包括种植体植入手术（1天）、骨愈合期（2-3个月）、基台安装（1天）、牙冠修复（1-2周）。具体时间因个人骨质情况而异。', '周期'),
(2, '种植牙费用大概多少？', '单颗种植牙价格从2,980元起，包含种植体、基台和手术费。高端亲水种植体套餐3,980元。具体费用根据选择的套餐和诊所而定。', '费用'),
(3, '种植牙疼吗？', '种植手术在局部麻醉下进行，过程中不会感到疼痛。术后可能有轻微不适，2-3天内会消退。小唯种植体采用微创技术，恢复更快。', '疼痛'),
(4, '种植牙能用多久？', '小唯种植体采用钛合金材质，临床使用寿命可达15-20年以上。我们提供长期质保服务，种植卡绑定后可享受售后保障。', '质保'),
(5, '积分怎么获取和使用？', '消费获得积分（1元=1积分），老带新获得积分（好友下单得100积分，好友完成种植再得200积分）。积分满500可兑换商品，满1000可免费做一颗种植牙。', '积分'),
(6, '如何绑定实体卡？', '在"我的-实体卡绑定"页面输入卡密即可绑定。绑定后可查看种植体信息、进度追踪和质保服务。', '使用');

-- ============================================================================
-- 28. registrations - 注册申请表
-- ============================================================================
DROP TABLE IF EXISTS `registrations`;
CREATE TABLE `registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(20),
  `account` VARCHAR(50),
  `password` VARCHAR(255),
  `org_name` VARCHAR(100),
  `person` VARCHAR(50),
  `phone` VARCHAR(30),
  `region` VARCHAR(50),
  `address` VARCHAR(200),
  `license_name` VARCHAR(200),
  `license_data` TEXT,
  `status` VARCHAR(20),
  `submitted_at` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `registrations` (`id`, `type`, `account`, `password`, `org_name`, `person`, `phone`, `region`, `address`, `license_name`, `license_data`, `status`, `submitted_at`) VALUES
(1, 'clinic', 'brightdental', '', '明皓口腔诊所', '钱伟', '138-6677-8899', '浙江宁波', '宁波市海曙区中山东路88号', '营业执照_明皓口腔.jpg', '', 'pending', '2025-08-10'),
(2, 'pharmacy', 'healthpharma', '', '康健大药房', '杨芳', '139-8899-0011', '江苏苏州', '苏州市姑苏区人民路120号', '营业执照_康健药房.png', '', 'pending', '2025-08-10');

-- ============================================================================
-- 数据库初始化完成
-- ============================================================================
-- 注意: users 表中的 password 字段目前存储的是明文密码 '123456'
-- 首次登录时系统会自动将其升级为 bcrypt 哈希值
-- 如需手动批量初始化密码哈希,请运行以下命令:
--   node scripts/init-passwords.js
-- ============================================================================
