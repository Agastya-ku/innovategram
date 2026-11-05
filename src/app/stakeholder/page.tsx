'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import {
  FileText,
  CheckCircle,
  Clock,
  Send,
  Compass,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart2
} from 'lucide-react';

export default function StakeholderOverviewPage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations, connectionRequests } = useInnovations();

  // Metrics
  const totalCount = innovations.length;
  const pendingCount = innovations.filter(i => i.status === 'Pending Review' || i.status === 'Under Review').length;
  const verifiedCount = innovations.filter(i => i.status === 'Verified').length;
  const connectionCount = connectionRequests.length;

  // Sector breakdown
  const sectorCounts = innovations.reduce((acc, curr) => {
    acc[curr.sector] = (acc[curr.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Stage breakdown
  const stageCounts = innovations.reduce((acc, curr) => {
    acc[curr.stage] = (acc[curr.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // State breakdown
  const stateCounts = innovations.reduce((acc, curr) => {
    acc[curr.location.state] = (acc[curr.location.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recent = innovations.slice(0, 5);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Title & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            {t('stakeholderDashboard')}
          </h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Real-time catalog analytics and regional verification telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/stakeholder/map"
            className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Open Innovation Map</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Real Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <div className="flex items-center justify-between text-[#6B756E] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('metricTotalInnovations')}</span>
            <FileText className="w-4 h-4 text-[#176B45]" />
          </div>
          <p className="text-3xl font-extrabold text-[#104C35] font-serif">{totalCount}</p>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">100% database driven</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <div className="flex items-center justify-between text-[#6B756E] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('metricPendingReview')}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-700 font-serif">{pendingCount}</p>
          <Link href="/stakeholder/review" className="text-[11px] text-amber-800 hover:underline mt-1 block font-medium">
            Review submissions &rarr;
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <div className="flex items-center justify-between text-[#6B756E] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('metricVerified')}</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 font-serif">{verifiedCount}</p>
          <p className="text-[11px] text-[#6B756E] mt-1">Field & technically validated</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
          <div className="flex items-center justify-between text-[#6B756E] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('metricActiveConnections')}</span>
            <Send className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-3xl font-extrabold text-[#104C35] font-serif">{connectionCount}</p>
          <Link href="/stakeholder/requests" className="text-[11px] text-emerald-800 hover:underline mt-1 block font-medium">
            Manage requests &rarr;
          </Link>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
            <h3 className="text-sm font-bold text-[#104C35]">Innovations by Sector</h3>
            <span className="text-xs font-medium text-[#6B756E]">{Object.keys(sectorCounts).length} sectors</span>
          </div>
          <div className="space-y-3">
            {Object.entries(sectorCounts).map(([sector, count]) => {
              const percent = Math.round((count / totalCount) * 100);
              return (
                <div key={sector} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#18251E]">{tSector(sector)}</span>
                    <span className="font-bold text-[#104C35]">{count} ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#176B45] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Development Stage Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
            <h3 className="text-sm font-bold text-[#104C35]">Maturity Stages</h3>
            <span className="text-xs font-medium text-[#6B756E]">Lifecycle</span>
          </div>
          <div className="space-y-3">
            {['Idea', 'Prototype', 'Tested', 'Validated', 'Adopted', 'Scaled'].map(stg => {
              const count = stageCounts[stg] || 0;
              const percent = Math.round((count / totalCount) * 100);
              return (
                <div key={stg} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#18251E]">{tStage(stg)}</span>
                    <span className="font-bold text-[#104C35]">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
            <h3 className="text-sm font-bold text-[#104C35]">Geographic Footprint</h3>
            <span className="text-xs font-medium text-[#6B756E]">States</span>
          </div>
          <div className="space-y-3">
            {Object.entries(stateCounts).map(([st, count]) => {
              const percent = Math.round((count / totalCount) * 100);
              return (
                <div key={st} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#18251E]">{st}</span>
                    <span className="font-bold text-[#104C35]">{count} record(s)</span>
                  </div>
                  <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#104C35] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Submissions Queue */}
      <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#104C35]">Recent Innovation Submissions</h3>
            <p className="text-xs text-[#6B756E]">Ready for institutional verification or connection</p>
          </div>
          <Link
            href="/stakeholder/discover"
            className="text-xs font-bold text-[#176B45] hover:text-[#104C35] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-emerald-900/10">
          {recent.map(item => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <img
                  src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80'}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover bg-emerald-50 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#104C35]">{item.id}</span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      {tSector(item.sector)}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {item.location.villageOrTown}, {item.location.state}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#18251E] mt-0.5">
                    {item.title[language] || item.title.en}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-[11px] font-medium text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {tStage(item.stage)}
                </span>
                <Link
                  href={`/innovations/${item.id}`}
                  className="text-xs font-bold bg-[#176B45] hover:bg-[#104C35] text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  {t('viewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

