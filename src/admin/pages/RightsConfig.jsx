import { useState } from 'react';

const RightsConfig = () => {
  const [activeTab, setActiveTab] = useState('recommender');

  const rightsConfig = {
    recommender: {
      level: 'S级',
      dailyRecommendations: 20,
      commissionRate: 15,
      visibility: '全部职位',
      promotionRate: 20,
      status: '已激活'
    },
    candidate: {
      visibility: '隐身模式',
      recommendations: 5,
      dailyApplies: 3,
      status: '已激活'
    },
    employer: {
      plan: '专业版',
      jobSlots: 10,
      candidatesViewed: '无限',
      verification: '企业认证',
      commissionRate: 18,
      status: '已激活'
    }
  };

  const tabNames = {
    recommender: '推荐人权益',
    candidate: '候选人权益',
    employer: '企业权益'
  };

  return (
    <div className="rights-config">
      <div className="page-header">
        <h1>权益配置</h1>
        <p>配置各类用户的权益和权限</p>
      </div>

      <div className="rights-tabs">
        {(['recommender', 'candidate', 'employer']).map((tab) => (
          <button
            key={tab}
            className={`rights-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="config-card">
        {activeTab === 'recommender' && (
          <div className="recommender-config">
            <h3>推荐人权益配置</h3>
            <div className="config-section">
              <div className="config-item">
                <div className="item-label">推荐人等级</div>
                <div className="item-value">{rightsConfig.recommender.level}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">每日推荐次数</div>
                <div className="item-value">{rightsConfig.recommender.dailyRecommendations}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">佣金比例</div>
                <div className="item-value">{rightsConfig.recommender.commissionRate}%</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">职位可见性</div>
                <div className="item-value">{rightsConfig.recommender.visibility}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">晋升概率</div>
                <div className="item-value">{rightsConfig.recommender.promotionRate}%</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">状态</div>
                <div className="item-value">{rightsConfig.recommender.status}</div>
                <button className="edit-btn">编辑</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidate' && (
          <div className="candidate-config">
            <h3>候选人权益配置</h3>
            <div className="config-section">
              <div className="config-item">
                <div className="item-label">简历可见性</div>
                <div className="item-value">{rightsConfig.candidate.visibility}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">每日推荐数</div>
                <div className="item-value">{rightsConfig.candidate.recommendations}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">每日申请数</div>
                <div className="item-value">{rightsConfig.candidate.dailyApplies}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">状态</div>
                <div className="item-value">{rightsConfig.candidate.status}</div>
                <button className="edit-btn">编辑</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employer' && (
          <div className="employer-config">
            <h3>企业权益配置</h3>
            <div className="config-section">
              <div className="config-item">
                <div className="item-label">套餐类型</div>
                <div className="item-value">{rightsConfig.employer.plan}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">职位发布数</div>
                <div className="item-value">{rightsConfig.employer.jobSlots}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">候选人查看权限</div>
                <div className="item-value">{rightsConfig.employer.candidatesViewed}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">企业认证</div>
                <div className="item-value">{rightsConfig.employer.verification}</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">佣金比例</div>
                <div className="item-value">{rightsConfig.employer.commissionRate}%</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">状态</div>
                <div className="item-value">{rightsConfig.employer.status}</div>
                <button className="edit-btn">编辑</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .rights-config {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 28px;
          color: #333;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .page-header p {
          color: #666;
          font-size: 14px;
        }

        .rights-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .rights-tab {
          padding: 12px 24px;
          background: white;
          border: 1px solid #e8e8e8;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .rights-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .rights-tab.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .config-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .config-card h3 {
          font-size: 20px;
          color: #333;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .config-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .config-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .item-label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .item-value {
          font-size: 14px;
          color: #666;
        }

        .edit-btn {
          padding: 6px 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          background: #5568d3;
        }

        @media (max-width: 768px) {
          .config-section {
            grid-template-columns: 1fr;
          }

          .config-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .edit-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .rights-tabs {
            flex-direction: column;
          }

          .rights-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }

          .config-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default RightsConfig;
