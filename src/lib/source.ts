import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { defineDocs } from 'fumadocs-mdx/macro';
import { createElement } from "react";
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
    // it assigns a URL to your pages
    baseUrl: "/",
    source: docs.toFumadocsSource(),
    icon(iconName) {
        if (iconName && iconName in icons) {
            return createElement(icons[iconName as keyof typeof icons]);
        }
    },
});
