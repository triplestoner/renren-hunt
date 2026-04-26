# 人人猎H5页面实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成人人猎H5移动端页面开发，包含推荐人端、候选人端、企业端三大角色，以及简历解析和微信生态集成

**Architecture:** 基于现有React + Vite项目，使用Ant Design Mobile组件库，逐步增强/开发各角色页面

**Tech Stack:** React 19, TypeScript, Ant Design Mobile, 微信JSSDK

---

## 文件结构

```
renren-hunt/
├── src/
│   ├── components/              # 现有组件（需增强）
│   │   ├── JobHall.jsx        # 职位大厅
│   │   ├── Referrals.jsx      # 我的推荐
│   │   ├── TrustScore.jsx     # 信任分
│   │   ├── EarningsCenter.jsx # 收益中心
│   │   ├── Circles.jsx        # 我的圈子
│   │   ├── CandidatePortal.jsx # 候选人端入口
│   │   └── EmployerPortal.jsx  # 企业端入口
│   ├── pages/                 # 新建页面
│   │   ├── RecommenderPortal.jsx  # 推荐人端首页
│   │   ├── CandidateHome.jsx      # 候选人首页
│   │   ├── EmployerHome.jsx      # 企业首页
│   │   ├── OfferManage.jsx       # Offer管理
│   │   ├── PrivacyMode.jsx        # 隐私模式
│   │   ├── JobProgress.jsx        # 求职进度
│   │   ├── CandidateWallet.jsx    # 候选人钱包
│   │   ├── ReferrerReview.jsx     # 推荐人点评
│   │   ├── CandidateManage.jsx    # 候选人管理
│   │   ├── JobManage.jsx         # 职位管理
│   │   ├── PublishJob.jsx        # 发布新职位
│   │   ├── EscrowPay.jsx         # 资金托管
│   │   └── ResumeParse.jsx        # 简历解析
│   ├── context/                # React Context
│   │   ├── UserContext.jsx
│   │   └── AppContext.jsx
│   ├── hooks/                  # 自定义Hooks
│   │   ├── useWeChat.js
│   │   └── useResumeParser.js
│   ├── utils/                  # 工具函数
│   │   ├── wechat.js
│   │   └── format.js
│   └── styles/                 # 样式目录
│       └── variables.css
├── App.jsx                     # 主应用
└── index.css                   # 全局样式
```

---

## Phase 1: 推荐人端完善

### Task 1: 增强JobHall组件

**Files:**
- Modify: `src/components/JobHall.jsx`
- Test: 在本地运行 `npm run dev` 查看效果

#### 子任务

- [ ] **Step 1: 添加AI人脉匹配度展示**

在JobCard组件中添加匹配度百分比展示：
```jsx
<div className="match-rate">
  <span className="rate-number">{job.matchRate}%</span>
  <span className="rate-label">匹配度</span>
</div>
```

- [ ] **Step 2: 添加技能匹配度标签**

在职位卡片上添加技能标签：
```jsx
<div className="skill-tags">
  {job.skills.map(skill => (
    <Tag color="blue">{skill}</Tag>
  ))}
</div>
```

- [ ] **Step 3: 添加意向评估指标**

添加职位难度/竞争度指标：
```jsx
<div className="difficulty-indicator">
  <Progress percent={job.difficulty} />
  <span>竞争难度</span>
</div>
```

- [ ] **Step 4: 添加紧急职位高亮**

对紧急职位添加标记：
```jsx
{job.isUrgent && (
  <div className="urgent-badge">急招</div>
)}
```

- [ ] **Step 5: 添加人脉建档入口**

添加"一键推荐"按钮：
```jsx
<Button onClick={() => recommend(job.id)}>
  一键推荐
</Button>
```

- [ ] **Step 6: 验证并提交**

```bash
cd /Users/lql/Desktop/renren-hunt && npm run dev
# 检查JobHall组件功能正常后提交
git add src/components/JobHall.jsx
git commit -m "enhance: JobHall添加匹配度、技能标签、紧急职位高亮"
```

---

### Task 2: 增强Referrals组件

**Files:**
- Modify: `src/components/Referrals.jsx`
- Test: 在本地运行查看

#### 子任务

- [ ] **Step 1: 添加状态筛选Tabs**

```jsx
<Tabs>
  <Tab key="all">全部</Tab>
  <Tab key="pending">待授权</Tab>
  <Tab key="recommended">已推荐</Tab>
  <Tab key="interviewing">面试中</Tab>
  <Tab key="hired">已入职</Tab>
</Tabs>
```

- [ ] **Step 2: 添加推荐详情页跳转**

```jsx
<Card onClick={() => gotoDetail(referral.id)}>
  <Cell>
    <span>候选人: {referral.name}</span>
    <span>职位: {referral.jobTitle}</span>
    <span>状态: {referral.status}</span>
  </Cell>
</Card>
```

- [ ] **Step 3: 添加推荐进度时间线**

```jsx
<Timeline>
  {referral.progress.map(item => (
    <Timeline.Item>
      {item.status} - {item.date}
    </Timeline.Item>
  ))}
</Timeline>
```

- [ ] **Step 4: 添加成功/失败统计**

```jsx
<div className="stats">
  <div className="success-count">
    成功: {stats.success}
  </div>
  <div className="failed-count">
    失败: {stats.failed}
  </div>
</div>
```

- [ ] **Step 5: 验证并提交**

```bash
git add src/components/Referrals.jsx
git commit -m "enhance: Referrals添加状态筛选、详情页、进度时间线"
```

---

### Task 3: 增强EarningsCenter组件

**Files:**
- Modify: `src/components/EarningsCenter.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 添加可提现余额展示**

```jsx
<div className="balance-card">
  <span className="label">可提现余额</span>
  <span className="amount">¥{balance.withdrawable}</span>
</div>
```

- [ ] **Step 2: 添加冻结资金展示**

```jsx
<div className="frozen-card">
  <span className="label">冻结资金</span>
  <span className="amount">¥{balance.frozen}</span>
  <span className="note">（过保后解冻）</span>
</div>
```

- [ ] **Step 3: 添加一键提现按钮**

```jsx
<Button type="primary" onClick={handleWithdraw}>
  一键提现
</Button>
```

- [ ] **Step 4: 添加收益明细列表**

```jsx
<List>
  {earnings.map(item => (
    <List.Item>
      <div>{item.description}</div>
      <div>{item.amount}</div>
    </List.Item>
  ))}
</List>
```

- [ ] **Step 5: 添加提现合规说明**

```jsx
<div className="compliance-note">
  提现需完成实名认证，遵守平台规则
</div>
```

- [ ] **Step 6: 验证并提交**

```bash
git add src/components/EarningsCenter.jsx
git commit -m "enhance: EarningsCenter添加提现功能、资金展示"
```

---

### Task 4: 增强TrustScore组件

**Files:**
- Modify: `src/components/TrustScore.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 添加Trust Score 0-100分展示**

```jsx
<div className="score-circle">
  <Progress type="circle" percent={score.value} />
  <span className="score-label">{score.value}分</span>
</div>
```

- [ ] **Step 2: 添加等级徽章（S/A/B/C级）**

```jsx
<div className="level-badge">
  {score.level === 'S' && <Badge grade="S" />}
  {score.level === 'A' && <Badge grade="A" />}
  {score.level === 'B' && <Badge grade="B" />}
  {score.level === 'C' && <Badge grade="C" />}
</div>
```

- [ ] **Step 3: 添加信任分构成明细**

```jsx
<div className="score-breakdown">
  {score.breakdown.map(item => (
    <div className="item">
      <span>{item.factor}</span>
      <Progress percent={item.value} />
    </div>
  ))}
</div>
```

- [ ] **Step 4: 添加提升建议**

```jsx
<div className=" suggestions">
  <div className="title">提升建议</div>
  {suggestions.map(s => (
    <div className="suggestion">{s}</div>
  ))}
</div>
```

- [ ] **Step 5: 验证并提交**

```bash
git add src/components/TrustScore.jsx
git commit -m "enhance: TrustScore添加等级徽章、构成明细、提升建议"
```

---

## Phase 2: 候选人端开发

### Task 5: 开发候选人首页

**Files:**
- Create: `src/pages/CandidateHome.jsx`
- Modify: `src/App.jsx` 添加路由
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建CandidateHome页面基础结构**

```jsx
import { TabBar } from 'antd-mobile';

export default function CandidateHome() {
  const [activeTab, setActiveTab] = useState('offer');
  
  return (
    <div className="candidate-home">
      <TabBar>
        <TabBar.Item tabKey="offer" title="Offer" />
        <TabBar.Item tabKey="progress" title="进度" />
        <TabBar.Item tabKey="wallet" title="钱包" />
        <TabBar.Item tabKey="settings" title="设置" />
      </TabBar>
    </div>
  );
}
```

- [ ] **Step 2: 添加页面内容区域**

```jsx
const renderContent = () => {
  switch(activeTab) {
    case 'offer':
      return <OfferManage />;
    case 'progress':
      return <JobProgress />;
    case 'wallet':
      return <CandidateWallet />;
    case 'settings':
      return <Settings />;
  }
};
```

- [ ] **Step 3: 添加路由配置**

```jsx
<Route path="/candidate" element={<CandidateHome />} />
```

- [ ] **Step 4: 验证并提交**

```bash
git add src/pages/CandidateHome.jsx src/App.jsx
git commit -m "feat: 添加候选人首页CandidateHome"
```

---

### Task 6: 开发Offer管理页面

**Files:**
- Create: `src/pages/OfferManage.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建Offer列表组件**

```jsx
import { Card, Tag, Button, Modal } from 'antd-mobile';

export default function OfferManage() {
  const [offers, setOffers] = useState([]);
  
  return (
    <div className="offer-manage">
      {offers.map(offer => (
        <Card>
          <Card.Header>{offer.company}</Card.Header>
          <Card.Body>
            <div>职位: {offer.title}</div>
            <div>薪资: {offer.salary}</div>
            <div>奖金: {offer.bonus}</div>
            <div>签约金: {offer.signingBonus}</div>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => acceptOffer(offer.id)}>
              接受
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 添加已读/未读状态标记**

```jsx
{offer.isRead ? (
  <Tag color="green">已读</Tag>
) : (
  <Tag color="red">未读</Tag>
)}
```

- [ ] **Step 3: 添加接受Offer操作**

```jsx
const handleAccept = async (offerId) => {
  Modal.alert('确认接受Offer', '接受后将开始签约流程', [
    { text: '取消' },
    { 
      text: '确认', 
      onPress: () => acceptOfferApi(offerId)
    }
  ]);
};
```

- [ ] **Step 4: 验证并提交**

```bash
git add src/pages/OfferManage.jsx
git commit -m "feat: 添加Offer管理页面"
```

---

### Task 7: 开发求职进度页面

**Files:**
- Create: `src/pages/JobProgress.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建进度时间线组件**

```jsx
import { Steps } from 'antd-mobile';

export default function JobProgress() {
  const steps = [
    { key: 'background', title: '背调' },
    { key: 'hr_view', title: 'HR查看' },
    { key: 'first_interview', title: '一面' },
    { key: 'second_interview', title: '二面' },
    { key: 'offer', title: 'Offer' },
  ];
  
  return (
    <Steps current={currentStep}>
      {steps.map(step => (
        <Steps.Step key={step.key} title={step.title} />
      ))}
    </Steps>
  );
}
```

- [ ] **Step 2: 添加每步详细状态**

```jsx
<div className="step-detail">
  <div>状态: {currentStatus}</div>
  <div>更新时间: {updateTime}</div>
  <div>备注: {remark}</div>
</div>
```

- [ ] **Step 3: 验证并提交**

```bash
git add src/pages/JobProgress.jsx
git commit -m "feat: 添加求职进度页面"
```

---

### Task 8: 开发候选人钱包页面

**Files:**
- Create: `src/pages/CandidateWallet.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建钱包页面结构**

```jsx
export default function CandidateWallet() {
  return (
    <div className="candidate-wallet">
      <div className="frozen-balance">
        冻结资金: ¥{frozen}
      </div>
      <div className="pending-balance">
        待入账: ¥{pending}
      </div>
      <div className="withdrawn-balance">
        已提现: ¥{withdrawn}
      </div>
      <div className="trial-days">
        剩余试用期: {trialDays}天
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 添加奖金明细列表**

```jsx
<List>
  {bonusDetails.map(bonus => (
    <List.Item>
      {bonus.source} - ¥{bonus.amount}
    </List.Item>
  ))}
</List>
```

- [ ] **Step 3: 验证并提交**

```bash
git add src/pages/CandidateWallet.jsx
git commit -m "feat: 添加候选人钱包页面"
```

---

### Task 9: 开发隐私模式页面

**Files:**
- Create: `src/pages/PrivacyMode.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建隐私模式开关**

```jsx
import { Switch } from 'antd-mobile';

export default function PrivacyMode() {
  const [privacyMode, setPrivacyMode] = useState(false);
  
  return (
    <div className="privacy-mode">
      <Switch 
        checked={privacyMode}
        onChange={setPrivacyMode}
      />
    </div>
  );
}
```

- [ ] **Step 2: 添加隐私状态指示器**

```jsx
{privacyMode ? (
  <div className="status-indicator private">
    隐身模式
  </div>
) : (
  <div className="status-indicator public">
    公开模式
  </div>
)}
```

- [ ] **Step 3: 验证并提交**

```bash
git add src/pages/PrivacyMode.jsx
git commit -m "feat: 添加隐私模式页面"
```

---

### Task 10: 开发推荐人点评页面

**Files:**
- Create: `src/pages/ReferrerReview.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建点评历史列表**

```jsx
import { List } from 'antd-mobile';

export default function ReferrerReview() {
  return (
    <div className="referrer-review">
      <List>
        {reviews.map(review => (
          <List.Item>
            <div className="reviewer">{review.name}</div>
            <div className="company">{review.company}</div>
            <div className="comment">{review.comment}</div>
            <div className="date">{review.date}</div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
```

- [ ] **Step 2: 添加正向评价绿色标识**

```jsx
{review.isPositive && (
  <Tag color="green">好评</Tag>
)}
```

- [ ] **Step 3: 验证并提交**

```bash
git add src/pages/ReferrerReview.jsx
git commit -m "feat: 添加推荐人点评页面"
```

---

## Phase 3: 企业端开发

### Task 11: 开发企业首页

**Files:**
- Create: `src/pages/EmployerHome.jsx`
- Modify: `src/App.jsx` 添加路由
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建企业首页结构**

```jsx
export default function EmployerHome() {
  return (
    <div className="employer-home">
      <TabBar>
        <TabBar.Item tabKey="candidates" title="候选人" />
        <TabBar.Item tabKey="jobs" title="职位" />
        <TabBar.Item tabKey="finances" title="财务" />
      </TabBar>
    </div>
  );
}
```

- [ ] **Step 2: 验证并提交**

```bash
git add src/pages/EmployerHome.jsx src/App.jsx
git commit -m "feat: 添加企业首页"
```

---

### Task 12: 开发候选人管理页面

**Files:**
- Create: `src/pages/CandidateManage.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建候选人列表**

```jsx
export default function CandidateManage() {
  return (
    <div className="candidate-manage">
      <List>
        {candidates.map(c => (
          <List.Item>
            <div className="name">{c.name}</div>
            <div className="match-score">
              匹配度: {c.matchScore}%
            </div>
            <div className="referrer">
              推荐人: {c.referrerName} (信任分{c.referrerScore})
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
```

- [ ] **Step 2: 添加状态管理Tabs**

```jsx
<Tabs>
  <Tab key="pending">待查看</Tab>
  <Tab key="viewed">已查看</Tab>
  <Tab key="recommended">已推荐</Tab>
  <Tab key="first">一面</Tab>
  <Tab key="second">二面</Tab>
  <Tab key="offer">Offer</Tab>
</Tabs>
```

- [ ] **Step 3: 添加三维简历展开**

```jsx
<Card expandable>
  <Card.Header>基本信息</Card.Header>
  <Card.Body>学历、工作经历</Card.Body>
  <Card.Header>技能</Card.Header>
  <Card.Body>技能栈</Card.Body>
  <Card.Header>项目</Card.Header>
  <Card.Body>项目经验</Card.Body>
</Card>
```

- [ ] **Step 4: 验证并提交**

```bash
git add src/pages/CandidateManage.jsx
git commit -m "feat: 添加候选人管理页面"
```

---

### Task 13: 开发职位管理页面

**Files:**
- Create: `src/pages/JobManage.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建职位列表**

```jsx
export default function JobManage() {
  return (
    <div className="job-manage">
      <List>
        {jobs.map(job => (
          <List.Item>
            <div className="title">{job.title}</div>
            <div className="status">{job.status}</div>
            <div className="candidates">
              候选人数: {job.candidateCount}
            </div>
            <div className="views">浏览量: {job.views}</div>
            <div className="reward">悬赏: ¥{job.reward}</div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
```

- [ ] **Step 2: 添加状态Tabs**

```jsx
<Tabs>
  <Tab key="active">进行中</Tab>
  <Tab key="paused">已暂停</Tab>
  <Tab key="ended">已结束</Tab>
</Tabs>
```

- [ ] **Step 3: 添加发布新职位入口**

```jsx
<Button onClick={() => goto('/employer/publish')}>
  发布新职位
</Button>
```

- [ ] **Step 4: 验证并提交**

```bash
git add src/pages/JobManage.jsx
git commit -m "feat: 添加职位管理页面"
```

---

### Task 14: 开发发布新职位页面

**Files:**
- Create: `src/pages/PublishJob.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建职位发布表单**

```jsx
import { Form, Input, Picker } from 'antd-mobile';

export default function PublishJob() {
  return (
    <div className="publish-job">
      <Form>
        <Form.Item name="title" label="职位名称">
          <Input placeholder="请输入职位名称" />
        </Form.Item>
        <Form.Item name="description" label="职位描述">
          <Input placeholder="请输入职位描述" />
        </Form.Item>
        <Form.Item name="salary" label="薪资范围">
          <Input placeholder="如: 20k-30k" />
        </Form.Item>
        <Form.Item name="reward" label="悬赏金额">
          <Input placeholder="请输入悬赏金额" />
        </Form.Item>
      </Form>
    </div>
  );
}
```

- [ ] **Step 2: 添加硬性要求选择**

```jsx
<Form.Item name="education" label="学历要求">
  <Picker data={educationOptions}>
    请选择
  </Picker>
</Form.Item>
<Form.Item name="experience" label="经验要求">
  <Picker data={experienceOptions}>
    请选择
  </Picker>
</Form.Item>
```

- [ ] **Step 3: 添加定向圈层选择**

```jsx
<Form.Item name="circles" label="定向圈层">
  <Checkbox.Group>
    <Checkbox value="school">校友圈</Checkbox>
    <Checkbox value="company">企业圈</Checkbox>
    <Checkbox value="tech">技术圈</Checkbox>
    <Checkbox value="industry">行业圈</Checkbox>
  </Checkbox.Group>
</Form.Item>
```

- [ ] **Step 4: 添加智能JD解析（模拟）**

```jsx
<Button onClick={parseJD}>
  AI智能解析JD
</Button>
// 解析后自动填充技能标签
```

- [ ] **Step 5: 验证并提交**

```bash
git add src/pages/PublishJob.jsx
git commit -m "feat: 添加发布新职位页面"
```

---

### Task 15: 开发资金托管页面

**Files:**
- Create: `src/pages/EscrowPay.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建资金托管页面**

```jsx
import { Modal, Button } from 'antd-mobile';

export default function EscrowPay({ job }) {
  return (
    <div className="escrow-pay">
      <div className="total-amount">
        岗位总赏金: ¥{job.totalReward}
      </div>
      <div className="guarantee-note">
        保证期: {guaranteeDays}天（按天折算）
      </div>
      <Button onClick={handleWeChatPay}>
        微信支付托管
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: 添加保证期条款说明**

```jsx
<div className="guarantee-terms">
  <h4>保证期条款</h4>
  <p>1. 入职后{guaranteeDays}天为保证期</p>
  <p>2. 提前离职按天折算退还</p>
  <p>3. 过了保证期后奖金解冻</p>
</div>
```

- [ ] **Step 3: 集成微信支付（模拟）**

```jsx
const handleWeChatPay = async () => {
  // 1. 调用后端创建订单
  const order = await createOrderApi(job.id);
  // 2. 唤起微信支付
  WeixinJSBridge.invoke('getBrandWPayPayParams', order, (res) => {
    // 处理支付结果
  });
};
```

- [ ] **Step 4: 验证并提交**

```bash
git add src/pages/EscrowPay.jsx
git commit -m "feat: 添加资金托管页面"
```

---

## Phase 4: 简历解析模块

### Task 16: 开发简历解析页面

**Files:**
- Create: `src/pages/ResumeParse.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 创建简历解析页面基础结构**

```jsx
import { TabBar, Button, Card, Input } from 'antd-mobile';

export default function ResumeParse() {
  return (
    <div className="resume-parse">
      <TabBar>
        <TabBar.Item key="wechat" title="微信文件" />
        <TabBar.Item key="text" title="文本" />
        <TabBar.Item key="pc" title="PC上传" />
      </TabBar>
    </div>
  );
}
```

- [ ] **Step 2: 添加微信文件上传方式**

```jsx
const handleWeChatFile = async () => {
  // 使用微信JSSDK选择文件
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    extension: ['pdf', 'doc', 'docx'],
    success: (res) => {
      uploadFile(res.tempFiles[0]);
    }
  });
};
```

- [ ] **Step 3: 添加文本直贴方式**

```jsx
<TextArea 
  placeholder="粘贴简历内容..."
  rows={10}
  onChange={handleTextChange}
/>
<Button onClick={parseText}>解析</Button>
```

- [ ] **Step 4: 添加PC端上传入口**

```jsx
<div className="pc-upload">
  <div className="qrcode">
    <QRCode value={pcUploadUrl} />
  </div>
  <div className="instruction">
    扫码后在PC浏览器打开，上传简历
  </div>
</div>
```

- [ ] **Step 5: 添加解析状态展示**

```jsx
{parseStatus === 'processing' && (
  <div className="status">解析中...</div>
)}
{parseStatus === 'success' && (
  <div className="result">{parsedData}</div>
)}
{parseStatus === 'failed' && (
  <div className="error">解析失败，请重试</div>
)}
```

- [ ] **Step 6: 验证并提交**

```bash
git add src/pages/ResumeParse.jsx
git commit -m "feat: 添加简历解析页面"
```

---

## Phase 5: 微信生态集成

### Task 17: 集成微信JSSDK

**Files:**
- Create: `src/utils/wechat.js`
- Create: `src/hooks/useWeChat.js`
- Modify: 相关组件引入Hook

#### 子任务

- [ ] **Step 1: 创建微信JSSDK工具函数**

```jsx
// src/utils/wechat.js

export function initWeChatJSSDK() {
  return new Promise(async (resolve, reject) => {
    // 1. 获取JSSDK配置
    const config = await getJSSDKConfig();
    
    // 2. 注入微信JSSDK
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: [
        'chooseMessageFile',
        'uploadImage',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'getLocation',
        'openCustomerServiceContact'
      ]
    });
    
    wx.ready(resolve);
    wx.error(reject);
  });
}
```

- [ ] **Step 2: 创建useWeChat Hook**

```jsx
// src/hooks/useWeChat.js

import { useState, useEffect } from 'react';
import { initWeChatJSSDK } from '../utils/wechat';

export function useWeChat() {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    initWeChatJSSDK().then(() => setReady(true));
  }, []);
  
  return { ready };
}
```

- [ ] **Step 3: 在ResumeParse中集成**

```jsx
import { useWeChat } from '../hooks/useWeChat';

function ResumeParse() {
  const { ready } = useWeChat();
  
  const chooseFile = () => {
    if (!ready) {
      console.warn('WeChat JSSDK not ready');
      return;
    }
    wx.chooseMessageFile({ /*options*/ });
  };
}
```

- [ ] **Step 4: 验证并提交**

```bash
git add src/utils/wechat.js src/hooks/useWeChat.js
git commit -m "feat: 集成微信JSSDK"
```

---

### Task 18: 完善双盲机制

**Files:**
- Modify: `src/components/EmployerPortal.jsx`
- Test: 本地运行查看

#### 子任务

- [ ] **Step 1: 添加双盲逻辑**

```jsx
function CandidateCard({ candidate }) {
  // 未支付托管金：隐藏敏感信息
  if (!candidate.escrowPaid) {
    return (
      <Card>
        <div className="name">{candidate.nameMasked}</div>
        <div className="phone">{candidate.phoneMasked}</div>
        <div className="email">{candidate.emailMasked}</div>
        <div className="company">{candidate.companyMasked}</div>
      </Card>
    );
  }
  
  // 已支付：显示真实信息
  return (
    <Card>
      <div className="name">{candidate.name}</div>
      <div className="phone">{candidate.phone}</div>
      <div className="email">{candidate.email}</div>
      <div className="company">{candidate.company}</div>
    </Card>
  );
}
```

- [ ] **Step 2: 验证并提交**

```bash
git add src/components/EmployerPortal.jsx
git commit -m "feat: 添加双盲机制"
```

---

## 自检清单

完成计划后，请检查以下几点：

### 1. 设计覆盖检查

- [ ] 推荐人端4个组件（JobHall, Referrals, EarningsCenter, TrustScore）
- [ ] 候选人端6个页面（Home, OfferManage, JobProgress, Wallet, PrivacyMode, ReferrerReview）
- [ ] 企业端5个页面（Home, CandidateManage, JobManage, PublishJob, EscrowPay）
- [ ] 简历解析页面
- [ ] 微信JSSDK集成
- [ ] 双盲机制

### 2. 占位符检查

确保计划中没有以下占位符：
- "TBD", "TODO", "implement later"
- "Add appropriate error handling"
- "Write tests for the above"
- "Similar to Task N"

### 3. 类型一致性检查

确保各文件中的接口、数据结构保持一致

---

## 执行选项

**计划完成并保存到 `docs/superpowers/plans/2026-04-12-renrenlie-h5-implementation.md`。两个执行选项：**

**1. 子任务驱动（推荐）** - 每个任务分发一个子任务，任务间快速迭代

**2. 批量执行** - 在当前会话批量执行，有审核点

**选择哪个方式？**