# SEO IMPLEMENTATION STRATEGY 2025
## Lighthouse Mentoring - Advanced Technical SEO Plan

**Document Date:** September 30, 2025
**Research Period:** Q4 2025 - Q1 2026
**Data Sources:** DataForSEO Labs API, SERP Analysis, Keyword Difficulty Assessment
**Total Addressable Market:** 12,130 monthly buyer searches (UK)

---

## EXECUTIVE SUMMARY

### Validated Opportunity
Based on DataForSEO validation, the keyword research identifies **12,130 high-intent monthly searches** with several quick-win opportunities (keyword difficulty 5-12) that can be captured within 90 days.

### Critical Findings from Validation

1. **AI Overviews Dominate High-Volume Keywords**
   - "business transformation consultant" now shows AI Overview as #1 result
   - Traditional organic results pushed down to position 2+
   - **Strategy:** Optimize for featured snippet capture and AI Overview inclusion

2. **Search Intent Validation**
   - "hire executive coach": 58% commercial, 51% navigational (STRONG buyer intent)
   - "business coaching services": 71% navigational, 47% commercial (service seekers)
   - "fractional cfo": 58% TRANSACTIONAL intent (highest buyer readiness)

3. **Keyword Difficulty Reality Check**
   - Quick wins (KD 5-12): business coaching services, executive coaching services, fractional cfo
   - Medium difficulty (KD 38): wellbeing audit (higher than expected but unique opportunity)
   - High competition: business coach, leadership coach require 12+ months

4. **Seasonal Patterns Confirmed**
   - Q1 peak: January-March shows 40-60% increase in coaching/consulting searches
   - Current data (August 2025): Low season, perfect for foundation building
   - Launch strategy: Build authority now, capture Q1 2025 surge

---

## PART 1: VALIDATED KEYWORD PRIORITY MATRIX

### TIER 1: 90-DAY QUICK WINS (Keyword Difficulty 5-12)

#### Priority A - Immediate Implementation

| Keyword | Volume | KD | Competition | CPC | Search Intent | Action |
|---------|--------|----|-----------|----|---------------|--------|
| **business coaching services** | 210/mo | 12 | LOW (3) | £11.76 | 71% Navigational | Service page + blog |
| **fractional cfo** | 1,000/mo | 5 | MEDIUM (64) | £23.82 | 58% Transactional | Dedicated landing page |
| **advisory board member** | 70/mo | 5 | LOW (7) | £2.20 | 71% Navigational | Board advisory page |
| **growth strategy consultant** | 140/mo | 5 | LOW (6) | £8.45 | Commercial | Consulting service page |

**90-Day Target:** Rank positions 1-3 for all Tier 1 keywords
**Expected Traffic:** 350-500 monthly visitors
**Expected Leads:** 15-25 qualified inquiries

#### Priority B - 120-Day Targets

| Keyword | Volume | KD | Competition | CPC | Search Intent |
|---------|--------|----|-----------|----|---------------|
| **executive coaching services** | 210/mo | - | LOW (5) | £11.57 | 69% Navigational |
| **leadership coach** | 1,900/mo | 8 | MEDIUM (37) | £10.48 | 47% Commercial |
| **workplace wellbeing consultant** | 210/mo | 8 | LOW (19) | £10.34 | 57% Navigational |

**People Also Ask Opportunities Identified:**
- "What is the role of a wellbeing consultant?"
- "What are the 4 pillars of workplace wellbeing?"
- "What qualifications do you need to be a wellbeing advisor?"

---

### TIER 2: 6-MONTH AUTHORITY BUILDING

| Keyword | Volume | KD | Competition | CPC | Strategic Value |
|---------|--------|----|-----------|----|-----------------|
| business transformation consultant | 480/mo | - | LOW (15) | £19.74 | High CPC = corporate buyers |
| change management consultant | 590/mo | 7 | MEDIUM (35) | £8.32 | Problem-aware buyers |
| board advisor | 170/mo | - | LOW (17) | £10.21 | Niche positioning |
| wellbeing audit | 20/mo | 38 | LOW (32) | N/A | UNIQUE opportunity |

**SERP Analysis Insight:**
- AI Overview now dominates "business transformation consultant"
- Must optimize for featured snippet inclusion
- Focus on structured content answering: "What does a business transformation consultant do?"

---

### TIER 3: 12-18 MONTH COMPETITIVE TARGETS

| Keyword | Volume | Competition | Notes |
|---------|--------|-------------|-------|
| business coach | 3,600/mo | MEDIUM (48) | 60% buyer intent, 40% job seeker |
| leadership coach | 1,900/mo | MEDIUM (37) | Build authority first |
| fractional cfo | 1,000/mo | MEDIUM (64) | Scale after landing page success |

---

## PART 2: TECHNICAL SEO SPECIFICATIONS

### URL Structure Strategy

```
Primary Service Pages:
/services/executive-coaching/          (Target: executive coaching services, leadership coach)
/services/business-coaching/           (Target: business coaching services, business coach)
/services/management-consulting/       (Target: management consulting services, business transformation)
/services/board-advisory/              (Target: board advisor, fractional cfo, advisory board member)
/services/wellbeing-consulting/        (Target: workplace wellbeing consultant, wellbeing audit)

Problem-Solution Pages:
/solutions/business-transformation/    (Target: business transformation consultant)
/solutions/change-management/          (Target: change management consultant)
/solutions/growth-strategy/            (Target: growth strategy consultant)

Location Pages:
/london/executive-coach/               (Target: executive coach london, 720/mo)
/london/business-coach/                (Target: business coach near me)

Content Hub:
/insights/what-is-business-transformation-consultant/
/insights/leadership-coach-vs-executive-coach/
/insights/complete-guide-workplace-wellbeing-audits/
/insights/fractional-cfo-cost-guide/
```

### Internal Linking Architecture

**Hub & Spoke Model:**

```
HOMEPAGE (Authority Hub)
    ↓
Services Hub (/services/)
    ↓
├── Executive Coaching → Leadership Development Blog Posts
├── Business Coaching → Small Business Resources
├── Management Consulting → Transformation Case Studies
├── Board Advisory → Fractional CFO Resources
└── Wellbeing Consulting → Workplace Wellbeing Guides

Content Silos:
- Coaching Pillar: 15 interconnected articles
- Consulting Pillar: 12 transformation guides
- Wellbeing Pillar: 10 audit/assessment resources
```

**Internal Link Targets:**
- Homepage: 10-15 internal links (to key service pages)
- Service pages: 20-30 internal links (to related content)
- Blog posts: 5-8 contextual links (to services + related posts)

---

## PART 3: SCHEMA MARKUP SPECIFICATIONS

### Priority 1: Person Schema (Craig Fearn)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Craig Fearn",
  "jobTitle": [
    "Business Transformation Consultant",
    "Executive Coach",
    "Board Advisor"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Lighthouse Mentoring"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Certification",
      "description": "ICF Certified Executive Coach"
    }
  ],
  "knowsAbout": [
    "Business Transformation",
    "Executive Coaching",
    "Board Advisory",
    "Workplace Wellbeing",
    "Leadership Development"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/craigfearn/",
    "https://twitter.com/craigfearn"
  ]
}
```

### Priority 2: Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Lighthouse Mentoring",
  "description": "Business transformation consulting combining human expertise with AI-powered insights",
  "url": "https://lighthousementoring.co.uk",
  "logo": "https://lighthousementoring.co.uk/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "UK"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "priceRange": "£££",
  "serviceType": [
    "Business Transformation Consulting",
    "Executive Coaching",
    "Board Advisory Services",
    "Workplace Wellbeing Consulting",
    "Business Coaching"
  ]
}
```

### Priority 3: Service Schema (Per Service Page)

**Example: Executive Coaching Services**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Executive Coaching",
  "name": "Executive Coaching Services",
  "description": "Leadership coaching for C-suite executives and senior leaders combining behavioral science with AI-powered pattern recognition",
  "provider": {
    "@type": "Organization",
    "name": "Lighthouse Mentoring"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Executive Coaching Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1:1 Executive Coaching",
          "description": "Personalized coaching for senior executives"
        }
      }
    ]
  }
}
```

### Priority 4: FAQ Schema (Per Service Page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does an executive coach do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An executive coach partners with senior leaders to enhance their leadership effectiveness, decision-making, and organizational impact through structured coaching conversations and evidence-based methodologies."
      }
    },
    {
      "@type": "Question",
      "name": "How much does executive coaching cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Executive coaching engagements typically range from £3,000 to £15,000 for a 6-month program, depending on frequency of sessions and scope of work."
      }
    }
  ]
}
```

### Priority 5: Breadcrumb Schema (All Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://lighthousementoring.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://lighthousementoring.co.uk/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Executive Coaching",
      "item": "https://lighthousementoring.co.uk/services/executive-coaching"
    }
  ]
}
```

---

## PART 4: PAGE-BY-PAGE KEYWORD MAPPING & META STRATEGY

### Homepage

**Primary Keywords:** management consultant uk, business coach uk, executive coach uk
**Secondary Keywords:** business transformation consultant, board advisor

**Title Tag (55-60 chars):**
```
Business Transformation | Executive Coaching | London UK
```

**Meta Description (150-155 chars):**
```
Business transformation consulting + executive coaching combining human expertise with AI insights. Board advisory, leadership development, wellbeing audits. Based in London.
```

**H1:** Business Transformation Consultant & Executive Coach
**H2s:**
1. Transform Your Business with Human + AI Intelligence
2. Services: Consulting, Coaching, Board Advisory
3. The Lighthouse Methodology: Pattern Recognition Meets Human Insight
4. Trusted by [X] Organizations Across the UK

**Content Strategy:**
- 600-800 words (concise, scannable)
- Clear service CTAs above fold
- Trust signals: credentials, years of experience, client logos
- Internal links to all 5 service pages

---

### Services: Executive Coaching

**Primary Keyword:** executive coaching services (210/mo, KD -, Comp 5)
**Secondary Keywords:** leadership coach (1,900/mo), executive coach london (720/mo), ceo coach (390/mo)

**Title Tag:**
```
Executive Coaching Services | Leadership Coach | London
```

**Meta Description:**
```
Executive coaching for C-suite leaders. ICF-certified leadership coach combining behavioral science with AI-powered insights. Book your consultation today.
```

**H1:** Executive Coaching Services for Senior Leaders
**H2 Structure:**
1. What is Executive Coaching? (Target: "what does an executive coach do" - PAA)
2. Who Benefits from Leadership Coaching?
3. The Lighthouse Executive Coaching Methodology
4. Executive Coaching vs Leadership Development
5. Investment & Engagement Options
6. Book Your Consultation

**Content Requirements:**
- 2,000-2,500 words (comprehensive service page)
- Include FAQ schema answering PAA questions
- Client testimonials (real or anonymized case studies)
- Clear pricing/package structure
- Multiple CTAs (consultation, audit, contact)

**Featured Snippet Optimization:**
Answer "What does an executive coach do?" in first 100 words:
```
An executive coach partners with senior leaders to enhance their leadership
effectiveness through structured coaching conversations. Executive coaches
help CEOs, directors, and C-suite executives improve decision-making,
develop strategic thinking, navigate organizational challenges, and achieve
measurable business outcomes. Unlike consulting, executive coaching focuses
on developing the leader's capabilities rather than solving business problems.
```

---

### Services: Business Coaching

**Primary Keyword:** business coaching services (210/mo, KD 12, Comp 3) ⭐ QUICK WIN
**Secondary Keywords:** business coach (3,600/mo), small business coach (480/mo), business growth coach (110/mo)

**Title Tag:**
```
Business Coaching Services | Small Business Coach UK
```

**Meta Description:**
```
Business coaching services for entrepreneurs and SMEs. Strategic growth coaching to scale your business. £9.55 avg market rate. Book free discovery call.
```

**H1:** Business Coaching Services for Growth-Focused Entrepreneurs
**H2 Structure:**
1. What is Business Coaching? (Answer PAA questions)
2. Business Coaching vs Management Consulting
3. Who Needs a Business Coach?
4. Our Business Coaching Approach
5. Small Business Coaching Programs
6. Business Growth Coach Services
7. Investment & ROI

**Featured Snippet Target:** "What does a business coach do?"
```
A business coach helps entrepreneurs and business owners achieve their goals
by providing accountability, strategic guidance, and expert advice. Business
coaches work on areas like business strategy, sales growth, operational
efficiency, leadership development, and work-life balance. The coaching
focuses on the business owner's personal development and business outcomes.
```

**Conversion Optimization:**
- Free 30-minute discovery call CTA
- Business assessment tool/quiz
- Case studies showing revenue growth
- Pricing transparency (builds trust)

---

### Services: Management Consulting

**Primary Keyword:** management consulting services (110/mo, Comp LOW)
**Secondary Keywords:** business transformation consultant (480/mo), change management consultant (590/mo), growth strategy consultant (140/mo, KD 5)

**Title Tag:**
```
Management Consulting | Business Transformation | UK
```

**Meta Description:**
```
Management consulting services specializing in business transformation and change management. Strategic planning, growth strategy, organizational development.
```

**H1:** Management Consulting Services for Business Transformation
**H2 Structure:**
1. What Does a Business Transformation Consultant Do? (AI Overview target)
2. Business Transformation Consulting Services
3. Change Management Consulting
4. Growth Strategy & Strategic Planning
5. When to Hire a Management Consultant
6. Our Transformation Methodology
7. Case Studies & Results

**AI Overview Optimization Strategy:**
Since AI Overview dominates this keyword, structure content to answer:
- "What does a business transformation consultant do?" (direct, concise answer)
- "Key responsibilities" (bulleted list)
- "Why businesses use transformation consultants" (benefits list)
- Include citations to build authority

**Structured Content for AI Overview Inclusion:**
```markdown
## What Does a Business Transformation Consultant Do?

A business transformation consultant guides organizations through strategic,
organizational, and operational changes to improve performance and value. They:

- Assess current operations and identify improvement areas
- Develop strategic plans aligned with business objectives
- Design and implement new processes and technologies
- Manage organizational change and staff adoption
- Measure results and ensure sustainable transformation

Business transformation consultants bring objective perspective, specialized
expertise, and proven methodologies to help businesses adapt to market changes
and achieve new objectives.
```

---

### Services: Board Advisory

**Primary Keyword:** board advisor (170/mo, Comp LOW)
**Secondary Keywords:** fractional cfo (1,000/mo, KD 5), advisory board member (70/mo, KD 5), interim ceo (260/mo)

**Title Tag:**
```
Board Advisor | Fractional CFO | Advisory Board Member UK
```

**Meta Description:**
```
Board advisory services including fractional CFO and interim executive support. Strategic guidance without full-time commitment. £23.82 avg market rate.
```

**H1:** Board Advisory Services & Fractional Executive Support
**H2 Structure:**
1. Board Advisor vs Non-Executive Director (avoid NED terminology - job seeker intent)
2. Fractional CFO Services
3. Interim CEO & Executive Support
4. Advisory Board Member Services
5. When Your Business Needs a Board Advisor
6. Fractional vs Full-Time: Cost Analysis
7. Engagement Models & Investment

**CRITICAL SEO NOTE:**
⚠️ **AVOID** "non-executive director" keywords (5,400/mo) - 95% job seeker intent
✅ **USE** "board advisor" (170/mo) - pure buyer intent
✅ **USE** "fractional cfo" (1,000/mo, 58% transactional intent - STRONGEST buyer signal)

**Featured Snippet Target:** "How much does a fractional CFO cost?"
```
Fractional CFO services typically cost £3,000-£10,000 per month in the UK,
depending on company size and scope of work. This represents 30-70% savings
compared to a full-time CFO (£120,000-£180,000 annual salary). Fractional
CFOs provide strategic financial leadership, cash flow management, fundraising
support, and board reporting on a part-time or project basis.
```

---

### Services: Wellbeing Consulting

**Primary Keyword:** workplace wellbeing consultant (210/mo, KD 8, Comp 19)
**Secondary Keywords:** wellbeing audit (20/mo, KD 38), employee wellbeing program (480/mo), wellbeing strategy (170/mo)

**Title Tag:**
```
Workplace Wellbeing Consultant | Wellbeing Audit Services
```

**Meta Description:**
```
Workplace wellbeing consulting and comprehensive wellbeing audits. Evidence-based employee wellbeing programs to improve productivity and retention.
```

**H1:** Workplace Wellbeing Consultant & Wellbeing Audit Services
**H2 Structure:**
1. What is a Wellbeing Consultant? (PAA target)
2. The 4 Pillars of Workplace Wellbeing (PAA target - trending question)
3. Our Wellbeing Audit Methodology ⭐ UNIQUE POSITIONING
4. Employee Wellbeing Program Design
5. Workplace Wellbeing Strategy Development
6. ROI of Workplace Wellbeing Investment
7. Book Your Wellbeing Audit

**PAA Questions to Answer:**
✅ "What is the role of a wellbeing consultant?"
✅ "What are the 4 pillars of workplace wellbeing?" (Physical, Mental, Social, Financial)
✅ "What qualifications do you need to be a wellbeing advisor?"

**UNIQUE POSITIONING OPPORTUNITY:**
"Wellbeing Audit" has **only 20 monthly searches** but **KD 38** indicates competition. However, SERP analysis shows NO dedicated audit services. This is a **blue ocean opportunity**.

**Featured Snippet Target:** "What are the 4 pillars of workplace wellbeing?"
```
The 4 pillars of workplace wellbeing are:

1. Physical Wellbeing: Employee health, fitness, nutrition, and ergonomics
2. Mental Wellbeing: Psychological safety, stress management, mental health support
3. Social Wellbeing: Team connection, relationships, inclusive culture
4. Financial Wellbeing: Fair compensation, financial education, retirement planning

Organizations that address all four pillars see improved productivity, reduced
absenteeism, and higher employee engagement and retention rates.
```

---

### About Page

**Primary Keywords:** craig fearn, independent management consultant, uk business consultant
**Secondary Keywords:** business transformation expert, executive coach credentials

**Title Tag:**
```
About Craig Fearn | Business Transformation Consultant
```

**Meta Description:**
```
Craig Fearn is an independent business transformation consultant and executive coach with [X] years experience helping UK businesses scale and leaders thrive.
```

**H1:** About Craig Fearn: Business Transformation Consultant & Executive Coach
**Content Focus:**
- Credentials and certifications (build E-E-A-T)
- Professional background and expertise
- Human + AI methodology explanation
- Media mentions, speaking engagements
- Client results and testimonials

---

### Contact Page

**Primary Keywords:** hire [service], find [service], [service] near me
**Secondary Keywords:** business coaching consultation, executive coaching inquiry

**Title Tag:**
```
Contact | Book Consultation | Lighthouse Mentoring
```

**Meta Description:**
```
Book your free consultation. Hire an experienced business transformation consultant, executive coach, or board advisor. London-based, UK-wide service.
```

**H1:** Book Your Free Consultation
**Conversion Elements:**
- Multiple contact methods (form, phone, email, calendar booking)
- Service selection dropdown (presegment leads)
- Location information (London base, UK service)
- Response time commitment (24-hour response)
- Testimonial carousel

---

## PART 5: CONTENT GAP ANALYSIS & BLOG STRATEGY

### Content Gaps Competitors Are Missing

Based on SERP analysis and PAA questions, competitors are NOT adequately addressing:

1. **Wellbeing Audit Methodology**
   - Opportunity: No detailed audit process content exists
   - Target: Comprehensive guide "The Complete Workplace Wellbeing Audit: A Step-by-Step Guide"
   - SEO Value: Capture "wellbeing audit" featured snippet + position as thought leader

2. **Human + AI Positioning**
   - Opportunity: ZERO competitors mention AI-enhanced consulting
   - Target: "How AI-Powered Pattern Recognition Enhances Business Transformation"
   - SEO Value: Unique differentiation in saturated market

3. **Cost/Pricing Transparency**
   - Opportunity: Most consultants hide pricing, creating friction
   - Target: "How Much Does [Service] Cost in the UK? Transparent Pricing Guide"
   - SEO Value: Capture "how much does X cost" searches (high intent)

4. **Leadership Coach vs Executive Coach**
   - Opportunity: Combined search volume 2,780/mo, no definitive comparison content
   - Target: "Leadership Coach vs Executive Coach: Key Differences Explained"
   - SEO Value: Capture both keyword variations + position as authority

5. **Fractional Executive Services**
   - Opportunity: Growing market (fractional cfo 1,000/mo) with limited UK content
   - Target: "Fractional CFO Services UK: Complete Guide for Scale-Ups"
   - SEO Value: 58% transactional intent = highest conversion potential

6. **Business Transformation ROI**
   - Opportunity: Buyers want proof before hiring
   - Target: "Business Transformation ROI: What to Expect from Your Investment"
   - SEO Value: Bottom-of-funnel content for qualified leads

---

### 90-Day Content Calendar (January-March 2026)

**Month 1: Foundation Content (Service Pages)**

**Week 1-2:**
- Optimize all 5 service pages (Executive Coaching, Business Coaching, Management Consulting, Board Advisory, Wellbeing)
- Implement schema markup (Person, Organization, Service, FAQ)
- Internal linking structure
- Submit sitemap to Google Search Console

**Week 3-4:**
- Homepage optimization
- About page optimization
- Contact page optimization
- Location pages (if applicable)

**Month 2: Quick Win Blog Content**

**Week 5:**
📝 **"What Does a Business Transformation Consultant Do?"**
- Target keyword: business transformation consultant (480/mo)
- Length: 2,500 words
- Format: AI Overview optimization (structured lists, clear definitions)
- Internal links: Management Consulting service page

**Week 6:**
📝 **"Leadership Coach vs Executive Coach: The Complete Guide"**
- Target keywords: leadership coach (1,900/mo), executive coach (880/mo)
- Length: 2,000 words
- Format: Comparison table, pros/cons, when to hire each
- Internal links: Executive Coaching service page

**Week 7:**
📝 **"How Much Does a Fractional CFO Cost? UK Pricing Guide 2026"**
- Target keyword: fractional cfo (1,000/mo, 58% transactional intent)
- Length: 1,800 words
- Format: Pricing breakdown, ROI calculator, engagement models
- CTA: Book fractional CFO consultation
- Internal links: Board Advisory service page

**Week 8:**
📝 **"The Complete Workplace Wellbeing Audit: Step-by-Step Guide"**
- Target keyword: wellbeing audit (20/mo, KD 38 - UNIQUE opportunity)
- Length: 3,000 words (comprehensive resource)
- Format: Downloadable checklist, methodology explanation
- Lead magnet: Free wellbeing audit framework PDF
- Internal links: Wellbeing Consulting service page

**Month 3: Authority Building + Long-Tail**

**Week 9:**
📝 **"When to Hire a Business Coach: 10 Signs You Need One"**
- Target: "when to hire business coach" (problem-aware searchers)
- Length: 1,500 words
- Format: Numbered list, self-assessment quiz
- Internal links: Business Coaching service page

**Week 10:**
📝 **"The 4 Pillars of Workplace Wellbeing (+ How to Implement Them)"**
- Target: PAA question (trending)
- Length: 2,000 words
- Format: Featured snippet optimization, pillar-by-pillar breakdown
- Internal links: Wellbeing Consulting service page

**Week 11:**
📝 **"Change Management Consultant Guide: When and How to Hire"**
- Target: change management consultant (590/mo, KD 7)
- Length: 2,200 words
- Format: Problem-solution structure, case studies
- Internal links: Management Consulting service page

**Week 12:**
📝 **"Board Advisor vs Non-Executive Director: Which Does Your Business Need?"**
- Target: board advisor (170/mo) + educate on terminology
- Length: 1,800 words
- Format: Comparison guide, engagement models
- Internal links: Board Advisory service page

---

### Content Format Specifications

**All Blog Posts Must Include:**

1. **Structured Data:**
   - Article schema
   - FAQ schema (if answering PAA questions)
   - Breadcrumb schema

2. **On-Page SEO:**
   - Target keyword in title, H1, URL
   - H2/H3 hierarchy following semantic flow
   - Target keyword density: 1-2% (natural usage)
   - LSI keywords throughout
   - Meta description with CTA

3. **Featured Snippet Optimization:**
   - Answer target question in first 100-150 words
   - Use structured formats: numbered lists, bullet points, tables
   - Include "What is...", "How to...", "Best..." patterns

4. **Internal Linking:**
   - 5-8 contextual internal links per post
   - Link to relevant service pages
   - Link to related blog content
   - Anchor text variation (avoid over-optimization)

5. **Conversion Elements:**
   - CTA above fold (inline form or button)
   - CTA at end (stronger offer)
   - Related services sidebar
   - Lead magnet download (where applicable)

6. **Content Length Targets:**
   - Service pages: 2,000-2,500 words
   - Comprehensive guides: 2,500-3,500 words
   - Standard blog posts: 1,500-2,000 words
   - Quick answers: 800-1,200 words

7. **Readability:**
   - Flesch reading ease: 60+ (conversational, professional)
   - Sentences: <25 words average
   - Paragraphs: 3-4 sentences max
   - Subheadings every 200-300 words

---

## PART 6: LOCAL SEO STRATEGY

### Google Business Profile Optimization

**Primary Category:** Business Management Consultant
**Secondary Categories:**
- Business Coaching Service
- Executive Search & Recruitment (if applicable)
- Management Consultant

**Services to List:**
1. Business Transformation Consulting
2. Executive Coaching
3. Leadership Development
4. Board Advisory Services
5. Business Coaching
6. Change Management Consulting
7. Workplace Wellbeing Consulting
8. Strategic Planning
9. Growth Strategy Consulting
10. Fractional CFO Services

**Attributes:**
- Identifies as: Consultant
- Online appointments: Yes
- Online consultations: Yes
- Language: English
- Service area: United Kingdom (specify regions)

**Posts Strategy:**
- Weekly posts highlighting services
- Case studies (anonymized)
- Industry insights
- Special offers (free consultations)

**Review Strategy:**
- Request reviews from satisfied clients
- Respond to all reviews within 48 hours
- Include target keywords in responses (natural usage)
- Aim for 20+ reviews in first 6 months

---

### Location-Specific Content

**Priority 1: London Pages**

**Executive Coach London**
- URL: /london/executive-coach/
- Target: executive coach london (720/mo, LOW comp)
- Content: Local market insights, London business community, in-person vs virtual coaching
- Schema: LocalBusiness schema with London address

**Business Coach Near Me**
- Target: business coach near me (590/mo)
- Strategy: Google Business Profile optimization captures these searches
- No dedicated page needed (GBP + homepage ranks)

**Priority 2: Regional Expansion (Future)**
- Manchester, Birmingham, Leeds, Edinburgh
- Create pages only when ready to service those areas
- Use city-specific case studies and testimonials

---

## PART 7: QUICK WIN IMPLEMENTATION ROADMAP

### Days 1-30: Foundation & Quick Wins

**Week 1: Technical Setup**
- [ ] Google Search Console verification
- [ ] Google Analytics 4 setup + goal tracking
- [ ] XML sitemap generation and submission
- [ ] Robots.txt optimization
- [ ] Core Web Vitals baseline measurement

**Week 2: Schema Implementation**
- [ ] Person schema (Craig Fearn) - About page
- [ ] Organization schema - Homepage
- [ ] Service schema - All 5 service pages
- [ ] Breadcrumb schema - Site-wide
- [ ] FAQ schema - Service pages

**Week 3: Service Page Optimization**
- [ ] Business Coaching Services (KD 12 - QUICK WIN)
- [ ] Executive Coaching Services (KD - - QUICK WIN)
- [ ] Fractional CFO landing page (KD 5, 58% transactional - HIGHEST PRIORITY)

**Week 4: Initial Content Push**
- [ ] Publish "How Much Does a Fractional CFO Cost?" (transactional intent)
- [ ] Publish "What Does a Business Transformation Consultant Do?" (AI Overview target)
- [ ] Internal linking pass across all pages

### Days 31-60: Content Authority Building

**Week 5:**
- [ ] Leadership Coach vs Executive Coach comparison guide
- [ ] Google Business Profile complete setup
- [ ] Request initial client reviews (target: 5 reviews)

**Week 6:**
- [ ] Complete Workplace Wellbeing Audit guide (unique positioning)
- [ ] Wellbeing Consulting service page optimization
- [ ] Email outreach for backlinks to wellbeing audit content

**Week 7:**
- [ ] Change Management Consultant guide
- [ ] Board Advisory service page optimization
- [ ] Advisory Board Member content

**Week 8:**
- [ ] Growth Strategy Consultant content
- [ ] Management Consulting service page final optimization
- [ ] Mid-point SEO audit and ranking check

### Days 61-90: Scaling & Refinement

**Week 9:**
- [ ] Business Coach needs assessment content
- [ ] 4 Pillars of Workplace Wellbeing guide
- [ ] Featured snippet optimization pass

**Week 10:**
- [ ] Board Advisor vs NED comparison
- [ ] Local SEO content (London focus)
- [ ] Second round client review requests (target: 15 total)

**Week 11:**
- [ ] Additional long-tail content based on Search Console data
- [ ] Internal linking optimization (second pass)
- [ ] Conversion rate optimization based on Analytics

**Week 12:**
- [ ] 90-day SEO performance report
- [ ] Keyword ranking assessment
- [ ] Traffic and conversion analysis
- [ ] Q2 content calendar planning

---

## PART 8: TECHNICAL SEO CHECKLIST

### Critical Technical Requirements

**Site Speed & Performance:**
- [ ] Page load time < 2.5 seconds (LCP)
- [ ] First Input Delay < 100ms (FID)
- [ ] Cumulative Layout Shift < 0.1 (CLS)
- [ ] Image optimization (WebP format, lazy loading)
- [ ] Minified CSS and JavaScript
- [ ] CDN implementation (if not already in place)
- [ ] Browser caching configured

**Mobile Optimization:**
- [ ] Mobile-responsive design (already in place - Astro site)
- [ ] Touch-friendly buttons and navigation
- [ ] Readable font sizes (16px minimum)
- [ ] No horizontal scrolling
- [ ] Mobile-first indexing ready

**Crawlability & Indexability:**
- [ ] XML sitemap includes all important pages
- [ ] Robots.txt allows search engine access
- [ ] No orphaned pages (all pages linked internally)
- [ ] Canonical tags on all pages
- [ ] Hreflang tags (if international expansion planned)
- [ ] 404 error page with helpful navigation
- [ ] 301 redirects for any changed URLs

**Security & Trust:**
- [ ] HTTPS enabled (SSL certificate)
- [ ] Privacy policy page
- [ ] Cookie consent (GDPR compliance)
- [ ] Secure contact forms
- [ ] Terms of service page

**Structured Data:**
- [ ] Valid JSON-LD format (test with Google Rich Results Test)
- [ ] No schema errors in Search Console
- [ ] Regular schema validation checks

---

## PART 9: CONVERSION OPTIMIZATION PLAN

### Lead Generation Funnel

**Top of Funnel (Awareness):**
- Blog content targeting informational keywords
- Free resources (downloadable guides, templates)
- Value-first content (no immediate sales pitch)
- Email newsletter signup

**Middle of Funnel (Consideration):**
- Service comparison content
- Case studies and testimonials
- ROI calculators and assessment tools
- Webinars or workshops

**Bottom of Funnel (Decision):**
- Service pages with clear CTAs
- Pricing transparency pages
- Free consultation offers
- Testimonials and social proof

### CTA Strategy by Page Type

**Homepage CTAs:**
1. Primary CTA: "Book Free Consultation" (above fold)
2. Secondary CTA: "Explore Services" (service overview section)
3. Tertiary CTA: "Download Transformation Framework" (lead magnet)

**Service Page CTAs:**
1. Primary CTA: "Book [Service] Consultation" (above fold + bottom)
2. Secondary CTA: "Download Service Guide" (middle of page)
3. Tertiary CTA: "See Case Studies" (related content)

**Blog Post CTAs:**
1. Inline CTA: Related service CTA mid-article
2. End-of-post CTA: Book consultation or download resource
3. Sidebar CTA: Newsletter signup or assessment tool

### Lead Magnet Ideas

**Quick Wins (Immediate Implementation):**
1. "Business Transformation Readiness Assessment" (PDF quiz)
2. "The Executive Coaching ROI Calculator" (interactive tool)
3. "Workplace Wellbeing Audit Framework" (downloadable template)
4. "Fractional CFO Engagement Proposal Template" (Word doc)

**Authority Building:**
1. "The Complete Guide to Business Transformation" (comprehensive ebook)
2. "Leadership Development Playbook" (multi-page resource)
3. "Board Advisory Services: A Buyer's Guide" (comparison guide)

### Conversion Tracking Setup

**Google Analytics 4 Goals:**
- Form submissions (contact, consultation booking)
- Phone number clicks
- Email link clicks
- Lead magnet downloads
- Service page views (qualified traffic indicator)
- Time on site > 2 minutes (engagement signal)

**Search Console Monitoring:**
- Track rankings for all Tier 1 & 2 keywords
- Monitor click-through rates (optimize titles/descriptions if <5%)
- Identify pages with impressions but no clicks (optimization opportunities)
- Track featured snippet wins

---

## PART 10: BACKLINK ACQUISITION STRATEGY

### Quick Win Link Opportunities

**Month 1-2: Foundation Links**

1. **Business Directories (Easy Links):**
   - Yell.com (UK business directory)
   - Thomson Local
   - Trustpilot business profile
   - Bark.com (service provider listing)
   - LinkedIn company page (optimize fully)

2. **Professional Associations:**
   - Institute of Leadership & Management
   - Chartered Management Institute (if member)
   - International Coaching Federation (ICF)
   - Association for Business Psychology

3. **Local Listings:**
   - London Chamber of Commerce
   - Local business improvement districts
   - Startup accelerator program alumni pages
   - University alumni associations

**Month 3-6: Content-Driven Links**

4. **Digital PR & Content Outreach:**
   - Pitch wellbeing audit guide to HR publications
   - Business transformation insights to management magazines
   - Expert commentary on leadership trends
   - Target: Management Today, HR Magazine, People Management

5. **Guest Posting (Quality over Quantity):**
   - Target: Medium publications (The Startup, Better Marketing)
   - Target: Industry blogs (HR blogs, management consulting blogs)
   - Requirement: Only high-authority sites (DA 40+)

6. **Podcast Appearances:**
   - Business podcasts (share expertise)
   - Leadership development podcasts
   - Entrepreneurship shows
   - Each appearance = backlink opportunity

**Month 6-12: Authority Building**

7. **Original Research/Data:**
   - Conduct UK workplace wellbeing survey
   - Publish findings as research report
   - Outreach to media for coverage (links naturally follow)

8. **Strategic Partnerships:**
   - Partner with complementary service providers (HR tech, training providers)
   - Co-create content (shared audience, mutual backlinks)
   - Referral partnerships

### Link Outreach Templates

**Template 1: Value-First Outreach**

```
Subject: Resource for [Their Article Title]

Hi [Name],

I recently read your article on [topic] and found your insights on
[specific point] particularly valuable.

I recently published a comprehensive guide on [related topic] that
your readers might find helpful: [URL]

It covers [key benefit 1], [key benefit 2], and [key benefit 3] with
actionable frameworks they can implement immediately.

Would you consider linking to it from your article or mentioning it
in a future post?

Happy to return the favor or collaborate on content.

Best,
Craig
```

---

## PART 11: MONITORING & SUCCESS METRICS

### 30-Day Success Criteria

**Search Console Metrics:**
- [ ] 10+ pages indexed
- [ ] 100+ impressions for Tier 1 keywords
- [ ] Average position <50 for quick win keywords
- [ ] 0 indexing errors

**Traffic Goals:**
- [ ] 50+ organic sessions
- [ ] 5% bounce rate improvement from baseline
- [ ] 1+ minutes average session duration

**Conversion Goals:**
- [ ] 3+ consultation bookings
- [ ] 10+ lead magnet downloads
- [ ] 1+ service inquiry

### 90-Day Success Criteria

**Keyword Rankings:**
- [ ] business coaching services: Position 1-10
- [ ] executive coaching services: Position 1-15
- [ ] fractional cfo: Position 10-20
- [ ] growth strategy consultant: Position 5-15
- [ ] advisory board member: Position 5-15

**Search Console Metrics:**
- [ ] 500+ impressions per week
- [ ] 50+ clicks per week
- [ ] 5%+ click-through rate
- [ ] 10+ pages ranking in top 50

**Traffic Goals:**
- [ ] 500+ organic sessions (month 3)
- [ ] 3+ pages per session average
- [ ] 2+ minutes average session duration
- [ ] <50% bounce rate

**Conversion Goals:**
- [ ] 20+ consultation bookings
- [ ] 50+ lead magnet downloads
- [ ] 10+ qualified service inquiries
- [ ] 2+ closed clients (from organic search)

**Business Impact:**
- [ ] £15,000-30,000 revenue from organic leads
- [ ] 3:1 minimum ROAS (return on ad spend if running PPC)

### KPI Dashboard (Weekly Monitoring)

**Keyword Performance:**
| Keyword | Current Rank | Target Rank | Trend | Action Needed |
|---------|--------------|-------------|-------|---------------|
| business coaching services | - | Top 5 | - | Publish + optimize |
| fractional cfo | - | Top 10 | - | Landing page + content |
| executive coaching services | - | Top 10 | - | Service page + backlinks |

**Traffic Sources:**
- Organic search: [X%]
- Direct: [X%]
- Referral: [X%]
- Social: [X%]

**Top Landing Pages:**
1. [Page] - [Sessions] - [Conversion rate]
2. [Page] - [Sessions] - [Conversion rate]
3. [Page] - [Sessions] - [Conversion rate]

**Conversion Funnel:**
- Landing page views: [X]
- Service page views: [X]
- Contact page views: [X]
- Form submissions: [X]
- Conversion rate: [X%]

---

## PART 12: COMPETITIVE INTELLIGENCE

### Who's Ranking & Why

**Keyword: "business transformation consultant"**

**Position 1: AI Overview** (Google Generative AI)
- Why it ranks: Google prioritizing AI answers for definitional queries
- Strategy: Optimize content to be cited in AI Overview
- Action: Structure content with clear definitions, lists, and expert citations

**Position 2: Grant Thornton** (grantthornton.co.uk)
- Why it ranks: High domain authority (DA 70+), Big 4 consulting firm
- Weakness: Generic corporate content, no personal touch
- Our advantage: Personalized service, human + AI differentiation

**Position 3: BCG** (bcg.com)
- Why it ranks: Massive domain authority, brand recognition
- Weakness: Enterprise focus, inaccessible pricing
- Our advantage: SME and mid-market focus, transparent engagement models

**Position 4: IBM** (ibm.com)
- Why it ranks: Tech giant authority, specific career content
- Weakness: Corporate recruitment focus, not client-facing
- Our advantage: Client-focused content, practical implementation guides

**Keyword: "workplace wellbeing consultant"**

**Position 1: The Wellbeing Project** (thewellbeingproject.co.uk)
- Why it ranks: Dedicated niche focus, psychology credentials
- Opportunity: They don't offer structured audits
- Our advantage: Wellbeing audit unique positioning

**Position 2: Barnett Waddingham** (barnett-waddingham.co.uk)
- Why it ranks: Financial services firm diversification
- Weakness: Corporate, less personalized approach
- Our advantage: Consultant-led, tailored programs

**Keyword: "fractional cfo"**

**No strong UK-specific rankings** - US content dominates
- Opportunity: UK market gap for fractional CFO content
- Our advantage: UK-specific pricing, case studies, regulatory context
- Strategy: Comprehensive UK guide + local SEO emphasis

---

## PART 13: RISK MITIGATION & CONTINGENCY PLANS

### Potential Challenges & Solutions

**Challenge 1: AI Overview Dominance**
- **Risk:** Traditional organic results pushed down, reduced traffic
- **Mitigation:**
  - Optimize to be cited in AI Overview (authoritative source)
  - Focus on long-tail keywords AI doesn't cover well
  - Emphasize unique positioning (wellbeing audit, human+AI approach)

**Challenge 2: Low Search Volume for Unique Keywords**
- **Risk:** "Wellbeing audit" only 20 monthly searches
- **Mitigation:**
  - Rank for related higher-volume terms (workplace wellbeing consultant 210/mo)
  - Create demand through thought leadership
  - Focus on conversion rate over volume for niche terms

**Challenge 3: High Competition for Volume Keywords**
- **Risk:** "Business coach" (3,600/mo) has KD 18, medium competition
- **Mitigation:**
  - Build authority on quick wins first (12-18 months)
  - Focus on long-tail variations (small business coach, business growth coach)
  - Differentiate with unique methodology content

**Challenge 4: Seasonal Fluctuations**
- **Risk:** 40-60% volume drop in summer months
- **Mitigation:**
  - Build authority during low season (now)
  - Create evergreen content that ranks year-round
  - Capture Q1 surge (January-March highest volume)

**Challenge 5: Keyword Cannibalization**
- **Risk:** Multiple pages competing for same keywords
- **Mitigation:**
  - Clear keyword mapping (one primary keyword per page)
  - Strategic internal linking to signal page hierarchy
  - Consolidate thin content, use 301 redirects if needed

---

## PART 14: BUDGET & RESOURCE ALLOCATION

### SEO Investment Breakdown (90 Days)

**Time Investment (Assuming Craig + Support):**
- Content creation: 40 hours (12 blog posts × 3-4 hours each)
- Technical optimization: 20 hours (schema, on-page SEO, site fixes)
- Link outreach: 15 hours (directory listings, partnerships, guest posts)
- Monitoring & optimization: 10 hours (weekly reviews, adjustments)
- **Total: 85 hours**

**Paid Tools (Optional but Recommended):**
- Ahrefs or SEMrush: £99-179/month (keyword tracking, competitor analysis)
- Surfer SEO: £59/month (content optimization)
- Screaming Frog: Free (technical audits)
- Google Search Console: Free (essential)
- Google Analytics: Free (essential)

**Content Creation Options:**
1. **DIY:** Craig writes (£0 cash cost, 85 hours time investment)
2. **Hybrid:** Craig outlines, VA writes drafts, Craig edits (£800-1,200 for 12 posts)
3. **Outsource:** SEO content writer (£1,500-3,000 for 12 optimized posts)

**Expected ROI (Conservative Estimate):**
- 90-day investment: £500-1,000 (tools) + time
- Expected leads: 20-25 qualified consultations
- Close rate: 20% (4-5 clients)
- Average project value: £5,000-15,000
- **Total revenue: £20,000-75,000**
- **ROI: 20x-75x**

---

## PART 15: HANDOFF INSTRUCTIONS

### For Content Creation Team

**Content Brief Template:**
```
CONTENT BRIEF: [Topic]

Target Keyword: [Primary keyword]
Search Volume: [X/month]
Keyword Difficulty: [X]
Search Intent: [Transactional/Navigational/Informational]

Word Count: [1,500-3,000 words]

Target Questions to Answer:
1. [PAA question 1]
2. [PAA question 2]
3. [PAA question 3]

H2 Structure:
1. [Heading]
2. [Heading]
3. [Heading]

Internal Links Required:
- [Service page 1]
- [Service page 2]
- [Related blog post]

CTAs:
- Primary: [Book consultation]
- Secondary: [Download resource]

Schema Markup:
- Article schema: Yes
- FAQ schema: Yes (3-5 questions)

Featured Snippet Target:
[150-word answer to primary question]

Due Date: [Date]
```

### For Development Team

**Technical SEO Implementation Checklist:**

1. **Schema Markup Implementation:**
   - Add JSON-LD to all pages (use schema generator: schema.org/docs/gs.html)
   - Test with Google Rich Results Test
   - Validate in Search Console

2. **Site Speed Optimization:**
   - Compress images (WebP format)
   - Implement lazy loading
   - Minify CSS/JS
   - Enable browser caching
   - Test with PageSpeed Insights (target 90+ score)

3. **XML Sitemap:**
   - Generate dynamic sitemap (Astro has built-in support)
   - Submit to Google Search Console
   - Update weekly as new content published

4. **Robots.txt:**
   - Allow search engine crawling
   - Disallow admin pages, private directories
   - Reference sitemap location

5. **Canonical Tags:**
   - Add to all pages (self-referencing canonical)
   - Prevent duplicate content issues

6. **Structured Data Testing:**
   - Run Google Rich Results Test after implementation
   - Fix any validation errors
   - Monitor Search Console for schema warnings

### For Marketing Team

**Weekly SEO Review Meeting Agenda:**

1. Keyword ranking updates (top 20 keywords)
2. Traffic analysis (weekly organic growth)
3. Conversion tracking (leads from organic)
4. Content performance (top/bottom posts)
5. Technical issues identified
6. Backlink acquisition progress
7. Next week priorities

**Monthly SEO Report Template:**

```
MONTHLY SEO PERFORMANCE REPORT
Month: [Month]

EXECUTIVE SUMMARY:
- Organic traffic: [X sessions] ([+/-]% vs last month)
- Keyword rankings: [X] keywords in top 20 ([+/-]% vs last month)
- Conversions: [X] leads ([+/-]% vs last month)
- Key wins: [List 2-3 achievements]
- Challenges: [List 1-2 obstacles]

KEYWORD RANKINGS:
[Table of top 20 keywords with position changes]

TRAFFIC SOURCES:
[Chart showing organic vs other channels]

TOP PERFORMING CONTENT:
1. [Page] - [Traffic] - [Conversions]
2. [Page] - [Traffic] - [Conversions]
3. [Page] - [Traffic] - [Conversions]

BACKLINK PROGRESS:
- New backlinks acquired: [X]
- Domain authority change: [+/-X]
- Top referring domains: [List]

TECHNICAL SEO:
- Core Web Vitals: [Pass/Fail]
- Indexing issues: [Number]
- Schema errors: [Number]

NEXT MONTH PRIORITIES:
1. [Action item]
2. [Action item]
3. [Action item]
```

---

## CONCLUSION & NEXT STEPS

### Critical Success Factors

1. **Consistency:** Publish 1 high-quality post per week (minimum)
2. **Patience:** SEO takes 3-6 months for significant results
3. **Data-Driven:** Make decisions based on Search Console data, not assumptions
4. **Unique Positioning:** Emphasize wellbeing audit and human+AI differentiation
5. **Conversion Focus:** Traffic means nothing without lead generation

### Immediate Action Items (This Week)

1. ✅ Set up Google Search Console + Google Analytics 4
2. ✅ Implement Person and Organization schema (homepage + about page)
3. ✅ Optimize "Business Coaching Services" page (KD 12 quick win)
4. ✅ Create "Fractional CFO" landing page (58% transactional intent)
5. ✅ Submit XML sitemap to Google

### 90-Day Milestone Targets

- **Keywords Ranking (Top 20):** 8-12 keywords
- **Organic Traffic:** 500+ sessions/month
- **Leads Generated:** 20-25 consultations
- **Clients Won:** 4-5 new engagements
- **Revenue from SEO:** £20,000-75,000

### Long-Term Vision (12 Months)

- **Keywords Ranking (Top 10):** 15-20 keywords
- **Organic Traffic:** 2,000+ sessions/month
- **Domain Authority:** 30+ (from current baseline)
- **Backlinks:** 100+ quality backlinks
- **Monthly Leads:** 50+ qualified inquiries
- **SEO as Primary Channel:** 40%+ of new business

---

**Document Prepared By:** SEO Strategy Agent
**Based On:** DataForSEO Labs API validation, SERP analysis, competitive intelligence
**Validation Date:** September 30, 2025
**Next Review:** January 2026 (post-90-day audit)

---

## APPENDIX A: KEYWORD TRACKING SPREADSHEET

```
Keyword | Volume | KD | Comp | CPC | Current Rank | Target Rank | Priority | Status
business coaching services | 210 | 12 | 3 | £11.76 | - | Top 5 | HIGH | Not Started
fractional cfo | 1,000 | 5 | 64 | £23.82 | - | Top 10 | HIGH | Not Started
executive coaching services | 210 | - | 5 | £11.57 | - | Top 10 | HIGH | Not Started
leadership coach | 1,900 | 8 | 37 | £10.48 | - | Top 20 | MEDIUM | Not Started
workplace wellbeing consultant | 210 | 8 | 19 | £10.34 | - | Top 10 | MEDIUM | Not Started
board advisor | 170 | - | 17 | £10.21 | - | Top 10 | MEDIUM | Not Started
growth strategy consultant | 140 | 5 | 6 | £8.45 | - | Top 5 | HIGH | Not Started
advisory board member | 70 | 5 | 7 | £2.20 | - | Top 5 | HIGH | Not Started
wellbeing audit | 20 | 38 | 32 | N/A | - | Top 3 | HIGH | Not Started
business transformation consultant | 480 | - | 15 | £19.74 | - | Top 20 | MEDIUM | Not Started
```

## APPENDIX B: SERP FEATURES TO TARGET

**Featured Snippets:**
- "What does a business transformation consultant do?"
- "How much does a fractional CFO cost?"
- "What are the 4 pillars of workplace wellbeing?"
- "Leadership coach vs executive coach"

**People Also Ask:**
- "What is the role of a wellbeing consultant?"
- "When to hire a business coach?"
- "How to choose an executive coach?"
- "What does a board advisor do?"

**AI Overview Inclusion:**
- Structure content with clear definitions
- Use authoritative citations
- Include expert credentials
- Format with lists and tables

---

**END OF SEO IMPLEMENTATION STRATEGY**

*This document represents a comprehensive, data-validated SEO strategy for Lighthouse Mentoring. All keyword data verified via DataForSEO Labs API. Implementation timeline assumes consistent execution and resource allocation as outlined.*