import { useState } from 'react';

const AdminLayout = ({ children, userRole = 'admin', currentPage, onPageChange, onRoleSwitch }) => {
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
    if (!e.target.closest('.notification') && !e.target.closest('.notification-sidebar') && !e.target.closest('.user-profile') && !e.target.closest('.user-profile-sidebar')) {
      setNotificationOpen(false);
      setUserMenuOpen(false);
    }
  };

  return (
    <div className="admin-layout" onClick={handleClickOutside}>
      {/* 4-role switcher - 保持与主App一致的导航 */}
      <div className="admin-role-switcher">
        <div className="role-tabs">
          <button
            className="role-tab"
            onClick={() => onRoleSwitch && onRoleSwitch('c1')}
          >
            <span className="tab-icon">👤</span>
            Recommender 推荐人
          </button>
          <button
            className="role-tab"
            onClick={() => onRoleSwitch && onRoleSwitch('c2')}
          >
            <span className="tab-icon">🎯</span>
            Candidate 候选人
          </button>
          <button
            className="role-tab"
            onClick={() => onRoleSwitch && onRoleSwitch('b')}
          >
            <span className="tab-icon">🏢</span>
            B端 企业
          </button>
          <button
            className="role-tab active admin-tab"
          >
            <span className="tab-icon">🔐</span>
            管理后台
          </button>
        </div>
      </div>

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

        <div className="sidebar-footer">
          {/* 通知模块 */}
          <div className="notification-sidebar" onClick={handleNotificationClick}>
            <span className="notification-icon">🔔</span>
            {!collapsed && (
              <div className="notification-info">
                <span className="notification-text">通知</span>
                <span className="notification-badge">{notifications.filter(n => n.unread).length}</span>
              </div>
            )}

            {/* 通知下拉菜单 */}
            {notificationOpen && !collapsed && (
              <div className="notification-dropdown-sidebar">
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

          {/* 用户角色模块 */}
          <div className="user-profile-sidebar" onClick={handleUserProfileClick}>
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
            {!collapsed && (
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.roleName || currentUser.role}</span>
              </div>
            )}

            {/* 用户菜单下拉 */}
            {userMenuOpen && !collapsed && (
              <div className="user-dropdown-sidebar">
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
      </div>

      <div className="main-content">
        <div className="content">
          {children}
        </div>
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: var(--admin-bg-primary);
        }

        .admin-role-switcher {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px 20px;
          background: var(--admin-bg-card);
          border-bottom: 1px solid var(--admin-border-default);
        }

        .admin-role-switcher .role-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--admin-radius-md);
          padding: 4px;
          gap: 4px;
          border: 1px solid var(--admin-border-default);
        }

        .admin-role-switcher .role-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          border: none;
          border-radius: var(--admin-radius-sm);
          color: var(--admin-text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: var(--admin-font-sans);
        }

        .admin-role-switcher .role-tab:hover {
          color: var(--admin-text-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .admin-role-switcher .role-tab.active {
          background: var(--admin-btn-primary-gradient);
          color: white;
          box-shadow: var(--admin-shadow-glow);
        }

        .admin-role-switcher .role-tab.admin-tab {
          background: rgba(59, 130, 246, 0.25);
          color: var(--admin-text-light);
        }

        .admin-role-switcher .role-tab.admin-tab.active {
          background: var(--admin-btn-primary-gradient);
          color: white;
        }

        .admin-role-switcher .tab-icon {
          font-size: 1.1rem;
        }

        .admin-layout .main-content {
          margin-left: ${collapsed ? '64px' : '240px'};
          transition: all 0.3s ease;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .sidebar {
          width: ${collapsed ? '64px' : '240px'};
          background: var(--admin-bg-card);
          color: var(--admin-text-primary);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 1000;
          border-right: 1px solid var(--admin-border-default);
        }

        .logo {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          border-bottom: 1px solid var(--admin-border-default);
          padding: 0 16px;
          font-family: var(--admin-font-sans);
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          white-space: nowrap;
          background: var(--admin-bonus-gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          border-radius: var(--admin-radius-md);
          transition: all 0.3s ease;
          white-space: nowrap;
          font-family: var(--admin-font-sans);
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .menu-item.active {
          background: rgba(59, 130, 246, 0.2);
          color: var(--admin-btn-primary);
        }

        .menu-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
        }

        .menu-label {
          font-size: 14px;
        }

        .sidebar-footer {
          padding: 16px 8px;
          border-top: 1px solid var(--admin-border-default);
          margin-top: auto;
        }

        .notification-sidebar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 8px;
          border-radius: var(--admin-radius-md);
          transition: all 0.3s ease;
          cursor: pointer;
          margin-bottom: 8px;
          position: relative;
        }

        .notification-sidebar:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .notification-sidebar .notification-info {
          display: flex;
          flex-direction: column;
        }

        .notification-sidebar .notification-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-text-primary);
        }

        .notification-sidebar .notification-badge {
          display: inline-block;
          background: var(--admin-error);
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          margin-top: 4px;
        }

        .notification-dropdown-sidebar {
          position: absolute;
          bottom: 100%;
          left: 8px;
          right: 8px;
          background: var(--admin-bg-card);
          border: 1px solid var(--admin-border-accent);
          border-radius: var(--admin-radius-lg);
          box-shadow: var(--admin-shadow-glow);
          overflow: hidden;
          z-index: 1001;
          margin-bottom: 8px;
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-dropdown-sidebar .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--admin-border-default);
        }

        .notification-dropdown-sidebar .dropdown-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--admin-text-primary);
        }

        .notification-dropdown-sidebar .dropdown-link {
          font-size: 14px;
          color: var(--admin-btn-primary);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .notification-dropdown-sidebar .dropdown-link:hover {
          color: var(--admin-btn-primary-hover);
        }

        .notification-dropdown-sidebar .notification-list {
          padding: 8px 0;
        }

        .notification-dropdown-sidebar .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px 20px;
          border-bottom: 1px solid var(--admin-border-default);
          transition: all 0.3s ease;
        }

        .notification-dropdown-sidebar .notification-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .notification-dropdown-sidebar .notification-content {
          flex: 1;
        }

        .notification-dropdown-sidebar .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-text-primary);
          margin-bottom: 4px;
        }

        .notification-dropdown-sidebar .notification-text {
          font-size: 12px;
          color: var(--admin-text-secondary);
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .notification-dropdown-sidebar .notification-time {
          font-size: 11px;
          color: var(--admin-text-tertiary);
        }

        .notification-dropdown-sidebar .unread-dot {
          width: 6px;
          height: 6px;
          background: var(--admin-accent-secondary);
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .user-profile-sidebar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 8px;
          border-radius: var(--admin-radius-md);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .user-profile-sidebar:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .user-profile-sidebar .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-profile-sidebar .user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-text-primary);
        }

        .user-profile-sidebar .user-role {
          font-size: 12px;
          color: var(--admin-text-secondary);
        }

        .user-dropdown-sidebar {
          position: absolute;
          bottom: 100%;
          left: 8px;
          right: 8px;
          background: var(--admin-bg-card);
          border: 1px solid var(--admin-border-accent);
          border-radius: var(--admin-radius-lg);
          box-shadow: var(--admin-shadow-glow);
          overflow: hidden;
          z-index: 1001;
          margin-bottom: 8px;
        }

        .user-dropdown-sidebar .user-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          color: var(--admin-text-primary);
        }

        .user-dropdown-sidebar .user-menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .main-content {
          flex: 1;
          margin-left: ${collapsed ? '64px' : '240px'};
          transition: all 0.3s ease;
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
          background: var(--admin-bg-primary);
          position: relative;
          z-index: 1;
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
