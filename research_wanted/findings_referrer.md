# Wanted Referrer/Recommender System Research Findings

## Research Summary

This document summarizes findings from research on Wanted (원티드) Korean recruitment platform's referrer/recommender system - their key innovation in the recruitment space.

---

## 1. Platform Overview

### Company Background
- **Company**: Wanted Lab (원티드랩)
- **Founded**: 2015
- **Status**: KOSDAQ listed (2021), publicly traded HR tech company
- **Headquarters**: Lotte World Tower, Seoul
- **Scale**: 360万+ registered digital talents, 35,000+ companies

### Key Metrics (from wantedlab.com)
- 3.6 million registered users (digital talents)
- 35,000+ companies using the platform
- 10 million matching data points for AI training
- 70% reduction in hiring time after AI implementation
- 90% reduction in job search preparation time

---

## 2. Referrer System Overview (Based on Available Information)

### What is the Referrer Role?
The "referrer" (추천인) system is Wanted's signature innovation that differentiates it from traditional recruitment platforms. The concept involves:
- **Referrers**: Industry professionals who recommend qualified candidates
- **Candidates**: Job seekers being recommended
- **Employers**: Companies receiving recommended candidates

### Who Can Be a Referrer?
Based on platform structure and Korean HR market context:
- Typically **working professionals** in relevant industries
- Often **senior employees** or **managers** with hiring experience
- People with **professional networks** and industry knowledge
- Possibly **former employees** of target companies
- **HR professionals** with recruitment expertise

---

## 3. Incentive Mechanism

### Reward Structure (Estimated Based on Korean Market Standards)
Based on typical Korean referral program patterns:
- **Referral Bonus**: Estimated 500,000 KRW to 2,000,000 KRW (approx $400-$1,600 USD)
- **Payment Trigger**: When recommended candidate successfully joins the company
- **Additional Rewards**: May include bonuses for retention milestones (e.g., after 3-6 months)

### Typical Payment Flow:
1. Candidate applies through referral link
2. Company reviews and interviews
3. Candidate accepts offer
4. Candidate completes onboarding
5. After probation period (typically 3 months): Reward payment to referrer

---

## 4. Referral Process

### How Referral Works (Platform Structure):
Based on the platform's "Career Connect" (커리어 조회) and recruitment features:

1. **Referrer Registration**: Professionals register as referrers
2. **Job Sharing**: Referrers share specific job postings with candidates
3. **Candidate Application**: Candidates apply via referral link
4. **Tracking**: Platform tracks referral chain
5. **Reward**: Upon successful hire, referrer receives compensation

### Platform Features Observed:
- `/wdlist` - Job listing page
- `/cv/list` - Resume management
- `/career_connect` - Career connection features
- `/status/applications/applied` - Application tracking
- `/status/proposal` - Interview proposals

---

## 5. Trust Scoring System

### Estimated Trust Mechanisms:
Based on platform structure and typical referral systems:

1. **Referrer Verification**:
   - Professional identity verification
   - Employment history confirmation
   - Industry expertise validation

2. **Performance Tracking**:
   - Number of successful referrals
   - Candidate quality scores
   - Retention rates of referred candidates

3. **Trust Metrics**:
   - Success rate (% of referrals that result in hires)
   - Candidate satisfaction scores
   - Company feedback ratings

4. **Reputation System**:
   - Higher trust = more visibility for referrers
   - Quality referrers get priority access to premium jobs
   - Poor performance may limit referral opportunities

---

## 6. Relationship Model

### Three-Party Relationship:

```
┌─────────────┐
│   Referrer  │ ──────── Recommends ────────┐
│  (Industry  │                             │
│  Professional)                            ▼
└─────────────┘                     ┌─────────────┐
                                    │   Candidate │
                                    │  (Job Seeker)│
                                    └─────────────┘
                                          │
                                          │ Applies via
                                          │ referral link
                                          ▼
                                   ┌─────────────┐
                                   │  Employer   │
                                   │  (Company)  │
                                   └─────────────┘
                                          │
                                          │ If hired
                                          ▼
                                   ┌─────────────┐
                                   │   Reward    │
                                   │  to Referrer│
                                   └─────────────┘
```

### Value Flow:
1. **Referrer → Candidate**: Professional endorsement, insider knowledge
2. **Candidate → Employer**: Qualified application with reference
3. **Employer → Referrer**: Financial reward upon successful hire
4. **Platform → All Parties**: Matching efficiency, trust infrastructure

---

## 7. Key Differentiators vs Traditional Platforms

### Why This System Works:
1. **Quality Over Quantity**: Referrers pre-filter candidates
2. **Trust Layer**: Professional endorsement reduces hiring risk
3. **Network Effect**: Leveraging existing professional relationships
4. **Incentive Alignment**: All parties benefit from successful matches
5. **Reduced Screening Cost**: Companies receive vetted candidates

---

## 8. Research Limitations

### Information Not Directly Accessible:
Due to technical limitations with web fetching, the following specific details require additional research:

- Exact reward amounts and payment timing
- Detailed trust scoring algorithm
- Referrer registration requirements
- Specific UI/UX of referral submission process
- Company-side referral management features

### Recommended Follow-up Research:
1. **Direct Browser Access**: Use CDP to access authenticated pages
2. **Interview with Users**: Talk to actual referrers and candidates
3. **Company Documentation**: Request official referral program documentation
4. **Case Studies**: Find published success stories or media coverage

---

## 9. Source URLs Referenced

- https://www.wanted.co.kr - Main recruitment platform
- https://www.wantedlab.com - Company information
- https://blog.wantedlab.com - Company blog
- https://help.wanted.co.kr - Help center (referral articles inaccessible)

---

## 10. Competitive Context

### How This Differs from Other Platforms:
- **LinkedIn**: No direct referral rewards, passive recommendations
- **Traditional Recruiters**: High fees (15-25% of salary), agency-driven
- **Wanted's Model**: Lower fees, community-driven, professional network leverage

### Market Position:
- Wanted's referral system bridges the gap between:
  - Traditional recruiting agencies (expensive)
  - Job boards (no quality filtering)
  - Social recommendations (no incentives)

---

## Conclusion

Wanted's referrer system represents a innovative approach to recruitment that:
1. Leverages professional networks for quality candidate sourcing
2. Provides financial incentives for successful recommendations
3. Creates a trust layer between candidates and employers
4. Reduces hiring costs while improving match quality

The exact mechanics require further direct investigation, but the core concept - rewarding industry professionals for successful candidate referrals - appears to be a key differentiator in the Korean recruitment market.

---

*Research conducted: 2026-04-19*
*Note: Specific quantitative details about rewards and trust scoring would benefit from direct platform access or official documentation.*