const fs = require('fs');
const path = require('path');

const INSIGHTS_DIR = path.join(__dirname, 'src', 'content', 'insights');

console.log('🔧 Removing duplicate H1 headings from blog posts...\n');

const files = fs.readdirSync(INSIGHTS_DIR).filter(f => f.endsWith('.md'));

let fixedCount = 0;

files.forEach(file => {
  const filepath = path.join(INSIGHTS_DIR, file);
  let content = fs.readFileSync(filepath, 'utf-8');

  // Split frontmatter and body
  const parts = content.split(/^---$/m);
  if (parts.length < 3) {
    console.log(`   ⚠️  ${file} - Invalid frontmatter structure, skipping`);
    return;
  }

  let frontmatter = parts[1];
  let body = parts.slice(2).join('---').trim();

  // Check if body starts with H1
  const h1Match = body.match(/^#\s+(.+?)(\n|$)/);

  if (h1Match) {
    // Remove the H1 (first line of body)
    body = body.replace(/^#\s+.+?(\n|$)/, '').trim();

    // Reconstruct content
    const newContent = `---${frontmatter}---\n\n${body}`;

    // Write back
    fs.writeFileSync(filepath, newContent, 'utf-8');

    console.log(`   ✅ Fixed: ${file}`);
    console.log(`      - Removed duplicate H1: ${h1Match[1]}`);
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} blog posts!`);
console.log('\n💡 The template already provides the H1 heading, so markdown files should not have one.\n');
