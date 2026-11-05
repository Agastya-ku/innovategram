'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Language } from '@/types/innovategram';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import {
  Volume2,
  MapPin,
  Shield,
  Send,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Sparkles,
  Phone,
  Eye,
  Award,
  Layers,
  X,
  Check
} from 'lucide-react';

export default function InnovationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const { getInnovationById, savedIds, toggleSave, addConnectionRequest } = useInnovations();

  const innovation = getInnovationById(id);

  // Active language view tab for this innovation profile
  const [viewLang, setViewLang] = useState<Language>(language);

  // Contact Request Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [requesterName, setRequesterName] = useState('Dr. Anand Verma');
  const [requesterOrg, setRequesterOrg] = useState('National Innovation Foundation (NIF)');
  const [requesterRole, setRequesterRole] = useState('Incubation Evaluator');
  const [requesterEmail, setRequesterEmail] = useState('a.verma@nifindia.org');
  const [purpose, setPurpose] = useState<any>('Incubation');
  const [message, setMessage] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  if (!innovation) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#104C35]">Innovation Record Not Found</h2>
        <p className="text-xs text-[#6B756E]">The record ID "{id}" does not exist or has been archived.</p>
        <Link
          href="/stakeholder/discover"
          className="inline-block bg-[#176B45] text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          Return to Discovery Directory
        </Link>
      </div>
    );
  }

  const isSaved = savedIds.includes(innovation.id);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addConnectionRequest({
      innovationId: innovation.id,
      innovationTitle: innovation.title.en,
      stakeholderName: requesterName,
      organization: requesterOrg,
      stakeholderRole: requesterRole,
      stakeholderEmail: requesterEmail,
      stakeholderPhone: '+91 98200 •••••',
      purpose,
      message: message || 'Requesting contact permission to offer technical incubation and field validation support.'
    });
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Back button & ID Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-bold text-[#176B45] hover:text-[#104C35]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSave(innovation.id)}
            className="flex items-center gap-1.5 text-xs font-bold bg-white border border-emerald-900/15 hover:bg-emerald-50 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-[#176B45]" />
                <span className="text-[#176B45]">Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-[#6B756E]" />
                <span className="text-[#18251E]">Save Innovation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Demonstration Record Banner if sample */}
      {innovation.isSampleData && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-medium flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{t('demonstrationNotice')}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#EAF5ED] text-[#104C35] px-2.5 py-1 rounded-md border border-emerald-300">
              {innovation.id}
            </span>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-md">
              {tSector(innovation.sector)}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                innovation.status === 'Verified'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {tStatus(innovation.status)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('requestContact')}</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif leading-tight">
            {innovation.title[viewLang] || innovation.title.en}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B756E] mt-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
              <span>
                {innovation.location.villageOrTown}, {innovation.location.district}, {innovation.location.state}
              </span>
            </div>
            <span>•</span>
            <span>Maturity: <strong className="text-[#104C35]">{tStage(innovation.stage)}</strong></span>
            <span>•</span>
            <span>Submitted: {innovation.submissionDate}</span>
          </div>
        </div>

        {/* Assisted submission attribution */}
        {innovation.registrationType === 'assisted' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-center justify-between">
            <div>
              <span>મૂળ શોધક / Innovator: <strong>{innovation.innovatorName}</strong></span>
              <span className="mx-2">•</span>
              <span>સહાયક નોંધણી / Documented by: <strong>{innovation.submitterName}</strong> ({innovation.submitterRelationship})</span>
            </div>
            <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
              Assisted Submission
            </span>
          </div>
        )}

        {/* Language Tabs for Content Viewing */}
        <div className="flex items-center gap-2 border-b border-emerald-900/10 pb-2">
          <span className="text-[11px] font-bold text-[#6B756E] uppercase tracking-wider mr-1">
            Read In:
          </span>
          <button
            onClick={() => setViewLang('en')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              viewLang === 'en' ? 'bg-[#176B45] text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setViewLang('hi')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              viewLang === 'hi' ? 'bg-[#176B45] text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            हिन्दी (Hindi)
          </button>
          <button
            onClick={() => setViewLang('gu')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              viewLang === 'gu' ? 'bg-[#176B45] text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            ગુજરાતી (Gujarati)
          </button>
        </div>

        {/* Problem and Solution */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B756E]">
                {t('fieldProblem')}
              </h3>
              <AudioInstructionButton
                text={innovation.problem[viewLang] || innovation.problem.en}
                size="xs"
              />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {innovation.problem[viewLang] || innovation.problem.en}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#104C35]">
                {t('fieldSolution')}
              </h3>
              <AudioInstructionButton
                text={innovation.solution[viewLang] || innovation.solution.en}
                size="xs"
              />
            </div>
            <p className="text-sm text-[#18251E] leading-relaxed">
              {innovation.solution[viewLang] || innovation.solution.en}
            </p>
          </div>
        </div>

        {/* Original Spoken Voice & Transcript */}
        <div className="p-4 bg-[#F8FAF7] rounded-2xl border border-emerald-900/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#104C35]">
              <Volume2 className="w-4 h-4 text-[#176B45]" />
              <span>Original Spoken Audio ({innovation.originalLanguage.toUpperCase()})</span>
            </div>
            {innovation.audioUrl && (
              <audio src={innovation.audioUrl} controls className="h-8 max-w-xs" />
            )}
          </div>
          <p className="text-xs italic text-[#6B756E] leading-relaxed bg-white p-3 rounded-xl border border-emerald-900/10">
            "{innovation.originalTranscript}"
          </p>
        </div>

        {/* Media Photographs Gallery */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-3">
            Prototype Photographs & Evidence
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {innovation.media.map((m, idx) => (
              <div key={m.id || idx} className="rounded-2xl overflow-hidden border border-emerald-900/10 shadow-xs">
                <img src={m.url} alt="" className="w-full h-52 object-cover" />
                {m.caption && (
                  <p className="text-[11px] text-[#6B756E] p-2.5 bg-white border-t border-emerald-900/10">
                    {m.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Verification History & Notes */}
        {innovation.verificationNotes && (
          <div className="p-4 bg-emerald-100/60 rounded-2xl border border-emerald-300 space-y-1.5 text-xs text-emerald-950">
            <div className="flex items-center gap-1.5 font-bold text-[#104C35]">
              <CheckCircle2 className="w-4 h-4 text-[#176B45]" />
              <span>Institutional Verification Log</span>
            </div>
            <p>{innovation.verificationNotes}</p>
            <div className="text-[11px] text-[#6B756E] pt-1">
              Evaluator: {innovation.reviewedBy} • Date: {innovation.reviewedAt}
            </div>
          </div>
        )}

        {/* Privacy Safeguard Card */}
        <div className="p-4 bg-[#F8FAF7] rounded-2xl border border-emerald-900/10 flex items-start gap-3 text-xs text-[#6B756E]">
          <Shield className="w-5 h-5 text-[#176B45] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#104C35] block mb-0.5">Rural Innovator Contact Protection</span>
            <p className="leading-relaxed">
              Innovator phone: <strong className="text-[#18251E]">{innovation.innovatorPhoneMasked}</strong>. In accordance with rural data privacy regulations, full contact details are released upon institutional request approval.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Permission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-emerald-900/20">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h3 className="text-base font-bold text-[#104C35] font-serif">
                {t('requestContact')}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#176B45] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#104C35]">Contact Request Registered!</h4>
                <p className="text-xs text-[#6B756E]">
                  The rural innovator will be notified via SMS. Mutual contact details will be shared upon consent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#18251E] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={requesterName}
                    onChange={e => setRequesterName(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#18251E] mb-1">Organization / Institution</label>
                  <input
                    type="text"
                    required
                    value={requesterOrg}
                    onChange={e => setRequesterOrg(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#18251E] mb-1">Collaboration Purpose</label>
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value as any)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-2.5"
                  >
                    <option value="Incubation">Incubation & Prototyping Grant</option>
                    <option value="Funding">Seed Capital / Angel Funding</option>
                    <option value="Testing & Validation">Laboratory / Clinical Testing</option>
                    <option value="Manufacturing">Commercial Manufacturing & Licensing</option>
                    <option value="Procurement">Government Pilot Procurement</option>
                    <option value="Research Collaboration">Academic Research Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#18251E] mb-1">Message to the Innovator</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how your organization would like to support or test this innovation..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-2.5"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#6B756E]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#176B45] hover:bg-[#104C35] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

