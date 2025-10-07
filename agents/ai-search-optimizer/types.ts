/**
 * AI Search Optimization Agent - Type Definitions
 *
 * Optimizes blog content for AI search engines (ChatGPT, Perplexity, Gemini)
 * by adding Schema.org markup, optimized metadata, and structured citations.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags?: string[];
  categories?: string[];
  heroImage?: string;
}

export interface Author {
  name: string;
  jobTitle: string;
  credentials: Credential[];
  bio: string;
  url: string;
  sameAs: string[]; // LinkedIn, Twitter, etc.
}

export interface Credential {
  type: 'Fellowship' | 'Ambassadorship' | 'Degree' | 'Certification';
  name: string;
  issuer?: string;
  category?: string;
}

export interface Citation {
  authors?: string[];
  title: string;
  source: string;
  year: number;
  url?: string;
  accessDate?: string;
}

export interface SchemaMarkup {
  article: object;
  person: object;
  organization: object;
}

export interface MetaTags {
  title: string;
  description: string;
  author: string;
  keywords: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    image?: string;
  };
}

export interface AITrustScore {
  overall: number; // 0-1 weighted score
  breakdown: {
    authority: number;      // 0-1
    evidence: number;       // 0-1
    recency: number;        // 0-1
    objectivity: number;    // 0-1
    quality: number;        // 0-1
    reputation: number;     // 0-1
  };
  recommendations: string[];
}

export interface OptimizationResult {
  slug: string;
  aiTrustScore: AITrustScore;
  schema: SchemaMarkup;
  metaTags: MetaTags;
  citations: Citation[];
  optimizedFrontmatter: Record<string, any>;
  astroComponent: string; // Full Astro component with metadata
}

export interface OptimizationConfig {
  baseUrl: string;
  organizationName: string;
  organizationUrl: string;
  organizationLogo: string;
  author: Author;
  targetAITrustScore: number; // Minimum acceptable score (e.g., 0.85)
}
