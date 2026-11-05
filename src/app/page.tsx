'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import {
  Mic,
  Sparkles,
  ArrowRight,
  Compass,
  MapPin,
  CheckCircle2,
  Users,
  Building2,
  Award,
  Layers,
  Camera,
  Languages,
  UserCheck,
  HeartHandshake,
  Check,
  UserPlus,
  LogIn,
  X,
  Cpu,
  Globe2,
  GraduationCap,
  Wrench,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  const { language, setLanguage, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations } = useInnovations();
  const router = useRouter();

  // Welcome Gate Modal: New User vs Existing User (Requirement 4)
  const [showWelcomeGate, setShowWelcomeGate] = useState(false);

  // Live database metrics
  const totalCount = innovations.length;
  const verifiedCount = innovations.filter(i => i.status === 'Verified').length;
  const statesCovered = new Set(innovations.map(i => i.location.state)).size;
  const sectorsCount = new Set(innovations.map(i => i.sector)).size;

  const featured = innovations.slice(0, 3);

  const handleSelectNewUser = () => {
    setShowWelcomeGate(false);
    router.push('/innovator?mode=new');
  };

  const handleSelectExistingUser = () => {
    setShowWelcomeGate(false);
    router.push('/innovator?mode=login');
  };

  const handleSelectAssisted = () => {
    setShowWelcomeGate(false);
    router.push('/innovator?mode=assisted');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION - BRAND IDENTITY & IMMEDIATE PURPOSE CLARITY (WITHIN 5 SECONDS) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5ED]/90 via-[#F8FAF7] to-[#F8FAF7] pt-8 pb-14 sm:pb-20 border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Purpose & Primary Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Badge & Language Selector */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100/90 border border-emerald-300 text-[#104C35] px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {language === 'gu'
                      ? 'રાષ્ટ્રીય ગ્રામીણ આવિષ્કાર મંચ'
                      : language === 'hi'
                      ? 'राष्ट्रीय ग्रामीण नवाचार मंच'
                      : 'National Grassroots Innovation Platform'}
                  </span>
                </div>

                {/* Visible Language Pill */}
                <div className="inline-flex items-center gap-1 bg-white border border-emerald-900/20 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-950 shadow-xs">
                  <Languages className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[11px] text-[#6B756E]">{t('selectLanguagePrompt')}</span>
                  <button
                    onClick={() => setLanguage('gu')}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      language === 'gu' ? 'bg-[#104C35] text-white' : 'hover:text-[#104C35]'
                    }`}
                  >
                    ગુજરાતી
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      language === 'hi' ? 'bg-[#104C35] text-white' : 'hover:text-[#104C35]'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      language === 'en' ? 'bg-[#104C35] text-white' : 'hover:text-[#104C35]'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Brand Title, Hindi Name & Primary Tagline */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3">
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#104C35] font-serif">
                    KHOJ
                  </h1>
                  <span className="text-3xl sm:text-5xl font-extrabold text-amber-600 font-serif">
                    खोज
                  </span>
                  <AudioInstructionButton
                    text={`${t('tagline')}. ${t('khojHeroSubtitle')}`}
                    size="sm"
                    showSpeedControl
                  />
                </div>

                {/* Mandated Hindi Tagline Displayed Prominently */}
                <p className="text-xl sm:text-2xl font-bold text-amber-700 tracking-tight font-serif">
                  "छोटा या बड़ा, हर आविष्कार पहचान का हकदार।"
                </p>

                {language !== 'hi' && (
                  <p className="text-xs text-[#6B756E] italic">
                    ({t('taglineTranslated')})
                  </p>
                )}
              </div>

              {/* Exact Supporting Text (Requirement 3) */}
              <div className="space-y-2 max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-lg sm:text-xl font-bold text-[#104C35] leading-snug">
                  {t('khojHeroHeadline')}
                </h2>
                <p className="text-sm sm:text-base text-[#18251E] font-medium leading-relaxed">
                  {t('khojHeroSubtitle')}
                </p>
              </div>

              {/* Two Prominent Action Buttons (Requirement 3) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setShowWelcomeGate(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#104C35] hover:bg-[#176B45] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-900/20 transform hover:-translate-y-0.5 transition-all cursor-pointer border-2 border-emerald-700/40"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                    <Mic className="w-4 h-4 text-amber-300" />
                  </div>
                  <span>{t('registerInnovationBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/stakeholder/discover"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-[#104C35] border-2 border-[#104C35]/30 text-base font-bold px-7 py-3.5 rounded-2xl shadow-xs transition-all"
                >
                  <Compass className="w-5 h-5 text-[#104C35]" />
                  <span>{t('discoverInnovationsBtn')}</span>
                </Link>
              </div>

              {/* Quick Guidance Note & No Paperwork Guarantee */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[#6B756E]">
                <div className="flex items-center gap-1.5">
                  <AudioInstructionButton text={t('voiceInstructionHome')} size="xs" />
                  <span>{t('voiceInstructionHome')}</span>
                </div>
                <span>•</span>
                <span className="font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  {t('aadhaarNotRequired')}
                </span>
              </div>
            </div>

            {/* Right Col: Custom Visual Storytelling Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border-2 border-emerald-900/15 shadow-xl space-y-4">
                {/* Header label */}
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                  <span className="text-xs font-bold text-[#104C35] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>
                      {language === 'gu'
                        ? 'ગામડાની શોધ • રાષ્ટ્રીય મંચ'
                        : language === 'hi'
                        ? 'ग्रामीण खोज • राष्ट्रीय मंच'
                        : 'Rural Innovation • National Stage'}
                    </span>
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-300">
                    {t('zeroFee')}
                  </span>
                </div>

                {/* Illustrated SVG: Farmer & mechanic demonstrating grassroots invention to AI & National Hub */}
                <div className="h-60 bg-gradient-to-br from-[#EAF5ED] to-amber-50/50 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-emerald-200/50">
                  <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Soft Hill */}
                    <path d="M0 210 Q200 170 400 210 L400 240 L0 240 Z" fill="#D5ECD9" opacity="0.7" />

                    {/* Sun / Solar Energy Symbol */}
                    <circle cx="340" cy="45" r="24" fill="#F59E0B" opacity="0.25" />
                    <circle cx="340" cy="45" r="14" fill="#F59E0B" opacity="0.8" />

                    {/* Rural Farm Machine / Invention Demonstration */}
                    <g transform="translate(180, 110)">
                      {/* Machine Wheel */}
                      <circle cx="60" cy="70" r="28" stroke="#104C35" strokeWidth="4" fill="#F8FAF7" />
                      <circle cx="60" cy="70" r="10" fill="#176B45" />
                      <line x1="60" y1="42" x2="60" y2="98" stroke="#104C35" strokeWidth="2.5" />
                      <line x1="32" y1="70" x2="88" y2="70" stroke="#104C35" strokeWidth="2.5" />
                      {/* Frame */}
                      <line x1="60" y1="70" x2="110" y2="40" stroke="#104C35" strokeWidth="4" strokeLinecap="round" />
                      <line x1="110" y1="40" x2="150" y2="20" stroke="#176B45" strokeWidth="4.5" strokeLinecap="round" />
                      {/* Cultivator Blade */}
                      <path d="M40 92 L75 92 L85 105 L30 105 Z" fill="#E65100" />
                      <text x="35" y="122" fontSize="9" fontWeight="bold" fill="#104C35">
                        {language === 'gu' ? 'દેશી આવિષ્કાર' : language === 'hi' ? 'देसी नवाचार' : 'Grassroots Device'}
                      </text>
                    </g>

                    {/* Dotted Arrow to KHOJ Hub */}
                    <path d="M120 95 Q150 35 220 45" stroke="#176B45" strokeWidth="2.5" strokeDasharray="4 4" />
                    <circle cx="220" cy="45" r="4" fill="#E65100" />

                    {/* KHOJ AI Platform Cloud Hub */}
                    <g transform="translate(225, 25)">
                      <rect x="0" y="0" width="135" height="46" rx="12" fill="#104C35" stroke="#E65100" strokeWidth="1.5" />
                      <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#FFFFFF">KHOJ • खोज AI</text>
                      <text x="12" y="36" fontSize="8" fill="#FCD34D">
                        {language === 'gu' ? 'અવાજ ➔ ૩ ભાષા વર્ગીકરણ' : language === 'hi' ? 'ध्वनि ➔ 3 भाषा वर्गीकरण' : 'Voice ➔ Multilingual AI'}
                      </text>
                    </g>

                    {/* Innovator Character (Farmer / Mechanic with Smartphone) */}
                    <g transform="translate(45, 55)">
                      {/* Headwear */}
                      <ellipse cx="45" cy="38" rx="18" ry="12" fill="#E65100" />
                      <circle cx="45" cy="48" r="14" fill="#FCD34D" />
                      {/* Body */}
                      <path d="M22 80 C22 66 32 64 45 64 C58 64 68 66 68 80 L70 140 L20 140 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                      {/* Kurta / Vest */}
                      <path d="M30 68 L45 92 L60 68 L64 125 L26 125 Z" fill="#176B45" />
                      {/* Arm holding phone to speak */}
                      <path d="M60 85 Q75 75 80 58" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round" />
                      <rect x="76" y="44" width="14" height="24" rx="3" fill="#18251E" />
                      <rect x="78" y="46" width="10" height="20" rx="2" fill="#34D399" />
                      {/* Voice Sound waves */}
                      <path d="M60 50 Q66 50 68 54" stroke="#E65100" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M58 46 Q68 46 72 54" stroke="#E65100" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>
                  </svg>
                </div>

                {/* Two Action Preview Options */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button
                    onClick={() => handleSelectNewUser()}
                    className="p-3 bg-[#EAF5ED] hover:bg-emerald-100 rounded-2xl text-left border border-emerald-200 transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-[#104C35] flex items-center justify-between">
                      <span>{language === 'gu' ? 'નવા વપરાશકર્તા' : language === 'hi' ? 'नए उपयोगकर्ता' : 'New User'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-[#6B756E] mt-0.5 font-medium">
                      {t('newUserOption')}
                    </p>
                  </button>

                  <button
                    onClick={() => handleSelectExistingUser()}
                    className="p-3 bg-amber-50 hover:bg-amber-100 rounded-2xl text-left border border-amber-200 transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-amber-950 flex items-center justify-between">
                      <span>{language === 'gu' ? 'અગાઉ નોંધણી કરી છે' : language === 'hi' ? 'पहले पंजीकृत' : 'Existing User'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-[#6B756E] mt-0.5 font-medium">
                      {t('existingUserOption')}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Infographic Statistics backed by live database */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#104C35] font-serif">{totalCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                {t('metricTotalInnovations')}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-amber-600 font-serif">{verifiedCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                {t('metricVerified')}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#104C35] font-serif">{sectorsCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                {t('metricSectors')}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#176B45] font-serif">{statesCovered}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                {t('metricStates')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFOGRAPHIC-BASED 5-STEP JOURNEY: SHARE → UNDERSTAND → CLASSIFY → DISCOVER → CONNECT (REQUIREMENT 2 & 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#104C35] bg-emerald-100/90 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>SHARE → UNDERSTAND → CLASSIFY → DISCOVER → CONNECT</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#104C35] font-serif">
              {t('infographicTitle')}
            </h2>
            <AudioInstructionButton
              text={`${t('infographicTitle')}. ${t('infographicSubtitle')}`}
              size="sm"
            />
          </div>
          <p className="text-sm text-[#6B756E] leading-relaxed">
            {t('infographicSubtitle')}
          </p>
        </div>

        {/* 5-Step Visual Process Timeline with Custom Illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* STEP 1: SHARE YOUR IDEA */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#104C35] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Mic className="w-7 h-7 text-[#104C35]" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#104C35]">
                  {t('step1Title')}
                </h3>
                <AudioInstructionButton text={t('step1Desc')} size="xs" />
              </div>
              <p className="text-xs text-[#6B756E] leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('stepVoiceFooter')}</span>
            </div>
          </div>

          {/* STEP 2: AI UNDERSTANDS YOUR IDEA */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Cpu className="w-7 h-7 text-amber-700" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#104C35]">
                  {t('step2Title')}
                </h3>
                <AudioInstructionButton text={t('step2Desc')} size="xs" />
              </div>
              <p className="text-xs text-[#6B756E] leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('stepTranslateFooter')}</span>
            </div>
          </div>

          {/* STEP 3: INNOVATION IS ORGANIZED & CLASSIFIED */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#104C35] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Layers className="w-7 h-7 text-[#104C35]" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#104C35]">
                  {t('step3Title')}
                </h3>
                <AudioInstructionButton text={t('step3Desc')} size="xs" />
              </div>
              <p className="text-xs text-[#6B756E] leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>ID: KHJ-2026-XXXX</span>
            </div>
          </div>

          {/* STEP 4: DISCOVER YOUR INNOVATION */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#104C35] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <MapPin className="w-7 h-7 text-[#104C35]" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#104C35]">
                  {t('step4Title')}
                </h3>
                <AudioInstructionButton text={t('step4Desc')} size="xs" />
              </div>
              <p className="text-xs text-[#6B756E] leading-relaxed">
                {t('step4Desc')}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('stepMapFooter')}</span>
            </div>
          </div>

          {/* STEP 5: CONNECT WITH OPPORTUNITIES */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#104C35] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7 text-[#104C35]" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#104C35]">
                  {t('step5Title')}
                </h3>
                <AudioInstructionButton text={t('step5Desc')} size="xs" />
              </div>
              <p className="text-xs text-[#6B756E] leading-relaxed">
                {t('step5Desc')}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('stepGrantFooter')}</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#104C35] hover:text-[#176B45] bg-emerald-50 border border-emerald-200 px-5 py-2.5 rounded-xl transition-all"
          >
            <span>{t('fullProcessLink')}</span>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED INNOVATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t('verifiedInnovationsTitle')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif mt-1">
              {t('recentInnovationsTitle')}
            </h2>
          </div>
          <Link
            href="/stakeholder/discover"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#104C35] hover:text-[#176B45]"
          >
            <span>
              {language === 'gu'
                ? `બધા ${totalCount} આવિષ્કારો જુઓ`
                : language === 'hi'
                ? `सभी ${totalCount} आविष्कार देखें`
                : `View all ${totalCount} innovations`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-emerald-900/10 overflow-hidden">
                  <img
                    src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title[language] || item.title.gu || item.title.en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#104C35]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {tSector(item.sector)}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.id}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B756E]">
                    <MapPin className="w-3.5 h-3.5 text-[#104C35]" />
                    <span>
                      {item.location.villageOrTown}, {item.location.state}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18251E] line-clamp-2">
                    {item.title[language] || item.title.gu || item.title.en}
                  </h3>

                  <p className="text-xs text-[#6B756E] line-clamp-3 leading-relaxed">
                    {item.problem[language] || item.problem.gu || item.problem.en}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-emerald-900/10 flex items-center justify-between text-xs mt-3">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {tStage(item.stage)}
                </span>
                <Link
                  href={`/innovations/${item.id}`}
                  className="font-bold text-[#104C35] hover:text-[#176B45] flex items-center gap-1"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION WITH REGISTRATION GATE TRIGGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#104C35] via-[#176B45] to-[#104C35] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-emerald-700/30">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
              {t('ctaInnovatorsBanner')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              {t('ctaHeadline')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {t('ctaDesc')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowWelcomeGate(true)}
              className="bg-white hover:bg-emerald-50 text-[#104C35] text-sm font-bold px-7 py-4 rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-amber-600" />
              <span>{t('registerInnovationBtn')}</span>
            </button>
            <Link
              href="/stakeholder/map"
              className="bg-emerald-900/60 border border-emerald-300/30 text-white text-sm font-bold px-6 py-4 rounded-2xl hover:bg-emerald-900/80 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. MAIN INNOVATOR WELCOME GATE MODAL (REQUIREMENT 4: NEW USER vs EXISTING USER) */}
      {showWelcomeGate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-900/20 relative">
            <div className="flex items-start justify-between border-b border-emerald-900/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  KHOJ (खोज) • INNOVATOR GATE
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#104C35] font-serif">
                    {t('welcomeBackQuestion')}
                  </h3>
                  <AudioInstructionButton
                    text={`${t('welcomeBackQuestion')}. ${t('newUserOption')} ${t('orText')} ${t('existingUserOption')}`}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-[#6B756E]">
                  {language === 'gu'
                    ? 'તમે પ્રથમ વાર આવ્યા છો કે અગાઉ પ્રોફાઇલ બનાવેલ છે તે પસંદ કરો.'
                    : language === 'hi'
                    ? 'कृपया चुनें कि आप पहली बार आए हैं या पहले से पंजीकृत हैं।'
                    : 'Choose whether you are registering for the first time or returning.'}
                </p>
              </div>
              <button
                onClick={() => setShowWelcomeGate(false)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TWO LARGE VISUAL CARDS (REQUIREMENT 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* OPTION 1: NEW USER */}
              <button
                type="button"
                onClick={handleSelectNewUser}
                className="p-6 rounded-2xl border-2 border-emerald-800/30 hover:border-[#104C35] bg-[#EAF5ED]/70 hover:bg-[#EAF5ED] text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#104C35] text-white flex items-center justify-center shadow-md">
                    <UserPlus className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="text-base font-bold text-[#104C35] group-hover:text-[#176B45]">
                    {t('newUserOption')}
                  </h4>
                  <p className="text-xs text-[#18251E] font-medium leading-relaxed">
                    {t('newUserOptionDesc')}
                  </p>
                  <p className="text-[11px] text-[#6B756E]">
                    {language === 'gu'
                      ? 'સરળ વોઇસ-સહાયિત પ્રોફાઇલ બનાવો (૦% કાગળિયા).'
                      : language === 'hi'
                      ? 'सरल आवाज़-सहायित प्रोफ़ाइल बनाएं (0% कागजी कार्रवाई)।'
                      : 'Create voice-assisted profile in simple steps.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#104C35] pt-2">
                  <span>
                    {language === 'gu'
                      ? 'પ્રોફાઇલ બનાવો →'
                      : language === 'hi'
                      ? 'प्रोफ़ाइल बनाएं →'
                      : "Create Profile →"}
                  </span>
                </div>
              </button>

              {/* OPTION 2: EXISTING USER */}
              <button
                type="button"
                onClick={handleSelectExistingUser}
                className="p-6 rounded-2xl border-2 border-amber-600/30 hover:border-amber-600 bg-amber-50/70 hover:bg-amber-50 text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-amber-950 group-hover:text-amber-800">
                    {t('existingUserOption')}
                  </h4>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    {t('existingUserOptionDesc')}
                  </p>
                  <p className="text-[11px] text-[#6B756E]">
                    {language === 'gu'
                      ? 'મોબાઇલ નંબર + OTP વડે લૉગ ઇન કરી ડેશબોર્ડ ખોલો.'
                      : language === 'hi'
                      ? 'मोबाइल नंबर + OTP से लॉगिन कर डैशबोर्ड खोलें।'
                      : 'Log in with verified mobile & OTP to view innovations.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 pt-2">
                  <span>
                    {language === 'gu'
                      ? 'લૉગ ઇન કરો →'
                      : language === 'hi'
                      ? 'लॉग इन करें →'
                      : 'Login →'}
                  </span>
                </div>
              </button>
            </div>

            {/* Helper Mode: Register on Behalf of Someone Else Shortcut */}
            <div className="pt-2 border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#6B756E] text-center sm:text-left">
                {language === 'gu'
                  ? 'કોઈ ગ્રામીણ શોધક વતી સહાય કરી રહ્યા છો?'
                  : language === 'hi'
                  ? 'किसी ग्रामीण आविष्कारक की सहायता कर रहे हैं?'
                  : 'Helping a rural inventor submit their innovation?'}
              </span>
              <button
                onClick={handleSelectAssisted}
                className="text-[#104C35] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>{t('registerOnBehalf')}</span>
              </button>
            </div>

            {/* Zero Documents Required Assurance */}
            <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-[#6B756E] text-center border border-gray-100">
              {t('noDocumentsRequiredNote')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
