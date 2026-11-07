# ZetaPlugins docs

The documentation for the ZetaPlugins Minecraft plugins, built with [Astro](https://astro.build) and plain Markdown.

## Development

```
pnpm install
pnpm dev        # local dev server
pnpm build      # static build to dist/ + search index (Pagefind)
pnpm preview    # serve dist/ on port 8010
```

Search only works after `pnpm build`, since the index is generated from the built pages.

## Writing docs

Pages live in `content/docs/` as `.md` files. The URL follows the path (`lifestealz/config/index.md` → `/lifestealz/config`).

```md
---
title: Custom Items
description: Shown below the title and used for SEO.
icon: Gem # any lucide icon name (https://lucide.dev/icons), shown in the sidebar
---
```

### Navigation

Each product folder has a `meta.json` that defines its sidebar. `content/docs/meta.json` defines the root section and the order of products.

```json
{
    "title": "LifeStealZ",
    "description": "The LifeStealZ plugin",
    "logo": "/img/lsz.svg",
    "pages": ["index", "installation", "---Commands---", "commands/hearts"]
}
```

Entries like `---Commands---` start a new sidebar group. Use `"icon": "Wrench"` instead of `logo` to use a lucide icon.

Add `"accent": "#dc1f1f"` to give a product's docs its own accent color (links, active sidebar item, highlights). The lighter and darker shades for light and dark mode are derived from it automatically; without it, the ZetaPlugins purple is used.

### Links

Relative links are resolved from the current file, so `[Messages](messages.md#formatting)` and `[Commands](guide/commands)` both work.

### Components

Extra blocks use the generic directive syntax:

````md
:::warning
Callouts: `note`, `info`, `tip`, `warning`, `danger`.
:::

:::tip[Custom title]
With a custom title.
:::

::::tabs
:::tab[Maven]

```xml
<dependency>...</dependency>
```

:::
:::tab[Gradle]

```groovy
compileOnly '...'
```

:::
::::

::::steps

### Download

Each `###` heading becomes a numbered step.

:::warning
A block nested inside another needs fewer colons than its parent (here 3 inside 4).
:::

### Upload

...
::::

::::cards
:::card{href="/zetacore/guide" title="Guide" icon="Footprints"}
Card description.
:::
::::

:::files

- plugins/
    - LifeStealZ/
        - config.yml

:::

```yaml title="items.yml"
# code block with a file name
```
````

Tabs with the same label (e.g. Maven/Gradle) stay in sync across the page and are remembered.
