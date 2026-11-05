import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { InnovationsProvider } from '@/context/InnovationsContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'InnovateGram | રાષ્ટ્રીય ગ્રામીણ આવિષ્કાર મંચ | AI Grassroots Innovation Platform',
  description:
    'A trilingual (Gujarati, Hindi, English) platform connecting rural innovators, farmers, and grassroots inventors with incubators, government, and universities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="gu">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+Gujarati:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#18251E] antialiased">
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
