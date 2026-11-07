/**
 * Remark plugin that adds the docs-specific markdown extensions on top of
 * `remark-directive`:
 *
 *   :::note / :::info / :::tip / :::warning / :::danger   -> callouts (optional [Custom title])
 *   ::::tabs + :::tab[Label]                             -> tab groups
 *   :::steps                                             -> numbered steps (one per ### heading)
 *   ::::cards + :::card{href="..." title="..." icon="Package"}  -> link cards
 *       (icon: a lucide name, or the name of a brand icon in src/components/icons, e.g. "Discord")
 *   :::files (containing a nested list)                  -> file tree
 *
 * It also resolves relative links (`guide/commands`, `messages.md#formatting`)
 * against the current file, and turns ```lang title="file.yml" into a titled code block.
 */
import path from 'node:path';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';

const CONTENT_DIR = path.resolve('content/docs');

const CALLOUTS = {
    note: { title: 'Note', icon: 'Info' },
    info: { title: 'Info', icon: 'Info' },
    tip: { title: 'Tip', icon: 'Lightbulb' },
    warning: { title: 'Warning', icon: 'TriangleAlert' },
    danger: { title: 'Danger', icon: 'OctagonAlert' },
};

const el = (tagName, props, children = []) => ({
    type: 'element-wrapper',
    data: { hName: tagName, hProperties: props },
    children: compact(children),
});
const html = (value) => ({ type: 'html', value });
const compact = (nodes) => nodes.filter(Boolean);
const text = (value) => ({ type: 'text', value });
/*
 * Plain Markdown can't render Astro components, so icons inside markdown are built from the
 * icon data that ships with @lucide/astro (the same set the layout components use).
 */
const LUCIDE_SRC = path.resolve('node_modules/@lucide/astro/src');
const iconCache = new Map();
let iconFiles;

/** Maps every exported icon name (including aliases like TriangleAlert) to its icon file. */
function iconFile(name) {
    if (!iconFiles) {
        iconFiles = new Map();
        for (const index of ['icons/index.ts', 'aliases/aliases.ts']) {
            const source = fs.readFileSync(path.join(LUCIDE_SRC, index), 'utf8');
            for (const [, exported, file] of source.matchAll(
                /export \{ default as (\w+) \} from '(?:\.\.\/icons\/|\.\/)([\w-]+)'/g,
            )) {
                iconFiles.set(exported, path.join(LUCIDE_SRC, 'icons', `${file}.ts`));
            }
        }
    }
    return iconFiles.get(name);
}

function lucideSvg(name) {
    if (iconCache.has(name)) return iconCache.get(name);
    let svg = null;
    try {
        const source = fs.readFileSync(iconFile(name), 'utf8');
        const data = JSON.parse(source.match(/const iconData: LucideIconData = (\{.*\});/)[1]);
        const attr = (attrs) =>
            Object.entries(attrs)
                .filter(([key]) => key !== 'key')
                .map(([key, value]) => ` ${key}="${String(value).replace(/"/g, '&quot;')}"`)
                .join('');
        svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            data.node.map(([tag, attrs]) => `<${tag}${attr(attrs)}/>`).join('') +
            '</svg>';
    } catch {
        process.emitWarning(`[docs] Unknown lucide icon "${name}" — see https://lucide.dev/icons`);
    }
    iconCache.set(name, svg);
    return svg;
}

/*
 * Brand icons (Discord, GitHub, Modrinth, ...) live as Astro components in src/components/icons.
 * Markdown can't render components, so the <svg> markup is read straight from the file.
 */
const CUSTOM_ICONS_DIR = path.resolve('src/components/icons');

function customSvg(name) {
    const file = path.join(CUSTOM_ICONS_DIR, `${name}.astro`);
    if (!/^\w+$/.test(name) || !fs.existsSync(file)) return null;
    const markup = fs.readFileSync(file, 'utf8').match(/<svg[\s\S]*<\/svg>/)?.[0];
    if (!markup) return null;
    return markup
        .replace(/\s*\{\.\.\.props\}/, '')
        .replace(/\s*role="img"/, '')
        .replace(/<title>[\s\S]*?<\/title>\s*/, '')
        .replace(
            /^<svg/,
            (tag) => `${tag} aria-hidden="true"${/^<svg[^>]*\sfill=/.test(markup) ? '' : ' fill="currentColor"'}`,
        );
}

function iconSvg(name) {
    const key = `custom:${name}`;
    if (!iconCache.has(key)) iconCache.set(key, customSvg(name));
    return iconCache.get(key) ?? lucideSvg(name);
}

const icon = (name) => {
    const svg = iconSvg(name);
    return svg ? html(svg) : null;
};

function splitLabel(node) {
    const [first, ...rest] = node.children;
    if (first?.data?.directiveLabel) return { label: first.children, body: rest };
    return { label: null, body: node.children };
}

function plainText(nodes = []) {
    return nodes.map((n) => n.value ?? plainText(n.children)).join('');
}

function callout(node) {
    const cfg = CALLOUTS[node.name];
    const { label, body } = splitLabel(node);
    return el('aside', { className: ['callout', `callout-${node.name}`] }, [
        el('div', { className: ['callout-icon'] }, [icon(cfg.icon)]),
        el('div', { className: ['callout-body'] }, [
            el('p', { className: ['callout-title'] }, label ?? [text(cfg.title)]),
            ...body,
        ]),
    ]);
}

function tabs(node) {
    const items = node.children.filter((c) => c.type === 'containerDirective' && c.name === 'tab');
    const labels = items.map((tab, i) => plainText(splitLabel(tab).label) || `Tab ${i + 1}`);
    return el('div', { className: ['tabs'], dataTabs: '' }, [
        el(
            'div',
            { className: ['tab-list'], role: 'tablist' },
            labels.map((label, i) =>
                el(
                    'button',
                    { type: 'button', role: 'tab', ariaSelected: i === 0 ? 'true' : 'false', dataLabel: label },
                    [text(label)],
                ),
            ),
        ),
        ...items.map((tab, i) =>
            el('div', { className: ['tab-panel'], role: 'tabpanel', hidden: i !== 0 }, splitLabel(tab).body),
        ),
    ]);
}

function card(node) {
    const { href = '#', title = '', icon: iconName } = node.attributes ?? {};
    const external = /^https?:\/\//.test(href);
    const { body } = splitLabel(node);
    return el(
        'a',
        { className: ['card'], href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) },
        [
            ...(iconName && iconSvg(iconName) ? [el('span', { className: ['card-icon'] }, [icon(iconName)])] : []),
            el('span', { className: ['card-title'] }, [text(title)]),
            el(
                'span',
                { className: ['card-description'] },
                body.flatMap((p) => p.children ?? [p]),
            ),
        ],
    );
}

function files(node) {
    visit(node, 'listItem', (li) => {
        const isFolder = li.children.some((c) => c.type === 'list');
        li.data = { hProperties: { className: [isFolder ? 'folder' : 'file'] } };
        const first = li.children[0];
        if (first?.type === 'paragraph') {
            first.children.unshift(icon(isFolder ? 'Folder' : 'File'));
        }
    });
    return el('div', { className: ['files'] }, node.children);
}

const CONTAINERS = {
    ...Object.fromEntries(Object.keys(CALLOUTS).map((k) => [k, callout])),
    tabs,
    steps: (node) => el('div', { className: ['steps'] }, node.children),
    cards: (node) => el('div', { className: ['cards'] }, node.children),
    card,
    files,
};

/** Turn a directive we don't handle back into the text it came from (e.g. "namespace:path"). */
function restoreDirective(node) {
    const prefix = node.type === 'textDirective' ? ':' : node.type === 'leafDirective' ? '::' : ':::';
    const out = [text(prefix + node.name)];
    if (node.children?.length) out.push(text('['), ...node.children, text(']'));
    return node.type === 'textDirective' ? out : [{ type: 'paragraph', children: out }];
}

function resolveLink(url, file) {
    if (/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(url) || !file?.path) return url;
    const [, target, hash = ''] = url.match(/^([^#]*)(#.*)?$/);
    const fromDir = path.posix.dirname(path.relative(CONTENT_DIR, file.path).split(path.sep).join('/'));
    let resolved = path.posix.normalize(path.posix.join('/', fromDir, target));
    resolved = resolved.replace(/\.mdx?$/, '').replace(/\/index$/, '') || '/';
    return resolved + hash;
}

/** Post-order transform: children are processed before their parent, so nested directives work. */
function transform(node, file) {
    if (node.children) node.children = node.children.flatMap((child) => transform(child, file));

    if (node.type === 'containerDirective' && CONTAINERS[node.name]) return [CONTAINERS[node.name](node)];
    if (node.type === 'containerDirective' && node.name === 'tab') return [node];
    if (/Directive$/.test(node.type)) return restoreDirective(node);

    if (node.type === 'link' || node.type === 'definition') node.url = resolveLink(node.url, file);

    if (node.type === 'code' && node.meta) {
        const m = node.meta.match(/(?:title|filename)=(?:"([^"]+)"|(\S+))/);
        if (m) {
            return [
                el('figure', { className: ['code-block'] }, [
                    el('figcaption', {}, [icon('File'), text(m[1] ?? m[2])]),
                    node,
                ]),
            ];
        }
    }
    return [node];
}

export function remarkDocs() {
    return (tree, file) => {
        transform(tree, file);
    };
}
