import { useState } from 'react';

export default function Layout({ children, activeTab, onTabChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'onboarding', label: '入驻流程', icon: '▦' },
    { id: 'hall', label: '职位大厅', icon: '📋' },
    { id: 'referrals', label: '我的推荐', icon: '👥' },
    { id: 'circles', label: '我的圈子', icon: '🌐' },
    { id: 'trust', label: '信任分', icon: '⭐' },
    { id: 'earnings', label: '收益中心', icon: '💰' },
  ];

  return (
    <div className="layout">
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src="/logo.png" alt="人人猎" className="logo-img" />
          <span className="logo-text">人人猎</span>
        </div>
        
        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="user-card">
          <img src="https://i.pravatar.cc/80?u=lixiaoniu" alt="李小牛" className="avatar" />
          <div className="user-info">
            <div className="user-name">李小牛</div>
            <div className="user-badges">
              <span className="trust-score">信任分 92</span>
              <span className="level-badge">🏆 S级</span>
            </div>
          </div>
        </div>
      </aside>

      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <main className={`main-content ${activeTab === 'home' || activeTab === 'hall' ? 'recommender-home-content' : ''}`}>
        {children}
      </main>

      <style>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-right: 1px solid var(--glass-border);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 12px;
          margin-bottom: 40px;
        }

        .logo-img {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          object-fit: cover;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--cyber-gradient);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          color: #0a0a0f;
          box-shadow: 0 4px 12px var(--cyber-glow);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.95rem;
          text-align: left;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: var(--accent-glow);
          color: var(--accent-primary);
          border: 1px solid var(--border-accent);
        }

        .nav-icon {
          font-size: 1.1rem;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
          transition: all 0.2s ease;
        }

        .user-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--border-default);
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #0a0a0f;
          box-shadow: 0 4px 12px var(--cyber-glow);
          object-fit: cover;
          background: var(--cyber-gradient);
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .user-badge {
          font-size: 0.75rem;
          color: var(--accent-primary);
          background: var(--accent-glow);
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-top: 4px;
        }

        .user-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .trust-score {
          font-size: 0.75rem;
          color: #007AFF;
          background: rgba(0, 122, 255, 0.15);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        .level-badge {
          font-size: 0.75rem;
          color: #FFD700;
          background: rgba(255, 215, 0, 0.15);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 32px 40px;
          min-height: 100vh;
        }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 200;
          width: 44px;
          height: 44px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-default);
        }

        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .main-content {
            margin-left: 0;
            padding: 80px 20px 20px;
          }
        }

        @media (max-width: 768px) {
          .layout {
            display: block;
            background: #f7f8fa;
          }

          .sidebar,
          .mobile-menu-btn {
            display: none;
          }

          .main-content {
            min-height: 100vh;
            padding: calc(12px + env(safe-area-inset-top, 0px)) 14px calc(96px + env(safe-area-inset-bottom, 0px));
          }

          .main-content.recommender-home-content {
            padding: 0;
            background: #f3f6f7;
          }

        }
      `}</style>
    </div>
  );
}
