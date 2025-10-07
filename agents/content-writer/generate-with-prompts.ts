/**
 * Helper to extract and display the comprehensive prompts for manual content generation
 * This preserves the full workflow while working without API key
 */

import { ContentWriterAgent } from './index';
import type { BlogPostBrief } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

async function generatePrompts() {
  const agent = new ContentWriterAgent();

  // Example brief (you can customize this)
  const brief: BlogPostBrief = {
    title: 'Executive Coaching ROI: The 788% Return UK Businesses Are Achieving',
    targetKeywords: ['executive coaching ROI', 'executive coaching return on investment'],
    intent: 'informational' as const,
    priority: 'high' as const,
    category: 'executive-coaching',
  };

  console.log('🎯 Generating prompts for:', brief.title);
  console.log('');

  try {
    await agent.generateContent(brief);
  } catch (error: any) {
    if (error.message.includes('CONTENT GENERATION REQUIRED')) {
      // Extract the prompts from the error message
      const fullMessage = error.message;

      // Write to file for easy access
      const outputPath = path.join(process.cwd(), 'CONTENT-PROMPTS.md');
      await fs.writeFile(outputPath, fullMessage, 'utf-8');

      console.log('✅ Prompts extracted successfully!');
      console.log('📄 Saved to:', outputPath);
      console.log('');
      console.log('Next steps:');
      console.log('1. Open CONTENT-PROMPTS.md to see the full system and user prompts');
      console.log('2. Use these prompts to generate the blog post content');
      console.log('3. The prompts include:');
      console.log('   ✅ Craig\'s credentials and positioning');
      console.log('   ✅ Relevant testimonials integrated');
      console.log('   ✅ HOW-TO-WRITE-LIKE-A-HUMAN-NOT-AI.md guidelines');
      console.log('   ✅ AI-SEARCH-OPTIMIZATION-PLAN.md guidelines');
      console.log('   ✅ UK English spelling enforcement');
      console.log('   ✅ Board-level perspective');
    } else {
      console.error('❌ Unexpected error:', error.message);
    }
  }
}

generatePrompts().catch(console.error);
