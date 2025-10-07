/**
 * SEO Research Agent for Lighthouse Mentoring
 *
 * Purpose: Deep keyword research and competitor analysis for Craig Fearn's
 * board advisory, executive coaching, and wellbeing services.
 *
 * Agent Loop: Context Gathering → Action → Verification → Repeat
 *
 * Tools: DataForSEO MCP, web scraping, content analysis
 */

import type {
  KeywordResearchResult,
  ServiceKeywordMap,
  AgentState,
  KeywordData,
  CompetitorData,
  Opportunity
} from './types';
import {
  LIGHTHOUSE_SERVICES,
  SEO_CONFIG,
  COMPETITOR_DOMAINS,
  AUDIENCE_MODIFIERS,
  INTENT_MODIFIERS,
  GEO_MODIFIERS
} from './config';
import { DataForSEOTools } from './tools/dataforseo';

/**
 * SEO Research Agent Class
 */
export class SEOResearchAgent {
  private state: AgentState;
  private dataforseo: DataForSEOTools;

  constructor() {
    this.state = {
      keywordsAnalyzed: 0,
      competitorsAnalyzed: 0,
      errors: [],
      startTime: new Date(),
      results: []
    };
    this.dataforseo = new DataForSEOTools(SEO_CONFIG.location, SEO_CONFIG.languageCode);
  }

  /**
   * Main agent execution loop
   */
  async run(service?: string): Promise<KeywordResearchResult[]> {
    const servicesToAnalyze = service ? [service] : LIGHTHOUSE_SERVICES;

    console.log(`🔍 Starting SEO Research Agent for ${servicesToAnalyze.length} service(s)...`);
    console.log(`Location: ${SEO_CONFIG.location}`);
    console.log(`Language: ${SEO_CONFIG.languageCode}\n`);

    // Initialize DataForSEO API
    await this.dataforseo.initialize();
    console.log('✅ DataForSEO API initialized\n');

    for (const svc of servicesToAnalyze) {
      this.state.currentService = svc;
      console.log(`\n📊 Analyzing: "${svc}"`);

      try {
        // PHASE 1: Context Gathering - Get base keyword data
        const baseKeywordData = await this.gatherKeywordContext(svc);

        // PHASE 2: Action - Generate keyword variations and analyze
        const keywordVariations = this.generateKeywordVariations(svc);
        const allKeywordData = await this.analyzeKeywords(keywordVariations);

        // PHASE 3: Verification - Analyze competitors
        const competitors = await this.analyzeCompetitors(svc, allKeywordData);

        // PHASE 4: Synthesis - Identify opportunities
        const opportunities = this.identifyOpportunities(allKeywordData, competitors);

        // PHASE 5: Recommendations
        const recommendations = this.generateRecommendations(
          svc,
          allKeywordData,
          competitors,
          opportunities
        );

        const result: KeywordResearchResult = {
          primaryKeyword: svc,
          relatedKeywords: allKeywordData,
          competitors,
          opportunities,
          recommendations
        };

        this.state.results.push(result);
        console.log(`✅ Completed analysis for "${svc}"`);

      } catch (error) {
        const errorMsg = `Failed to analyze "${svc}": ${error}`;
        this.state.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    this.printSummary();
    return this.state.results;
  }

  /**
   * PHASE 1: Context Gathering - Collect base keyword data
   */
  private async gatherKeywordContext(service: string): Promise<KeywordData | null> {
    console.log(`  📥 Gathering context for "${service}"...`);

    // TODO: Integrate with DataForSEO MCP
    // For now, return mock data structure
    console.log(`  ⚠️  DataForSEO integration pending`);

    return null;
  }

  /**
   * Generate keyword variations for comprehensive analysis
   * Supports worldwide targeting (Craig works globally)
   */
  private generateKeywordVariations(baseKeyword: string): string[] {
    const variations: string[] = [baseKeyword];

    // High-value modifiers (location-agnostic)
    variations.push(`${baseKeyword} services`);
    variations.push(`${baseKeyword} consultant`);
    variations.push(`${baseKeyword} consultancy`);
    variations.push(`${baseKeyword} expert`);

    // Common question formats (likely to have search volume)
    variations.push(`what is ${baseKeyword}`);
    variations.push(`best ${baseKeyword}`);
    variations.push(`how to find ${baseKeyword}`);

    // Top audience modifiers
    variations.push(`${baseKeyword} for executives`);
    variations.push(`executive ${baseKeyword}`);
    variations.push(`senior ${baseKeyword}`);
    variations.push(`${baseKeyword} for CEOs`);
    variations.push(`${baseKeyword} for boards`);

    // Global/international modifiers
    variations.push(`international ${baseKeyword}`);
    variations.push(`global ${baseKeyword}`);

    // Major market modifiers (if user wants geo-specific research)
    // These are optional - can be enabled/disabled
    if (SEO_CONFIG.location.includes('Kingdom')) {
      variations.push(`${baseKeyword} uk`);
      variations.push(`${baseKeyword} london`);
    }
    if (SEO_CONFIG.location.includes('States')) {
      variations.push(`${baseKeyword} usa`);
      variations.push(`${baseKeyword} new york`);
    }

    // Deduplicate
    return [...new Set(variations)];
  }

  /**
   * PHASE 2: Action - Analyze keyword variations
   */
  private async analyzeKeywords(keywords: string[]): Promise<KeywordData[]> {
    console.log(`  🔎 Analyzing ${keywords.length} keyword variations...`);

    // Use DataForSEO to get keyword metrics
    const results = await this.dataforseo.batchKeywordResearch(keywords);

    this.state.keywordsAnalyzed += keywords.length;
    console.log(`  ✅ Analyzed ${results.length} keywords`);

    return results;
  }

  /**
   * PHASE 3: Verification - Analyze competitor rankings
   */
  private async analyzeCompetitors(
    service: string,
    keywords: KeywordData[]
  ): Promise<CompetitorData[]> {
    console.log(`  🏢 Analyzing competitors for "${service}"...`);

    // Get SERP results for the primary service keyword
    const competitors = await this.dataforseo.getSERPResults(service, 10);

    this.state.competitorsAnalyzed += competitors.length;
    console.log(`  ✅ Found ${competitors.length} competitors`);

    return competitors;
  }

  /**
   * PHASE 4: Synthesis - Identify SEO opportunities
   */
  private identifyOpportunities(
    keywords: KeywordData[],
    competitors: CompetitorData[]
  ): Opportunity[] {
    console.log(`  💡 Identifying opportunities...`);

    const opportunities: Opportunity[] = [];

    // Low-competition, high-volume opportunities
    keywords.forEach(kw => {
      if (kw.searchVolume > 100 && kw.competitionLevel === 'LOW') {
        opportunities.push({
          type: 'low-competition',
          keyword: kw.keyword,
          reason: `High volume (${kw.searchVolume}) with low competition`,
          priority: 'high',
          estimatedTraffic: Math.floor(kw.searchVolume * 0.3) // Estimate 30% CTR for top position
        });
      }
    });

    // Long-tail opportunities (3+ words, decent volume)
    keywords.forEach(kw => {
      const wordCount = kw.keyword.split(' ').length;
      if (wordCount >= 3 && kw.searchVolume > 50) {
        opportunities.push({
          type: 'long-tail',
          keyword: kw.keyword,
          reason: `Long-tail keyword with ${kw.searchVolume} monthly searches`,
          priority: 'medium'
        });
      }
    });

    console.log(`  ✨ Found ${opportunities.length} opportunities`);
    return opportunities;
  }

  /**
   * PHASE 5: Generate strategic recommendations
   */
  private generateRecommendations(
    service: string,
    keywords: KeywordData[],
    competitors: CompetitorData[],
    opportunities: Opportunity[]
  ): string[] {
    const recommendations: string[] = [];

    // High-priority keywords to target
    const highPriorityOpps = opportunities.filter(o => o.priority === 'high');
    if (highPriorityOpps.length > 0) {
      recommendations.push(
        `Target ${highPriorityOpps.length} high-priority keywords: ${
          highPriorityOpps.slice(0, 3).map(o => `"${o.keyword}"`).join(', ')
        }`
      );
    }

    // Content gaps
    recommendations.push(
      `Create content specifically targeting "${service}" with board-level positioning`
    );

    // Competitor differentiation
    if (competitors.length > 0) {
      recommendations.push(
        `Differentiate from competitors by emphasizing Craig's dual Fellowships and board-level experience`
      );
    }

    // Long-tail strategy
    const longtailOpps = opportunities.filter(o => o.type === 'long-tail');
    if (longtailOpps.length > 0) {
      recommendations.push(
        `Develop ${longtailOpps.length} blog articles targeting long-tail keywords`
      );
    }

    return recommendations;
  }

  /**
   * Print execution summary
   */
  private printSummary(): void {
    const duration = Date.now() - this.state.startTime.getTime();
    const durationSec = (duration / 1000).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('📊 SEO RESEARCH AGENT - EXECUTION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Services analyzed: ${this.state.results.length}`);
    console.log(`Keywords analyzed: ${this.state.keywordsAnalyzed}`);
    console.log(`Competitors analyzed: ${this.state.competitorsAnalyzed}`);
    console.log(`Errors: ${this.state.errors.length}`);
    console.log(`Duration: ${durationSec}s`);
    console.log('='.repeat(60) + '\n');

    if (this.state.errors.length > 0) {
      console.log('❌ Errors encountered:');
      this.state.errors.forEach(err => console.log(`  - ${err}`));
    }
  }

  /**
   * Export results to JSON
   */
  async exportResults(filepath: string): Promise<void> {
    const fs = await import('fs/promises');
    const output = {
      metadata: {
        generatedAt: new Date().toISOString(),
        services: LIGHTHOUSE_SERVICES,
        location: SEO_CONFIG.location,
        languageCode: SEO_CONFIG.languageCode
      },
      summary: {
        servicesAnalyzed: this.state.results.length,
        keywordsAnalyzed: this.state.keywordsAnalyzed,
        competitorsAnalyzed: this.state.competitorsAnalyzed,
        totalOpportunities: this.state.results.reduce(
          (sum, r) => sum + r.opportunities.length,
          0
        )
      },
      results: this.state.results
    };

    await fs.writeFile(filepath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`✅ Results exported to ${filepath}`);
  }
}

/**
 * Generate service-specific keyword map
 */
export function generateServiceKeywordMap(
  results: KeywordResearchResult[]
): ServiceKeywordMap[] {
  return results.map(result => {
    const allKeywords = result.relatedKeywords;

    // Extract geo-specific keywords (any location from GEO_MODIFIERS)
    const geoKeywords = allKeywords.filter(k => {
      const lowerKeyword = k.keyword.toLowerCase();
      return GEO_MODIFIERS.some(geo => lowerKeyword.includes(geo.toLowerCase()));
    });

    return {
      service: result.primaryKeyword,
      primaryKeywords: allKeywords
        .filter(k => k.searchVolume > 500)
        .slice(0, 5)
        .map(k => k.keyword),
      secondaryKeywords: allKeywords
        .filter(k => k.searchVolume > 100 && k.searchVolume <= 500)
        .slice(0, 10)
        .map(k => k.keyword),
      longtailKeywords: allKeywords
        .filter(k => k.keyword.split(' ').length >= 3)
        .slice(0, 15)
        .map(k => k.keyword),
      localKeywords: geoKeywords.map(k => k.keyword),
      competitorKeywords: [] // TODO: Extract from competitor analysis
    };
  });
}
