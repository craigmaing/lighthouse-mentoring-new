# AI Search Optimization Strategy
## Lighthouse Mentoring - 2025 Plan

**Objective**: Increase visibility and citations in AI-powered search engines (ChatGPT, Perplexity, Google AI Overviews, Gemini) while maintaining traditional SEO strength.

**Context**: With ChatGPT reaching 800M weekly users and Google's search share dropping below 90% for the first time, AI search optimization is critical for professional services visibility.

---

## Current State Analysis

### ✅ What We Have
1. **Strong Schema.org Markup**
   - Organization, Person, Service schemas
   - Breadcrumb navigation
   - Credential markup (FCMI, FRSPH, IoD)
   - E-E-A-T signals via structured data

2. **Expertise Signals**
   - 17 years board-level experience
   - Professional fellowships and credentials
   - Client testimonials from global brands (HSBC, Edrington UK, Brown-Forman)
   - LinkedIn presence

3. **Technical Foundation**
   - Fast loading (Lighthouse 95+)
   - Mobile-responsive
   - Clean semantic HTML
   - Structured content hierarchy

### ❌ What We're Missing (High Impact for AI Search)

1. **FAQ Content** (CRITICAL - AI search heavily favors FAQs)
   - No FAQ schema markup
   - No question-answer format content
   - Missing common user questions

2. **Comparative Content** (Accounts for 33% of AI citations!)
   - "Executive Coaching vs Executive Mentoring"
   - "Board Advisor vs Non-Executive Director"
   - "Internal vs External Wellbeing Audits"
   - "Choosing a Board Advisor: Criteria Comparison"

3. **AI-Optimized Blog/Insights**
   - No long-form answer content
   - Missing "How to..." articles
   - No industry insights or thought leadership

4. **Enhanced Schema Markup**
   - Missing FAQPage schema
   - Missing HowTo schema
   - Missing Article schema
   - Missing Review/AggregateRating schema

5. **Natural Language Optimization**
   - Content not optimized for conversational queries
   - Missing prompt-style questions (e.g., "What should I look for in an executive coach?")

---

## Strategic Plan: 3-Phase Approach

### **Phase 1: Quick Wins (1-2 weeks) - IMMEDIATE IMPACT**

#### 1.1 Add FAQ Sections to All Service Pages
**Why**: FAQ content performs exceptionally well in AI search. AI models are trained to prioritize Q&A format.

**Implementation**:
- **Board Advisory Page**: 8-10 FAQs
  - "What does a board advisor do?"
  - "How is a board advisor different from a non-executive director?"
  - "When should a company hire a board advisor?"
  - "What qualifications should a board advisor have?"
  - "How much does board advisory cost?"

- **Executive Coaching Page**: 8-10 FAQs
  - "What is executive coaching?"
  - "How long does executive coaching take?"
  - "What's the difference between coaching and mentoring?"
  - "How do I choose an executive coach?"
  - "What results can I expect from executive coaching?"

- **Organizational Wellbeing Page**: 8-10 FAQs
  - "What is an organizational wellbeing audit?"
  - "How do you measure workplace wellbeing?"
  - "What is the ROI of wellbeing initiatives?"
  - "How long does a wellbeing audit take?"

**Schema Addition**:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does a board advisor do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Detailed answer here..."
      }
    }
  ]
}
```

**Estimated Impact**: 40-60% increase in AI citations within 30 days

---

#### 1.2 Create Dedicated FAQ Page
**Why**: Centralized FAQ resource increases chances of being cited as authoritative source.

**Content**:
- 20-25 comprehensive FAQs covering all services
- Organized by category (Board Advisory, Coaching, Wellbeing, General)
- Natural language answers (150-300 words each)
- Internal links to relevant service pages

**Technical**:
- FAQPage schema markup
- Semantic HTML5 (article, section tags)
- Expandable accordion UI for UX

**Estimated Impact**: High - single source for multiple AI queries

---

#### 1.3 Add "People Also Ask" Sections
**Why**: Mirrors Google's PAA format, which AI models recognize and prioritize.

**Implementation**:
- Add 3-5 related questions at bottom of each page
- Link to relevant pages or FAQ page
- Use natural language phrasing

**Example** (Executive Coaching page):
- "How is coaching different from therapy?"
- "Can executive coaching help with imposter syndrome?"
- "What happens in a typical coaching session?"

---

### **Phase 2: Content Expansion (2-4 weeks) - COMPARATIVE & THOUGHT LEADERSHIP**

#### 2.1 Create Comparison Content (HIGH PRIORITY)
**Why**: Comparative content accounts for 33% of all AI citations - massive opportunity!

**Articles to Create**:

1. **"Executive Coaching vs Executive Mentoring: Complete Guide"** (2,500 words)
   - Side-by-side comparison table
   - When to choose each
   - Cost comparison
   - Expected outcomes
   - How to decide
   - Schema: Article + ComparisonTable

2. **"Board Advisor vs Non-Executive Director: Key Differences"** (2,000 words)
   - Roles and responsibilities comparison
   - Time commitment differences
   - Governance vs advisory focus
   - When you need each
   - Can you have both?

3. **"Internal vs External Wellbeing Audits: Which is Right?"** (1,800 words)
   - Objectivity comparison
   - Cost-benefit analysis
   - Best use cases for each

4. **"Executive Coaching Providers: How to Choose [Comparison Framework]"** (2,200 words)
   - Qualifications to look for (EMCC, ICF, etc.)
   - Experience levels
   - Specializations
   - Price ranges
   - Red flags to avoid

**Schema Addition**: Article schema with comparative tables

---

#### 2.2 Create "How To" Guides (HowTo Schema)
**Why**: AI search prioritizes instructional content with clear steps.

**Articles**:

1. **"How to Choose a Board Advisor: 7-Step Framework"** (1,500 words)
   - Step-by-step process
   - Checklist included
   - HowTo schema markup

2. **"How to Conduct a Workplace Wellbeing Audit"** (2,000 words)
   - Preparation steps
   - Execution process
   - Analysis framework

3. **"How to Get Maximum Value from Executive Coaching"** (1,200 words)
   - Before coaching: preparation
   - During coaching: engagement tips
   - After coaching: implementation

**Schema Addition**: HowTo schema with step-by-step instructions

---

#### 2.3 Authority-Building Content
**Why**: E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) are critical for AI.

**Content**:

1. **"The Business Case for Workplace Wellbeing: ROI Analysis"** (3,000 words)
   - Research citations
   - Case study data
   - ROI calculations
   - Industry benchmarks

2. **"Board Governance in 2025: Trends and Challenges"** (2,500 words)
   - Current trends
   - Craig's expert perspective
   - Future predictions

3. **"Leadership Development at C-Suite Level: What Works"** (2,000 words)
   - Based on 17 years experience
   - Real case examples
   - Frameworks used

---

### **Phase 3: Enhanced Schema & Technical (2-3 weeks) - ADVANCED OPTIMIZATION**

#### 3.1 Enhanced Structured Data

**Add Review/Rating Schema**:
```json
{
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "15"
  }
}
```

**Add Individual Review Schema** (for testimonials):
```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Andrew Honey CDir FIoD"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "reviewBody": "Craig is an absolute workhorse..."
}
```

**Expand Person Schema**:
- Add "knowsLanguage"
- Add "awards" (IoD Awards)
- Add "memberOf" (professional bodies)
- Add "seeks" (types of engagements)

---

#### 3.2 Create Pillar Content Structure

**Pillar Pages** (comprehensive, 3,000-5,000 words):
1. "Complete Guide to Board Advisory Services"
2. "Executive Coaching: The Definitive Guide"
3. "Organizational Wellbeing: Comprehensive Framework"

**Cluster Content** (supporting articles linking to pillar):
- 5-7 related articles per pillar
- Internal linking strategy
- Topic cluster schema

---

#### 3.3 AI-Specific Technical Optimizations

**Semantic HTML Enhancements**:
```html
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">Article Title</h1>
    <meta itemprop="author" content="Craig Fearn">
  </header>
  <section itemprop="articleBody">
    <!-- Content with clear semantic structure -->
  </section>
</article>
```

**Natural Language Processing Optimization**:
- Add synonyms and related terms
- Use conversational tone in headings
- Include voice-search style questions
- Short paragraphs (2-3 sentences max)

**Content Structure**:
- Use descriptive H2/H3 headings
- Include summaries at top of articles
- Add "Key Takeaways" boxes
- Include downloadable checklists/frameworks

---

## Implementation Priority Matrix

### IMMEDIATE (Week 1-2):
1. ✅ FAQ sections on all service pages + schema
2. ✅ Dedicated FAQ page
3. ✅ "People Also Ask" sections

### HIGH PRIORITY (Week 3-4):
4. ✅ "Executive Coaching vs Mentoring" comparison
5. ✅ "Board Advisor vs NED" comparison
6. ✅ Review/Rating schema for testimonials

### MEDIUM PRIORITY (Week 5-6):
7. ✅ 3 "How To" guides with HowTo schema
8. ✅ Wellbeing ROI article
9. ✅ Enhanced Person schema

### ONGOING (Month 2+):
10. ✅ Pillar content development
11. ✅ Topic cluster expansion
12. ✅ Monthly thought leadership articles

---

## Success Metrics

### AI Search KPIs:
1. **AI Crawler Visits**: Track ChatGPT-User, PerplexityBot, GoogleOther
2. **AI Referral Traffic**: Monitor referrals from ChatGPT, Perplexity
3. **Citation Tracking**: Manual monitoring of brand mentions in AI responses
4. **Position Zero Captures**: Google AI Overview appearances

### Traditional SEO KPIs (Maintain):
5. Organic traffic growth
6. Keyword rankings (top 30 target keywords)
7. Conversion rate from organic
8. Backlink profile growth

### Business KPIs:
9. Inquiry form submissions
10. Discovery call bookings
11. LinkedIn profile views
12. Email newsletter signups

---

## Technical Requirements

### New Components Needed:
1. **FAQAccordion.astro** - Expandable FAQ component with schema
2. **ComparisonTable.astro** - Visual comparison component
3. **HowToSteps.astro** - Step-by-step guide component
4. **ReviewCard.astro** - Individual review display with schema
5. **PeopleAlsoAsk.astro** - Related questions component

### New Pages Needed:
1. `/faq` - Comprehensive FAQ page
2. `/insights` - Blog/article listing page
3. `/insights/coaching-vs-mentoring` - Comparison article
4. `/insights/board-advisor-vs-ned` - Comparison article
5. `/insights/choosing-board-advisor` - How-to guide
6. `/insights/wellbeing-roi` - Authority article

### Schema Enhancements:
1. FAQPage schema component
2. HowTo schema component
3. Article schema component
4. Review schema component
5. AggregateRating schema addition

---

## Content Creation Guidelines for AI Optimization

### Writing Style:
- **Conversational**: Write as if answering a question directly
- **Clear**: Short sentences, simple language (avoid jargon)
- **Structured**: Use headers, bullets, tables liberally
- **Comprehensive**: Answer the question thoroughly (300-500 words per FAQ)
- **Natural**: Include variations of keywords naturally

### Question Format Optimization:
- Use actual questions people ask: "What is...", "How do I...", "When should..."
- Include long-tail variations: "What should I look for when hiring an executive coach?"
- Add location where relevant: "Best board advisor in Cornwall"
- Include problem-focused queries: "How to improve board performance"

### Answer Format:
1. **Direct answer first** (2-3 sentences)
2. **Detailed explanation** (2-3 paragraphs)
3. **Examples or use cases** (when relevant)
4. **Related considerations** (1-2 paragraphs)
5. **Call to action** (subtle)

### Schema Integration:
- Every FAQ gets FAQ schema
- Every how-to gets HowTo schema
- Every article gets Article schema
- Testimonials get Review schema

---

## Competitive Advantage: Craig's Unique Positioning

### Key Differentiators to Emphasize:
1. **Dual Fellowship** (FCMI + FRSPH) - rare combination
2. **17 years board experience** - extensive track record
3. **IoD Ambassador** - industry recognition
4. **Wellbeing + Governance integration** - unique expertise
5. **Global brand clients** - proven at scale

### AI Citation Strategy:
- Consistently mention credentials in answers
- Reference real client outcomes (anonymized where needed)
- Cite industry research and frameworks
- Position as thought leader, not just service provider

---

## Resource Requirements

### Time Investment:
- **Phase 1**: 15-20 hours (FAQ content creation + schema)
- **Phase 2**: 30-40 hours (comparison articles + how-tos)
- **Phase 3**: 20-25 hours (enhanced schema + pillar content)

**Total**: 65-85 hours over 6-8 weeks

### Skills Needed:
- Content writing (FAQ, articles)
- Schema markup (JSON-LD)
- Astro component development
- SEO copywriting
- Basic prompt engineering (to test AI responses)

---

## Testing & Validation

### Before Launch:
1. Validate all schema with Google Rich Results Test
2. Test FAQ rendering in search results
3. Verify structured data in search console
4. Mobile responsiveness check

### After Launch:
1. **Week 1**: Query AI platforms manually with target questions
2. **Week 2**: Check for citations and references
3. **Week 4**: Analyze referral traffic from AI sources
4. **Month 2**: Full analytics review and optimization

### Manual Testing Prompts:
- "Who are the best board advisors in the UK?"
- "What should I look for in an executive coach with board experience?"
- "How do I choose between coaching and mentoring?"
- "What is the ROI of workplace wellbeing programs?"
- "Board advisor vs non-executive director difference"

---

## Expected Outcomes

### 3 Months:
- 50-70% increase in AI search citations
- 30-40% increase in organic discovery traffic
- Ranking for 15+ comparison/FAQ queries
- Appearance in Google AI Overviews for 5-8 queries

### 6 Months:
- Established as authoritative source for board advisory + wellbeing
- 100-150% increase in AI-referred traffic
- Top 3 ranking for primary comparison keywords
- 25-30% increase in qualified leads

### 12 Months:
- Dominant position in AI search for "board advisor + wellbeing" niche
- 200%+ increase in total organic visibility
- Recognized authority cited by AI platforms
- Sustainable content engine producing monthly thought leadership

---

## Risk Mitigation

### Potential Risks:
1. **AI platform changes**: Algorithms and preferences may shift
2. **Over-optimization**: Too much schema can trigger spam filters
3. **Time investment**: Content creation requires significant effort
4. **ROI uncertainty**: AI search metrics still evolving

### Mitigation Strategies:
1. Maintain balance between traditional SEO and AI optimization
2. Focus on genuinely helpful content (not just optimization)
3. Use phased approach to spread effort
4. Track both AI and traditional metrics
5. Start with high-impact, low-effort items (FAQ)

---

## Next Steps

### This Week:
1. Review and approve this plan
2. Prioritize Phase 1 items
3. Begin FAQ content outline for all service pages
4. Set up analytics tracking for AI referrals

### Week 2:
1. Complete FAQ content writing
2. Develop FAQ schema component
3. Create FAQ page structure
4. Begin "People Also Ask" research

### Week 3-4:
1. Launch Phase 1 updates
2. Begin Phase 2 comparison article research
3. Outline pillar content structure
4. Start manual AI query testing

---

## Conclusion

AI search optimization is not a replacement for traditional SEO—it's a complementary strategy that requires a different content approach. By focusing on:

1. **FAQ content** (highest ROI)
2. **Comparison articles** (33% of AI citations)
3. **Structured data** (helps AI understand context)
4. **Authority signals** (E-E-A-T crucial for professional services)
5. **Natural language** (conversational, question-based content)

We can significantly increase Lighthouse Mentoring's visibility in the rapidly growing AI search landscape while maintaining strong traditional SEO performance.

**The opportunity is NOW** - with 800M weekly ChatGPT users and Google's declining search share, early movers in AI search optimization will capture disproportionate visibility in this new channel.

---

**Prepared by**: Claude AI Strategic Analysis
**Date**: October 2, 2025
**Status**: DRAFT - Pending Review & Approval
