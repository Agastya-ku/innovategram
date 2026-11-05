'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { ShieldCheck, Users, Layers, AlertTriangle, Check, Trash2, ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  const { t, tSector, tStatus } = useLanguage();
  const { innovations, updateInnovationStatus } = useInnovations();

  const [activeTab, setActiveTab] = useState<'moderation' | 'users' | 'sectors'>('moderation');

  const pending = innovations.filter(i => i.status === 'Pending Review' || i.status === 'Under Review');

  const usersList = [
    { name: 'Dr. Anand Verma', org: 'National Innovation Foundation', role: 'Chief Evaluator', status: 'Active' },
    { name: 'Prof. J. C. Trivedi', org: 'Anand Agricultural University', role: 'Technical Validator', status: 'Active' },
    { name: 'Er. R. Mathur', org: 'Rajasthan Renewable Energy Corp', role: 'Energy Field Inspector', status: 'Active' },
    { name: 'Shantaben Baria', org: 'Dahod Gram Panchayat SHG', role: 'Community Facilitator', status: 'Active' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GovTech Platform Administration</span>
          </div>
          <h1 className="text-2xl font-bold text-[#104C35] font-serif">{t('portalAdmin')}</h1>
          <p className="text-xs text-[#6B756E] mt-1">
            Supervisory moderation queue, sector ontology management, and ecosystem role governance.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'moderation' ? 'bg-[#176B45] text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Moderation Queue ({pending.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'users' ? 'bg-[#176B45] text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Evaluators & Roles ({usersList.length})
          </button>
        </div>
      </div>

      {activeTab === 'moderation' && (
        <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#104C35] uppercase tracking-wider">
            Unapproved or Flagged Submissions
          </h3>
          <div className="divide-y divide-emerald-900/10">
            {pending.map(item => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#104C35]">{item.id}</span>
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded">
                      {tSector(item.sector)}
                    </span>
                    <span className="text-xs text-gray-500">{item.location.state}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#18251E] mt-1">
                    {item.title.en}
                  </h4>
                  <p className="text-xs text-[#6B756E] line-clamp-1 mt-0.5">
                    {item.problem.en}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateInnovationStatus(item.id, 'Verified', 'Approved in Admin Moderation', 'Admin Overseer')}
                    className="flex items-center gap-1 text-xs font-bold bg-[#176B45] hover:bg-[#104C35] text-white px-3 py-1.5 rounded-lg"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Quick Verify</span>
                  </button>
                </div>
              </div>
            ))}
            {pending.length === 0 && (
              <p className="text-xs text-gray-500 py-6 text-center">All submissions have been moderated.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#104C35] uppercase tracking-wider">
            Accredited Regional Evaluators
          </h3>
          <div className="divide-y divide-emerald-900/10">
            {usersList.map((user, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#18251E]">{user.name}</h4>
                  <p className="text-xs text-[#6B756E]">{user.org} • {user.role}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

