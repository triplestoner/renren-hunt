import { useState } from 'react';

const tasks = [
  ['待响应派单', '4', '需在2小时内确认是否接单'],
  ['进行中推荐', '12', '3位候选人等待企业反馈'],
  ['待结算奖励', '¥83K', '2笔订单进入保证期'],
];

const messages = [
  ['王顾问', '[职位链接] 算法总监', '昨天', 'unread'],
  ['系统通知', '候选人张同学已进入面试阶段', '10:32', ''],
  ['奖励中心', '新人首推任务已完成，奖励待审核', '周一', ''],
];

const mineMenuItems = [
  { key: 'earnings', label: '收益中心', desc: '查看奖励、提现与结算记录' },
  { key: 'trust', label: '信任分', desc: '履约、反馈、资料完整度' },
  { key: 'profile', label: '入驻资料', desc: '推荐人身份与服务资料' },
  { key: 'agreements', label: '协议文档', desc: '平台规则、佣金与隐私协议' },
  { key: 'support', label: '客户服反馈', desc: '问题反馈与专属客服' },
];

const mineDetailConfig = {
  earnings: {
    title: '收益中心',
    summary: '¥83,000',
    subtitle: '可提现收益',
    stats: [
      ['待结算', '¥21K'],
      ['保证期中', '2单'],
      ['本月到账', '¥18K'],
    ],
    sections: [
      ['结算进度', ['AI架构师 · 待企业回款确认', '产品总监 · 保证期剩余 18 天', '后端资深工程师 · 发票待提交']],
      ['提现信息', ['银行卡：招商银行 **** 8266', '开票主体：李小牛个人服务', '预计到账：1-3个工作日']],
    ],
    action: '申请提现',
  },
  trust: {
    title: '信任分',
    summary: '92',
    subtitle: 'S级推荐人',
    stats: [
      ['履约率', '98%'],
      ['好评率', '99%'],
      ['资料完整', '96%'],
    ],
    sections: [
      ['加分项', ['48小时内响应派单 +8', '候选人推荐理由完整 +6', '合作顾问好评 +5']],
      ['待提升', ['补齐过往项目案例', '保持候选人流程跟进频率', '完善行业偏好标签']],
    ],
    action: '查看提升建议',
  },
  profile: {
    title: '入驻资料',
    summary: '已认证',
    subtitle: '推荐人资料完整度 86%',
    stats: [
      ['身份认证', '已通过'],
      ['服务行业', '3类'],
      ['人脉规模', '609'],
    ],
    sections: [
      ['基础资料', ['姓名：李小牛', '手机号：138****6626', '所在城市：上海']],
      ['推荐能力', ['擅长行业：互联网、AI、企业服务', '可推荐职能：技术、产品、运营', '服务方式：线上推荐 / 顾问协作']],
    ],
    action: '编辑资料',
  },
  agreements: {
    title: '协议文档',
    summary: '5份',
    subtitle: '已签署平台核心协议',
    stats: [
      ['待确认', '0'],
      ['已签署', '5'],
      ['更新提醒', '1'],
    ],
    sections: [
      ['常用协议', ['推荐人入驻协议', '佣金结算规则', '候选人信息授权书']],
      ['最近更新', ['平台隐私政策 2026-05-20', '推荐服务规范 2026-05-12', '发票与税务说明 2026-04-28']],
    ],
    action: '查看全部文档',
  },
  support: {
    title: '客户服反馈',
    summary: '1小时',
    subtitle: '平均响应时长',
    stats: [
      ['待处理', '1'],
      ['已解决', '12'],
      ['满意度', '98%'],
    ],
    sections: [
      ['快捷反馈', ['佣金结算问题', '职位信息不清晰', '顾问反馈超时']],
      ['客服通道', ['专属客服：小禾', '服务时间：9:00-21:00', '电话：400-888-8888']],
    ],
    action: '提交反馈',
  },
};

export function RecommenderTaskCenter() {
  return (
    <section className="mobile-simple-page">
      <div className="mobile-page-header">
        <span>Do Tasks</span>
        <h1>做任务</h1>
      </div>
      <div className="task-stack">
        {tasks.map(([title, value, desc]) => (
          <article className="task-card" key={title}>
            <div>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
            <span>{value}</span>
          </article>
        ))}
      </div>
      <div className="mobile-panel">
        <h2>今日优先处理</h2>
        <ol>
          <li>确认 4 个高匹配职位是否接单。</li>
          <li>补充 3 位候选人的推荐理由。</li>
          <li>催办 2 个超过 48 小时未反馈的企业。</li>
        </ol>
      </div>
      <MobilePageStyles />
    </section>
  );
}

export function RecommenderMessageCenter() {
  return (
    <section className="mobile-simple-page">
      <div className="message-tabs">
        <button>全部</button>
        <button className="active">未读</button>
        <button>对方未回</button>
      </div>
      <div className="message-search">请输入顾问昵称进行搜索</div>
      <div className="message-list">
        {messages.map(([name, text, time, status]) => (
          <article className="message-row" key={name}>
            <div className="message-avatar">{name[0]}</div>
            <div>
              <strong>{name}</strong>
              <p>{text}</p>
            </div>
            <span>{time}</span>
            {status === 'unread' && <em>1</em>}
          </article>
        ))}
      </div>
      <MobilePageStyles />
    </section>
  );
}

export function RecommenderMine() {
  const [activeDetail, setActiveDetail] = useState(null);
  const detail = activeDetail ? mineDetailConfig[activeDetail] : null;

  if (detail) {
    return (
      <section className="mobile-simple-page mine-detail-page">
        <header className="mine-detail-top">
          <button type="button" onClick={() => setActiveDetail(null)} aria-label="返回我的">‹</button>
          <strong>{detail.title}</strong>
          <button type="button" aria-label="更多操作">•••</button>
        </header>

        <section className={`mine-detail-hero ${activeDetail}`}>
          <span>{detail.subtitle}</span>
          <strong>{detail.summary}</strong>
        </section>

        <div className="mine-detail-stats">
          {detail.stats.map(([label, value]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="mine-detail-sections">
          {detail.sections.map(([title, rows]) => (
            <section className="mine-detail-card" key={title}>
              <h2>{title}</h2>
              {rows.map((row) => (
                <div className="mine-detail-row" key={row}>
                  <span>{row}</span>
                  <em>›</em>
                </div>
              ))}
            </section>
          ))}
        </div>

        <button type="button" className="mine-detail-primary">{detail.action}</button>
        <MobilePageStyles />
      </section>
    );
  }

  return (
    <section className="mobile-simple-page mine-page">
      <div className="mine-head">
        <img src="https://i.pravatar.cc/120?u=lixiaoniu" alt="李小牛" />
        <div>
          <h1>李小牛</h1>
          <p>S级推荐人 · 信任分 92</p>
        </div>
      </div>
      <div className="mine-metrics">
        <div><strong>12</strong><span>进行中</span></div>
        <div><strong>¥83K</strong><span>可提现</span></div>
        <div><strong>98%</strong><span>好评率</span></div>
      </div>
      <div className="mine-menu">
        {mineMenuItems.map(item => (
          <button key={item.key} type="button" onClick={() => setActiveDetail(item.key)}>
            <span className="mine-menu-text">
              <strong>{item.label}</strong>
              <em>{item.desc}</em>
            </span>
            <span className="mine-menu-arrow">›</span>
          </button>
        ))}
      </div>
      <MobilePageStyles />
    </section>
  );
}

function MobilePageStyles() {
  return (
    <style>{`
      .mobile-simple-page {
        max-width: 720px;
        margin: 0 auto;
        color: #1f2937;
      }

      .mobile-page-header {
        padding: 8px 0 18px;
      }

      .mobile-page-header span {
        color: #14bfa3;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .mobile-page-header h1 {
        font-size: 1.8rem;
        margin-top: 4px;
      }

      .task-stack {
        display: grid;
        gap: 12px;
      }

      .task-card,
      .mobile-panel,
      .message-row,
      .mine-head,
      .mine-metrics,
      .mine-menu {
        background: #fff;
        border: 1px solid rgba(15, 23, 42, 0.06);
        border-radius: 14px;
        box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
      }

      .task-card {
        min-height: 92px;
        padding: 18px;
        display: flex;
        justify-content: space-between;
        gap: 14px;
        align-items: center;
      }

      .task-card strong {
        display: block;
        font-size: 1.08rem;
      }

      .task-card p,
      .message-row p,
      .mine-head p,
      .mobile-panel li {
        color: #697386;
      }

      .task-card > span {
        color: #ff6b35;
        font-size: 1.55rem;
        font-weight: 850;
        white-space: nowrap;
      }

      .mobile-panel {
        margin-top: 14px;
        padding: 18px;
      }

      .mobile-panel h2 {
        margin-bottom: 12px;
      }

      .mobile-panel ol {
        padding-left: 22px;
        line-height: 1.9;
      }

      .message-tabs {
        display: flex;
        align-items: center;
        gap: 28px;
        padding: 8px 0 18px;
      }

      .message-tabs button {
        background: transparent;
        color: #4b5563;
        font-size: 1.18rem;
        font-weight: 700;
        min-height: 40px;
      }

      .message-tabs button.active {
        color: #111827;
        position: relative;
      }

      .message-tabs button.active::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 34px;
        height: 4px;
        border-radius: 999px;
        transform: translateX(-50%);
        background: #14bfa3;
      }

      .message-search {
        min-height: 50px;
        border: 2px solid #31c7b1;
        border-radius: 999px;
        color: #9aa3ad;
        display: flex;
        align-items: center;
        padding: 0 18px;
        margin-bottom: 16px;
      }

      .message-list {
        display: grid;
      }

      .message-row {
        position: relative;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
        box-shadow: none;
        min-height: 92px;
        padding: 16px 10px;
        display: grid;
        grid-template-columns: 54px minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
      }

      .message-avatar {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #e7f8f4;
        color: #12a78e;
        font-weight: 850;
      }

      .message-row > span {
        color: #8b929c;
        align-self: start;
      }

      .message-row em {
        position: absolute;
        right: 6px;
        top: 44px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #ef4444;
        color: #fff;
        font-style: normal;
        font-size: 0.8rem;
      }

      .mine-page {
        padding-top: 4px;
      }

      .mine-head {
        padding: 18px;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .mine-head img {
        width: 68px;
        height: 68px;
        border-radius: 50%;
      }

      .mine-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 12px;
        padding: 16px 8px;
        text-align: center;
      }

      .mine-metrics strong {
        display: block;
        color: #111827;
        font-size: 1.2rem;
      }

      .mine-metrics span {
        color: #7b8492;
        font-size: 0.84rem;
      }

      .mine-menu {
        margin-top: 12px;
        display: grid;
        overflow: hidden;
      }

      .mine-menu button {
        min-height: 68px;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        color: #243043;
        font-size: 1rem;
        border-bottom: 1px solid #f0f2f5;
      }

      .mine-menu button:last-child {
        border-bottom: 0;
      }

      .mine-menu-text {
        display: grid;
        gap: 4px;
        text-align: left;
      }

      .mine-menu-text strong {
        color: #243043;
        font-size: 1rem;
        font-weight: 850;
      }

      .mine-menu-text em {
        color: #8b929c;
        font-size: 0.82rem;
        font-style: normal;
        font-weight: 600;
      }

      .mine-menu-arrow {
        color: #9aa3ad;
        font-size: 1.4rem;
      }

      .mine-detail-page {
        min-height: 100vh;
        padding-bottom: 96px;
        background: #f4f7f8;
      }

      .mine-detail-top {
        position: sticky;
        top: 0;
        z-index: 30;
        display: grid;
        grid-template-columns: 42px minmax(0, 1fr) 76px;
        align-items: center;
        gap: 8px;
        margin: -12px -14px 14px;
        padding: 10px 14px 12px;
        background: rgba(255, 255, 255, 0.97);
        border-bottom: 1px solid #edf0f2;
      }

      .mine-detail-top button {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: transparent;
        color: #1f2a44;
        font-size: 1.8rem;
        line-height: 1;
      }

      .mine-detail-top button:last-child {
        width: 76px;
        border: 1px solid #eef0f2;
        border-radius: 999px;
        background: #fff;
        font-size: 1.2rem;
        letter-spacing: 2px;
      }

      .mine-detail-top strong {
        color: #222833;
        text-align: center;
        font-size: 1.22rem;
        font-weight: 900;
      }

      .mine-detail-hero {
        min-height: 132px;
        display: grid;
        align-content: center;
        gap: 8px;
        padding: 20px;
        border-radius: 12px;
        background: linear-gradient(135deg, #16cdb4, #6de5ce);
        color: #fff;
        box-shadow: 0 16px 28px rgba(22, 205, 180, 0.2);
      }

      .mine-detail-hero.trust {
        background: linear-gradient(135deg, #4f7cff, #8ec5ff);
      }

      .mine-detail-hero.profile {
        background: linear-gradient(135deg, #21b6a8, #9bd86f);
      }

      .mine-detail-hero.agreements {
        background: linear-gradient(135deg, #7a74ff, #c8a6ff);
      }

      .mine-detail-hero.support {
        background: linear-gradient(135deg, #ff8a4b, #ffc36b);
      }

      .mine-detail-hero span,
      .mine-detail-hero strong {
        display: block;
      }

      .mine-detail-hero span {
        font-size: 0.9rem;
        font-weight: 800;
        opacity: 0.88;
      }

      .mine-detail-hero strong {
        font-size: 2rem;
        line-height: 1;
        font-weight: 1000;
      }

      .mine-detail-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1px;
        margin-top: 12px;
        overflow: hidden;
        border-radius: 12px;
        background: #edf0f2;
      }

      .mine-detail-stats div {
        min-height: 76px;
        display: grid;
        place-items: center;
        align-content: center;
        gap: 4px;
        background: #fff;
      }

      .mine-detail-stats strong {
        color: #222833;
        font-size: 1.08rem;
        font-weight: 900;
      }

      .mine-detail-stats span {
        color: #7b8492;
        font-size: 0.8rem;
        font-weight: 700;
      }

      .mine-detail-sections {
        display: grid;
        gap: 12px;
        margin-top: 12px;
      }

      .mine-detail-card {
        padding: 16px;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
      }

      .mine-detail-card h2 {
        margin: 0 0 8px;
        color: #222833;
        font-size: 1.05rem;
        font-weight: 900;
      }

      .mine-detail-row {
        min-height: 46px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 18px;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid #f0f2f5;
      }

      .mine-detail-row:last-child {
        border-bottom: 0;
      }

      .mine-detail-row span {
        color: #4f5968;
        font-size: 0.94rem;
        font-weight: 700;
        line-height: 1.45;
      }

      .mine-detail-row em {
        color: #c5cbd3;
        font-size: 1.25rem;
        font-style: normal;
      }

      .mine-detail-primary {
        position: sticky;
        bottom: 18px;
        width: 100%;
        height: 52px;
        margin-top: 16px;
        border-radius: 999px;
        background: #16cdb4;
        color: #fff;
        font-size: 1rem;
        font-weight: 900;
        box-shadow: 0 12px 22px rgba(22, 205, 180, 0.22);
      }

      @media (max-width: 720px) {
        .mobile-simple-page {
          max-width: none;
          margin: -12px -14px 0;
          padding: 12px 14px calc(104px + env(safe-area-inset-bottom, 0px));
        }

        .mine-page {
          background: #f4f7f8;
        }

        .mine-menu {
          border-radius: 12px;
        }
      }
    `}</style>
  );
}
