# AI Search Optimization Plan
## Content Optimization for LLMs, AI Overviews, and Traditional SEO

**Generated**: 6 October 2025

---

## Executive Summary

This document provides comprehensive guidelines for optimizing content for both **traditional SEO** (Google Search) and **AI-based search** (ChatGPT, Perplexity, Gemini, AI Overviews). The Content Writer Agent must follow these principles to ensure maximum visibility across all search platforms.

**Key Principle**: Clarity, depth, and originality matter more than keyword density or backlinks in AI search.

---

## Part 1: AI-Based SEO (LLM Optimization)

### What is AI Search SEO?

AI Search SEO is the process of optimizing content so it can be **found, understood, and summarized** by AI tools like ChatGPT, Gemini, Claude, and Perplexity. It focuses on:

- **Clarity** - Easy to parse and understand
- **Structure** - Logical organization with headers, bullets, lists
- **Entity-rich information** - People, places, brands, concepts clearly identified
- **Semantic depth** - Covering related concepts, not just keywords

### Core Content Structure for AI

#### 1. **Formatting Requirements**

✅ **Use these formats:**
- Short paragraphs (2-4 sentences max)
- Clear, descriptive headlines (H2, H3 hierarchy)
- Bullet points and numbered lists
- Q&A sections
- How-to guides with step-by-step instructions
- TL;DR summaries at the top
- FAQ sections
- Tables for comparisons

✅ **Content patterns AI loves:**
```markdown
## What is [Topic]?

[Clear definition in 1-2 sentences]

[Topic] is important because:
- Reason 1
- Reason 2
- Reason 3

## How [Topic] Works

1. First step: [Description]
2. Second step: [Description]
3. Third step: [Description]

## Key Benefits

| Benefit | Description | Impact |
|---------|-------------|--------|
| Benefit 1 | Description | Measurable outcome |
```

#### 2. **Semantic SEO and Entity Optimization**

**What are entities?**
Entities are specific people, places, brands, or concepts that search engines and LLMs recognize as distinct "things."

**How to optimize for entities:**

✅ **Clearly identify entities:**
- Use full names on first mention: "Craig Fearn, FRSPH, FCMI"
- Include titles and credentials: "Fellow of the Chartered Management Institute"
- Link to authoritative sources: Wikipedia, official websites, .gov/.edu sites
- Use consistent naming throughout content

✅ **Build entity relationships:**
```markdown
Craig Fearn serves as an IoD Ambassador and works with C-suite executives
including CFOs, CEOs, and board members. His clients include organizations
like HSBC, Edrington UK (The Macallan, Highland Park), and Brown-Forman
(Jack Daniels, Woodford Reserve).
```

This creates clear entity relationships that LLMs can understand.

#### 3. **Topical Authority and Depth**

**Cover related concepts, not just keywords:**

Bad (keyword-focused):
```
Executive coaching helps executives. Executive coaching improves leadership.
Executive coaching is valuable for business.
```

Good (semantically rich):
```
Executive coaching combines behavioral psychology, organizational development,
and strategic advisory to help C-suite leaders navigate complex challenges.
Unlike traditional management consulting, which focuses on processes and
systems, executive coaching addresses the human dimension of leadership—
decision-making under pressure, team dynamics, and personal effectiveness.
```

**Build topic clusters:**
- Pillar page: "Executive Coaching: Complete Guide"
- Cluster pages:
  - "Executive Coaching vs. Mentoring"
  - "How to Choose an Executive Coach"
  - "ROI of Executive Coaching for C-Suite Leaders"
  - "Executive Coaching Methodologies"

Internal link all cluster pages to the pillar page.

#### 4. **Natural Language and Conversational Queries**

**Optimize for how people actually ask questions:**

Traditional SEO: "executive coaching london"

AI Search queries:
- "What's the difference between executive coaching and mentoring?"
- "How do I find an executive coach with board-level experience?"
- "Is executive coaching worth it for CFOs?"
- "What should I expect from my first executive coaching session?"

**Write content that directly answers these questions.**

### Authority and Trust Signals for AI

#### 1. **Author Credibility**

AI tools **strongly prefer** content written by industry experts.

✅ **Always include:**
- Author bio with credentials
- Links to author's professional profiles (LinkedIn)
- Credentials in byline: "By Craig Fearn, FRSPH, FCMI"

#### 2. **Source Citation**

Link to **trusted, authoritative sources**:

✅ **High-authority TLDs:**
- .gov (government websites)
- .edu (educational institutions)
- .org (established organizations)
- Major publications (Harvard Business Review, McKinsey, etc.)

#### 3. **E-E-A-T Signals**

**E-E-A-T** = Experience, Expertise, Authoritativeness, Trustworthiness

---

## Part 2: Technical SEO for AI Search

### 1. **Structured Data (Schema Markup)**

**Critical for AI understanding**, though evidence is mixed on direct ranking impact.

✅ **Required schema types for blog posts:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What's the Difference Between Executive Coaching and Mentoring?",
  "author": {
    "@type": "Person",
    "name": "Craig Fearn",
    "jobTitle": "Executive Coach and Board Advisor",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Fellowship",
        "name": "FRSPH Fellow"
      }
    ]
  }
}
```

### 2. **Metadata Optimization**

✅ **Title tags** (50-60 characters)
✅ **Meta descriptions** (150-160 characters)
✅ **Header hierarchy** (H1 → H2 → H3)

### 3. **Crawlability for AI Bots**

✅ **robots.txt** - Allow AI crawlers:
```
User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

### 4. **Performance Optimization**

AI bots **heavily penalize slow sites**.

✅ **Performance targets:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## Part 3: Traditional SEO Best Practices

### 1. **Keyword Research and Targeting**

✅ **Primary keyword**: Include in:
- H1 title
- First paragraph (first 100 words)
- At least one H2 heading
- Meta title and description
- Image alt text
- URL slug

✅ **Keyword density**: 1-2% (natural usage, not forced)

### 2. **Content Length and Depth**

✅ **Optimal length by content type:**
- Pillar content: 2,500-4,000 words
- Topic cluster posts: 1,500-2,500 words
- How-to guides: 1,200-2,000 words

### 3. **Internal Linking**

✅ **Link structure:**
- Every blog post should link to 3-5 other relevant posts
- Use descriptive anchor text
- Link to pillar pages from cluster content

### 4. **User Experience Signals**

✅ **Improve engagement:**
- Strong, compelling introductions
- Scannable formatting
- Visual breaks (images, tables)
- Clear CTAs

---

## Part 4: Content Writer Agent Implementation

### Required Frontmatter

```yaml
---
title: "Executive Coaching vs Mentoring: Key Differences"
description: "Clear explanation of executive coaching vs mentoring"
publishDate: 2025-01-15
author: "Craig Fearn"
authorCredentials: "FRSPH, FCMI, IoD Ambassador"
keywords: ["executive coaching", "mentoring", "leadership"]
schema: "Article"
draft: false
---
```

### AI-Specific Content Additions

✅ **Add these sections to every post:**

**TL;DR Summary (at top)**
**FAQ Section (at bottom)**
**Key Takeaways Box**
**Author Bio with Credentials**

---

## Part 5: Quality Checklist

### AI Search Optimization ✅
- [ ] Short paragraphs (2-4 sentences)
- [ ] Clear H2/H3 hierarchy
- [ ] Bullet points and lists
- [ ] TL;DR summary included
- [ ] FAQ section included
- [ ] Entities clearly identified
- [ ] Author bio with credentials

### Traditional SEO ✅
- [ ] Primary keyword in H1, first paragraph
- [ ] Meta title optimized (50-60 characters)
- [ ] Meta description optimized (150-160 characters)
- [ ] 3-5 internal links
- [ ] 2-5 external authoritative links

### Technical SEO ✅
- [ ] Schema markup (Article, FAQPage, or HowTo)
- [ ] Images optimized (WebP/AVIF)
- [ ] Mobile-responsive
- [ ] Fast load time (< 2.5s LCP)

---

## Success Metrics

### Traditional SEO Metrics
- Organic search traffic growth
- Keyword rankings (top 10)
- Time on page / engagement

### AI Search Metrics
- ChatGPT referral traffic
- Perplexity citations
- AI Overview appearances
- Conversion rate from AI traffic

**Note**: Perplexity has proven to deliver the highest conversion rates among AI search platforms.

---

*This document should be used by the Content Writer Agent to ensure all content is optimized for both traditional and AI-based search engines.*
