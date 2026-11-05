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
  MapPin,
  Plus,
  ArrowRight
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
    <header className="sticky top-0 z-50 bg-[#F8FAF7]/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs transition-all">
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
        <div className="flex items-center justify-between h-20">
          {/* Logo & KHOJ Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D3826] via-[#104C35] to-[#176B45] flex items-center justify-center shadow-md shadow-emerald-950/20 text-white transform group-hover:scale-105 transition-all border border-amber-400/40">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D3826] font-serif">
                  KHOJ
                </span>
                <span className="text-xl sm:text-2xl font-bold text-amber-600 font-serif">
                  खोज
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-[#0D3826] px-2 py-0.5 rounded-full border border-emerald-300/80">
                  {language === 'gu' ? 'રાષ્ટ્રીય મંચ' : language === 'hi' ? 'राष्ट्रीय मंच' : 'National Platform'}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-amber-800/90 tracking-tight leading-none mt-0.5">
                छोटा या बड़ा, हर आविष्कार पहचान का हकदार।
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <Link
              href="/stakeholder/discover"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isDiscover
                  ? 'bg-emerald-100 text-[#0D3826]'
                  : 'text-[#4A5550] hover:text-[#0D3826] hover:bg-emerald-50/70'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#104C35]" />
              <span>{t('discoverInnovationsBtn')}</span>
            </Link>

            <Link
              href="/stakeholder/map"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isMap
                  ? 'bg-emerald-100 text-[#0D3826]'
                  : 'text-[#4A5550] hover:text-[#0D3826] hover:bg-emerald-50/70'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#104C35]" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>

            <Link
              href="/stakeholder"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isStakeholder
                  ? 'bg-emerald-100 text-[#0D3826]'
                  : 'text-[#4A5550] hover:text-[#0D3826] hover:bg-emerald-50/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#104C35]" />
              <span>{t('portalStakeholder')}</span>
            </Link>

            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isAdmin
                  ? 'bg-[#0D3826] text-white'
                  : 'text-[#6B756E] hover:text-[#0D3826] hover:bg-emerald-50/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('portalAdmin')}</span>
            </Link>
          </nav>

          {/* Right Action Cluster: User Dashboard + Register CTA + Language */}
          <div className="flex items-center gap-3">
            {/* User Profile or Dashboard Chip */}
            <Link
              href="/dashboard"
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isDashboard
                  ? 'bg-emerald-100 border-emerald-300 text-[#0D3826]'
                  : 'bg-white border-emerald-950/15 text-[#4A5550] hover:border-[#104C35] hover:text-[#0D3826]'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#104C35] flex items-center justify-center font-bold text-[10px]">
                {currentProfile ? currentProfile.fullName.charAt(0) : <User className="w-3 h-3" />}
              </div>
              <span className="truncate max-w-[120px]">
                {currentProfile ? currentProfile.fullName.split(' ')[0] : t('myDashboardHeading')}
              </span>
            </Link>

            {/* Primary Action Button: Register Innovation */}
            <Link
              href="/innovator"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0D3826] hover:bg-[#176B45] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all border border-emerald-700/50 group"
            >
              <Mic className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>{t('registerInnovationBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center bg-white border border-emerald-950/15 rounded-xl p-1 shadow-2xs">
              <div className="px-1.5 text-emerald-700 hidden sm:flex items-center">
                <Globe className="w-3.5 h-3.5" />
              </div>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#0D3826] text-white shadow-2xs'
                      : 'text-[#4A5550] hover:text-[#0D3826] hover:bg-emerald-50/70'
                  }`}
                  title={lang.label}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-emerald-950 hover:bg-emerald-50 border border-emerald-950/15 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-emerald-950/10 space-y-2.5 animate-in slide-in-from-top-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between p-3 bg-emerald-50/90 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-[#0D3826] flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-700" />
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
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      language === lang.code
                        ? 'bg-[#0D3826] text-white shadow-xs'
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
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#0D3826] text-white font-bold text-sm shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Mic className="w-4 h-4 text-amber-300" />
                <span>{t('registerInnovationBtn')}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-[#18251E] font-bold text-xs"
            >
              <User className="w-4 h-4 text-[#104C35]" />
              <span>{t('myDashboardHeading')}</span>
            </Link>

            <Link
              href="/stakeholder/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-[#18251E] font-semibold text-xs"
            >
              <Compass className="w-4 h-4 text-[#104C35]" />
              <span>{t('discoverInnovationsBtn')}</span>
            </Link>

            <Link
              href="/stakeholder/map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-[#18251E] font-semibold text-xs"
            >
              <MapPin className="w-4 h-4 text-[#104C35]" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>

            <Link
              href="/stakeholder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-[#18251E] font-semibold text-xs"
            >
              <Layers className="w-4 h-4 text-[#104C35]" />
              <span>{t('portalStakeholder')}</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-[#18251E] font-medium text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#104C35]" />
              <span>{t('portalAdmin')}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
