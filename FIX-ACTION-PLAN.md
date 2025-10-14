# Fix Action Plan - Lighthouse Mentoring Website
**Date**: 2025-10-14
**Based on**: Comprehensive Googlebot-style audit

---

## Executive Summary

After auditing **19 pages** across the entire lighthousementoring.co.uk website, only **1 critical issue** and **2 minor enhancements** were identified. This demonstrates excellent technical health overall.

### Pages Audited (19 Total)

**Main Pages (5)**:
1. Homepage (/)
2. About (/about)
3. Contact (/contact)
4. Services Overview (/services)
5. Insights Hub (/insights)

**Service Pages (3)**:
6. Executive Coaching (/services/executive-coaching)
7. Board Advisory (/services/board-advisory)
8. Organizational Wellbeing (/services/organizational-wellbeing)

**Blog Posts (8)**:
9. Management Consulting vs Strategy (/insights/management-consulting-vs-strategy)
10. Board Advisor vs Non-Executive Director (/insights/board-advisor-vs-non-executive-director)
11. Business Transformation Consulting (/insights/business-transformation-consulting)
12. Change Management Consultancy (/insights/change-management-consultancy)
13. Executive Coach Benefits (/insights/executive-coach-benefits)
14. Executive Coaching ROI (/insights/executive-coaching-roi)
15. Executive Leadership Coaching (/insights/executive-leadership-coaching)
16. How to Choose an Executive Coach (/insights/how-to-choose-an-executive-coach)

**Legal/Utility Pages (3)**:
17. Privacy Policy (/privacy)
18. Terms of Service (/terms)
19. Thank You (/thank-you)

### Audit Results

✅ **18/19 pages**: Clean console (no errors)
⚠️ **1/19 pages**: Analytics integrity issue (homepage only)
✅ **All pages**: 100% HTTP 200 OK success rate
✅ **All blog posts**: Clean console, no errors

---

## Issue Priority Matrix

### 🔴 CRITICAL (Fix Immediately)

#### Issue #1: Analytics Integrity Check Failure
**Status**: 🔴 Critical
**Location**: Homepage (may affect other pages)
**Impact**: Google Analytics may not track visitors correctly
**Effort**: 10 minutes

**Error Message**:
```
Failed to find a valid digest in the 'integrity' attribute for resource
'https://lighthousementoring.co.uk/js/analytics.js' with computed SHA-256
integrity 'u8nMRp4gIYB6mQxFPEXmVw/63xyvkAE6sMGsP7g8b4k='. The resource has been blocked.
```

**Root Cause**:
The Subresource Integrity (SRI) hash in the HTML doesn't match the actual analytics.js file. This happens when:
- File was modified after deployment
- Hash was incorrectly generated
- File was updated but hash wasn't regenerated

**Fix Steps**:

1. **Option A: Regenerate SRI Hash** (Recommended if you need SRI)
   ```bash
   # Navigate to project directory
   cd C:\Users\Fearn\New folder (4)\new-site

   # Generate new SRI hash for analytics.js
   node -e "const crypto = require('crypto'); const fs = require('fs'); const hash = crypto.createHash('sha256').update(fs.readFileSync('public/js/analytics.js')).digest('base64'); console.log('sha256-' + hash);"
   ```

2. **Find the script tag** in your HTML (likely in Layout.astro):
   ```html
   <!-- Current (broken) -->
   <script src="/js/analytics.js" integrity="sha256-OLD_HASH_HERE" crossorigin="anonymous"></script>

   <!-- Update to new hash -->
   <script src="/js/analytics.js" integrity="sha256-NEW_HASH_FROM_STEP_1" crossorigin="anonymous"></script>
   ```

3. **Option B: Remove Integrity Attribute** (Simpler, less secure)
   ```html
   <!-- Remove integrity attribute entirely -->
   <script src="/js/analytics.js"></script>
   ```

4. **Test the fix**:
   ```bash
   npm run build
   npm run preview
   # Open http://localhost:4321 and check browser console
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Fix: Regenerate SRI hash for analytics.js"
   git push origin main
   ```

**Verification**:
- Open homepage in browser
- Check DevTools Console (F12)
- Should see NO integrity errors
- Verify Google Analytics is loading: Network tab → filter "analytics"

---

### 🟡 MINOR (Fix This Week)

#### Issue #2: Prefetch Link 404
**Status**: 🟡 Minor
**Location**: /services page
**Impact**: Minor performance degradation (prefetch fails silently)
**Effort**: 2 minutes

**Problem**:
Prefetch link points to `/insights` (no trailing slash) but page exists at `/insights/` (with trailing slash).

**Fix**:

1. **Find the prefetch link** in services page (src/pages/services.astro or Layout.astro):
   ```html
   <!-- Current (404) -->
   <link rel="prefetch" href="/insights">

   <!-- Fix: Add trailing slash -->
   <link rel="prefetch" href="/insights/">
   ```

2. **Alternatively, search globally**:
   ```bash
   # Search for all prefetch links
   cd C:\Users\Fearn\New folder (4)\new-site
   grep -r "prefetch.*insights" src/
   ```

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Fix: Correct prefetch URL for insights page"
   git push origin main
   ```

**Verification**:
- Open /services page
- Check Network tab → filter "insights"
- Prefetch should show 200 OK (not 404)

---

### 🟢 ENHANCEMENT (Improve SEO)

#### Enhancement #1: Optimize Sitemap Priorities
**Status**: 🟢 Enhancement
**Location**: sitemap-0.xml (generated by Astro)
**Impact**: Better crawl budget allocation
**Effort**: 5 minutes

**Current State**:
All pages have same priority (0.7) and changefreq (weekly).

**Recommended Priorities**:
```xml
<!-- High Priority (1.0) - Most important pages -->
<url>
  <loc>https://lighthousementoring.co.uk/</loc>
  <priority>1.0</priority>
  <changefreq>weekly</changefreq>
</url>

<!-- High Priority (0.9) - Core service pages -->
<url>
  <loc>https://lighthousementoring.co.uk/services/</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://lighthousementoring.co.uk/services/executive-coaching/</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://lighthousementoring.co.uk/services/board-advisory/</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://lighthousementoring.co.uk/services/organizational-wellbeing/</loc>
  <priority>0.9</priority>
</url>

<!-- Medium Priority (0.8) - Important pages -->
<url>
  <loc>https://lighthousementoring.co.uk/about/</loc>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
<url>
  <loc>https://lighthousementoring.co.uk/contact/</loc>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>

<!-- Medium Priority (0.7) - Blog hub -->
<url>
  <loc>https://lighthousementoring.co.uk/insights/</loc>
  <priority>0.7</priority>
  <changefreq>weekly</changefreq>
</url>

<!-- Lower Priority (0.6) - Individual blog posts -->
<!-- All 8 blog posts -->
<priority>0.6</priority>
<changefreq>monthly</changefreq>

<!-- Low Priority (0.3) - Legal/utility pages -->
<url>
  <loc>https://lighthousementoring.co.uk/privacy/</loc>
  <priority>0.3</priority>
  <changefreq>yearly</changefreq>
</url>
<url>
  <loc>https://lighthousementoring.co.uk/terms/</loc>
  <priority>0.3</priority>
  <changefreq>yearly</changefreq>
</url>
<url>
  <loc>https://lighthousementoring.co.uk/thank-you/</loc>
  <priority>0.3</priority>
  <changefreq>never</changefreq>
</url>
```

**Fix Steps**:

1. **Find sitemap configuration** (likely in astro.config.mjs):
   ```javascript
   // astro.config.mjs
   import sitemap from '@astrojs/sitemap';

   export default defineConfig({
     site: 'https://lighthousementoring.co.uk',
     integrations: [
       sitemap({
         customPages: [
           // Homepage - highest priority
           { url: 'https://lighthousementoring.co.uk/', priority: 1.0, changefreq: 'weekly' },

           // Service pages - high priority
           { url: 'https://lighthousementoring.co.uk/services/', priority: 0.9, changefreq: 'weekly' },
           { url: 'https://lighthousementoring.co.uk/services/executive-coaching/', priority: 0.9, changefreq: 'weekly' },
           { url: 'https://lighthousementoring.co.uk/services/board-advisory/', priority: 0.9, changefreq: 'weekly' },
           { url: 'https://lighthousementoring.co.uk/services/organizational-wellbeing/', priority: 0.9, changefreq: 'weekly' },

           // Important pages - medium priority
           { url: 'https://lighthousementoring.co.uk/about/', priority: 0.8, changefreq: 'monthly' },
           { url: 'https://lighthousementoring.co.uk/contact/', priority: 0.8, changefreq: 'monthly' },

           // Blog hub - medium priority
           { url: 'https://lighthousementoring.co.uk/insights/', priority: 0.7, changefreq: 'weekly' },

           // Legal pages - low priority
           { url: 'https://lighthousementoring.co.uk/privacy/', priority: 0.3, changefreq: 'yearly' },
           { url: 'https://lighthousementoring.co.uk/terms/', priority: 0.3, changefreq: 'yearly' },
           { url: 'https://lighthousementoring.co.uk/thank-you/', priority: 0.3, changefreq: 'never' },
         ],
         filter: (page) => {
           // Blog posts get 0.6 priority, monthly changefreq
           if (page.includes('/insights/') && !page.endsWith('/insights/')) {
             return { ...page, priority: 0.6, changefreq: 'monthly' };
           }
           return page;
         }
       })
     ]
   });
   ```

2. **Alternative: Manual XML editing** (if not using Astro sitemap integration):
   - Edit `public/sitemap-0.xml` directly
   - Update `<priority>` and `<changefreq>` tags for each URL

3. **Test locally**:
   ```bash
   npm run build
   # Check dist/sitemap-0.xml
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Enhancement: Optimize sitemap priorities for better crawl budget"
   git push origin main
   ```

**Verification**:
- Visit https://lighthousementoring.co.uk/sitemap-0.xml
- Verify priorities are differentiated
- Submit updated sitemap to Google Search Console

---

## Implementation Timeline

### 🚀 Immediate (Today)
**Time Required**: 15 minutes

1. ✅ **Fix analytics integrity issue** (10 min)
   - Regenerate SRI hash or remove integrity attribute
   - Test locally
   - Deploy

2. ✅ **Fix prefetch link** (2 min)
   - Add trailing slash to /insights prefetch
   - Deploy

3. ✅ **Verify fixes** (3 min)
   - Check homepage console (no analytics error)
   - Check /services page network tab (prefetch 200 OK)

### 📅 This Week
**Time Required**: 30 minutes

1. **Optimize sitemap priorities** (25 min)
   - Update Astro config or XML
   - Test locally
   - Deploy

2. **Submit to Google Search Console** (5 min)
   - Submit updated sitemap
   - Request re-indexing if needed

---

## Testing Checklist

### Pre-Deployment Testing

```bash
# 1. Build site locally
cd C:\Users\Fearn\New folder (4)\new-site
npm run build

# 2. Preview production build
npm run preview

# 3. Test in browser (http://localhost:4321)
```

**Manual Testing**:
- [ ] Homepage loads with no console errors
- [ ] Google Analytics script loads successfully
- [ ] Navigate to /services page
- [ ] Check Network tab: /insights prefetch shows 200 OK
- [ ] Verify sitemap-0.xml has differentiated priorities

### Post-Deployment Verification

**After deploying to production**:
- [ ] Visit https://lighthousementoring.co.uk/
- [ ] Open DevTools Console (F12)
- [ ] Verify no analytics integrity errors
- [ ] Check Network tab: analytics.js loads successfully
- [ ] Visit https://lighthousementoring.co.uk/services/
- [ ] Verify /insights prefetch succeeds
- [ ] Check https://lighthousementoring.co.uk/sitemap-0.xml
- [ ] Verify updated priorities

---

## File Changes Required

### Files to Modify

1. **src/layouts/Layout.astro** (or wherever analytics script is)
   - Update SRI hash for analytics.js OR remove integrity attribute

2. **src/pages/services.astro** (or Layout.astro with global prefetch)
   - Change `<link rel="prefetch" href="/insights">` to `href="/insights/"`

3. **astro.config.mjs** (sitemap configuration)
   - Add custom priorities and changefreq for different page types

### No Code Changes Needed

The following are already working correctly:
- ✅ All page routes
- ✅ Image optimization (AVIF/WebP)
- ✅ robots.txt (excellent AI crawler support)
- ✅ Netlify redirects
- ✅ Security headers
- ✅ All 19 pages load successfully

---

## Expected Impact

### After Fixing Critical Issue (Analytics)

**Before**:
- ❌ Analytics.js blocked by integrity check
- ❌ Visitor tracking may not work
- ❌ Console error on homepage

**After**:
- ✅ Analytics.js loads successfully
- ✅ Visitor tracking works correctly
- ✅ Clean console (no errors)
- ✅ Google Analytics data collection resumes

### After Fixing Minor Issues

**Prefetch Fix**:
- ✅ Faster navigation to /insights page
- ✅ Better user experience
- ✅ No 404s in Network tab

**Sitemap Optimization**:
- ✅ Google crawls important pages more frequently
- ✅ Better crawl budget allocation
- ✅ Service pages prioritized over legal pages
- ✅ Improved indexing efficiency

---

## Monitoring Plan

### Post-Fix Monitoring (First 48 Hours)

1. **Google Analytics**:
   - Verify real-time traffic appears
   - Check if session data is being collected
   - Monitor pageviews across all pages

2. **Browser Console**:
   - Spot-check homepage and key pages
   - Ensure no new errors appear
   - Verify analytics loads on all pages

3. **Network Performance**:
   - Check that prefetch is working
   - Monitor load times
   - Verify AVIF/WebP images still optimize

### Long-Term Monitoring (Weekly)

1. **Google Search Console**:
   - Monitor crawl stats
   - Check for any new errors
   - Verify sitemap is being processed
   - Watch for indexing improvements

2. **Analytics Data**:
   - Ensure consistent data collection
   - Monitor bounce rates
   - Track goal completions (contact form submissions)

---

## Rollback Plan

If issues occur after deployment:

### Rollback Critical Fix (Analytics)

**If analytics breaks completely**:
```bash
# Revert to previous commit
git log --oneline  # Find previous commit hash
git revert <commit-hash>
git push origin main
```

**Quick fix**: Remove integrity attribute entirely
```html
<!-- Emergency fix: remove integrity -->
<script src="/js/analytics.js"></script>
```

### Rollback Minor Fixes

**Prefetch issue**: Low risk, unlikely to cause problems

**Sitemap changes**: Can be reverted via git or manually edited

---

## Communication Plan

### Stakeholder Updates

**Craig Fearn**:
- Brief update: "Fixed analytics tracking and improved SEO configuration"
- Technical details: "Resolved SRI hash conflict, optimized sitemap priorities"
- Impact: "Analytics now tracking correctly, improved Google crawl efficiency"

### User Impact

**End Users**:
- No visible changes
- Improved page load performance (prefetch fix)
- Better experience (no analytics delays)

---

## Success Criteria

### Fix Considered Complete When:

1. ✅ Homepage console shows zero errors
2. ✅ Google Analytics script loads without integrity errors
3. ✅ All pages maintain 100% HTTP 200 OK success rate
4. ✅ Prefetch to /insights/ returns 200 OK
5. ✅ Sitemap has differentiated priorities
6. ✅ Google Search Console processes updated sitemap
7. ✅ Analytics data appears in GA4 dashboard
8. ✅ No new errors introduced

---

## Additional Recommendations (Future)

### Not Urgent, But Consider:

1. **Structured Data Enhancement**:
   - Add JSON-LD schema for Articles (blog posts)
   - Add FAQ schema where applicable
   - Add Person schema for Craig Fearn
   - Implement BreadcrumbList schema

2. **Performance Monitoring**:
   - Set up Lighthouse CI for automated testing
   - Monitor Core Web Vitals
   - Track performance over time

3. **Security Enhancements**:
   - Consider SRI hashes for all external scripts
   - Implement CSP reporting
   - Add security.txt file

4. **SEO Enhancements**:
   - Internal linking between related blog posts
   - Add "Related Articles" sections
   - Implement blog post series/categories
   - Add author bylines with credentials

---

## Appendix: Technical Details

### Analytics.js SRI Hash Generation

**Command-line options**:

**Option 1: Node.js**
```bash
node -e "const c=require('crypto'),f=require('fs');console.log('sha256-'+c.createHash('sha256').update(f.readFileSync('public/js/analytics.js')).digest('base64'))"
```

**Option 2: OpenSSL**
```bash
openssl dgst -sha256 -binary public/js/analytics.js | openssl base64 -A
```

**Option 3: Online Tool**
- Visit: https://www.srihash.org/
- Upload analytics.js
- Copy generated hash

### Astro Sitemap Integration

**Documentation**: https://docs.astro.build/en/guides/integrations-guide/sitemap/

**Current configuration** (check astro.config.mjs):
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lighthousementoring.co.uk',
  integrations: [
    sitemap()  // Default configuration
  ]
});
```

**Enhanced configuration** (with priorities):
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lighthousementoring.co.uk',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Custom priority logic
        if (item.url.endsWith('/')) {
          item.priority = 1.0;  // Homepage
        } else if (item.url.includes('/services/')) {
          item.priority = 0.9;  // Service pages
        } else if (item.url.includes('/insights/')) {
          item.priority = 0.6;  // Blog posts
        } else if (item.url.includes('/privacy') || item.url.includes('/terms')) {
          item.priority = 0.3;  // Legal pages
        }
        return item;
      }
    })
  ]
});
```

---

## Document Version Control

**Version**: 1.0
**Created**: 2025-10-14
**Last Updated**: 2025-10-14
**Next Review**: After fixes deployed (2025-10-15)

---

## Sign-Off

**Technical Audit**: ✅ Complete
**Fix Plan**: ✅ Complete
**Ready for Implementation**: ✅ Yes

**Estimated Total Time**: 45 minutes (immediate fixes + enhancement)
**Risk Level**: Low (all fixes are non-breaking)
**Recommendation**: Proceed with immediate fixes today
