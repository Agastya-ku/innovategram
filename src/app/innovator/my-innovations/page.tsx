'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Phone,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function MyInnovationsPage() {
  const { language, t, tSector, tStatus, tStage } = useLanguage();
  const { innovations, isOnline, offlineDraftsCount, syncOfflineDrafts } = useInnovations();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'pending'>('all');

  // Filter innovations by phone or ID
  const filtered = innovations.filter(item => {
    const matchesSearch =
      !searchQuery ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.innovatorPhone && item.innovatorPhone.includes(searchQuery)) ||
      (item.title[language] || item.title.en).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterType === 'all' ||
      (filterType === 'verified' && item.status === 'Verified') ||
      (filterType === 'pending' && item.status === 'Pending Review');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-[#104C35] font-serif">{t('myInnovationsBtn')}</h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Check the review status, evaluation notes, and institutional interest for your submissions.
          </p>
        </div>
        <Link
          href="/innovator"
          className="inline-flex items-center gap-1.5 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Submission</span>
        </Link>
      </div>

      {/* Offline Status Card if any */}
      {offlineDraftsCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-700" />
            <div>
              <p className="text-xs font-bold text-amber-900">
                You have {offlineDraftsCount} submission(s) saved offline on your phone
              </p>
              <p className="text-[11px] text-amber-800">
                They will sync to the national portal as soon as network is stable.
              </p>
            </div>
          </div>
          <button
            onClick={syncOfflineDrafts}
            className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Now</span>
          </button>
        </div>
      )}

      {/* Lookup Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B756E]" />
          <input
            type="text"
            placeholder="Search by Innovation ID (e.g. KHJ-2026-001001) or Title..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#176B45]"
          />
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterType === 'all'
                ? 'bg-[#176B45] text-white'
                : 'bg-gray-100 text-[#18251E] hover:bg-gray-200'
            }`}
          >
            All ({innovations.length})
          </button>
          <button
            onClick={() => setFilterType('verified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterType === 'verified'
                ? 'bg-[#176B45] text-white'
                : 'bg-gray-100 text-[#18251E] hover:bg-gray-200'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilterType('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterType === 'pending'
                ? 'bg-[#176B45] text-white'
                : 'bg-gray-100 text-[#18251E] hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Innovations List */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs hover:border-emerald-600/30 transition-all flex flex-col sm:flex-row justify-between gap-4"
          >
            <div className="flex gap-4">
              <img
                src={item.media[0]?.url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80'}
                alt=""
                className="w-20 h-20 rounded-xl object-cover shrink-0 bg-emerald-50"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#104C35] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'Verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tStatus(item.status)}
                  </span>
                  {item.isSampleData && (
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      Demo
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#18251E]">
                  {item.title[language] || item.title.en}
                </h3>

                <p className="text-xs text-[#6B756E] line-clamp-2">
                  {item.problem[language] || item.problem.en}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#6B756E] pt-1">
                  <span>{item.location.villageOrTown}, {item.location.district}</span>
                  <span>•</span>
                  <span>{tSector(item.sector)}</span>
                  <span>•</span>
                  <span>Submitted: {item.submissionDate}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col justify-end items-end shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-900/10">
              <Link
                href={`/innovations/${item.id}`}
                className="flex items-center gap-1 text-xs font-bold text-[#176B45] hover:text-[#104C35] bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors"
              >
                <span>{t('viewDetails')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white p-12 text-center rounded-2xl border border-emerald-900/10">
            <p className="text-sm text-[#6B756E]">No innovations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

