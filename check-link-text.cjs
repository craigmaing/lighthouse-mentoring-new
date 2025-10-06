const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report-fixed.json', 'utf8'));
const linkText = data.audits['link-text'];

console.log('=== LINK TEXT AUDIT ===');
console.log('Score: ' + (linkText.score !== null ? Math.round(linkText.score * 100) + '/100' : 'N/A'));
console.log('Title: ' + linkText.title);

if (linkText.details && linkText.details.items && linkText.details.items.length > 0) {
  console.log('\nIssues found (' + linkText.details.items.length + '):');
  linkText.details.items.forEach((item, i) => {
    console.log(`  ${i+1}. ${item.node.snippet}`);
  });
} else {
  console.log('\n✅ No issues found! All links have descriptive text.');
}
