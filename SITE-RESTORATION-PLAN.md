# SITE RESTORATION PLAN - Grey/Bronze Recovery

**Created:** 2025-10-22
**Status:** CRITICAL - Blue contamination confirmed
**Severity:** HIGH - Resources page showing blue gradient

## Executive Summary

Forensic analysis confirms the live site has **ONE contaminated page** showing blue colors: `/resources/`. The LIVE-SITE-ISSUES.md report from an earlier audit was **OUTDATED** - most issues have been resolved, but the resources page remains contaminated.

## Current State (Verified with Playwright 2025-10-22)

### ✅ CORRECT PAGES (Grey/Bronze Design)
1. **Homepage** (/) - ✅ All grey/bronze colors
2. **About** (/about/) - ✅ Correct design
3. **Services** (/services/) - ✅ Correct design
4. **Contact** (/contact/) - ✅ Correct design
5. **Board Advisory** (/services/board-advisory/) - ✅ Correct design
6. **Executive Coaching** (/services/executive-coaching/) - ✅ Correct grey/bronze
7. **Organizational Wellbeing** (/services/organizational-wellbeing/) - ✅ Exists and correct
8. **Insights** (/insights/) - ✅ Correct grey/bronze, 16 articles showing

### ❌ CONTAMINATED PAGE (Blue Colors)
1. **Resources** (/resources/) - ❌ **BLUE GRADIENT HERO SECTION**
   - Hero section has blue/indigo gradient: `bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900`
   - Line 11 in resources.astro: Blue gradient background
   - Lines 17, 206, 220, 222: `text-blue-100`, `text-blue-200`, `border-blue-800`
   - **FIX:** Delete this file - it doesn't exist in new-site/

## Root Cause Analysis

**The current directory is deployed to Netlify**, not the new-site folder. The current directory contains:
- **Contaminated file:** `src/pages/resources.astro` with hardcoded blue colors
- **Old unnecessary pages:** Multiple legacy service pages that should be deleted

The **new-site folder** is a clean grey/bronze implementation but is NOT deployed.

## Files to DELETE (Contamination + Legacy)

### 1. CONTAMINATED FILE (Blue Colors)
```
src/pages/resources.astro
```
**Reason:** Has hardcoded blue gradients, doesn't exist in new-site

### 2. OLD SERVICE PAGES (Not in new-site)
```
src/pages/board-advisory.astro
src/pages/business-coaching.astro
src/pages/business-consultant.astro
src/pages/management-consultant.astro
src/pages/non-executive-director.astro
src/pages/thought-leadership.astro
```
**Reason:** Legacy pages, not in new-site clean version

### 3. OLD SERVICE FOLDER FILES
```
src/pages/services/pulse-monitoring.astro
src/pages/services/wellbeing-audit.astro
```
**Reason:** Not in new-site clean version

### 4. OLD INDEX VARIATIONS
```
src/pages/index-extreme.astro
src/pages/index-old-wellbeing.astro
src/pages/index-optimized.astro
```
**Reason:** Development artifacts, not needed

## Files to KEEP (Already Correct)

### Core Pages (Verified Grey/Bronze)
- src/pages/index.astro ✅
- src/pages/about.astro ✅
- src/pages/contact.astro ✅
- src/pages/services.astro ✅
- src/pages/404.astro ✅
- src/pages/privacy.astro ✅
- src/pages/terms.astro ✅
- src/pages/thank-you.astro ✅
- src/pages/rss.xml.ts ✅

### Service Pages (Verified Grey/Bronze)
- src/pages/services/board-advisory.astro ✅
- src/pages/services/executive-coaching.astro ✅
- src/pages/services/organizational-wellbeing.astro ✅

### Insights
- src/pages/insights/index.astro ✅
- src/pages/insights/[slug].astro ✅

## Step-by-Step Restoration Process

### Phase 1: Backup & Verification (5 minutes)
1. ✅ Document current state (COMPLETED - this file)
2. ⏳ Take git snapshot: `git add -A && git commit -m "Pre-restoration snapshot"`
3. ⏳ Verify new-site has all required files

### Phase 2: Clean Contaminated Files (5 minutes)
1. ⏳ Delete resources.astro
2. ⏳ Delete old service pages (board-advisory, business-coaching, etc. at root)
3. ⏳ Delete old service folder files (pulse-monitoring, wellbeing-audit)
4. ⏳ Delete old index variations

### Phase 3: Verification (10 minutes)
1. ⏳ Compare src/pages structure with new-site/src/pages
2. ⏳ Verify no blue color references in any .astro files
3. ⏳ Check tailwind.config.mjs is grey/bronze (already verified ✅)
4. ⏳ Verify all navigation links point to /insights (not /blog)

### Phase 4: Local Testing (10 minutes)
1. ⏳ Run `npm run dev -- --port 1000`
2. ⏳ Test all pages in browser
3. ⏳ Verify no 404 errors
4. ⏳ Confirm all pages show grey/bronze colors
5. ⏳ Run `npm run build` to ensure clean build

### Phase 5: Deployment (10 minutes)
1. ⏳ Commit changes: `git add -A && git commit -m "Remove blue resources page and legacy files"`
2. ⏳ Push to main: `git push origin main`
3. ⏳ Clear Netlify cache in dashboard
4. ⏳ Trigger new deploy with "Clear cache and retry deploy"
5. ⏳ Monitor build logs for errors

### Phase 6: Live Verification (10 minutes)
1. ⏳ Wait for Netlify deployment (2-3 minutes)
2. ⏳ Use Playwright to verify all pages
3. ⏳ Confirm resources.astro returns 404
4. ⏳ Verify all pages show grey/bronze colors
5. ⏳ Check insights page shows 16 articles

## Success Criteria

### All pages must show ONLY these colors:
- ✅ Primary: `#2D2D2D` (rgb(45, 45, 45)) - Dark charcoal
- ✅ Accent: `#A45C1A` (rgb(164, 92, 26)) - Warm bronze
- ✅ Eggshell: `#F4F1EA` (rgb(244, 241, 234)) - Warm cream
- ✅ White: `#FFFFFF` (rgb(255, 255, 255))
- ✅ Gray scale: Standard Tailwind grays

### NO blue colors anywhere:
- ❌ No `blue-900`, `blue-800`, `blue-100`
- ❌ No `indigo-900`
- ❌ No `slate-900`
- ❌ No `text-blue-*` or `bg-blue-*` classes

### Navigation & Links:
- ✅ All nav links point to `/insights` (not `/blog`)
- ✅ All footer links point to `/insights` (not `/blog`)
- ✅ No broken links

### Content:
- ✅ Insights page shows 16 articles from src/content/insights/
- ✅ All service pages exist and work
- ✅ Resources page returns 404 (deleted)

## Files Overview

### Current Directory Structure (DEPLOYED TO NETLIFY)
```
C:\Users\Fearn\New folder (4)\
├── src/
│   ├── pages/
│   │   ├── index.astro ✅
│   │   ├── resources.astro ❌ DELETE - HAS BLUE
│   │   ├── board-advisory.astro ❌ DELETE - OLD
│   │   ├── business-coaching.astro ❌ DELETE - OLD
│   │   ├── services/
│   │   │   ├── board-advisory.astro ✅ KEEP
│   │   │   ├── executive-coaching.astro ✅ KEEP
│   │   │   ├── organizational-wellbeing.astro ✅ KEEP
│   │   │   ├── pulse-monitoring.astro ❌ DELETE - OLD
│   │   │   └── wellbeing-audit.astro ❌ DELETE - OLD
```

### New-Site Directory (REFERENCE - NOT DEPLOYED)
```
C:\Users\Fearn\New folder (4)\new-site\
├── src/
│   ├── pages/
│   │   ├── index.astro ✅ CLEAN
│   │   ├── services/
│   │   │   ├── board-advisory.astro ✅ CLEAN
│   │   │   ├── executive-coaching.astro ✅ CLEAN
│   │   │   └── organizational-wellbeing.astro ✅ CLEAN
```

## Expected Outcome

After restoration:
1. `/resources/` will return 404 (page deleted)
2. All remaining pages show grey/bronze colors only
3. Site loads fast with no errors
4. All links work correctly
5. Insights page shows 16 articles
6. Clean, professional grey/bronze aesthetic throughout

## Rollback Plan

If issues occur:
```bash
git log --oneline -5
git reset --hard <commit-hash-before-changes>
git push --force origin main
```

Then trigger new Netlify deploy.

## Timeline

**Total estimated time:** 50 minutes
- Documentation: 10 minutes ✅ COMPLETED
- Cleanup: 5 minutes
- Verification: 10 minutes
- Local testing: 10 minutes
- Deployment: 10 minutes
- Live verification: 10 minutes

## Notes

- The LIVE-SITE-ISSUES.md file was from an earlier audit and is now outdated
- Most issues have been resolved; only resources.astro remains contaminated
- The Tailwind config is already correct (grey/bronze)
- The service pages are already correct
- The insights page is already correct
- This is a simple cleanup operation, not a major rebuild

---

**Next Action:** Execute Phase 1 - Create git snapshot
