/**
 * Grammar and Spell Checking Service
 *
 * Uses retext for spell checking and write-good for prose linting
 * Ensures content is grammatically correct and well-written
 */

import { unified } from 'unified';
import retextEnglish from 'retext-english';
import retextSpell from 'retext-spell';
import retextEquality from 'retext-equality';
import dictionaryEnGb from 'dictionary-en-gb';
import * as writeGood from 'write-good';

export interface GrammarIssue {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
  source: 'spell' | 'grammar' | 'style';
  suggestion?: string;
}

export interface GrammarCheckResult {
  passed: boolean;
  score: number;
  totalIssues: number;
  errors: number;
  warnings: number;
  issues: GrammarIssue[];
  summary: string;
}

export class GrammarService {
  private customDictionary: Set<string>;
  private processor: any;

  constructor(customWords: string[] = []) {
    // Default custom dictionary for business/coaching terms (UK English)
    this.customDictionary = new Set([
      // Business/coaching terms
      'wellbeing',
      'mentoring',
      'NED',
      'NEDs',
      'FRSPH',
      'FCMI',
      'IoD',
      'EMCC',
      'C-suite',
      'upskilling',
      'reskilling',
      'onboarding',
      'offboarding',
      'stakeholder',
      'stakeholders',

      // UK English spellings (ensure these are accepted)
      'organise',
      'organised',
      'organising',
      'organisation',
      'organisations',
      'organisational',
      'recognise',
      'recognised',
      'recognising',
      'specialise',
      'specialised',
      'specialising',
      'realise',
      'realised',
      'realising',
      'analyse',
      'analysed',
      'analysing',
      'optimise',
      'optimised',
      'optimising',
      'maximise',
      'maximised',
      'maximising',
      'minimise',
      'minimised',
      'minimising',
      'prioritise',
      'prioritised',
      'prioritising',

      ...customWords
    ]);

    // Initialize retext processor with UK English dictionary
    this.processor = unified()
      .use(retextEnglish)
      .use(retextSpell, {
        dictionary: dictionaryEnGb,
        personal: Array.from(this.customDictionary).join('\n')
      })
      .use(retextEquality);
  }

  /**
   * Add words to custom dictionary
   */
  addToCustomDictionary(words: string[]): void {
    words.forEach(word => this.customDictionary.add(word));
  }

  /**
   * US to UK English spelling map
   */
  private usToUkSpellingMap: Map<string, string> = new Map([
    // -ize to -ise
    ['organize', 'organise'],
    ['organized', 'organised'],
    ['organizing', 'organising'],
    ['organization', 'organisation'],
    ['organizations', 'organisations'],
    ['organizational', 'organisational'],
    ['recognize', 'recognise'],
    ['recognized', 'recognised'],
    ['recognizing', 'recognising'],
    ['specialize', 'specialise'],
    ['specialized', 'specialised'],
    ['specializing', 'specialising'],
    ['realize', 'realise'],
    ['realized', 'realised'],
    ['realizing', 'realising'],
    ['analyze', 'analyse'],
    ['analyzed', 'analysed'],
    ['analyzing', 'analysing'],
    ['optimize', 'optimise'],
    ['optimized', 'optimised'],
    ['optimizing', 'optimising'],
    ['maximize', 'maximise'],
    ['maximized', 'maximised'],
    ['maximizing', 'maximising'],
    ['minimize', 'minimise'],
    ['minimized', 'minimised'],
    ['minimizing', 'minimising'],
    ['prioritize', 'prioritise'],
    ['prioritized', 'prioritised'],
    ['prioritizing', 'prioritising'],

    // -or to -our
    ['behavior', 'behaviour'],
    ['behaviors', 'behaviours'],
    ['behavioral', 'behavioural'],
    ['color', 'colour'],
    ['colors', 'colours'],
    ['colored', 'coloured'],
    ['coloring', 'colouring'],
    ['favor', 'favour'],
    ['favors', 'favours'],
    ['favored', 'favoured'],
    ['favoring', 'favouring'],
    ['honor', 'honour'],
    ['honors', 'honours'],
    ['honored', 'honoured'],
    ['honoring', 'honouring'],
    ['labor', 'labour'],
    ['labors', 'labours'],
    ['labored', 'laboured'],
    ['laboring', 'labouring'],

    // -er to -re
    ['center', 'centre'],
    ['centers', 'centres'],
    ['centered', 'centred'],
    ['centering', 'centring'],
    ['meter', 'metre'],
    ['meters', 'metres'],

    // Other common variations
    ['defense', 'defence'],
    ['license', 'licence'],
    ['practice', 'practise'], // (verb)
    ['program', 'programme'], // (noun - except computer programs)
    ['catalog', 'catalogue'],
    ['dialog', 'dialogue'],
  ]);

  /**
   * Check for US English spellings and flag them
   */
  private checkUsSpellings(text: string): GrammarIssue[] {
    const issues: GrammarIssue[] = [];
    const words = text.match(/\b[a-z]+\b/gi) || [];

    words.forEach((word) => {
      const lowerWord = word.toLowerCase();
      if (this.usToUkSpellingMap.has(lowerWord)) {
        const ukSpelling = this.usToUkSpellingMap.get(lowerWord)!;

        // Find position in text
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        let match;
        while ((match = regex.exec(text)) !== null) {
          const textBefore = text.substring(0, match.index);
          const line = (textBefore.match(/\n/g) || []).length + 1;
          const lastNewline = textBefore.lastIndexOf('\n');
          const column = match.index - lastNewline;

          issues.push({
            line,
            column,
            message: `Use UK English spelling`,
            severity: 'warning',
            source: 'spell',
            suggestion: ukSpelling
          });
        }
      }
    });

    return issues;
  }

  /**
   * Check text for spelling and grammar errors
   */
  async check(text: string): Promise<GrammarCheckResult> {
    const issues: GrammarIssue[] = [];

    // Check for US English spellings (UK English enforcement)
    const usSpellingIssues = this.checkUsSpellings(text);
    issues.push(...usSpellingIssues);

    // Run retext checks (spelling, equality)
    const retextIssues = await this.checkWithRetext(text);
    issues.push(...retextIssues);

    // Run write-good checks (prose linting)
    const proseIssues = this.checkWithWriteGood(text);
    issues.push(...proseIssues);

    // Calculate metrics
    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warning').length;
    const totalIssues = errors + warnings;

    // Calculate score (100 - deductions)
    // Errors: -5 points each, Warnings: -2 points each
    let score = 100 - (errors * 5) - (warnings * 2);
    score = Math.max(0, Math.min(100, score));

    const passed = score >= 80;

    const summary = this.generateSummary(errors, warnings);

    return {
      passed,
      score,
      totalIssues,
      errors,
      warnings,
      issues,
      summary
    };
  }

  /**
   * Check with retext (spelling, equality)
   */
  private async checkWithRetext(text: string): Promise<GrammarIssue[]> {
    const issues: GrammarIssue[] = [];

    try {
      const file = await this.processor.process(text);

      // Extract messages from vfile
      if (file.messages && file.messages.length > 0) {
        file.messages.forEach((message: any) => {
          // Skip if it's a custom dictionary word
          if (message.actual && this.customDictionary.has(message.actual)) {
            return;
          }

          issues.push({
            line: message.line || 0,
            column: message.column || 0,
            message: message.message,
            severity: message.fatal ? 'error' : 'warning',
            source: message.source === 'retext-spell' ? 'spell' : 'grammar',
            suggestion: message.expected ? message.expected.join(', ') : undefined
          });
        });
      }
    } catch (error) {
      console.error('Retext check failed:', error);
    }

    return issues;
  }

  /**
   * Check with write-good (prose linting)
   */
  private checkWithWriteGood(text: string): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    try {
      const suggestions = writeGood(text);

      suggestions.forEach((suggestion: any) => {
        // Calculate line and column from index
        const textBefore = text.substring(0, suggestion.index);
        const line = (textBefore.match(/\n/g) || []).length + 1;
        const lastNewline = textBefore.lastIndexOf('\n');
        const column = suggestion.index - lastNewline;

        issues.push({
          line,
          column,
          message: suggestion.reason,
          severity: 'warning',
          source: 'style'
        });
      });
    } catch (error) {
      console.error('Write-good check failed:', error);
    }

    return issues;
  }

  /**
   * Generate summary text
   */
  private generateSummary(errors: number, warnings: number): string {
    if (errors === 0 && warnings === 0) {
      return 'No spelling or grammar issues found.';
    }

    const parts: string[] = [];

    if (errors > 0) {
      parts.push(`${errors} error${errors > 1 ? 's' : ''}`);
    }

    if (warnings > 0) {
      parts.push(`${warnings} warning${warnings > 1 ? 's' : ''}`);
    }

    return `Found ${parts.join(' and ')}.`;
  }

  /**
   * Check a single word
   */
  async checkWord(word: string): Promise<boolean> {
    if (this.customDictionary.has(word)) {
      return true;
    }

    const result = await this.check(word);
    return result.issues.length === 0;
  }

  /**
   * Get suggestions for a misspelled word
   */
  async getSuggestions(word: string): Promise<string[]> {
    const result = await this.check(word);
    const spellIssues = result.issues.filter(i => i.source === 'spell');

    if (spellIssues.length === 0) {
      return [];
    }

    const suggestions = spellIssues
      .map(i => i.suggestion)
      .filter(s => s !== undefined)
      .flatMap(s => s!.split(', '));

    return [...new Set(suggestions)];
  }
}
