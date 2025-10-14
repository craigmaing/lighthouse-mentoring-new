const puppeteer = require('puppeteer');
const fs = require('fs');

const URLS = [
  'https://lighthousementoring.co.uk/',
  'https://lighthousementoring.co.uk/about/',
  'https://lighthousementoring.co.uk/contact/',
  'https://lighthousementoring.co.uk/insights/',
  'https://lighthousementoring.co.uk/insights/board-advisor-vs-non-executive-director/',
  'https://lighthousementoring.co.uk/insights/business-transformation-consulting/',
  'https://lighthousementoring.co.uk/insights/change-management-consultancy/',
  'https://lighthousementoring.co.uk/insights/executive-coach-benefits/',
  'https://lighthousementoring.co.uk/insights/executive-coaching-roi/',
  'https://lighthousementoring.co.uk/insights/executive-leadership-coaching/',
  'https://lighthousementoring.co.uk/insights/how-to-choose-an-executive-coach/',
  'https://lighthousementoring.co.uk/insights/management-consulting-vs-strategy/',
  'https://lighthousementoring.co.uk/privacy/',
  'https://lighthousementoring.co.uk/services/',
  'https://lighthousementoring.co.uk/services/board-advisory/',
  'https://lighthousementoring.co.uk/services/executive-coaching/',
  'https://lighthousementoring.co.uk/services/organizational-wellbeing/',
  'https://lighthousementoring.co.uk/terms/',
  'https://lighthousementoring.co.uk/thank-you/'
];

async function analyzePage(page, url) {
  console.log(`\n📄 Crawling: ${url}`);

  try {
    // Navigate like Googlebot
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Extract all SEO data that Googlebot would see
    const data = await page.evaluate(() => {
      // Meta tags
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
      const ogDescription = document.querySelector('meta[property="og:description"]')?.content || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';

      // Robots meta
      const robotsMeta = document.querySelector('meta[name="robots"]')?.content || '';

      // Structured Data
      const structuredData = [];
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        try {
          structuredData.push(JSON.parse(script.textContent));
        } catch (e) {
          console.error('Failed to parse structured data:', e);
        }
      });

      // Headings
      const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim());
      const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());

      // Links
      const internalLinks = Array.from(document.querySelectorAll('a[href^="/"], a[href^="https://lighthousementoring.co.uk"]')).length;
      const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]')).filter(a =>
        !a.href.startsWith('https://lighthousementoring.co.uk')
      ).length;

      // Images
      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim() === '').length;
      const totalImages = images.length;

      // Content
      const wordCount = document.body.innerText.split(/\s+/).length;

      // Mobile viewport
      const viewport = document.querySelector('meta[name="viewport"]')?.content || '';

      return {
        title,
        metaDescription,
        canonical,
        robotsMeta,
        ogTitle,
        ogDescription,
        ogImage,
        structuredData,
        h1s,
        h2Count: h2s.length,
        internalLinks,
        externalLinks,
        totalImages,
        imagesWithoutAlt,
        wordCount,
        viewport
      };
    });

    // Performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: perfData?.domContentLoadedEventEnd - perfData?.domContentLoadedEventStart || 0,
        loadComplete: perfData?.loadEventEnd - perfData?.fetchStart || 0,
        transferSize: perfData?.transferSize || 0
      };
    });

    // Check for console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return {
      url,
      status: 'success',
      ...data,
      performance: performanceMetrics,
      errors: errors.slice(0, 5) // Limit to first 5 errors
    };

  } catch (error) {
    console.error(`❌ Error crawling ${url}:`, error.message);
    return {
      url,
      status: 'error',
      error: error.message
    };
  }
}

async function main() {
  console.log('🤖 Starting Googlebot-style crawl of lighthousementoring.co.uk\n');
  console.log(`📊 Total pages to crawl: ${URLS.length}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set Googlebot user agent
  await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

  // Set viewport like Googlebot
  await page.setViewport({ width: 1024, height: 768 });

  const results = [];

  for (const url of URLS) {
    const result = await analyzePage(page, url);
    results.push(result);

    // Brief summary
    if (result.status === 'success') {
      console.log(`✅ Title: ${result.title}`);
      console.log(`   H1s: ${result.h1s.length} | Words: ${result.wordCount} | Images: ${result.totalImages}`);
      console.log(`   Structured Data: ${result.structuredData.length} schemas`);
    }

    // Small delay between requests (be respectful)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await browser.close();

  // Save detailed report
  const report = {
    crawlDate: new Date().toISOString(),
    totalPages: URLS.length,
    successfulPages: results.filter(r => r.status === 'success').length,
    failedPages: results.filter(r => r.status === 'error').length,
    results
  };

  fs.writeFileSync(
    'googlebot-crawl-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log('\n✅ Crawl complete!');
  console.log(`📊 Report saved to: googlebot-crawl-report.json`);
  console.log(`\n📈 Summary:`);
  console.log(`   ✅ Successful: ${report.successfulPages}`);
  console.log(`   ❌ Failed: ${report.failedPages}`);

  // Generate issues summary
  const issues = {
    missingMetaDescriptions: 0,
    multipleH1s: 0,
    noH1: 0,
    imagesWithoutAlt: 0,
    noStructuredData: 0,
    thinContent: 0
  };

  results.forEach(result => {
    if (result.status === 'success') {
      if (!result.metaDescription || result.metaDescription.length < 50) issues.missingMetaDescriptions++;
      if (result.h1s.length > 1) issues.multipleH1s++;
      if (result.h1s.length === 0) issues.noH1++;
      if (result.imagesWithoutAlt > 0) issues.imagesWithoutAlt++;
      if (result.structuredData.length === 0) issues.noStructuredData++;
      if (result.wordCount < 300) issues.thinContent++;
    }
  });

  console.log(`\n⚠️  Issues Found:`);
  console.log(`   Missing/short meta descriptions: ${issues.missingMetaDescriptions}`);
  console.log(`   Multiple H1 tags: ${issues.multipleH1s}`);
  console.log(`   No H1 tag: ${issues.noH1}`);
  console.log(`   Images without alt text: ${issues.imagesWithoutAlt}`);
  console.log(`   No structured data: ${issues.noStructuredData}`);
  console.log(`   Thin content (<300 words): ${issues.thinContent}`);
}

main().catch(console.error);
