/**
 * Chrome DevTools MCP SEO Audit - Remaining Pages
 * Tests all remaining URLs for SEO completeness
 */

const urlsToTest = [
  'https://lighthousementoring.co.uk/insights/business-transformation-consulting/',
  'https://lighthousementoring.co.uk/insights/change-management-consultancy/',
  'https://lighthousementoring.co.uk/insights/executive-coach-benefits/',
  'https://lighthousementoring.co.uk/insights/executive-leadership-coaching/',
  'https://lighthousementoring.co.uk/insights/how-to-choose-an-executive-coach/',
  'https://lighthousementoring.co.uk/insights/management-consulting-vs-strategy/',
  'https://lighthousementoring.co.uk/contact/',
  'https://lighthousementoring.co.uk/thank-you/',
  'https://lighthousementoring.co.uk/privacy/',
  'https://lighthousementoring.co.uk/terms/',
];

console.log('URLs to test via Chrome DevTools MCP:');
console.log('==========================================');
urlsToTest.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});
console.log('\nTotal URLs:', urlsToTest.length);
