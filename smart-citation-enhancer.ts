#!/usr/bin/env tsx
/**
 * Smart Citation Enhancer
 *
 * Analyzes blog posts and suggests high-authority sources to add
 * Uses the user's existing inline citations + suggests additional ones
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface PostNeed {
  slug: string;
  filePath: string;
  title: string;
  category: string;
  currentCitations: number;
  needed: number;
  suggestedSearches: string[];
}

/**
 * Known high-authority domains for each topic area
 */
const AUTHORITATIVE_SOURCES = {
  wellbeing: [
    { domain: 'cipd.org', name: 'CIPD', searchTerms: ['workplace wellbeing', 'employee health', 'absence management'] },
    { domain: 'deloitte.com', name: 'Deloitte', searchTerms: ['mental health costs', 'wellbeing ROI', 'employee productivity'] },
    { domain: 'hse.gov.uk', name: 'Health & Safety Executive', searchTerms: ['workplace stress', 'health safety work'] },
    { domain: 'acas.org.uk', name: 'Acas', searchTerms: ['mental health workplace', 'employee wellbeing'] },
    { domain: 'gov.uk', name: 'HM Government', searchTerms: ['worker wellbeing', 'workplace health'] },
    { domain: 'rsph.org.uk', name: 'Royal Society for Public Health', searchTerms: ['public health workplace', 'wellbeing research'] },
    { domain: 'bitc.org.uk', name: 'Business in the Community', searchTerms: ['wellbeing investment', 'employee health ROI'] }
  ],
  'executive-coaching': [
    { domain: 'cipd.org', name: 'CIPD', searchTerms: ['coaching effectiveness', 'leadership development'] },
    { domain: 'emccglobal.org', name: 'EMCC', searchTerms: ['coaching standards', 'professional coaching'] },
    { domain: 'hbr.org', name: 'Harvard Business Review', searchTerms: ['executive coaching', 'leadership coaching'] },
    { domain: 'gallup.com', name: 'Gallup', searchTerms: ['coaching workplace', 'employee engagement'] },
    { domain: 'mckinsey.com', name: 'McKinsey', searchTerms: ['executive development', 'leadership coaching'] }
  ],
  board: [
    { domain: 'iod.com', name: 'Institute of Directors', searchTerms: ['board effectiveness', 'non-executive director'] },
    { domain: 'cipd.org', name: 'CIPD', searchTerms: ['board governance', 'board performance'] },
    { domain: 'hbr.org', name: 'Harvard Business Review', searchTerms: ['corporate governance', 'board effectiveness'] },
    { domain: 'gov.uk', name: 'HM Government', searchTerms: ['corporate governance code', 'board responsibilities'] }
  ]
};

/**
 * Analyze all posts and identify citation needs
 */
function analyzeAllPosts(): PostNeed[] {
  const postsDir = join(process.cwd(), 'src', 'content', 'insights');
  const files = readdirSync(postsDir).filter(file => file.endsWith('.md'));

  const needs: PostNeed[] = [];

  for (const file of files) {
    const filePath = join(postsDir, file);
    const slug = file.replace('.md', '');
    const content = readFileSync(filePath, 'utf-8');

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';

    const title = frontmatter.match(/title:\s*["'](.+?)["']/)?.[1] || '';
    const category = frontmatter.match(/category:\s*["'](.+?)["']/)?.[1] || '';

    // Count current citations
    const referencesMatch = content.match(/## References\n\n([\s\S]*?)$/);
    const currentCitations = referencesMatch
      ? (referencesMatch[1].match(/^- /gm) || []).length
      : 0;

    const needed = Math.max(6 - currentCitations, 0);

    if (needed > 0) {
      needs.push({
        slug,
        filePath,
        title,
        category,
        currentCitations,
        needed,
        suggestedSearches: generateSearchTerms(title, category)
      });
    }
  }

  return needs;
}

/**
 * Generate specific search terms for finding citations
 */
function generateSearchTerms(title: string, category: string): string[] {
  const terms: string[] = [];

  // Get category-specific sources
  if (category.includes('wellbeing')) {
    terms.push(
      'workplace wellbeing statistics UK',
      'employee mental health costs',
      'wellbeing ROI research'
    );
  } else if (category.includes('coaching')) {
    terms.push(
      'executive coaching ROI statistics',
      'coaching effectiveness research',
      'leadership development data'
    );
  } else if (title.includes('board') || title.includes('NED') || title.includes('director')) {
    terms.push(
      'board effectiveness research',
      'non-executive director UK statistics',
      'corporate governance data'
    );
  }

  return terms.slice(0, 3);
}

/**
 * Get suggested sources for a category
 */
function getSuggestedSources(category: string, title: string) {
  if (category.includes('wellbeing')) return AUTHORITATIVE_SOURCES.wellbeing;
  if (category.includes('coaching')) return AUTHORITATIVE_SOURCES['executive-coaching'];
  if (title.includes('board') || title.includes('NED') || title.includes('director')) {
    return AUTHORITATIVE_SOURCES.board;
  }
  return [];
}

async function main() {
  console.log('📊 Smart Citation Enhancer\n');
  console.log('Analyzing all blog posts for citation needs...\n');

  const needs = analyzeAllPosts();

  console.log(`Found ${needs.length} posts needing additional citations\n`);
  console.log('═══════════════════════════════════════════════════════════\n');

  for (const post of needs) {
    console.log(`📄 ${post.slug}`);
    console.log(`   Title: ${post.title.substring(0, 60)}...`);
    console.log(`   Current: ${post.currentCitations} citations`);
    console.log(`   Needed: ${post.needed} more for 85%+ score`);
    console.log(`   Category: ${post.category}`);
    console.log('');

    const suggestedSources = getSuggestedSources(post.category, post.title);
    if (suggestedSources.length > 0) {
      console.log('   💡 Suggested authoritative sources to search:');
      suggestedSources.slice(0, post.needed).forEach(source => {
        console.log(`      • ${source.name} (${source.domain})`);
        console.log(`        Search for: "${source.searchTerms[0]}"`);
      });
    }

    console.log('');
    console.log('   🔍 Recommended search queries:');
    post.suggestedSearches.forEach(query => {
      console.log(`      • "${query}"`);
    });
    console.log('');
    console.log('───────────────────────────────────────────────────────────\n');
  }

  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n📋 Next Steps:');
  console.log('1. Search for each recommended source/query');
  console.log('2. Find relevant statistics or research reports');
  console.log('3. Add citations to References section in Harvard format');
  console.log('4. Re-run test-all-posts.ts to verify 85%+ scores\n');
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
