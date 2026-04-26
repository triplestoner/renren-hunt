import { useState } from 'react'
import Layout from './components/Layout'
import JobHall from './components/JobHall'
import TrustScore from './components/TrustScore'
import EarningsCenter from './components/EarningsCenter'
import Referrals from './components/Referrals'
import Circles from './components/Circles'
import CandidatePortal from './components/CandidatePortal'
import EmployerPortal from './components/EmployerPortal'
import RecommenderOnboarding from './components/RecommenderOnboarding'

const initialJobs = [
  {
    id: 1,
    title: '资深前端架构师',
    company: '字节跳动',
    companyLogo: 'https://logo.clearbit.com/bytedance.com',
    salary: '80-120K·16薪',
    tags: ['React', 'TypeScript', '架构设计'],
    deadline: '剩余12小时',
    urgent: true,
    bonus: '¥25,000',
    circle: '#大厂圈',
    match: 95,
  },
  {
    id: 2,
    title: 'AI算法工程师',
    company: 'MiniMax',
    companyLogo: 'https://logo.clearbit.com/minimaxi.chat',
    salary: '60-90K·15薪',
    tags: ['Python', 'LLM', '深度学习'],
    deadline: '剩余2天',
    urgent: false,
    bonus: '¥18,000',
    circle: '#AI圈',
    match: 88,
  },
  {
    id: 3,
    title: '产品总监',
    company: '美团',
    companyLogo: 'https://logo.clearbit.com/meituan.com',
    salary: '100-150K·14薪',
    tags: ['B端产品', 'SaaS', '团队管理'],
    deadline: '剩余3天',
    urgent: false,
    bonus: '¥35,000',
    circle: '#大厂圈',
    match: 82,
  },
  {
    id: 4,
    title: '后端资深工程师',
    company: '蚂蚁集团',
    companyLogo: 'https://logo.clearbit.com/antgroup.com',
    salary: '50-80K·15薪',
    tags: ['Java', '微服务', '分布式'],
    deadline: '剩余1天',
    urgent: true,
    bonus: '¥20,000',
    circle: '#金融科技圈',
    match: 91,
  },
];

function App() {
  const [isRecommenderOnboarded, setIsRecommenderOnboarded] = useState(false)
  const [activeRole, setActiveRole] = useState('c1')
  const [activeTab, setActiveTab] = useState('hall')
  const [publishedJobs, setPublishedJobs] = useState(initialJobs)
  const [c2ReceivedRecommendations, setC2ReceivedRecommendations] = useState([])
  const [employerCandidates, setEmployerCandidates] = useState([])
  const [submittedRecommendations, setSubmittedRecommendations] = useState([])

  const handleRecommend = (recommendation) => {
    const newRecommendation = {
      id: Date.now(),
      ...recommendation,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    }
    setC2ReceivedRecommendations([...c2ReceivedRecommendations, newRecommendation])
    setSubmittedRecommendations([...submittedRecommendations, newRecommendation])
  }

  const handleC2Accept = (recommendationId) => {
    const recommendation = c2ReceivedRecommendations.find(r => r.id === recommendationId)
    if (recommendation) {
      const newCandidate = {
        id: Date.now(),
        name: recommendation.name,
        title: recommendation.title,
        experience: recommendation.experience || '5年',
        education: recommendation.education || '本科',
        skills: recommendation.skills,
        matchScore: Math.floor((recommendation.skillMatch + recommendation.experienceMatch + recommendation.potential) / 3 * 20),
        referrer: { name: '李小牛', score: 92, level: 'S级' },
        status: '待查看',
        review: null,
      }
      setEmployerCandidates([...employerCandidates, newCandidate])
      setC2ReceivedRecommendations(
        c2ReceivedRecommendations.map(r => 
          r.id === recommendationId ? { ...r, status: 'accepted' } : r
        )
      )
    }
  }

  const handleSwitchRole = () => {
    if (activeRole === 'c1') {
      setActiveRole('c2')
      setActiveTab('offers')
    } else if (activeRole === 'c2') {
      setActiveRole('c1')
      setActiveTab('hall')
    }
  }

  const renderC1Content = () => {
    switch (activeTab) {
      case 'hall':
        return <JobHall publishedJobs={publishedJobs} onRecommend={handleRecommend} submittedRecommendations={submittedRecommendations} />
      case 'referrals':
        return <Referrals />
      case 'circles':
        return <Circles />
      case 'trust':
        return <TrustScore />
      case 'earnings':
        return <EarningsCenter />
      default:
        return <JobHall publishedJobs={publishedJobs} onRecommend={handleRecommend} />
    }
  }

  const renderRoleBadge = () => {
    switch (activeRole) {
      case 'c1':
        return <span className="role-badge c1">Recommender</span>
      case 'c2':
        return <span className="role-badge c2">Candidate 候选人</span>
      case 'b':
        return <span className="role-badge b">B端 企业</span>
    }
  }

  const renderLayout = (children) => {
    if (activeRole === 'c1') {
      if (!isRecommenderOnboarded) {
        return <RecommenderOnboarding onComplete={() => {
          setIsRecommenderOnboarded(true)
          setActiveTab('trust')
        }} />
      }
      return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
          {children}
        </Layout>
      )
    }
    return children
  }

  return (
    <div className="app">
      <header className="role-switcher">
        <div className="role-tabs">
          <button 
            className={`role-tab ${activeRole === 'c1' ? 'active' : ''}`}
            onClick={() => { setActiveRole('c1'); setActiveTab('hall'); }}
          >
            <span className="tab-icon">👤</span>
            Recommender 推荐人
          </button>
          <button 
            className={`role-tab ${activeRole === 'c2' ? 'active' : ''}`}
            onClick={() => { setActiveRole('c2'); setActiveTab('offers'); }}
          >
            <span className="tab-icon">🎯</span>
            Candidate 候选人
          </button>
          <button 
            className={`role-tab ${activeRole === 'b' ? 'active' : ''}`}
            onClick={() => { setActiveRole('b'); setActiveTab('candidates'); }}
          >
            <span className="tab-icon">🏢</span>
            B端 企业
          </button>
        </div>
        {renderRoleBadge()}
      </header>

      {activeRole === 'c1' && renderLayout(renderC1Content())}
      {activeRole === 'c2' && <CandidatePortal onSwitchRole={handleSwitchRole} recommendations={c2ReceivedRecommendations} onAccept={handleC2Accept} />}
      {activeRole === 'b' && <EmployerPortal publishedJobs={publishedJobs} setPublishedJobs={setPublishedJobs} />}

      <footer className="app-footer">
        <span>最后更新：2026-04-12 20:12:57</span>
        <span className="footer-separator">|</span>
        <span>by lql</span>
      </footer>

      <style>{`
        .app {
          min-height: 100vh;
        }

        .role-switcher {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
          position: sticky;
          top: 0;
          z-index: 200;
        }

        .role-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-lg);
          padding: 4px;
          gap: 4px;
          border: 1px solid var(--glass-border);
        }

        .role-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .role-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .role-tab.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-card);
        }

        .role-tab.active[onclick*="c1"] {
          color: var(--accent-primary);
        }

        .role-tab.active[onclick*="c2"] {
          color: #007AFF;
        }

        .role-tab.active[onclick*="b"] {
          color: #007AFF;
        }

        .tab-icon {
          font-size: 1.1rem;
        }

        .role-badge {
          position: absolute;
          right: 20px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .role-badge.c1 {
          background: var(--accent-glow);
          color: var(--accent-primary);
          border: 1px solid var(--border-accent);
        }

        .role-badge.c2 {
          background: rgba(0, 122, 255, 0.15);
          color: #007AFF;
          border: 1px solid rgba(0, 122, 255, 0.2);
        }

        .role-badge.b {
          background: rgba(30, 138, 240, 0.15);
          color: #007AFF;
          border: 1px solid rgba(30, 138, 240, 0.2);
        }

        @media (max-width: 768px) {
          .role-tabs {
            width: 100%;
            justify-content: center;
          }

          .role-tab {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .tab-icon {
            font-size: 1rem;
          }

          .role-badge {
            position: static;
            margin-left: 12px;
          }

          .role-switcher {
            flex-wrap: wrap;
            gap: 12px;
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .role-tabs {
            gap: 2px;
            padding: 3px;
          }

          .role-tab {
            padding: 8px 12px;
            font-size: 0.75rem;
            flex: 1;
            justify-content: center;
          }

          .tab-icon {
            font-size: 0.9rem;
          }

          .role-badge {
            display: none;
          }

          .role-switcher {
            padding: 10px 8px;
            position: sticky;
            top: 0;
            z-index: 200;
          }
        }

        .app-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 20px;
          color: var(--text-tertiary);
          font-size: 0.8rem;
          border-top: 1px solid var(--glass-border);
          margin-top: 40px;
        }

        .footer-separator {
          color: var(--glass-border);
        }
      `}</style>
    </div>
  )
}

export default App
