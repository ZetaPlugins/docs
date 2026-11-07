import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Navigation is defined by `meta.json` files next to the content:
 *   content/docs/meta.json            -> root section + ordered list of products
 *   content/docs/<product>/meta.json  -> product title/logo + ordered pages
 * In `pages`, an entry like "---Commands---" starts a new sidebar group.
 */
interface MetaFile {
    title: string;
    description?: string;
    logo?: string;
    icon?: string;
    /** Brand color for this product's docs (any CSS color). Defaults to the ZetaPlugins purple. */
    accent?: string;
    pages: string[];
    products?: string[];
}

export interface NavPage {
    id: string;
    href: string;
    title: string;
    icon?: string;
}
export interface NavGroup {
    label?: string;
    pages: NavPage[];
}
export interface Product {
    slug: string; // "" for the root section
    href: string;
    title: string;
    description?: string;
    logo?: string;
    icon?: string;
    accent?: string;
    groups: NavGroup[];
    pages: NavPage[]; // flat, in sidebar order (used for prev/next)
}

const metaFiles = import.meta.glob<MetaFile>('/content/docs/**/meta.json', { eager: true, import: 'default' });

export function hrefFor(id: string): string {
    const path = id.replace(/(^|\/)index$/, '');
    return '/' + path;
}

let cache: Promise<Product[]> | undefined;

export function getProducts(): Promise<Product[]> {
    cache ??= build();
    return cache;
}

async function build(): Promise<Product[]> {
    const entries = new Map((await getCollection('docs')).map((e) => [e.id, e]));
    const root = metaFiles['/content/docs/meta.json'];
    if (!root) throw new Error('content/docs/meta.json is missing');

    const makeProduct = (slug: string, meta: MetaFile): Product => {
        const groups: NavGroup[] = [{ pages: [] }];
        for (const item of meta.pages) {
            const sep = item.match(/^---(.*)---$/);
            if (sep) {
                groups.push({ label: sep[1], pages: [] });
                continue;
            }
            const id = slug ? `${slug}/${item}` : item;
            const entry = entries.get(id);
            if (!entry) throw new Error(`meta.json for "${slug || 'root'}" references missing page "${id}"`);
            groups.at(-1)!.pages.push({
                id,
                href: hrefFor(id),
                title: entry.data.title,
                icon: entry.data.icon,
            });
        }
        return {
            slug,
            href: hrefFor(slug ? `${slug}/index` : 'index'),
            title: meta.title,
            description: meta.description,
            logo: meta.logo,
            icon: meta.icon,
            accent: meta.accent,
            groups: groups.filter((g) => g.pages.length),
            pages: groups.flatMap((g) => g.pages),
        };
    };

    return [
        makeProduct('', root),
        ...(root.products ?? []).map((slug) => {
            const meta = metaFiles[`/content/docs/${slug}/meta.json`];
            if (!meta) throw new Error(`content/docs/${slug}/meta.json is missing`);
            return makeProduct(slug, meta);
        }),
    ];
}

export async function productFor(entry: CollectionEntry<'docs'>): Promise<Product> {
    const products = await getProducts();
    const slug = entry.id.includes('/') ? entry.id.split('/')[0] : '';
    return products.find((p) => p.slug === slug) ?? products[0];
}
