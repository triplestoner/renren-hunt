# Wanted Platform - Job Seeker (Candidate) Interaction Flow Research

## Overview
Wanted (원티드) is a Korean recruitment platform operated by Wanted Lab Inc. (주)원티드랩, headquartered at Lotte World Tower, Seoul. It offers a comprehensive job seeker experience with data-driven features for matching, salary insights, and career progression.

**Source URLs:**
- Main site: https://www.wanted.co.kr
- Job listings: https://www.wanted.co.kr/wdlist
- Resume management: https://www.wanted.co.kr/cv/list
- Salary data: https://www.wanted.co.kr/salary
- AI interview coaching: https://ai.wanted.co.kr/interview

---

## 1. Registration and Profile Creation Process

### Wanted OneID (Unified Authentication)
- Single sign-on system providing access to all Wanted HR services
- Multiple authentication options:
  - **Kakao** (social login - most popular in Korea)
  - **Apple**
  - **Google**
  - **Email registration**
- Option to find existing accounts
- Separate corporate/enterprise registration flow

### Resume (이력서) System
**URL:** `/cv/list`

Key Features:
- **Resume creation with 2x pass rate claim** - "원티드 이력서로 서류 합격률 2배 UP!"
- **Two creation methods:**
  1. Create new resume from scratch (새 이력서 작성)
  2. File upload with automatic conversion (pdf, docx supported)
- Resume coaching service available (이력서 코칭) at `/cv/matchup`
- Resume samples and templates provided

### Career Connect (커리어 조회) - Beta Feature
**URL:** `/career_connect`

Features:
- Visual career timeline showing work history
- Career duration calculation (e.g., "6년 3개월의 값진 경험")
- Ranking within job category (e.g., "서버 개발자 중 상위 30%")
- Average salary comparison for position/rank
- Future income projection (3-year forecast)
- Companies listed with employment duration

---

## 2. Job Search and Browsing Experience

### Job Listings Page (채용공고)
**URL:** `/wdlist`

#### Search & Filter Categories
**Thematic tags for company attributes:**
- 대규모 채용 기업 (Large-scale hiring companies)
- 재택근무 (Remote work)
- 누적투자100억이상 (100B+ cumulative investment)
- 적극 채용 중 (Active hiring)
- 예비 유니콘 (Pre-unicorn, 1000B+ valuation)
- AI 선도 기업 (AI-leading companies)
- VC 투자 기업 (VC-invested startups)
- 1,001~10,000명 (Company size 1001-10000)
- 인원 급성장 (Rapid growth companies)
- 퇴사율5%이하 (Low turnover, under 5%)
- 보너스 (Bonus available)
- 외국인 지원 가능 (Foreign applicants accepted)
- 계약직 (Contract positions)
- 일본 현지 취업 (Japan local employment)
- 인턴 (Intern positions)

#### Job Posting Detail View
**URL format:** `/wd/[job_id]`

Example: `/wd/257137` (Aloha Factory UA Marketer)

**Job posting structure:**
- Company name & logo with follow button
- Location (서울 강남구)
- Experience level (경력 1-5년)
- Position title
- Company carousel images (11 images in example)
- Detailed position description including:
  - Company background/history
  - Main responsibilities (주요업무)
  - Qualification requirements (자격요건)
  - Tech stack & tools
  - Tags
  - Deadline (상시채용 = Always hiring)
  - Work location address

**Company information:**
- Company page link: `/company/[company_id]`
- Industry category (e.g., 게임 = Gaming)
- Follow functionality

### Bookmarking
**URL:** `/profile/bookmarks`
- Requires login (redirects to OneID if not authenticated)

---

## 3. Application Process and Resume Submission

### Application Submission Flow
Based on job posting UI:
- Apply directly from job detail page
- Resume must be created before applying
- Single resume system (not multiple resume versions per application)

### Application Status Tracking
**URLs:**
- Applied positions: `/status/applications/applied`
- Interview proposals: `/status/proposal?kind=OFFER`

Both require login authentication.

### Resume Coaching (이력서 코칭)
**URL:** `/cv/matchup`
- Professional resume review/coaching service
- Requires login

---

## 4. Interview Scheduling and Progress Tracking

### AI Interview Coaching (AI 면접코칭)
**URL:** https://ai.wanted.co.kr/interview

Features:
- "면접 예상 질문부터 답변 피드백까지" (From expected interview questions to answer feedback)
- Sample positions available:
  - Product Owner (원티드랩)
  - Frontend Developer (원티드랩)
  - Product Designer (원티드랩)
- Position link copy feature for practicing with real job descriptions

### Interview Proposal System
**URL:** `/status/proposal?kind=OFFER`
- Companies can proactively send interview proposals to candidates
- Two-way matching system where companies can initiate contact
- Requires login to view

### Application Status Dashboard
**URL:** `/status/applications/applied`
- Track all submitted applications
- Status progression tracking
- Requires login

---

## 5. Salary Negotiation and Hiring Process

### Salary Data Platform
**URL:** `/salary`

Features:
- **Job category salary estimates:**
  - Example: Developer (개발) entry-level expected salary: 3,169만원 (~31.69M KRW)
- **Interactive salary visualization:**
  - Job category selection (개발)
  - Experience level (전체/신입)
  - Salary amount display
- **Data disclaimer:** Based on job posting data (min/max experience and salary requirements)
- **"연봉 업그레이드 포지션"** - Salary upgrade position recommendations

### Pass Probability Tool (합격은 확률이다)
**URL:** `/pass-with-data`

Campaign features:
- Based on 10M+ matching data points
- Two main functions:
  1. **Salary increase probability (연봉 확률):**
     - Input: Job category, job role, years of experience, current salary
     - Output: Median comparison, percentile ranking
     - Example: "중간값 6,500만 원" with percentile visualization
  2. **Pass probability improvement (합격 확률):**
     - Resume creation guidance
     - Data-driven matching recommendations
- **Event participation bonus:**
  - Interview support fund: 50,000 KRW (for 100 winners)
  - Pass reward: 500,000 KRW
  - Period: March 16 - May 31, 2026
  - Eligibility: Members with no application history in past 6 months

### Featured Companies for Salary Growth
Partners shown in salary growth campaign:
- Autoever, Daangn, Coupang, Woowa, Doonamu, Olive Young
- Toss, Musinsa, Kurly, KakaoBank, 42dot, Bithumb
- CJ ENM, HYBE, Krafton, Socar, Wemade, KakaoPay

---

## Key UI/UX Observations

### Navigation Structure
Primary menu items:
1. 채용 (Jobs) - `/wdlist`
2. 이력서 (Resume) - `/cv/list`
3. 교육•이벤트 (Education/Events) - external link
4. 콘텐츠 (Content) - `/events`
5. 소셜 (Social) - social.wanted.co.kr/community
6. 프리랜서 (Freelancer) - `/gigs/experts`

### Design Patterns
- **Image optimization:** All images use Wanted's CDN with optimize parameters
- **Mobile-first:** App links prominently displayed (iOS App Store, Google Play)
- **Social integration:** Instagram, Facebook, YouTube, Naver Blog links
- **Tag-based discovery:** Visual tag cards for filtering companies/positions
- **Data visualization:** Progress bars and percentile rankings for career/salary

### Authentication Guard
- Protected pages redirect to Wanted OneID login
- Session-based authentication
- No guest access to application tracking or personal data

---

## Business Model Indicators

### Company Information
- Founded 2019 (based on Aloha Factory example)
- License: 유료직업소개사업등록번호 (Paid job introduction business license)
- Paid recruitment service for companies
- Recruiter inquiry channel available

### Revenue Streams (Implied)
1. Corporate recruiting fees
2. Premium resume coaching services
3. Event/education programs
4. Freelancer marketplace (Wanted Giggs)

---

## Summary: Complete Candidate Flow

```
Registration → Profile Creation → Job Search → Application → Interview → Salary → Hiring
     ↓              ↓               ↓            ↓            ↓           ↓
  OneID       Resume/Career    wdlist      Submit       AI Coaching   Salary Data
 (Kakao/      Connect          +Tags       +Status      +Proposals    +Probability
 Apple/       +Timeline        +Filters    Tracking     Dashboard     Calculator
 Google/
 Email)
```

---

## Sources Used
1. https://www.wanted.co.kr - Main landing page
2. https://www.wanted.co.kr/wdlist - Job listings
3. https://www.wanted.co.kr/cv/list - Resume management
4. https://www.wanted.co.kr/salary - Salary data
5. https://ai.wanted.co.kr/interview - AI interview coaching
6. https://www.wanted.co.kr/wd/257137 - Sample job posting
7. https://www.wanted.co.kr/career_connect - Career timeline feature
8. https://www.wanted.co.kr/pass-with-data - Pass probability campaign