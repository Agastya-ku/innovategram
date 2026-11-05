'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Building2 } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-emerald-100 px-3 py-1 rounded-full">
          Mission & Vision
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#104C35] font-serif">
          About {t('brandName')}
        </h1>
        <p className="text-sm sm:text-base text-[#6B756E] max-w-2xl mx-auto">
          {t('tagline')}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-emerald-900/10 shadow-xs space-y-6 text-sm text-[#18251E] leading-relaxed">
        <h2 className="text-xl font-bold text-[#104C35]">Bridging Grassroots Inventions to the National Ecosystem</h2>
        <p>
          Throughout rural India, farmers, artisans, mechanics, students, and village innovators continuously invent practical, frugal, and highly effective tools to solve day-to-day challenges in agriculture, water conservation, renewable energy, and livelihood.
        </p>
        <p>
          Historically, the vast majority of these innovations remained undocumented and unacknowledged due to language hurdles, complex bureaucratic forms, lack of internet access, and digital literacy barriers.
        </p>
        <p>
          <strong>KHOJ</strong> changes this paradigm by turning the process upside down: the rural creator never has to adapt to complex forms or AI terminology. By using natural voice recordings in Hindi, Gujarati, or English, alongside photos or video clips, our AI converts unstructured submissions into standardized innovation dossiers, verifies them with institutional stakeholders, and protects innovator privacy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-900/10">
          <div className="p-4 bg-emerald-50 rounded-2xl">
            <h4 className="font-bold text-[#104C35] mb-1">Zero Paperwork</h4>
            <p className="text-xs text-[#6B756E]">No GST, no Aadhaar, no business plans required for individual rural creators.</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl">
            <h4 className="font-bold text-[#104C35] mb-1">Three-Language Engine</h4>
            <p className="text-xs text-[#6B756E]">Native English, Devanagari Hindi, and Gujarati with cross-lingual discovery.</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl">
            <h4 className="font-bold text-[#104C35] mb-1">Privacy Shield</h4>
            <p className="text-xs text-[#6B756E]">Phone numbers and exact locations are safeguarded from public exposure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

