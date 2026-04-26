import { useState } from 'react';

export default function RecommenderOnboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    industry: '',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleGenerateDID = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      nextStep();
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding-step">
            <h3>第一步：实名与行业认证</h3>
            <p className="step-desc">平台要求真实身份以保证推荐质量和建立链上信任</p>
            <div className="form-group">
              <label>真实姓名</label>
              <input 
                type="text" 
                placeholder="请输入姓名"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>身份证号 (加密存储)</label>
              <input 
                type="text" 
                placeholder="请输入身份证号"
                value={formData.idNumber}
                onChange={e => setFormData({...formData, idNumber: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>擅长推荐的行业</label>
              <select 
                value={formData.industry}
                onChange={e => setFormData({...formData, industry: e.target.value})}
              >
                <option value="">请选择核心行业</option>
                <option value="互联网/IT">互联网 / IT</option>
                <option value="人工智能">人工智能</option>
                <option value="金融科技">金融科技</option>
                <option value="智能制造">智能制造</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="onboarding-step">
            <h3>第二步：签署链上服务协议</h3>
            <p className="step-desc">确认数据权益，您的服务记录将作为资产永久存证</p>
            <div className="agreement-box">
              <h4>推荐人声誉资产公约</h4>
              <p>1. 您的每一次成功推荐、候选人面试反馈、企业评价都将记录在区块链上。</p>
              <p>2. 您的数据（声誉资产）完全归您所有，平台不可篡改。</p>
              <p>3. 链上声誉分数越高，您将解锁更高的企业佣金提成比例。</p>
              <p>4. 您未来可以将此声誉证明携带至其他招聘协作平台使用。</p>
            </div>
            {isGenerating ? (
              <div className="generating-cca">
                <div className="spinner"></div>
                <p>正在生成私钥并初始化您的声誉资产账户...</p>
                <div className="hash-code">0x{Math.random().toString(16).slice(2, 10)}...</div>
              </div>
            ) : (
              <button className="btn-primary full-width" onClick={handleGenerateDID}>
                ✍️ 同意协议并生成链上身份
              </button>
            )}
          </div>
        );
      case 3:
        return (
          <div className="onboarding-step success-step">
            <div className="success-icon">🏆</div>
            <h3>认证成功！</h3>
            <p className="step-desc">基于您的行业背景，已生成初始声誉评分</p>
            
            <div className="rep-card">
              <div className="rep-header">
                <span className="rep-logo">Web3 Recommender</span>
                <span className="rep-badge">认证专家</span>
              </div>
              <div className="rep-body">
                <div className="rep-user">
                  <div className="rep-avatar">{formData.name ? formData.name[0] : '推'}</div>
                  <div className="rep-info">
                    <div className="rep-name">{formData.name || '神秘伯乐'}</div>
                    <div className="rep-title">{formData.industry || '跨界专家'} 推荐人</div>
                  </div>
                </div>
                <div className="rep-score-box">
                  <div className="score-value">82</div>
                  <div className="score-label">初始声誉分</div>
                </div>
              </div>
              <div className="rep-footer">
                <span className="hash">DID: did:rep:0x{Math.random().toString(16).slice(2, 10)}...</span>
              </div>
            </div>

            <button className="btn-primary full-width mt-20" onClick={() => onComplete(formData)}>
              进入工作台开始接单
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="recommender-onboarding">
      <div className="onboarding-container">
        {step < 3 && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 2) * 100}%` }}></div>
          </div>
        )}
        
        {renderStep()}

        {step < 2 && step > 0 && (
          <div className="step-actions">
            {step > 1 && <button className="btn-secondary" onClick={prevStep}>上一步</button>}
            <button className="btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>下一步</button>
          </div>
        )}
      </div>

      <style>{`
        .recommender-onboarding {
          padding: 40px 20px;
          max-width: 600px;
          margin: 0 auto;
        }
        .onboarding-container {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: var(--shadow-glass);
        }
        .progress-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          margin-bottom: 32px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #d97706);
          transition: width 0.3s ease;
        }
        .onboarding-step h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }
        .step-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--text-primary);
          font-weight: 500;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 1rem;
        }
        .agreement-box {
          background: var(--bg-tertiary);
          padding: 20px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .agreement-box h4 {
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .btn-secondary {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          padding: 12px 24px;
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
        }
        .full-width {
          width: 100%;
        }
        .step-actions {
          display: flex;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }
        .generating-cca {
          text-align: center;
          padding: 32px 0;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(245,158,11,0.2);
          border-top-color: #f59e0b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }
        .hash-code {
          font-family: monospace;
          color: var(--text-tertiary);
          margin-top: 8px;
          font-size: 0.85rem;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .success-step {
          text-align: center;
        }
        .success-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }
        .rep-card {
          background: linear-gradient(135deg, #451a03 0%, #78350f 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          text-align: left;
          margin: 24px 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .rep-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: rotate(45deg);
        }
        .rep-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .rep-logo {
          font-weight: 800;
          letter-spacing: 1px;
          color: #fbbf24;
        }
        .rep-badge {
          font-size: 0.75rem;
          background: rgba(255,255,255,0.15);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .rep-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .rep-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rep-avatar {
          width: 48px;
          height: 48px;
          background: #fbbf24;
          color: #451a03;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .rep-name {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .rep-title {
          font-size: 0.85rem;
          color: #fcd34d;
        }
        .rep-score-box {
          text-align: right;
        }
        .score-value {
          font-size: 2rem;
          font-weight: 800;
          color: #f59e0b;
          text-shadow: 0 0 10px rgba(245,158,11,0.5);
        }
        .score-label {
          font-size: 0.75rem;
          color: #fcd34d;
        }
        .rep-footer {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 12px;
          font-family: monospace;
          font-size: 0.75rem;
          color: #fcd34d;
        }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
}
