import { useState } from 'react';
import AdminApp from './App';

const AdminPortal = ({ onRoleSwitch }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); // 默认直接进入管理后台

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-preview">
        <div className="preview-content">
          <h2>🔐 人人猎角色选择</h2>
          <p>请选择要进入的角色页面</p>

          <div className="role-selector">
            <button
              className="role-btn"
              onClick={() => onRoleSwitch && onRoleSwitch('c1')}
            >
              <span className="role-icon">👤</span>
              <div>
                <div className="role-name">Recommender</div>
                <div className="role-sub">推荐人</div>
              </div>
            </button>
            <button
              className="role-btn"
              onClick={() => onRoleSwitch && onRoleSwitch('c2')}
            >
              <span className="role-icon">🎯</span>
              <div>
                <div className="role-name">Candidate</div>
                <div className="role-sub">候选人</div>
              </div>
            </button>
            <button
              className="role-btn"
              onClick={() => onRoleSwitch && onRoleSwitch('b')}
            >
              <span className="role-icon">🏢</span>
              <div>
                <div className="role-name">B端企业</div>
                <div className="role-sub">企业HR</div>
              </div>
            </button>
            <button
              className="role-btn active"
              onClick={() => setIsAdminLoggedIn(true)}
            >
              <span className="role-icon">🔐</span>
              <div>
                <div className="role-name">管理后台</div>
                <div className="role-sub">超级管理员</div>
              </div>
            </button>
          </div>
        </div>
        <style>{`
          .admin-preview {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
          }

          .preview-content {
            background: white;
            padding: 40px 60px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
          }

          .preview-content h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 12px;
          }

          .preview-content p {
            color: #666;
            margin-bottom: 32px;
            font-size: 14px;
          }

          .role-selector {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .role-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            background: #f9f9f9;
            border: 2px solid #e9e9e9;
            padding: 20px 16px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .role-btn:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
            transform: translateY(-2px);
          }

          .role-btn.active {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.1);
          }

          .role-icon {
            font-size: 32px;
          }

          .role-name {
            font-weight: 600;
            color: #333;
            font-size: 14px;
          }

          .role-sub {
            color: #666;
            font-size: 12px;
          }

          @media (max-width: 768px) {
            .preview-content {
              padding: 30px 20px;
            }

            .preview-content h2 {
              font-size: 20px;
            }

            .role-selector {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }

  return <AdminApp onRoleSwitch={onRoleSwitch} />;
};

export default AdminPortal;
