const testimonials = require('./testimonials-data.json');

console.log('\n═══════════════════════════════════════════════════════');
console.log('     COMPLETE TESTIMONIAL DISTRIBUTION REPORT          ');
console.log('═══════════════════════════════════════════════════════\n');

// Homepage filter
const homepageNames = ['Jeremy Wrathall', 'Steve Hill', 'Richard Sharpe', 'Chris Saxby'];
const homepage = testimonials
  .filter(t => t.featured && (t.category.includes('c-suite') || t.category.includes('iod-leadership') || t.category.includes('board-advisory')))
  .slice(0, 4);

// Board Advisory filter
const boardNames = ['Andrew Honey CDir FIoD'];
const board = testimonials
  .filter(t => t.featured &&
    (t.category.includes('board-advisory') || t.category.includes('iod-leadership')) &&
    !homepageNames.includes(t.name))
  .slice(0, 2);

// Wellbeing filter
const wellbeing = testimonials
  .filter(t => t.featured &&
    (t.category.includes('wellbeing') || t.category.includes('organizational-support')) &&
    !homepageNames.includes(t.name) &&
    !boardNames.includes(t.name))
  .slice(0, 4);

// Executive Coaching filter (exclude wellbeing page testimonials)
const wellbeingPageNames = ['Terry Mullins', 'Michael Redgewell', 'David McGuire', 'Nidal Ramini'];
const coaching = testimonials
  .filter(t => t.featured &&
    (t.category.includes('executive-coaching') || t.category.includes('coaching')) &&
    !wellbeingPageNames.includes(t.name))
  .slice(0, 4);

// About page - manually specified
const about = [
  'Tim Etherington-Judge',
  'Sabina Ôn-Stothard PIEMA',
  'Mark Kendall'
];

console.log('🏠 HOMEPAGE (4 testimonials):');
console.log('─────────────────────────────────────────────────────');
homepage.forEach((t, i) => {
  console.log(`${i+1}. ${t.name}`);
  console.log(`   ${t.role}${t.company ? `, ${t.company}` : ''}`);
});

console.log('\n📊 BOARD ADVISORY PAGE (2 testimonials):');
console.log('─────────────────────────────────────────────────────');
board.forEach((t, i) => {
  console.log(`${i+1}. ${t.name}`);
  console.log(`   ${t.role}${t.company ? `, ${t.company}` : ''}`);
});

console.log('\n💚 ORGANIZATIONAL WELLBEING PAGE (4 testimonials):');
console.log('─────────────────────────────────────────────────────');
wellbeing.forEach((t, i) => {
  const globalBrand = t.company && (t.company.includes('Edrington') || t.company.includes('Brown-Forman') || t.company.includes('Healthy Hospo')) ? ' 🌍' : '';
  console.log(`${i+1}. ${t.name}${globalBrand}`);
  console.log(`   ${t.role}${t.company ? `, ${t.company}` : ''}`);
});

console.log('\n👔 EXECUTIVE COACHING PAGE (4 testimonials):');
console.log('─────────────────────────────────────────────────────');
coaching.forEach((t, i) => {
  console.log(`${i+1}. ${t.name}`);
  console.log(`   ${t.role}${t.company ? `, ${t.company}` : ''}`);
});

console.log('\n👤 ABOUT PAGE (3 testimonials):');
console.log('─────────────────────────────────────────────────────');
about.forEach((name, i) => {
  const t = testimonials.find(x => x.name === name);
  if (t) {
    console.log(`${i+1}. ${t.name}`);
    console.log(`   ${t.role}${t.company ? `, ${t.company}` : ''}`);
  }
});

console.log('\n═══════════════════════════════════════════════════════');
console.log('SUMMARY:');
console.log('═══════════════════════════════════════════════════════');

// Collect all used testimonials
const allUsed = new Set([
  ...homepage.map(t => t.name),
  ...board.map(t => t.name),
  ...wellbeing.map(t => t.name),
  ...coaching.map(t => t.name),
  ...about
]);

console.log(`\n✅ Total testimonials used: ${allUsed.size}`);
console.log(`📦 Total testimonials in database: ${testimonials.length}`);
console.log(`🔍 Unused testimonials: ${testimonials.length - allUsed.size}`);

// Check for duplicates
console.log('\n🔍 CHECKING FOR DUPLICATES ACROSS PAGES...');
const pages = {
  'Homepage': homepage.map(t => t.name),
  'Board Advisory': board.map(t => t.name),
  'Wellbeing': wellbeing.map(t => t.name),
  'Executive Coaching': coaching.map(t => t.name),
  'About': about
};

let duplicatesFound = false;
const allNames = [];
Object.entries(pages).forEach(([pageName, names]) => {
  names.forEach(name => {
    const previousOccurrence = allNames.find(item => item.name === name);
    if (previousOccurrence) {
      console.log(`⚠️  DUPLICATE: ${name} appears on both ${previousOccurrence.page} AND ${pageName}`);
      duplicatesFound = true;
    }
    allNames.push({ name, page: pageName });
  });
});

if (!duplicatesFound) {
  console.log('✅ No duplicates found - all testimonials are unique to their pages!');
}

console.log('\n═══════════════════════════════════════════════════════\n');
