/**
 * Comprehensive URL Testing Script
 * Tests all 19 URLs in the sitemap to verify they return 200 OK
 */

const https = require('https');

const urls = [
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

function testUrl(url, useGooglebotAgent = false) {
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      headers: useGooglebotAgent ? {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      } : {}
    };

    const req = https.request(url, options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        headers: {
          'x-robots-tag': res.headers['x-robots-tag'],
          'content-type': res.headers['content-type']
        }
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log('=' .repeat(80));
  console.log('COMPREHENSIVE URL STATUS TEST');
  console.log('=' .repeat(80));
  console.log('');

  console.log('Testing with standard user-agent:');
  console.log('-'.repeat(80));

  const results = [];
  for (const url of urls) {
    const result = await testUrl(url);
    results.push(result);

    const status = result.status === 200 ? '✅' : '❌';
    const shortUrl = url.replace('https://lighthousementoring.co.uk', '');
    console.log(`${status} ${result.status} - ${shortUrl || '/'}`);

    if (result.status !== 200) {
      console.log(`   Error: ${result.error || 'Non-200 status'}`);
      if (result.headers) {
        console.log(`   X-Robots-Tag: ${result.headers['x-robots-tag'] || 'none'}`);
      }
    }
  }

  console.log('');
  console.log('Testing with Googlebot user-agent:');
  console.log('-'.repeat(80));

  const googlebotResults = [];
  for (const url of urls) {
    const result = await testUrl(url, true);
    googlebotResults.push(result);

    const status = result.status === 200 ? '✅' : '❌';
    const shortUrl = url.replace('https://lighthousementoring.co.uk', '');
    console.log(`${status} ${result.status} - ${shortUrl || '/'}`);

    if (result.status !== 200) {
      console.log(`   Error: ${result.error || 'Non-200 status'}`);
      if (result.headers) {
        console.log(`   X-Robots-Tag: ${result.headers['x-robots-tag'] || 'none'}`);
      }
    }
  }

  console.log('');
  console.log('=' .repeat(80));
  console.log('SUMMARY');
  console.log('=' .repeat(80));

  const successCount = results.filter(r => r.status === 200).length;
  const googlebotSuccessCount = googlebotResults.filter(r => r.status === 200).length;

  console.log(`Standard user-agent: ${successCount}/${urls.length} URLs returning 200 OK`);
  console.log(`Googlebot user-agent: ${googlebotSuccessCount}/${urls.length} URLs returning 200 OK`);

  if (successCount < urls.length || googlebotSuccessCount < urls.length) {
    console.log('');
    console.log('⚠️  ISSUES DETECTED - Some URLs are not returning 200 OK');
    console.log('');
    console.log('Failed URLs (Standard):');
    results.filter(r => r.status !== 200).forEach(r => {
      console.log(`  - ${r.url} (Status: ${r.status})`);
    });

    console.log('');
    console.log('Failed URLs (Googlebot):');
    googlebotResults.filter(r => r.status !== 200).forEach(r => {
      console.log(`  - ${r.url} (Status: ${r.status})`);
    });
  } else {
    console.log('');
    console.log('✅ All URLs are working correctly!');
  }
}

runTests().catch(console.error);
