const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report-production.json', 'utf8'));
const contrast = data.audits['color-contrast'];

if (contrast && contrast.details && contrast.details.items && contrast.details.items.length > 0) {
  console.log('=== COLOR CONTRAST ISSUES ===\n');
  contrast.details.items.forEach((item, i) => {
    console.log(`Issue ${i + 1}:`);
    console.log(`  Element: ${item.node.snippet}`);
    console.log(`  Contrast Ratio: ${item.contrastRatio}`);
    console.log(`  Required: 4.5:1 (normal text) or 3:1 (large text)`);
    if (item.node.selector) {
      console.log(`  Selector: ${item.node.selector}`);
    }
    console.log('');
  });
} else {
  console.log('No specific contrast issues found in report');
  console.log('Accessibility score: ' + Math.round(data.categories.accessibility.score * 100));
}
