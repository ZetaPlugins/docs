import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { Product } from './nav';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const PAD_X = 80;
const PAD_Y = 72;
const DEFAULT_ACCENT = '#7c3aed';
const FALLBACK_LOGO = '/img/z.svg';

const require = createRequire(import.meta.url);
const fontFile = (weight: number) =>
    readFile(require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`));

let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
const loadFonts = () =>
    (fonts ??= Promise.all(
        [400, 500, 700].map(async (weight) => ({
            name: 'Inter',
            data: await fontFile(weight),
            weight: weight as 400 | 500 | 700,
            style: 'normal' as const,
        })),
    ));

const logoCache = new Map<string, Promise<string>>();
const loadLogo = (path: string) => {
    let logo = logoCache.get(path);
    if (!logo) {
        logo = readFile(join(process.cwd(), 'public', path)).then(
            (data) => `data:image/svg+xml;base64,${data.toString('base64')}`,
        );
        logoCache.set(path, logo);
    }
    return logo;
};

type Node = { type: string; props: Record<string, unknown> & { style?: Record<string, unknown> } };
const h = (
    type: string,
    style: Record<string, unknown>,
    children?: unknown,
    extra: Record<string, unknown> = {},
): Node => ({
    type,
    props: { style, children, ...extra },
});

export interface OgImageOptions {
    title: string;
    description?: string;
    product: Product;
}

/** Renders the Open Graph image for a docs page as a PNG. */
export async function renderOgImage({ title, description, product }: OgImageOptions): Promise<Uint8Array> {
    const accent = product.accent ?? DEFAULT_ACCENT;
    const logo = await loadLogo(product.logo ?? FALLBACK_LOGO);
    const isProductHome = title === product.title;
    const eyebrow = product.slug ? product.title : 'ZetaPlugins';
    const heading = isProductHome && product.slug ? `${product.title} Docs` : title;
    const subtitle = description ?? product.description;

    // Satori sizes boxes content-box, so the padding is expressed as a fixed-size inner frame.
    const frame = h(
        'div',
        {
            width: OG_WIDTH - 2 * PAD_X,
            height: OG_HEIGHT - 2 * PAD_Y,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        [
            h('div', { display: 'flex', alignItems: 'center', gap: '22px' }, [
                h('img', { width: 64, height: 64 }, undefined, { src: logo, width: 64, height: 64 }),
                h('div', { fontSize: 34, fontWeight: 700, letterSpacing: '-0.01em' }, eyebrow),
            ]),
            h('div', { display: 'flex', flexDirection: 'column', gap: '24px' }, [
                h(
                    'div',
                    {
                        fontSize: heading.length > 32 ? 64 : 80,
                        fontWeight: 700,
                        lineHeight: 1.08,
                        letterSpacing: '-0.03em',
                        maxWidth: 1000,
                        lineClamp: 2,
                    },
                    heading,
                ),
                subtitle
                    ? h(
                          'div',
                          {
                              fontSize: 32,
                              fontWeight: 400,
                              lineHeight: 1.4,
                              color: '#a1a1aa',
                              maxWidth: 960,
                              lineClamp: 2,
                          },
                          subtitle,
                      )
                    : h('div', {}, ''),
            ]),
            h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
                h('div', { fontSize: 26, fontWeight: 500, color: '#a1a1aa' }, 'docs.zetaplugins.com'),
                h('div', { width: 120, height: 8, borderRadius: 4, backgroundColor: accent }),
            ]),
        ],
    );
    const tree = h(
        'div',
        {
            width: OG_WIDTH,
            height: OG_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0c0c0f',
            backgroundImage: `radial-gradient(circle at 100% 0%, ${accent}66 0%, ${accent}1a 35%, transparent 65%)`,
            color: '#fafafa',
            fontFamily: 'Inter',
        },
        [frame],
    );

    const svg = await satori(tree as Parameters<typeof satori>[0], {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts: await loadFonts(),
    });
    return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}

/** Public path of the OG image for a docs entry id. */
export const ogImagePath = (id: string) => `/og/${id}.png`;
