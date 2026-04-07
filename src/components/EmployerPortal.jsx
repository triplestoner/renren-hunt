import { useState } from 'react';

const mockJobs = [
  {
    id: 1,
    title: '资深前端架构师',
    status: '进行中',
    candidates: 12,
    views: 45,
    bonus: '¥25,000',
    posted: '2026-03-15',
    urgent: true,
  },
  {
    id: 2,
    title: 'AI算法工程师',
    status: '进行中',
    candidates: 8,
    views: 32,
    bonus: '¥18,000',
    posted: '2026-03-10',
    urgent: false,
  },
  {
    id: 3,
    title: '产品总监',
    status: '已暂停',
    candidates: 5,
    views: 28,
    bonus: '¥35,000',
    posted: '2026-03-01',
    urgent: false,
  },
];

const mockCandidates = [
  {
    id: 1,
    name: '张同学',
    avatar: 'https://i.pravatar.cc/80?u=zhang',
    title: '资深前端工程师',
    experience: '8年',
    education: '清华大学·硕士',
    schoolLogo: 'https://ui-avatars.com/api/?name=清华&background=CB3333&color=fff&size=32&font-size=0.4&bold=true',
    skills: ['React', 'TypeScript', '架构设计', '团队管理'],
    matchScore: 95,
    referrer: { name: '李小牛', avatar: 'https://i.pravatar.cc/40?u=lixiaoniu', score: 92, level: 'S级' },
    status: '待查看',
    review: null,
  },
  {
    id: 2,
    name: '王同学',
    avatar: 'https://i.pravatar.cc/80?u=wang',
    title: 'AI算法专家',
    experience: '5年',
    education: '北大·博士',
    schoolLogo: 'https://ui-avatars.com/api/?name=北大&background=003087&color=fff&size=32&font-size=0.4&bold=true',
    skills: ['Python', 'LLM', '深度学习', '推荐系统'],
    matchScore: 88,
    referrer: { name: '王老师', avatar: 'https://i.pravatar.cc/40?u=wang2', score: 88, level: 'A级' },
    status: '已查看',
    review: { stage: '一面', date: '2026-03-18' },
  },
  {
    id: 3,
    name: '赵同学',
    avatar: 'https://i.pravatar.cc/80?u=zhao',
    title: '后端技术专家',
    experience: '6年',
    education: '浙大·本科',
    schoolLogo: 'https://ui-avatars.com/api/?name=浙大&background=003087&color=fff&size=32&font-size=0.4&bold=true',
    skills: ['Java', 'Go', '微服务', '分布式系统'],
    matchScore: 82,
    referrer: { name: '李小牛', avatar: 'https://i.pravatar.cc/40?u=lixiaoniu', score: 92, level: 'S级' },
    status: '已推荐',
    review: null,
  },
];

export default function EmployerPortal({ publishedJobs: jobsFromParent, setPublishedJobs }) {
  const [activeTab, setActiveTab] = useState('candidates');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewedCandidate, setViewedCandidate] = useState(null);
  const [candidates, setCandidates] = useState(mockCandidates);
  const [activeFilter, setActiveFilter] = useState('全部');
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [pendingClose, setPendingClose] = useState(false);
  const [internalJobs, setInternalJobs] = useState(mockJobs);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);
  const [showPostPublishModal, setShowPostPublishModal] = useState(false);
  const [lastPublishedJob, setLastPublishedJob] = useState(null);
  const [showJDPreview, setShowJDPreview] = useState(false);
  const [showEvaluateModal, setShowEvaluateModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [activeDetailView, setActiveDetailView] = useState(null);
  const [activeDetailData, setActiveDetailData] = useState(null);

  const detailJobs = [
    { id: 1, title: '资深前端架构师', status: '进行中', candidates: 12, views: 45, bonus: '¥25,000', posted: '2026-03-15', urgent: true, industry: '互联网', location: '北京' },
    { id: 2, title: 'AI算法工程师', status: '进行中', candidates: 8, views: 32, bonus: '¥18,000', posted: '2026-03-10', urgent: false, industry: '人工智能', location: '北京' },
  ];

  const detailResumes = [
    { id: 1, name: '张同学', avatar: 'https://i.pravatar.cc/80?u=zhang', title: '资深前端工程师', experience: '8年', education: '清华大学·硕士', skills: ['React', 'TypeScript', '架构设计'], matchScore: 95, referrer: { name: '李小牛', score: 92, level: 'S级' }, status: '待查看', jobTitle: '资深前端架构师' },
    { id: 2, name: '王同学', avatar: 'https://i.pravatar.cc/80?u=wang', title: 'AI算法专家', experience: '5年', education: '北大·博士', skills: ['Python', 'LLM', '深度学习'], matchScore: 88, referrer: { name: '王老师', score: 88, level: 'A级' }, status: '已查看', jobTitle: 'AI算法工程师' },
    { id: 3, name: '赵同学', avatar: 'https://i.pravatar.cc/80?u=zhao', title: '后端技术专家', experience: '6年', education: '浙大·本科', skills: ['Java', 'Go', '微服务'], matchScore: 82, referrer: { name: '李小牛', score: 92, level: 'S级' }, status: '已推荐', jobTitle: '资深前端架构师' },
  ];

  const detailInterviews = [
    { id: 1, name: '王同学', avatar: 'https://i.pravatar.cc/80?u=wang', title: 'AI算法专家', experience: '5年', education: '北大·博士', stage: '二面', interviewDate: '2026-03-20', interviewer: '技术总监张老师', jobTitle: 'AI算法工程师' },
    { id: 2, name: '孙同学', avatar: 'https://i.pravatar.cc/80?u=sun', title: '前端工程师', experience: '4年', education: '上交·硕士', stage: '初试', interviewDate: '2026-03-19', interviewer: '前端负责人李老师', jobTitle: '资深前端架构师' },
    { id: 3, name: '周同学', avatar: 'https://i.pravatar.cc/80?u=zhou', title: '产品经理', experience: '6年', education: '复旦·本科', stage: '终面', interviewDate: '2026-03-21', interviewer: 'CEO', jobTitle: '产品总监' },
  ];

  const detailJoined = [
    { id: 1, name: '吴同学', avatar: 'https://i.pravatar.cc/80?u=wu', title: '后端工程师', experience: '3年', education: '北邮·硕士', joinDate: '2026-03-01', position: '后端开发工程师', department: '基础架构部', bonus: '¥15,000' },
  ];

  const allJobs = jobsFromParent || internalJobs;
  const updateJobs = setPublishedJobs || setInternalJobs;
  const [contractStatus, setContractStatus] = useState({
    locked: '¥125,000',
    pending: '¥45,000',
    claimed: '¥25,000',
    txHash: '0x7f9a...a3b2',
  });
  const [showContractModal, setShowContractModal] = useState(false);
  const [lockingFunds, setLockingFunds] = useState(false);
  const [lockProgress, setLockLockProgress] = useState(0);
  const [jdText, setJdText] = useState('');
  const [jdAnalysis, setJdAnalysis] = useState(null);

  const [pipelineData, setPipelineData] = useState([
    { stage: '新推荐', count: 5, color: '#60a5fa' },
    { stage: '简历初筛', count: 3, color: '#007AFF' },
    { stage: '面试安排', count: 2, color: '#fbbf24' },
    { stage: 'Offer发放', count: 1, color: '#4ade80' },
    { stage: '入职', count: 0, color: '#22c55e' },
  ]);

  const [evaluateForm, setEvaluateForm] = useState({
    resumeAccuracy: 5,
    matchDegree: 5,
    comment: '',
  });

  const [jobForm, setJobForm] = useState({
    title: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    salaryMonths: '12',
    bonus: '',
    education: '',
    experience: '',
    skills: [],
    circles: [],
    circleDetail: '',
    description: '',
    urgent: false,
    industry: '互联网',
    location: '北京',
  });
  const [bonusMode, setBonusMode] = useState('auto');

  const skillRecommendations = {
    '前端': ['React', 'Vue', 'TypeScript', 'Webpack', 'Node.js', '前端架构'],
    '后端': ['Java', 'Go', 'Python', 'Spring Boot', '微服务', '分布式系统'],
    '算法': ['Python', '机器学习', '深度学习', 'LLM', '推荐系统', '计算机视觉'],
    '产品': ['产品设计', 'B端产品', 'SaaS', '用户增长', '数据分析', '团队管理'],
    '设计': ['UI设计', 'UX设计', 'Figma', '设计系统', '交互设计'],
    '测试': ['自动化测试', '性能测试', '测试用例', 'Selenium', 'Jest'],
    '运营': ['用户运营', '内容运营', '数据分析', '增长黑客', '社群运营'],
    '数据': ['SQL', 'Python', '数据分析', 'ETL', '数据可视化', 'Hadoop'],
    '安全': ['网络安全', '渗透测试', '安全架构', '加密算法', '合规'],
    '移动端': ['iOS', 'Android', 'Flutter', 'React Native', '移动端架构'],
  };

  const allSkills = [
    'React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'Go', 'C++',
    'Spring Boot', 'Django', 'Flask', 'FastAPI', 'Kubernetes', 'Docker', 'Redis', 'MongoDB', 'MySQL',
    '机器学习', '深度学习', 'TensorFlow', 'PyTorch', 'LLM', 'NLP', '计算机视觉',
    'AWS', 'Azure', 'GCP', 'Linux', 'Nginx', 'Git', 'CI/CD',
    '微服务', '分布式', '高并发', '性能优化', '架构设计',
    '产品设计', 'B端产品', 'SaaS', '用户增长', '数据分析',
    'UI设计', 'UX设计', 'Figma', 'Sketch', '原型设计',
  ];

  const circleOptions = [
    { id: 'unlimited', name: '不限圈层', icon: '🌍', desc: '全平台Recommender基于Trust Score公平竞争派单' },
    { id: 'school', name: '校友圈层', icon: '🎓', desc: '定向派发给特定高校或企业联盟的Recommender' },
    { id: 'company', name: '企业圈层', icon: '🏢', desc: '定向派发给拥有特定大厂/竞品背景的Recommender' },
    { id: 'tech', name: '技术圈层', icon: '💻', desc: '派发给拥有极高技术专业认知的Recommender' },
    { id: 'hunter', name: '专业猎头', icon: '🎯', desc: '允许认证过的专业猎头机构接单（兜底保障）' },
  ];

  const handleTitleChange = (value) => {
    setJobForm(prev => ({ ...prev, title: value }));
    
    let recommendedSkills = [];
    const title = value.toLowerCase();
    
    for (const [key, skills] of Object.entries(skillRecommendations)) {
      if (title.includes(key)) {
        recommendedSkills = skills;
        break;
      }
    }
    
    if (recommendedSkills.length > 0) {
      const existingSkills = jobForm.skills.filter(s => !recommendedSkills.includes(s));
      setJobForm(prev => ({
        ...prev,
        skills: [...existingSkills, ...recommendedSkills.slice(0, 3)]
      }));
    }
  };

  const toggleSkill = (skill) => {
    setJobForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleCircle = (circleId) => {
    setJobForm(prev => {
      let newCircles;
      if (circleId === 'unlimited') {
        newCircles = prev.circles.includes('unlimited') ? [] : ['unlimited'];
      } else {
        newCircles = prev.circles.includes(circleId)
          ? prev.circles.filter(c => c !== circleId && c !== 'unlimited')
          : [...prev.circles.filter(c => c !== 'unlimited'), circleId];
      }
      return { ...prev, circles: newCircles };
    });
  };

  const handleCloseModal = () => {
    if (jobForm.title || jobForm.salary || jobForm.description || jdText) {
      setShowCloseConfirm(true);
    } else {
      resetForm();
      setShowNewJobModal(false);
    }
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    resetForm();
    setShowNewJobModal(false);
  };

  const resetForm = () => {
    setJobForm({
      title: '',
      salary: '',
      salaryMin: '',
      salaryMax: '',
      salaryMonths: '12',
      bonus: '',
      education: '',
      experience: '',
      skills: [],
      circles: [],
      circleDetail: '',
      description: '',
      urgent: false,
      industry: '互联网',
      location: '北京',
    });
    setJdText('');
    setJdAnalysis(null);
  };

  const handleLockFunds = () => {
    setShowContractModal(true);
    setLockingFunds(true);
    setLockLockProgress(0);

    const interval = setInterval(() => {
      setLockLockProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLockingFunds(false);
          setContractStatus(prev => ({
            ...prev,
            locked: '¥150,000',
            txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...',
          }));
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handlePublishJob = () => {
    if (!jobForm.title || !jobForm.bonus) {
      alert('请填写职位名称和悬赏金额');
      return;
    }

    const newJob = {
      id: Date.now(),
      title: jobForm.title,
      company: '字节跳动',
      companyLogo: 'https://logo.clearbit.com/bytedance.com',
      salary: jobForm.salary || '面议',
      tags: jobForm.skills.length > 0 ? jobForm.skills : ['技术岗'],
      deadline: jobForm.urgent ? '剩余12小时' : '剩余3天',
      urgent: jobForm.urgent,
      bonus: jobForm.bonus,
      circle: jobForm.circles.includes('school') ? '#校友圈' : 
              jobForm.circles.includes('company') ? '#企业圈' : 
              jobForm.circles.includes('tech') ? '#技术圈' : '#不限圈层',
      match: Math.floor(Math.random() * 20) + 80,
      status: '进行中',
      candidates: 0,
      views: 0,
      posted: new Date().toISOString().split('T')[0],
      education: jobForm.education,
      experience: jobForm.experience,
      circles: jobForm.circles,
      description: jobForm.description,
      industry: jobForm.industry || '互联网',
      location: jobForm.location || '北京',
    };

    updateJobs([newJob, ...allJobs]);
    setLastPublishedJob(newJob);
    setShowPublishSuccess(true);
    setTimeout(() => {
      setShowPublishSuccess(false);
    }, 1500);
    setShowPostPublishModal(true);
  };

  const handleBuyProduct = (productId) => {
    const prices = {
      'topcard': 300,
      'topcard-pro': 800,
      'ai-bgcheck': 1999,
    };
    const names = {
      'topcard': '急聘置顶卡',
      'topcard-pro': '急聘置顶卡（强化版）',
      'ai-bgcheck': 'AI背调包',
    };
    alert(`✅ 购买成功！\n\n服务: ${names[productId]}\n金额: ¥${prices[productId].toLocaleString()}\n\n该服务已添加到您的账户`);
  };

  const moveToNextStage = (currentStage) => {
    const stageOrder = ['新推荐', '简历初筛', '面试安排', 'Offer发放', '入职'];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex < stageOrder.length - 1) {
      const newData = [...pipelineData];
      newData[currentIndex].count -= 1;
      newData[currentIndex + 1].count += 1;
      setPipelineData(newData);
    }
  };

  const analyzeJD = (text) => {
    const skills = [];
    const skillKeywords = {
      'React': ['react', '前端'],
      'Vue': ['vue', '前端'],
      'TypeScript': ['typescript', 'ts'],
      'Node.js': ['node', 'nodejs', '后端'],
      'Python': ['python', 'python'],
      'Java': ['java', '后端'],
      'Go': ['go', 'golang'],
      '机器学习': ['机器学习', 'ml'],
      '深度学习': ['深度学习', 'dl'],
      'LLM': ['llm', '大模型', 'gpt'],
    };
    
    const textLower = text.toLowerCase();
    for (const [skill, keywords] of Object.entries(skillKeywords)) {
      if (keywords.some(k => textLower.includes(k))) {
        skills.push(skill);
      }
    }

    let years = '';
    const yearMatch = text.match(/(\d+)-?(\d+)?\s*年/);
    if (yearMatch) {
      years = yearMatch[1] + (yearMatch[2] ? '-' + yearMatch[2] : '+') + '年';
    }

    setJdAnalysis({
      skills: skills.length > 0 ? skills : ['根据JD内容自动识别'],
      experience: years || '3-5年',
      level: text.includes('架构师') || text.includes('专家') ? '高级' : 
             text.includes('资深') ? '资深' : '中级',
      keyPoints: text.split(/[，。,\n]/).filter(s => s.length > 5).slice(0, 3),
    });
    setShowJDPreview(true);
  };

  const handleJDChange = (value) => {
    setJdText(value);
    if (value.length > 50) {
      analyzeJD(value);
    }
  };

  const formatSalary = (min, max, months) => {
    if (!min && !max) return '';
    if (min && max) return `${min}-${max}K·${months}薪`;
    if (min) return `${min}K起·${months}薪`;
    if (max) return `${max}K以下·${months}薪`;
    return '';
  };

  const calculateBonus = (salary) => {
    if (!salary) return 0;
    const match = salary.match(/(\d+)[Kk]?-(\d+)?[Kk]?/);
    if (match) {
      const min = parseInt(match[1]) || 0;
      const max = parseInt(match[2]) || min;
      const avgMonthly = (min + max) / 2 * 1000;
      const months = salary.match(/(\d+)薪/);
      const numMonths = months ? parseInt(months[1]) : 12;
      const annualSalary = avgMonthly * numMonths;
      return Math.round(annualSalary * 0.1);
    }
    return 0;
  };

  const stats = [
    { label: '进行中职位', value: 2, icon: '📋' },
    { label: '收到简历', value: 25, icon: '📄' },
    { label: '面试中', value: 4, icon: '👥' },
    { label: '本月入职', value: 1, icon: '✅' },
  ];

  return (
    <div className="employer-portal">
      <header className="page-header">
        <div className="header-top">
          <div className="company-info">
            <div className="company-logo-wrapper">
              <img 
                src="https://ui-avatars.com/api/?name=字节跳动&background=007AFF&color=fff&size=56&font-size=0.4&bold=true" 
                alt="字节跳动" 
                className="company-logo-img" 
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="company-logo-fallback">字</div>
            </div>
            <div>
              <h1>字节跳动</h1>
              <p className="company-badge">企业认证 ✓</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-lock-funds" onClick={handleLockFunds}>
              <span>🔐</span> 锁定悬赏金
            </button>
            <button className="btn-new-job" onClick={() => setShowNewJobModal(true)}>
              <span>+</span> 发布新职位
            </button>
          </div>
        </div>

        <div className="stats-row">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`stat-card ${activeDetailView === stat.label ? 'active' : ''}`}
              onClick={() => {
                if (activeDetailView === stat.label) {
                  setActiveDetailView(null);
                } else {
                  if (stat.label === '进行中职位') setActiveDetailData({ jobs: detailJobs });
                  else if (stat.label === '收到简历') setActiveDetailData({ resumes: detailResumes });
                  else if (stat.label === '面试中') setActiveDetailData({ interviews: detailInterviews });
                  else if (stat.label === '本月入职') setActiveDetailData({ joined: detailJoined });
                  setActiveDetailView(stat.label);
                }
              }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {activeDetailView && activeDetailData && (
          <div className="detail-view-section">
            <div className="detail-view-header">
              <h3>{activeDetailView}</h3>
              <button className="close-detail-view" onClick={() => setActiveDetailView(null)}>✕ 关闭</button>
            </div>
            
            {activeDetailView === '进行中职位' && (
              <div className="detail-jobs-list">
                {activeDetailData.jobs.map(job => (
                  <div key={job.id} className="detail-job-card">
                    <div className="detail-job-main">
                      <h4>{job.title}</h4>
                      <div className="detail-job-tags">
                        <span className="job-tag">{job.industry}</span>
                        <span className="job-tag">{job.location}</span>
                        {job.urgent && <span className="urgent-tag">急招</span>}
                      </div>
                    </div>
                    <div className="detail-job-stats">
                      <span>📄 {job.candidates} 候选人</span>
                      <span>👁️ {job.views} 浏览</span>
                      <span className="bonus-tag">{job.bonus}</span>
                    </div>
                    <div className="detail-job-footer">
                      <span className="posted-date">发布于 {job.posted}</span>
                      <button className="btn-manage">管理职位</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeDetailView === '收到简历' && (
              <div className="detail-resumes-list">
                {activeDetailData.resumes.map(resume => (
                  <div key={resume.id} className="detail-resume-card">
                    <div className="resume-main">
                      <img src={resume.avatar} alt={resume.name} className="resume-avatar" />
                      <div className="resume-info">
                        <div className="resume-header">
                          <span className="resume-name">{resume.name}</span>
                          <span className={`resume-status ${resume.status}`}>{resume.status}</span>
                        </div>
                        <span className="resume-title">{resume.title}</span>
                        <span className="resume-meta">{resume.education} · {resume.experience}</span>
                      </div>
                      <div className="resume-match">
                        <span className="match-score">{resume.matchScore}%</span>
                        <span className="match-label">匹配度</span>
                      </div>
                    </div>
                    <div className="resume-footer">
                      <span className="apply-position">应聘职位: {resume.jobTitle}</span>
                      <div className="resume-skills">
                        {resume.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeDetailView === '面试中' && (
              <div className="detail-interviews-list">
                {activeDetailData.interviews.map(interview => (
                  <div key={interview.id} className="detail-interview-card">
                    <div className="interview-main">
                      <img src={interview.avatar} alt={interview.name} className="interview-avatar" />
                      <div className="interview-info">
                        <span className="interview-name">{interview.name}</span>
                        <span className="interview-title">{interview.title}</span>
                        <span className="interview-meta">{interview.education} · {interview.experience}</span>
                      </div>
                      <div className="interview-stage">
                        <span className={`stage-badge ${interview.stage}`}>{interview.stage}</span>
                        <span className="interview-date">📅 {interview.interviewDate}</span>
                      </div>
                    </div>
                    <div className="interview-footer">
                      <span className="interview-position">应聘职位: {interview.jobTitle}</span>
                      <span className="interview-interviewer">面试官: {interview.interviewer}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeDetailView === '本月入职' && (
              <div className="detail-joined-list">
                {activeDetailData.joined.map(person => (
                  <div key={person.id} className="detail-joined-card">
                    <div className="joined-main">
                      <img src={person.avatar} alt={person.name} className="joined-avatar" />
                      <div className="joined-info">
                        <span className="joined-name">{person.name}</span>
                        <span className="joined-title">{person.title}</span>
                        <span className="joined-meta">{person.education} · {person.experience}</span>
                      </div>
                      <div className="joined-date">
                        <span className="join-label">入职日期</span>
                        <span className="join-value">{person.joinDate}</span>
                      </div>
                    </div>
                    <div className="joined-footer">
                      <div className="joined-detail">
                        <span>入职岗位: {person.position}</span>
                        <span>部门: {person.department}</span>
                        <span className="joined-bonus">悬赏金: {person.bonus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="contract-bar">
          <div className="contract-item">
            <span className="contract-label">🔒 锁定资金</span>
            <span className="contract-value">{contractStatus.locked}</span>
          </div>
          <div className="contract-item">
            <span className="contract-label">⏳ 待结算</span>
            <span className="contract-value pending">{contractStatus.pending}</span>
          </div>
          <div className="contract-item">
            <span className="contract-label">✅ 已发放</span>
            <span className="contract-value success">{contractStatus.claimed}</span>
          </div>
          <span className="contract-hash">Tx: {contractStatus.txHash}</span>
        </div>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'candidates' ? 'active' : ''}`}
          onClick={() => setActiveTab('candidates')}
        >
          <span>🎯</span> 候选人
        </button>
        <button 
          className={`tab ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          <span>🔄</span> 招聘流程
        </button>
        <button 
          className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          <span>📋</span> 职位管理
        </button>
        <button 
          className={`tab ${activeTab === 'finance' ? 'active' : ''}`}
          onClick={() => setActiveTab('finance')}
        >
          <span>💳</span> 财务中心
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <span>📊</span> 数据分析
        </button>
        <button 
          className={`tab ${activeTab === 'store' ? 'active' : ''}`}
          onClick={() => setActiveTab('store')}
        >
          <span>🛒</span> 增值商城
        </button>
      </div>

      {activeTab === 'store' && (
        <div className="store-section">
          <div className="store-header">
            <h2>🎁 增值服务</h2>
            <p>提升招聘效率，助力快速获取人才</p>
          </div>
          <div className="store-grid">
            <div className="store-card featured">
              <div className="card-badge hot">🔥 爆款</div>
              <div className="card-icon">🚀</div>
              <h3>急聘置顶卡</h3>
              <p className="card-desc">职位置顶展示，大幅提升曝光量</p>
              <div className="card-features">
                <span>✓ 置顶72小时</span>
                <span>✓ 优先推荐给S级推手</span>
                <span>✓ 专属标识</span>
              </div>
              <div className="card-price">
                <span className="price">¥300</span>
                <span className="period">/ 3天</span>
              </div>
              <button className="btn-buy" onClick={() => handleBuyProduct('topcard')}>立即购买</button>
            </div>
            <div className="store-card">
              <div className="card-badge">⭐ 热门</div>
              <div className="card-icon">⚡</div>
              <h3>急聘置顶卡（强化版）</h3>
              <p className="card-desc">全站强推，触达更多优质推手</p>
              <div className="card-features">
                <span>✓ 置顶7天</span>
                <span>✓ 推送给全部推手</span>
                <span>✓ 黄金位置展示</span>
              </div>
              <div className="card-price">
                <span className="price">¥800</span>
                <span className="period">/ 7天</span>
              </div>
              <button className="btn-buy" onClick={() => handleBuyProduct('topcard-pro')}>立即购买</button>
            </div>
            <div className="store-card">
              <div className="card-badge ai">🤖 AI</div>
              <div className="card-icon">🔍</div>
              <h3>AI背调包</h3>
              <p className="card-desc">AI智能背景调查，降低用人风险</p>
              <div className="card-features">
                <span>✓ 学历验证</span>
                <span>✓ 离职原因分析</span>
                <span>✓ 薪资背调</span>
                <span>✓ 风险预警</span>
              </div>
              <div className="card-price">
                <span className="price">¥1,999</span>
                <span className="period">/ 月</span>
              </div>
              <button className="btn-buy" onClick={() => handleBuyProduct('ai-bgcheck')}>立即购买</button>
            </div>
          </div>
          <div className="store-history">
            <h3>📦 已购服务</h3>
            <div className="history-list">
              <div className="history-item">
                <span className="history-name">AI背调包</span>
                <span className="history-date">到期: 2026-04-15</span>
                <span className="history-status active">使用中</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="candidates-section">
          <div className="filter-bar">
            <div className="filter-tags">
              {['全部', '待查看', '已查看', '已推荐'].map(filter => (
                <button 
                  key={filter}
                  className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="search-box">
              <span>🔍</span>
              <input type="text" placeholder="搜索候选人..." />
            </div>
          </div>

          <div className="candidates-layout">
            <div className="candidates-list">
              {(activeFilter === '全部' ? candidates : candidates.filter(c => c.status === activeFilter)).map((candidate, index) => (
                <div 
                  key={candidate.id}
                  className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''} animate-fade-in animate-delay-${index + 1}`}
                  onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                >
                  <div className="candidate-main">
                    {candidate.avatar ? (
                      <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
                    ) : (
                      <div className="candidate-avatar">{candidate.name[0]}</div>
                    )}
                    <div className="candidate-info">
                      <div className="candidate-header">
                        <span className="candidate-name">{candidate.name}</span>
                        <span className={`status-badge ${candidate.status}`}>{candidate.status}</span>
                      </div>
                      <span className="candidate-title">{candidate.title}</span>
                      <span className="candidate-exp">
                        {candidate.schoolLogo && <img src={candidate.schoolLogo} alt="" className="school-logo" />}
                        {candidate.education} · {candidate.experience}
                      </span>
                    </div>
                    <div className="match-score">
                      <span className="score-value">{candidate.matchScore}%</span>
                      <span className="score-label">匹配度</span>
                    </div>
                  </div>

                  <div className="candidate-tags">
                    {candidate.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="tag">{skill}</span>
                    ))}
                  </div>

                  <div className="referrer-section">
                    <span className="referrer-label">推荐人</span>
                    <div className="referrer-info">
                      {candidate.referrer.avatar && (
                        <img src={candidate.referrer.avatar} alt={candidate.referrer.name} className="referrer-avatar" />
                      )}
                      <span className="referrer-name">{candidate.referrer.name}</span>
                      <span className="referrer-badge diamond">
                        💎 {candidate.referrer.score}分 · {candidate.referrer.level}
                      </span>
                    </div>
                    <button 
                      className="btn-view-detail"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewedCandidate(candidate.id);
                      }}
                    >
                      查看详情
                    </button>
                  </div>

                  {selectedCandidate === candidate.id && (
                    <div className="candidate-expanded">
                      <div className="action-buttons">
                        {candidate.status === '待查看' && (
                          <button 
                            className="btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewedCandidate(candidate.id);
                              setCandidates(candidates.map(c => 
                                c.id === candidate.id ? { ...c, status: '已查看' } : c
                              ));
                            }}
                          >
                            查看三维简历
                          </button>
                        )}
                        {candidate.status === '已查看' && viewedCandidate === candidate.id && (
                          <>
                            <button className="btn-primary">安排面试</button>
                            <button className="btn-secondary">不合适</button>
                          </>
                        )}
                        {candidate.status === '已推荐' && (
                          <button className="btn-primary">查看简历</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {viewedCandidate && (
              <div className="candidate-detail">
                <div className="detail-header">
                  <button 
                    className="close-detail-btn"
                    onClick={() => setViewedCandidate(null)}
                  >
                    ✕
                  </button>
                  <h3>📋 三维简历</h3>
                  <span className="dimension-badge">Recommender信用：💎 {candidates.find(c => c.id === viewedCandidate)?.referrer.score}分</span>
                </div>
                
                <div className="resume-3d">
                  <div className="resume-dimension">
                    <h4>📝 维度一：客观面（自述简历）</h4>
                    <div className="dimension-content">
                      <p>毕业于清华大学计算机系，8年互联网从业经验。</p>
                      <p>擅长前端架构设计与团队管理，曾主导多个大型项目重构。</p>
                      <div className="dimension-meta">
                        <span>工作年限：8年</span>
                        <span>学历：清华大学·硕士</span>
                      </div>
                    </div>
                  </div>

                  <div className="resume-dimension">
                    <h4>🤝 维度二：主观面（Recommender背调）</h4>
                    <div className="dimension-content">
                      <div className="review-card-mini">
                        <span className="reviewer">推荐人：{candidates.find(c => c.id === viewedCandidate)?.referrer.name}（{candidates.find(c => c.id === viewedCandidate)?.referrer.level}）</span>
                        <p className="review-text">"技术能力极强，架构思维优秀，有带领20人团队的经验。"</p>
                        <div className="review-ratings">
                          <span className="rating">技术能力 ⭐⭐⭐⭐⭐</span>
                          <span className="rating">沟通能力 ⭐⭐⭐⭐☆</span>
                          <span className="rating">团队管理 ⭐⭐⭐⭐⭐</span>
                        </div>
                        <span className="review-relation">关系：前同事 · 共事3年</span>
                      </div>
                    </div>
                  </div>

                  <div className="resume-dimension">
                    <h4>📊 维度三：历史面（平台面试记录）</h4>
                    <div className="dimension-content">
                      <div className="history-review">
                        <div className="history-item">
                          <span className="history-company">某一线大厂</span>
                          <span className="history-result pass">✅ 技术过关</span>
                          <span className="history-feedback">"算法能力优秀，系统设计思路清晰"</span>
                        </div>
                        <div className="history-item">
                          <span className="history-company">某AI创业公司</span>
                          <span className="history-result reject">❌ 淘汰原因</span>
                          <span className="history-feedback">"薪资预期过高，匹配度不足"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="unlock-section">
                  <div className="unlock-info">
                    <span className="unlock-icon">🔓</span>
                    <div className="unlock-text">
                      <span className="unlock-title">单次解锁机制</span>
                      <span className="unlock-desc">点击"查看联系方式"即代表正式接纳该推荐，可查看候选人真实姓名与电话</span>
                    </div>
                  </div>
                  <button className="btn-unlock">
                    🔓 查看完整联系方式
                  </button>
                </div>

                <div className="detail-actions">
                  <button className="btn-primary">安排面试</button>
                  <button className="btn-secondary">发送Offer</button>
                  <button className="btn-reject" onClick={() => setShowRejectModal(true)}>淘汰</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <div className="pipeline-section">
          <p className="section-desc">实时追踪招聘进度，拖拽或点击更新候选人状态</p>
          
          <div className="pipeline-board">
            {pipelineData.map((stage, index) => (
              <div key={stage.stage} className="pipeline-column">
                <div className="pipeline-header" style={{ borderColor: stage.color }}>
                  <span className="pipeline-stage-name">{stage.stage}</span>
                  <span className="pipeline-count" style={{ background: stage.color }}>{stage.count}</span>
                </div>
                <div className="pipeline-content">
                  {index === 0 && candidates.slice(0, 2).map(candidate => (
                    <div key={candidate.id} className="pipeline-card">
                      <div className="pipeline-card-header">
                        <span className="candidate-name">{candidate.name}</span>
                        <span className="referrer-score">⭐ {candidate.referrer.score}</span>
                      </div>
                      <span className="candidate-position">{candidate.title}</span>
                      <div className="pipeline-card-actions">
                        <button 
                          className="btn-move"
                          onClick={() => moveToNextStage(stage.stage)}
                        >
                          →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pipeline-stats">
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">平均招聘周期</span>
              <span className="stat-value">23天</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📈</span>
              <span className="stat-label">简历通过率</span>
              <span className="stat-value">42%</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <span className="stat-label">Offer接受率</span>
              <span className="stat-value">78%</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="finance-section">
          <p className="section-desc">管理悬赏金、查看退款及申请开具发票</p>
          
          <div className="finance-overview">
            <div className="finance-card locked">
              <div className="finance-icon">🔒</div>
              <div className="finance-info">
                <span className="finance-label">已锁定资金</span>
                <span className="finance-value">{contractStatus.locked}</span>
              </div>
            </div>
            <div className="finance-card pending">
              <div className="finance-icon">⏳</div>
              <div className="finance-info">
                <span className="finance-label">待结算</span>
                <span className="finance-value">{contractStatus.pending}</span>
              </div>
            </div>
            <div className="finance-card released">
              <div className="finance-icon">✅</div>
              <div className="finance-info">
                <span className="finance-label">已释放</span>
                <span className="finance-value">{contractStatus.claimed}</span>
              </div>
            </div>
          </div>

          <div className="finance-actions">
            <button className="finance-action-btn">
              <span>📝</span> 申请开票
            </button>
            <button className="finance-action-btn">
              <span>📋</span> 查看明细
            </button>
            <button className="finance-action-btn">
              <span>🔙</span> 申请退款
            </button>
          </div>

          <div className="invoice-section">
            <h3>💳 发票管理</h3>
            <div className="invoice-info">
              <div className="invoice-row">
                <span>发票类型</span>
                <span>增值税专用发票</span>
              </div>
              <div className="invoice-row">
                <span>税率</span>
                <span>6%</span>
              </div>
              <div className="invoice-row">
                <span>服务费</span>
                <span>人力资源服务费</span>
              </div>
              <div className="invoice-row">
                <span>可开票金额</span>
                <span className="highlight">{contractStatus.claimed}</span>
              </div>
            </div>
            <button className="btn-invoice">
              一键开具发票
            </button>
          </div>

          <div className="settle-section">
            <h3>📋 试用期结算</h3>
            <p className="settle-desc">候选人度过试用期后，点击确认过保，资金自动解冻</p>
            <div className="settle-list">
              <div className="settle-item">
                <div className="settle-info">
                  <span className="settle-name">张同学 - 字节跳动</span>
                  <span className="settle-date">入职时间：2026-02-15</span>
                </div>
                <div className="settle-right">
                  <span className="settle-amount">¥25,000</span>
                  <span className="settle-status probation">试用中(45天)</span>
                </div>
              </div>
              <div className="settle-item">
                <div className="settle-info">
                  <span className="settle-name">王同学 - MiniMax</span>
                  <span className="settle-date">入职时间：2026-01-20</span>
                </div>
                <div className="settle-right">
                  <span className="settle-amount">¥18,000</span>
                  <button className="btn-confirm-settle">确认过保</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="jobs-section">
          <div className="jobs-list">
            {allJobs.map((job, index) => (
              <div 
                key={job.id} 
                className={`job-card animate-fade-in animate-delay-${index + 1}`}
              >
                <div className="job-main">
                  <div className="job-title-row">
                    <h3>{job.title}</h3>
                    {job.urgent && <span className="urgent-badge">急招</span>}
                    <span className={`status-tag ${job.status}`}>{job.status}</span>
                  </div>
                  <div className="job-stats">
                    <span>📄 {job.candidates} 候选人</span>
                    <span>👁️ {job.views} 浏览</span>
                    <span>💰 {job.bonus}</span>
                  </div>
                </div>
                <div className="job-footer">
                  <span className="post-date">发布于 {job.posted}</span>
                  <div className="job-actions">
                    <button className="btn-edit">编辑</button>
                    <button className="btn-manage">管理</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>招聘漏斗</h3>
              <div className="funnel">
                <div className="funnel-stage">
                  <span className="stage-value">25</span>
                  <span className="stage-label">收到简历</span>
                </div>
                <div className="funnel-stage">
                  <span className="stage-value">12</span>
                  <span className="stage-label">初筛通过</span>
                </div>
                <div className="funnel-stage">
                  <span className="stage-value">6</span>
                  <span className="stage-label">面试中</span>
                </div>
                <div className="funnel-stage">
                  <span className="stage-value">2</span>
                  <span className="stage-label">终面</span>
                </div>
                <div className="funnel-stage highlight">
                  <span className="stage-value">1</span>
                  <span className="stage-label">入职</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>推荐来源</h3>
              <div className="source-list">
                <div className="source-item">
                  <span className="source-name">超级Recommender (90+分)</span>
                  <div className="source-bar">
                    <div className="source-fill" style={{ width: '60%' }}></div>
                  </div>
                  <span className="source-count">15</span>
                </div>
                <div className="source-item">
                  <span className="source-name">A级Recommender (80-89分)</span>
                  <div className="source-bar">
                    <div className="source-fill" style={{ width: '30%' }}></div>
                  </div>
                  <span className="source-count">8</span>
                </div>
                <div className="source-item">
                  <span className="source-name">B级Recommender (60-79分)</span>
                  <div className="source-bar">
                    <div className="source-fill" style={{ width: '10%' }}></div>
                  </div>
                  <span className="source-count">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewJobModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal job-publish-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>发布新职位</h3>
              <button className="close-btn" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-section">
                <h4 className="section-title">🤖 智能JD解析</h4>
                <p className="form-hint">粘贴现有JD文本，AI自动提取核心关键词并生成标准化标签</p>
                <div className="form-group">
                  <textarea 
                    placeholder="粘贴职位描述文本，AI将自动解析技能栈、经验要求等..."
                    rows="4"
                    value={jdText}
                    onChange={e => handleJDChange(e.target.value)}
                  ></textarea>
                </div>
                {jdAnalysis && (
                  <div className="jd-analysis-result">
                    <div className="analysis-item">
                      <span className="analysis-label">🎯 识别技能</span>
                      <div className="analysis-tags">
                        {jdAnalysis.skills.map((skill, i) => (
                          <span key={i} className="analysis-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="analysis-item">
                      <span className="analysis-label">📅 经验要求</span>
                      <span className="analysis-value">{jdAnalysis.experience}</span>
                    </div>
                    <div className="analysis-item">
                      <span className="analysis-label">💼 职级</span>
                      <span className="analysis-value">{jdAnalysis.level}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4 className="section-title">📋 基本信息</h4>
                <div className="form-group">
                  <label>职位名称 <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="如：资深前端工程师" 
                    value={jobForm.title}
                    onChange={e => handleTitleChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">🎯 硬性要求</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>学历要求</label>
                    <select 
                      value={jobForm.education}
                      onChange={e => setJobForm({ ...jobForm, education: e.target.value })}
                    >
                      <option value="">不限</option>
                      <option value="大专">大专</option>
                      <option value="本科">本科</option>
                      <option value="硕士">硕士</option>
                      <option value="博士">博士</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>工作年限</label>
                    <select
                      value={jobForm.experience}
                      onChange={e => setJobForm({ ...jobForm, experience: e.target.value })}
                    >
                      <option value="">不限</option>
                      <option value="1-3">1-3年</option>
                      <option value="3-5">3-5年</option>
                      <option value="5-10">5-10年</option>
                      <option value="10+">10年以上</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>行业</label>
                    <select 
                      value={jobForm.industry}
                      onChange={e => setJobForm({ ...jobForm, industry: e.target.value })}
                    >
                      <option value="互联网">互联网</option>
                      <option value="人工智能">人工智能</option>
                      <option value="金融">金融</option>
                      <option value="电商">电商</option>
                      <option value="教育">教育</option>
                      <option value="医疗">医疗</option>
                      <option value="硬件">硬件</option>
                      <option value="游戏">游戏</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>工作城市</label>
                    <select
                      value={jobForm.location}
                      onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                    >
                      <option value="北京">北京</option>
                      <option value="上海">上海</option>
                      <option value="杭州">杭州</option>
                      <option value="深圳">深圳</option>
                      <option value="广州">广州</option>
                      <option value="成都">成都</option>
                      <option value="南京">南京</option>
                      <option value="苏州">苏州</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>核心技能栈 <span className="auto-tag">✨ 根据职位自动推荐</span></label>
                  <div className="skill-recommendations">
                    {jobForm.title && Object.entries(skillRecommendations).map(([key, skills]) => 
                      jobForm.title.toLowerCase().includes(key) && (
                        <div key={key} className="skill-rec-group">
                          <span className="skill-rec-label">推荐技能：</span>
                          {skills.map(skill => (
                            <button
                              key={skill}
                              className={`skill-rec-btn ${jobForm.skills.includes(skill) ? 'selected' : ''}`}
                              onClick={() => toggleSkill(skill)}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                  <div className="skill-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="输入技能后按回车添加" 
                      className="skill-input"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          toggleSkill(e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                    <div className="skill-tags">
                      {jobForm.skills.map(skill => (
                        <span key={skill} className="skill-tag">
                          {skill}
                          <span className="remove" onClick={() => toggleSkill(skill)}>×</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="form-hint">已选 {jobForm.skills.length}/5 个核心技能，用于精准匹配Recommender</p>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">🌐 定向圈层 <span className="multi-tag">✓ 可多选</span></h4>
                <p className="section-desc">选择定向派发圈层，决定哪些Recommender可以接单</p>
                <div className="circle-options multi">
                  {circleOptions.map(option => (
                    <label 
                      key={option.id} 
                      className={`circle-option ${jobForm.circles.includes(option.id) ? 'checked' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={jobForm.circles.includes(option.id)}
                        onChange={() => toggleCircle(option.id)}
                      />
                      <div className="circle-card">
                        <span className="circle-icon">{option.icon}</span>
                        <span className="circle-name">{option.name}</span>
                        <span className="circle-desc">{option.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {jobForm.circles.length > 0 && !jobForm.circles.includes('unlimited') && (
                  <div className="circle-detail-input">
                    <input 
                      type="text" 
                      placeholder="请输入定向条件，如：清华大学、阿里、腾讯、字节跳动等（用逗号分隔）"
                      value={jobForm.circleDetail}
                      onChange={e => setJobForm({ ...jobForm, circleDetail: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4 className="section-title">📝 职位描述</h4>
                <div className="form-group">
                  <textarea 
                    placeholder="请输入职位要求..."
                    rows="4"
                    value={jobForm.description}
                    onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">💵 薪资范围</h4>
                <div className="salary-group">
                  <div className="salary-inputs">
                    <div className="salary-monthly">
                      <select 
                        value={jobForm.salaryMin}
                        onChange={e => {
                          setJobForm({ ...jobForm, salaryMin: e.target.value });
                          if (e.target.value && jobForm.salaryMax) {
                            setJobForm(prev => ({ ...prev, salary: `${e.target.value}-${prev.salaryMax}K·${prev.salaryMonths || 12}薪` }));
                          }
                        }}
                      >
                        <option value="">最低</option>
                        {[...Array(30)].map((_, i) => {
                          const val = (i + 1) * 5;
                          return <option key={val} value={val}>{val}K</option>;
                        })}
                      </select>
                      <span className="salary-separator">-</span>
                      <select 
                        value={jobForm.salaryMax}
                        onChange={e => {
                          setJobForm({ ...jobForm, salaryMax: e.target.value });
                          if (jobForm.salaryMin && e.target.value) {
                            setJobForm(prev => ({ ...prev, salary: `${prev.salaryMin}-${e.target.value}K·${prev.salaryMonths || 12}薪` }));
                          }
                        }}
                      >
                        <option value="">最高</option>
                        {[...Array(30)].map((_, i) => {
                          const val = (i + 1) * 5;
                          return <option key={val} value={val}>{val}K</option>;
                        })}
                      </select>
                    </div>
                    <div className="salary-months">
                      <select 
                        value={jobForm.salaryMonths}
                        onChange={e => {
                          setJobForm({ ...jobForm, salaryMonths: e.target.value });
                          if (jobForm.salaryMin && jobForm.salaryMax) {
                            setJobForm(prev => ({ ...prev, salary: `${prev.salaryMin}-${prev.salaryMax}K·${e.target.value}薪` }));
                          }
                        }}
                      >
                        {[12,13,14,15,16,17,18,19,20].map(m => (
                          <option key={m} value={m}>{m}薪</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">💰 悬赏金额</h4>
                <div className="bonus-mode-tabs">
                  <button 
                    className={`bonus-mode-tab ${bonusMode === 'auto' ? 'active' : ''}`}
                    onClick={() => {
                      setBonusMode('auto');
                      if (jobForm.salary) {
                        setJobForm({ ...jobForm, bonus: `¥${calculateBonus(jobForm.salary).toLocaleString()}` });
                      }
                    }}
                  >
                    <span className="mode-icon">🧮</span>
                    <span className="mode-label">按年薪比例</span>
                    <span className="mode-desc">系统自动计算10%年薪</span>
                  </button>
                  <button 
                    className={`bonus-mode-tab ${bonusMode === 'fixed' ? 'active' : ''}`}
                    onClick={() => {
                      setBonusMode('fixed');
                    }}
                  >
                    <span className="mode-icon">💵</span>
                    <span className="mode-label">一口价</span>
                    <span className="mode-desc">自定义悬赏金额</span>
                  </button>
                </div>

                {bonusMode === 'auto' && (
                  <div className="bonus-auto-section">
                    {jobForm.salary ? (
                      <div className="bonus-preview">
                        <div className="bonus-preview-row">
                          <span className="preview-label">年薪</span>
                          <span className="preview-value">{jobForm.salary}</span>
                        </div>
                        <div className="bonus-preview-row">
                          <span className="preview-label">悬赏比例</span>
                          <span className="preview-value">10%</span>
                        </div>
                        <div className="bonus-preview-row highlight">
                          <span className="preview-label">悬赏金额</span>
                          <span className="preview-value">¥{calculateBonus(jobForm.salary).toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bonus-empty">
                        <span>💡 请先在上方填写年薪，系统将自动计算悬赏金额</span>
                      </div>
                    )}
                  </div>
                )}

                {bonusMode === 'fixed' && (
                  <div className="bonus-fixed-section">
                    <input 
                      type="text" 
                      placeholder="输入金额，如：20,000"
                      value={jobForm.bonus.replace(/[^0-9]/g, '')}
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setJobForm({ ...jobForm, bonus: value ? `¥${parseInt(value).toLocaleString()}` : '' });
                      }}
                      className="bonus-input"
                    />
                    <div className="bonus-presets">
                      {[10000, 15000, 20000, 25000, 30000, 50000].map(amount => (
                        <button 
                          key={amount}
                          className="bonus-preset-btn"
                          onClick={() => setJobForm({ ...jobForm, bonus: `¥${amount.toLocaleString()}` })}
                        >
                          ¥{amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section urgent-section">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={jobForm.urgent}
                    onChange={e => setJobForm({ ...jobForm, urgent: e.target.checked })}
                  />
                  <span className="urgent-check">
                    🚨 标记为急招
                  </span>
                </label>
                <p className="urgent-desc">急招职位将触发扩大派单范围和缩短Recommender响应时间要求</p>
              </div>

              <div className="fund-escrow">
                <div className="escrow-icon">🔒</div>
                <div className="escrow-text">
                  <span>悬赏金将托管到平台智能合约</span>
                  <span className="escrow-hint">候选人入职并通过保用期后自动结算</span>
                </div>
              </div>

              <button className="btn-publish" onClick={handlePublishJob}>🚀 发布职位</button>
            </div>
          </div>
        </div>
      )}

      {showPublishSuccess && (
        <div className="publish-success-toast">
          <div className="success-icon">✅</div>
          <span>职位发布成功！</span>
        </div>
      )}

      {showPostPublishModal && lastPublishedJob && (
        <div className="post-publish-modal-overlay" onClick={() => setShowPostPublishModal(false)}>
          <div className="post-publish-modal" onClick={e => e.stopPropagation()}>
            <div className="post-publish-icon">🎉</div>
            <h3>职位发布成功！</h3>
            <p className="post-publish-job-title">{lastPublishedJob.title}</p>
            <div className="post-publish-details">
              <div className="post-publish-detail">
                <span className="detail-label">悬赏金额</span>
                <span className="detail-value">{lastPublishedJob.bonus}</span>
              </div>
              <div className="post-publish-detail">
                <span className="detail-label">发布时间</span>
                <span className="detail-value">{lastPublishedJob.posted}</span>
              </div>
            </div>
            <div className="post-publish-actions">
              <button 
                className="btn-view-job"
                onClick={() => {
                  setShowPostPublishModal(false);
                  resetForm();
                  setShowNewJobModal(false);
                }}
              >
                👁️ 查看职位
              </button>
              <button 
                className="btn-continue-post"
                onClick={() => {
                  resetForm();
                  setShowPostPublishModal(false);
                }}
              >
                ➕ 继续发布
              </button>
            </div>
          </div>
        </div>
      )}

      {showCloseConfirm && (
        <div className="modal-overlay" onClick={() => setShowCloseConfirm(false)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h3>确认关闭？</h3>
            <p>您填写的内容尚未保存，关闭后将丢失。</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setShowCloseConfirm(false)}>
                继续填写
              </button>
              <button className="btn-confirm-close" onClick={confirmClose}>
                确认关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {showContractModal && (
        <div className="contract-modal-overlay" onClick={() => setShowContractModal(false)}>
          <div className="contract-modal" onClick={e => e.stopPropagation()}>
            {lockingFunds ? (
              <>
                <div className="contract-modal-icon">🔐</div>
                <h3>智能合约锁定中</h3>
                <p>正在将悬赏金锁定到合约地址...</p>
                <div className="lock-progress-bar">
                  <div className="lock-progress-fill" style={{ width: `${lockProgress}%` }}></div>
                </div>
                <div className="lock-status">
                  <span>处理中</span>
                  <span>{lockProgress}%</span>
                </div>
              </>
            ) : (
              <>
                <div className="contract-modal-icon">✅</div>
                <h3>锁定成功</h3>
                <p>悬赏金已安全锁定到智能合约</p>
                <div className="contract-address">
                  合约地址: 0x742d35Cc6634C0532925a3b844Bc9e7595f...
                </div>
                <button className="btn-primary" onClick={() => setShowContractModal(false)}>
                  完成
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .employer-portal {
          max-width: 1200px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .company-logo {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          color: white;
        }

        .company-logo-img {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          object-fit: cover;
        }

        .company-logo-wrapper {
          position: relative;
          width: 56px;
          height: 56px;
        }

        .company-logo-fallback {
          display: none;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          border-radius: var(--radius-md);
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          color: white;
        }

        .company-info h1 {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .company-badge {
          font-size: 0.8rem;
          color: #007AFF;
          font-weight: 600;
        }

        .btn-new-job {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          color: white;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-new-job:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(30, 138, 240, 0.4);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-glass);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .stat-card:hover {
          border-color: rgba(30, 138, 240, 0.5);
          transform: translateY(-2px);
        }

        .stat-card.active {
          border-color: var(--accent-primary);
          background: var(--accent-glow);
        }

        .detail-view-section {
          margin-top: 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-glass);
          animation: fadeIn 0.3s ease;
        }

        .detail-view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .detail-view-header h3 {
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .close-detail-view {
          padding: 8px 16px;
          background: var(--glass-bg);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-detail-view:hover {
          border-color: rgba(30, 138, 240, 0.5);
          color: var(--text-primary);
        }

        .detail-jobs-list,
        .detail-resumes-list,
        .detail-interviews-list,
        .detail-joined-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-job-card,
        .detail-resume-card,
        .detail-interview-card,
        .detail-joined-card {
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .detail-job-card:hover,
        .detail-resume-card:hover,
        .detail-interview-card:hover,
        .detail-joined-card:hover {
          background: var(--bg-secondary);
        }

        .detail-job-main,
        .resume-main,
        .interview-main,
        .joined-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .detail-job-main h4 {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .detail-job-tags,
        .resume-skills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .job-tag,
        .skill-tag {
          padding: 4px 10px;
          background: var(--glass-bg);
          border: var(--glass-border);
          border-radius: 15px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .urgent-tag {
          background: rgba(255, 107, 107, 0.15);
          color: #ff6b6b;
          border-color: rgba(255, 107, 107, 0.3);
        }

        .bonus-tag {
          font-weight: 600;
          color: var(--bonus-gold);
        }

        .detail-job-stats {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .detail-job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .posted-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .resume-info,
        .interview-info,
        .joined-info {
          flex: 1;
          margin-left: 12px;
        }

        .resume-header,
        .interview-stage {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .resume-name,
        .interview-name,
        .joined-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .resume-status {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .resume-status.待查看 {
          background: rgba(251, 191, 36, 0.1);
          color: var(--warning);
        }

        .resume-status.已查看 {
          background: rgba(96, 165, 250, 0.1);
          color: var(--info);
        }

        .resume-status.已推荐 {
          background: rgba(0, 122, 255, 0.1);
          color: #007AFF;
        }

        .resume-title,
        .interview-title,
        .joined-title {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .resume-meta,
        .interview-meta,
        .joined-meta {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .resume-match,
        .interview-stage,
        .joined-date {
          text-align: right;
        }

        .match-score {
          display: block;
          font-size: 1.1rem;
          font-weight: 700;
          color: #007AFF;
        }

        .match-label,
        .join-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .stage-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .stage-badge.初试 {
          background: rgba(96, 165, 250, 0.15);
          color: #60a5fa;
        }

        .stage-badge.二面 {
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
        }

        .stage-badge.终面 {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .interview-date,
        .join-value {
          display: block;
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .resume-footer,
        .interview-footer,
        .joined-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.85rem;
        }

        .apply-position,
        .interview-position {
          color: var(--text-tertiary);
        }

        .interview-interviewer {
          color: var(--text-secondary);
        }

        .joined-detail {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .joined-bonus {
          font-weight: 600;
          color: var(--bonus-gold);
        }

        .stat-icon {
          font-size: 1.5rem;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab:hover {
          background: var(--glass-bg);
          border-color: rgba(30, 138, 240, 0.3);
        }

        .tab.active {
          background: rgba(30, 138, 240, 0.15);
          border-color: rgba(30, 138, 240, 0.5);
          color: #007AFF;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-glass);
          flex: 1;
          max-width: 400px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-box:focus-within {
          border-color: rgba(30, 138, 240, 0.5);
        }

        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .search-box input::placeholder {
          color: var(--text-tertiary);
        }

        .filter-tags {
          display: flex;
          gap: 8px;
        }

        .filter-tag {
          padding: 8px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .filter-tag:hover {
          border-color: rgba(30, 138, 240, 0.3);
        }

        .filter-tag.active {
          background: rgba(30, 138, 240, 0.15);
          border-color: rgba(30, 138, 240, 0.5);
          color: #007AFF;
        }

        .candidates-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }

        .candidates-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .candidate-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-glass);
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        .candidate-card:hover,
        .candidate-card.selected {
          border-color: rgba(30, 138, 240, 0.5);
          transform: translateY(-2px);
        }

        .candidate-main {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .candidate-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          font-size: 1.1rem;
          object-fit: cover;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
        }

        .school-logo {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          object-fit: cover;
          margin-right: 4px;
        }

        .referrer-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 6px;
        }

        .candidate-info {
          flex: 1;
        }

        .candidate-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .candidate-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-badge {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .status-badge.待查看 {
          background: rgba(251, 191, 36, 0.1);
          color: var(--warning);
        }

        .status-badge.已查看 {
          background: rgba(96, 165, 250, 0.1);
          color: var(--info);
        }

        .status-badge.已推荐 {
          background: rgba(0, 122, 255, 0.1);
          color: #007AFF;
        }

        .candidate-title {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .candidate-exp {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .match-score {
          text-align: center;
        }

        .score-value {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: #007AFF;
        }

        .score-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .candidate-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .candidate-tags .tag {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 0.75rem;
        }

        .referrer-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .referrer-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .referrer-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .referrer-name {
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .referrer-badge {
          font-size: 0.7rem;
          background: var(--accent-glow);
          color: var(--accent-primary);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .referrer-badge.diamond {
          background: linear-gradient(135deg, rgba(212, 168, 83, 0.2) 0%, rgba(240, 216, 140, 0.2) 100%);
          color: var(--accent-primary);
          border: 1px solid rgba(212, 168, 83, 0.3);
        }

        .btn-view-detail {
          margin-left: auto;
          padding: 8px 16px;
          background: rgba(30, 138, 240, 0.15);
          border: 1px solid rgba(30, 138, 240, 0.4);
          border-radius: var(--radius-md);
          color: #007AFF;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-view-detail:hover {
          background: rgba(30, 138, 240, 0.25);
          border-color: rgba(30, 138, 240, 0.6);
        }

        .candidate-expanded {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
          animation: fadeIn 0.3s ease;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-primary {
          flex: 1;
          padding: 12px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(30, 138, 240, 0.4);
        }

        .btn-secondary {
          padding: 12px 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-secondary:hover {
          border-color: rgba(30, 138, 240, 0.4);
          color: var(--text-primary);
        }

        .candidate-detail {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          position: sticky;
          top: 24px;
          box-shadow: var(--shadow-glass);
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .close-detail-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          color: var(--text-secondary);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .close-detail-btn:hover {
          background: rgba(30, 138, 240, 0.15);
          border-color: rgba(30, 138, 240, 0.4);
          color: var(--text-primary);
        }

        .detail-header h3 {
          font-size: 1.1rem;
          flex: 1;
        }

        .dimension-badge {
          background: linear-gradient(135deg, rgba(212, 168, 83, 0.2) 0%, rgba(240, 216, 140, 0.2) 100%);
          color: var(--accent-primary);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .resume-3d {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .resume-dimension {
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .resume-dimension h4 {
          font-size: 0.9rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .dimension-content {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .dimension-content.empty {
          color: var(--text-tertiary);
          font-style: italic;
        }

        .dimension-meta {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .review-ratings {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 8px 0;
        }

        .rating {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .history-review {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .history-item {
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
        }

        .history-company {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .history-result {
          display: inline-block;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 4px;
          margin-right: 8px;
        }

        .history-result.pass {
          background: rgba(74, 222, 128, 0.1);
          color: var(--success);
        }

        .history-result.reject {
          background: rgba(248, 113, 113, 0.1);
          color: var(--error);
        }

        .history-feedback {
          display: block;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .unlock-section {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(30, 138, 240, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
          border: 1px solid rgba(30, 138, 240, 0.3);
          border-radius: var(--radius-md);
          margin-top: 16px;
        }

        .unlock-icon {
          font-size: 1.5rem;
        }

        .unlock-text {
          flex: 1;
        }

        .unlock-title {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .unlock-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .btn-unlock {
          padding: 12px 20px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          white-space: nowrap;
        }

        .btn-unlock:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(30, 138, 240, 0.4);
        }

        .detail-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .btn-reject {
          padding: 12px 20px;
          background: rgba(248, 113, 113, 0.1);
          color: var(--error);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: var(--radius-md);
          font-weight: 500;
        }

        .btn-reject:hover {
          background: rgba(248, 113, 113, 0.2);
        }

        .review-card-mini {
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
        }

        .reviewer {
          display: block;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-bottom: 8px;
        }

        .review-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .review-relation {
          font-size: 0.75rem;
          color: var(--accent-primary);
        }

        .jobs-section {
          max-width: 900px;
        }

        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .job-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          box-shadow: var(--shadow-glass);
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .job-card:hover {
          border-color: rgba(30, 138, 240, 0.4);
          transform: translateY(-2px);
        }

        .job-main {
          margin-bottom: 16px;
        }

        .job-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .job-title-row h3 {
          font-size: 1.1rem;
        }

        .urgent-badge {
          background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .status-tag {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 4px;
          margin-left: auto;
        }

        .status-tag.进行中 {
          background: rgba(74, 222, 128, 0.1);
          color: var(--success);
        }

        .status-tag.已暂停 {
          background: rgba(107, 107, 117, 0.1);
          color: var(--text-tertiary);
        }

        .job-stats {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .post-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .job-actions {
          display: flex;
          gap: 10px;
        }

        .btn-edit,
        .btn-manage {
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-edit {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          color: var(--text-secondary);
        }

        .btn-edit:hover {
          border-color: rgba(30, 138, 240, 0.4);
          color: var(--text-primary);
        }

        .btn-manage {
          background: rgba(30, 138, 240, 0.15);
          color: #007AFF;
          border: 1px solid rgba(30, 138, 240, 0.4);
        }

        .btn-manage:hover {
          background: rgba(30, 138, 240, 0.25);
          transform: translateY(-1px);
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .analytics-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-glass);
        }

        .analytics-card h3 {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .funnel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .funnel-stage {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stage-value {
          width: 40px;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stage-label {
          flex: 1;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .funnel-stage.highlight .stage-value,
        .funnel-stage.highlight .stage-label {
          color: var(--success);
        }

        .source-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .source-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .source-name {
          width: 140px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .source-bar {
          flex: 1;
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
        }

        .source-fill {
          height: 100%;
          background: linear-gradient(90deg, #007AFF, #0062CC);
          border-radius: 4px;
        }

        .source-count {
          width: 30px;
          text-align: right;
          font-weight: 600;
          color: var(--text-primary);
        }

        .pipeline-section, .finance-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-desc {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .pipeline-board {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 16px;
        }

        .pipeline-column {
          min-width: 200px;
          flex: 1;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-glass);
        }

        .pipeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: var(--glass-border);
          border-left: 4px solid;
        }

        .pipeline-stage-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .pipeline-count {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .pipeline-content {
          padding: 12px;
          min-height: 200px;
        }

        .pipeline-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pipeline-card:hover {
          border-color: rgba(30, 138, 240, 0.4);
          transform: translateY(-1px);
        }

        .pipeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .pipeline-card .candidate-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .referrer-score {
          font-size: 0.75rem;
          color: var(--accent-primary);
          background: var(--accent-glow);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .pipeline-card .candidate-position {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 8px;
        }

        .pipeline-card-actions {
          display: flex;
          justify-content: flex-end;
        }

        .btn-move {
          padding: 4px 12px;
          background: rgba(30, 138, 240, 0.15);
          color: #007AFF;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }

        .btn-move:hover {
          background: rgba(30, 138, 240, 0.25);
        }

        .pipeline-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .pipeline-stats .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-glass);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pipeline-stats .stat-icon {
          font-size: 1.5rem;
        }

        .pipeline-stats .stat-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .pipeline-stats .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .finance-overview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .finance-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-glass);
        }

        .finance-icon {
          font-size: 2rem;
        }

        .finance-info {
          display: flex;
          flex-direction: column;
        }

        .finance-label {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .finance-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .finance-card.locked .finance-value { color: #fbbf24; }
        .finance-card.pending .finance-value { color: #007AFF; }
        .finance-card.released .finance-value { color: #4ade80; }

        .finance-actions {
          display: flex;
          gap: 12px;
        }

        .finance-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .finance-action-btn:hover {
          border-color: rgba(30, 138, 240, 0.5);
          color: var(--text-primary);
        }

        .invoice-section, .settle-section {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-glass);
        }

        .invoice-section h3, .settle-section h3 {
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .invoice-info {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 16px;
        }

        .invoice-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .invoice-row:last-child {
          border-bottom: none;
        }

        .invoice-row span:first-child {
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }

        .invoice-row span:last-child {
          color: var(--text-primary);
          font-weight: 500;
        }

        .invoice-row .highlight {
          color: var(--accent-primary);
          font-size: 1.1rem;
        }

        .btn-invoice {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
        }

        .btn-invoice:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(30, 138, 240, 0.4);
        }

        .settle-desc {
          color: var(--text-tertiary);
          font-size: 0.85rem;
          margin-bottom: 16px;
        }

        .settle-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .settle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .settle-name {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .settle-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .settle-right {
          text-align: right;
        }

        .settle-amount {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .settle-status {
          font-size: 0.8rem;
        }

        .settle-status.probation {
          color: #fbbf24;
        }

        .btn-confirm-settle {
          padding: 8px 16px;
          background: var(--success);
          color: white;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .btn-confirm-settle:hover {
          background: #22c55e;
        }

        @media (max-width: 1024px) {
          .pipeline-board {
            flex-direction: column;
          }

          .pipeline-column {
            min-width: 100%;
          }

          .finance-overview, .pipeline-stats {
            grid-template-columns: 1fr;
          }

          .finance-actions {
            flex-direction: column;
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-xl);
          width: 90%;
          max-width: 500px;
          animation: fadeIn 0.3s ease;
          box-shadow: var(--shadow-glass);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: var(--glass-border);
        }

        .modal-header h3 {
          font-size: 1.1rem;
        }

        .close-btn {
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }

        .close-btn:hover {
          color: var(--text-primary);
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: rgba(30, 138, 240, 0.6);
        }

        .form-group select {
          width: 100%;
          padding: 12px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .salary-group .salary-inputs {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .salary-monthly {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 200px;
        }

        .salary-monthly select {
          flex: 1;
          min-width: 80px;
          padding: 10px 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          color: var(--text-primary);
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 32px;
        }

        .salary-monthly select:hover {
          border-color: var(--accent-primary);
        }

        .salary-monthly select:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(30, 138, 240, 0.1);
        }

        .salary-separator {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .salary-months {
          display: flex;
          align-items: center;
        }

        .salary-months select {
          min-width: 70px;
          padding: 10px 12px;
          padding-right: 32px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          color: var(--text-primary);
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }

        .salary-months select:hover {
          border-color: var(--accent-primary);
        }

        .salary-months select:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(30, 138, 240, 0.1);
        }

        .bonus-calculation {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(30, 138, 240, 0.1);
          border: 1px solid rgba(30, 138, 240, 0.2);
          border-radius: var(--radius-md);
          margin-top: 12px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .bonus-calculation .calc-value {
          font-weight: 700;
          color: var(--accent-primary);
          font-size: 1.1rem;
        }

        .bonus-calculation .urgent-hint {
          color: var(--warning);
          font-size: 0.8rem;
        }

        .bonus-mode-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .bonus-mode-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 16px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bonus-mode-tab:hover {
          border-color: var(--border-accent);
        }

        .bonus-mode-tab.active {
          background: var(--accent-glow);
          border-color: var(--accent-primary);
        }

        .bonus-mode-tab .mode-icon {
          font-size: 1.5rem;
        }

        .bonus-mode-tab .mode-label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .bonus-mode-tab .mode-desc {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .bonus-auto-section {
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
        }

        .bonus-preview {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bonus-preview-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .bonus-preview-row .preview-label {
          color: var(--text-tertiary);
        }

        .bonus-preview-row .preview-value {
          color: var(--text-primary);
        }

        .bonus-preview-row.highlight {
          padding-top: 12px;
          margin-top: 8px;
          border-top: 1px dashed var(--glass-border);
        }

        .bonus-preview-row.highlight .preview-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .bonus-empty {
          padding: 20px;
          text-align: center;
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }

        .bonus-fixed-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bonus-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
          outline: none;
          transition: all 0.2s ease;
        }

        .bonus-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
        }

        .bonus-input::placeholder {
          color: var(--text-tertiary);
          font-weight: 400;
        }

        .bonus-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .bonus-preset-btn {
          padding: 8px 16px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .bonus-preset-btn:hover {
          border-color: var(--border-accent);
          color: var(--accent-primary);
        }

        .required {
          color: #ff6b6b;
        }

        .form-section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .section-title {
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-top: -8px;
          margin-bottom: 12px;
        }

        .form-hint {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-top: 6px;
        }

        .skill-input-wrapper {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-input-wrapper:focus-within {
          border-color: rgba(30, 138, 240, 0.5);
        }

        .skill-input {
          border: none !important;
          background: transparent !important;
          padding: 4px !important;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .skill-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(30, 138, 240, 0.15);
          color: #007AFF;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .skill-tag .remove {
          cursor: pointer;
          opacity: 0.7;
        }

        .skill-tag .remove:hover {
          opacity: 1;
        }

        .skill-recommendations {
          margin-bottom: 12px;
        }

        .skill-rec-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .skill-rec-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .skill-rec-btn {
          padding: 4px 12px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: 15px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-rec-btn:hover {
          border-color: rgba(30, 138, 240, 0.5);
          color: var(--accent-primary);
        }

        .skill-rec-btn.selected {
          background: var(--accent-glow);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .auto-tag, .multi-tag {
          font-size: 0.7rem;
          font-weight: 400;
          color: var(--accent-primary);
          background: var(--accent-glow);
          padding: 2px 8px;
          border-radius: 10px;
          margin-left: 8px;
        }

        .multi-tag {
          background: rgba(30, 138, 240, 0.15);
          color: #007AFF;
        }

        .jd-analysis-result {
          background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
          border: 1px solid rgba(0, 122, 255, 0.3);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-top: 12px;
        }

        .analysis-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
        }

        .analysis-item:not(:last-child) {
          border-bottom: 1px solid rgba(0, 122, 255, 0.2);
        }

        .analysis-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          min-width: 80px;
        }

        .analysis-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .analysis-tag {
          background: rgba(0, 122, 255, 0.2);
          color: #007AFF;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .analysis-value {
          color: var(--text-primary);
          font-weight: 500;
        }

        .bonus-calculation {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          margin-top: 12px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .bonus-calculation .calc-value {
          color: var(--success);
          font-weight: 600;
          font-size: 1rem;
        }

        .bonus-calculation .urgent-hint {
          color: #ff6b6b;
          font-size: 0.75rem;
        }

        .circle-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }

        .circle-options.multi {
          grid-template-columns: repeat(3, 1fr);
        }

        .circle-option {
          cursor: pointer;
        }

        .circle-option input {
          display: none;
        }

        .circle-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 12px;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-subtle);
          border-radius: var(--radius-md);
          text-align: center;
          transition: all 0.2s ease;
        }

        .circle-option.checked .circle-card {
          border-color: #007AFF;
          background: rgba(30, 138, 240, 0.1);
        }

        .circle-option:hover .circle-card {
          border-color: rgba(30, 138, 240, 0.5);
        }

        .circle-icon {
          font-size: 1.5rem;
        }

        .circle-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .circle-desc {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          line-height: 1.4;
        }

        .circle-detail-input {
          margin-top: 12px;
        }

        .circle-detail-input input {
          width: 100%;
          padding: 12px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .circle-detail-input input:focus {
          border-color: rgba(30, 138, 240, 0.6);
        }

        .urgent-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .urgent-check {
          font-weight: 600;
          color: #ff6b6b;
          font-size: 1rem;
        }

        .urgent-desc {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .fund-escrow {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }

        .escrow-icon {
          font-size: 1.5rem;
        }

        .escrow-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .escrow-text span:first-child {
          font-size: 0.9rem;
          color: var(--success);
          font-weight: 500;
        }

        .escrow-hint {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .job-publish-modal {
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .job-publish-modal .circle-options.multi {
          grid-template-columns: repeat(2, 1fr);
        }

        .job-publish-modal .skill-rec-group {
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 480px) {
          .job-publish-modal .circle-options.multi {
            grid-template-columns: 1fr;
          }
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .checkbox-label input {
          width: auto;
        }

        .btn-publish {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
        }

        .btn-publish:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(30, 138, 240, 0.4);
        }

        @media (max-width: 1024px) {
          .candidates-layout {
            grid-template-columns: 1fr;
          }

          .candidate-detail {
            position: static;
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .header-top {
            flex-direction: column;
            gap: 16px;
          }

          .btn-new-job {
            width: 100%;
            justify-content: center;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            max-width: none;
          }

          .filter-tags {
            overflow-x: auto;
          }

          .candidate-main {
            flex-wrap: wrap;
          }

          .match-score {
            position: absolute;
            top: 20px;
            right: 20px;
          }
        }

        .contract-bar {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: var(--glass-border);
          border-radius: var(--radius-md);
          margin-top: 16px;
          flex-wrap: wrap;
          box-shadow: var(--shadow-glass);
        }

        .contract-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contract-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .contract-value {
          font-weight: 700;
          color: var(--text-primary);
        }

        .contract-value.pending {
          color: var(--warning);
        }

        .contract-value.success {
          color: var(--success);
        }

        .btn-lock-funds {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #007AFF, #0062CC);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }

        .btn-lock-funds:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 122, 255, 0.4);
        }

        .contract-hash {
          width: 100%;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-family: monospace;
        }

        .confirm-modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-width: 360px;
          width: 90%;
          text-align: center;
          animation: fadeIn 0.2s ease;
          box-shadow: var(--shadow-glass);
        }

        .confirm-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .confirm-modal h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        .confirm-modal p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
        }

        .btn-cancel {
          flex: 1;
          padding: 12px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border-radius: var(--radius-md);
          font-weight: 500;
        }

        .btn-cancel:hover {
          background: var(--bg-card-hover);
        }

        .btn-confirm-close {
          flex: 1;
          padding: 12px;
          background: rgba(248, 113, 113, 0.15);
          color: var(--error);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: var(--radius-md);
          font-weight: 500;
        }

        .btn-confirm-close:hover {
          background: rgba(248, 113, 113, 0.25);
        }

        .publish-success-toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: var(--success);
          color: white;
          border-radius: var(--radius-lg);
          font-weight: 600;
          z-index: 2000;
          animation: slideDown 0.3s ease;
          box-shadow: 0 4px 20px rgba(74, 222, 128, 0.4);
        }

        .post-publish-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.25s ease;
        }

        .post-publish-modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          padding: 40px;
          max-width: 420px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-elevated);
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .post-publish-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .post-publish-modal h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .post-publish-job-title {
          font-size: 1.1rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: 24px;
        }

        .post-publish-details {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 32px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .post-publish-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .post-publish-detail .detail-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .post-publish-detail .detail-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .post-publish-actions {
          display: flex;
          gap: 12px;
        }

        .btn-view-job {
          flex: 1;
          padding: 14px 20px;
          background: var(--accent-gradient);
          color: #0a0a0f;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-view-job:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .btn-continue-post {
          flex: 1;
          padding: 14px 20px;
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-continue-post:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .contract-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .contract-modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid rgba(0, 122, 255, 0.3);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-width: 480px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-glass);
        }

        .contract-modal-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .contract-modal h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .contract-modal p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .lock-progress-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .lock-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #007AFF, #007AFF);
          transition: width 0.2s ease;
        }

        .lock-status {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .contract-address {
          background: var(--bg-tertiary);
          padding: 12px;
          border-radius: var(--radius-md);
          font-family: monospace;
          font-size: 0.8rem;
          word-break: break-all;
          margin: 16px 0;
        }

        @media (max-width: 768px) {
          .contract-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .btn-lock-funds {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }
        }

        .store-section {
          padding: 24px 0;
        }

        .store-header {
          margin-bottom: 32px;
        }

        .store-header h2 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .store-header p {
          color: var(--text-secondary);
        }

        .store-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .store-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 28px;
          position: relative;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .store-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glass);
        }

        .store-card.featured {
          border-color: var(--accent-primary);
          background: var(--accent-glow);
        }

        .card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 12px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .card-badge.hot {
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: white;
        }

        .card-badge.ai {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: white;
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .store-card h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .card-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .card-price {
          margin-bottom: 20px;
        }

        .card-price .price {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .card-price .period {
          font-size: 0.9rem;
          color: var(--text-tertiary);
        }

        .btn-buy {
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

        .btn-buy:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        .store-history {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .store-history h3 {
          font-size: 1rem;
          margin-bottom: 16px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .history-name {
          font-weight: 500;
        }

        .history-date {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          flex: 1;
        }

        .history-status {
          font-size: 0.75rem;
          padding: 2px 10px;
          border-radius: 10px;
        }

        .history-status.active {
          background: rgba(74, 222, 128, 0.1);
          color: var(--success);
        }

        @media (max-width: 900px) {
          .store-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
