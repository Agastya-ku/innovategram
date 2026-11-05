'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { StakeholderRole, stakeholderRoleTranslations } from '@/lib/translations';
import { Building, ShieldCheck, Save, Check, UserCheck, Lock } from 'lucide-react';

export default function StakeholderSettingsPage() {
  const { language, t } = useLanguage();
  const [orgName, setOrgName] = useState('National Innovation Foundation (NIF) India');
  const [department, setDepartment] = useState('Grassroots Technology & Incubation Division');
  const [officialEmail, setOfficialEmail] = useState('evaluator@nifindia.org');
  const [selectedRole, setSelectedRole] = useState<StakeholderRole>('Incubators');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('innovategram_stakeholder_role') as StakeholderRole;
      if (storedRole) setSelectedRole(storedRole);

      const storedOrg = localStorage.getItem('innovategram_stakeholder_org');
      if (storedOrg) setOrgName(storedOrg);
    }
  }, []);

  const roles: StakeholderRole[] = [
    'Government departments',
    'Incubators',
    'Universities',
    'NGOs',
    'Startups',
    'Manufacturers',
    'Research institutions'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('innovategram_stakeholder_role', selectedRole);
      localStorage.setItem('innovategram_stakeholder_org', orgName);
    }
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
          Configure verified institutional evaluator identity, role-based access control (RBAC), and notifications.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-xs">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Stakeholder Role Selection (Requirement 10: 7 Mandatory Roles) */}
          <div>
            <label className="block text-xs font-bold text-[#18251E] mb-1">
              Select Stakeholder Role (Role-Based Access Control)
            </label>
            <p className="text-[11px] text-[#6B756E] mb-2">
              Your role determines permissions for evaluating prototypes, requesting contact with innovators, and funding allocations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roles.map(r => {
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EAF5ED] text-[#104C35] border-[#176B45] shadow-xs'
                        : 'bg-white text-[#18251E] hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span>{stakeholderRoleTranslations[r]?.[language] || r}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#176B45]" />}
                  </button>
                );
              })}
            </div>
          </div>

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

          <div className="p-4 bg-emerald-50 rounded-2xl flex items-start gap-3 text-xs text-[#104C35] border border-emerald-200">
            <Lock className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Rural Innovator Contact Privacy Protocol</span>
              <p className="leading-relaxed">
                In compliance with grassroots protection ethics, personal innovator phone numbers are never published directly. All outreach must be logged through formal connection requests subject to mutual consent.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Settings Saved' : 'Save Organization Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
