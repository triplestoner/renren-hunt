import { useState } from 'react';

const SystemManagement = () => {
  const [activeTab, setActiveTab] = useState('user');

  const systemData = {
    user: [
      { id: 1, username: 'admin', realname: '系统管理员', email: 'admin@renrenlie.com', role: '超级管理员', status: 'active', createTime: '2026-01-01 00:00:00', lastLogin: '2026-05-13 10:30:00' },
      { id: 2, username: 'operator', realname: '运营专员', email: 'operator@renrenlie.com', role: '平台运营', status: 'active', createTime: '2026-01-05 10:00:00', lastLogin: '2026-05-12 16:20:00' },
      { id: 3, username: 'financial', realname: '财务总监', email: 'financial@renrenlie.com', role: '财务专员', status: 'active', createTime: '2026-01-10 09:00:00', lastLogin: '2026-05-13 08:15:00' },
      { id: 4, username: 'analyst', realname: '数据分析师', email: 'analyst@renrenlie.com', role: '数据分析师', status: 'active', createTime: '2026-01-15 14:00:00', lastLogin: '2026-05-12 18:45:00' }
    ],
    role: [
      { id: 1, name: '超级管理员', permissions: ['user:*', 'content:*', 'system:*', 'audit:*', 'data:*'], description: '平台最高权限', createTime: '2026-01-01 00:00:00' },
      { id: 2, name: '平台运营', permissions: ['user:view', 'content:manage', 'audit:manage'], description: '负责平台运营工作', createTime: '2026-01-01 00:00:00' },
      { id: 3, name: '财务专员', permissions: ['finance:manage', 'audit:view'], description: '负责财务结算工作', createTime: '2026-01-01 00:00:00' },
      { id: 4, name: '数据分析师', permissions: ['data:view', 'report:export'], description: '负责数据分析工作', createTime: '2026-01-01 00:00:00' }
    ],
    log: [
      { id: 1, operation: '登录', user: 'admin', ip: '192.168.1.100', time: '2026-05-13 10:30:00', status: 'success' },
      { id: 2, operation: '查看用户列表', user: 'admin', ip: '192.168.1.100', time: '2026-05-13 10:32:00', status: 'success' },
      { id: 3, operation: '发布职位', user: 'operator', ip: '192.168.1.101', time: '2026-05-13 09:45:00', status: 'success' },
      { id: 4, operation: '审核职位', user: 'admin', ip: '192.168.1.100', time: '2026-05-13 11:20:00', status: 'failed' }
    ]
  };

  const tabNames = {
    user: '系统用户',
    role: '角色管理',
    log: '操作日志',
    config: '系统配置'
  };

  const statusLabels = {
    active: '已激活',
    inactive: '已禁用'
  };

  return (
    <div className="system-management">
      <div className="page-header">
        <h1>系统管理</h1>
        <p>管理平台的系统设置和权限控制</p>
      </div>

      <div className="system-tabs">
        {(['user', 'role', 'log', 'config']).map((tab) => (
          <button
            key={tab}
            className={`system-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="actions-bar">
        {activeTab !== 'log' && (
          <button className="add-btn">+ 新增</button>
        )}
        <button className="filter-btn">🔍 筛选</button>
        <button className="search-btn">🔎 搜索</button>
        {activeTab === 'log' && (
          <button className="export-btn">📥 导出</button>
        )}
      </div>

      <div className="system-card">
        {activeTab === 'user' && (
          <div className="user-list">
            <h3>系统用户列表</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>真实姓名</th>
                  <th>邮箱</th>
                  <th>角色</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>最后登录</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {systemData.user.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.realname}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>{item.createTime}</td>
                    <td>{item.lastLogin}</td>
                    <td>
                      <button className="action-btn">编辑</button>
                      <button className="action-btn">重置密码</button>
                      <button className="action-btn danger">禁用</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'role' && (
          <div className="role-list">
            <h3>角色管理</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>角色名称</th>
                  <th>权限数量</th>
                  <th>描述</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {systemData.role.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.permissions.length}</td>
                    <td>{item.description}</td>
                    <td>{item.createTime}</td>
                    <td>
                      <button className="action-btn">编辑</button>
                      <button className="action-btn">复制</button>
                      <button className="action-btn">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'log' && (
          <div className="log-list">
            <h3>操作日志</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>操作类型</th>
                  <th>操作人</th>
                  <th>IP地址</th>
                  <th>操作时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {systemData.log.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.operation}</td>
                    <td>{item.user}</td>
                    <td>{item.ip}</td>
                    <td>{item.time}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'success' ? '成功' : '失败'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="config-list">
            <h3>系统配置</h3>
            <div className="config-section">
              <div className="config-item">
                <div className="item-label">网站名称</div>
                <div className="item-value">人人猎</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">网站域名</div>
                <div className="item-value">www.renrenlie.com</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">联系邮箱</div>
                <div className="item-value">contact@renrenlie.com</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">客服电话</div>
                <div className="item-value">400-123-4567</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">用户注册</div>
                <div className="item-value">开启</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">评论功能</div>
                <div className="item-value">开启</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">图片上传大小</div>
                <div className="item-value">5MB</div>
                <button className="edit-btn">编辑</button>
              </div>
              <div className="config-item">
                <div className="item-label">页面缓存时间</div>
                <div className="item-value">30分钟</div>
                <button className="edit-btn">编辑</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .system-management {
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

        .system-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .system-tab {
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

        .system-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .system-tab.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .actions-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .add-btn {
          padding: 10px 20px;
          background: #4ade80;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          background: #3dbf73;
        }

        .filter-btn,
        .search-btn {
          padding: 10px 20px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .search-btn:hover {
          border-color: #667eea;
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

        .system-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .system-card h3 {
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

        .status-badge.inactive {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .status-badge.success {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .status-badge.failed {
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

        .action-btn:hover {
          background: #5568d3;
        }

        .action-btn.danger {
          background: #f87171;
        }

        .action-btn.danger:hover {
          background: #e03131;
        }

        .config-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .config-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .item-label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .item-value {
          font-size: 14px;
          color: #666;
        }

        .edit-btn {
          padding: 6px 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          background: #5568d3;
        }

        @media (max-width: 1200px) {
          .config-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .system-tabs {
            flex-direction: column;
          }

          .system-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }

          .actions-bar {
            flex-direction: column;
          }

          .add-btn,
          .filter-btn,
          .search-btn,
          .export-btn {
            width: 100%;
            text-align: center;
          }

          .data-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default SystemManagement;
