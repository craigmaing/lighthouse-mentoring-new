#!/usr/bin/env tsx
/**
 * Intelligent Citation Finder
 *
 * Uses web search + DataForSEO domain authority validation to find
 * and add high-quality authoritative citations to blog posts
 */

import { readFileSync, writeFileSync } from 'fs';

interface Citation {
  source: string;
  title: string;
  url: string;
  domainAuthority?: number;
  relevance: string;
}

interface PostAnalysis {
  slug: string;
  topic: string;
  currentCitations: number;
  targetCitations: number;
  searchQueries: string[];
}

/**
 * Analyze a blog post to determine citation needs
 */
function analyzePost(filePath: string, slug: string): PostAnalysis {
  const content = readFileSync(filePath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';

  // Get title and category
  const title = frontmatter.match(/title:\s*["'](.+?)["']/)?.[1] || '';
  const category = frontmatter.match(/category:\s*["'](.+?)["']/)?.[1] || '';

  // Count current citations in References section
  const referencesMatch = content.match(/## References\n\n([\s\S]*?)$/);
  const currentCitations = referencesMatch
    ? (referencesMatch[1].match(/^- /gm) || []).length
    : 0;

  // Calculate target (need 6 for 85% Evidence score)
  const targetCitations = Math.max(6 - currentCitations, 0);

  // Generate search queries based on topic
  const searchQueries = generateSearchQueries(title, category);

  return {
    slug,
    topic: title,
    currentCitations,
    targetCitations,
    searchQueries
  };
}

/**
 * Generate targeted search queries for finding authoritative sources
 */
function generateSearchQueries(title: string, category: string): string[] {
  const queries: string[] = [];

  // Category-specific queries
  if (category.includes('wellbeing')) {
    queries.push(
      'workplace wellbeing statistics UK',
      'employee wellbeing ROI research',
      'mental health workplace costs',
      'wellbeing governance framework'
    );
  }

  if (category.includes('executive-coaching') || title.includes('coaching')) {
    queries.push(
      'executive coaching ROI research',
      'coaching effectiveness statistics',
      'leadership development research',
      'coaching outcomes data'
    );
  }

  if (title.includes('board') || title.includes('NED') || title.includes('director')) {
    queries.push(
      'board effectiveness research',
      'non-executive director statistics UK',
      'corporate governance research',
      'board performance data'
    );
  }

  // General quality sources
  queries.push(
    `${title} research statistics`,
    `${title} UK data`,
    `${category} evidence based`
  );

  return queries.slice(0, 3); // Limit to 3 searches per post
}

/**
 * Main function to find and add citations to a post
 */
async function findAndAddCitations(filePath: string, slug: string) {
  console.log(`\n🔍 Analyzing: ${slug}`);

  const analysis = analyzePost(filePath, slug);

  console.log(`  Current citations: ${analysis.currentCitations}`);
  console.log(`  Target: ${analysis.targetCitations} more needed`);

  if (analysis.targetCitations === 0) {
    console.log(`  ✅ Already has enough citations`);
    return;
  }

  console.log(`  Search queries prepared: ${analysis.searchQueries.length}`);

  // This is a template - actual search and validation will be done via MCP
  console.log(`  📋 Ready to search for authoritative sources`);
  console.log(`  Topics: ${analysis.searchQueries.join(', ')}`);
}

/**
 * Validate domain authority using DataForSEO
 */
async function validateDomainAuthority(domain: string): Promise<number> {
  console.log(`    🔍 Validating: ${domain}`);

  try {
    // Use DataForSEO backlinks_bulk_ranks to get domain authority
    // The rank values range from 0 (no backlinks) to 1,000 (highest rank)
    const response = await fetch('http://localhost:3000/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'mcp__dataforseo__backlinks_bulk_ranks',
        parameters: {
          targets: [domain]
        }
      })
    });

    const data = await response.json();

    if (data?.results?.[0]?.rank) {
      const rank = data.results[0].rank;
      console.log(`    ✅ Domain rank: ${rank}/1000`);
      return rank;
    }

    console.log(`    ⚠️  No rank data available`);
    return 0;
  } catch (error) {
    console.log(`    ❌ Error validating: ${error}`);
    return 0;
  }
}

/**
 * Search for authoritative sources using web search
 */
async function searchAuthoritativeSources(query: string, minAuthority: number = 800): Promise<Citation[]> {
  console.log(`  🌐 Searching: "${query}"`);

  const citations: Citation[] = [];

  try {
    // Use BrightData search engine to find sources
    const response = await fetch('http://localhost:3000/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'mcp__brightData__search_engine',
        parameters: {
          query: query,
          engine: 'google'
        }
      })
    });

    const data = await response.json();

    // Process search results
    if (data?.results) {
      for (const result of data.results.slice(0, 5)) {
        const url = result.url || '';
        const title = result.title || '';
        const domain = new URL(url).hostname.replace('www.', '');

        // Validate domain authority
        const authority = await validateDomainAuthority(domain);

        if (authority >= minAuthority) {
          citations.push({
            source: extractSourceName(domain),
            title,
            url,
            domainAuthority: authority,
            relevance: query
          });
        }
      }
    }

    console.log(`  ✅ Found ${citations.length} high-authority sources`);
  } catch (error) {
    console.log(`  ❌ Search error: ${error}`);
  }

  return citations;
}

/**
 * Extract organization name from domain
 */
function extractSourceName(domain: string): string {
  if (domain.includes('deloitte')) return 'Deloitte';
  if (domain.includes('cipd')) return 'CIPD';
  if (domain.includes('gov.uk')) return 'HM Government';
  if (domain.includes('iod.com')) return 'Institute of Directors';
  if (domain.includes('hbr.org')) return 'Harvard Business Review';
  if (domain.includes('gallup')) return 'Gallup';
  if (domain.includes('mckinsey')) return 'McKinsey & Company';

  // Extract from domain (e.g., "example.com" -> "Example")
  const name = domain.split('.')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

async function main() {
  console.log('🎯 Intelligent Citation Finder\n');
  console.log('This tool will:');
  console.log('1. Analyze each blog post for citation needs');
  console.log('2. Search for relevant authoritative sources');
  console.log('3. Validate domain authority using DataForSEO');
  console.log('4. Add high-quality citations to boost AI trust scores');
  console.log('');

  // Test with a single post first
  const testPost = 'src/content/insights/wellbeing-governance-strategic-board-approach.md';
  await findAndAddCitations(testPost, 'wellbeing-governance-strategic-board-approach');
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
