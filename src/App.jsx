import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import JobHall from './components/JobHall'
import TrustScore from './components/TrustScore'
import EarningsCenter from './components/EarningsCenter'
import Referrals from './components/Referrals'
import Circles from './components/Circles'
import CandidatePortal from './components/CandidatePortal'
import EmployerPortal from './components/EmployerPortal'
import RecommenderOnboarding from './components/RecommenderOnboarding'
import AdminPortal from './admin/AdminPortal'
import NewUserCampaign from './components/NewUserCampaign'
import RecommenderEntryFlow from './components/RecommenderEntryFlow'
import RecommenderAuthFlow from './components/RecommenderAuthFlow'
import { RecommenderMessageCenter, RecommenderMine, RecommenderTaskCenter } from './components/RecommenderMobilePages'

const recommenderMobileNavItems = [
  { id: 'home', label: '首页', icon: 'home', aliases: ['hall', 'campaign'] },
  { id: 'recommend', label: '做推荐', icon: 'recommend', aliases: ['referrals', 'circles'] },
  { id: 'tasks', label: '做任务', icon: 'tasks', aliases: ['onboarding', 'trust', 'earnings'] },
  { id: 'messages', label: '消息', icon: 'messages', aliases: [] },
  { id: 'mine', label: '我的', icon: 'mine', aliases: [] },
]

function RecommenderNavIcon({ name }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'home':
      return (
        <svg {...commonProps}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10.5V20h13v-9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      )
    case 'recommend':
      return (
        <svg {...commonProps}>
          <path d="M7 12.5 10.5 16 17 9" />
          <path d="M4.5 19.5h15" />
          <path d="M6 5.5h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
        </svg>
      )
    case 'tasks':
      return (
        <svg {...commonProps}>
          <path d="M8 6h10" />
          <path d="M8 12h10" />
          <path d="M8 18h7" />
          <path d="m3.5 6 1 1 2-2" />
          <path d="m3.5 12 1 1 2-2" />
          <path d="m3.5 18 1 1 2-2" />
        </svg>
      )
    case 'messages':
      return (
        <svg {...commonProps}>
          <path d="M4 5.5h16v11H8l-4 3v-14Z" />
          <path d="M8 10h8" />
          <path d="M8 13h5" />
        </svg>
      )
    case 'mine':
      return (
        <svg {...commonProps}>
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </svg>
      )
    default:
      return null
  }
}

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

const getInitialTab = () => {
  if (typeof window === 'undefined') {
    return 'home'
  }
  const tab = new URLSearchParams(window.location.search).get('tab')
  return ['campaign', 'onboarding', 'hall', 'home', 'recommend', 'tasks', 'messages', 'mine'].includes(tab) ? tab : 'home'
}

const getInitialRecommenderAuth = () => {
  if (typeof window === 'undefined') {
    return false
  }
  const params = new URLSearchParams(window.location.search)
  if (params.get('resetAuth') === '1') {
    window.localStorage.removeItem('renrenlie_recommender_authed')
    return false
  }
  return params.get('authed') === '1' || window.localStorage.getItem('renrenlie_recommender_authed') === 'true'
}

const isMobilePreview = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return new URLSearchParams(window.location.search).get('mobile') === '1'
}

function App() {
  const forceMobile = isMobilePreview()
  const forceResetAuth = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('resetAuth') === '1'
  const [isRecommenderOnboarded, setIsRecommenderOnboarded] = useState(true)
  const [isRecommenderAuthed, setIsRecommenderAuthed] = useState(getInitialRecommenderAuth)
  const [activeRole, setActiveRole] = useState('c1')
  const [activeTab, setActiveTab] = useState(getInitialTab)
  const [publishedJobs, setPublishedJobs] = useState(initialJobs)
  const [c2ReceivedRecommendations, setC2ReceivedRecommendations] = useState([])
  const [employerCandidates, setEmployerCandidates] = useState([])
  const [submittedRecommendations, setSubmittedRecommendations] = useState([])
  const [showAdminPortal, setShowAdminPortal] = useState(false)

  useEffect(() => {
    if (forceResetAuth) {
      window.localStorage.removeItem('renrenlie_recommender_authed')
    }
  }, [forceResetAuth])

  const effectiveRecommenderAuthed = forceResetAuth ? false : isRecommenderAuthed

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
      case 'campaign':
        return (
          <NewUserCampaign
            onGoHall={() => setActiveTab('hall')}
            onGoEarnings={() => setActiveTab('earnings')}
            onGoReferrals={() => setActiveTab('referrals')}
          />
        )
      case 'onboarding':
        return <RecommenderEntryFlow />
      case 'hall':
      case 'home':
        return <JobHall publishedJobs={publishedJobs} onRecommend={handleRecommend} submittedRecommendations={submittedRecommendations} />
      case 'referrals':
      case 'recommend':
        return <Referrals />
      case 'tasks':
        return <RecommenderTaskCenter />
      case 'messages':
        return <RecommenderMessageCenter />
      case 'mine':
        return <RecommenderMine />
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

  const renderRecommenderMobileNav = () => {
    if (activeRole !== 'c1') {
      return null
    }
    return (
      <nav className="app-mobile-bottom-nav" aria-label="推荐人移动端导航">
        {recommenderMobileNavItems.map((item) => {
          const isActive = activeTab === item.id || item.aliases.includes(activeTab)
          return (
            <button
              key={item.id}
              type="button"
              className={`app-mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="app-mobile-nav-icon">
                <RecommenderNavIcon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    )
  }

  const renderLayout = (children) => {
    if (activeRole === 'c1') {
      if (!effectiveRecommenderAuthed) {
        return <RecommenderAuthFlow onComplete={() => {
          window.localStorage.setItem('renrenlie_recommender_authed', 'true')
          if (forceResetAuth) {
            const nextUrl = new URL(window.location.href)
            nextUrl.searchParams.delete('resetAuth')
            nextUrl.searchParams.set('tab', 'home')
            window.history.replaceState({}, '', nextUrl)
          }
          setIsRecommenderAuthed(true)
          setActiveTab('home')
        }} />
      }
      if (activeTab === 'campaign') {
        return children
      }
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

  if (showAdminPortal) {
    return <AdminPortal onRoleSwitch={(role) => {
      setShowAdminPortal(false);
      setActiveRole(role);
      if (role === 'c1') {
        setActiveTab('hall');
      } else if (role === 'c2') {
        setActiveTab('offers');
      } else if (role === 'b') {
        setActiveTab('candidates');
      }
    }} />;
  }

  return (
    <div className={`app ${forceMobile ? 'force-mobile' : ''}`}>
      <header className="role-switcher">
        <div className="role-tabs">
          <button
            className={`role-tab ${activeRole === 'c1' && activeTab === 'campaign' ? 'active' : ''}`}
            onClick={() => { setActiveRole('c1'); setActiveTab('campaign'); }}
          >
            <span className="tab-icon">🎁</span>
            新人福利站
          </button>
          <button
            className={`role-tab ${activeRole === 'c1' && activeTab !== 'campaign' ? 'active' : ''}`}
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
          <button
            className="role-tab admin-tab"
            onClick={() => setShowAdminPortal(true)}
          >
            <span className="tab-icon">🔐</span>
            管理后台
          </button>
        </div>
        {renderRoleBadge()}
      </header>

      {activeRole === 'c1' && renderLayout(renderC1Content())}
      {activeRole === 'c2' && <CandidatePortal onSwitchRole={handleSwitchRole} recommendations={c2ReceivedRecommendations} onAccept={handleC2Accept} />}
      {activeRole === 'b' && <EmployerPortal publishedJobs={publishedJobs} setPublishedJobs={setPublishedJobs} />}
      {renderRecommenderMobileNav()}

      <footer className="app-footer">
        <span>最后更新：2026-05-13 16:37:04</span>
        <span className="footer-separator">|</span>
        <span>by lql</span>
      </footer>

      <style>{`
        .app {
          min-height: 100vh;
        }

        .app-mobile-bottom-nav {
          display: none;
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

        .admin-tab {
          color: var(--text-secondary);
        }

        .admin-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
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
          .app {
            background: #f7f8fa;
            padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
            width: min(390px, 100vw);
            max-width: 100vw;
            margin: 0;
            overflow-x: hidden;
          }

          .role-switcher {
            display: none;
          }

          .app-mobile-bottom-nav {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 500;
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 2px;
            width: min(390px, 100vw);
            max-width: 100vw;
            box-sizing: border-box;
            padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
            background: rgba(255, 255, 255, 0.98);
            border-top: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 -10px 30px rgba(15, 23, 42, 0.1);
          }

          .app-mobile-nav-item {
            min-height: 60px;
            border-radius: 14px;
            background: transparent;
            color: #8b929c;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            font-size: 0.78rem;
            font-weight: 650;
            min-width: 0;
          }

          .app-mobile-nav-icon {
            width: 30px;
            height: 30px;
            display: grid;
            place-items: center;
            color: #1f2a44;
            background: #f4f6f8;
            border-radius: 12px;
            line-height: 1;
            transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
          }

          .app-mobile-nav-icon svg {
            width: 22px;
            height: 22px;
          }

          .app-mobile-nav-item.active {
            color: #16c3aa;
          }

          .app-mobile-nav-item.active .app-mobile-nav-icon {
            color: #16c3aa;
            background: #e8fbf6;
            border-radius: 10px;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(22, 195, 170, 0.16);
          }

          .role-tabs {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
          }

          .role-tab {
            flex: 0 0 auto;
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

          .app-footer {
            display: none;
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
            flex: 0 0 auto;
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

        .admin-link {
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0;
          transition: color 0.2s;
        }

        .admin-link:hover {
          color: #667eea;
        }

        .app.force-mobile {
          width: min(390px, 100vw);
          max-width: 100vw;
          min-height: 100vh;
          margin: 0;
          overflow-x: hidden;
          background: #f7f8fa;
          padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
        }

        .app.force-mobile .role-switcher,
        .app.force-mobile .app-footer {
          display: none;
        }

        .app.force-mobile .layout {
          display: block;
          background: #f7f8fa;
        }

        .app.force-mobile .sidebar,
        .app.force-mobile .mobile-menu-btn {
          display: none;
        }

        .app.force-mobile .main-content {
          margin-left: 0;
          min-height: 100vh;
          padding: calc(12px + env(safe-area-inset-top, 0px)) 14px calc(96px + env(safe-area-inset-bottom, 0px));
        }

        .app.force-mobile .app-mobile-bottom-nav {
          position: fixed;
          left: 0;
          right: auto;
          bottom: 0;
          z-index: 500;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 2px;
          width: min(390px, 100vw);
          max-width: 100vw;
          box-sizing: border-box;
          padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
          background: #fff;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 -10px 30px rgba(15, 23, 42, 0.1);
        }

        .app.force-mobile .app-mobile-nav-item {
          min-height: 60px;
          border-radius: 14px;
          background: transparent;
          color: #8b929c;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          font-size: 0.78rem;
          font-weight: 650;
          min-width: 0;
        }

        .app.force-mobile .app-mobile-nav-icon {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          color: #1f2a44;
          background: #f4f6f8;
          border-radius: 12px;
          line-height: 1;
          transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
        }

        .app.force-mobile .app-mobile-nav-icon svg {
          width: 22px;
          height: 22px;
        }

        .app.force-mobile .app-mobile-nav-item.active {
          color: #16c3aa;
        }

        .app.force-mobile .app-mobile-nav-item.active .app-mobile-nav-icon {
          color: #16c3aa;
          background: #e8fbf6;
          border-radius: 10px;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(22, 195, 170, 0.16);
        }
      `}</style>
    </div>
  )
}

export default App
