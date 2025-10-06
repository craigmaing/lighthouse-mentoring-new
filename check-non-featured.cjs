const testimonials = require('./testimonials-data.json');

const notFeatured = testimonials.filter(x => !x.featured);

console.log('\n═══════════════════════════════════════════════════════');
console.log('         NON-FEATURED TESTIMONIALS                     ');
console.log('═══════════════════════════════════════════════════════\n');

notFeatured.forEach((person, i) => {
  const company = person.company || 'No company listed';
  let notable = '';

  if (company.includes('AECOM')) {
    notable = ' 🌍 GLOBAL ENGINEERING FIRM';
  } else if (person.role.includes('CTO') || person.role.includes('Founder') || person.role.includes('Director')) {
    notable = ' 💼 Senior/Leadership Role';
  }

  console.log(`${i+1}. ${person.name}${notable}`);
  console.log(`   Role: ${person.role}`);
  console.log(`   Company: ${company}`);
  console.log(`   Categories: ${person.category.join(', ')}`);
  console.log(`   Excerpt: "${person.excerpt.substring(0, 90)}..."`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════\n');
console.log('💡 RECOMMENDATIONS:\n');
console.log('1. Sabina Ôn-Stothard (AECOM) - Global engineering firm');
console.log('2. David McGuire - B2B professional with organizational-support');
console.log('3. Mark Ripley - Award Winning CTO');
console.log('4. Terry Mullins - Founder/business owner');
console.log('\n═══════════════════════════════════════════════════════\n');
