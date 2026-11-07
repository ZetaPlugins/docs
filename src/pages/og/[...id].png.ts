import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { productFor } from '../../lib/nav';
import { renderOgImage } from '../../lib/og';

export const getStaticPaths = (async () => {
    const entries = await getCollection('docs');
    return entries.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ entry: CollectionEntry<'docs'> }> = async ({ props: { entry } }) => {
    const png = await renderOgImage({
        title: entry.data.title,
        description: entry.data.description,
        product: await productFor(entry),
    });
    return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
