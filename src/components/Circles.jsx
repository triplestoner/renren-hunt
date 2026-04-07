import { useState } from 'react';

const initialCircles = [
  { id: 1, name: '清华校友圈', type: 'school', count: 156, color: '#3b82f6', desc: '清华大学校友网络', verified: true },
  { id: 2, name: '阿里同事圈', type: 'company', count: 89, color: '#f97316', desc: '阿里巴巴前同事', verified: true },
  { id: 3, name: 'AI技术圈', type: 'tech', count: 234, color: '#007AFF', desc: '人工智能领域从业者', verified: true },
  { id: 4, name: '字节好友圈', type: 'company', count: 67, color: '#06b6d4', desc: '字节跳动朋友', verified: true },
];

const availableCircles = [
  { id: 101, name: '北大校友圈', type: 'school', count: 234, color: '#8b5cf6', desc: '北京大学校友网络', requiresVerification: true, verificationType: 'diploma', verificationLabel: '学历证明', verificationHint: '上传毕业证书或学信网截图' },
  { id: 102, name: '腾讯同事圈', type: 'company', count: 178, color: '#007AFF', desc: '腾讯在职/离职员工', requiresVerification: true, verificationType: 'email', verificationLabel: '工牌或邮箱', verificationHint: '提供 @tencent.com 邮箱或工牌照片' },
  { id: 103, name: '斯坦福校友圈', type: 'school', count: 89, color: '#f43f5e', desc: '斯坦福大学校友', requiresVerification: true, verificationType: 'diploma', verificationLabel: '学位证书', verificationHint: '上传学位证书或成绩单' },
  { id: 104, name: '字节跳动圈', type: 'company', count: 312, color: '#f97316', desc: '字节跳动员工网络', requiresVerification: true, verificationType: 'email', verificationLabel: '工牌或邮箱', verificationHint: '提供 @bytedance.com 邮箱' },
  { id: 105, name: 'Meta员工圈', type: 'company', count: 156, color: '#3b82f6', desc: 'Meta/Facebook员工', requiresVerification: true, verificationType: 'email', verificationLabel: '工牌或邮箱', verificationHint: '提供 @meta.com 邮箱' },
  { id: 106, name: '自动驾驶圈', type: 'tech', count: 445, color: '#007AFF', desc: '自动驾驶领域从业者', requiresVerification: true, verificationType: 'id', verificationLabel: '身份证明', verificationHint: '提供名片或工牌' },
  { id: 107, name: '大模型技术圈', type: 'tech', count: 567, color: '#ec4899', desc: 'LLM/AIGC领域工程师', requiresVerification: true, verificationType: 'id', verificationLabel: '身份证明', verificationHint: '提供名片或项目经历' },
  { id: 108, name: '硅谷猎头圈', type: 'hunter', count: 78, color: '#6366f1', desc: '北美科技猎头', requiresVerification: true, verificationType: 'license', verificationLabel: '营业执照', verificationHint: '提供猎头营业执照' },
  { id: 109, name: '产品经理圈', type: 'tech', count: 892, color: '#14b8a6', desc: '产品经理交流圈', requiresVerification: false, verificationType: 'none', verificationLabel: '', verificationHint: '' },
  { id: 110, name: 'MBA校友圈', type: 'school', count: 145, color: '#f59e0b', desc: 'MBA校友网络', requiresVerification: true, verificationType: 'diploma', verificationLabel: 'MBA学位证明', verificationHint: '提供MBA学位证书' },
];

const circleTypes = [
  { id: 'school', label: '校友圈', icon: '🎓', desc: '按毕业院校划分' },
  { id: 'company', label: '企业圈', icon: '🏢', desc: '按工作单位划分' },
  { id: 'tech', label: '技术圈', icon: '💻', desc: '按技术领域划分' },
  { id: 'hunter', label: '猎头圈', icon: '🎯', desc: '专业猎头网络' },
  { id: 'social', label: '社交圈', icon: '👥', desc: '按社交关系划分' },
];

export default function Circles() {
  const [myCircles, setMyCircles] = useState(initialCircles);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [verificationData, setVerificationData] = useState({ type: '', value: '', file: null });
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCircle, setEditingCircle] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'school', desc: '', color: '#3b82f6' });

  const openJoinModal = () => {
    setShowJoinModal(true);
    setVerified(null);
  };

  const openVerifyModal = (circle) => {
    setSelectedCircle(circle);
    setVerificationData({ type: circle.verificationType, value: '', file: null });
    setVerified(null);
    setShowVerifyModal(true);
    setShowJoinModal(false);
  };

  const handleJoinCircle = (circle) => {
    if (circle.requiresVerification) {
      openVerifyModal(circle);
    } else {
      const newCircle = {
        ...circle,
        id: Date.now(),
        verified: true,
      };
      setMyCircles([...myCircles, newCircle]);
      setShowJoinModal(false);
    }
  };

  const handleVerify = () => {
    if (!verificationData.value.trim() && !verificationData.file) {
      alert('请提供验证材料');
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setTimeout(() => {
        const newCircle = {
          ...selectedCircle,
          id: Date.now(),
          verified: true,
        };
        setMyCircles([...myCircles, newCircle]);
        setShowVerifyModal(false);
        setVerified(null);
        setSelectedCircle(null);
      }, 1500);
    }, 2000);
  };

  const openCreateModal = () => {
    setEditingCircle(null);
    setFormData({ name: '', type: 'school', desc: '', color: '#3b82f6' });
    setShowCreateModal(true);
  };

  const openEditModal = (circle) => {
    setEditingCircle(circle);
    setFormData({ name: circle.name, type: circle.type, desc: circle.desc, color: circle.color });
    setShowCreateModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这个圈层吗？')) {
      setMyCircles(myCircles.filter(c => c.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    
    if (editingCircle) {
      setMyCircles(myCircles.map(c => 
        c.id === editingCircle.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCircle = {
        ...formData,
        id: Date.now(),
        count: 0,
        verified: false,
      };
      setMyCircles([...myCircles, newCircle]);
    }
    setShowCreateModal(false);
  };

  const colors = ['#3b82f6', '#f97316', '#007AFF', '#06b6d4', '#007AFF', '#ef4444', '#ec4899', '#6366f1'];

  return (
    <div className="circles-page">
      <header className="page-header">
        <div className="header-left">
          <h1>我的圈层</h1>
          <p className="subtitle">管理你的专属人脉圈层，精准触达目标候选人</p>
        </div>
        <div className="header-actions">
          <button className="btn-join-circle" onClick={openJoinModal}>
            <span>🔗</span> 加入圈子
          </button>
          <button className="btn-add-circle" onClick={openCreateModal}>
            <span>+</span> 创建圈层
          </button>
        </div>
      </header>

      <div className="circles-stats">
        <div className="stat-card">
          <span className="stat-value">{myCircles.length}</span>
          <span className="stat-label">圈层数量</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{myCircles.reduce((sum, c) => sum + c.count, 0)}</span>
          <span className="stat-label">人脉总数</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{myCircles.filter(c => c.type === 'school').length}</span>
          <span className="stat-label">校友圈</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{myCircles.filter(c => c.type === 'company').length}</span>
          <span className="stat-label">企业圈</span>
        </div>
      </div>

      <div className="circles-grid">
        {myCircles.map((circle, index) => (
          <div 
            key={circle.id} 
            className="circle-card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="circle-header">
              <div className="circle-icon" style={{ background: circle.color }}>
                {circleTypes.find(t => t.id === circle.type)?.icon || '🌐'}
              </div>
              <div className="circle-actions">
                {circle.verified && <span className="verified-badge" title="已认证">✓</span>}
                <button className="btn-edit" onClick={() => openEditModal(circle)}>✏️</button>
                <button className="btn-delete" onClick={() => handleDelete(circle.id)}>🗑️</button>
              </div>
            </div>
            <h3 className="circle-name">{circle.name}</h3>
            <p className="circle-desc">{circle.desc}</p>
            <div className="circle-meta">
              <span className="circle-type">{circleTypes.find(t => t.id === circle.type)?.label}</span>
              <span className="circle-count">{circle.count} 人</span>
            </div>
          </div>
        ))}
      </div>

      <div className="circle-types-section">
        <h3>圈层类型说明</h3>
        <div className="type-cards">
          {circleTypes.map(type => (
            <div key={type.id} className="type-card">
              <span className="type-icon">{type.icon}</span>
              <span className="type-label">{type.label}</span>
              <span className="type-desc">{type.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal join-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔗 加入圈子</h3>
              <button className="close-btn" onClick={() => setShowJoinModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="join-tip">选择你要加入的圈子，部分圈子需要平台认证</p>
              <div className="available-circles-list">
                {availableCircles.map((circle) => {
                  const isJoined = myCircles.some(c => c.name === circle.name);
                  return (
                    <div 
                      key={circle.id} 
                      className={`available-circle-card ${isJoined ? 'joined' : ''}`}
                      onClick={() => !isJoined && handleJoinCircle(circle)}
                    >
                      <div className="circle-icon" style={{ background: circle.color }}>
                        {circleTypes.find(t => t.id === circle.type)?.icon || '🌐'}
                      </div>
                      <div className="circle-info">
                        <h4>{circle.name}</h4>
                        <p>{circle.desc}</p>
                        <div className="circle-meta-row">
                          <span className="circle-count">{circle.count} 人</span>
                          {circle.requiresVerification && (
                            <span className="verify-required">
                              🔒 需要认证
                            </span>
                          )}
                        </div>
                      </div>
                      {isJoined ? (
                        <span className="join-status joined">已加入</span>
                      ) : (
                        <span className="join-status">加入</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {showVerifyModal && selectedCircle && (
        <div className="modal-overlay" onClick={() => setShowVerifyModal(false)}>
          <div className="modal verify-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🛡️ 平台认证</h3>
              <button className="close-btn" onClick={() => setShowVerifyModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="verify-circle-info">
                <div className="circle-icon" style={{ background: selectedCircle.color }}>
                  {circleTypes.find(t => t.id === selectedCircle.type)?.icon}
                </div>
                <div>
                  <h4>{selectedCircle.name}</h4>
                  <p>{selectedCircle.desc}</p>
                </div>
              </div>
              
              <div className="verify-steps">
                <div className="verify-step">
                  <span className="step-num">1</span>
                  <span className="step-text">提交{selectedCircle.verificationLabel}</span>
                </div>
                <div className="verify-step">
                  <span className="step-num">2</span>
                  <span className="step-text">平台审核 (1-3工作日)</span>
                </div>
                <div className="verify-step">
                  <span className="step-num">3</span>
                  <span className="step-text">认证成功，加入圈子</span>
                </div>
              </div>

              <div className="form-group">
                <label>{selectedCircle.verificationLabel} <span className="required">*</span></label>
                <p className="verify-hint">{selectedCircle.verificationHint}</p>
                {selectedCircle.verificationType === 'email' ? (
                  <input 
                    type="email" 
                    placeholder={`如：your.name@company.com`}
                    value={verificationData.value}
                    onChange={e => setVerificationData({ ...verificationData, value: e.target.value })}
                  />
                ) : selectedCircle.verificationType === 'diploma' ? (
                  <div className="file-upload-area">
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      id="diploma-upload"
                      onChange={e => setVerificationData({ ...verificationData, file: e.target.files[0] })}
                    />
                    <label htmlFor="diploma-upload" className="file-upload-label">
                      <span className="upload-icon">📄</span>
                      <span>{verificationData.file ? verificationData.file.name : '点击上传证书图片或PDF'}</span>
                    </label>
                  </div>
                ) : selectedCircle.verificationType === 'license' ? (
                  <div className="file-upload-area">
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      id="license-upload"
                      onChange={e => setVerificationData({ ...verificationData, file: e.target.files[0] })}
                    />
                    <label htmlFor="license-upload" className="file-upload-label">
                      <span className="upload-icon">📄</span>
                      <span>{verificationData.file ? verificationData.file.name : '点击上传营业执照'}</span>
                    </label>
                  </div>
                ) : (
                  <div className="file-upload-area">
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      id="id-upload"
                      onChange={e => setVerificationData({ ...verificationData, file: e.target.files[0] })}
                    />
                    <label htmlFor="id-upload" className="file-upload-label">
                      <span className="upload-icon">📄</span>
                      <span>{verificationData.file ? verificationData.file.name : '点击上传身份证明'}</span>
                    </label>
                  </div>
                )}
              </div>

              {verified === true && (
                <div className="verify-success">
                  <span className="success-icon">✅</span>
                  <span>认证成功！正在加入圈子...</span>
                </div>
              )}

              <button 
                className="btn-submit" 
                onClick={handleVerify}
                disabled={verifying || verified === true}
              >
                {verifying ? '🔄 审核中...' : verified === true ? '✅ 已认证' : '提交认证'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCircle ? '编辑圈层' : '创建圈层'}</h3>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>圈层名称 <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="如：清华校友圈"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>圈层类型</label>
                <div className="type-selector">
                  {circleTypes.map(type => (
                    <button
                      key={type.id}
                      className={`type-option ${formData.type === type.id ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, type: type.id })}
                    >
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>描述</label>
                <input 
                  type="text" 
                  placeholder="简单描述这个圈层"
                  value={formData.desc}
                  onChange={e => setFormData({ ...formData, desc: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>颜色标识</label>
                <div className="color-picker">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${formData.color === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
              </div>
              <button className="btn-submit" onClick={handleSubmit}>
                {editingCircle ? '保存修改' : '创建圈层'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .circles-page {
          max-width: 900px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-join-circle, .btn-add-circle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-join-circle {
          background: rgba(0, 122, 255, 0.15);
          border: 1px solid rgba(0, 122, 255, 0.3);
          color: #007AFF;
        }

        .btn-join-circle:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        .btn-add-circle {
          background: rgba(0, 122, 255, 0.15);
          border: 1px solid rgba(0, 122, 255, 0.3);
          color: #007AFF;
        }

        .btn-add-circle:hover {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        .circles-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          text-align: center;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .stat-card.highlight {
          background: var(--accent-glow);
          border-color: var(--border-accent);
        }

        .stat-value {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .stat-card.highlight .stat-value {
          color: var(--accent-primary);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .circles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .circle-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          animation: fadeIn 0.4s ease forwards;
          opacity: 0;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .circle-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .circle-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .circle-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .circle-actions {
          display: flex;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .circle-card:hover .circle-actions {
          opacity: 1;
        }

        .btn-edit, .btn-delete {
          padding: 6px 10px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-edit:hover, .btn-delete:hover {
          background: var(--bg-card-hover);
          border-color: var(--accent-primary);
        }

        .circle-name {
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .circle-desc {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }

        .circle-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .circle-type {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          padding: 4px 10px;
          border-radius: 10px;
        }

        .circle-count {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .circle-types-section {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-glass);
        }

        .circle-types-section h3 {
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .type-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
        }

        .type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          text-align: center;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .type-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .type-icon {
          font-size: 1.5rem;
        }

        .type-label {
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .type-desc {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          width: 90%;
          max-width: 480px;
          animation: fadeIn 0.3s ease;
          box-shadow: var(--shadow-glass);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-header h3 {
          font-size: 1.1rem;
        }

        .close-btn {
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .close-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .required {
          color: #f87171;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-group input:focus {
          border-color: var(--accent-primary);
        }

        .type-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .type-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .type-option:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .type-option.active {
          border-color: var(--accent-primary);
          background: var(--accent-glow);
          color: var(--accent-primary);
        }

        .type-option span:first-child {
          font-size: 1.25rem;
        }

        .color-picker {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .color-option {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .color-option:hover {
          transform: scale(1.15);
        }

        .color-option.active {
          border-color: white;
          transform: scale(1.1);
        }

        .btn-submit {
          width: 100%;
          padding: 14px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          margin-top: 8px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .btn-submit:hover:not(:disabled) {
          background: rgba(0, 122, 255, 0.25);
          transform: translateY(-2px);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .join-modal {
          max-width: 560px;
        }

        .join-tip {
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .available-circles-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 400px;
          overflow-y: auto;
        }

        .available-circle-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .available-circle-card:hover:not(.joined) {
          border-color: var(--accent-primary);
          transform: translateX(4px);
        }

        .available-circle-card.joined {
          opacity: 0.6;
          cursor: default;
        }

        .available-circle-card .circle-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .available-circle-card .circle-info {
          flex: 1;
        }

        .available-circle-card .circle-info h4 {
          font-size: 1rem;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .available-circle-card .circle-info p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .circle-meta-row {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .circle-count {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .verify-required {
          font-size: 0.7rem;
          color: var(--warning);
          background: rgba(251, 191, 36, 0.15);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .join-status {
          padding: 6px 16px;
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          flex-shrink: 0;
          border: 1px solid rgba(0, 122, 255, 0.3);
        }

        .join-status.joined {
          background: var(--success);
          color: white;
          border: none;
        }

        .verify-modal {
          max-width: 480px;
        }

        .verify-circle-info {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          margin-bottom: 24px;
        }

        .verify-circle-info .circle-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .verify-circle-info h4 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .verify-circle-info p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .verify-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .verify-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .step-num {
          width: 28px;
          height: 28px;
          background: var(--accent-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .step-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .verify-hint {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-bottom: 12px;
        }

        .file-upload-area {
          position: relative;
        }

        .file-upload-area input[type="file"] {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .file-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 32px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 2px dashed var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .file-upload-label:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }

        .upload-icon {
          font-size: 2rem;
        }

        .verify-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-md);
          color: var(--success);
          font-weight: 600;
          margin-bottom: 16px;
          animation: fadeIn 0.3s ease;
        }

        .success-icon {
          font-size: 1.5rem;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: var(--success);
          color: white;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .circles-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .circles-grid {
            grid-template-columns: 1fr 1fr;
          }

          .type-selector {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .circles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
