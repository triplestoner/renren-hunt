import { useState } from 'react';

export default function Layout({ children, activeTab, onTabChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
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
          <div className="logo-icon">RH</div>
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
          <div className="avatar">李</div>
          <div className="user-info">
            <div className="user-name">李明</div>
            <div className="user-badge">超级Recommender</div>
          </div>
        </div>
      </aside>

      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <main className="main-content">
        {children}
      </main>

      <style>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-subtle);
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

        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--accent-gradient);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          color: #0a0a0f;
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
        }

        .nav-item:hover {
          background: var(--bg-tertiary);
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
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: var(--accent-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #0a0a0f;
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
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 1.25rem;
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
      `}</style>
    </div>
  );
}
