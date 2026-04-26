-- 核心表结构
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL CHECK (role IN ('hunter', 'employer', 'admin')),
    openid VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bounties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    reward DECIMAL(10,2) NOT NULL,
    guarantee_days INT DEFAULT 90,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'filled'))
);

CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_hash VARCHAR(64) NOT NULL, -- 姓名哈希值
    is_masked BOOLEAN DEFAULT TRUE,
    real_contact JSONB, -- {phone: '', email: ''}
    resume_url VARCHAR(255),
    skills_json JSONB
);

-- 推单表
CREATE TABLE pipelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bounty_id UUID REFERENCES bounties(id),
    candidate_id UUID REFERENCES candidates(id),
    stage VARCHAR(20) DEFAULT 'screened' CHECK (stage IN ('screened', 'interviewing', 'escrow_locked', 'offer_accepted', 'paid', 'refunded')),
    escrow_amount DECIMAL(10,2) DEFAULT 0,
    guarantee_days INT DEFAULT 0,
    guarantee_start_date DATE,
    refund_amount DECIMAL(10,2) DEFAULT 0
);

-- 交易流水表
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipelines(id),
    payer_id UUID REFERENCES users(id),
    payee_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('escrow_deposit', 'platform_fee', 'hunter_payout', 'employer_refund')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    out_trade_no VARCHAR(100), -- 微信支付单号
    created_at TIMESTAMP DEFAULT NOW()
);

-- 启用pgvector扩展
CREATE EXTENSION IF NOT EXISTS vector;