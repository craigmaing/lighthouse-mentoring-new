# DataForSEO MCP Configuration Fix

## Problem
DataForSEO MCP server was returning 401 authentication errors despite having credentials configured.

## Root Causes Identified
1. **Incorrect package name**: Was using `@dataforseo/mcp-server-dataforseo` (doesn't exist)
2. **Wrong MCP server package**: Should use `dataforseo-mcp-server`

## Solution

### Correct Configuration
Update `.mcp.json` with:

```json
{
  "mcpServers": {
    "dataforseo": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "dataforseo-mcp-server"
      ],
      "env": {
        "DATAFORSEO_USERNAME": "your-email@domain.com",
        "DATAFORSEO_PASSWORD": "your-api-password"
      }
    }
  }
}
```

### Key Points
- Package name: `dataforseo-mcp-server` (version 2.7.11)
- Environment variables: `DATAFORSEO_USERNAME` and `DATAFORSEO_PASSWORD`
- Authentication uses email/password from DataForSEO account

### Required Action
**RESTART CLAUDE CODE** after making these changes to reload the MCP server with the correct configuration.

## Verification
After restart, test with:
```javascript
// Test keyword search volume
mcp__dataforseo__keywords_data_google_ads_search_volume
// Test SERP analysis
mcp__dataforseo__serp_organic_live_advanced
// Test keyword suggestions
mcp__dataforseo__dataforseo_labs_google_keyword_suggestions
```

## Available DataForSEO Tools
Once configured, you'll have access to:
- Keyword research and search volume data
- SERP analysis and competitor research
- Keyword suggestions and related terms
- CPC and competition metrics
- Trend data and search intent analysis
- Backlink analysis
- Content analysis
- Domain analytics

## Troubleshooting
If still getting 401 errors after restart:
1. Verify credentials at https://app.dataforseo.com/api-dashboard
2. Check if credentials need regeneration
3. Ensure no typos in email/password
4. Contact DataForSEO support if credentials are correct but still failing