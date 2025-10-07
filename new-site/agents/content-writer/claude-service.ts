/**
 * Claude API Service for Content Generation
 *
 * Integrates Anthropic Claude for high-quality blog content generation
 * following HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md and AI-SEARCH-OPTIMIZATION-PLAN.md
 */

import Anthropic from '@anthropic-ai/sdk';
import type { BlogPostBrief } from './types';

export class ClaudeContentService {
  private client: Anthropic;
  private writingGuidelines: string = '';
  private seoGuidelines: string = '';

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY || '',
    });
  }

  /**
   * Load guidelines for content generation
   */
  setGuidelines(writingGuidelines: string, seoGuidelines: string): void {
    this.writingGuidelines = writingGuidelines;
    this.seoGuidelines = seoGuidelines;
  }

  /**
   * Generate blog post content using Claude
   */
  async generateBlogPost(brief: BlogPostBrief, testimonials?: any[]): Promise<string> {
    console.log(`   🤖 Generating content with Claude API...`);

    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(brief, testimonials);

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: userPrompt
        }]
      });

      const content = response.content[0].type === 'text'
        ? response.content[0].text
        : '';

      console.log(`   ✅ Generated ${content.split(/\s+/).length} words`);
      return content;

    } catch (error) {
      console.error(`   ❌ Claude API error:`, error);
      throw new Error(`Failed to generate content: ${error}`);
    }
  }

  /**
   * Build system prompt for Claude
   */
  private buildSystemPrompt(): string {
    return `You are Craig Fearn, FRSPH, FCMI, IoD Ambassador—an executive coach and board advisor writing for your professional blog.

# Your Background
- Two Fellowships: Royal Society for Public Health (FRSPH) and Chartered Management Institute (FCMI)
- IoD Ambassador for Institute of Directors South West
- Additional credentials: MEd, BSc (Hons), PGCE (L7), QTLS, EMCC Professional Coach
- Recent certifications: Google Project Management, Yale (Science of Well-Being), Johns Hopkins (Psychological First Aid)
- Client portfolio: Senior leaders at HSBC, Edrington UK (The Macallan, Highland Park), Brown-Forman (Jack Daniels, Woodford Reserve), AECOM

# Your Writing Style
${this.writingGuidelines}

# SEO Requirements
${this.seoGuidelines}

# Critical Rules
1. NEVER make up statistics, facts, or claims
2. If you want to cite a statistic, use [RESEARCH NEEDED: specific stat to verify]
3. Real examples only - use placeholders like [REAL CLIENT EXAMPLE: specific industry] if needed
4. Professional, conversational tone - talk TO executives, not AT them
5. Include specific, measurable outcomes where possible
6. Always link back to board-level perspective and organizational impact
7. Use entity-rich content: mention real companies, frameworks, recognized authorities
8. Optimize for AI search: TL;DR, FAQ, bullet lists, clear headings
9. Write for worldwide audience (Craig works globally)
10. **ALWAYS use UK English spelling**: organise (not organize), behaviour (not behavior), centre (not center), programme (not program), realise (not realize), etc.

# Structure Required
1. TL;DR summary (2-3 sentences)
2. Opening story or hook (conversational, specific)
3. Main content (comprehensive, with real examples)
4. Key Takeaways (bullet list)
5. FAQ section (4-5 questions)
6. Closing with CTA
7. Author bio (use credentials listed above)

Write as if you're having a conversation with a CEO over coffee—authentic, professional, insightful.`;
  }

  /**
   * Build user prompt for specific blog post
   */
  private buildUserPrompt(brief: BlogPostBrief, testimonials?: any[]): string {
    let prompt = `Write a comprehensive blog post:

**Title**: ${brief.title}

**Target Keywords**: ${brief.targetKeywords.join(', ')}

**Search Intent**: ${brief.intent}

**Priority**: ${brief.priority}

**Target Word Count**: ${this.getTargetWordCount(brief)}

**Audience**: C-suite executives, senior leaders, board members, CEOs, CFOs, directors

`;

    // Add testimonials if available for authentic examples
    if (testimonials && testimonials.length > 0) {
      prompt += `\n**Real Client Testimonials to Reference** (use these for authentic examples):\n\n`;
      testimonials.forEach((t, i) => {
        prompt += `${i + 1}. **${t.name}** (${t.role}${t.company ? ', ' + t.company : ''})\n`;
        prompt += `   "${t.excerpt || t.content.substring(0, 200)}..."\n\n`;
      });
    }

    prompt += `\n**Requirements**:
- Write in Craig's voice (see system prompt for credentials and style)
- **USE UK ENGLISH SPELLING THROUGHOUT** (organise, behaviour, centre, realise, programme, etc.)
- Include TL;DR at the top
- Use conversational, story-driven approach
- Include specific, measurable examples
- Add Key Takeaways section (bullet points)
- Include FAQ section (4-5 questions)
- End with author bio
- Optimize for both traditional SEO and AI search (ChatGPT, Perplexity, Gemini)
- If you need to cite statistics, use [RESEARCH NEEDED: specific claim]
- Make it valuable for board-level executives

Write the complete blog post now:`;

    return prompt;
  }

  /**
   * Get target word count based on brief priority and intent
   */
  private getTargetWordCount(brief: BlogPostBrief): number {
    // High-priority posts should be more comprehensive
    if (brief.priority === 'high') {
      return brief.intent === 'informational' ? 2500 : 2000;
    }
    return brief.intent === 'informational' ? 2000 : 1500;
  }

  /**
   * Generate meta description using Claude
   */
  async generateMetaDescription(title: string, content: string): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        temperature: 0.5,
        messages: [{
          role: 'user',
          content: `Generate a compelling meta description (150-160 characters) for this blog post:

**Title**: ${title}

**Content excerpt**: ${content.substring(0, 500)}

Requirements:
- Exactly 150-160 characters
- Include primary keyword naturally
- Benefit-driven and compelling
- Appropriate for C-suite executives
- Encourages click-through from search results

Meta description:`
        }]
      });

      return response.content[0].type === 'text'
        ? response.content[0].text.trim()
        : '';

    } catch (error) {
      console.error(`   ⚠️  Failed to generate meta description:`, error);
      // Fallback to first 160 chars of content
      return content.substring(0, 157) + '...';
    }
  }

  /**
   * Generate multiple headline variations
   */
  async generateHeadlineVariations(topic: string, keywords: string[]): Promise<string[]> {
    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        temperature: 0.8,
        messages: [{
          role: 'user',
          content: `Generate 5 compelling blog post headlines for:

**Topic**: ${topic}
**Keywords**: ${keywords.join(', ')}
**Audience**: C-suite executives, senior leaders

Requirements:
- 50-60 characters ideal (max 70)
- Include primary keyword naturally
- Use proven formulas (How to, X Ways to, Why X, etc.)
- Professional tone appropriate for executives
- Compelling and benefit-driven

Return only the 5 headlines, numbered 1-5:`
        }]
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      return text.split('\n').filter(line => line.match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, ''));

    } catch (error) {
      console.error(`   ⚠️  Failed to generate headlines:`, error);
      return [topic]; // Fallback to original topic
    }
  }
}
