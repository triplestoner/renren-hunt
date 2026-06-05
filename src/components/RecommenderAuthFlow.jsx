import { useState } from 'react';

const identityOptions = ['个人SOHO猎头', '企业内推人', '兼职推荐人'];
const industryOptions = ['互联网/IT', '人工智能', '金融科技', '智能制造', '医药健康'];

export default function RecommenderAuthFlow({ onComplete }) {
  const [mode, setMode] = useState('quick');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPhoneSheet, setShowPhoneSheet] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    identity: identityOptions[0],
    industry: industryOptions[0],
  });
  const [error, setError] = useState('');

  const canSubmit = phone.trim().length >= 6 && agreed && (mode !== 'password' || password.trim().length >= 4);

  const completeAuth = () => {
    if (mode === 'quick') {
      setError('');
      setShowPhoneSheet(true);
      return;
    }
    if (!agreed) {
      setError('请先阅读并同意用户服务协议和隐私政策');
      return;
    }
    if (mode === 'register' && registerStep === 1) {
      if (!phone.trim() || !code.trim()) {
        setError('请填写手机号和验证码');
        return;
      }
      setError('');
      setRegisterStep(2);
      return;
    }
    if (mode === 'register' && registerStep === 2) {
      if (!profile.name.trim()) {
        setError('请填写真实姓名');
        return;
      }
      onComplete({ phone, ...profile });
      return;
    }
    if (!canSubmit) {
      setError(mode === 'password' ? '请填写手机号、密码并同意协议' : '请填写手机号并同意协议');
      return;
    }
    onComplete({ phone, name: profile.name || '李小牛', identity: profile.identity, industry: profile.industry });
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setRegisterStep(1);
  };

  return (
    <section className="mobile-auth-page">
      <div className="auth-shell">
        <button className="auth-back" type="button" aria-label="返回">‹</button>
        <div className="auth-menu" aria-label="更多操作">
          <span />
          <span />
          <span />
        </div>

        <div className="auth-brand-hero">
          <div className="auth-orbit">
            <span className="orbit-dot dot-a">荐</span>
            <span className="orbit-dot dot-b">佣</span>
            <span className="orbit-dot dot-c">单</span>
            <img src="/logo.png" alt="人人猎" />
          </div>
          <h1>人人猎</h1>
          <p>想成单 就成单 推荐人才上人人猎</p>
        </div>

        <div className="auth-card">
          <div className="auth-tabs" role="tablist" aria-label="登录注册方式">
            <button className={mode === 'quick' ? 'active' : ''} onClick={() => switchMode('quick')} type="button">快捷登录</button>
            <button className={mode === 'password' ? 'active' : ''} onClick={() => switchMode('password')} type="button">密码登录</button>
            <button className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')} type="button">首次注册</button>
          </div>

          {mode === 'register' && (
            <div className="register-progress">
              <span className={registerStep >= 1 ? 'active' : ''}>验证手机号</span>
              <i />
              <span className={registerStep >= 2 ? 'active' : ''}>完善身份</span>
            </div>
          )}

          {mode === 'quick' && (
            <div className="quick-login-panel">
              <strong>手机号一键授权登录</strong>
              <p>点击下方按钮后，系统将弹出手机号授权确认。确认后直接进入推荐人首页。</p>
            </div>
          )}

          {mode !== 'quick' && (mode !== 'register' || registerStep === 1) && (
            <div className="auth-fields">
              <label>
                <span>手机号</span>
                <input
                  inputMode="tel"
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </label>
              {mode !== 'password' && (
                <label>
                  <span>验证码</span>
                  <div className="code-row">
                    <input
                      inputMode="numeric"
                      placeholder="请输入验证码"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                    />
                    <button type="button">获取验证码</button>
                  </div>
                </label>
              )}
              {mode === 'password' && (
                <label>
                  <span>密码</span>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </label>
              )}
            </div>
          )}

          {mode === 'register' && registerStep === 2 && (
            <div className="auth-fields">
              <label>
                <span>真实姓名</span>
                <input
                  placeholder="用于接单实名认证"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                />
              </label>
              <label>
                <span>接单身份</span>
                <select value={profile.identity} onChange={e => setProfile({ ...profile, identity: e.target.value })}>
                  {identityOptions.map(item => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span>擅长领域</span>
                <select value={profile.industry} onChange={e => setProfile({ ...profile, industry: e.target.value })}>
                  {industryOptions.map(item => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          )}

          <label className="agreement-row">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
            <span>我已阅读并同意 <b>人人猎用户服务协议</b>、<b>隐私政策</b></span>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-primary" type="button" onClick={completeAuth}>
            {mode === 'register' && registerStep === 1 ? '下一步' : mode === 'register' ? '完成注册并进入' : '手机号快捷登录'}
          </button>
          <button className="auth-phone-sheet" type="button" onClick={() => setShowPhoneSheet(true)}>
            使用上次提供的手机号
          </button>
        </div>
      </div>

      {showPhoneSheet && (
        <div className="phone-sheet-mask" onClick={() => setShowPhoneSheet(false)}>
          <div className="phone-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-brand">
              <img src="/logo.png" alt="" />
              <strong>人人猎+</strong>
            </div>
            <h2>申请获取并验证你的手机号</h2>
            <p>验证你的接单身份</p>
            <button
              className="sheet-phone"
              type="button"
              onClick={() => {
                const authorizedPhone = '137****8102';
                setPhone(authorizedPhone);
                setAgreed(true);
                setShowPhoneSheet(false);
                onComplete({
                  phone: authorizedPhone,
                  name: profile.name || '李小牛',
                  identity: profile.identity,
                  industry: profile.industry,
                });
              }}
            >
              <strong>137****8102</strong>
              <span>上次提供</span>
            </button>
            <button className="sheet-cancel" type="button" onClick={() => setShowPhoneSheet(false)}>不允许</button>
            <button className="sheet-link" type="button" onClick={() => setShowPhoneSheet(false)}>使用其它号码</button>
          </div>
        </div>
      )}

      <style>{`
        .mobile-auth-page {
          width: 100vw;
          max-width: 100vw;
          margin-left: calc(50% - 50vw);
          overflow-x: hidden;
          min-height: 100vh;
          background: #ffffff;
          color: #20242f;
        }

        .auth-shell {
          position: relative;
          width: 100%;
          max-width: min(390px, 100vw);
          min-height: 100vh;
          margin: 0 auto;
          padding: calc(18px + env(safe-area-inset-top, 0px)) 20px 34px;
          overflow: hidden;
        }

        .auth-back {
          position: absolute;
          top: calc(24px + env(safe-area-inset-top, 0px));
          left: 16px;
          width: 44px;
          height: 44px;
          background: transparent;
          color: #20242f;
          font-size: 3rem;
          line-height: 1;
          font-weight: 300;
        }

        .auth-menu {
          position: absolute;
          top: calc(26px + env(safe-area-inset-top, 0px));
          right: 18px;
          width: 70px;
          height: 44px;
          border: 1px solid #eceff4;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: #fff;
        }

        .auth-menu span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #20242f;
        }

        .auth-brand-hero {
          padding-top: min(22vh, 178px);
          text-align: center;
        }

        .auth-orbit {
          position: relative;
          width: 250px;
          height: 126px;
          margin: 0 auto;
        }

        .auth-orbit::before,
        .auth-orbit::after {
          content: '';
          position: absolute;
          inset: 22px 10px;
          border: 2px dashed #e7f2fb;
          border-radius: 50%;
          transform: rotate(-13deg);
        }

        .auth-orbit::after {
          inset: 34px 32px;
          transform: rotate(-8deg);
        }

        .auth-orbit img {
          position: absolute;
          left: 50%;
          top: 22px;
          width: 82px;
          height: 82px;
          border-radius: 24px;
          transform: translateX(-50%);
          object-fit: cover;
          z-index: 2;
        }

        .orbit-dot {
          position: absolute;
          z-index: 3;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 0.78rem;
          font-weight: 800;
          box-shadow: 0 8px 16px rgba(30, 80, 120, 0.16);
        }

        .dot-a { left: 38px; top: 70px; background: #14cfaa; }
        .dot-b { right: 36px; top: 54px; background: #ffbd22; }
        .dot-c { left: 86px; top: 20px; background: #ff7b3d; }

        .auth-brand-hero h1 {
          font-size: 2.2rem;
          margin: -18px 0 10px;
          letter-spacing: 0;
        }

        .auth-brand-hero p {
          color: #252944;
          font-size: 1.04rem;
          letter-spacing: 0.08em;
        }

        .auth-card {
          width: 100%;
          margin-top: 34px;
        }

        .auth-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 4px;
          border-radius: 999px;
          background: #f4f6f8;
          margin-bottom: 18px;
        }

        .auth-tabs button {
          min-height: 40px;
          border-radius: 999px;
          background: transparent;
          color: #6f7785;
          font-size: 0.86rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .auth-tabs button.active {
          background: #fff;
          color: #14bfa3;
          box-shadow: 0 4px 12px rgba(22, 50, 80, 0.08);
        }

        .register-progress {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 10px;
          color: #a0a7b1;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .register-progress i {
          height: 1px;
          background: #e3e7ec;
        }

        .register-progress span.active {
          color: #14bfa3;
        }

        .auth-fields {
          display: grid;
          gap: 14px;
        }

        .quick-login-panel {
          padding: 18px;
          border: 1px solid #e6ecf1;
          border-radius: 16px;
          background:
            linear-gradient(135deg, rgba(20, 207, 170, 0.1), rgba(255, 255, 255, 0.95)),
            #fff;
          margin-bottom: 14px;
        }

        .quick-login-panel strong {
          display: block;
          color: #1f2937;
          font-size: 1.04rem;
          margin-bottom: 8px;
        }

        .quick-login-panel p {
          color: #6f7785;
          line-height: 1.65;
          font-size: 0.92rem;
        }

        .auth-fields label {
          display: grid;
          gap: 8px;
          color: #6f7785;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .auth-fields input,
        .auth-fields select {
          width: 100%;
          min-width: 0;
          min-height: 52px;
          border: 1px solid #e6ecf1;
          border-radius: 14px;
          background: #fff;
          color: #20242f;
          padding: 0 14px;
          font-size: 1rem;
          outline: none;
        }

        .auth-fields input:focus,
        .auth-fields select:focus {
          border-color: #15c7aa;
          box-shadow: 0 0 0 3px rgba(21, 199, 170, 0.12);
        }

        .code-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 88px;
          gap: 10px;
        }

        .code-row button {
          min-height: 52px;
          border-radius: 14px;
          background: #effbf8;
          color: #13b598;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .agreement-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin: 18px 0 14px;
          color: #7b828c;
          line-height: 1.5;
          font-size: 0.88rem;
        }

        .agreement-row span {
          min-width: 0;
        }

        .agreement-row input {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #d7dce2;
          border-radius: 50%;
          flex: 0 0 auto;
          margin-top: 2px;
        }

        .agreement-row input:checked {
          border-color: #15c7aa;
          background: radial-gradient(circle at center, #15c7aa 0 48%, transparent 50%);
        }

        .agreement-row b {
          color: #14bfa3;
          font-weight: 700;
        }

        .auth-error {
          margin-bottom: 12px;
          color: #ef4444;
          background: #fff1f1;
          border: 1px solid #ffd9d9;
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 0.88rem;
        }

        .auth-primary {
          width: 100%;
          min-height: 58px;
          border-radius: 999px;
          background: linear-gradient(135deg, #10e1bc, #1fbca5);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 800;
          box-shadow: 0 12px 24px rgba(20, 191, 163, 0.24);
        }

        .auth-phone-sheet {
          width: 100%;
          margin-top: 22px;
          color: #697488;
          background: transparent;
          font-size: 1rem;
        }

        .phone-sheet-mask {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.42);
          display: flex;
          align-items: flex-end;
        }

        .phone-sheet {
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          padding: 28px 24px calc(26px + env(safe-area-inset-bottom, 0px));
          border-radius: 22px 22px 0 0;
          background: #f7f7f8;
          color: #111827;
        }

        .sheet-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .sheet-brand img {
          width: 36px;
          height: 36px;
          border-radius: 10px;
        }

        .phone-sheet h2 {
          font-size: 1.35rem;
          margin-bottom: 8px;
        }

        .phone-sheet p {
          color: #858b96;
          margin-bottom: 22px;
        }

        .sheet-phone,
        .sheet-cancel {
          width: 100%;
          min-height: 76px;
          border-radius: 14px;
          background: #fff;
          color: #111827;
          font-size: 1.2rem;
          display: grid;
          place-items: center;
        }

        .sheet-phone span {
          color: #15c7aa;
          font-size: 0.9rem;
          margin-top: -12px;
        }

        .sheet-cancel {
          margin-top: 14px;
        }

        .sheet-link {
          width: 100%;
          margin-top: 22px;
          background: transparent;
          color: #63708a;
          font-weight: 800;
        }

        @media (min-width: 769px) {
          .mobile-auth-page {
            background: var(--bg-primary);
          }

          .auth-shell {
            width: 100%;
            display: grid;
            align-items: center;
            overflow: visible;
          }

          .auth-card {
            padding: 28px;
            border: 1px solid var(--border-default);
            border-radius: 18px;
            background: #fff;
            box-shadow: var(--shadow-elevated);
          }
        }

        @media (max-width: 380px) {
          .auth-shell {
            padding-left: 16px;
            padding-right: 16px;
          }

          .auth-tabs {
            gap: 4px;
          }

          .auth-tabs button {
            font-size: 0.78rem;
          }

          .code-row {
            grid-template-columns: minmax(0, 1fr) 92px;
          }
        }
      `}</style>
    </section>
  );
}
