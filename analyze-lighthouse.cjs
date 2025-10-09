const data = require('./docs/lighthouse-report.report.json');

console.log('=== LIGHTHOUSE SCORES ===\n');
console.log('Performance:', Math.round(data.categories.performance.score * 100));
console.log('Accessibility:', Math.round(data.categories.accessibility.score * 100));
console.log('Best Practices:', Math.round(data.categories['best-practices'].score * 100));
console.log('SEO:', Math.round(data.categories.seo.score * 100));

console.log('\n=== CORE WEB VITALS ===\n');
const metrics = data.audits;
console.log('FCP (First Contentful Paint):', metrics['first-contentful-paint'].displayValue);
console.log('LCP (Largest Contentful Paint):', metrics['largest-contentful-paint'].displayValue);
console.log('TBT (Total Blocking Time):', metrics['total-blocking-time'].displayValue);
console.log('CLS (Cumulative Layout Shift):', metrics['cumulative-layout-shift'].displayValue);
console.log('Speed Index:', metrics['speed-index'].displayValue);

console.log('\n=== PERFORMANCE OPPORTUNITIES ===\n');
const opportunities = [
  'render-blocking-resources',
  'unused-css-rules',
  'unused-javascript',
  'modern-image-formats',
  'uses-text-compression',
  'server-response-time',
  'unminified-css',
  'unminified-javascript',
  'uses-responsive-images',
  'efficient-animated-content'
];

opportunities.forEach(id => {
  const audit = metrics[id];
  if (audit && audit.score !== null && audit.score < 1) {
    console.log(`${audit.title}:`);
    console.log(`  Score: ${Math.round(audit.score * 100)}%`);
    if (audit.displayValue) console.log(`  Potential Savings: ${audit.displayValue}`);
    if (audit.numericValue) console.log(`  Value: ${Math.round(audit.numericValue)}ms`);
    console.log('');
  }
});

console.log('\n=== IMPORTANT NOTES ===\n');
console.log('This test was run on the DEVELOPMENT server.');
console.log('Development servers are NOT optimized for performance.');
console.log('Production builds will have:');
console.log('  - Minified HTML, CSS, and JavaScript');
console.log('  - Compressed assets (Gzip/Brotli)');
console.log('  - Optimized images');
console.log('  - No hot-reload overhead');
console.log('  - Better caching headers');
console.log('\nRun "npm run build" then "npm run preview" for accurate production metrics.');
