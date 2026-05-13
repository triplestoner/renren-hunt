import { useState } from 'react';

const AdminLayout = ({ children, userRole = 'admin', currentPage, onPageChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuItems = [
    {
      key: 'dashboard',
      icon: '📊',
      label: '仪表盘',
      roles: ['admin', 'operator', 'financial', 'analyst', 'customer']
    },
    {
      key: 'user-management',
      icon: '👥',
      label: '用户管理',
      roles: ['admin', 'operator']
    },
    {
      key: 'audit-management',
      icon: '✅',
      label: '审核管理',
      roles: ['admin', 'operator']
    },
    {
      key: 'rights-config',
      icon: '⚙️',
      label: '权益配置',
      roles: ['admin', 'operator']
    },
    {
      key: 'finance-management',
      icon: '💰',
      label: '资金管理',
      roles: ['admin', 'financial']
    },
    {
      key: 'data-analysis',
      icon: '📈',
      label: '数据分析',
      roles: ['admin', 'analyst']
    },
    {
      key: 'content-management',
      icon: '📝',
      label: '内容管理',
      roles: ['admin', 'operator']
    },
    {
      key: 'system-management',
      icon: '🔧',
      label: '系统管理',
      roles: ['admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const currentUser = {
    name: '管理员',
    avatar: 'https://i.pravatar.cc/40?u=admin',
    role: 'admin',
    roleName: '超级管理员'
  };

  const notifications = [
    { id: 1, title: '新用户注册', content: '用户张三刚刚注册了账号', time: '2分钟前', unread: true },
    { id: 2, title: '审核任务提醒', content: '有5个简历需要审核', time: '1小时前', unread: true },
    { id: 3, title: '系统更新通知', content: '系统将于今晚进行维护', time: '3小时前', unread: false }
  ];

  const userMenuItems = [
    { key: 'profile', label: '个人中心', icon: '👤' },
    { key: 'settings', label: '账号设置', icon: '⚙️' },
    { key: 'logout', label: '退出登录', icon: '🚪' }
  ];

  const handleMenuClick = (key) => {
    onPageChange(key);
    // 移动端点击菜单后关闭侧边栏
    if (window.innerWidth <= 768) {
      setMobileMenuOpen(false);
    }
  };

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
    setUserMenuOpen(false);
  };

  const handleUserProfileClick = () => {
    setUserMenuOpen(!userMenuOpen);
    setNotificationOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // 点击页面其他区域关闭菜单
  const handleClickOutside = (e) => {
    if (!e.target.closest('.notification') && !e.target.closest('.user-profile')) {
      setNotificationOpen(false);
      setUserMenuOpen(false);
    }
  };

  return (
    <div className="admin-layout" onClick={handleClickOutside}>
      {/* 移动端菜单切换按钮 */}
      <button
        className="mobile-menu-toggle"
        onClick={handleMobileMenuToggle}
      >
        ☰
      </button>

      {/* 遮罩层 */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo">
          <span className="logo-icon">👑</span>
          {!collapsed && <span className="logo-text">人人猎管理后台</span>}
        </div>

        <div className="menu">
          {filteredMenuItems.map(item => (
            <div
              key={item.key}
              className={`menu-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.key)}
            >
              <span className="menu-icon">{item.icon}</span>
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? '☰' : '✕'}
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-item">管理后台</span>
              <span className="breadcrumb-item active">{filteredMenuItems.find(item => item.key === currentPage)?.label || '仪表盘'}</span>
            </div>
          </div>

          <div className="header-right">
            <div className="notification" onClick={handleNotificationClick}>
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">{notifications.filter(n => n.unread).length}</span>

              {/* 通知下拉菜单 */}
              {notificationOpen && (
                <div className="notification-dropdown">
                  <div className="dropdown-header">
                    <span className="dropdown-title">通知</span>
                    <span className="dropdown-link">查看全部</span>
                  </div>
                  <div className="notification-list">
                    {notifications.map(notification => (
                      <div key={notification.id} className="notification-item">
                        <div className="notification-content">
                          <div className="notification-title">{notification.title}</div>
                          <div className="notification-text">{notification.content}</div>
                          <div className="notification-time">{notification.time}</div>
                        </div>
                        {notification.unread && <div className="unread-dot" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="user-profile" onClick={handleUserProfileClick}>
              <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.roleName || currentUser.role}</span>
              </div>

              {/* 用户菜单下拉 */}
              {userMenuOpen && (
                <div className="user-dropdown">
                  {userMenuItems.map(item => (
                    <div key={item.key} className="user-menu-item">
                      <span className="menu-item-icon">{item.icon}</span>
                      <span className="menu-item-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content">
          {children}
        </div>
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .sidebar {
          width: ${collapsed ? '64px' : '240px'};
          background: #001529;
          color: white;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 1000;
        }

        .logo {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 16px;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          white-space: nowrap;
        }

        .menu {
          flex: 1;
          overflow-y: auto;
          padding: 16px 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .menu-item.active {
          background: #1890ff;
        }

        .menu-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
        }

        .menu-label {
          font-size: 14px;
        }

        .main-content {
          flex: 1;
          margin-left: ${collapsed ? '64px' : '240px'};
          transition: all 0.3s ease;
        }

        .header {
          height: 64px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .collapse-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .collapse-btn:hover {
          background: #f0f0f0;
        }

        .breadcrumb {
          display: flex;
          gap: 8px;
          font-size: 14px;
        }

        .breadcrumb-item {
          color: #666;
        }

        .breadcrumb-item.active {
          color: #1890ff;
          font-weight: 500;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .notification {
          position: relative;
          cursor: pointer;
        }

        .notification-icon {
          font-size: 20px;
          color: #666;
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff4d4f;
          color: white;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }

        .notification-dropdown {
          position: absolute;
          top: 40px;
          right: 0;
          width: 320px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1001;
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
        }

        .dropdown-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .dropdown-link {
          font-size: 12px;
          color: #1890ff;
          cursor: pointer;
        }

        .notification-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .notification-item:hover {
          background: #f5f5f5;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .notification-text {
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .notification-time {
          font-size: 11px;
          color: #999;
        }

        .unread-dot {
          width: 6px;
          height: 6px;
          background: #1890ff;
          border-radius: 50%;
          margin-top: 6px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 4px;
          transition: background 0.3s ease;
          position: relative;
        }

        .user-profile:hover {
          background: #f0f0f0;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .user-role {
          font-size: 12px;
          color: #666;
        }

        .user-dropdown {
          position: absolute;
          top: 60px;
          right: 0;
          width: 180px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1001;
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 14px;
          color: #333;
        }

        .user-menu-item:hover {
          background: #f5f5f5;
        }

        .menu-item-icon {
          font-size: 16px;
        }

        .menu-item-label {
          flex: 1;
        }

        .content {
          padding: 24px;
          min-height: calc(100vh - 64px);
        }

        /* 移动端样式 */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex;
            position: fixed;
            top: 16px;
            left: 16px;
            width: 40px;
            height: 40px;
            background: white;
            border: none;
            border-radius: 8px;
            font-size: 20px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            z-index: 1002;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.collapsed {
            transform: translateX(-100%);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
          }

          .header {
            padding: 0 16px;
          }

          .collapse-btn {
            display: none;
          }

          .breadcrumb {
            margin-left: 40px;
          }

          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .header-right {
            gap: 16px;
          }

          .user-info {
            display: none;
          }

          .notification-dropdown {
            right: -20px;
            width: 280px;
          }

          .user-dropdown {
            right: -10px;
            width: 160px;
          }
        }

        /* 桌面端隐藏移动端按钮 */
        @media (min-width: 769px) {
          .mobile-menu-toggle {
            display: none;
          }

          .mobile-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
