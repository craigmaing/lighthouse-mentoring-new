#!/usr/bin/env tsx
/**
 * AI Search Optimization Agent - Runner
 *
 * Command-line runner for optimizing blog posts for AI search engines.
 *
 * Usage:
 *   npm run agent:ai-optimize              # Optimize all posts
 *   npm run agent:ai-optimize -- --slug=post-name  # Optimize specific post
 *   npm run agent:ai-optimize -- --report  # Generate optimization report
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { AISearchOptimizer, DEFAULT_CONFIG } from './index';
import type { BlogPost } from './types';

// Parse command-line arguments
const args = process.argv.slice(2);
const options = {
  slug: args.find(arg => arg.startsWith('--slug='))?.split('=')[1],
  report: args.includes('--report'),
  verbose: args.includes('--verbose')
};

async function main() {
  console.log('🔍 AI Search Optimization Agent\n');

  const optimizer = new AISearchOptimizer(DEFAULT_CONFIG);

  // Find blog posts
  const postsDir = join(process.cwd(), 'src', 'pages', 'insights');
  const posts: BlogPost[] = [];

  try {
    const files = readdirSync(postsDir).filter(file => file.endsWith('.astro'));

    for (const file of files) {
      const slug = file.replace('.astro', '');

      // Skip if specific slug requested and this isn't it
      if (options.slug && slug !== options.slug) {
        continue;
      }

      const content = readFileSync(join(postsDir, file), 'utf-8');
      const post = parseAstroPost(content, slug);

      if (post) {
        posts.push(post);
      }
    }
  } catch (error) {
    console.error('❌ Error reading posts directory:', error);
    process.exit(1);
  }

  if (posts.length === 0) {
    console.log('No posts found to optimize.');
    process.exit(0);
  }

  console.log(`Found ${posts.length} post(s) to optimize\n`);

  // Optimize posts
  const results = await optimizer.optimizeBatch(posts);

  // Display results
  console.log('\n📊 Optimization Results\n');

  for (const result of results) {
    const scorePercent = (result.aiTrustScore.overall * 100).toFixed(1);
    const emoji = result.aiTrustScore.overall >= 0.85 ? '✅' : result.aiTrustScore.overall >= 0.7 ? '⚠️' : '❌';

    console.log(`${emoji} ${result.slug}: ${scorePercent}%`);

    if (options.verbose) {
      console.log(`   Authority: ${(result.aiTrustScore.breakdown.authority * 100).toFixed(0)}%`);
      console.log(`   Evidence: ${(result.aiTrustScore.breakdown.evidence * 100).toFixed(0)}%`);
      console.log(`   Recency: ${(result.aiTrustScore.breakdown.recency * 100).toFixed(0)}%`);
      console.log(`   Objectivity: ${(result.aiTrustScore.breakdown.objectivity * 100).toFixed(0)}%`);
      console.log(`   Quality: ${(result.aiTrustScore.breakdown.quality * 100).toFixed(0)}%`);
      console.log(`   Reputation: ${(result.aiTrustScore.breakdown.reputation * 100).toFixed(0)}%`);

      if (result.aiTrustScore.recommendations.length > 0) {
        console.log(`   Recommendations:`);
        result.aiTrustScore.recommendations.forEach(rec => {
          console.log(`   - ${rec}`);
        });
      }
      console.log('');
    }
  }

  // Generate report if requested
  if (options.report) {
    const report = optimizer.generateReport(results);
    const reportPath = join(process.cwd(), 'agents', 'ai-search-optimizer', 'optimization-report.md');
    writeFileSync(reportPath, report);
    console.log(`\n📄 Full report saved to: ${reportPath}`);
  }

  // Calculate summary
  const avgScore = results.reduce((sum, r) => sum + r.aiTrustScore.overall, 0) / results.length;
  const highScoreCount = results.filter(r => r.aiTrustScore.overall >= 0.85).length;
  const mediumScoreCount = results.filter(r => r.aiTrustScore.overall >= 0.7 && r.aiTrustScore.overall < 0.85).length;
  const lowScoreCount = results.filter(r => r.aiTrustScore.overall < 0.7).length;

  console.log(`\n📈 Summary:`);
  console.log(`   Average AI Trust Score: ${(avgScore * 100).toFixed(1)}%`);
  console.log(`   ✅ Excellent (≥85%): ${highScoreCount}`);
  console.log(`   ⚠️  Good (70-84%): ${mediumScoreCount}`);
  console.log(`   ❌ Needs improvement (<70%): ${lowScoreCount}`);

  console.log('\n✨ Done!\n');
}

/**
 * Parse Astro file to extract blog post data
 */
function parseAstroPost(content: string, slug: string): BlogPost | null {
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    console.warn(`⚠️  No frontmatter found in ${slug}`);
    return null;
  }

  const frontmatter = frontmatterMatch[1];

  // Parse frontmatter fields
  const title = frontmatter.match(/title:\s*["'](.+?)["']/)?.[1] || slug;
  const description = frontmatter.match(/description:\s*["'](.+?)["']/)?.[1] || '';
  const date = frontmatter.match(/date:\s*["'](.+?)["']/)?.[1] || new Date().toISOString();
  const author = frontmatter.match(/author:\s*["'](.+?)["']/)?.[1] || 'Craig Fearn';
  const heroImage = frontmatter.match(/heroImage:\s*["'](.+?)["']/)?.[1];

  // Parse arrays (tags, categories)
  const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map(t => t.trim().replace(/["']/g, ''))
    : [];

  const categoriesMatch = frontmatter.match(/categories:\s*\[(.*?)\]/);
  const categories = categoriesMatch
    ? categoriesMatch[1].split(',').map(c => c.trim().replace(/["']/g, ''))
    : [];

  // Extract content (everything after frontmatter and before script tags)
  const contentMatch = content.match(/---\n[\s\S]*?---\n([\s\S]*?)(?=<script|$)/);
  const postContent = contentMatch ? contentMatch[1].trim() : '';

  return {
    slug,
    title,
    description,
    content: postContent,
    date,
    author,
    tags,
    categories,
    heroImage
  };
}

// Run the agent
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
