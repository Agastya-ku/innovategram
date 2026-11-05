'use client';

import React from 'react';
import Link from 'next/link';
import { useInnovations } from '@/context/InnovationsContext';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Shield, CheckCircle2, Clock, Building, ArrowRight } from 'lucide-react';

export default function ConnectionRequestsPage() {
  const { t } = useLanguage();
  const { connectionRequests } = useInnovations();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
          {t('navRequests')} ({connectionRequests.length})
        </h1>
        <p className="text-xs text-[#6B756E] mt-1">
          Track official institutional outreach requests. Contact details are released once mutual consent is established.
        </p>
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60 flex items-center gap-3 text-xs text-[#104C35]">
        <Shield className="w-5 h-5 text-[#176B45] shrink-0" />
        <p>
          {t('privacyShieldNotice')}
        </p>
      </div>

      <div className="space-y-4">
        {connectionRequests.map(req => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#104C35]">{req.id}</span>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {req.purpose}
                  </span>
                  <span className="text-xs text-gray-500">Target: {req.innovationId}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#18251E] mt-1">
                  {req.innovationTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    req.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {req.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-[#6B756E] space-y-1">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#176B45]" />
                <span className="font-semibold text-[#18251E]">{req.organization}</span>
                <span>• {req.stakeholderName} ({req.stakeholderRole})</span>
              </div>
              <p className="bg-[#F8FAF7] p-3 rounded-xl border border-emerald-900/10 text-[#18251E] italic mt-2">
                "{req.message}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-gray-400">Request Date: {req.createdAt}</span>
              <Link
                href={`/innovations/${req.innovationId}`}
                className="font-bold text-[#176B45] hover:text-[#104C35] flex items-center gap-1"
              >
                <span>View Target Innovation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

