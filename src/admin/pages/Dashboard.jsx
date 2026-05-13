import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 12345,
    totalJobs: 4567,
    totalRecommendations: 8901,
    totalTransactions: 2345678
  });

  // 模拟统计数据
  const statCards = [
    {
      key: 'totalUsers',
      title: '平台总用户数',
      value: '12,345',
      icon: '👥',
      color: '#667eea',
      gradient: 'linear-gradient(to bottom, #667eea, #764ba2)',
      trend: '+12.5%',
      trendUp: true
    },
    {
      key: 'totalJobs',
      title: '职位发布数',
      value: '4,567',
      icon: '💼',
      color: '#4ade80',
      gradient: 'linear-gradient(to bottom, #4ade80, #22c55e)',
      trend: '+8.2%',
      trendUp: true
    },
    {
      key: 'totalRecommendations',
      title: '推荐成功数',
      value: '8,901',
      icon: '🤝',
      color: '#f59e0b',
      gradient: 'linear-gradient(to bottom, #f59e0b, #d97706)',
      trend: '+15.3%',
      trendUp: true
    },
    {
      key: 'totalTransactions',
      title: '交易总额',
      value: '¥2,345,678',
      icon: '💰',
      color: '#60a5fa',
      gradient: 'linear-gradient(to bottom, #60a5fa, #3b82f6)',
      trend: '+5.8%',
      trendUp: true
    }
  ];

  const recentActivities = [
    { id: 1, user: '李小明', action: '注册了新账号', role: '推荐人', time: '2分钟前' },
    { id: 2, user: '王小红', action: '发布了新职位', role: '企业HR', time: '5分钟前' },
    { id: 3, user: '张同学', action: '成功入职', role: '候选人', time: '15分钟前' },
    { id: 4, user: '赵经理', action: '完成了认证审核', role: '推荐人', time: '30分钟前' },
    { id: 5, user: '陈总监', action: '接受了推荐', role: '企业HR', time: '1小时前' }
  ];

  const pendingItems = [
    { id: 1, type: '用户认证', name: '刘小强', role: '推荐人', time: '待处理', priority: 'high' },
    { id: 2, type: '职位审核', name: '高级前端架构师', company: '字节跳动', time: '待处理', priority: 'medium' },
    { id: 3, type: '佣金结算', name: '王经理', amount: '¥25,000', time: '待处理', priority: 'medium' },
    { id: 4, type: '用户认证', name: '陈总监', role: '企业HR', time: '待处理', priority: 'low' }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>仪表盘</h1>
        <p>欢迎回来！查看平台最新运营数据</p>
      </div>

      <div className="stats-grid">
        {statCards.map(card => (
          <div key={card.key} className="stat-card" style={{ '--card-gradient': card.gradient }}>
            <div className="stat-card-header">
              <div className="stat-icon" style={{ background: `${card.color}20` }}>
                {card.icon}
              </div>
              <div className={`trend ${card.trendUp ? 'up' : 'down'}`}>
                <span>{card.trendUp ? '↑' : '↓'}</span>
                {card.trend}
              </div>
            </div>
            <div className="stat-card-body">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-row">
          <div className="dashboard-col">
            <div className="card">
              <div className="card-header">
                <h3>最近活动</h3>
                <a href="#" className="view-all">查看全部</a>
              </div>
              <div className="card-body">
                <div className="activity-list">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-avatar">
                        {activity.user[0]}
                      </div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <span className="activity-user">{activity.user}</span>
                          <span className="activity-role">{activity.role}</span>
                        </div>
                        <p className="activity-action">{activity.action}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-col">
            <div className="card">
              <div className="card-header">
                <h3>待处理事项</h3>
                <span className="badge warning">{pendingItems.length} 项</span>
              </div>
              <div className="card-body">
                <div className="pending-list">
                  {pendingItems.map(item => (
                    <div key={item.id} className="pending-item">
                      <div className={`priority-indicator ${item.priority}`}></div>
                      <div className="pending-content">
                        <div className="pending-type">{item.type}</div>
                        <div className="pending-info">
                          <span className="pending-name">{item.name}</span>
                          {item.role && <span className="pending-role">{item.role}</span>}
                          {item.company && <span className="pending-company">{item.company}</span>}
                          {item.amount && <span className="pending-amount">{item.amount}</span>}
                        </div>
                        <span className="pending-status">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-col">
            <div className="card">
              <div className="card-header">
                <h3>用户增长趋势</h3>
                <div className="card-actions">
                  <select className="time-range">
                    <option>最近7天</option>
                    <option>最近30天</option>
                    <option>最近90天</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <div className="chart-placeholder">
                    <span className="chart-icon">📈</span>
                    <p>图表组件开发中...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-col">
            <div className="card">
              <div className="card-header">
                <h3>交易统计</h3>
                <div className="card-actions">
                  <select className="time-range">
                    <option>本月</option>
                    <option>本季度</option>
                    <option>本年度</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <div className="chart-placeholder">
                    <span className="chart-icon">📊</span>
                    <p>图表组件开发中...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard {
          animation: fadeIn 0.3s ease;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 28px;
          color: #333;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .page-header p {
          color: #666;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--card-gradient);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .trend {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        .trend.up {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
        }

        .trend.down {
          color: #f87171;
          background: rgba(248, 113, 113, 0.1);
        }

        .stat-card-body h3 {
          font-size: 28px;
          color: #333;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .stat-card-body p {
          color: #666;
          font-size: 14px;
        }

        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dashboard-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .dashboard-col {
          flex: 1;
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f0f0f0;
        }

        .card-header h3 {
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }

        .view-all {
          color: #667eea;
          font-size: 14px;
          text-decoration: none;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge.warning {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .time-range {
          padding: 6px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background: white;
        }

        .card-body {
          padding: 24px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-item {
          display: flex;
          gap: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
        }

        .activity-item:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .activity-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-header {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 4px;
        }

        .activity-user {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .activity-role {
          font-size: 12px;
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .activity-action {
          color: #666;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .activity-time {
          color: #999;
          font-size: 12px;
        }

        .pending-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pending-item {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .priority-indicator {
          width: 4px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .priority-indicator.high {
          background: #ff4d4f;
        }

        .priority-indicator.medium {
          background: #f59e0b;
        }

        .priority-indicator.low {
          background: #4ade80;
        }

        .pending-content {
          flex: 1;
        }

        .pending-type {
          font-weight: 600;
          color: #333;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .pending-info {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .pending-name {
          color: #666;
          font-size: 14px;
        }

        .pending-role,
        .pending-company,
        .pending-amount {
          font-size: 12px;
          color: #999;
        }

        .pending-status {
          font-size: 12px;
          color: #f59e0b;
          font-weight: 500;
        }

        .chart-container {
          width: 100%;
          min-height: 300px;
        }

        .chart-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: #f9f9f9;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .chart-placeholder:hover {
          background: #f0f0f0;
        }

        .chart-icon {
          font-size: 48px;
          margin-bottom: 16px;
          animation: bounce 2s infinite;
        }

        .chart-placeholder p {
          color: #666;
          font-size: 14px;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card {
          animation: slideInUp 0.5s ease-out;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-row {
            grid-template-columns: 1fr;
          }

          .stat-card-body h3 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
