# 人人猎H5页面开发设计文档

> 日期：2026-04-12
> 版本：V1.0
> 状态：待开发

---

## 一、项目概述

基于人人猎1.0技术文档，在现有的renren-hunt项目中开发H5网站。

### 1.1 技术选型

| 层级 | 技术栈 | 说明 |
|------|--------|------|
| 前端 | React 19 + TypeScript + Ant Design Mobile | 响应式H5，支持微信/浏览器/PC |
| 后端 | Python 3.11 + FastAPI | 规划中，MVP先做前端 |
| UI组件库 | Ant Design Mobile | 移动端组件库 |
| 状态管理 | React Context + useReducer | 轻量级状态管理 |
| 微信集成 | 微信JSSDK | 简历上传、微信支付 |

### 1.2 项目结构

```
renren-hunt/
├── src/
│   ├── components/          # 现有组件
│   │   ├── Layout.jsx       # 推荐人端布局
│   │   ├── JobHall.jsx      # 职位大厅
│   │   ├── Referrals.jsx    # 我的推荐
│   │   ├── TrustScore.jsx   # 信任分
│   │   ├── EarningsCenter.jsx # 收益中心
│   │   ├── Circles.jsx      # 我的圈子
│   │   ├── CandidatePortal.jsx # 候选人端
│   │   └── EmployerPortal.jsx  # 企业端
│   ├── pages/              # 页面目录（新建）
│   │   ├── ResumeParse.jsx  # 简历解析页
│   │   └── EscrowPay.jsx    # 资金托管页
│   ├── hooks/              # 自定义Hooks（新建）
│   ├── context/            # React Context（新建）
│   ├── utils/              # 工具函数（新建）
│   ├── styles/             # 样式目录（新建）
│   └── App.jsx             # 主应用
├── public/
└── package.json
```

---

## 二、推荐人端页面设计

### 2.1 职位大厅 (JobHall)

**现有组件**：`src/components/JobHall.jsx`

**需完善功能**：
- AI人脉匹配度展示
- 技能匹配度标签
- 意向评估指标
- 紧急职位高亮
- 人脉建档入口

**交互流程**：
```
职位列表 → 点击职位 → 职位详情 → 人脉匹配分析 → 推荐候选人
```

### 2.2 我的推荐 (Referrals)

**现有组件**：`src/components/Referrals.jsx`

**需完善功能**：
- 状态筛选（全部/待授权/已推荐/面试中/已入职）
- 推荐详情页
- 推荐进度时间线
- 推荐成功/失败统计

### 2.3 收益中心 (EarningsCenter)

**现有组件**：`src/components/EarningsCenter.jsx`

**需完善功能**：
- 可提现余额展示
- 冻结资金展示（过保金额）
- 一键提现按钮
- 收益明细列表
- 提现合规说明

### 2.4 信任分体系 (TrustScore)

**现有组件**：`src/components/TrustScore.jsx`

**需完善功能**：
- Trust Score 0-100分展示
- 等级徽章（S/A/B/C级）
- 信任分构成明细
- 提升建议

---

## 三、候选人端页面设计

### 3.1 Offer管理

**入口**：`CandidatePortal.jsx`

**功能**：
- Offer列表展示
- Offer详情（推荐人、职位、公司、薪资、奖金、签约金）
- 职位技能标签
- 已读/未读状态
- 接受Offer操作

### 3.2 隐私模式

**入口**：候选人设置页

**功能**：
- 隐身模式开关（一键切换）
- 公开模式
- 隐私状态指示器

### 3.3 求职进度

**入口**：候选人首页

**功能**：
- 进度时间线（背调→HR查看→一面→二面→Offer）
- 每步详细状态
- 最新更新时间

### 3.4 推荐人点评

**入口**：候选人详情页

**功能**：
- 点评历史列表
- 点评内容（推荐人姓名、关系、公司、评语、日期）
- 正向评价绿色标识

### 3.5 钱包功能

**入口**：候选人设置页

**功能**：
- 冻结资金展示（签约金冻结）
- 待入账金额
- 已提现金额
- 剩余试用期天数
- 奖金明细

---

## 四、企业端页面设计

### 4.1 候选人管理

**入口**：`EmployerPortal.jsx`

**功能**：
- 候选人列表（匹配度筛选）
- 候选人信息卡片
- AI匹配度分数
- 推荐人信息（姓名、信任分、等级）
- 状态管理（待查看/已查看/已推荐/一面/二面/Offer）
- 三维简历展开
- 候选人点评查看

### 4.2 职位管理

**入口**：`EmployerPortal.jsx`

**功能**：
- 职位列表（进行中/已暂停/已结束）
- 职位信息（名称、状态、候选人数、浏览量、悬赏金额）
- 发布新职位入口
- 职位详情

### 4.3 发布新职位

**入口**：企业端首页

**功能**：
- 智能JD解析（AI提取技能、经验）
- 基本信息输入
- 硬性要求（学历、年限、行业、城市）
- 核心技能栈推荐
- 定向圈层选择（校友圈/企业圈/技术圈/行业圈）
- 职位描述
- 薪资范围
- 悬赏金额计算

### 4.4 资金托管页

**入口**：企业确认面试/Offer时弹出

**功能**：
- 显示岗位总赏金
- 保证期条款说明（90天/按天折算）
- 微信支付托管付款
- 托管状态查询

---

## 五、简历解析模块设计

### 5.1 简历上传方式

根据技术文档，提供三种上传方式：

1. **微信聊天文件提取**
   - 调用微信JSSDK `wx.chooseMessageFile`
   - 从微信聊天记录提取PDF/Word简历

2. **文本直贴**
   - 大文本框支持粘贴简历内容
   - 实时解析反馈

3. **PC端批量上传**
   - 生成带参数的海报/链接
   - 扫码后在PC浏览器打开
   - 批量拖拽上传

### 5.2 简历解析页面

**组件**：`src/pages/ResumeParse.jsx`

**功能**：
- 上传方式选择器
- 上传进度展示
- 解析状态（处理中/成功/失败）
- 解析结果预览
- 候选人信息编辑

### 5.3 解析结果展示

**数据字段**：
- 姓名
- 联系方式（脱敏）
- 学历
- 工作年限
- 技能栈
- 工作经历
- 项目经验

---

## 六、微信生态集成设计

### 6.1 微信JSSDK配置

| JS接口 | 用途 |
|--------|------|
| wx.onMenuShareTimeline | 分享悬赏到朋友圈 |
| wx.onMenuShareAppMessage | 分享悬赏给好友 |
| wx.chooseMessageFile | 从聊天记录选择简历 |
| wx.uploadImage | 上传简历图片 |
| wx.getLocation | 获取位置（附近岗位） |
| wx.openCustomerServiceContact | 联系企业HR |

### 6.2 微信支付流程

1. 用户点击"立即支付"
2. 前端调用后端 `/payment/create-order`
3. 后端调用微信统一下单接口
4. 前端调用 `WeixinJSBridge.invoke` 调起支付
5. 支付结果回调通知后端

---

## 七、核心业务逻辑

### 7.1 按天折算退款算法

```python
def calculate_refund(escrow_amount, guarantee_days, start_date, exit_date):
    actual_days = (exit_date - start_date).days
    if actual_days < 0:
        return escrow_amount  # 未入职全退
    if actual_days >= guarantee_days:
        return 0.0  # 过保不退
    
    daily_rate = escrow_amount / guarantee_days
    earned_amount = daily_rate * actual_days
    refund_amount = escrow_amount - earned_amount
    return round(refund_amount, 2)
```

### 7.2 双盲机制

- B端未支付托管金：返回打码卡片（隐藏姓名、电话、邮箱、当前公司）
- B端支付托管金后：解密获取真实联系方式

---

## 八、实施计划

### Phase 1: 推荐人端完善
- 完善JobHall组件
- 完善Referrals组件
- 完善EarningsCenter组件
- 完善TrustScore组件

### Phase 2: 候选人端开发
- 开发候选人首页
- 开发Offer管理
- 开发求职进度
- 开发钱包功能

### Phase 3: 企业端开发
- 开发候选人管理
- 开发职位管理
- 开发资金托管页

### Phase 4: 简历解析模块
- 开发ResumeParse页面
- 集成微信JSSDK

### Phase 5: 微信生态集成
- 微信JSSDK配置
- 微信支付对接
- 部署配置

---

## 九、验收标准

### 功能验收
- [ ] 推荐人端各页面功能完整
- [ ] 候选人端各页面功能完整
- [ ] 企业端各页面功能完整
- [ ] 简历解析三种上传方式可用
- [ ] 微信JSSDK集成完成

### 视觉验收
- [ ] 移动端响应式适配正常
- [ ] 微信环境内运行正常
- [ ] PC端自适应布局正常
- [ ] Ant Design Mobile组件风格一致

### 交互验收
- [ ] TabBar导航流畅
- [ ] 页面切换动画自然
- [ ] 表单提交反馈清晰
- [ ] 状态切换过渡平滑

---

*文档创建时间：2026-04-12*
