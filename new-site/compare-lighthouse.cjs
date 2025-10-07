const fs = require('fs');

const before = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));
const after = JSON.parse(fs.readFileSync('lighthouse-report-after-font-fix.json', 'utf8'));

console.log('\n📊 BEFORE → AFTER COMPARISON:\n');
console.log('='.repeat(50));

Object.keys(before.categories).forEach(key => {
  const b = Math.round(before.categories[key].score * 100);
  const a = Math.round(after.categories[key].score * 100);
  const diff = a - b;
  const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '=';
  const emoji = diff > 0 ? '✅' : diff < 0 ? '❌' : '⚪';
  console.log(`${emoji} ${before.categories[key].title}: ${b} → ${a} (${arrow}${Math.abs(diff)})`);
});

console.log('\n' + '='.repeat(50));
console.log('\n🐛 ERRORS FIXED:\n');

const beforeErrors = before.audits['errors-in-console'].details.items.length;
const afterErrors = after.audits['errors-in-console'].details.items.length;
console.log(`Console Errors: ${beforeErrors} → ${afterErrors} (fixed ${beforeErrors - afterErrors})`);

console.log('\n');
