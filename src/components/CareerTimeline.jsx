import { useState } from 'react';

export default function CareerTimeline() {
  const [dataOpen, setDataOpen] = useState(false);

  const timelineData = [
    {
      id: 1,
      year: '2026',
      company: '字节跳动',
      title: '资深前端架构师',
      verified: true,
      verifier: '李小牛 (S级推荐人)',
      skills: ['React', '架构设计'],
      salary_data: true
    },
    {
      id: 2,
      year: '2023 - 2026',
      company: '美团',
      title: '高级前端工程师',
      verified: true,
      verifier: '企业HR认证',
      skills: ['Vue', '性能优化'],
      salary_data: true
    },
    {
      id: 3,
      year: '2020 - 2023',
      company: '网易',
      title: '前端开发工程师',
      verified: true,
      verifier: '前同事背书',
      skills: ['JavaScript', '小程序'],
      salary_data: false
    }
  ];

  return (
    <div className="career-timeline-module">
      <div className="module-header">
        <div className="header-text">
          <h3>链上职业时间线</h3>
          <p>您的每一次入职、背调、评价都将作为加密凭证永久保存，换工作时自动携带所有历史信任资产，告别重复背调。</p>
        </div>
        <div className="data-monetization-card">
          <div className="card-top">
            <span className="icon">🪙</span>
            <div className="text">
              <h4>开放脱敏薪资数据</h4>
              <p>贡献给行业薪资数据库，获得Token收益分红</p>
            </div>
          </div>
          <div className="toggle-switch">
            <button 
              className={`toggle-btn ${!dataOpen ? 'active' : ''}`}
              onClick={() => setDataOpen(false)}
            >隐私保护</button>
            <button 
              className={`toggle-btn ${dataOpen ? 'active' : ''}`}
              onClick={() => setDataOpen(true)}
            >开放赚币</button>
          </div>
          {dataOpen && (
            <div className="earning-estimate">
              预计月化收益: <span className="highlight">120 RNT</span>
            </div>
          )}
        </div>
      </div>

      <div className="timeline-container">
        {timelineData.map((node, index) => (
          <div key={node.id} className="timeline-node">
            <div className="node-year">{node.year}</div>
            <div className="node-divider">
              <div className="dot"></div>
              {index < timelineData.length - 1 && <div className="line"></div>}
            </div>
            <div className="node-content">
              <div className="node-header">
                <h4>{node.title}</h4>
                <span className="company">{node.company}</span>
              </div>
              
              <div className="node-verification">
                <span className="verified-badge">✓ 链上存证</span>
                <span className="verifier">背书方: {node.verifier}</span>
              </div>
              
              <div className="node-tags">
                {node.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              
              {node.salary_data && dataOpen && (
                <div className="data-sharing-badge">
                  <span>📊 薪资数据已加密贡献</span>
                  <span className="rnt-reward">+50 RNT/月</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .career-timeline-module {
          animation: fadeIn 0.3s ease;
        }
        .module-header {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
        }
        .header-text {
          flex: 3;
        }
        .header-text h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }
        .header-text p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .data-monetization-card {
          flex: 2;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-lg);
          padding: 20px;
        }
        .card-top {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .card-top .icon {
          font-size: 1.8rem;
        }
        .card-top h4 {
          color: #d97706;
          margin-bottom: 4px;
        }
        .card-top p {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .toggle-switch {
          display: flex;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 4px;
        }
        .toggle-btn {
          flex: 1;
          padding: 8px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .toggle-btn.active {
          background: #d97706;
          color: white;
          font-weight: 600;
        }
        .earning-estimate {
          margin-top: 12px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: right;
        }
        .earning-estimate .highlight {
          color: #d97706;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .timeline-container {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 32px;
        }
        .timeline-node {
          display: flex;
          gap: 24px;
        }
        .node-year {
          width: 80px;
          text-align: right;
          font-weight: 600;
          color: var(--text-primary);
          padding-top: 4px;
        }
        .node-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .node-divider .dot {
          width: 16px;
          height: 16px;
          background: #007AFF;
          border-radius: 50%;
          border: 4px solid var(--bg-primary);
          z-index: 2;
        }
        .node-divider .line {
          flex: 1;
          width: 2px;
          background: var(--border-subtle);
          margin-top: 4px;
          margin-bottom: 4px;
        }
        .node-content {
          flex: 1;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 32px;
        }
        .node-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .node-header h4 {
          font-size: 1.1rem;
        }
        .node-header .company {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .node-verification {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 0.85rem;
        }
        .verified-badge {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
        }
        .verifier {
          color: var(--text-tertiary);
        }
        .node-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .skill-tag {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .data-sharing-badge {
          display: flex;
          justify-content: space-between;
          background: rgba(217, 119, 6, 0.05);
          border: 1px solid rgba(217, 119, 6, 0.2);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: #d97706;
        }
        .rnt-reward {
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .module-header { flex-direction: column; }
          .timeline-node { gap: 12px; }
          .node-year { width: 60px; font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}
