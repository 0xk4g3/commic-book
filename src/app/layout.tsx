import type { Metadata } from 'next';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Tajawal, Amiri } from 'next/font/google';
import './globals.css';

const tajawal: NextFont = Tajawal({
    weight: ['300', '400', '500', '700', '800'],
    subsets: ['arabic', 'latin'],
    variable: '--font-tajawal',
    display: 'swap',
});

const amiri: NextFont = Amiri({
    weight: ['400', '700'],
    subsets: ['arabic', 'latin'],
    variable: '--font-amiri',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'UAE Winter Tales - Educational Comic Book Generator',
    description:
        'Create educational comic books featuring UAE winter traditions and cultural values. Generate beautiful stories about courage, kindness, resilience, respect, tolerance, and creativity.',
    keywords: [
        'UAE',
        'winter',
        'comics',
        'education',
        'children',
        'traditions',
        'values',
        'storytelling',
        'Emirati culture',
    ],
    authors: [{ name: 'UAE Winter Tales' }],
    openGraph: {
        title: 'UAE Winter Tales - Educational Comic Book Generator',
        description:
            'Create educational comic books featuring UAE winter traditions and values',
        type: 'website',
        locale: 'en_AE',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="ltr" className={`${tajawal.variable} ${amiri.variable}`}>
            <body className="min-h-screen bg-gradient-to-br from-desert-light via-winter-light to-ivory antialiased">
                {children}

                <footer className="mt-16 border-t border-gray-200 bg-white/50 py-8 text-center backdrop-blur-sm">
                    <p className="text-sm text-gray-600">
                        UAE Winter Tales © 2024 | Educational Comic Book Generator
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                        Celebrating UAE traditions and values through storytelling
                    </p>
                </footer>
            </body>
        </html>
    );
}
