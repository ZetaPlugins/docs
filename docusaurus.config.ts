import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "Zeta Plugins",
    tagline: "Creating high-quality, open-source Minecraft plugins.",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://docs.zetaplugins.com/",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "ZetaPlugins", // Usually your GitHub org/user name.
    projectName: "docs", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    routeBasePath: "/",
                    sidebarPath: "./sidebars.ts",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // image: "img/docusaurus-social-card.jpg",
        colorMode: {
            defaultMode: "dark",
            respectPrefersColorScheme: true,
            disableSwitch: false,
        },
        navbar: {
            title: "",
            logo: {
                alt: "Zeta Plugins Logo",
                src: "img/logo_long.svg",
            },
            items: [
                {
                    href: "https://github.com/ZetaPlugins",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Plugins",
                    items: [
                        {
                            label: "LifeStealZ",
                            href: "https://wiki.lifestealz.com/",
                        },
                        {
                            label: "ServerLinksZ",
                            to: "/serverlinksz",
                        },
                    ],
                },
                {
                    title: "Platforms",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/ZetaPlugins",
                        },
                        {
                            label: "Modrinth",
                            href: "https://modrinth.com/organization/zetaplugins",
                        },
                    ],
                },
                {
                    title: "Support",
                    items: [
                        {
                            label: "Discord",
                            href: "https://strassburger.org/discord",
                        },
                    ],
                },
            ],
            copyright: `Copyright © 2025 Zeta Plugins.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
