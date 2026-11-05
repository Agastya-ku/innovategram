'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Innovation, VerificationStatus, Sector, Stage } from '@/types/innovategram';
import {
  CheckSquare,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Volume2,
  Edit,
  Eye,
  FileCheck,
  Shield,
  Send,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

export default function ReviewSubmissionsPage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { innovations, updateInnovationStatus, updateInnovationAI } = useInnovations();

  const [selectedInnovation, setSelectedInnovation] = useState<Innovation>(innovations[0]);
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [editingClassification, setEditingClassification] = useState(false);
  const [tempSector, setTempSector] = useState<Sector>(selectedInnovation?.sector || 'Agriculture');
  const [tempStage, setTempStage] = useState<Stage>(selectedInnovation?.stage || 'Prototype');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleStatusChange = (status: VerificationStatus) => {
    updateInnovationStatus(
      selectedInnovation.id,
      status,
      reviewNotes || `Status updated to ${status} by Regional Evaluator.`,
      'Institutional Evaluation Panel'
    );
    setStatusMessage(`Innovation ${selectedInnovation.id} updated to "${status}"`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSaveClassification = () => {
    updateInnovationAI(selectedInnovation.id, {
      sector: tempSector,
      stage: tempStage
    });
    setEditingClassification(false);
    setStatusMessage('Classification corrections saved.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const sectors: Sector[] = [
    'Agriculture',
    'Water and Sanitation',
    'Renewable Energy',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Waste Management',
    'Assistive Technology',
    'Other'
  ];

  const stages: Stage[] = ['Idea', 'Prototype', 'Tested', 'Validated', 'Adopted', 'Scaled'];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
          {t('navReview')}
        </h1>
        <p className="text-xs text-[#6B756E] mt-1">
          Authorized institutional evaluation panel. Review AI-classified submissions, listen to original recordings, and verify claims.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold animate-in fade-in">
          {statusMessage}
        </div>
      )}

      {/* Two Column Layout: Submissions Queue on Left, Review Workbench on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Queue List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#104C35]">
              Verification Queue ({innovations.length})
            </h3>
            <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold">
              Prioritize Pending
            </span>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {innovations.map(item => {
              const isSelected = selectedInnovation?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedInnovation(item);
                    setTempSector(item.sector);
                    setTempStage(item.stage);
                    setReviewNotes(item.verificationNotes || '');
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#176B45] bg-emerald-50/70 shadow-xs'
                      : 'border-emerald-900/10 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono font-bold text-[#104C35]">{item.id}</span>
                    <span
                      className={`font-semibold px-1.5 py-0.2 rounded ${
                        item.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#18251E] line-clamp-1">
                    {item.title[language] || item.title.en}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-[#6B756E] mt-1.5">
                    <span>{item.location.state}</span>
                    <span>AI: {item.aiConfidenceScore}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Review & Verification Workbench (8 cols) */}
        {selectedInnovation && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-emerald-900/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedInnovation.id}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    {selectedInnovation.location.villageOrTown}, {selectedInnovation.location.district}, {selectedInnovation.location.state}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#104C35] mt-1">
                  {selectedInnovation.title[language] || selectedInnovation.title.en}
                </h2>
              </div>
              <div className="flex items-center gap-2 self-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                  {selectedInnovation.status}
                </span>
              </div>
            </div>

            {/* Audio Recording & Original Voice Transcript */}
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#104C35]">
                  <Volume2 className="w-4 h-4 text-[#176B45]" />
                  <span>Original Rural Voice Submission ({selectedInnovation.originalLanguage.toUpperCase()})</span>
                </div>
                {selectedInnovation.audioUrl && (
                  <audio src={selectedInnovation.audioUrl} controls className="h-8 max-w-xs" />
                )}
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-900/10 text-xs italic text-[#18251E] leading-relaxed">
                "{selectedInnovation.originalTranscript}"
              </div>
            </div>

            {/* Problem & Solution Verification */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#104C35] uppercase tracking-wider mb-1">Identified Problem</h4>
                <p className="p-3 bg-gray-50 rounded-xl leading-relaxed text-[#18251E]">
                  {selectedInnovation.problem[language] || selectedInnovation.problem.en}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#104C35] uppercase tracking-wider mb-1">Proposed Mechanism / Solution</h4>
                <p className="p-3 bg-gray-50 rounded-xl leading-relaxed text-[#18251E]">
                  {selectedInnovation.solution[language] || selectedInnovation.solution.en}
                </p>
              </div>
            </div>

            {/* Media Gallery */}
            <div>
              <h4 className="text-xs font-bold text-[#104C35] uppercase tracking-wider mb-2">Prototype Media</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedInnovation.media.map(m => (
                  <div key={m.id} className="relative rounded-xl overflow-hidden h-28 border border-emerald-900/10">
                    <img src={m.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Classification Correction Section */}
            <div className="p-4 bg-[#F8FAF7] rounded-2xl border border-emerald-900/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#104C35]">
                  <Sparkles className="w-4 h-4 text-[#176B45]" />
                  <span>AI Sector & Maturity Classification</span>
                </div>
                <button
                  onClick={() => setEditingClassification(!editingClassification)}
                  className="text-xs font-bold text-[#176B45] hover:underline"
                >
                  {editingClassification ? 'Cancel' : 'Correct AI Tagging'}
                </button>
              </div>

              {editingClassification ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">Sector</label>
                    <select
                      value={tempSector}
                      onChange={e => setTempSector(e.target.value as Sector)}
                      className="w-full bg-white border border-emerald-900/20 rounded-lg p-2 text-xs"
                    >
                      {sectors.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B756E] mb-1">Development Stage</label>
                    <select
                      value={tempStage}
                      onChange={e => setTempStage(e.target.value as Stage)}
                      className="w-full bg-white border border-emerald-900/20 rounded-lg p-2 text-xs"
                    >
                      {stages.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <button
                      onClick={handleSaveClassification}
                      className="bg-[#176B45] text-white font-bold text-xs px-4 py-2 rounded-lg"
                    >
                      Save Corrections
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-xs">
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-emerald-900/10">
                    <span className="text-[#6B756E]">Sector:</span>{' '}
                    <strong className="text-[#104C35]">{tSector(selectedInnovation.sector)}</strong>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-emerald-900/10">
                    <span className="text-[#6B756E]">Stage:</span>{' '}
                    <strong className="text-[#104C35]">{tStage(selectedInnovation.stage)}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Evaluator Notes & Verification Outcome Buttons */}
            <div className="space-y-3 pt-2 border-t border-emerald-900/10">
              <label className="block text-xs font-bold text-[#104C35]">
                Evaluation & Technical Verification Notes
              </label>
              <textarea
                rows={2}
                placeholder="Enter field assessment, validation references, or requirements for the innovator..."
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#176B45]"
              />

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => handleStatusChange('Verified')}
                  className="flex items-center gap-1.5 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Innovation</span>
                </button>
                <button
                  onClick={() => handleStatusChange('Under Review')}
                  className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <Clock className="w-4 h-4" />
                  <span>Mark Under Review</span>
                </button>
                <button
                  onClick={() => handleStatusChange('Needs More Info')}
                  className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Request More Information</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

