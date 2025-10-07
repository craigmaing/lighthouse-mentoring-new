/**
 * Content Deduplication Checker Agent
 *
 * Validates blog post recommendations against existing content
 * Prevents duplicate content generation and SEO cannibalization
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface BlogPostRecommendation {
  title: string;
  keywords: string[];
  intent: string;
  searchVolume?: number;
  cpc?: number;
}

interface ExistingBlogPost {
  filepath: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
}

interface SimilarityResult {
  maxScore: number;
  match: ExistingBlogPost | null;
  reason: string;
}

interface DuplicateReport {
  recommendation: BlogPostRecommendation;
  existingPost: ExistingBlogPost;
  score: number;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
}

interface DeduplicationResult {
  unique: BlogPostRecommendation[];
  duplicates: DuplicateReport[];
}

export class ContentDeduplicationChecker {
  private existingPosts: ExistingBlogPost[] = [];

  /**
   * Load all existing blog posts from content directory
   */
  async loadExistingPosts(contentDir: string): Promise<void> {
    console.log(`📖 Loading existing blog posts from ${contentDir}...\n`);

    try {
      const files = await fs.readdir(contentDir);
      const mdFiles = files.filter(f => f.endsWith('.md'));

      for (const file of mdFiles) {
        const filepath = path.join(contentDir, file);
        const content = await fs.readFile(filepath, 'utf-8');

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) continue;

        const frontmatter = frontmatterMatch[1];

        // Parse title
        const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?\n/);
        const title = titleMatch ? titleMatch[1].replace(/^["']|["']$/g, '') : '';

        // Parse description
        const descMatch = frontmatter.match(/description:\s*["']?(.+?)["']?\n/);
        const description = descMatch ? descMatch[1].replace(/^["']|["']$/g, '') : '';

        // Parse keywords/tags
        const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
        const keywords = tagsMatch
          ? tagsMatch[1].split(',').map(k => k.trim().replace(/["']/g, ''))
          : [];

        // Parse category
        const catMatch = frontmatter.match(/category:\s*["']?(.+?)["']?\n/);
        const category = catMatch ? catMatch[1].replace(/^["']|["']$/g, '') : '';

        this.existingPosts.push({
          filepath,
          title,
          description,
          keywords,
          category
        });
      }

      console.log(`✅ Loaded ${this.existingPosts.length} existing blog posts\n`);

    } catch (error) {
      console.error('❌ Error loading existing posts:', error);
      throw error;
    }
  }

  /**
   * Check recommendations for duplicates
   */
  async checkRecommendations(
    recommendations: BlogPostRecommendation[]
  ): Promise<DeduplicationResult> {
    console.log(`🔍 Checking ${recommendations.length} recommendations for duplicates...\n`);

    const unique: BlogPostRecommendation[] = [];
    const duplicates: DuplicateReport[] = [];

    for (const rec of recommendations) {
      const similarity = this.calculateSimilarity(rec, this.existingPosts);

      if (similarity.maxScore > 0.70) {
        duplicates.push({
          recommendation: rec,
          existingPost: similarity.match!,
          score: similarity.maxScore,
          severity: this.getSeverity(similarity.maxScore),
          reason: similarity.reason
        });

        console.log(`   ⚠️  DUPLICATE: "${rec.title}"`);
        console.log(`      Similar to: "${similarity.match?.title}"`);
        console.log(`      Match: ${(similarity.maxScore * 100).toFixed(0)}% (${this.getSeverity(similarity.maxScore)})`);
        console.log(`      Reason: ${similarity.reason}\n`);

      } else {
        unique.push(rec);
        console.log(`   ✅ UNIQUE: "${rec.title}"`);
      }
    }

    console.log(`\n📊 Deduplication Summary:`);
    console.log(`   ✅ Unique posts: ${unique.length}`);
    console.log(`   ⚠️  Duplicates filtered: ${duplicates.length}\n`);

    return { unique, duplicates };
  }

  /**
   * Calculate similarity between recommendation and existing posts
   */
  private calculateSimilarity(
    recommendation: BlogPostRecommendation,
    existing: ExistingBlogPost[]
  ): SimilarityResult {
    let maxScore = 0;
    let bestMatch: ExistingBlogPost | null = null;
    let reason = '';

    for (const post of existing) {
      // Title similarity (normalized Levenshtein-like comparison)
      const titleScore = this.titleSimilarity(
        recommendation.title.toLowerCase(),
        post.title.toLowerCase()
      );

      // Keyword overlap (Jaccard similarity)
      const keywordScore = this.keywordSimilarity(
        recommendation.keywords,
        post.keywords
      );

      // Combined score (weighted: 70% title, 30% keywords)
      const combinedScore = (titleScore * 0.7) + (keywordScore * 0.3);

      if (combinedScore > maxScore) {
        maxScore = combinedScore;
        bestMatch = post;

        if (titleScore > 0.8) {
          reason = `Near-identical title (${(titleScore * 100).toFixed(0)}% match)`;
        } else if (keywordScore > 0.7) {
          reason = `High keyword overlap (${(keywordScore * 100).toFixed(0)}% match)`;
        } else {
          reason = `Similar topic (${(combinedScore * 100).toFixed(0)}% combined match)`;
        }
      }
    }

    return { maxScore, match: bestMatch, reason };
  }

  /**
   * Calculate title similarity (simple token-based overlap)
   */
  private titleSimilarity(title1: string, title2: string): number {
    // Normalize and tokenize
    const tokens1 = this.tokenize(title1);
    const tokens2 = this.tokenize(title2);

    if (tokens1.length === 0 || tokens2.length === 0) return 0;

    // Calculate intersection
    const intersection = tokens1.filter(t => tokens2.includes(t));
    const union = [...new Set([...tokens1, ...tokens2])];

    // Jaccard similarity
    return intersection.length / union.length;
  }

  /**
   * Calculate keyword similarity (Jaccard index)
   */
  private keywordSimilarity(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;

    // Normalize keywords
    const k1 = keywords1.map(k => k.toLowerCase().trim());
    const k2 = keywords2.map(k => k.toLowerCase().trim());

    // Calculate intersection
    const intersection = k1.filter(k => k2.includes(k));
    const union = [...new Set([...k1, ...k2])];

    return intersection.length / union.length;
  }

  /**
   * Tokenize title (remove common words, split)
   */
  private tokenize(text: string): string[] {
    const stopWords = [
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'is', 'are', 'was', 'were', 'what', 'how', 'why', 'when',
      'where', 'vs', 'versus', ':'
    ];

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .split(/\s+/)
      .filter(token => token.length > 2 && !stopWords.includes(token));
  }

  /**
   * Get severity level based on similarity score
   */
  private getSeverity(score: number): 'HIGH' | 'MEDIUM' | 'LOW' {
    if (score > 0.80) return 'HIGH';
    if (score > 0.70) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Export deduplication report
   */
  async exportReport(result: DeduplicationResult, outputPath: string): Promise<void> {
    const report = {
      generatedAt: new Date().toISOString(),
      totalRecommendations: result.unique.length + result.duplicates.length,
      uniquePosts: result.unique.length,
      duplicatesFiltered: result.duplicates.length,
      duplicates: result.duplicates.map(d => ({
        recommendedTitle: d.recommendation.title,
        existingTitle: d.existingPost.title,
        existingFile: path.basename(d.existingPost.filepath),
        similarityScore: (d.score * 100).toFixed(1) + '%',
        severity: d.severity,
        reason: d.reason,
        keywords: {
          recommended: d.recommendation.keywords,
          existing: d.existingPost.keywords
        }
      })),
      uniqueRecommendations: result.unique.map(u => ({
        title: u.title,
        keywords: u.keywords,
        intent: u.intent
      }))
    };

    await fs.writeFile(outputPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`📄 Deduplication report saved: ${path.basename(outputPath)}\n`);
  }
}
