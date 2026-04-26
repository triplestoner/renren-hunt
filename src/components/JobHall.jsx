import { useState, useRef, useEffect } from 'react';
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

export default function JobHall({ publishedJobs = mockJobs, onRecommend, recommendedCandidates = [] }) {
  const [activeSection, setActiveSection] = useState('dispatch');
  const [selectedJob, setSelectedJob] = useState(null);
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

  const runAIScan = () => {
    funnelTimersRef.current.forEach(timer => clearTimeout(timer));
    funnelTimersRef.current = [];
    
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
    <div className="job-hall">
      <header className="page-header">
        <div className="header-content">
          <h1>职位大厅</h1>
          <p className="subtitle">发现优质机会，一键推荐变现</p>
        </div>
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-value">4</span>
            <span className="stat-label">待响应</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">进行中</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">¥83K</span>
            <span className="stat-label">可提现</span>
          </div>
        </div>
      </header>

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
          <span className="tab-badge">{publishedJobs.filter(j => j.match >= 85).length}</span>
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
          <span className="tab-badge secondary">{publishedJobs.filter(j => j.match < 85).length}</span>
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
                      jobTitle: selectedJob,
                    });
                  }
                  const newRec = {
                    ...selectedContact,
                    ...recommendForm,
                    jobTitle: selectedJob,
                  };
                  setSharingRecommendation(newRec);
                  setShowRecommendModal(false);
                  setShowShareModal(true);
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
        {publishedJobs
          .filter(job => {
            if (activeSection === 'dispatch') {
              return job.match >= 85;
            } else {
              return job.match < 85;
            }
          })
          .filter(job => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query);
          })
          .filter(job => {
            if (!industryFilter) return true;
            return job.industry === industryFilter;
          })
          .filter(job => {
            if (!locationFilter) return true;
            return job.location === locationFilter;
          })
          .map((job, index) => (
            <div 
              key={job.id} 
              className={`job-card ${selectedJob === job.id ? 'selected' : ''} animate-fade-in animate-delay-${index + 1}`}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              <div className="job-header">
                <div className="job-title-row">
                  <h3 className="job-title">{job.title}</h3>
                  {job.urgent && <span className="urgent-badge">急招</span>}
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
                </div>
              </div>

              <div className="job-tags">
                {job.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
                <span className="tag circle-tag">{job.circle}</span>
                {job.industry && <span className="tag industry-tag">🏭 {job.industry}</span>}
                {job.location && <span className="tag location-tag">📍 {job.location}</span>}
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
        {publishedJobs.filter(job => activeSection === 'dispatch' ? job.match >= 85 : job.match < 85).length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>{activeSection === 'dispatch' ? '暂无高匹配职位' : '暂无抢单职位'}</p>
            <p className="empty-hint">试试切换到其他专区看看</p>
          </div>
        )}
      </div>

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
          onSend={(candidate) => {
            alert('报告已成功发送给企业HR！');
            // 此处可调用原有 onRecommend 逻辑
          }}
        />
      )}

      <style>{`
        .job-hall {
          max-width: 900px;
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
