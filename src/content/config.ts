// @ts-check
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string().max(180),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum([
        'care-guide',
        'plant-profile',
        'sourcing',
        'problem-solving',
        'inspiration',
        'beginner',
      ]),
      tags: z.array(z.string()).default([]),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      readingTime: z.number().optional(),
      author: z.string().default('Mossroom Team'),
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

export const collections = { articles };
