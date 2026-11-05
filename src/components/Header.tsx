'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Language } from '@/types/innovategram';
import {
  Sparkles,
  Globe,
  Wifi,
  WifiOff,
  RefreshCw,
  Mic,
  Compass,
  Layers,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isOnline, offlineDraftsCount, syncOfflineDrafts } = useInnovations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isInnovator = pathname.startsWith('/innovator');
  const isStakeholder = pathname.startsWith('/stakeholder');
  const isAdmin = pathname.startsWith('/admin');

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'gu', label: 'ગુજરાતી', script: 'GU' },
    { code: 'hi', label: 'हिन्दी', script: 'HI' },
    { code: 'en', label: 'English', script: 'EN' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAF7]/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Notification / Offline Bar */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>You are currently offline. New innovations will be saved to your device and synced automatically.</span>
          {offlineDraftsCount > 0 && (
            <button
              onClick={syncOfflineDrafts}
              className="ml-2 bg-white text-amber-800 text-[11px] px-2 py-0.5 rounded font-bold hover:bg-amber-50"
            >
              Sync {offlineDraftsCount} Draft(s)
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Platform Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#176B45] to-[#104C35] flex items-center justify-center shadow-md shadow-emerald-900/15 text-white transform group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#104C35] font-serif">
                  {t('brandName')}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100/80 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300">
                  GovTech
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-[#6B756E] font-medium truncate max-w-sm">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Navigation links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-emerald-950/5 p-1 rounded-xl border border-emerald-900/10">
            <Link
              href="/innovator"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isInnovator
                  ? 'bg-[#176B45] text-white shadow-xs'
                  : 'text-[#18251E] hover:text-[#176B45] hover:bg-emerald-50'
              }`}
            >
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>{t('portalInnovator')}</span>
            </Link>

            <Link
              href="/stakeholder"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isStakeholder
                  ? 'bg-[#176B45] text-white shadow-xs'
                  : 'text-[#18251E] hover:text-[#176B45] hover:bg-emerald-50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{t('portalStakeholder')}</span>
            </Link>

            <Link
              href="/stakeholder/discover"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/stakeholder/discover'
                  ? 'bg-emerald-100 text-[#104C35]'
                  : 'text-[#6B756E] hover:text-[#18251E] hover:bg-emerald-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t('navDiscover')}</span>
            </Link>

            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isAdmin
                  ? 'bg-emerald-900 text-white'
                  : 'text-[#6B756E] hover:text-[#18251E]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('portalAdmin')}</span>
            </Link>
          </nav>

          {/* Language Switcher & Controls */}
          <div className="flex items-center gap-2.5">
            {/* Three-language switcher */}
            <div className="flex items-center bg-white border border-emerald-900/15 rounded-lg p-0.5 shadow-xs">
              <div className="px-2 py-1 text-emerald-700 hidden sm:flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
              </div>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    language === lang.code
                      ? 'bg-[#176B45] text-white shadow-xs'
                      : 'text-[#18251E] hover:bg-emerald-50'
                  }`}
                  title={lang.label}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-emerald-950 hover:bg-emerald-50 border border-emerald-900/10"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-emerald-900/10 space-y-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between p-2 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold text-[#104C35] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>ભાષા પસંદ કરો:</span>
              </span>
              <div className="flex items-center gap-1">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                      language === lang.code
                        ? 'bg-[#176B45] text-white shadow-xs'
                        : 'bg-white text-[#18251E] border border-gray-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/innovator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-50 text-[#104C35] font-semibold text-sm"
            >
              <Mic className="w-4 h-4 text-[#176B45]" />
              <span>{t('portalInnovator')}</span>
            </Link>
            <Link
              href="/stakeholder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-medium text-sm"
            >
              <Layers className="w-4 h-4 text-[#176B45]" />
              <span>{t('portalStakeholder')}</span>
            </Link>
            <Link
              href="/stakeholder/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-medium text-sm"
            >
              <Compass className="w-4 h-4 text-[#176B45]" />
              <span>{t('navDiscover')}</span>
            </Link>
            <Link
              href="/stakeholder/map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-medium text-sm"
            >
              <span>{t('navMap')}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-medium text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#176B45]" />
              <span>{t('portalAdmin')}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

