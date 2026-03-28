import { useState } from 'react';

const initialCircles = [
  { id: 1, name: '清华校友圈', type: 'school', count: 156, color: '#3b82f6', desc: '清华大学校友网络' },
  { id: 2, name: '阿里同事圈', type: 'company', count: 89, color: '#f97316', desc: '阿里巴巴前同事' },
  { id: 3, name: 'AI技术圈', type: 'tech', count: 234, color: '#10b981', desc: '人工智能领域从业者' },
  { id: 4, name: '字节好友圈', type: 'company', count: 67, color: '#06b6d4', desc: '字节跳动朋友' },
];

const circleTypes = [
  { id: 'school', label: '校友圈', icon: '🎓', desc: '按毕业院校划分' },
  { id: 'company', label: '企业圈', icon: '🏢', desc: '按工作单位划分' },
  { id: 'tech', label: '技术圈', icon: '💻', desc: '按技术领域划分' },
  { id: 'hunter', label: '猎头圈', icon: '🎯', desc: '专业猎头网络' },
  { id: 'social', label: '社交圈', icon: '👥', desc: '按社交关系划分' },
];

export default function Circles() {
  const [circles, setCircles] = useState(initialCircles);
  const [showModal, setShowModal] = useState(false);
  const [editingCircle, setEditingCircle] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'school', desc: '', color: '#3b82f6' });

  const openAddModal = () => {
    setEditingCircle(null);
    setFormData({ name: '', type: 'school', desc: '', color: '#3b82f6' });
    setShowModal(true);
  };

  const openEditModal = (circle) => {
    setEditingCircle(circle);
    setFormData({ name: circle.name, type: circle.type, desc: circle.desc, color: circle.color });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这个圈层吗？')) {
      setCircles(circles.filter(c => c.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    
    if (editingCircle) {
      setCircles(circles.map(c => 
        c.id === editingCircle.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCircle = {
        ...formData,
        id: Date.now(),
        count: 0,
      };
      setCircles([...circles, newCircle]);
    }
    setShowModal(false);
  };

  const colors = ['#3b82f6', '#f97316', '#10b981', '#06b6d4', '#10b981', '#ef4444', '#ec4899', '#6366f1'];

  return (
    <div className="circles-page">
      <header className="page-header">
        <div className="header-left">
          <h1>我的圈层</h1>
          <p className="subtitle">管理你的专属人脉圈层，精准触达目标候选人</p>
        </div>
        <button className="btn-add-circle" onClick={openAddModal}>
          <span>+</span> 新建圈层
        </button>
      </header>

      <div className="circles-stats">
        <div className="stat-card">
          <span className="stat-value">{circles.length}</span>
          <span className="stat-label">圈层数量</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{circles.reduce((sum, c) => sum + c.count, 0)}</span>
          <span className="stat-label">人脉总数</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{circles.filter(c => c.type === 'school').length}</span>
          <span className="stat-label">校友圈</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{circles.filter(c => c.type === 'company').length}</span>
          <span className="stat-label">企业圈</span>
        </div>
      </div>

      <div className="circles-grid">
        {circles.map((circle, index) => (
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCircle ? '编辑圈层' : '新建圈层'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
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

        .btn-add-circle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--accent-gradient);
          color: #0a0a0f;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .btn-add-circle:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .circles-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          text-align: center;
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
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          animation: fadeIn 0.4s ease forwards;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .circle-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-card);
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
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .btn-edit:hover, .btn-delete:hover {
          background: var(--bg-card-hover);
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
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
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
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          text-align: center;
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
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          width: 90%;
          max-width: 480px;
          animation: fadeIn 0.3s ease;
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
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
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
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.8rem;
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
        }

        .color-option.active {
          border-color: white;
          transform: scale(1.1);
        }

        .btn-submit {
          width: 100%;
          padding: 14px;
          background: var(--accent-gradient);
          color: #0a0a0f;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          margin-top: 8px;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
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
