const https = require('https');

// All URLs from the sitemap
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

function checkUrl(url) {
  return new Promise((resolve) => {
    const request = https.request(url, { method: 'HEAD', timeout: 10000 }, (response) => {
      resolve({
        url,
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        headers: {
          'x-robots-tag': response.headers['x-robots-tag'],
          'content-type': response.headers['content-type']
        }
      });
    });

    request.on('error', (error) => {
      resolve({
        url,
        error: error.message,
        statusCode: 0
      });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({
        url,
        error: 'Timeout',
        statusCode: 0
      });
    });

    request.end();
  });
}

async function checkAllUrls() {
  console.log('Testing all sitemap URLs...\n');
  
  const results = [];
  for (const url of urls) {
    console.log(`Checking: ${url}`);
    const result = await checkUrl(url);
    results.push(result);
    
    if (result.error) {
      console.log(`  ❌ ERROR: ${result.error}`);
    } else if (result.statusCode >= 200 && result.statusCode < 300) {
      console.log(`  ✅ ${result.statusCode} ${result.statusMessage}`);
      if (result.headers['x-robots-tag']) {
        console.log(`  🤖 Robots: ${result.headers['x-robots-tag']}`);
      }
    } else {
      console.log(`  ⚠️  ${result.statusCode} ${result.statusMessage}`);
    }
    console.log('');
  }
  
  // Summary
  console.log('\n=== SUMMARY ===');
  const success = results.filter(r => r.statusCode >= 200 && r.statusCode < 300).length;
  const errors = results.filter(r => r.statusCode >= 400 || r.error).length;
  const others = results.length - success - errors;
  
  console.log(`✅ Successful: ${success}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`⚠️  Other: ${others}`);
  
  if (errors > 0) {
    console.log('\n❌ ERRORS FOUND:');
    results.filter(r => r.statusCode >= 400 || r.error).forEach(r => {
      console.log(`  ${r.url} - ${r.statusCode} ${r.statusMessage || r.error}`);
    });
  }
}

checkAllUrls().catch(console.error);