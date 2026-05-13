import { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [userRole, setUserRole] = useState('admin');
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: 'admin', label: '超级管理员' },
    { value: 'operator', label: '平台运营' },
    { value: 'financial', label: '财务专员' },
    { value: 'analyst', label: '数据分析师' },
    { value: 'customer', label: '客服专员' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      onLogin(userRole);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <span className="logo-icon">👑</span>
          <h1>人人猎管理后台</h1>
          <p>请选择角色并登录</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userRole">角色选择</label>
            <select
              id="userRole"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="form-control"
              required
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 人人猎平台管理后台. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-box {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 400px;
          transition: all 0.3s ease;
        }

        .login-box:hover {
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo-icon {
          font-size: 48px;
          margin-bottom: 12px;
          display: block;
        }

        .login-header h1 {
          font-size: 28px;
          color: #333;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .login-header p {
          color: #666;
          font-size: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          color: #333;
          font-size: 14px;
          font-weight: 500;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-control::placeholder {
          color: #999;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .login-footer p {
          color: #999;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .login-box {
            padding: 30px 20px;
          }

          .login-header h1 {
            font-size: 24px;
          }

          .logo-icon {
            font-size: 40px;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 10px;
          }

          .login-box {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
