/**
 * Taxonomy Service for Publishing Agent
 *
 * Handles automatic tag generation and categorization for blog posts
 */

import natural from 'natural';

export interface TaxonomyResult {
  suggestedTags: string[];
  primaryCategory: string;
  secondaryCategories: string[];
  confidence: number;
}

export class TaxonomyService {
  // Predefined categories based on Craig's services
  private categories = {
    'executive-coaching': {
      keywords: ['coaching', 'executive', 'leadership development', 'c-suite', 'ceo', 'performance', 'goals', 'accountability'],
      weight: 1.0
    },
    'board-advisory': {
      keywords: ['board', 'director', 'governance', 'ned', 'non-executive', 'strategy', 'oversight', 'advisory'],
      weight: 1.0
    },
    'wellbeing': {
      keywords: ['wellbeing', 'wellness', 'mental health', 'burnout', 'stress', 'resilience', 'psychological safety'],
      weight: 1.0
    },
    'leadership': {
      keywords: ['leadership', 'leader', 'management', 'team', 'culture', 'communication', 'influence'],
      weight: 0.9
    },
    'organizational-development': {
      keywords: ['organization', 'transformation', 'change management', 'development', 'capability', 'talent'],
      weight: 0.8
    },
    'performance': {
      keywords: ['performance', 'productivity', 'efficiency', 'results', 'outcomes', 'roi', 'metrics'],
      weight: 0.7
    }
  };

  // Common tags pool (UK English spellings)
  private commonTags = [
    'Executive Coaching',
    'Leadership Development',
    'Board Advisory',
    'Organisational Wellbeing',
    'Workplace Wellbeing',
    'Mental Health',
    'Resilience',
    'C-Suite',
    'CEO',
    'Board of Directors',
    'Non-Executive Director',
    'Strategic Leadership',
    'Governance',
    'Performance Management',
    'Change Management',
    'Team Development',
    'Psychological Safety',
    'Work-Life Balance',
    'Burnout Prevention',
    'Corporate Culture'
  ];

  private tokenizer: any;
  private tfidf: any;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
  }

  /**
   * Analyse content and suggest tags and categories
   */
  async analyseTaxonomy(title: string, content: string, keywords?: string[]): Promise<TaxonomyResult> {
    console.log(`   🏷️  Analysing taxonomy...`);

    // Combine title and content for analysis
    const fullText = `${title} ${content}`.toLowerCase();

    // Extract key phrases
    const tokens = this.tokenizer.tokenize(fullText);

    // Add document to TF-IDF
    this.tfidf.addDocument(fullText);

    // Calculate category scores
    const categoryScores: { [key: string]: number } = {};

    for (const [category, config] of Object.entries(this.categories)) {
      let score = 0;
      for (const keyword of config.keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = fullText.match(regex);
        if (matches) {
          score += matches.length * config.weight;
        }
      }
      categoryScores[category] = score;
    }

    // Sort categories by score
    const sortedCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0);

    const primaryCategory = sortedCategories[0]?.[0] || 'leadership';
    const secondaryCategories = sortedCategories
      .slice(1, 3)
      .map(([cat]) => cat);

    const confidence = sortedCategories[0]?.[1] || 0;

    // Generate suggested tags
    const suggestedTags = this.generateTags(title, content, primaryCategory, keywords);

    console.log(`   ✅ Primary category: ${primaryCategory}`);
    console.log(`   ✅ Suggested tags: ${suggestedTags.join(', ')}`);

    return {
      suggestedTags,
      primaryCategory,
      secondaryCategories,
      confidence
    };
  }

  /**
   * Generate relevant tags based on content
   */
  private generateTags(
    title: string,
    content: string,
    primaryCategory: string,
    providedKeywords?: string[]
  ): string[] {
    const tags = new Set<string>();

    // Add tags based on primary category
    const categoryTagMap: { [key: string]: string[] } = {
      'executive-coaching': ['Executive Coaching', 'Leadership Development', 'C-Suite'],
      'board-advisory': ['Board Advisory', 'Non-Executive Director', 'Governance'],
      'wellbeing': ['Organisational Wellbeing', 'Workplace Wellbeing', 'Mental Health'],
      'leadership': ['Leadership Development', 'Strategic Leadership'],
      'organizational-development': ['Change Management', 'Team Development'],
      'performance': ['Performance Management', 'Productivity']
    };

    // Add category-specific tags
    const categoryTags = categoryTagMap[primaryCategory] || [];
    categoryTags.forEach(tag => tags.add(tag));

    // Extract tags from provided keywords (capitalise properly)
    if (providedKeywords) {
      providedKeywords.forEach(keyword => {
        const capitalised = this.capitaliseTag(keyword);
        if (this.commonTags.includes(capitalised)) {
          tags.add(capitalised);
        }
      });
    }

    // Find matching common tags in content
    const lowerContent = `${title} ${content}`.toLowerCase();
    this.commonTags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      if (lowerContent.includes(lowerTag)) {
        tags.add(tag);
      }
    });

    // Limit to 5-7 most relevant tags
    const finalTags = Array.from(tags).slice(0, 7);

    return finalTags;
  }

  /**
   * Capitalise tag properly (UK English)
   */
  private capitaliseTag(tag: string): string {
    // Special cases for acronyms and proper capitalisation
    const specialCases: { [key: string]: string } = {
      'ceo': 'CEO',
      'c-suite': 'C-Suite',
      'ned': 'Non-Executive Director',
      'roi': 'ROI',
      'uk': 'UK'
    };

    const lower = tag.toLowerCase();

    if (specialCases[lower]) {
      return specialCases[lower];
    }

    // Standard title case
    return tag
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Validate tags against common tag pool
   */
  validateTags(tags: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    tags.forEach(tag => {
      if (this.commonTags.includes(tag)) {
        valid.push(tag);
      } else {
        invalid.push(tag);
      }
    });

    return { valid, invalid };
  }

  /**
   * Get all available categories
   */
  getCategories(): string[] {
    return Object.keys(this.categories);
  }

  /**
   * Get all common tags
   */
  getCommonTags(): string[] {
    return this.commonTags;
  }

  /**
   * Add custom tag to common tags pool
   */
  addCommonTag(tag: string): void {
    if (!this.commonTags.includes(tag)) {
      this.commonTags.push(tag);
      console.log(`   ✅ Added new tag: ${tag}`);
    }
  }

  /**
   * Get category-specific tags
   */
  getCategoryTags(category: string): string[] {
    const categoryTagMap: { [key: string]: string[] } = {
      'executive-coaching': ['Executive Coaching', 'Leadership Development', 'C-Suite', 'Performance Management'],
      'board-advisory': ['Board Advisory', 'Non-Executive Director', 'Governance', 'Strategic Leadership'],
      'wellbeing': ['Organisational Wellbeing', 'Workplace Wellbeing', 'Mental Health', 'Resilience', 'Burnout Prevention'],
      'leadership': ['Leadership Development', 'Strategic Leadership', 'Team Development', 'Corporate Culture'],
      'organizational-development': ['Change Management', 'Team Development', 'Organisational Development'],
      'performance': ['Performance Management', 'Productivity', 'Efficiency']
    };

    return categoryTagMap[category] || [];
  }
}
