/**
 * Orchestrator Runner
 *
 * Command-line interface for content orchestrator
 */

import { fileURLToPath } from 'url';
import { SdkContentOrchestrator } from './sdk-orchestrator';
import type { ContentCreationRequest } from './types';

async function main() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  const options = {
    demo: args.includes('--demo'),
    fromStrategy: args.find((arg) => arg.startsWith('--from-strategy='))?.split('=')[1],
  };

  if (options.demo) {
    await runDemo();
  } else if (options.fromStrategy) {
    await runFromStrategy(options.fromStrategy);
  } else {
    console.error('Usage:');
    console.error('  npm run agent:orchestrator -- --demo');
    console.error('  npm run agent:orchestrator -- --from-strategy=post-title');
    process.exit(1);
  }
}

/**
 * Run demo with sample content request
 */
async function runDemo() {
  console.log('🎭 Running Orchestrator Demo\n');

  const request: ContentCreationRequest = {
    title: 'Executive Coaching ROI: The 788% Return UK Businesses Are Achieving',
    targetKeyword: 'executive coaching ROI',
    searchVolume: 590,
    cpc: 13.11,
    wordCount: 2500,
    category: 'executive-coaching',
    tags: [
      'executive coaching',
      'coaching ROI',
      'leadership development',
      'business performance',
      'executive development',
    ],
    angle: 'ROI-focused case studies with UK-specific data, board-level perspective on coaching investment returns',
    cta: 'Calculate your potential executive coaching ROI',
    priority: 'high',
  };

  const orchestrator = new SdkContentOrchestrator({
    qualityGates: {
      minQaScore: 70,
      minAiTrustScore: 0.85,
      requireHumanReview: false,
    },
    output: {
      saveIntermediateResults: true,
      outputDir: './agents/orchestrator/output',
    },
  });

  const result = await orchestrator.createContent(request);

  console.log(orchestrator.getSummary());

  if (result.success) {
    console.log('\n✅ Demo completed successfully!');
    console.log(`📄 Output: ${result.finalOutputPath}`);
  } else {
    console.error('\n❌ Demo failed!');
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }
}

/**
 * Run orchestrator from SERVICE-FOCUSED-SEO-STRATEGY.md
 */
async function runFromStrategy(postTitle: string) {
  console.log(`🎭 Creating content from strategy: ${postTitle}\n`);

  // In real implementation, this would:
  // 1. Read SERVICE-FOCUSED-SEO-STRATEGY.md
  // 2. Parse the blog post specifications
  // 3. Find the post matching postTitle
  // 4. Create ContentCreationRequest from specification
  // 5. Run orchestrator

  console.log('⚠️  Strategy integration pending - use --demo for now');
}

// Run if called directly (ES module check)
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
