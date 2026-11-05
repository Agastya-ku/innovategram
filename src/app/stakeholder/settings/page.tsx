'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Building, ShieldCheck, Save, Check } from 'lucide-react';

export default function StakeholderSettingsPage() {
  const { t } = useLanguage();
  const [orgName, setOrgName] = useState('National Innovation Foundation (NIF) India');
  const [department, setDepartment] = useState('Grassroots Technology & Incubation Division');
  const [officialEmail, setOfficialEmail] = useState('evaluator@nifindia.org');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
          {t('navSettings')}
        </h1>
        <p className="text-xs text-[#6B756E] mt-1">
          Configure verified institutional evaluator identity and notifications.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#18251E] mb-1">Organization Name</label>
            <input
              type="text"
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#176B45]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#18251E] mb-1">Department / Division</label>
            <input
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#176B45]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#18251E] mb-1">Official Evaluation Email</label>
            <input
              type="email"
              value={officialEmail}
              onChange={e => setOfficialEmail(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#176B45]"
            />
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3 text-xs text-[#104C35]">
            <ShieldCheck className="w-5 h-5 text-[#176B45] shrink-0" />
            <span>Institutionally Verified Evaluator Certificate active through 2027.</span>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-xs"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Settings Saved' : 'Save Organization Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

