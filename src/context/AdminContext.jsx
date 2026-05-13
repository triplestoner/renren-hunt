import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('admin');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [appData, setAppData] = useState(null);

  // 模拟用户登录
  useEffect(() => {
    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setCurrentUser({
        id: '1',
        name: '管理员',
        avatar: 'https://i.pravatar.cc/40?u=admin',
        role: 'admin',
        roleName: '超级管理员',
        email: 'admin@renrenlie.com'
      });
      setIsLoading(false);

      // 模拟通知
      setNotifications([
        { id: '1', type: 'info', message: '新用户注册', time: '2分钟前' },
        { id: '2', type: 'warning', message: '待审核申请', time: '5分钟前' },
        { id: '3', type: 'success', message: '结算完成', time: '10分钟前' }
      ]);
    }, 1000);
  }, []);

  const contextValue = {
    userRole,
    setUserRole,
    currentUser,
    setCurrentUser,
    isLoading,
    notifications,
    setNotifications,
    appData,
    setAppData,
    markNotificationAsRead: (id) => {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    },
    addNotification: (notification) => {
      setNotifications(prev => [
        { ...notification, id: Date.now().toString() },
        ...prev
      ]);
    },
    removeNotification: (id) => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
