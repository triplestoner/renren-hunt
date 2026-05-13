import { useState } from 'react';

const DataAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedChartType, setSelectedChartType] = useState('user_growth');

  const timeRanges = [
    { value: '1d', label: '过去1天' },
    { value: '7d', label: '过去7天', selected: true },
    { value: '30d', label: '过去30天' },
    { value: '90d', label: '过去90天' },
    { value: '365d', label: '过去1年' }
  ];

  const dataPoints = {
    overview: [
      { label: '总用户数', value: 12456, change: '+12.5%', trend: 'up' },
      { label: '日活跃用户', value: 3421, change: '+8.2%', trend: 'up' },
      { label: '职位发布数', value: 156, change: '+5.8%', trend: 'up' },
      { label: '推荐成功数', value: 89, change: '+15.3%', trend: 'up' },
      { label: '交易总额', value: 456231, change: '+10.2%', trend: 'up' },
      { label: '平均薪资', value: 23120, change: '+3.5%', trend: 'up' }
    ],
    user: [
      { label: '新增用户', value: 456, change: '+25.8%', trend: 'up' },
      { label: '活跃用户', value: 3421, change: '+8.2%', trend: 'up' },
      { label: '留存用户', value: 2856, change: '+12.3%', trend: 'up' },
      { label: '流失用户', value: 565, change: '-8.5%', trend: 'down' },
      { label: '用户转化', value: '18.5%', change: '+2.3%', trend: 'up' },
      { label: '人均使用', value: '3.5小时', change: '+0.5小时', trend: 'up' }
    ],
    recruit: [
      { label: '职位发布', value: 156, change: '+5.8%', trend: 'up' },
      { label: '推荐数', value: 892, change: '+12.3%', trend: 'up' },
      { label: '面试数', value: 345, change: '+8.5%', trend: 'up' },
      { label: '成功入职', value: 89, change: '+15.3%', trend: 'up' },
      { label: '成功率', value: '10.0%', change: '+2.8%', trend: 'up' },
      { label: '平均薪资', value: 23120, change: '+3.5%', trend: 'up' }
    ],
    finance: [
      { label: '总营收', value: 456231, change: '+10.2%', trend: 'up' },
      { label: '支出总额', value: 324567, change: '+8.5%', trend: 'up' },
      { label: '净利润', value: 131664, change: '+15.8%', trend: 'up' },
      { label: '利润率', value: '28.9%', change: '+2.1%', trend: 'up' },
      { label: '人均营收', value: 36.6, change: '+6.2%', trend: 'up' },
      { label: 'ROI', value: '1.4', change: '+0.2', trend: 'up' }
    ]
  };

  const tabNames = {
    overview: '概览',
    user: '用户分析',
    recruit: '招聘分析',
    finance: '财务分析'
  };

  const chartData = {
    user_growth: {
      title: '用户增长趋势',
      type: 'line',
      data: [
        { month: '1月', count: 1200 },
        { month: '2月', count: 1500 },
        { month: '3月', count: 1800 },
        { month: '4月', count: 2200 },
        { month: '5月', count: 2800 }
      ]
    },
    transaction_trend: {
      title: '交易趋势',
      type: 'bar',
      data: [
        { month: '1月', amount: 50000 },
        { month: '2月', amount: 65000 },
        { month: '3月', amount: 80000 },
        { month: '4月', amount: 95000 },
        { month: '5月', amount: 120000 }
      ]
    },
    recruitment_pipeline: {
      title: '招聘漏斗',
      type: 'pie',
      data: [
        { stage: '简历筛选', count: 1200 },
        { stage: '面试', count: 350 },
        { stage: '终面', count: 120 },
        { stage: 'offer', count: 85 },
        { stage: '入职', count: 62 }
      ]
    }
  };

  const statsCards = [
    {
      title: '总用户数',
      value: '15,234',
      change: '+12.5%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: '本月新增',
      value: '2,856',
      change: '+8.3%',
      changeType: 'positive',
      icon: '📈'
    },
    {
      title: '活跃用户',
      value: '12,456',
      change: '+5.2%',
      changeType: 'positive',
      icon: '💚'
    },
    {
      title: '交易总额',
      value: '¥1,234,567',
      change: '+15.8%',
      changeType: 'positive',
      icon: '💰'
    }
  ];

  return (
    <div className="data-analysis">
      <div className="page-header">
        <h1>数据分析</h1>
        <p>查看平台的关键指标和数据分析</p>
      </div>

      <div className="analysis-tabs">
        {(['overview', 'user', 'recruit', 'finance']).map((tab) => (
          <button
            key={tab}
            className={`analysis-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      <div className="time-range-filter">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            className={`time-btn ${range.value === timeRange ? 'active' : ''}`}
            onClick={() => setTimeRange(range.value)}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* 数据统计卡片 */}
      <div className="stats-cards">
        {statsCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon">{card.icon}</div>
              <div className={`stat-change ${card.changeType}`}>
                {card.change}
              </div>
            </div>
            <div className="stat-card-body">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="data-grid">
        {dataPoints[activeTab].map((point, index) => (
          <div key={index} className="data-card">
            <div className="data-header">
              <div className="data-label">{point.label}</div>
              <div className={`data-trend ${point.trend}`}>
                {point.trend === 'up' ? '↑' : '↓'}
                <span>{point.change}</span>
              </div>
            </div>
            <div className="data-value">{point.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* 图表选择器 */}
      <div className="chart-selector">
        {Object.keys(chartData).map((key) => (
          <button
            key={key}
            className={`chart-btn ${selectedChartType === key ? 'active' : ''}`}
            onClick={() => setSelectedChartType(key)}
          >
            {chartData[key].title}
          </button>
        ))}
      </div>

      {/* 图表展示区域 */}
      <div className="chart-display">
        <div className="card">
          <div className="card-header">
            <h3>{chartData[selectedChartType].title}</h3>
            <div className="card-actions">
              <select className="time-range">
                <option>最近6个月</option>
                <option>最近12个月</option>
                <option>最近3年</option>
              </select>
            </div>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <div className="chart-placeholder">
                <span className="chart-icon">📈</span>
                <p>{chartData[selectedChartType].title}图表开发中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 数据导出区域 */}
      <div className="data-export">
        <button className="export-btn">📥 导出数据报表</button>
        <button className="export-btn">📊 生成分析报告</button>
      </div>

      <style>{`
        .data-analysis {
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

        .analysis-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid #f0f0f0;
        }

        .analysis-tab {
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

        .analysis-tab:hover {
          color: #667eea;
          border-color: #667eea;
        }

        .analysis-tab.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .time-range-filter {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .time-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .time-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .time-btn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .data-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .data-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .data-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .data-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .data-label {
          font-size: 14px;
          color: #666;
        }

        .data-trend {
          font-size: 13px;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        .data-trend.up {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .data-trend.down {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }

        .data-value {
          font-size: 28px;
          font-weight: 600;
          color: #333;
        }

        .charts-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .chart-header {
          margin-bottom: 24px;
        }

        .chart-header h3 {
          font-size: 20px;
          color: #333;
          margin-bottom: 8px;
          font-weight: 600;
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

        /* 统计卡片样式 */
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-change {
          font-size: 14px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .stat-change.positive {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }

        .stat-card-body h3 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin: 0 0 8px 0;
        }

        .stat-card-body p {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        /* 图表选择器样式 */
        .chart-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .chart-btn {
          padding: 12px 24px;
          background: white;
          border: 2px solid #e8e8e8;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #555;
        }

        .chart-btn:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
        }

        .chart-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        /* 图表展示区域样式 */
        .chart-display {
          margin-bottom: 32px;
        }

        .chart-display .card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .chart-display .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .chart-display .card-header h3 {
          font-size: 20px;
          color: #333;
          margin: 0;
          font-weight: 600;
        }

        .chart-display .card-actions .time-range {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          cursor: pointer;
          color: #555;
        }

        .chart-display .card-body {
          padding: 0;
        }

        .chart-display .chart-container {
          min-height: 300px;
        }

        .chart-display .chart-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%);
          border-radius: 10px;
        }

        .chart-display .chart-icon {
          font-size: 56px;
          margin-bottom: 16px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* 数据导出区域样式 */
        .data-export {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }

        .export-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
        }

        .export-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 1200px) {
          .data-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }
          .data-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .analysis-tabs {
            flex-direction: column;
          }

          .analysis-tab {
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
          }

          .time-range-filter {
            flex-direction: column;
          }

          .time-btn {
            width: 100%;
            text-align: center;
          }

          .data-grid {
            grid-template-columns: 1fr;
          }

          .stats-cards {
            grid-template-columns: 1fr;
          }

          .chart-selector {
            flex-direction: column;
          }

          .chart-btn {
            width: 100%;
          }

          .data-export {
            flex-direction: column;
          }

          .export-btn {
            width: 100%;
          }

          .chart-display .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .chart-display .card-actions {
            width: 100%;
          }

          .chart-display .card-actions .time-range {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DataAnalysis;
