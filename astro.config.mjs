// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import { remarkDocs } from './src/lib/remark-docs.mjs';

export default defineConfig({
    site: 'https://docs.zetaplugins.com',
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'hover',
    },
    markdown: {
        processor: unified({
            remarkPlugins: [remarkDirective, remarkDocs],
        }),
        shikiConfig: {
            themes: { light: 'github-light', dark: 'github-dark' },
            defaultColor: false,
            wrap: false,
        },
    },
});
