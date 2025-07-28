import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: (
            <>
                <Image
                    src="/img/z_long.svg"
                    alt="ZetaPlugins logo"
                    width={150}
                    height={50}
                />
            </>
        ),
    },
    githubUrl: "https://github.com/ZetaPlugins",
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
};
