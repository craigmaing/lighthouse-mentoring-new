# Netlify Deployment Locking Guide - Prevent Deploy Preview Indexing

## Overview
This guide outlines critical steps to prevent Google from indexing Netlify deploy previews and branch deploys, which are a major source of "ghost pages" in Google Search Console.

## Current Situation Analysis
- **Primary Domain**: lighthousementoring.co.uk (production site - ✅ correctly indexed)
- **Deploy Previews**: `deploy-preview-*--lighthousementoring.netlify.app` ⚠️ **CURRENTLY INDEXABLE**
- **Branch Deploys**: `branch-name--lighthousementoring.netlify.app` ⚠️ **CURRENTLY INDEXABLE**
- **Root Cause**: Deploy previews inherit production's `X-Robots-Tag: index, follow` headers
- **Impact**: Google indexes temporary preview URLs, which become 404 errors when removed

## Why This Matters

### The Problem
Every time you create a PR or push to a non-production branch, Netlify creates a deploy preview:
- ✅ **Good**: Publicly accessible for testing
- ❌ **Bad**: Google can index these URLs
- ❌ **Bad**: When PR merges, preview is removed → 404 error
- ❌ **Bad**: 404 errors appear in Google Search Console as "ghost pages"

**Example**:
```
Production: https://lighthousementoring.co.uk/services/executive-coaching/
✅ Should be indexed

Deploy Preview: https://deploy-preview-123--lighthousementoring.netlify.app/services/executive-coaching/
❌ Should NOT be indexed (temporary testing URL)
```

## Immediate Actions Required

### 1. Add Context-Specific Headers to netlify.toml

**Current Problem**: Your [netlify.toml](netlify.toml) has this:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Robots-Tag = "index, follow"
```

This header is applied to **ALL deployments** including previews!

**Solution**: Add context-specific configuration.

#### Step 1: Add After [build] Section

Open [netlify.toml](netlify.toml) and add this **after** the `[build.environment]` section:

```toml
# ====================================================================
# CONTEXT-SPECIFIC CONFIGURATION
# Prevent deploy previews and branch deploys from being indexed
# ====================================================================

# Production context (your main site)
[context.production]
  command = "npm run build"

  [[context.production.headers]]
    for = "/*"
    [context.production.headers.values]
      X-Robots-Tag = "index, follow"

  [[context.production.headers]]
    for = "/*.html"
    [context.production.headers.values]
      X-Robots-Tag = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"

# Deploy preview context (PR previews) - BLOCK FROM INDEXING
[context.deploy-preview]
  command = "npm run build"

  [[context.deploy-preview.headers]]
    for = "/*"
    [context.deploy-preview.headers.values]
      X-Robots-Tag = "noindex, nofollow"
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"

# Branch deploy context (non-production branches) - BLOCK FROM INDEXING
[context.branch-deploy]
  command = "npm run build"

  [[context.branch-deploy.headers]]
    for = "/*"
    [context.branch-deploy.headers.values]
      X-Robots-Tag = "noindex, nofollow"
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"
```

#### Step 2: Remove Global Headers

After adding context-specific headers, **remove or comment out** these lines from your current [netlify.toml](netlify.toml):

```toml
# DELETE OR COMMENT OUT:
[[headers]]
  for = "/*"
  [headers.values]
    X-Robots-Tag = "index, follow"  # ← This applies to ALL contexts!

[[headers]]
  for = "/*.html"
  [headers.values]
    X-Robots-Tag = "index, follow, max-snippet:-1..."  # ← This too!
```

These should only exist inside `[context.production]` blocks.

### 2. Verify Domain Configuration

#### Primary Domain Setup:
- **Domain**: lighthousementoring.co.uk
- **DNS**: Should point to Netlify's name servers
- **SSL**: Certificate should be active and valid
- **Status**: Primary domain should be active and serving content

#### Redirect Configuration:
The `netlify.toml` file now includes comprehensive redirects:
- All traffic from `lighthousementoring.netlify.app` → `lighthousementoring.co.uk`
- All traffic from `www.lighthousementoring.co.uk` → `lighthousementoring.co.uk`
- All HTTP traffic → HTTPS
- Specific page redirects for old URL patterns

### 3. Monitor and Verify

#### Google Search Console Actions:
1. **Add Both Properties** (if not already done)
   - lighthousementoring.co.uk
   - lighthousementoring.netlify.app

2. **Set Preferred Domain**
   - In lighthousementoring.co.uk property
   - Go to **Settings** → **Site settings** → **Preferred domain**
   - Select **"Don't set a preferred domain"** or **"Display URLs as lighthousementoring.co.uk"**

3. **Submit Sitemap**
   - Ensure `https://lighthousementoring.co.uk/sitemap-index.xml` is submitted
   - Remove any old sitemaps from the .netlify.app property

4. **Monitor Indexing**
   - Watch for duplicate content warnings
   - Monitor crawl errors
   - Track redirect chains

#### Testing Redirects:
Test these URLs to ensure proper redirects:
```
# Test old Netlify app redirects
https://lighthousementoring.netlify.app/ → https://lighthousementoring.co.uk/
https://lighthousementoring.netlify.app/about → https://lighthousementoring.co.uk/about
https://lighthousementoring.netlify.app/services → https://lighthousementoring.co.uk/services

# Test www redirects
https://www.lighthousementoring.co.uk/ → https://lighthousementoring.co.uk/
https://www.lighthousementoring.co.uk/about → https://lighthousementoring.co.uk/about

# Test HTTP to HTTPS
http://lighthousementoring.co.uk/ → https://lighthousementoring.co.uk/
http://www.lighthousementoring.co.uk/ → https://lighthousementoring.co.uk/

# Test old URL patterns
https://lighthousementoring.co.uk/blog/some-post → https://lighthousementoring.co.uk/insights/some-post
https://lighthousementoring.co.uk/board-advisory → https://lighthousementoring.co.uk/services/board-advisory
```

## Configuration Details

### Netlify.toml Redirect Rules Implemented:
1. **Domain-level redirects**: Old Netlify app → New domain
2. **WWW to non-WWW**: Ensures canonical domain structure
3. **HTTP to HTTPS**: Enforces secure connections
4. **Page-specific redirects**: Handles old URL patterns
5. **Blog/Insights redirects**: Manages content migration paths

### SEO Headers Added:
- Proper cache control for different content types
- Security headers for protection
- Robot tags for proper indexing
- Content-type headers for optimal delivery

## Expected Impact

### Immediate Effects:
1. **Ghost Page Resolution**: Old site URLs will redirect to new domain
2. **SEO Consolidation**: Google will recognize preferred domain
3. **User Experience**: No more broken links or duplicate content

### Timeline:
- **24-48 hours**: DNS propagation and redirect activation
- **1-2 weeks**: Google recognizes redirects and updates index
- **2-4 weeks**: Full resolution of ghost pages in search results

### Monitoring Metrics:
- Redirect success rate (should be 100%)
- Google Search Console duplicate content reports
- Search ranking consolidation
- Organic traffic to preferred domain

## Ongoing Maintenance

### Monthly Checks:
1. Verify redirect rules are working
2. Monitor Google Search Console for issues
3. Check for any new ghost pages
4. Validate SSL certificates

### Quarterly Reviews:
1. Audit redirect performance
2. Review sitemap accuracy
3. Check for any new domain variations
4. Update redirect rules as needed

## Emergency Procedures

### If Ghost Pages Persist:
1. **Check DNS**: Ensure all records point correctly
2. **Verify SSL**: Certificate must be valid
3. **Test Redirects**: Use tools like redirect-checker.org
4. **Google Cache**: Request cache removal if needed
5. **Contact Netlify**: Support may need to intervene

### If Site Becomes Inaccessible:
1. **Check Deployment Status**: In Netlify dashboard
2. **Review DNS Settings**: Ensure no conflicts
3. **Verify SSL Certificate**: Not expired or misconfigured
4. **Check Redirect Rules**: No infinite loops
5. **Rollback Changes**: If recent updates caused issues

## Contact Information

### Netlify Support:
- Dashboard: https://app.netlify.com
- Documentation: https://docs.netlify.com
- Support: https://www.netlify.com/support

### Google Search Console:
- Main: https://search.google.com/search-console
- Help: https://support.google.com/webmasters

---

**Implementation Date**: 2025-10-13  
**Last Updated**: 2025-10-13  
**Status**: Ready for Implementation  
**Next Review**: 2025-11-13