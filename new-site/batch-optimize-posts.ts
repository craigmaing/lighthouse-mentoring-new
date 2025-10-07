#!/usr/bin/env tsx
/**
 * Batch Optimize All Blog Posts
 *
 * Adds References sections to all blog posts that don't have them
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface Citation {
  text: string;
  url: string;
  source?: string;
}

// Authoritative sources to recognize
const AUTHORITATIVE_DOMAINS = [
  'deloitte.com',
  'cipd.org',
  'gov.uk',
  'greatplacetowork.co.uk',
  'bitc.org.uk',
  'iod.com',
  'harvard.edu',
  'hbr.org',
  'gallup.com',
  'mckinsey.com',
  'who.int',
  'ilo.org',
  'oecd.org',
  'shrm.org',
  'forbes.com',
  'ft.com',
  'economist.com',
  'guardian.co.uk',
  'bbc.co.uk',
  'britsafe.org',
  'whatworkswellbeing.org',
  'emccglobal.org',
  'rsph.org.uk',
  'acas.org.uk',
  'hse.gov.uk',
  'legislation.gov.uk',
  'healthatworkcentre.org.uk'
];

function extractCitations(content: string): Citation[] {
  const citations: Citation[] = [];

  // Pattern: [text](url)
  const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = markdownLinkPattern.exec(content)) !== null) {
    const text = match[1];
    const url = match[2];

    // Skip internal links
    if (url.startsWith('/') || url.startsWith('#')) {
      continue;
    }

    // Check if it's an authoritative source
    const isAuthoritative = AUTHORITATIVE_DOMAINS.some(domain => url.includes(domain));

    if (isAuthoritative) {
      citations.push({ text, url, source: extractSourceName(url, text) });
    }
  }

  return deduplicateCitations(citations);
}

function extractSourceName(url: string, text: string): string {
  // Try to extract organization name from URL or link text
  if (url.includes('deloitte.com')) return 'Deloitte';
  if (url.includes('cipd.org')) return 'CIPD';
  if (url.includes('gov.uk')) return 'HM Government';
  if (url.includes('greatplacetowork')) return 'Great Place to Work UK';
  if (url.includes('bitc.org')) return 'Business in the Community';
  if (url.includes('iod.com')) return 'Institute of Directors';
  if (url.includes('harvard.edu') || url.includes('hbr.org')) return 'Harvard Business Review';
  if (url.includes('gallup.com')) return 'Gallup';
  if (url.includes('mckinsey.com')) return 'McKinsey & Company';
  if (url.includes('who.int')) return 'World Health Organization';
  if (url.includes('ilo.org')) return 'International Labour Organization';
  if (url.includes('oecd.org')) return 'OECD';
  if (url.includes('shrm.org')) return 'SHRM';
  if (url.includes('forbes.com')) return 'Forbes';
  if (url.includes('ft.com')) return 'Financial Times';
  if (url.includes('economist.com')) return 'The Economist';
  if (url.includes('guardian.co.uk')) return 'The Guardian';
  if (url.includes('bbc.co.uk')) return 'BBC';

  // Fallback to link text
  return text;
}

function deduplicateCitations(citations: Citation[]): Citation[] {
  const unique = new Map<string, Citation>();

  for (const citation of citations) {
    if (!unique.has(citation.url)) {
      unique.set(citation.url, citation);
    }
  }

  return Array.from(unique.values());
}

function generateReferencesSection(citations: Citation[]): string {
  if (citations.length === 0) {
    return '';
  }

  // Sort alphabetically by source name
  const sorted = citations.sort((a, b) =>
    (a.source || a.text).localeCompare(b.source || b.text)
  );

  const references = sorted.map(citation => {
    const source = citation.source || citation.text;
    const title = citation.text.replace(/['"]s?\s+research|['"]s?\s+report|['"]s?\s+data/gi, '').trim();

    return `- ${source} (2024). *${title}*. Available at: ${citation.url}`;
  });

  return `\n## References\n\n${references.join('\n\n')}\n`;
}

function hasReferencesSection(content: string): boolean {
  return /##\s+References/i.test(content);
}

function processPost(filePath: string): { updated: boolean; citationCount: number; filename: string } {
  const filename = filePath.split('/').pop() || filePath;
  const content = readFileSync(filePath, 'utf-8');

  // Check if already has References section
  if (hasReferencesSection(content)) {
    console.log(`  ⏭️  ${filename} - Already has References section`);
    return { updated: false, citationCount: 0, filename };
  }

  // Extract citations
  const citations = extractCitations(content);

  if (citations.length === 0) {
    console.log(`  ⚠️  ${filename} - No authoritative citations found`);
    return { updated: false, citationCount: 0, filename };
  }

  // Generate References section
  const referencesSection = generateReferencesSection(citations);

  // Add References section at the end
  const updatedContent = content + referencesSection;

  // Write back to file
  writeFileSync(filePath, updatedContent, 'utf-8');

  console.log(`  ✅ ${filename} - Added ${citations.length} references`);
  return { updated: true, citationCount: citations.length, filename };
}

async function main() {
  console.log('📚 Batch Optimizing Blog Posts\n');

  const postsDir = join(process.cwd(), 'src', 'content', 'insights');
  const files = readdirSync(postsDir).filter(file => file.endsWith('.md'));

  console.log(`Found ${files.length} blog posts\n`);

  const results = {
    total: files.length,
    updated: 0,
    skipped: 0,
    noCitations: 0,
    totalCitations: 0
  };

  for (const file of files) {
    const filePath = join(postsDir, file);
    const result = processPost(filePath);

    if (result.updated) {
      results.updated++;
      results.totalCitations += result.citationCount;
    } else if (hasReferencesSection(readFileSync(filePath, 'utf-8'))) {
      results.skipped++;
    } else {
      results.noCitations++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`  Total posts: ${results.total}`);
  console.log(`  ✅ Updated: ${results.updated}`);
  console.log(`  ⏭️  Already had references: ${results.skipped}`);
  console.log(`  ⚠️  No citations found: ${results.noCitations}`);
  console.log(`  📚 Total citations added: ${results.totalCitations}`);
  console.log('');
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
