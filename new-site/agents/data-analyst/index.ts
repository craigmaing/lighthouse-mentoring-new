/**
 * Data Analyst Agent for Lighthouse Mentoring
 *
 * Purpose: Analyze SEO research data and generate strategic insights
 *
 * Input: SEO research JSON from seo-research agent
 * Output: Strategic analysis report with actionable recommendations
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type {
  KeywordData,
  CompetitorData,
  Opportunity,
  ServiceAnalysis,
  StrategicInsight,
  AnalysisReport
} from './types';

/**
 * Data Analyst Agent Class
 */
export class DataAnalystAgent {
  private data: any;
  private report: AnalysisReport;

  constructor() {
    this.data = null;
    this.report = {
      summary: {
        totalServices: 0,
        totalKeywords: 0,
        totalOpportunities: 0,
        highPriorityCount: 0,
        avgSearchVolume: 0,
        avgCPC: 0
      },
      serviceBreakdown: [],
      strategicInsights: [],
      priorityRecommendations: [],
      contentStrategy: {
        topicClusters: [],
        blogPostIdeas: []
      }
    };
  }

  /**
   * Load SEO research data from JSON file
   */
  async loadData(filepath: string): Promise<void> {
    console.log(`📂 Loading SEO research data from ${filepath}...`);

    try {
      const content = await fs.readFile(filepath, 'utf-8');
      this.data = JSON.parse(content);
      console.log(`✅ Data loaded: ${this.data.results.length} services analyzed\n`);
    } catch (error) {
      throw new Error(`Failed to load data: ${error}`);
    }
  }

  /**
   * Main analysis execution
   */
  async analyze(): Promise<AnalysisReport> {
    console.log('🔍 Starting data analysis...\n');
    console.log('━'.repeat(60));

    // Phase 1: Calculate summary metrics
    this.calculateSummary();

    // Phase 2: Analyze each service
    this.analyzeServices();

    // Phase 3: Generate strategic insights
    this.generateStrategicInsights();

    // Phase 4: Create priority recommendations
    this.generateRecommendations();

    // Phase 5: Develop content strategy
    this.developContentStrategy();

    console.log('\n✅ Analysis complete!\n');
    return this.report;
  }

  /**
   * Phase 1: Calculate summary metrics
   */
  private calculateSummary(): void {
    console.log('\n📊 Phase 1: Calculating Summary Metrics...');

    let totalKeywords = 0;
    let totalSearchVolume = 0;
    let totalCPC = 0;
    let keywordCount = 0;

    for (const service of this.data.results) {
      totalKeywords += service.relatedKeywords.length;

      for (const kw of service.relatedKeywords) {
        totalSearchVolume += kw.searchVolume;
        totalCPC += kw.cpc;
        keywordCount++;
      }
    }

    this.report.summary = {
      totalServices: this.data.results.length,
      totalKeywords: totalKeywords,
      totalOpportunities: this.data.summary.totalOpportunities,
      highPriorityCount: this.data.results.reduce(
        (sum: number, r: any) => sum + r.opportunities.filter((o: any) => o.priority === 'high').length,
        0
      ),
      avgSearchVolume: keywordCount > 0 ? Math.round(totalSearchVolume / keywordCount) : 0,
      avgCPC: keywordCount > 0 ? parseFloat((totalCPC / keywordCount).toFixed(2)) : 0
    };

    console.log(`   Services analyzed: ${this.report.summary.totalServices}`);
    console.log(`   Total keywords: ${this.report.summary.totalKeywords}`);
    console.log(`   Total opportunities: ${this.report.summary.totalOpportunities}`);
    console.log(`   High-priority opportunities: ${this.report.summary.highPriorityCount}`);
  }

  /**
   * Phase 2: Analyze each service
   */
  private analyzeServices(): void {
    console.log('\n🔬 Phase 2: Analyzing Each Service...');

    for (const service of this.data.results) {
      const keywords = service.relatedKeywords as KeywordData[];
      const opportunities = service.opportunities as Opportunity[];

      // Sort keywords by search volume
      const topKeywords = keywords
        .sort((a, b) => b.searchVolume - a.searchVolume)
        .slice(0, 10);

      // Get main competitors
      const mainCompetitors = service.competitors.slice(0, 5);

      // Count high-priority opportunities
      const highPriorityCount = opportunities.filter(o => o.priority === 'high').length;

      const analysis: ServiceAnalysis = {
        service: service.primaryKeyword,
        totalKeywords: keywords.length,
        totalCompetitors: service.competitors.length,
        totalOpportunities: opportunities.length,
        highPriorityOpportunities: highPriorityCount,
        topKeywords,
        mainCompetitors,
        keyOpportunities: opportunities.filter(o => o.priority === 'high').slice(0, 5)
      };

      this.report.serviceBreakdown.push(analysis);

      console.log(`   ✓ ${service.primaryKeyword}: ${keywords.length} keywords, ${opportunities.length} opportunities`);
    }
  }

  /**
   * Phase 3: Generate strategic insights
   */
  private generateStrategicInsights(): void {
    console.log('\n💡 Phase 3: Generating Strategic Insights...');

    const insights: StrategicInsight[] = [];

    // Insight 1: High-volume opportunities
    const highVolumeKeywords = this.getAllKeywords()
      .filter(kw => kw.searchVolume > 500)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 10);

    if (highVolumeKeywords.length > 0) {
      insights.push({
        category: 'high-volume',
        title: 'High-Volume Keyword Opportunities',
        description: `Found ${highVolumeKeywords.length} keywords with 500+ monthly searches. These represent significant traffic potential.`,
        priority: 'critical',
        actionItems: highVolumeKeywords.slice(0, 5).map(kw =>
          `Target "${kw.keyword}" (${kw.searchVolume} searches/month, £${kw.cpc} CPC)`
        ),
        estimatedImpact: `${highVolumeKeywords.reduce((sum, kw) => sum + kw.searchVolume, 0)} monthly searches available`
      });
    }

    // Insight 2: Low-competition, high-value opportunities
    const lowCompHighValue = this.getAllKeywords()
      .filter(kw => kw.competitionLevel === 'LOW' && kw.cpc > 5)
      .sort((a, b) => b.cpc - a.cpc)
      .slice(0, 10);

    if (lowCompHighValue.length > 0) {
      insights.push({
        category: 'low-competition',
        title: 'Low-Competition, High-Value Keywords',
        description: `Identified ${lowCompHighValue.length} keywords with low competition but high commercial value (CPC > £5).`,
        priority: 'high',
        actionItems: lowCompHighValue.slice(0, 5).map(kw =>
          `"${kw.keyword}" - £${kw.cpc} CPC, ${kw.competitionLevel} competition, ${kw.searchVolume} searches/month`
        ),
        estimatedImpact: 'Quick wins with lower content investment required'
      });
    }

    // Insight 3: Premium CPC opportunities (£10+)
    const premiumCPC = this.getAllKeywords()
      .filter(kw => kw.cpc >= 10)
      .sort((a, b) => b.cpc - a.cpc);

    if (premiumCPC.length > 0) {
      insights.push({
        category: 'high-value-cpc',
        title: 'Premium CPC Keywords (£10+ Value)',
        description: `Found ${premiumCPC.length} keywords with premium commercial intent. These indicate high buyer intent and premium service opportunities.`,
        priority: 'critical',
        actionItems: premiumCPC.slice(0, 5).map(kw =>
          `"${kw.keyword}" - £${kw.cpc} CPC (${kw.searchVolume} searches/month)`
        ),
        estimatedImpact: 'High-value client acquisition potential'
      });
    }

    // Insight 4: Content gap opportunities (long-tail)
    const longTail = this.getAllKeywords()
      .filter(kw => kw.keyword.split(' ').length >= 3 && kw.searchVolume > 20)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 15);

    if (longTail.length > 0) {
      insights.push({
        category: 'content-gap',
        title: 'Long-Tail Content Opportunities',
        description: `${longTail.length} long-tail keywords with search volume indicate specific questions and needs your content can address.`,
        priority: 'medium',
        actionItems: [
          'Create blog content targeting specific long-tail queries',
          'Develop FAQ sections addressing common questions',
          'Build topic clusters around service areas'
        ],
        estimatedImpact: 'Improved organic visibility and thought leadership'
      });
    }

    // Insight 5: Executive coaching dominance
    const executiveCoaching = this.data.results.find((r: any) => r.primaryKeyword === 'executive coaching');
    if (executiveCoaching && executiveCoaching.relatedKeywords.length > 5) {
      insights.push({
        category: 'high-volume',
        title: 'Executive Coaching: Highest Volume Opportunity',
        description: `Executive coaching shows ${executiveCoaching.relatedKeywords.length} keyword variations with strong search volume. This is the primary traffic driver.`,
        priority: 'critical',
        actionItems: [
          'Create dedicated executive coaching service page',
          'Develop comprehensive FAQ addressing common queries',
          'Build authority content (case studies, methodology)',
          'Target location-specific variations (London, UK)'
        ],
        estimatedImpact: `${executiveCoaching.opportunities.length} opportunities identified`
      });
    }

    this.report.strategicInsights = insights;
    console.log(`   Generated ${insights.length} strategic insights`);
  }

  /**
   * Phase 4: Generate priority recommendations
   */
  private generateRecommendations(): void {
    console.log('\n🎯 Phase 4: Generating Priority Recommendations...');

    const recommendations: string[] = [];

    // Top recommendation: Focus on executive coaching
    const execCoaching = this.report.serviceBreakdown.find(s => s.service === 'executive coaching');
    if (execCoaching && execCoaching.totalOpportunities > 5) {
      recommendations.push(
        `**PRIORITY 1**: Executive Coaching - Create comprehensive service page targeting "${execCoaching.topKeywords[0].keyword}" (${execCoaching.topKeywords[0].searchVolume} searches/month, £${execCoaching.topKeywords[0].cpc} CPC)`
      );
    }

    // Leadership coaching
    const leadershipCoaching = this.report.serviceBreakdown.find(s => s.service === 'leadership coaching');
    if (leadershipCoaching && leadershipCoaching.totalOpportunities > 5) {
      recommendations.push(
        `**PRIORITY 2**: Leadership Coaching - ${leadershipCoaching.totalOpportunities} opportunities with ${leadershipCoaching.totalKeywords} keyword variations`
      );
    }

    // Premium services (high CPC)
    const premiumServices = this.report.serviceBreakdown
      .filter(s => {
        const avgCPC = s.topKeywords.reduce((sum, kw) => sum + kw.cpc, 0) / s.topKeywords.length;
        return avgCPC > 8;
      })
      .sort((a, b) => {
        const avgA = a.topKeywords.reduce((sum, kw) => sum + kw.cpc, 0) / a.topKeywords.length;
        const avgB = b.topKeywords.reduce((sum, kw) => sum + kw.cpc, 0) / b.topKeywords.length;
        return avgB - avgA;
      });

    if (premiumServices.length > 0) {
      const service = premiumServices[0];
      const avgCPC = (service.topKeywords.reduce((sum, kw) => sum + kw.cpc, 0) / service.topKeywords.length).toFixed(2);
      recommendations.push(
        `**PRIORITY 3**: ${service.service} - Premium service opportunity (avg £${avgCPC} CPC) - focus on conversion optimization`
      );
    }

    // Content strategy
    recommendations.push(
      `**PRIORITY 4**: Develop blog content targeting long-tail keywords - ${this.report.summary.totalOpportunities} total opportunities identified`
    );

    // Local SEO
    recommendations.push(
      `**PRIORITY 5**: Implement location-specific pages for London and UK variations of key services`
    );

    this.report.priorityRecommendations = recommendations;
    console.log(`   Created ${recommendations.length} priority recommendations`);
  }

  /**
   * Phase 5: Develop content strategy
   */
  private developContentStrategy(): void {
    console.log('\n📝 Phase 5: Developing Content Strategy...');

    // Group keywords into topic clusters
    const topicClusters = [];

    // Cluster 1: Executive & Leadership Coaching
    const coachingKeywords = this.getAllKeywords()
      .filter(kw =>
        kw.keyword.includes('coaching') ||
        kw.keyword.includes('mentoring')
      )
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 10)
      .map(kw => kw.keyword);

    if (coachingKeywords.length > 0) {
      topicClusters.push({
        topic: 'Executive & Leadership Coaching',
        keywords: coachingKeywords
      });
    }

    // Cluster 2: Board Advisory & NED
    const boardKeywords = this.getAllKeywords()
      .filter(kw =>
        kw.keyword.includes('board') ||
        kw.keyword.includes('director') ||
        kw.keyword.includes('advisory')
      )
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 10)
      .map(kw => kw.keyword);

    if (boardKeywords.length > 0) {
      topicClusters.push({
        topic: 'Board Advisory & Non-Executive Directors',
        keywords: boardKeywords
      });
    }

    // Cluster 3: Wellbeing
    const wellbeingKeywords = this.getAllKeywords()
      .filter(kw => kw.keyword.includes('wellbeing'))
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 10)
      .map(kw => kw.keyword);

    if (wellbeingKeywords.length > 0) {
      topicClusters.push({
        topic: 'Organizational Wellbeing',
        keywords: wellbeingKeywords
      });
    }

    this.report.contentStrategy.topicClusters = topicClusters;

    // Generate blog post ideas
    const blogIdeas = [];

    // Coaching content
    if (coachingKeywords.length > 0) {
      blogIdeas.push({
        title: 'Executive Coaching vs Leadership Coaching: What is the Difference?',
        keywords: ['executive coaching', 'leadership coaching', 'executive coaching uk'],
        intent: 'informational'
      });
      blogIdeas.push({
        title: 'How to Choose an Executive Coach: A Complete Guide for C-Suite Leaders',
        keywords: ['best executive coaching', 'executive coaching consultant', 'senior executive coaching'],
        intent: 'commercial'
      });
    }

    // Board advisory content
    if (boardKeywords.length > 0) {
      blogIdeas.push({
        title: 'What Does a Non-Executive Director Actually Do?',
        keywords: ['non-executive director', 'what is non-executive director'],
        intent: 'informational'
      });
      blogIdeas.push({
        title: 'Board Advisory Services: When and Why Your Business Needs Them',
        keywords: ['board advisory', 'board advisory services'],
        intent: 'commercial'
      });
    }

    // Wellbeing content
    if (wellbeingKeywords.length > 0) {
      blogIdeas.push({
        title: 'The ROI of Organizational Wellbeing: A Data-Driven Framework',
        keywords: ['organizational wellbeing', 'wellbeing governance'],
        intent: 'commercial'
      });
    }

    this.report.contentStrategy.blogPostIdeas = blogIdeas;
    console.log(`   Created ${topicClusters.length} topic clusters`);
    console.log(`   Generated ${blogIdeas.length} blog post ideas`);
  }

  /**
   * Helper: Get all keywords across all services
   */
  private getAllKeywords(): KeywordData[] {
    const allKeywords: KeywordData[] = [];

    for (const service of this.data.results) {
      allKeywords.push(...service.relatedKeywords);
    }

    return allKeywords;
  }

  /**
   * Export report to markdown
   */
  async exportMarkdown(filepath: string): Promise<void> {
    console.log(`\n📄 Generating markdown report...`);

    const md = this.generateMarkdown();
    await fs.writeFile(filepath, md, 'utf-8');

    console.log(`✅ Report exported to ${filepath}`);
  }

  /**
   * Generate markdown report
   */
  private generateMarkdown(): string {
    const r = this.report;
    let md = '';

    // Header
    md += '# Lighthouse Mentoring - SEO Strategic Analysis Report\n\n';
    md += `**Generated**: ${new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}\n\n`;
    md += '---\n\n';

    // Executive Summary
    md += '## Executive Summary\n\n';
    md += `**Total Services Analyzed**: ${r.summary.totalServices}\n\n`;
    md += `**Total Keywords Researched**: ${r.summary.totalKeywords}\n\n`;
    md += `**Total Opportunities Identified**: ${r.summary.totalOpportunities}\n\n`;
    md += `**High-Priority Opportunities**: ${r.summary.highPriorityCount}\n\n`;
    md += `**Average Search Volume**: ${r.summary.avgSearchVolume} searches/month\n\n`;
    md += `**Average CPC**: £${r.summary.avgCPC}\n\n`;
    md += '---\n\n';

    // Strategic Insights
    md += '## Strategic Insights\n\n';
    for (const insight of r.strategicInsights) {
      md += `### ${insight.title}\n\n`;
      md += `**Priority**: ${insight.priority.toUpperCase()}\n\n`;
      md += `**Category**: ${insight.category}\n\n`;
      md += `${insight.description}\n\n`;

      if (insight.estimatedImpact) {
        md += `**Estimated Impact**: ${insight.estimatedImpact}\n\n`;
      }

      md += '**Action Items**:\n\n';
      for (const action of insight.actionItems) {
        md += `- ${action}\n`;
      }
      md += '\n';
    }
    md += '---\n\n';

    // Priority Recommendations
    md += '## Priority Recommendations\n\n';
    for (const rec of r.priorityRecommendations) {
      md += `${rec}\n\n`;
    }
    md += '---\n\n';

    // Service Breakdown
    md += '## Service-by-Service Analysis\n\n';
    for (const service of r.serviceBreakdown) {
      md += `### ${service.service.toUpperCase()}\n\n`;
      md += `**Keywords**: ${service.totalKeywords} | `;
      md += `**Opportunities**: ${service.totalOpportunities} | `;
      md += `**High-Priority**: ${service.highPriorityOpportunities}\n\n`;

      if (service.topKeywords.length > 0) {
        md += '#### Top Keywords\n\n';
        md += '| Keyword | Search Volume | CPC | Competition |\n';
        md += '|---------|--------------|-----|-------------|\n';
        for (const kw of service.topKeywords.slice(0, 5)) {
          md += `| ${kw.keyword} | ${kw.searchVolume} | £${kw.cpc.toFixed(2)} | ${kw.competitionLevel} |\n`;
        }
        md += '\n';
      }

      if (service.keyOpportunities.length > 0) {
        md += '#### Key Opportunities\n\n';
        for (const opp of service.keyOpportunities) {
          md += `- **${opp.keyword}** (${opp.priority} priority): ${opp.reason}\n`;
        }
        md += '\n';
      }

      if (service.mainCompetitors.length > 0) {
        md += '#### Main Competitors\n\n';
        for (const comp of service.mainCompetitors.slice(0, 5)) {
          md += `${comp.rank}. ${comp.domain} - ${comp.title}\n`;
        }
        md += '\n';
      }
    }
    md += '---\n\n';

    // Content Strategy
    md += '## Content Strategy\n\n';

    md += '### Topic Clusters\n\n';
    for (const cluster of r.contentStrategy.topicClusters) {
      md += `#### ${cluster.topic}\n\n`;
      md += 'Target Keywords:\n';
      for (const kw of cluster.keywords) {
        md += `- ${kw}\n`;
      }
      md += '\n';
    }

    md += '### Blog Post Ideas\n\n';
    for (let i = 0; i < r.contentStrategy.blogPostIdeas.length; i++) {
      const idea = r.contentStrategy.blogPostIdeas[i];
      md += `${i + 1}. **${idea.title}**\n`;
      md += `   - Intent: ${idea.intent}\n`;
      md += `   - Target keywords: ${idea.keywords.join(', ')}\n\n`;
    }

    md += '---\n\n';
    md += '*Report generated by Lighthouse Mentoring Data Analyst Agent*\n';

    return md;
  }
}
