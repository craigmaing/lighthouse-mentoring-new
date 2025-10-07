# AI Search Optimization Agent

**Status**: ✅ **COMPLETE**

Optimizes blog content for AI search engines (ChatGPT, Perplexity, Gemini) by adding Schema.org markup, optimized metadata, and structured citations based on ChatGPT's revealed source evaluation criteria.

---

## 🎯 Purpose

This agent implements the **exact scoring methodology** that ChatGPT (and similar AI systems) use to evaluate source credibility:

| Criteria | Weight | What It Measures |
|----------|--------|------------------|
| **Authority** | 25% | Named author, credentials, expert positioning |
| **Evidence/References** | 25% | Citations, authoritative sources, specific data |
| **Recency & Relevance** | 20% | Publication date, current context |
| **Objectivity** | 15% | Balanced perspective, not promotional |
| **Writing Quality** | 10% | Structure, headings, readability |
| **Reputation Signals** | 5% | Metadata, social proof, professional domain |

**Target Score**: 0.85+ (85%) for maximum AI discoverability

---

## 🏗️ Architecture

```
agents/ai-search-optimizer/
├── types.ts              # TypeScript interfaces
├── schema-builder.ts     # Schema.org JSON-LD generator
├── metadata-builder.ts   # Meta tags optimizer
├── citation-linker.ts    # Citation extraction & structuring
├── ai-trust-scorer.ts    # AI trust score calculator
├── index.ts             # Main agent orchestrator
├── runner.ts            # CLI runner
└── README.md            # This file
```

---

## ✨ Features

### 1. Schema.org Markup Generation
Generates structured data that AI systems use to understand authorship and expertise:

```json
{
  "@type": "Article",
  "author": {
    "@type": "Person",
    "name": "Craig Fearn",
    "jobTitle": "Board Advisory & Wellbeing Consultant",
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

### 2. Metadata Optimization
Creates SEO-optimized meta tags (150-160 char descriptions, optimal titles, keywords):

```html
<title>Article Title | Lighthouse Mentoring</title>
<meta name="description" content="Optimized 150-160 char description with author credential">
<meta name="author" content="Craig Fearn">
<meta property="og:title" content="Article Title">
```

### 3. Citation Linking
Extracts citations from content and links to authoritative sources:

```markdown
## References

- Gallup (2024). *State of the Global Workplace*. Available at: [https://www.gallup.com](https://www.gallup.com)
- WHO (2022). *Mental health and work*. Available at: [https://www.who.int](https://www.who.int)
```

### 4. AI Trust Scoring
Evaluates content against ChatGPT's criteria and provides actionable recommendations:

```typescript
{
  overall: 0.91,  // 91% - Excellent!
  breakdown: {
    authority: 0.95,
    evidence: 0.90,
    recency: 1.0,
    objectivity: 0.90,
    quality: 0.95,
    reputation: 0.70
  },
  recommendations: [
    "✅ Excellent! Content exceeds AI trust thresholds"
  ]
}
```

---

## 🚀 Usage

### Command-Line Interface

```bash
# Optimize all posts
npm run agent:ai-optimize

# Optimize specific post
npm run agent:ai-optimize -- --slug=post-name

# Generate detailed report
npm run agent:ai-optimize -- --report

# Verbose output (show all scores)
npm run agent:ai-optimize -- --verbose
```

### Programmatic Usage

```typescript
import { AISearchOptimizer, DEFAULT_CONFIG } from './agents/ai-search-optimizer';

const optimizer = new AISearchOptimizer(DEFAULT_CONFIG);

const post = {
  slug: 'hidden-cost-of-silence',
  title: 'The Hidden Cost of Silence in Call Centers',
  description: 'How unaddressed stress leads to burnout and poor retention',
  content: '...',
  date: '2025-10-06',
  author: 'Craig Fearn',
  tags: ['wellbeing', 'call-centers', 'burnout'],
  categories: ['organizational-wellbeing']
};

const result = await optimizer.optimize(post);

console.log(`AI Trust Score: ${(result.aiTrustScore.overall * 100).toFixed(1)}%`);
console.log(`Citations: ${result.citations.length}`);
console.log(`Recommendations:`, result.aiTrustScore.recommendations);
```

---

## 📊 Output

### OptimizationResult Object

```typescript
{
  slug: string,
  aiTrustScore: {
    overall: number,           // 0-1 weighted score
    breakdown: {
      authority: number,
      evidence: number,
      recency: number,
      objectivity: number,
      quality: number,
      reputation: number
    },
    recommendations: string[]
  },
  schema: {
    article: object,          // Article schema
    person: object,           // Author schema
    organization: object      // Org schema
  },
  metaTags: {
    title: string,
    description: string,
    author: string,
    keywords: string,
    canonical: string,
    openGraph: {...}
  },
  citations: Citation[],
  optimizedFrontmatter: {...},
  astroComponent: string      // Full Astro component with metadata
}
```

---

## 🎯 Integration with Content Pipeline

The AI Search Optimizer fits into the existing agent pipeline:

```
SEO Research → Research Agent → Content Writer → Visual Assets → QA Agent
                                                                      ↓
                                                          AI Search Optimizer
                                                                      ↓
                                                          Publishing Agent → 🚀 Live
```

**When to run**:
- **After QA passes** (score ≥ 70)
- **Before Publishing Agent** deployment

**What it adds**:
- Schema.org markup for AI understanding
- Optimized metadata for AI search
- Structured citations with links
- AI trust score validation

---

## 📈 Success Criteria

### Target Scores

| Score Range | Rating | Action |
|------------|--------|---------|
| **0.90-1.0** | ✅ Excellent | Publish immediately |
| **0.85-0.89** | ✅ Very Good | Minor improvements optional |
| **0.70-0.84** | ⚠️ Good | Implement recommendations |
| **< 0.70** | ❌ Needs Work | Must address issues before publish |

### Example High-Scoring Post

A post with:
- Craig's full credentials in author schema
- 5+ citations (including WHO, Gallup, CIPD)
- Published within 3 months
- Clear structure (intro, headings, conclusion)
- No promotional language
- Complete metadata

**Expected Score**: 0.90-0.95 (90-95%)

---

## 🔧 Configuration

### Default Configuration

```typescript
{
  baseUrl: 'https://lighthouse-mentoring.com',
  organizationName: 'Lighthouse Mentoring',
  organizationUrl: 'https://lighthouse-mentoring.com',
  organizationLogo: '/images/logo.png',
  author: {
    name: 'Craig Fearn',
    jobTitle: 'Board Advisory & Wellbeing Consultant',
    credentials: [
      { type: 'Fellowship', name: 'FRSPH Fellow', issuer: 'Royal Society for Public Health' },
      { type: 'Fellowship', name: 'FCMI Fellow', issuer: 'Chartered Management Institute' },
      { type: 'Ambassadorship', name: 'IoD Ambassador', issuer: 'Institute of Directors South West' }
    ],
    bio: '...',
    url: 'https://lighthouse-mentoring.com/about',
    sameAs: ['https://www.linkedin.com/in/craigfearn/']
  },
  targetAITrustScore: 0.85
}
```

### Custom Configuration

```typescript
import { AISearchOptimizer } from './agents/ai-search-optimizer';

const customConfig = {
  ...DEFAULT_CONFIG,
  targetAITrustScore: 0.90,  // Higher threshold
  author: {
    ...DEFAULT_CONFIG.author,
    sameAs: [
      'https://www.linkedin.com/in/craigfearn/',
      'https://twitter.com/craigfearn'  // Add Twitter
    ]
  }
};

const optimizer = new AISearchOptimizer(customConfig);
```

---

## 🧪 Testing

### Test Single Post

```bash
npm run agent:ai-optimize -- --slug=test-post --verbose
```

### Expected Output

```
🔍 AI Search Optimization Agent

Found 1 post(s) to optimize

📊 Optimization Results

✅ test-post: 91.3%
   Authority: 95%
   Evidence: 90%
   Recency: 100%
   Objectivity: 90%
   Quality: 95%
   Reputation: 70%
   Recommendations:
   - ✅ Excellent! Content exceeds AI trust thresholds

📈 Summary:
   Average AI Trust Score: 91.3%
   ✅ Excellent (≥85%): 1
   ⚠️  Good (70-84%): 0
   ❌ Needs improvement (<70%): 0

✨ Done!
```

---

## 📚 Known Authoritative Sources

The agent recognizes these sources and automatically links them:

- **WHO** (World Health Organization) - https://www.who.int
- **Gallup** - https://www.gallup.com
- **Harvard / HBR** - https://hbr.org
- **CIPD** - https://www.cipd.org
- **McKinsey** - https://www.mckinsey.com
- **Deloitte** - https://www.deloitte.com
- **ILO** (International Labour Organization) - https://www.ilo.org
- **OECD** - https://www.oecd.org
- **SHRM** - https://www.shrm.org
- **Gartner** - https://www.gartner.com

---

## 🚧 Future Enhancements

- [ ] Auto-fetch citation data from APIs
- [ ] Generate suggested citations based on topic
- [ ] A/B test schema variations
- [ ] Track AI search rankings over time
- [ ] Integration with Google Search Console

---

## 🎓 Best Practices

### For Maximum AI Trust Score

1. **Always include author credentials** in schema markup
2. **Cite 5+ authoritative sources** (WHO, Gallup, Harvard, CIPD)
3. **Publish fresh content** (within 6 months)
4. **Use clear structure** (H2/H3 headings, intro, conclusion)
5. **Avoid promotional language** (focus on education)
6. **Add complete metadata** (tags, categories, hero image)
7. **Link to authoritative sources** in references section

### Content Checklist

- [ ] Author name and credentials in frontmatter
- [ ] 3-5 citations from WHO/Gallup/Harvard/CIPD
- [ ] Published within last 6 months
- [ ] 5+ H2 headings with logical structure
- [ ] No "buy now" or "contact us" CTAs in body
- [ ] 5-7 tags + 1-2 categories
- [ ] Hero image with alt text
- [ ] References section at bottom

---

## 📖 Resources

- [ChatGPT Source Evaluation Methodology](../AI-SEARCH-OPTIMIZATION-PLAN.md)
- [Schema.org Article Specification](https://schema.org/Article)
- [Google E-E-A-T Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Harvard Referencing Style](https://www.citethisforme.com/harvard-referencing)

---

**Built for Lighthouse Mentoring**
Engineered to score 0.90+ on ChatGPT's trust evaluation criteria
