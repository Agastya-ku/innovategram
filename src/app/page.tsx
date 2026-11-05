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
  ShieldCheck,
  Compass,
  MapPin,
  CheckCircle2,
  Volume2,
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
  X
} from 'lucide-react';

export default function HomePage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
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
      {/* 1. HERO SECTION - FIRST IMPRESSION & IMMEDIATE PURPOSE CLARITY */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5ED]/70 via-[#F8FAF7] to-[#F8FAF7] pt-10 pb-16 sm:pb-24 border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Purpose & Primary Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-100/90 border border-emerald-300 text-[#104C35] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>રાષ્ટ્રીય ગ્રામીણ આવિષ્કાર મંચ • GovTech Platform</span>
              </div>

              {/* Headline with Audio Note */}
              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#104C35] leading-tight font-serif">
                    {t('innovatorWelcomeTitle')}
                  </h1>
                  <AudioInstructionButton
                    text={t('homepagePurpose')}
                    label="સાંભળો"
                    size="sm"
                  />
                </div>
                <p className="text-base sm:text-lg text-[#18251E] font-medium leading-relaxed max-w-2xl">
                  {t('homepagePurpose')}
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

              {/* Language indication banner */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#6B756E]">
                <Languages className="w-4 h-4 text-emerald-600" />
                <span>ઉપલબ્ધ ભાષાઓ:</span>
                <span className="font-bold text-emerald-900">ગુજરાતી (Default)</span> •
                <span className="font-semibold text-emerald-800">हिन्दी (Hindi)</span> •
                <span className="font-semibold text-emerald-800">English</span>
              </div>
            </div>

            {/* Right Col: Engaging Visual Illustration (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border-2 border-emerald-900/15 shadow-xl space-y-4">
                {/* Visual badge */}
                <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                  <span className="text-xs font-bold text-[#104C35] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>ગામડાની શોધ, રાષ્ટ્રીય મંચ</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    0% ફોર્મ ફી
                  </span>
                </div>

                {/* SVG Graphic showing an innovator speaking into mic with tools */}
                <div className="h-44 bg-gradient-to-br from-emerald-50 to-[#EAF5ED] rounded-2xl flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#176B45] to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-900/25 mb-2">
                    <Mic className="w-8 h-8" />
                  </div>
                  <p className="text-xs font-bold text-[#104C35]">
                    બોલો • ફોટો લો • પ્રોફાઇલ તૈયાર
                  </p>
                  <p className="text-[11px] text-[#6B756E] mt-0.5">
                    કોઈ સરકારી દસ્તાવેજ કે GST ની જરૂર નથી
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <p className="font-bold text-[#104C35]">ઓપ્શન A</p>
                    <p className="text-[11px] text-[#6B756E]">પોતાના માટે</p>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <p className="font-bold text-[#104C35]">ઓપ્શન B</p>
                    <p className="text-[11px] text-[#6B756E]">અન્ય વ્યક્તિ વતી</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Infographic Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#104C35] font-serif">{totalCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">{t('metricTotalInnovations')}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#176B45] font-serif">{verifiedCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">{t('metricVerified')}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#104C35] font-serif">{sectorsCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">Sectors Cataloged</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-3xl font-extrabold text-[#176B45] font-serif">{statesCovered}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">States Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFOGRAPHIC-BASED 5-STEP JOURNEY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
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

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* STEP 1 */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/30 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner">
                <Mic className="w-6 h-6" />
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
            <div className="pt-4 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800">
              ગુજરાતી / હિન્દી / અંગ્રેજી
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/30 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner">
                <Sparkles className="w-6 h-6" />
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
            <div className="pt-4 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800">
              AI ઓડિયો ભાષાંતર
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/30 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner">
                <Layers className="w-6 h-6" />
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
            <div className="pt-4 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800">
              ID: IG-2026-XXXX
            </div>
          </div>

          {/* STEP 4 */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/30 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner">
                <MapPin className="w-6 h-6" />
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
            <div className="pt-4 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800">
              ડિજિટલ નકશો
            </div>
          </div>

          {/* STEP 5 */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs relative flex flex-col justify-between hover:border-emerald-600/30 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg shadow-inner">
                <Building2 className="w-6 h-6" />
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
            <div className="pt-4 border-t border-emerald-900/10 text-[11px] font-semibold text-emerald-800">
              અનુદાન અને સહાય
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED INNOVATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
              <Award className="w-4 h-4" />
              <span>ચકાસાયેલ આવિષ્કારો</span>
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
          <div className="max-w-xl space-y-3">
            <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider">
              આવિષ્કારકો અને સહાયકો માટે
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              તમારા ગામ કે તાલુકાના આવિષ્કારને દેશ સમક્ષ લાવો
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              તમે જાતે બનાવેલું સાધન હોય અથવા તમે કોઈ અન્ય ખેડૂત કે મિકેનિકની મદદ કરતા હોવ, બંને રીતે નોંધણી શક્ય છે.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPathwayModal(true)}
              className="bg-white hover:bg-emerald-50 text-[#104C35] text-sm font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-[#176B45]" />
              <span>{t('shareInnovationBtn')}</span>
            </button>
            <Link
              href="/stakeholder/map"
              className="bg-emerald-900/60 border border-emerald-300/30 text-white text-sm font-bold px-6 py-3.5 rounded-2xl hover:bg-emerald-900/80 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>{t('interactiveMapBtn')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TWO REGISTRATION PATHWAYS MODAL */}
      {showPathwayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-900/20 relative">
            <div className="flex items-start justify-between border-b border-emerald-900/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider">
                  નોંધણીનો પ્રકાર પસંદ કરો
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-[#104C35] font-serif">
                    {t('pathwayTitle')}
                  </h3>
                  <AudioInstructionButton
                    text={`${t('pathwayTitle')}. ${t('pathwaySubtitle')}`}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-[#6B756E]">
                  {t('pathwaySubtitle')}
                </p>
              </div>
              <button
                onClick={() => setShowPathwayModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TWO LARGE PATHWAY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* OPTION A: REGISTER FOR MYSELF */}
              <button
                type="button"
                onClick={() => handleSelectPathway('self')}
                className="p-5 rounded-2xl border-2 border-emerald-900/20 hover:border-[#176B45] bg-[#EAF5ED]/50 hover:bg-[#EAF5ED] text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#104C35] group-hover:text-[#176B45]">
                    {t('pathwayOptionA_Title')}
                  </h4>
                  <p className="text-xs text-[#6B756E] leading-relaxed">
                    {t('pathwayOptionA_Desc')}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45]">
                  <span>આગળ વધો</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* OPTION B: REGISTER FOR SOMEONE ELSE */}
              <button
                type="button"
                onClick={() => handleSelectPathway('assisted')}
                className="p-5 rounded-2xl border-2 border-emerald-900/20 hover:border-[#176B45] bg-amber-50/50 hover:bg-amber-50 text-left transition-all group flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-amber-950 group-hover:text-amber-800">
                    {t('pathwayOptionB_Title')}
                  </h4>
                  <p className="text-xs text-[#6B756E] leading-relaxed">
                    {t('pathwayOptionB_Desc')}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <span>સહાયક નોંધણી</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-[#6B756E] text-center">
              કોઈપણ કંપની, GST, અથવા આધાર કાર્ડની જરૂર નથી. સામાન્ય ગ્રામજનો સીધા નોંધણી કરી શકે છે.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
