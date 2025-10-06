/**
 * DataForSEO API Integration
 *
 * Direct REST API calls to DataForSEO Labs API
 * Uses credentials from .mcp.json for authentication
 */

import type { KeywordData, CompetitorData } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * DataForSEO Tool Wrapper
 *
 * Makes direct REST API calls to DataForSEO Labs API
 */
export class DataForSEOTools {
  private location: string;
  private languageCode: string;
  private username: string;
  private password: string;
  private baseUrl: string = 'https://api.dataforseo.com/v3';

  constructor(location: string = 'United Kingdom', languageCode: string = 'en') {
    this.location = location;
    this.languageCode = languageCode;
    this.username = '';
    this.password = '';
  }

  /**
   * Initialize with credentials from .mcp.json
   */
  async initialize(): Promise<void> {
    try {
      const mcpConfigPath = path.join(process.cwd(), '.mcp.json');
      const configContent = await fs.readFile(mcpConfigPath, 'utf-8');
      const config = JSON.parse(configContent);

      const dataforseo = config.mcpServers?.dataforseo;
      if (dataforseo?.env) {
        this.username = dataforseo.env.DATAFORSEO_USERNAME || '';
        this.password = dataforseo.env.DATAFORSEO_PASSWORD || '';
      }
    } catch (error) {
      console.warn('⚠️  Could not load DataForSEO credentials from .mcp.json');
    }
  }

  /**
   * Make authenticated request to DataForSEO API
   */
  private async makeRequest(endpoint: string, data: any): Promise<any> {
    const auth = Buffer.from(`${this.username}:${this.password}`).toString('base64');

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`DataForSEO API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.status_code !== 20000) {
      throw new Error(`DataForSEO API error: ${result.status_message}`);
    }

    return result;
  }

  /**
   * Get keyword overview data
   *
   * Calls: /v3/dataforseo_labs/google/keyword_overview/live
   */
  async getKeywordOverview(keywords: string[]): Promise<KeywordData[]> {
    console.log(`    📊 Fetching keyword overview for ${keywords.length} keywords...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/keyword_overview/live', [{
        keywords: keywords,
        location_name: this.location,
        language_code: this.languageCode,
        include_clickstream_data: false
      }]);

      const results: KeywordData[] = [];

      // DataForSEO API response structure: tasks[0].result[0].items[]
      const taskResult = result.tasks?.[0]?.result?.[0];
      const keywordItems = taskResult?.items || result.items || [];

      for (const item of keywordItems) {
        // Only include keywords with search volume data
        if (!item.keyword || !item.keyword_info?.search_volume) {
          continue;
        }

        const kwData: KeywordData = {
          keyword: item.keyword,
          searchVolume: item.keyword_info.search_volume,
          cpc: item.keyword_info.cpc || 0,
          competition: item.keyword_info.competition || 'UNKNOWN',
          competitionLevel: item.keyword_info.competition_level || 'LOW',
          intent: item.search_intent_info?.main_intent || 'informational',
          difficulty: item.keyword_properties?.keyword_difficulty || 0,
          trends: item.keyword_info.monthly_searches
            ? Object.entries(item.keyword_info.monthly_searches).map(([month, volume]) => ({
                month,
                searchVolume: volume as number
              }))
            : undefined
        };
        results.push(kwData);
      }

      return results;
    } catch (error) {
      console.error(`    ❌ Keyword overview failed:`, error);
      return [];
    }
  }

  /**
   * Get search intent for keywords
   *
   * Calls: /v3/dataforseo_labs/google/search_intent/live
   */
  async getSearchIntent(keywords: string[]): Promise<Map<string, string>> {
    console.log(`    🎯 Analyzing search intent for ${keywords.length} keywords...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/search_intent/live', [{
        keywords: keywords,
        language_code: this.languageCode
      }]);

      const intentMap = new Map<string, string>();

      const items = result.tasks?.[0]?.result || [];

      for (const item of items) {
        if (item.keyword && item.keyword_intent) {
          // Get the primary intent (highest probability)
          const primaryIntent = item.keyword_intent.primary_intent || 'informational';
          intentMap.set(item.keyword, primaryIntent);
        }
      }

      return intentMap;
    } catch (error) {
      console.error(`    ❌ Search intent analysis failed:`, error);
      const intentMap = new Map<string, string>();
      keywords.forEach(kw => intentMap.set(kw, 'informational'));
      return intentMap;
    }
  }

  /**
   * Get keyword ideas/suggestions
   *
   * Calls: /v3/dataforseo_labs/google/keyword_ideas/live
   */
  async getKeywordIdeas(seedKeywords: string[], limit: number = 100): Promise<string[]> {
    console.log(`    💡 Generating keyword ideas from ${seedKeywords.length} seed keywords...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/keyword_ideas/live', [{
        keywords: seedKeywords,
        location_name: this.location,
        language_code: this.languageCode,
        include_clickstream_data: false,
        limit: limit
      }]);

      const ideas: string[] = [];
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.keyword) {
          ideas.push(item.keyword);
        }
      }

      return ideas;
    } catch (error) {
      console.error(`    ❌ Keyword ideas failed:`, error);
      return [];
    }
  }

  /**
   * Get related keywords
   *
   * Calls: /v3/dataforseo_labs/google/related_keywords/live
   */
  async getRelatedKeywords(keyword: string, depth: number = 1, limit: number = 100): Promise<string[]> {
    console.log(`    🔗 Finding related keywords for "${keyword}" (depth: ${depth})...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/related_keywords/live', [{
        keyword: keyword,
        location_name: this.location,
        language_code: this.languageCode,
        depth: depth,
        limit: limit,
        include_clickstream_data: false
      }]);

      const related: string[] = [];
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.keyword_data?.keyword) {
          related.push(item.keyword_data.keyword);
        }
      }

      return related;
    } catch (error) {
      console.error(`    ❌ Related keywords failed:`, error);
      return [];
    }
  }

  /**
   * Get SERP results for keyword
   *
   * Calls: /v3/serp/google/organic/live/advanced
   */
  async getSERPResults(keyword: string, maxResults: number = 10): Promise<CompetitorData[]> {
    console.log(`    🔍 Fetching SERP results for "${keyword}"...`);

    try {
      const result = await this.makeRequest('/serp/google/organic/live/advanced', [{
        keyword: keyword,
        location_name: this.location,
        language_code: this.languageCode,
        device: 'desktop',
        depth: maxResults
      }]);

      const competitors: CompetitorData[] = [];

      // DataForSEO SERP API returns tasks[0].result[0].items
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.type === 'organic') {
          competitors.push({
            domain: item.domain || '',
            title: item.title || '',
            description: item.description || '',
            url: item.url || '',
            rank: item.rank_group || 0,
            domainRank: item.domain_rank || 0,
            backlinks: 0  // Not provided in SERP results
          });
        }
      }

      return competitors;
    } catch (error) {
      console.error(`    ❌ SERP results failed:`, error);
      return [];
    }
  }

  /**
   * Get ranked keywords for a domain
   *
   * Calls: /v3/dataforseo_labs/google/ranked_keywords/live
   */
  async getRankedKeywords(domain: string, limit: number = 100): Promise<KeywordData[]> {
    console.log(`    📈 Fetching ranked keywords for ${domain}...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/ranked_keywords/live', [{
        target: domain,
        location_name: this.location,
        language_code: this.languageCode,
        limit: limit,
        include_clickstream_data: false
      }]);

      const keywords: KeywordData[] = [];
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.keyword_data?.keyword_info) {
          const kwInfo = item.keyword_data.keyword_info;
          keywords.push({
            keyword: item.keyword_data.keyword || '',
            searchVolume: kwInfo.search_volume || 0,
            cpc: kwInfo.cpc || 0,
            competition: kwInfo.competition || 'UNKNOWN',
            competitionLevel: kwInfo.competition_level || 'LOW',
            intent: item.keyword_data.search_intent_info?.main_intent || 'informational',
            difficulty: item.keyword_data.keyword_properties?.keyword_difficulty || 0
          });
        }
      }

      return keywords;
    } catch (error) {
      console.error(`    ❌ Ranked keywords failed:`, error);
      return [];
    }
  }

  /**
   * Get domain competitors
   *
   * Calls: /v3/dataforseo_labs/google/competitors_domain/live
   */
  async getDomainCompetitors(domain: string, limit: number = 20): Promise<string[]> {
    console.log(`    🏢 Finding competitors for ${domain}...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/competitors_domain/live', [{
        target: domain,
        location_name: this.location,
        language_code: this.languageCode,
        limit: limit,
        exclude_top_domains: true,
        ignore_synonyms: true,
        include_clickstream_data: false
      }]);

      const competitors: string[] = [];
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.domain) {
          competitors.push(item.domain);
        }
      }

      return competitors;
    } catch (error) {
      console.error(`    ❌ Domain competitors failed:`, error);
      return [];
    }
  }

  /**
   * Batch keyword research
   *
   * Efficiently processes multiple keywords using batch APIs
   */
  async batchKeywordResearch(keywords: string[]): Promise<KeywordData[]> {
    console.log(`    ⚡ Batch processing ${keywords.length} keywords...`);

    // Split into batches of 100 (DataForSEO limit)
    const batchSize = 100;
    const batches: string[][] = [];

    for (let i = 0; i < keywords.length; i += batchSize) {
      batches.push(keywords.slice(i, i + batchSize));
    }

    const allResults: KeywordData[] = [];

    for (const batch of batches) {
      const results = await this.getKeywordOverview(batch);
      allResults.push(...results);
    }

    return allResults;
  }

  /**
   * Get keyword difficulty scores
   *
   * Calls: /v3/dataforseo_labs/google/bulk_keyword_difficulty/live
   */
  async getKeywordDifficulty(keywords: string[]): Promise<Map<string, number>> {
    console.log(`    💪 Calculating keyword difficulty for ${keywords.length} keywords...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/bulk_keyword_difficulty/live', [{
        keywords: keywords,
        location_name: this.location,
        language_code: this.languageCode
      }]);

      const difficultyMap = new Map<string, number>();
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.keyword && typeof item.keyword_difficulty === 'number') {
          difficultyMap.set(item.keyword, item.keyword_difficulty);
        }
      }

      return difficultyMap;
    } catch (error) {
      console.error(`    ❌ Keyword difficulty failed:`, error);
      const difficultyMap = new Map<string, number>();
      keywords.forEach(kw => difficultyMap.set(kw, 0));
      return difficultyMap;
    }
  }

  /**
   * Get historical keyword data
   *
   * Calls: /v3/dataforseo_labs/google/historical_keyword_data/live
   */
  async getHistoricalData(keywords: string[]): Promise<KeywordData[]> {
    console.log(`    📊 Fetching historical data for ${keywords.length} keywords...`);

    try {
      const result = await this.makeRequest('/dataforseo_labs/google/historical_keyword_data/live', [{
        keywords: keywords,
        location_name: this.location,
        language_code: this.languageCode
      }]);

      const historicalData: KeywordData[] = [];
      const items = result.tasks?.[0]?.result?.[0]?.items || [];

      for (const item of items) {
        if (item.keyword && item.keyword_info) {
          const kwInfo = item.keyword_info;
          historicalData.push({
            keyword: item.keyword,
            searchVolume: kwInfo.search_volume || 0,
            cpc: kwInfo.cpc || 0,
            competition: kwInfo.competition || 'UNKNOWN',
            competitionLevel: kwInfo.competition_level || 'LOW',
            intent: item.search_intent_info?.main_intent || 'informational',
            difficulty: item.keyword_properties?.keyword_difficulty || 0,
            trends: kwInfo.monthly_searches
              ? Object.entries(kwInfo.monthly_searches).map(([month, volume]) => ({
                  month,
                  searchVolume: volume as number
                }))
              : undefined
          });
        }
      }

      return historicalData;
    } catch (error) {
      console.error(`    ❌ Historical data failed:`, error);
      return [];
    }
  }
}

/**
 * Helper function to format DataForSEO API responses
 */
export function formatKeywordData(apiResponse: any): KeywordData {
  return {
    keyword: apiResponse.keyword || '',
    searchVolume: apiResponse.search_volume || 0,
    cpc: apiResponse.cpc || 0,
    competition: apiResponse.competition || 'UNKNOWN',
    competitionLevel: apiResponse.competition_level || 'LOW',
    intent: apiResponse.intent || 'informational',
    difficulty: apiResponse.keyword_difficulty || 0
  };
}

/**
 * Helper function to format SERP competitor data
 */
export function formatCompetitorData(apiResponse: any): CompetitorData {
  return {
    domain: apiResponse.domain || '',
    title: apiResponse.title || '',
    description: apiResponse.description || '',
    url: apiResponse.url || '',
    rank: apiResponse.rank_group || 0,
    domainRank: apiResponse.domain_rank || 0,
    backlinks: apiResponse.backlinks || 0
  };
}
