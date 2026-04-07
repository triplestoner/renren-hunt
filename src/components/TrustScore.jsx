export default function TrustScore() {
  const score = 92;
  const level = 'S级';
  const privileges = [
    { icon: '👑', label: '优先派单权', desc: '优质职位优先推送' },
    { icon: '⚡', label: '闪电响应', desc: '24小时响应特权' },
    { icon: '💎', label: '溢价分成', desc: '赏金上浮10%' },
    { icon: '🎯', label: '精准匹配', desc: 'AI加权推荐' },
  ];

  const metrics = [
    { label: '成功入职', value: 23, total: 25, color: '#4ade80' },
    { label: '面试转化', value: 68, total: 100, color: '#60a5fa' },
    { label: '响应速度', value: 95, total: 100, color: '#007AFF' },
    { label: '活跃度', value: 88, total: 100, color: '#c084fc' },
  ];

  const circles = [
    { name: '#字节离职圈', level: 'Lv4', verified: true },
    { name: '#前端技术圈', level: 'Lv3', verified: true },
    { name: '#清华校友圈', level: 'Lv2', verified: false },
  ];

  return (
    <div className="trust-score">
      <header className="page-header">
        <h1>信任分</h1>
        <p className="subtitle">你的专业信用，让推荐更有价值</p>
      </header>

      <div className="score-overview">
        <div className="score-main">
          <div className="score-ring">
            <svg viewBox="0 0 100 100" className="score-svg">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--bg-tertiary)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${score * 2.83} 283`}
                transform="rotate(-90 50 50)"
                className="score-progress"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#007AFF" />
                  <stop offset="50%" stopColor="#5AC8FA" />
                  <stop offset="100%" stopColor="#007AFF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="score-center">
              <span className="score-number">{score}</span>
              <span className="score-max">/ 100</span>
            </div>
          </div>
          <div className="level-badge">
            <span className="level-icon">🏆</span>
            <span className="level-text">{level} 超级Recommender</span>
          </div>
        </div>

        <div className="score-breakdown">
          {metrics.map((metric, i) => (
            <div key={i} className="metric-row animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="metric-label">{metric.label}</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${metric.value}%`,
                    background: metric.color 
                  }}
                />
              </div>
              <span className="metric-value" style={{ color: metric.color }}>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="privileges-section">
        <h2>专属特权</h2>
        <div className="privileges-grid">
          {privileges.map((priv, i) => (
            <div key={i} className="privilege-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="priv-icon">{priv.icon}</span>
              <div className="priv-info">
                <span className="priv-label">{priv.label}</span>
                <span className="priv-desc">{priv.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="score-history">
        <h2>分数趋势</h2>
        <div className="chart-placeholder">
          <div className="chart-bars">
            {[65, 72, 78, 82, 85, 88, 90, 92].map((val, i) => (
              <div 
                key={i} 
                className="chart-bar"
                style={{ 
                  height: `${val}%`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
          <div className="chart-labels">
            <span>最近8周</span>
          </div>
        </div>
      </div>

      <style>{`
        .trust-score {
          max-width: 900px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .score-overview {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }

        .score-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .score-main:hover {
          box-shadow: var(--shadow-glass);
        }

        .score-ring {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .score-svg {
          width: 100%;
          height: 100%;
        }

        .score-progress {
          animation: scoreFill 1.5s ease forwards;
        }

        @keyframes scoreFill {
          from {
            stroke-dasharray: 0 283;
          }
        }

        .score-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .score-number {
          display: block;
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .score-max {
          font-size: 1rem;
          color: var(--text-tertiary);
        }

        .level-badge {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--accent-glow);
          border: 1px solid var(--border-accent);
          border-radius: 20px;
        }

        .level-icon {
          font-size: 1.25rem;
        }

        .level-text {
          color: var(--accent-primary);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .score-breakdown {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .score-breakdown:hover {
          box-shadow: var(--shadow-glass);
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
        }

        .metric-row:last-child {
          margin-bottom: 0;
        }

        .metric-label {
          width: 80px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .metric-bar {
          flex: 1;
          height: 8px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease;
        }

        .metric-value {
          width: 40px;
          text-align: right;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .privileges-section,
        .circles-section,
        .score-history {
          margin-bottom: 40px;
        }

        .privileges-section h2,
        .circles-section h2,
        .score-history h2 {
          margin-bottom: 20px;
        }

        .privileges-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .privilege-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .privilege-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .priv-icon {
          font-size: 2rem;
        }

        .priv-info {
          display: flex;
          flex-direction: column;
        }

        .priv-label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .priv-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .circles-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .circle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .circle-item:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-default);
        }

        .circle-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .circle-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .circle-level {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
        }

        .circle-level.Lv3,
        .circle-level.Lv4 {
          background: var(--accent-glow);
          color: var(--accent-primary);
        }

        .verified-badge {
          font-size: 0.75rem;
          color: var(--success);
          background: rgba(74, 222, 128, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .btn-manage {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-manage:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: var(--border-default);
        }

        .chart-placeholder {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: all 0.25s ease;
        }

        .chart-placeholder:hover {
          box-shadow: var(--shadow-glass);
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 120px;
          padding: 0 20px;
        }

        .chart-bar {
          width: 40px;
          background: var(--accent-gradient);
          border-radius: 4px 4px 0 0;
          animation: growUp 0.8s ease forwards;
        }

        @keyframes growUp {
          from {
            transform: scaleY(0);
            transform-origin: bottom;
          }
          to {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }

        .chart-labels {
          text-align: center;
          margin-top: 16px;
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        @media (prefers-reduced-motion: reduce) {
          .metric-row,
          .privilege-card,
          .circle-item,
          .chart-bar,
          .score-progress {
            animation: none;
            opacity: 1;
          }
          
          .metric-fill {
            transition: none;
          }
        }

        @media (max-width: 768px) {
          .score-overview {
            grid-template-columns: 1fr;
          }

          .privileges-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
