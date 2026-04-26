import { useState, useEffect } from 'react';

export default function CandidateReportGenerator({ job, onClose, onSend }) {
  const [isGenerating, setIsGenerating] = useState(true);

  // 模拟从推荐人库中选中的候选人（实际应有选择流程，这里简化演示）
  const candidate = {
    name: '张三',
    currentTitle: 'Java高级工程师 · P7',
    currentCompany: '字节跳动',
    salary: '约65万（含期权）',
    experience: '7年',
    education: '浙江大学·本科',
    selfIntro: '希望寻找有挑战的分布式架构机会，对电商行业有浓厚兴趣，倾向中大型平台，薪资期望70-80万。',
  };

  const [reportData, setReportData] = useState({
    reason1: '技术背景匹配度高：主导过字节电商中台重构（日活5000万），完美契合该HC"分布式系统"核心需求',
    reason2: '薪资可谈：现薪65万，在企业预算范围内，可接受平薪或小幅溢价',
    reason3: '动机强：主动表示对电商赛道有兴趣，且原团队组织调整在即',
    reason4: '风险提示：目前在职，离职交接决策周期约1个月'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-area">
            <span className="doc-icon">📋</span>
            <div>
              <h2>候选人推荐报告 · 人人猎标准模板</h2>
              {isGenerating ? (
                <span className="subtitle analyzing">AI 正在结构化提取沟通记录并生成推荐语...</span>
              ) : (
                <span className="subtitle">生成时间：1.5秒 · 目标岗位：{job?.title || '未指定'}</span>
              )}
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        {isGenerating ? (
          <div className="generating-state">
            <div className="skeleton-line title"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-box large"></div>
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="modal-body">
            <div className="report-paper">
              <div className="paper-header">
                <div className="logo-placeholder">人人猎 <span>专属推荐报告</span></div>
                <div className="meta-info">
                  <span>推荐人：@马大佬 (认证推荐者)</span>
                  <span>生成日期：{new Date().toISOString().split('T')[0]}</span>
                </div>
              </div>

              <div className="paper-section">
                <h3>一、候选人基本信息</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="lbl">姓名</span>
                    <span className="val blur">{candidate.name} (已脱敏，企业端可见)</span>
                  </div>
                  <div className="info-item">
                    <span className="lbl">现职</span>
                    <span className="val">{candidate.currentCompany} · {candidate.currentTitle}</span>
                  </div>
                  <div className="info-item">
                    <span className="lbl">现薪资</span>
                    <span className="val">{candidate.salary}</span>
                  </div>
                  <div className="info-item">
                    <span className="lbl">年限/学历</span>
                    <span className="val">{candidate.experience} · {candidate.education}</span>
                  </div>
                </div>
              </div>

              <div className="paper-section">
                <h3>二、候选人自述（沟通原声提取）</h3>
                <div className="quote-box">
                  "{candidate.selfIntro}"
                </div>
              </div>

              <div className="paper-section">
                <h3>三、推荐者核心推荐理由 <span className="edit-hint">可点击编辑</span></h3>
                <ul className="editable-list">
                  <li>
                    <span className="num">①</span>
                    <input 
                      type="text" 
                      value={reportData.reason1} 
                      onChange={e => setReportData({...reportData, reason1: e.target.value})}
                    />
                  </li>
                  <li>
                    <span className="num">②</span>
                    <input 
                      type="text" 
                      value={reportData.reason2} 
                      onChange={e => setReportData({...reportData, reason2: e.target.value})}
                    />
                  </li>
                  <li>
                    <span className="num">③</span>
                    <input 
                      type="text" 
                      value={reportData.reason3} 
                      onChange={e => setReportData({...reportData, reason3: e.target.value})}
                    />
                  </li>
                  <li className="risk">
                    <span className="num">④</span>
                    <input 
                      type="text" 
                      value={reportData.reason4} 
                      onChange={e => setReportData({...reportData, reason4: e.target.value})}
                    />
                  </li>
                </ul>
              </div>

              <div className="paper-section">
                <h3>四、AI综合客观评估</h3>
                <div className="ai-eval-box">
                  <div className="eval-row">
                    <span className="lbl">岗位匹配度：</span>
                    <span className="stars">⭐⭐⭐⭐☆ (85%)</span>
                  </div>
                  <div className="eval-row">
                    <span className="lbl">薪资谈判难度：</span>
                    <span className="val">中等 (预计谈至72-75万可成交)</span>
                  </div>
                  <div className="eval-row">
                    <span className="lbl">客观风险点：</span>
                    <span className="val warn">目前在职，年终奖未发，企业需加快面试节奏并考虑签字费</span>
                  </div>
                </div>
              </div>

              <div className="paper-section attachments">
                <h3>五、附件材料</h3>
                <div className="file-list">
                  <div className="file-item">
                    <span className="f-icon">📄</span>
                    <span className="f-name">候选人加密简历.pdf</span>
                    <span className="f-status">已上传</span>
                  </div>
                  <div className="file-item">
                    <span className="f-icon">🎓</span>
                    <span className="f-name">学历验证报告</span>
                    <span className="f-status">学信网核验通过</span>
                  </div>
                  <div className="file-item">
                    <span className="f-icon">🎧</span>
                    <span className="f-name">离职意愿确认</span>
                    <span className="f-status">平台通话记录摘要</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isGenerating && (
          <div className="modal-footer">
            <button className="btn-secondary">📋 预览为PDF</button>
            <button className="btn-secondary">🤝 申请平台背书</button>
            <button 
              className="btn-primary" 
              onClick={() => {
                onSend(candidate);
                onClose();
              }}
            >
              📤 确认无误，发送给企业HR
            </button>
          </div>
        )}
      </div>

      <style>{`
        .report-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.2s ease;
        }

        .report-modal {
          width: 800px;
          max-width: 95%;
          height: 90vh;
          background: var(--bg-primary);
          border-radius: var(--radius-xl);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-secondary);
        }

        .title-area { display: flex; gap: 16px; align-items: center; }
        .doc-icon { font-size: 2rem; }
        .title-area h2 { font-size: 1.2rem; margin-bottom: 4px; color: var(--text-primary); }
        .subtitle { font-size: 0.85rem; color: var(--text-tertiary); }
        .subtitle.analyzing { color: #007AFF; animation: pulseText 1.5s infinite; }

        .btn-close {
          background: transparent; border: none; color: var(--text-secondary);
          font-size: 1.5rem; cursor: pointer; padding: 4px;
        }

        .generating-state {
          flex: 1; padding: 40px; display: flex; flex-direction: column; gap: 16px;
          align-items: center; justify-content: center; background: var(--bg-secondary);
        }

        .skeleton-line { height: 12px; background: var(--bg-tertiary); border-radius: 6px; width: 100%; animation: shimmer 1.5s infinite; }
        .skeleton-line.title { height: 24px; width: 60%; margin-bottom: 16px; }
        .skeleton-line.short { width: 40%; }
        .skeleton-box { height: 60px; background: var(--bg-tertiary); border-radius: 8px; width: 100%; animation: shimmer 1.5s infinite; }
        .skeleton-box.large { height: 120px; }
        
        .loading-spinner {
          width: 40px; height: 40px; border: 3px solid rgba(0,122,255,0.2);
          border-top-color: #007AFF; border-radius: 50%; animation: spin 1s linear infinite;
          margin-top: 24px;
        }

        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        .modal-body {
          flex: 1; overflow-y: auto; padding: 24px 40px; background: #f3f4f6; /* Paper-like background */
        }

        .report-paper {
          background: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .paper-header {
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .logo-placeholder {
          font-size: 1.5rem;
          font-weight: 800;
          color: #007AFF;
        }
        .logo-placeholder span {
          font-size: 1rem; font-weight: normal; color: #6b7280; margin-left: 8px;
        }

        .meta-info {
          display: flex; flex-direction: column; text-align: right;
          font-size: 0.85rem; color: #6b7280; gap: 4px;
        }

        .paper-section { margin-bottom: 32px; }
        .paper-section h3 {
          font-size: 1.1rem; color: #111827; margin-bottom: 16px;
          border-left: 4px solid #007AFF; padding-left: 8px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .edit-hint { font-size: 0.8rem; color: #9ca3af; font-weight: normal; border-left: none; }

        .info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          background: #f9fafb; padding: 16px; border-radius: 6px;
        }

        .info-item { display: flex; flex-direction: column; gap: 4px; }
        .info-item .lbl { font-size: 0.85rem; color: #6b7280; }
        .info-item .val { font-size: 1rem; font-weight: 500; color: #111827; }
        .info-item .val.blur { filter: blur(2px); user-select: none; }

        .quote-box {
          font-style: italic; color: #4b5563; background: #eff6ff;
          padding: 16px; border-radius: 6px; border-left: 4px solid #3b82f6;
          line-height: 1.6;
        }

        .editable-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .editable-list li { display: flex; gap: 12px; align-items: flex-start; }
        .editable-list .num { color: #007AFF; font-weight: bold; margin-top: 8px; }
        .editable-list li.risk .num { color: #f59e0b; }
        .editable-list input {
          flex: 1; padding: 8px 12px; border: 1px solid transparent;
          border-radius: 4px; font-size: 0.95rem; color: #111827;
          background: #f9fafb; transition: all 0.2s;
        }
        .editable-list input:hover, .editable-list input:focus {
          border-color: #d1d5db; background: white; outline: none;
        }

        .ai-eval-box {
          background: #f8fafc; border: 1px dashed #cbd5e1;
          padding: 16px; border-radius: 6px; display: flex; flex-direction: column; gap: 8px;
        }
        .eval-row { display: flex; gap: 12px; align-items: center; }
        .eval-row .lbl { color: #64748b; font-size: 0.9rem; width: 100px; }
        .eval-row .val { color: #334155; font-weight: 500; }
        .eval-row .val.warn { color: #b45309; }

        .file-list { display: flex; gap: 16px; }
        .file-item {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px; flex: 1;
        }
        .f-icon { font-size: 1.5rem; }
        .f-name { font-size: 0.85rem; color: #334155; text-align: center; font-weight: 500; }
        .f-status { font-size: 0.75rem; color: #10b981; background: #dcfce7; padding: 2px 8px; border-radius: 12px; }

        .modal-footer {
          padding: 20px 24px; border-top: 1px solid var(--border-subtle);
          display: flex; gap: 12px; background: var(--bg-secondary); justify-content: flex-end;
        }

        .modal-footer .btn-secondary {
          padding: 12px 20px; background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
          color: var(--text-primary); cursor: pointer; font-size: 0.9rem;
        }
        .modal-footer .btn-secondary:hover { background: var(--bg-card-hover); }

        .modal-footer .btn-primary {
          padding: 12px 24px; background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
          border: none; border-radius: var(--radius-md); color: white;
          font-weight: 600; cursor: pointer; font-size: 0.95rem;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .file-list { flex-direction: column; }
          .report-paper { padding: 20px; }
          .modal-footer { flex-direction: column; }
          .modal-footer button { width: 100%; }
        }
      `}</style>
    </div>
  );
}
