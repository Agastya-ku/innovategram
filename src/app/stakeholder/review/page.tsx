'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Innovation, VerificationStatus, Sector, Stage } from '@/types/innovategram';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
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
  Clock,
  ExternalLink,
  Save,
  X
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
    'Environment',
    'Waste Management',
    'Transportation',
    'Rural Livelihoods',
    'Construction',
    'Assistive Technology'
  ];

  const stages: Stage[] = ['Idea', 'Prototype', 'Tested', 'Validated', 'Adopted', 'Scaled'];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#104C35] font-serif">
            {t('navReview')}
          </h1>
          <AudioInstructionButton
            text="સમીક્ષા અને પ્રમાણીકરણ: નવી અરજીઓની તપાસ કરો, અવાજ સાંભળો અને AI વર્ગીકરણ સુધારો."
            size="xs"
          />
        </div>
        <p className="text-xs text-[#6B756E] mt-1">
          Authorized institutional evaluation panel. Review AI-classified submissions, listen to original recordings, correct classifications, and verify claims.
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
                    setEditingClassification(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EAF5ED] border-[#176B45] shadow-xs'
                      : 'bg-white hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-[#104C35]">{item.id}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                        item.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#18251E] line-clamp-1">
                    {item.title[language] || item.title.gu || item.title.en}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-[#6B756E] mt-1">
                    <span>{tSector(item.sector)}</span>
                    <span>{item.location.district}, {item.location.state}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Evaluation Workbench (8 cols) */}
        {selectedInnovation && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-6 space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-900/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold bg-[#EAF5ED] text-[#104C35] px-2 py-0.5 rounded">
                    {selectedInnovation.id}
                  </span>
                  <span className="text-xs text-[#6B756E]">
                    Submitted: {selectedInnovation.submissionDate}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#104C35]">
                  {selectedInnovation.title[language] || selectedInnovation.title.gu || selectedInnovation.title.en}
                </h2>
                <p className="text-xs text-[#6B756E] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                  <span>
                    {selectedInnovation.location.villageOrTown}, {selectedInnovation.location.district}, {selectedInnovation.location.state}
                  </span>
                </p>
              </div>

              <Link
                href={`/innovations/${selectedInnovation.id}`}
                className="flex items-center gap-1 text-xs font-bold text-[#176B45] hover:underline bg-emerald-50 px-3 py-1.5 rounded-lg"
              >
                <span>Full Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Assisted Submission Attribution Banner */}
            {selectedInnovation.registrationType === 'assisted' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-center justify-between">
                <div>
                  <strong>સહાયક નોંધણી:</strong> મૂળ શોધક: <u>{selectedInnovation.innovatorName}</u> | સહાયક: <u>{selectedInnovation.submitterName}</u> ({selectedInnovation.submitterRelationship})
                </div>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                  Assisted
                </span>
              </div>
            )}

            {/* AI Classification vs Human Review Corrections (Requirement 7) */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#176B45]" />
                  <span className="text-xs font-bold text-[#104C35]">
                    AI Classification & Corrections
                  </span>
                  <span className="text-[10px] bg-white text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                    Confidence: {selectedInnovation.aiConfidenceScore}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingClassification(!editingClassification)}
                  className="text-xs font-bold text-[#176B45] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-3 h-3" />
                  <span>{editingClassification ? 'Cancel' : 'Correct AI Classification'}</span>
                </button>
              </div>

              {editingClassification ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#6B756E] uppercase mb-1">
                      Correct Sector
                    </label>
                    <select
                      value={tempSector}
                      onChange={e => setTempSector(e.target.value as Sector)}
                      className="w-full bg-white border border-emerald-300 rounded-xl p-2 text-xs"
                    >
                      {sectors.map(s => (
                        <option key={s} value={s}>{tSector(s)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#6B756E] uppercase mb-1">
                      Correct Stage
                    </label>
                    <select
                      value={tempStage}
                      onChange={e => setTempStage(e.target.value as Stage)}
                      className="w-full bg-white border border-emerald-300 rounded-xl p-2 text-xs"
                    >
                      {stages.map(st => (
                        <option key={st} value={st}>{tStage(st)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 pt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveClassification}
                      className="flex items-center gap-1.5 bg-[#176B45] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Corrections</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#6B756E] block text-[10px] uppercase font-bold">Assigned Sector</span>
                    <span className="font-bold text-[#104C35]">{tSector(selectedInnovation.sector)}</span>
                  </div>
                  <div>
                    <span className="text-[#6B756E] block text-[10px] uppercase font-bold">Development Stage</span>
                    <span className="font-bold text-[#104C35]">{tStage(selectedInnovation.stage)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Original Audio & Spoken Transcript */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#18251E]">
                  <Volume2 className="w-4 h-4 text-[#176B45]" />
                  <span>Original Spoken Audio ({selectedInnovation.originalLanguage.toUpperCase()})</span>
                </div>
                {selectedInnovation.audioUrl && (
                  <audio src={selectedInnovation.audioUrl} controls className="h-8 max-w-xs" />
                )}
              </div>
              <p className="text-xs italic text-[#18251E] bg-white p-3 rounded-xl border border-gray-200">
                "{selectedInnovation.originalTranscript}"
              </p>
            </div>

            {/* Problem & Solution description */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-[#6B756E] block mb-1">
                  Problem Addressed
                </span>
                <p className="text-[#18251E] bg-gray-50 p-3 rounded-xl leading-relaxed">
                  {selectedInnovation.problem[language] || selectedInnovation.problem.gu || selectedInnovation.problem.en}
                </p>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-[#6B756E] block mb-1">
                  Proposed Solution & Mechanism
                </span>
                <p className="text-[#18251E] bg-emerald-50/50 p-3 rounded-xl leading-relaxed">
                  {selectedInnovation.solution[language] || selectedInnovation.solution.gu || selectedInnovation.solution.en}
                </p>
              </div>
            </div>

            {/* Evaluation Actions & Review Notes */}
            <div className="pt-4 border-t border-emerald-900/10 space-y-3">
              <label className="block text-xs font-bold text-[#104C35]">
                Evaluator Verification Notes & Directives
              </label>
              <textarea
                rows={2}
                placeholder="Enter field assessment notes, lab validation feedback, or specific questions for the innovator..."
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#176B45]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStatusChange('Verified')}
                    className="flex items-center gap-1.5 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Verified</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange('Needs More Info')}
                    className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Request More Info</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange('Under Review')}
                    className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#18251E] text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Set Under Review</span>
                  </button>
                </div>

                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="text-xs font-semibold text-gray-500 hover:text-red-700 cursor-pointer"
                >
                  Archive / Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
