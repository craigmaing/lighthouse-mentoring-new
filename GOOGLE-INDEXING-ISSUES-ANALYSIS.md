# Google Search Console Indexing Issues - Analysis & Solutions

*Generated: 2025-10-13*
*Problem: Pages not being indexed or served correctly*

## Critical Issues Identified

### 1. Sitemap URL Mismatch
**Issue**: Robots.txt points to `https://lighthousementoring.com/sitemap.xml` but site is configured for `https://lighthousementoring.co.uk`

**Files Affected**:
- [`public/robots.txt`](public/robots.txt:39) - Line 39: `Sitemap: https://lighthousementoring.com/sitemap.xml`
- [`astro.config.mjs`](astro.config.mjs:8) - Line 8: `site: 'https://lighthousementoring.co.uk'`

**Impact**: Google cannot find sitemap, causing crawling issues

### 2. Missing Sitemap Generation
**Issue**: No sitemap generation route exists in the codebase

**Expected File**: `src/pages/sitemap.xml.ts` or `src/pages/sitemap-[...].xml.ts`
**Current State**: Only RSS feed exists at [`src/pages/rss.xml.ts`](src/pages/rss.xml.ts:1)

### 3. Redirect Loop on Thank You Page
**Issue**: Netlify redirect may be causing indexing problems

**Files Affected**:
- [`netlify.toml`](netlify.toml:12-16) - Redirect from `/contact-success` to `/contact?success=true`
- [`src/pages/thank-you.astro`](src/pages/thank-you.astro:1) - Actual thank you page

**Potential Problem**: Redirect conflicts or multiple thank you page URLs

### 4. Content Security Policy Too Restrictive
**Issue**: CSP may block legitimate resources

**File**: [`public/_headers`](public/_headers:15)
**Problem**: `script-src 'self' https://www.googletagmanager.com` - May block other scripts

### 5. Missing Individual Service Pages
**Issue**: Services page links to non-existent individual service pages

**Missing Pages**:
- `/services/board-advisory` (linked from [`services.astro:105`](src/pages/services.astro:105))
- `/services/executive-coaching` (linked from [`services.astro:159`](src/pages/services.astro:159))
- `/services/organizational-wellbeing` (linked from [`services.astro:213`](src/pages/services.astro:213))

## Immediate Fixes Required

### Fix 1: Correct Sitemap URL
```diff
--- a/public/robots.txt
+++ b/public/robots.txt
@@ -36,4 +36,4 @@
-# Sitemap
-Sitemap: https://lighthousementoring.com/sitemap.xml
+# Sitemap
+Sitemap: https://lighthousementoring.co.uk/sitemap.xml
```

### Fix 2: Add Sitemap Generation
Create new file: `src/pages/sitemap.xml.ts`

```typescript
---
import { getCollection } from 'astro:content';
import { APIRoute } from 'astro';

export async function GET({ site }) {
  const insights = await getCollection('insights');
  const pages = [
    {
      url: '/',
      changefreq: 'monthly',
      priority: 1.0
    },
    {
      url: '/about',
      changefreq: 'yearly',
      priority: 0.8
    },
    {
      url: '/services',
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: '/contact',
      changefreq: 'yearly',
      priority: 0.7
    },
    {
      url: '/thank-you',
      changefreq: 'never',
      priority: 0.5
    },
    {
      url: '/privacy',
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      url: '/terms',
      changefreq: 'yearly',
      priority: 0.3
    }
  ];

  // Add blog posts
  const sitemapPages = [
    ...pages,
    ...insights.map(post => ({
      url: `/insights/${post.slug}/`,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: post.data.pubDate.toISOString()
    }))
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapPages.map(page => `
        <url>
          <loc>${site}${page.url}</loc>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
          ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
        </url>
      `).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  );
}
```

### Fix 3: Create Missing Service Pages
Create three new files:

#### `src/pages/services/board-advisory.astro`
```astro
---
import Layout from '../../layouts/Layout.astro';
import Button from '../../components/Button.astro';
import { Image } from 'astro:assets';

import rsphBadge from '../../images/RSPH-Fellow-Badge.jpg';

<Layout
  schemaType="service"
  serviceName="Board Advisory & Governance"
  serviceDescription="Navigate complex board dynamics, governance challenges, and strategic decisions with extensive board-level experience."
  title="Board Advisory Services | Strategic Governance Consulting"
  description="Professional board advisory services from an experienced strategic consultant. FRSPH Fellow, FCMI Fellow, and IoD Ambassador."
>
  <!-- Service page content -->
  <section class="hero section-padding bg-primary text-white">
    <div class="container">
      <h1 class="mb-6">Board Advisory & Governance</h1>
      <p class="text-gray-100 leading-relaxed mb-8">
        Navigate complex board dynamics, governance challenges, and strategic decisions with objective perspective from someone who's sat where you sit.
      </p>
      <Button href="/contact" variant="secondary">Discuss Your Challenge</Button>
    </div>
  </section>

  <!-- Rest of service page content -->
</Layout>
```

#### `src/pages/services/executive-coaching.astro`
```astro
---
import Layout from '../../layouts/Layout.astro';
import Button from '../../components/Button.astro';

<Layout
  schemaType="service"
  serviceName="Executive Coaching"
  serviceDescription="Develop leadership capability with coaching that combines psychological insight, strategic thinking, and real-world board-level experience."
  title="Executive Coaching Services | Leadership Development"
  description="Professional executive coaching services from an EMCC Professional Coach with extensive board-level experience."
>
  <!-- Service page content -->
</Layout>
```

#### `src/pages/services/organizational-wellbeing.astro`
```astro
---
import Layout from '../../layouts/Layout.astro';
import Button from '../../components/Button.astro';

<Layout
  schemaType="service"
  serviceName="Organizational Wellbeing Audits"
  serviceDescription="Understand organizational wellbeing with human-AI analysis that surfaces patterns invisible to traditional surveys."
  title="Organizational Wellbeing Audits | Workplace Health Analysis"
  description="FRSPH Fellowship-backed organizational wellbeing audits with AI-powered pattern recognition and strategic insights."
>
  <!-- Service page content -->
</Layout>
```

### Fix 4: Update Netlify Configuration
```diff
--- a/netlify.toml
+++ b/netlify.toml
@@ -11,7 +11,7 @@
-[[redirects]]
-  from = "/contact-success"
-  to = "/contact?success=true"
-  status = 200
-  force = false
+# Remove redirect that may cause indexing issues
```

### Fix 5: Relax Content Security Policy
```diff
--- a/public/_headers
+++ b/public/_headers
@@ -14,2 +14,2 @@
-  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
+  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.googletagmanager.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
```

## Additional SEO Improvements

### 1. Add Canonical Tags to Individual Pages
Ensure all pages have proper canonical URLs in [`Layout.astro`](src/layouts/Layout.astro:44)

### 2. Improve Internal Linking
Add more contextual internal links between related content to help Google discover and index pages.

### 3. Add Structured Data for Service Pages
Each service page should include service-specific schema markup for better search visibility.

## Implementation Priority

1. **URGENT**: Fix sitemap URL mismatch (robots.txt)
2. **URGENT**: Add sitemap generation route
3. **HIGH**: Create missing service pages
4. **MEDIUM**: Review and fix CSP headers
5. **LOW**: Remove unnecessary redirects

## Testing Checklist

After implementing fixes:

- [ ] Verify sitemap accessible at `https://lighthousementoring.co.uk/sitemap.xml`
- [ ] Test all service page links work correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Run Google Search Console URL inspection tool
- [ ] Monitor indexing status for affected pages
- [ ] Check for any remaining redirect loops

## Monitoring

Use Google Search Console to track:
- Indexing status of individual pages
- Crawl errors and warnings
- Sitemap submission and processing status
- Mobile usability issues
- Core Web Vitals performance

---

**Expected Outcome**: These fixes should resolve the indexing issues and improve Google Search Console performance within 2-3 weeks of implementation.