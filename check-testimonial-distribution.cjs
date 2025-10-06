const testimonials = require('./testimonials-data.json');

// Homepage filter
const homepageNames = ['Jeremy Wrathall', 'Steve Hill', 'Richard Sharpe', 'Chris Saxby'];
const homepage = testimonials
  .filter(t => t.featured && (t.category.includes('c-suite') || t.category.includes('iod-leadership') || t.category.includes('board-advisory')))
  .slice(0, 4);

// Board Advisory filter
const board = testimonials
  .filter(t => t.featured &&
    (t.category.includes('board-advisory') || t.category.includes('iod-leadership')) &&
    !homepageNames.includes(t.name))
  .slice(0, 2);

// Wellbeing filter (exclude homepage and board advisory testimonials)
const boardNames = ['Andrew Honey CDir FIoD'];
const wellbeing = testimonials
  .filter(t => t.featured &&
    (t.category.includes('wellbeing') || t.category.includes('organizational-support')) &&
    !homepageNames.includes(t.name) &&
    !boardNames.includes(t.name))
  .slice(0, 4);

// Executive Coaching filter
const coaching = testimonials
  .filter(t => t.featured && (t.category.includes('executive-coaching') || t.category.includes('coaching')))
  .slice(0, 4);

console.log('\n═══════════════════════════════════════════════════════');
console.log('         TESTIMONIAL DISTRIBUTION ACROSS SITE          ');
console.log('═══════════════════════════════════════════════════════\n');

console.log('🏠 HOMEPAGE (4 testimonials):');
homepage.forEach((t, i) => {
  console.log(`  ${i+1}. ${t.name} - ${t.company || t.role}`);
});

console.log(`\n📊 BOARD ADVISORY PAGE (${board.length} testimonials):`);
board.forEach((t, i) => {
  console.log(`  ${i+1}. ${t.name} - ${t.company || t.role}`);
});

console.log(`\n💚 ORGANIZATIONAL WELLBEING PAGE (${wellbeing.length} testimonials):`);
wellbeing.forEach((t, i) => {
  const globalBrand = t.company && (t.company.includes('Edrington') || t.company.includes('Brown-Forman') || t.company.includes('Healthy Hospo')) ? ' 🌍 GLOBAL BRAND' : '';
  console.log(`  ${i+1}. ${t.name} - ${t.company || t.role}${globalBrand}`);
});

console.log(`\n👔 EXECUTIVE COACHING PAGE (${coaching.length} testimonials):`);
coaching.forEach((t, i) => {
  console.log(`  ${i+1}. ${t.name} - ${t.company || t.role}`);
});

console.log('\n═══════════════════════════════════════════════════════\n');
console.log('✅ All featured testimonials with global brands:');
const globalFeatured = testimonials.filter(t =>
  t.featured && t.company &&
  (t.company.includes('Edrington') || t.company.includes('Brown-Forman') || t.company.includes('Healthy Hospo'))
);
globalFeatured.forEach(t => {
  console.log(`  • ${t.name} - ${t.company} (${t.category.join(', ')})`);
});
console.log('\n═══════════════════════════════════════════════════════\n');
