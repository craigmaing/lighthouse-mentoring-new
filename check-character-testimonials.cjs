const testimonials = require('./testimonials-data.json');

const notFeatured = testimonials.filter(x => !x.featured);

console.log('\n═══════════════════════════════════════════════════════');
console.log('     TESTIMONIALS ABOUT CHARACTER/APPROACH (NOT FEATURED)');
console.log('═══════════════════════════════════════════════════════\n');

const characterKeywords = ['kind', 'warm', 'genuine', 'caring', 'empathy', 'compassion', 'integrity', 'friend', 'compassionate', 'human being'];

const characterFocused = notFeatured.filter(p => {
  const contentLower = p.content.toLowerCase();
  return characterKeywords.some(keyword => contentLower.includes(keyword));
});

characterFocused.forEach((p, i) => {
  console.log(`${i + 1}. ${p.name}`);
  console.log(`   Role: ${p.role}`);
  console.log(`   Company: ${p.company || 'N/A'}`);
  console.log(`   Excerpt: "${p.excerpt}"`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════');
console.log('\n💡 BEST FOR ABOUT PAGE (Character-focused):');
console.log('1. Mark Kendall - "warm and genuine human being who wants to help"');
console.log('2. Cora Polland - "kind, hard-working, empathetic, understanding"');
console.log('3. Yana James-Mills - Long-term support, "like my best friend"');
console.log('4. Madison Watling - "best friend someone I could lean on"');
console.log('5. Sabina Ôn-Stothard - "compassion and sense of humour"');
console.log('\n═══════════════════════════════════════════════════════\n');
