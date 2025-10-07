const t = require('./testimonials-data.json');

const tim = t.find(x => x.name === 'Tim Etherington-Judge');

console.log('\n═══════════════════════════════════════════════════════');
console.log('Tim Etherington-Judge Status:');
console.log('Featured:', tim.featured);
console.log('Categories:', tim.category);
console.log('Date:', tim.date);

console.log('\n═══════════════════════════════════════════════════════');
console.log('Wellbeing page testimonials (in order):');
console.log('═══════════════════════════════════════════════════════\n');

const homepageNames = ['Jeremy Wrathall', 'Steve Hill', 'Richard Sharpe', 'Chris Saxby'];
const boardNames = ['Andrew Honey CDir FIoD'];

const wellbeing = t
  .filter(x => x.featured &&
    (x.category.includes('wellbeing') || x.category.includes('organizational-support')) &&
    !homepageNames.includes(x.name) &&
    !boardNames.includes(x.name))
  .sort((a,b) => new Date(b.date) - new Date(a.date));

wellbeing.forEach((p, i) => {
  const showing = i < 4 ? '✅ SHOWING' : '❌ NOT SHOWING (position > 4)';
  console.log(`${i+1}. ${p.name} (${p.date}) ${showing}`);
});

const timPosition = wellbeing.findIndex(p => p.name === 'Tim Etherington-Judge') + 1;
console.log(`\n🔍 Tim's position: ${timPosition} of ${wellbeing.length}`);
console.log('📊 Wellbeing page shows: Top 4 only');
console.log(`\n${timPosition <= 4 ? '✅ Tim IS showing on Wellbeing page' : '❌ Tim is NOT showing on Wellbeing page'}`);
console.log('\n═══════════════════════════════════════════════════════\n');
