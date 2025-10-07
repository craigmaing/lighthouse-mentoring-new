const fs = require('fs');
const path = require('path');

const INSIGHTS_DIR = path.join(__dirname, 'src', 'content', 'insights');

const filesToFix = [
  'board-advisor-vs-non-executive-director.md',
  'board-performance-what-makes-effective-boards.md',
  'business-case-workplace-wellbeing.md',
  'executive-coaching-new-ceos-first-100-days.md',
  'executive-coaching-vs-mentoring.md',
  'executive-presence-what-it-is-how-to-develop.md',
  'how-to-become-non-executive-director.md',
  'how-to-choose-executive-coach.md',
  'leadership-coaching-founders-vs-corporate-executives.md',
  'mental-health-governance-board-responsibilities.md',
  'wellbeing-governance-strategic-board-approach.md',
  'when-organization-needs-wellbeing-audit.md'
];

console.log('🔧 Fixing blog posts...\n');

filesToFix.forEach(file => {
  const filepath = path.join(INSIGHTS_DIR, file);
  let content = fs.readFileSync(filepath, 'utf-8');

  // Extract title from frontmatter
  const titleMatch = content.match(/title:\s*"([^"]*)"/);
  if (!titleMatch) {
    console.log(`   ⚠️  ${file} - No title found, skipping`);
    return;
  }

  const title = titleMatch[1];

  // Check if schema already exists
  const hasSchema = content.match(/schema:/);

  // Split frontmatter and body
  const parts = content.split(/^---$/m);
  if (parts.length < 3) {
    console.log(`   ⚠️  ${file} - Invalid frontmatter structure, skipping`);
    return;
  }

  let frontmatter = parts[1];
  let body = parts.slice(2).join('---');

  // Add schema if missing
  if (!hasSchema) {
    frontmatter = frontmatter.trimEnd() + '\nschema: "Article"\n';
  }

  // Add H1 if body doesn't start with one
  body = body.trim();
  if (!body.match(/^#\s+/m)) {
    body = `# ${title}\n\n` + body;
  }

  // Reconstruct content
  const newContent = `---${frontmatter}---\n\n${body}`;

  // Write back
  fs.writeFileSync(filepath, newContent, 'utf-8');

  console.log(`   ✅ Fixed: ${file}`);
  console.log(`      - Added H1: # ${title}`);
  if (!hasSchema) {
    console.log(`      - Added schema: "Article"`);
  }
});

console.log('\n✅ All fixes complete!');
