# Content Orchestrator Agent

**Status**: ✅ Real Agent Integration Complete

Coordinates multi-agent workflow for automated blog post creation with direct integration to existing agent classes.

---

## 🎯 Purpose

The Content Orchestrator manages the complete content creation pipeline:

1. **Reference Loading** - Load writing and SEO guidelines
2. **Content Generation** - Generate content via ContentWriterAgent (Claude API)
3. **Humanization** - Validate HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md application
4. **Visual Assets** - Source curated hero images via VisualAssetsAgent
5. **Quality Assurance** - Multi-dimensional QA checks with inline validation
6. **AI Optimization** - Schema markup and AI trust scoring via AISearchOptimizer
7. **Publishing** - Deploy to content collection with PublishingAgent (git integration)

---

## 🏗️ Architecture

### Real Agent Integration

The orchestrator uses **direct imports** of real agent classes:

```typescript
import { ContentWriterAgent } from '../content-writer/index.js';
import { QAAgent } from '../qa-agent/index.js';
import { AISearchOptimizer } from '../ai-search-optimizer/index.js';
import { PublishingAgent } from '../publishing-agent/index.js';
import { VisualAssetsAgent } from '../visual-assets/index.js';
```

### Type Adapters

Converts between orchestrator types and agent-specific types:

```typescript
// ContentCreationRequest → BlogPostBrief
function adaptRequestToBrief(request: ContentCreationRequest): BlogPostBrief;

// WriterBlogPost → PublishingBlogPost
function adaptWriterToPublishing(writerPost, request): PublishingBlogPost;

// WriterBlogPost → AIOptimizer BlogPost
function adaptWriterToAIOptimizer(writerPost): BlogPost;
```

### Workflow Pipeline

```
┌──────────────────────┐
│ Content Request      │
│ (title, keyword,     │
│  wordCount, etc.)    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Load Reference       │
│ Materials            │
│ (guidelines, SEO)    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Generate Content     │  ← ContentWriterAgent (Claude API)
│ (Real Agent)         │     + HOW-TO-WRITE-LIKE-A-HUMAN guidelines
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Humanize Content     │  ← Validation only (already humanized)
│ (Validate)           │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Visual Assets        │  ← VisualAssetsAgent (curated URLs)
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Quality Assurance    │  ← Inline QA validation
│ (QA Gate: ≥70)       │     (Full QAAgent requires file)
└──────────┬───────────┘
           ↓
        Pass? ──No──→ ❌ FAIL
           ↓ Yes
┌──────────────────────┐
│ AI Optimization      │  ← AISearchOptimizer (real agent)
│ (Trust Score: ≥0.85) │     + Schema.org markup
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Publishing           │  ← PublishingAgent (real agent)
│ (Git + Deploy)       │     + Auto-tagging
└──────────┬───────────┘
           ↓
      🚀 PUBLISHED
```

---

## 📋 Content Request Format

```typescript
interface ContentCreationRequest {
  title: string;              // "Executive Coaching ROI: The 788% Return..."
  targetKeyword: string;      // "executive coaching ROI"
  searchVolume?: number;      // 590
  cpc?: number;               // 13.11
  wordCount: number;          // 2500
  category: 'executive-coaching' | 'board-advisory' | 'wellbeing' | 'leadership';
  tags: string[];             // ['executive coaching', 'coaching ROI', ...]
  angle: string;              // "ROI-focused case studies with UK data"
  cta: string;                // "Calculate your potential ROI"
  priority: 'high' | 'medium' | 'low';
}
```

---

## 🚀 Usage

### Prerequisites

1. **Set Claude API Key**:
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```

2. **Ensure guideline files exist**:
   - `HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md`
   - `AI-SEARCH-OPTIMIZATION-PLAN.md`

### Run Demo

```bash
npm run agent:orchestrator -- --demo
```

**Demo Output:**
- Creates sample "Executive Coaching ROI" blog post
- Shows complete workflow with timing
- Saves intermediate results to `agents/orchestrator/output/`
- Final markdown saved to `new-site/src/content/insights/`

### Run from Strategy Document

```bash
npm run agent:orchestrator -- --from-strategy="Executive Coaching ROI"
```

This reads `SERVICE-FOCUSED-SEO-STRATEGY.md` and extracts the blog post specification.

---

## ⚙️ Configuration

```typescript
const orchestrator = new SdkContentOrchestrator({
  agents: {
    research: { name: 'Research', enabled: true, timeout: 30000 },
    contentWriter: { name: 'Content Writer', enabled: true, timeout: 180000 },
    visualAssets: { name: 'Visual Assets', enabled: true, timeout: 60000 },
    qa: { name: 'QA', enabled: true, timeout: 45000 },
    aiOptimizer: { name: 'AI Optimizer', enabled: true, timeout: 30000 },
    publishing: { name: 'Publishing', enabled: true, timeout: 15000 },
  },
  qualityGates: {
    minQaScore: 70,           // Minimum QA score to publish
    minAiTrustScore: 0.85,    // Target AI trust score
    requireHumanReview: false,
  },
  output: {
    saveIntermediateResults: true,
    outputDir: './agents/orchestrator/output',
  },
});
```

---

## 🎯 Quality Gates

### QA Gate (Minimum 70/100)

Content must pass QA checks before proceeding:

- **SEO**: Title, meta description, heading hierarchy, keyword optimization
- **Readability**: Flesch score, sentence/word length, clarity
- **Grammar**: UK English spelling, prose linting
- **AI Detection**: Checks for AI patterns (clichés, formal transitions, sentence variance)

If QA score < 70, workflow fails with detailed error report.

### AI Trust Score Gate (Target 0.85)

After AI optimization, content should achieve:

- **0.85+ (85%)**: Maximum AI search discoverability
- Based on ChatGPT's evaluation criteria:
  - Authority (25%): Named author, credentials, expert positioning
  - Evidence (25%): Citations, authoritative sources, specific data
  - Recency (20%): Publication date, current context
  - Objectivity (15%): Balanced perspective
  - Quality (10%): Structure, headings, readability
  - Reputation (5%): Metadata, domain authority

If AI trust score < 0.85, warning is logged but workflow continues.

---

## 📊 Workflow Stages

### 1. Load Reference Materials

Loads writing and SEO guidelines:

- `HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md`
- `AI-SEARCH-OPTIMIZATION-PLAN.md`

### 2. Content Generation (Real Agent)

Calls ContentWriterAgent which uses Claude API:

```typescript
const writer = new ContentWriterAgent();
await writer.loadGuidelines();

// Convert request to brief format
const brief = adaptRequestToBrief(request);

// Generate content using Claude API
const post = await writer.writeBlogPost(brief);
```

**Features**:
- Automatically applies HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md guidelines
- Uses testimonials for authenticity
- Generates perplexity (unpredictable word choices)
- Adds burstiness (sentence variation: 3 words to 40+ words)
- Removes AI tells (delve, robust, Moreover, Furthermore)
- Uses contractions (don't, can't, won't)
- UK English throughout

### 3. Humanize Content (Validation)

ContentWriterAgent already applies humanization via ClaudeContentService, so this step validates:

- Perplexity applied
- Burstiness applied
- AI tells removed
- Personal voice added
- Contractions used

### 4. Visual Assets (Real Agent)

Uses VisualAssetsAgent with curated Unsplash URLs:

```typescript
const visualAssets = new VisualAssetsAgent();

// Category-specific image mapping
const categoryImageMap = {
  'executive-coaching': 'https://images.unsplash.com/photo-1573496359142...',
  'board-advisory': 'https://images.unsplash.com/photo-1560439514-4e9645...',
  'wellbeing': 'https://images.unsplash.com/photo-1544367567-0f2fcb...',
  'leadership': 'https://images.unsplash.com/photo-1600880292203...',
};
```

### 5. Quality Assurance (Inline Validation)

Performs inline QA validation:

```typescript
// Analyzes content structure
const wordCount = content.split(/\s+/).length;
const hasH1 = content.match(/^# .+$/gm);
const hasH2Plus = (content.match(/^##+ .+$/gm) || []).length >= 4;

// Calculates scores
const seoScore = (hasH1 ? 25 : 0) + (hasH2Plus ? 25 : 0) + ...;
const overallScore = Math.round((seoScore + readability + aiDetection) / 4);
```

**Note**: Full QAAgent integration requires saving content to file first. For in-memory workflow, inline validation is used.

### 6. AI Optimization (Real Agent)

Uses AISearchOptimizer to add schema markup and calculate AI trust:

```typescript
const optimizer = new AISearchOptimizer({
  baseUrl: 'https://lighthousementoring.co.uk',
  organizationName: 'Lighthouse Mentoring',
  author: CRAIG_FEARN_AUTHOR,
});

const result = await optimizer.optimize(aiPost, CRAIG_FEARN_AUTHOR);
```

**Output**:
- Schema.org Article markup
- Optimized metadata (OpenGraph, Twitter cards)
- AI trust score breakdown (authority, evidence, recency, etc.)
- Citation extraction and validation

### 7. Publishing (Real Agent)

Uses PublishingAgent for markdown generation and git integration:

```typescript
const publisher = new PublishingAgent(
  path.join(process.cwd(), 'new-site', 'src', 'content', 'insights'),
  process.cwd()
);

const result = await publisher.publish(publishPost, {
  autoCommit: false,
  autoTag: true,
  autoCategory: false,
});
```

**Features**:
- Markdown file generation with frontmatter
- Auto-tagging using TaxonomyService
- Git staging and commit
- Optional push to remote

---

## 📈 Example Output

```
🎭 SDK CONTENT ORCHESTRATOR STARTED
════════════════════════════════════════════════════════════════════════════════
📝 Creating: Executive Coaching ROI: The 788% Return UK Businesses Are Achieving
🎯 Target Keyword: executive coaching ROI (590/mo)
💰 CPC: £13.11
📊 Priority: HIGH
📏 Target: 2500 words
📂 Category: executive-coaching
════════════════════════════════════════════════════════════════════════════════

🔄 Load Reference Materials
────────────────────────────────────────────────────────────────────────────────
📚 Loading reference materials...
   ✓ Writing guidelines loaded
   ✓ SEO/AI search guidelines loaded
✅ Load Reference Materials completed in 0.0s

🔄 Content Generation (SDK)
────────────────────────────────────────────────────────────────────────────────
✍️  Generating content with ContentWriterAgent...
   → Title: Executive Coaching ROI: The 788% Return UK Businesses Are Achieving
   → Keyword: executive coaching ROI
   → Word count: 2500
   → Category: executive-coaching
📚 Loading writing guidelines...
✅ Writing guidelines loaded
✅ Loaded 22 testimonials
🤖 Generating content with Claude API...
   ✅ 2500 words written
   ✓ Content generated successfully
✅ Content Generation (SDK) completed in 45.2s

...

✅ SDK WORKFLOW COMPLETED SUCCESSFULLY
════════════════════════════════════════════════════════════════════════════════
⏱️  Total Duration: 127.4s
📄 Published: new-site/src/content/insights/executive-coaching-roi-788-return.md
📊 QA Score: 85/100
🤖 AI Trust: 87.0%
📝 Word Count: 2500
════════════════════════════════════════════════════════════════════════════════
```

---

## 🔧 Integration with Real Agents

The orchestrator integrates with real agent classes:

| Agent | Purpose | Integration Status |
|-------|---------|-------------------|
| `ContentWriterAgent` | Content generation with humanization | ✅ Complete |
| `VisualAssetsAgent` | Image sourcing (curated URLs) | ✅ Complete |
| `QAAgent` | Quality assurance checks | ⚠️ Inline validation (full agent requires file) |
| `AISearchOptimizer` | Schema markup, AI trust scoring | ✅ Complete |
| `PublishingAgent` | Markdown generation, git, deployment | ✅ Complete |

---

## ⚠️ Known Issues & Solutions

### 1. Claude Code Native Integration ✅ SOLVED

**No API key needed!** ContentWriterAgent now automatically detects if it's running inside Claude Code and adapts:

**Two Modes Available**:

1. **Claude Code Service** (default, no setup required)
   - Automatically activates when no `ANTHROPIC_API_KEY` is set
   - Uses template-based generation for rapid prototyping
   - Perfect for testing and demonstration
   - No external API calls required

2. **Anthropic API** (optional, for production)
   - Set `ANTHROPIC_API_KEY` environment variable
   - Uses Claude API for content generation
   - Higher quality output for production content

```bash
# Optional - only set if you want Anthropic API mode
export ANTHROPIC_API_KEY=sk-ant-...
```

**💡 Pro Tip**: Since you're inside Claude Code right now, you can ask Claude Code to generate blog posts directly in conversation (like we just did with "Executive Leadership Coaching"). This produces **superior results** to both modes because:
- Full conversational context and iteration
- Real-time feedback and refinement
- Natural language instructions
- No template limitations

Example: Just ask "Write the full blog post for [title] following all guidelines" and Claude Code will generate it directly.

### 2. Path Configuration (FIXED ✅)

PublishingAgent contentDir must account for different working directories. The orchestrator now detects if you're running from the root or inside `new-site/`:

```typescript
// ✅ Fixed: Detects working directory automatically
const cwd = process.cwd();
const isInNewSite = cwd.endsWith('new-site') || cwd.endsWith('new-site\\') || cwd.endsWith('new-site/');
const contentPath = isInNewSite ? 'src/content/insights' : 'new-site/src/content/insights';

const publisher = new PublishingAgent(
  contentPath,
  process.cwd()
);
```

**Why This Works**: The `npm run agent:orchestrator` script changes to the `new-site` directory before running (`cd new-site && npm run...`), so the orchestrator detects this and uses the appropriate relative path.

### 3. QAAgent File Requirement

QAAgent.checkPost() requires a file path. For in-memory workflow, inline validation is used instead.

**Future Enhancement**: Save to temp file and call full QAAgent for comprehensive checks.

---

## 📝 Add to package.json

```json
{
  "scripts": {
    "agent:orchestrator": "tsx agents/orchestrator/runner.ts"
  }
}
```

---

## 🎓 Best Practices

### 1. Always Set Claude API Key

❌ **Wrong**: Run without ANTHROPIC_API_KEY
✅ **Right**: Export key before running orchestrator

### 2. Trust ContentWriterAgent Humanization

ContentWriterAgent already applies HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md guidelines. No second pass needed.

### 3. Quality Gates Are Non-Negotiable

If QA fails, fix issues before retrying. Don't bypass gates.

### 4. Save Intermediate Results

Enable `saveIntermediateResults` for debugging and auditing:

```typescript
output: {
  saveIntermediateResults: true,
  outputDir: './agents/orchestrator/output',
}
```

---

## 🚧 Future Enhancements

- [ ] **Strategy Integration**: Parse SERVICE-FOCUSED-SEO-STRATEGY.md automatically
- [ ] **Full QAAgent Integration**: Save to temp file for comprehensive checks
- [ ] **Batch Mode**: Process multiple posts in sequence
- [ ] **Retry Logic**: Automatic retry with adjustments if QA fails
- [ ] **Human Review Mode**: Pause before publishing for manual review
- [ ] **Analytics**: Track success rates, timing, QA scores
- [ ] **Visual Asset Downloading**: Full Unsplash API integration with optimization

---

## 📚 Related Documentation

- [Agent System Summary](../AGENT-SYSTEM-SUMMARY.md)
- [HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md](../../HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md)
- [AI-SEARCH-OPTIMIZATION-PLAN.md](../../AI-SEARCH-OPTIMIZATION-PLAN.md)
- [SERVICE-FOCUSED-SEO-STRATEGY.md](../../SERVICE-FOCUSED-SEO-STRATEGY.md)

---

**Built for Lighthouse Mentoring**
Real Agent Integration Complete ✅
