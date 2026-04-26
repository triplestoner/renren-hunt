export default function CreditScore() {
  const mockCreditData = {
    score: 75,
    level: 'A级',
    breakdown: [
      { id: 1, name: '基础履历', score: 30, max: 40, desc: '简历完整度及工作年限' },
      { id: 2, name: '背书质量', score: 20, max: 30, desc: '推荐人信用等级及评价' },
      { id: 3, name: '面试履约', score: 15, max: 20, desc: '面试到场率及面试官反馈' },
      { id: 4, name: '入职存续', score: 10, max: 10, desc: '历史推荐入职后存活时间' },
    ],
    history: [
      { id: 1, date: '2026-03-25', event: '字节跳动架构师一面', change: '+2', comment: '面试官反馈：基础扎实，沟通顺畅' },
      { id: 2, date: '2026-03-20', event: '获得李小牛(S级)推荐', change: '+5', comment: '高信用推荐人背书加成' },
      { id: 3, date: '2026-03-15', event: '完善高级前端技能图谱', change: '+3', comment: '简历信息丰富度提升' },
    ]
  };

  return (
    <div className="credit-score-module">
      <div className="dashboard-header">
        <div className="score-circle">
          <div className="score-ring">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="bg-circle" />
              <circle cx="50" cy="50" r="45" className="progress-circle" strokeDasharray={`${mockCreditData.score * 2.82} 282`} />
            </svg>
            <div className="score-content">
              <span className="value">{mockCreditData.score}</span>
              <span className="level">{mockCreditData.level}</span>
            </div>
          </div>
        </div>
        <div className="score-info">
          <h3>链上信用资产</h3>
          <p>基于区块链不可篡改特性的职场信用凭证，分数越高，推荐人越愿意为您背书，解锁更多高薪机会。</p>
          <div className="action-links">
            <button className="btn-outline">提升信用</button>
            <button className="btn-text">信用规则</button>
          </div>
        </div>
      </div>

      <div className="breakdown-section">
        <h4>信用分构成</h4>
        <div className="breakdown-grid">
          {mockCreditData.breakdown.map(item => (
            <div key={item.id} className="breakdown-card">
              <div className="card-header">
                <span className="name">{item.name}</span>
                <span className="score">{item.score}/{item.max}</span>
              </div>
              <div className="progress-bar">
                <div className="fill" style={{ width: `${(item.score / item.max) * 100}%` }}></div>
              </div>
              <p className="desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="history-section">
        <h4>信用升值记录</h4>
        <div className="timeline">
          {mockCreditData.history.map(item => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="event">{item.event}</span>
                  <span className="change positive">{item.change}</span>
                </div>
                <div className="timeline-meta">
                  <span className="date">{item.date}</span>
                  <span className="comment">{item.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .credit-score-module {
          animation: fadeIn 0.3s ease;
        }
        .dashboard-header {
          display: flex;
          gap: 32px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          margin-bottom: 24px;
          align-items: center;
        }
        .score-circle {
          width: 160px;
          height: 160px;
          position: relative;
        }
        .score-ring svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .bg-circle {
          fill: none;
          stroke: var(--border-subtle);
          stroke-width: 8;
        }
        .progress-circle {
          fill: none;
          stroke: #4ade80;
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dasharray 1s ease;
        }
        .score-content {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .score-content .value {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .score-content .level {
          font-size: 1rem;
          color: #4ade80;
          font-weight: 600;
          margin-top: 4px;
        }
        .score-info h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }
        .score-info p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .action-links {
          display: flex;
          gap: 12px;
        }
        .btn-outline {
          padding: 8px 16px;
          border: 1px solid #007AFF;
          color: #007AFF;
          background: transparent;
          border-radius: 20px;
          cursor: pointer;
        }
        .btn-text {
          padding: 8px 16px;
          color: var(--text-tertiary);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        
        .breakdown-section {
          margin-bottom: 24px;
        }
        .breakdown-section h4 {
          margin-bottom: 16px;
          font-size: 1.1rem;
        }
        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .breakdown-card {
          background: var(--bg-secondary);
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .card-header .name { font-weight: 500; }
        .card-header .score { color: #007AFF; font-weight: 600; }
        .progress-bar {
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          margin-bottom: 8px;
        }
        .progress-bar .fill {
          height: 100%;
          background: #007AFF;
          border-radius: 2px;
        }
        .breakdown-card .desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }
        
        .history-section h4 {
          margin-bottom: 16px;
          font-size: 1.1rem;
        }
        .timeline {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .timeline-item {
          display: flex;
          gap: 16px;
          padding-bottom: 24px;
          position: relative;
        }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 5px; top: 20px; bottom: 0;
          width: 2px;
          background: var(--border-subtle);
        }
        .timeline-item:last-child::before { display: none; }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #4ade80;
          margin-top: 4px;
          z-index: 1;
        }
        .timeline-content {
          flex: 1;
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .timeline-header .event {
          font-weight: 500;
        }
        .timeline-header .change {
          font-weight: 600;
        }
        .change.positive { color: #4ade80; }
        .timeline-meta {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        
        @media (max-width: 600px) {
          .dashboard-header { flex-direction: column; text-align: center; }
          .action-links { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
