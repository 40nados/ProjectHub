import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PageTransition from '@/components/project/pageTransition';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Project Hub',
    description: 'A project for projects',
    icons: {
        icon: '/Icon site/favicon-32x32.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <PageTransition>{children}</PageTransition>
            </body>
        </html>
    );
}
