import { useState, useRef } from 'react';
import JDAnalyzerModal from './JDAnalyzerModal';
import CandidateReportGenerator from './CandidateReportGenerator';

const mockJobs = [
  {
    id: 1,
    title: '资深前端架构师',
    company: '字节跳动',
    companyLogo: 'https://logo.clearbit.com/bytedance.com',
    salary: '80-120K·16薪',
    tags: ['React', 'TypeScript', '架构设计'],
    deadline: '剩余12小时',
    urgent: true,
    bonus: '¥25,000',
    circle: '#大厂圈',
    match: 95,
    industry: '互联网',
    location: '北京',
    zone: 'all',
  },
  {
    id: 2,
    title: 'AI算法工程师',
    company: 'MiniMax',
    companyLogo: 'https://logo.clearbit.com/minimaxi.chat',
    salary: '60-90K·15薪',
    tags: ['Python', 'LLM', '深度学习'],
    deadline: '剩余2天',
    urgent: false,
    bonus: '¥18,000',
    circle: '#AI圈',
    match: 88,
    industry: '人工智能',
    location: '北京',
    zone: 'vertical',
    verticalField: 'AI',
  },
  {
    id: 3,
    title: '产品总监',
    company: '美团',
    companyLogo: 'https://logo.clearbit.com/meituan.com',
    salary: '100-150K·14薪',
    tags: ['B端产品', 'SaaS', '团队管理'],
    deadline: '剩余3天',
    urgent: false,
    bonus: '¥35,000',
    circle: '#大厂圈',
    match: 82,
    industry: '互联网',
    location: '上海',
    zone: 'all',
  },
  {
    id: 4,
    title: '后端资深工程师',
    company: '蚂蚁集团',
    companyLogo: 'https://logo.clearbit.com/antgroup.com',
    salary: '50-80K·15薪',
    tags: ['Java', '微服务', '分布式'],
    deadline: '剩余1天',
    urgent: true,
    bonus: '¥20,000',
    circle: '#金融科技圈',
    match: 91,
    industry: '金融',
    location: '杭州',
    zone: 'all',
  },
  {
    id: 5,
    title: 'Senior Software Engineer (US)',
    company: 'TikTok Global',
    companyLogo: 'https://logo.clearbit.com/tiktok.com',
    salary: '$150K-200K·14薪',
    tags: ['React Native', 'iOS', 'Global'],
    deadline: '剩余5天',
    urgent: true,
    bonus: '¥50,000',
    circle: '#出海圈',
    match: 92,
    industry: '互联网',
    location: 'Seattle, USA',
    zone: 'overseas',
    overseasLocation: '美国西雅图',
    salaryMultiplier: 3,
  },
  {
    id: 6,
    title: 'ML Research Scientist (Singapore)',
    company: 'ByteDance AI Lab',
    companyLogo: 'https://logo.clearbit.com/bytedance.com',
    salary: 'SGD 120K-180K·14薪',
    tags: ['Machine Learning', 'NLP', 'Research'],
    deadline: '剩余7天',
    urgent: false,
    bonus: '¥60,000',
    circle: '#AI圈',
    match: 89,
    industry: '人工智能',
    location: 'Singapore',
    zone: 'overseas',
    overseasLocation: '新加坡',
    salaryMultiplier: 2.5,
  },
  {
    id: 7,
    title: '高级产品经理',
    company: '智慧云科',
    companyLogo: 'https://logo.clearbit.com/slack.com',
    salary: '25-40K·14薪',
    tags: ['SaaS', '企业服务', '增长黑客'],
    deadline: '剩余3天',
    urgent: true,
    bonus: '¥8,000',
    circle: '#中小企业圈',
    match: 85,
    industry: '企业服务',
    location: '深圳',
    zone: 'sme',
    smeBenefit: true,
  },
  {
    id: 8,
    title: '芯片验证工程师',
    company: '智芯微',
    companyLogo: 'https://logo.clearbit.com/intel.com',
    salary: '40-60K·16薪',
    tags: ['Verilog', 'ASIC', '芯片设计'],
    deadline: '剩余4天',
    urgent: false,
    bonus: '¥28,000',
    circle: '#芯片圈',
    match: 87,
    industry: '芯片半导体',
    location: '上海',
    zone: 'vertical',
    verticalField: '芯片',
  },
  {
    id: 9,
    title: '新能源电池研发工程师',
    company: '动力未来',
    companyLogo: 'https://logo.clearbit.com/tesla.com',
    salary: '35-55K·14薪',
    tags: ['材料科学', '电池技术', '研发'],
    deadline: '剩余6天',
    urgent: false,
    bonus: '¥22,000',
    circle: '#新能源圈',
    match: 86,
    industry: '新能源',
    location: '合肥',
    zone: 'vertical',
    verticalField: '新能源',
  },
];

const mockNetworkContacts = [
  { id: 1, name: '张同学', avatar: 'https://i.pravatar.cc/150?u=zhang', company: '阿里', title: '前端工程师', relation: '前同事', circle: '大厂圈', skills: ['React', 'TypeScript'] },
  { id: 2, name: '李同学', avatar: 'https://i.pravatar.cc/150?u=li', company: '腾讯', title: '技术专家', relation: '校友', circle: '校友圈', skills: ['架构设计', 'Go'] },
  { id: 3, name: '王同学', avatar: 'https://i.pravatar.cc/150?u=wang', company: '字节', title: 'AI算法', relation: '前同事', circle: 'AI圈', skills: ['Python', 'LLM'] },
  { id: 4, name: '赵同学', avatar: 'https://i.pravatar.cc/150?u=zhao', company: '阿里', title: '产品经理', relation: '朋友', circle: '大厂圈', skills: ['B端产品', 'SaaS'] },
  { id: 5, name: '刘同学', avatar: 'https://i.pravatar.cc/150?u=liu', company: '百度', title: '后端工程师', relation: '校友', circle: '技术圈', skills: ['Java', '分布式'] },
  { id: 6, name: '陈同学', avatar: 'https://i.pravatar.cc/150?u=chen', company: '美团', title: '前端工程师', relation: '前同事', circle: '大厂圈', skills: ['React', 'TypeScript'] },
];

const aiMatchStages = [
  { stage: '人脉建档', count: 892, icon: '👥', desc: '建立Recommender人脉网络图谱' },
  { stage: '圈层过滤', count: 456, icon: '🔍', desc: '按职位要求过滤目标圈层' },
  { stage: '去重排重', count: 389, icon: '✨', desc: '去除重复人脉，保留最新关系' },
  { stage: '技能匹配', count: 234, icon: '⚡', desc: 'AI分析技能与职位JD匹配度' },
  { stage: '意向评估', count: 128, icon: '🎯', desc: '评估候选人求职意向和活跃度' },
  { stage: '⭐ 智能推荐', count: 45, icon: '🌟', desc: '输出最优候选人推荐列表' },
];

const industries = ['互联网', '人工智能', '金融', '电商', '教育', '医疗', '硬件', '游戏'];
const locations = ['北京', '上海', '杭州', '深圳', '广州', '成都', '南京', '苏州'];

const trustSignals = [
  { value: '609 万+', label: '可触达职业人脉' },
  { value: '54,600+', label: '企业与猎企需求伙伴' },
  { value: '21 类', label: '高热职位赛道' },
  { value: '420+ 城', label: '国内外交付覆盖' },
];

const consoleTasks = [
  { label: '待响应派单', value: '4', tone: 'blue' },
  { label: '进行中推荐', value: '12', tone: 'green' },
  { label: '可提现收益', value: '¥83K', tone: 'orange' },
];

const specialCampaigns = [
  { title: '新用户不迷路', desc: '新人首推任务，48小时内有人带', tag: '新人', tone: 'purple' },
  { title: '奖励暴击专区', desc: '高佣职位叠加限时推荐礼', tag: '奖励', tone: 'orange' },
  { title: '智联甄选', desc: '专人对接，推荐进度更透明', tag: '甄选', tone: 'cyan' },
  { title: '量身定制抢单', desc: '按圈层和行业偏好推送热单', tag: '抢单', tone: 'red' },
];

const mobileEntrances = [
  { label: '全部职位', icon: '◇', zone: 'all', page: 'all' },
  { label: '本周上新', icon: 'NEW', zone: 'all', page: 'fresh' },
  { label: '智联甄选', icon: '▣', zone: 'sme', page: 'select' },
  { label: '派单中心', icon: '▤', zone: 'vertical', page: 'dispatch' },
];

const activePublishers = [
  { name: '凯哥', tone: 'green' },
  { name: '曲顾问', tone: 'orange' },
  { name: '贺顾问', tone: 'cyan' },
  { name: '李顾问', tone: 'blue' },
];

const advisorProfiles = [
  { name: '凯哥', level: '金牌顾问', avatar: '凯', score: '4.9', orders: '238', speed: '18分钟', tone: 'green' },
  { name: '曲顾问', level: '甄选顾问', avatar: '曲', score: '4.8', orders: '176', speed: '26分钟', tone: 'orange' },
  { name: '贺顾问', level: '直营顾问', avatar: '贺', score: '4.7', orders: '154', speed: '31分钟', tone: 'cyan' },
];

const getAdvisorForJob = (job) => advisorProfiles[job.id % advisorProfiles.length];

const mobileListJobs = [
  { id: 101, title: '大数据开发工程师', company: '苏州智能交通信息科技股份有限公司', salary: '20-30万', tags: ['研究生', '3-5年', '大数据'], deadline: '8小时前活跃', urgent: true, bonus: '¥34,900', circle: '#智联甄选', match: 96, industry: '大数据', location: '苏州', zone: 'sme' },
  { id: 102, title: 'AI 硬件产品经理-机器人方向', company: '北京阿里云飞天信息技术有限公司', salary: '50-120万', tags: ['本科', '5-8年', 'AI硬件'], deadline: '8小时前活跃', urgent: false, bonus: '¥163,200', circle: '#本周上新', match: 89, industry: '人工智能', location: '杭州', zone: 'vertical' },
  { id: 103, title: 'ai解题产品经理', company: '北京凌云一课线上学科培训学校', salary: '60-100万', tags: ['本科', '5-8年', '教育AI'], deadline: '5小时前活跃', urgent: false, bonus: '¥63,000', circle: '#智联甄选', match: 93, industry: '教育', location: '北京', zone: 'sme' },
  { id: 104, title: '数据产品经理', company: '宁波方太厨具有限公司', salary: '40-60万', tags: ['本科', '8-10年', '数据产品'], deadline: '4小时前活跃', urgent: false, bonus: '¥47,500', circle: '#全部职位', match: 86, industry: '制造业', location: '上海', zone: 'all' },
  { id: 105, title: '产品运营', company: '安徽飞数信息科技有限公司', salary: '15-20万', tags: ['本科', '不限', '运营'], deadline: '7小时前活跃', urgent: false, bonus: '¥2,200', circle: '#本周上新', match: 78, industry: '互联网', location: '上海', zone: 'all' },
  { id: 106, title: '产品总监', company: '深圳店小秘网络科技有限公司', salary: '30-70万', tags: ['本科', '8-10年', '跨境电商'], deadline: '在线可聊', urgent: false, bonus: '¥81,400', circle: '#本周上新', match: 91, industry: '电商', location: '深圳', zone: 'vertical' },
  { id: 107, title: '研发中心负责人', company: '南京深度智控科技有限公司', salary: '150-200万', tags: ['本科', '5-8年', '研发管理'], deadline: '在线可聊', urgent: false, bonus: '¥252,000', circle: '#智联甄选', match: 95, industry: '硬件', location: '深圳', zone: 'sme' },
  { id: 108, title: '大模型应用开发工程师', company: '美的', salary: '15-23万', tags: ['本科', '3-5年', '大模型'], deadline: '7小时前活跃', urgent: false, bonus: '¥2,600', circle: '#全部职位', match: 84, industry: '人工智能', location: '佛山', zone: 'all' },
  { id: 109, title: '数据分析（成都、天府新区）', company: '腾讯云雀（青岛）信息技术有限公司', salary: '7-10万', tags: ['大专及以上', '0-3年', '数据分析'], deadline: '在线可聊', urgent: false, bonus: '¥3,600', circle: '#智联甄选', match: 88, industry: '互联网', location: '成都', zone: 'sme' },
];

const rankings = [
  {
    title: '做单佣金榜',
    period: '本周排名',
    rows: [
      ['赵顾问', '¥165,210'],
      ['向顾问', '¥156,307'],
      ['孙顾问', '¥143,000'],
    ],
  },
  {
    title: 'Offer 文件榜',
    period: '30日排名',
    rows: [
      ['刘顾问', '379'],
      ['胡顾问', '214'],
      ['蒋顾问', '54'],
    ],
  },
  {
    title: '职位发布挑战榜',
    period: '14日排名',
    rows: [
      ['陈顾问', '85'],
      ['肖顾问', '53'],
      ['林顾问', '42'],
    ],
  },
];

export default function JobHall({ publishedJobs = mockJobs, onRecommend, recommendedCandidates = [], submittedRecommendations = [] }) {
  const [activeSection, setActiveSection] = useState('dispatch');
  const [activeZone, setActiveZone] = useState('all'); // all, overseas, sme, vertical
  const [selectedJob, setSelectedJob] = useState(null);
  const [mobileDetailJob, setMobileDetailJob] = useState(null);
  const [mobileDetailTab, setMobileDetailTab] = useState('job');
  const [mobileListPage, setMobileListPage] = useState(null);
  const [mobileSubscriptionMode, setMobileSubscriptionMode] = useState('empty');
  const [pendingOrderJob, setPendingOrderJob] = useState(null);
  const [showOrderNotice, setShowOrderNotice] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [aiScanning, setAiScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showAIFunnel, setShowAIFunnel] = useState(false);
  const [funnelData, setFunnelData] = useState([]);
  const [aiMatchedContacts, setAiMatchedContacts] = useState([]);
  const [showContactList, setShowContactList] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [recommendForm, setRecommendForm] = useState({
    skillMatch: 5,
    experienceMatch: 5,
    potential: 5,
    recommendation: '',
    reasonForC2: '',
  });
  const [recommendError, setRecommendError] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingRecommendation, setSharingRecommendation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [analyzingJob, setAnalyzingJob] = useState(null);
  const [generatingReportJob, setGeneratingReportJob] = useState(null);
  const funnelTimersRef = useRef([]);

  const visibleJobs = publishedJobs
    .filter(job => activeZone === 'all' || job.zone === activeZone)
    .filter(job => activeSection === 'dispatch' ? job.match >= 85 : job.match < 85)
    .filter(job => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query);
    })
    .filter(job => !industryFilter || job.industry === industryFilter)
    .filter(job => !locationFilter || job.location === locationFilter);

  const dispatchCount = publishedJobs.filter(job => job.match >= 85).length;
  const grabCount = publishedJobs.filter(job => job.match < 85).length;
  const hotJob = visibleJobs[0] || publishedJobs[0];
  const submittedCount = recommendedCandidates.length;
  const weeklyStats = [
    { label: '人选推荐', value: submittedCount },
    { label: '初筛通过', value: submittedRecommendations.filter(item => item.status === 'accepted').length },
    { label: '面试通过', value: 0 },
  ];
  const recommendedJobs = publishedJobs.filter(job => job.match >= 88).slice(0, 6);
  const freshJobs = publishedJobs.slice(-6).reverse();
  const highestBonus = publishedJobs.reduce((max, job) => (
    Number(job.bonus.replace(/[¥,]/g, '')) > Number(max.bonus.replace(/[¥,]/g, '')) ? job : max
  ), publishedJobs[0]);
  const mobileHotJobs = visibleJobs.slice(0, 6);
  const mobileSpotlightJobs = publishedJobs.filter(job => job.match >= 88).slice(0, 3);
  const mobileDetailAdvisor = mobileDetailJob ? getAdvisorForJob(mobileDetailJob) : null;
  const mobileDetailLocation = mobileDetailJob?.location || (mobileDetailJob?.company === '蚂蚁集团' ? '杭州' : mobileDetailJob?.company === '美团' ? '上海' : '北京');
  const mobileDetailIndustry = mobileDetailJob?.industry || (mobileDetailJob?.tags?.includes('LLM') ? '人工智能' : mobileDetailJob?.tags?.includes('微服务') ? '金融科技' : '互联网');
  const mobileDetailCompany = mobileDetailJob ? `${mobileDetailLocation}${mobileDetailJob.company}科技股份有限公司` : '';
  const mobileDetailSalary = mobileDetailJob ? mobileDetailJob.salary.split('·')[0] : '';
  const mobileDetailBonusAmount = mobileDetailJob ? Number(mobileDetailJob.bonus.replace(/[¥,]/g, '')) : 0;
  const mobileDetailCommissionRate = mobileDetailBonusAmount >= 50000 ? '15.6%' : mobileDetailBonusAmount >= 30000 ? '12.6%' : '10.8%';
  const mobileDetailTabs = [
    { key: 'job', label: '职位信息' },
    { key: 'company', label: '用人企业' },
    { key: 'commission', label: '佣金规则' },
    { key: 'reviews', label: '顾问评价', badge: '99' },
  ];
  const mobileListTitles = {
    all: '全部职位',
    fresh: '本周上新',
    select: '智联甄选',
    dispatch: '派单中心',
    subscription: '我的订阅',
  };
  const mobileListSource = [...publishedJobs, ...mobileListJobs];
  const mobileFilteredListJobs = mobileListSource
    .filter((job) => {
      if (mobileListPage === 'fresh') return job.circle === '#本周上新' || job.id >= 102;
      if (mobileListPage === 'select') return job.zone === 'sme' || job.match >= 88;
      return true;
    })
    .filter((job) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query) || (job.location || '').toLowerCase().includes(query);
    });
  const mobileDispatchGroups = [
    {
      id: 'aiden',
      name: 'Aiden',
      avatar: 'A',
      company: '杭州锐致商务咨询有限公司',
      date: '2026-05-29',
      count: 2,
      jobs: [
        { id: 201, title: '机械研发 工程师', company: '沧州怡和机械有限公司', salary: '12-36万', tags: ['沧州市', '本科', '3-5年', '2人'], deadline: '邀约中', urgent: false, bonus: '¥45,400', circle: '#派单', match: 87, industry: '制造业', location: '沧州', zone: 'vertical' },
        { id: 202, title: '电气自动化工程师', company: '沧州怡和机械有限公司', salary: '12-36万', tags: ['本科', '3-5年', '2人'], deadline: '邀约中', urgent: false, bonus: '¥45,400', circle: '#派单', match: 86, industry: '制造业', location: '沧州', zone: 'vertical' },
      ],
    },
    {
      id: 'wang',
      name: '王顾问',
      avatar: '王',
      company: '深圳市东莱国际信息技术有限公司',
      date: '2026-05-28',
      count: 1,
      jobs: [
        { id: 203, title: '亚马逊运营总监/经理', company: '深圳市创通新科科技有限公司', salary: '42-60万', tags: ['深圳市', '本科', '5-8年', '1人'], deadline: '邀约中', urgent: false, bonus: '¥69,600', circle: '#派单', match: 91, industry: '跨境电商', location: '深圳', zone: 'vertical' },
      ],
    },
  ];

  const openMobileJobDetail = (job, tab = 'job') => {
    setMobileDetailJob(job);
    setMobileDetailTab(tab);
    setSelectedJob(null);
  };

  const openMobileListPage = (item) => {
    setMobileListPage(item.page);
    setMobileDetailJob(null);
    setSelectedJob(null);
    setActiveSection('dispatch');
    setActiveZone(item.zone);
  };

  const beginOrderFlow = (job) => {
    setPendingOrderJob(job);
    setShowOrderNotice(true);
  };

  const confirmOrder = () => {
    if (!pendingOrderJob) return;
    setShowOrderNotice(false);
    setSelectedJob(pendingOrderJob.id);
    setShowOrderSuccess(true);
    window.setTimeout(() => {
      setShowOrderSuccess(false);
      setSelectedContact(mockNetworkContacts[0]);
      setShowRecommendModal(true);
    }, 850);
  };

  const runAIScan = () => {
    funnelTimersRef.current.forEach(timer => clearTimeout(timer));
    funnelTimersRef.current = [];
    
    setPendingOrderJob(null);
    setAiScanning(true);
    setScanProgress(0);
    setShowAIFunnel(false);
    setFunnelData([]);
    setAiMatchedContacts([]);
    setShowContactList(false);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAiScanning(false);
          setShowAIFunnel(true);
          animateFunnel();
          return 100;
        }
        return prev + 4;
      });
    }, 60);
  };

  const animateFunnel = () => {
    aiMatchStages.forEach((stage, index) => {
      const timer = setTimeout(() => {
        setFunnelData(prev => {
          if (prev.find(s => s.stage === stage.stage)) {
            return prev;
          }
          return [...prev, stage];
        });
        if (index === aiMatchStages.length - 1) {
          const finalTimer = setTimeout(() => {
            setAiMatchedContacts(mockNetworkContacts);
            setShowContactList(true);
          }, 500);
          funnelTimersRef.current.push(finalTimer);
        }
      }, index * 200);
      funnelTimersRef.current.push(timer);
    });
  };

  return (
    <div className={`job-hall ${mobileDetailJob ? 'mobile-detail-open' : ''} ${mobileListPage ? 'mobile-list-open' : ''}`}>
      {showOrderNotice && pendingOrderJob && (
        <div className="order-notice-overlay" role="dialog" aria-modal="true" aria-label="接单确认">
          <section className="order-notice-sheet">
            <header>
              <strong>接单确认</strong>
              <button type="button" onClick={() => setShowOrderNotice(false)} aria-label="关闭">×</button>
            </header>

            <div className="order-notice-scroll">
              <section className="order-group-card">
                <h2>长按识别进项目群</h2>
                <p>发单方/职位PM快速反馈，项目资讯实时通知</p>
                <div className="order-qr" aria-label="项目群二维码">
                  {Array.from({ length: 49 }).map((_, index) => (
                    <span key={index} className={(index % 3 === 0 || index % 8 === 0 || index === 24) ? 'dark' : ''}></span>
                  ))}
                  <i>聊</i>
                </div>
              </section>

              <p className="order-notice-intro">
                接单前请先仔细阅读做单须知和佣金规则，佣金凭证将在 offer 确认后发送至你的邮箱。
              </p>

              <section className="order-rule-block">
                <h3>佣金规则</h3>
                <dl>
                  <div><dt>接单职位</dt><dd>{pendingOrderJob.title}</dd></div>
                  <div><dt>预计佣金</dt><dd>{pendingOrderJob.bonus}</dd></div>
                  <div><dt>支付分期方式</dt><dd>共1期</dd></div>
                  <div><dt>平台支付周期</dt><dd>过保后，且收到接单方发票确认无误后，10个工作日内</dd></div>
                  <div><dt>保证期定义</dt><dd>入职后3个月</dd></div>
                  <div><dt>退款规则</dt><dd>如候选人保证期内离职，接单方公司需在15个工作日内向平台退回当前订单已收款项。</dd></div>
                </dl>
              </section>

              <section className="order-rule-block">
                <h3>寻访须知</h3>
                <p>必备条件：候选人需满足职位学历、年限和核心技能要求，推荐前请先确认候选人求职意向、授权状态和近期面试安排。</p>
                <p>优先条件：有同类行业项目经验、过往绩效稳定、可快速到岗或沟通反馈及时的候选人优先推荐。</p>
                <p>推荐要求：不得批量占坑，不得提交虚假简历，不得绕开平台私下交易；推荐后请持续跟进候选人状态。</p>
              </section>

              <div className="order-check-list">
                <p><span>✓</span>我已阅读并同意 <em>候选人推荐须知</em>、佣金规则</p>
                <p><span>✓</span>我已阅读“数科个人信息保护协议”并同意授权发布职位到项目同道</p>
              </div>

              <div className="order-sync-banner">
                <strong>大数据职位同步项目群，躺收海量简历</strong>
                <span>首次同步免费领取价值9800元套餐服务</span>
              </div>
            </div>

            <div className="order-notice-actions">
              <button type="button" onClick={confirmOrder}>确认接单</button>
            </div>
          </section>
        </div>
      )}

      {showOrderSuccess && (
        <div className="order-success-toast" role="status">
          <span>✓</span>
          接单成功，请尽快推荐候选人
        </div>
      )}

      {mobileDetailJob && mobileDetailAdvisor && (
        <section className="mobile-job-detail-page" aria-label="职位详情">
          <header className="mobile-detail-top">
            <button type="button" onClick={() => setMobileDetailJob(null)} aria-label="返回首页">‹</button>
            <strong>职位详情</strong>
            <button type="button" className="mobile-detail-more" aria-label="更多操作">•••</button>
          </header>

          <section className="mobile-detail-summary">
            <div className="detail-title-row">
              <div>
                <h1>{mobileDetailJob.title}</h1>
                <div className="detail-tag-row">
                  <span>{mobileDetailSalary}</span>
                  <span>{mobileDetailLocation}</span>
                  <span>{mobileDetailJob.tags.includes('架构设计') ? '本科' : '研究生'}</span>
                  <span>{mobileDetailJob.tags.includes('架构设计') ? '5-8年' : '3-5年'}</span>
                  <span>1人</span>
                </div>
                <div className="detail-badge-row">
                  <span>保回款</span>
                  <span>智联甄选</span>
                  <span>{mobileDetailJob.urgent ? '急招' : '高匹配'}</span>
                </div>
                <p>4天前刷新 / 一个月前发布</p>
              </div>
              <div className="detail-commission">
                <span>佣金</span>
                <strong>{mobileDetailJob.bonus.replace('¥', '')}</strong>
              </div>
            </div>
            <div className="detail-quick-actions">
              <button type="button">咨询</button>
              <button type="button">分享</button>
            </div>
          </section>

          <section className="mobile-detail-publisher">
            <div className="advisor-profile">
              <span className={`publisher-avatar ${mobileDetailAdvisor.tone}`}>{mobileDetailAdvisor.avatar}</span>
              <div>
                <strong>{mobileDetailAdvisor.name} <em>★★★★★</em></strong>
                <p>发单猎企 · {mobileDetailLocation}锐致商务咨询有限公司</p>
              </div>
              <span className="detail-arrow">›</span>
            </div>
            <div className="publisher-service-row">
              <span>简历处理时长：<strong>{mobileDetailAdvisor.speed}</strong></span>
              <span>7天内安排候选人面试</span>
            </div>
            <p>历史评价：<strong>99条</strong>，点击查看详情</p>
          </section>

          <section className="mobile-progress-strip">
            <div><strong>0</strong><span>我的推荐</span></div>
            <div><strong>0</strong><span>初筛中</span></div>
            <div><strong>0</strong><span>流程中</span></div>
            <div><strong>0</strong><span>流程中止</span></div>
            <span className="detail-arrow">›</span>
          </section>

          <nav className="mobile-detail-tabs" aria-label="职位详情分栏">
            {mobileDetailTabs.map((tab) => (
              <button
                type="button"
                key={tab.key}
                className={mobileDetailTab === tab.key ? 'active' : ''}
                onClick={() => setMobileDetailTab(tab.key)}
              >
                {tab.label}
                {tab.badge && <span>{tab.badge}</span>}
              </button>
            ))}
          </nav>

          {mobileDetailTab === 'job' && (
            <section className="mobile-detail-content">
              <section className="mobile-detail-block">
                <h2>寻访须知</h2>
                <dl className="notice-table">
                  <div><dt>必备条件</dt><dd>一定要统招硕士，精通 {mobileDetailJob.tags[0]}，有完整项目交付经验。</dd></div>
                  <div><dt>优先条件</dt><dd>有政务、金融或大交通项目经验者优先；能承担原型设计、跨部门协调和上线推进。</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>JD基本信息</h2>
                <h3>岗位职责：</h3>
                <p>
                  1、负责核心系统与业务模块的设计、开发、维护与优化，构建稳定、高效、可扩展的交付方案；
                  2、参与需求评审、方案设计和技术难点攻关，保证数据、接口和流程及时准确同步；
                  3、负责项目日常监控、问题排查、性能调优和质量复盘，保障服务 SLA；
                  4、与产品、数据分析、业务方紧密协作，输出可靠解决方案并推动上线；
                  5、沉淀可复用组件和标准化交付文档，帮助团队提升整体交付效率。
                </p>
                <h3>任职要求：</h3>
                <p>
                  1、{mobileDetailJob.tags.includes('架构设计') ? '本科及以上学历，5年以上相关经验' : '硕士及以上学历，3年以上相关经验'}；
                  2、熟悉 {mobileDetailJob.tags.join('、')}，具备扎实的编码能力和良好工程习惯；
                  3、具备出色的逻辑分析、问题排查和沟通推动能力，能独立解决复杂技术问题；
                  4、责任心强，对业务交付有结果意识，愿意持续学习行业新技术。
                </p>
                <dl className="detail-line-list">
                  <div><dt>所属行业</dt><dd>{mobileDetailIndustry}、系统集成、人工智能、云计算、大数据</dd></div>
                  <div><dt>职能类型</dt><dd>{mobileDetailJob.title}</dd></div>
                  <div><dt>工作城市</dt><dd>{mobileDetailLocation}，招聘1人，详细地址：{mobileDetailLocation}市核心商务区1号</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>职位要求</h2>
                <dl className="detail-line-list">
                  <div><dt>学历要求</dt><dd>{mobileDetailJob.tags.includes('架构设计') ? '本科 · 统招' : '研究生 · 统招'}</dd></div>
                  <div><dt>工作年限</dt><dd>{mobileDetailJob.tags.includes('架构设计') ? '5-8年' : '3-5年'}</dd></div>
                  <div><dt>技能/证书</dt><dd>{mobileDetailJob.tags.join('、')}</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>薪资福利</h2>
                <dl className="detail-line-list">
                  <div><dt>职位年薪</dt><dd>{mobileDetailSalary} · {mobileDetailJob.salary.includes('16') ? '16薪' : '13薪'}</dd></div>
                  <div><dt>薪酬福利</dt><dd>五险一金、绩效奖金、带薪年假、项目奖金</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>团队架构</h2>
                <dl className="detail-line-list">
                  <div><dt>所属部门</dt><dd>业务技术中心</dd></div>
                  <div><dt>汇报对象</dt><dd>技术负责人 / 业务负责人</dd></div>
                  <div><dt>下属人数</dt><dd>-</dd></div>
                  <div><dt>职级职称</dt><dd>专家 / 高级专家</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>面试信息</h2>
                <dl className="detail-line-list">
                  <div><dt>面试轮次</dt><dd>2轮</dd></div>
                  <div><dt>视频面试</dt><dd>可接受</dd></div>
                  <div><dt>面试流程</dt><dd>业务初面 - 技术复试 - HR沟通</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>推荐报告</h2>
                <p className="report-tip">该职位不强制上传推荐报告，但必问问题和推荐理由会影响分成，请按要求完成。</p>
                <div className="report-flow">
                  <span>确认付款信息</span>
                  <span>提交简历&回答必问问题</span>
                  <span>上传推荐报告</span>
                </div>
              </section>
            </section>
          )}

          {mobileDetailTab === 'company' && (
            <section className="mobile-detail-content">
              <section className="mobile-detail-block company-verified">
                <div className="company-verify-head">
                  {mobileDetailJob.companyLogo ? (
                    <img src={mobileDetailJob.companyLogo} alt={mobileDetailJob.company} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <span>{mobileDetailJob.company[0]}</span>
                  )}
                  <em>认证企业</em>
                </div>
                <h2>基本信息</h2>
                <dl className="detail-line-list">
                  <div><dt>公司全称</dt><dd>{mobileDetailCompany}</dd></div>
                  <div><dt>公司简称</dt><dd>{mobileDetailJob.company}</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>详细介绍</h2>
                <p>
                  {mobileDetailCompany}主营业务为{mobileDetailIndustry}系统及相关配套设施的研发和销售，
                  提供软件平台、数据服务、行业解决方案和项目实施服务。公司自成立以来持续投入产品研发，
                  在核心客户场景中形成稳定交付能力。
                </p>
                <dl className="detail-line-list">
                  <div><dt>公司官网</dt><dd>https://www.renren-hunt.com/company/{mobileDetailJob.company}</dd></div>
                  <div><dt>百度百科</dt><dd>https://baike.baidu.com/item/{mobileDetailCompany}</dd></div>
                </dl>
              </section>
            </section>
          )}

          {mobileDetailTab === 'commission' && (
            <section className="mobile-detail-content">
              <section className="mobile-detail-block">
                <div className="detail-card-title">
                  <h2>接单方预计佣金</h2>
                  <button type="button">留意其他分档</button>
                </div>
                <dl className="commission-table">
                  <div><dt>佣金分档</dt><dd className="commission-band">{mobileDetailSalary || '35万'}≤税前年薪</dd></div>
                  <div><dt>佣金规则</dt><dd>按候选人税前年薪的 {mobileDetailCommissionRate}</dd></div>
                  <div><dt>年薪计算方式</dt><dd>标准月薪 * {mobileDetailJob.salary.includes('16') ? '16' : '12'}</dd></div>
                  <div><dt>支付分期方式</dt><dd>共1期</dd></div>
                  <div><dt>平台方支付周期</dt><dd>过保后，且收到接单方发票确认无误后，10个工作日内</dd></div>
                  <div><dt>保证期定义</dt><dd>入职后6个月</dd></div>
                  <div><dt>备注信息</dt><dd>-</dd></div>
                  <div><dt>退款规则</dt><dd>如候选人保证期内离职，接单方公司需在15个工作日内向平台退回当前订单已收款项。</dd></div>
                </dl>
              </section>

              <section className="mobile-detail-block">
                <h2>接单方实际佣金</h2>
                <h3>预计最高佣金</h3>
                <p>根据职位的年薪范围，代入预计佣金的规则。计算后取最优情况，仅作参考。</p>
                <h3>接单方初算佣金</h3>
                <p>根据候选人入职时的年薪/月薪/客户定档，代入预计佣金规则计算后，再扣除6%的平台税点得出。</p>
                <h3>接单方开具的是增值税专用发票时</h3>
                <p>接单方实际佣金（含税）= 接单方初算佣金 *（1 + 接单方税点）</p>
                <h3>接单方开具的是增值税普通发票时</h3>
                <p>接单方实际佣金（含税）= 接单方初算佣金</p>
              </section>

              <section className="mobile-detail-block">
                <h2>更多条款</h2>
                <ol className="detail-clause-list">
                  <li>上述内容部分摘自发单方提交的客户合同条款。</li>
                  <li>上述内容如有退款、补充推荐、抵扣等条款，接单方同样有相关义务。</li>
                  <li>更多细则以接单后平台生成的《佣金规则凭证》为准，做单前请先阅读确认。</li>
                </ol>
              </section>
            </section>
          )}

          {mobileDetailTab === 'reviews' && (
            <section className="mobile-detail-content">
              <div className="review-filter-row">
                <button className="active">全部(99)</button>
                <button>好评(99)</button>
                <button>一般(0)</button>
                <button>差评(0)</button>
                <button>有文字(36)</button>
              </div>
              {[
                ['赵顾问', mobileDetailJob.title, '高度配合', '响应迅速，沟通顺畅，解决问题及时，业务能力强。', '2026-06-02'],
                ['匿名', mobileDetailJob.title, '职位需求清晰', '非常专业，很有耐心，项目真实可靠，反馈及时。', '2026-06-02'],
                ['崔顾问', mobileDetailJob.title, '快速反馈,非常专业,高度配合,职位需求清晰,耐心指导', 'JD 细节完整，候选人推荐后的状态同步清楚，合作体验稳定。', '2026-06-01'],
              ].map(([name, title, tags, content, date]) => (
                <article className="review-item" key={`${name}-${date}`}>
                  <div className="review-avatar">{name.slice(0, 1)}</div>
                  <div>
                    <header>
                      <strong>{name}</strong>
                      <span>{date}</span>
                    </header>
                    <p className="review-position">合作职位：{title}</p>
                    <p className="review-stars">★★★★★</p>
                    <div className="review-tags">
                      {tags.split(',').map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                    <p>{content}</p>
                  </div>
                </article>
              ))}
            </section>
          )}

          <div className="mobile-detail-actions">
            <button type="button"><span>☆</span>收藏</button>
            <button type="button"><span className="detail-icon chat-icon" aria-hidden="true"></span>聊天</button>
            <button type="button"><span className="detail-icon phone-icon" aria-hidden="true"></span>电话</button>
            <button type="button" className="primary" onClick={runAIScan}>立即推人</button>
          </div>
        </section>
      )}

      {mobileListPage === 'subscription' && !mobileDetailJob && (
        <section className={`mobile-subscription-page ${mobileSubscriptionMode === 'form' ? 'form-mode' : ''}`} aria-label="我的订阅">
          <header className="mobile-list-top">
            <button
              type="button"
              onClick={() => {
                if (mobileSubscriptionMode === 'form') {
                  setMobileSubscriptionMode('empty');
                } else {
                  setMobileListPage(null);
                }
              }}
              aria-label="返回首页"
            >
              ‹
            </button>
            <strong>我的订阅</strong>
            <button type="button" className="mobile-detail-more" aria-label="更多操作">•••</button>
          </header>

          {mobileSubscriptionMode === 'empty' ? (
            <div className="subscription-empty-card">
              <div className="subscription-empty-illustration" aria-hidden="true">
                <span></span>
                <i></i>
                <b></b>
              </div>
              <p>您还没有设置订阅条件，暂未匹配职位</p>
              <button type="button" onClick={() => setMobileSubscriptionMode('form')}>立即订阅</button>
            </div>
          ) : (
            <div className="subscription-form">
              {[
                ['职位名称', '请选择职位名称'],
                ['行业', '请选择行业'],
                ['职能', '请选择职能'],
                ['城市', '请选择城市'],
                ['用人公司', '请选择用人公司'],
              ].map(([label, placeholder]) => (
                <button type="button" className="subscription-field" key={label}>
                  <span>{label}</span>
                  <strong>{placeholder}</strong>
                  <em>›</em>
                </button>
              ))}

              <div className="subscription-message-row">
                <div>
                  <strong>接收订阅消息</strong>
                  <p>关注人人猎服务号，每周一9:00推送订阅职位动态</p>
                </div>
                <button type="button" className="subscription-switch" aria-label="接收订阅消息"></button>
              </div>

              <div className="subscription-qr" aria-label="服务号二维码">
                {Array.from({ length: 49 }).map((_, index) => (
                  <span key={index} className={(index * 7 + index) % 5 === 0 || index % 8 === 0 ? 'dark' : ''}></span>
                ))}
                <i>微</i>
              </div>

              <button type="button" className="subscription-save" onClick={() => setMobileSubscriptionMode('empty')}>保存</button>
            </div>
          )}
        </section>
      )}

      {mobileListPage && !mobileDetailJob && mobileListPage !== 'dispatch' && mobileListPage !== 'subscription' && (
        <section className="mobile-job-list-page" aria-label={mobileListTitles[mobileListPage]}>
          <header className="mobile-list-top">
            <button type="button" onClick={() => setMobileListPage(null)} aria-label="返回首页">‹</button>
            <strong>{mobileListTitles[mobileListPage]}</strong>
            <button type="button" className="mobile-detail-more" aria-label="更多操作">•••</button>
          </header>

          <div className="mobile-list-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="请输入职位/用人企业/城市/JD 信息"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mobile-list-filters">
            {['城市', '职位类型', '年薪', '工作年限', '排序'].map((filter) => (
              <button type="button" key={filter}>{filter}<span>⌄</span></button>
            ))}
          </div>

          <div className="mobile-list-chips">
            {[
              ['fresh', '本周上新'],
              ['sss', 'SSS级职位'],
              ['select', '智联甄选'],
              ['pay', '一期付款'],
              ['refund', '反悔包退'],
            ].map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={(mobileListPage === key || (mobileListPage === 'all' && key === 'sss')) ? 'active' : ''}
                onClick={() => {
                  if (key === 'fresh') setMobileListPage('fresh');
                  if (key === 'select') setMobileListPage('select');
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mobile-list-feed">
            {mobileFilteredListJobs.map((job) => {
              const advisor = getAdvisorForJob(job);
              return (
                <article className="mobile-list-job" key={`mobile-list-${job.id}`} onClick={() => openMobileJobDetail(job)}>
                  <div className="mobile-list-job-head">
                    <h2>{job.title}</h2>
                    <span>佣金 <strong>{job.bonus.replace('¥', '')}</strong></span>
                  </div>
                  <div className="mobile-list-tags">
                    <span>{job.salary}</span>
                    <span>{job.location}</span>
                    <span>{job.tags[0]}</span>
                    <span>{job.tags[1] || '3-5年'}</span>
                    <span>{job.tags[3] || '1人'}</span>
                  </div>
                  <p>{job.company}</p>
                  <footer>
                    <div>
                      <span className={`publisher-avatar small ${advisor.tone}`}>{advisor.avatar}</span>
                      <em>{advisor.name}</em>
                      <b>{job.deadline || '在线可聊'}</b>
                    </div>
                    <button
                      type="button"
                      className={job.match >= 90 ? 'online' : ''}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (job.match >= 90) {
                          openMobileJobDetail(job);
                        } else {
                          beginOrderFlow(job);
                        }
                      }}
                    >
                      {job.match >= 90 ? '立即推人' : '立即接单'}
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {mobileListPage === 'dispatch' && !mobileDetailJob && (
        <section className="mobile-dispatch-page" aria-label="派单中心">
          <header className="mobile-list-top">
            <button type="button" className="home-back" onClick={() => setMobileListPage(null)} aria-label="返回首页">⌂</button>
            <strong>派单中心</strong>
            <button type="button" className="mobile-detail-more" aria-label="更多操作">•••</button>
          </header>

          <div className="dispatch-tip">
            <span>i</span>
            以下职位是根据您的 <button type="button">做单偏好</button>，邀约您做单
          </div>

          <div className="dispatch-group-list">
            {mobileDispatchGroups.map((group) => (
              <section className="dispatch-publisher-card" key={group.id}>
                <header>
                  <span className="dispatch-avatar">{group.avatar}</span>
                  <div>
                    <strong>{group.name}</strong>
                    <p>{group.company}</p>
                  </div>
                  <aside>
                    <em>向你发来 {group.count}个职位</em>
                    <time>{group.date}</time>
                  </aside>
                </header>

                <div className="dispatch-card-jobs">
                  {group.jobs.map((job) => (
                    <article className="dispatch-job-card" key={`dispatch-${job.id}`} onClick={() => openMobileJobDetail(job)}>
                      <div className="mobile-list-job-head">
                        <h2>{job.title}</h2>
                        <span>佣金 <strong>{job.bonus.replace('¥', '')}</strong></span>
                      </div>
                      <div className="mobile-list-tags">
                        <span>{job.salary}</span>
                        {job.tags.map(tag => <span key={`${job.id}-${tag}`}>{tag}</span>)}
                      </div>
                      <p>{job.company}</p>
                      <footer>
                        <button
                          type="button"
                          className="ghost"
                          onClick={(event) => event.stopPropagation()}
                        >
                          不接
                        </button>
                        <button
                          type="button"
                          className="online"
                          onClick={(event) => {
                            event.stopPropagation();
                            beginOrderFlow(job);
                          }}
                        >
                          立即接单
                        </button>
                      </footer>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}

      <section className="mobile-hewa-home" aria-label="推荐人首页">
        <header className="mobile-hewa-header">
          <div className="mobile-hewa-brand">
            <img src="/logo.png" alt="人人猎" />
            <div>
              <strong>人人猎</strong>
              <span>想成单 就成单 推荐人才上人人猎</span>
            </div>
          </div>
          <button className="mobile-hewa-more" aria-label="更多操作">•••</button>
        </header>

        <div className="mobile-hewa-search">
          <div className="search-input-wrapper">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="请输入职位/用人企业/城市/JD 信息"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>

        <button className="mobile-hewa-hero" onClick={() => setActiveSection('dispatch')}>
          <span>接单推荐排位赛</span>
          <strong>推荐越准 奖励越高</strong>
          <em>高佣职位 · 直营反馈 · 新人扶持</em>
        </button>

        <div className="mobile-hewa-entrances">
          {mobileEntrances.map((item, index) => (
            <button
              key={item.label}
              className={`mobile-hewa-entry entry-${index + 1}`}
              onClick={() => openMobileListPage(item)}
            >
              <span>{item.icon}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>

        <button className="mobile-invite-strip" onClick={runAIScan}>
          <span className="mobile-bot-face">AI</span>
          <strong>邀你做单</strong>
          <em>{hotJob.title} · 佣金 {hotJob.bonus}</em>
          <span className="strip-arrow">›</span>
        </button>

        <section className="mobile-publisher-card">
          <div className="mobile-section-title">
            <h2>发单方</h2>
            <div className="publisher-avatars" aria-label="刚刚活跃的发单方">
              {activePublishers.map((publisher) => (
                <span className={`publisher-avatar ${publisher.tone}`} key={publisher.name}>
                  {publisher.name.slice(0, 1)}
                </span>
              ))}
            </div>
          </div>
          <div className="publisher-job-row">
            {mobileSpotlightJobs.map((job) => (
              <button
                key={`spotlight-${job.id}`}
                className="publisher-job-card"
                onClick={() => {
                  setActiveZone(job.zone);
                  openMobileJobDetail(job);
                }}
              >
                <strong>{job.title}</strong>
                <span>佣金 <em>{job.bonus.replace('¥', '')}</em></span>
                <small>{job.location} · {job.salary}</small>
                <p>{job.company}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mobile-special-card">
          <h2>专场职位</h2>
          <div className="mobile-special-row">
            {specialCampaigns.slice(0, 3).map((campaign) => (
              <button
                key={`mobile-${campaign.title}`}
                className={`mobile-special-banner ${campaign.tone}`}
                onClick={() => setActiveSection('dispatch')}
              >
                <span>{campaign.tag}</span>
                <strong>{campaign.title}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="mobile-job-feed">
          <div className="mobile-job-tabs">
            <button className={activeZone === 'all' ? 'active' : ''} onClick={() => setActiveZone('all')}>全部职位</button>
            <button className={activeZone === 'vertical' ? 'active' : ''} onClick={() => setActiveZone('vertical')}>最新发布</button>
            <button
              className={mobileListPage === 'subscription' ? 'active' : ''}
              onClick={() => {
                setMobileSubscriptionMode('empty');
                setMobileListPage('subscription');
              }}
            >
              我的订阅
            </button>
          </div>

          <div className="mobile-job-list">
            {mobileHotJobs.map((job) => (
              <article
                className="mobile-job-card"
                key={`mobile-job-${job.id}`}
                onClick={() => openMobileJobDetail(job)}
              >
                <div className="mobile-job-card-head">
                  <h3>{job.title}</h3>
                  <span>佣金 <strong>{job.bonus.replace('¥', '')}</strong></span>
                </div>
                <div className="mobile-job-tags">
                  <span>{job.salary}</span>
                  <span>{job.location}</span>
                  <span>{job.tags[0]}</span>
                  <span>{job.deadline}</span>
                </div>
                <p>{job.company}</p>
                <div className="mobile-job-footer">
                  <div>
                    <span className="publisher-avatar small">{job.company.slice(0, 1)}</span>
                    <span>{job.urgent ? '在线可聊' : '顾问在线'}</span>
                  </div>
                  <button
                    className={job.match >= 90 ? 'online' : ''}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (job.match >= 90) {
                        openMobileJobDetail(job);
                      } else {
                        beginOrderFlow(job);
                      }
                    }}
                  >
                    {job.match >= 90 ? '立即推人' : '立即接单'}
                  </button>
                </div>
              </article>
            ))}
            {mobileHotJobs.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>暂无匹配职位</p>
                <p className="empty-hint">换个关键词再试试</p>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="recommender-console">
        <div className="console-left">
          <div className="console-brand">
            <img src="/logo.png" alt="人人猎" />
            <span>人人猎推荐人端</span>
          </div>
          <h1>免费注册人人猎，<br className="mobile-title-break" />接优质职位单</h1>
          <p>
            聚合企业岗位、猎企派单和人人推荐网络，推荐人可以筛选职位、扫描人脉、
            发起推荐并追踪奖励结算。
          </p>

          <div className="trust-grid">
            {trustSignals.map((item) => (
              <div className="trust-signal" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="service-points">
            <span>重点岗位收到首份推荐均值 &lt; 19 小时</span>
            <span>接单与发单双向服务满意度 98%+</span>
          </div>
        </div>

        <aside className="console-card">
          <div className="console-card-head">
            <div>
              <span className="console-kicker">今日接单身份</span>
              <h2>S 级推荐人</h2>
            </div>
            <span className="online-dot">在线</span>
          </div>

          <div className="console-tasks">
            {consoleTasks.map((task) => (
              <div className={`console-task ${task.tone}`} key={task.label}>
                <strong>{task.value}</strong>
                <span>{task.label}</span>
              </div>
            ))}
          </div>

          <div className="qr-login-card">
            <div className="fake-qr" aria-label="微信扫码入口">
              {Array.from({ length: 25 }).map((_, index) => (
                <span key={index} className={index % 3 === 0 || index % 7 === 0 ? 'dark' : ''} />
              ))}
            </div>
            <div>
              <strong>微信扫码同步人脉</strong>
              <span>登录后可接单、推荐、查奖励</span>
            </div>
          </div>

          <button className="console-primary" onClick={runAIScan}>扫描我的人脉</button>
        </aside>
      </section>

      <section className="doing-board">
        <div className="weekly-card">
          <div className="weekly-head">
            <span>本周数据</span>
            <strong>Hi 李小牛，本周做单进度</strong>
          </div>
          <div className="weekly-stats">
            {weeklyStats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <button
            className="start-order-btn"
            onClick={() => {
              setActiveSection('dispatch');
              setActiveZone('all');
            }}
          >
            开始做单
          </button>
        </div>

        <div className="service-upgrade-banner">
          <span>平台服务升级</span>
          <strong>优质发单方 · 放单有保障 · 推荐反馈更快</strong>
          <p>人人猎将优先展示佣金清晰、反馈稳定、交付规则明确的职位。</p>
        </div>
      </section>

      <section className="workbench-strip">
        <div>
          <span>当前推荐</span>
          <strong>{submittedCount} 人</strong>
        </div>
        <div>
          <span>本周热单</span>
          <strong>{hotJob.title}</strong>
        </div>
        <div>
          <span>最高悬赏</span>
          <strong>{highestBonus.bonus}</strong>
        </div>
      </section>

      <section className="special-campaigns">
        <div className="module-heading">
          <h2>专场职位</h2>
          <span>先从高确定性专区开始接单</span>
        </div>
        <div className="campaign-grid">
          {specialCampaigns.map((campaign, index) => (
            <button
              key={campaign.title}
              className={`campaign-card ${campaign.tone}`}
              onClick={() => {
                setActiveSection(index === 3 ? 'grab' : 'dispatch');
                setActiveZone(index === 2 ? 'sme' : index === 3 ? 'all' : 'vertical');
              }}
            >
              <span>{campaign.tag}</span>
              <strong>{campaign.title}</strong>
              <em>{campaign.desc}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="quick-job-sections">
        <div className="quick-job-panel">
          <div className="module-heading compact">
            <h2>为你推荐</h2>
            <button onClick={() => setActiveSection('dispatch')}>更多推荐</button>
          </div>
          <div className="mini-job-list">
            {recommendedJobs.map((job) => (
              <button
                className="mini-job-card"
                key={`recommend-${job.id}`}
                onClick={() => {
                  setActiveSection('dispatch');
                  setActiveZone('all');
                  openMobileJobDetail(job);
                }}
              >
                <strong>{job.title}</strong>
                <span>{job.bonus} · {job.location} · {job.salary}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="quick-job-panel">
          <div className="module-heading compact">
            <h2>本周上新</h2>
            <button onClick={() => setActiveSection('dispatch')}>更多上新</button>
          </div>
          <div className="mini-job-list">
            {freshJobs.map((job) => (
              <button
                className="mini-job-card"
                key={`fresh-${job.id}`}
                onClick={() => {
                  setActiveSection('dispatch');
                  setActiveZone(job.zone);
                  openMobileJobDetail(job);
                }}
              >
                <strong>{job.title}</strong>
                <span>{job.bonus} · {job.location} · {job.company}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 专区切换 */}
      <div className="zone-tabs">
        <button
          className={`zone-tab ${activeZone === 'all' ? 'active' : ''}`}
          onClick={() => {
            setActiveZone('all');
            setSelectedJob(null);
          }}
        >
          <span className="zone-icon">🌐</span>
          全部职位
        </button>
        <button
          className={`zone-tab ${activeZone === 'overseas' ? 'active' : ''}`}
          onClick={() => {
            setActiveZone('overseas');
            setSelectedJob(null);
          }}
        >
          <span className="zone-icon">✈️</span>
          出海专区
          <span className="zone-badge">🔥 高薪3倍起</span>
        </button>
        <button
          className={`zone-tab ${activeZone === 'sme' ? 'active' : ''}`}
          onClick={() => {
            setActiveZone('sme');
            setSelectedJob(null);
          }}
        >
          <span className="zone-icon">🏢</span>
          中小企业
          <span className="zone-badge">📈 费率优惠</span>
        </button>
        <button
          className={`zone-tab ${activeZone === 'vertical' ? 'active' : ''}`}
          onClick={() => {
            setActiveZone('vertical');
            setSelectedJob(null);
          }}
        >
          <span className="zone-icon">🎯</span>
          垂直领域
        </button>
      </div>

      {activeZone === 'overseas' && (
        <div className="zone-intro">
          <div className="intro-card">
            <span className="intro-icon">🌏</span>
            <div className="intro-content">
              <h3>出海招聘蓝海</h3>
              <p>针对75%出海企业海外人才短缺，薪酬溢价3倍起，平台成单率≥25%</p>
            </div>
            <div className="intro-stats">
              <div className="stat">
                <span className="num">3×</span>
                <span className="lbl">薪酬溢价</span>
              </div>
              <div className="stat">
                <span className="num">25%+</span>
                <span className="lbl">成单率</span>
              </div>
              <div className="stat">
                <span className="num">0.3%</span>
                <span className="lbl">纠纷率</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeZone === 'sme' && (
        <div className="zone-intro">
          <div className="intro-card">
            <span className="intro-icon">🏢</span>
            <div className="intro-content">
              <h3>中小企业服务专区</h3>
              <p>灵活用工需求激增58%，15%起透明费率，T+3快速结算</p>
            </div>
            <div className="intro-stats">
              <div className="stat">
                <span className="num">15%</span>
                <span className="lbl">起透明费率</span>
              </div>
              <div className="stat">
                <span className="num">T+3</span>
                <span className="lbl">快速结算</span>
              </div>
              <div className="stat">
                <span className="num">58%</span>
                <span className="lbl">需求增长</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeZone === 'vertical' && (
        <div className="zone-intro">
          <div className="intro-card">
            <span className="intro-icon">🎯</span>
            <div className="intro-content">
              <h3>垂直领域深耕</h3>
              <p>AI、芯片、新能源、生物医药等细分赛道专业化服务，匹配精度98.7%</p>
            </div>
            <div className="intro-stats">
              <div className="stat">
                <span className="num">98.7%</span>
                <span className="lbl">匹配精度</span>
              </div>
              <div className="stat">
                <span className="num">4</span>
                <span className="lbl">核心赛道</span>
              </div>
              <div className="stat">
                <span className="num">专业</span>
                <span className="lbl">认证加成</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section-tabs">
        <button
          className={`tab ${activeSection === 'dispatch' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('dispatch');
            setSelectedJob(null);
          }}
        >
          <span className="tab-icon">🎯</span>
          派单专区
          <span className="tab-badge">{dispatchCount}</span>
        </button>
        <button
          className={`tab ${activeSection === 'grab' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('grab');
            setSelectedJob(null);
          }}
        >
          <span className="tab-icon">⚡</span>
          抢单专区
          <span className="tab-badge secondary">{grabCount}</span>
        </button>
        <button
          className={`tab ${activeSection === 'privilege' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('privilege');
            setSelectedJob(null);
          }}
        >
          <span className="tab-icon">💎</span>
          特权中心
        </button>
      </div>

      {activeSection === 'privilege' && (
        <div className="privilege-section">
          <div className="privilege-header">
            <h2>💎 推手特权</h2>
            <p>解锁高级功能，提升抢单成功率</p>
          </div>
          <div className="privilege-grid">
            <div className="privilege-card featured">
              <div className="card-badge hot">🔥 爆款</div>
              <div className="card-icon">⚡</div>
              <h3>抢单加速卡</h3>
              <p className="card-desc">优质职位优先推送，抢先一步联系候选人</p>
              <div className="card-features">
                <span>✓ 提前5分钟推送</span>
                <span>✓ 专属消息提示</span>
                <span>✓ 优先派单权重</span>
              </div>
              <div className="card-price">
                <span className="price">¥9.9</span>
                <span className="period">/ 次</span>
              </div>
              <button className="btn-buy" onClick={() => alert('✅ 购买成功！\n\n抢单加速卡已添加到您的账户\n有效期限：24小时')}>立即购买</button>
            </div>
            <div className="privilege-card">
              <div className="card-badge">👁️ 热销</div>
              <div className="card-icon">🔍</div>
              <h3>线索透视镜</h3>
              <p className="card-desc">候选人求职状态及竞争力分析</p>
              <div className="card-features">
                <span>✓ 求职状态实时追踪</span>
                <span>✓ 竞争力分析报告</span>
              </div>
              <div className="card-price">
                <span className="price">¥49</span>
                <span className="period">/ 月</span>
              </div>
              <button className="btn-buy" onClick={() => alert('✅ 购买成功！\n\n线索透视镜已开通\n到期时间：2026-05-06')}>立即购买</button>
            </div>
            <div className="privilege-card locked">
              <div className="card-icon">🔒</div>
              <h3>严选模式</h3>
              <p className="card-desc">仅对S级推手开放，按年薪15%-20%收费</p>
              <div className="card-features">
                <span>✓ 高端职位推送</span>
                <span>✓ 专属客服通道</span>
                <span>✓ 优先面试安排</span>
              </div>
              <div className="card-price">
                <span className="price locked">暂无权限</span>
              </div>
              <button className="btn-buy locked" disabled>提升等级解锁</button>
            </div>
          </div>
          <div className="privilege-level">
            <h3>📊 我的特权等级</h3>
            <div className="level-progress">
              <div className="level-info">
                <span className="level-name">A级推手</span>
                <span className="level-score">78分 (距S级还差22分)</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="level-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>每日抢单上限 10 单</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>优先查看新职位</span>
              </div>
              <div className="benefit-item locked">
                <span className="benefit-icon">🔒</span>
                <span>严选模式（需S级）</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {aiScanning && (
        <div className="ai-scan-overlay">
          <div className="ai-scan-modal">
            <div className="ai-scan-header">
              <div className="ai-icon">🤖</div>
              <h3>AI 正在扫描你的人脉网络</h3>
              <p>基于 LLM 大模型分析通讯录、社交关系、技能图谱</p>
            </div>
            <div className="ai-scan-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${scanProgress}%` }}></div>
              </div>
              <div className="progress-text">
                <span>扫描进度</span>
                <span className="progress-percent">{scanProgress}%</span>
              </div>
            </div>
            <div className="scan-stages">
              <div className={`scan-stage ${scanProgress > 20 ? 'complete' : ''}`}>
                <span className="stage-icon">📱</span>
                <span>分析通讯录</span>
              </div>
              <div className={`scan-stage ${scanProgress > 40 ? 'complete' : ''}`}>
                <span className="stage-icon">⚡</span>
                <span>技能画像</span>
              </div>
              <div className={`scan-stage ${scanProgress > 60 ? 'complete' : ''}`}>
                <span className="stage-icon">🎯</span>
                <span>意向评估</span>
              </div>
              <div className={`scan-stage ${scanProgress > 80 ? 'complete' : ''}`}>
                <span className="stage-icon">📊</span>
                <span>匹配排序</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAIFunnel && (
        <div className="ai-funnel-section">
          <div className="funnel-header">
            <h3>🤖 AI 智能匹配</h3>
            <p>从 892 人脉中发现 45 位潜在候选人</p>
          </div>
          <div className="funnel-chart">
            {funnelData.map((stage, index) => (
              <div 
                key={`${stage.stage}-${index}`} 
                className={`funnel-stage ${index === funnelData.length - 1 ? 'final' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="funnel-bar">
                  <div className="funnel-info">
                    <span className="funnel-icon">{stage.icon}</span>
                    <div className="funnel-text">
                      <span className="funnel-label">{stage.stage}</span>
                      <span className="funnel-desc">{stage.desc}</span>
                    </div>
                  </div>
                  <span className="funnel-count">{stage.count}人</span>
                </div>
                {index < funnelData.length - 1 && (
                  <div className="funnel-arrow">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showContactList && (
        <div className="ai-contact-section">
          <div className="ai-contact-header">
            <div className="ai-contact-title">
              <span className="ai-badge">🤖 AI</span>
              <h3>智能匹配的候选人</h3>
            </div>
            <p className="ai-contact-desc">根据你的职位定向圈层，AI 从你的人脉网络中筛选出以下候选人</p>
          </div>
          <div className="ai-contact-list">
            {aiMatchedContacts.map((contact, index) => (
              <div 
                key={contact.id} 
                className="ai-contact-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {contact.avatar ? (
                  <img src={contact.avatar} alt={contact.name} className="ai-contact-avatar-img" />
                ) : (
                  <div className="ai-contact-avatar">{contact.name[0]}</div>
                )}
                <div className="ai-contact-info">
                  <div className="ai-contact-name-row">
                    <span className="ai-contact-name">{contact.name}</span>
                    <span className={`ai-circle-badge ai-circle-${contact.circle}`}>{contact.circle}</span>
                  </div>
                  <span className="ai-contact-position">{contact.title} · {contact.company}</span>
                  <div className="ai-contact-meta">
                    <span className="ai-relation">👥 {contact.relation}</span>
                    <div className="ai-contact-skills">
                      {contact.skills.map((skill, i) => (
                        <span key={i} className="ai-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  className="ai-btn-invite"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedContact(contact);
                    setShowRecommendModal(true);
                  }}
                >
                  🎯 发起推荐
                </button>
              </div>
            ))}
          </div>
          <div className="ai-contact-summary">
            <span>📊 已去除 {publishedJobs.length * 2} 位重复人脉（保留最新关系）</span>
          </div>
        </div>
      )}

      {showRecommendModal && selectedContact && (
        <div className="recommend-modal-overlay" onClick={() => setShowRecommendModal(false)}>
          <div className="recommend-modal" onClick={e => e.stopPropagation()}>
            <div className="recommend-header">
              <h3>🎯 发起推荐</h3>
              <button className="close-btn" onClick={() => setShowRecommendModal(false)}>✕</button>
            </div>
            
            <div className="recommend-body">
              <div className="candidate-preview">
                {selectedContact.avatar ? (
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="preview-avatar-img" />
                ) : (
                  <div className="preview-avatar">{selectedContact.name[0]}</div>
                )}
                <div className="preview-info">
                  <span className="preview-name">{selectedContact.name}</span>
                  <span className="preview-title">{selectedContact.title} · {selectedContact.company}</span>
                  <div className="preview-skills">
                    {selectedContact.skills.map((skill, i) => (
                      <span key={i} className="preview-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rating-section">
                <h4>📝 对候选人点评</h4>
                <p className="rating-desc">您的评价将帮助企业快速了解候选人匹配度（候选人不可见）</p>
                
                <div className="rating-item">
                  <label>技能匹配度</label>
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        className={`star-btn ${recommendForm.skillMatch >= star ? 'active' : ''}`}
                        onClick={() => setRecommendForm({...recommendForm, skillMatch: star})}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="rating-item">
                  <label>经验匹配度</label>
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        className={`star-btn ${recommendForm.experienceMatch >= star ? 'active' : ''}`}
                        onClick={() => setRecommendForm({...recommendForm, experienceMatch: star})}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="rating-item">
                  <label>发展潜力</label>
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        className={`star-btn ${recommendForm.potential >= star ? 'active' : ''}`}
                        onClick={() => setRecommendForm({...recommendForm, potential: star})}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reason-section">
                <h4>💬 推荐理由（企业可见）</h4>
                <textarea 
                  placeholder="填写您对该候选人的推荐理由，如：共事3年，技术能力出色..."
                  value={recommendForm.recommendation}
                  onChange={e => setRecommendForm({...recommendForm, recommendation: e.target.value})}
                  rows="3"
                ></textarea>
              </div>

              <div className="c2-reason-section">
                <h4>💌 给Candidate的推荐理由（Candidate可见）</h4>
                <textarea 
                  placeholder="填写给候选人的推荐理由，如：这个岗位很适合你，薪资和发展都不错..."
                  value={recommendForm.reasonForC2}
                  onChange={e => setRecommendForm({...recommendForm, reasonForC2: e.target.value})}
                  rows="3"
                ></textarea>
              </div>

              <button 
                className="btn-submit-recommend"
                onClick={() => {
                  if (!recommendForm.recommendation.trim()) {
                    setRecommendError('请填写推荐理由');
                    return;
                  }
                  setRecommendError('');
                  if (onRecommend) {
                    onRecommend({
                      ...selectedContact,
                      ...recommendForm,
                      jobTitle: pendingOrderJob?.title || selectedJob,
                    });
                  }
                  const newRec = {
                    ...selectedContact,
                    ...recommendForm,
                    jobTitle: pendingOrderJob?.title || selectedJob,
                  };
                  setSharingRecommendation(newRec);
                  setShowRecommendModal(false);
                  setShowShareModal(true);
                  setPendingOrderJob(null);
                  setRecommendForm({
                    skillMatch: 5,
                    experienceMatch: 5,
                    potential: 5,
                    recommendation: '',
                    reasonForC2: '',
                  });
                }}
              >
                🚀 确认推荐
              </button>
              {recommendError && <div className="recommend-error">{recommendError}</div>}
            </div>
          </div>
        </div>
      )}

      {showShareModal && sharingRecommendation && (
        <div className="recommend-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="recommend-modal" onClick={e => e.stopPropagation()}>
            <div className="recommend-header">
              <h3>📤 分享推荐卡片</h3>
              <button className="close-btn" onClick={() => setShowShareModal(false)}>✕</button>
            </div>
            <div className="recommend-body">
              <div className="share-card-preview">
                <div className="share-card-header">🎯 职位推荐</div>
                <div className="share-card-content">
                  <div className="share-candidate-info">
                    {sharingRecommendation.avatar ? (
                      <img src={sharingRecommendation.avatar} alt={sharingRecommendation.name} className="share-avatar-img" />
                    ) : (
                      <div className="share-avatar">{sharingRecommendation.name[0]}</div>
                    )}
                    <div className="share-candidate-details">
                      <span className="share-candidate-name">{sharingRecommendation.name}</span>
                      <span className="share-candidate-title">{sharingRecommendation.title} · {sharingRecommendation.company}</span>
                    </div>
                  </div>
                  <div className="share-ratings">
                    <div className="share-rating-item">
                      <span>技能匹配</span>
                      <span className="share-rating-stars">{'⭐'.repeat(sharingRecommendation.skillMatch)}</span>
                    </div>
                    <div className="share-rating-item">
                      <span>经验匹配</span>
                      <span className="share-rating-stars">{'⭐'.repeat(sharingRecommendation.experienceMatch)}</span>
                    </div>
                    <div className="share-rating-item">
                      <span>发展潜力</span>
                      <span className="share-rating-stars">{'⭐'.repeat(sharingRecommendation.potential)}</span>
                    </div>
                  </div>
                  {sharingRecommendation.recommendation && (
                    <div className="share-reason">
                      <span className="share-reason-label">推荐理由：</span>
                      <p>{sharingRecommendation.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="share-actions">
                <button className="btn-wechat" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `推荐 ${sharingRecommendation.name} - 职位推荐`,
                      text: `${sharingRecommendation.name} | ${sharingRecommendation.title} · ${sharingRecommendation.company}\n推荐理由：${sharingRecommendation.recommendation || '暂无'}`,
                    });
                  } else {
                    alert('请长按上方卡片保存图片，分享给微信好友');
                  }
                }}>
                  <span>💬</span> 微信分享
                </button>
                <button className="btn-copy-link" onClick={() => {
                  const text = `${sharingRecommendation.name} | ${sharingRecommendation.title} · ${sharingRecommendation.company}\n推荐理由：${sharingRecommendation.recommendation || '暂无'}`;
                  navigator.clipboard.writeText(text);
                  alert('已复制到剪贴板');
                }}>
                  <span>📋</span> 复制内容
                </button>
              </div>
              <button className="btn-done" onClick={() => setShowShareModal(false)}>
                完成
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSection !== 'privilege' && (
        <>
          <div className="section-header">
            <div className="section-title">
              {activeSection === 'dispatch' ? '🎯 派单专区' : '⚡ 抢单专区'}
              <span className="section-desc">
                {activeSection === 'dispatch'
                  ? 'AI精准匹配，高成功率职位'
                  : '热门职位，先到先得'}
              </span>
            </div>
          </div>

          <div className="filter-bar">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="搜索职位或公司..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
            <select
              className="filter-select"
              value={industryFilter}
              onChange={e => setIndustryFilter(e.target.value)}
            >
              <option value="">全行业</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            >
              <option value="">全城市</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="job-list">
            {visibleJobs.map((job, index) => (
            <div
              key={job.id}
              className={`job-card ${selectedJob === job.id ? 'selected' : ''} animate-fade-in animate-delay-${index + 1} ${job.zone === 'overseas' ? 'job-overseas' : ''} ${job.zone === 'sme' ? 'job-sme' : ''} ${job.zone === 'vertical' ? `job-vertical job-${job.verticalField}` : ''}`}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              <div className="job-header">
                <div className="job-title-row">
                  <h3 className="job-title">{job.title}</h3>
                  {job.urgent && <span className="urgent-badge">急招</span>}
                  {job.zone === 'overseas' && <span className="overseas-badge">✈️ 出海</span>}
                  {job.zone === 'sme' && <span className="sme-badge">🏢 中小企业</span>}
                  {job.zone === 'vertical' && job.verticalField === 'AI' && <span className="ai-badge">🧠 AI</span>}
                  {job.zone === 'vertical' && job.verticalField === '芯片' && <span className="chip-badge">💻 芯片</span>}
                  {job.zone === 'vertical' && job.verticalField === '新能源' && <span className="energy-badge">⚡ 新能源</span>}
                  {activeSection === 'dispatch' && <span className="dispatch-badge">派单</span>}
                  {activeSection === 'grab' && <span className="grab-badge">抢单</span>}
                </div>
                <div className="company-info">
                  {job.companyLogo && (
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="company-logo"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <span className="company-name">{job.company}</span>
                  <span className="salary">{job.salary}</span>
                  {job.salaryMultiplier && (
                    <span className="salary-premium">×{job.salaryMultiplier} 溢价</span>
                  )}
                </div>
              </div>

              <div className="job-tags">
                {job.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
                <span className="tag circle-tag">{job.circle}</span>
                {job.industry && <span className="tag industry-tag">🏭 {job.industry}</span>}
                {job.location && <span className="tag location-tag">📍 {job.location}</span>}
                {job.smeBenefit && <span className="tag sme-benefit-tag">📈 费率优惠</span>}
              </div>

              <div className="job-meta">
                <div className="match-score">
                  <div className="match-bar">
                    <div className="match-fill" style={{ width: `${job.match}%` }}></div>
                  </div>
                  <span className="match-value">{job.match}%匹配</span>
                </div>
                <div className="bonus">
                  <span className="bonus-icon">💰</span>
                  <span className="bonus-value">{job.bonus}</span>
                </div>
              </div>

              <div className="job-footer">
                <span className="deadline">⏰ {job.deadline}</span>
                <div className="job-actions">
                  <button 
                    className="btn-ai-parse"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAnalyzingJob(job);
                    }}
                  >
                    <span>🤖</span> AI解析
                  </button>
                  <button 
                    className="btn-ai-match"
                    onClick={(e) => {
                      e.stopPropagation();
                      runAIScan();
                    }}
                  >
                    <span>🎯</span> 扫人脉
                  </button>
                  <button
                    className="btn-take-order"
                    onClick={(e) => {
                      e.stopPropagation();
                      beginOrderFlow(job);
                    }}
                  >
                    立即接单
                  </button>
                </div>
              </div>

              {selectedJob === job.id && (
                <div className="job-expanded">
                  <div className="job-detail-info">
                    <div className="detail-row">
                      <span className="detail-label">🎯 匹配度</span>
                      <span className="detail-value high">{job.match}%</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💰 悬赏金</span>
                      <span className="detail-value">{job.bonus}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">⏰ 截止时间</span>
                      <span className="detail-value">{job.deadline}</span>
                    </div>
                  </div>
                  <div className="share-preview">
                    <div className="share-card">
                      <div className="share-header">🎁 推荐 {job.title} 职位</div>
                      <div className="share-body">
                        <p>年薪范围：{job.salary}</p>
                        <p>悬赏金额：{job.bonus}</p>
                        <p>推荐奖励：成功入职可获得高额赏金</p>
                      </div>
                    </div>
                    <button className="btn-wechat">
                      <span>💬</span> 分享到微信
                    </button>
                  </div>
                </div>
              )}
            </div>
            ))}
            {visibleJobs.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>{activeSection === 'dispatch' ? '暂无高匹配职位' : '暂无抢单职位'}</p>
                <p className="empty-hint">试试切换到其他专区看看</p>
              </div>
            )}
          </div>
        </>
      )}

      <section className="ranking-section">
        <div className="module-heading">
          <h2>榜单排名</h2>
          <span>用真实做单反馈激励推荐人持续行动</span>
        </div>
        <div className="ranking-grid">
          {rankings.map((rank) => (
            <article className="ranking-card" key={rank.title}>
              <div className="ranking-head">
                <strong>{rank.title}</strong>
                <span>{rank.period}</span>
              </div>
              {rank.rows.map(([name, value], index) => (
                <div className="ranking-row" key={`${rank.title}-${name}`}>
                  <span className="rank-index">{index + 1}</span>
                  <span>{name}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      {analyzingJob && (
        <JDAnalyzerModal 
          job={analyzingJob} 
          onClose={() => setAnalyzingJob(null)}
          onGenerateReport={(job) => {
            setAnalyzingJob(null);
            setGeneratingReportJob(job);
          }}
        />
      )}

      {generatingReportJob && (
        <CandidateReportGenerator 
          job={generatingReportJob}
          onClose={() => setGeneratingReportJob(null)}
          onSend={() => {
            alert('报告已成功发送给企业HR！');
            // 此处可调用原有 onRecommend 逻辑
          }}
        />
      )}

      <style>{`
        .job-hall {
          max-width: 1120px;
          width: 100%;
          min-width: 0;
        }

        .mobile-hewa-home {
          display: none;
        }

        .mobile-job-detail-page {
          display: none;
        }

        .mobile-job-list-page,
        .mobile-dispatch-page,
        .mobile-subscription-page {
          display: none;
        }

        .order-notice-overlay {
          position: fixed;
          inset: 0;
          z-index: 900;
          display: grid;
          align-items: end;
          background: rgba(0, 0, 0, 0.46);
        }

        .order-notice-sheet {
          width: min(430px, 100vw);
          max-height: 92vh;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          margin: 0;
          border-radius: 18px 18px 0 0;
          background: #fff;
          color: #2d333b;
          overflow: hidden;
          box-shadow: 0 -18px 36px rgba(15, 23, 42, 0.16);
        }

        .order-notice-sheet > header {
          position: relative;
          min-height: 66px;
          display: grid;
          place-items: center;
          border-bottom: 1px solid #edf0f2;
        }

        .order-notice-sheet > header strong {
          color: #222833;
          font-size: 1.22rem;
          font-weight: 1000;
        }

        .order-notice-sheet > header button {
          position: absolute;
          right: 18px;
          top: 14px;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: transparent;
          color: #30343b;
          font-size: 2rem;
          line-height: 1;
          font-weight: 300;
        }

        .order-notice-scroll {
          min-height: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 18px 18px;
        }

        .order-group-card {
          display: grid;
          justify-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding: 24px 18px;
          border-radius: 10px;
          background: #eaf2ff;
          text-align: center;
        }

        .order-group-card h2 {
          margin: 0;
          color: #1f2a44;
          font-size: 1.15rem;
          font-weight: 1000;
        }

        .order-group-card p {
          color: #7a8190;
          font-size: 0.98rem;
          font-weight: 850;
        }

        .order-qr {
          position: relative;
          width: 116px;
          height: 116px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
          margin-top: 10px;
          padding: 9px;
          background: #fff;
        }

        .order-qr span {
          background: #fff;
        }

        .order-qr span.dark {
          background: #111;
        }

        .order-qr i {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #111;
          border: 2px solid #111;
          font-style: normal;
          font-size: 0.82rem;
          font-weight: 1000;
          transform: translate(-50%, -50%);
        }

        .order-notice-intro {
          margin: 0 0 18px;
          color: #676d75;
          font-size: 1.02rem;
          line-height: 1.72;
          font-weight: 750;
        }

        .order-rule-block {
          padding: 16px 0;
          border-top: 1px solid #edf0f2;
        }

        .order-rule-block h3 {
          margin: 0 0 12px;
          color: #2d333b;
          font-size: 1.08rem;
          font-weight: 1000;
        }

        .order-rule-block dl {
          display: grid;
          gap: 12px;
          margin: 0;
        }

        .order-rule-block dl div {
          display: grid;
          grid-template-columns: 104px minmax(0, 1fr);
          gap: 10px;
        }

        .order-rule-block dt,
        .order-rule-block dd {
          margin: 0;
          color: #4c535c;
          font-size: 0.96rem;
          line-height: 1.55;
          font-weight: 750;
        }

        .order-rule-block dt {
          color: #2f3640;
          font-weight: 900;
        }

        .order-rule-block p {
          margin: 0 0 14px;
          color: #3d434b;
          font-size: 1rem;
          line-height: 1.72;
          font-weight: 760;
        }

        .order-rule-block p:last-child {
          margin-bottom: 0;
        }

        .order-check-list {
          display: grid;
          gap: 12px;
          margin: 4px 0 18px;
        }

        .order-check-list p {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr);
          gap: 10px;
          margin: 0;
          color: #8b929c;
          font-size: 0.94rem;
          line-height: 1.5;
          font-weight: 780;
        }

        .order-check-list span {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #25c8ad;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 1000;
        }

        .order-check-list em {
          color: #20bfa6;
          font-style: normal;
        }

        .order-sync-banner {
          min-height: 88px;
          display: grid;
          align-content: center;
          gap: 6px;
          padding: 16px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6b32ff, #a044ff 70%, #7b4fff);
          color: #fff;
          text-align: center;
        }

        .order-sync-banner strong {
          font-size: 1.02rem;
          font-weight: 1000;
        }

        .order-sync-banner span {
          color: #ffe767;
          font-size: 0.92rem;
          font-weight: 850;
        }

        .order-notice-actions {
          padding: 14px 18px calc(16px + env(safe-area-inset-bottom, 0px));
          border-top: 1px solid #f0f2f4;
          background: rgba(255, 255, 255, 0.96);
        }

        .order-notice-actions button {
          width: 100%;
          height: 56px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ffa153, #ff6636);
          color: #fff;
          font-size: 1.14rem;
          font-weight: 1000;
        }

        .order-success-toast {
          position: fixed;
          left: 50%;
          top: calc(42px + env(safe-area-inset-top, 0px));
          z-index: 980;
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: min(360px, calc(100vw - 32px));
          padding: 12px 16px;
          border-radius: 999px;
          background: rgba(31, 41, 55, 0.94);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 850;
          transform: translateX(-50%);
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.18);
        }

        .order-success-toast span {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #25c8ad;
          font-size: 0.78rem;
          font-weight: 1000;
        }

        .detail-icon {
          position: relative;
          width: 25px;
          height: 25px;
          display: block;
          box-sizing: border-box;
        }

        .chat-icon {
          border: 2.5px solid currentColor;
          border-radius: 8px;
        }

        .chat-icon::before,
        .chat-icon::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: currentColor;
        }

        .chat-icon::before {
          left: 6px;
          top: 9px;
          width: 4px;
          height: 4px;
          box-shadow: 8px 0 0 currentColor;
        }

        .chat-icon::after {
          right: 2px;
          bottom: -5px;
          width: 8px;
          height: 8px;
          clip-path: polygon(0 0, 100% 0, 100% 100%);
          transform: rotate(45deg);
        }

        .phone-icon {
          border: 2.6px solid currentColor;
          border-top-color: transparent;
          border-left-color: transparent;
          border-radius: 50%;
          transform: rotate(36deg);
        }

        .phone-icon::before,
        .phone-icon::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 7px;
          border-radius: 3px;
          background: currentColor;
        }

        .phone-icon::before {
          left: -1px;
          top: 0;
          transform: rotate(-26deg);
        }

        .phone-icon::after {
          right: 0;
          bottom: -1px;
          transform: rotate(-26deg);
        }

        .mobile-list-top {
          position: sticky;
          top: 0;
          z-index: 160;
          display: grid;
          grid-template-columns: 42px 1fr 76px;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 12px;
          background: rgba(255, 255, 255, 0.97);
          border-bottom: 1px solid #f0f2f4;
        }

        .mobile-list-top button {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: transparent;
          color: #1f2a44;
          font-size: 1.9rem;
          line-height: 1;
        }

        .mobile-list-top .home-back {
          border: 1px solid #eef0f2;
          font-size: 1.15rem;
        }

        .mobile-list-top strong {
          text-align: center;
          color: #222833;
          font-size: 1.22rem;
          font-weight: 1000;
        }

        .mobile-list-top .mobile-detail-more {
          width: 76px;
          height: 38px;
          border: 1px solid #eef0f2;
          border-radius: 999px;
          background: #fff;
          font-size: 1.2rem;
          letter-spacing: 2px;
        }

        .mobile-list-search {
          position: sticky;
          top: 61px;
          z-index: 150;
          display: grid;
          grid-template-columns: 32px 1fr;
          align-items: center;
          gap: 2px;
          margin: 0;
          padding: 14px 16px 10px;
          background: rgba(255, 255, 255, 0.97);
        }

        .mobile-list-search span {
          position: relative;
          left: 14px;
          z-index: 1;
          color: #1f2a44;
          font-size: 1.45rem;
          font-weight: 1000;
        }

        .mobile-list-search input {
          grid-column: 1 / -1;
          height: 48px;
          margin-top: -48px;
          padding: 0 18px 0 48px;
          border: 2px solid #25c8ad;
          border-radius: 999px;
          background: #fff;
          color: #222833;
          font-size: 0.92rem;
          font-weight: 800;
          outline: 0;
        }

        .mobile-list-search input::placeholder {
          color: #858b94;
        }

        .mobile-list-filters {
          display: grid;
          grid-template-columns: repeat(5, max-content);
          gap: 18px;
          overflow-x: auto;
          padding: 12px 16px 10px;
          background: #fff;
        }

        .mobile-list-filters button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          color: #303641;
          font-size: 1rem;
          font-weight: 900;
          white-space: nowrap;
        }

        .mobile-list-filters span {
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #f4f5f6;
          color: #707781;
          font-size: 0.8rem;
        }

        .mobile-list-chips {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 14px 16px 18px;
          background: #f5f7f8;
        }

        .mobile-list-chips button {
          flex: 0 0 auto;
          min-height: 38px;
          padding: 0 17px;
          border-radius: 999px;
          background: #fff;
          color: #737983;
          font-size: 0.9rem;
          font-weight: 900;
        }

        .mobile-list-chips button.active {
          background: #e1fbf7;
          color: #19baa0;
        }

        .mobile-list-feed {
          display: grid;
          background: #fff;
        }

        .mobile-list-job {
          padding: 26px 16px 20px;
          border-bottom: 1px solid #edf0f3;
          background: #fff;
        }

        .mobile-list-job-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          gap: 12px;
        }

        .mobile-list-job h2,
        .dispatch-job-card h2 {
          margin: 0;
          color: #30343b;
          font-size: 1.18rem;
          font-weight: 1000;
          line-height: 1.25;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mobile-list-job-head > span {
          color: #aab0b7;
          font-size: 0.88rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .mobile-list-job-head strong {
          color: #ff6636;
          font-size: 1.12rem;
          font-weight: 1000;
        }

        .mobile-list-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 12px 0;
        }

        .mobile-list-tags span {
          padding: 5px 8px;
          border-radius: 5px;
          background: #f4f5f6;
          color: #777d86;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .mobile-list-job p,
        .dispatch-job-card p {
          margin: 0 0 16px;
          color: #5f6670;
          font-size: 0.95rem;
          font-weight: 800;
        }

        .mobile-list-job footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .mobile-list-job footer div {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .mobile-list-job footer em {
          color: #59616d;
          font-style: normal;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .mobile-list-job footer b {
          padding: 5px 9px;
          border-radius: 5px;
          background: #ecfbeb;
          color: #5cc154;
          font-size: 0.82rem;
          font-weight: 1000;
          white-space: nowrap;
        }

        .mobile-list-job footer button,
        .dispatch-job-card footer button {
          min-width: 100px;
          height: 38px;
          border-radius: 999px;
          background: #ff854a;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 900;
        }

        .mobile-list-job footer button.online,
        .dispatch-job-card footer button.online {
          background: #16cdb4;
        }

        .mobile-dispatch-page {
          background: #f2f5f8;
        }

        .mobile-subscription-page {
          background: #f3f6f7;
        }

        .mobile-subscription-page.form-mode {
          background: #fff;
        }

        .subscription-empty-card {
          min-height: calc(100vh - 178px);
          display: grid;
          align-content: center;
          justify-items: center;
          margin: 0 16px 22px;
          padding: 64px 18px 108px;
          border-radius: 8px;
          background: #fff;
        }

        .subscription-empty-illustration {
          position: relative;
          width: 152px;
          height: 122px;
          margin-bottom: 28px;
          opacity: 0.72;
        }

        .subscription-empty-illustration span {
          position: absolute;
          left: 28px;
          top: 38px;
          width: 108px;
          height: 66px;
          border-radius: 6px;
          background: linear-gradient(180deg, #e7e7e7, #f6f6f6);
          box-shadow: 20px 26px 34px rgba(0, 0, 0, 0.06);
        }

        .subscription-empty-illustration span::before,
        .subscription-empty-illustration span::after {
          content: "";
          position: absolute;
          top: -28px;
          width: 54px;
          height: 38px;
          background: #d7d7d7;
        }

        .subscription-empty-illustration span::before {
          left: 0;
          clip-path: polygon(0 100%, 100% 100%, 68% 0);
        }

        .subscription-empty-illustration span::after {
          right: 0;
          clip-path: polygon(0 100%, 100% 100%, 32% 0);
        }

        .subscription-empty-illustration i {
          position: absolute;
          left: 4px;
          bottom: 16px;
          width: 42px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, transparent 42%, #dfdfdf 44% 58%, transparent 60%);
          transform: rotate(-28deg);
        }

        .subscription-empty-illustration b {
          position: absolute;
          left: 58px;
          top: 50px;
          width: 42px;
          height: 8px;
          border-radius: 999px;
          background: #ededed;
          box-shadow: 0 28px 0 #ededed;
        }

        .subscription-empty-card p {
          margin: 0 0 26px;
          color: #6f747d;
          font-size: 1.03rem;
          font-weight: 800;
          text-align: center;
        }

        .subscription-empty-card button,
        .subscription-save {
          min-width: 142px;
          height: 56px;
          border-radius: 999px;
          background: #16cdb4;
          color: #fff;
          font-size: 1.08rem;
          font-weight: 900;
        }

        .subscription-form {
          min-height: calc(100vh - 62px);
          padding: 22px 16px calc(22px + env(safe-area-inset-bottom, 0px));
          background: #fff;
        }

        .subscription-field {
          position: relative;
          width: 100%;
          display: grid;
          gap: 10px;
          padding: 18px 26px 24px 0;
          border-bottom: 1px solid #edf0f2;
          background: #fff;
          text-align: left;
        }

        .subscription-field span {
          color: #5f6670;
          font-size: 0.96rem;
          font-weight: 800;
        }

        .subscription-field strong {
          color: #a0a5ad;
          font-size: 1.22rem;
          font-weight: 700;
        }

        .subscription-field em {
          position: absolute;
          right: 3px;
          top: 50%;
          color: #cfd3d8;
          font-size: 2rem;
          font-style: normal;
          transform: translateY(-50%);
        }

        .subscription-message-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 70px;
          gap: 12px;
          align-items: center;
          padding: 24px 0 14px;
        }

        .subscription-message-row strong {
          display: block;
          color: #1f2a44;
          font-size: 1.02rem;
          font-weight: 1000;
        }

        .subscription-message-row p {
          margin: 12px 0 0;
          color: #718099;
          font-size: 0.86rem;
          font-weight: 800;
          line-height: 1.45;
        }

        .subscription-switch {
          position: relative;
          width: 62px;
          height: 36px;
          border: 1px solid #e1e3e6;
          border-radius: 999px;
          background: #fff;
          box-shadow: inset 0 0 0 1px #f0f1f2;
        }

        .subscription-switch::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
        }

        .subscription-qr {
          position: relative;
          width: 132px;
          height: 132px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin: 20px auto 42px;
          padding: 8px;
          background: #fff;
          border: 4px solid #111;
          box-sizing: border-box;
        }

        .subscription-qr span {
          background: #fff;
        }

        .subscription-qr span.dark {
          background: #111;
        }

        .subscription-qr i {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: #27d27d;
          color: #fff;
          font-style: normal;
          font-size: 0.9rem;
          font-weight: 1000;
          transform: translate(-50%, -50%);
        }

        .subscription-save {
          width: 100%;
          margin-top: 4px;
          font-size: 1.22rem;
        }

        .dispatch-tip {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 14px 16px 12px;
          padding: 13px 14px;
          border: 1px solid #e8edf3;
          border-radius: 8px;
          background: #f8fafc;
          color: #748197;
          font-size: 0.92rem;
          font-weight: 900;
        }

        .dispatch-tip span {
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #7e8aa0;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 1000;
        }

        .dispatch-tip button {
          background: transparent;
          color: #5f7dff;
          font: inherit;
        }

        .dispatch-group-list {
          display: grid;
          gap: 14px;
          padding: 0 16px 22px;
        }

        .dispatch-publisher-card {
          padding: 18px 14px;
          border: 1px solid #e6e9ee;
          border-radius: 8px;
          background: #fff;
        }

        .dispatch-publisher-card > header {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr) auto;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .dispatch-avatar {
          position: relative;
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(135deg, #8bd7ff, #ffc46b);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 1000;
        }

        .dispatch-avatar::after {
          content: "发单方";
          position: absolute;
          left: -2px;
          bottom: -7px;
          padding: 1px 4px;
          border-radius: 3px;
          background: #21c6ad;
          color: #fff;
          font-size: 0.68rem;
          font-weight: 1000;
        }

        .dispatch-publisher-card header strong {
          display: block;
          color: #20283a;
          font-size: 1.2rem;
          font-weight: 1000;
        }

        .dispatch-publisher-card header p {
          margin: 6px 0 0;
          max-width: 190px;
          color: #748197;
          font-size: 0.9rem;
          font-weight: 800;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dispatch-publisher-card aside {
          display: grid;
          justify-items: end;
          gap: 8px;
        }

        .dispatch-publisher-card aside em {
          padding: 8px 10px;
          border-radius: 6px;
          background: #f4f8ff;
          color: #748197;
          font-size: 0.84rem;
          font-style: normal;
          font-weight: 900;
          white-space: nowrap;
        }

        .dispatch-publisher-card time {
          color: #8b929c;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .dispatch-card-jobs {
          display: grid;
          gap: 12px;
        }

        .dispatch-job-card {
          padding: 16px 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
        }

        .dispatch-job-card footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        .dispatch-job-card footer button {
          width: 100%;
          min-width: 0;
          height: 44px;
          border-radius: 8px;
          font-size: 1rem;
        }

        .dispatch-job-card footer button.ghost {
          border: 1px solid #cfd6e2;
          background: #fff;
          color: #9aa3b2;
        }

        @media (max-width: 720px) {
          .job-hall {
            max-width: none;
            margin: -12px -14px 0;
            padding: 0 0 18px;
            background: #f3f6f7;
          }

          .mobile-hewa-home {
            display: ${mobileDetailJob || mobileListPage ? 'none' : 'block'};
            min-height: 100vh;
            padding: calc(14px + env(safe-area-inset-top, 0px)) 16px calc(112px + env(safe-area-inset-bottom, 0px));
            color: #272d37;
          }

          .mobile-job-list-page,
          .mobile-dispatch-page,
          .mobile-subscription-page {
            display: ${mobileListPage && !mobileDetailJob ? 'block' : 'none'};
            min-height: 100vh;
            margin: -12px -14px 0;
            padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px));
            color: #272d37;
          }

          .mobile-job-detail-page {
            display: block;
            min-height: 100vh;
            padding: calc(8px + env(safe-area-inset-top, 0px)) 14px calc(154px + env(safe-area-inset-bottom, 0px));
            background: #f3f6f7;
            color: #272d37;
          }

          .mobile-detail-top {
            position: sticky;
            top: 0;
            z-index: 150;
            display: grid;
            grid-template-columns: 42px 1fr auto;
            align-items: center;
            gap: 8px;
            margin: 0 -14px 12px;
            padding: 8px 14px 10px;
            background: rgba(243, 246, 247, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }

          .mobile-detail-top button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #fff;
            color: #1f2a44;
            font-size: 1.8rem;
            line-height: 1;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
          }

          .mobile-detail-top strong {
            text-align: center;
            color: #1f2937;
            font-size: 1rem;
            font-weight: 900;
          }

          .mobile-detail-top span {
            padding: 5px 9px;
            border-radius: 999px;
            background: #fff2e8;
            color: #ff7040;
            font-size: 0.72rem;
            font-weight: 900;
          }

          .mobile-detail-hero,
          .mobile-detail-card {
            margin-bottom: 12px;
            padding: 16px;
            border-radius: 8px;
            background: #fff;
            box-shadow: 0 10px 24px rgba(32, 43, 56, 0.05);
          }

          .mobile-detail-hero {
            background:
              radial-gradient(circle at 88% 0%, rgba(37, 200, 173, 0.18), transparent 28%),
              linear-gradient(135deg, #ffffff, #f9fffd);
            border: 1px solid rgba(37, 200, 173, 0.16);
          }

          .detail-title-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 12px;
            align-items: start;
            margin-bottom: 12px;
          }

          .detail-kicker {
            display: block;
            margin-bottom: 8px;
            color: #18bba0;
            font-size: 0.78rem;
            font-weight: 900;
          }

          .detail-title-row h1 {
            margin: 0;
            color: #222833;
            font-size: 1.45rem;
            font-weight: 1000;
            line-height: 1.18;
            overflow-wrap: anywhere;
          }

          .detail-title-row > strong {
            color: #ff7040;
            font-size: 1.32rem;
            font-weight: 1000;
            white-space: nowrap;
          }

          .detail-title-row > strong::before {
            content: "佣金 ";
            color: #a3a8b0;
            font-size: 0.82rem;
            font-weight: 800;
          }

          .detail-tag-row,
          .company-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .detail-tag-row span,
          .company-badges span {
            padding: 6px 9px;
            border-radius: 6px;
            background: #f3f4f6;
            color: #68707b;
            font-size: 0.78rem;
            font-weight: 800;
          }

          .detail-card-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 12px;
          }

          .detail-card-title h2 {
            margin: 0;
            color: #242b35;
            font-size: 1.05rem;
            font-weight: 1000;
          }

          .detail-card-title span {
            color: #19baa0;
            font-size: 0.76rem;
            font-weight: 900;
          }

          .advisor-profile,
          .company-detail-row {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            align-items: center;
            gap: 10px;
          }

          .advisor-profile .publisher-avatar {
            width: 42px;
            height: 42px;
            margin: 0;
            border: 0;
            font-size: 0.9rem;
          }

          .advisor-profile strong,
          .company-detail-row strong {
            display: block;
            color: #27303b;
            font-size: 0.98rem;
            font-weight: 1000;
          }

          .advisor-profile p,
          .company-detail-row p,
          .detail-desc,
          .review-list p {
            margin: 4px 0 0;
            color: #737b86;
            font-size: 0.82rem;
            font-weight: 700;
            line-height: 1.55;
          }

          .advisor-profile button {
            min-width: 74px;
            height: 32px;
            border-radius: 999px;
            background: #e7fbf6;
            color: #16b69d;
            font-size: 0.78rem;
            font-weight: 900;
          }

          .advisor-metrics,
          .detail-info-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
            margin-top: 14px;
          }

          .advisor-metrics div,
          .detail-info-grid div {
            min-height: 58px;
            display: grid;
            align-content: center;
            gap: 4px;
            padding: 10px;
            border-radius: 8px;
            background: #f7f9fa;
          }

          .advisor-metrics strong,
          .detail-info-grid strong {
            color: #202833;
            font-size: 1rem;
            font-weight: 1000;
          }

          .advisor-metrics span,
          .detail-info-grid span {
            color: #8b929c;
            font-size: 0.72rem;
            font-weight: 800;
          }

          .detail-info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-bottom: 12px;
          }

          .company-detail-row {
            grid-template-columns: auto minmax(0, 1fr);
            margin-bottom: 12px;
          }

          .company-detail-row img,
          .company-detail-row > span {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: #f1f5f9;
          }

          .company-detail-row > span {
            display: grid;
            place-items: center;
            color: #1675b8;
            font-weight: 1000;
          }

          .commission-main {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 12px;
            padding: 14px;
            border-radius: 8px;
            background: #fff7f0;
          }

          .commission-main span {
            color: #9b7b62;
            font-weight: 900;
          }

          .commission-main strong {
            color: #ff7040;
            font-size: 1.7rem;
            font-weight: 1000;
          }

          .commission-card ol {
            margin: 0;
            padding-left: 18px;
            color: #69717d;
            font-size: 0.84rem;
            font-weight: 700;
            line-height: 1.7;
          }

          .review-list {
            display: grid;
            gap: 10px;
          }

          .review-list div {
            padding: 12px;
            border-radius: 8px;
            background: #f7f9fa;
          }

          .review-list strong {
            color: #25303b;
            font-size: 0.92rem;
            font-weight: 1000;
          }

          .mobile-detail-actions {
            position: fixed;
            left: 0;
            bottom: calc(76px + env(safe-area-inset-bottom, 0px));
            z-index: 480;
            display: grid;
            grid-template-columns: 0.42fr 0.58fr;
            gap: 10px;
            width: min(390px, 100vw);
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.96);
            box-shadow: 0 -10px 24px rgba(15, 23, 42, 0.08);
            box-sizing: border-box;
          }

          .mobile-detail-actions button {
            height: 44px;
            border-radius: 999px;
            background: #edf3f7;
            color: #1f2a44;
            font-weight: 900;
          }

          .mobile-detail-actions button.primary {
            background: #16cdb4;
            color: #fff;
            box-shadow: 0 10px 18px rgba(22, 205, 180, 0.22);
          }

          .mobile-job-detail-page {
            padding: calc(8px + env(safe-area-inset-top, 0px)) 0 calc(96px + env(safe-area-inset-bottom, 0px));
            background: #fff;
          }

          .mobile-detail-top {
            margin: 0;
            padding: 8px 16px 12px;
            background: rgba(255, 255, 255, 0.97);
            box-shadow: none;
          }

          .mobile-detail-top button,
          .mobile-detail-more {
            background: transparent;
            box-shadow: none;
          }

          .mobile-detail-top strong {
            font-size: 1.24rem;
          }

          .mobile-detail-more {
            width: 76px;
            height: 38px;
            border: 1px solid #eef0f2;
            border-radius: 999px;
            font-size: 1.2rem;
            letter-spacing: 2px;
          }

          .mobile-detail-summary,
          .mobile-detail-publisher,
          .mobile-progress-strip,
          .mobile-detail-content {
            padding: 0 16px;
          }

          .mobile-detail-summary {
            padding-top: 10px;
            padding-bottom: 14px;
            border-bottom: 1px solid #eef0f2;
          }

          .detail-title-row {
            grid-template-columns: minmax(0, 1fr) auto;
            margin-bottom: 12px;
          }

          .detail-title-row h1 {
            font-size: 1.44rem;
            line-height: 1.25;
          }

          .detail-commission {
            text-align: right;
            white-space: nowrap;
          }

          .detail-commission span {
            color: #a8adb5;
            font-size: 0.86rem;
            font-weight: 800;
          }

          .detail-commission strong {
            display: block;
            color: #ff6636;
            font-size: 1.4rem;
            font-weight: 1000;
          }

          .detail-tag-row {
            margin-top: 12px;
          }

          .detail-tag-row span {
            padding: 7px 10px;
            border-radius: 4px;
            color: #777d86;
            font-size: 0.9rem;
            background: #f4f5f6;
          }

          .detail-badge-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 12px;
          }

          .detail-badge-row span {
            padding: 6px 10px;
            border: 1px solid #d6dce3;
            border-radius: 4px;
            color: #6f7782;
            font-size: 0.86rem;
            font-weight: 800;
          }

          .detail-title-row p {
            margin: 16px 0 0;
            color: #686f79;
            font-size: 0.9rem;
            font-weight: 700;
          }

          .detail-quick-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }

          .detail-quick-actions button {
            min-width: 72px;
            height: 34px;
            border: 1px solid #e6eaee;
            border-radius: 999px;
            background: #fff;
            color: #505866;
            font-size: 0.86rem;
            font-weight: 800;
          }

          .mobile-detail-publisher {
            padding-top: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid #eef0f2;
          }

          .mobile-detail-publisher .advisor-profile {
            grid-template-columns: 54px minmax(0, 1fr) 16px;
          }

          .mobile-detail-publisher .publisher-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          .advisor-profile strong em,
          .review-stars {
            color: #ff7438;
            font-style: normal;
            letter-spacing: 1px;
          }

          .publisher-service-row {
            display: flex;
            flex-wrap: wrap;
            gap: 18px;
            margin-top: 14px;
            color: #272d37;
            font-size: 0.92rem;
            font-weight: 800;
          }

          .publisher-service-row strong,
          .mobile-detail-publisher p strong {
            color: #ff6636;
          }

          .mobile-detail-publisher > p {
            margin: 12px 0 0;
            color: #272d37;
            font-size: 0.92rem;
            font-weight: 800;
          }

          .mobile-progress-strip {
            position: relative;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr)) 18px;
            align-items: center;
            margin: 18px 16px;
            padding: 12px 8px;
            border: 1.5px solid #25c8ad;
            border-radius: 8px;
            color: #626a75;
            text-align: center;
          }

          .mobile-progress-strip div {
            border-right: 1px solid #e1f4f0;
          }

          .mobile-progress-strip div:nth-child(4) {
            border-right: 0;
          }

          .mobile-progress-strip strong,
          .mobile-progress-strip span {
            display: block;
          }

          .mobile-progress-strip strong {
            color: #5a626b;
            font-size: 1.18rem;
            font-weight: 1000;
          }

          .mobile-progress-strip span {
            color: #6d737c;
            font-size: 0.82rem;
            font-weight: 800;
          }

          .detail-arrow {
            color: #24c3a8;
            font-size: 1.8rem;
            font-weight: 400;
          }

          .mobile-detail-tabs {
            position: sticky;
            top: 56px;
            z-index: 140;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0;
            padding: 12px 0 10px;
            border-top: 8px solid #f4f7f8;
            border-bottom: 1px solid #eef0f2;
            background: rgba(255, 255, 255, 0.98);
          }

          .mobile-detail-tabs button {
            position: relative;
            min-height: 44px;
            background: transparent;
            color: #2e333b;
            font-size: 1rem;
            font-weight: 900;
            white-space: nowrap;
          }

          .mobile-detail-tabs button.active {
            color: #20bfa6;
          }

          .mobile-detail-tabs button.active::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 34px;
            height: 5px;
            border-radius: 999px;
            background: #25c8ad;
            transform: translateX(-50%);
          }

          .mobile-detail-tabs button span {
            position: absolute;
            top: -2px;
            right: 8px;
            min-width: 24px;
            height: 24px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: #ff5950;
            color: #fff;
            font-size: 0.75rem;
          }

          .mobile-detail-content {
            padding-top: 18px;
          }

          .mobile-detail-block {
            padding: 0 0 22px;
            margin-bottom: 22px;
            border-bottom: 1px solid #edf0f2;
            background: #fff;
          }

          .mobile-detail-block h2 {
            margin: 0 0 16px;
            color: #2b3038;
            font-size: 1.22rem;
            line-height: 1.25;
            font-weight: 1000;
          }

          .mobile-detail-block h3 {
            margin: 14px 0 8px;
            color: #2b3038;
            font-size: 1rem;
            font-weight: 1000;
          }

          .mobile-detail-block p,
          .detail-clause-list {
            margin: 0;
            color: #6f747d;
            font-size: 0.98rem;
            font-weight: 650;
            line-height: 1.78;
          }

          .notice-table,
          .detail-line-list,
          .commission-table {
            display: grid;
            gap: 12px;
            margin: 0;
          }

          .notice-table div,
          .detail-line-list div,
          .commission-table div {
            display: grid;
            grid-template-columns: 92px minmax(0, 1fr);
            gap: 10px;
          }

          .notice-table {
            padding: 16px;
            border-radius: 6px;
            background: #f5f7fb;
          }

          .notice-table dt,
          .detail-line-list dt,
          .commission-table dt {
            color: #7c828b;
            font-size: 0.95rem;
            font-weight: 900;
          }

          .notice-table dd,
          .detail-line-list dd,
          .commission-table dd {
            margin: 0;
            color: #6b717b;
            font-size: 0.95rem;
            font-weight: 750;
            line-height: 1.62;
            overflow-wrap: anywhere;
          }

          .report-tip {
            padding: 12px;
            border-radius: 8px;
            background: #f5f7f8;
          }

          .report-flow {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-top: 16px;
            color: #68707a;
            text-align: center;
            font-size: 0.78rem;
            font-weight: 800;
          }

          .report-flow span::after {
            content: "";
            display: block;
            height: 3px;
            margin-top: 10px;
            border-radius: 999px;
            background: #25c8ad;
          }

          .company-verify-head {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }

          .company-verify-head img,
          .company-verify-head > span {
            width: 58px;
            height: 58px;
            border-radius: 12px;
            background: #f2f4f5;
          }

          .company-verify-head > span {
            display: grid;
            place-items: center;
            color: #8b929c;
            font-weight: 1000;
          }

          .company-verify-head em {
            padding: 5px 10px;
            border: 1px solid #6ca8ff;
            border-radius: 4px;
            background: #edf5ff;
            color: #4a8df7;
            font-style: normal;
            font-weight: 900;
          }

          .detail-card-title button {
            height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            background: #ff6636;
            color: #fff;
            font-size: 0.82rem;
            font-weight: 900;
          }

          .commission-band {
            min-height: 38px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            border: 1px solid #27c8ad;
            border-radius: 6px;
            background: #eefbf8;
            color: #20bfa6 !important;
            font-size: 1.05rem !important;
            font-weight: 1000 !important;
          }

          .commission-band::after {
            content: "›";
            font-size: 1.6rem;
          }

          .detail-clause-list {
            padding-left: 22px;
          }

          .review-filter-row {
            display: flex;
            gap: 18px;
            margin: -2px -16px 18px;
            padding: 12px 16px 14px;
            overflow-x: auto;
            border-bottom: 1px solid #edf0f2;
          }

          .review-filter-row button {
            flex: 0 0 auto;
            background: transparent;
            color: #222b3b;
            font-size: 0.95rem;
            font-weight: 900;
          }

          .review-filter-row button.active {
            color: #20bfa6;
          }

          .review-item {
            display: grid;
            grid-template-columns: 48px minmax(0, 1fr);
            gap: 14px;
            padding: 18px 0;
            border-bottom: 1px solid #edf0f2;
          }

          .review-avatar {
            width: 44px;
            height: 44px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: #e9fbf6;
            color: #1fb79f;
            font-weight: 1000;
          }

          .review-item header {
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }

          .review-item header strong {
            color: #222b3b;
            font-size: 1rem;
            font-weight: 1000;
          }

          .review-item header span,
          .review-position {
            color: #9ca2aa;
            font-size: 0.86rem;
            font-weight: 700;
          }

          .review-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 8px 0;
          }

          .review-tags span {
            padding: 6px 9px;
            border-radius: 5px;
            background: #f4f6f7;
            color: #7c828b;
            font-size: 0.84rem;
            font-weight: 800;
          }

          .mobile-detail-actions {
            bottom: 0;
            grid-template-columns: 58px 58px 58px minmax(0, 1fr);
            width: min(430px, 100vw);
            padding: 8px 16px calc(10px + env(safe-area-inset-bottom, 0px));
            box-shadow: 0 -8px 18px rgba(15, 23, 42, 0.08);
          }

          .mobile-detail-actions button {
            height: 54px;
            display: grid;
            place-items: center;
            align-content: center;
            gap: 3px;
            border-radius: 0;
            background: transparent;
            color: #1f2a44;
            font-size: 0.72rem;
            font-weight: 800;
          }

          .mobile-detail-actions button span {
            font-size: 1.55rem;
            line-height: 1;
          }

          .mobile-detail-actions button.primary {
            height: 54px;
            border-radius: 999px;
            font-size: 1.12rem;
            font-weight: 900;
          }

          .recommender-console,
          .doing-board,
          .workbench-strip,
          .special-campaigns,
          .quick-job-sections,
          .zone-tabs,
          .zone-intro,
          .section-tabs,
          .section-header,
          .filter-bar,
          .job-list,
          .ranking-section {
            display: none !important;
          }

          .mobile-hewa-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 10px;
          }

          .mobile-hewa-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
          }

          .mobile-hewa-brand img {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            background: #fff;
            box-shadow: 0 10px 22px rgba(29, 180, 157, 0.14);
          }

          .mobile-hewa-brand strong,
          .mobile-hewa-brand span {
            display: block;
            line-height: 1.2;
          }

          .mobile-hewa-brand strong {
            color: #20283a;
            font-size: 1.24rem;
            font-weight: 900;
          }

          .mobile-hewa-brand span {
            max-width: 250px;
            margin-top: 4px;
            color: #5d6470;
            font-size: 0.8rem;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .mobile-hewa-more {
            width: 70px;
            height: 38px;
            border: 1px solid rgba(31, 42, 68, 0.08);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.86);
            color: #1f2a44;
            font-size: 1.3rem;
            font-weight: 900;
            letter-spacing: 2px;
          }

          .mobile-hewa-search {
            position: sticky;
            top: 0;
            z-index: 120;
            margin: 0 -16px 12px;
            padding: 8px 16px 10px;
            background: rgba(243, 246, 247, 0.94);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }

          .mobile-hewa-search .search-input-wrapper {
            min-width: 0;
          }

          .mobile-hewa-search .search-icon {
            left: 16px;
            color: #20283a;
            font-size: 1.65rem;
            line-height: 1;
          }

          .mobile-hewa-search .search-input {
            height: 48px;
            padding: 0 42px 0 48px;
            border: 2px solid #25c8ad;
            border-radius: 999px;
            background: #fff;
            color: #20283a;
            font-size: 0.92rem;
            font-weight: 800;
            box-shadow: none;
          }

          .mobile-hewa-search .search-input::placeholder {
            color: #858b94;
          }

          .mobile-hewa-search .search-clear {
            right: 16px;
          }

          .mobile-hewa-hero {
            width: 100%;
            min-height: 98px;
            display: grid;
            align-content: center;
            gap: 5px;
            margin-bottom: 14px;
            padding: 14px 18px;
            border-radius: 8px;
            text-align: left;
            color: #fff;
            background:
              radial-gradient(circle at 88% 26%, rgba(255, 255, 255, 0.72), transparent 12%),
              radial-gradient(circle at 78% 76%, rgba(25, 203, 170, 0.46), transparent 22%),
              linear-gradient(135deg, #7c8cff 0%, #f4d2ff 48%, #ffe49d 100%);
            box-shadow: 0 16px 30px rgba(97, 96, 202, 0.2);
            overflow: hidden;
          }

          .mobile-hewa-hero span {
            width: fit-content;
            padding: 4px 9px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.72);
            color: #4f55d9;
            font-size: 0.76rem;
            font-weight: 900;
          }

          .mobile-hewa-hero strong {
            max-width: 230px;
            color: #161a2d;
            font-size: 1.34rem;
            font-weight: 1000;
            line-height: 1.1;
          }

          .mobile-hewa-hero em {
            color: rgba(22, 26, 45, 0.7);
            font-size: 0.82rem;
            font-style: normal;
            font-weight: 800;
          }

          .mobile-hewa-entrances {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 10px;
            margin-bottom: 12px;
          }

          .mobile-hewa-entry {
            display: grid;
            justify-items: center;
            gap: 8px;
            min-width: 0;
            background: transparent;
            color: #303641;
            font-size: 0.78rem;
            font-weight: 800;
          }

          .mobile-hewa-entry span {
            width: 48px;
            height: 48px;
            display: grid;
            place-items: center;
            border-radius: 16px;
            color: #fff;
            font-size: 1rem;
            font-weight: 900;
            box-shadow: 0 12px 20px rgba(34, 99, 184, 0.16);
          }

          .mobile-hewa-entry strong {
            font-size: 0.78rem;
            font-weight: 800;
            white-space: nowrap;
          }

          .entry-1 span { background: linear-gradient(135deg, #5fa8ff, #3a77dc); }
          .entry-2 span { background: linear-gradient(135deg, #ffdf58, #f7a629); }
          .entry-3 span { background: linear-gradient(135deg, #5fe8be, #25b997); }
          .entry-4 span { background: linear-gradient(135deg, #9b96ff, #7a76f5); }

          .mobile-invite-strip {
            width: 100%;
            min-height: 50px;
            display: grid;
            grid-template-columns: 42px auto minmax(0, 1fr) 18px;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            padding: 8px 10px;
            border-radius: 8px;
            background: #fff;
            color: #303641;
            text-align: left;
            box-shadow: 0 10px 24px rgba(32, 43, 56, 0.06);
          }

          .mobile-bot-face {
            width: 38px;
            height: 38px;
            display: grid;
            place-items: center;
            border-radius: 14px;
            background: #e9fbf6;
            color: #1bbd9e;
            font-weight: 1000;
          }

          .mobile-invite-strip strong {
            color: #19baa0;
            font-size: 0.84rem;
            font-weight: 900;
          }

          .mobile-invite-strip em {
            min-width: 0;
            color: #3d424a;
            font-size: 0.84rem;
            font-style: normal;
            font-weight: 800;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .strip-arrow {
            color: #c4c8ce;
            font-size: 1.8rem;
            line-height: 1;
          }

          .mobile-publisher-card,
          .mobile-special-card,
          .mobile-job-feed {
            margin-bottom: 12px;
            padding: 14px;
            border-radius: 8px;
            background: #fff;
            box-shadow: 0 10px 24px rgba(32, 43, 56, 0.05);
          }

          .mobile-section-title {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }

          .mobile-section-title h2,
          .mobile-special-card h2 {
            margin: 0;
            color: #292f38;
            font-size: 1.12rem;
            font-weight: 1000;
          }

          .publisher-avatars {
            display: flex;
            align-items: center;
          }

          .publisher-avatar {
            width: 28px;
            height: 28px;
            display: inline-grid;
            place-items: center;
            margin-left: -6px;
            border: 2px solid #fff;
            border-radius: 50%;
            background: #e9f7ff;
            color: #1675b8;
            font-size: 0.72rem;
            font-weight: 900;
          }

          .publisher-avatar:first-child {
            margin-left: 0;
          }

          .publisher-avatar.green { background: #dcfbef; color: #0e9d72; }
          .publisher-avatar.orange { background: #fff0dd; color: #f17626; }
          .publisher-avatar.cyan { background: #e1fbff; color: #0995a8; }
          .publisher-avatar.blue { background: #e8f0ff; color: #3867df; }
          .publisher-avatar.small {
            width: 26px;
            height: 26px;
            margin: 0 6px 0 0;
            border: 0;
          }

          .publisher-job-row {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 4px;
            scroll-snap-type: x mandatory;
          }

          .publisher-job-card {
            flex: 0 0 246px;
            min-height: 96px;
            scroll-snap-align: start;
            display: grid;
            gap: 5px;
            padding: 12px;
            border: 1px solid #ffe1d3;
            border-radius: 8px;
            background: linear-gradient(135deg, #fff9f5, #fff);
            text-align: left;
          }

          .publisher-job-card strong {
            color: #303641;
            font-size: 1rem;
            font-weight: 900;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .publisher-job-card span {
            color: #9ca1a9;
            font-size: 0.85rem;
            font-weight: 800;
          }

          .publisher-job-card em {
            color: #ff7040;
            font-size: 1.1rem;
            font-style: normal;
            font-weight: 1000;
          }

          .publisher-job-card small,
          .publisher-job-card p {
            display: none;
            margin: 0;
            color: #777d86;
            font-size: 0.82rem;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .mobile-special-card h2 {
            margin-bottom: 10px;
          }

          .mobile-special-row {
            display: flex;
            gap: 10px;
            overflow-x: auto;
          }

          .mobile-special-banner {
            flex: 0 0 132px;
            min-height: 68px;
            display: grid;
            align-content: center;
            gap: 6px;
            padding: 10px;
            border-radius: 8px;
            text-align: left;
          }

          .mobile-special-banner span {
            width: fit-content;
            padding: 2px 7px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.72);
            font-size: 0.68rem;
            font-weight: 900;
          }

          .mobile-special-banner strong {
            color: #303641;
            font-size: 0.95rem;
            font-weight: 1000;
          }

          .mobile-special-banner.purple { background: #ececff; }
          .mobile-special-banner.orange { background: #fff0d4; }
          .mobile-special-banner.cyan { background: #dcfbff; }

          .mobile-job-feed {
            padding-top: 14px;
          }

          .mobile-job-tabs {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 4px;
            margin-bottom: 4px;
          }

          .mobile-job-tabs button {
            position: relative;
            min-height: 40px;
            background: transparent;
            color: #303641;
            font-size: 1rem;
            font-weight: 900;
          }

          .mobile-job-tabs button.active {
            color: #19baa0;
          }

          .mobile-job-tabs button.active::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 34px;
            height: 5px;
            border-radius: 999px;
            background: #19baa0;
            transform: translateX(-50%);
          }

          .mobile-job-list {
            display: grid;
          }

          .mobile-job-card {
            padding: 16px 0;
            border-bottom: 1px solid #edf0f3;
            background: #fff;
          }

          .mobile-job-card:last-child {
            border-bottom: 0;
          }

          .mobile-job-card-head {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: start;
            gap: 10px;
            margin-bottom: 9px;
          }

          .mobile-job-card h3 {
            margin: 0;
            color: #292f38;
            font-size: 1.12rem;
            font-weight: 1000;
            line-height: 1.25;
            overflow-wrap: anywhere;
          }

          .mobile-job-card-head span {
            color: #a8adb4;
            font-size: 0.83rem;
            font-weight: 800;
            white-space: nowrap;
          }

          .mobile-job-card-head strong {
            color: #ff7040;
            font-size: 1.18rem;
            font-weight: 1000;
          }

          .mobile-job-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-bottom: 12px;
          }

          .mobile-job-tags span {
            padding: 5px 8px;
            border-radius: 5px;
            background: #f3f4f6;
            color: #777d86;
            font-size: 0.8rem;
            font-weight: 800;
          }

          .mobile-job-card p {
            margin: 0 0 14px;
            color: #666c75;
            font-size: 0.92rem;
            font-weight: 800;
          }

          .mobile-job-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }

          .mobile-job-footer div {
            display: flex;
            align-items: center;
            min-width: 0;
            color: #59616d;
            font-size: 0.86rem;
            font-weight: 800;
          }

          .mobile-job-footer button {
            min-width: 96px;
            height: 36px;
            border-radius: 999px;
            background: #ff854a;
            color: #fff;
            font-size: 0.88rem;
            font-weight: 900;
          }

          .mobile-job-footer button.online {
            background: #16cdb4;
          }
        }

        .recommender-console {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 28px;
          margin-bottom: 24px;
          padding: 32px;
          border: 1px solid rgba(0, 122, 255, 0.16);
          border-radius: 8px;
          background:
            radial-gradient(circle at 82% 16%, rgba(33, 198, 171, 0.18), transparent 30%),
            linear-gradient(135deg, #eff8ff 0%, #f9fcff 48%, #ffffff 100%);
          box-shadow: 0 24px 60px rgba(0, 61, 125, 0.1);
        }

        .console-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          color: #245f9f;
          font-weight: 800;
        }

        .console-left,
        .console-card {
          min-width: 0;
        }

        .console-brand img {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 8px 18px rgba(31, 93, 151, 0.12);
        }

        .console-left h1 {
          max-width: 620px;
          margin: 0 0 12px;
          color: #163356;
          font-size: clamp(2rem, 4.2vw, 3.6rem);
          font-weight: 900;
          letter-spacing: 0;
          line-height: 1.08;
          overflow-wrap: anywhere;
        }

        .mobile-title-break {
          display: none;
        }

        .console-left p {
          max-width: 680px;
          color: #52677f;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.8;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin: 28px 0 18px;
        }

        .trust-signal {
          min-height: 112px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          padding: 18px;
          border: 1px solid rgba(48, 137, 206, 0.18);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.86);
          box-shadow: 0 12px 28px rgba(45, 107, 165, 0.08);
        }

        .trust-signal strong {
          color: #0b7fe8;
          font-size: 1.38rem;
          font-weight: 900;
        }

        .trust-signal:nth-child(2) strong {
          color: #13b99a;
        }

        .trust-signal:nth-child(3) strong {
          color: #ff7a1a;
        }

        .trust-signal:nth-child(4) strong {
          color: #4f6cf7;
        }

        .trust-signal span {
          color: #54657a;
          font-size: 0.86rem;
          font-weight: 700;
          line-height: 1.45;
        }

        .service-points {
          display: grid;
          gap: 10px;
          max-width: 640px;
          padding: 16px 18px;
          border: 1px solid rgba(32, 190, 170, 0.22);
          border-radius: 8px;
          background: rgba(233, 255, 252, 0.78);
          color: #286273;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .service-points span::before {
          content: "";
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 10px;
          border-radius: 50%;
          background: #20c9ad;
          vertical-align: 1px;
        }

        .console-card {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 24px;
          border: 1px solid rgba(0, 122, 255, 0.14);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 18px 42px rgba(50, 104, 158, 0.12);
        }

        .console-card-head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
        }

        .console-kicker {
          display: block;
          margin-bottom: 6px;
          color: #698098;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .console-card h2 {
          color: #173657;
          font-size: 1.45rem;
          font-weight: 900;
        }

        .online-dot {
          align-self: flex-start;
          padding: 5px 10px;
          border-radius: 8px;
          background: rgba(22, 184, 128, 0.12);
          color: #0b996c;
          font-size: 0.78rem;
          font-weight: 900;
        }

        .console-tasks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .console-task {
          min-height: 86px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 14px;
          border-radius: 8px;
          background: #f4f8fc;
        }

        .console-task strong {
          font-size: 1.3rem;
          font-weight: 900;
        }

        .console-task span {
          color: #69788a;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .console-task.blue strong { color: #0b7fe8; }
        .console-task.green strong { color: #13a87f; }
        .console-task.orange strong { color: #ff7a1a; }

        .qr-login-card {
          display: grid;
          grid-template-columns: 78px minmax(0, 1fr);
          align-items: center;
          gap: 14px;
          padding: 14px;
          border: 1px dashed rgba(57, 129, 205, 0.28);
          border-radius: 8px;
          background: #f8fbff;
        }

        .fake-qr {
          width: 70px;
          height: 70px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 3px;
          padding: 6px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid #dce8f5;
        }

        .fake-qr span {
          border-radius: 2px;
          background: #e7f0f8;
        }

        .fake-qr span.dark {
          background: #163356;
        }

        .qr-login-card strong,
        .qr-login-card span {
          display: block;
        }

        .qr-login-card strong {
          color: #183756;
          font-weight: 900;
          margin-bottom: 4px;
        }

        .qr-login-card span {
          color: #6e7d8e;
          font-size: 0.84rem;
          font-weight: 700;
        }

        .console-primary {
          width: 100%;
          min-height: 48px;
          border-radius: 8px;
          background: linear-gradient(135deg, #0b7fe8, #13b99a);
          color: #fff;
          font-weight: 900;
          box-shadow: 0 14px 24px rgba(13, 131, 204, 0.22);
        }

        .doing-board {
          display: grid;
          grid-template-columns: 0.9fr 1.6fr;
          gap: 18px;
          margin-bottom: 24px;
        }

        .weekly-card,
        .service-upgrade-banner,
        .quick-job-panel,
        .ranking-card {
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          background: #fff;
          box-shadow: var(--shadow-card);
        }

        .weekly-card {
          padding: 20px;
          background:
            radial-gradient(circle at 100% 0%, rgba(42, 133, 255, 0.24), transparent 34%),
            linear-gradient(135deg, #2c7df6, #6797ff);
          color: #fff;
        }

        .weekly-head span,
        .weekly-head strong {
          display: block;
        }

        .weekly-head span {
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.78rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .weekly-head strong {
          font-size: 1rem;
          font-weight: 900;
        }

        .weekly-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin: 18px 0;
          padding: 14px;
          border-radius: 8px;
          background: rgba(25, 72, 180, 0.18);
        }

        .weekly-stats div {
          display: grid;
          gap: 4px;
          text-align: center;
        }

        .weekly-stats strong {
          font-size: 1.35rem;
          font-weight: 900;
        }

        .weekly-stats span {
          color: rgba(255, 255, 255, 0.76);
          font-size: 0.76rem;
          font-weight: 700;
        }

        .start-order-btn {
          min-height: 38px;
          width: 132px;
          border-radius: 8px;
          background: #fff;
          color: #2365d9;
          font-weight: 900;
        }

        .service-upgrade-banner {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 176px;
          padding: 24px 28px;
          background:
            radial-gradient(circle at 88% 18%, rgba(37, 214, 190, 0.26), transparent 28%),
            linear-gradient(135deg, #e8fbff, #f5fbff);
        }

        .service-upgrade-banner span {
          width: fit-content;
          margin-bottom: 12px;
          padding: 5px 10px;
          border-radius: 8px;
          background: rgba(19, 185, 154, 0.12);
          color: #0f9279;
          font-size: 0.8rem;
          font-weight: 900;
        }

        .service-upgrade-banner strong {
          color: #14395d;
          font-size: 1.7rem;
          font-weight: 1000;
          letter-spacing: 0;
        }

        .service-upgrade-banner p {
          margin-top: 10px;
          color: #607489;
          font-weight: 700;
        }

        .workbench-strip {
          display: grid;
          grid-template-columns: 0.7fr 1.6fr 0.7fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .workbench-strip div {
          min-height: 74px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 16px 20px;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          background: #fff;
          box-shadow: var(--shadow-card);
        }

        .workbench-strip span {
          color: var(--text-tertiary);
          font-size: 0.82rem;
          font-weight: 800;
        }

        .workbench-strip strong {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .module-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .module-heading h2 {
          font-size: 1.28rem;
          font-weight: 900;
          color: var(--text-primary);
        }

        .module-heading span {
          color: var(--text-tertiary);
          font-size: 0.88rem;
          font-weight: 700;
        }

        .module-heading.compact {
          margin-bottom: 12px;
        }

        .module-heading.compact button {
          background: transparent;
          color: #0b7fe8;
          font-weight: 800;
        }

        .special-campaigns,
        .quick-job-sections,
        .ranking-section {
          margin-bottom: 28px;
        }

        .campaign-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .campaign-card {
          min-height: 116px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding: 18px;
          border: 1px solid transparent;
          border-radius: 8px;
          text-align: left;
          box-shadow: var(--shadow-card);
        }

        .campaign-card span {
          padding: 3px 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.72);
          font-size: 0.76rem;
          font-weight: 900;
        }

        .campaign-card strong {
          color: #183756;
          font-size: 1.08rem;
          font-weight: 1000;
        }

        .campaign-card em {
          color: #637386;
          font-size: 0.82rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.45;
        }

        .campaign-card.purple { background: linear-gradient(135deg, #eef0ff, #fafbff); }
        .campaign-card.orange { background: linear-gradient(135deg, #fff3db, #fffaf0); }
        .campaign-card.cyan { background: linear-gradient(135deg, #e3fbff, #f6feff); }
        .campaign-card.red { background: linear-gradient(135deg, #ffe9e7, #fff8f6); }

        .quick-job-sections {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .quick-job-panel {
          padding: 18px;
        }

        .mini-job-list {
          display: grid;
          gap: 10px;
        }

        .mini-job-card {
          display: grid;
          gap: 6px;
          min-height: 68px;
          padding: 12px 14px;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          background: #fbfcfe;
          text-align: left;
        }

        .mini-job-card strong {
          color: var(--text-primary);
          font-size: 0.98rem;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mini-job-card span {
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ranking-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .ranking-card {
          padding: 18px;
        }

        .ranking-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .ranking-head strong {
          color: var(--text-primary);
          font-weight: 900;
        }

        .ranking-head span {
          color: var(--text-tertiary);
          font-size: 0.8rem;
          font-weight: 800;
        }

        .ranking-row {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr) auto;
          gap: 10px;
          align-items: center;
          min-height: 36px;
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 700;
        }

        .ranking-row .rank-index {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #edf4ff;
          color: #0b7fe8;
          font-weight: 900;
        }

        .ranking-row strong {
          color: #ff7a1a;
          font-weight: 900;
        }

        @media (max-width: 1080px) {
          .recommender-console {
            grid-template-columns: 1fr;
          }

          .trust-grid,
          .campaign-grid,
          .ranking-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .doing-board,
          .quick-job-sections {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .recommender-console {
            width: 100%;
            max-width: calc(100vw - 40px);
            grid-template-columns: minmax(0, 1fr);
            padding: 22px 16px;
            overflow: hidden;
          }

          .console-left h1 {
            max-width: 100%;
            font-size: 1.85rem;
            white-space: normal;
            word-break: break-all;
            overflow-wrap: anywhere;
          }

          .mobile-title-break {
            display: block;
          }

          .console-left p {
            max-width: 300px;
            font-size: 0.94rem;
            white-space: normal;
            word-break: break-all;
            overflow-wrap: anywhere;
          }

          .trust-grid,
          .console-tasks,
          .workbench-strip,
          .campaign-grid,
          .quick-job-sections,
          .ranking-grid,
          .doing-board {
            grid-template-columns: 1fr;
          }

          .doing-board,
          .special-campaigns,
          .quick-job-sections,
          .ranking-section,
          .workbench-strip {
            width: 100%;
            max-width: calc(100vw - 40px);
            overflow: hidden;
          }

          .weekly-card,
          .service-upgrade-banner,
          .quick-job-panel,
          .ranking-card {
            width: 100%;
            min-width: 0;
          }

          .weekly-stats {
            grid-template-columns: 1fr;
          }

          .service-upgrade-banner strong {
            font-size: 1.25rem;
            overflow-wrap: anywhere;
          }

          .service-upgrade-banner p {
            overflow-wrap: anywhere;
          }

          .module-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .console-card {
            width: 100%;
            max-width: 316px;
            padding: 18px;
          }

          .qr-login-card {
            grid-template-columns: 68px minmax(0, 1fr);
            max-width: 280px;
            overflow: hidden;
          }

          .fake-qr {
            width: 60px;
            height: 60px;
          }

          .console-primary {
            width: 100%;
            max-width: 280px;
            padding: 0 12px;
            font-size: 0.9rem;
            white-space: normal;
          }
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 24px;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .stats-row {
          display: flex;
          gap: 16px;
        }

        .stat-item {
          text-align: center;
          padding: 16px 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-item:hover {
          background: var(--bg-card-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .stat-item.highlight {
          background: var(--accent-glow);
          border-color: var(--border-accent);
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-item.highlight .stat-value {
          color: var(--accent-primary);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-desc {
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text-tertiary);
        }

        .section-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 200px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          font-size: 0.9rem;
          color: var(--text-tertiary);
        }

        .search-input {
          width: 100%;
          padding: 12px 36px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
        }

        .search-input::placeholder {
          color: var(--text-tertiary);
        }

        .search-clear {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 4px;
        }

        .search-clear:hover {
          color: var(--text-primary);
        }

        .filter-select {
          padding: 12px 16px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          cursor: pointer;
          outline: none;
          min-width: 110px;
          transition: all 0.2s ease;
        }

        .filter-select:focus {
          border-color: var(--accent-primary);
        }

        .filter-select option {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab:hover {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }

        .tab.active {
          background: var(--accent-glow);
          border-color: var(--border-accent);
          color: var(--accent-primary);
        }

        .tab-badge {
          background: var(--accent-primary);
          color: #0a0a0f;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .tab-badge.secondary {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .privilege-section {
          padding: 24px 0;
        }

        .privilege-header {
          margin-bottom: 32px;
        }

        .privilege-header h2 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .privilege-header p {
          color: var(--text-secondary);
        }

        .privilege-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .privilege-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 28px;
          position: relative;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .privilege-card:hover:not(.locked) {
          border-color: var(--accent-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glass);
        }

        .privilege-card.featured {
          border-color: var(--accent-primary);
          background: var(--accent-glow);
        }

        .privilege-card.locked {
          opacity: 0.7;
          border-style: dashed;
        }

        .privilege-card .card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 12px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .privilege-card .card-badge.hot {
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: white;
        }

        .privilege-card .card-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .privilege-card h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .privilege-card .card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .privilege-card .card-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .privilege-card .card-price {
          margin-bottom: 20px;
        }

        .privilege-card .card-price .price {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .privilege-card .card-price .period {
          font-size: 0.9rem;
          color: var(--text-tertiary);
        }

        .privilege-card .card-price .price.locked {
          font-size: 1rem;
          color: var(--text-tertiary);
        }

        .privilege-card .btn-buy {
          width: 100%;
          padding: 12px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .privilege-card .btn-buy:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        .privilege-card .btn-buy.locked {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
          cursor: not-allowed;
          border: 1px solid transparent;
        }

        .privilege-card .btn-buy.locked:hover {
          transform: none;
          box-shadow: none;
        }

        .privilege-level {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .privilege-level h3 {
          font-size: 1rem;
          margin-bottom: 20px;
        }

        .level-progress {
          margin-bottom: 20px;
        }

        .level-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .level-name {
          font-weight: 600;
          color: var(--accent-primary);
        }

        .level-score {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .level-progress .progress-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
        }

        .level-progress .progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: 4px;
        }

        .level-benefits {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .benefit-item .benefit-icon {
          color: var(--success);
        }

        .benefit-item.locked {
          color: var(--text-tertiary);
        }

        .benefit-item.locked .benefit-icon {
          color: var(--text-tertiary);
        }

        @media (max-width: 900px) {
          .privilege-grid {
            grid-template-columns: 1fr;
          }
        }

        .job-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .job-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .job-card:hover,
        .job-card.selected {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .job-header {
          margin-bottom: 16px;
        }

        .job-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .job-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .urgent-badge {
          background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
          animation: pulse 2s infinite;
        }

        .dispatch-badge {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .grab-badge {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .overseas-badge {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .sme-badge {
          background: linear-gradient(135deg, #a7f3d0, #34d399);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .ai-badge {
          background: linear-gradient(135deg, #f472b6, #db2777);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .chip-badge {
          background: linear-gradient(135deg, #cbd5e1, #64748b);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .energy-badge {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .company-info {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .company-logo {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          object-fit: contain;
          background: white;
          padding: 2px;
        }

        .company-name {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .salary {
          color: var(--accent-primary);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .job-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tag {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          border: 1px solid var(--glass-border);
        }

        .circle-tag {
          background: var(--accent-glow);
          color: var(--accent-primary);
          border: 1px solid var(--border-accent);
        }

        .industry-tag {
          background: rgba(168, 85, 247, 0.15);
          color: #a855f7;
          border-color: rgba(168, 85, 247, 0.3);
        }

        .location-tag {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          border-color: rgba(34, 197, 94, 0.3);
        }

        .job-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .match-score {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .match-bar {
          width: 100px;
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .match-fill {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .match-value {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 500;
        }

        .bonus {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .bonus-icon {
          font-size: 1rem;
        }

        .bonus-value {
          color: var(--bonus-gold);
          font-weight: 600;
          font-size: 1rem;
        }

        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .deadline {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .job-actions {
          display: flex;
          gap: 8px;
        }

        .btn-ai-parse {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(168, 85, 247, 0.15);
          color: #a855f7;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        .btn-ai-parse:hover {
          background: rgba(168, 85, 247, 0.25);
          transform: translateY(-1px);
        }

        .btn-ai-match {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .btn-ai-match:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-1px);
        }

        .btn-take-order {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff9d45, #ff6b35);
          color: #fff;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-weight: 800;
          font-size: 0.85rem;
          white-space: nowrap;
          box-shadow: 0 8px 18px rgba(255, 107, 53, 0.18);
        }

        .btn-share {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .btn-share:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-1px);
        }

        .btn-detail {
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(0, 122, 255, 0.3);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-detail:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-1px);
        }

        .job-detail-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .detail-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-value.high {
          color: var(--success);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-tertiary);
        }

        .empty-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 16px;
        }

        .empty-hint {
          font-size: 0.85rem;
          margin-top: 8px;
        }

        .job-expanded {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          animation: fadeIn 0.25s ease;
        }

        .share-preview {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .share-card {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          padding: 16px;
          border: 1px solid var(--glass-border);
        }

        .share-header {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .share-body p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .share-qr {
          margin-top: 12px;
          display: flex;
          justify-content: center;
        }

        .qr-placeholder {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .btn-wechat {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #07c160;
          color: white;
          padding: 12px 20px;
          border-radius: var(--radius-md);
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-wechat:hover {
          background: #06ad56;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
          }

          .stats-row {
            width: 100%;
            justify-content: space-between;
          }

          .job-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .job-actions {
            width: 100%;
          }

          .btn-share,
          .btn-detail {
            flex: 1;
            justify-content: center;
          }

          .share-preview {
            flex-direction: column;
          }

          .btn-wechat {
            width: 100%;
            justify-content: center;
          }
        }

        .ai-scan-tab {
          background: linear-gradient(135deg, rgba(0, 122, 255, 0.2), rgba(5, 150, 105, 0.2)) !important;
          border-color: rgba(0, 122, 255, 0.4) !important;
        }

        .ai-scan-tab:hover {
          background: linear-gradient(135deg, rgba(0, 122, 255, 0.3), rgba(5, 150, 105, 0.3)) !important;
        }

        .ai-scan-tab.scanning {
          animation: pulse 1.5s infinite;
        }

        .ai-scan-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.25s ease;
        }

        .ai-scan-modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          padding: 40px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-elevated);
        }

        .ai-scan-header {
          margin-bottom: 32px;
        }

        .ai-icon {
          font-size: 4rem;
          margin-bottom: 16px;
          animation: pulse 1s infinite;
        }

        .ai-scan-header h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .ai-scan-header p {
          color: var(--text-secondary);
        }

        .ai-scan-progress {
          margin-bottom: 32px;
        }

        .progress-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: 4px;
          transition: width 0.1s ease;
        }

        .progress-text {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .progress-percent {
          color: #007AFF;
          font-weight: 600;
        }

        .scan-stages {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .scan-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--text-tertiary);
          transition: all 0.25s ease;
          border: 1px solid var(--glass-border);
        }

        .scan-stage.complete {
          background: rgba(0, 122, 255, 0.2);
          color: #007AFF;
          border-color: rgba(0, 122, 255, 0.3);
        }

        .scan-stage .stage-icon {
          font-size: 1.5rem;
        }

        .ai-funnel-section {
          margin: 24px 0;
          padding: 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          animation: fadeIn 0.4s ease;
        }

        .funnel-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .funnel-header h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        .funnel-header p {
          color: var(--text-secondary);
        }

        .funnel-chart {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .funnel-stage {
          animation: slideIn 0.4s ease forwards;
          opacity: 0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .funnel-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          border-left: 4px solid #007AFF;
          border: 1px solid var(--glass-border);
        }

        .funnel-stage.final .funnel-bar {
          background: rgba(0, 122, 255, 0.15);
          border-left-color: #007AFF;
        }

        .funnel-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .funnel-icon {
          font-size: 1.25rem;
        }

        .funnel-text {
          display: flex;
          flex-direction: column;
        }

        .funnel-label {
          color: var(--text-primary);
          font-weight: 500;
        }

        .funnel-desc {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .funnel-count {
          font-weight: 700;
          color: #007AFF;
          font-size: 1.1rem;
        }

        .funnel-arrow {
          text-align: center;
          color: var(--text-tertiary);
          font-size: 1rem;
          padding: 4px 0;
        }

        .ai-contact-section {
          margin-top: 24px;
          padding: 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          animation: fadeIn 0.4s ease;
        }

        .ai-contact-header {
          margin-bottom: 20px;
        }

        .ai-contact-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .ai-badge {
          background: var(--accent-gradient);
          color: #0a0a0f;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .ai-contact-title h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .ai-contact-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .ai-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ai-contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          animation: slideUp 0.35s ease forwards;
          opacity: 0;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ai-contact-card:hover {
          border-color: rgba(0, 122, 255, 0.4);
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .ai-contact-avatar {
          width: 48px;
          height: 48px;
          min-width: 48px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0f;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .ai-contact-avatar-img {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .ai-contact-info {
          flex: 1;
          min-width: 0;
        }

        .ai-contact-name-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .ai-contact-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .ai-circle-badge {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 10px;
          background: var(--accent-glow);
          color: var(--accent-primary);
        }

        .ai-circle-大厂圈 { background: rgba(30, 138, 240, 0.15); color: #007AFF; }
        .ai-circle-校友圈 { background: rgba(0, 122, 255, 0.15); color: #007AFF; }
        .ai-circle-AI圈 { background: rgba(74, 222, 128, 0.15); color: #4ade80; }
        .ai-circle-技术圈 { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }

        .ai-contact-position {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .ai-contact-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ai-relation {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .ai-contact-skills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .ai-skill-tag {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border-radius: 10px;
          border: 1px solid var(--glass-border);
        }

        .ai-btn-invite {
          padding: 10px 20px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .ai-btn-invite:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        .ai-contact-summary {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .recommend-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.25s ease;
        }

        .recommend-modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.25s ease;
          box-shadow: var(--shadow-elevated);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .recommend-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--glass-border);
        }

        .recommend-header h3 {
          font-size: 1.1rem;
        }

        .close-btn {
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: var(--text-primary);
        }

        .recommend-body {
          padding: 24px;
        }

        .candidate-preview {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          border: 1px solid var(--glass-border);
        }

        .preview-avatar {
          width: 56px;
          height: 56px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0f;
          font-weight: 600;
          font-size: 1.25rem;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .preview-avatar-img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .preview-info {
          flex: 1;
        }

        .preview-name {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .preview-title {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .preview-skills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .preview-skill-tag {
          font-size: 0.75rem;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border-radius: 10px;
          border: 1px solid var(--glass-border);
        }

        .rating-section, .reason-section, .c2-reason-section {
          margin-bottom: 20px;
        }

        .rating-section h4, .reason-section h4, .c2-reason-section h4 {
          font-size: 0.95rem;
          margin-bottom: 8px;
        }

        .rating-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }

        .rating-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--glass-border);
        }

        .rating-item label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
        }

        .star-btn {
          background: transparent;
          font-size: 1.25rem;
          opacity: 0.3;
          transition: all 0.2s;
          cursor: pointer;
        }

        .star-btn.active {
          opacity: 1;
          color: #fbbf24;
        }

        .star-btn:hover {
          transform: scale(1.2);
        }

        .reason-section textarea, .c2-reason-section textarea {
          width: 100%;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-sans);
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .reason-section textarea:focus, .c2-reason-section textarea:focus {
          border-color: var(--accent-primary);
        }

        .c2-reason-section h4 {
          color: #007AFF;
        }

        .btn-submit-recommend {
          width: 100%;
          padding: 14px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .btn-submit-recommend:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .section-tabs {
            flex-wrap: wrap;
          }

          .ai-scan-modal {
            padding: 24px;
          }

          .scan-stages {
            grid-template-columns: repeat(2, 1fr);
          }

          .funnel-bar {
            padding: 12px 16px;
          }

          .funnel-info {
            gap: 8px;
          }

          .funnel-label {
            font-size: 0.9rem;
          }

          .funnel-count {
            font-size: 1rem;
          }

          .ai-contact-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .ai-btn-invite {
            width: 100%;
            justify-content: center;
          }

          .ai-contact-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        .recommend-error {
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 8px;
          text-align: center;
          padding: 8px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: var(--radius-sm);
        }

        .share-card-preview {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-bottom: 20px;
        }

        .share-card-header {
          font-weight: 600;
          font-size: 1rem;
          color: var(--accent-primary);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .share-candidate-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .share-avatar {
          width: 48px;
          height: 48px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0f;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .share-avatar-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .share-candidate-details {
          display: flex;
          flex-direction: column;
        }

        .share-candidate-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .share-candidate-title {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .share-ratings {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
        }

        .share-rating-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }

        .share-rating-item span:first-child {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .share-rating-stars {
          font-size: 0.85rem;
        }

        .share-reason {
          padding: 12px;
          background: rgba(0, 122, 255, 0.1);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--accent-primary);
        }

        .share-reason-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          display: block;
          margin-bottom: 4px;
        }

        .share-reason p {
          font-size: 0.9rem;
          color: var(--text-primary);
          margin: 0;
        }

        .share-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .btn-wechat {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: #07c160;
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-wechat:hover {
          background: #06ad56;
          transform: translateY(-1px);
        }

        .btn-copy-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-copy-link:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
        }

        .btn-done {
          width: 100%;
          padding: 14px;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-done:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        /* 专区标签样式 */
        .zone-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .zone-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .zone-tab:hover {
          background: var(--bg-card-hover);
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }

        .zone-tab.active {
          background: var(--accent-glow);
          border-color: var(--border-accent);
          color: var(--accent-primary);
          font-weight: 600;
        }

        .zone-icon {
          font-size: 1.1rem;
        }

        .zone-badge {
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 8px;
          background: rgba(255, 149, 0, 0.15);
          color: var(--warning);
          font-weight: 600;
          margin-left: 4px;
        }

        /* 专区介绍样式 */
        .zone-intro {
          margin-bottom: 24px;
        }

        .intro-card {
          background: linear-gradient(135deg, var(--accent-glow), rgba(255, 255, 255, 0.05));
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-glow);
        }

        .intro-icon {
          font-size: 2.5rem;
          min-width: 60px;
          text-align: center;
        }

        .intro-content {
          flex: 1;
        }

        .intro-content h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .intro-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .intro-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .intro-stats .stat {
          text-align: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .intro-stats .num {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
          margin-bottom: 4px;
        }

        .intro-stats .lbl {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* 工资溢价样式 */
        .salary-premium {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 8px;
          background: rgba(251, 191, 36, 0.15);
          color: var(--warning);
          font-weight: 600;
          margin-left: 8px;
        }

        /* 中小企业优惠标签 */
        .sme-benefit-tag {
          background: rgba(74, 222, 128, 0.15);
          color: var(--success);
          border-color: rgba(74, 222, 128, 0.3);
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .job-hall {
            max-width: none;
          }

          .recommender-console {
            max-width: none;
            padding: 18px;
            border-radius: 18px;
            background: #ffffff;
          }

          .console-brand {
            margin-bottom: 12px;
          }

          .console-left h1 {
            font-size: 1.65rem;
            line-height: 1.18;
            word-break: normal;
            overflow-wrap: normal;
          }

          .console-left p,
          .service-points,
          .console-card,
          .trust-grid,
          .workbench-strip,
          .ranking-section {
            display: none;
          }

          .doing-board,
          .quick-job-sections {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .weekly-card,
          .service-upgrade-banner,
          .quick-job-panel {
            border-radius: 16px;
            background: #fff;
            box-shadow: none;
          }

          .weekly-stats {
            grid-template-columns: repeat(3, 1fr);
          }

          .special-campaigns {
            margin-top: 14px;
          }

          .module-heading {
            margin-bottom: 12px;
          }

          .module-heading h2,
          .section-title {
            font-size: 1.22rem;
          }

          .module-heading span,
          .section-desc {
            display: none;
          }

          .campaign-grid {
            display: flex;
            overflow-x: auto;
            padding-bottom: 4px;
            scroll-snap-type: x mandatory;
          }

          .campaign-card {
            flex: 0 0 170px;
            min-height: 92px;
            scroll-snap-align: start;
          }

          .quick-job-sections {
            display: none;
          }

          .zone-tabs {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            gap: 10px;
            margin: 18px -12px 14px;
            padding: 0 12px 8px;
          }

          .zone-tab {
            min-height: 44px;
            padding: 9px 14px;
            border-radius: 999px;
            background: #fff;
            border-color: #edf0f3;
          }

          .zone-tab.active {
            background: #e8fbf6;
            color: #12aa92;
            border-color: #31c7b1;
          }

          .intro-card {
            flex-direction: column;
            text-align: center;
            padding: 18px;
            border-radius: 16px;
            box-shadow: none;
          }

          .intro-stats {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }

          .intro-stats .stat {
            flex: 1;
          }

          .section-tabs {
            position: sticky;
            top: 0;
            z-index: 20;
            gap: 8px;
            overflow-x: auto;
            margin: 0 -12px 12px;
            padding: 8px 12px;
            background: rgba(247, 248, 250, 0.94);
            backdrop-filter: blur(12px);
          }

          .section-tabs .tab {
            min-height: 42px;
            flex: 0 0 auto;
            border-radius: 999px;
            background: #fff;
          }

          .filter-bar {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-bottom: 0;
          }

          .search-input-wrapper {
            min-width: 0;
          }

          .search-input {
            min-height: 48px;
            border: 2px solid #31c7b1;
            border-radius: 999px;
            background: #fff;
          }

          .filter-select {
            min-height: 42px;
            border-radius: 999px;
            background: #fff;
          }

          .job-list {
            gap: 0;
            margin-top: 14px;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
          }

          .job-card {
            position: relative;
            padding: 18px 0;
            border: 0;
            border-radius: 0;
            border-bottom: 1px solid #eef1f4;
            background: #fff;
            box-shadow: none;
            backdrop-filter: none;
          }

          .job-card:hover,
          .job-card.selected {
            transform: none;
            box-shadow: none;
            background: #fff;
            border-color: #eef1f4;
          }

          .job-header {
            padding-right: 96px;
            margin-bottom: 10px;
          }

          .job-title-row {
            display: block;
            margin-bottom: 8px;
          }

          .job-title {
            font-size: 1.28rem;
            line-height: 1.25;
            font-weight: 850;
          }

          .urgent-badge,
          .dispatch-badge,
          .grab-badge,
          .overseas-badge,
          .sme-badge,
          .ai-badge,
          .chip-badge,
          .energy-badge {
            display: inline-flex;
            margin: 8px 6px 0 0;
            border-radius: 6px;
          }

          .company-info {
            display: block;
          }

          .company-logo {
            display: none;
          }

          .company-name {
            display: block;
            color: #636b76;
            font-size: 1rem;
            margin-top: 8px;
          }

          .salary {
            display: inline-flex;
            margin-top: 8px;
            color: #858b96;
            background: #f4f5f6;
            padding: 5px 9px;
            border-radius: 6px;
            font-weight: 600;
          }

          .job-tags {
            gap: 6px;
            margin-bottom: 12px;
          }

          .tag {
            border: 0;
            border-radius: 6px;
            background: #f4f5f6;
            color: #777f8b;
            padding: 5px 9px;
          }

          .circle-tag,
          .industry-tag,
          .location-tag,
          .sme-benefit-tag {
            background: #f4f5f6;
            color: #777f8b;
          }

          .job-meta {
            position: absolute;
            top: 18px;
            right: 0;
            display: block;
            margin: 0;
            text-align: right;
          }

          .match-score {
            display: none;
          }

          .bonus {
            display: block;
          }

          .bonus-icon {
            display: none;
          }

          .bonus::before {
            content: '佣金 ';
            color: #b5bac1;
            font-size: 0.92rem;
            font-weight: 500;
          }

          .bonus-value {
            color: #ff6b35;
            font-size: 1.18rem;
            font-weight: 850;
          }

          .job-footer {
            flex-direction: row;
            align-items: center;
            gap: 12px;
            padding-top: 10px;
            border-top: 0;
          }

          .deadline {
            color: #8b929c;
          }

          .job-actions {
            width: auto;
            margin-left: auto;
          }

          .btn-ai-parse,
          .btn-ai-match {
            display: none;
          }

          .btn-take-order {
            min-height: 42px;
            padding: 0 18px;
            border-radius: 999px;
            font-size: 0.96rem;
          }

          .job-expanded {
            margin-top: 14px;
            padding: 14px;
            border-radius: 14px;
            background: #f6f8fb;
          }
        }

        .app.force-mobile:has(.job-hall.mobile-detail-open) .app-mobile-bottom-nav,
        .app.force-mobile:has(.job-hall.mobile-list-open) .app-mobile-bottom-nav {
          display: none;
        }

        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) {
          max-width: none;
          width: 100%;
          margin: -12px -14px 0;
          background: #f3f6f7;
        }

        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .mobile-hewa-home {
          display: block;
          min-height: 100vh;
          padding: 16px 16px calc(112px + env(safe-area-inset-bottom, 0px));
          color: #272d37;
        }

        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .recommender-console,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .doing-board,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .workbench-strip,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .special-campaigns,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .quick-job-sections,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .zone-tabs,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .zone-intro,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .section-tabs,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .section-header,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .filter-bar,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .job-list,
        .app.force-mobile .job-hall:not(.mobile-detail-open):not(.mobile-list-open) .ranking-section {
          display: none !important;
        }

        .app.force-mobile .mobile-hewa-header,
        .app.force-mobile .mobile-hewa-brand,
        .app.force-mobile .mobile-hewa-entrances,
        .app.force-mobile .mobile-job-card-head,
        .app.force-mobile .mobile-job-footer {
          display: flex;
        }

        .app.force-mobile .mobile-hewa-header {
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .app.force-mobile .mobile-hewa-brand {
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .app.force-mobile .mobile-hewa-brand img {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: #fff;
        }

        .app.force-mobile .mobile-hewa-brand strong,
        .app.force-mobile .mobile-hewa-brand span {
          display: block;
        }

        .app.force-mobile .mobile-hewa-brand strong {
          color: #20283a;
          font-size: 1.24rem;
          font-weight: 900;
        }

        .app.force-mobile .mobile-hewa-brand span {
          max-width: 260px;
          color: #5d6470;
          font-size: 0.8rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .app.force-mobile .mobile-hewa-more {
          width: 70px;
          height: 38px;
          border: 1px solid rgba(31, 42, 68, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.86);
          color: #1f2a44;
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .app.force-mobile .mobile-hewa-search {
          position: sticky;
          top: 0;
          z-index: 120;
          margin: 0 -16px 12px;
          padding: 8px 16px 10px;
          background: rgba(243, 246, 247, 0.94);
        }

        .app.force-mobile .mobile-hewa-search .search-input {
          height: 48px;
          padding: 0 42px 0 48px;
          border: 2px solid #25c8ad;
          border-radius: 999px;
          background: #fff;
          color: #20283a;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .app.force-mobile .mobile-hewa-hero {
          width: 100%;
          min-height: 98px;
          display: grid;
          align-content: center;
          gap: 5px;
          margin-bottom: 14px;
          padding: 14px 18px;
          border-radius: 8px;
          text-align: left;
          background: linear-gradient(135deg, #7c8cff 0%, #f4d2ff 48%, #ffe49d 100%);
        }

        .app.force-mobile .mobile-hewa-hero span,
        .app.force-mobile .mobile-hewa-hero strong,
        .app.force-mobile .mobile-hewa-hero em {
          display: block;
        }

        .app.force-mobile .mobile-hewa-hero span {
          width: fit-content;
          padding: 4px 9px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: #4f55d9;
          font-size: 0.76rem;
          font-weight: 900;
        }

        .app.force-mobile .mobile-hewa-hero strong {
          color: #161a2d;
          font-size: 1.34rem;
          font-weight: 1000;
        }

        .app.force-mobile .mobile-hewa-hero em {
          color: rgba(22, 26, 45, 0.7);
          font-style: normal;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .app.force-mobile .mobile-hewa-entrances {
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .app.force-mobile .mobile-hewa-entry {
          flex: 1;
          display: grid;
          justify-items: center;
          gap: 8px;
          min-width: 0;
          background: transparent;
          color: #303641;
        }

        .app.force-mobile .mobile-hewa-entry span {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          color: #fff;
          font-size: 1rem;
          font-weight: 900;
          box-shadow: 0 12px 20px rgba(34, 99, 184, 0.16);
        }

        .app.force-mobile .mobile-hewa-entry strong {
          font-size: 0.78rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .app.force-mobile .mobile-publisher-card,
        .app.force-mobile .mobile-special-card,
        .app.force-mobile .mobile-job-feed {
          margin-bottom: 12px;
          padding: 14px;
          border-radius: 8px;
          background: #fff;
        }

        .app.force-mobile .mobile-job-tabs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 4px;
        }

        .app.force-mobile .mobile-job-card {
          padding: 16px 0;
          border-bottom: 1px solid #edf0f3;
          background: #fff;
        }

        .app.force-mobile .mobile-job-card-head,
        .app.force-mobile .mobile-job-footer {
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .app.force-mobile .job-hall.mobile-list-open {
          max-width: none;
          width: 100%;
          margin: -12px -14px 0;
          background: #fff;
        }

        .app.force-mobile .job-hall.mobile-list-open .mobile-job-list-page,
        .app.force-mobile .job-hall.mobile-list-open .mobile-dispatch-page,
        .app.force-mobile .job-hall.mobile-list-open .mobile-subscription-page {
          display: block;
          min-height: 100vh;
          padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px));
          color: #272d37;
        }

        .app.force-mobile .job-hall.mobile-list-open .mobile-hewa-home,
        .app.force-mobile .job-hall.mobile-list-open .recommender-console,
        .app.force-mobile .job-hall.mobile-list-open .doing-board,
        .app.force-mobile .job-hall.mobile-list-open .workbench-strip,
        .app.force-mobile .job-hall.mobile-list-open .special-campaigns,
        .app.force-mobile .job-hall.mobile-list-open .quick-job-sections,
        .app.force-mobile .job-hall.mobile-list-open .zone-tabs,
        .app.force-mobile .job-hall.mobile-list-open .zone-intro,
        .app.force-mobile .job-hall.mobile-list-open .section-tabs,
        .app.force-mobile .job-hall.mobile-list-open .section-header,
        .app.force-mobile .job-hall.mobile-list-open .filter-bar,
        .app.force-mobile .job-hall.mobile-list-open .job-list,
        .app.force-mobile .job-hall.mobile-list-open .ranking-section {
          display: none !important;
        }

        .app.force-mobile .job-hall.mobile-detail-open {
          max-width: none;
          width: 100%;
          margin: -12px -14px 0;
          background: #fff;
        }

        .app.force-mobile .job-hall.mobile-detail-open .mobile-job-detail-page {
          display: block;
          min-height: 100vh;
          padding: calc(8px + env(safe-area-inset-top, 0px)) 0 calc(96px + env(safe-area-inset-bottom, 0px));
          background: #fff;
          color: #272d37;
        }

        .app.force-mobile .job-hall.mobile-detail-open .mobile-hewa-home,
        .app.force-mobile .job-hall.mobile-detail-open .mobile-subscription-page,
        .app.force-mobile .job-hall.mobile-detail-open .recommender-console,
        .app.force-mobile .job-hall.mobile-detail-open .doing-board,
        .app.force-mobile .job-hall.mobile-detail-open .workbench-strip,
        .app.force-mobile .job-hall.mobile-detail-open .special-campaigns,
        .app.force-mobile .job-hall.mobile-detail-open .quick-job-sections,
        .app.force-mobile .job-hall.mobile-detail-open .zone-tabs,
        .app.force-mobile .job-hall.mobile-detail-open .zone-intro,
        .app.force-mobile .job-hall.mobile-detail-open .section-tabs,
        .app.force-mobile .job-hall.mobile-detail-open .section-header,
        .app.force-mobile .job-hall.mobile-detail-open .filter-bar,
        .app.force-mobile .job-hall.mobile-detail-open .job-list,
        .app.force-mobile .job-hall.mobile-detail-open .ranking-section {
          display: none !important;
        }

        .app.force-mobile .mobile-detail-top {
          position: sticky;
          top: 0;
          z-index: 150;
          display: grid;
          grid-template-columns: 42px 1fr 76px;
          align-items: center;
          gap: 8px;
          padding: 8px 16px 12px;
          background: rgba(255, 255, 255, 0.97);
        }

        .app.force-mobile .mobile-detail-top button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          color: #1f2a44;
          font-size: 1.8rem;
          line-height: 1;
        }

        .app.force-mobile .mobile-detail-top strong {
          text-align: center;
          color: #1f2937;
          font-size: 1.24rem;
          font-weight: 900;
        }

        .app.force-mobile .mobile-detail-more {
          width: 76px !important;
          height: 38px !important;
          border: 1px solid #eef0f2;
          border-radius: 999px !important;
          font-size: 1.2rem !important;
          letter-spacing: 2px;
        }

        .app.force-mobile .mobile-detail-summary,
        .app.force-mobile .mobile-detail-publisher,
        .app.force-mobile .mobile-progress-strip,
        .app.force-mobile .mobile-detail-content {
          padding-left: 16px;
          padding-right: 16px;
        }

        .app.force-mobile .mobile-detail-summary {
          padding-top: 10px;
          padding-bottom: 14px;
          border-bottom: 1px solid #eef0f2;
        }

        .app.force-mobile .detail-title-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 12px;
          align-items: start;
          margin-bottom: 12px;
        }

        .app.force-mobile .detail-title-row h1 {
          margin: 0;
          color: #222833;
          font-size: 1.44rem;
          font-weight: 1000;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }

        .app.force-mobile .detail-commission {
          text-align: right;
          white-space: nowrap;
        }

        .app.force-mobile .detail-commission span {
          color: #a8adb5;
          font-size: 0.86rem;
          font-weight: 800;
        }

        .app.force-mobile .detail-commission strong {
          display: block;
          color: #ff6636;
          font-size: 1.4rem;
          font-weight: 1000;
        }

        .app.force-mobile .detail-tag-row,
        .app.force-mobile .detail-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .app.force-mobile .detail-tag-row span {
          padding: 7px 10px;
          border-radius: 4px;
          color: #777d86;
          font-size: 0.9rem;
          font-weight: 800;
          background: #f4f5f6;
        }

        .app.force-mobile .detail-badge-row span {
          padding: 6px 10px;
          border: 1px solid #d6dce3;
          border-radius: 4px;
          color: #6f7782;
          font-size: 0.86rem;
          font-weight: 800;
        }

        .app.force-mobile .detail-title-row p {
          margin: 16px 0 0;
          color: #686f79;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .app.force-mobile .detail-quick-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .app.force-mobile .detail-quick-actions button {
          min-width: 72px;
          height: 34px;
          border: 1px solid #e6eaee;
          border-radius: 999px;
          background: #fff;
          color: #505866;
          font-size: 0.86rem;
          font-weight: 800;
        }

        .app.force-mobile .mobile-detail-publisher {
          padding-top: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid #eef0f2;
        }

        .app.force-mobile .advisor-profile {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr) 16px;
          align-items: center;
          gap: 10px;
        }

        .app.force-mobile .mobile-detail-publisher .publisher-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 0;
        }

        .app.force-mobile .advisor-profile strong {
          display: block;
          color: #27303b;
          font-size: 0.98rem;
          font-weight: 1000;
        }

        .app.force-mobile .advisor-profile strong em,
        .app.force-mobile .review-stars {
          color: #ff7438;
          font-style: normal;
          letter-spacing: 1px;
        }

        .app.force-mobile .advisor-profile p,
        .app.force-mobile .review-item p {
          margin: 4px 0 0;
          color: #737b86;
          font-size: 0.86rem;
          font-weight: 700;
          line-height: 1.55;
        }

        .app.force-mobile .publisher-service-row {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 14px;
          color: #272d37;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .app.force-mobile .publisher-service-row strong,
        .app.force-mobile .mobile-detail-publisher p strong {
          color: #ff6636;
        }

        .app.force-mobile .mobile-detail-publisher > p {
          margin: 12px 0 0;
          color: #272d37;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .app.force-mobile .mobile-progress-strip {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr)) 18px;
          align-items: center;
          margin: 18px 16px;
          padding: 12px 8px;
          border: 1.5px solid #25c8ad;
          border-radius: 8px;
          color: #626a75;
          text-align: center;
        }

        .app.force-mobile .mobile-progress-strip div {
          border-right: 1px solid #e1f4f0;
        }

        .app.force-mobile .mobile-progress-strip div:nth-child(4) {
          border-right: 0;
        }

        .app.force-mobile .mobile-progress-strip strong,
        .app.force-mobile .mobile-progress-strip span {
          display: block;
        }

        .app.force-mobile .mobile-progress-strip strong {
          color: #5a626b;
          font-size: 1.18rem;
          font-weight: 1000;
        }

        .app.force-mobile .mobile-progress-strip span {
          color: #6d737c;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .app.force-mobile .detail-arrow {
          color: #24c3a8;
          font-size: 1.8rem;
          font-weight: 400;
        }

        .app.force-mobile .mobile-detail-tabs {
          position: sticky;
          top: 56px;
          z-index: 140;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
          padding: 12px 0 10px;
          border-top: 8px solid #f4f7f8;
          border-bottom: 1px solid #eef0f2;
          background: rgba(255, 255, 255, 0.98);
        }

        .app.force-mobile .mobile-detail-tabs button {
          position: relative;
          min-height: 44px;
          background: transparent;
          color: #2e333b;
          font-size: 1rem;
          font-weight: 900;
          white-space: nowrap;
        }

        .app.force-mobile .mobile-detail-tabs button.active {
          color: #20bfa6;
        }

        .app.force-mobile .mobile-detail-tabs button.active::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 34px;
          height: 5px;
          border-radius: 999px;
          background: #25c8ad;
          transform: translateX(-50%);
        }

        .app.force-mobile .mobile-detail-tabs button span {
          position: absolute;
          top: -2px;
          right: 8px;
          min-width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #ff5950;
          color: #fff;
          font-size: 0.75rem;
        }

        .app.force-mobile .mobile-detail-content {
          padding-top: 18px;
        }

        .app.force-mobile .mobile-detail-block {
          padding: 0 0 22px;
          margin-bottom: 22px;
          border-bottom: 1px solid #edf0f2;
          background: #fff;
        }

        .app.force-mobile .mobile-detail-block h2 {
          margin: 0 0 16px;
          color: #2b3038;
          font-size: 1.22rem;
          line-height: 1.25;
          font-weight: 1000;
        }

        .app.force-mobile .mobile-detail-block h3 {
          margin: 14px 0 8px;
          color: #2b3038;
          font-size: 1rem;
          font-weight: 1000;
        }

        .app.force-mobile .mobile-detail-block p,
        .app.force-mobile .detail-clause-list {
          margin: 0;
          color: #6f747d;
          font-size: 0.98rem;
          font-weight: 650;
          line-height: 1.78;
        }

        .app.force-mobile .notice-table,
        .app.force-mobile .detail-line-list,
        .app.force-mobile .commission-table {
          display: grid;
          gap: 12px;
          margin: 0;
        }

        .app.force-mobile .notice-table div,
        .app.force-mobile .detail-line-list div,
        .app.force-mobile .commission-table div {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 10px;
        }

        .app.force-mobile .notice-table {
          padding: 16px;
          border-radius: 6px;
          background: #f5f7fb;
        }

        .app.force-mobile .notice-table dt,
        .app.force-mobile .detail-line-list dt,
        .app.force-mobile .commission-table dt {
          color: #7c828b;
          font-size: 0.95rem;
          font-weight: 900;
        }

        .app.force-mobile .notice-table dd,
        .app.force-mobile .detail-line-list dd,
        .app.force-mobile .commission-table dd {
          margin: 0;
          color: #6b717b;
          font-size: 0.95rem;
          font-weight: 750;
          line-height: 1.62;
          overflow-wrap: anywhere;
        }

        .app.force-mobile .report-tip {
          padding: 12px;
          border-radius: 8px;
          background: #f5f7f8;
        }

        .app.force-mobile .report-flow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 16px;
          color: #68707a;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .app.force-mobile .report-flow span::after {
          content: "";
          display: block;
          height: 3px;
          margin-top: 10px;
          border-radius: 999px;
          background: #25c8ad;
        }

        .app.force-mobile .company-verify-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .app.force-mobile .company-verify-head img,
        .app.force-mobile .company-verify-head > span {
          width: 58px;
          height: 58px;
          border-radius: 12px;
          background: #f2f4f5;
        }

        .app.force-mobile .company-verify-head em {
          padding: 5px 10px;
          border: 1px solid #6ca8ff;
          border-radius: 4px;
          background: #edf5ff;
          color: #4a8df7;
          font-style: normal;
          font-weight: 900;
        }

        .app.force-mobile .detail-card-title button {
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          background: #ff6636;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 900;
        }

        .app.force-mobile .commission-band {
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          border: 1px solid #27c8ad;
          border-radius: 6px;
          background: #eefbf8;
          color: #20bfa6 !important;
          font-size: 1.05rem !important;
          font-weight: 1000 !important;
        }

        .app.force-mobile .commission-band::after {
          content: "›";
          font-size: 1.6rem;
        }

        .app.force-mobile .detail-clause-list {
          padding-left: 22px;
        }

        .app.force-mobile .review-filter-row {
          display: flex;
          gap: 18px;
          margin: -2px -16px 18px;
          padding: 12px 16px 14px;
          overflow-x: auto;
          border-bottom: 1px solid #edf0f2;
        }

        .app.force-mobile .review-filter-row button {
          flex: 0 0 auto;
          background: transparent;
          color: #222b3b;
          font-size: 0.95rem;
          font-weight: 900;
        }

        .app.force-mobile .review-filter-row button.active {
          color: #20bfa6;
        }

        .app.force-mobile .review-item {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 14px;
          padding: 18px 0;
          border-bottom: 1px solid #edf0f2;
        }

        .app.force-mobile .review-avatar {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e9fbf6;
          color: #1fb79f;
          font-weight: 1000;
        }

        .app.force-mobile .review-item header {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .app.force-mobile .review-item header strong {
          color: #222b3b;
          font-size: 1rem;
          font-weight: 1000;
        }

        .app.force-mobile .review-item header span,
        .app.force-mobile .review-position {
          color: #9ca2aa;
          font-size: 0.86rem;
          font-weight: 700;
        }

        .app.force-mobile .review-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 8px 0;
        }

        .app.force-mobile .review-tags span {
          padding: 6px 9px;
          border-radius: 5px;
          background: #f4f6f7;
          color: #7c828b;
          font-size: 0.84rem;
          font-weight: 800;
        }

        .app.force-mobile .mobile-detail-actions {
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 480;
          display: grid;
          grid-template-columns: 58px 58px 58px minmax(0, 1fr);
          gap: 10px;
          width: min(430px, 100vw);
          padding: 8px 16px calc(10px + env(safe-area-inset-bottom, 0px));
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 -8px 18px rgba(15, 23, 42, 0.08);
          box-sizing: border-box;
        }

        .app.force-mobile .mobile-detail-actions button {
          height: 54px;
          display: grid;
          place-items: center;
          align-content: center;
          gap: 3px;
          border-radius: 0;
          background: transparent;
          color: #1f2a44;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .app.force-mobile .mobile-detail-actions button span {
          font-size: 1.55rem;
          line-height: 1;
        }

        .app.force-mobile .mobile-detail-actions button.primary {
          height: 54px;
          border-radius: 999px;
          background: #16cdb4;
          color: #fff;
          font-size: 1.12rem;
          font-weight: 900;
          box-shadow: 0 10px 18px rgba(22, 205, 180, 0.22);
        }

        @media (prefers-reduced-motion: reduce) {
          .job-card,
          .ai-contact-card,
          .btn-ai-match,
          .btn-share,
          .btn-wechat,
          .ai-btn-invite,
          .btn-submit-recommend,
          .stat-item,
          .tab {
            transition: none;
          }
          
          .funnel-stage,
          .ai-contact-card {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
