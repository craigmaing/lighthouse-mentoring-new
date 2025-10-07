/**
 * Citation Linker
 *
 * Extracts citations from content, validates them, and structures them
 * in Harvard/APA style with links to authoritative sources.
 */

import type { Citation } from './types';

export class CitationLinker {
  // Known authoritative sources with their URLs
  private authoritativeSources: Record<string, string> = {
    WHO: 'https://www.who.int',
    'World Health Organization': 'https://www.who.int',
    Gallup: 'https://www.gallup.com',
    Harvard: 'https://www.harvard.edu',
    'Harvard Business Review': 'https://hbr.org',
    HBR: 'https://hbr.org',
    CIPD: 'https://www.cipd.org',
    McKinsey: 'https://www.mckinsey.com',
    Deloitte: 'https://www.deloitte.com',
    ILO: 'https://www.ilo.org',
    'International Labour Organization': 'https://www.ilo.org',
    OECD: 'https://www.oecd.org',
    SHRM: 'https://www.shrm.org',
    Gartner: 'https://www.gartner.com',
    'Yale University': 'https://www.yale.edu',
    'Johns Hopkins': 'https://www.jhu.edu'
  };

  /**
   * Extract citations from markdown content
   * Looks for patterns like:
   * - (WHO, 2024)
   * - According to Gallup (2023)...
   * - [1] Reference text
   */
  extractCitations(content: string): Citation[] {
    const citations: Citation[] = [];

    // Pattern 1: (Author, Year) format
    const inlinePattern = /\(([A-Za-z\s&,]+),?\s+(\d{4})\)/g;
    let match;

    while ((match = inlinePattern.exec(content)) !== null) {
      const source = match[1].trim();
      const year = parseInt(match[2]);

      // Check if this citation already exists
      if (!citations.some(c => c.source === source && c.year === year)) {
        citations.push({
          source,
          year,
          title: '', // Will be filled in later
          url: this.findSourceUrl(source)
        });
      }
    }

    // Pattern 2: "According to [Source] (Year)..."
    const narrativePattern = /According to ([A-Za-z\s]+)\s+\((\d{4})\)/gi;

    while ((match = narrativePattern.exec(content)) !== null) {
      const source = match[1].trim();
      const year = parseInt(match[2]);

      if (!citations.some(c => c.source === source && c.year === year)) {
        citations.push({
          source,
          year,
          title: '',
          url: this.findSourceUrl(source)
        });
      }
    }

    // Pattern 3: References section at bottom
    const referencesSection = this.extractReferencesSection(content);
    if (referencesSection.length > 0) {
      citations.push(...referencesSection);
    }

    return this.deduplicateCitations(citations);
  }

  /**
   * Extract structured references from "References" section
   */
  private extractReferencesSection(content: string): Citation[] {
    const citations: Citation[] = [];

    // Look for "## References" section
    const referencesMatch = content.match(/##\s+References\s*\n([\s\S]*?)(?=\n##|$)/i);

    if (!referencesMatch) {
      return citations;
    }

    const referencesText = referencesMatch[1];

    // Parse each reference line
    const lines = referencesText.split('\n').filter(line => line.trim().length > 0);

    for (const line of lines) {
      const citation = this.parseReferenceLine(line);
      if (citation) {
        citations.push(citation);
      }
    }

    return citations;
  }

  /**
   * Parse a single reference line
   * Supports formats like:
   * - Author (Year). Title. Source.
   * - Author (Year) Title [URL]
   */
  private parseReferenceLine(line: string): Citation | null {
    // Remove list markers (-, *, 1., etc.)
    const cleanLine = line.replace(/^[\s\-\*\d.]+/, '').trim();

    // Pattern: Author (Year). Title. Source.
    const pattern = /^(.+?)\s+\((\d{4})\)[.,]?\s+(.+?)[.,]\s+(.+?)\.?$/;
    const match = cleanLine.match(pattern);

    if (match) {
      const authors = match[1].trim();
      const year = parseInt(match[2]);
      const title = match[3].trim();
      const source = match[4].trim();

      return {
        authors: authors.split(',').map(a => a.trim()),
        year,
        title,
        source,
        url: this.findSourceUrl(source)
      };
    }

    // Simple fallback pattern
    const simplePattern = /^(.+?)\s+\((\d{4})\)/;
    const simpleMatch = cleanLine.match(simplePattern);

    if (simpleMatch) {
      return {
        source: simpleMatch[1].trim(),
        year: parseInt(simpleMatch[2]),
        title: cleanLine,
        url: this.findSourceUrl(simpleMatch[1].trim())
      };
    }

    return null;
  }

  /**
   * Find URL for known authoritative source
   */
  private findSourceUrl(source: string): string | undefined {
    for (const [key, url] of Object.entries(this.authoritativeSources)) {
      if (source.includes(key)) {
        return url;
      }
    }
    return undefined;
  }

  /**
   * Remove duplicate citations
   */
  private deduplicateCitations(citations: Citation[]): Citation[] {
    const unique = new Map<string, Citation>();

    for (const citation of citations) {
      const key = `${citation.source}-${citation.year}`;
      if (!unique.has(key)) {
        unique.set(key, citation);
      }
    }

    return Array.from(unique.values());
  }

  /**
   * Format citation in Harvard style
   */
  formatHarvardStyle(citation: Citation): string {
    const authors = citation.authors?.join(', ') || citation.source;
    const title = citation.title ? `*${citation.title}*.` : '';
    const source = citation.source ? `${citation.source}.` : '';
    const url = citation.url ? ` Available at: [${citation.url}](${citation.url})` : '';

    return `${authors} (${citation.year}). ${title} ${source}${url}`.trim();
  }

  /**
   * Generate References section markdown
   */
  generateReferencesSection(citations: Citation[]): string {
    if (citations.length === 0) {
      return '';
    }

    // Sort by year (descending) then author
    const sorted = citations.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      return (a.authors?.[0] || a.source).localeCompare(b.authors?.[0] || b.source);
    });

    const formattedRefs = sorted.map(citation => `- ${this.formatHarvardStyle(citation)}`);

    return `## References\n\n${formattedRefs.join('\n')}`;
  }

  /**
   * Validate citation quality
   */
  validateCitations(citations: Citation[]): {
    valid: boolean;
    issues: string[];
    authoritativeCount: number;
  } {
    const issues: string[] = [];
    let authoritativeCount = 0;

    if (citations.length === 0) {
      issues.push('No citations found - add at least 3 authoritative references');
    }

    if (citations.length < 3) {
      issues.push(`Only ${citations.length} citations found - aim for at least 3`);
    }

    for (const citation of citations) {
      if (this.findSourceUrl(citation.source)) {
        authoritativeCount++;
      }
    }

    if (authoritativeCount === 0) {
      issues.push('No authoritative sources cited (WHO, Gallup, Harvard, CIPD, etc.)');
    }

    return {
      valid: issues.length === 0,
      issues,
      authoritativeCount
    };
  }
}
