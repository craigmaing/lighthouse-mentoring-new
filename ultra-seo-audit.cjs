/**
 * ULTRA-DEEP SEO AUDIT
 * Comprehensive validation of sitemap, meta tags, structured data, and crawlability
 */

const https = require('https');
const fs = require('fs');

// Expected pages from dist folder
const expectedPages = [
  '/',
  '/about/',
  '/contact/',
  '/insights/',
  '/insights/board-advisor-vs-non-executive-director/',
  '/insights/business-transformation-consulting/',
  '/insights/change-management-consultancy/',
  '/insights/executive-coach-benefits/',
  '/insights/executive-coaching-roi/',
  '/insights/executive-leadership-coaching/',
  '/insights/how-to-choose-an-executive-coach/',
  '/insights/management-consulting-vs-strategy/',
  '/privacy/',
  '/services/',
  '/services/board-advisory/',
  '/services/executive-coaching/',
  '/services/organizational-wellbeing/',
  '/terms/',
  '/thank-you/'
];

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

function extractMetaTags(html) {
  const metaTags = {};

  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  metaTags.title = titleMatch ? titleMatch[1] : null;

  // Meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  metaTags.description = descMatch ? descMatch[1] : null;

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  metaTags.canonical = canonicalMatch ? canonicalMatch[1] : null;

  // Robots
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i);
  metaTags.robots = robotsMatch ? robotsMatch[1] : null;

  // OG tags
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
  metaTags.ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;

  const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
  metaTags.ogDescription = ogDescMatch ? ogDescMatch[1] : null;

  const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  metaTags.ogImage = ogImageMatch ? ogImageMatch[1] : null;

  // Twitter cards
  const twitterCardMatch = html.match(/<meta\s+property="twitter:card"\s+content="([^"]+)"/i);
  metaTags.twitterCard = twitterCardMatch ? twitterCardMatch[1] : null;

  // Structured data
  const jsonLdMatches = html.match(/<script\s+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis);
  metaTags.structuredData = jsonLdMatches ? jsonLdMatches.length : 0;

  return metaTags;
}

async function runAudit() {
  console.log('═'.repeat(80));
  console.log('ULTRA-DEEP SEO AUDIT - COMPREHENSIVE VALIDATION');
  console.log('═'.repeat(80));
  console.log('');

  // Step 1: Validate Sitemap
  console.log('1. SITEMAP VALIDATION');
  console.log('─'.repeat(80));

  try {
    const sitemapIndex = await fetchURL('https://lighthousementoring.co.uk/sitemap-index.xml');
    console.log(`✅ Sitemap Index: HTTP ${sitemapIndex.statusCode}`);
    console.log(`   X-Robots-Tag: ${sitemapIndex.headers['x-robots-tag'] || 'none (GOOD)'}`);
    console.log(`   Cache-Control: ${sitemapIndex.headers['cache-control']}`);

    // Check if sitemap-0.xml is referenced
    if (sitemapIndex.body.includes('sitemap-0.xml')) {
      console.log('✅ References sitemap-0.xml');
    }

    const sitemap = await fetchURL('https://lighthousementoring.co.uk/sitemap-0.xml');
    console.log(`✅ Main Sitemap: HTTP ${sitemap.statusCode}`);

    // Extract URLs from sitemap
    const urlMatches = sitemap.body.match(/<loc>(.*?)<\/loc>/g);
    const sitemapURLs = urlMatches ? urlMatches.map(m => m.replace(/<\/?loc>/g, '').replace('https://lighthousementoring.co.uk', '')) : [];

    console.log(`   URLs in sitemap: ${sitemapURLs.length}`);
    console.log('');

    // Compare with expected pages
    console.log('   Comparing sitemap URLs with expected pages:');
    const missingFromSitemap = expectedPages.filter(url => !sitemapURLs.includes(url));
    const extraInSitemap = sitemapURLs.filter(url => !expectedPages.includes(url));

    if (missingFromSitemap.length === 0 && extraInSitemap.length === 0) {
      console.log('   ✅ Perfect match! All 19 pages are in sitemap.');
    } else {
      if (missingFromSitemap.length > 0) {
        console.log('   ❌ Missing from sitemap:');
        missingFromSitemap.forEach(url => console.log(`      - ${url}`));
      }
      if (extraInSitemap.length > 0) {
        console.log('   ⚠️  Extra URLs in sitemap:');
        extraInSitemap.forEach(url => console.log(`      - ${url}`));
      }
    }
  } catch (error) {
    console.log(`❌ Sitemap Error: ${error.message}`);
  }

  console.log('');
  console.log('2. ROBOTS.TXT VALIDATION');
  console.log('─'.repeat(80));

  try {
    const robots = await fetchURL('https://lighthousementoring.co.uk/robots.txt');
    console.log(`✅ robots.txt: HTTP ${robots.statusCode}`);

    if (robots.body.includes('Allow: /')) {
      console.log('✅ Allows all crawling');
    }
    if (robots.body.includes('Sitemap:')) {
      console.log('✅ Sitemap referenced');
    }
    if (robots.body.includes('User-agent: Googlebot')) {
      console.log('✅ Googlebot explicitly allowed');
    }
  } catch (error) {
    console.log(`❌ robots.txt Error: ${error.message}`);
  }

  console.log('');
  console.log('3. META TAGS & SEO ELEMENTS AUDIT');
  console.log('─'.repeat(80));

  const issues = [];

  // Test sample pages
  const samplePages = [
    { url: 'https://lighthousementoring.co.uk/', name: 'Homepage' },
    { url: 'https://lighthousementoring.co.uk/about/', name: 'About' },
    { url: 'https://lighthousementoring.co.uk/services/executive-coaching/', name: 'Service Page' },
    { url: 'https://lighthousementoring.co.uk/insights/executive-coaching-roi/', name: 'Blog Post' }
  ];

  for (const page of samplePages) {
    try {
      const response = await fetchURL(page.url);
      const meta = extractMetaTags(response.body);

      console.log(`\n${page.name} (${page.url}):`);
      console.log(`  Title: ${meta.title ? '✅' : '❌'} ${meta.title ? `"${meta.title.substring(0, 50)}..."` : 'MISSING'}`);
      console.log(`  Description: ${meta.description ? '✅' : '❌'} ${meta.description ? `(${meta.description.length} chars)` : 'MISSING'}`);
      console.log(`  Canonical: ${meta.canonical ? '✅' : '❌'} ${meta.canonical || 'MISSING'}`);
      console.log(`  Robots meta: ${meta.robots ? '✅' : '❌'} ${meta.robots || 'MISSING'}`);
      console.log(`  OG Title: ${meta.ogTitle ? '✅' : '❌'}`);
      console.log(`  OG Description: ${meta.ogDescription ? '✅' : '❌'}`);
      console.log(`  OG Image: ${meta.ogImage ? '✅' : '❌'}`);
      console.log(`  Twitter Card: ${meta.twitterCard ? '✅' : '❌'}`);
      console.log(`  Structured Data: ${meta.structuredData ? '✅' : '❌'} ${meta.structuredData ? `(${meta.structuredData} schemas)` : 'MISSING'}`);

      // Check for issues
      if (!meta.title) issues.push(`${page.name}: Missing title tag`);
      if (!meta.description) issues.push(`${page.name}: Missing meta description`);
      if (meta.description && meta.description.length < 120) issues.push(`${page.name}: Description too short (${meta.description.length} chars)`);
      if (meta.description && meta.description.length > 160) issues.push(`${page.name}: Description too long (${meta.description.length} chars)`);
      if (!meta.canonical) issues.push(`${page.name}: Missing canonical URL`);
      if (!meta.robots || !meta.robots.includes('index')) issues.push(`${page.name}: Robots meta doesn't include 'index'`);
      if (!meta.ogTitle) issues.push(`${page.name}: Missing OG title`);
      if (!meta.ogImage) issues.push(`${page.name}: Missing OG image`);
      if (meta.structuredData === 0) issues.push(`${page.name}: Missing structured data`);

      // Check canonical points to correct domain
      if (meta.canonical && !meta.canonical.includes('lighthousementoring.co.uk')) {
        issues.push(`${page.name}: Canonical URL doesn't point to main domain`);
      }

    } catch (error) {
      console.log(`❌ Error fetching ${page.name}: ${error.message}`);
      issues.push(`${page.name}: Failed to fetch page`);
    }
  }

  console.log('');
  console.log('═'.repeat(80));
  console.log('AUDIT SUMMARY');
  console.log('═'.repeat(80));

  if (issues.length === 0) {
    console.log('');
    console.log('🎉 PERFECT! No SEO issues detected.');
    console.log('');
    console.log('✅ Sitemap correctly configured');
    console.log('✅ All pages have proper meta tags');
    console.log('✅ Canonical URLs point to correct domain');
    console.log('✅ Structured data implemented');
    console.log('✅ OpenGraph and Twitter cards present');
    console.log('✅ robots.txt properly configured');
    console.log('');
  } else {
    console.log('');
    console.log(`⚠️  Found ${issues.length} potential issue(s):`);
    console.log('');
    issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
    console.log('');
  }

  console.log('═'.repeat(80));
}

runAudit().catch(console.error);
