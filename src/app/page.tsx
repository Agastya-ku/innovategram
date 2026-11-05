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
  HelpCircle,
  FileText,
  X,
  Volume2,
  Play,
  Share2,
  Cpu,
  Globe2,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const { language, setLanguage, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations } = useInnovations();
  const router = useRouter();

  // Pathway modal state
  const [showPathwayModal, setShowPathwayModal] = useState(false);

  // Live database metrics
  const totalCount = innovations.length;
  const verifiedCount = innovations.filter(i => i.status === 'Verified').length;
  const statesCovered = new Set(innovations.map(i => i.location.state)).size;
  const sectorsCount = new Set(innovations.map(i => i.sector)).size;

  const featured = innovations.slice(0, 3);

  const handleSelectPathway = (pathway: 'self' | 'assisted') => {
    setShowPathwayModal(false);
    router.push(`/innovator?pathway=${pathway}`);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION - FIRST IMPRESSION & IMMEDIATE PURPOSE CLARITY (WITHIN 5 SECONDS) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5ED]/80 via-[#F8FAF7] to-[#F8FAF7] pt-8 pb-14 sm:pb-20 border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Purpose & Primary Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge & Language Selector */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100/90 border border-emerald-300 text-[#104C35] px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>રાષ્ટ્રીય ગ્રામીણ આવિષ્કાર મંચ • GovTech Platform</span>
                </div>

                {/* Visible Language Pill */}
                <div className="inline-flex items-center gap-1 bg-white border border-emerald-900/20 px-2 py-0.5 rounded-full text-xs font-semibold text-emerald-950">
                  <Languages className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[11px] text-[#6B756E]">ભાષા:</span>
                  <button
                    onClick={() => setLanguage('gu')}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      language === 'gu' ? 'bg-[#176B45] text-white' : 'hover:text-[#176B45]'
                    }`}
                  >
                    ગુજરાતી
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      language === 'hi' ? 'bg-[#176B45] text-white' : 'hover:text-[#176B45]'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      language === 'en' ? 'bg-[#176B45] text-white' : 'hover:text-[#176B45]'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Exact Purpose Headline with Voice Note */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#104C35] leading-tight font-serif">
                    {t('homepageHeroHeadline')}
                  </h1>
                  <AudioInstructionButton
                    text={t('homepagePurpose')}
                    label="સાંભળો"
                    size="sm"
                    showSpeedControl
                  />
                </div>
                <p className="text-base sm:text-lg text-[#18251E] font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {t('homepageHeroSubtitle')}
                </p>
              </div>

              {/* Prominent Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setShowPathwayModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#176B45] hover:bg-[#104C35] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-900/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                  <span>{t('shareInnovationBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/stakeholder/discover"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-[#104C35] border-2 border-emerald-800/30 text-base font-bold px-7 py-3.5 rounded-2xl shadow-xs transition-all"
                >
                  <Compass className="w-5 h-5 text-[#176B45]" />
                  <span>{t('discoverInnovationsBtn')}</span>
                </Link>
              </div>

              {/* Quick Guidance Note */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#6B756E]">
                <AudioInstructionButton text={t('voiceInstructionHome')} size="xs" />
                <span>{t('voiceInstructionHome')}</span>
              </div>
            </div>

            {/* Right Col: Custom SVG Illustration showing an innovator submitting an invention (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border-2 border-emerald-900/15 shadow-xl space-y-4">
                {/* Header label */}
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                  <span className="text-xs font-bold text-[#104C35] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>ગામડાની શોધ • રાષ્ટ્રીય મંચ</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    0% ફોર્મ ફી
                  </span>
                </div>

                {/* Custom SVG Infographic Illustration: Innovator speaking into phone with invention */}
                <div className="h-56 bg-gradient-to-br from-[#EAF5ED] to-emerald-50 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-emerald-200/50">
                  <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Soft Hill */}
                    <path d="M0 210 Q200 170 400 210 L400 240 L0 240 Z" fill="#D5ECD9" opacity="0.7" />

                    {/* Sun / Solar Energy Symbol */}
                    <circle cx="340" cy="50" r="22" fill="#F59E0B" opacity="0.3" />
                    <circle cx="340" cy="50" r="14" fill="#F59E0B" opacity="0.8" />

                    {/* Rural Farm Machine / Invention Illustration */}
                    <g transform="translate(180, 110)">
                      {/* Wheel */}
                      <circle cx="60" cy="70" r="28" stroke="#104C35" strokeWidth="4" fill="#F8FAF7" />
                      <circle cx="60" cy="70" r="10" fill="#176B45" />
                      <line x1="60" y1="42" x2="60" y2="98" stroke="#104C35" strokeWidth="2.5" />
                      <line x1="32" y1="70" x2="88" y2="70" stroke="#104C35" strokeWidth="2.5" />
                      {/* Chassis Frame */}
                      <line x1="60" y1="70" x2="110" y2="40" stroke="#104C35" strokeWidth="4" strokeLinecap="round" />
                      <line x1="110" y1="40" x2="150" y2="20" stroke="#176B45" strokeWidth="4.5" strokeLinecap="round" />
                      {/* Weeding Blade */}
                      <path d="M40 92 L75 92 L85 105 L30 105 Z" fill="#E65100" />
                      <text x="50" y="120" fontSize="9" fontWeight="bold" fill="#104C35">દેસી જુગાડ મશીન</text>
                    </g>

                    {/* Connecting Digital Dotted Arrow to Clouds/AI */}
                    <path d="M120 100 Q150 40 220 50" stroke="#176B45" strokeWidth="2.5" strokeDasharray="4 4" />
                    <circle cx="220" cy="50" r="4" fill="#176B45" />

                    {/* AI / Platform Cloud Hub */}
                    <g transform="translate(225, 30)">
                      <rect x="0" y="0" width="130" height="42" rx="12" fill="#104C35" />
                      <text x="12" y="18" fontSize="10" fontWeight="bold" fill="#FFFFFF">InnovateGram AI</text>
                      <text x="12" y="32" fontSize="8" fill="#A7F3D0">ઓડિયો ➔ ૩ ભાષા વર્ગીકરણ</text>
                    </g>

                    {/* Innovator Character */}
                    <g transform="translate(45, 60)">
                      {/* Traditional Paghadi / Headwear */}
                      <ellipse cx="45" cy="38" rx="18" ry="12" fill="#E65100" />
                      <circle cx="45" cy="48" r="14" fill="#FCD34D" />
                      {/* Body */}
                      <path d="M22 80 C22 66 32 64 45 64 C58 64 68 66 68 80 L70 140 L20 140 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                      {/* Vest */}
                      <path d="M30 68 L45 92 L60 68 L64 125 L26 125 Z" fill="#176B45" />
                      {/* Hand holding smartphone to mouth */}
                      <path d="M60 85 Q75 75 80 58" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round" />
                      {/* Smartphone */}
                      <rect x="76" y="44" width="14" height="24" rx="3" fill="#18251E" />
                      <rect x="78" y="46" width="10" height="20" rx="2" fill="#34D399" />
                      {/* Sound waves from mouth to phone */}
                      <path d="M60 50 Q66 50 68 54" stroke="#E65100" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M58 46 Q68 46 72 54" stroke="#E65100" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>
                  </svg>
                </div>

                {/* 2-Option Pathway Preview Buttons */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button
                    onClick={() => handleSelectPathway('self')}
                    className="p-3 bg-[#EAF5ED] hover:bg-emerald-100 rounded-2xl text-left border border-emerald-200 transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-[#104C35] flex items-center justify-between">
                      <span>ઓપ્શન A</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-[#6B756E] mt-0.5 font-medium">મેં જાતે બનાવ્યું છે</p>
                  </button>

                  <button
                    onClick={() => handleSelectPathway('assisted')}
                    className="p-3 bg-amber-50 hover:bg-amber-100 rounded-2xl text-left border border-amber-200 transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-amber-950 flex items-center justify-between">
                      <span>ઓપ્શન B</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-[#6B756E] mt-0.5 font-medium">અન્ય વ્યક્તિ વતી મદદ</p>
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
              <p className="text-3xl font-extrabold text-[#176B45] font-serif">{verifiedCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                {t('metricVerified')}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#104C35] font-serif">{sectorsCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                ક્ષેત્રો (Sectors)
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#176B45] font-serif">{statesCovered}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">
                રાજ્યો (States)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFOGRAPHIC-BASED 5-STEP JOURNEY SECTION (REQUIREMENT 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] bg-emerald-100/80 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('infographicBadge')}</span>
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

        {/* 5-Step Process Timeline Cards with Illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* STEP 1: SHARE YOUR IDEA */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Mic className="w-7 h-7" />
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
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              <span>અવાજ અથવા ફોટો</span>
            </div>
          </div>

          {/* STEP 2: AI UNDERSTANDS YOUR IDEA */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Cpu className="w-7 h-7" />
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
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5" />
              <span>૩ ભાષાઓમાં રૂપાંતર</span>
            </div>
          </div>

          {/* STEP 3: INNOVATION IS ORGANIZED */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Layers className="w-7 h-7" />
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
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ID: IG-2026-XXXX</span>
            </div>
          </div>

          {/* STEP 4: DISCOVER YOUR INNOVATION */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <MapPin className="w-7 h-7" />
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
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />
              <span>ડિજિટલ ભારત નકશો</span>
            </div>
          </div>

          {/* STEP 5: CONNECT WITH OPPORTUNITIES */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-md transition-all group">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
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
            <div className="pt-4 mt-2 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>અનુદાન & ઇનક્યુબેશન</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#176B45] hover:text-[#104C35] bg-emerald-50 px-4 py-2 rounded-xl"
          >
            <span>સંપૂર્ણ ચિત્રાત્મક પ્રક્રિયા જુઓ →</span>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED INNOVATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
              <Award className="w-4 h-4" />
              <span>ચકાસાયેલ પાયાના આવિષ્કારો</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif mt-1">
              તાજેતરના ગ્રામીણ આવિષ્કારો
            </h2>
          </div>
          <Link
            href="/stakeholder/discover"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176B45] hover:text-[#104C35]"
          >
            <span>બધા {totalCount} આવિષ્કારો જુઓ</span>
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
                    <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
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
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {tStage(item.stage)}
                </span>
                <Link
                  href={`/innovations/${item.id}`}
                  className="font-bold text-[#176B45] hover:text-[#104C35] flex items-center gap-1"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION WITH PATHWAY POPUP TRIGGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#104C35] to-[#176B45] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider">
              આવિષ્કારકો અને સહાયકો માટે
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              તમારા ગામ કે તાલુકાના આવિષ્કારને દેશ સમક્ષ લાવો
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              તમે જાતે બનાવેલું સાધન હોય અથવા તમે કોઈ અન્ય ખેડૂત, મિકેનિક કે કારીગરની મદદ કરતા હોવ, બંને રીતે નોંધણી શક્ય છે.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowPathwayModal(true)}
              className="bg-white hover:bg-emerald-50 text-[#104C35] text-sm font-bold px-7 py-4 rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-[#176B45]" />
              <span>{t('shareInnovationBtn')}</span>
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

      {/* TWO REGISTRATION PATHWAYS MODAL (REQUIREMENT 3) */}
      {showPathwayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-900/20 relative">
            <div className="flex items-start justify-between border-b border-emerald-900/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider">
                  નોંધણીનો પ્રકાર પસંદ કરો
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#104C35] font-serif">
                    {t('pathwayTitle')}
                  </h3>
                  <AudioInstructionButton
                    text={`${t('pathwayOptionA_Desc')} અથવા ${t('pathwayOptionB_Desc')}`}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-[#6B756E]">
                  {t('pathwaySubtitle')}
                </p>
              </div>
              <button
                onClick={() => setShowPathwayModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TWO LARGE PATHWAY OPTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* OPTION A: REGISTER FOR MYSELF */}
              <button
                type="button"
                onClick={() => handleSelectPathway('self')}
                className="p-6 rounded-2xl border-2 border-emerald-900/20 hover:border-[#176B45] bg-[#EAF5ED]/60 hover:bg-[#EAF5ED] text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#104C35] group-hover:text-[#176B45]">
                    {t('pathwayOptionA_Title')}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#18251E] leading-relaxed">
                    "{t('pathwayOptionA_Desc')}"
                  </p>
                  <p className="text-[11px] text-[#6B756E]">
                    તમારા અવાજ દ્વારા સરળ રીતે સીધી નોંધણી કરો.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] pt-2">
                  <span>આગળ વધો (Go to Form)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* OPTION B: REGISTER FOR SOMEONE ELSE */}
              <button
                type="button"
                onClick={() => handleSelectPathway('assisted')}
                className="p-6 rounded-2xl border-2 border-emerald-900/20 hover:border-amber-600 bg-amber-50/60 hover:bg-amber-50 text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-amber-950 group-hover:text-amber-800">
                    {t('pathwayOptionB_Title')}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                    "{t('pathwayOptionB_Desc')}"
                  </p>
                  <p className="text-[11px] text-[#6B756E]">
                    સ્વયંસેવક, પરિવારજન, NGO અથવા શિક્ષક તરીકે અન્યને સહાય કરો.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 pt-2">
                  <span>સહાયક નોંધણી (Assisted Submission)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
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
