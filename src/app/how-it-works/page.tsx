'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mic, Sparkles, ShieldCheck, Building2, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-emerald-100 px-3 py-1 rounded-full">
          Workflow Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#104C35] font-serif">
          How InnovateGram Works
        </h1>
        <p className="text-sm sm:text-base text-[#6B756E] max-w-2xl mx-auto">
          From voice recording in a remote village to institutional incubation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-xl shrink-0">
            1
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#104C35] flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#176B45]" />
              Voice-First Capture (Hindi / Gujarati / English)
            </h3>
            <p className="text-xs sm:text-sm text-[#6B756E] leading-relaxed">
              The innovator opens the portal on any smartphone and taps the large microphone button. They describe what they have built, what difficulty it solves, and how it functions. Photographs or video clips can be added with a single tap.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-xl shrink-0">
            2
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#104C35] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#176B45]" />
              AI Transcription & Semantic Categorization
            </h3>
            <p className="text-xs sm:text-sm text-[#6B756E] leading-relaxed">
              Our AI pipeline transcribes the speech, identifies the problem and proposed mechanism, assigns the sector (Agriculture, Water, Renewable Energy, etc.) and maturity stage (Prototype, Tested, etc.), and generates multilingual translations while preserving the original spoken audio.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-xl shrink-0">
            3
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#104C35] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#176B45]" />
              User Confirmation & Privacy Safeguards
            </h3>
            <p className="text-xs sm:text-sm text-[#6B756E] leading-relaxed">
              Before saving to the database, the summary is read back aloud to the innovator for confirmation or editing. An official Innovation ID (e.g. IG-2026-001025) is issued. Exact house coordinates and personal contact numbers are strictly guarded under our Rural Privacy Shield.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold text-xl shrink-0">
            4
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#104C35] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#176B45]" />
              Stakeholder Discovery, Verification & Connection
            </h3>
            <p className="text-xs sm:text-sm text-[#6B756E] leading-relaxed">
              Incubators, universities, Krishi Vigyan Kendras, and government departments filter innovations on the interactive map of India, review the evidence, calibrate AI classifications, and initiate structured outreach requests.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/innovator"
          className="inline-flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all text-sm"
        >
          <span>Try Voice Submission Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

