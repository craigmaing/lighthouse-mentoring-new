const testimonials = require('./testimonials-data.json');

console.log('\n═══════════════════════════════════════════════════════');
console.log(`     ALL ${testimonials.length} TESTIMONIALS ANALYZED`);
console.log('═══════════════════════════════════════════════════════\n');

// Currently used on pages
const usedOnPages = [
  'Jeremy Wrathall', 'Steve Hill', 'Richard Sharpe', 'Chris Saxby', // Homepage
  'Des Bell', 'Andrew Honey CDir FIoD', // Board Advisory
  'Terry Mullins', 'Michael Redgewell', 'David McGuire', 'Nidal Ramini', // Wellbeing
  'Phil Tottman', 'Dianne Georgina Knight CertPFS' // Executive Coaching
];

const available = testimonials.filter(t => !usedOnPages.includes(t.name));

console.log(`✅ Currently used on pages: ${usedOnPages.length}`);
console.log(`🔍 Available testimonials: ${available.length}\n`);

console.log('═══════════════════════════════════════════════════════');
console.log('AVAILABLE TESTIMONIALS - SORTED BY BEST FOR ABOUT PAGE');
console.log('═══════════════════════════════════════════════════════\n');

// Analyze for character keywords
const characterKeywords = ['kind', 'warm', 'genuine', 'caring', 'empathy', 'compassion', 'integrity', 'friend', 'compassionate', 'human being', 'trust', 'professional credentials', 'personal experience'];

available.forEach((p, i) => {
  const contentLower = p.content.toLowerCase();
  const matchedKeywords = characterKeywords.filter(keyword => contentLower.includes(keyword));
  const hasCharacterFocus = matchedKeywords.length > 0;

  const isProfessional = p.role.includes('Director') ||
                        p.role.includes('Manager') ||
                        p.role.includes('Founder') ||
                        p.role.includes('CTO') ||
                        p.role.includes('Consultant') ||
                        p.company;

  const score = (hasCharacterFocus ? 10 : 0) + (isProfessional ? 5 : 0) + (p.company ? 3 : 0);

  if (score > 5) {
    console.log(`${i + 1}. ${p.name} [Score: ${score}]`);
    console.log(`   Role: ${p.role}`);
    console.log(`   Company: ${p.company || 'N/A'}`);
    console.log(`   Character keywords: ${matchedKeywords.join(', ') || 'none'}`);
    console.log(`   Excerpt: "${p.excerpt.substring(0, 120)}..."`);
    console.log('');
  }
});

console.log('═══════════════════════════════════════════════════════');
console.log('TOP 5 RECOMMENDATIONS FOR ABOUT PAGE:');
console.log('═══════════════════════════════════════════════════════\n');

const scored = available.map(p => {
  const contentLower = p.content.toLowerCase();
  const matchedKeywords = characterKeywords.filter(keyword => contentLower.includes(keyword));
  const hasCharacterFocus = matchedKeywords.length > 0;

  const isProfessional = p.role.includes('Director') ||
                        p.role.includes('Manager') ||
                        p.role.includes('Founder') ||
                        p.role.includes('CTO') ||
                        p.role.includes('Consultant') ||
                        p.company;

  const score = (hasCharacterFocus ? 10 : 0) + (isProfessional ? 5 : 0) + (p.company ? 3 : 0);

  return { ...p, score, keywords: matchedKeywords };
}).sort((a, b) => b.score - a.score);

scored.slice(0, 5).forEach((p, i) => {
  console.log(`${i + 1}. ${p.name} [Score: ${p.score}]`);
  console.log(`   ${p.role}${p.company ? `, ${p.company}` : ''}`);
  console.log(`   Keywords: ${p.keywords.join(', ')}`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════\n');
