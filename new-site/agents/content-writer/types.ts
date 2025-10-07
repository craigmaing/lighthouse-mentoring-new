/**
 * Content Writer Agent Types
 */

export interface BlogPostBrief {
  title: string;
  targetKeywords: string[];
  searchVolume: number;
  intent: string;
  priority: 'high' | 'medium' | 'low';
}

export interface WritingGuidelines {
  avoidPhrases: string[];
  useTechniques: string[];
  tonePreferences: string[];
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  keywords: string[];
  content: string;
  wordCount: number;
  imageRequirements: ImageRequirement[];
}

export interface ImageRequirement {
  position: 'hero' | 'section' | 'inline';
  searchQuery: string;
  altText: string;
  context: string;
}

export interface ContentWriterConfig {
  maxPosts: number;
  minWordCount: number;
  maxWordCount: number;
  tone: 'friendly-professional' | 'formal' | 'casual';
  includeStats: boolean;
  includeCTA: boolean;
}
