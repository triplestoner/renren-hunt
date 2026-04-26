import { useState } from 'react';

export default function CandidateOnboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    experience: '',
    privacy: 'recommender_only'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleGenerateCCA = () => {
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
            <h3>第一步：基础信息</h3>
            <p className="step-desc">完善基础信息，开启链上职业旅程</p>
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
              <label>当前职位</label>
              <input 
                type="text" 
                placeholder="例如：资深前端工程师"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>工作年限</label>
              <select 
                value={formData.experience}
                onChange={e => setFormData({...formData, experience: e.target.value})}
              >
                <option value="">请选择</option>
                <option value="1-3年">1-3年</option>
                <option value="3-5年">3-5年</option>
                <option value="5-10年">5-10年</option>
                <option value="10年以上">10年以上</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="onboarding-step">
            <h3>第二步：数据授权设置</h3>
            <p className="step-desc">你的数据你做主，灵活控制可见范围</p>
            <div className="privacy-options">
              <label className={`privacy-option ${formData.privacy === 'public' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="privacy" 
                  value="public"
                  checked={formData.privacy === 'public'}
                  onChange={e => setFormData({...formData, privacy: e.target.value})}
                />
                <div className="option-content">
                  <span className="icon">🌐</span>
                  <div className="text">
                    <h4>完全公开</h4>
                    <p>所有认证推荐人和企业可见，获得最多推荐机会</p>
                  </div>
                </div>
              </label>
              <label className={`privacy-option ${formData.privacy === 'recommender_only' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="privacy" 
                  value="recommender_only"
                  checked={formData.privacy === 'recommender_only'}
                  onChange={e => setFormData({...formData, privacy: e.target.value})}
                />
                <div className="option-content">
                  <span className="icon">🤝</span>
                  <div className="text">
                    <h4>仅推荐人可见</h4>
                    <p>由熟人推荐给企业，保护隐私的同时不漏掉好机会</p>
                  </div>
                </div>
              </label>
              <label className={`privacy-option ${formData.privacy === 'enterprise_only' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="privacy" 
                  value="enterprise_only"
                  checked={formData.privacy === 'enterprise_only'}
                  onChange={e => setFormData({...formData, privacy: e.target.value})}
                />
                <div className="option-content">
                  <span className="icon">🏢</span>
                  <div className="text">
                    <h4>仅企业可见</h4>
                    <p>只有正在招聘匹配岗位的企业HR可以直接查看</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="onboarding-step">
            <h3>第三步：签署上链协议</h3>
            <p className="step-desc">确权数据资产，生成唯一链上身份</p>
            <div className="agreement-box">
              <h4>数据所有权申明</h4>
              <p>1. 您的简历数据将进行加密存储，密钥由您个人保管。</p>
              <p>2. 任何企业或推荐人查看您的完整简历均需获得您的授权。</p>
              <p>3. 您的面试记录、入职表现将作为不可篡改的信用凭证记录在链上。</p>
              <p>4. 您可通过开放脱敏数据获得行业数据库的Token分红。</p>
            </div>
            {isGenerating ? (
              <div className="generating-cca">
                <div className="spinner"></div>
                <p>正在生成私钥并创建CCA身份...</p>
                <div className="hash-code">0x{Math.random().toString(16).slice(2, 10)}...</div>
              </div>
            ) : (
              <button className="btn-primary full-width" onClick={handleGenerateCCA}>
                ✍️ 同意协议并生成身份
              </button>
            )}
          </div>
        );
      case 4:
        return (
          <div className="onboarding-step success-step">
            <div className="success-icon">🎉</div>
            <h3>入驻成功！</h3>
            <p className="step-desc">已为您生成初始信用评分</p>
            
            <div className="cca-card">
              <div className="cca-header">
                <span className="cca-logo">CCA</span>
                <span className="cca-badge">Web3 Candidate</span>
              </div>
              <div className="cca-body">
                <div className="cca-user">
                  <div className="cca-avatar">{formData.name ? formData.name[0] : 'U'}</div>
                  <div className="cca-info">
                    <div className="cca-name">{formData.name || '张同学'}</div>
                    <div className="cca-title">{formData.title || '资深工程师'}</div>
                  </div>
                </div>
                <div className="cca-score-box">
                  <div className="score-value">75</div>
                  <div className="score-label">初始信用分</div>
                </div>
              </div>
              <div className="cca-footer">
                <span className="hash">DID: did:rnt:0x{Math.random().toString(16).slice(2, 10)}...</span>
              </div>
            </div>

            <button className="btn-primary full-width mt-20" onClick={() => onComplete(formData)}>
              开启职场变现之旅
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="candidate-onboarding">
      <div className="onboarding-container">
        {step < 4 && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        )}
        
        {renderStep()}

        {step < 3 && step > 0 && (
          <div className="step-actions">
            {step > 1 && <button className="btn-secondary" onClick={prevStep}>上一步</button>}
            <button className="btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>下一步</button>
          </div>
        )}
      </div>

      <style>{`
        .candidate-onboarding {
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
          background: linear-gradient(90deg, #007AFF, #6366f1);
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
        .privacy-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .privacy-option {
          display: block;
          cursor: pointer;
        }
        .privacy-option input {
          display: none;
        }
        .option-content {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: all 0.2s;
        }
        .privacy-option.selected .option-content {
          border-color: #007AFF;
          background: rgba(0, 122, 255, 0.05);
        }
        .option-content .icon {
          font-size: 1.5rem;
        }
        .option-content h4 {
          margin-bottom: 4px;
        }
        .option-content p {
          font-size: 0.85rem;
          color: var(--text-secondary);
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
          background: linear-gradient(135deg, #007AFF 0%, #0062CC 100%);
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
          border: 3px solid rgba(0,122,255,0.2);
          border-top-color: #007AFF;
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
        .cca-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
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
        .cca-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: rotate(45deg);
        }
        .cca-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .cca-logo {
          font-weight: 800;
          letter-spacing: 2px;
          color: #38bdf8;
        }
        .cca-badge {
          font-size: 0.75rem;
          background: rgba(255,255,255,0.1);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .cca-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .cca-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cca-avatar {
          width: 48px;
          height: 48px;
          background: #38bdf8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .cca-name {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .cca-title {
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .cca-score-box {
          text-align: right;
        }
        .score-value {
          font-size: 2rem;
          font-weight: 800;
          color: #4ade80;
        }
        .score-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .cca-footer {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 12px;
          font-family: monospace;
          font-size: 0.75rem;
          color: #64748b;
        }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
}
