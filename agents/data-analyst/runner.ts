#!/usr/bin/env node
/**
 * Data Analyst Agent Runner
 *
 * Automatically triggers Content Writer → Visual Assets pipeline
 *
 * Usage:
 *   npm run agent:analyze                    # Full pipeline
 *   npm run agent:analyze -- --no-write      # Skip content writing
 *   npm run agent:analyze -- --input=file    # Custom input
 */

import { DataAnalystAgent } from './index';
import { ContentWriterAgent } from '../content-writer/index';
import { VisualAssetsAgent } from '../visual-assets/index';
import { ResearchAgent } from '../research-agent/index';
import { QAAgent } from '../qa-agent/index';
import { ContentDeduplicationChecker } from '../deduplication-checker/index';
import * as path from 'path';

interface RunnerOptions {
  inputFile?: string;
  noWrite?: boolean;
  noImages?: boolean;
}

async function main() {
  console.log('🚀 Lighthouse Mentoring - Data Analyst Agent');
  console.log('━'.repeat(60) + '\n');

  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: RunnerOptions = {};

  for (const arg of args) {
    if (arg.startsWith('--input=')) {
      options.inputFile = arg.split('=')[1];
    } else if (arg === '--no-write') {
      options.noWrite = true;
    } else if (arg === '--no-images') {
      options.noImages = true;
    }
  }

  // Default to latest SEO research file if not specified
  if (!options.inputFile) {
    const outputDir = path.join(process.cwd(), 'agents', 'seo-research', 'output');
    const fs = await import('fs/promises');
    const files = await fs.readdir(outputDir);
    const seoFiles = files
      .filter(f => f.startsWith('seo-research-') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (seoFiles.length === 0) {
      console.error('❌ No SEO research files found. Please run the SEO research agent first.');
      console.error('   Run: npm run agent:seo');
      process.exit(1);
    }

    options.inputFile = path.join(outputDir, seoFiles[0]);
    console.log(`📂 Using latest SEO research file: ${seoFiles[0]}\n`);
  }

  // Create agent and run analysis
  const agent = new DataAnalystAgent();

  try {
    // Load data
    await agent.loadData(options.inputFile);

    // Run analysis
    const report = await agent.analyze();

    // Export markdown report
    const outputPath = path.join(
      process.cwd(),
      'agents',
      'data-analyst',
      'output',
      `seo-strategic-analysis-${Date.now()}.md`
    );

    await agent.exportMarkdown(outputPath);

    console.log('\n' + '━'.repeat(60));
    console.log('✅ Analysis Complete!');
    console.log('━'.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   Services: ${report.summary.totalServices}`);
    console.log(`   Keywords: ${report.summary.totalKeywords}`);
    console.log(`   Opportunities: ${report.summary.totalOpportunities}`);
    console.log(`   High-Priority: ${report.summary.highPriorityCount}`);
    console.log(`   Strategic Insights: ${report.strategicInsights.length}`);
    console.log(`\n📄 Report: ${path.relative(process.cwd(), outputPath)}`);

    // Automatically trigger Content Writer Agent
    if (!options.noWrite) {
      // NEW: Run deduplication check before content generation
      console.log('\n' + '━'.repeat(60));
      console.log('🔍 Checking for duplicate content...');
      console.log('━'.repeat(60) + '\n');

      const deduper = new ContentDeduplicationChecker();
      const insightsDir = path.join(process.cwd(), 'src', 'content', 'insights');
      await deduper.loadExistingPosts(insightsDir);

      // Extract blog recommendations from the report
      const recommendations = report.contentStrategy.blogPostIdeas || [];

      // Check for duplicates
      const { unique, duplicates } = await deduper.checkRecommendations(recommendations);

      // Save deduplication report
      const dedupReportPath = path.join(
        process.cwd(),
        'agents',
        'deduplication-checker',
        'output',
        `deduplication-report-${Date.now()}.json`
      );
      await deduper.exportReport({ unique, duplicates }, dedupReportPath);

      if (duplicates.length > 0) {
        console.log('\n⚠️  Filtered duplicates:');
        duplicates.forEach(d => {
          console.log(`   ❌ "${d.recommendation.title}"`);
          console.log(`      Similar to: "${d.existingPost.title}"`);
          console.log(`      Match: ${(d.score * 100).toFixed(0)}% (${d.severity})`);
          console.log(`      Reason: ${d.reason}\n`);
        });
      }

      console.log(`\n📊 Deduplication Summary:`);
      console.log(`   ✅ Unique posts: ${unique.length}`);
      console.log(`   ⚠️  Duplicates filtered: ${duplicates.length}`);
      console.log(`   📄 Report: ${path.relative(process.cwd(), dedupReportPath)}\n`);

      // Only proceed with Content Writer if we have unique posts
      if (unique.length === 0) {
        console.log('⚠️  No unique posts to generate. All recommendations were duplicates.');
        console.log('   Review deduplication report for details.\n');
        return;
      }

      console.log('\n' + '━'.repeat(60));
      console.log('🤖 Auto-triggering Content Writer Agent...');
      console.log('━'.repeat(60) + '\n');

      const writer = new ContentWriterAgent();
      await writer.loadAnalysis(outputPath);
      const posts = await writer.run(Math.min(unique.length, 2)); // Write top unique posts (max 2)

      const contentDir = path.join(process.cwd(), 'agents', 'content-writer', 'output');
      await writer.exportPosts(contentDir);

      console.log(`\n✅ ${posts.length} blog posts written!`);

      // Automatically trigger Research Agent for fact-checking
      console.log('\n' + '━'.repeat(60));
      console.log('🤖 Auto-triggering Research Agent for fact-checking...');
      console.log('━'.repeat(60) + '\n');

      const researcher = new ResearchAgent();
      const researchDir = path.join(process.cwd(), 'agents', 'research-agent', 'output');

      // Validate each blog post
      const fs = await import('fs/promises');
      const mdFiles = (await fs.readdir(contentDir)).filter(f => f.endsWith('.md'));

      for (const file of mdFiles) {
        const postPath = path.join(contentDir, file);
        await researcher.run(postPath, researchDir);
      }

      console.log(`\n✅ ${mdFiles.length} posts fact-checked!`);

      // Automatically trigger Visual Assets Agent
      if (!options.noImages) {
        console.log('\n' + '━'.repeat(60));
        console.log('🤖 Auto-triggering Visual Assets Agent...');
        console.log('━'.repeat(60) + '\n');

        const visualAgent = new VisualAssetsAgent();
        const requirementsPath = path.join(contentDir, 'image-requirements.json');

        await visualAgent.run(requirementsPath, contentDir);

        console.log(`\n✅ Images optimized and inserted!`);

        // Automatically trigger QA Agent for final validation
        console.log('\n' + '━'.repeat(60));
        console.log('🤖 Auto-triggering QA Agent for final validation...');
        console.log('━'.repeat(60) + '\n');

        const qaAgent = new QAAgent();
        const qaDir = path.join(process.cwd(), 'agents', 'qa-agent', 'output');
        const reports = await qaAgent.run(contentDir, qaDir);

        const readyCount = reports.filter(r => r.readyToPublish).length;
        const needsWorkCount = reports.filter(r => !r.readyToPublish).length;

        console.log('\n' + '━'.repeat(60));
        console.log('✅ Complete 7-Agent Pipeline Finished!');
        console.log('━'.repeat(60));
        console.log(`\n📊 SEO Research: ${options.inputFile}`);
        console.log(`📄 Strategic Report: ${path.relative(process.cwd(), outputPath)}`);
        console.log(`🔬 Fact-Checking: ${researchDir}`);
        console.log(`📝 Blog Posts: ${contentDir}`);
        console.log(`🎨 Images: Optimized and inserted`);
        console.log(`✅ QA Reports: ${qaDir}`);
        console.log(`\n📊 Publishing Status:`);
        console.log(`   ✅ Ready to publish: ${readyCount} posts`);
        console.log(`   ⚠️  Needs fixes: ${needsWorkCount} posts`);

        if (needsWorkCount > 0) {
          console.log(`\n   Review QA reports before publishing\n`);
        } else {
          console.log(`\n   All posts passed QA and are ready for publishing!\n`);
        }
      }
    }

  } catch (error) {
    console.error('\n❌ Pipeline failed:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
    process.exit(1);
  }
}

main();
