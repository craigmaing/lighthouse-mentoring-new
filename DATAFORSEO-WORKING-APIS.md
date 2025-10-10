# DataForSEO Working APIs - Documentation

## Summary

After systematic testing, we have identified **5 working DataForSEO APIs** that can be used for programmatic SEO keyword research for Lighthouse Mentoring.

## Working APIs

### 1. keywords_search_volume ✅

**Purpose**: Get search volume, CPC, competition data for specific keywords

**Example Usage**:
```javascript
keywords_search_volume(
  keywords: ["executive coaching", "leadership coaching", "business coaching"],
  location_name: "United Kingdom",
  language_name: "English"
)
```

**Data Returned**:
- Monthly search volume
- Cost-per-click (CPC) in GBP
- Competition level (0-1 scale)
- Competition tier (LOW/MEDIUM/HIGH)
- Monthly search trends (12 months)

**Example Results**:
| Keyword | Search Volume | CPC | Competition |
|---------|---------------|-----|-------------|
| executive coaching | 1,900/mo | £9.30 | 0.52 (MEDIUM) |
| leadership coaching | 1,900/mo | £10.48 | 0.37 (MEDIUM) |
| business coaching | 3,600/mo | £9.55 | 0.48 (MEDIUM) |

**Use Cases**:
- Validate keyword opportunities
- Prioritize keywords by search volume
- Identify high-value keywords by CPC
- Assess competition levels

---

### 2. serp_google_organic_live ✅

**Purpose**: Get live Google SERP results for a keyword

**Example Usage**:
```javascript
serp_google_organic_live(
  keyword: "executive coaching london",
  location_name: "United Kingdom",
  language_name: "English",
  depth: 10
)
```

**Data Returned**:
- Top 10 organic results (title, URL, description)
- Local pack results (maps/local businesses)
- People Also Ask questions
- Related searches
- SERP features (featured snippets, knowledge panels)
- Domain rankings and positions

**Example Findings**:
- **Local Pack Dominates**: Positions 1-3 for city-specific searches
- **Top Organic Competitors**: london.edu, eqworks.co.uk, executive-coaching.co.uk
- **People Also Ask**: "How much does executive coaching cost UK?"
- **Related Searches**: "executive coaching london reviews", "cost", "best"

**Use Cases**:
- Analyze SERP landscape for target keywords
- Identify content gaps and opportunities
- Understand local pack dominance
- Extract "People Also Ask" questions for content ideas

---

### 3. ranked_keywords ✅

**Purpose**: Get keywords that a specific domain ranks for

**Example Usage**:
```javascript
ranked_keywords(
  target: "executive-coaching.co.uk",
  location_code: 2826,
  language_code: "en",
  limit: 1000
)
```

**Data Returned**:
- Keywords domain ranks for
- Position in SERPs
- Search volume per keyword
- Estimated traffic value (ETV)

**Note**: Returns `null` for new/unranked domains (like lighthouse-mentoring.co.uk)

**Use Cases**:
- Competitor keyword analysis
- Identify gaps in own rankings
- Discover new keyword opportunities
- Benchmark against competitors

---

### 4. competitors_domain ✅

**Purpose**: Find competitor domains and their keyword overlap

**Example Usage**:
```javascript
competitors_domain(
  target: "executive-coaching.co.uk",
  location_code: 2826,
  language_code: "en",
  limit: 10
)
```

**Data Returned**:
- Top competing domains
- Number of overlapping keywords
- Average position of competitor
- Estimated traffic value (ETV)
- Domain authority metrics

**Example Top Competitors**:
1. **executive-coaching.co.uk** - 456 keywords, avg pos 35.6, ETV £5,605
2. **linkedin.com** - 321 overlapping keywords
3. **youtube.com** - 293 overlapping keywords
4. **indeed.com** - 260 overlapping keywords
5. **reddit.com** - 257 overlapping keywords
6. **hbr.org** - 165 overlapping keywords
7. **betterup.com** - 162 overlapping keywords

**Use Cases**:
- Identify direct competitors
- Find content platforms dominating SERPs
- Discover niche competitors
- Understand competitive landscape

---

### 5. keyword_ideas_live ✅ (with limit parameter)

**Purpose**: Generate related keyword ideas from seed keywords

**Example Usage**:
```javascript
keyword_ideas_live(
  keywords: ["executive coaching"],
  location_code: 2826,
  language_code: "en",
  limit: 10  // CRITICAL: Must use limit parameter to avoid oversized response
)
```

**IMPORTANT**:
- **Must use `limit: 10-20`** to avoid responses exceeding 25K token limit
- Without limit, returns 100K+ tokens (fails)
- Total keyword database: 108,694 keywords for "executive coaching"

**Data Returned** (per keyword):
- Related keyword variations
- Search volume and trends
- CPC and competition data
- Search intent classification
- Keyword difficulty score
- Average backlinks needed to rank

**Example Keyword Ideas** (from "executive coaching"):
1. **business coach london** - 480/mo, £7.04 CPC, 0.39 competition, KD: 9
2. **business coach** - 3,600/mo, £9.55 CPC, 0.48 competition, KD: 18
3. **executive coaching london** - 720/mo, £6.75 CPC, 0.26 competition, KD: 14
4. **executive coaching uk** - 320/mo, £7.48 CPC, 0.26 competition, KD: 14
5. **executive coaching services** - 210/mo, £11.57 CPC, 0.05 competition, KD: 0
6. **executive leadership coaching** - 590/mo, £10.09 CPC, 0.11 competition, KD: 19
7. **business coaching services** - 210/mo, £11.76 CPC, 0.03 competition, KD: 12
8. **business coach uk** - 390/mo, £4.88 CPC, 0.48 competition, KD: 6
9. **executive coaching company** - 170/mo, £7.41 CPC, 0.08 competition, KD: 11

**Search Intent Classification**:
- **Commercial**: business coach london, executive leadership coaching
- **Navigational**: executive coaching uk, executive coaching services, business coaching services
- **Transactional**: business coach uk

**Use Cases**:
- Discover long-tail keyword variations
- Identify city-specific keywords
- Find service-specific variations
- Uncover low-competition opportunities

---

## Non-Working APIs

### ❌ keyword_suggestions
- **Error**: 404 Not Found
- **Reason**: Endpoint does not exist or not available in subscription
- **Alternative**: Use `keyword_ideas_live` instead

### ❌ keyword_difficulty
- **Error**: 404 Not Found
- **Reason**: Endpoint does not exist or not available
- **Alternative**: `keyword_ideas_live` returns `keyword_difficulty` score for each keyword

### ❌ keyword_ideas (without "live")
- **Error**: Response too large (434,490 tokens)
- **Reason**: No pagination/limit support
- **Alternative**: Use `keyword_ideas_live` with limit parameter

### ❌ backlinks_summary
- **Error**: Access denied - requires subscription upgrade
- **Reason**: Backlinks API is separate paid tier
- **Alternative**: Focus on keyword and SERP data

---

## Recommended Research Workflow

### Phase 1: Seed Keyword Validation
1. Use `keywords_search_volume` to validate core service keywords:
   - executive coaching
   - leadership coaching
   - business coaching
   - wellbeing consultant
   - board advisory

### Phase 2: City-Specific Research
1. Use `keyword_ideas_live` (limit: 10-20) to find city variations:
   - "[service] london"
   - "[service] manchester"
   - "[service] birmingham"
   - "[service] edinburgh"
   - "[service] bristol"

2. Use `serp_google_organic_live` to analyze local pack dominance

### Phase 3: Long-Tail Discovery
1. Use `keyword_ideas_live` to discover:
   - Industry-specific: "[service] for [industry]"
   - Role-specific: "[service] for [C-suite role]"
   - Service variations: "[service] services", "[service] company"

### Phase 4: Competitive Analysis
1. Use `competitors_domain` to identify top competitors
2. Use `ranked_keywords` to analyze competitor keyword portfolios
3. Use `serp_google_organic_live` to understand SERP features

### Phase 5: Prioritization
1. Compile all keywords with:
   - Search volume (from keyword_ideas_live or keywords_search_volume)
   - CPC (indicates commercial intent)
   - Competition level (0-1 scale)
   - Keyword difficulty (0-100 score)
   - Search intent (commercial/navigational/transactional)

2. Priority Matrix:
   - **High Priority**: 200-2,000 monthly searches, KD < 20, commercial/transactional intent
   - **Medium Priority**: 100-500 searches, KD 20-40, any intent
   - **Low Priority**: < 100 searches or KD > 40

---

## Key Insights from Initial Testing

### City-Specific Opportunities
- **"executive coaching london"**: 720/mo, £6.75 CPC, KD: 14 ✅ HIGH PRIORITY
- **"business coach london"**: 480/mo, £7.04 CPC, KD: 9 ✅ HIGH PRIORITY
- Local pack dominates city searches (positions 1-3)

### Service Variations
- **"executive coaching services"**: 210/mo, £11.57 CPC, KD: 0 ✅ VERY HIGH PRIORITY (no difficulty!)
- **"business coaching services"**: 210/mo, £11.76 CPC, KD: 12 ✅ HIGH PRIORITY
- **"executive leadership coaching"**: 590/mo, £10.09 CPC, KD: 19 ✅ HIGH PRIORITY

### UK-Wide Opportunities
- **"executive coaching uk"**: 320/mo, £7.48 CPC, KD: 14 ✅ HIGH PRIORITY
- **"business coach uk"**: 390/mo, £4.88 CPC, KD: 6 ✅ HIGH PRIORITY

### Competitor Landscape
- **LinkedIn, YouTube, Reddit** dominate informational content
- **executive-coaching.co.uk** is primary competitor (456 keywords, £5.6K ETV)
- **HBR, BetterUp** are thought leadership competitors

---

## API Cost Notes

- **keywords_search_volume**: £0.011 per request
- **serp_google_organic_live**: £0.011 per request
- **keyword_ideas_live**: £0.011 per request
- **competitors_domain**: £0.011 per request
- **ranked_keywords**: £0.011 per request

**Budget-Friendly**: All APIs cost the same, so prioritize comprehensive `keyword_ideas_live` research.

---

## Next Steps

1. ✅ API Testing Complete
2. ⏳ Use `keyword_ideas_live` to generate 500+ keyword ideas for:
   - Executive coaching variations
   - Leadership coaching variations
   - Wellbeing consultant variations
   - Board advisory variations
   - City-specific combinations

3. ⏳ Use `serp_google_organic_live` to analyze SERP landscape for top 50 keywords

4. ⏳ Compile comprehensive keyword priority matrix

5. ⏳ Document all findings in PROGRAMMATIC-SEO-RESEARCH.md
