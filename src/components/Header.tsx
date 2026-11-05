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
  WifiOff,
  Mic,
  Compass,
  Layers,
  ShieldCheck,
  Menu,
  X,
  User,
  MapPin
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isOnline, offlineDraftsCount, syncOfflineDrafts, currentProfile } = useInnovations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isInnovator = pathname.startsWith('/innovator');
  const isStakeholder = pathname.startsWith('/stakeholder') && !pathname.includes('discover') && !pathname.includes('map');
  const isDiscover = pathname === '/stakeholder/discover' || pathname === '/discover';
  const isMap = pathname === '/stakeholder/map';
  const isAdmin = pathname.startsWith('/admin');
  const isDashboard = pathname === '/dashboard' || pathname === '/innovator/my-innovations';

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'gu', label: 'ગુજરાતી', script: 'GU' },
    { code: 'hi', label: 'हिन्दी', script: 'HI' },
    { code: 'en', label: 'English', script: 'EN' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAF7]/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Offline Notification Bar */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>
            {language === 'gu'
              ? 'તમે હાલમાં ઑફલાઇન છો. તમારા આવિષ્કારો ડિવાઇસ પર સુરક્ષિત સંગ્રહિત થશે.'
              : language === 'hi'
              ? 'आप अभी ऑफलाइन हैं। आपके नवाचार डिवाइस पर सुरक्षित सहेजे जाएंगे।'
              : 'You are currently offline. New innovations will be saved to your device and synced.'}
          </span>
          {offlineDraftsCount > 0 && (
            <button
              onClick={syncOfflineDrafts}
              className="ml-2 bg-white text-amber-800 text-[11px] px-2 py-0.5 rounded font-bold hover:bg-amber-50 cursor-pointer"
            >
              Sync {offlineDraftsCount} Draft(s)
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & KHOJ Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#104C35] to-[#176B45] flex items-center justify-center shadow-md shadow-emerald-900/20 text-white transform group-hover:scale-105 transition-transform border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-[#104C35] font-serif">
                  KHOJ
                </span>
                <span className="text-lg font-bold text-amber-700 font-serif">
                  खोज
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100/90 text-[#104C35] px-2 py-0.5 rounded-full border border-emerald-300">
                  રાષ્ટ્રીય મંચ
                </span>
              </div>
              <p className="text-[11px] font-semibold text-emerald-900/90 tracking-tight leading-tight truncate max-w-sm sm:max-w-md">
                छोटा या बड़ा, हर आविष्कार पहचान का हकदार।
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-emerald-950/5 p-1 rounded-xl border border-emerald-900/10">
            {/* Register an Innovation Button */}
            <Link
              href="/innovator"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                isInnovator && !isDashboard
                  ? 'bg-[#104C35] text-white shadow-xs'
                  : 'text-[#104C35] hover:bg-emerald-100/60'
              }`}
            >
              <Mic className="w-4 h-4 text-amber-500" />
              <span>{t('registerInnovationBtn')}</span>
            </Link>

            {/* Discover Innovations */}
            <Link
              href="/stakeholder/discover"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isDiscover
                  ? 'bg-[#176B45] text-white shadow-xs'
                  : 'text-[#18251E] hover:text-[#176B45] hover:bg-emerald-50'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>{t('discoverInnovationsBtn')}</span>
            </Link>

            {/* Interactive Map */}
            <Link
              href="/stakeholder/map"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isMap
                  ? 'bg-[#176B45] text-white'
                  : 'text-[#6B756E] hover:text-[#18251E] hover:bg-emerald-50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>

            {/* Returning User Dashboard */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isDashboard
                  ? 'bg-[#104C35] text-white'
                  : 'text-[#6B756E] hover:text-[#18251E] hover:bg-emerald-50'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentProfile ? currentProfile.fullName.split(' ')[0] : t('myDashboardHeading')}</span>
            </Link>

            {/* Stakeholder Portal */}
            <Link
              href="/stakeholder"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isStakeholder
                  ? 'bg-[#176B45] text-white'
                  : 'text-[#6B756E] hover:text-[#18251E] hover:bg-emerald-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('portalStakeholder')}</span>
            </Link>

            {/* Admin Portal */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                isAdmin
                  ? 'bg-emerald-950 text-white'
                  : 'text-[#6B756E] hover:text-[#18251E]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('portalAdmin')}</span>
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-emerald-900/15 rounded-lg p-0.5 shadow-xs">
              <div className="px-2 py-1 text-emerald-700 hidden sm:flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
              </div>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#104C35] text-white shadow-xs'
                      : 'text-[#18251E] hover:bg-emerald-50'
                  }`}
                  title={lang.label}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-emerald-950 hover:bg-emerald-50 border border-emerald-900/10 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-emerald-900/10 space-y-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold text-[#104C35] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('selectLanguagePrompt')}</span>
              </span>
              <div className="flex items-center gap-1">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      language === lang.code
                        ? 'bg-[#104C35] text-white shadow-xs'
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
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#104C35] text-white font-bold text-sm"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>{t('registerInnovationBtn')}</span>
            </Link>

            <Link
              href="/stakeholder/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-semibold text-sm"
            >
              <Compass className="w-4 h-4 text-[#176B45]" />
              <span>{t('discoverInnovationsBtn')}</span>
            </Link>

            <Link
              href="/stakeholder/map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-medium text-sm"
            >
              <MapPin className="w-4 h-4 text-[#176B45]" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-[#18251E] font-medium text-sm"
            >
              <User className="w-4 h-4 text-[#176B45]" />
              <span>{t('myDashboardHeading')}</span>
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
