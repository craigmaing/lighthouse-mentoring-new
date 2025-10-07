const fs = require('fs');
const data = JSON.parse(fs.readFileSync('lighthouse-report-current.json', 'utf8'));
const audits = data.audits;

console.log('=== PERFORMANCE OPPORTUNITIES ===');
const perfOpps = [
  'render-blocking-resources',
  'unused-css-rules',
  'unused-javascript',
  'modern-image-formats',
  'uses-optimized-images',
  'efficient-animated-content'
];

perfOpps.forEach(id => {
  if (audits[id] && audits[id].score !== null && audits[id].score < 1) {
    console.log(`${audits[id].title}: ${audits[id].displayValue || 'See details'}`);
    if (audits[id].details && audits[id].details.overallSavingsMs) {
      console.log(`  Potential savings: ${Math.round(audits[id].details.overallSavingsMs)}ms`);
    }
  }
});

console.log('\n=== ACCESSIBILITY ISSUES ===');
const a11yKeys = Object.keys(audits).filter(k =>
  audits[k].score !== null &&
  audits[k].score < 1 &&
  data.categories.accessibility.auditRefs.some(ref => ref.id === k)
);

a11yKeys.forEach(id => {
  console.log(`${audits[id].title}: Score ${audits[id].score}`);
});

console.log('\n=== SEO ISSUES ===');
const seoKeys = Object.keys(audits).filter(k =>
  audits[k].score !== null &&
  audits[k].score < 1 &&
  data.categories.seo.auditRefs.some(ref => ref.id === k)
);

seoKeys.forEach(id => {
  console.log(`${audits[id].title}: Score ${audits[id].score}`);
});

console.log('\n=== KEY METRICS DETAILS ===');
console.log(`Time to Interactive: ${audits.interactive.displayValue}`);
console.log(`Max Potential FID: ${audits['max-potential-fid'].displayValue}`);
