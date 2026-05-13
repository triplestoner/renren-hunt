import { useState } from 'react';

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState('settlement');
  const [dateRange, setDateRange] = useState('this_month');

  const financeData = {
    settlement: [
      {
        id: 'SET1',
        user: '张小明',
        role: '推荐人',
        amount: 5000,
        orderId: 'O20260513001',
        createTime: '2026-05-13 09:15:23',
        status: 'pending'
      },
      {
        id: 'SET2',
        user: '李小红',
        role: '候选人',
        amount: 2000,
        orderId: 'O20260512002',
        createTime: '2026-05-12 10:30:45',
        status: 'processing'
      },
      {
        id: 'SET3',
        user: '王经理',
        role: '推荐人',
        amount: 8000,
        orderId: 'O20260511003',
        createTime: '2026-05-11 14:20:10',
        status: 'completed'
      }
    ],
    transactions: [
      {
        id: 'TRX1',
        type: 'income',
        user: '王经理',
        role: '企业',
        amount: 15000,
        orderId: 'O20260513001',
        status: 'completed',
        time: '2026-05-13 09:15:23'
      },
      {
        id: 'TRX2',
        type: 'expense',
        user: '张小明',
        role: '推荐人',
        amount: 5000,
        orderId: 'O20260512002',
        status: 'pending',
        time: '2026-05-12 10:30:45'
      },
      {
        id: 'TRX3',
        type: 'income',
        user: '李总',
        role: '企业',
        amount: 20000,
        orderId: 'O20260511003',
        status: 'completed',
        time: '2026-05-11 14:20:10'
      },
      {
        id: 'TRX4',
        type: 'expense',
        user: '李小红',
        role: '候选人',
        amount: 2000,
        orderId: 'O20260510004',
        status: 'pending',
        time: '2026-05-10 16:45:30'
      }
    ]
  };

  const tabNames = {
    settlement: '结算管理',
    transactions: '资金流水',
    statistics: '财务统计'
  };

  const statusLabels = {
    pending: '待结算',
    processing: '处理中',
    completed: '已完成',
    failed: '失败'
  };

  const typeLabels = {
    income: '收入',
    expense: '支出'
  };

  return (
    <div className="finance-management">
      <div className="page-header">
        <h1>资金管理</h1>
        <p>管理平台的资金流动和结算业务</p>
      </div>

      <div className="finance-tabs">
        {(['settlement', 'transactions', 'statistics']).map((tab) => (
          <button
            key={tab}
            className={`finance-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="date-filter">
        <select
          className="date-select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="today">今天</option>
          <option value="this_week">本周</option>
          <option value="this_month" selected>本月</option>
          <option value="last_month">上月</option>
          <option value="this_year">今年</option>
          <option value="all">全部</option>
        </select>
        <button className="search-btn">🔍 查询</button>
        <button className="export-btn">📥 导出</button>
      </div>

      <div className="finance-card">
        {activeTab === 'settlement' && (
          <div className="settlement-table">
            <h3>待结算订单</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户</th>
                  <th>角色</th>
                  <th>金额</th>
                  <th>订单号</th>
                  <th>创建时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {financeData.settlement.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="user-cell">
                      <span className="user-avatar">{item.user.charAt(0)}</span>
                      <span>{item.user}</span>
                    </td>
                    <td>{item.role}</td>
                    <td className="amount-cell">¥{item.amount.toLocaleString()}</td>
                    <td>{item.orderId}</td>
                    <td>{item.createTime}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">查看</button>
                      <button className="action-btn confirm">确认</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-table">
            <h3>资金流水</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>类型</th>
                  <th>用户</th>
                  <th>角色</th>
                  <th>金额</th>
                  <th>订单号</th>
                  <th>状态</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                {financeData.transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <span className={`type-badge ${item.type}`}>
                        {typeLabels[item.type]}
                      </span>
                    </td>
                    <td className="user-cell">
                      <span className="user-avatar">{item.user.charAt(0)}</span>
                      <span>{item.user}</span>
                    </td>
                    <td>{item.role}</td>
                    <td className={`amount-cell ${item.type}`}>
                      {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString()}
                    </td>
                    <td>{item.orderId}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="statistics-view">
            <h3>财务统计</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <div className="stat-value">¥245,600</div>
                  <div className="stat-label">本月收入</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📤</div>
                <div className="stat-info">
                  <div className="stat-value">¥189,200</div>
                  <div className="stat-label">本月支出</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">¥56,400</div>
                  <div className="stat-label">平台利润</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <div className="stat-value">12.5%</div>
                  <div className="stat-label">利润增长</div>
                </div>
              </div>
            </div>
            <div className="chart-placeholder">
              <span className="chart-icon">📈</span>
              <p>财务图表组件开发中...</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .finance-management {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
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

        .finance-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .finance-tab {
          padding: 12px 24px;
          background: white;
          border: 1px solid #e8e8e8;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .finance-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .finance-tab.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .date-filter {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 24px;
        }

        .date-select {
          padding: 10px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-btn {
          padding: 10px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: #5568d3;
        }

        .export-btn {
          padding: 10px 20px;
          background: #4ade80;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .export-btn:hover {
          background: #3dbf73;
        }

        .finance-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .finance-card h3 {
          font-size: 20px;
          color: #333;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 2px solid #e8e8e8;
        }

        .data-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #666;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
        }

        .amount-cell {
          font-weight: 600;
          color: #333;
        }

        .amount-cell.income {
          color: #4ade80;
        }

        .amount-cell.expense {
          color: #f87171;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.pending {
          background: rgba(96, 165, 250, 0.1);
          color: #60a5fa;
        }

        .status-badge.processing {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .status-badge.completed {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .status-badge.failed {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .type-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .type-badge.income {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .type-badge.expense {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .action-btn {
          padding: 6px 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 8px;
        }

        .action-btn.confirm {
          background: #4ade80;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
        }

        .chart-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .chart-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .chart-placeholder p {
          color: #666;
          font-size: 14px;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .date-filter {
            flex-direction: column;
            align-items: stretch;
          }

          .search-btn,
          .export-btn {
            width: 100%;
            text-align: center;
          }

          .data-table {
            display: block;
            overflow-x: auto;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .finance-tabs {
            flex-direction: column;
          }

          .finance-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }
        }
      `}</style>
    </div>
  );
};

export default FinanceManagement;
