'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/innovategram';
import { translations, sectorTranslations, stageTranslations, statusTranslations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
  tSector: (sector: any) => string;
  tStage: (stage: any) => string;
  tStatus: (status: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('innovategram_lang') as Language;
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'gu')) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    } else {
      setLanguageState('en');
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('innovategram_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: keyof typeof translations): string => {
    const entry = translations[key];
    if (!entry) return String(key);
    return entry[language] || entry.en || String(key);
  };

  const tSector = (sector: any): string => {
    if (!sector) return '';
    const entry = (sectorTranslations as any)[sector];
    if (!entry) return String(sector);
    return entry[language] || entry.en || String(sector);
  };

  const tStage = (stage: any): string => {
    if (!stage) return '';
    const entry = (stageTranslations as any)[stage];
    if (!entry) return String(stage);
    return entry[language] || entry.en || String(stage);
  };

  const tStatus = (status: any): string => {
    if (!status) return '';
    const entry = (statusTranslations as any)[status];
    if (!entry) return String(status);
    return entry[language] || entry.en || String(status);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tSector, tStage, tStatus }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

