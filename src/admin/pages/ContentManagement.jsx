import { useState } from 'react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('carousel');

  const contentData = {
    carousel: [
      { id: 1, title: '首页轮播图1', image: 'https://picsum.photos/seed/banner1/800/300', order: 1, status: 'active', createTime: '2026-05-10 10:00:00' },
      { id: 2, title: '首页轮播图2', image: 'https://picsum.photos/seed/banner2/800/300', order: 2, status: 'active', createTime: '2026-05-08 14:30:00' },
      { id: 3, title: '首页轮播图3', image: 'https://picsum.photos/seed/banner3/800/300', order: 3, status: 'inactive', createTime: '2026-05-05 09:15:00' }
    ],
    notice: [
      { id: 1, title: '平台升级公告', content: '平台将于2026-05-15进行系统升级...', priority: 'high', status: 'active', createTime: '2026-05-12 08:00:00' },
      { id: 2, title: '新功能上线', content: '新增推荐人等级制度，享受更多权益...', priority: 'normal', status: 'active', createTime: '2026-05-10 15:00:00' },
      { id: 3, title: '系统维护通知', content: '系统将于每周日凌晨2:00进行例行维护...', priority: 'low', status: 'active', createTime: '2026-05-01 10:00:00' }
    ],
    help: [
      { id: 1, title: '如何注册账号', content: '点击首页右上角的注册按钮，填写个人信息...', category: '使用指南', views: 1234, status: 'active', createTime: '2026-04-01 09:00:00' },
      { id: 2, title: '如何发布职位', content: '登录企业账号，点击发布职位，填写职位信息...', category: '企业服务', views: 856, status: 'active', createTime: '2026-04-05 14:00:00' },
      { id: 3, title: '如何推荐人才', content: '登录推荐人账号，浏览职位，点击推荐按钮...', category: '推荐服务', views: 678, status: 'active', createTime: '2026-04-10 16:00:00' }
    ]
  };

  const tabNames = {
    carousel: '轮播图管理',
    notice: '通知公告',
    help: '帮助中心'
  };

  const priorityLabels = {
    high: '高',
    normal: '普通',
    low: '低'
  };

  const statusLabels = {
    active: '已发布',
    inactive: '未发布'
  };

  return (
    <div className="content-management">
      <div className="page-header">
        <h1>内容管理</h1>
        <p>管理平台的内容发布和维护</p>
      </div>

      <div className="content-tabs">
        {(['carousel', 'notice', 'help']).map((tab) => (
          <button
            key={tab}
            className={`content-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="actions-bar">
        <button className="add-btn">+ 新增</button>
        <button className="filter-btn">🔍 筛选</button>
        <button className="search-btn">🔎 搜索</button>
      </div>

      <div className="content-card">
        {activeTab === 'carousel' && (
          <div className="carousel-list">
            <h3>轮播图列表</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>标题</th>
                  <th>图片</th>
                  <th>排序</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {contentData.carousel.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      <img src={item.image} alt={item.title} className="thumbnail" />
                    </td>
                    <td>{item.order}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>{item.createTime}</td>
                    <td>
                      <button className="action-btn">编辑</button>
                      <button className="action-btn">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'notice' && (
          <div className="notice-list">
            <h3>通知公告列表</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>标题</th>
                  <th>内容摘要</th>
                  <th>优先级</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {contentData.notice.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td className="content-cell">{item.content}</td>
                    <td>
                      <span className={`priority-badge ${item.priority}`}>
                        {priorityLabels[item.priority]}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>{item.createTime}</td>
                    <td>
                      <button className="action-btn">编辑</button>
                      <button className="action-btn">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="help-list">
            <h3>帮助文档列表</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>标题</th>
                  <th>内容摘要</th>
                  <th>分类</th>
                  <th>浏览量</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {contentData.help.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td className="content-cell">{item.content}</td>
                    <td>{item.category}</td>
                    <td>{item.views}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>{item.createTime}</td>
                    <td>
                      <button className="action-btn">编辑</button>
                      <button className="action-btn">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .content-management {
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

        .content-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .content-tab {
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

        .content-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .content-tab.active {
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

        .content-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .content-card h3 {
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

        .thumbnail {
          width: 120px;
          height: 45px;
          object-fit: cover;
          border-radius: 4px;
        }

        .content-cell {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .priority-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .priority-badge.high {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .priority-badge.normal {
          background: rgba(96, 165, 250, 0.1);
          color: #60a5fa;
        }

        .priority-badge.low {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
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
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
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

        @media (max-width: 768px) {
          .content-tabs {
            flex-direction: column;
          }

          .content-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }

          .actions-bar {
            flex-direction: column;
          }

          .add-btn,
          .filter-btn,
          .search-btn {
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

export default ContentManagement;
