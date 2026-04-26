import { useState, useEffect } from 'react';

export default function JDAnalyzerModal({ job, onClose, onGenerateReport }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!job) return null;

  return (
    <div className="analyzer-modal-overlay" onClick={onClose}>
      <div className="analyzer-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-area">
            <span className="bot-icon">🤖</span>
            <div>
              <h2>JD智能解析报告 · {job.title}</h2>
              {isAnalyzing ? (
                <span className="subtitle analyzing">AI正在读取JD文本+企业画像+市场数据...</span>
              ) : (
                <span className="subtitle">解析耗时：1.5秒 · 数据来源：全网岗位知识库</span>
              )}
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        {isAnalyzing ? (
          <div className="analyzing-state">
            <div className="scanner-line"></div>
            <div className="code-block">
              <p>{'>'} 分析企业近期招聘画像...</p>
              <p>{'>'} 提取JD隐藏技能要求...</p>
              <p>{'>'} 计算薪资分位数区间...</p>
              <p>{'>'} 匹配人才库储备...</p>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            <section className="analysis-section">
              <h3>🎯 一、岗位真实需求 vs JD表述差异</h3>
              <div className="insight-card">
                <div className="insight-row">
                  <div className="jd-says">
                    <span className="label">📄 JD字面要求</span>
                    <p>"5年以上Java开发经验"</p>
                  </div>
                  <div className="ai-insight">
                    <span className="label highlight">🤖 AI洞察背后的真实意图</span>
                    <p>企业实际更看重<strong>"主导过中台/分布式重构项目"</strong>。根据近期入职数据，有2个候选人具备此类经验但工作年限不足5年也被录用。</p>
                  </div>
                </div>
                <div className="insight-row">
                  <div className="jd-says">
                    <span className="label">📄 JD字面要求</span>
                    <p>"本科学历优先"</p>
                  </div>
                  <div className="ai-insight">
                    <span className="label highlight">🤖 AI洞察背后的真实意图</span>
                    <p>该部门近2年社招入职者30%为大专，但均为前厂核心骨干。<strong>大专候选人完全可推</strong>，重点包装复杂项目攻坚能力。</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="analysis-section">
              <h3>👤 二、精准候选人画像建议</h3>
              <div className="portrait-grid">
                <div className="portrait-box must-have">
                  <h4>✅ 必须有 (硬性卡点)</h4>
                  <ul>
                    <li>分布式系统实战经验（需主导过，非打杂）</li>
                    <li>Java技术栈闭环（Spring/MySQL/Redis/Kafka）</li>
                    <li>技术团队管理潜力（需体现架构选型能力）</li>
                  </ul>
                </div>
                <div className="portrait-box plus">
                  <h4>⭐ 加分项 (提高转化率)</h4>
                  <ul>
                    <li>电商/零售/跨境业务背景最佳</li>
                    <li>参与过年营收10亿+级别系统设计</li>
                    <li>现薪资≤65万（给HR留足谈薪空间）</li>
                  </ul>
                </div>
                <div className="portrait-box negative">
                  <h4>❌ 减分项 (建议直接过滤)</h4>
                  <ul>
                    <li>纯传统行业（银行/政务外包）背景</li>
                    <li>最近一份工作&lt;1年且无合理理由（如优化）</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="analysis-section">
              <h3>💰 三、薪资竞争力与谈判策略</h3>
              <div className="salary-analysis">
                <div className="salary-table">
                  <div className="th">
                    <span>候选人现薪资</span>
                    <span>市场分位数</span>
                    <span>推荐策略</span>
                  </div>
                  <div className="tr">
                    <span>50万以下</span>
                    <span>P25以下</span>
                    <span className="strategy good">极具性价比，优先强推</span>
                  </div>
                  <div className="tr highlight">
                    <span>50-65万</span>
                    <span>P25-P50</span>
                    <span className="strategy best">最优价格区间，命中率最高</span>
                  </div>
                  <div className="tr">
                    <span>65-80万</span>
                    <span>P50-P75</span>
                    <span className="strategy warn">需留有谈薪空间（如期权平替）</span>
                  </div>
                  <div className="tr">
                    <span>80万+</span>
                    <span>P75以上</span>
                    <span className="strategy danger">需溢价，事先与企业HR对齐预算</span>
                  </div>
                </div>
                <div className="negotiation-tip">
                  <span className="tip-icon">💡</span>
                  <p><strong>AI谈薪建议：</strong>候选人现薪资+15-20%是目前该企业的合理涨幅预期。JD标定范围虽然到80万，但实际无包袱谈判空间在55-75万之间最优。</p>
                </div>
              </div>
            </section>

            <section className="analysis-section">
              <div className="section-header-flex">
                <h3>🔍 四、你的库内人才极速匹配</h3>
                <button className="btn-start-match">重新全库扫描</button>
              </div>
              <div className="match-stats">
                <div className="stat-card match-high">
                  <div className="stat-num">1<span>人</span></div>
                  <div className="stat-label">完全匹配（建议优先）</div>
                </div>
                <div className="stat-card match-med">
                  <div className="stat-num">3<span>人</span></div>
                  <div className="stat-label">80%匹配（可尝试）</div>
                </div>
                <div className="stat-card match-low">
                  <div className="stat-num">7<span>人</span></div>
                  <div className="stat-label">60%匹配（需先沟通）</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {!isAnalyzing && (
          <div className="modal-footer">
            <button className="btn-secondary">📤 上传新人选解析</button>
            <button className="btn-secondary">❓ 追问AI细节</button>
            <button 
              className="btn-primary" 
              onClick={() => onGenerateReport(job)}
            >
              📋 一键生成推荐候选人报告
            </button>
          </div>
        )}
      </div>

      <style>{`
        .analyzer-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease;
        }
        
        .analyzer-modal {
          width: 600px;
          max-width: 100%;
          height: 100vh;
          background: var(--bg-primary);
          box-shadow: -5px 0 25px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: var(--bg-secondary);
        }

        .title-area {
          display: flex;
          gap: 16px;
        }

        .bot-icon {
          font-size: 2.5rem;
        }

        .title-area h2 {
          font-size: 1.2rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .subtitle {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .subtitle.analyzing {
          color: #007AFF;
          animation: pulseText 1.5s infinite;
        }

        @keyframes pulseText {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        .btn-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 4px;
        }

        .btn-close:hover {
          color: var(--text-primary);
        }

        .analyzing-state {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #0a0a0f;
          overflow: hidden;
        }

        .scanner-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: rgba(0, 122, 255, 0.8);
          box-shadow: 0 0 20px 4px rgba(0, 122, 255, 0.5);
          animation: scan 1.5s linear infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }

        .code-block {
          font-family: monospace;
          color: #4ade80;
          font-size: 1rem;
          line-height: 2;
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .analysis-section h3 {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .insight-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .insight-row {
          display: flex;
          border-bottom: 1px solid var(--border-subtle);
        }

        .insight-row:last-child {
          border-bottom: none;
        }

        .jd-says, .ai-insight {
          flex: 1;
          padding: 16px;
        }

        .jd-says {
          background: rgba(255,255,255,0.02);
          border-right: 1px solid var(--border-subtle);
        }

        .ai-insight {
          background: rgba(0, 122, 255, 0.05);
        }

        .insight-row .label {
          display: inline-block;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 8px;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-tertiary);
        }

        .insight-row .label.highlight {
          color: #007AFF;
          background: rgba(0, 122, 255, 0.1);
        }

        .insight-row p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .insight-row strong {
          color: var(--text-primary);
        }

        .portrait-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .portrait-box {
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .portrait-box.must-have {
          background: rgba(74, 222, 128, 0.05);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .portrait-box.plus {
          background: rgba(245, 158, 11, 0.05);
          border-color: rgba(245, 158, 11, 0.2);
        }

        .portrait-box.negative {
          background: rgba(248, 113, 113, 0.05);
          border-color: rgba(248, 113, 113, 0.2);
        }

        .portrait-box h4 {
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .portrait-box ul {
          padding-left: 16px;
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .salary-table {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          margin-bottom: 16px;
          overflow: hidden;
        }

        .salary-table .th, .salary-table .tr {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr;
          padding: 12px 16px;
          font-size: 0.85rem;
        }

        .salary-table .th {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .salary-table .tr {
          border-top: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }

        .salary-table .tr.highlight {
          background: rgba(0, 122, 255, 0.05);
        }

        .strategy.good { color: #4ade80; }
        .strategy.best { color: #007AFF; font-weight: bold; }
        .strategy.warn { color: #f59e0b; }
        .strategy.danger { color: #f87171; }

        .negotiation-tip {
          display: flex;
          gap: 12px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px dashed rgba(245, 158, 11, 0.3);
          padding: 16px;
          border-radius: var(--radius-md);
        }

        .tip-icon { font-size: 1.2rem; }
        .negotiation-tip p { font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary); margin: 0; }
        .negotiation-tip strong { color: #f59e0b; }

        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-header-flex h3 { margin-bottom: 0; }

        .btn-start-match {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .btn-start-match:hover { color: var(--text-primary); background: rgba(255,255,255,0.1); }

        .match-stats {
          display: flex;
          gap: 16px;
        }

        .stat-card {
          flex: 1;
          padding: 16px;
          border-radius: var(--radius-md);
          text-align: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
        }

        .stat-card.match-high { border-color: rgba(74, 222, 128, 0.3); }
        .stat-card.match-med { border-color: rgba(0, 122, 255, 0.3); }
        .stat-card.match-low { border-color: rgba(245, 158, 11, 0.3); }

        .stat-num {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .stat-num span { font-size: 0.9rem; font-weight: normal; margin-left: 4px; }

        .match-high .stat-num { color: #4ade80; }
        .match-med .stat-num { color: #007AFF; }
        .match-low .stat-num { color: #f59e0b; }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          gap: 12px;
          background: var(--bg-secondary);
        }

        .modal-footer .btn-secondary {
          padding: 12px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          font-size: 0.9rem;
        }

        .modal-footer .btn-primary {
          flex: 1;
          padding: 12px 16px;
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .modal-footer .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4);
        }

        @media (max-width: 600px) {
          .analyzer-modal { width: 100%; }
          .portrait-grid { grid-template-columns: 1fr; }
          .insight-row { flex-direction: column; }
          .jd-says { border-right: none; border-bottom: 1px solid var(--border-subtle); }
          .salary-table .th, .salary-table .tr { font-size: 0.75rem; padding: 10px 8px; }
        }
      `}</style>
    </div>
  );
}
