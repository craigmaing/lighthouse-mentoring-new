# Live Site Issues - Playwright Inspection Results

## Executive Summary

The live site at https://lighthousementoring.co.uk is serving a **MIXED deployment** with some pages showing the correct grey/bronze design (new site) and other pages showing the OLD blue/teal blog design (old site). This indicates a severe Netlify caching or deployment configuration issue.

## ✅ CORRECT PAGES (Grey/Bronze Design)

These pages are serving correctly from the new deployment:

1. **Homepage** (/)
   - ✅ Correct grey/bronze color scheme
   - ✅ Shows 3 insights articles in "Latest Insights" section
   - ✅ All content matches local files

2. **About Page** (/about/)
   - ✅ Correct grey/bronze design
   - ✅ Proper credentials display
   - ✅ All content correct

3. **Services Overview** (/services/)
   - ✅ Correct grey/bronze design
   - ✅ Three service cards displayed correctly
   - ✅ All links working

4. **Contact Page** (/contact/)
   - ✅ Correct grey/bronze design
   - ✅ Contact form present
   - ✅ All content correct

5. **Board Advisory Service** (/services/board-advisory/)
   - ✅ Correct grey/bronze design
   - ✅ Comprehensive content
   - ✅ All links correct

6. **404 Page**
   - ✅ Correct grey/bronze design
   - ✅ Proper error messaging

## ❌ WRONG PAGES (Old Blue/Teal Design)

These pages are serving the OLD site with incorrect design and content:

### 1. **Insights Page** (/insights/) - CRITICAL ISSUE

**Wrong Design:**
- Shows OLD blue/teal blog design instead of grey/bronze
- Has search box and category filters
- Newsletter signup section
- "Browse Full Archive →" link

**Wrong Content:**
- Page title: "Strategic Insights for Growing Businesses | Craig Fearn Blog"
- Shows articles that DON'T exist in our local files:
  - "Organizational Development: Culture & Performance" (/insights/organizational-development-consultant)
  - "Strategic Planning Consultant: Board-Level Strategy" (/insights/strategic-planning-consultant)
  - "Business Growth Consultant: Strategic Advisory for SMEs" (/insights/business-growth-consultant)
  - "Board Performance: What Makes Effective Boards in 2025" (/insights/board-performance)
  - "Wellbeing Consultant: Board-Level Strategic Advisory" (/insights/wellbeing-consultant)

**Expected Content:**
- Should show 13 insights articles from our local `src/content/insights/` folder
- Grey/bronze design matching the rest of the site
- No search box or category filters

### 2. **Resources Page** (/resources/) - MAJOR ISSUE

**Wrong Design:**
- Shows OLD blue/teal design instead of grey/bronze
- Different footer structure
- Old navigation style

**Wrong Links:**
- Navigation link to `/blog` (line 17) - should be `/insights`
- "Read Insights" button links to `/blog` (line 82) - should be `/insights`
- Footer "Blog & Insights" links to `/blog` (line 131) - should be `/insights`

**Expected:**
- Grey/bronze design matching homepage
- All links pointing to `/insights` instead of `/blog`

### 3. **Executive Coaching Page** (/services/executive-coaching/) - MAJOR ISSUE

**Wrong Design:**
- Shows OLD blue/teal design instead of grey/bronze
- Different layout and styling
- Old footer structure

**Wrong Links:**
- Navigation link to `/blog` (line 17) - should be `/insights`
- Footer "Blog & Insights" links to `/blog` (line 190) - should be `/insights`

**Expected:**
- Grey/bronze design matching Board Advisory page
- All links pointing to `/insights` instead of `/blog`

## ❌ MISSING PAGES

### **Organizational Wellbeing Service** (/services/organisational-wellbeing/)

- Returns 404 error
- Page doesn't exist on live site
- Local file exists at: `src/pages/services/organizational-wellbeing.astro`
- This page should be deployed but is completely missing

## Root Cause Analysis

**Primary Issue: Netlify is serving MIXED content from multiple deployments**

Evidence:
1. Some pages (homepage, about, services, contact, board-advisory) show the NEW grey/bronze design
2. Other pages (insights, resources, executive-coaching) show the OLD blue/teal design
3. One page (organizational-wellbeing) is completely missing (404)

This pattern indicates:
- Netlify is not serving a single consistent build
- Old cached content is being served for some pages
- The build process may have failed to deploy all pages
- CDN cache may be serving stale content

## Specific File Issues

### Pages That Need to Exist on Live Site:

1. **src/pages/insights/index.astro**
   - Currently showing old blog design
   - Should show grey/bronze insights listing

2. **src/pages/resources.astro**
   - Currently showing old design with /blog links
   - Should show grey/bronze with /insights links

3. **src/pages/services/executive-coaching.astro**
   - Currently showing old design with /blog links
   - Should show grey/bronze with /insights links

4. **src/pages/services/organizational-wellbeing.astro**
   - Currently 404 - MISSING ENTIRELY
   - Should exist and show grey/bronze design

### Content That Should NOT Exist:

These articles are showing on live /insights/ page but don't exist in our local files:
- organizational-development-consultant
- strategic-planning-consultant
- business-growth-consultant
- board-performance (different from our local board-performance-what-makes-effective-boards.md)
- wellbeing-consultant

## Action Items

### Immediate Actions Required:

1. **Clear Netlify Cache Completely**
   - Access Netlify dashboard
   - Clear all cache and CDN edge cache
   - Force fresh build from current Git commit

2. **Verify Netlify Build Configuration**
   - Confirm correct Git repository connected
   - Confirm correct branch (main) being deployed
   - Check build command and publish directory

3. **Manual Cache Clear & Rebuild**
   - Trigger new deploy from Netlify UI
   - Enable "Clear cache and retry deploy"
   - Monitor build logs for any errors

4. **Verify Deployment**
   - After rebuild, check all pages again with Playwright
   - Confirm all pages show grey/bronze design
   - Verify all /blog links changed to /insights
   - Confirm organizational-wellbeing page exists

### Build Logs to Check:

Look for:
- Any errors during Astro build
- Missing pages in build output
- File count discrepancies
- Cache-related warnings

## Expected State After Fix

All pages should:
- ✅ Show grey/bronze color scheme (primary: #2D2D2D, accent: #A45C1A, eggshell: #F4F1EA)
- ✅ Have navigation links pointing to /insights (not /blog)
- ✅ Display correct content from local files
- ✅ Include all service pages (board-advisory, executive-coaching, organizational-wellbeing)
- ✅ Show 13 insights articles (not old blog articles)

## Test Checklist After Fix

- [ ] Homepage shows grey/bronze design
- [ ] /insights/ shows 13 articles with grey/bronze design
- [ ] /resources/ shows grey/bronze design with /insights links
- [ ] /services/executive-coaching/ shows grey/bronze design with /insights links
- [ ] /services/organisational-wellbeing/ exists (no 404)
- [ ] /services/board-advisory/ shows grey/bronze design
- [ ] /about/ shows grey/bronze design
- [ ] /contact/ shows grey/bronze design
- [ ] All navigation menus link to /insights (not /blog)
- [ ] All footer links point to /insights (not /blog)

---

**Report Generated:** Page-by-page Playwright inspection on live site
**Issues Found:** 3 pages with wrong design, 1 missing page, multiple incorrect /blog links
**Severity:** Critical - Site is serving mixed old/new content
