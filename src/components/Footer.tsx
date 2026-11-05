'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Shield, HeartHandshake, PhoneCall, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#104C35] text-[#F8FAF7] border-t border-emerald-950 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-serif">
                  KHOJ (खोज)
                </span>
              </div>
            </div>
            <p className="text-xs text-amber-300 font-semibold leading-relaxed">
              छोटा या बड़ा, हर आविष्कार पहचान का हकदार।
            </p>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              {t('taglineTranslated')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Government-Tech Grassroots Architecture</span>
            </div>
          </div>

          {/* Innovator Pathway */}
          <div>
            <h4 className="text-sm font-semibold text-emerald-200 uppercase tracking-wider mb-3">
              {t('portalInnovator')}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link href="/innovator" className="hover:text-white transition-colors">
                  {t('voiceRecordBtn')}
                </Link>
              </li>
              <li>
                <Link href="/innovator" className="hover:text-white transition-colors">
                  {t('photoUploadBtn')} & {t('videoUploadBtn')}
                </Link>
              </li>
              <li>
                <Link href="/innovator/my-innovations" className="hover:text-white transition-colors">
                  {t('myInnovationsBtn')}
                </Link>
              </li>
              <li>
                <Link href="/innovator/help" className="hover:text-white transition-colors">
                  {t('audioHelpBtn')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Stakeholder Pathway */}
          <div>
            <h4 className="text-sm font-semibold text-emerald-200 uppercase tracking-wider mb-3">
              {t('portalStakeholder')}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link href="/stakeholder" className="hover:text-white transition-colors">
                  {t('navOverview')}
                </Link>
              </li>
              <li>
                <Link href="/stakeholder/discover" className="hover:text-white transition-colors">
                  {t('navDiscover')}
                </Link>
              </li>
              <li>
                <Link href="/stakeholder/map" className="hover:text-white transition-colors">
                  {t('navMap')}
                </Link>
              </li>
              <li>
                <Link href="/stakeholder/review" className="hover:text-white transition-colors">
                  {t('navReview')}
                </Link>
              </li>
              <li>
                <Link href="/stakeholder/requests" className="hover:text-white transition-colors">
                  {t('navRequests')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Rural Safeguards */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-200 uppercase tracking-wider">
              Rural Privacy Shield
            </h4>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Personal telephone numbers and exact home coordinates are never published without institutional authorization and innovator consent.
            </p>
            <div className="p-2.5 rounded-lg bg-emerald-900/60 border border-emerald-800 text-[11px] text-emerald-200">
              <span className="font-semibold block mb-0.5">Languages Supported:</span>
              <span>English • हिन्दी (Hindi) • ગુજરાતી (Gujarati)</span>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright */}
        <div className="border-t border-emerald-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-200/60 gap-4">
          <p>
            © 2026 KHOJ (खोज) Platform. چھوٹा या बड़ा, हर आविष्कार पहचान का हकदार।
          </p>
          <div className="flex items-center gap-4">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">
              Prototype Preview with 12 Sample Demonstration Records
            </span>
            <Link href="/innovator/help" className="hover:text-white">
              FAQ & Guidance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

