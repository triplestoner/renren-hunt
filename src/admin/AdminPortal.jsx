import { useState } from 'react';
import AdminApp from './App';

const AdminPortal = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-preview">
        <div className="preview-content">
          <h2>🔐 管理后台入口</h2>
          <p>管理后台仅供平台运营人员使用</p>
          <button
            className="login-btn"
            onClick={() => setIsAdminLoggedIn(true)}
          >
            进入管理后台
          </button>
          <p className="security-tip">
            💡 注意：管理后台需要特殊权限才能访问
          </p>
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
            max-width: 400px;
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

          .login-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          }

          .security-tip {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
          }

          @media (max-width: 768px) {
            .preview-content {
              padding: 30px 20px;
            }

            .preview-content h2 {
              font-size: 20px;
            }
          }
        `}</style>
      </div>
    );
  }

  return <AdminApp />;
};

export default AdminPortal;
