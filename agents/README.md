# Lighthouse Mentoring - AI Agents

Custom AI agents built with Claude Agent SDK for strategic SEO, content, and marketing optimization.

## 🏗️ Architecture

Each agent follows the **Agent Loop** pattern:

```
Context Gathering → Action → Verification → Repeat
```

### Built with Claude Agent SDK v0.1.0

- **System Prompts**: Define agent behavior and expertise
- **Custom Tools**: MCP integration (DataForSEO, Bright Data)
- **Subagents**: Parallel task delegation
- **Hooks**: Validation and quality checks
- **State Management**: Track progress and errors

## 🤖 Available Agents

### 1. SEO Research Agent

**Purpose**: Deep keyword research and competitor analysis for Craig's services

**Capabilities**:
- Multi-service keyword research
- Competitor ranking analysis
- Search intent classification
- Opportunity identification
- Strategic recommendations

**Usage**:
```bash
# Analyze all services
npm run agent:seo

# Single service
npm run agent:seo -- --service="board advisory"

# Custom output
npm run agent:seo -- --output=custom-results.json
```

**Output**: JSON file with:
- Keyword data (volume, CPC, competition)
- Competitor analysis
- Identified opportunities
- Strategic recommendations

### Tools Used:
- ✅ DataForSEO MCP (keyword data, SERP analysis)
- ✅ Bright Data MCP (web scraping)
- ⏳ Content analysis (pending)

---

## 📦 Installation

Agents use the Claude Agent SDK:

```bash
npm install @anthropic-ai/claude-agent-sdk
```

## 🔧 Configuration

Each agent has its own config file:

```
agents/
├── seo-research/
│   ├── config.ts       # Agent configuration
│   ├── types.ts        # TypeScript types
│   ├── index.ts        # Main agent class
│   ├── runner.ts       # Execution script
│   └── output/         # Results directory
└── shared/             # Shared utilities
```

### Environment Variables

Create `.env` file:

```env
ANTHROPIC_API_KEY=your_api_key_here
DATAFORSEO_LOGIN=your_dataforseo_login
DATAFORSEO_PASSWORD=your_dataforseo_password
```

## 🎯 Target Services

All agents are configured for Craig's service offerings:

1. Board Advisory
2. Non-Executive Director (NED)
3. Executive Coaching
4. Organizational Wellbeing
5. Wellbeing Audit
6. Wellbeing Governance
7. Leadership Coaching
8. Business Mentoring
9. Strategic Consulting

## 📊 Output Format

Agents export structured JSON:

```json
{
  "metadata": {
    "generatedAt": "2025-10-06T...",
    "services": [...],
    "location": "United Kingdom",
    "languageCode": "en"
  },
  "summary": {
    "servicesAnalyzed": 9,
    "keywordsAnalyzed": 450,
    "totalOpportunities": 127
  },
  "results": [...]
}
```

## 🚀 Development

### Adding a New Agent

1. Create agent directory:
```bash
mkdir -p agents/your-agent/{tools,output}
```

2. Create core files:
- `types.ts` - TypeScript interfaces
- `config.ts` - Agent configuration
- `index.ts` - Main agent class
- `runner.ts` - Execution script

3. Follow the Agent Loop pattern:
```typescript
class YourAgent {
  async run() {
    // PHASE 1: Context Gathering
    const context = await this.gatherContext();

    // PHASE 2: Action
    const results = await this.takeAction(context);

    // PHASE 3: Verification
    const verified = await this.verify(results);

    // PHASE 4: Repeat or finalize
    return this.finalize(verified);
  }
}
```

4. Add npm script to `package.json`:
```json
{
  "scripts": {
    "agent:your-agent": "tsx agents/your-agent/runner.ts"
  }
}
```

## 🔗 MCP Integration

Agents use Model Context Protocol servers defined in `.mcp.json`:

```json
{
  "mcpServers": {
    "dataforseo": {
      "command": "npx",
      "args": ["-y", "@dataforseo/mcp-server"]
    },
    "brightData": {
      "command": "npx",
      "args": ["-y", "@brightdata/mcp"]
    }
  }
}
```

Access MCP tools in agents via the SDK.

## 📝 Best Practices

1. **Test Thoroughly**: Create test sets before production runs
2. **Evaluate Performance**: Track agent success metrics
3. **Iterate Tools**: Improve custom tools based on results
4. **State Management**: Always track progress and errors
5. **Error Handling**: Graceful degradation for API failures
6. **Documentation**: Document findings and recommendations

## 🐛 Debugging

Enable verbose logging:

```bash
npm run agent:seo -- --verbose
```

Check agent state and error logs in output JSON.

## 📚 Resources

- [Claude Agent SDK Docs](https://docs.anthropic.com/claude/docs/claude-agent-sdk)
- [Building Agents Guide](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- [DataForSEO API Docs](https://docs.dataforseo.com/)
- [Bright Data MCP](https://github.com/brightdata/mcp-server)

---

**Built for Lighthouse Mentoring by Craig Fearn**
Powered by Claude Agent SDK + DataForSEO + Bright Data
