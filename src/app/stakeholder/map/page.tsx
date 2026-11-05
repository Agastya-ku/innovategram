'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Sector } from '@/types/innovategram';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import {
  MapPin,
  Filter,
  Layers,
  Info,
  Compass,
  LayoutGrid,
  List,
  Search,
  Navigation,
  ArrowRight
} from 'lucide-react';

// Dynamic import with no SSR to support Leaflet in Next.js
const InnovationMapClient = dynamic(
  () => import('@/components/InnovationMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-emerald-50/50 rounded-3xl flex flex-col items-center justify-center border border-emerald-900/10">
        <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#104C35]">Loading Interactive Geographic Map of India...</p>
      </div>
    )
  }
);

export default function StakeholderMapPage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations } = useInnovations();

  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchProblem, setSearchProblem] = useState<string>('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null);

  const states = useMemo(() => {
    return Array.from(new Set(innovations.map(i => i.location.state))).sort();
  }, [innovations]);

  const districts = useMemo(() => {
    const list = innovations
      .filter(i => selectedState === 'all' || i.location.state === selectedState)
      .map(i => i.location.district);
    return Array.from(new Set(list)).sort();
  }, [innovations, selectedState]);

  const sectors: Sector[] = [
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

  // Filtered list for list view
  const filteredList = useMemo(() => {
    return innovations.filter(item => {
      if (selectedSector !== 'all' && item.sector !== selectedSector) return false;
      if (selectedState !== 'all' && item.location.state !== selectedState) return false;
      if (selectedDistrict !== 'all' && item.location.district !== selectedDistrict) return false;
      if (searchProblem.trim()) {
        const q = searchProblem.toLowerCase().trim();
        const combined = `${item.title.en} ${item.title.hi} ${item.title.gu} ${item.problem.en} ${item.location.villageOrTown}`.toLowerCase();
        if (!combined.includes(q)) return false;
      }
      return true;
    });
  }, [innovations, selectedSector, selectedState, selectedDistrict, searchProblem]);

  // Discover nearby location (approximate, voluntary, never forces GPS)
  const handleFindNearby = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setFocusCoords([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          // Default to center of Gujarat / Western India if location blocked
          setFocusCoords([23.8343, 71.6033]);
        },
        { timeout: 5000 }
      );
    } else {
      setFocusCoords([23.8343, 71.6033]);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
              {t('navMap')}
            </h1>
            <AudioInstructionButton
              text="ભૌગોલિક નકશો: રાજ્ય, જિલ્લો, અને સેક્ટર મુજબ ગ્રામીણ આવિષ્કારો શોધો."
              size="xs"
            />
          </div>
          <p className="text-xs text-[#6B756E] mt-1">
            Geographic distribution of grassroots inventions across rural India with district and village discovery.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFindNearby}
            className="flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-[#176B45] text-xs font-bold px-3 py-2 rounded-xl border border-emerald-900/15 shadow-xs cursor-pointer"
            title="Focus near my location"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Nearby Location</span>
          </button>

          <div className="flex items-center bg-white border border-emerald-900/15 rounded-xl p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg text-xs font-semibold cursor-pointer ${
                viewMode === 'map' ? 'bg-[#176B45] text-white shadow-xs' : 'text-[#6B756E] hover:bg-emerald-50'
              }`}
              title="Map View"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-semibold cursor-pointer ${
                viewMode === 'list' ? 'bg-[#176B45] text-white shadow-xs' : 'text-[#6B756E] hover:bg-emerald-50'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (State, District, Village, Sector, Problem) */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex flex-wrap items-center gap-3">
        {/* Sector */}
        <div className="flex items-center gap-1.5 bg-[#F8FAF7] px-3 py-1.5 rounded-xl border border-emerald-900/15">
          <span className="text-[11px] font-semibold text-[#6B756E]">Sector:</span>
          <select
            value={selectedSector}
            onChange={e => setSelectedSector(e.target.value)}
            className="text-xs font-medium bg-transparent text-[#18251E] outline-none"
          >
            <option value="all">All Sectors</option>
            {sectors.map(s => (
              <option key={s} value={s}>{tSector(s)}</option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="flex items-center gap-1.5 bg-[#F8FAF7] px-3 py-1.5 rounded-xl border border-emerald-900/15">
          <span className="text-[11px] font-semibold text-[#6B756E]">State:</span>
          <select
            value={selectedState}
            onChange={e => {
              setSelectedState(e.target.value);
              setSelectedDistrict('all');
            }}
            className="text-xs font-medium bg-transparent text-[#18251E] outline-none"
          >
            <option value="all">All States</option>
            {states.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="flex items-center gap-1.5 bg-[#F8FAF7] px-3 py-1.5 rounded-xl border border-emerald-900/15">
          <span className="text-[11px] font-semibold text-[#6B756E]">District:</span>
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="text-xs font-medium bg-transparent text-[#18251E] outline-none"
          >
            <option value="all">All Districts</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Problem Search keyword */}
        <div className="flex items-center gap-1.5 bg-[#F8FAF7] px-3 py-1.5 rounded-xl border border-emerald-900/15 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#6B756E]" />
          <input
            type="text"
            placeholder="Filter by problem area (e.g. weed, water, solar)..."
            value={searchProblem}
            onChange={e => setSearchProblem(e.target.value)}
            className="text-xs bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* MAP VIEW */}
      {viewMode === 'map' && (
        <InnovationMapClient
          innovations={innovations}
          selectedSector={selectedSector}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          searchQuery={searchProblem}
          focusCoords={focusCoords}
        />
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3 text-xs text-[#6B756E]">
            <span>Found <strong>{filteredList.length}</strong> location-matched innovations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredList.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-emerald-900/10 bg-[#F8FAF7] hover:border-emerald-600/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#104C35] bg-emerald-100 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {tSector(item.sector)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#18251E]">
                    {item.title[language] || item.title.gu || item.title.en}
                  </h3>

                  <p className="text-xs text-[#6B756E] line-clamp-2">
                    {item.problem[language] || item.problem.gu || item.problem.en}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[#6B756E] pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                    <span>{item.location.villageOrTown}, {item.location.district}, {item.location.state}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-900/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-900">
                    {tStage(item.stage)}
                  </span>
                  <Link
                    href={`/innovations/${item.id}`}
                    className="flex items-center gap-1 text-[#176B45] font-bold hover:underline"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map Legend & Privacy Safeguard Note */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#176B45]" />
            <span className="font-medium text-[#18251E]">Grassroots Innovation Pin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
            <span className="font-medium text-[#18251E]">Under Review</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#6B756E] text-[11px]">
          <Info className="w-4 h-4 text-[#176B45] shrink-0" />
          <span>Approximate village coordinates used to protect innovator home address privacy.</span>
        </div>
      </div>
    </div>
  );
}
