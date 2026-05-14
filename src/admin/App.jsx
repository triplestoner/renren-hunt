import { useState, useEffect } from 'react';
import './admin-theme.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import AuditManagement from './pages/AuditManagement';
import RightsConfig from './pages/RightsConfig';
import FinanceManagement from './pages/FinanceManagement';
import DataAnalysis from './pages/DataAnalysis';
import ContentManagement from './pages/ContentManagement';
import SystemManagement from './pages/SystemManagement';
import AdminLayout from './layouts/AdminLayout';
import { userAPI, financeAPI, systemAPI, dataAnalysisAPI } from '../api/admin';
import { AdminProvider, useAdminContext } from '../context/AdminContext';

const AdminAppContent = ({ onRoleSwitch: onOuterRoleSwitch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole, setAppData, currentUser, isLoading: contextLoading } = useAdminContext();

  const handleRoleSwitch = (role) => {
    onOuterRoleSwitch && onOuterRoleSwitch(role);
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const fetchAppData = async () => {
    try {
      setIsLoading(true);

      // 并行获取多个API数据
      const [systemStats, userData, financeData] = await Promise.all([
        systemAPI.getSystemStats(),
        userAPI.getAllUsers('recommender'),
        financeAPI.getTransactions()
      ]);

      setAppData({
        systemStats: systemStats.data,
        userData: userData.data,
        financeData: financeData.data
      });
    } catch (error) {
      console.error('获取应用数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 在用户登录后获取数据
  useEffect(() => {
    if (isLoggedIn) {
      fetchAppData();
    }
  }, [isLoggedIn]);

  // 显示加载状态
  if (contextLoading) {
    return (
      <div className="admin-theme loading-container">
        <div className="loading-spinner">
          <span className="spinner-icon">🔄</span>
          <p style={{ color: 'var(--admin-text-primary)', fontFamily: 'var(--admin-font-sans)', fontSize: '1.2rem' }}>加载中...</p>
        </div>
        <style>{`
          .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: var(--admin-bg-primary);
            position: relative;
            z-index: 100;
          }

          .loading-spinner {
            text-align: center;
          }

          .spinner-icon {
            font-size: 56px;
            animation: spin 1s linear infinite;
            background: linear-gradient(135deg, var(--admin-btn-primary) 0%, var(--admin-bonus-gold) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'user-management':
        return <UserManagement />;
      case 'audit-management':
        return <AuditManagement />;
      case 'rights-config':
        return <RightsConfig />;
      case 'finance-management':
        return <FinanceManagement />;
      case 'data-analysis':
        return <DataAnalysis />;
      case 'content-management':
        return <ContentManagement />;
      case 'system-management':
        return <SystemManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-theme">
      <AdminLayout
        userRole={currentUser?.role || 'admin'}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRoleSwitch={handleRoleSwitch}
      >
        {renderPage()}
        <style>{`
          /* 管理后台全局样式重置 */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .admin-theme body {
            font-family: var(--admin-font-sans);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: var(--admin-bg-primary);
          }

          .admin-theme code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }
        `}</style>
      </AdminLayout>
    </div>
  );
};

const AdminApp = ({ onRoleSwitch }) => {
  return (
    <AdminProvider>
      <AdminAppContent onRoleSwitch={onRoleSwitch} />
    </AdminProvider>
  );
};

export default AdminApp;
