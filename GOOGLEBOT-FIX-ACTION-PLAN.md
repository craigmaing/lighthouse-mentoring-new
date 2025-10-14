# Googlebot Issues - Complete Fix Action Plan
**Site**: lighthousementoring.co.uk
**Priority**: CRITICAL 🔴
**Estimated Time**: 2-3 hours total
**Impact**: Restore JavaScript execution for Googlebot + Users

---

## Phase 1: Investigation (15 minutes)

### Step 1.1: Locate JavaScript Files
**Action**: Find the source files that need SRI hashes updated

```bash
# Navigate to project directory
cd C:\Users\Fearn\New folder (4)\new-site

# Find where these files are in the build
dir /s analytics.js
dir /s mobile-menu.js

# Common locations:
# - public/js/analytics.js
# - public/js/mobile-menu.js
# - dist/js/analytics.js (after build)
# - src/scripts/analytics.js (source)
```

**Expected Outcome**: Know exact file paths for both JavaScript files

### Step 1.2: Locate Where Integrity Attributes Are Generated
**Action**: Find where SRI hashes are being added to script tags

**Check These Files**:
```bash
# Search for integrity attributes in the codebase
findstr /s /i "integrity" *.astro
findstr /s /i "integrity" *.html
findstr /s /i "sha384" *.astro

# Likely locations:
# - src/layouts/Layout.astro (main layout)
# - src/components/Header.astro
# - astro.config.mjs (if using build plugins)
# - netlify.toml (if headers inject scripts)
# - public/_headers (if scripts added via headers)
```

**Expected Outcome**: Know which file(s) contain the integrity attributes that need updating

### Step 1.3: Check Current CSP Configuration
**Action**: Find where Content Security Policy is defined

**Check These Files**:
```bash
# Look for CSP headers
type netlify.toml
type public\_headers
type public\_redirects

# Search for CSP in config
findstr /s /i "Content-Security-Policy" *.*
```

**Expected Outcome**: Know where CSP is configured and current policy string

---

## Phase 2: Fix SRI Integrity Hashes (30 minutes)

### Step 2.1: Generate Correct SRI Hashes

**Option A: Using OpenSSL (if available)**
```bash
# For analytics.js
openssl dgst -sha384 -binary public/js/analytics.js | openssl base64 -A

# For mobile-menu.js
openssl dgst -sha384 -binary public/js/mobile-menu.js | openssl base64 -A
```

**Option B: Using Node.js (recommended for Windows)**
```bash
# Create a hash generator script
node generate-sri-hash.cjs
```

I'll create this script for you in Step 2.2.

### Step 2.2: Create Hash Generator Script

**Action**: Create `generate-sri-hash.cjs` in project root

```javascript
// generate-sri-hash.cjs
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Files to hash
const files = [
  'public/js/analytics.js',
  'public/js/mobile-menu.js',
  // Add more files if needed
];

console.log('Generating SRI Hashes...\n');

files.forEach(filepath => {
  const fullPath = path.join(__dirname, filepath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filepath}`);
    return;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const hashSum = crypto.createHash('sha384');
  hashSum.update(fileBuffer);
  const hex = hashSum.digest('base64');

  console.log(`✅ ${filepath}`);
  console.log(`   sha384-${hex}\n`);
  console.log(`   HTML: integrity="sha384-${hex}"\n`);
});
```

**Run It**:
```bash
node generate-sri-hash.cjs
```

**Expected Outcome**: Get correct SRI hashes for both files

### Step 2.3: Decide on SRI Strategy

**Option A: Keep SRI (More Secure) - RECOMMENDED**
- Update integrity hashes to correct values
- Best for production security
- Requires hash regeneration after any JS file changes

**Option B: Remove SRI (Simpler)**
- Remove all integrity attributes from script tags
- Simpler maintenance
- Still secure if serving from same origin

**Recommendation**: Option A (keep SRI) for production site

### Step 2.4: Update Integrity Attributes

**If Using Option A (Keep SRI)**:

**Action**: Update the file where integrity attributes are defined (likely `src/layouts/Layout.astro`)

**Find This**:
```html
<script src="/js/analytics.js" integrity="sha384-OLD_WRONG_HASH"></script>
<script src="/js/mobile-menu.js" integrity="sha384-OLD_WRONG_HASH"></script>
```

**Replace With** (using hashes from Step 2.2):
```html
<script src="/js/analytics.js" integrity="sha384-NEW_CORRECT_HASH"></script>
<script src="/js/mobile-menu.js" integrity="sha384-NEW_CORRECT_HASH"></script>
```

**If Using Option B (Remove SRI)**:

**Find This**:
```html
<script src="/js/analytics.js" integrity="sha384-ANY_HASH"></script>
<script src="/js/mobile-menu.js" integrity="sha384-ANY_HASH"></script>
```

**Replace With**:
```html
<script src="/js/analytics.js"></script>
<script src="/js/mobile-menu.js"></script>
```

**Expected Outcome**: Integrity attributes updated or removed in source files

---

## Phase 3: Fix Content Security Policy (15 minutes)

### Step 3.1: Locate CSP Configuration

**Check Priority Order**:
1. `netlify.toml` - Most likely location
2. `public/_headers` - Netlify headers file
3. `astro.config.mjs` - If using middleware
4. Netlify Dashboard - UI-configured headers

### Step 3.2: Update CSP to Allow Google Services

**Current CSP** (assumed from errors):
```
script-src 'self' 'unsafe-inline';
```

**Required CSP**:
```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com;
```

**If in `netlify.toml`**:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;"
```

**If in `public/_headers`**:
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;
```

**Expected Outcome**: CSP allows Google Tag Manager and Analytics domains

### Step 3.3: Verify No Other CSP Conflicts

**Action**: Search for any other CSP definitions that might override

```bash
# Search entire codebase
findstr /s /i "Content-Security-Policy" *.*
findstr /s /i "script-src" *.*
```

**Expected Outcome**: Only one CSP definition found, or multiple are compatible

---

## Phase 4: Build and Local Testing (30 minutes)

### Step 4.1: Clean Build
```bash
# Remove old build artifacts
rd /s /q dist
rd /s /q .astro

# Fresh build
npm run build
```

**Expected Outcome**: Clean build with no errors

### Step 4.2: Check Built Files
```bash
# Verify JavaScript files exist in dist
dir dist\js\analytics.js
dir dist\js\mobile-menu.js

# Check their sizes (should not be 0 bytes)
```

**Expected Outcome**: Both JS files present in dist/ with reasonable file sizes

### Step 4.3: Local Preview Testing
```bash
# Start preview server
npm run preview
```

**Then Open**: http://localhost:4321 (or whatever port preview uses)

### Step 4.4: Browser Console Check

**Action**: Open browser DevTools (F12) on local preview

**Check For**:
- ✅ No SRI integrity errors
- ✅ No CSP violation errors
- ✅ `analytics.js` loaded successfully
- ✅ `mobile-menu.js` loaded successfully
- ✅ Mobile menu works (test by clicking hamburger icon)

**If Errors Appear**:
- Re-check integrity hashes match the built files (not source files)
- Verify CSP is being applied (check Network tab → Headers)
- Clear browser cache and hard reload (Ctrl+Shift+R)

**Expected Outcome**: No console errors, all scripts loading

### Step 4.5: Test Mobile Menu
**Action**:
1. Resize browser to mobile width (< 768px)
2. Click hamburger menu icon
3. Verify menu opens/closes

**Expected Outcome**: Mobile menu works perfectly

---

## Phase 5: Deployment (15 minutes)

### Step 5.1: Commit Changes
```bash
git status
git add .
git commit -m "Fix: Update SRI integrity hashes and CSP for Googlebot compatibility

- Regenerated correct SHA-384 hashes for analytics.js and mobile-menu.js
- Updated CSP to allow Google Tag Manager and Analytics
- Fixed JavaScript execution blocking that affected Googlebot rendering
- Resolves mobile menu and analytics tracking issues"

git push origin main
```

**Expected Outcome**: Changes pushed to repository

### Step 5.2: Monitor Netlify Deployment

**Action**: Watch Netlify dashboard for deployment

**Check**:
- ✅ Build succeeds
- ✅ Deploy completes
- ✅ Site is live

**Expected Outcome**: Successful deployment within 2-5 minutes

### Step 5.3: Verify Live Site (Immediate)

**Action**: Open https://lighthousementoring.co.uk/ in browser

**Browser Console Check**:
- ✅ No SRI integrity errors
- ✅ No CSP violation errors
- ✅ analytics.js loads (check Network tab)
- ✅ mobile-menu.js loads (check Network tab)
- ✅ Mobile menu functions

**Check Multiple Pages**:
- / (homepage)
- /about/
- /services/board-advisory/
- /insights/

**Expected Outcome**: All pages load without JavaScript errors

---

## Phase 6: Google Testing Tools (30 minutes)

### Step 6.1: Mobile-Friendly Test

**Action**: Test with Google's official tool
- **URL**: https://search.google.com/test/mobile-friendly
- **Enter**: https://lighthousementoring.co.uk/

**What to Check**:
- ✅ Page is mobile-friendly
- ✅ No JavaScript execution errors
- ✅ Screenshot shows mobile menu accessible
- ✅ No resources blocked by robots.txt

**Expected Outcome**: "Page is mobile-friendly" with no errors

### Step 6.2: Rich Results Test

**Action**: Test structured data rendering
- **URL**: https://search.google.com/test/rich-results
- **Enter**: https://lighthousementoring.co.uk/

**What to Check**:
- ✅ Structured data detected
- ✅ No rendering errors
- ✅ Organization schema valid
- ✅ Person schema valid (on /about/)

**Expected Outcome**: Valid structured data with no errors

### Step 6.3: Lighthouse Audit

**Action**: Run Lighthouse in Chrome DevTools on live site

```bash
# Open DevTools (F12) → Lighthouse tab
# Select: Mobile, Navigation, Performance + SEO
# Click "Analyze page load"
```

**Target Scores**:
- Performance: 95+ (should still be high)
- Accessibility: 95+
- Best Practices: 100 (no console errors!)
- SEO: 100

**Expected Outcome**: Improved Best Practices score (previously affected by console errors)

### Step 6.4: PageSpeed Insights

**Action**: Test with Google's PageSpeed tool
- **URL**: https://pagespeed.web.dev/
- **Enter**: https://lighthousementoring.co.uk/

**Check Both**:
- Mobile score
- Desktop score

**Expected Outcome**: High performance scores maintained, no JavaScript errors

---

## Phase 7: Google Search Console Monitoring (1-7 days)

### Step 7.1: Request Indexing

**Action**: In Google Search Console
1. Go to URL Inspection tool
2. Enter: https://lighthousementoring.co.uk/
3. Click "Request Indexing"

**Repeat For Key Pages**:
- /about/
- /services/board-advisory/
- /services/executive-coaching/
- /services/organizational-wellbeing/

**Expected Outcome**: Google queues pages for re-crawling

### Step 7.2: Monitor Coverage Report

**Action**: Check daily for 7 days
- Navigate to: Coverage Report in GSC
- Look for: "Indexed, not submitted in sitemap" or "Discovered" status changing to "Indexed"

**What to Watch**:
- ✅ No "JavaScript error" warnings
- ✅ No "Rendering issue" warnings
- ✅ Increasing number of indexed pages

**Expected Outcome**: Pages successfully indexed without JavaScript errors

### Step 7.3: Check Mobile Usability

**Action**: Monitor Mobile Usability report in GSC

**What to Check**:
- ✅ No "Clickable elements too close together" errors
- ✅ No "Content wider than screen" errors
- ✅ No "Text too small to read" errors

**Expected Outcome**: No mobile usability issues

### Step 7.4: Verify Analytics Tracking

**Action**: Check Google Analytics (after 24-48 hours)

**Verify**:
- ✅ Real-time users showing
- ✅ Pageviews tracking
- ✅ Bounce rate reasonable
- ✅ No significant drop in traffic (should improve slightly)

**Expected Outcome**: Analytics tracking all traffic properly

---

## Phase 8: Prevent Future Issues (30 minutes)

### Step 8.1: Add SRI Hash Generation to Build Process

**Create**: `scripts/generate-sri.cjs`

```javascript
// scripts/generate-sri.cjs
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateSRI(filepath) {
  const fileBuffer = fs.readFileSync(filepath);
  const hashSum = crypto.createHash('sha384');
  hashSum.update(fileBuffer);
  return `sha384-${hashSum.digest('base64')}`;
}

// Generate hashes for built files
const distDir = path.join(__dirname, '../dist');
const files = {
  analytics: path.join(distDir, 'js/analytics.js'),
  mobileMenu: path.join(distDir, 'js/mobile-menu.js')
};

const hashes = {};
Object.keys(files).forEach(key => {
  if (fs.existsSync(files[key])) {
    hashes[key] = generateSRI(files[key]);
  }
});

// Write to JSON for consumption during build
fs.writeFileSync(
  path.join(__dirname, '../sri-hashes.json'),
  JSON.stringify(hashes, null, 2)
);

console.log('✅ SRI hashes generated:', hashes);
```

**Update `package.json`**:
```json
{
  "scripts": {
    "build": "astro build && node scripts/generate-sri.cjs",
    "dev": "astro dev -- --port 1000",
    "preview": "astro preview"
  }
}
```

**Expected Outcome**: SRI hashes auto-generated on every build

### Step 8.2: Add Automated Testing

**Create**: `scripts/test-live-site.cjs`

```javascript
// scripts/test-live-site.cjs
const https = require('https');

const SITE = 'https://lighthousementoring.co.uk';
const PAGES = [
  '/',
  '/about/',
  '/services/board-advisory/',
  '/contact/'
];

async function testPage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const errors = [];

        // Check for SRI integrity errors
        if (data.includes('integrity=') && data.includes('sha384-')) {
          console.log(`  ✅ SRI hashes present`);
        }

        // Check for analytics.js
        if (data.includes('analytics.js')) {
          console.log(`  ✅ analytics.js referenced`);
        } else {
          errors.push('analytics.js not found');
        }

        // Check for mobile-menu.js
        if (data.includes('mobile-menu.js')) {
          console.log(`  ✅ mobile-menu.js referenced`);
        } else {
          errors.push('mobile-menu.js not found');
        }

        resolve({ url, status: res.statusCode, errors });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', errors: [err.message] });
    });
  });
}

async function testAllPages() {
  console.log('🔍 Testing live site...\n');

  for (const page of PAGES) {
    const url = SITE + page;
    console.log(`Testing: ${url}`);
    const result = await testPage(url);
    console.log(`  Status: ${result.status}`);

    if (result.errors.length > 0) {
      console.log(`  ❌ Errors:`, result.errors);
    } else {
      console.log(`  ✅ All checks passed`);
    }
    console.log('');
  }
}

testAllPages();
```

**Run After Each Deployment**:
```bash
node scripts/test-live-site.cjs
```

**Expected Outcome**: Automated verification that key pages load correctly

### Step 8.3: Document CSP Policy

**Create**: `docs/SECURITY-HEADERS.md`

```markdown
# Security Headers Configuration

## Content Security Policy (CSP)

Current CSP allows:
- Self-hosted scripts and styles
- Inline scripts (required for some Astro features)
- Google Tag Manager
- Google Analytics

### Current Policy:
```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
```

### When to Update:
- Adding new external scripts (e.g., chat widgets, payment processors)
- Adding new analytics providers
- Embedding external content

### Testing CSP Changes:
1. Update CSP in `netlify.toml` or `public/_headers`
2. Deploy to staging/preview
3. Check browser console for CSP violations
4. Test all interactive features
5. Deploy to production

## Subresource Integrity (SRI)

SRI hashes protect against CDN compromises and ensure script integrity.

### Current Implementation:
- `analytics.js` - SHA-384 hash
- `mobile-menu.js` - SHA-384 hash

### Maintenance:
- Hashes are auto-generated during build process
- See `scripts/generate-sri.cjs`
- If manual update needed, run: `node generate-sri-hash.cjs`

### When SRI Fails:
- File content changed without hash update
- CDN cache serving old file with new hash
- Build process didn't run hash generation

### Fix:
```bash
npm run build  # Rebuilds and regenerates hashes
```
```

**Expected Outcome**: Clear documentation for maintaining security headers

---

## Success Criteria Checklist

### ✅ Immediate Success (Today)
- [ ] No SRI integrity errors in browser console (all pages)
- [ ] No CSP violation errors in browser console (all pages)
- [ ] analytics.js loads successfully (check Network tab)
- [ ] mobile-menu.js loads successfully (check Network tab)
- [ ] Mobile menu opens/closes on mobile viewport
- [ ] Google Analytics tracking works (check Real-Time report)

### ✅ Short-Term Success (1-3 Days)
- [ ] Google Mobile-Friendly Test passes with no errors
- [ ] Rich Results Test shows valid structured data
- [ ] Lighthouse Best Practices score = 100
- [ ] No JavaScript errors in Google Search Console

### ✅ Medium-Term Success (7 Days)
- [ ] All key pages indexed in Google Search Console
- [ ] No "JavaScript rendering" errors in Coverage report
- [ ] Mobile Usability report shows no issues
- [ ] Analytics tracking shows normal traffic patterns

### ✅ Long-Term Success (30 Days)
- [ ] Search rankings stable or improved
- [ ] Organic traffic maintained or growing
- [ ] Core Web Vitals remain good
- [ ] No recurring JavaScript errors

---

## Rollback Plan (If Something Goes Wrong)

### If Site Breaks After Deployment:

1. **Immediate Rollback**:
   ```bash
   # In Netlify Dashboard
   # Go to Deploys → Click failed deploy → "Publish deploy" on previous working version
   ```

2. **Identify Issue**:
   - Check browser console for new errors
   - Compare with working version in git history
   - Test locally with: `npm run build && npm run preview`

3. **Fix Forward** (preferred):
   - Fix the specific issue
   - Test locally
   - Deploy fix

4. **Safe Rollback** (if fix takes time):
   - Rollback to previous deploy in Netlify
   - Fix in development
   - Test thoroughly before re-deploying

### If Analytics Stops Working:

1. **Check**:
   - Browser console for errors
   - Google Analytics Real-Time report
   - GTM Debug mode (GTM preview)

2. **Quick Fixes**:
   - Clear browser cache
   - Check GTM container is published
   - Verify GA4 Measurement ID is correct

3. **Verify CSP** isn't blocking:
   ```bash
   # Check response headers on live site
   curl -I https://lighthousementoring.co.uk/
   ```

---

## Timeline Summary

| Phase | Time | Can Start |
|-------|------|-----------|
| 1. Investigation | 15 min | Immediately |
| 2. Fix SRI Hashes | 30 min | After Phase 1 |
| 3. Fix CSP | 15 min | Parallel with Phase 2 |
| 4. Local Testing | 30 min | After Phases 2 & 3 |
| 5. Deployment | 15 min | After Phase 4 passes |
| 6. Google Testing | 30 min | After Phase 5 deploys |
| 7. GSC Monitoring | 1-7 days | After Phase 6 |
| 8. Prevent Future Issues | 30 min | Anytime after Phase 5 |

**Total Active Work**: ~2.5 hours
**Total Monitoring Period**: 7 days

---

## Questions & Troubleshooting

### Q: What if I can't find the integrity attributes?
**A**: Check these locations in order:
1. `src/layouts/Layout.astro` (most likely)
2. Search all `.astro` files: `findstr /s "integrity" *.astro`
3. Check if added by build plugin in `astro.config.mjs`
4. Check Netlify inject scripts in dashboard

### Q: What if hashes still don't match after updating?
**A**: You might be hashing source files instead of built files:
- Hash files in `dist/js/` (after build), not `public/js/` or `src/`
- Run `npm run build` first, then generate hashes
- Make sure you're using the same hash algorithm (SHA-384)

### Q: How do I know if CSP is being applied?
**A**: Check response headers:
```bash
curl -I https://lighthousementoring.co.uk/ | findstr "Content-Security-Policy"
```
Or in browser: DevTools → Network → Select page request → Headers tab

### Q: What if Google Testing Tools still show errors?
**A**:
- Google's cache can take 24-48 hours to update
- Use "Request Indexing" in Google Search Console to speed up
- Test in Incognito mode to avoid browser cache
- Wait for natural re-crawl (can take 1-7 days)

### Q: Should I remove SRI entirely or keep it?
**A**: Keep SRI if:
- You serve files from CDN
- Security is critical (financial, healthcare sites)
- You can automate hash generation in build process

Remove SRI if:
- All assets served from same origin
- Development team is small/solo
- Build process doesn't support hash generation

---

## Next Steps

1. **Start with Phase 1** (Investigation) - 15 minutes
2. **Report findings** before making changes
3. **Proceed with Phases 2-3** (Fixes) - 45 minutes
4. **Test locally** (Phase 4) before deploying
5. **Deploy and verify** (Phases 5-6)
6. **Monitor for 7 days** (Phase 7)

**Ready to start? Begin with Phase 1, Step 1.1** ⬆️
