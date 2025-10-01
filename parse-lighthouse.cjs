const fs = require('fs');

const data = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf8'));

console.log('\n🔍 LIGHTHOUSE AUDIT SCORES:\n');
console.log('='.repeat(50));

Object.entries(data.categories).forEach(([key, cat]) => {
  const score = Math.round(cat.score * 100);
  const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
  console.log(`${emoji} ${cat.title}: ${score}/100`);
});

console.log('\n' + '='.repeat(50));
console.log('\n📊 PERFORMANCE METRICS:\n');

const metrics = [
  ['first-contentful-paint', 'First Contentful Paint', '< 1.8s'],
  ['largest-contentful-paint', 'Largest Contentful Paint', '< 2.5s'],
  ['speed-index', 'Speed Index', '< 3.4s'],
  ['total-blocking-time', 'Total Blocking Time', '< 200ms'],
  ['cumulative-layout-shift', 'Cumulative Layout Shift', '< 0.1']
];

metrics.forEach(([id, name, target]) => {
  const audit = data.audits[id];
  if (audit && audit.displayValue) {
    console.log(`  ${name}: ${audit.displayValue} (target: ${target})`);
  }
});

console.log('\n' + '='.repeat(50));
console.log('\n⚠️  TOP ISSUES TO FIX:\n');

const issues = [];

// Find failing audits
Object.values(data.audits).forEach(audit => {
  if (audit.score !== null && audit.score < 0.9 && audit.details && audit.details.items) {
    issues.push({
      title: audit.title,
      score: audit.score,
      description: audit.description
    });
  }
});

// Sort by score and show top 5
issues.sort((a, b) => a.score - b.score)
  .slice(0, 5)
  .forEach((issue, i) => {
    console.log(`${i + 1}. ${issue.title} (score: ${Math.round(issue.score * 100)}/100)`);
  });

console.log('\n');
