/**
 * Research Agent Types
 */

export interface ResearchQuery {
  claim: string;
  context: string;
  requiresStatistic?: boolean;
  requiresCitation?: boolean;
}

export interface ResearchResult {
  query: string;
  verified: boolean;
  statistic?: string;
  source?: string;
  sourceUrl?: string;
  sourceAuthority: 'high' | 'medium' | 'low';
  publicationDate?: string;
  citation: string;
  alternativeSources?: Array<{
    url: string;
    title: string;
    authority: 'high' | 'medium' | 'low';
  }>;
}

export interface FactCheckResult {
  claim: string;
  verified: boolean;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
  sources: Array<{
    url: string;
    title: string;
    excerpt: string;
  }>;
  recommendation: 'use' | 'modify' | 'remove';
  suggestedRevision?: string;
}

export interface ContentValidation {
  originalContent: string;
  claims: FactCheckResult[];
  statistics: ResearchResult[];
  overallVerified: boolean;
  issuesFound: string[];
  suggestedRevisions: string[];
}
