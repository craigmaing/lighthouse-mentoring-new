/**
 * Verified Claims Database
 *
 * Caches verified statistics and claims to avoid re-research
 * Ensures consistency across all content
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface VerifiedClaim {
  claim: string;
  verified: true;
  source: string;
  sourceUrl: string;
  citation: string;
  dateVerified: string;
  verifiedBy: string;
  authority: 'high' | 'medium' | 'low';
  category: string[];
  notes?: string;
}

export class VerifiedClaimsDatabase {
  private dbPath: string;
  private claims: VerifiedClaim[] = [];

  constructor(dbPath?: string) {
    this.dbPath = dbPath || path.join(process.cwd(), 'agents', 'research-agent', 'verified-claims.json');
  }

  /**
   * Load verified claims from database
   */
  async load(): Promise<void> {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      const parsed = JSON.parse(data);
      this.claims = parsed.claims || [];
      console.log(`   ✅ Loaded ${this.claims.length} verified claims from database`);
    } catch (error) {
      console.log(`   ℹ️  No existing verified claims database found, starting fresh`);
      this.claims = [];
    }
  }

  /**
   * Save verified claims to database
   */
  async save(): Promise<void> {
    const data = {
      lastUpdated: new Date().toISOString(),
      totalClaims: this.claims.length,
      claims: this.claims
    };

    await fs.mkdir(path.dirname(this.dbPath), { recursive: true });
    await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`   ✅ Saved ${this.claims.length} verified claims to database`);
  }

  /**
   * Search for a verified claim
   */
  findClaim(query: string): VerifiedClaim | null {
    const normalizedQuery = this.normalizeClaim(query);

    // Exact match
    const exactMatch = this.claims.find(c =>
      this.normalizeClaim(c.claim) === normalizedQuery
    );

    if (exactMatch) {
      console.log(`   🎯 Found exact match in database`);
      return exactMatch;
    }

    // Partial match (contains key numbers/percentages)
    const numericMatch = query.match(/\d+\.?\d*[%x]/g);
    if (numericMatch) {
      const partialMatch = this.claims.find(c => {
        const claimNums = c.claim.match(/\d+\.?\d*[%x]/g);
        return claimNums && numericMatch.some(num => claimNums.includes(num));
      });

      if (partialMatch) {
        console.log(`   🔍 Found similar claim in database (verify it matches your context)`);
        return partialMatch;
      }
    }

    console.log(`   ❌ No match found in database`);
    return null;
  }

  /**
   * Add a new verified claim to the database
   */
  async addClaim(claim: VerifiedClaim): Promise<void> {
    // Check if claim already exists
    const existing = this.findClaim(claim.claim);
    if (existing) {
      console.log(`   ⚠️  Claim already exists in database, skipping`);
      return;
    }

    this.claims.push(claim);
    await this.save();
    console.log(`   ✅ Added new verified claim to database`);
  }

  /**
   * Get all claims by category
   */
  getByCategory(category: string): VerifiedClaim[] {
    return this.claims.filter(c =>
      c.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
    );
  }

  /**
   * Get all claims by authority level
   */
  getByAuthority(authority: 'high' | 'medium' | 'low'): VerifiedClaim[] {
    return this.claims.filter(c => c.authority === authority);
  }

  /**
   * Normalize claim for comparison
   */
  private normalizeClaim(claim: string): string {
    return claim
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,!?;:]/g, '')
      .trim();
  }

  /**
   * Export as markdown report
   */
  async exportMarkdown(outputPath: string): Promise<void> {
    let md = `# Verified Claims Database\n\n`;
    md += `**Last Updated**: ${new Date().toISOString()}\n`;
    md += `**Total Claims**: ${this.claims.length}\n\n`;
    md += `---\n\n`;

    // Group by category
    const categories = [...new Set(this.claims.flatMap(c => c.category))];

    for (const category of categories) {
      const categoryClaims = this.getByCategory(category);
      if (categoryClaims.length === 0) continue;

      md += `## ${category}\n\n`;

      categoryClaims.forEach((claim, i) => {
        md += `### ${i + 1}. ${claim.claim}\n\n`;
        md += `- **Source**: ${claim.source}\n`;
        md += `- **URL**: ${claim.sourceUrl}\n`;
        md += `- **Citation**: ${claim.citation}\n`;
        md += `- **Authority**: ${claim.authority}\n`;
        md += `- **Verified**: ${claim.dateVerified} by ${claim.verifiedBy}\n`;
        if (claim.notes) {
          md += `- **Notes**: ${claim.notes}\n`;
        }
        md += `\n`;
      });
    }

    await fs.writeFile(outputPath, md, 'utf-8');
    console.log(`   📄 Exported verified claims to ${path.basename(outputPath)}`);
  }

  /**
   * Get all claims
   */
  getAllClaims(): VerifiedClaim[] {
    return this.claims;
  }
}
