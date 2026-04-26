export default function CreditAssets() {
  const assets = [
    {
      id: 1,
      title: '优先推荐权',
      icon: '🚀',
      status: 'active',
      desc: '您的简历在推荐人的搜索列表中置顶展示，曝光率提升300%。',
      condition: '信用分 ≥ 70解锁'
    },
    {
      id: 2,
      title: '低费率优享',
      icon: '💎',
      status: 'active',
      desc: '推荐人为促成高信用候选人入职，主动降低B端收费比例，提升您的入职成功率。',
      condition: '信用分 ≥ 75解锁'
    },
    {
      id: 3,
      title: '开启反向猎头',
      icon: '🎯',
      status: 'locked',
      desc: '向指定领域的Top级推荐人发送求职意向，邀请他们为您背书并内推。',
      condition: '信用分 ≥ 85解锁',
      progress: 75,
      target: 85
    }
  ];

  return (
    <div className="credit-assets-module">
      <div className="assets-header">
        <h3>变现与权益</h3>
        <p>高信用分赋予您的专属职场特权，让优质机会主动找上门。</p>
      </div>

      <div className="assets-grid">
        {assets.map(asset => (
          <div key={asset.id} className={`asset-card ${asset.status}`}>
            <div className="asset-icon">{asset.icon}</div>
            <div className="asset-content">
              <div className="asset-title-row">
                <h4>{asset.title}</h4>
                {asset.status === 'active' ? (
                  <span className="badge active">已生效</span>
                ) : (
                  <span className="badge locked">未解锁</span>
                )}
              </div>
              <p className="asset-desc">{asset.desc}</p>
              
              {asset.status === 'locked' && (
                <div className="unlock-progress">
                  <div className="progress-info">
                    <span>{asset.condition}</span>
                    <span>{asset.progress}/{asset.target}</span>
                  </div>
                  <div className="bar">
                    <div className="fill" style={{ width: `${(asset.progress / asset.target) * 100}%` }}></div>
                  </div>
                </div>
              )}
            </div>
            {asset.status === 'active' && asset.id === 3 && (
              <button className="btn-action">立即发起反猎</button>
            )}
          </div>
        ))}
      </div>

      <div className="anti-hunt-preview">
        <h4>📢 快速发起反猎 (示例)</h4>
        <div className="hunt-box">
          <div className="hunt-filters">
            <span className="filter-tag">目标行业：人工智能</span>
            <span className="filter-tag">期望薪资：80K+</span>
          </div>
          <button className="btn-primary" disabled>信用分达85分解锁该功能</button>
        </div>
      </div>

      <style>{`
        .credit-assets-module {
          animation: fadeIn 0.3s ease;
        }
        .assets-header {
          margin-bottom: 24px;
        }
        .assets-header h3 {
          font-size: 1.3rem;
          margin-bottom: 8px;
        }
        .assets-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .assets-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .asset-card {
          display: flex;
          gap: 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          transition: all 0.3s;
        }
        .asset-card.active {
          border-color: rgba(74, 222, 128, 0.3);
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.05) 0%, transparent 100%);
        }
        .asset-card.locked {
          opacity: 0.7;
          filter: grayscale(0.5);
        }
        .asset-icon {
          font-size: 2.5rem;
          display: flex;
          align-items: flex-start;
        }
        .asset-content {
          flex: 1;
        }
        .asset-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .asset-title-row h4 {
          font-size: 1.1rem;
        }
        .badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
        }
        .badge.active {
          background: rgba(74, 222, 128, 0.2);
          color: #4ade80;
        }
        .badge.locked {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
        }
        .asset-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .unlock-progress {
          background: var(--bg-secondary);
          padding: 12px;
          border-radius: var(--radius-md);
          margin-top: 12px;
        }
        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-bottom: 6px;
        }
        .bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
        }
        .bar .fill {
          height: 100%;
          background: #f59e0b;
          border-radius: 3px;
        }
        
        .anti-hunt-preview {
          background: var(--bg-secondary);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .anti-hunt-preview h4 {
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .hunt-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hunt-filters {
          display: flex;
          gap: 12px;
        }
        .filter-tag {
          background: var(--bg-tertiary);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .btn-primary {
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
          border: none;
          padding: 10px 20px;
          border-radius: var(--radius-md);
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .asset-card { flex-direction: column; gap: 12px; }
          .hunt-box { flex-direction: column; align-items: stretch; gap: 16px; }
        }
      `}</style>
    </div>
  );
}
