/**
 * QA Agent Types
 */

export interface SEOCheck {
  passed: boolean;
  score: number;
  issues: string[];
  recommendations: string[];
  checks: {
    titleTag: boolean;
    metaDescription: boolean;
    headingHierarchy: boolean;
    keywordInH1: boolean;
    keywordInFirstParagraph: boolean;
    internalLinks: boolean;
    externalLinks: boolean;
    imageAltText: boolean;
    schemaMarkup: boolean;
    urlSlug: boolean;
  };
}

export interface ReadabilityCheck {
  passed: boolean;
  score: number;
  fleschScore?: number;
  avgSentenceLength: number;
  avgWordLength: number;
  issues: string[];
  recommendations: string[];
}

export interface RelevanceCheck {
  passed: boolean;
  score: number;
  topicAlignment: boolean;
  keywordRelevance: boolean;
  audienceMatch: boolean;
  issues: string[];
}

export interface InterestCheck {
  passed: boolean;
  score: number;
  hasStories: boolean;
  hasExamples: boolean;
  hasData: boolean;
  hasVisuals: boolean;
  conversationalTone: boolean;
  issues: string[];
}

export interface ImageCheck {
  passed: boolean;
  totalImages: number;
  heroImage: boolean;
  sectionImages: number;
  allHaveAltText: boolean;
  allOptimized: boolean;
  issues: string[];
}

export interface PerformanceCheck {
  passed: boolean;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics?: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
  };
  issues: string[];
  recommendations: string[];
}

export interface GrammarCheck {
  passed: boolean;
  score: number;
  totalIssues: number;
  errors: number;
  warnings: number;
  issues: {
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning';
    source: 'spell' | 'grammar' | 'style';
    suggestion?: string;
  }[];
  summary: string;
}

export interface AIDetectionCheck {
  passed: boolean;
  score: number;
  soundsHuman: boolean;
  issues: {
    type: string;
    message: string;
    suggestion?: string;
    severity: 'warning' | 'error';
  }[];
  metrics: {
    contractionRate: number;
    sentenceLengthVariance: number;
    aiPhrasesFound: number;
    formalTransitions: number;
    personalityScore: number;
  };
  summary: string;
}

export interface QAReport {
  timestamp: string;
  postSlug: string;
  overallPassed: boolean;
  overallScore: number;
  seo: SEOCheck;
  readability: ReadabilityCheck;
  relevance: RelevanceCheck;
  interest: InterestCheck;
  images: ImageCheck;
  grammar: GrammarCheck;
  aiDetection: AIDetectionCheck;
  performance?: PerformanceCheck;
  criticalIssues: string[];
  warnings: string[];
  recommendations: string[];
  readyToPublish: boolean;
}
