'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Sector } from '@/types/innovategram';
import { MapPin, Filter, Layers, Info } from 'lucide-react';

// Dynamic import with no SSR to support Leaflet
const InnovationMapClient = dynamic(
  () => import('@/components/InnovationMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-emerald-50/50 rounded-2xl flex flex-col items-center justify-center border border-emerald-900/10">
        <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#104C35]">Loading Interactive Geographic Map...</p>
      </div>
    )
  }
);

export default function StakeholderMapPage() {
  const { t, tSector } = useLanguage();
  const { innovations } = useInnovations();

  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const states = Array.from(new Set(innovations.map(i => i.location.state))).sort();
  const sectors: Sector[] = [
    'Agriculture',
    'Water and Sanitation',
    'Renewable Energy',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Waste Management',
    'Assistive Technology'
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            {t('navMap')}
          </h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Geographic distribution of verified and pending grassroots innovations across India.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-emerald-900/15 shadow-xs">
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

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-emerald-900/15 shadow-xs">
            <span className="text-[11px] font-semibold text-[#6B756E]">State:</span>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="text-xs font-medium bg-transparent text-[#18251E] outline-none"
            >
              <option value="all">All States</option>
              {states.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Client Container */}
      <InnovationMapClient
        innovations={innovations}
        selectedSector={selectedSector}
        selectedState={selectedState}
      />

      {/* Map Legend & Privacy Safeguard Note */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#176B45]" />
            <span className="font-medium text-[#18251E]">Grassroots Innovation Pin</span>
          </div>
          <div className="text-[#6B756E]">
            Total {innovations.length} geo-located innovations
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#6B756E]">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Coordinates correspond to village or block center to protect private home dwellings.</span>
        </div>
      </div>
    </div>
  );
}

