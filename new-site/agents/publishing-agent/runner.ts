/**
 * Publishing Agent Runner
 *
 * Example usage of the Publishing Agent with QA integration
 */

import { PublishingAgent } from './index';
import { QAAgent } from '../qa-agent/index';
import type { BlogPost } from './types';

async function main() {
  console.log('\n🚀 Publishing Agent Demo\n');

  // Example blog post
  const examplePost: BlogPost = {
    slug: 'executive-coaching-roi-framework',
    title: 'The Executive Coaching ROI Framework: Measuring Leadership Development Impact',
    description: 'A comprehensive framework for measuring and demonstrating the return on investment of executive coaching programmes, with real metrics from Fortune 500 companies.',
    pubDate: new Date().toISOString().split('T')[0],
    author: 'Craig Fearn',
    tags: [], // Will be auto-generated
    content: `
## TL;DR

Executive coaching delivers measurable ROI when properly tracked. This framework shows how to quantify leadership development impact through performance metrics, retention rates, and organisational outcomes.

## Introduction

As a board advisor working with C-suite executives across global organisations, I'm frequently asked to demonstrate the tangible business impact of executive coaching. The question isn't whether coaching works – extensive research confirms its effectiveness – but rather how to measure and communicate its value to stakeholders.

This framework provides a systematic approach to measuring coaching ROI, developed through work with organisations including HSBC, Edrington UK, and Brown-Forman.

## The Challenge: Quantifying Leadership Development

Traditional coaching evaluations often rely on subjective feedback. While participant satisfaction matters, boards and executives need evidence of business impact:

- Performance improvements
- Retention of key talent
- Strategic capability development
- Organisational culture enhancement

## The ROI Framework: Four Key Dimensions

### 1. Individual Performance Metrics

**Key Indicators:**
- 360-degree feedback improvements (pre/post coaching)
- Achievement of specific development objectives
- Leadership competency assessments
- Direct report engagement scores

**Real Example**: Working with a CFO at a global spirits company, we tracked specific metrics: decision-making speed improved by 40%, stakeholder satisfaction increased from 6.8 to 8.9/10, and team engagement rose 23%.

### 2. Business Outcomes

**Measurable Results:**
- Revenue or profit contribution (for P&L leaders)
- Cost savings or efficiency gains
- Project success rates
- Strategic initiative completion

### 3. Talent Retention Value

Executive replacement costs typically range from 100-200% of annual salary. Retention improvements deliver immediate ROI:

**Calculation Example:**
- Executive annual compensation: £150,000
- Replacement cost: £250,000
- Coaching investment: £12,000
- ROI from retention alone: 1,983%

### 4. Organisational Impact

Broader organisational benefits:
- Team performance improvements
- Cultural transformation progress
- Succession readiness
- Stakeholder confidence

## Implementation: Making It Work

### Step 1: Establish Baseline Metrics

Before coaching begins:
- 360-degree assessment
- Performance metrics
- Business KPIs
- Team engagement data

### Step 2: Define Success Criteria

Work with the executive and their manager to identify:
- 3-5 specific development objectives
- Measurable business outcomes
- Timeline for achievement

### Step 3: Track Progress

Regular measurement points:
- Mid-coaching review (typically 3-4 months)
- End of coaching (6-12 months)
- Follow-up assessment (6 months post-coaching)

### Step 4: Calculate ROI

Formula:
**ROI = (Total Benefits - Coaching Investment) / Coaching Investment × 100**

## Key Takeaways

- Executive coaching ROI can and should be measured systematically
- Combine quantitative metrics with qualitative insights
- Establish clear baseline data before coaching begins
- Track both individual and organisational outcomes
- Calculate retention value alongside performance improvements
- Involve stakeholders in defining success criteria

## Frequently Asked Questions

**Q: What's a realistic timeframe for seeing measurable results?**
Most executives show measurable progress within 3-4 months, with sustained impact evident at 6-12 months. However, the most significant organisational benefits often emerge 12-18 months after coaching begins.

**Q: How do you isolate coaching impact from other factors?**
Use control groups where possible, track specific coaching objectives separately from general business performance, and gather multi-source feedback to triangulate results.

**Q: What if results aren't immediately quantifiable?**
Some coaching outcomes (like enhanced strategic thinking) are inherently qualitative. Document specific behavioural changes, stakeholder observations, and decision-making improvements alongside quantitative data.

**Q: Should ROI measurement apply to all coaching engagements?**
Board-level and senior executive coaching should include ROI measurement due to investment levels. Mid-level coaching programmes can use simplified metrics focusing on competency development and retention.

## Conclusion

Measuring executive coaching ROI isn't just about justifying investment – it's about maximising impact. When coaching is properly measured, organisations can identify what works, refine their approach, and demonstrate clear value to stakeholders.

As organisations face increasing pressure to demonstrate return on every leadership development investment, those who can systematically measure and communicate coaching impact will have a significant competitive advantage.

---

**About the Author**

Craig Fearn, FRSPH, FCMI, serves as a board advisor and executive coach to senior leaders at global organisations. As an IoD Ambassador and holder of two Fellowships (Royal Society for Public Health and Chartered Management Institute), Craig brings board-level perspective to leadership development, with particular expertise in wellbeing governance and strategic capability building. Recent certifications include Google Project Management (2025), Yale Science of Well-Being (2021), and NEDonBoard NED Accelerator (2021).
    `
  };

  try {
    // Initialize Publishing Agent
    const publishingAgent = new PublishingAgent();

    console.log('📋 Example Post Details:');
    console.log(`   Title: ${examplePost.title}`);
    console.log(`   Slug: ${examplePost.slug}`);
    console.log(`   Words: ~${examplePost.content.split(/\s+/).length}\n`);

    // Option 1: Publish with auto-tagging and auto-categorization
    console.log('🔧 Publishing with auto-tagging and auto-categorization...\n');

    const result = await publishingAgent.publish(examplePost, {
      autoTag: true,           // Automatically generate tags
      autoCategory: true,      // Automatically determine category
      autoCommit: false,       // Don't commit to git (demo mode)
      autoPush: false
    });

    if (result.success) {
      console.log('\n✅ PUBLISH SUCCESSFUL');
      console.log(`   File: ${result.filePath}`);

      if (result.taxonomy) {
        console.log('\n📊 Taxonomy Generated:');
        console.log(`   Primary Category: ${result.taxonomy.category}`);
        console.log(`   Secondary Categories: ${result.taxonomy.secondaryCategories.join(', ')}`);
        console.log(`   Tags: ${result.taxonomy.tags.join(', ')}`);
      }

      if (result.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        result.warnings.forEach(w => console.log(`   - ${w}`));
      }
    } else {
      console.log('\n❌ PUBLISH FAILED');
      console.log(`   Error: ${result.error}`);
    }

    // Option 2: Integration with QA Agent (recommended workflow)
    console.log('\n\n═══════════════════════════════════════════════════════════');
    console.log('🔄 Full Workflow: QA Check → Publish');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Run QA check first
    console.log('Step 1: Quality Assurance Check\n');

    const qaAgent = new QAAgent();
    const qaReport = await qaAgent.checkPost(
      examplePost.slug,
      examplePost.content,
      {
        title: examplePost.title,
        description: examplePost.description,
        pubDate: examplePost.pubDate,
        author: examplePost.author,
        tags: [] // Will be auto-generated
      }
    );

    console.log('\n📊 QA Report Summary:');
    console.log(`   Overall Score: ${qaReport.overallScore}/100`);
    console.log(`   SEO: ${qaReport.seo.score}/100 ${qaReport.seo.passed ? '✅' : '❌'}`);
    console.log(`   Readability: ${qaReport.readability.score}/100 ${qaReport.readability.passed ? '✅' : '❌'}`);
    console.log(`   Grammar: ${qaReport.grammar.score}/100 ${qaReport.grammar.passed ? '✅' : '❌'}`);
    console.log(`   Ready to Publish: ${qaReport.readyToPublish ? '✅ YES' : '❌ NO'}`);

    if (qaReport.readyToPublish) {
      console.log('\n✅ QA check passed - proceeding with publish...\n');

      const publishResult = await publishingAgent.publish(examplePost, {
        autoTag: true,
        autoCategory: true,
        autoCommit: false,  // Set to true in production
        autoPush: false     // Set to true in production
      });

      if (publishResult.success) {
        console.log('\n🎉 COMPLETE WORKFLOW SUCCESS');
        console.log('   QA check passed ✅');
        console.log('   Post published ✅');
        console.log('   Taxonomy generated ✅');
      }
    } else {
      console.log('\n❌ QA check failed - publishing blocked');
      console.log(`   Critical Issues: ${qaReport.criticalIssues.length}`);
      qaReport.criticalIssues.slice(0, 3).forEach(issue => {
        console.log(`   - ${issue}`);
      });
    }

    console.log('\n\n✅ Demo complete!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// Run the example
main();
