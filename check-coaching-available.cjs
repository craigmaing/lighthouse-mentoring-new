const t = require('./testimonials-data.json');

const wellbeingPageNames = ['Terry Mullins', 'Michael Redgewell', 'David McGuire', 'Nidal Ramini'];

const coaching = t.filter(x =>
  x.featured &&
  (x.category.includes('executive-coaching') || x.category.includes('coaching')) &&
  !wellbeingPageNames.includes(x.name)
);

console.log('\n═══════════════════════════════════════════════════════');
console.log('Available EXECUTIVE COACHING testimonials:');
console.log('═══════════════════════════════════════════════════════\n');

coaching.forEach((p, i) => {
  console.log(`${i+1}. ${p.name}`);
  console.log(`   Role: ${p.role}`);
  console.log(`   Company: ${p.company || 'N/A'}`);
  console.log(`   Categories: ${p.category.join(', ')}`);
  console.log('');
});

console.log(`Total available: ${coaching.length}`);
console.log('Executive Coaching page should show: Top 4');
console.log('\n═══════════════════════════════════════════════════════\n');
