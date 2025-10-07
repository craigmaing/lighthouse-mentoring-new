const fs = require('fs');
const path = require('path');

const INSIGHTS_DIR = path.join(__dirname, 'src', 'content', 'insights');

console.log('📅 Updating blog post publication dates...\n');

// Define unique dates for each post (spread across September-October 2025)
const dateMap = {
  'board-advisor-vs-non-executive-director.md': '2025-09-15',
  'board-performance-what-makes-effective-boards.md': '2025-09-18',
  'business-case-workplace-wellbeing.md': '2025-09-20',
  'executive-coaching-new-ceos-first-100-days.md': '2025-09-22',
  'executive-coaching-vs-leadership-coaching.md': '2025-09-25',
  'executive-coaching-vs-mentoring.md': '2025-09-27',
  'executive-presence-what-it-is-how-to-develop.md': '2025-09-28',
  'how-to-become-non-executive-director.md': '2025-09-30',
  'how-to-choose-an-executive-coach-complete-guide.md': '2025-10-01',
  'how-to-choose-executive-coach.md': '2025-10-03',
  'leadership-coaching-founders-vs-corporate-executives.md': '2025-10-05',
  'mental-health-governance-board-responsibilities.md': '2025-10-08',
  'wellbeing-governance-strategic-board-approach.md': '2025-10-10',
  'when-organization-needs-wellbeing-audit.md': '2025-10-12'
};

let updatedCount = 0;

Object.entries(dateMap).forEach(([filename, newDate]) => {
  const filepath = path.join(INSIGHTS_DIR, filename);

  if (!fs.existsSync(filepath)) {
    console.log(`   ⚠️  ${filename} - File not found, skipping`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf-8');

  // Split frontmatter and body
  const parts = content.split(/^---$/m);
  if (parts.length < 3) {
    console.log(`   ⚠️  ${filename} - Invalid frontmatter structure, skipping`);
    return;
  }

  let frontmatter = parts[1];
  let body = parts.slice(2).join('---');

  // Find and capture the old date
  const oldDateMatch = frontmatter.match(/pubDate:\s*(.+)/);
  const oldDate = oldDateMatch ? oldDateMatch[1].trim() : 'not found';

  // Replace the pubDate
  frontmatter = frontmatter.replace(/pubDate:\s*.+/, `pubDate: ${newDate}`);

  // Reconstruct content
  const newContent = `---${frontmatter}---${body}`;

  // Write back
  fs.writeFileSync(filepath, newContent, 'utf-8');

  console.log(`   ✅ ${filename}`);
  console.log(`      ${oldDate} → ${newDate}`);
  updatedCount++;
});

console.log(`\n✅ Updated ${updatedCount} blog posts with unique publication dates!\n`);
