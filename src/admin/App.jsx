import { useState, useEffect } from 'react';
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

const AdminApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // 默认超级管理员
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [appData, setAppData] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('admin');
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
    <AdminLayout
      userRole={userRole}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {renderPage()}
      <style>{`
        /* 全局样式重置 */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #f5f5f5;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminApp;
