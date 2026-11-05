'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { BarChart3, Download, PieChart, FileSpreadsheet, Award } from 'lucide-react';

export default function ReportsPage() {
  const { t, tSector, tStage } = useLanguage();
  const { innovations } = useInnovations();

  const total = innovations.length;
  const verified = innovations.filter(i => i.status === 'Verified').length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            {t('navReports')}
          </h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Institutional intelligence, quarterly progress summaries, and national grassroots pipeline audits.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Summary PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider">Verification Yield</p>
          <p className="text-2xl font-extrabold text-[#104C35] font-serif mt-1">
            {Math.round((verified / total) * 100)}%
          </p>
          <p className="text-[11px] text-[#6B756E] mt-1">{verified} of {total} verified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider">Audio First Share</p>
          <p className="text-2xl font-extrabold text-[#104C35] font-serif mt-1">
            {Math.round((innovations.filter(i => i.audioUrl).length / total) * 100)}%
          </p>
          <p className="text-[11px] text-[#6B756E] mt-1">Spoken rural submissions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider">Trilingual Coverage</p>
          <p className="text-2xl font-extrabold text-[#104C35] font-serif mt-1">100%</p>
          <p className="text-[11px] text-[#6B756E] mt-1">English, Hindi & Gujarati</p>
        </div>
      </div>

      {/* National Policy Alignment */}
      <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-[#104C35]">Policy & Ecosystem Alignment</h3>
        <p className="text-xs text-[#6B756E] leading-relaxed">
          InnovateGram is engineered to bridge rural inventors directly with Department of Science & Technology (DST), National Innovation Foundation (NIF), Indian Council of Agricultural Research (ICAR), and regional Atal Incubation Centers without requiring corporate intermediaries.
        </p>
      </div>
    </div>
  );
}

