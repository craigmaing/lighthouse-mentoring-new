#!/usr/bin/env node
/**
 * SEO Research Agent Runner
 *
 * Executes the SEO research agent with DataForSEO MCP integration
 * Automatically triggers Data Analyst agent for strategic analysis
 *
 * Usage:
 *   npm run agent:seo                    # Analyze all services + auto-analyze
 *   npm run agent:seo -- --service="board advisory"  # Single service
 *   npm run agent:seo -- --output=results.json      # Custom output file
 *   npm run agent:seo -- --no-analyze    # Skip automatic analysis
 */

import { SEOResearchAgent } from './index';
import { DataAnalystAgent } from '../data-analyst/index';
import * as path from 'path';

interface RunnerOptions {
  service?: string;
  output?: string;
  verbose?: boolean;
  noAnalyze?: boolean;
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: RunnerOptions = {};

  args.forEach(arg => {
    if (arg.startsWith('--service=')) {
      options.service = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1];
    } else if (arg === '--verbose') {
      options.verbose = true;
    } else if (arg === '--no-analyze') {
      options.noAnalyze = true;
    }
  });

  console.log('🚀 Lighthouse Mentoring - SEO Research Agent');
  console.log('━'.repeat(60) + '\n');

  if (options.service) {
    console.log(`🎯 Target: "${options.service}"`);
  } else {
    console.log('🎯 Target: All services');
  }

  if (options.output) {
    console.log(`📄 Output: ${options.output}`);
  }

  console.log('');

  // Initialize and run agent
  const agent = new SEOResearchAgent();

  try {
    const results = await agent.run(options.service);

    // Export results
    const outputPath = options.output || path.join(
      process.cwd(),
      'agents',
      'seo-research',
      'output',
      `seo-research-${Date.now()}.json`
    );

    await agent.exportResults(outputPath);

    console.log('\n✅ SEO research completed successfully!');
    console.log(`\n📊 Quick Stats:`);
    console.log(`   - Services analyzed: ${results.length}`);
    console.log(`   - Total opportunities: ${results.reduce((sum, r) => sum + r.opportunities.length, 0)}`);
    console.log(`   - High-priority opportunities: ${
      results.reduce((sum, r) => sum + r.opportunities.filter(o => o.priority === 'high').length, 0)
    }`);

    if (results.length > 0 && results[0].opportunities.length > 0) {
      console.log(`\n💡 Top Opportunity:`);
      const topOpp = results[0].opportunities[0];
      console.log(`   "${topOpp.keyword}"`);
      console.log(`   ${topOpp.reason}`);
    }

    // Automatically trigger Data Analyst Agent
    if (!options.noAnalyze) {
      console.log('\n' + '━'.repeat(60));
      console.log('🤖 Auto-triggering Data Analyst Agent...');
      console.log('━'.repeat(60) + '\n');

      const analyst = new DataAnalystAgent();

      // Load the data we just generated
      await analyst.loadData(outputPath);

      // Run analysis
      await analyst.analyze();

      // Export markdown report
      const reportPath = path.join(
        process.cwd(),
        'agents',
        'data-analyst',
        'output',
        `seo-strategic-analysis-${Date.now()}.md`
      );

      await analyst.exportMarkdown(reportPath);

      console.log('\n' + '━'.repeat(60));
      console.log('✅ Complete Pipeline Finished!');
      console.log('━'.repeat(60));
      console.log(`\n📊 SEO Research: ${outputPath}`);
      console.log(`📄 Strategic Report: ${reportPath}`);
    }

  } catch (error) {
    console.error('\n❌ Agent execution failed:', error);
    process.exit(1);
  }
}

// Run the agent
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
