// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://marzsp.github.io/DevNotes',
	base: '/DevNotes',
	integrations: [mdx(), sitemap()],
});
