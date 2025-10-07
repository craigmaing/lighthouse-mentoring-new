const fs = require('fs');
const path = require('path');

const INSIGHTS_DIR = path.join(__dirname, 'src', 'content', 'insights');

console.log('📊 Blog Post Optimization Audit\n');
console.log('='.repeat(80));

const files = fs.readdirSync(INSIGHTS_DIR).filter(f => f.endsWith('.md'));

const results = [];

files.forEach(file => {
  const filepath = path.join(INSIGHTS_DIR, file);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Extract frontmatter fields
  const titleMatch = frontmatter.match(/title:\s*"([^"]*)"/);
  const imageMatch = frontmatter.match(/image:\s*"([^"]*)"/);
  const categoryMatch = frontmatter.match(/category:\s*"([^"]*)"/);
  const schemaMatch = frontmatter.match(/schema:\s*"([^"]*)"/);

  // Check H1
  const h1Match = body.match(/^#\s+(.+)/m);

  // Count links
  const internalLinks = (body.match(/\[([^\]]+)\]\((\/[^)]+)\)/g) || []).length;
  const externalLinks = (body.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g) || []).length;

  // Word count (rough)
  const wordCount = body.split(/\s+/).length;

  // Issues
  const issues = [];
  const warnings = [];

  if (!h1Match) issues.push('❌ Missing H1 heading');
  if (!imageMatch) issues.push('❌ Missing image in frontmatter');
  if (!categoryMatch) warnings.push('⚠️  Missing category');
  if (!schemaMatch) warnings.push('⚠️  Missing schema');
  if (internalLinks < 2) warnings.push(`⚠️  Only ${internalLinks} internal link(s) - needs at least 2`);
  if (externalLinks < 1) warnings.push(`⚠️  No external links - needs at least 1`);
  if (wordCount < 1000) warnings.push(`⚠️  Only ${wordCount} words - aim for 1500+`);

  results.push({
    file,
    title: titleMatch ? titleMatch[1] : 'NO TITLE',
    hasImage: !!imageMatch,
    hasH1: !!h1Match,
    internalLinks,
    externalLinks,
    wordCount,
    issues,
    warnings,
    status: issues.length === 0 ? (warnings.length === 0 ? '✅' : '⚠️ ') : '❌'
  });
});

// Summary
const totalPosts = results.length;
const perfectPosts = results.filter(r => r.status === '✅').length;
const needsWork = results.filter(r => r.status === '❌').length;
const needsMinorWork = results.filter(r => r.status === '⚠️ ').length;

console.log(`\n📈 Summary:`);
console.log(`   Total posts: ${totalPosts}`);
console.log(`   ✅ Perfect: ${perfectPosts}`);
console.log(`   ⚠️  Needs minor work: ${needsMinorWork}`);
console.log(`   ❌ Needs major work: ${needsWork}`);
console.log('');

// Detailed results
results.forEach((r, i) => {
  console.log(`\n${r.status} ${i + 1}. ${r.title}`);
  console.log(`   File: ${r.file}`);
  console.log(`   Word count: ${r.wordCount}`);
  console.log(`   Links: ${r.internalLinks} internal, ${r.externalLinks} external`);

  if (r.issues.length > 0) {
    console.log(`   Issues:`);
    r.issues.forEach(issue => console.log(`      ${issue}`));
  }

  if (r.warnings.length > 0) {
    console.log(`   Warnings:`);
    r.warnings.forEach(warning => console.log(`      ${warning}`));
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n💡 Recommendations:\n');

const needsWorkPosts = results.filter(r => r.status === '❌');
if (needsWorkPosts.length > 0) {
  console.log('Priority fixes (critical issues):');
  needsWorkPosts.forEach(r => {
    console.log(`   • ${r.file}`);
    r.issues.forEach(issue => console.log(`     ${issue}`));
  });
  console.log('');
}

const needsMinorWorkPosts = results.filter(r => r.status === '⚠️ ');
if (needsMinorWorkPosts.length > 0) {
  console.log('Minor improvements:');
  needsMinorWorkPosts.forEach(r => {
    console.log(`   • ${r.file}`);
    r.warnings.forEach(warning => console.log(`     ${warning}`));
  });
}

console.log('');
