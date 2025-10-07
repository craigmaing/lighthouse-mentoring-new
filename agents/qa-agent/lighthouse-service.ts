/**
 * Lighthouse Performance Testing Service
 *
 * Runs Google Lighthouse audits on generated content
 * Ensures performance, accessibility, SEO, and best practices
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa?: number;
}

export interface LighthouseAudit {
  url: string;
  scores: LighthouseScores;
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
  };
  opportunities: {
    title: string;
    description: string;
    potentialSavings: string;
  }[];
  passed: boolean;
  issues: string[];
  recommendations: string[];
}

export class LighthouseService {
  private minScores = {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 95,
  };

  /**
   * Run Lighthouse audit on a URL
   */
  async runAudit(url: string, options: {
    emulatedDevice?: 'mobile' | 'desktop';
    verbose?: boolean;
  } = {}): Promise<LighthouseAudit> {
    console.log(`\n   🔍 Running Lighthouse audit on: ${url}`);

    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    });

    try {
      const lighthouseOptions = {
        logLevel: options.verbose ? 'info' : 'error',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
        formFactor: options.emulatedDevice || 'desktop',
        screenEmulation: {
          mobile: options.emulatedDevice === 'mobile',
          width: options.emulatedDevice === 'mobile' ? 375 : 1920,
          height: options.emulatedDevice === 'mobile' ? 667 : 1080,
          deviceScaleFactor: options.emulatedDevice === 'mobile' ? 2 : 1,
        },
      };

      const runnerResult = await lighthouse(url, lighthouseOptions as any);

      if (!runnerResult || !runnerResult.lhr) {
        throw new Error('Failed to run Lighthouse audit');
      }

      const lhr = runnerResult.lhr;

      // Extract scores
      const scores: LighthouseScores = {
        performance: Math.round((lhr.categories.performance?.score || 0) * 100),
        accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((lhr.categories.seo?.score || 0) * 100),
      };

      // Extract Core Web Vitals
      const metrics = {
        firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue || 0,
        largestContentfulPaint: lhr.audits['largest-contentful-paint'].numericValue || 0,
        totalBlockingTime: lhr.audits['total-blocking-time'].numericValue || 0,
        cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue || 0,
        speedIndex: lhr.audits['speed-index'].numericValue || 0,
      };

      // Extract optimization opportunities
      const opportunities: LighthouseAudit['opportunities'] = [];

      for (const auditRef of lhr.categories.performance?.auditRefs || []) {
        const audit = lhr.audits[auditRef.id];
        if (audit && audit.details && audit.details.type === 'opportunity') {
          opportunities.push({
            title: audit.title,
            description: audit.description,
            potentialSavings: this.formatSavings(audit),
          });
        }
      }

      // Generate issues and recommendations
      const issues: string[] = [];
      const recommendations: string[] = [];

      if (scores.performance < this.minScores.performance) {
        issues.push(`Performance score (${scores.performance}) is below target (${this.minScores.performance})`);
        recommendations.push('Optimize images, minimize JavaScript, and reduce server response times');
      }

      if (scores.accessibility < this.minScores.accessibility) {
        issues.push(`Accessibility score (${scores.accessibility}) is below target (${this.minScores.accessibility})`);
        recommendations.push('Ensure all images have alt text, improve color contrast, add ARIA labels');
      }

      if (scores.bestPractices < this.minScores.bestPractices) {
        issues.push(`Best Practices score (${scores.bestPractices}) is below target (${this.minScores.bestPractices})`);
        recommendations.push('Use HTTPS, avoid deprecated APIs, ensure security best practices');
      }

      if (scores.seo < this.minScores.seo) {
        issues.push(`SEO score (${scores.seo}) is below target (${this.minScores.seo})`);
        recommendations.push('Add meta descriptions, use proper heading hierarchy, ensure mobile-friendly design');
      }

      // Core Web Vitals checks
      if (metrics.largestContentfulPaint > 2500) {
        issues.push(`LCP (${Math.round(metrics.largestContentfulPaint)}ms) exceeds 2.5s threshold`);
        recommendations.push('Optimize largest contentful element (likely hero image)');
      }

      if (metrics.cumulativeLayoutShift > 0.1) {
        issues.push(`CLS (${metrics.cumulativeLayoutShift.toFixed(3)}) exceeds 0.1 threshold`);
        recommendations.push('Reserve space for images and ads to prevent layout shifts');
      }

      const passed = Object.values(scores).every((score, idx) =>
        score >= Object.values(this.minScores)[idx]
      );

      console.log(`   ✅ Audit complete`);
      console.log(`      Performance: ${scores.performance}/100`);
      console.log(`      Accessibility: ${scores.accessibility}/100`);
      console.log(`      Best Practices: ${scores.bestPractices}/100`);
      console.log(`      SEO: ${scores.seo}/100`);

      return {
        url,
        scores,
        metrics,
        opportunities: opportunities.slice(0, 5), // Top 5 opportunities
        passed,
        issues,
        recommendations,
      };

    } finally {
      await chrome.kill();
    }
  }

  /**
   * Run audits on multiple URLs
   */
  async runBatchAudit(urls: string[], options?: {
    emulatedDevice?: 'mobile' | 'desktop';
    verbose?: boolean;
  }): Promise<LighthouseAudit[]> {
    console.log(`\n🚦 Running Lighthouse audits on ${urls.length} URLs...\n`);

    const audits: LighthouseAudit[] = [];

    for (const url of urls) {
      try {
        const audit = await this.runAudit(url, options);
        audits.push(audit);
      } catch (error) {
        console.error(`   ❌ Failed to audit ${url}:`, error);
      }

      // Add delay between audits to avoid overwhelming the server
      await this.sleep(2000);
    }

    console.log(`\n✅ Batch audit complete: ${audits.length}/${urls.length} successful\n`);

    return audits;
  }

  /**
   * Generate summary report
   */
  generateSummaryReport(audits: LighthouseAudit[]): {
    averageScores: LighthouseScores;
    totalPassed: number;
    totalFailed: number;
    commonIssues: string[];
    topRecommendations: string[];
  } {
    const averageScores: LighthouseScores = {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
    };

    let totalPassed = 0;
    let totalFailed = 0;

    const allIssues: string[] = [];
    const allRecommendations: string[] = [];

    audits.forEach(audit => {
      averageScores.performance += audit.scores.performance;
      averageScores.accessibility += audit.scores.accessibility;
      averageScores.bestPractices += audit.scores.bestPractices;
      averageScores.seo += audit.scores.seo;

      if (audit.passed) {
        totalPassed++;
      } else {
        totalFailed++;
      }

      allIssues.push(...audit.issues);
      allRecommendations.push(...audit.recommendations);
    });

    // Calculate averages
    const count = audits.length || 1;
    averageScores.performance = Math.round(averageScores.performance / count);
    averageScores.accessibility = Math.round(averageScores.accessibility / count);
    averageScores.bestPractices = Math.round(averageScores.bestPractices / count);
    averageScores.seo = Math.round(averageScores.seo / count);

    // Find most common issues and recommendations
    const issueFrequency = this.countOccurrences(allIssues);
    const recommendationFrequency = this.countOccurrences(allRecommendations);

    const commonIssues = Object.entries(issueFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([issue]) => issue);

    const topRecommendations = Object.entries(recommendationFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([rec]) => rec);

    return {
      averageScores,
      totalPassed,
      totalFailed,
      commonIssues,
      topRecommendations,
    };
  }

  /**
   * Helper: Format savings from audit
   */
  private formatSavings(audit: any): string {
    if (audit.details?.overallSavingsMs) {
      return `${Math.round(audit.details.overallSavingsMs)}ms`;
    }
    if (audit.details?.overallSavingsBytes) {
      const kb = Math.round(audit.details.overallSavingsBytes / 1024);
      return `${kb}KB`;
    }
    return 'N/A';
  }

  /**
   * Helper: Count occurrences
   */
  private countOccurrences(arr: string[]): Record<string, number> {
    return arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Helper: Sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
