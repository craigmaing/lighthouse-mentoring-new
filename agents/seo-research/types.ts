/**
 * SEO Research Agent - Type Definitions
 *
 * Defines types for SEO research, keyword analysis, and competitor data
 */

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: string;
  competitionLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  intent?: 'informational' | 'navigational' | 'commercial' | 'transactional';
  difficulty?: number;
  trends?: MonthlyTrend[];
}

export interface MonthlyTrend {
  month: string;
  searchVolume: number;
}

export interface CompetitorData {
  domain: string;
  title: string;
  description: string;
  url: string;
  rank: number;
  domainRank?: number;
  backlinks?: number;
}

export interface KeywordResearchResult {
  primaryKeyword: string;
  relatedKeywords: KeywordData[];
  competitors: CompetitorData[];
  opportunities: Opportunity[];
  recommendations: string[];
}

export interface Opportunity {
  type: 'low-competition' | 'high-volume' | 'long-tail' | 'local' | 'trending';
  keyword: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTraffic?: number;
}

export interface ServiceKeywordMap {
  service: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longtailKeywords: string[];
  localKeywords: string[];
  competitorKeywords: string[];
}

export interface SEOResearchConfig {
  services: string[];
  location: string;
  languageCode: string;
  maxKeywordsPerService: number;
  includeCompetitorAnalysis: boolean;
  includeTrends: boolean;
}

export interface AgentState {
  currentService?: string;
  keywordsAnalyzed: number;
  competitorsAnalyzed: number;
  errors: string[];
  startTime: Date;
  results: KeywordResearchResult[];
}
