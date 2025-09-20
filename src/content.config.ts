import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection for blog posts
 * type check with zod schema
 */
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			tags: z.array(z.string()).optional(),
			theme: z.union([z.string(), z.array(z.string())]).optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

export const collections = { blog };
