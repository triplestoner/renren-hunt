import { useState } from 'react';

const AuditManagement = () => {
  const [activeTab, setActiveTab] = useState('identity');

  const auditRecords = {
    identity: [
      {
        id: '1',
        userInfo: {
          name: '李小明',
          role: '推荐人',
          avatar: 'https://i.pravatar.cc/40?u=lixiaoming'
        },
        status: 'pending',
        submitTime: '2026-01-15 14:20:32',
        auditTime: null,
        reason: '待审核',
        type: '基本信息审核'
      },
      {
        id: '2',
        userInfo: {
          name: '王小红',
          role: '企业HR',
          avatar: 'https://i.pravatar.cc/40?u=wangxiaohong'
        },
        status: 'approved',
        submitTime: '2026-02-20 09:15:23',
        auditTime: '2026-02-20 10:30:12',
        reason: '信息无误',
        type: '企业资质审核'
      },
      {
        id: '3',
        userInfo: {
          name: '张同学',
          role: '候选人',
          avatar: 'https://i.pravatar.cc/40?u=zhangtongxue'
        },
        status: 'rejected',
        submitTime: '2026-03-01 16:45:08',
        auditTime: '2026-03-02 08:20:45',
        reason: '身份证照片模糊',
        type: '实名认证'
      }
    ],
    jobs: [
      {
        id: '1',
        jobInfo: {
          title: '资深前端架构师',
          company: '字节跳动',
          salary: '80-120K·16薪',
          logo: 'https://i.pravatar.cc/40?u=bytedance'
        },
        status: 'pending',
        submitTime: '2026-03-15 11:20:32',
        auditTime: null,
        reason: '待审核',
        type: '职位发布审核'
      },
      {
        id: '2',
        jobInfo: {
          title: 'AI算法工程师',
          company: '阿里巴巴',
          salary: '60-90K·15薪',
          logo: 'https://i.pravatar.cc/40?u=alibaba'
        },
        status: 'approved',
        submitTime: '2026-03-14 14:15:23',
        auditTime: '2026-03-14 15:30:12',
        reason: '职位信息真实',
        type: '职位发布审核'
      },
      {
        id: '3',
        jobInfo: {
          title: '产品经理',
          company: '腾讯',
          salary: '50-80K·14薪',
          logo: 'https://i.pravatar.cc/40?u=tencent'
        },
        status: 'rejected',
        submitTime: '2026-03-13 09:45:08',
        auditTime: '2026-03-13 11:20:45',
        reason: '职位描述模糊',
        type: '职位发布审核'
      }
    ],
    content: [
      {
        id: '1',
        userInfo: {
          name: '刘小强',
          role: '推荐人',
          avatar: 'https://i.pravatar.cc/40?u=liuxiaoqiang'
        },
        contentPreview: '招聘Java开发工程师，年薪30-50万...',
        status: 'pending',
        submitTime: '2026-03-12 16:20:32',
        auditTime: null,
        reason: '待审核',
        type: '内容审核'
      },
      {
        id: '2',
        userInfo: {
          name: '黄女士',
          role: '企业HR',
          avatar: 'https://i.pravatar.cc/40?u=huangnvshi'
        },
        contentPreview: '寻求资深产品经理，有成功案例优先...',
        status: 'approved',
        submitTime: '2026-03-11 10:15:23',
        auditTime: '2026-03-11 11:30:12',
        reason: '内容合规',
        type: '内容审核'
      },
      {
        id: '3',
        userInfo: {
          name: '周同学',
          role: '候选人',
          avatar: 'https://i.pravatar.cc/40?u=zhoutongxue'
        },
        contentPreview: '分享我的求职经验，希望对大家有帮助...',
        status: 'rejected',
        submitTime: '2026-03-10 14:45:08',
        auditTime: '2026-03-10 16:20:45',
        reason: '包含敏感信息',
        type: '内容审核'
      }
    ]
  };

  const tabNames = {
    identity: '身份认证审核',
    jobs: '职位发布审核',
    content: '内容审核'
  };

  return (
    <div className="audit-management">
      <div className="page-header">
        <h1>审核管理</h1>
        <p>审核各类用户提交的申请</p>
      </div>

      <div className="audit-tabs">
        {(['identity', 'jobs', 'content']).map((tab) => (
          <button
            key={tab}
            className={`audit-tab ${activeTab === tab ? 'active' : ''}`}
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
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="filter-controls">
          <select className="filter-select">
            <option value="">全部状态</option>
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
          </select>

          <button className="refresh-btn">🔄 刷新</button>
        </div>
      </div>

      <div className="audit-list">
        <table className="audit-table">
          <thead>
            <tr>
              <th>用户信息</th>
              {activeTab === 'jobs' && <th>职位信息</th>}
              {activeTab === 'content' && <th>内容预览</th>}
              <th>审核类型</th>
              <th>状态</th>
              <th>提交时间</th>
              <th>审核时间</th>
              <th>审核理由</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {auditRecords[activeTab].map((record) => (
              <tr key={record.id}>
                <td className="user-info">
                  <img src={record.userInfo.avatar} alt={record.userInfo.name} className="user-avatar" />
                  <div className="user-details">
                    <div className="user-name">{record.userInfo.name}</div>
                    <div className="user-role">{record.userInfo.role}</div>
                  </div>
                </td>
                {activeTab === 'jobs' && (
                  <td className="job-info">
                    <div className="job-title">{record.jobInfo.title}</div>
                    <div className="job-company">{record.jobInfo.company}</div>
                    <div className="job-salary">{record.jobInfo.salary}</div>
                  </td>
                )}
                {activeTab === 'content' && (
                  <td className="content-preview">
                    <div className="content-text">{record.contentPreview}</div>
                  </td>
                )}
                <td className="audit-type">
                  {record.type}
                </td>
                <td className="audit-status">
                  <span className={`status-badge ${record.status}`}>{
                    record.status === 'pending' ? '待审核' :
                    record.status === 'approved' ? '已通过' : '已拒绝'
                  }</span>
                </td>
                <td className="submit-time">
                  {record.submitTime}
                </td>
                <td className="audit-time">
                  {record.auditTime || '-'}
                </td>
                <td className="audit-reason">
                  {record.reason}
                </td>
                <td className="audit-actions">
                  {record.status === 'pending' && (
                    <>
                      <button className="action-btn approve" onClick={() => approveAudit(record.id)}>通过</button>
                      <button className="action-btn reject" onClick={() => rejectAudit(record.id)}>拒绝</button>
                    </>
                  )}
                  {record.status === 'approved' && (
                    <button className="action-btn view" onClick={() => viewAudit(record.id)}>查看</button>
                  )}
                  {record.status === 'rejected' && (
                    <button className="action-btn view" onClick={() => viewAudit(record.id)}>查看</button>
                  )}
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
        .audit-management {
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

        .audit-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .audit-tab {
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

        .audit-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .audit-tab.active {
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

        .refresh-btn {
          padding: 10px 16px;
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: #e0e0e0;
        }

        .audit-list {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .audit-table {
          width: 100%;
          border-collapse: collapse;
        }

        .audit-table thead {
          background: #fafafa;
        }

        .audit-table th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 2px solid #e8e8e8;
        }

        .audit-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #666;
        }

        .audit-table tbody tr:hover {
          background: #f5f5f5;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
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

        .job-info {
          min-width: 200px;
        }

        .job-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .job-company {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .job-salary {
          font-size: 12px;
          color: #f59e0b;
        }

        .content-preview {
          max-width: 300px;
        }

        .content-text {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .audit-type {
          color: #667eea;
          font-weight: 500;
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

        .status-badge.approved {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .status-badge.rejected {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .audit-actions {
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

        .action-btn.approve {
          background: #4ade80;
          color: white;
          border-color: #4ade80;
        }

        .action-btn.approve:hover {
          background: #34d399;
          border-color: #34d399;
        }

        .action-btn.reject {
          background: #f87171;
          color: white;
          border-color: #f87171;
        }

        .action-btn.reject:hover {
          background: #ef4444;
          border-color: #ef4444;
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

          .audit-table {
            font-size: 12px;
          }

          .audit-table th,
          .audit-table td {
            padding: 10px;
          }

          .audit-actions {
            flex-direction: column;
            gap: 4px;
          }

          .action-btn {
            padding: 4px 8px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .audit-tabs {
            flex-direction: column;
          }

          .audit-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }

          .audit-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );

  function approveAudit(id) {
    console.log('Approve audit:', id);
  }

  function rejectAudit(id) {
    console.log('Reject audit:', id);
  }

  function viewAudit(id) {
    console.log('View audit:', id);
  }
};

export default AuditManagement;
