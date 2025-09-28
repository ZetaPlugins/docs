import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
    subsets: ['latin'],
});

export const metadata = {
    title: 'ZetaPlugins',
    icons: {
        icon: '/favicon.ico',
        apple: '/favicons/apple-touch-icon.png',
        shortcut: '/favicons/favicon-96x96.png',
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <head></head>
            <body className="flex flex-col min-h-screen">
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
