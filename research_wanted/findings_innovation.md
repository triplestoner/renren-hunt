# Wanted (원티드) Innovation Analysis

## Overview

This document synthesizes research findings on Wanted's unique innovations and features as a Korean recruitment platform, focusing on AI applications, UX design, competitive differentiation, and AX consulting services.

**Sources Synthesized:**
- findings_platform.md (Company info, AI features, AX services, competitive landscape)
- findings_candidate.md (UX innovations, Career Connect, AI coaching)
- findings_employer.md (AI recommendations, talent pool exploration)
- findings_referrer.md (Referral system innovation)

---

## 1. AI/Algorithm Applications in Recruitment

### Core AI Matching System

**Data Foundation:**
- **10 million matching data points** trained on pass/fail outcomes
- Built on actual hiring results, not just application data
- Continuously learning from successful placements

**Key AI Features:**

| Feature | Description | Impact |
|---------|-------------|--------|
| AI Recruitment Agent | LLM-based automated talent search and analysis | 70% reduction in hiring time |
| AI Matching Algorithm | Predictive matching based on historical pass/fail data | 1/6 hiring time vs traditional |
| Talent Pool Recommendations | AI-powered candidate suggestions with pass probability | 3 days avg for interview acceptance |
| JD Analysis | Automatic job category/role classification (up to 3) | Accurate matching |

### AI Interview Coaching

**URL:** https://ai.wanted.co.kr/interview

**Features:**
- Generates expected interview questions based on position
- Provides answer feedback and improvement suggestions
- Supports real JD input for customized practice
- Sample positions: Product Owner, Frontend Developer, Product Designer

### Pass Probability Calculator

**URL:** /pass-with-data

**Two Core Functions:**
1. **Salary Probability:**
   - Input: Job category, role, experience years, current salary
   - Output: Median comparison, percentile ranking visualization
   
2. **Pass Probability:**
   - Resume creation guidance
   - Data-driven matching recommendations
   - Claim: "Based on 10M+ matching data points"

### Wanted LaaS (LLM-as-a-Service)

**Partnership:** Naver Cloud HyperClovaX
**Service:** Generative AI development tool subscription for enterprises
**Application:** Enables companies to build custom AI recruitment tools

---

## 2. User Experience Highlights & UX Design Innovations

### Career Connect (커리어 조회) - Beta Feature

**URL:** /career_connect

**Innovation:** Visual career timeline replacing traditional resume

**Features:**
- Career duration calculation (e.g., "6년 3개월의 값진 경험")
- Ranking within job category (e.g., "서버 개발자 중 상위 30%")
- Salary comparison for position/rank
- 3-year future income projection
- Companies listed with employment duration

**UX Pattern:** Progress bars and percentile rankings for data visualization

### Salary Data Platform

**URL:** /salary

**Innovation:** Transparent salary data for negotiation

**Features:**
- Job category salary estimates (e.g., Developer entry: 31.69M KRW)
- Interactive salary visualization by category/experience
- "연봉 업그레이드 포지션" - salary upgrade recommendations
- Partner companies showcase (Toss, Coupang, KakaoBank, etc.)

### Tag-Based Discovery System

**Thematic Tags for Company Attributes:**

| Tag Category | Examples |
|--------------|----------|
| Investment Status | 누적투자100억이상 (100B+ investment), 예비 유니콘 (Pre-unicorn) |
| Work Style | 재택근무 (Remote work), 보너스 (Bonus available) |
| Company Health | 퇴사율5%이하 (Low turnover), 인원 급성장 (Rapid growth) |
| Tech Focus | AI 선도 기업 (AI-leading companies), VC 투자 기업 |
| Employment Type | 계약직, 인턴, 외국인 지원 가능 |

**UX Pattern:** Visual tag cards instead of dropdown filters

### Interview Proposal System (Reverse Matching)

**URL:** /status/proposal?kind=OFFER

**Innovation:** Companies can proactively send interview proposals

**UX Benefits:**
- Two-way matching (not just candidate-initiated)
- Reduces candidate search fatigue
- Creates passive job seeking opportunity

### Wanted OneID Unified Authentication

**Social Login Options:**
- Kakao (most popular in Korea)
- Apple, Google, Email

**UX Benefit:** Single sign-on across all Wanted HR services

---

## 3. Differences from Traditional Job Platforms (Saramin, JobKorea)

### Competitive Comparison Matrix

| Dimension | Saramin/JobKorea | Wanted |
|-----------|------------------|--------|
| **Founded** | 2000 | 2015 |
| **Target Market** | General job seekers | Digital talent (dev/design/marketing) |
| **Search Method** | Keyword search | AI matching algorithm |
| **Company Focus** | Large corporations | Startups, tech companies |
| **Pricing Model** | Pay-per-posting | Pay-on-hire (7% of salary) + Subscription |
| **AI Technology** | Basic | 10M data-trained AI agent |
| **Global Presence** | Korea-only | Japan subsidiary, global bridge |
| **Community** | Minimal | High Five conferences, career communities |
| **Additional Services** | Job postings only | AX consulting, education, freelancer matching |

### Strategic Differentiation

**1. AI-First vs Keyword-First:**
- Traditional: User searches → Scroll results → Apply
- Wanted: AI recommends → Match probability shown → Apply with confidence

**2. Pay-on-Hire Model:**
- Traditional: Pay for posting visibility regardless of outcome
- Wanted: 7% of hired candidate's annual salary only on success
- Risk shift from employer to platform

**3. Talent Pool Exploration:**
- Traditional: Wait for applications
- Wanted: Proactively search and propose to candidates
- "1/6 hiring time" claim

**4. Referrer System:**
- Unique to Wanted: Industry professionals earn rewards for successful referrals
- Bridges gap between expensive agencies (15-25%) and job boards (no filtering)

---

## 4. Product Design Elements Worth Borrowing

### Referrer/Recommender System

**Concept:** Three-party model (Referrer → Candidate → Employer)

**Value Flow:**
```
Referrer → Candidate: Professional endorsement, insider knowledge
Candidate → Employer: Qualified application with reference
Employer → Referrer: Financial reward (500K-2M KRW estimated)
Platform → All: Trust infrastructure, tracking
```

**Key Mechanisms:**
- Referrer verification (employment history, industry expertise)
- Performance tracking (success rate, retention)
- Trust scoring (higher trust = more visibility)
- Reward on hire completion

**Why Borrow:**
- Quality filtering before applications arrive
- Reduced screening cost for employers
- Network effect from professional relationships
- Incentive alignment for all parties

### Interview Scheduling System

**Features:**
- Up to 5 schedule options per interview
- Online/Offline flexibility
- Automatic reminder (1 day before at 10am)
- Multi-user permission management
- Notification templates

**Design Pattern:**
- Candidate selects from proposed options
- Contact revealed only on acceptance
- Status visible in applicant card view

### Resume 2x Pass Rate Claim

**UX Innovation:** Confidence messaging
- "원티드 이력서로 서류 합격률 2배 UP!"
- Two creation methods: scratch or file upload
- Resume coaching service (/cv/matchup)
- Templates and samples provided

### Free Office Photography Service

**Location:** Seoul/Pangyo area companies
**Benefit:** Professional company images for job postings
**Why Borrow:** Content quality improvement at zero cost

### Interview Permission Management

**Role Types:**
- Administrator (관리자): Full access
- Reviewer (리뷰어): Limited to posting/candidate review

**Design Pattern:** Granular permission control within single company account

---

## 5. AX (AI Transformation) Consulting Services

### Overview

Wanted pivoted to "AX-centered business transformation" in 2024-2025, positioning as Korea's leading AI transformation consulting provider for enterprises.

**Quote:** "원티드랩, 3분기 매출 96억 원… AX 중심 사업 전환 성과 가시화"

### AX Service Portfolio

| Service | Description |
|---------|-------------|
| AI Literacy Training | Basic AI understanding for employees |
| Gen.AI Training | Generative AI practical training programs |
| Promptathon Events | Collaborative prompt engineering workshops |
| AI Agent Builder | Custom AI agent creation for enterprises |
| AX Consulting Packages | Full AI transformation consulting |

### Strategic Partnerships for AX

**Technology:** Naver Cloud HyperClovaX (for LaaS)
**Government:** Employment Ministry (AI services for public platforms)
**Universities:** Kyunghee University, Sookmyung Women's University (AI education)
**VCs:** Kakao Ventures, Mashup Ventures, Future Play

### Wanted Lab Partners

**Role:** Strategic investment arm
**Focus:** HR/SaaS/AI/AX companies
**Services:**
- Service integration partnerships
- IPO and M&A advisory
- New technology business finance qualification (2024)

### Business Model Evolution

**Revenue Streams:**
1. Recruitment platform (pay-on-hire, subscriptions)
2. AX consulting (training, consulting packages)
3. Wanted LaaS (LLM-as-a-Service subscriptions)
4. Education (Preonboarding bootcamps)
5. Global services (Wanted Japan, HR Booster)
6. Wanted Lab Partners (investments, advisory)

**Shift:** From pure recruitment platform to multi-service HR tech ecosystem with AX as growth driver

---

## Summary: Key Innovations Worth Borrowing

### High Priority (Implement First)

1. **AI Matching Probability Display** - Show pass/salary probability to users
2. **Tag-Based Discovery** - Replace dropdown filters with visual tag cards
3. **Interview Proposal System** - Enable reverse matching (company → candidate)
4. **Career Timeline Visualization** - Replace static resumes with progress visualization

### Medium Priority (Consider for Phase 2)

5. **Referrer Reward System** - Leverage professional networks with incentives
6. **Pay-on-Hire Pricing** - Risk-sharing model for employers
7. **Salary Transparency Platform** - Aggregate salary data for negotiation
8. **Unified Authentication** - Single ID across all platform services

### Lower Priority (Long-term Differentiation)

9. **AX Consulting Services** - Pivot to AI transformation consulting
10. **LLM-as-a-Service** - Offer AI tools to enterprise clients
11. **Talent Pool Exploration** - Proactive candidate search and proposal

---

## Source URLs

### Primary Sources
- https://www.wanted.co.kr - Main platform
- https://wantedlab.com - Company information
- https://blog.wantedlab.com/news/ - Company announcements
- https://help.wanted.co.kr - Help center documentation

### Feature-Specific URLs
- https://ai.wanted.co.kr/interview - AI Interview Coaching
- /salary - Salary Data Platform
- /pass-with-data - Pass Probability Calculator
- /career_connect - Career Timeline (Beta)
- /wdlist - Job Listings with Tag Filters
- /status/proposal - Interview Proposals

### Research Files
- findings_platform.md - Comprehensive platform research
- findings_candidate.md - Candidate UX research
- findings_employer.md - Employer tools research
- findings_referrer.md - Referral system research

---

*Research Date: April 19, 2026*
*Synthesis: Based on existing comprehensive research files*