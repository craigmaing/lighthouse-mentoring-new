# Old Site Ghost Pages - Comprehensive Fix Strategy

**Date**: 2025-10-13
**Issue**: Old site URLs (from previous lighthousementoring.co.uk site) are still indexed in Google
**Impact**: 111 pages not indexed, only 28 pages indexed (down from 80 in August)

---

## The Situation

### What Happened
1. **Old site** existed at `lighthousementoring.co.uk` with different:
   - URL structure
   - Page slugs
   - Content organization
   - Service pages
   - Blog posts

2. **New site** was built from scratch with:
   - New Astro framework
   - Different URL patterns
   - Only 19 valid pages
   - New content structure

3. **Google still remembers** the old site:
   - 15 pages return 404 errors (old URLs)
   - 67 pages "crawled but not indexed"
   - 12 pages have redirects (some might be broken)
   - 3 soft 404s
   - Total: **111 pages NOT indexed** vs only **28 indexed**

### Critical Issue
You've lost **52 indexed pages** since August (80 → 28). This is a **severe de-indexing event** because:
- Google keeps trying to crawl old URLs
- Old URLs return 404 errors
- Google interprets this as site quality issues
- Google de-indexes your NEW pages as punishment

---

## Fix Strategy

Since we **don't have the specific old URLs**, we'll implement a **multi-layer protection strategy**:

### Strategy 1: Catch-All Redirect with Intelligent Routing (RECOMMENDED)

Instead of needing specific old URLs, we'll:
1. **Catch all undefined routes** with Netlify redirects
2. **Return 410 Gone** for truly deleted content
3. **Let Astro handle valid routes** normally
4. **Speed up Google's removal** of old URLs

### Strategy 2: Request Mass Removal in Google Search Console

Since these are all old URLs from a previous site:
1. Use Google Search Console "Remove outdated content" feature
2. Request removal of entire old site patterns
3. Force Google to re-crawl and re-index fresh

### Strategy 3: Implement Robust 404 Handling

Make sure 404s are proper 404s (not soft 404s):
1. Return correct HTTP status codes
2. Provide helpful 404 page with navigation
3. Help Google understand pages are permanently gone

---

## Implementation Plan

### Phase 1: Add Catch-All 410 Gone Response

**Edit netlify.toml** - Add this at the END of the redirects section:

```toml
# ====================================================================
# CATCH-ALL FOR OLD SITE URLS (410 Gone)
# ====================================================================
# Any URL that doesn't match above redirects or Astro routes
# Gets a 410 Gone status (tells Google page is permanently deleted)
[[redirects]]
  from = "/*"
  to = "/404"
  status = 410
  force = false  # Only triggers if no other route matches
```

**What this does**:
- Any old URL that doesn't exist in new site → 410 Gone
- 410 is **stronger than 404** - tells Google "never check again"
- Google removes 410 pages from index much faster than 404
- `force = false` means it won't override valid Astro routes

### Phase 2: Enhance 404 Page

Make sure your [404 page](src/pages/404.astro) has:
1. **Proper HTTP status** (should already have this in Astro)
2. **Clear messaging** that page doesn't exist
3. **Navigation options** to help users find content
4. **Internal links** to main sections (Services, Insights, About, Contact)

Let me check your current 404 page:

```bash
# Check if 404.astro exists and read it
```

### Phase 3: Block Deploy Previews from Being Indexed

Update [netlify.toml](netlify.toml) with context-specific headers (as outlined in NETLIFY-DEPLOYMENT-LOCKING-GUIDE.md):

```toml
# Production - Allow indexing
[context.production]
  command = "npm run build"
  [[context.production.headers]]
    for = "/*"
    [context.production.headers.values]
      X-Robots-Tag = "index, follow"

# Deploy previews - Block indexing
[context.deploy-preview]
  command = "npm run build"
  [[context.deploy-preview.headers]]
    for = "/*"
    [context.deploy-preview.headers.values]
      X-Robots-Tag = "noindex, nofollow"

# Branch deploys - Block indexing
[context.branch-deploy]
  command = "npm run build"
  [[context.branch-deploy.headers]]
    for = "/*"
    [context.branch-deploy.headers.values]
      X-Robots-Tag = "noindex, nofollow"
```

### Phase 4: Google Search Console Mass Removal

#### Option A: Remove Outdated Content Tool

1. Go to: https://search.google.com/search-console
2. Select property: `lighthousementoring.co.uk`
3. Navigate to: **Removals** (left sidebar)
4. Click: **"New Request"**
5. Select: **"Temporarily remove URL"**
6. Enter pattern: `lighthousementoring.co.uk/*` (won't work - too broad)

**Problem**: Google won't let you remove entire domain patterns.

#### Option B: Request Re-Indexing of Sitemap

1. Go to: **Sitemaps** (left sidebar)
2. **Remove any old sitemaps** if they exist
3. **Submit your current sitemap**: `https://lighthousementoring.co.uk/sitemap-index.xml`
4. Click: **"Request Indexing"** for your homepage
5. Wait for Google to re-crawl based on NEW sitemap

#### Option C: Manual URL Removal (For Critical Pages)

If there are specific high-priority old URLs showing up in search:
1. Go to **Removals**
2. Click **"New Request"**
3. Enter each old URL individually
4. Select **"Temporarily remove URL"**
5. This removes from search within 24 hours (temporary for 6 months)

### Phase 5: Force Google Re-Crawl

#### Submit All Current Pages for Re-Indexing

1. Go to GSC → **URL Inspection** tool
2. Enter each of your 19 valid URLs:
   ```
   https://lighthousementoring.co.uk/
   https://lighthousementoring.co.uk/about/
   https://lighthousementoring.co.uk/contact/
   https://lighthousementoring.co.uk/services/
   https://lighthousementoring.co.uk/services/board-advisory/
   https://lighthousementoring.co.uk/services/executive-coaching/
   https://lighthousementoring.co.uk/services/organizational-wellbeing/
   https://lighthousementoring.co.uk/insights/
   [... all 8 blog posts ...]
   https://lighthousementoring.co.uk/privacy/
   https://lighthousementoring.co.uk/terms/
   https://lighthousementoring.co.uk/thank-you/
   ```
3. For each URL, click **"Request Indexing"**
4. This forces Google to crawl your NEW pages immediately

---

## Expected Timeline

### Immediate (24-48 hours):
- 410 Gone responses start returning for old URLs
- Deploy preview blocking takes effect
- Manually requested indexing begins

### Short-term (1-2 weeks):
- Google recognizes 410 status codes
- Starts removing old URLs from index
- Re-indexes your 19 valid pages
- Indexed page count should increase

### Medium-term (2-4 weeks):
- Old URLs fully removed from index
- All 19 new pages properly indexed
- Search rankings stabilize
- GSC coverage reports clean up

### Long-term (1-3 months):
- Full index refresh
- Organic traffic increases
- No more ghost page issues
- Clean GSC reports

---

## Monitoring & Verification

### Daily (First Week):
- Check GSC Coverage report
- Monitor indexed vs not indexed count
- Look for improvement trend

### Weekly (First Month):
- Review 404 error counts (should decrease)
- Check indexed page count (should increase to 19)
- Verify no new issues appearing

### Monthly (Ongoing):
- Full GSC audit
- Ensure all 19 pages remain indexed
- Check for any new ghost pages
- Monitor organic traffic trends

---

## What Success Looks Like

### Week 1:
- 410 Gone responses returning correctly
- GSC showing reduced 404 errors
- New pages being re-indexed

### Week 2-3:
- Indexed pages: 19 ✅ (all current pages)
- Not indexed: Decreasing from 111
- 404 errors: Decreasing from 15

### Week 4+:
- Indexed pages: 19 ✅ (stable)
- Not indexed: 0-5 (only truly problematic URLs)
- 404 errors: 0-2 (residual, will clear)
- Coverage report: Clean and green

---

## Immediate Next Steps

I can help you implement this right now:

1. **Update netlify.toml**:
   - Add catch-all 410 Gone redirect
   - Add context-specific headers for deploy previews
   - Keep all existing redirects

2. **Verify 404 page**:
   - Check it returns proper 404 status
   - Ensure it has helpful navigation

3. **Deploy changes**:
   - Commit and push to production
   - Verify deploy succeeds

4. **GSC actions** (you'll need to do these):
   - Submit current sitemap
   - Request indexing for all 19 pages
   - Remove high-priority old URLs manually

---

## Why This Will Work

### The 410 Gone Advantage
- **404**: "Page not found (might come back)"
  - Google keeps checking
  - Stays in index longer
  - Counts against site quality

- **410**: "Page permanently deleted"
  - Google removes from index faster
  - Stops checking after confirmation
  - Doesn't hurt site quality score

### The Fresh Start
By returning 410 for ALL old URLs:
- Tells Google "entire old site is gone"
- Forces re-evaluation of current site
- Clears the slate for NEW indexing
- Prevents ongoing confusion

---

**Created**: 2025-10-13
**Status**: Ready to implement
**Priority**: URGENT - You're losing indexed pages weekly
**Estimated Implementation Time**: 30 minutes
**Expected Recovery Time**: 2-4 weeks
