'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Innovation } from '@/types/innovategram';
import { useLanguage } from '@/context/LanguageContext';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import { MapPin, ArrowRight, X, ExternalLink, ShieldAlert, Volume2 } from 'lucide-react';

interface Props {
  innovations: Innovation[];
  selectedSector: string;
  selectedState: string;
  selectedDistrict?: string;
  searchQuery?: string;
  focusCoords?: [number, number] | null;
}

export default function InnovationMapClient({
  innovations,
  selectedSector,
  selectedState,
  selectedDistrict = 'all',
  searchQuery = '',
  focusCoords = null
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const { language, tSector, tStage } = useLanguage();

  const [activeInnovation, setActiveInnovation] = useState<Innovation | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      // Fix default Leaflet marker icons in React/Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapInstanceRef.current && mapContainerRef.current) {
        // Initialize map centered on India (approx 23.5937° N, 76.9629° E, zoom 5)
        const map = L.map(mapContainerRef.current, {
          center: [23.5937, 76.9629],
          zoom: 5.2,
          scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      if (!mapInstanceRef.current) return;

      const map = mapInstanceRef.current;

      // Clear existing markers
      markersRef.current.forEach(m => map.removeLayer(m));
      markersRef.current = [];

      // Filter innovations based on props
      const filtered = innovations.filter(item => {
        if (selectedSector !== 'all' && item.sector !== selectedSector) return false;
        if (selectedState !== 'all' && item.location.state !== selectedState) return false;
        if (selectedDistrict !== 'all' && item.location.district !== selectedDistrict) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const combined = `${item.title.en} ${item.title.hi} ${item.title.gu} ${item.problem.en} ${item.location.villageOrTown}`.toLowerCase();
          if (!combined.includes(q)) return false;
        }
        return true;
      });

      // Custom green marker icon with pulse styling
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="background-color: #176B45; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(16, 76, 53, 0.4); border: 2.5px solid white; cursor: pointer;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      filtered.forEach(item => {
        const marker = L.marker([item.location.lat, item.location.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          if (isMounted) {
            setActiveInnovation(item);
          }
        });

        markersRef.current.push(marker);
      });

      // Smooth pan/fly to selected focus or region
      if (focusCoords) {
        map.flyTo(focusCoords, 8, { duration: 1.2 });
      } else if (selectedState !== 'all' && filtered.length > 0) {
        const first = filtered[0];
        map.flyTo([first.location.lat, first.location.lng], 7, { duration: 1.2 });
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [innovations, selectedSector, selectedState, selectedDistrict, searchQuery, focusCoords]);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-emerald-900/15 shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Active Innovation Preview Drawer */}
      {activeInnovation && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-emerald-900/20 shadow-2xl z-10 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-[#104C35] px-2 py-0.5 rounded">
                {activeInnovation.id}
              </span>
              <span className="text-[11px] text-[#6B756E] ml-2 font-medium">
                {activeInnovation.location.villageOrTown}, {activeInnovation.location.district}
              </span>
            </div>
            <button
              onClick={() => setActiveInnovation(null)}
              className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#18251E] line-clamp-2 leading-snug">
              {activeInnovation.title[language] || activeInnovation.title.gu || activeInnovation.title.en}
            </h4>
            <p className="text-xs text-[#6B756E] line-clamp-2 leading-relaxed">
              {activeInnovation.problem[language] || activeInnovation.problem.gu || activeInnovation.problem.en}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-900/10">
            <span className="font-semibold text-[#176B45] bg-emerald-50 px-2 py-0.5 rounded">
              {tStage(activeInnovation.stage)}
            </span>
            <div className="flex items-center gap-2">
              <AudioInstructionButton
                text={activeInnovation.title[language] || activeInnovation.title.gu || activeInnovation.title.en}
                size="xs"
              />
              <Link
                href={`/innovations/${activeInnovation.id}`}
                className="inline-flex items-center gap-1 font-bold text-xs bg-[#176B45] hover:bg-[#104C35] text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Privacy assurance pill */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[11px] text-[#104C35] font-semibold px-3 py-1.5 rounded-xl border border-emerald-900/15 shadow-xs z-10 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
        <span>Approximate Village Coordinates Displayed</span>
      </div>
    </div>
  );
}
