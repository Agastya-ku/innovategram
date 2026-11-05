'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
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
  Languages
} from 'lucide-react';

export default function HomePage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations } = useInnovations();

  // Metrics computed live from database
  const totalCount = innovations.length;
  const verifiedCount = innovations.filter(i => i.status === 'Verified').length;
  const statesCovered = new Set(innovations.map(i => i.location.state)).size;
  const sectorsCount = new Set(innovations.map(i => i.sector)).size;

  const featured = innovations.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5ED]/60 via-[#F8FAF7] to-[#F8FAF7] pt-12 pb-16 sm:pb-24 border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 border border-emerald-300 text-[#104C35] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>National Rural Innovation & Grassroots Discovery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#104C35] leading-tight font-serif">
              {t('innovatorWelcomeTitle')}
            </h1>

            <p className="text-base sm:text-xl text-[#18251E]/80 leading-relaxed font-sans">
              {t('innovatorWelcomeSubtitle')}
            </p>

            {/* High Impact Portal Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/innovator"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#176B45] hover:bg-[#104C35] text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <span>{t('portalInnovator')} (Voice First)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/stakeholder"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-[#104C35] border-2 border-emerald-800/30 text-base font-bold px-7 py-3.5 rounded-xl shadow-xs transition-all"
              >
                <Layers className="w-5 h-5 text-[#176B45]" />
                <span>{t('portalStakeholder')}</span>
              </Link>
            </div>

            {/* Quick 3-Language Badge */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#6B756E]">
              <Languages className="w-4 h-4 text-emerald-600" />
              <span>Submit in:</span>
              <span className="font-semibold text-emerald-800">English</span> •
              <span className="font-semibold text-emerald-800">हिन्दी (Hindi)</span> •
              <span className="font-semibold text-emerald-800">ગુજરાતી (Gujarati)</span>
            </div>
          </div>

          {/* Live Metrics Row */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif">{totalCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">{t('metricTotalInnovations')}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#176B45] font-serif">{verifiedCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">{t('metricVerified')}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif">{sectorsCount}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">Sectors Cataloged</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-emerald-900/10 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#176B45] font-serif">{statesCovered}</p>
              <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mt-1">States Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Simple Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            How InnovateGram Works
          </h2>
          <p className="text-sm text-[#6B756E] mt-2">
            The innovator never has to understand complicated forms. The system understands the innovator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-[#18251E] mb-2 flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#176B45]" />
              Speak or Show
            </h3>
            <p className="text-xs text-[#6B756E] leading-relaxed">
              Use voice recording in Hindi, Gujarati or English. Take photos or clips of your machine or working prototype.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-[#18251E] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#176B45]" />
              AI Classification
            </h3>
            <p className="text-xs text-[#6B756E] leading-relaxed">
              Modular AI transcribes the audio, extracts problem & solution, tags sectors, and translates into 3 languages.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-[#18251E] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#176B45]" />
              Review & Safety
            </h3>
            <p className="text-xs text-[#6B756E] leading-relaxed">
              Innovator confirms the profile. Contact details and exact house address are protected under rural data privacy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-lg mb-4">
              4
            </div>
            <h3 className="text-base font-bold text-[#18251E] mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#176B45]" />
              Ecosystem Connect
            </h3>
            <p className="text-xs text-[#6B756E] leading-relaxed">
              Incubators, universities, and government bodies find innovations on the map and request contact permissions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Demonstrations Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
              <Award className="w-4 h-4" />
              <span>Catalog Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif mt-1">
              Featured Grassroots Innovations
            </h2>
          </div>
          <Link
            href="/stakeholder/discover"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176B45] hover:text-[#104C35]"
          >
            <span>Explore All {totalCount} Innovations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-48 bg-emerald-900/10 overflow-hidden">
                <img
                  src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
                  alt={item.title[language] || item.title.en}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#104C35]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {tSector(item.sector)}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.id}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6B756E] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                    <span>
                      {item.location.villageOrTown}, {item.location.district}, {item.location.state}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18251E] line-clamp-2 mb-2">
                    {item.title[language] || item.title.en}
                  </h3>

                  <p className="text-xs text-[#6B756E] line-clamp-3 mb-4 leading-relaxed">
                    {item.problem[language] || item.problem.en}
                  </p>
                </div>

                <div className="border-t border-emerald-900/10 pt-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
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
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem Stakeholder Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#104C35] to-[#176B45] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider">
              For Incubators, Universities & Government Bodies
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
              Empower Grassroots Innovators in Your Region
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Access the interactive geographic innovation map, review un-cataloged rural inventions, and initiate institutional support while respecting innovator privacy.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/stakeholder/map"
                className="inline-flex items-center gap-2 bg-white text-[#104C35] font-bold px-6 py-3 rounded-xl shadow-md hover:bg-emerald-50 transition-colors text-sm"
              >
                <Compass className="w-4 h-4 text-[#176B45]" />
                <span>Open Innovation Map</span>
              </Link>
              <Link
                href="/stakeholder"
                className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-300/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-900/80 transition-colors text-sm"
              >
                <Layers className="w-4 h-4" />
                <span>Enter Stakeholder Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

