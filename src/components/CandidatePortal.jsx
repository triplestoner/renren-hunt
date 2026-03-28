import { useState } from 'react';

const mockOffers = [
  {
    id: 1,
    referrer: '李明',
    referrerRelation: '前同事',
    position: '资深前端架构师',
    company: '字节跳动',
    salary: '80-120K·16薪',
    bonus: '¥25,000',
    signOnBonus: '¥5,000',
    date: '2026-03-20',
    status: 'new',
    tags: ['React', 'TypeScript', '架构设计'],
  },
  {
    id: 2,
    referrer: '王老师',
    referrerRelation: '同行',
    position: 'AI算法工程师',
    company: 'MiniMax',
    salary: '60-90K·15薪',
    bonus: '¥18,000',
    signOnBonus: '¥3,600',
    date: '2026-03-18',
    status: 'viewed',
    tags: ['Python', 'LLM', '深度学习'],
  },
];

const mockProfile = {
  name: '张同学',
  title: '资深前端工程师',
  experience: '8年',
  education: '清华大学·硕士',
  skills: ['React', 'TypeScript', 'Node.js', '架构设计', '团队管理'],
  circles: ['#大厂圈', '#前端技术圈'],
};

const reviewHistory = [
  { from: '李明', relation: '前同事', company: '字节跳动', comment: '技术能力强，架构思维优秀，有带领20人团队的经验', date: '2026-03-20', type: 'positive' },
  { from: '王老师', relation: '同行', company: 'MiniMax', comment: 'AI领域有深入研究潜力，学术背景强', date: '2026-02-15', type: 'positive' },
];

const mockJobProgress = {
  offerId: 1,
  position: '资深前端架构师',
  company: '字节跳动',
  steps: [
    { id: 1, label: '背调完成', status: 'completed', date: '2026-03-20', desc: '李明已完成背调' },
    { id: 2, label: 'HR已查看', status: 'completed', date: '2026-03-21', desc: '简历已被HR查看' },
    { id: 3, label: '一面', status: 'in_progress', date: '2026-03-25', desc: '待面试' },
    { id: 4, label: '二面', status: 'pending', date: '', desc: '' },
    { id: 5, label: 'Offer', status: 'pending', date: '', desc: '' },
  ],
  lastUpdate: '2026-03-21 14:30',
};

const mockWallet = {
  frozen: '¥8,600',
  pending: '¥0',
  withdrawn: '¥0',
  probationDays: 89,
  totalBonus: '¥43,000',
  history: [
    { date: '2026-03-20', type: 'frozen', amount: '¥5,000', desc: '入职字节跳动签约金（待解冻）' },
    { date: '2026-03-18', type: 'frozen', amount: '¥3,600', desc: '入职MiniMax签约金（待解冻）' },
  ],
};

export default function CandidatePortal({ onSwitchRole, recommendations = [], onAccept }) {
  const [privacyMode, setPrivacyMode] = useState('stealth');
  const [activeTab, setActiveTab] = useState('offers');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showC2ToC1Modal, setShowC2ToC1Modal] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [authStatus, setAuthStatus] = useState('idle');
  const [progressingJob, setProgressingJob] = useState(null);

  const handleAuthorize = () => {
    setAuthStatus('processing');
    setAuthProgress(0);
    
    const interval = setInterval(() => {
      setAuthProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAuthStatus('success');
            setTimeout(() => {
              setShowAuthModal(false);
              setAuthStatus('idle');
            }, 1500);
          }, 500);
          return 100;
        }
        return prev + 12;
      });
    }, 100);
  };

  return (
    <div className="candidate-portal">
      <header className="page-header">
        <div className="header-main">
          <div className="user-section">
            <div className="avatar">张</div>
            <div className="user-info">
              <h1>{mockProfile.name}</h1>
              <p className="title">{mockProfile.title}</p>
              <p className="edu">{mockProfile.education} · {mockProfile.experience}</p>
            </div>
          </div>
          <button className="btn-switch-role" onClick={() => setShowC2ToC1Modal(true)}>
            <span>🔄</span> 切换为推荐人
          </button>
        </div>

        <div className="privacy-control">
          <div className="privacy-toggle">
            <span className="privacy-label">隐私模式</span>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${privacyMode === 'stealth' ? 'active' : ''}`}
                onClick={() => setPrivacyMode('stealth')}
              >
                🔒 隐身
              </button>
              <button 
                className={`toggle-btn ${privacyMode === 'active' ? 'active' : ''}`}
                onClick={() => setPrivacyMode('active')}
              >
                👁️ 可见
              </button>
            </div>
          </div>
          <p className="privacy-tip">
            {privacyMode === 'stealth' 
              ? '✓ 隐身模式已开启，企业和陌生推荐人无法检索到你的简历'
              : '○ 可见模式下，你的简历将对认证推荐人可见'}
          </p>
        </div>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          <span>🎁</span> 职位推荐
          {(recommendations.filter(o => o.status === 'pending').length + mockOffers.filter(o => o.status === 'new').length) > 0 && (
            <span className="tab-badge">{recommendations.filter(o => o.status === 'pending').length + mockOffers.filter(o => o.status === 'new').length}</span>
          )}
        </button>
        <button 
          className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <span>📈</span> 求职进度
        </button>
        <button 
          className={`tab ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <span>💰</span> 入职钱包
        </button>
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span>📋</span> 职场档案
        </button>
        <button 
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <span>⭐</span> 背调评价
        </button>
      </div>

      {activeTab === 'offers' && (
        <div className="offers-section">
          <p className="section-desc">来自熟人的推荐，授权后企业HR可查看你的简历</p>
          
          <div className="offers-list">
            {[...recommendations.filter(r => r.status === 'pending'), ...mockOffers].map((offer, index) => (
              <div 
                key={offer.id || `mock-${index}`} 
                className={`offer-card ${selectedOffer === offer.id ? 'selected' : ''} animate-fade-in animate-delay-${index + 1}`}
                onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
              >
                {offer.status === 'new' && <span className="new-badge">新</span>}
                {offer.status === 'pending' && <span className="new-badge recommend-badge">推荐</span>}
                
                <div className="offer-header">
                  <div className="offer-title-row">
                    <h3>{offer.position}</h3>
                    <span className="company">{offer.company}</span>
                  </div>
                  <div className="referrer-info">
                    <span className="referrer-avatar">{offer.referrer[0]}</span>
                    <span className="referrer-name">由 {offer.referrer} 推荐</span>
                  </div>
                </div>

                <div className="offer-tags">
                  {offer.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="offer-meta">
                  <span className="salary">{offer.salary}</span>
                  <span className="bonus">悬赏 {offer.bonus}</span>
                </div>

                {selectedOffer === (offer.id || `mock-${index}`) && (
                  <div className="offer-expanded">
                    {offer.reasonForC2 ? (
                      <div className="c2-recommendation-card">
                        <div className="c2-recommend-header">
                          <span className="c2-recommend-icon">💌</span>
                          <span>推荐人留言</span>
                        </div>
                        <p className="c2-recommend-text">"{offer.reasonForC2}"</p>
                        {offer.skillMatch && (
                          <div className="c2-rating-summary">
                            <span>技能匹配: {offer.skillMatch}⭐</span>
                            <span>经验匹配: {offer.experienceMatch}⭐</span>
                            <span>潜力: {offer.potential}⭐</span>
                          </div>
                        )}
                        <div className="c2-actions">
                          <button 
                            className="btn-accept-recommend"
                            onClick={() => {
                              if (onAccept) {
                                onAccept(offer.id);
                              }
                              setShowAuthModal(true);
                            }}
                          >
                            ✅ 接受推荐
                          </button>
                          <button className="btn-decline">
                            暂不感兴趣
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="auth-card">
                        <div className="auth-header">
                          <span className="auth-icon">🔐</span>
                          <span>单次授权解锁</span>
                        </div>
                        <p className="auth-desc">
                          点击下方按钮即表示同意授权该企业的HR查看你的简历，
                          仅限本次招聘使用，不会暴露给其他企业。
                        </p>
                        <div className="bonus-info">
                          <div className="bonus-item">
                            <span className="bonus-label">Recommender悬赏金</span>
                            <span className="bonus-value">{offer.bonus}</span>
                          </div>
                          <div className="bonus-item highlight">
                            <span className="bonus-label">你的入职补贴</span>
                            <span className="bonus-value">{offer.signOnBonus}</span>
                            <span className="bonus-percent">(20%)</span>
                          </div>
                        </div>
                        <div className="auth-actions">
                          <button className="btn-authorize" onClick={() => setShowAuthModal(true)}>
                            <span>✅</span> 感兴趣，授权解锁
                          </button>
                          <button className="btn-decline">
                            暂不感兴趣
                          </button>
                        </div>
                        <p className="auth-note">
                          ⏱️ 授权后48小时内可随时撤回
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="progress-section">
          <p className="section-desc">追踪你的求职进度，实时了解每个环节状态</p>
          
          <div className="progress-card">
            <div className="progress-header">
              <div className="progress-job">
                <h3>{mockJobProgress.position}</h3>
                <span className="progress-company">{mockJobProgress.company}</span>
              </div>
              <span className="progress-status in-progress">面试中</span>
            </div>
            
            <div className="progress-timeline">
              {mockJobProgress.steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`progress-step ${step.status} ${index === mockJobProgress.steps.findIndex(s => s.status === 'in_progress') ? 'current' : ''}`}
                >
                  <div className="step-indicator">
                    <div className="step-dot">
                      {step.status === 'completed' ? '✓' : step.status === 'in_progress' ? '●' : '○'}
                    </div>
                    {index < mockJobProgress.steps.length - 1 && <div className="step-line"></div>}
                  </div>
                  <div className="step-content">
                    <span className="step-label">{step.label}</span>
                    {step.date && <span className="step-date">{step.date}</span>}
                    {step.desc && <span className="step-desc">{step.desc}</span>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="progress-footer">
              <span className="last-update">最后更新：{mockJobProgress.lastUpdate}</span>
            </div>
          </div>

          <div className="feedback-section">
            <h4>📋 面评反馈</h4>
            <div className="feedback-card">
              <div className="feedback-header">
                <span className="feedback-badge reject">淘汰原因</span>
                <span className="feedback-date">2026-03-15</span>
              </div>
              <p className="feedback-text">"技术栈匹配，但缺乏大团队管理经验，建议提升管理能力后再试。"</p>
              <div className="feedback-meta">
                <span>来自：字节跳动 HR</span>
                <span>职位：产品总监</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'wallet' && (
        <div className="wallet-section">
          <p className="section-desc">入职补贴钱包，20%悬赏金直接存入你的账户</p>
          
          <div className="wallet-card main">
            <div className="wallet-header">
              <span className="wallet-icon">💰</span>
              <span className="wallet-title">跳槽补贴账户</span>
            </div>
            <div className="wallet-balance">
              <span className="balance-label">待解冻金额</span>
              <span className="balance-value">{mockWallet.frozen}</span>
            </div>
            <div className="wallet-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(90 - mockWallet.probationDays) / 90 * 100}%` }}></div>
              </div>
              <span className="progress-hint">距试用期过保还有 {mockWallet.probationDays} 天</span>
            </div>
          </div>

          <div className="wallet-stats">
            <div className="wallet-stat">
              <span className="stat-value">{mockWallet.totalBonus}</span>
              <span className="stat-label">累计悬赏金</span>
            </div>
            <div className="wallet-stat">
              <span className="stat-value">{mockWallet.frozen}</span>
              <span className="stat-label">待解冻</span>
            </div>
            <div className="wallet-stat">
              <span className="stat-value">{mockWallet.withdrawn}</span>
              <span className="stat-label">已提现</span>
            </div>
          </div>

          <div className="wallet-history">
            <h4>资金记录</h4>
            {mockWallet.history.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-info">
                  <span className="history-amount">{item.amount}</span>
                  <span className="history-desc">{item.desc}</span>
                </div>
                <div className="history-right">
                  <span className={`history-type ${item.type}`}>
                    {item.type === 'frozen' ? '🔒 待解冻' : item.type === 'released' ? '✅ 已解冻' : '💳 已提现'}
                  </span>
                  <span className="history-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="withdraw-info">
            <div className="info-icon">ℹ️</div>
            <div className="info-text">
              <span>提现说明</span>
              <p>试用期过保后资金自动解冻，通过第三方灵活用工平台以"创客"身份提现，扣除1.5%-3%核定税费。</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="profile-section">
          <div className="profile-card">
            <h3>📝 自述简历</h3>
            <div className="profile-content">
              <div className="profile-row">
                <span className="label">当前职位</span>
                <span className="value">{mockProfile.title}</span>
              </div>
              <div className="profile-row">
                <span className="label">工作年限</span>
                <span className="value">{mockProfile.experience}</span>
              </div>
              <div className="profile-row">
                <span className="label">教育背景</span>
                <span className="value">{mockProfile.education}</span>
              </div>
              <div className="profile-row">
                <span className="label">技能标签</span>
                <div className="skills">
                  {mockProfile.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="profile-row">
                <span className="label">所属圈层</span>
                <div className="circles">
                  {mockProfile.circles.map((circle, i) => (
                    <span key={i} className="circle-tag">{circle}</span>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-edit-profile">编辑档案</button>
          </div>

          <div className="profile-card">
            <h3>🔒 隐私设置</h3>
            <div className="privacy-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">简历可见性</span>
                  <span className="setting-desc">控制谁可以看到你的简历</span>
                </div>
                <span className="setting-value active">仅熟人推荐可见</span>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">授权记录</span>
                  <span className="setting-desc">查看和管理历史授权</span>
                </div>
                <button className="btn-manage">管理</button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">数据导出</span>
                  <span className="setting-desc">导出你的个人数据</span>
                </div>
                <button className="btn-manage">导出</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="reviews-section">
          <p className="section-desc">历次推荐时Recommender留下的能力背书，形成你的三维职场档案</p>
          
          <div className="reviews-list">
            {reviewHistory.map((review, index) => (
              <div 
                key={index} 
                className={`review-card animate-fade-in animate-delay-${index + 1}`}
              >
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-avatar">{review.from[0]}</span>
                    <div className="reviewer-detail">
                      <span className="reviewer-name">{review.from}</span>
                      <span className="reviewer-relation">{review.relation} · {review.company}</span>
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-comment">"{review.comment}"</p>
                <div className="review-tags">
                  <span className="tag positive">👍 能力认可</span>
                  <span className="tag neutral">📝 正式推荐</span>
                </div>
              </div>
            ))}
          </div>

          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>暂无更多背调评价</p>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            {authStatus === 'idle' || authStatus === 'processing' ? (
              <>
                <div className="auth-modal-icon">🔐</div>
                <h3>DID 授权确认</h3>
                <p>您的好友【李明】推荐您应聘【字节跳动-架构师】岗位</p>
                
                <div className="referral-review">
                  <div className="review-label">Recommender 背调评价</div>
                  <div className="review-content">
                    <p>"技术能力强，架构思维优秀，有带领20人前端团队的经验，是非常优秀的候选人。"</p>
                    <span className="reviewer">— 李明（前同事，共事3年）</span>
                  </div>
                </div>

                <div className="did-info">
                  <div className="did-row">
                    <span>企业</span>
                    <span>字节跳动</span>
                  </div>
                  <div className="did-row">
                    <span>悬赏金</span>
                    <span>¥25,000</span>
                  </div>
                  <div className="did-row highlight">
                    <span>你的入职补贴</span>
                    <span>¥5,000 (20%)</span>
                  </div>
                </div>

                <div className="privacy-note">
                  <span>🔒</span>
                  <p>授权后仅该岗位HR可查看，岗位关闭后无法再次访问</p>
                </div>

                {authStatus === 'processing' && (
                  <div className="auth-progress">
                    <div className="auth-progress-bar">
                      <div className="auth-progress-fill" style={{ width: `${authProgress}%` }}></div>
                    </div>
                    <span>正在使用私钥签名授权...</span>
                  </div>
                )}

                {authStatus === 'processing' ? (
                  <button className="btn-authorize" disabled>授权中...</button>
                ) : (
                  <button className="btn-authorize" onClick={handleAuthorize}>
                    ✅ 同意授权
                  </button>
                )}
                <button className="btn-deny" onClick={() => setShowAuthModal(false)}>
                  暂不授权
                </button>
              </>
            ) : (
              <div className="auth-success">
                <div className="success-icon">✅</div>
                <h4>授权成功</h4>
                <p>您的加密简历已解密并发送给企业HR</p>
                <div className="success-bonus">
                  <span>🎁 入职补贴已锁定：¥5,000</span>
                </div>
                <span className="auth-hash">Tx: 0x{Math.random().toString(16).slice(2, 10)}...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {showC2ToC1Modal && (
        <div className="c2-to-c1-modal-overlay" onClick={() => setShowC2ToC1Modal(false)}>
          <div className="c2-to-c1-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🎉</div>
            <h3>恭喜拿下高薪Offer！</h3>
            <p className="modal-desc">您的前同事库里还有谁想看新机会？</p>
            
            <div className="incentive-card">
              <div className="incentive-header">
                <span className="incentive-icon">💎</span>
                <span>推荐奖励</span>
              </div>
              <div className="incentive-percent">60%</div>
              <p>成功推荐入职可获得高额悬赏金</p>
            </div>

            <div className="modal-actions">
              <button className="btn-switch-now" onClick={() => {
                setShowC2ToC1Modal(false);
                onSwitchRole();
              }}>
                立即切换为推荐人
              </button>
              <button className="btn-later" onClick={() => setShowC2ToC1Modal(false)}>
                稍后再说
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .candidate-portal {
          max-width: 900px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .user-section {
          display: flex;
          gap: 20px;
        }

        .avatar {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.5rem;
          color: white;
        }

        .user-info h1 {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .title {
          color: var(--text-primary);
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .edu {
          color: var(--text-tertiary);
          font-size: 0.85rem;
        }

        .btn-switch-role {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .btn-switch-role:hover {
          background: var(--bg-card-hover);
          color: var(--accent-primary);
          border-color: var(--accent-accent);
        }

        .privacy-control {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
        }

        .privacy-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .privacy-label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .toggle-switch {
          display: flex;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 4px;
        }

        .toggle-btn {
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          color: var(--text-secondary);
          background: transparent;
        }

        .toggle-btn.active {
          background: var(--accent-gradient);
          color: #0a0a0f;
          font-weight: 600;
        }

        .privacy-tip {
          font-size: 0.85rem;
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
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .tab:hover {
          background: var(--bg-card-hover);
        }

        .tab.active {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border-color: rgba(102, 126, 234, 0.4);
          color: #10b981;
        }

        .tab-badge {
          background: #10b981;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .section-desc {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .offers-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .offer-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .offer-card:hover,
        .offer-card.selected {
          background: var(--bg-card-hover);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        .new-badge {
          position: absolute;
          top: -8px;
          right: 16px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .recommend-badge {
          background: linear-gradient(135deg, #10b981 0%, #6366f1 100%);
        }

        .c2-recommendation-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-md);
          padding: 20px;
        }

        .c2-recommend-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #10b981;
          margin-bottom: 12px;
        }

        .c2-recommend-icon {
          font-size: 1.25rem;
        }

        .c2-recommend-text {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.6;
          margin-bottom: 12px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
        }

        .c2-rating-summary {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .c2-actions {
          display: flex;
          gap: 12px;
        }

        .btn-accept-recommend {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
          padding: 14px;
          border-radius: var(--radius-md);
          font-weight: 600;
        }

        .btn-accept-recommend:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(74, 222, 128, 0.4);
        }

        .offer-header {
          margin-bottom: 12px;
        }

        .offer-title-row h3 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .company {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .referrer-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .referrer-avatar {
          width: 24px;
          height: 24px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
          color: #0a0a0f;
        }

        .referrer-name {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .offer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tag {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .offer-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .salary {
          color: #10b981;
          font-weight: 600;
        }

        .bonus {
          color: var(--success);
          font-weight: 500;
        }

        .offer-expanded {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          animation: fadeIn 0.3s ease;
        }

        .auth-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: var(--radius-md);
          padding: 20px;
        }

        .auth-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #10b981;
          margin-bottom: 12px;
        }

        .auth-icon {
          font-size: 1.25rem;
        }

        .auth-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .auth-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .btn-authorize {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 14px;
          border-radius: var(--radius-md);
          font-weight: 600;
        }

        .btn-authorize:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-decline {
          padding: 14px 24px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
        }

        .btn-decline:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .auth-note {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .profile-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .profile-card h3 {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .profile-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .profile-row:last-child {
          border-bottom: none;
        }

        .profile-row .label {
          width: 100px;
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }

        .profile-row .value {
          flex: 1;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .skills, .circles {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: rgba(102, 126, 234, 0.1);
          color: #10b981;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .circle-tag {
          background: var(--accent-glow);
          color: var(--accent-primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .btn-edit-profile {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .btn-edit-profile:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .privacy-settings {
          display: flex;
          flex-direction: column;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-label {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .setting-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .setting-value {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .setting-value.active {
          color: var(--success);
        }

        .btn-manage {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .btn-manage:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .review-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .reviewer-info {
          display: flex;
          gap: 12px;
        }

        .reviewer-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
        }

        .reviewer-name {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
        }

        .reviewer-relation {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .review-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .review-comment {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 12px;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .review-tags {
          display: flex;
          gap: 8px;
        }

        .review-tags .tag {
          font-size: 0.75rem;
        }

        .review-tags .tag.positive {
          background: rgba(74, 222, 128, 0.1);
          color: var(--success);
        }

        .review-tags .tag.neutral {
          background: rgba(96, 165, 250, 0.1);
          color: var(--info);
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: var(--text-tertiary);
        }

        .empty-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .header-main {
            flex-direction: column;
            gap: 16px;
          }

          .user-section {
            width: 100%;
          }

          .btn-switch-role {
            width: 100%;
            justify-content: center;
          }

          .privacy-toggle {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .auth-actions {
            flex-direction: column;
          }

          .profile-row {
            flex-direction: column;
            gap: 8px;
          }

          .profile-row .label {
            width: 100%;
          }
        }

        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .auth-modal {
          background: var(--bg-card);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-width: 420px;
          width: 90%;
          text-align: center;
        }

        .auth-modal-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .auth-modal h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .auth-modal > p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .did-info {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 20px;
          text-align: left;
        }

        .did-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .did-row:last-child {
          border-bottom: none;
        }

        .did-row span:first-child {
          color: var(--text-tertiary);
          font-size: 0.85rem;
        }

        .did-row span:last-child {
          color: var(--text-primary);
          font-weight: 500;
        }

        .auth-progress {
          margin: 20px 0;
        }

        .auth-progress-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .auth-progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          transition: width 0.1s ease;
        }

        .auth-progress span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .btn-deny {
          width: 100%;
          margin-top: 12px;
          padding: 12px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .btn-deny:hover {
          border-color: var(--error);
          color: var(--error);
        }

        .auth-success {
          padding: 20px;
        }

        .auth-success .success-icon {
          font-size: 4rem;
        }

        .auth-hash {
          display: block;
          margin-top: 16px;
          font-family: monospace;
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .success-bonus {
          margin-top: 16px;
          padding: 12px;
          background: rgba(74, 222, 128, 0.15);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: var(--radius-md);
          color: var(--success);
          font-weight: 600;
        }

        .referral-review {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 16px;
          text-align: left;
        }

        .review-label {
          font-size: 0.8rem;
          color: #10b981;
          margin-bottom: 8px;
        }

        .review-content p {
          color: var(--text-primary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .reviewer {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .did-row.highlight {
          background: rgba(74, 222, 128, 0.1);
          margin: 8px -16px -16px;
          padding: 12px 16px;
          border-radius: 0 0 var(--radius-md) var(--radius-md);
        }

        .did-row.highlight span:last-child {
          color: var(--success);
          font-weight: 600;
        }

        .privacy-note {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          margin-bottom: 16px;
          text-align: left;
        }

        .privacy-note span {
          font-size: 1rem;
        }

        .privacy-note p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .bonus-info {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .bonus-item {
          flex: 1;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          text-align: center;
        }

        .bonus-item.highlight {
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .bonus-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 4px;
        }

        .bonus-value {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .bonus-item.highlight .bonus-value {
          color: var(--success);
        }

        .bonus-percent {
          font-size: 0.75rem;
          color: var(--success);
        }

        .progress-section, .wallet-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .progress-card, .wallet-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .progress-job h3 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .progress-company {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .progress-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .progress-status.in-progress {
          background: rgba(96, 165, 250, 0.15);
          color: var(--info);
        }

        .progress-timeline {
          display: flex;
          flex-direction: column;
        }

        .progress-step {
          display: flex;
          gap: 16px;
        }

        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 24px;
        }

        .step-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
          z-index: 1;
        }

        .progress-step.completed .step-dot {
          background: var(--success);
          color: white;
        }

        .progress-step.in_progress .step-dot {
          background: var(--info);
          color: white;
          animation: pulse 1.5s infinite;
        }

        .step-line {
          width: 2px;
          flex: 1;
          background: var(--border-subtle);
          min-height: 40px;
        }

        .progress-step.completed .step-line {
          background: var(--success);
        }

        .step-content {
          flex: 1;
          padding-bottom: 24px;
        }

        .step-label {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .progress-step.pending .step-label {
          color: var(--text-tertiary);
        }

        .step-date {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .step-desc {
          display: block;
          font-size: 0.85rem;
          color: var(--info);
        }

        .progress-footer {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .last-update {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .feedback-section h4 {
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .feedback-card {
          background: var(--bg-card);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .feedback-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .feedback-badge {
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .feedback-badge.reject {
          background: rgba(248, 113, 113, 0.15);
          color: var(--error);
        }

        .feedback-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .feedback-text {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .feedback-meta {
          display: flex;
          gap: 16px;
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .wallet-card.main {
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%);
          border-color: rgba(74, 222, 128, 0.3);
        }

        .wallet-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .wallet-icon {
          font-size: 1.5rem;
        }

        .wallet-title {
          font-weight: 600;
          color: var(--text-primary);
        }

        .wallet-balance {
          text-align: center;
          margin-bottom: 20px;
        }

        .balance-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .balance-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--success);
        }

        .wallet-progress .progress-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .wallet-progress .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--success), #22c55e);
          border-radius: 4px;
        }

        .progress-hint {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .wallet-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .wallet-stat {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
          text-align: center;
        }

        .wallet-stat .stat-value {
          display: block;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .wallet-stat .stat-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .wallet-history {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
        }

        .wallet-history h4 {
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .history-item:last-child {
          border-bottom: none;
        }

        .history-amount {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .history-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .history-right {
          text-align: right;
        }

        .history-type {
          display: block;
          font-size: 0.8rem;
          margin-bottom: 4px;
        }

        .history-date {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .withdraw-info {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .info-icon {
          font-size: 1.25rem;
        }

        .info-text span {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .info-text p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .c2-to-c1-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .c2-to-c1-modal {
          background: var(--bg-card);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-xl);
          padding: 32px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          animation: slideUp 0.3s ease;
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

        .c2-to-c1-modal .modal-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .c2-to-c1-modal h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .modal-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .incentive-card {
          background: linear-gradient(135deg, rgba(212, 168, 83, 0.15) 0%, rgba(240, 216, 140, 0.15) 100%);
          border: 1px solid rgba(212, 168, 83, 0.3);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
        }

        .incentive-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
          color: var(--accent-primary);
        }

        .incentive-percent {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-primary);
          margin-bottom: 8px;
        }

        .incentive-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-switch-now {
          width: 100%;
          padding: 14px;
          background: var(--accent-gradient);
          color: #0a0a0f;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
        }

        .btn-switch-now:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .btn-later {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .btn-later:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
