'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import {
  Mic,
  Sparkles,
  Layers,
  MapPin,
  Building2,
  ArrowRight,
  Camera,
  Languages,
  Cpu,
  Globe2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function HowItWorksPage() {
  const { language, t } = useLanguage();
  const { innovations } = useInnovations();

  const totalCount = innovations.length;
  const verifiedCount = innovations.filter(i => i.status === 'Verified').length;
  const statesCovered = new Set(innovations.map(i => i.location.state)).size;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] bg-emerald-100/90 px-3.5 py-1.5 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('infographicBadge')}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#104C35] font-serif">
            {t('infographicTitle')}
          </h1>
          <AudioInstructionButton
            text={`${t('infographicTitle')}. ${t('infographicSubtitle')}`}
            size="md"
            showSpeedControl
          />
        </div>
        <p className="text-sm sm:text-base text-[#6B756E] max-w-2xl mx-auto leading-relaxed">
          {t('infographicSubtitle')}
        </p>
      </div>

      {/* 5-Step Process Visual Flow Diagram */}
      <div className="space-y-8">
        {/* STEP 1: SHARE YOUR IDEA */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-emerald-600/30 transition-all">
          <div className="w-full md:w-56 h-40 bg-gradient-to-br from-[#EAF5ED] to-emerald-100 rounded-2xl p-4 flex flex-col items-center justify-center relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#176B45] text-white flex items-center justify-center shadow-lg mb-2">
              <Mic className="w-8 h-8 animate-pulse" />
            </div>
            <span className="text-xs font-bold text-[#104C35]">બોલો અથવા ફોટો લો</span>
            <span className="text-[10px] text-[#6B756E]">માતૃભાષામાં વાતચીત</span>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-emerald-100 text-[#104C35] px-2.5 py-0.5 rounded-full">
                પગલું ૧ • STEP 1
              </span>
              <h2 className="text-xl font-bold text-[#104C35] font-serif">
                {t('step1Title')}
              </h2>
              <AudioInstructionButton text={t('step1Desc')} size="xs" />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {t('step1Desc')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-emerald-800 pt-1 justify-center md:justify-start">
              <span className="bg-emerald-50 px-3 py-1 rounded-lg">🎤 ગુજરાતી / हिन्दी / English</span>
              <span className="bg-emerald-50 px-3 py-1 rounded-lg">📸 ફોટો અપલોડ</span>
              <span className="bg-emerald-50 px-3 py-1 rounded-lg">🎥 ૩૦ સેકન્ડ વીડિયો</span>
            </div>
          </div>
        </div>

        {/* STEP 2: AI UNDERSTANDS YOUR IDEA */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-emerald-600/30 transition-all">
          <div className="w-full md:w-56 h-40 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-4 flex flex-col items-center justify-center relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg mb-2">
              <Cpu className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-orange-950">AI વિશ્લેષણ</span>
            <span className="text-[10px] text-[#6B756E]">ધ્વનિ ➔ અર્થઘટન</span>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-full">
                પગલું ૨ • STEP 2
              </span>
              <h2 className="text-xl font-bold text-[#104C35] font-serif">
                {t('step2Title')}
              </h2>
              <AudioInstructionButton text={t('step2Desc')} size="xs" />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {t('step2Desc')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-amber-900 pt-1 justify-center md:justify-start">
              <span className="bg-amber-50 px-3 py-1 rounded-lg">🤖 વોઇસ ટ્રાન્સક્રિપ્શન</span>
              <span className="bg-amber-50 px-3 py-1 rounded-lg">🌐 ૩ ભાષાઓમાં સમકક્ષ અનુવાદ</span>
              <span className="bg-amber-50 px-3 py-1 rounded-lg">🎯 ૯૫% ચોકસાઈ સ્કોર</span>
            </div>
          </div>
        </div>

        {/* STEP 3: INNOVATION IS ORGANIZED */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-emerald-600/30 transition-all">
          <div className="w-full md:w-56 h-40 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-4 flex flex-col items-center justify-center relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#104C35] text-white flex items-center justify-center shadow-lg mb-2">
              <Layers className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-[#104C35]">ડિજિટલ પ્રોફાઇલ</span>
            <span className="text-[10px] text-[#6B756E]">ID: KHJ-2026-XXXX</span>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full">
                પગલું ૩ • STEP 3
              </span>
              <h2 className="text-xl font-bold text-[#104C35] font-serif">
                {t('step3Title')}
              </h2>
              <AudioInstructionButton text={t('step3Desc')} size="xs" />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {t('step3Desc')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-teal-900 pt-1 justify-center md:justify-start">
              <span className="bg-teal-50 px-3 py-1 rounded-lg">🏷️ ૧૨ વિષયવર્ગ (Sectors)</span>
              <span className="bg-teal-50 px-3 py-1 rounded-lg">📈 ૬ વિકાસ તબક્કા (Stages)</span>
              <span className="bg-teal-50 px-3 py-1 rounded-lg">🛡️ ગ્રામીણ પ્રાઈવસી શીલ્ડ</span>
            </div>
          </div>
        </div>

        {/* STEP 4: DISCOVER YOUR INNOVATION */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-emerald-600/30 transition-all">
          <div className="w-full md:w-56 h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 flex flex-col items-center justify-center relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-lg mb-2">
              <Globe2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-blue-950">ભૌગોલિક નકશો</span>
            <span className="text-[10px] text-[#6B756E]">ગામ અને જિલ્લો</span>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full">
                પગલું ૪ • STEP 4
              </span>
              <h2 className="text-xl font-bold text-[#104C35] font-serif">
                {t('step4Title')}
              </h2>
              <AudioInstructionButton text={t('step4Desc')} size="xs" />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {t('step4Desc')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-blue-900 pt-1 justify-center md:justify-start">
              <span className="bg-blue-50 px-3 py-1 rounded-lg">🗺️ ઓપનસ્ટ્રીટમેપ & Leaflet</span>
              <span className="bg-blue-50 px-3 py-1 rounded-lg">📍 અંદાજિત જાહેર સ્થળ</span>
              <span className="bg-blue-50 px-3 py-1 rounded-lg">🔍 બહુભાષીય સર્ચ ફિલ્ટર</span>
            </div>
          </div>
        </div>

        {/* STEP 5: CONNECT WITH OPPORTUNITIES */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-emerald-600/30 transition-all">
          <div className="w-full md:w-56 h-40 bg-gradient-to-br from-purple-50 to-emerald-100 rounded-2xl p-4 flex flex-col items-center justify-center relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#176B45] text-white flex items-center justify-center shadow-lg mb-2">
              <GraduationCap className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-[#104C35]">રાષ્ટ્રીય જોડાણ</span>
            <span className="text-[10px] text-[#6B756E]">અનુદાન & પ્રમાણીકરણ</span>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full">
                પગલું ૫ • STEP 5
              </span>
              <h2 className="text-xl font-bold text-[#104C35] font-serif">
                {t('step5Title')}
              </h2>
              <AudioInstructionButton text={t('step5Desc')} size="xs" />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {t('step5Desc')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#104C35] pt-1 justify-center md:justify-start">
              <span className="bg-purple-50 px-3 py-1 rounded-lg">🏛️ સરકારી વિભાગો & KVK</span>
              <span className="bg-purple-50 px-3 py-1 rounded-lg">🌱 ઇનક્યુબેટર & ગ્રાન્ટ</span>
              <span className="bg-purple-50 px-3 py-1 rounded-lg">🏭 ઉત્પાદન સહાય</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Infographic Metrics Overview */}
      <div className="bg-gradient-to-br from-[#104C35] to-[#176B45] rounded-3xl p-8 sm:p-10 text-white shadow-xl text-center space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold font-serif">
          પ્લેટફોર્મ આંકડાકીય પ્રગતિ (Live Database)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20">
            <p className="text-4xl font-extrabold font-serif text-emerald-200">{totalCount}</p>
            <p className="text-xs font-semibold text-emerald-100 mt-1 uppercase tracking-wider">
              નોંધાયેલા પાયાના આવિષ્કારો
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20">
            <p className="text-4xl font-extrabold font-serif text-emerald-200">{verifiedCount}</p>
            <p className="text-xs font-semibold text-emerald-100 mt-1 uppercase tracking-wider">
              ચકાસાયેલ સફળ મોડેલ્સ
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20">
            <p className="text-4xl font-extrabold font-serif text-emerald-200">{statesCovered}</p>
            <p className="text-xs font-semibold text-emerald-100 mt-1 uppercase tracking-wider">
              પ્રતિનિધિત્વ ધરાવતા રાજ્યો
            </p>
          </div>
        </div>
        <div className="pt-2">
          <Link
            href="/innovator"
            className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-[#104C35] font-bold px-8 py-4 rounded-2xl shadow-lg transition-all text-sm"
          >
            <Mic className="w-4 h-4 text-[#176B45]" />
            <span>તમારો આવિષ્કાર રજૂ કરો</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
