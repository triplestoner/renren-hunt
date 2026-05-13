import { useState } from 'react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('recommender');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    region: '',
    level: ''
  });

  const users = {
    recommender: [
      {
        id: '1',
        name: '李小明',
        avatar: 'https://i.pravatar.cc/40?u=lixiaoming',
        role: '资深推荐人',
        level: 'S级',
        score: 92,
        status: 'active',
        joinDate: '2026-01-15',
        region: '北京'
      },
      {
        id: '2',
        name: '王小红',
        avatar: 'https://i.pravatar.cc/40?u=wangxiaohong',
        role: '金牌推荐人',
        level: 'A级',
        score: 85,
        status: 'active',
        joinDate: '2026-02-20',
        region: '上海'
      },
      {
        id: '3',
        name: '张同学',
        avatar: 'https://i.pravatar.cc/40?u=zhangtongxue',
        role: '推荐人',
        level: 'B级',
        score: 72,
        status: 'pending',
        joinDate: '2026-03-01',
        region: '深圳'
      },
      {
        id: '4',
        name: '赵经理',
        avatar: 'https://i.pravatar.cc/40?u=zhaojingli',
        role: '实习推荐人',
        level: 'C级',
        score: 65,
        status: 'inactive',
        joinDate: '2026-03-15',
        region: '杭州'
      }
    ],
    candidate: [
      {
        id: '101',
        name: '陈总监',
        avatar: 'https://i.pravatar.cc/40?u=chenzongjian',
        role: '高级前端架构师',
        level: '资深',
        education: '清华大学',
        experience: '10年',
        status: 'active',
        joinDate: '2026-01-05',
        region: '北京'
      },
      {
        id: '102',
        name: '刘小强',
        avatar: 'https://i.pravatar.cc/40?u=liuxiaoqiang',
        role: 'AI算法工程师',
        level: '中级',
        education: '上海交通大学',
        experience: '6年',
        status: 'active',
        joinDate: '2026-02-10',
        region: '上海'
      },
      {
        id: '103',
        name: '黄女士',
        avatar: 'https://i.pravatar.cc/40?u=huangnvshi',
        role: '产品经理',
        level: '高级',
        education: '复旦大学',
        experience: '8年',
        status: 'inactive',
        joinDate: '2026-02-25',
        region: '深圳'
      },
      {
        id: '104',
        name: '周同学',
        avatar: 'https://i.pravatar.cc/40?u=zhoutongxue',
        role: 'Java开发工程师',
        level: '初级',
        education: '华中科技大学',
        experience: '3年',
        status: 'pending',
        joinDate: '2026-03-08',
        region: '武汉'
      }
    ],
    employer: [
      {
        id: '201',
        name: '字节跳动',
        logo: 'https://i.pravatar.cc/40?u=bytedance',
        industry: '互联网',
        size: '20000人',
        status: 'active',
        joinDate: '2026-01-01',
        region: '北京'
      },
      {
        id: '202',
        name: '阿里巴巴',
        logo: 'https://i.pravatar.cc/40?u=alibaba',
        industry: '电商',
        size: '15000人',
        status: 'active',
        joinDate: '2026-01-10',
        region: '杭州'
      },
      {
        id: '203',
        name: '腾讯',
        logo: 'https://i.pravatar.cc/40?u=tencent',
        industry: '互联网',
        size: '18000人',
        status: 'active',
        joinDate: '2026-01-15',
        region: '深圳'
      },
      {
        id: '204',
        name: '百度',
        logo: 'https://i.pravatar.cc/40?u=baidu',
        industry: '搜索',
        size: '12000人',
        status: 'pending',
        joinDate: '2026-02-28',
        region: '北京'
      }
    ]
  };

  const tabNames = {
    recommender: '推荐人',
    candidate: '候选人',
    employer: '企业'
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBatchAction = (action) => {
    if (selectedUsers.length === 0) {
      alert('请选择要操作的用户');
      return;
    }

    console.log(`批量${action}用户:`, selectedUsers);
    // 添加实际的批量操作逻辑
  };

  const filteredUsers = users[activeTab].filter(user => {
    const matchesSearch = user.name.includes(searchTerm) ||
                          user.role.includes(searchTerm) ||
                          (user.company && user.company.includes(searchTerm));
    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesRegion = !filters.region || user.region === filters.region;
    const matchesLevel = !filters.level || (user.level && user.level === filters.level);

    return matchesSearch && matchesStatus && matchesRegion && matchesLevel;
  });

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>用户管理</h1>
        <p>查看和管理平台各类用户</p>
      </div>

      <div className="user-tabs">
        {(['recommender', 'candidate', 'employer']).map((tab) => (
          <button
            key={tab}
            className={`user-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder={`搜索${tabNames[activeTab]}...`}
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="filter-controls">
          <select
            className="filter-select"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">全部状态</option>
            <option value="active">已激活</option>
            <option value="pending">待审核</option>
            <option value="inactive">已冻结</option>
          </select>

          <select
            className="filter-select"
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
          >
            <option value="">全部地区</option>
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="深圳">深圳</option>
            <option value="杭州">杭州</option>
          </select>

          {activeTab === 'recommender' && (
            <select
              className="filter-select"
              value={filters.level}
              onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
            >
              <option value="">全部级别</option>
              <option value="S级">S级</option>
              <option value="A级">A级</option>
              <option value="B级">B级</option>
              <option value="C级">C级</option>
            </select>
          )}

          <button className="export-btn">📥 导出</button>
        </div>
      </div>

      {/* 添加批量操作工具栏 */}
      <div className="batch-actions">
        <button
          className="batch-btn"
          onClick={() => handleBatchAction('冻结')}
          disabled={selectedUsers.length === 0}
        >
          ❄️ 批量冻结
        </button>
        <button
          className="batch-btn"
          onClick={() => handleBatchAction('解冻')}
          disabled={selectedUsers.length === 0}
        >
          🔄 批量解冻
        </button>
        <button
          className="batch-btn"
          onClick={() => handleBatchAction('导出')}
          disabled={selectedUsers.length === 0}
        >
          📥 批量导出
        </button>
      </div>

      <div className="user-list">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(filteredUsers.map(user => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th>用户信息</th>
              {activeTab === 'recommender' && <th>级别</th>}
              {activeTab === 'recommender' && <th>TrustScore</th>}
              {activeTab === 'candidate' && <th>经验</th>}
              {activeTab === 'candidate' && <th>教育</th>}
              {activeTab === 'employer' && <th>行业</th>}
              {activeTab === 'employer' && <th>规模</th>}
              <th>状态</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="user-info">
                  {activeTab === 'employer' ? (
                    <img src={user.logo} alt={user.name} className="company-logo" />
                  ) : (
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                  )}
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-role">{user.role}</div>
                  </div>
                </td>
                {activeTab === 'recommender' && <td className="user-level">{user.level}</td>}
                {activeTab === 'recommender' && <td className="user-score">{user.score}</td>}
                {activeTab === 'candidate' && <td className="user-experience">{user.experience}</td>}
                {activeTab === 'candidate' && <td className="user-education">{user.education}</td>}
                {activeTab === 'employer' && <td className="user-industry">{user.industry}</td>}
                {activeTab === 'employer' && <td className="user-size">{user.size}</td>}
                <td className="user-status">
                  <span className={`status-badge ${user.status}`}>{
                    user.status === 'active' ? '已激活' :
                    user.status === 'pending' ? '待审核' : '已冻结'
                  }</span>
                </td>
                <td className="user-date">{user.joinDate}</td>
                <td className="user-actions">
                  <button className="action-btn view">查看</button>
                  <button className="action-btn edit">编辑</button>
                  <button
                    className={`action-btn ${user.status === 'active' ? 'ban' : 'unban'}`}
                  >
                    {user.status === 'active' ? '冻结' : '解冻'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="page-btn prev">上一页</button>
        <div className="page-info">第 1 / 10 页</div>
        <button className="page-btn next">下一页</button>
        <select className="page-size">
          <option>10条/页</option>
          <option>20条/页</option>
          <option>50条/页</option>
        </select>
      </div>

      <style>{`
        .user-management {
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

        .user-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .user-tab {
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

        .user-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .user-tab.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .filter-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-bar {
          display: flex;
          flex: 1;
          min-width: 300px;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .search-input {
          flex: 1;
          padding: 10px 16px;
          border: none;
          font-size: 14px;
          outline: none;
        }

        .search-btn {
          padding: 10px 16px;
          background: #f0f0f0;
          border: none;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: #e0e0e0;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .filter-select {
          padding: 10px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          background: white;
        }

        .export-btn {
          padding: 10px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .export-btn:hover {
          background: #5a6fdb;
        }

        .batch-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .batch-btn {
          padding: 10px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .batch-btn:hover:not(:disabled) {
          background: #5a6fdb;
        }

        .batch-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .user-list {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
        }

        .user-table thead {
          background: #fafafa;
        }

        .user-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 2px solid #e8e8e8;
        }

        .user-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #666;
        }

        .user-table tbody tr:hover {
          background: #f5f5f5;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar, .company-logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .company-logo {
          background: #f0f0f0;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .user-role {
          font-size: 12px;
          color: #999;
        }

        .user-level {
          color: #f59e0b;
          font-weight: 600;
        }

        .user-score {
          color: #4ade80;
          font-weight: 600;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.active {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .status-badge.pending {
          background: rgba(96, 165, 250, 0.1);
          color: #60a5fa;
        }

        .status-badge.inactive {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .user-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.view:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .action-btn.edit:hover {
          background: #4ade80;
          color: white;
          border-color: #4ade80;
        }

        .action-btn.ban:hover {
          background: #f87171;
          color: white;
          border-color: #f87171;
        }

        .action-btn.unban:hover {
          background: #4ade80;
          color: white;
          border-color: #4ade80;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .page-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-btn:hover:not(:disabled) {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .page-info {
          font-size: 14px;
          color: #666;
        }

        .page-size {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background: white;
        }

        @media (max-width: 768px) {
          .filter-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-bar {
            min-width: 100%;
          }

          .filter-controls {
            width: 100%;
            justify-content: space-between;
          }

          .user-table {
            font-size: 12px;
          }

          .user-table th,
          .user-table td {
            padding: 10px;
          }

          .user-actions {
            flex-direction: column;
            gap: 4px;
          }

          .action-btn {
            padding: 4px 8px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .user-tabs {
            flex-direction: column;
          }

          .user-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }

          .user-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement;