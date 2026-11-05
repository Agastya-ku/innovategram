'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import {
  LayoutDashboard,
  Compass,
  Map,
  CheckSquare,
  Bookmark,
  Send,
  BarChart3,
  Settings,
  Bell,
  Building,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function StakeholderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { savedIds, connectionRequests } = useInnovations();

  // Active simulated stakeholder organization
  const [orgName, setOrgName] = useState('National Innovation Foundation (NIF)');
  const [role, setRole] = useState('Incubation Evaluator');

  const navItems = [
    { href: '/stakeholder', label: t('navOverview'), icon: LayoutDashboard },
    { href: '/stakeholder/discover', label: t('navDiscover'), icon: Compass },
    { href: '/stakeholder/map', label: t('navMap'), icon: Map },
    { href: '/stakeholder/review', label: t('navReview'), icon: CheckSquare },
    { href: '/stakeholder/saved', label: `${t('navSaved')} (${savedIds.length})`, icon: Bookmark },
    { href: '/stakeholder/requests', label: `${t('navRequests')} (${connectionRequests.length})`, icon: Send },
    { href: '/stakeholder/reports', label: t('navReports'), icon: BarChart3 },
    { href: '/stakeholder/settings', label: t('navSettings'), icon: Settings }
  ];

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] bg-[#F8FAF7]">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-emerald-900/10 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="p-4 space-y-6">
          {/* Organization Badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
            <div className="flex items-center gap-2 text-xs font-bold text-[#104C35] mb-0.5">
              <Building className="w-3.5 h-3.5 text-[#176B45]" />
              <span className="truncate">{orgName}</span>
            </div>
            <div className="text-[11px] text-[#6B756E] flex items-center justify-between">
              <span>{role}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#176B45] text-white shadow-xs'
                      : 'text-[#18251E] hover:bg-emerald-50 hover:text-[#176B45]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Safeguards */}
        <div className="p-4 border-t border-emerald-900/10 text-[11px] text-[#6B756E] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#104C35]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GovTech Protected</span>
          </div>
          <p>Innovator privacy laws apply to all exported records.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Sub-Nav Bar */}
        <div className="md:hidden bg-white border-b border-emerald-900/10 p-2 overflow-x-auto flex gap-1.5">
          {navItems.slice(0, 5).map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive ? 'bg-[#176B45] text-white' : 'bg-gray-100 text-[#18251E]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 sm:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}

