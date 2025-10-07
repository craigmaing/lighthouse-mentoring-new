# SEO Research Agent - Quick Start Guide

## 🎯 What It Does

The SEO Research Agent analyzes Craig Fearn's service offerings to identify:
- **High-value keywords** with strong search volume and low competition
- **Competitor strategies** - who ranks for what, and why
- **Content opportunities** - gaps in the market you can fill
- **Long-tail keywords** - specific phrases with conversion potential
- **Strategic recommendations** - actionable SEO insights

## 🚀 Quick Start

### 1. Test Run (Single Service)

```bash
npm run agent:seo:test
```

This analyzes "board advisory" and creates `output/test.json`

### 2. Full Analysis (All Services)

```bash
npm run agent:seo
```

Analyzes all 9 services Craig offers.

### 3. Custom Service

```bash
npm run agent:seo -- --service="executive coaching"
```

### 4. Custom Output Location

```bash
npm run agent:seo -- --output=my-results.json
```

## 📊 Understanding the Output

The agent creates a JSON file with:

```json
{
  "metadata": {
    "generatedAt": "2025-10-06...",
    "services": ["board advisory", ...],
    "location": "United Kingdom",
    "languageCode": "en"
  },
  "summary": {
    "servicesAnalyzed": 9,
    "keywordsAnalyzed": 450,
    "competitorsAnalyzed": 70,
    "totalOpportunities": 127
  },
  "results": [
    {
      "primaryKeyword": "board advisory",
      "relatedKeywords": [
        {
          "keyword": "board advisory services UK",
          "searchVolume": 320,
          "cpc": 12.50,
          "competition": "MEDIUM",
          "intent": "commercial"
        }
      ],
      "competitors": [
        {
          "domain": "competitor.com",
          "title": "Board Advisory Services...",
          "rank": 1
        }
      ],
      "opportunities": [
        {
          "type": "low-competition",
          "keyword": "board advisory for tech startups",
          "reason": "High volume (180) with low competition",
          "priority": "high",
          "estimatedTraffic": 54
        }
      ],
      "recommendations": [
        "Target 5 high-priority keywords...",
        "Create content specifically targeting..."
      ]
    }
  ]
}
```

## 🔍 What to Look For

### High-Priority Opportunities

Look for keywords with:
- ✅ **Search volume > 100/month**
- ✅ **Low to medium competition**
- ✅ **Commercial or transactional intent**
- ✅ **Matches Craig's expertise**

### Example Winning Keyword:
```
"wellbeing governance board"
- Volume: 210/month
- CPC: £15.20 (indicates buyer intent)
- Competition: LOW
- Estimated traffic: 63 visits/month at #1
```

### Competitor Insights

Analyze what competitors rank for:
- What keywords do they dominate?
- What content do they create?
- What's their unique positioning?
- Where are the gaps you can exploit?

### Long-Tail Gold

These are your quick wins:
- Specific, 3-5 word phrases
- Lower competition
- Higher conversion rates
- Easier to rank for

Example:
- ❌ "coaching" (too broad, high competition)
- ✅ "executive coaching for new CEOs UK" (specific, winnable)

## 🎬 Next Steps After Running

1. **Review Opportunities**
   - Export high-priority keywords to a spreadsheet
   - Map them to existing or planned content
   - Identify quick wins vs. long-term targets

2. **Analyze Competitors**
   - Study their top-ranking pages
   - Understand their content strategy
   - Find differentiation angles

3. **Create Content Plan**
   - Blog posts targeting long-tail keywords
   - Service pages optimized for primary keywords
   - Case studies for commercial intent keywords

4. **Update Site Pages**
   - Optimize existing service pages
   - Add new service-specific pages
   - Create blog content targeting opportunities

## 🛠️ Current Status

**Agent Infrastructure**: ✅ Built and ready
**DataForSEO Integration**: ⏳ Pending (TODO markers in code)
**Testing**: Ready for initial test runs

### Next Integration Steps

The agent is structurally complete but needs:

1. **MCP Tool Connections**
   - Connect to DataForSEO MCP server
   - Implement actual API calls in `tools/dataforseo.ts`
   - Replace TODO placeholders with real data fetching

2. **Test with Real Data**
   - Run against DataForSEO sandbox
   - Validate output format
   - Tune keyword filters

3. **Optimize Performance**
   - Batch API calls efficiently
   - Add caching for repeated queries
   - Implement rate limiting

## 💡 Pro Tips

1. **Start Small**: Test with 1-2 services first
2. **Review Manually**: Agent finds opportunities, you validate them
3. **Iterate**: Run monthly to track changes in search landscape
4. **Combine with Human**: Agent speeds research, human adds strategic context

## 🐛 Troubleshooting

**Agent won't run?**
- Check Node.js version (18+)
- Verify `tsx` is installed: `npm install tsx --save-dev`
- Ensure you're in the `/new-site` directory

**No output file?**
- Check `agents/seo-research/output/` directory exists
- Verify write permissions
- Look for error messages in console

**Empty results?**
- DataForSEO integration not complete (expected)
- Check for error messages
- Review agent state in output JSON

## 📞 Support

Built for Lighthouse Mentoring as part of the Claude Agent SDK implementation.

Current phase: Infrastructure complete, MCP integration in progress.
