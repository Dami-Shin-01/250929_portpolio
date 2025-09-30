import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Portfolio | 웹 디자이너 포트폴리오',
  description: '창의적인 웹 디자인과 사용자 경험을 만듭니다',
  keywords: ['웹디자인', 'UI/UX', '포트폴리오', 'Web Design', 'Portfolio'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio | 웹 디자이너 포트폴리오',
    description: '창의적인 웹 디자인과 사용자 경험을 만듭니다',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
