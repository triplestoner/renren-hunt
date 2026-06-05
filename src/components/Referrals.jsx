import { useState } from 'react';

const mockReferrals = [
  {
    id: 1,
    candidate: '张同学',
    avatar: 'https://i.pravatar.cc/48?u=zhang',
    position: '资深前端架构师',
    company: '字节跳动',
    companyLogo: 'https://logo.clearbit.com/bytedance.com',
    status: '已入职',
    date: '2026-03-20',
    trustScore: 92,
    stage: '已入职',
    bonus: '¥25,000',
  },
  {
    id: 2,
    candidate: '王同学',
    avatar: 'https://i.pravatar.cc/48?u=wang',
    position: 'AI算法工程师',
    company: 'MiniMax',
    companyLogo: 'https://logo.clearbit.com/minimaxi.cn',
    status: '面试中',
    date: '2026-03-15',
    trustScore: 88,
    stage: '三面',
    bonus: '¥18,000',
  },
  {
    id: 3,
    candidate: '李同学',
    avatar: 'https://i.pravatar.cc/48?u=li',
    position: '产品总监',
    company: '美团',
    companyLogo: 'https://logo.clearbit.com/meituan.com',
    status: '待授权',
    date: '2026-03-10',
    trustScore: 0,
    stage: '待授权',
    bonus: '¥35,000',
  },
  {
    id: 4,
    candidate: '赵同学',
    avatar: 'https://i.pravatar.cc/48?u=zhao',
    position: '后端资深工程师',
    company: '蚂蚁集团',
    companyLogo: 'https://logo.clearbit.com/antgroup.com',
    status: '已推荐',
    date: '2026-03-08',
    trustScore: 75,
    stage: 'HR评估中',
    bonus: '¥20,000',
  },
];

const statusConfig = {
  '已入职': { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', label: '已入职' },
  '面试中': { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)', label: '面试中' },
  '待授权': { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', label: '待授权' },
  '已推荐': { color: '#007AFF', bg: 'rgba(0, 122, 255, 0.1)', label: '已推荐' },
};

export default function Referrals() {
  const [filter, setFilter] = useState('all');

  const filteredReferrals = mockReferrals.filter(r => 
    filter === 'all' || r.status === filter
  );

  return (
    <div className="referrals">
      <header className="page-header">
        <h1><span className="desktop-title">我的推荐</span><span className="mobile-title">做推荐</span></h1>
        <p className="subtitle">追踪推荐进度，管理候选人关系</p>
      </header>

      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          全部 ({mockReferrals.length})
        </button>
        <button 
          className={`filter-tab ${filter === '待授权' ? 'active' : ''}`}
          onClick={() => setFilter('待授权')}
        >
          待授权
        </button>
        <button 
          className={`filter-tab ${filter === '已推荐' ? 'active' : ''}`}
          onClick={() => setFilter('已推荐')}
        >
          已推荐
        </button>
        <button 
          className={`filter-tab ${filter === '面试中' ? 'active' : ''}`}
          onClick={() => setFilter('面试中')}
        >
          面试中
        </button>
        <button 
          className={`filter-tab ${filter === '已入职' ? 'active' : ''}`}
          onClick={() => setFilter('已入职')}
        >
          已入职
        </button>
      </div>

      <div className="referral-list">
        {filteredReferrals.map((referral, index) => {
          const config = statusConfig[referral.status];
          return (
            <div 
              key={referral.id} 
              className={`referral-card animate-fade-in animate-delay-${index + 1}`}
            >
              <div className="card-main">
                <div className="candidate-section">
                  {referral.avatar && referral.avatar.startsWith('http') ? (
                    <img src={referral.avatar} alt={referral.candidate} className="avatar" />
                  ) : (
                    <div className="avatar">{referral.candidate[0]}</div>
                  )}
                  <div className="candidate-info">
                    <div className="candidate-header">
                      <span className="candidate-name">{referral.candidate}</span>
                      {referral.trustScore > 0 && (
                        <span className="trust-badge">
                          ⭐ {referral.trustScore}分
                        </span>
                      )}
                    </div>
                    <span className="position">{referral.position}</span>
                    <span className="company">
                      {referral.companyLogo && <img src={referral.companyLogo} alt="" className="company-logo" />}
                      {referral.company}
                    </span>
                  </div>
                </div>

                <div className="status-section">
                  <span 
                    className="status-tag"
                    style={{ 
                      color: config.color, 
                      background: config.bg,
                      border: `1px solid ${config.color}30`
                    }}
                  >
                    {config.label}
                  </span>
                  <span className="stage">{referral.stage}</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="meta-info">
                  <span className="date">📅 {referral.date}</span>
                  <span className="bonus">💰 {referral.bonus}</span>
                </div>
                <div className="card-actions">
                  {referral.status === '待授权' && (
                    <button className="btn-remind">提醒授权</button>
                  )}
                  {referral.status === '已推荐' && (
                    <button className="btn-follow">跟进状态</button>
                  )}
                  {referral.status === '面试中' && (
                    <button className="btn-update">更新进度</button>
                  )}
                  <button className="btn-detail">查看详情</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .referrals {
          max-width: 900px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .mobile-title {
          display: none;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .filter-tab {
          padding: 10px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .filter-tab:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
        }

        .filter-tab.active {
          background: var(--accent-glow);
          border-color: var(--border-accent);
          color: var(--accent-primary);
        }

        .referral-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .referral-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .referral-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .card-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .candidate-section {
          display: flex;
          gap: 16px;
        }

        .avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
          color: #0a0a0f;
          object-fit: cover;
          background: var(--accent-gradient);
        }

        .company-logo {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          object-fit: cover;
          margin-right: 6px;
        }

        .candidate-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .candidate-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .candidate-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1.1rem;
        }

        .trust-badge {
          font-size: 0.75rem;
          color: var(--accent-primary);
          background: var(--accent-glow);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .position {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .company {
          color: var(--text-tertiary);
          font-size: 0.85rem;
        }

        .status-section {
          text-align: right;
        }

        .status-tag {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .stage {
          display: block;
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .meta-info {
          display: flex;
          gap: 16px;
        }

        .date,
        .bonus {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .card-actions {
          display: flex;
          gap: 10px;
        }

        .btn-remind,
        .btn-follow,
        .btn-update,
        .btn-detail {
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-remind {
          background: rgba(251, 191, 36, 0.1);
          color: var(--warning);
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .btn-remind:hover {
          background: rgba(251, 191, 36, 0.2);
          transform: translateY(-1px);
        }

        .btn-follow {
          background: rgba(0, 122, 255, 0.1);
          color: #007AFF;
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .btn-follow:hover {
          background: rgba(0, 122, 255, 0.2);
          transform: translateY(-1px);
        }

        .btn-update {
          background: rgba(96, 165, 250, 0.1);
          color: var(--info);
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .btn-update:hover {
          background: rgba(96, 165, 250, 0.2);
          transform: translateY(-1px);
        }

        .btn-detail {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
        }

        .btn-detail:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .desktop-title {
            display: none;
          }

          .mobile-title {
            display: inline;
          }

          .card-main {
            flex-direction: column;
            gap: 16px;
          }

          .status-section {
            text-align: left;
          }

          .card-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .card-actions {
            width: 100%;
            flex-wrap: wrap;
          }

          .card-actions button {
            flex: 1;
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  );
}
