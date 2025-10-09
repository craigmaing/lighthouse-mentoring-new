import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Craig Fearn'),
    authorCredentials: z.string().optional(),
    readTime: z.string().optional(),
    category: z.enum(['board-advisory', 'executive-coaching', 'wellbeing', 'leadership', 'governance']),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // AI Search Optimization fields
    tldr: z.array(z.string()).optional(),
    keyTakeaways: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = {
  insights,
};
