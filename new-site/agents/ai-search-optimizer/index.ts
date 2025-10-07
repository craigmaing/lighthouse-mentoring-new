/**
 * AI Search Optimization Agent
 *
 * Main agent class that orchestrates schema generation, metadata optimization,
 * citation linking, and AI trust scoring to maximize content discoverability
 * by AI search engines (ChatGPT, Perplexity, Gemini).
 */

import { SchemaBuilder, CRAIG_FEARN_AUTHOR } from './schema-builder';
import { MetadataBuilder } from './metadata-builder';
import { CitationLinker } from './citation-linker';
import { AITrustScorer } from './ai-trust-scorer';

import type {
  BlogPost,
  Author,
  OptimizationConfig,
  OptimizationResult
} from './types';

export class AISearchOptimizer {
  private schemaBuilder: SchemaBuilder;
  private metadataBuilder: MetadataBuilder;
  private citationLinker: CitationLinker;
  private aiTrustScorer: AITrustScorer;
  private config: OptimizationConfig;

  constructor(config: OptimizationConfig) {
    this.config = config;

    this.schemaBuilder = new SchemaBuilder({
      baseUrl: config.baseUrl,
      organizationName: config.organizationName,
      organizationUrl: config.organizationUrl,
      organizationLogo: config.organizationLogo
    });

    this.metadataBuilder = new MetadataBuilder({
      baseUrl: config.baseUrl,
      organizationName: config.organizationName
    });

    this.citationLinker = new CitationLinker();
    this.aiTrustScorer = new AITrustScorer();
  }

  /**
   * Optimize a blog post for AI search engines
   */
  async optimize(post: BlogPost, author?: Author): Promise<OptimizationResult> {
    const postAuthor = author || this.config.author;

    // 1. Extract and validate citations
    const citations = this.citationLinker.extractCitations(post.content);
    const citationValidation = this.citationLinker.validateCitations(citations);

    // 2. Calculate AI trust score
    const aiTrustScore = this.aiTrustScorer.calculate(post, postAuthor, citations);

    // 3. Generate schema markup
    const schema = this.schemaBuilder.build(post, postAuthor);

    // 4. Generate optimized metadata
    const metaTags = this.metadataBuilder.build(post, postAuthor);

    // 5. Create optimized frontmatter
    const optimizedFrontmatter = {
      ...post,
      ...this.metadataBuilder.toAstroFrontmatter(metaTags),
      aiTrustScore: aiTrustScore.overall,
      citationCount: citations.length,
      authoritativeCitationCount: citationValidation.authoritativeCount
    };

    // 6. Generate complete Astro component
    const astroComponent = this.generateAstroComponent(
      post,
      postAuthor,
      schema,
      metaTags,
      citations,
      aiTrustScore
    );

    return {
      slug: post.slug,
      aiTrustScore,
      schema,
      metaTags,
      citations,
      optimizedFrontmatter,
      astroComponent
    };
  }

  /**
   * Generate complete Astro component with all optimizations
   */
  private generateAstroComponent(
    post: BlogPost,
    author: Author,
    schema: any,
    metaTags: any,
    citations: any[],
    aiTrustScore: any
  ): string {
    const schemaScriptTag = this.schemaBuilder.toScriptTag(schema.article);
    const referencesSection = this.citationLinker.generateReferencesSection(citations);

    return `---
title: "${post.title}"
description: "${post.description}"
date: "${post.date}"
author: "${author.name}"
tags: ${JSON.stringify(post.tags || [])}
categories: ${JSON.stringify(post.categories || [])}
heroImage: "${post.heroImage || ''}"
aiTrustScore: ${aiTrustScore.overall.toFixed(2)}
citationCount: ${citations.length}
---

import Layout from '../../layouts/Layout.astro';

${schemaScriptTag}

<Layout
  title="${metaTags.title}"
  description="${metaTags.description}"
  schemaType="service"
>
  <article class="prose prose-lg max-w-4xl mx-auto px-4 py-16">
    <header class="mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">${post.title}</h1>
      <div class="flex items-center gap-4 text-gray-600 text-sm">
        <span>By ${author.name}</span>
        <span>•</span>
        <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
      </div>
    </header>

    <div class="content">
      ${post.content}
    </div>

    ${referencesSection ? `\n    <footer class="mt-16 pt-8 border-t border-gray-200">\n      ${referencesSection}\n    </footer>` : ''}

    <div class="author-bio mt-12 p-6 bg-gray-50 rounded-lg">
      <h3 class="text-xl font-bold mb-2">About the Author</h3>
      <p class="text-gray-700">
        <strong>${author.name}</strong> is a ${author.jobTitle}. ${author.bio}
      </p>
    </div>
  </article>
</Layout>
`;
  }

  /**
   * Batch optimize multiple posts
   */
  async optimizeBatch(posts: BlogPost[]): Promise<OptimizationResult[]> {
    const results: OptimizationResult[] = [];

    for (const post of posts) {
      const result = await this.optimize(post);
      results.push(result);
    }

    return results;
  }

  /**
   * Generate optimization report
   */
  generateReport(results: OptimizationResult[]): string {
    const avgScore = results.reduce((sum, r) => sum + r.aiTrustScore.overall, 0) / results.length;
    const highScoreCount = results.filter(r => r.aiTrustScore.overall >= 0.85).length;
    const lowScoreCount = results.filter(r => r.aiTrustScore.overall < 0.7).length;

    let report = `# AI Search Optimization Report\n\n`;
    report += `**Generated**: ${new Date().toLocaleDateString('en-GB')}\n\n`;
    report += `## Summary\n\n`;
    report += `- **Total posts optimized**: ${results.length}\n`;
    report += `- **Average AI trust score**: ${(avgScore * 100).toFixed(1)}%\n`;
    report += `- **High-scoring posts** (≥85%): ${highScoreCount}\n`;
    report += `- **Low-scoring posts** (<70%): ${lowScoreCount}\n\n`;

    report += `## Individual Results\n\n`;

    for (const result of results) {
      const score = result.aiTrustScore.overall;
      const scorePercent = (score * 100).toFixed(1);
      const emoji = score >= 0.85 ? '✅' : score >= 0.7 ? '⚠️' : '❌';

      report += `### ${emoji} ${result.slug} (${scorePercent}%)\n\n`;
      report += `**Breakdown**:\n`;
      report += `- Authority: ${(result.aiTrustScore.breakdown.authority * 100).toFixed(0)}%\n`;
      report += `- Evidence: ${(result.aiTrustScore.breakdown.evidence * 100).toFixed(0)}%\n`;
      report += `- Recency: ${(result.aiTrustScore.breakdown.recency * 100).toFixed(0)}%\n`;
      report += `- Objectivity: ${(result.aiTrustScore.breakdown.objectivity * 100).toFixed(0)}%\n`;
      report += `- Quality: ${(result.aiTrustScore.breakdown.quality * 100).toFixed(0)}%\n`;
      report += `- Reputation: ${(result.aiTrustScore.breakdown.reputation * 100).toFixed(0)}%\n\n`;

      if (result.aiTrustScore.recommendations.length > 0) {
        report += `**Recommendations**:\n`;
        result.aiTrustScore.recommendations.forEach(rec => {
          report += `- ${rec}\n`;
        });
      }

      report += `\n`;
    }

    return report;
  }
}

// Export default configuration
export const DEFAULT_CONFIG: OptimizationConfig = {
  baseUrl: 'https://lighthouse-mentoring.com',
  organizationName: 'Lighthouse Mentoring',
  organizationUrl: 'https://lighthouse-mentoring.com',
  organizationLogo: '/images/logo.png',
  author: CRAIG_FEARN_AUTHOR,
  targetAITrustScore: 0.85
};
