#!/usr/bin/env node
/**
 * Data Analyst Agent Runner
 *
 * Usage:
 *   npm run agent:analyze
 *   npm run agent:analyze -- --input=path/to/seo-data.json
 */

import { DataAnalystAgent } from './index';
import * as path from 'path';

async function main() {
  console.log('🚀 Lighthouse Mentoring - Data Analyst Agent');
  console.log('━'.repeat(60) + '\n');

  // Parse command line arguments
  const args = process.argv.slice(2);
  let inputFile = '';

  for (const arg of args) {
    if (arg.startsWith('--input=')) {
      inputFile = arg.split('=')[1];
    }
  }

  // Default to latest SEO research file if not specified
  if (!inputFile) {
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

    inputFile = path.join(outputDir, seoFiles[0]);
    console.log(`📂 Using latest SEO research file: ${seoFiles[0]}\n`);
  }

  // Create agent and run analysis
  const agent = new DataAnalystAgent();

  try {
    // Load data
    await agent.loadData(inputFile);

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

  } catch (error) {
    console.error('\n❌ Analysis failed:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
    process.exit(1);
  }
}

main();
