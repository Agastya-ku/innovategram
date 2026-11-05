import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { InnovationsProvider } from '@/context/InnovationsContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'InnovateGram | AI-Powered Grassroots & Rural Innovation Discovery',
  description:
    'A trilingual (English, Hindi, Gujarati) platform connecting rural innovators, farmers, and grassroots inventors with incubators, government, and universities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#18251E]">
        <LanguageProvider>
          <InnovationsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </InnovationsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

