import { useState } from 'react';

export default function TrustScore() {
  const [activeTab, setActiveTab] = useState('accumulation');
  const score = 92;
  const level = '金牌推荐者';

  const metrics = [
    { label: '成功入职', value: 23, total: 25, color: '#4ade80' },
    { label: '面试转化', value: 68, total: 100, color: '#60a5fa' },
    { label: '响应速度', value: 95, total: 100, color: '#007AFF' },
    { label: '活跃度', value: 88, total: 100, color: '#c084fc' },
  ];

  const verticalCertifications = [
    {
      field: 'AI人工智能',
      icon: '🧠',
      status: 'active',
      score: 92,
      cases: 8,
      level: '资深专家'
    },
    {
      field: '芯片半导体',
      icon: '💻',
      status: 'active',
      score: 88,
      cases: 5,
      level: '认证顾问'
    },
    {
      field: '新能源',
      icon: '⚡',
      status: 'pending',
      score: 0,
      cases: 0,
      level: '待认证'
    },
    {
      field: '生物医药',
      icon: '💊',
      status: 'locked',
      score: 0,
      cases: 0,
      level: '未开放'
    },
  ];

  const onChainHistory = [
    { date: '2026-04-10', event: '成功推荐「张同学」入职美团', change: '+5', type: 'positive' },
    { date: '2026-04-05', event: '候选人「李某」给出好评', change: '+2', type: 'positive' },
    { date: '2026-03-28', event: '完成「前端架构师」订单', change: '+3', type: 'positive' },
    { date: '2026-03-15', event: '候选人爽约面试', change: '-1', type: 'negative' },
  ];

  const privileges = [
    { icon: '👑', label: '优先派单权', desc: '最新高薪职位提前24小时推送' },
    { icon: '💰', label: '溢价分成', desc: '平台基础服务费减免，赏金上浮15%' },
    { icon: '🌟', label: '金牌标识', desc: '简历曝光率提升300%，受企业青睐' },
    { icon: '🌐', label: '全网通行', desc: 'DID身份与声誉可导出至其他合作平台' },
  ];

  return (
    <div className="reputation-dashboard">
      <header className="page-header">
        <h1>链上声誉资产</h1>
        <p className="subtitle">不可篡改的职业信用，让每一次推荐都更有价值</p>
      </header>

      <div className="score-overview">
        <div className="score-main">
          <div className="score-ring">
            <svg viewBox="0 0 100 100" className="score-svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-tertiary)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)"
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${score * 2.83} 283`} transform="rotate(-90 50 50)"
                className="score-progress"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="score-center">
              <span className="score-number">{score}</span>
              <span className="score-max">/ 100</span>
            </div>
          </div>
          <div className="level-badge">
            <span className="level-icon">🏅</span>
            <span className="level-text">{level}</span>
          </div>
          <span className="did-hash">DID: did:rep:0x3f...8a2</span>
        </div>

        <div className="score-breakdown">
          <h3>声誉画像</h3>
          {metrics.map((metric, i) => (
            <div key={i} className="metric-row">
              <span className="metric-label">{metric.label}</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${metric.value}%`, background: metric.color }} />
              </div>
              <span className="metric-value" style={{ color: metric.color }}>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'accumulation' ? 'active' : ''}`}
          onClick={() => setActiveTab('accumulation')}
        >📈 声誉积累记录</button>
        <button
          className={`tab ${activeTab === 'vertical' ? 'active' : ''}`}
          onClick={() => setActiveTab('vertical')}
        >🎯 垂直领域认证</button>
        <button
          className={`tab ${activeTab === 'monetization' ? 'active' : ''}`}
          onClick={() => setActiveTab('monetization')}
        >💎 变现与权益</button>
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >🌐 个人链上主页</button>
      </div>

      {activeTab === 'accumulation' && (
        <div className="tab-content history-section">
          <h2>链上事件记录</h2>
          <p className="desc">您所有的关键推荐行为都已上链存证，作为提升声誉的依据。</p>
          <div className="timeline">
            {onChainHistory.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot ${item.type}`}></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="event">{item.event}</span>
                    <span className={`change ${item.type}`}>{item.change}</span>
                  </div>
                  <div className="timeline-meta">
                    <span className="date">{item.date}</span>
                    <span className="onchain-tag">✓ 已上链</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'vertical' && (
        <div className="tab-content vertical-section">
          <h2>垂直领域认证</h2>
          <p className="desc">专注于AI、芯片、新能源、生物医药等垂直领域，提升专业度加分</p>

          <div className="vertical-cert-grid">
            {verticalCertifications.map((cert, i) => (
              <div key={i} className={`cert-card ${cert.status}`}>
                <div className="cert-header">
                  <span className="cert-icon">{cert.icon}</span>
                  <div className="cert-info">
                    <span className="cert-field">{cert.field}</span>
                    <span className={`cert-level ${cert.status}`}>{cert.level}</span>
                  </div>
                </div>
                <div className="cert-stats">
                  <div className="cert-stat">
                    <span className="stat-label">专业度评分</span>
                    <span className="stat-value">{cert.score}</span>
                  </div>
                  <div className="cert-stat">
                    <span className="stat-label">成功案例</span>
                    <span className="stat-value">{cert.cases}</span>
                  </div>
                </div>
                {cert.status === 'active' && (
                  <div className="cert-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${cert.score}%`, background: cert.score >= 90 ? '#4ade80' : '#60a5fa' }}
                      />
                    </div>
                    <span className="progress-text">距离下一级还需 {100 - cert.score} 分</span>
                  </div>
                )}
                {cert.status === 'pending' && (
                  <button className="cert-button">申请认证</button>
                )}
                {cert.status === 'locked' && (
                  <div className="cert-locked">
                    <span>即将开放</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'monetization' && (
        <div className="tab-content privileges-section">
          <h2>等级特权</h2>
          <div className="privileges-grid">
            {privileges.map((priv, i) => (
              <div key={i} className="privilege-card">
                <span className="priv-icon">{priv.icon}</span>
                <div className="priv-info">
                  <span className="priv-label">{priv.label}</span>
                  <span className="priv-desc">{priv.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="tab-content profile-section">
          <h2>个人品牌主页预览</h2>
          <p className="desc">这是您在全网展示的公开名片。企业和候选人可以通过此页面信任您的专业度。</p>
          
          <div className="public-profile-preview">
            <div className="profile-banner"></div>
            <div className="profile-avatar">伯</div>
            <div className="profile-info">
              <h3>Web3资深伯乐 <span className="badge">🏅 金牌认证</span></h3>
              <p className="bio">专注互联网/人工智能领域高端人才推荐。累计帮助超过50位候选人找到满意归宿。</p>
              
              <div className="stats-row">
                <div className="stat">
                  <span className="num">50+</span>
                  <span className="lbl">成功入职</span>
                </div>
                <div className="stat">
                  <span className="num">92分</span>
                  <span className="lbl">链上声誉</span>
                </div>
                <div className="stat">
                  <span className="num">100%</span>
                  <span className="lbl">真实评价</span>
                </div>
              </div>
              
              <div className="share-actions">
                <button className="btn-primary">生成分享海报</button>
                <button className="btn-outline">复制主页链接</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .reputation-dashboard {
          max-width: 900px;
          animation: fadeIn 0.3s ease;
        }

        .page-header { margin-bottom: 32px; }
        .subtitle { color: var(--text-secondary); margin-top: 8px; }

        .score-overview {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }

        .score-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-xl);
        }

        .score-ring { position: relative; width: 160px; height: 160px; }
        .score-svg { width: 100%; height: 100%; }
        .score-progress { transition: stroke-dasharray 1s ease; }
        
        .score-center {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .score-number { font-size: 3rem; font-weight: 800; color: #f59e0b; line-height: 1; text-shadow: 0 0 10px rgba(245,158,11,0.3); }
        .score-max { font-size: 0.9rem; color: var(--text-secondary); }

        .level-badge {
          margin-top: 16px;
          display: flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid #f59e0b;
          border-radius: 20px;
        }
        .level-icon { font-size: 1.2rem; }
        .level-text { color: #f59e0b; font-weight: 600; font-size: 0.9rem; }
        .did-hash { margin-top: 12px; font-family: monospace; font-size: 0.8rem; color: var(--text-tertiary); }

        .score-breakdown {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 32px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .score-breakdown h3 { margin-bottom: 24px; font-size: 1.1rem; }

        .metric-row {
          display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
        }
        .metric-row:last-child { margin-bottom: 0; }
        .metric-label { width: 80px; font-size: 0.9rem; color: var(--text-secondary); }
        .metric-bar { flex: 1; height: 8px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden; }
        .metric-fill { height: 100%; border-radius: 4px; transition: width 1s ease; }
        .metric-value { width: 40px; text-align: right; font-weight: 600; font-size: 0.95rem; }

        .tabs {
          display: flex; gap: 12px; margin-bottom: 24px;
        }
        .tab {
          padding: 10px 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.95rem; cursor: pointer; transition: all 0.2s;
        }
        .tab.active { background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #f59e0b; font-weight: 600; }

        .tab-content {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 32px;
        }
        .tab-content h2 { margin-bottom: 8px; font-size: 1.2rem; }
        .desc { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px; }

        .timeline-item {
          display: flex; gap: 16px; padding-bottom: 24px; position: relative;
        }
        .timeline-item::before {
          content: ''; position: absolute; left: 5px; top: 20px; bottom: 0;
          width: 2px; background: var(--border-subtle);
        }
        .timeline-item:last-child::before { display: none; }
        .timeline-item:last-child { padding-bottom: 0; }
        
        .timeline-dot {
          width: 12px; height: 12px; border-radius: 50%; margin-top: 4px; z-index: 1;
          border: 2px solid var(--bg-primary);
        }
        .timeline-dot.positive { background: #4ade80; }
        .timeline-dot.negative { background: #f87171; }

        .timeline-content { flex: 1; background: var(--bg-secondary); padding: 16px; border-radius: var(--radius-md); }
        .timeline-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .timeline-header .event { font-weight: 500; }
        .change.positive { color: #4ade80; font-weight: bold; }
        .change.negative { color: #f87171; font-weight: bold; }

        .timeline-meta { display: flex; gap: 12px; font-size: 0.8rem; color: var(--text-tertiary); align-items: center; }
        .onchain-tag { color: #f59e0b; background: rgba(245, 158, 11, 0.1); padding: 2px 6px; border-radius: 4px; }

        .privileges-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .privilege-card {
          display: flex; align-items: center; gap: 16px; padding: 20px;
          background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
        }
        .priv-icon { font-size: 2rem; }
        .priv-label { display: block; font-weight: 600; margin-bottom: 4px; }
        .priv-desc { font-size: 0.85rem; color: var(--text-secondary); }

        .public-profile-preview {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-secondary);
        }
        .profile-banner {
          height: 120px;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        .profile-avatar {
          width: 80px; height: 80px;
          background: #fbbf24; color: #451a03;
          font-size: 2rem; font-weight: bold;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 4px solid var(--bg-secondary);
          margin: -40px 0 0 24px;
        }
        .profile-info { padding: 16px 24px 24px; }
        .profile-info h3 { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .profile-info .badge { font-size: 0.75rem; background: rgba(245, 158, 11, 0.15); color: #f59e0b; padding: 4px 8px; border-radius: 12px; font-weight: normal; }
        .profile-info .bio { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px; }
        
        .stats-row {
          display: flex; gap: 32px; margin-bottom: 24px;
          padding: 16px; background: var(--bg-tertiary); border-radius: var(--radius-md);
        }
        .stat { display: flex; flex-direction: column; }
        .stat .num { font-size: 1.2rem; font-weight: bold; color: var(--text-primary); }
        .stat .lbl { font-size: 0.8rem; color: var(--text-tertiary); }

        .share-actions { display: flex; gap: 12px; }
        .share-actions button {
          padding: 10px 20px; border-radius: var(--radius-md); cursor: pointer; font-size: 0.9rem;
        }
        .btn-primary { background: #007AFF; color: white; border: none; }
        .btn-outline { background: transparent; color: var(--text-primary); border: 1px solid var(--border-subtle); }

        /* 垂直领域认证 */
        .vertical-cert-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px; }
        .cert-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          transition: all 0.3s ease;
        }
        .cert-card.active {
          border-color: #4ade80;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(30, 41, 59, 0.9));
        }
        .cert-card.pending {
          border-color: #60a5fa;
        }
        .cert-card.locked {
          opacity: 0.5;
          filter: grayscale(50%);
        }
        .cert-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .cert-icon { font-size: 2.5rem; }
        .cert-info { display: flex; flex-direction: column; gap: 4px; }
        .cert-field { font-size: 1.1rem; font-weight: 600; }
        .cert-level {
          font-size: 0.85rem; padding: 2px 8px; border-radius: 12px; width: fit-content;
        }
        .cert-level.active { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
        .cert-level.pending { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
        .cert-level.locked { background: rgba(100, 100, 100, 0.2); color: #888; }
        .cert-stats {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px;
        }
        .cert-stat { display: flex; flex-direction: column; gap: 4px; }
        .cert-stat .stat-label { font-size: 0.85rem; color: var(--text-secondary); }
        .cert-stat .stat-value { font-size: 1.25rem; font-weight: 700; }
        .cert-progress { display: flex; flex-direction: column; gap: 8px; }
        .progress-bar {
          height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;
        }
        .progress-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
        .progress-text { font-size: 0.8rem; color: var(--text-tertiary); text-align: center; }
        .cert-button {
          width: 100%; padding: 10px; background: #60a5fa; color: white; border: none;
          border-radius: var(--radius-md); cursor: pointer; font-weight: 500; transition: all 0.2s;
        }
        .cert-button:hover { background: #3b82f6; }
        .cert-locked {
          display: flex; justify-content: center; align-items: center; padding: 10px;
          color: var(--text-tertiary); font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .vertical-cert-grid { grid-template-columns: 1fr; }
        }
          .score-overview { grid-template-columns: 1fr; }
          .privileges-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
