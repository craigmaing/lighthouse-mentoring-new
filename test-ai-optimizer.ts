#!/usr/bin/env tsx
/**
 * Test AI Search Optimizer on existing blog post
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { AISearchOptimizer, DEFAULT_CONFIG } from './agents/ai-search-optimizer/index';
import type { BlogPost } from './agents/ai-search-optimizer/types';

// Parse markdown frontmatter and content
function parseMarkdownPost(filePath: string, slug: string): BlogPost {
  const content = readFileSync(filePath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error('No frontmatter found');
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
  console.log('🔍 Testing AI Search Optimizer\n');
  console.log('Post: business-case-workplace-wellbeing.md\n');

  // Parse the blog post
  const postPath = join(process.cwd(), 'src', 'content', 'insights', 'business-case-workplace-wellbeing.md');
  const post = parseMarkdownPost(postPath, 'business-case-workplace-wellbeing');

  console.log(`Title: ${post.title}`);
  console.log(`Date: ${post.date}`);
  console.log(`Word count: ${post.content.split(/\s+/).length}`);
  console.log(`Tags: ${post.tags.join(', ')}`);
  console.log('');

  // Create optimizer
  const optimizer = new AISearchOptimizer(DEFAULT_CONFIG);

  // Run optimization
  console.log('Running AI Search Optimization...\n');
  const result = await optimizer.optimize(post);

  // Display results
  console.log('📊 AI Trust Score Results\n');
  console.log(`Overall Score: ${(result.aiTrustScore.overall * 100).toFixed(1)}%`);

  const scoreEmoji = result.aiTrustScore.overall >= 0.85 ? '✅' :
                     result.aiTrustScore.overall >= 0.7 ? '⚠️' : '❌';
  console.log(`Status: ${scoreEmoji}\n`);

  console.log('Breakdown:');
  console.log(`  Authority:   ${(result.aiTrustScore.breakdown.authority * 100).toFixed(0)}%`);
  console.log(`  Evidence:    ${(result.aiTrustScore.breakdown.evidence * 100).toFixed(0)}%`);
  console.log(`  Recency:     ${(result.aiTrustScore.breakdown.recency * 100).toFixed(0)}%`);
  console.log(`  Objectivity: ${(result.aiTrustScore.breakdown.objectivity * 100).toFixed(0)}%`);
  console.log(`  Quality:     ${(result.aiTrustScore.breakdown.quality * 100).toFixed(0)}%`);
  console.log(`  Reputation:  ${(result.aiTrustScore.breakdown.reputation * 100).toFixed(0)}%`);
  console.log('');

  console.log(`Citations Found: ${result.citations.length}`);
  if (result.citations.length > 0) {
    console.log('Sources:');
    result.citations.forEach((citation, i) => {
      console.log(`  ${i + 1}. ${citation.source} (${citation.year})`);
    });
    console.log('');
  }

  console.log('Recommendations:');
  result.aiTrustScore.recommendations.forEach(rec => {
    console.log(`  • ${rec}`);
  });
  console.log('');

  // Show what would be added
  console.log('✨ What Would Be Added:\n');
  console.log('1. Schema.org Article markup with Craig\'s credentials');
  console.log('2. Optimized meta description (150-160 chars)');
  console.log('3. Open Graph tags for social sharing');
  console.log('4. Structured citations section in Harvard style');
  console.log('5. Author bio with fellowships');
  console.log('');

  if (result.aiTrustScore.overall < 0.85) {
    console.log('⚠️  To reach 85% target score, implement the recommendations above.\n');
  } else {
    console.log('✅ This post exceeds the 85% AI trust threshold!\n');
    console.log('This content is optimized for maximum AI search discoverability.\n');
  }
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
