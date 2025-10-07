/**
 * Data Analyst Agent - Type Definitions
 */

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: string;
  competitionLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
  intent: string;
  difficulty: number;
  trends?: Array<{ month: string; searchVolume: number }>;
}

export interface CompetitorData {
  domain: string;
  title: string;
  description: string;
  url: string;
  rank: number;
  domainRank: number;
  backlinks: number;
}

export interface Opportunity {
  type: 'low-competition' | 'long-tail' | 'high-value';
  keyword: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTraffic?: number;
}

export interface ServiceAnalysis {
  service: string;
  totalKeywords: number;
  totalCompetitors: number;
  totalOpportunities: number;
  highPriorityOpportunities: number;
  topKeywords: KeywordData[];
  mainCompetitors: CompetitorData[];
  keyOpportunities: Opportunity[];
}

export interface StrategicInsight {
  category: 'high-volume' | 'low-competition' | 'high-value-cpc' | 'content-gap' | 'competitor-weakness';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  actionItems: string[];
  estimatedImpact?: string;
}

export interface AnalysisReport {
  summary: {
    totalServices: number;
    totalKeywords: number;
    totalOpportunities: number;
    highPriorityCount: number;
    avgSearchVolume: number;
    avgCPC: number;
  };
  serviceBreakdown: ServiceAnalysis[];
  strategicInsights: StrategicInsight[];
  priorityRecommendations: string[];
  contentStrategy: {
    topicClusters: Array<{ topic: string; keywords: string[] }>;
    blogPostIdeas: Array<{ title: string; keywords: string[]; intent: string }>;
  };
}
