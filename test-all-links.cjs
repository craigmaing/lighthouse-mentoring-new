const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const pages = [
  '/',
  '/services',
  '/services/board-advisory',
  '/services/executive-coaching',
  '/services/organizational-wellbeing',
  '/about',
  '/contact',
  '/insights',
  '/privacy',
  '/terms'
];

async function testAllLinks() {
  const allResults = [];

  for (const page of pages) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Testing page: ${page}`);
    console.log('='.repeat(80));

    try {
      const response = await fetch(`http://localhost:1013${page}`);
      const html = await response.text();
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const links = Array.from(doc.querySelectorAll('a[href]'));
      console.log(`Found ${links.length} links`);

      const results = {
        page,
        totalLinks: links.length,
        internalLinks: 0,
        externalLinks: 0,
        emailLinks: 0,
        anchorLinks: 0,
        brokenLinks: [],
        workingLinks: [],
        allLinks: []
      };

      for (const link of links) {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim().substring(0, 60) || '[No text]';

        const linkInfo = {
          text,
          href,
          type: ''
        };

        // Categorize link
        if (href.startsWith('#')) {
          linkInfo.type = 'anchor';
          results.anchorLinks++;
          results.allLinks.push(linkInfo);
          continue;
        }

        if (href.startsWith('mailto:')) {
          linkInfo.type = 'email';
          results.emailLinks++;
          results.allLinks.push(linkInfo);
          continue;
        }

        if (href.startsWith('http') && !href.startsWith('http://localhost:1013')) {
          linkInfo.type = 'external';
          results.externalLinks++;
          results.allLinks.push(linkInfo);
          continue;
        }

        // Internal link - test it
        linkInfo.type = 'internal';
        results.internalLinks++;

        const testUrl = href.startsWith('http') ? href : `http://localhost:1013${href}`;

        try {
          const testResponse = await fetch(testUrl, { method: 'HEAD', timeout: 5000 });
          linkInfo.status = testResponse.status;

          if (testResponse.status === 404) {
            linkInfo.broken = true;
            results.brokenLinks.push(linkInfo);
            console.log(`  ❌ BROKEN: "${text}" -> ${href} (404)`);
          } else if (testResponse.status >= 200 && testResponse.status < 400) {
            linkInfo.broken = false;
            results.workingLinks.push(linkInfo);
          } else {
            linkInfo.broken = true;
            results.brokenLinks.push(linkInfo);
            console.log(`  ⚠️  ISSUE: "${text}" -> ${href} (${testResponse.status})`);
          }
        } catch (error) {
          linkInfo.broken = true;
          linkInfo.error = error.message;
          results.brokenLinks.push(linkInfo);
          console.log(`  ❌ ERROR: "${text}" -> ${href} (${error.message})`);
        }

        results.allLinks.push(linkInfo);
      }

      console.log(`\nSummary for ${page}:`);
      console.log(`  Total Links: ${results.totalLinks}`);
      console.log(`  Internal Links: ${results.internalLinks} (${results.workingLinks.length} working, ${results.brokenLinks.length} broken)`);
      console.log(`  External Links: ${results.externalLinks}`);
      console.log(`  Email Links: ${results.emailLinks}`);
      console.log(`  Anchor Links: ${results.anchorLinks}`);

      if (results.brokenLinks.length > 0) {
        console.log(`\n  ❌ ${results.brokenLinks.length} BROKEN LINKS FOUND!`);
      } else {
        console.log(`\n  ✅ All internal links working!`);
      }

      allResults.push(results);

    } catch (error) {
      console.log(`ERROR testing page ${page}: ${error.message}`);
      allResults.push({
        page,
        error: error.message
      });
    }
  }

  // Final summary
  console.log(`\n${'='.repeat(80)}`);
  console.log('FINAL SUMMARY');
  console.log('='.repeat(80));

  const totalBroken = allResults.reduce((sum, r) => sum + (r.brokenLinks?.length || 0), 0);
  const totalWorking = allResults.reduce((sum, r) => sum + (r.workingLinks?.length || 0), 0);
  const totalInternal = allResults.reduce((sum, r) => sum + (r.internalLinks || 0), 0);

  console.log(`Total Pages Tested: ${pages.length}`);
  console.log(`Total Internal Links: ${totalInternal}`);
  console.log(`Working Links: ${totalWorking} ✅`);
  console.log(`Broken Links: ${totalBroken} ${totalBroken > 0 ? '❌' : '✅'}`);

  if (totalBroken > 0) {
    console.log(`\n❌ BROKEN LINKS FOUND:`);
    allResults.forEach(result => {
      if (result.brokenLinks && result.brokenLinks.length > 0) {
        console.log(`\n  Page: ${result.page}`);
        result.brokenLinks.forEach(link => {
          console.log(`    - "${link.text}" -> ${link.href} (${link.status || link.error})`);
        });
      }
    });
  } else {
    console.log(`\n✅ ALL INTERNAL LINKS ARE WORKING!`);
  }

  return allResults;
}

testAllLinks().catch(console.error);
