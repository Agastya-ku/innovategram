'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Bookmark, Trash2, ArrowRight, Download, Printer } from 'lucide-react';

export default function SavedInnovationsPage() {
  const { language, t, tSector, tStage } = useLanguage();
  const { innovations, savedIds, toggleSave } = useInnovations();

  const savedList = innovations.filter(i => savedIds.includes(i.id));

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Sector', 'State', 'District', 'Stage', 'Status'];
    const rows = savedList.map(item => [
      item.id,
      `"${item.title.en.replace(/"/g, '""')}"`,
      item.sector,
      item.location.state,
      item.location.district,
      item.stage,
      item.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `innovategram_shortlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            {t('navSaved')} ({savedList.length})
          </h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Shortlisted grassroots innovations bookmarked for institutional follow-up.
          </p>
        </div>
        {savedList.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-white border border-emerald-900/20 text-[#104C35] text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {savedList.map(item => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80'}
                alt=""
                className="w-16 h-16 rounded-xl object-cover shrink-0 bg-emerald-50"
              />
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-[#104C35]">{item.id}</span>
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {tSector(item.sector)}
                  </span>
                  <span className="text-[#6B756E]">{item.location.villageOrTown}, {item.location.state}</span>
                </div>
                <h3 className="text-sm font-bold text-[#18251E] mt-1">
                  {item.title[language] || item.title.en}
                </h3>
                <p className="text-xs text-[#6B756E] line-clamp-1 mt-0.5">
                  {item.problem[language] || item.problem.en}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Link
                href={`/innovations/${item.id}`}
                className="text-xs font-bold text-[#176B45] hover:text-[#104C35] bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
              >
                <span>{t('viewDetails')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => toggleSave(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                title="Remove from saved"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {savedList.length === 0 && (
          <div className="bg-white p-12 text-center rounded-2xl border border-emerald-900/10 space-y-3">
            <Bookmark className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-[#18251E]">No saved innovations yet.</p>
            <p className="text-xs text-[#6B756E]">
              Explore the discovery directory and bookmark innovations you wish to incubate or review.
            </p>
            <Link
              href="/stakeholder/discover"
              className="inline-block text-xs font-bold text-white bg-[#176B45] hover:bg-[#104C35] px-4 py-2 rounded-xl"
            >
              Browse Innovations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

