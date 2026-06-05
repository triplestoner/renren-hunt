const rewardRows = [
  ['完成实名', '绑定手机号 + 职业身份', '新人身份奖', '20 元京东卡'],
  ['48 小时首推', '完成 1 位候选人推荐', '首推行动奖', '50 元推荐券'],
  ['首个有效面试', '候选人进入面试流程', '交付进阶奖', '200 元现金券'],
];

const inviteRows = [
  ['邀请推荐人', '好友实名并完成首推', '你得 50 元券，好友得 20 元卡'],
  ['邀请企业发单', '企业认证并发布首个岗位', '你得 200 元发单券'],
  ['邀请猎企入驻', '猎企认证并完成团队建档', '你得 300 元增长包'],
];

const journey = [
  '报名活动',
  '登录人人猎',
  '实名建档',
  '进入职位大厅',
  '完成首推',
  '奖励中心',
];

export default function NewUserCampaign({ onGoHall, onGoEarnings, onGoReferrals }) {
  return (
    <main className="campaign-page">
      <section className="campaign-hero">
        <div className="campaign-nav">
          <div className="campaign-brand">
            <img src="/logo.png" alt="人人猎" />
            <span>人人猎</span>
          </div>
          <div className="campaign-nav-actions">
            <button onClick={onGoHall}>职位大厅</button>
            <button onClick={onGoEarnings}>奖励中心</button>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="campaign-kicker">新用户专享 · 入驻与推荐礼</span>
            <h1>新人福利直通车</h1>
            <p>
              把你的人脉、候选人线索和企业职位接入人人猎，完成实名、首推和邀请任务后，
              即可解锁新人奖励与长期推荐收益。
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={onGoHall}>立即报名并接单</button>
              <button className="secondary-action" onClick={onGoReferrals}>复制邀请链路</button>
            </div>
          </div>

          <div className="reward-vault" aria-label="新人奖励概览">
            <div className="vault-lid" />
            <div className="voucher voucher-lg">¥200</div>
            <div className="voucher voucher-sm">¥50</div>
            <div className="coin coin-a">¥</div>
            <div className="coin coin-b">猎</div>
            <div className="vault-body">
              <span>新人任务包</span>
              <strong>最高 570 元权益</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="campaign-panel intro-panel">
        <span className="panel-label">活动时间</span>
        <strong>即日起至 2026 年 12 月 31 日</strong>
        <p>报名后完成对应任务，奖励将在审核通过后进入个人奖励中心。</p>
      </section>

      <section className="campaign-panel">
        <div className="panel-heading">
          <span className="panel-label">福利一</span>
          <h2>实名首推，好礼相伴</h2>
          <p>面向首次加入人人猎的推荐人和兼职猎头，目标是尽快完成可信身份和第一次有效推荐。</p>
        </div>
        <div className="reward-table">
          {rewardRows.map(([task, condition, reward, value]) => (
            <div className="reward-row" key={task}>
              <span>{task}</span>
              <span>{condition}</span>
              <span>{reward}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="campaign-panel">
        <div className="panel-heading">
          <span className="panel-label">福利二</span>
          <h2>猎友推荐，礼遇加倍</h2>
          <p>用专属链接邀请推荐人、企业或猎企入驻，双方完成关键行为后自动计入奖励。</p>
        </div>
        <div className="invite-grid">
          {inviteRows.map(([role, condition, value]) => (
            <article className="invite-card" key={role}>
              <span>{role}</span>
              <h3>{condition}</h3>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="campaign-panel">
        <div className="panel-heading">
          <span className="panel-label">报名路径</span>
          <h2>六步完成新人任务</h2>
        </div>
        <div className="journey">
          {journey.map((item, index) => (
            <div className="journey-step" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
        <div className="route-preview">
          <div>
            <span>个人中心</span>
            <strong>专属邀请链接</strong>
          </div>
          <div>
            <span>职位大厅</span>
            <strong>一键推荐候选人</strong>
          </div>
          <div>
            <span>奖励中心</span>
            <strong>查看发放状态</strong>
          </div>
        </div>
      </section>

      <section className="campaign-panel rules-panel">
        <div className="panel-heading">
          <span className="panel-label">规则说明</span>
          <h2>奖励发放规则</h2>
        </div>
        <ol>
          <li>同一手机号、设备或实名主体仅能参与一次新人任务。</li>
          <li>推荐奖励以候选人进入有效流程或企业完成认证后的平台记录为准。</li>
          <li>虚假资料、重复报名、刷量邀请或恶意撤回推荐将取消奖励资格。</li>
          <li>现金券和权益券可在奖励中心查看，具体到账以审核结果为准。</li>
        </ol>
      </section>

      <style>{`
        .campaign-page {
          min-height: 100vh;
          color: #2f241b;
          background:
            linear-gradient(180deg, #fff2c6 0%, #ffb45f 32%, #ff7040 100%);
          overflow: hidden;
        }

        .campaign-hero {
          position: relative;
          min-height: 640px;
          padding: 28px min(7vw, 88px) 96px;
          background:
            radial-gradient(circle at 78% 24%, rgba(255, 255, 255, 0.75) 0 10%, transparent 28%),
            radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.5) 0 9%, transparent 24%),
            linear-gradient(135deg, #ff982c 0%, #ffd97b 52%, #fff5ce 100%);
        }

        .campaign-hero::before,
        .campaign-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .campaign-hero::before {
          background-image:
            linear-gradient(45deg, rgba(255, 255, 255, 0.22) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255, 255, 255, 0.22) 25%, transparent 25%);
          background-size: 26px 26px;
          mask-image: linear-gradient(180deg, black 0, transparent 32%);
        }

        .campaign-nav {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .campaign-brand,
        .campaign-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .campaign-brand img {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: #fff;
        }

        .campaign-brand span {
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          text-shadow: 0 2px 8px rgba(166, 60, 0, 0.25);
        }

        .campaign-nav-actions button,
        .secondary-action {
          min-height: 42px;
          padding: 0 18px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-weight: 800;
          backdrop-filter: blur(12px);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 430px);
          align-items: center;
          gap: min(8vw, 96px);
          max-width: 1120px;
          margin: 78px auto 0;
        }

        .campaign-kicker,
        .panel-label {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          min-height: 30px;
          padding: 4px 12px;
          border-radius: 8px;
          background: #ff5c2f;
          color: #fff9e8;
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0;
        }

        .hero-copy h1 {
          margin: 18px 0 12px;
          color: #25201d;
          font-size: clamp(3.1rem, 8vw, 6.8rem);
          font-weight: 1000;
          line-height: 0.9;
          letter-spacing: 0;
          text-shadow: 8px 8px 0 rgba(255, 255, 255, 0.72);
        }

        .hero-copy p {
          max-width: 620px;
          color: #6b3517;
          font-size: 1.08rem;
          font-weight: 700;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        .primary-action {
          min-height: 50px;
          padding: 0 28px;
          border-radius: 8px;
          color: #fff;
          background: linear-gradient(180deg, #ff7250, #e93018);
          box-shadow: 0 14px 24px rgba(205, 44, 13, 0.28);
          font-weight: 900;
          font-size: 1rem;
        }

        .secondary-action {
          color: #8d300f;
          background: rgba(255, 255, 255, 0.55);
          border-color: rgba(255, 255, 255, 0.95);
        }

        .reward-vault {
          position: relative;
          min-height: 390px;
          filter: drop-shadow(0 36px 44px rgba(181, 63, 0, 0.26));
        }

        .vault-lid {
          position: absolute;
          left: 50%;
          top: 58px;
          width: 250px;
          height: 82px;
          border-radius: 18px;
          background: linear-gradient(135deg, #ffb05e, #ff4e2e);
          transform: translateX(-54%) rotate(-17deg);
        }

        .vault-body {
          position: absolute;
          left: 50%;
          bottom: 46px;
          width: 320px;
          height: 210px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 32px 32px 48px 48px;
          background: linear-gradient(160deg, #ffb34d, #ff5a32 68%, #f03a22);
          color: #fff;
          transform: translateX(-50%);
        }

        .vault-body span {
          font-weight: 800;
          opacity: 0.9;
        }

        .vault-body strong {
          font-size: 2rem;
          font-weight: 1000;
        }

        .voucher,
        .coin {
          position: absolute;
          z-index: 2;
          display: grid;
          place-items: center;
          color: #fff9dc;
          font-weight: 1000;
        }

        .voucher {
          width: 128px;
          height: 82px;
          border-radius: 10px;
          background: linear-gradient(160deg, #ffefe0, #ff6750);
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.28);
        }

        .voucher-lg {
          top: 106px;
          right: 64px;
          font-size: 1.7rem;
          transform: rotate(8deg);
        }

        .voucher-sm {
          top: 126px;
          left: 42px;
          font-size: 1.4rem;
          transform: rotate(-10deg);
        }

        .coin {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd86a, #f79d1b);
          border: 5px solid #fff1a2;
          box-shadow: 0 10px 20px rgba(175, 84, 0, 0.25);
        }

        .coin-a { left: 118px; top: 178px; }
        .coin-b { right: 94px; bottom: 102px; }

        .campaign-panel {
          position: relative;
          max-width: 980px;
          margin: -42px auto 78px;
          padding: 34px;
          border-radius: 8px;
          background: rgba(255, 250, 235, 0.95);
          box-shadow: 0 22px 48px rgba(142, 46, 11, 0.2);
        }

        .campaign-panel + .campaign-panel {
          margin-top: 0;
        }

        .intro-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          text-align: center;
        }

        .intro-panel strong {
          max-width: 100%;
          color: #ef3d1c;
          font-size: 1.35rem;
          overflow-wrap: anywhere;
        }

        .intro-panel p {
          width: 100%;
          color: #74452d;
          font-weight: 700;
        }

        .panel-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          text-align: center;
        }

        .panel-heading h2 {
          color: #f04a24;
          font-size: 1.75rem;
          font-weight: 1000;
        }

        .panel-heading p {
          max-width: 710px;
          color: #70452d;
          font-weight: 700;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .reward-table {
          overflow: hidden;
          border: 1px solid #ffd2a9;
          border-radius: 8px;
        }

        .reward-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr 1fr;
          min-height: 64px;
          background: #fff6dc;
        }

        .reward-row:nth-child(2n) {
          background: #ffedcb;
        }

        .reward-row span,
        .reward-row strong {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-right: 1px solid #ffd2a9;
          color: #61351f;
          text-align: center;
          font-size: 0.94rem;
          font-weight: 800;
        }

        .reward-row strong {
          border-right: 0;
          color: #f0391d;
          font-size: 1rem;
        }

        .invite-grid,
        .route-preview {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .invite-card,
        .route-preview div {
          min-height: 136px;
          padding: 20px;
          border: 1px solid #ffd2a9;
          border-radius: 8px;
          background: #fff6dc;
          text-align: center;
        }

        .invite-card span,
        .route-preview span {
          color: #a75a1d;
          font-size: 0.9rem;
          font-weight: 900;
        }

        .invite-card h3,
        .route-preview strong {
          display: block;
          margin: 10px 0;
          color: #3a271c;
          font-weight: 1000;
        }

        .invite-card p {
          color: #f0391d;
          font-weight: 900;
        }

        .journey {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 22px;
        }

        .journey-step {
          position: relative;
          min-height: 92px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 8px;
          background: #ffe8bd;
          text-align: center;
        }

        .journey-step span {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #ff8a3c;
          color: #fff;
          font-weight: 1000;
        }

        .journey-step strong {
          color: #55311f;
          font-size: 0.95rem;
        }

        .rules-panel ol {
          max-width: 820px;
          margin: 0 auto;
          padding-left: 22px;
          color: #583826;
          font-weight: 700;
          line-height: 1.9;
        }

        @media (max-width: 860px) {
          .campaign-hero {
            padding: 22px 18px 70px;
          }

          .campaign-nav {
            align-items: flex-start;
          }

          .campaign-nav-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 48px;
          }

          .hero-copy {
            min-width: 0;
          }

          .hero-copy h1 {
            font-size: clamp(2.45rem, 11vw, 3rem);
          }

          .hero-copy p {
            max-width: 100%;
            font-size: 1rem;
            word-break: break-word;
          }

          .reward-vault {
            min-height: 310px;
            transform: scale(0.88);
            transform-origin: top center;
          }

          .campaign-panel {
            width: calc(100% - 28px);
            margin-bottom: 46px;
            padding: 22px 16px;
          }

          .intro-panel {
            flex-direction: column;
          }

          .intro-panel strong {
            font-size: 1.12rem;
            line-height: 1.45;
            word-break: break-word;
          }

          .panel-heading h2 {
            font-size: 1.5rem;
          }

          .reward-row,
          .invite-grid,
          .route-preview,
          .journey {
            grid-template-columns: 1fr;
          }

          .reward-row span,
          .reward-row strong {
            justify-content: flex-start;
            border-right: 0;
            border-bottom: 1px solid #ffd2a9;
            text-align: left;
          }

          .reward-row strong {
            border-bottom: 0;
          }
        }
      `}</style>
    </main>
  );
}
