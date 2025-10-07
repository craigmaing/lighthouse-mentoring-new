/**
 * Research Agent
 *
 * Validates facts, finds real statistics, and ensures all claims are properly cited
 * HARD RULE: Never make up stats or claims - always verify and cite
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type { ResearchQuery, ResearchResult, FactCheckResult, ContentValidation } from './types';
import { VerifiedClaimsDatabase } from './verified-claims-db';

export class ResearchAgent {
  private validatedClaims: FactCheckResult[] = [];
  private researchedStatistics: ResearchResult[] = [];
  private claimsDatabase: VerifiedClaimsDatabase;

  constructor() {
    this.claimsDatabase = new VerifiedClaimsDatabase();
  }

  /**
   * Extract claims and statistics from content that need verification
   */
  async extractClaimsForVerification(content: string): Promise<ResearchQuery[]> {
    console.log('🔍 Extracting claims and statistics for verification...\n');

    const queries: ResearchQuery[] = [];

    // Extract percentage claims (e.g., "38% improvement", "5.7x ROI")
    const percentageRegex = /(\d+\.?\d*%[^.]*)/g;
    const percentageMatches = content.matchAll(percentageRegex);

    for (const match of percentageMatches) {
      queries.push({
        claim: match[1],
        context: this.getContext(content, match.index!),
        requiresStatistic: true,
        requiresCitation: true
      });
    }

    // Extract ROI claims
    const roiRegex = /(\d+\.?\d*x\s+(?:average\s+)?ROI[^.]*)/gi;
    const roiMatches = content.matchAll(roiRegex);

    for (const match of roiMatches) {
      queries.push({
        claim: match[1],
        context: this.getContext(content, match.index!),
        requiresStatistic: true,
        requiresCitation: true
      });
    }

    // Extract research citations that need verification
    const researchRegex = /(?:Research from|Study by|According to)\s+([^(]+)\s*\((\d{4})\)/g;
    const researchMatches = content.matchAll(researchRegex);

    for (const match of researchMatches) {
      queries.push({
        claim: `${match[1]} (${match[2]})`,
        context: this.getContext(content, match.index!),
        requiresStatistic: false,
        requiresCitation: true
      });
    }

    console.log(`   Found ${queries.length} claims/statistics to verify\n`);
    return queries;
  }

  /**
   * Get surrounding context for a claim
   */
  private getContext(content: string, index: number): string {
    const start = Math.max(0, index - 100);
    const end = Math.min(content.length, index + 100);
    return content.substring(start, end);
  }

  /**
   * Verify a specific claim using web search
   * First checks verified claims database, then provides research guidance if not found
   */
  async verifyClaim(query: ResearchQuery): Promise<FactCheckResult> {
    console.log(`   🔎 Verifying: "${query.claim}"`);

    // Check database first
    const cachedClaim = this.claimsDatabase.findClaim(query.claim);

    if (cachedClaim) {
      console.log(`   ✅ Found in verified claims database`);
      return {
        claim: query.claim,
        verified: true,
        confidence: 'high',
        evidence: [
          `Source: ${cachedClaim.source}`,
          `Authority: ${cachedClaim.authority}`,
          `Verified on: ${cachedClaim.dateVerified}`
        ],
        sources: [
          {
            url: cachedClaim.sourceUrl,
            title: cachedClaim.source,
            excerpt: cachedClaim.citation
          }
        ],
        recommendation: 'keep',
        suggestedRevision: `${query.claim} (${cachedClaim.citation})`
      };
    }

    // Not in database - provide research guidance
    console.log(`   ⚠️  Not in database - manual verification required`);

    // Priority sources for executive coaching/business statistics
    const authoritativeSources = [
      'site:hbr.org',
      'site:mckinsey.com',
      'site:bcg.com',
      'site:deloitte.com',
      'site:.edu',
      'site:.gov'
    ];

    try {
      // Construct search query targeting authoritative sources
      const searchQuery = `"${query.claim}" (${authoritativeSources.join(' OR ')})`;

      // Provide structured guidance for manual verification
      return {
        claim: query.claim,
        verified: false,
        confidence: 'low',
        evidence: [
          'VERIFICATION REQUIRED: Search authoritative sources',
          `Suggested query: ${searchQuery}`,
          'Focus on: HBR, McKinsey, BCG, Deloitte, academic journals'
        ],
        sources: [
          {
            url: `https://scholar.google.com/scholar?q=${encodeURIComponent(query.claim)}`,
            title: 'Google Scholar - Academic Search',
            excerpt: 'Search academic papers and journals'
          },
          {
            url: `https://hbr.org/search?term=${encodeURIComponent(query.claim.split(' ').slice(0, 3).join(' '))}`,
            title: 'Harvard Business Review - Search',
            excerpt: 'Search HBR for business research and case studies'
          },
          {
            url: `https://www.mckinsey.com/search?q=${encodeURIComponent(query.claim)}`,
            title: 'McKinsey & Company - Search',
            excerpt: 'Search McKinsey research and insights'
          }
        ],
        recommendation: 'modify',
        suggestedRevision: `[RESEARCH NEEDED: "${query.claim}" - Verify with HBR, McKinsey, or academic source]`
      };

    } catch (error) {
      console.error(`   ❌ Verification error:`, error);
      return {
        claim: query.claim,
        verified: false,
        confidence: 'low',
        evidence: [`Error during verification: ${error}`],
        sources: [],
        recommendation: 'remove',
        suggestedRevision: `[CLAIM REMOVED - Could not verify: "${query.claim}"]`
      };
    }
  }

  /**
   * Research a statistic and find credible sources
   * First checks verified claims database, then provides research guidance if not found
   */
  async researchStatistic(query: string, context: string): Promise<ResearchResult> {
    console.log(`   📊 Researching statistic: "${query}"`);

    // Check database first
    const cachedClaim = this.claimsDatabase.findClaim(query);

    if (cachedClaim) {
      console.log(`   ✅ Found in verified claims database`);
      return {
        query,
        verified: true,
        source: cachedClaim.source,
        sourceUrl: cachedClaim.sourceUrl,
        sourceAuthority: cachedClaim.authority,
        citation: cachedClaim.citation,
        alternativeSources: [],
        note: `Verified from database (${cachedClaim.dateVerified})`
      };
    }

    // Not in database - provide research guidance
    console.log(`   ⚠️  Not in database - manual verification required`);

    // Extract the numeric claim for more focused search
    const numericMatch = query.match(/\d+\.?\d*[%x]/);
    const searchTerm = numericMatch ? query : query.split(' ').slice(0, 5).join(' ');

    try {
      // Provide structured research URLs for manual verification
      return {
        query,
        verified: false,
        source: 'VERIFICATION REQUIRED',
        sourceUrl: `https://scholar.google.com/scholar?q=${encodeURIComponent(searchTerm)}`,
        sourceAuthority: 'pending',
        citation: `[RESEARCH NEEDED: Verify "${query}" with authoritative source]`,
        alternativeSources: [
          {
            url: `https://hbr.org/search?term=${encodeURIComponent(searchTerm)}`,
            title: 'Harvard Business Review',
            authority: 'high'
          },
          {
            url: `https://www.mckinsey.com/search?q=${encodeURIComponent(searchTerm)}`,
            title: 'McKinsey & Company',
            authority: 'high'
          },
          {
            url: `https://www2.deloitte.com/search.html?query=${encodeURIComponent(searchTerm)}`,
            title: 'Deloitte Insights',
            authority: 'high'
          },
          {
            url: `https://www.bcg.com/search?q=${encodeURIComponent(searchTerm)}`,
            title: 'Boston Consulting Group',
            authority: 'high'
          },
          {
            url: `https://scholar.google.com/scholar?q=${encodeURIComponent(searchTerm)}+executive+coaching`,
            title: 'Google Scholar - Executive Coaching Research',
            authority: 'high'
          }
        ],
        note: `Manual verification required for accuracy. Check multiple sources to confirm statistic.`
      };

    } catch (error) {
      console.error(`   ❌ Research error:`, error);
      return {
        query,
        verified: false,
        source: 'ERROR',
        sourceUrl: '',
        sourceAuthority: 'none',
        citation: `[STAT REMOVED - Could not research: "${query}"]`,
        alternativeSources: []
      };
    }
  }

  /**
   * Validate entire content for accuracy
   */
  async validateContent(content: string): Promise<ContentValidation> {
    console.log('📋 Validating content for factual accuracy...\n');

    // Extract claims
    const queries = await this.extractClaimsForVerification(content);

    // Verify each claim
    const claims: FactCheckResult[] = [];
    const statistics: ResearchResult[] = [];

    for (const query of queries) {
      if (query.requiresStatistic) {
        const stat = await this.researchStatistic(query.claim, query.context);
        statistics.push(stat);
      } else {
        const claim = await this.verifyClaim(query);
        claims.push(claim);
      }
    }

    // Generate issues and recommendations
    const issuesFound: string[] = [];
    const suggestedRevisions: string[] = [];

    claims.forEach(claim => {
      if (!claim.verified || claim.confidence === 'low') {
        issuesFound.push(`Unverified claim: "${claim.claim}"`);
        if (claim.suggestedRevision) {
          suggestedRevisions.push(claim.suggestedRevision);
        }
      }
    });

    statistics.forEach(stat => {
      if (!stat.verified) {
        issuesFound.push(`Unverified statistic: "${stat.query}"`);
        suggestedRevisions.push(stat.citation);
      }
    });

    const overallVerified = claims.every(c => c.verified) && statistics.every(s => s.verified);

    console.log(`\n   ✅ Validation complete`);
    console.log(`   Claims checked: ${claims.length}`);
    console.log(`   Statistics checked: ${statistics.length}`);
    console.log(`   Issues found: ${issuesFound.length}`);

    if (!overallVerified) {
      console.log(`\n   ⚠️  MANUAL VERIFICATION REQUIRED`);
      console.log(`   Please verify all claims and statistics before publishing\n`);
    }

    return {
      originalContent: content,
      claims,
      statistics,
      overallVerified,
      issuesFound,
      suggestedRevisions
    };
  }

  /**
   * Export validation report
   */
  async exportReport(validation: ContentValidation, outputPath: string): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      verified: validation.overallVerified,
      totalClaims: validation.claims.length,
      totalStatistics: validation.statistics.length,
      issuesFound: validation.issuesFound,
      claims: validation.claims,
      statistics: validation.statistics,
      suggestedRevisions: validation.suggestedRevisions
    };

    await fs.writeFile(outputPath, JSON.stringify(report, null, 2), 'utf-8');

    // Also generate human-readable markdown report
    const mdReport = this.generateMarkdownReport(validation);
    const mdPath = outputPath.replace('.json', '.md');
    await fs.writeFile(mdPath, mdReport, 'utf-8');

    console.log(`\n   📄 Validation report: ${path.basename(outputPath)}`);
    console.log(`   📄 Readable report: ${path.basename(mdPath)}`);
  }

  /**
   * Generate human-readable markdown report
   */
  private generateMarkdownReport(validation: ContentValidation): string {
    let report = `# Content Validation Report\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n\n`;
    report += `**Status**: ${validation.overallVerified ? '✅ VERIFIED' : '⚠️  REQUIRES VERIFICATION'}\n\n`;
    report += `---\n\n`;

    if (validation.issuesFound.length > 0) {
      report += `## Issues Found\n\n`;
      validation.issuesFound.forEach((issue, i) => {
        report += `${i + 1}. ${issue}\n`;
      });
      report += `\n`;
    }

    if (validation.claims.length > 0) {
      report += `## Claims Verification\n\n`;
      validation.claims.forEach((claim, i) => {
        const status = claim.verified ? '✅' : '❌';
        report += `### ${i + 1}. ${status} ${claim.claim}\n\n`;
        report += `**Confidence**: ${claim.confidence}\n\n`;
        report += `**Recommendation**: ${claim.recommendation}\n\n`;

        if (claim.sources.length > 0) {
          report += `**Sources**:\n`;
          claim.sources.forEach(source => {
            report += `- [${source.title}](${source.url})\n`;
          });
          report += `\n`;
        }

        if (claim.suggestedRevision) {
          report += `**Suggested Revision**: ${claim.suggestedRevision}\n\n`;
        }
      });
    }

    if (validation.statistics.length > 0) {
      report += `## Statistics Verification\n\n`;
      validation.statistics.forEach((stat, i) => {
        const status = stat.verified ? '✅' : '❌';
        report += `### ${i + 1}. ${status} ${stat.query}\n\n`;

        if (stat.source) {
          report += `**Source**: ${stat.source}\n\n`;
        }

        if (stat.sourceUrl) {
          report += `**URL**: ${stat.sourceUrl}\n\n`;
        }

        report += `**Authority**: ${stat.sourceAuthority}\n\n`;
        report += `**Citation**: ${stat.citation}\n\n`;

        if (stat.alternativeSources && stat.alternativeSources.length > 0) {
          report += `**Alternative Sources**:\n`;
          stat.alternativeSources.forEach(source => {
            report += `- [${source.title}](${source.url}) - ${source.authority} authority\n`;
          });
          report += `\n`;
        }
      });
    }

    if (validation.suggestedRevisions.length > 0) {
      report += `## Action Items\n\n`;
      validation.suggestedRevisions.forEach((revision, i) => {
        report += `${i + 1}. ${revision}\n`;
      });
      report += `\n`;
    }

    report += `---\n\n`;
    report += `*This report was generated by the Research Agent to ensure factual accuracy and proper citation of all claims and statistics.*\n`;

    return report;
  }

  /**
   * Main execution
   */
  async run(contentPath: string, outputDir: string): Promise<ContentValidation> {
    console.log('🔬 Research Agent Starting...\n');
    console.log('━'.repeat(60) + '\n');

    // Load verified claims database
    await this.claimsDatabase.load();

    // Load content
    const content = await fs.readFile(contentPath, 'utf-8');

    // Validate content
    const validation = await this.validateContent(content);

    // Export report
    await fs.mkdir(outputDir, { recursive: true });
    const reportPath = path.join(outputDir, `validation-${Date.now()}.json`);
    await this.exportReport(validation, reportPath);

    console.log('\n' + '━'.repeat(60));
    console.log('✅ Research validation complete!');
    console.log('━'.repeat(60));

    if (!validation.overallVerified) {
      console.log('\n⚠️  WARNING: Content contains unverified claims or statistics');
      console.log('   Please review the validation report before publishing\n');
    }

    return validation;
  }
}
