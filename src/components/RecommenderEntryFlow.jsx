const stages = [
  {
    id: '01',
    title: '选择身份',
    label: '接单身份确认',
    text: '推荐人先确认以个人SOHO猎头、企业内推人或团队成员身份入驻。平台根据身份决定审核材料、接单权限和结算路径。',
    checks: ['个人身份', '擅长领域', '结算主体'],
  },
  {
    id: '02',
    title: '实名认证',
    label: '准入审核',
    text: '提交姓名、手机号、身份证明、从业经历和服务领域。人人猎只让可追溯、可联系、可管理的推荐人进入岗位大厅。',
    checks: ['实名资料', '从业年限', '行业标签'],
  },
  {
    id: '03',
    title: '签署规则',
    label: '服务协议',
    text: '确认候选人授权、推荐归属、保护期、佣金比例、保证期和违规处罚。接单前先把交易规则说清楚。',
    checks: ['候选人授权', '归属保护', '佣金规则'],
  },
  {
    id: '04',
    title: '平台审核',
    label: '运营复核',
    text: '运营核验资料与领域匹配度，通过后开通基础接单权限。新推荐人先小额限权，产生有效推荐后逐步放开。',
    checks: ['资料复核', '风险评级', '权限开通'],
  },
  {
    id: '05',
    title: '进入大厅',
    label: '接单与推荐',
    text: '查看已审核岗位，重点阅读岗位要求、企业反馈时效、佣金比例和保证期。推荐前系统会进行候选人查重。',
    checks: ['岗位详情', '候选人查重', '推荐理由'],
  },
  {
    id: '06',
    title: '跟进入职',
    label: '状态追踪',
    text: '推荐后可追踪企业查看、约面、offer、入职和保证期状态。满足规则后进入结算，异常由平台依据证据链裁决。',
    checks: ['面试反馈', '入职确认', '佣金结算'],
  },
]

const requirements = [
  ['基础资料', '姓名、手机号、身份证明、微信或邮箱联系方式'],
  ['专业资料', '服务行业、职能方向、代表案例、可覆盖城市'],
  ['合规承诺', '已获候选人授权，不盲推、不占坑、不绕过平台'],
  ['结算信息', '个人收款信息或企业主体信息，按合同规则结算'],
]

const operatingRules = [
  '新入驻推荐人默认每日接单和推荐数量受限，避免批量占坑。',
  '同一岗位同一候选人按最早有效推荐记录确认归属。',
  '候选人联系方式默认受保护，企业确认查看后才进入后续流程。',
  '长期无推荐、无反馈或虚假推荐会影响接单权限。',
]

export default function RecommenderEntryFlow() {
  return (
    <section className="entry-flow-page">
      <div className="entry-hero">
        <div>
          <div className="entry-kicker">RENRENLIE ONBOARDING</div>
          <h1>推荐人入驻流程</h1>
          <p>
            借鉴成熟猎头平台的接单准入逻辑，人人猎把推荐人入驻拆成身份确认、实名审核、规则签署、
            平台复核、接单推荐和结算追踪六个步骤，先建立可信交易边界，再开放岗位机会。
          </p>
        </div>
        <div className="entry-summary-panel">
          <span className="summary-label">准入目标</span>
          <strong>真实身份、真实推荐、真实结算</strong>
          <p>把“能不能接单”前置审核，把“谁推荐的、该给谁钱”沉淀为可追溯记录。</p>
        </div>
      </div>

      <div className="entry-metrics">
        <div>
          <span>06</span>
          <p>入驻步骤</p>
        </div>
        <div>
          <span>90天</span>
          <p>默认归属保护期</p>
        </div>
        <div>
          <span>哈希</span>
          <p>候选人查重方式</p>
        </div>
        <div>
          <span>限权</span>
          <p>新人风险控制</p>
        </div>
      </div>

      <div className="entry-section-title">
        <span>Process</span>
        <h2>从注册到可接单</h2>
      </div>

      <div className="stage-timeline">
        {stages.map((stage) => (
          <article className="stage-card" key={stage.id}>
            <div className="stage-index">{stage.id}</div>
            <div className="stage-body">
              <span>{stage.label}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
              <div className="stage-checks">
                {stage.checks.map((check) => (
                  <em key={check}>{check}</em>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="entry-grid">
        <div className="entry-panel">
          <div className="entry-section-title compact">
            <span>Materials</span>
            <h2>入驻需要准备什么</h2>
          </div>
          <div className="requirement-list">
            {requirements.map(([name, desc]) => (
              <div className="requirement-row" key={name}>
                <strong>{name}</strong>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="entry-panel dark">
          <div className="entry-section-title compact">
            <span>Rules</span>
            <h2>接单前必须知道的规则</h2>
          </div>
          <ol className="rules-list">
            {operatingRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="entry-action-strip">
        <div>
          <span>Ready to onboard</span>
          <strong>先审核，再接单；先授权，再推荐；先确认规则，再结算。</strong>
        </div>
        <button type="button">提交入驻申请</button>
      </div>

      <style>{`
        .entry-flow-page {
          min-height: 100vh;
          color: #172033;
        }

        .entry-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
          gap: 28px;
          align-items: stretch;
          margin-bottom: 24px;
        }

        .entry-kicker,
        .entry-section-title span,
        .summary-label,
        .entry-action-strip span {
          display: block;
          font-size: 0.76rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5f6f86;
          font-weight: 700;
        }

        .entry-hero h1 {
          font-size: clamp(2.4rem, 7vw, 5.8rem);
          line-height: 0.98;
          letter-spacing: -0.06em;
          margin: 16px 0 22px;
          max-width: 720px;
        }

        .entry-hero p {
          max-width: 780px;
          color: #536174;
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .entry-summary-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 280px;
          padding: 28px;
          border: 1px solid rgba(23, 32, 51, 0.1);
          border-radius: 8px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(234, 241, 249, 0.78)),
            repeating-linear-gradient(135deg, rgba(23, 32, 51, 0.05) 0 1px, transparent 1px 12px);
          box-shadow: 0 20px 50px rgba(33, 72, 114, 0.08);
        }

        .entry-summary-panel strong {
          display: block;
          font-size: 2rem;
          line-height: 1.18;
          letter-spacing: -0.04em;
          margin: 32px 0 16px;
        }

        .entry-summary-panel p {
          color: #56657a;
          line-height: 1.75;
        }

        .entry-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 34px;
        }

        .entry-metrics div {
          min-height: 118px;
          padding: 20px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(23, 32, 51, 0.08);
          box-shadow: 0 10px 26px rgba(33, 72, 114, 0.05);
        }

        .entry-metrics span {
          display: block;
          font-size: 2rem;
          line-height: 1;
          font-weight: 750;
          letter-spacing: -0.04em;
          color: #0f4e88;
          margin-bottom: 16px;
        }

        .entry-metrics p {
          color: #5f6f86;
          font-size: 0.92rem;
        }

        .entry-section-title {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 24px;
          padding-top: 22px;
          margin-bottom: 18px;
          border-top: 1px solid rgba(23, 32, 51, 0.12);
        }

        .entry-section-title h2 {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          letter-spacing: -0.04em;
        }

        .entry-section-title.compact {
          display: block;
          margin-bottom: 20px;
        }

        .entry-section-title.compact h2 {
          margin-top: 8px;
          font-size: 1.5rem;
        }

        .stage-timeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 34px;
        }

        .stage-card {
          position: relative;
          min-height: 280px;
          padding: 22px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(23, 32, 51, 0.08);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(33, 72, 114, 0.05);
        }

        .stage-card::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 4px;
          background: linear-gradient(90deg, #0f4e88, #54a3d8);
        }

        .stage-index {
          font-size: 4rem;
          line-height: 0.85;
          font-weight: 800;
          letter-spacing: -0.08em;
          color: rgba(15, 78, 136, 0.14);
          margin-bottom: 24px;
        }

        .stage-body span {
          display: inline-block;
          margin-bottom: 8px;
          color: #0f4e88;
          font-weight: 700;
          font-size: 0.82rem;
        }

        .stage-body h3 {
          margin-bottom: 12px;
          font-size: 1.35rem;
          letter-spacing: -0.03em;
        }

        .stage-body p {
          color: #5b687a;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .stage-checks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .stage-checks em {
          padding: 6px 10px;
          border-radius: 999px;
          background: #edf5fb;
          color: #245d8d;
          font-style: normal;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .entry-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }

        .entry-panel {
          padding: 26px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(23, 32, 51, 0.08);
          box-shadow: 0 12px 32px rgba(33, 72, 114, 0.05);
        }

        .entry-panel.dark {
          background: #172033;
          color: #f6fbff;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .entry-panel.dark .entry-section-title,
        .entry-panel.dark .requirement-row {
          border-color: rgba(255, 255, 255, 0.14);
        }

        .entry-panel.dark .entry-section-title span,
        .entry-panel.dark li {
          color: rgba(246, 251, 255, 0.72);
        }

        .requirement-list {
          display: grid;
          gap: 0;
        }

        .requirement-row {
          display: grid;
          grid-template-columns: 92px 1fr;
          gap: 18px;
          padding: 16px 0;
          border-top: 1px solid rgba(23, 32, 51, 0.08);
        }

        .requirement-row strong {
          color: #0f4e88;
        }

        .requirement-row p {
          color: #5b687a;
          line-height: 1.7;
        }

        .rules-list {
          margin: 0;
          padding-left: 22px;
          display: grid;
          gap: 18px;
        }

        .rules-list li {
          line-height: 1.75;
          padding-left: 4px;
        }

        .entry-action-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 26px;
          border-radius: 8px;
          background: linear-gradient(135deg, #d7ecfa, #f8fbff);
          border: 1px solid rgba(15, 78, 136, 0.14);
        }

        .entry-action-strip strong {
          display: block;
          margin-top: 8px;
          font-size: 1.2rem;
          letter-spacing: -0.02em;
        }

        .entry-action-strip button {
          flex: 0 0 auto;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 8px;
          color: #ffffff;
          background: #0f4e88;
          font-weight: 700;
          box-shadow: 0 14px 30px rgba(15, 78, 136, 0.18);
        }

        .entry-action-strip button:hover {
          transform: translateY(-1px);
          background: #0c416f;
        }

        @media (max-width: 1100px) {
          .entry-hero,
          .entry-grid {
            grid-template-columns: 1fr;
          }

          .stage-timeline {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          .entry-flow-page {
            padding-top: 56px;
          }

          .entry-metrics,
          .stage-timeline {
            grid-template-columns: 1fr;
          }

          .entry-hero h1 {
            font-size: 3rem;
          }

          .entry-summary-panel,
          .stage-card,
          .entry-panel,
          .entry-action-strip {
            padding: 20px;
          }

          .entry-action-strip {
            align-items: stretch;
            flex-direction: column;
          }

          .requirement-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  )
}
