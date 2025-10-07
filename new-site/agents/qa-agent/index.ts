/**
 * Quality Assurance Agent
 *
 * Final validation before publishing:
 * - SEO optimization
 * - Readability
 * - Relevance
 * - Interestingness
 * - Images properly lined up
 * - Performance (Lighthouse)
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { LighthouseService } from './lighthouse-service';
import { GrammarService } from './grammar-service';
import { AIDetectionService } from './ai-detection-service';
import type {
  QAReport,
  SEOCheck,
  ReadabilityCheck,
  RelevanceCheck,
  InterestCheck,
  ImageCheck,
  PerformanceCheck,
  GrammarCheck,
  AIDetectionCheck
} from './types';

export class QAAgent {
  private reports: QAReport[] = [];
  private lighthouseService: LighthouseService;
  private grammarService: GrammarService;
  private aiDetectionService: AIDetectionService;
  private previewUrl?: string;

  constructor(previewUrl?: string, customDictionary: string[] = []) {
    this.lighthouseService = new LighthouseService();
    this.grammarService = new GrammarService(customDictionary);
    this.aiDetectionService = new AIDetectionService();
    this.previewUrl = previewUrl;
  }

  /**
   * Check SEO optimization
   */
  private async checkSEO(content: string, frontmatter: any): Promise<SEOCheck> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    const checks = {
      titleTag: false,
      metaDescription: false,
      headingHierarchy: false,
      keywordInH1: false,
      keywordInFirstParagraph: false,
      internalLinks: false,
      externalLinks: false,
      imageAltText: false,
      schemaMarkup: false,
      urlSlug: false
    };

    // Check title tag
    if (frontmatter.title && frontmatter.title.length >= 50 && frontmatter.title.length <= 60) {
      checks.titleTag = true;
    } else {
      issues.push(`Title tag should be 50-60 characters (currently: ${frontmatter.title?.length || 0})`);
    }

    // Check meta description
    if (frontmatter.description && frontmatter.description.length >= 150 && frontmatter.description.length <= 160) {
      checks.metaDescription = true;
    } else {
      issues.push(`Meta description should be 150-160 characters (currently: ${frontmatter.description?.length || 0})`);
    }

    // Check H1 (should be only one)
    const h1Matches = content.match(/^# .+$/gm);
    if (h1Matches && h1Matches.length === 1) {
      checks.headingHierarchy = true;
    } else {
      issues.push(`Should have exactly one H1 heading (found: ${h1Matches?.length || 0})`);
    }

    // Check keyword in H1
    if (frontmatter.keywords && frontmatter.keywords.length > 0) {
      const primaryKeyword = frontmatter.keywords[0].toLowerCase();
      const h1 = h1Matches?.[0]?.toLowerCase() || '';
      if (h1.includes(primaryKeyword)) {
        checks.keywordInH1 = true;
      } else {
        issues.push(`Primary keyword "${primaryKeyword}" should appear in H1`);
      }

      // Check keyword in first paragraph
      const firstPara = content.split('\n\n')[0];
      if (firstPara.toLowerCase().includes(primaryKeyword)) {
        checks.keywordInFirstParagraph = true;
      } else {
        issues.push(`Primary keyword "${primaryKeyword}" should appear in first paragraph`);
      }
    }

    // Check internal links
    const internalLinks = content.match(/\[([^\]]+)\]\(#[^\)]+\)/g);
    if (internalLinks && internalLinks.length >= 3) {
      checks.internalLinks = true;
    } else {
      issues.push(`Should have at least 3 internal links (found: ${internalLinks?.length || 0})`);
      recommendations.push('Add internal links to related content and service pages');
    }

    // Check external links
    const externalLinks = content.match(/\[([^\]]+)\]\(https?:\/\/[^\)]+\)/g);
    if (externalLinks && externalLinks.length >= 2) {
      checks.externalLinks = true;
    } else {
      issues.push(`Should have at least 2 external authoritative links (found: ${externalLinks?.length || 0})`);
      recommendations.push('Add links to Harvard Business Review, McKinsey, or other .edu/.gov sources');
    }

    // Check schema markup
    if (frontmatter.schema) {
      checks.schemaMarkup = true;
    } else {
      issues.push('Missing schema markup specification');
    }

    // Check URL slug
    if (frontmatter.title) {
      const slug = frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      checks.urlSlug = slug.length > 0;
    }

    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    const score = Math.round((passedChecks / totalChecks) * 100);

    return {
      passed: score >= 80,
      score,
      issues,
      recommendations,
      checks
    };
  }

  /**
   * Check readability
   */
  private checkReadability(content: string): ReadabilityCheck {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Remove frontmatter
    const bodyContent = content.replace(/^---[\s\S]*?---/, '');

    // Count sentences
    const sentences = bodyContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = bodyContent.split(/\s+/).filter(w => w.length > 0);

    const avgSentenceLength = words.length / sentences.length;
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;

    // Check sentence length
    if (avgSentenceLength > 20) {
      issues.push(`Average sentence length is high (${avgSentenceLength.toFixed(1)} words)`);
      recommendations.push('Break up long sentences for better readability');
    }

    // Check for long paragraphs
    const paragraphs = bodyContent.split('\n\n').filter(p => p.trim().length > 0);
    const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 100);

    if (longParagraphs.length > 0) {
      issues.push(`Found ${longParagraphs.length} paragraphs longer than 100 words`);
      recommendations.push('Break up long paragraphs (aim for 2-4 sentences per paragraph)');
    }

    // Check for bullet points (AI search requirement)
    const bulletPoints = content.match(/^[-*]\s/gm);
    if (!bulletPoints || bulletPoints.length < 5) {
      issues.push('Should have more bullet points for AI search optimization');
      recommendations.push('Add bullet lists for key points (AI search loves lists)');
    }

    const score = avgSentenceLength <= 20 ? 100 : Math.max(0, 100 - (avgSentenceLength - 20) * 5);

    return {
      passed: score >= 70,
      score: Math.round(score),
      avgSentenceLength,
      avgWordLength,
      issues,
      recommendations
    };
  }

  /**
   * Check relevance to target keywords and audience
   */
  private checkRelevance(content: string, frontmatter: any): RelevanceCheck {
    const issues: string[] = [];

    let topicAlignment = false;
    let keywordRelevance = false;
    let audienceMatch = false;

    // Check keyword density
    if (frontmatter.keywords && frontmatter.keywords.length > 0) {
      const primaryKeyword = frontmatter.keywords[0].toLowerCase();
      const contentLower = content.toLowerCase();
      const keywordCount = (contentLower.match(new RegExp(primaryKeyword, 'g')) || []).length;
      const wordCount = content.split(/\s+/).length;
      const density = (keywordCount / wordCount) * 100;

      if (density >= 1 && density <= 2) {
        keywordRelevance = true;
      } else if (density < 1) {
        issues.push(`Keyword density too low (${density.toFixed(2)}%) - should be 1-2%`);
      } else {
        issues.push(`Keyword density too high (${density.toFixed(2)}%) - should be 1-2%`);
      }
    }

    // Check for C-suite / executive language
    const executiveTerms = [
      'c-suite',
      'ceo',
      'cfo',
      'board',
      'executive',
      'senior leader',
      'board member'
    ];

    const executiveCount = executiveTerms.reduce((count, term) => {
      return count + (content.toLowerCase().match(new RegExp(term, 'g')) || []).length;
    }, 0);

    if (executiveCount >= 3) {
      audienceMatch = true;
    } else {
      issues.push('Content should reference C-suite/executive audience more clearly');
    }

    // Check for topic coherence (has H2/H3 headings)
    const headings = content.match(/^##+ .+$/gm);
    if (headings && headings.length >= 4) {
      topicAlignment = true;
    } else {
      issues.push('Should have at least 4 H2/H3 section headings for clear structure');
    }

    const passedChecks = [topicAlignment, keywordRelevance, audienceMatch].filter(Boolean).length;
    const score = Math.round((passedChecks / 3) * 100);

    return {
      passed: score >= 66,
      score,
      topicAlignment,
      keywordRelevance,
      audienceMatch,
      issues
    };
  }

  /**
   * Check interestingness and engagement
   */
  private checkInterest(content: string): InterestCheck {
    const issues: string[] = [];

    const checks = {
      hasStories: false,
      hasExamples: false,
      hasData: false,
      hasVisuals: false,
      conversationalTone: false
    };

    // Check for story elements
    const storyIndicators = ['I worked with', 'last year', 'recently', 'conversation'];
    checks.hasStories = storyIndicators.some(indicator =>
      content.toLowerCase().includes(indicator)
    );

    if (!checks.hasStories) {
      issues.push('Add real-world stories or case studies');
    }

    // Check for concrete examples
    checks.hasExamples = content.includes('example') || content.includes('for instance');

    if (!checks.hasExamples) {
      issues.push('Include specific examples to illustrate points');
    }

    // Check for data/statistics
    checks.hasData = /\d+%/.test(content) || /\d+\.?\d*x/.test(content);

    if (!checks.hasData) {
      issues.push('Include relevant statistics or data (with citations)');
    }

    // Check for visual breaks (images, tables, quotes)
    checks.hasVisuals = content.includes('Picture') ||
                        content.includes('Image') ||
                        content.includes('|') || // Tables
                        content.includes('>'); // Blockquotes

    if (!checks.hasVisuals) {
      issues.push('Add visual elements (images, tables, or pull quotes)');
    }

    // Check for conversational tone
    const conversationalMarkers = [
      "I'll",
      "you're",
      "it's",
      "here's",
      "look",
      "let me",
      'frankly'
    ];

    const conversationalCount = conversationalMarkers.reduce((count, marker) => {
      return count + (content.toLowerCase().includes(marker) ? 1 : 0);
    }, 0);

    checks.conversationalTone = conversationalCount >= 3;

    if (!checks.conversationalTone) {
      issues.push('Content should be more conversational (use contractions, direct address)');
    }

    const passedChecks = Object.values(checks).filter(Boolean).length;
    const score = Math.round((passedChecks / Object.keys(checks).length) * 100);

    return {
      passed: score >= 60,
      score,
      ...checks,
      issues
    };
  }

  /**
   * Check images are properly configured
   */
  private checkImages(content: string, frontmatter: any): ImageCheck {
    const issues: string[] = [];

    let heroImage = false;
    let sectionImages = 0;
    let allHaveAltText = true;
    let allOptimized = true;

    // Check hero image in frontmatter
    if (frontmatter.image && frontmatter.imageAlt) {
      heroImage = true;
    } else {
      issues.push('Missing hero image or alt text in frontmatter');
    }

    // Check for image components in content
    const pictureComponents = content.match(/<Picture[\s\S]*?\/>/g) || [];
    const imageComponents = content.match(/<Image[\s\S]*?\/>/g) || [];

    sectionImages = pictureComponents.length + imageComponents.length;

    // Check all images have alt text
    const imagesWithoutAlt = [...pictureComponents, ...imageComponents].filter(img =>
      !img.includes('alt=')
    );

    if (imagesWithoutAlt.length > 0) {
      allHaveAltText = false;
      issues.push(`${imagesWithoutAlt.length} images missing alt text`);
    }

    // Check images are optimized (using Picture component or Image with formats)
    const unoptimizedImages = imageComponents.filter(img =>
      !img.includes('format=') && !img.includes('formats=')
    );

    if (unoptimizedImages.length > 0) {
      allOptimized = false;
      issues.push(`${unoptimizedImages.length} images not optimized (should use format or formats prop)`);
    }

    const totalImages = (heroImage ? 1 : 0) + sectionImages;

    if (totalImages < 2) {
      issues.push('Should have at least 2 images (1 hero + 1 section)');
    }

    const passed = heroImage && sectionImages >= 1 && allHaveAltText && allOptimized;

    return {
      passed,
      totalImages,
      heroImage,
      sectionImages,
      allHaveAltText,
      allOptimized,
      issues
    };
  }

  /**
   * Check performance with Lighthouse (optional - requires preview URL)
   */
  private async checkPerformance(postSlug: string): Promise<PerformanceCheck | null> {
    if (!this.previewUrl) {
      return null;
    }

    const url = `${this.previewUrl}/${postSlug}`;

    try {
      const audit = await this.lighthouseService.runAudit(url, {
        emulatedDevice: 'desktop',
        verbose: false,
      });

      return {
        passed: audit.passed,
        scores: audit.scores,
        metrics: audit.metrics,
        issues: audit.issues,
        recommendations: audit.recommendations,
      };

    } catch (error) {
      console.error(`   ⚠️  Lighthouse check failed:`, error);
      return null;
    }
  }

  /**
   * Parse frontmatter from markdown
   */
  private parseFrontmatter(content: string): any {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter: any = {};
    const lines = match[1].split('\n');

    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();

        // Remove quotes
        const cleanValue = value.replace(/^["']|["']$/g, '');

        // Handle arrays
        if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
          try {
            frontmatter[key.trim()] = JSON.parse(cleanValue);
          } catch {
            frontmatter[key.trim()] = cleanValue;
          }
        } else {
          frontmatter[key.trim()] = cleanValue;
        }
      }
    }

    return frontmatter;
  }

  /**
   * Run complete QA check on a blog post
   */
  async checkPost(filepath: string): Promise<QAReport> {
    console.log(`\n🔍 QA Check: ${path.basename(filepath)}`);

    const content = await fs.readFile(filepath, 'utf-8');
    const frontmatter = this.parseFrontmatter(content);
    const postSlug = path.basename(filepath, '.md');

    // Run all checks
    const seo = await this.checkSEO(content, frontmatter);
    const readability = this.checkReadability(content);
    const relevance = this.checkRelevance(content, frontmatter);
    const interest = this.checkInterest(content);
    const images = this.checkImages(content, frontmatter);
    const grammar = await this.grammarService.check(content);
    const aiDetection = await this.aiDetectionService.check(content);

    // Optional: Run Lighthouse performance check if preview URL provided
    const performance = await this.checkPerformance(postSlug);

    // Calculate overall score (include performance and AI detection if available)
    const baseScores = [
      seo.score,
      readability.score,
      relevance.score,
      interest.score,
      (images.passed ? 100 : 50),
      grammar.score,
      aiDetection.score  // AI detection is critical!
    ];
    if (performance) {
      baseScores.push(performance.scores.performance);
    }
    const overallScore = Math.round(baseScores.reduce((sum, score) => sum + score, 0) / baseScores.length);

    // Collect critical issues
    const criticalIssues: string[] = [];
    if (!seo.checks.schemaMarkup) criticalIssues.push('Missing schema markup');
    if (!images.heroImage) criticalIssues.push('Missing hero image');
    if (!seo.checks.keywordInH1) criticalIssues.push('Primary keyword not in H1');
    if (grammar.errors > 5) {
      criticalIssues.push(`${grammar.errors} spelling/grammar errors found`);
    }
    if (!aiDetection.soundsHuman) {
      criticalIssues.push('Content sounds AI-generated - fails human voice check');
    }
    if (aiDetection.metrics.aiPhrasesFound > 5) {
      criticalIssues.push(`${aiDetection.metrics.aiPhrasesFound} AI clichés detected`);
    }
    if (performance && performance.scores.performance < 90) {
      criticalIssues.push(`Performance score ${performance.scores.performance}/100 is below target (90)`);
    }

    // Collect warnings
    const warnings: string[] = [
      ...seo.issues,
      ...readability.issues,
      ...relevance.issues,
      ...interest.issues,
      ...images.issues,
      ...grammar.issues.filter(i => i.severity === 'warning').map(i => `${i.message} (line ${i.line})`),
      ...aiDetection.issues.filter(i => i.severity === 'warning').map(i => i.message)
    ];

    if (performance) {
      warnings.push(...performance.issues);
    }

    // Collect recommendations
    const recommendations: string[] = [
      ...seo.recommendations,
      ...readability.recommendations,
      ...this.aiDetectionService.getRecommendations(aiDetection)
    ];

    if (performance) {
      recommendations.push(...performance.recommendations);
    }

    const overallPassed = seo.passed && readability.passed && relevance.passed && grammar.passed && aiDetection.passed && (!performance || performance.passed);
    const readyToPublish = overallPassed && criticalIssues.length === 0;

    const report: QAReport = {
      timestamp: new Date().toISOString(),
      postSlug,
      overallPassed,
      overallScore,
      seo,
      readability,
      relevance,
      interest,
      images,
      grammar,
      aiDetection,
      performance,
      criticalIssues,
      warnings,
      recommendations,
      readyToPublish
    };

    console.log(`   Overall Score: ${overallScore}/100`);
    console.log(`   Ready to Publish: ${readyToPublish ? '✅ YES' : '❌ NO'}`);

    if (criticalIssues.length > 0) {
      console.log(`   Critical Issues: ${criticalIssues.length}`);
    }

    return report;
  }

  /**
   * Export QA report
   */
  async exportReport(report: QAReport, outputDir: string): Promise<void> {
    await fs.mkdir(outputDir, { recursive: true });

    // Export JSON
    const jsonPath = path.join(outputDir, `qa-${report.postSlug}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(report, null, 2), 'utf-8');

    // Export markdown
    const mdPath = path.join(outputDir, `qa-${report.postSlug}.md`);
    const markdown = this.generateMarkdownReport(report);
    await fs.writeFile(mdPath, markdown, 'utf-8');

    console.log(`\n   📄 Report: ${path.basename(jsonPath)}`);
    console.log(`   📄 Readable: ${path.basename(mdPath)}`);
  }

  /**
   * Generate markdown report
   */
  private generateMarkdownReport(report: QAReport): string {
    let md = `# QA Report: ${report.postSlug}\n\n`;
    md += `**Generated**: ${report.timestamp}\n\n`;
    md += `**Overall Score**: ${report.overallScore}/100\n\n`;
    md += `**Ready to Publish**: ${report.readyToPublish ? '✅ YES' : '❌ NO'}\n\n`;
    md += `---\n\n`;

    if (report.criticalIssues.length > 0) {
      md += `## 🚨 Critical Issues\n\n`;
      report.criticalIssues.forEach((issue, i) => {
        md += `${i + 1}. ${issue}\n`;
      });
      md += `\n`;
    }

    md += `## Checks\n\n`;

    // SEO
    md += `### SEO (${report.seo.score}/100) ${report.seo.passed ? '✅' : '❌'}\n\n`;
    Object.entries(report.seo.checks).forEach(([check, passed]) => {
      md += `- ${passed ? '✅' : '❌'} ${check}\n`;
    });
    md += `\n`;

    // Readability
    md += `### Readability (${report.readability.score}/100) ${report.readability.passed ? '✅' : '❌'}\n\n`;
    md += `- Average sentence length: ${report.readability.avgSentenceLength.toFixed(1)} words\n`;
    md += `- Average word length: ${report.readability.avgWordLength.toFixed(1)} characters\n\n`;

    // Grammar & Spelling
    md += `### Grammar & Spelling (${report.grammar.score}/100) ${report.grammar.passed ? '✅' : '❌'}\n\n`;
    md += `- ${report.grammar.summary}\n`;
    md += `- Errors: ${report.grammar.errors}\n`;
    md += `- Warnings: ${report.grammar.warnings}\n\n`;

    if (report.grammar.errors > 0) {
      md += `**Errors:**\n\n`;
      const errorIssues = report.grammar.issues.filter(i => i.severity === 'error').slice(0, 10);
      errorIssues.forEach(issue => {
        md += `- Line ${issue.line}: ${issue.message}`;
        if (issue.suggestion) {
          md += ` (suggestion: ${issue.suggestion})`;
        }
        md += `\n`;
      });
      md += `\n`;
    }

    if (report.grammar.warnings > 0 && report.grammar.warnings <= 10) {
      md += `**Style Warnings:**\n\n`;
      const warningIssues = report.grammar.issues.filter(i => i.severity === 'warning').slice(0, 5);
      warningIssues.forEach(issue => {
        md += `- Line ${issue.line}: ${issue.message}\n`;
      });
      md += `\n`;
    }

    // AI Detection
    md += `### AI Detection (${report.aiDetection.score}/100) ${report.aiDetection.passed ? '✅' : '❌'}\n\n`;
    md += `- ${report.aiDetection.summary}\n`;
    md += `- Sounds human: ${report.aiDetection.soundsHuman ? '✅' : '❌'}\n\n`;
    md += `**Metrics:**\n\n`;
    md += `- Contraction rate: ${(report.aiDetection.metrics.contractionRate * 100).toFixed(2)}% ${report.aiDetection.metrics.contractionRate > 0.01 ? '✅' : '❌'}\n`;
    md += `- Sentence variance: ${(report.aiDetection.metrics.sentenceLengthVariance * 100).toFixed(0)}% ${report.aiDetection.metrics.sentenceLengthVariance > 0.3 ? '✅' : '❌'}\n`;
    md += `- AI phrases found: ${report.aiDetection.metrics.aiPhrasesFound} ${report.aiDetection.metrics.aiPhrasesFound < 5 ? '✅' : '⚠️'}\n`;
    md += `- Formal transitions: ${report.aiDetection.metrics.formalTransitions} ${report.aiDetection.metrics.formalTransitions < 3 ? '✅' : '⚠️'}\n`;
    md += `- Personality score: ${(report.aiDetection.metrics.personalityScore * 100).toFixed(0)}% ${report.aiDetection.metrics.personalityScore > 0.3 ? '✅' : '❌'}\n\n`;

    if (report.aiDetection.issues.length > 0) {
      md += `**AI Detection Issues:**\n\n`;
      const aiIssues = report.aiDetection.issues.slice(0, 10);
      aiIssues.forEach(issue => {
        md += `- ${issue.severity === 'error' ? '🚨' : '⚠️'} ${issue.message}`;
        if (issue.suggestion) {
          md += ` (${issue.suggestion})`;
        }
        md += `\n`;
      });
      md += `\n`;
    }

    // Relevance
    md += `### Relevance (${report.relevance.score}/100) ${report.relevance.passed ? '✅' : '❌'}\n\n`;
    md += `- ${report.relevance.topicAlignment ? '✅' : '❌'} Topic alignment\n`;
    md += `- ${report.relevance.keywordRelevance ? '✅' : '❌'} Keyword relevance\n`;
    md += `- ${report.relevance.audienceMatch ? '✅' : '❌'} Audience match\n\n`;

    // Interest
    md += `### Interest (${report.interest.score}/100) ${report.interest.passed ? '✅' : '❌'}\n\n`;
    md += `- ${report.interest.hasStories ? '✅' : '❌'} Has stories\n`;
    md += `- ${report.interest.hasExamples ? '✅' : '❌'} Has examples\n`;
    md += `- ${report.interest.hasData ? '✅' : '❌'} Has data\n`;
    md += `- ${report.interest.hasVisuals ? '✅' : '❌'} Has visuals\n`;
    md += `- ${report.interest.conversationalTone ? '✅' : '❌'} Conversational tone\n\n`;

    // Images
    md += `### Images ${report.images.passed ? '✅' : '❌'}\n\n`;
    md += `- Total images: ${report.images.totalImages}\n`;
    md += `- ${report.images.heroImage ? '✅' : '❌'} Hero image\n`;
    md += `- Section images: ${report.images.sectionImages}\n`;
    md += `- ${report.images.allHaveAltText ? '✅' : '❌'} All have alt text\n`;
    md += `- ${report.images.allOptimized ? '✅' : '❌'} All optimized\n\n`;

    // Performance (if available)
    if (report.performance) {
      md += `### Performance ${report.performance.passed ? '✅' : '❌'}\n\n`;
      md += `**Lighthouse Scores:**\n\n`;
      md += `- Performance: ${report.performance.scores.performance}/100 ${report.performance.scores.performance >= 90 ? '✅' : '❌'}\n`;
      md += `- Accessibility: ${report.performance.scores.accessibility}/100 ${report.performance.scores.accessibility >= 95 ? '✅' : '❌'}\n`;
      md += `- Best Practices: ${report.performance.scores.bestPractices}/100 ${report.performance.scores.bestPractices >= 90 ? '✅' : '❌'}\n`;
      md += `- SEO: ${report.performance.scores.seo}/100 ${report.performance.scores.seo >= 95 ? '✅' : '❌'}\n\n`;

      if (report.performance.metrics) {
        md += `**Core Web Vitals:**\n\n`;
        md += `- First Contentful Paint: ${Math.round(report.performance.metrics.firstContentfulPaint)}ms ${report.performance.metrics.firstContentfulPaint < 1800 ? '✅' : '⚠️'}\n`;
        md += `- Largest Contentful Paint: ${Math.round(report.performance.metrics.largestContentfulPaint)}ms ${report.performance.metrics.largestContentfulPaint < 2500 ? '✅' : '⚠️'}\n`;
        md += `- Total Blocking Time: ${Math.round(report.performance.metrics.totalBlockingTime)}ms ${report.performance.metrics.totalBlockingTime < 200 ? '✅' : '⚠️'}\n`;
        md += `- Cumulative Layout Shift: ${report.performance.metrics.cumulativeLayoutShift.toFixed(3)} ${report.performance.metrics.cumulativeLayoutShift < 0.1 ? '✅' : '⚠️'}\n`;
        md += `- Speed Index: ${Math.round(report.performance.metrics.speedIndex)}ms ${report.performance.metrics.speedIndex < 3400 ? '✅' : '⚠️'}\n\n`;
      }

      if (report.performance.issues.length > 0) {
        md += `**Performance Issues:**\n\n`;
        report.performance.issues.forEach(issue => {
          md += `- ⚠️ ${issue}\n`;
        });
        md += `\n`;
      }
    }

    if (report.warnings.length > 0) {
      md += `## ⚠️  Warnings\n\n`;
      report.warnings.forEach((warning, i) => {
        md += `${i + 1}. ${warning}\n`;
      });
      md += `\n`;
    }

    if (report.recommendations.length > 0) {
      md += `## 💡 Recommendations\n\n`;
      report.recommendations.forEach((rec, i) => {
        md += `${i + 1}. ${rec}\n`;
      });
      md += `\n`;
    }

    return md;
  }

  /**
   * Main execution - check all posts in a directory
   */
  async run(contentDir: string, outputDir: string): Promise<QAReport[]> {
    console.log('✅ QA Agent Starting...\n');
    console.log('━'.repeat(60) + '\n');

    const files = await fs.readdir(contentDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    const reports: QAReport[] = [];

    for (const file of mdFiles) {
      const filepath = path.join(contentDir, file);
      const report = await this.checkPost(filepath);
      reports.push(report);
      await this.exportReport(report, outputDir);
    }

    console.log('\n' + '━'.repeat(60));
    console.log('✅ QA complete!');
    console.log('━'.repeat(60));
    console.log(`\n   Checked: ${reports.length} posts`);
    console.log(`   Ready to publish: ${reports.filter(r => r.readyToPublish).length}`);
    console.log(`   Need fixes: ${reports.filter(r => !r.readyToPublish).length}\n`);

    return reports;
  }
}
