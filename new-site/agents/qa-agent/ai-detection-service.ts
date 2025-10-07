/**
 * AI Detection Service for QA Agent
 *
 * Checks content for AI-generated patterns and flags content that sounds robotic
 * Based on HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md guidelines
 */

export interface AIDetectionIssue {
  type: 'ai_phrase' | 'formal_transition' | 'no_contractions' | 'uniform_sentences' | 'generic_statement' | 'no_personality';
  message: string;
  suggestion?: string;
  line?: number;
  severity: 'warning' | 'error';
}

export interface AIDetectionResult {
  passed: boolean;
  score: number;
  soundsHuman: boolean;
  issues: AIDetectionIssue[];
  metrics: {
    contractionRate: number;
    sentenceLengthVariance: number;
    aiPhrasesFound: number;
    formalTransitions: number;
    personalityScore: number;
  };
  summary: string;
}

export class AIDetectionService {
  // AI clichés and overused phrases (from research)
  private aiPhrases = [
    // Overused verbs
    /\bdelve(?:s|d)?\b/gi,
    /\bembark(?:s|ed)?\s+(?:on|upon)\b/gi,
    /\billuminate(?:s|d)?\b/gi,
    /\belucidate(?:s|d)?\b/gi,
    /\bharness(?:es|ed)?\b/gi,
    /\bfoster(?:s|ed)?\b/gi,
    /\bevoke(?:s|d)?\b/gi,
    /\bempower(?:s|ed)?\b/gi,
    /\belevate(?:s|d)?\b/gi,
    /\bnavigat(?:e|es|ed|ing)\s+(?:the|through|complex)\b/gi,
    /\bunderscore(?:s|d)?\b/gi,

    // Overused adjectives
    /\bcompelling\b/gi,
    /\bcomprehensive\b/gi,
    /\bnuanced\b/gi,
    /\brobust\b/gi,
    /\bdynamic\b/gi,
    /\binnovative\b/gi,
    /\bseamless(?:ly)?\b/gi,
    /\bpivotal\b/gi,
    /\bcrucial\b/gi,
    /\btransformative\b/gi,
    /\bbustling\b/gi,
    /\bmeticulous(?:ly)?\b/gi,

    // Overused adverbs
    /\bnotably\b/gi,
    /\bsignificantly\b/gi,
    /\bprofoundly\b/gi,
    /\bintricately\b/gi,

    // Common AI phrases
    /it'?s?\s+important\s+to\s+note/gi,
    /it'?s?\s+worth\s+noting/gi,
    /in\s+the\s+realm\s+of/gi,
    /in\s+today'?s?\s+digital\s+landscape/gi,
    /in\s+today'?s?\s+world/gi,
    /dive\s+into/gi,
    /delve\s+into/gi,
    /at\s+the\s+end\s+of\s+the\s+day/gi,
    /game\s+changer/gi,
    /journey\b/gi,  // metaphorical journey
    /tapestry/gi,
    /complexities/gi,
    /nuanced\s+understanding/gi,
    /deeper\s+understanding/gi,
    /for\s+future\s+generations/gi,
    /plays?\s+a\s+crucial\s+role\s+in/gi
  ];

  // Formal transitions that scream AI
  private formalTransitions = [
    /\bmoreover\b/gi,
    /\bfurthermore\b/gi,
    /\badditionally\b/gi,
    /\bconsequently\b/gi,
    /\bthus\b/gi,
    /\btherefore\b/gi,
    /\bin\s+conclusion\b/gi,
    /\bto\s+summarize\b/gi,
    /\bin\s+summary\b/gi
  ];

  // Personality indicators (good signs)
  private personalityIndicators = [
    /\b(?:I|we|you)\b/gi,
    /(?:I've|I'm|you've|you're|we've|we're|don't|can't|won't|isn't|aren't|hasn't|haven't)/gi,
    /(?:here's|that's|it's|what's)/gi,
    /\?/g,  // Questions
    /\b(?:actually|really|honestly|frankly|basically)\b/gi,
    /\b(?:look|listen|so|and|but|or)\b/gi  // Casual connectors
  ];

  /**
   * Check content for AI-generated patterns
   */
  async check(content: string): Promise<AIDetectionResult> {
    const issues: AIDetectionIssue[] = [];

    // 1. Check for AI phrases
    const aiPhrasesFound = this.checkAIPhrases(content, issues);

    // 2. Check for formal transitions
    const formalTransitions = this.checkFormalTransitions(content, issues);

    // 3. Check contraction rate
    const contractionRate = this.checkContractions(content, issues);

    // 4. Check sentence length variance
    const sentenceLengthVariance = this.checkSentenceVariance(content, issues);

    // 5. Check for personality/voice
    const personalityScore = this.checkPersonality(content, issues);

    // Calculate overall metrics
    const metrics = {
      contractionRate,
      sentenceLengthVariance,
      aiPhrasesFound,
      formalTransitions,
      personalityScore
    };

    // Calculate score (100 - deductions)
    let score = 100;

    // Deduct points for AI indicators
    score -= aiPhrasesFound * 5;          // -5 per AI phrase
    score -= formalTransitions * 8;       // -8 per formal transition (more serious)
    score -= (1 - contractionRate) * 20;  // -20 if no contractions
    score -= (1 - sentenceLengthVariance) * 15;  // -15 for uniform sentences
    score -= (1 - personalityScore) * 25; // -25 for no personality

    score = Math.max(0, Math.min(100, score));

    // Determine if it sounds human
    const soundsHuman = score >= 70 &&
      contractionRate > 0.01 &&
      personalityScore > 0.3 &&
      aiPhrasesFound < 5;

    const passed = soundsHuman;

    const summary = this.generateSummary(score, soundsHuman, metrics);

    return {
      passed,
      score: Math.round(score),
      soundsHuman,
      issues,
      metrics,
      summary
    };
  }

  /**
   * Check for AI clichés and overused phrases
   */
  private checkAIPhrases(content: string, issues: AIDetectionIssue[]): number {
    let count = 0;

    this.aiPhrases.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        count += matches.length;

        // Add issue for first few occurrences
        if (count <= 3) {
          issues.push({
            type: 'ai_phrase',
            message: `AI cliché detected: "${matches[0]}" - sounds robotic`,
            suggestion: 'Use more natural, conversational language',
            severity: 'warning'
          });
        }
      }
    });

    // If excessive AI phrases, add error
    if (count > 5) {
      issues.push({
        type: 'ai_phrase',
        message: `${count} AI clichés found - content sounds AI-generated`,
        suggestion: 'Rewrite to sound more human: use contractions, vary sentence length, add personality',
        severity: 'error'
      });
    }

    return count;
  }

  /**
   * Check for formal transitions
   */
  private checkFormalTransitions(content: string, issues: AIDetectionIssue[]): number {
    let count = 0;

    this.formalTransitions.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        count += matches.length;

        if (count <= 2) {
          issues.push({
            type: 'formal_transition',
            message: `Formal transition detected: "${matches[0]}" - sounds like AI writing`,
            suggestion: 'Use casual connectors like "And," "But," "So," "Look," "Here\'s the thing"',
            severity: 'warning'
          });
        }
      }
    });

    return count;
  }

  /**
   * Check contraction usage (humans use contractions)
   */
  private checkContractions(content: string, issues: AIDetectionIssue[]): number {
    const words = content.split(/\s+/).length;
    const contractions = (content.match(/(?:n't|'ve|'re|'ll|'d|'s)\b/g) || []).length;

    const rate = words > 0 ? contractions / words : 0;

    // Humans typically use contractions at 2-5% rate in business writing
    if (rate < 0.01) {
      issues.push({
        type: 'no_contractions',
        message: 'No contractions found - sounds overly formal/AI-generated',
        suggestion: 'Use contractions naturally: don\'t, can\'t, won\'t, it\'s, you\'re, etc.',
        severity: 'warning'
      });
    }

    return rate;
  }

  /**
   * Check sentence length variance (humans vary sentence length)
   */
  private checkSentenceVariance(content: string, issues: AIDetectionIssue[]): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (sentences.length < 5) {
      return 0.5; // Not enough data
    }

    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const mean = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / lengths.length;
    const stdDev = Math.sqrt(variance);

    // Normalize to 0-1 scale (higher is better)
    // Standard deviation of 5-10 words is good variance
    const normalizedVariance = Math.min(stdDev / 10, 1);

    // If all sentences are roughly the same length (low variance)
    if (stdDev < 3) {
      issues.push({
        type: 'uniform_sentences',
        message: 'Sentences are too uniform in length - sounds AI-generated',
        suggestion: 'Vary sentence length dramatically: Mix short punchy sentences with longer flowing ones',
        severity: 'warning'
      });
    }

    return normalizedVariance;
  }

  /**
   * Check for personality and human voice
   */
  private checkPersonality(content: string, issues: AIDetectionIssue[]): number {
    let personalityScore = 0;
    const words = content.split(/\s+/).length;

    // Check for personality indicators
    this.personalityIndicators.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        personalityScore += matches.length;
      }
    });

    // Normalize to 0-1 scale
    // Expect about 5-10% of words to be personality indicators
    const normalizedScore = Math.min((personalityScore / words) / 0.07, 1);

    // Check for lack of personality
    if (normalizedScore < 0.2) {
      issues.push({
        type: 'no_personality',
        message: 'Content lacks personality and voice - sounds generic/AI-generated',
        suggestion: 'Add personal examples, use "I/you", ask questions, show opinion',
        severity: 'warning'
      });
    }

    // Check for generic statements (no specifics)
    const hasSpecifics = this.hasSpecificDetails(content);
    if (!hasSpecifics) {
      issues.push({
        type: 'generic_statement',
        message: 'Content is too generic - lacks specific examples, names, numbers',
        suggestion: 'Add real examples with names, dates, numbers, and specific details',
        severity: 'warning'
      });
    }

    return normalizedScore;
  }

  /**
   * Check if content has specific details (names, numbers, dates)
   */
  private hasSpecificDetails(content: string): boolean {
    // Check for numbers (years, percentages, statistics)
    const hasNumbers = /\b(?:\d{1,3}(?:,\d{3})*|\d+%|\d{4}|\$\d+|£\d+)\b/.test(content);

    // Check for proper names (capitalized words that aren't sentence starts)
    const properNouns = content.match(/(?<=[.!?]\s+)[A-Z][a-z]+\s+[A-Z][a-z]+|(?<=\s)[A-Z][a-z]+(?=\s+(?:told|said|mentioned|explained))/g);

    // Check for specific time references
    const hasTimeReferences = /\b(?:last\s+(?:month|year|week|Tuesday|January)|in\s+\d{4}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})\b/i.test(content);

    return hasNumbers || (properNouns && properNouns.length > 0) || hasTimeReferences;
  }

  /**
   * Generate summary text
   */
  private generateSummary(score: number, soundsHuman: boolean, metrics: AIDetectionResult['metrics']): string {
    if (soundsHuman && score >= 85) {
      return 'Content sounds authentically human with natural voice and personality.';
    }

    if (soundsHuman) {
      return 'Content sounds mostly human but could use more personality and specific examples.';
    }

    const issues = [];

    if (metrics.aiPhrasesFound > 3) {
      issues.push(`${metrics.aiPhrasesFound} AI clichés`);
    }

    if (metrics.formalTransitions > 2) {
      issues.push(`${metrics.formalTransitions} formal transitions`);
    }

    if (metrics.contractionRate < 0.01) {
      issues.push('no contractions');
    }

    if (metrics.sentenceLengthVariance < 0.3) {
      issues.push('uniform sentences');
    }

    if (metrics.personalityScore < 0.3) {
      issues.push('lacks personality');
    }

    if (issues.length > 0) {
      return `Content sounds AI-generated. Issues: ${issues.join(', ')}.`;
    }

    return 'Content may sound AI-generated - needs human voice and authenticity.';
  }

  /**
   * Get detailed recommendations for improvement
   */
  getRecommendations(result: AIDetectionResult): string[] {
    const recommendations: string[] = [];

    if (result.metrics.contractionRate < 0.02) {
      recommendations.push('Use more contractions (don\'t, can\'t, won\'t, it\'s, you\'re)');
    }

    if (result.metrics.sentenceLengthVariance < 0.3) {
      recommendations.push('Vary sentence length dramatically: Mix short punchy sentences. With longer, more complex sentences that build on ideas.');
    }

    if (result.metrics.personalityScore < 0.3) {
      recommendations.push('Add personality: Use "I" and "you", include personal anecdotes, show opinion');
    }

    if (result.metrics.aiPhrasesFound > 3) {
      recommendations.push('Remove AI clichés: Replace "delve," "robust," "comprehensive" with natural language');
    }

    if (result.metrics.formalTransitions > 2) {
      recommendations.push('Replace formal transitions (moreover, furthermore) with casual connectors (And, But, So, Look)');
    }

    if (recommendations.length === 0) {
      recommendations.push('Good human voice! Consider adding more specific examples and real-world details.');
    }

    return recommendations;
  }
}
