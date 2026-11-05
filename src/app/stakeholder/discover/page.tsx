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
  AlertCircle,
  LayoutGrid,
  List
} from 'lucide-react';

export default function DiscoverInnovationsPage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations, savedIds, toggleSave } = useInnovations();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [problemKeyword, setProblemKeyword] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique states and districts from database
  const availableStates = useMemo(() => {
    return Array.from(new Set(innovations.map(i => i.location.state))).sort();
  }, [innovations]);

  const availableDistricts = useMemo(() => {
    const list = innovations
      .filter(i => selectedState === 'all' || i.location.state === selectedState)
      .map(i => i.location.district);
    return Array.from(new Set(list)).sort();
  }, [innovations, selectedState]);

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

  const availableStages: Stage[] = [
    'Idea',
    'Prototype',
    'Tested',
    'Validated',
    'Adopted',
    'Scaled'
  ];

  const availableStatuses: VerificationStatus[] = [
    'Pending Review',
    'Under Review',
    'Verified',
    'Needs More Info',
    'Rejected'
  ];

  // Multilingual Indexing Search & Multi-criteria Filtering (Requirement 8)
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
        const isWeedQuery = q.includes('weed') || q.includes('खरपतवार') || q.includes('નીંદણ') || q.includes('कृषि') || q.includes('ખેતી') || q.includes('crop');
        const isSolarQuery = q.includes('solar') || q.includes('सौर') || q.includes('સોલાર') || q.includes('energy') || q.includes('ઊર્જા');
        const isHealthQuery = q.includes('health') || q.includes('स्वास्थ्य') || q.includes('આરોગ્ય') || q.includes('medical') || q.includes('દવા');

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

      // 2. Problem filter
      if (problemKeyword.trim()) {
        const pk = problemKeyword.toLowerCase().trim();
        const probCombined = `${item.problem.en} ${item.problem.hi} ${item.problem.gu}`.toLowerCase();
        if (!probCombined.includes(pk)) return false;
      }

      // 3. Sector filter
      if (selectedSector !== 'all' && item.sector !== selectedSector) {
        return false;
      }

      // 4. Stage filter
      if (selectedStage !== 'all' && item.stage !== selectedStage) {
        return false;
      }

      // 5. State filter
      if (selectedState !== 'all' && item.location.state !== selectedState) {
        return false;
      }

      // 6. District filter
      if (selectedDistrict !== 'all' && item.location.district !== selectedDistrict) {
        return false;
      }

      // 7. Village filter
      if (selectedVillage.trim()) {
        const vq = selectedVillage.toLowerCase().trim();
        if (!item.location.villageOrTown.toLowerCase().includes(vq)) return false;
      }

      // 8. Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // 9. Language filter
      if (selectedLang !== 'all' && item.originalLanguage !== selectedLang) {
        return false;
      }

      return true;
    });
  }, [
    innovations,
    searchQuery,
    problemKeyword,
    selectedSector,
    selectedStage,
    selectedState,
    selectedDistrict,
    selectedVillage,
    selectedStatus,
    selectedLang
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setProblemKeyword('');
    setSelectedSector('all');
    setSelectedStage('all');
    setSelectedState('all');
    setSelectedDistrict('all');
    setSelectedVillage('');
    setSelectedStatus('all');
    setSelectedLang('all');
  };

  const hasActiveFilters =
    searchQuery ||
    problemKeyword ||
    selectedSector !== 'all' ||
    selectedStage !== 'all' ||
    selectedState !== 'all' ||
    selectedDistrict !== 'all' ||
    selectedVillage ||
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
            Search grassroots inventions across languages, states, districts, and sectors with cross-lingual indexing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white border border-emerald-900/15 rounded-xl p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'grid' ? 'bg-[#176B45] text-white' : 'text-[#6B756E] hover:bg-emerald-50'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'list' ? 'bg-[#176B45] text-white' : 'text-[#6B756E] hover:bg-emerald-50'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/stakeholder/map"
            className="text-xs font-semibold text-[#176B45] hover:text-[#104C35] bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 shadow-xs"
          >
            {t('navMap')} →
          </Link>
        </div>
      </div>

      {/* Multilingual Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs space-y-4">
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

        {/* Multi-Criteria Filters Bar (Requirement 8: Sector, Problem, State, District, Village, Stage, Status) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Sector */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#6B756E] mb-1">Sector</label>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium"
            >
              <option value="all">All Sectors</option>
              {availableSectors.map(sec => (
                <option key={sec} value={sec}>
                  {tSector(sec)}
                </option>
              ))}
            </select>
          </div>

          {/* Development Stage */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#6B756E] mb-1">Stage</label>
            <select
              value={selectedStage}
              onChange={e => setSelectedStage(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium"
            >
              <option value="all">All Stages</option>
              {availableStages.map(st => (
                <option key={st} value={st}>
                  {tStage(st)}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#6B756E] mb-1">State</label>
            <select
              value={selectedState}
              onChange={e => {
                setSelectedState(e.target.value);
                setSelectedDistrict('all');
              }}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium"
            >
              <option value="all">All States</option>
              {availableStates.map(st => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#6B756E] mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium"
            >
              <option value="all">All Districts</option>
              {availableDistricts.map(dist => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#6B756E] mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium"
            >
              <option value="all">All Statuses</option>
              {availableStatuses.map(stat => (
                <option key={stat} value={stat}>
                  {tStatus(stat)}
                </option>
              ))}
            </select>
          </div>

          {/* Village Name input */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-[#6B756E] mb-1">Village</label>
            <input
              type="text"
              placeholder="e.g. Radhanpur"
              value={selectedVillage}
              onChange={e => setSelectedVillage(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-lg p-2 text-xs font-medium"
            />
          </div>
        </div>

        {/* Problem Area Keyword Filter & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-900/10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#6B756E]">Problem Area:</span>
            <input
              type="text"
              placeholder="e.g. weed, water, labor..."
              value={problemKeyword}
              onChange={e => setProblemKeyword(e.target.value)}
              className="bg-[#F8FAF7] border border-emerald-900/15 rounded-lg px-2.5 py-1 text-xs w-44"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t('clearFilters')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#6B756E]">
        <span>
          Showing <strong>{filteredInnovations.length}</strong> of {innovations.length} innovations
        </span>
        <span className="text-emerald-800 font-semibold">
          Saved in Shortlist: <strong>{savedIds.length}</strong>
        </span>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInnovations.map(item => {
            const isSaved = savedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-emerald-900/10 overflow-hidden">
                    <img
                      src={
                        item.media[0]?.url ||
                        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={item.title[language] || item.title.gu || item.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#104C35]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      {tSector(item.sector)}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(item.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#176B45] text-white shadow-md'
                          : 'bg-white/80 hover:bg-white text-gray-700'
                      }`}
                      title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 fill-white" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6B756E]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                        <span>
                          {item.location.villageOrTown}, {item.location.district}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-bold bg-gray-100 px-1.5 py-0.5 rounded">
                        {item.id}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#18251E] line-clamp-2">
                      {item.title[language] || item.title.gu || item.title.en}
                    </h3>

                    <p className="text-xs text-[#6B756E] line-clamp-3 leading-relaxed">
                      {item.problem[language] || item.problem.gu || item.problem.en}
                    </p>

                    {item.registrationType === 'assisted' && (
                      <p className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block font-semibold">
                        Assisted by {item.submitterName} ({item.submitterRelationship})
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-emerald-900/10 flex items-center justify-between text-xs mt-3">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded ${
                      item.status === 'Verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tStatus(item.status)}
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
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredInnovations.map(item => {
            const isSaved = savedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-emerald-900/10 shadow-xs hover:border-emerald-600/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={
                      item.media[0]?.url ||
                      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80'
                    }
                    alt=""
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-emerald-900/10"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold bg-[#EAF5ED] text-[#104C35] px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        {tSector(item.sector)}
                      </span>
                      <span className="text-[11px] text-[#6B756E] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#176B45]" />
                        <span>
                          {item.location.villageOrTown}, {item.location.district}, {item.location.state}
                        </span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#18251E]">
                      {item.title[language] || item.title.gu || item.title.en}
                    </h3>
                    <p className="text-xs text-[#6B756E] line-clamp-1">
                      {item.problem[language] || item.problem.gu || item.problem.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => toggleSave(item.id)}
                    className={`p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                      isSaved
                        ? 'bg-[#176B45] text-white border-[#176B45]'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                    title={isSaved ? 'Shortlisted' : 'Save to shortlist'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  <Link
                    href={`/innovations/${item.id}`}
                    className="flex items-center gap-1 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    <span>{t('viewDetails')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredInnovations.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-emerald-900/10">
          <p className="text-base font-bold text-[#104C35]">No innovations match the selected criteria</p>
          <p className="text-xs text-[#6B756E]">Try resetting the filters or searching with alternative keywords.</p>
          <button
            onClick={resetFilters}
            className="inline-block bg-[#176B45] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
          >
            {t('clearFilters')}
          </button>
        </div>
      )}
    </div>
  );
}
