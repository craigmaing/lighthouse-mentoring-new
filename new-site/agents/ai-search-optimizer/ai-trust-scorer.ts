/**
 * AI Trust Scorer
 *
 * Evaluates content against ChatGPT's source evaluation criteria.
 * Scores content on Authority, Evidence, Recency, Objectivity, Quality, and Reputation.
 *
 * Based on ChatGPT's revealed scoring methodology:
 * - Authority: 25%
 * - Evidence/References: 25%
 * - Recency & Relevance: 20%
 * - Objectivity: 15%
 * - Writing Quality & Structure: 10%
 * - Reputation Signals: 5%
 */

import type { BlogPost, Author, AITrustScore } from './types';

export class AITrustScorer {
  /**
   * Calculate complete AI trust score
   */
  calculate(post: BlogPost, author: Author, citations: any[]): AITrustScore {
    const breakdown = {
      authority: this.scoreAuthority(post, author),
      evidence: this.scoreEvidence(post.content, citations),
      recency: this.scoreRecency(post.date),
      objectivity: this.scoreObjectivity(post.content),
      quality: this.scoreQuality(post.content, post.title, post.description),
      reputation: this.scoreReputation(post, author)
    };

    // Weighted score based on ChatGPT's criteria
    const overall =
      breakdown.authority * 0.25 +
      breakdown.evidence * 0.25 +
      breakdown.recency * 0.2 +
      breakdown.objectivity * 0.15 +
      breakdown.quality * 0.1 +
      breakdown.reputation * 0.05;

    const recommendations = this.generateRecommendations(breakdown, overall);

    return {
      overall,
      breakdown,
      recommendations
    };
  }

  /**
   * Score Authority (25% weight)
   * - Named author with credentials
   * - Expert positioning
   * - Organizational affiliation
   */
  private scoreAuthority(post: BlogPost, author: Author): number {
    let score = 0;

    // Named author (0.3)
    if (post.author && post.author.length > 0) {
      score += 0.3;
    }

    // Credentials present (0.4)
    if (author.credentials && author.credentials.length >= 2) {
      score += 0.4;
    } else if (author.credentials && author.credentials.length === 1) {
      score += 0.2;
    }

    // Job title/expertise stated (0.2)
    if (author.jobTitle && author.jobTitle.length > 0) {
      score += 0.2;
    }

    // Organizational affiliation (0.1)
    if (author.url && author.url.length > 0) {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Score Evidence/References (25% weight)
   * - Number and quality of citations
   * - Links to authoritative sources
   * - Specific data vs. vague claims
   */
  private scoreEvidence(content: string, citations: any[]): number {
    let score = 0;

    // Number of citations (0.4)
    const citationCount = citations.length;
    if (citationCount >= 5) {
      score += 0.4;
    } else if (citationCount >= 3) {
      score += 0.3;
    } else if (citationCount >= 1) {
      score += 0.2;
    }

    // Quality of citations (0.3)
    const authoritativeSources = ['WHO', 'Gallup', 'Harvard', 'CIPD', 'McKinsey', 'Deloitte', 'ILO', 'OECD'];
    const hasAuthoritativeCitation = citations.some(citation =>
      authoritativeSources.some(source => citation.source?.includes(source))
    );
    if (hasAuthoritativeCitation) {
      score += 0.3;
    }

    // Specific data points (0.3)
    // Look for percentages, statistics, numbers
    const hasStatistics = /\d+%|\d+\.\d+%|\d+ percent/gi.test(content);
    const hasSpecificNumbers = /\d{2,}/g.test(content);

    if (hasStatistics && hasSpecificNumbers) {
      score += 0.3;
    } else if (hasStatistics || hasSpecificNumbers) {
      score += 0.15;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Score Recency (20% weight)
   * - Publication date
   * - Relevance to current context
   */
  private scoreRecency(dateString: string): number {
    const postDate = new Date(dateString);
    const now = new Date();
    const monthsOld = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

    // Perfect score if less than 3 months old
    if (monthsOld < 3) return 1.0;

    // Excellent if less than 6 months
    if (monthsOld < 6) return 0.9;

    // Good if less than 12 months
    if (monthsOld < 12) return 0.8;

    // Acceptable if less than 24 months
    if (monthsOld < 24) return 0.6;

    // Older content scores lower
    if (monthsOld < 36) return 0.4;

    return 0.2;
  }

  /**
   * Score Objectivity (15% weight)
   * - Balanced perspective
   * - Not overly promotional
   * - Transparent about limitations
   */
  private scoreObjectivity(content: string): number {
    let score = 1.0;

    // Check for promotional language (reduces score)
    const promotionalTerms = [
      /book a call/gi,
      /contact us today/gi,
      /limited time offer/gi,
      /buy now/gi,
      /get started now/gi,
      /sign up today/gi
    ];

    const promotionalCount = promotionalTerms.filter(term => term.test(content)).length;
    score -= promotionalCount * 0.15;

    // Check for balanced language (maintains score)
    const balancedPhrases = [
      /however/gi,
      /on the other hand/gi,
      /research suggests/gi,
      /evidence indicates/gi,
      /may/gi,
      /could/gi,
      /potential/gi
    ];

    const balancedCount = balancedPhrases.filter(phrase => phrase.test(content)).length;
    if (balancedCount >= 3) {
      score += 0.1;
    }

    return Math.max(0, Math.min(score, 1.0));
  }

  /**
   * Score Quality & Structure (10% weight)
   * - Clear headings
   * - Logical flow
   * - Proper grammar
   * - Readability
   */
  private scoreQuality(content: string, title: string, description: string): number {
    let score = 0;

    // Check for headings (0.3)
    const headingCount = (content.match(/^##\s/gm) || []).length;
    if (headingCount >= 5) {
      score += 0.3;
    } else if (headingCount >= 3) {
      score += 0.2;
    } else if (headingCount >= 1) {
      score += 0.1;
    }

    // Check for proper structure (0.3)
    const hasIntro = content.toLowerCase().includes('introduction') || content.split('\n\n')[0].length > 100;
    const hasConclusion = content.toLowerCase().includes('conclusion') || content.toLowerCase().includes('summary');
    if (hasIntro && hasConclusion) {
      score += 0.3;
    } else if (hasIntro || hasConclusion) {
      score += 0.15;
    }

    // Word count appropriate (0.2)
    const wordCount = content.split(/\s+/).length;
    if (wordCount >= 1500 && wordCount <= 3000) {
      score += 0.2;
    } else if (wordCount >= 1000) {
      score += 0.1;
    }

    // Title quality (0.2)
    const titleLength = title.length;
    if (titleLength >= 40 && titleLength <= 70) {
      score += 0.2;
    } else if (titleLength >= 30 && titleLength <= 80) {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Score Reputation Signals (5% weight)
   * - Author social proof
   * - Metadata completeness
   * - Professional domain
   */
  private scoreReputation(post: BlogPost, author: Author): number {
    let score = 0;

    // Author has social profiles (0.3)
    if (author.sameAs && author.sameAs.length > 0) {
      score += 0.3;
    }

    // Complete metadata (0.3)
    if (post.tags && post.tags.length >= 5 && post.categories && post.categories.length >= 1) {
      score += 0.3;
    } else if (post.tags || post.categories) {
      score += 0.15;
    }

    // Hero image present (0.2)
    if (post.heroImage) {
      score += 0.2;
    }

    // Professional bio (0.2)
    if (author.bio && author.bio.length > 100) {
      score += 0.2;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    breakdown: AITrustScore['breakdown'],
    overall: number
  ): string[] {
    const recommendations: string[] = [];

    if (breakdown.authority < 0.8) {
      recommendations.push(
        'Add author credentials and professional title to increase authority score'
      );
    }

    if (breakdown.evidence < 0.7) {
      recommendations.push(
        'Include more citations from authoritative sources (WHO, Gallup, Harvard, CIPD)'
      );
    }

    if (breakdown.objectivity < 0.7) {
      recommendations.push(
        'Reduce promotional language and add balanced perspectives'
      );
    }

    if (breakdown.quality < 0.7) {
      recommendations.push(
        'Improve structure with clear headings and proper introduction/conclusion'
      );
    }

    if (breakdown.reputation < 0.7) {
      recommendations.push(
        'Add complete metadata (tags, categories) and author social profiles'
      );
    }

    if (overall >= 0.9) {
      recommendations.push('✅ Excellent! Content exceeds AI trust thresholds');
    } else if (overall >= 0.8) {
      recommendations.push('✅ Very good. Minor improvements recommended');
    } else if (overall >= 0.7) {
      recommendations.push('⚠️ Good, but could be stronger with improvements above');
    } else {
      recommendations.push('⚠️ Below optimal AI trust score. Address recommendations above');
    }

    return recommendations;
  }
}
