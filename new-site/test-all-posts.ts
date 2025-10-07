#!/usr/bin/env tsx
/**
 * Test All Blog Posts - AI Trust Scoring
 *
 * Generates a comprehensive report of AI trust scores for all blog posts
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { AISearchOptimizer, DEFAULT_CONFIG } from './agents/ai-search-optimizer/index';
import type { BlogPost } from './agents/ai-search-optimizer/types';

function parseMarkdownPost(filePath: string, slug: string): BlogPost {
  const content = readFileSync(filePath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error(`No frontmatter found in ${slug}`);
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // Parse frontmatter fields
  const title = frontmatter.match(/title:\s*["'](.+?)["']/)?.[1] || '';
  const description = frontmatter.match(/description:\s*["'](.+?)["']/)?.[1] || '';
  const pubDate = frontmatter.match(/pubDate:\s*(.+)/)?.[1] || '';
  const author = frontmatter.match(/author:\s*["'](.+?)["']/)?.[1] || 'Craig Fearn';
  const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map(t => t.trim().replace(/["']/g, ''))
    : [];
  const category = frontmatter.match(/category:\s*["'](.+?)["']/)?.[1];
  const image = frontmatter.match(/image:\s*["'](.+?)["']/)?.[1];

  return {
    slug,
    title,
    description,
    content: body,
    date: pubDate,
    author,
    tags,
    categories: category ? [category] : [],
    heroImage: image
  };
}

async function main() {
  console.log('🔍 Testing All Blog Posts - AI Trust Scoring\n');

  const postsDir = join(process.cwd(), 'src', 'content', 'insights');
  const files = readdirSync(postsDir).filter(file => file.endsWith('.md'));

  console.log(`Found ${files.length} blog posts\n`);

  const optimizer = new AISearchOptimizer(DEFAULT_CONFIG);
  const results: any[] = [];

  for (const file of files) {
    const slug = file.replace('.md', '');
    const filePath = join(postsDir, file);

    try {
      const post = parseMarkdownPost(filePath, slug);
      const result = await optimizer.optimize(post);

      results.push({
        slug,
        title: post.title.substring(0, 60),
        score: result.aiTrustScore.overall,
        breakdown: result.aiTrustScore.breakdown,
        citations: result.citations.length
      });

      const scorePercent = (result.aiTrustScore.overall * 100).toFixed(1);
      const emoji = result.aiTrustScore.overall >= 0.85 ? '✅' :
                   result.aiTrustScore.overall >= 0.7 ? '⚠️' : '❌';

      console.log(`${emoji} ${slug.padEnd(50)} ${scorePercent}%`);
    } catch (error) {
      console.error(`❌ Error processing ${slug}:`, error);
    }
  }

  // Calculate summary stats
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const excellentCount = results.filter(r => r.score >= 0.85).length;
  const goodCount = results.filter(r => r.score >= 0.7 && r.score < 0.85).length;
  const needsWorkCount = results.filter(r => r.score < 0.7).length;

  console.log('\n📊 Summary Statistics:');
  console.log(`  Average AI Trust Score: ${(avgScore * 100).toFixed(1)}%`);
  console.log(`  ✅ Excellent (≥85%): ${excellentCount} posts`);
  console.log(`  ⚠️  Good (70-84%): ${goodCount} posts`);
  console.log(`  ❌ Needs work (<70%): ${needsWorkCount} posts`);
  console.log('');

  // Detailed breakdown
  console.log('📈 Detailed Breakdown:\n');
  console.log('Post                                                Score   Auth  Evid  Rec   Obj   Qual  Rep   Cites');
  console.log('─'.repeat(110));

  results
    .sort((a, b) => b.score - a.score)
    .forEach(r => {
      const scoreStr = `${(r.score * 100).toFixed(1)}%`.padEnd(7);
      const auth = `${(r.breakdown.authority * 100).toFixed(0)}%`.padEnd(5);
      const evid = `${(r.breakdown.evidence * 100).toFixed(0)}%`.padEnd(5);
      const rec = `${(r.breakdown.recency * 100).toFixed(0)}%`.padEnd(5);
      const obj = `${(r.breakdown.objectivity * 100).toFixed(0)}%`.padEnd(5);
      const qual = `${(r.breakdown.quality * 100).toFixed(0)}%`.padEnd(5);
      const rep = `${(r.breakdown.reputation * 100).toFixed(0)}%`.padEnd(5);
      const cites = r.citations.toString().padEnd(5);

      console.log(`${r.slug.padEnd(51)} ${scoreStr} ${auth} ${evid} ${rec} ${obj} ${qual} ${rep} ${cites}`);
    });

  console.log('');

  // Generate markdown report
  const reportLines = [
    '# AI Trust Score Report - All Blog Posts',
    '',
    `**Generated**: ${new Date().toLocaleDateString('en-GB')}`,
    '',
    '## Summary',
    '',
    `- **Total posts**: ${results.length}`,
    `- **Average AI trust score**: ${(avgScore * 100).toFixed(1)}%`,
    `- **Excellent (≥85%)**: ${excellentCount} posts`,
    `- **Good (70-84%)**: ${goodCount} posts`,
    `- **Needs work (<70%)**: ${needsWorkCount} posts`,
    '',
    '## Individual Scores',
    '',
    '| Post | Score | Authority | Evidence | Recency | Objectivity | Quality | Reputation | Citations |',
    '|------|-------|-----------|----------|---------|-------------|---------|------------|-----------|'
  ];

  results
    .sort((a, b) => b.score - a.score)
    .forEach(r => {
      const emoji = r.score >= 0.85 ? '✅' : r.score >= 0.7 ? '⚠️' : '❌';
      reportLines.push(
        `| ${emoji} ${r.slug} | ${(r.score * 100).toFixed(1)}% | ${(r.breakdown.authority * 100).toFixed(0)}% | ${(r.breakdown.evidence * 100).toFixed(0)}% | ${(r.breakdown.recency * 100).toFixed(0)}% | ${(r.breakdown.objectivity * 100).toFixed(0)}% | ${(r.breakdown.quality * 100).toFixed(0)}% | ${(r.breakdown.reputation * 100).toFixed(0)}% | ${r.citations} |`
      );
    });

  reportLines.push('');
  reportLines.push('## Recommendations');
  reportLines.push('');
  reportLines.push('Posts scoring below 85% should:');
  reportLines.push('1. Add more citations from authoritative sources (WHO, Gallup, Harvard, CIPD)');
  reportLines.push('2. Ensure References section is properly formatted in Harvard style');
  reportLines.push('3. Include specific data points and statistics');
  reportLines.push('');

  const report = reportLines.join('\n');
  const reportPath = join(process.cwd(), 'AI-TRUST-SCORE-REPORT.md');
  writeFileSync(reportPath, report);

  console.log(`📄 Full report saved to: AI-TRUST-SCORE-REPORT.md\n`);
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
