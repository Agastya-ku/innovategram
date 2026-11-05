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
  ShieldCheck,
  Zap,
  TrendingUp,
  Volume2
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
    router.push('/dashboard');
  };

  const handleSelectAssisted = () => {
    setShowWelcomeGate(false);
    router.push('/innovator?mode=assisted');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* =========================================================================
          1. HERO SECTION - PROFESSIONAL, MODERN INDIAN SOCIAL-IMPACT TECH DESIGN
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF4EE] via-[#F8FAF7] to-[#F8FAF7] pt-10 pb-16 sm:pb-24 border-b border-emerald-950/10">
        {/* Subtle decorative radial ambient light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Col: Brand, Tagline, Purpose & Primary Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Mission Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 border border-emerald-950/15 text-[#0D3826] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>
                  {language === 'gu'
                    ? '🇮🇳 રાષ્ટ્રીય ગ્રામીણ આવિષ્કાર મંચ • GovTech Platform'
                    : language === 'hi'
                    ? '🇮🇳 राष्ट्रीय ग्रामीण नवाचार मंच • GovTech Platform'
                    : '🇮🇳 National Grassroots Innovation Platform • GovTech'}
                </span>
              </div>

              {/* Brand Title: KHOJ खोज */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3">
                  <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[#0D3826] font-serif">
                    KHOJ
                  </h1>
                  <span className="text-4xl sm:text-6xl font-extrabold text-[#D97706] font-serif">
                    खोज
                  </span>
                  <div className="inline-flex items-center">
                    <AudioInstructionButton
                      text={`${t('tagline')}. ${t('khojHeroSubtitle')}`}
                      size="sm"
                      showSpeedControl
                    />
                  </div>
                </div>

                {/* Mandated Hindi Motto Banner */}
                <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 p-3 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-emerald-500/10 border border-amber-500/30 shadow-2xs text-left">
                  <p className="text-base sm:text-xl font-bold text-amber-900 font-serif tracking-wide leading-tight">
                    "छोटा या बड़ा, हर आविष्कार पहचान का हकदार।"
                  </p>
                  <span className="hidden sm:inline text-amber-900/40">•</span>
                  <p className="text-xs text-[#526058] font-medium italic">
                    Small or big, every invention deserves recognition.
                  </p>
                </div>
              </div>

              {/* Value Proposition & Supporting Explanation */}
              <div className="space-y-2.5 max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3826] leading-snug font-serif">
                  {t('khojHeroHeadline')}
                </h2>
                <p className="text-sm sm:text-base text-[#2C3831] font-normal leading-relaxed">
                  {t('khojHeroSubtitle')}
                </p>
              </div>

              {/* Primary Call-to-Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setShowWelcomeGate(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#0D3826] hover:bg-[#145339] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-950/20 transform hover:-translate-y-0.5 transition-all cursor-pointer border border-emerald-600/40 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-4 h-4 text-amber-300" />
                  </div>
                  <span>{t('registerInnovationBtn')}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  href="/stakeholder/discover"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50/80 text-[#0D3826] border-2 border-emerald-950/20 hover:border-[#0D3826] text-base font-bold px-7 py-3.5 rounded-2xl shadow-2xs transition-all"
                >
                  <Compass className="w-5 h-5 text-[#104C35]" />
                  <span>{t('discoverInnovationsBtn')}</span>
                </Link>
              </div>

              {/* Trust Pillars Strip */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-semibold text-[#526058]">
                <div className="flex items-center gap-1.5 text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('zeroFee')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('aadhaarNotRequired')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                  <Languages className="w-3.5 h-3.5 text-emerald-700" />
                  <span>ગુજરાતી • हिन्दी • English</span>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Grassroots Innovation Showcase Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white rounded-3xl border border-emerald-950/15 shadow-xl shadow-emerald-950/10 overflow-hidden space-y-4 p-5 sm:p-6 transition-all hover:shadow-2xl">
                {/* Showcase Top Header */}
                <div className="flex items-center justify-between border-b border-emerald-950/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-xs font-bold text-[#0D3826] uppercase tracking-wider font-serif">
                      {language === 'gu' ? 'ચકાસાયેલ પાયાનો આવિષ્કાર' : language === 'hi' ? 'सत्यापित जमीनी नवाचार' : 'Verified Grassroots Device'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 text-[#0D3826] border border-emerald-200 px-2 py-0.5 rounded">
                    KHJ-2026-001001
                  </span>
                </div>

                {/* Real High-Quality Photo Showcase with Overlaid Smart Chips */}
                <div className="relative h-56 rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                    alt="Agricultural Grassroots Machine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Overlaid Floating Chips */}
                  <div className="absolute top-3 left-3 bg-[#0D3826]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{language === 'gu' ? 'ખેતીવાડી યંત્ર' : language === 'hi' ? 'कृषि उपकरण' : 'Agriculture Equipment'}</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    94% Impact Score
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <p className="text-sm font-bold leading-snug drop-shadow-xs">
                      {language === 'gu'
                        ? 'ઓછા ખર્ચે ખેતીમાં નિંદામણ દૂર કરતું સાધન'
                        : language === 'hi'
                        ? 'कम लागत वाली कृषि खरपतवार हटाने वाली मशीन'
                        : 'Low-Cost Agricultural Weed Removal Machine'}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-emerald-200 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>Khinvsar, Nagaur, Rajasthan</span>
                      </span>
                      <span className="bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-white">
                        Tested
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Multilingual Voice Feature Simulation */}
                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#0D3826] flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-600" />
                      <span>{language === 'gu' ? 'AI અવાજ રૂપાંતરણ:' : language === 'hi' ? 'एआई ध्वनि अनुवाद:' : 'AI Multilingual Engine:'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      ગુજરાતી ➔ हिन्दी ➔ EN
                    </span>
                  </div>
                  <p className="text-[11px] text-[#526058] italic leading-tight">
                    "I fabricated this weeder from bicycle scrap parts to help village farmers reduce manual labor."
                  </p>
                </div>

                {/* Direct Gateway Options (Option A: New User / Option B: Existing User) */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <button
                    onClick={() => handleSelectNewUser()}
                    className="p-3 bg-gradient-to-br from-[#EBF4EE] to-white hover:bg-emerald-100/70 rounded-2xl text-left border border-emerald-950/15 transition-all cursor-pointer group shadow-2xs"
                  >
                    <p className="font-bold text-[#0D3826] flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <UserPlus className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('newUserOption')}</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-[#526058] mt-1 font-medium">
                      {language === 'gu' ? 'નવી પ્રોફાઇલ બનાવો' : language === 'hi' ? 'नई प्रोफ़ाइल बनाएं' : 'Create Voice Profile'}
                    </p>
                  </button>

                  <button
                    onClick={() => handleSelectExistingUser()}
                    className="p-3 bg-gradient-to-br from-amber-50/90 to-white hover:bg-amber-100/70 rounded-2xl text-left border border-amber-600/30 transition-all cursor-pointer group shadow-2xs"
                  >
                    <p className="font-bold text-amber-950 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <LogIn className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t('existingUserOption')}</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-[#526058] mt-1 font-medium">
                      {language === 'gu' ? 'OTP લૉગિન ડેશબોર્ડ' : language === 'hi' ? 'OTP लॉगिन डैशबोर्ड' : 'Login to Dashboard'}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              LIVE IMPACT BENTO STRIP (UNIFIED, COHESIVE, DATA-BACKED)
             ========================================================================= */}
          <div className="mt-14 max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-950/15 shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-950/10">
              <div className="p-2 space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#526058] uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t('metricTotalInnovations')}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-[#0D3826] font-serif">{totalCount}</p>
                <p className="text-[11px] text-[#526058] font-medium">
                  {language === 'gu' ? 'પાયાની શોધો સંગ્રહિત' : language === 'hi' ? 'जमीनी नवाचार पंजीकृत' : 'Cataloged Grassroots Ideas'}
                </p>
              </div>

              <div className="p-2 space-y-1 pt-4 md:pt-2">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#526058] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('metricVerified')}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-[#D97706] font-serif">{verifiedCount}</p>
                <p className="text-[11px] text-[#526058] font-medium">
                  {language === 'gu' ? 'નિષ્ણાતો દ્વારા ચકાસાયેલ' : language === 'hi' ? 'विशेषज्ञों द्वारा सत्यापित' : 'Expert & Field Verified'}
                </p>
              </div>

              <div className="p-2 space-y-1 pt-4 md:pt-2">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#526058] uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('metricSectors')}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-[#0D3826] font-serif">{sectorsCount}</p>
                <p className="text-[11px] text-[#526058] font-medium">
                  {language === 'gu' ? 'ખેતી, ઊર્જા, આરોગ્ય' : language === 'hi' ? 'कृषि, सौर, स्वास्थ्य' : 'Agri, Health, Energy & More'}
                </p>
              </div>

              <div className="p-2 space-y-1 pt-4 md:pt-2">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#526058] uppercase tracking-wider">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('metricStates')}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-[#145339] font-serif">{statesCovered}</p>
                <p className="text-[11px] text-[#526058] font-medium">
                  {language === 'gu' ? 'ગુજરાત, રાજસ્થાન સહિત' : language === 'hi' ? 'गुजरात, राजस्थान आदि' : 'Across Indian States'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HOW KHOJ WORKS - 5-STEP INFOGRAPHIC JOURNEY (HIGH-END VISUAL STORYTELLING)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0D3826] bg-emerald-100/90 px-4 py-1.5 rounded-full border border-emerald-300/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="tracking-wide">SHARE → UNDERSTAND → CLASSIFY → DISCOVER → CONNECT</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3826] font-serif">
              {t('infographicTitle')}
            </h2>
            <AudioInstructionButton
              text={`${t('infographicTitle')}. ${t('infographicSubtitle')}`}
              size="sm"
            />
          </div>

          <p className="text-sm sm:text-base text-[#526058] leading-relaxed">
            {t('infographicSubtitle')}
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative">
          {/* STEP 1: SHARE YOUR IDEA */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-950/15 shadow-sm hover:shadow-md hover:border-[#0D3826]/40 transition-all flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  STEP 01
                </span>
                <AudioInstructionButton text={t('step1Desc')} size="xs" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D3826] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-emerald-200">
                <Mic className="w-7 h-7 text-[#0D3826]" />
              </div>

              <h3 className="text-base font-bold text-[#0D3826]">
                {t('step1Title')}
              </h3>

              <p className="text-xs text-[#526058] leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-950/10 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('stepVoiceFooter')}</span>
            </div>
          </div>

          {/* STEP 2: AI UNDERSTANDS YOUR IDEA */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-950/15 shadow-sm hover:shadow-md hover:border-[#0D3826]/40 transition-all flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  STEP 02
                </span>
                <AudioInstructionButton text={t('step2Desc')} size="xs" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-amber-200">
                <Cpu className="w-7 h-7 text-amber-700" />
              </div>

              <h3 className="text-base font-bold text-[#0D3826]">
                {t('step2Title')}
              </h3>

              <p className="text-xs text-[#526058] leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-950/10 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('stepTranslateFooter')}</span>
            </div>
          </div>

          {/* STEP 3: INNOVATION IS ORGANIZED & CLASSIFIED */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-950/15 shadow-sm hover:shadow-md hover:border-[#0D3826]/40 transition-all flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  STEP 03
                </span>
                <AudioInstructionButton text={t('step3Desc')} size="xs" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D3826] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-emerald-200">
                <Layers className="w-7 h-7 text-[#0D3826]" />
              </div>

              <h3 className="text-base font-bold text-[#0D3826]">
                {t('step3Title')}
              </h3>

              <p className="text-xs text-[#526058] leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-950/10 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>ID: KHJ-2026-XXXX</span>
            </div>
          </div>

          {/* STEP 4: DISCOVER YOUR INNOVATION */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-950/15 shadow-sm hover:shadow-md hover:border-[#0D3826]/40 transition-all flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  STEP 04
                </span>
                <AudioInstructionButton text={t('step4Desc')} size="xs" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D3826] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-emerald-200">
                <MapPin className="w-7 h-7 text-[#0D3826]" />
              </div>

              <h3 className="text-base font-bold text-[#0D3826]">
                {t('step4Title')}
              </h3>

              <p className="text-xs text-[#526058] leading-relaxed">
                {t('step4Desc')}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-950/10 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('stepMapFooter')}</span>
            </div>
          </div>

          {/* STEP 5: CONNECT WITH OPPORTUNITIES */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-950/15 shadow-sm hover:shadow-md hover:border-[#0D3826]/40 transition-all flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  STEP 05
                </span>
                <AudioInstructionButton text={t('step5Desc')} size="xs" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D3826] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform border border-emerald-200">
                <Building2 className="w-7 h-7 text-[#0D3826]" />
              </div>

              <h3 className="text-base font-bold text-[#0D3826]">
                {t('step5Title')}
              </h3>

              <p className="text-xs text-[#526058] leading-relaxed">
                {t('step5Desc')}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-950/10 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('stepGrantFooter')}</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D3826] hover:text-[#176B45] bg-emerald-50 border border-emerald-300 px-6 py-3 rounded-2xl transition-all shadow-2xs hover:shadow-xs"
          >
            <span>{t('fullProcessLink')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED INNOVATIONS SECTION (HIGH CONTRAST, VERIFIED BADGES)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t('verifiedInnovationsTitle')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3826] font-serif mt-1">
              {t('recentInnovationsTitle')}
            </h2>
          </div>
          <Link
            href="/stakeholder/discover"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D3826] hover:text-[#176B45] group"
          >
            <span>
              {language === 'gu'
                ? `બધા ${totalCount} આવિષ્કારો જુઓ`
                : language === 'hi'
                ? `सभी ${totalCount} आविष्कार देखें`
                : `View all ${totalCount} innovations`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-emerald-950/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 bg-emerald-900/10 overflow-hidden">
                  <img
                    src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title[language] || item.title.gu || item.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0D3826]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {tSector(item.sector)}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#0D3826] border border-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.id}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#526058]">
                    <MapPin className="w-3.5 h-3.5 text-[#104C35]" />
                    <span>
                      {item.location.villageOrTown}, {item.location.state}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18251E] line-clamp-2 leading-snug group-hover:text-[#0D3826] transition-colors">
                    {item.title[language] || item.title.gu || item.title.en}
                  </h3>

                  <p className="text-xs text-[#526058] line-clamp-3 leading-relaxed">
                    {item.problem[language] || item.problem.gu || item.problem.en}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-emerald-950/10 flex items-center justify-between text-xs mt-3">
                <span className="font-semibold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  {tStage(item.stage)}
                </span>
                <Link
                  href={`/innovations/${item.id}`}
                  className="font-bold text-[#0D3826] hover:text-[#176B45] flex items-center gap-1"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. NATIONAL CALL TO ACTION - CONNECTING INVENTORS WITH OPPORTUNITIES
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0D3826] via-[#104C35] to-[#145339] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-emerald-700/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl space-y-3 text-center md:text-left relative z-10">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full border border-amber-400/30">
              {t('ctaInnovatorsBanner')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
              {t('ctaHeadline')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {t('ctaDesc')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5 justify-center relative z-10">
            <button
              onClick={() => setShowWelcomeGate(true)}
              className="bg-white hover:bg-emerald-50 text-[#0D3826] text-sm font-bold px-8 py-4 rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-amber-600" />
              <span>{t('registerInnovationBtn')}</span>
            </button>
            <Link
              href="/stakeholder/map"
              className="bg-emerald-950/60 border border-emerald-300/40 text-white text-sm font-bold px-7 py-4 rounded-2xl hover:bg-emerald-950/90 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. MAIN INNOVATOR WELCOME GATE MODAL (REQUIREMENT 4)
         ========================================================================= */}
      {showWelcomeGate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-950/20 relative">
            <div className="flex items-start justify-between border-b border-emerald-950/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  KHOJ (खोज) • INNOVATOR GATE
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D3826] font-serif">
                    {t('welcomeBackQuestion')}
                  </h3>
                  <AudioInstructionButton
                    text={`${t('welcomeBackQuestion')}. ${t('newUserOption')} ${t('orText')} ${t('existingUserOption')}`}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-[#526058]">
                  {language === 'gu'
                    ? 'તમે પ્રથમ વાર આવ્યા છો કે અગાઉ પ્રોફાઇલ બનાવેલ છે તે પસંદ કરો.'
                    : language === 'hi'
                    ? 'कृपया चुनें कि आप पहली बार आए हैं या पहले से पंजीकृत हैं।'
                    : 'Choose whether you are registering for the first time or returning.'}
                </p>
              </div>
              <button
                onClick={() => setShowWelcomeGate(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 cursor-pointer rounded-xl hover:bg-gray-100"
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
                className="p-6 rounded-2xl border-2 border-emerald-800/30 hover:border-[#0D3826] bg-[#EBF4EE]/70 hover:bg-[#EBF4EE] text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#0D3826] text-white flex items-center justify-center shadow-md">
                    <UserPlus className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="text-base font-bold text-[#0D3826] group-hover:text-[#145339]">
                    {t('newUserOption')}
                  </h4>
                  <p className="text-xs text-[#18251E] font-medium leading-relaxed">
                    {t('newUserOptionDesc')}
                  </p>
                  <p className="text-[11px] text-[#526058]">
                    {language === 'gu'
                      ? 'સરળ વોઇસ-સહાયિત પ્રોફાઇલ (૦% કાગળિયા).'
                      : language === 'hi'
                      ? 'सरल आवाज़-सहायित प्रोफ़ाइल (0% कागजी कार्रवाई)।'
                      : 'Create voice-assisted profile in simple steps.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3826] pt-2">
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
                  <p className="text-[11px] text-[#526058]">
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
            <div className="pt-2 border-t border-emerald-950/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#526058] text-center sm:text-left">
                {language === 'gu'
                  ? 'કોઈ ગ્રામીણ શોધક વતી સહાય કરી રહ્યા છો?'
                  : language === 'hi'
                  ? 'किसी ग्रामीण आविष्कारक की सहायता कर रहे हैं?'
                  : 'Helping a rural inventor submit their innovation?'}
              </span>
              <button
                onClick={handleSelectAssisted}
                className="text-[#0D3826] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-amber-600" />
                <span>{t('registerOnBehalf')}</span>
              </button>
            </div>

            {/* Zero Documents Required Assurance */}
            <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-[#526058] text-center border border-gray-100">
              {t('noDocumentsRequiredNote')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
