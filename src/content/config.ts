import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Craig Fearn'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['Wellbeing', 'Leadership', 'Mental Health', 'Research', 'Case Studies']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    date: z.string(),
    relationship: z.string(),
    content: z.string(),
    featured: z.boolean().default(false),
    priority: z.number().default(0),
    tags: z.array(z.enum(['IoD', 'Board', 'Wellbeing', 'Leadership', 'Transformation', 'Mentoring'])).default([]),
  }),
});

export const collections = { blog, testimonials };