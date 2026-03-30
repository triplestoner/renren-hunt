import { useState } from 'react';

const mockEarnings = [
  {
    id: 1,
    candidate: '张同学',
    position: '资深前端架构师',
    company: '字节跳动',
    bonus: '¥25,000',
    status: '已到账',
    date: '2026-03-20',
    stage: '已入职',
  },
  {
    id: 2,
    candidate: '王同学',
    position: 'AI算法工程师',
    company: 'MiniMax',
    bonus: '¥18,000',
    status: '冻结中',
    date: '2026-03-15',
    stage: '过保中',
  },
  {
    id: 3,
    candidate: '李同学',
    position: '产品总监',
    company: '美团',
    bonus: '¥35,000',
    status: '待发放',
    date: '2026-03-10',
    stage: '面试中',
  },
  {
    id: 4,
    candidate: '赵同学',
    position: '后端资深工程师',
    company: '蚂蚁集团',
    bonus: '¥20,000',
    status: '已到账',
    date: '2026-02-28',
    stage: '已入职',
  },
];

const mockTimeline = [
  { label: '本月收益', value: '¥98,000', change: '+23%', positive: true },
  { label: '累计收益', value: '¥486,000', change: '', positive: true },
  { label: '推荐成功', value: '23人', change: '+3', positive: true },
];

export default function EarningsCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [walletAddress] = useState('0x7f9a...a3b2');
  const [withdrawProgress, setWithdrawProgress] = useState(0);
  const [withdrawStatus, setWithdrawStatus] = useState('idle');

  const handleWithdraw = () => {
    setWithdrawStatus('processing');
    setWithdrawProgress(0);
    
    const interval = setInterval(() => {
      setWithdrawProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setWithdrawStatus('success');
            setShowWithdrawModal(false);
            setWithdrawStatus('idle');
          }, 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="earnings-center">
      <header className="page-header">
        <div className="header-content">
          <h1>收益中心</h1>
          <p className="subtitle">累计信用资产，持续变现人脉价值</p>
        </div>
      </header>

      <div className="earnings-summary">
        <div className="summary-main">
          <div className="available-balance">
            <span className="balance-label">可提现余额</span>
            <span className="balance-value">¥83,000</span>
            <span className="balance-sub">+ ¥18,000 冻结中</span>
          </div>
          <button 
            className="btn-withdraw"
            onClick={() => setShowWithdrawModal(true)}
          >
            <span>💸</span> 立即提现
          </button>
        </div>
        <div className="summary-stats">
          {mockTimeline.map((stat, i) => (
            <div key={i} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              {stat.change && (
                <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          收益概览
        </button>
        <button 
          className={`tab ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => setActiveTab('records')}
        >
          收益明细
        </button>
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          待发放
        </button>
      </div>

      <div className="earnings-list">
        {mockEarnings
          .filter(item => activeTab === 'overview' || 
            (activeTab === 'records' && item.status === '已到账') ||
            (activeTab === 'pending' && item.status !== '已到账'))
          .map((item, index) => (
            <div key={item.id} className={`earnings-card animate-fade-in animate-delay-${index + 1}`}>
              <div className="card-left">
                <div className="candidate-avatar">
                  {item.candidate[0]}
                </div>
                <div className="card-info">
                  <div className="card-header">
                    <span className="candidate-name">{item.candidate}</span>
                    <span className={`status-badge ${item.status}`}>{item.status}</span>
                  </div>
                  <span className="position">{item.position}</span>
                  <span className="company">{item.company}</span>
                </div>
              </div>
              <div className="card-right">
                <span className="bonus">{item.bonus}</span>
                <span className="stage">{item.stage}</span>
                <span className="date">{item.date}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="withdraw-tips">
        <h3>💡 提现须知</h3>
        <ul>
          <li>提现申请提交后，1-3个工作日内到账</li>
          <li>支持绑定微信、支付宝、银行账户</li>
          <li>过保期（通常3个月）后自动解冻发放</li>
          <li>如有疑问可联系客服：400-888-8888</li>
        </ul>
      </div>

      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>提现到账</h3>
              <button className="close-btn" onClick={() => setShowWithdrawModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {withdrawStatus === 'idle' || withdrawStatus === 'processing' ? (
                <>
                  <div className="withdraw-amount">
                    <span className="amount-label">提现金额</span>
                    <input type="number" defaultValue="83000" className="amount-input" />
                  </div>
                  <div className="wallet-info">
                    <span className="wallet-label">钱包地址</span>
                    <span className="wallet-address">{walletAddress}</span>
                  </div>
                  <div className="withdraw-methods">
                    <div className="method selected">
                      <span className="method-icon">🔗</span>
                      <span>区块链钱包</span>
                    </div>
                    <div className="method">
                      <span className="method-icon">💳</span>
                      <span>银行卡</span>
                    </div>
                    <div className="method">
                      <span className="method-icon">💬</span>
                      <span>微信</span>
                    </div>
                  </div>
                  {withdrawStatus === 'processing' && (
                    <div className="withdraw-progress">
                      <div className="progress-icon">⏳</div>
                      <p>智能合约正在处理您的提现请求...</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${withdrawProgress}%` }}></div>
                      </div>
                      <span className="progress-text">{withdrawProgress}%</span>
                    </div>
                  )}
                  {withdrawStatus === 'processing' ? (
                    <button className="btn-confirm-withdraw" disabled>处理中...</button>
                  ) : (
                    <button className="btn-confirm-withdraw" onClick={handleWithdraw}>确认提现</button>
                  )}
                </>
              ) : (
                <div className="withdraw-success">
                  <div className="success-icon">✅</div>
                  <h4>提现成功</h4>
                  <p>¥83,000 已发送到您的钱包</p>
                  <span className="tx-hash">Tx: 0x{Math.random().toString(16).slice(2, 10)}...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .earnings-center {
          max-width: 900px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .earnings-summary {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: var(--shadow-glass);
        }

        .summary-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .available-balance {
          display: flex;
          flex-direction: column;
        }

        .balance-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .balance-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .balance-sub {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .btn-withdraw {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-gradient);
          color: #0a0a0f;
          padding: 14px 28px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-withdraw:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stat-card {
          text-align: center;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .stat-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: 8px;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-change {
          display: inline-block;
          margin-top: 4px;
          font-size: 0.8rem;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .stat-change.positive {
          background: rgba(74, 222, 128, 0.1);
          color: var(--success);
        }

        .stat-change.negative {
          background: rgba(248, 113, 113, 0.1);
          color: var(--error);
        }

        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tab {
          padding: 10px 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
        }

        .tab.active {
          background: var(--accent-glow);
          border-color: var(--border-accent);
          color: var(--accent-primary);
        }

        .earnings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        .earnings-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .earnings-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .card-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .candidate-avatar {
          width: 48px;
          height: 48px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #0a0a0f;
          font-size: 1.1rem;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .candidate-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 2px 10px;
          border-radius: 10px;
        }

        .status-badge.已到账 {
          background: rgba(74, 222, 128, 0.1);
          color: var(--success);
        }

        .status-badge.冻结中 {
          background: rgba(251, 191, 36, 0.1);
          color: var(--warning);
        }

        .status-badge.待发放 {
          background: rgba(96, 165, 250, 0.1);
          color: var(--info);
        }

        .position {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .company {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .card-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .bonus {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--success);
        }

        .stage {
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          padding: 2px 10px;
          border-radius: 4px;
        }

        .date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .withdraw-tips {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-glass);
        }

        .withdraw-tips h3 {
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .withdraw-tips ul {
          list-style: none;
        }

        .withdraw-tips li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .withdraw-tips li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          width: 90%;
          max-width: 420px;
          animation: fadeIn 0.3s ease;
          box-shadow: var(--shadow-glass);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-header h3 {
          font-size: 1.1rem;
        }

        .close-btn {
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .close-btn:hover {
          color: var(--accent-primary);
        }

        .modal-body {
          padding: 24px;
        }

        .withdraw-amount {
          margin-bottom: 24px;
        }

        .amount-label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .amount-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 600;
          outline: none;
        }

        .amount-input:focus {
          border-color: var(--accent-primary);
        }

        .withdraw-methods {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .method {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .method:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
        }

        .method.selected {
          background: var(--accent-glow);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .method-icon {
          font-size: 1.5rem;
        }

        .btn-confirm-withdraw {
          width: 100%;
          padding: 14px;
          background: var(--accent-gradient);
          color: #0a0a0f;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-confirm-withdraw:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 768px) {
          .summary-main {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }

          .summary-stats {
            grid-template-columns: 1fr;
          }

          .earnings-card {
            flex-direction: column;
            gap: 16px;
          }

          .card-left {
            width: 100%;
          }

          .card-right {
            width: 100%;
            align-items: flex-start;
          }
        }

        .wallet-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 16px 0;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .wallet-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .wallet-address {
          font-family: monospace;
          font-size: 0.9rem;
          color: var(--accent-primary);
        }

        .withdraw-progress {
          text-align: center;
          padding: 20px;
        }

        .progress-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
          animation: pulse 1s infinite;
        }

        .withdraw-progress p {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .withdraw-progress .progress-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .withdraw-progress .progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          transition: width 0.15s ease;
        }

        .withdraw-progress .progress-text {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .withdraw-success {
          text-align: center;
          padding: 32px 16px;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .withdraw-success h4 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .withdraw-success p {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .tx-hash {
          font-family: monospace;
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}
