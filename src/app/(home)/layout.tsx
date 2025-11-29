/* eslint-disable @next/next/no-img-element */
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            sidebar={{
                tabs: [
                    {
                        title: 'ZetaPlugins',
                        url: '/',
                        icon: (
                            <img
                                src="/img/z.svg"
                                alt="ZetaPlugins logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'EssentialZ',
                        url: '/essentialz',
                        icon: (
                            <img
                                src="/img/esz.svg"
                                alt="EssentialZ logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'LifeStealZ',
                        url: '/lifestealz',
                        icon: (
                            <img
                                src="/img/lsz.svg"
                                alt="LifeStealZ logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'ServerLinksZ',
                        url: '/serverlinksz',
                        icon: (
                            <img
                                src="/img/slz.svg"
                                alt="ServerLinksZ logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'CookieClickerZ',
                        url: '/cookieclickerz',
                        icon: (
                            <img
                                src="/img/ccz.svg"
                                alt="CookieClickerZ Logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'TimberZ',
                        url: '/timberz',
                        icon: (
                            <img
                                src="/img/tz.svg"
                                alt="TimberZ Logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'NetwatchZ',
                        url: '/netwatchz',
                        icon: (
                            <img
                                src="/img/nwz.svg"
                                alt="NetwatchZ Logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                    {
                        title: 'WYG',
                        url: '/wyg',
                        icon: (
                            <img
                                src="/img/wyg.svg"
                                alt="WYG Logo"
                                style={{ borderRadius: '3px' }}
                            />
                        ),
                    },
                ],
            }}
            tree={source.pageTree}
            {...baseOptions}
        >
            {children}
        </DocsLayout>
    );
}
