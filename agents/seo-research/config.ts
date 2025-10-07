/**
 * SEO Research Agent - Configuration
 *
 * Configuration for Craig Fearn's Lighthouse Mentoring SEO research
 */

import type { SEOResearchConfig } from './types';

export const LIGHTHOUSE_SERVICES = [
  'board advisory',
  'non-executive director',
  'executive coaching',
  'organizational wellbeing',
  'wellbeing audit',
  'wellbeing governance',
  'leadership coaching',
  'business mentoring',
  'strategic consulting'
];

export const SEO_CONFIG: SEOResearchConfig = {
  services: LIGHTHOUSE_SERVICES,
  location: 'United States', // Primary market for DataForSEO (can be changed per research run)
  languageCode: 'en',
  maxKeywordsPerService: 50,
  includeCompetitorAnalysis: true,
  includeTrends: true
};

// Craig works worldwide - target all major English-speaking markets
export const TARGET_MARKETS = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Ireland', code: 'IE' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Singapore', code: 'SG' }
];

// Target audience keywords to combine with services
export const AUDIENCE_MODIFIERS = [
  'for CEOs',
  'for executives',
  'for boards',
  'for senior leaders',
  'for C-suite',
  'for directors',
  'for founders',
  'B2B',
  'corporate',
  'professional',
  'international',
  'global'
];

// Geographic modifiers - worldwide markets
export const GEO_MODIFIERS = [
  // UK
  'UK',
  'London',
  'United Kingdom',
  'British',
  'England',
  'South West',
  // US
  'USA',
  'United States',
  'New York',
  'California',
  'San Francisco',
  'Chicago',
  'Boston',
  // Other markets
  'Canada',
  'Toronto',
  'Australia',
  'Sydney',
  'Melbourne',
  'Singapore',
  'Ireland',
  'Dublin',
  'New Zealand',
  'Auckland',
  // Global
  'international',
  'global',
  'worldwide'
];

// Intent modifiers
export const INTENT_MODIFIERS = {
  commercial: ['best', 'top', 'professional', 'services', 'consultant'],
  transactional: ['hire', 'book', 'cost', 'pricing', 'rates'],
  informational: ['what is', 'how to', 'guide', 'benefits', 'process']
};

// Competitor domains to analyze
export const COMPETITOR_DOMAINS = [
  'thebcfgroup.co.uk',
  'executivecoachingassociates.co.uk',
  'tavistockconsulting.co.uk',
  'businesscoaching.co.uk',
  'strategicgoal.co.uk',
  'cambridgemc.com',
  'dcrpartners.co.uk'
];

// DataForSEO API settings
export const DATAFORSEO_CONFIG = {
  defaultDepth: 10,
  maxCrawlPages: 1,
  searchEngine: 'google',
  device: 'desktop'
};
