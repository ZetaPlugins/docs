import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './content/docs',
        generateId: ({ entry }) => entry.replace(/\.md$/, ''),
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
    }),
});

export const collections = { docs };
