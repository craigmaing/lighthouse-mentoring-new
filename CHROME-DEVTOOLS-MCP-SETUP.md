# Chrome DevTools MCP Setup Documentation

## Overview
The Chrome DevTools MCP (Model Context Protocol) server provides Claude Code with direct access to Chrome DevTools Protocol, enabling browser automation, debugging, and analysis capabilities.

## Installation & Configuration Complete

### 1. Global MCP Configuration
**Location**: `C:\Users\Fearn\.mcp.json`

Added the following configuration:
```json
"chrome-devtools": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest"]
}
```

### 2. Claude Settings Configuration
**Location**: `C:\Users\Fearn\.claude\settings.local.json`

Added `"chrome-devtools"` to the `enabledMcpjsonServers` array:
```json
"enabledMcpjsonServers": [
  "dataforseo-labs",
  "dataforseo-keywords",
  "dataforseo-serp",
  "memory",
  "fetch",
  "bright-data",
  "chrome-devtools"  // <- Added
]
```

### 3. Local Project Configuration (Already Present)
**Location**: `C:\Users\Fearn\New folder (4)\new-site\.mcp.json`

The local project already had Chrome DevTools configured, but it needs to be globally enabled to work.

## Prerequisites

### System Requirements
- **Node.js**: Version 16 or higher (for npx)
- **Chrome Browser**: Must be installed on the system
- **Network**: Internet connection for initial package download

### Chrome Browser Location
The MCP will attempt to find Chrome automatically in standard locations:
- Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Alternative: `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`

## Activation Steps

### ⚠️ REQUIRED: Restart Claude Code
After configuration changes, you must:
1. **Close Claude Code completely**
2. **Reopen Claude Code**
3. The MCP servers will initialize on startup

## Available Chrome DevTools MCP Commands

Once activated, the following commands will be available:

### Browser Control
- `chrome_devtools.navigate` - Navigate to a URL
- `chrome_devtools.click` - Click an element
- `chrome_devtools.type` - Type text into an input
- `chrome_devtools.screenshot` - Take a screenshot
- `chrome_devtools.evaluate` - Execute JavaScript

### Page Analysis
- `chrome_devtools.getMetrics` - Get page performance metrics
- `chrome_devtools.getCookies` - Get browser cookies
- `chrome_devtools.getLocalStorage` - Get localStorage data
- `chrome_devtools.getNetworkData` - Get network requests

### Debugging
- `chrome_devtools.getConsoleMessages` - Get console output
- `chrome_devtools.getRuntimeExceptions` - Get JavaScript errors
- `chrome_devtools.getPageSource` - Get page HTML

## How It Works

1. **Initialization**: When Claude Code starts, it launches the Chrome DevTools MCP server via npx
2. **Chrome Launch**: The MCP launches a headless Chrome instance with debugging protocol enabled
3. **Communication**: Claude Code communicates with Chrome via the DevTools Protocol
4. **Commands**: Each MCP command translates to Chrome DevTools Protocol commands

## Troubleshooting

### MCP Not Available After Restart
1. Check if Chrome is installed
2. Verify Node.js is installed: `node --version`
3. Check logs in Claude Code for MCP initialization errors

### Chrome Launch Issues
If Chrome fails to launch:
1. Ensure Chrome is installed in a standard location
2. Check if antivirus is blocking Chrome headless mode
3. Try running Chrome manually to ensure it works

### Connection Errors
1. Ensure no other process is using the Chrome debugging port (9222)
2. Check firewall settings for localhost connections
3. Restart the computer if ports are stuck

## Testing the Setup

After restarting Claude Code, test with:

```javascript
// Test navigation
await chrome_devtools.navigate({ url: "https://example.com" });

// Test screenshot
await chrome_devtools.screenshot({
  path: "test-screenshot.png",
  fullPage: true
});

// Test JavaScript execution
await chrome_devtools.evaluate({
  expression: "document.title"
});
```

## Security Considerations

- The Chrome instance runs in a sandboxed environment
- Each session uses a fresh Chrome profile
- No persistent data between sessions
- Limited to localhost connections only

## Performance Notes

- Chrome runs in headless mode by default (no UI)
- Each command has a timeout to prevent hanging
- Browser instance is reused for efficiency
- Memory is cleared between navigations

## Use Cases for Lighthouse Mentoring Site

1. **Performance Testing**: Analyze Core Web Vitals and Lighthouse scores
2. **SEO Validation**: Check meta tags, structured data, and crawlability
3. **Visual Testing**: Screenshot pages for design verification
4. **Form Testing**: Automate form submissions and validation
5. **Cross-browser Testing**: Verify site works in Chrome-based browsers
6. **Accessibility Testing**: Check ARIA labels and keyboard navigation

## Next Steps

1. **Restart Claude Code** to activate the MCP
2. **Verify** the Chrome DevTools commands are available
3. **Test** basic navigation and screenshot capabilities
4. **Integrate** into site testing workflows

---

**Setup Status**: ✅ Configuration Complete
**Next Action**: Restart Claude Code to activate the Chrome DevTools MCP