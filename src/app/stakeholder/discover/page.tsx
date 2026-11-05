'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Sector, Stage, VerificationStatus, Language } from '@/types/innovategram';
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  MapPin,
  ArrowRight,
  Sparkles,
  Volume2,
  SlidersHorizontal,
  X,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DiscoverInnovationsPage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations, savedIds, toggleSave } = useInnovations();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique states and sectors from database
  const availableStates = useMemo(() => {
    return Array.from(new Set(innovations.map(i => i.location.state))).sort();
  }, [innovations]);

  const availableSectors: Sector[] = [
    'Agriculture',
    'Water and Sanitation',
    'Renewable Energy',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Environment',
    'Waste Management',
    'Transportation',
    'Rural Livelihoods',
    'Construction',
    'Assistive Technology'
  ];

  // Multilingual Indexing Search & Multi-criteria Filtering
  const filteredInnovations = useMemo(() => {
    return innovations.filter(item => {
      // 1. Text Search across all 3 languages, transcripts, keywords, and location
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesEnTitle = item.title.en.toLowerCase().includes(q);
        const matchesHiTitle = item.title.hi.toLowerCase().includes(q);
        const matchesGuTitle = item.title.gu.toLowerCase().includes(q);
        const matchesEnProb = item.problem.en.toLowerCase().includes(q);
        const matchesHiProb = item.problem.hi.toLowerCase().includes(q);
        const matchesGuProb = item.problem.gu.toLowerCase().includes(q);
        const matchesTranscript = item.originalTranscript.toLowerCase().includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesLocation = `${item.location.villageOrTown} ${item.location.district} ${item.location.state}`.toLowerCase().includes(q);
        const matchesKeywords = item.keywords.some(k => k.toLowerCase().includes(q));

        // Multilingual semantic keyword bridge
        const isWaterQuery = q.includes('water') || q.includes('पानी') || q.includes('પાણી') || q.includes('irrigation') || q.includes('સિંચાઈ') || q.includes('सिंचाई');
        const isWeedQuery = q.includes('weed') || q.includes('खरपतवार') || q.includes('નીંદણ') || q.includes('कृषि') || q.includes('ખેતી');
        const isSolarQuery = q.includes('solar') || q.includes('सौर') || q.includes('સોલાર') || q.includes('energy') || q.includes('ऊर्जा');
        const isHealthQuery = q.includes('health') || q.includes('स्वास्थ्य') || q.includes('આરોગ્ય') || q.includes('medical') || q.includes('ડોક્ટર');

        const semanticMatch =
          (isWaterQuery && (item.sector === 'Water and Sanitation' || item.keywords.includes('water conservation'))) ||
          (isWeedQuery && item.keywords.includes('weeder')) ||
          (isSolarQuery && item.sector === 'Renewable Energy') ||
          (isHealthQuery && item.sector === 'Healthcare');

        const anyTextMatch =
          matchesEnTitle ||
          matchesHiTitle ||
          matchesGuTitle ||
          matchesEnProb ||
          matchesHiProb ||
          matchesGuProb ||
          matchesTranscript ||
          matchesId ||
          matchesLocation ||
          matchesKeywords ||
          semanticMatch;

        if (!anyTextMatch) return false;
      }

      // 2. Sector filter
      if (selectedSector !== 'all' && item.sector !== selectedSector) {
        return false;
      }

      // 3. Stage filter
      if (selectedStage !== 'all' && item.stage !== selectedStage) {
        return false;
      }

      // 4. State filter
      if (selectedState !== 'all' && item.location.state !== selectedState) {
        return false;
      }

      // 5. Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // 6. Language filter
      if (selectedLang !== 'all' && item.originalLanguage !== selectedLang) {
        return false;
      }

      return true;
    });
  }, [innovations, searchQuery, selectedSector, selectedStage, selectedState, selectedStatus, selectedLang]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedStage('all');
    setSelectedState('all');
    setSelectedStatus('all');
    setSelectedLang('all');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedSector !== 'all' ||
    selectedStage !== 'all' ||
    selectedState !== 'all' ||
    selectedStatus !== 'all' ||
    selectedLang !== 'all';

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            {t('navDiscover')}
          </h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Search grassroots inventions across languages and states with cross-lingual indexing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/stakeholder/map"
            className="text-xs font-semibold text-[#176B45] hover:text-[#104C35] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            View on Map &rarr;
          </Link>
        </div>
      </div>

      {/* Multilingual Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B756E]" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#176B45]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {/* Sector */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">Sector</label>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium text-[#18251E]"
            >
              <option value="all">{t('filterBySector')}</option>
              {availableSectors.map(s => (
                <option key={s} value={s}>{tSector(s)}</option>
              ))}
            </select>
          </div>

          {/* Stage */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">Development Stage</label>
            <select
              value={selectedStage}
              onChange={e => setSelectedStage(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium text-[#18251E]"
            >
              <option value="all">{t('filterByStage')}</option>
              <option value="Idea">1. Idea</option>
              <option value="Prototype">2. Prototype</option>
              <option value="Tested">3. Field Tested</option>
              <option value="Validated">4. Validated</option>
              <option value="Adopted">5. Adopted</option>
              <option value="Scaled">6. Scaled</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">State</label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium text-[#18251E]"
            >
              <option value="all">{t('filterByState')}</option>
              {availableStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium text-[#18251E]"
            >
              <option value="all">{t('filterByStatus')}</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>

          {/* Submission Language */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">{t('filterByLanguage')}</label>
            <select
              value={selectedLang}
              onChange={e => setSelectedLang(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium text-[#18251E]"
            >
              <option value="all">All Languages</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Filter bar actions */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-emerald-900/10 text-xs">
            <span className="text-[#6B756E]">
              Showing <strong className="text-[#104C35]">{filteredInnovations.length}</strong> matching innovation(s)
            </span>
            <button
              onClick={resetFilters}
              className="text-[#176B45] font-bold hover:underline"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>

      {/* Innovations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInnovations.map(item => {
          const isSaved = savedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-emerald-900/10">
                  <img
                    src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#104C35]/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {tSector(item.sector)}
                  </div>
                  <button
                    onClick={() => toggleSave(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#176B45] hover:bg-white shadow-xs transition-colors"
                    title={isSaved ? 'Remove from saved' : 'Save innovation'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 fill-[#176B45]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#6B756E]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                      <span>{item.location.villageOrTown}, {item.location.state}</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-800">{item.id}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#18251E] line-clamp-2">
                    {item.title[language] || item.title.en}
                  </h3>

                  <p className="text-xs text-[#6B756E] line-clamp-3 leading-relaxed">
                    {item.problem[language] || item.problem.en}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded">
                      {tStage(item.stage)}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        item.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tStatus(item.status)}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      Orig: {item.originalLanguage.toUpperCase()}
                    </span>
                    {item.registrationType === 'assisted' && (
                      <span className="text-[10px] font-semibold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                        Assisted
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-emerald-900/10 flex items-center justify-between mt-3">
                <span className="text-[11px] text-[#6B756E]">
                  AI: {item.aiConfidenceScore}%
                </span>
                <Link
                  href={`/innovations/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#176B45] hover:text-[#104C35]"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredInnovations.length === 0 && (
        <div className="bg-white p-12 text-center rounded-2xl border border-emerald-900/10 space-y-3">
          <p className="text-sm font-bold text-[#18251E]">No innovations match your current filter criteria.</p>
          <p className="text-xs text-[#6B756E]">Try adjusting keywords or clearing one of the filters above.</p>
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-[#176B45] bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

